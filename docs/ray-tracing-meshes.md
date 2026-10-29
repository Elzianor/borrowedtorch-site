---
layout: docs
legend: [prop, method]
title: "Ray tracing: meshes"
description: Your meshes as the library reads them, meshes from a MonoGame model, building a BLAS and what it keeps, deforming meshes, and the units triangles need.
---

A <a class="ref" href="/docs/ray-tracing-glossary/scene/mesh-blas/">`MeshBlas`</a> is a bounding volume hierarchy over one mesh's triangles, in the mesh's own space: a tree of
boxes a ray can walk to the few triangles it may hit, rather than testing them all. It is built once per mesh and
shared by every object that uses the mesh, since a crate's triangles don't move relative to the crate, wherever the
crate is. Names are colored by what they are: a <span class="kb kb-prop">property</span> or a
<span class="kb kb-method">method</span>; values and fields keep the plain color.

## The triangle mesh

The library reads a mesh through <a class="ref" href="/docs/ray-tracing-glossary/scene/i-triangle-mesh/">`ITriangleMesh`</a>, two members: how many triangles there are, and the three
corners of each. It never asks for a format of its own, so anything that can answer that can be traced: an indexed
mesh, as in the [quick start guide](/docs/ray-tracing/#a-first-trace), or a heightmap that makes its triangles up as
they are asked for:

```csharp
// a terrain of heights one unit apart, two triangles a cell, with no vertex or index arrays at all
public sealed class HeightmapTriangles : ITriangleMesh
{
    private readonly float[,] _heights;

    public HeightmapTriangles(float[,] heights) => _heights = heights;

    private int CellsX => _heights.GetLength(0) - 1;
    private int CellsZ => _heights.GetLength(1) - 1;

    public int TriangleCount => CellsX * CellsZ * 2;

    public void GetTriangle(int triangle, out Vector3 v0, out Vector3 v1, out Vector3 v2)
    {
        var cell = triangle / 2;
        var x = cell % CellsX;
        var z = cell / CellsX;

        if (triangle % 2 == 0)
        {
            v0 = Point(x, z);
            v1 = Point(x, z + 1);
            v2 = Point(x + 1, z);
        }
        else
        {
            v0 = Point(x + 1, z);
            v1 = Point(x, z + 1);
            v2 = Point(x + 1, z + 1);
        }
    }

    private Vector3 Point(int x, int z) => new(x, _heights[x, z], z);
}
```

- **Triangle lists.** Every triangle is its own three corners: convert strips and fans first. The order of the corners
  doesn't matter, since triangles are hit from either side.
- **The mesh's own space.** The positions are the ones the world matrix takes into the scene, the same your vertex
  shader starts from.
- **The numbering is the hit's.** The index <a class="ref method" href="/docs/ray-tracing-glossary/scene/i-triangle-mesh/#gettriangle">`GetTriangle`</a> is asked for is the one a hit reports in
  <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-hit/#triangleindex">`TriangleIndex`</a>, so keep it stable: it is how you find a hit's normal or texture coordinate.
- **When it is read.** Twice by a build and once by every refit, and never in between: the BLAS keeps a copy of the
  triangles of its own, see [what a BLAS keeps](#what-a-blas-keeps). Keep the mesh for those refits and for the
  attributes of hits.

### ITriangleMesh members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/ray-tracing-glossary/scene/i-triangle-mesh/#trianglecount">`TriangleCount`</a> | Read-only `int`. How many triangles the mesh has. A refit needs the count the BLAS was built with. |
| <a class="ref method" href="/docs/ray-tracing-glossary/scene/i-triangle-mesh/#gettriangle">`GetTriangle(int triangle, out Vector3 v0, out Vector3 v1, out Vector3 v2)`</a> | The three corners of a triangle, in the mesh's own space. `triangle` runs from 0 to `TriangleCount - 1`, and is the number a hit reports. |

## Meshes from a model

MonoGame's `Model` keeps its vertices and indices on the GPU. Read a part's positions and triangles back once, when the
model is loaded, into the `IndexedTriangles` of the [quick start guide](/docs/ray-tracing/#a-first-trace):

```csharp
// one part of a model as triangles: read back from its buffers once, at load time
public static IndexedTriangles ReadPart(ModelMeshPart part)
{
    // the position is the first element of a vertex, in MonoGame's vertex types and in what the content pipeline builds
    var stride = part.VertexBuffer.VertexDeclaration.VertexStride;
    var positions = new Vector3[part.NumVertices];
    part.VertexBuffer.GetData(part.VertexOffset * stride, positions, 0, part.NumVertices, stride);

    // the indices count from the part's first vertex, which is positions[0]
    var indices = new int[part.PrimitiveCount * 3];

    if (part.IndexBuffer.IndexElementSize == IndexElementSize.SixteenBits)
    {
        var shortIndices = new ushort[indices.Length];
        part.IndexBuffer.GetData(part.StartIndex * sizeof(ushort), shortIndices, 0, shortIndices.Length);
        for (var i = 0; i < indices.Length; i++) indices[i] = shortIndices[i];
    }
    else
    {
        part.IndexBuffer.GetData(part.StartIndex * sizeof(int), indices, 0, indices.Length);
    }

    return new IndexedTriangles(positions, indices);
}
```

A part is in the space of its mesh's bone. Put the bone's transform in front of the object's world matrix when you
declare it, as when you draw it:

```csharp
var bones = new Matrix[model.Bones.Count];
model.CopyAbsoluteBoneTransformsTo(bones);

// every frame: one instance per part, each under an id of its own (_parts: the part's ModelMesh, its BLAS and its id)
foreach (var (mesh, blas, id) in _parts)
    tlas.Add(id, blas, bones[mesh.ParentBone.Index] * world);
```

Parts that always move together can also be one mesh: an `ITriangleMesh` over all of them, in one space, makes one
instance where there were several, and the tree over them one tree. Reading the buffers back is slow, which is fine at
load time; if your engine keeps the positions on the CPU already, read them from there.

## Building a BLAS

<a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#build">`MeshBlas.Build`</a> reads the mesh and builds its tree:

```csharp
// once per mesh, at load time
MeshBlas? crate = MeshBlas.Build(new IndexedTriangles(cratePositions, crateIndices));
```

- **Null for no triangles.** A mesh with none has nothing to trace, and gets no BLAS. <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#add">`Tlas.Add`</a> ignores a
  `null` one, so an empty mesh can go through the same code as the others.
- **Once, and shared.** A build allocates and sorts every triangle, so it belongs at load time. Every instance of the
  mesh takes the same BLAS: one per instance would cost the memory again for each, and the GPU copy, which holds each
  BLAS once, would hold the triangles as many times.
- **A new mesh is a new build.** When the mesh itself is replaced, build a BLAS for the new one and declare the
  instances with it. The GPU copy drops the old one the next time it lays its buffers out afresh, see
  [what an upload sends](/docs/ray-tracing-gpu/#what-an-upload-sends).

The [BVH page](/docs/ray-tracing-bvh/#building) has how the tree is built.

### MeshBlas build

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#build">`Build(ITriangleMesh geometry)`</a> | Static. Returns `MeshBlas?`: a tree over the mesh's triangles, or `null` for a mesh with none. Reads the mesh twice. Throws `ArgumentNullException` for a `null` mesh. |

## What a BLAS keeps

A built BLAS holds everything a ray needs, without going back to the mesh:

- **The triangles**, in <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#triangles">`Triangles`</a>: a copy of each, as a corner and its two edges (a <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-triangle/">`GpuTriangle`</a>),
  which is the form the triangle test starts from. They are in the tree's order, so a leaf's triangles are one run:
  entry `i` is triangle `Bvh.PrimitiveIndices[i]` of the mesh. The CPU walks test these, and the GPU copy sends them as
  they are.
- **The tree**, in <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#bvh">`Bvh`</a>, see the [BVH page](/docs/ray-tracing-bvh/).
- **Its bounds**, in <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#localbounds">`LocalBounds`</a>: the tight box around the triangles, in the mesh's space. It is what the
  `Tlas` transforms into each instance's box in the scene, and is often tighter than a box authored for the mesh.
- **The mesh**, in <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#geometry">`Geometry`</a>: the one it was built from, for refits and for the attributes of a hit.
- **A version**, in <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#version">`Version`</a>: 0 when built, one more after every refit. It is how the `Tlas` and the GPU copy
  tell a BLAS that has moved since they last looked at it.

The [costs and memory](/docs/ray-tracing-bvh/#costs-and-memory) of a BLAS are on the BVH page.

### MeshBlas properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#geometry">`Geometry`</a> | <a class="ref" href="/docs/ray-tracing-glossary/scene/i-triangle-mesh/">`ITriangleMesh`</a> | Read-only. The mesh the BLAS was built from. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#triangles">`Triangles`</a> | <code>ReadOnlySpan&lt;<a href="/docs/ray-tracing-glossary/gpu/gpu-triangle/">GpuTriangle</a>&gt;</code> | Read-only. The triangles as the walks test them, in the tree's order. Filled by the build and by every refit. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#localbounds">`LocalBounds`</a> | `BoundingBox` | Read-only. The tight box around the triangles, in the mesh's space. Only a refit moves it. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#bvh">`Bvh`</a> | <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh/">`Bvh`</a> | Read-only. The tree over the triangles. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#version">`Version`</a> | `int` | Read-only. 0 when built, one more after every refit. |

## Deforming meshes

A skinned character, a cloth or a flag moves its triangles in its own space, and its tree has to follow. Update the
positions your `ITriangleMesh` returns, then refit:

```csharp
// every frame, after skinning
characterMesh.UpdatePositions(currentPose);
characterBlas.Refit();
```

<a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#refit">`Refit`</a> reads the mesh once more, copies the triangles where they are now, and recomputes every box in the
tree, keeping its shape: each leaf keeps the triangles it was built with, since skinning moves vertices but never
changes which vertices make a triangle. Nothing else needs calling. The next <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#add">`Tlas.Add`</a> of an instance sees the
new <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#version">`Version`</a> and recomputes its box, and the next upload re-sends this BLAS in place.

- **The triangle count stays.** A refit keeps the tree's leaves, so a mesh that gained or lost triangles makes it
  throw `InvalidOperationException`: build a new BLAS for it.
- **One BLAS per pose.** Two characters on one mesh in different poses need a BLAS each: sharing one would give both
  the same triangles.
- **Quality wears.** The tree keeps the splits chosen for the pose it was built in. That costs nothing you would notice
  from frame to frame, but after a large change, a character curled up from a T-pose or a cloth unfolded, rays open more
  boxes than a fresh tree would make them. Unlike the `Tlas`, a BLAS never rebuilds itself. Watch its cost if a mesh
  moves far:

```csharp
var builtCost = characterBlas.Bvh.AreaCost; // right after the build

// every frame
characterMesh.UpdatePositions(currentPose);
characterBlas.Refit();

if (characterBlas.Bvh.AreaCost > builtCost * 1.5f) // the bar the Tlas sets for its own tree
{
    characterBlas = MeshBlas.Build(characterMesh);
    builtCost = characterBlas.Bvh.AreaCost;
}
```

A new BLAS is a new object: declare the character with it from then on. The `Tlas` sees an instance whose BLAS
changed and rebuilds its tree, and the GPU copy takes the new BLAS in as it does a mesh first used.
<a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#areacost">`AreaCost`</a> is on the [BVH page](/docs/ray-tracing-bvh/#refits-and-rebuilds).

### MeshBlas refit method

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#refit">`Refit()`</a> | Reads the mesh's current positions, copies the triangles and recomputes every box, keeping the tree's shape. Moves <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#localbounds">`LocalBounds`</a> and <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#version">`Version`</a>. Throws `InvalidOperationException` when the mesh no longer has the triangle count it was built with. |

## Units and limits

- **Triangles only.** There are no spheres, boxes or curves: give a shape triangles to have it traced.
- **Triangles need an area.** The triangle test takes a ray that runs along a triangle's plane, or a triangle with no
  area, as a miss: a value below 10<sup>−12</sup> stands for zero there. So a mesh in units where triangles are smaller
  than about 10<sup>−6</sup> on a side is never hit. Metres and centimetres are fine; nanometres are not.
- **Hits right at the start of a ray are ignored**, closer than 10<sup>−4</sup> along it, see
  [starting off a surface](/docs/ray-tracing-queries/#starting-off-a-surface).
- **A tree is at most 24 levels deep.** Deeper nodes stay leaves however many triangles they hold, so a mesh no split
  can divide well is slower to trace, never wrong. See [limits](/docs/ray-tracing-bvh/#limits).
