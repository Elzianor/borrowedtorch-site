---
layout: docs
legend: [prop, method]
title: "Ray tracing: the BVH and performance"
description: The one tree builder behind both levels, the depth-first node layout, walking with and without a stack, refits and rebuilds, the layouts the GPU reads, what each step costs, and the limits.
---

Every tree in the library, a `MeshBlas`'s over triangles and a `Tlas`'s over instances, is a <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh/">`Bvh`</a>: a bounding
volume hierarchy, boxes in boxes, which lets a ray skip everything inside a box it misses. This page is how the trees
are built, laid out and walked, and what that costs; nothing on it is needed to trace a ray. Names are colored by what
they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields
keep the plain color.

## One builder for both levels

A `Bvh` knows nothing of triangles or instances. It takes one box and one centroid per primitive, and nothing else:

- **A `MeshBlas`** hands it each triangle's box and its true centroid, the mean of its corners, which for a long thin
  triangle across a box is a better key for where it belongs than the box's centre.
- **A `Tlas`** hands it each instance's box in the scene and that box's centre.

It is public, so a tree over primitives of your own is a build away: lights' areas of effect, trigger volumes, any
boxes a ray should find. The [walk without a stack](#walking-without-a-stack) below goes through one.

## Building

<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#build">`Build`</a> splits the primitives top-down, choosing each split by the surface area heuristic: the chance a ray
that enters a box enters one inside it is about the ratio of their surface areas, so a split is as good as the
primitives it leaves in each half, times that half's area.

- **Binned.** At each node, the spread of the centroids along each axis is cut into 12 bins, and the 11 planes between
  them are the candidates, on all three axes. Centroids rather than boxes are binned, so one huge primitive can't
  stretch the range until everything else falls in one bin.
- **Split only if it pays.** The cheapest candidate has to cost less than testing every primitive in the node, or the
  node stays a leaf.
- **Small leaves.** A node of 4 primitives or fewer is never split: opening two more boxes would cost more than testing
  them. A `Tlas` asks for leaves of 1 instead, since an instance isn't cheap to test, a matrix and a walk of its own;
  a leaf holds more only where instances share a centroid and no plane can part them.
- **A depth limit.** A node 24 levels down stays a leaf however many primitives it has, see [limits](#limits).

The build works on a copy of the boxes, which it allocates and drops: a BLAS is built once, and a `Tlas` rebuilds only
when its scene's instances come, go, or have worn the tree out. The tree's own arrays are kept and reused when a
rebuild fits in them.

### Bvh build and refit

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#bvh">`Bvh()`</a> | An empty tree. |
| <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#build">`Build(ReadOnlySpan<BoundingBox> bounds, ReadOnlySpan<Vector3> centroids, int maxLeafSize = 4)`</a> | Builds the tree afresh over one box and one centroid per primitive. Throws `ArgumentException` when the two counts differ. |
| <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#refit">`Refit(ReadOnlySpan<BoundingBox> bounds)`</a> | Recomputes every box over the primitives' new boxes, keeping the tree's shape. Throws `ArgumentException` unless there is one box per primitive the tree was built over. |

## The node layout

The nodes are in one array, depth-first: every node is followed by its left child, and the left child's whole subtree
comes before the right child. So any subtree is one run of the array, and a node needs no index of a child: the left
child is the next node, and the right one starts where the left one's subtree ends.

<figure class="shot">
  <img src="{{ '/assets/img/ray-tracing/depth-first.svg' | relative_url }}" width="640" height="260" alt="A tree of seven nodes and the array it is stored in. The root, node 0, has children 1 and 4; node 1 has the leaves 2 and 3, and node 4 the leaves 5 and 6. In the array, node 0's skip points past the end, node 1's to node 4 and node 4's past the end; a leaf's skip is always the next node">
  <figcaption>Seven nodes, depth-first. A missed box is jumped over to its skip, the first node after its subtree, so a walk only ever moves forward.</figcaption>
</figure>

A <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/">`BvhNode`</a> is 32 bytes, a leaf and an interior node alike, told apart by <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/#primitivecount">`PrimitiveCount`</a>:

- **A leaf**, above 0: it holds that many primitives, and <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/#skiporfirst">`SkipOrFirst`</a> is where they start in
  <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#primitiveindices">`PrimitiveIndices`</a>. The build sorts the primitives so that each leaf's are one run. A leaf's skip needs no
  storing: nothing hangs below it, so it is the next node.
- **An interior node**, below 0: `SkipOrFirst` is its skip, the first node after its subtree. The count, which it has
  no use for, keeps the axis it was split on, as −1, −2 or −3 for X, Y or Z: see <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh-node/#splitaxis">`SplitAxis`</a>.

The field order, a vector, an `int`, a vector, an `int`, packs a node into two 16-byte rows with no padding, two to a
CPU cache line, and is the order the GPU reads them in.

### BvhNode members

| Member | Description |
| --- | --- |
| <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/#min">`Min`</a>, <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/#max">`Max`</a> | `Vector3` fields. The corners of the node's box. |
| <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/#skiporfirst">`SkipOrFirst`</a> | `int` field. A leaf's first entry in `PrimitiveIndices`, or an interior node's skip. |
| <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/#primitivecount">`PrimitiveCount`</a> | `int` field. Above 0, a leaf's primitives; below 0, an interior node's split axis as −(axis + 1). |
| <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh-node/#isleaf">`IsLeaf`</a> | Read-only `bool`. `PrimitiveCount` is above 0. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh-node/#splitaxis">`SplitAxis`</a> | Read-only `int`. An interior node's split axis: 0, 1 or 2 for X, Y or Z. Meaningless for a leaf. |

## Walking without a stack

The any-hit walks, <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#intersectany">`Tlas.IntersectAny`</a>, <a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#intersectany">`MeshBlas.IntersectAny`</a> and `RtTraceAny` on the GPU, don't
care in which order they find things, and that lets them walk the array in one forward pass. A box the ray enters is
entered by stepping to the next node; a leaf is done either way, so it steps on too; only a missed interior node
jumps, past its whole subtree, to its skip. The walk's only state is where it is.

The same walk over a tree of your own:

```csharp
// a tree over boxes of your own
var bvh = new Bvh();
bvh.Build(boxes, centres);

// every primitive whose box the ray enters closer than maxDistance
var nodes = bvh.Nodes;
var inverseDirection = Bvh.InverseDirection(ray.Direction);
var index = 0;

while (index < nodes.Length)
{
    ref readonly var node = ref nodes[index];
    var hit = Bvh.HitsNode(node, ray.Position, inverseDirection, maxDistance);

    if (hit && node.IsLeaf)
        for (var i = 0; i < node.PrimitiveCount; i++)
            Visit(bvh.PrimitiveIndices[node.SkipOrFirst + i]);

    index = hit || node.IsLeaf ? index + 1 : node.SkipOrFirst;
}
```

The library's walks start at node 1, below the root: the rays they serve start on a surface in the scene, inside its
box, and the root's box is only the union of its children's. On the GPU, having no stack is what matters most: no
array per thread and nothing in scratch memory leaves room for more waves in flight, to hide the memory reads a
walk is mostly made of.

## The closest-hit walk

<a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#intersect">`Tlas.Intersect`</a> and <a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#intersect">`MeshBlas.Intersect`</a> look for the nearest hit, and order matters to them: they
open the nearer child first, so that a hit found inside it brings the maximum distance in, and the farther child,
when its turn comes, is often past it and skipped. The child put off waits on a stack, which is never deeper than
the tree, 24 entries, kept on the thread's stack with nothing allocated.

When the two children are entered at the same distance, the ray starting inside both, the distance can't choose.
The walk then opens first the child on the ray's side of the plane the node was split on: the left child holds the
primitives on the low side, so a ray heading down the axis reaches the right child's first. That is
<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#visitrightfirst">`VisitRightFirst`</a>.

The box test is the slab test: the stretch of the ray inside the box is narrowed axis by axis, between the box's two
planes on each, and the box is hit if any of it is left. It multiplies by the direction's inverse, worked out once per
ray. A direction with a zero component makes that inverse infinite, which the test is written to take: a ray running
along an axis is inside that axis's slab for its whole length, or outside it.

### Bvh traversal helpers

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#intersectnode">`IntersectNode(in BvhNode node, in Vector3 origin, in Vector3 inverseDirection, float maxDistance)`</a> | Static. Returns `float`: where the ray enters the node's box, or `float.PositiveInfinity` for a miss, a box past `maxDistance` included. |
| <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#hitsnode">`HitsNode(in BvhNode node, in Vector3 origin, in Vector3 inverseDirection, float maxDistance)`</a> | Static. Whether the ray enters the node's box closer than `maxDistance`. |
| <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#skip">`Skip(ReadOnlySpan<BvhNode> nodes, int index)`</a> | Static. Returns `int`: where a walk goes on after a node and its subtree, or after missing it. Of a left child, where the right child starts. |
| <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#visitrightfirst">`VisitRightFirst(in BvhNode node, in Vector3 direction)`</a> | Static. Whether a closest-hit walk opens an interior node's right child first when distance can't choose. |
| <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#inversedirection">`InverseDirection(in Vector3 direction)`</a> | Static. Returns `Vector3`: `(1 / x, 1 / y, 1 / z)`, the form the box tests take a direction in. A zero component gives an infinity, on purpose. |

## Refits and rebuilds

<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#refit">`Refit`</a> takes the primitives' new boxes and recomputes every node's in one sweep from the end of the array
back, each node after both its children. It keeps the tree's shape, which is much cheaper than a build, but keeps the
splits too, chosen for where the primitives were. Two measures tell how far that has gone, both up to date after every
build and every refit:

- <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#roothalfsurfacearea">`RootHalfSurfaceArea`</a>, half the surface area of the root's box. It grows when primitives spread out, one
  flown far off say, which stretches every box on its way up to the root.
- <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#areacost">`AreaCost`</a>, every node's area over the root's: by the same heuristic the build uses, about how many boxes a
  ray that enters the root goes on to open. It grows when primitives move about or trade places inside a root that
  stays put, which the root's area can't see.

A `Tlas` rebuilds after a refit that has taken the root's area past twice, or the cost past one and a half times, what
they were at the last build: see [what an update does](/docs/ray-tracing-scene/#what-an-update-does). A `MeshBlas`
leaves that to you, see [deforming meshes](/docs/ray-tracing-meshes/#deforming-meshes). The areas are worked out in
`double`: the extents of a root stretched to an instance placed absurdly far away can multiply past float's range.

### Bvh properties

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#nodes">`Nodes`</a> | Read-only <code>ReadOnlySpan&lt;<a href="/docs/ray-tracing-glossary/bvh/bvh-node/">BvhNode</a>&gt;</code>. The nodes, depth-first, the root first. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#primitiveindices">`PrimitiveIndices`</a> | Read-only `ReadOnlySpan<int>`. The primitives in the leaves' order: entry `i` is the index of a box handed to the build. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#nodecount">`NodeCount`</a>, <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#primitivecount">`PrimitiveCount`</a> | Read-only `int`s. How many nodes and primitives the tree has. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#isempty">`IsEmpty`</a> | Read-only `bool`. The tree has no nodes. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#roothalfsurfacearea">`RootHalfSurfaceArea`</a> | Read-only `double`. Half the surface area of the root's box; 0 for an empty tree. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#areacost">`AreaCost`</a> | Read-only `float`. Every node's area over the root's, as of the last build or refit; 0 for an empty tree or a root with no area. |
| <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh/#maxtreedepth">`MaxTreeDepth`</a> | Constant `int`, 24. The deepest a node can be, the root at 0. |

## The GPU layouts

Three structs go to the GPU byte for byte, and <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/">`RayTraversal.fxh`</a> declares a twin of each, the same fields
in the same order:

- <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/">`BvhNode`</a> as `GpuBvhNode`, 32 bytes.
- <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/">`GpuInstance`</a>, 64 bytes: an instance's inverse matrix as the four rows of its 4 × 3, which is all an affine
  inverse needs, each followed by an `int`, its BLAS's first node and one past its last, its flags, and padding. Where
  the CPU's <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas-instance/">`TlasInstance`</a> holds its `MeshBlas`, this holds where the BLAS's nodes are in the shared buffer: a
  GPU can't hold a reference.
- <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-triangle/">`GpuTriangle`</a>, 36 bytes: a corner and the two edges from it, the form the triangle test starts from, worked
  out once when the BLAS is built rather than per ray. A structured buffer packs its `float3`s tightly; padding each to
  16 bytes was measured, with 72,000 triangles on an Intel UHD and an RTX A3000, and was no faster on either, for a third
  more memory.

A field added or retyped on one side only would fail nowhere: every element after the first would just be read from the
wrong place. So the sizes are checked the first time a <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/">`GpuAccelerationStructure`</a> is used, and a mismatch, a bug in
the library rather than in your code, throws.

On the way up, every index becomes absolute: a BLAS leaf's first triangle indexes the shared `Triangles` buffer, an
interior node's skip the shared `BlasNodes`, and the instance records are written in the `Tlas`'s leaf order, so a
leaf of the scene's tree points straight at its record. The shader needs no base to add and no
`PrimitiveIndices` to look through.

### GpuTriangle members

| Member | Description |
| --- | --- |
| <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-triangle/#v0">`V0`</a> | `Vector3` field. The first corner. |
| <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-triangle/#edge1">`Edge1`</a>, <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-triangle/#edge2">`Edge2`</a> | `Vector3` fields. The second and the third corner, less the first. |
| <a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-triangle/#gputriangle">`GpuTriangle(in Vector3 v0, in Vector3 v1, in Vector3 v2)`</a> | The triangle of three corners. |

### GpuInstance members

| Member | Description |
| --- | --- |
| <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#worldinversex">`WorldInverseX`</a>, <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#worldinversey">`WorldInverseY`</a>, <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#worldinversez">`WorldInverseZ`</a>, <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#worldinversew">`WorldInverseW`</a> | `Vector3` fields. The rows of the inverse matrix: where the world's X, Y and Z axes and its origin land in the mesh's space. |
| <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#blasnodeoffset">`BlasNodeOffset`</a>, <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#blasnodeend">`BlasNodeEnd`</a> | `int` fields. The BLAS's root in the shared node buffer, and one past its last node, where its walk stops. |
| <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#flags">`Flags`</a> | `int` field. The instance's <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-tracing-flags/">`RayTracingFlags`</a>. |
| <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#pad">`Pad`</a> | `int` field. Padding, 0. |
| <a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#gpuinstance">`GpuInstance(in Matrix worldInverse, int blasNodeOffset, int blasNodeEnd, RayTracingFlags flags)`</a> | The record of an instance. |

## Costs and memory

What each step of a frame does, from the cheapest:

| Step | What it costs |
| --- | --- |
| An update in which nothing moved | A few comparisons an instance. |
| An upload in which nothing changed | A few comparisons. Nothing is sent. |
| An update in which objects moved | Each moved instance's box, then one sweep over the tree's nodes: a refit. |
| An upload after objects moved | The scene's tree, 32 bytes a node, and the instance records, 64 bytes each. |
| A refit of a BLAS | One read of the mesh and one sweep over its nodes; the next upload sends its nodes and triangles. |
| An update in which objects came or went | The scene's tree rebuilt over every instance. |
| A mesh first used | Its nodes and triangles sent; everything sent if the buffers have no room for it. |
| Building a BLAS | Every triangle read twice and sorted into a tree, with memory allocated: at load time. |

A query costs what its walk opens: a closest hit with a short maximum distance, or an any hit that finds something
early, opens fewer boxes than one that crosses the whole scene and hits nothing.

A BLAS keeps 36 bytes a triangle, its own copy of the triangles, 4 for the order of the leaves, and room for two nodes
a triangle, at 32 bytes a node, which is more than the tree uses; one that has been refitted keeps a box a triangle
too, 24 bytes more. On the GPU, a BLAS takes 36 bytes a triangle and 32 a node it uses, in buffers made with half as
much room again.

## Limits

- **Triangles only**, each one double-sided.
- **No closest hit on the GPU.** The HLSL walk is the any-hit one.
- **Finite rays.** The any-hit walks take an infinite maximum distance as `float.MaxValue`, on the CPU and the GPU
  alike; the CPU's closest hit takes it as it is.
- **Units.** The triangle test takes a value below 10<sup>−12</sup> for zero, so a mesh whose triangles are smaller
  than about 10<sup>−6</sup> on a side is never hit, see [units and limits](/docs/ray-tracing-meshes/#units-and-limits).
- **24 levels.** A node at <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh/#maxtreedepth">`MaxTreeDepth`</a> stays a leaf however many primitives it has. That is what keeps every
  stack a fixed size that is always enough, and it makes input no split can divide well slower, never wrong.
- **One structure per scene.** The `Tlas` and its GPU copy are updated in place: there is no copy of last frame's scene
  to trace while this frame's is declared.
- **One thread at a time** for updates, see [threads](/docs/ray-tracing-scene/#threads).
