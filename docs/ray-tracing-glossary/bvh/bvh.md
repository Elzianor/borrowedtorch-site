---
layout: docs
legend: [prop, method]
title: "Glossary: Bvh"
description: "The members of Bvh, in alphabetical order."
---

A binary bounding volume hierarchy over primitives of any kind, each given as a box and a centroid: the tree of every <a class="ref" href="/docs/ray-tracing-glossary/scene/mesh-blas/">`MeshBlas`</a> and of the <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas/">`Tlas`</a>.

A sealed class. It is built top-down by the binned surface area heuristic, and its nodes are stored depth-first, with a skip on every interior node. The [BVH page](/docs/ray-tracing-bvh/) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="areacost"><span class="prop"><code>AreaCost</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-properties" title="AreaCost in context on the BVH page" aria-label="AreaCost in context on the BVH page">→</a></h3>

`float` · Read-only. Every node's area over the root's, as of the last <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#build">`Build`</a> or <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#refit">`Refit`</a>: by the surface area heuristic, about how many boxes a ray that enters the root goes on to open. It climbs as a refit keeps splits the primitives have moved away from, even inside a root that doesn't grow. 0 for an empty tree, or a root with no area.

<h3 id="isempty"><span class="prop"><code>IsEmpty</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-properties" title="IsEmpty in context on the BVH page" aria-label="IsEmpty in context on the BVH page">→</a></h3>

`bool` · Read-only. The tree has no nodes: it was never built, or built over no primitives.

<h3 id="nodecount"><span class="prop"><code>NodeCount</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-properties" title="NodeCount in context on the BVH page" aria-label="NodeCount in context on the BVH page">→</a></h3>

`int` · Read-only. How many nodes the tree has: at most twice its primitives, less one.

<h3 id="nodes"><span class="prop"><code>Nodes</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-properties" title="Nodes in context on the BVH page" aria-label="Nodes in context on the BVH page">→</a></h3>

<code>ReadOnlySpan&lt;<a href="/docs/ray-tracing-glossary/bvh/bvh-node/">BvhNode</a>&gt;</code> · Read-only. The nodes, depth-first, the root first: every node followed by its left child, and the left child's subtree before the right child.

<h3 id="primitivecount"><span class="prop"><code>PrimitiveCount</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-properties" title="PrimitiveCount in context on the BVH page" aria-label="PrimitiveCount in context on the BVH page">→</a></h3>

`int` · Read-only. How many primitives the tree was built over.

<h3 id="primitiveindices"><span class="prop"><code>PrimitiveIndices</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-properties" title="PrimitiveIndices in context on the BVH page" aria-label="PrimitiveIndices in context on the BVH page">→</a></h3>

`ReadOnlySpan<int>` · Read-only. The primitives in the leaves' order: a leaf's are the run from its <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/#skiporfirst">`SkipOrFirst`</a>, and entry `i` is the index of a box handed to <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#build">`Build`</a>.

<h3 id="roothalfsurfacearea"><span class="prop"><code>RootHalfSurfaceArea</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-properties" title="RootHalfSurfaceArea in context on the BVH page" aria-label="RootHalfSurfaceArea in context on the BVH page">→</a></h3>

`double` · Read-only. Half the surface area of the root's box; 0 for an empty tree. It grows as a refit stretches the root. A `double`, since two extents of a box out at float's far reaches multiply past float's range.

## Fields

<h3 id="maxtreedepth"><code>MaxTreeDepth</code> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-properties" title="MaxTreeDepth in context on the BVH page" aria-label="MaxTreeDepth in context on the BVH page">→</a></h3>

`int` · Constant, 24. The deepest a node can be, the root at 0: a node there stays a leaf however many primitives it holds. It bounds the stack of every walk that keeps one, so the stacks have a fixed size that is always enough.

## Methods

<h3 id="bvh"><span class="method"><code>Bvh()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-build-and-refit" title="Bvh() in context on the BVH page" aria-label="Bvh() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#bvh">`Bvh()`</a> · An empty tree: no nodes until a <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#build">`Build`</a>.

<h3 id="build"><span class="method"><code>Build()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-build-and-refit" title="Build() in context on the BVH page" aria-label="Build() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#build">`Build(ReadOnlySpan<BoundingBox> bounds, ReadOnlySpan<Vector3> centroids, int maxLeafSize = 4)`</a> · Builds the tree afresh. At each node the centroids' spread on each axis is cut into 12 bins, and the cheapest of the planes between them, by the surface area heuristic, splits the node, if it costs less than testing every primitive in it. A node of `maxLeafSize` primitives or fewer, or <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh/#maxtreedepth">`MaxTreeDepth`</a> levels down, stays a leaf. Reuses the tree's arrays when they are big enough. Throws `ArgumentException` when `bounds` and `centroids` differ in length.

| Parameter | Type | Description |
| --- | --- | --- |
| `bounds` | `ReadOnlySpan<BoundingBox>` | One box per primitive. |
| `centroids` | `ReadOnlySpan<Vector3>` | One split key per primitive: a box's centre, or a triangle's true centroid. |
| `maxLeafSize` | `int` | Nodes with this many primitives or fewer aren't split. Default: 4; a `Tlas` builds with 1. |

<h3 id="hitsnode"><span class="method"><code>HitsNode()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-traversal-helpers" title="HitsNode() in context on the BVH page" aria-label="HitsNode() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#hitsnode">`HitsNode(in BvhNode node, in Vector3 origin, in Vector3 inverseDirection, float maxDistance)`</a> · Static. Whether the ray enters the node's box closer than `maxDistance`: <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#intersectnode">`IntersectNode`</a> as a yes or no, the test of the any-hit walks.

| Parameter | Type | Description |
| --- | --- | --- |
| `node` | <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/">`BvhNode`</a> | The node. |
| `origin` | `Vector3` | Where the ray starts. |
| `inverseDirection` | `Vector3` | Its direction, through <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#inversedirection">`InverseDirection`</a>. |
| `maxDistance` | `float` | Where the ray ends. |

<h3 id="intersectnode"><span class="method"><code>IntersectNode()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-traversal-helpers" title="IntersectNode() in context on the BVH page" aria-label="IntersectNode() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#intersectnode">`IntersectNode(in BvhNode node, in Vector3 origin, in Vector3 inverseDirection, float maxDistance)`</a> · Static. Returns `float`: the ray parameter where the ray enters the node's box, 0 if it starts inside, or `float.PositiveInfinity` for a miss, a box that starts past `maxDistance` included. The closest-hit walks open the nearer child first by it.

| Parameter | Type | Description |
| --- | --- | --- |
| `node` | <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/">`BvhNode`</a> | The node. |
| `origin` | `Vector3` | Where the ray starts. |
| `inverseDirection` | `Vector3` | Its direction, through <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#inversedirection">`InverseDirection`</a>. |
| `maxDistance` | `float` | Where the ray ends: for a closest hit, the nearest hit so far. |

<h3 id="inversedirection"><span class="method"><code>InverseDirection()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-traversal-helpers" title="InverseDirection() in context on the BVH page" aria-label="InverseDirection() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#inversedirection">`InverseDirection(in Vector3 direction)`</a> · Static. Returns `Vector3`: `(1 / x, 1 / y, 1 / z)`. The box tests take a direction in this form, divided once per ray rather than at every box. A zero component gives an infinity, on purpose: the tests are written to take it.

| Parameter | Type | Description |
| --- | --- | --- |
| `direction` | `Vector3` | The ray's direction. |

<h3 id="refit"><span class="method"><code>Refit()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-build-and-refit" title="Refit() in context on the BVH page" aria-label="Refit() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#refit">`Refit(ReadOnlySpan<BoundingBox> bounds)`</a> · Recomputes every node's box over the primitives' new boxes, in one sweep from the last node back, keeping the tree's shape, and measures <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#areacost">`AreaCost`</a> again. Cheaper than a build, but the splits stay where the primitives were: compare <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#roothalfsurfacearea">`RootHalfSurfaceArea`</a> and `AreaCost` with the build's to know when to build again. Throws `ArgumentException` unless there is one box per primitive.

| Parameter | Type | Description |
| --- | --- | --- |
| `bounds` | `ReadOnlySpan<BoundingBox>` | One box per primitive, in the order handed to `Build`. |

<h3 id="skip"><span class="method"><code>Skip()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-traversal-helpers" title="Skip() in context on the BVH page" aria-label="Skip() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#skip">`Skip(ReadOnlySpan<BvhNode> nodes, int index)`</a> · Static. Returns `int`: where a depth-first walk goes on after node `index` and everything below it, or after missing its box: the next node for a leaf, the node's <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/#skiporfirst">`SkipOrFirst`</a> for an interior one. Of a left child, it is where the right child starts.

| Parameter | Type | Description |
| --- | --- | --- |
| `nodes` | <code>ReadOnlySpan&lt;<a href="/docs/ray-tracing-glossary/bvh/bvh-node/">BvhNode</a>&gt;</code> | The tree's nodes. |
| `index` | `int` | The node. |

<h3 id="visitrightfirst"><span class="method"><code>VisitRightFirst()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvh-traversal-helpers" title="VisitRightFirst() in context on the BVH page" aria-label="VisitRightFirst() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#visitrightfirst">`VisitRightFirst(in BvhNode node, in Vector3 direction)`</a> · Static. Whether a closest-hit walk opens an interior node's right child first when both children are entered at the same distance: true for a ray heading down the node's <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh-node/#splitaxis">`SplitAxis`</a>, which reaches the high side, the right child's, first.

| Parameter | Type | Description |
| --- | --- | --- |
| `node` | <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/">`BvhNode`</a> | An interior node. |
| `direction` | `Vector3` | The ray's direction. |
