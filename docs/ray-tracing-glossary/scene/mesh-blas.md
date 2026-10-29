---
layout: docs
legend: [prop, method]
title: "Glossary: MeshBlas"
description: "The members of MeshBlas, in alphabetical order."
---

A bounding volume hierarchy over one mesh's triangles, in the mesh's own space: the bottom level of the two. Built once per mesh, and shared by every instance of it.

A sealed class with no public constructor: <a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#build">`Build`</a> makes one. The [meshes page](/docs/ray-tracing-meshes/#building-a-blas) shows it in context, with code. A refit changes it for every <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas/">`Tlas`</a> that uses it: don't refit while one of them is being queried.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="bvh"><span class="prop"><code>Bvh</code></span> <a class="ctx" href="/docs/ray-tracing-meshes/#meshblas-properties" title="Bvh in context on the meshes page" aria-label="Bvh in context on the meshes page">→</a></h3>

<a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh/">`Bvh`</a> · Read-only. The tree over the triangles: its nodes, and the order of the triangles in its leaves. See the [BVH page](/docs/ray-tracing-bvh/).

<h3 id="geometry"><span class="prop"><code>Geometry</code></span> <a class="ctx" href="/docs/ray-tracing-meshes/#meshblas-properties" title="Geometry in context on the meshes page" aria-label="Geometry in context on the meshes page">→</a></h3>

<a class="ref" href="/docs/ray-tracing-glossary/scene/i-triangle-mesh/">`ITriangleMesh`</a> · Read-only. The mesh the BLAS was built from. A refit reads it again, and the attributes of a hit are looked up in it, by <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-hit/#triangleindex">`TriangleIndex`</a>.

<h3 id="localbounds"><span class="prop"><code>LocalBounds</code></span> <a class="ctx" href="/docs/ray-tracing-meshes/#meshblas-properties" title="LocalBounds in context on the meshes page" aria-label="LocalBounds in context on the meshes page">→</a></h3>

`BoundingBox` · Read-only. The tight box around the triangles, in the mesh's space: the box of the tree's root. A <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas/">`Tlas`</a> transforms it into each instance's box in the scene. Only <a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#refit">`Refit`</a> moves it.

<h3 id="triangles"><span class="prop"><code>Triangles</code></span> <a class="ctx" href="/docs/ray-tracing-meshes/#meshblas-properties" title="Triangles in context on the meshes page" aria-label="Triangles in context on the meshes page">→</a></h3>

<code>ReadOnlySpan&lt;<a href="/docs/ray-tracing-glossary/gpu/gpu-triangle/">GpuTriangle</a>&gt;</code> · Read-only. The triangles as the walks test them, a corner and two edges each, in the tree's order: entry `i` is triangle `Bvh.PrimitiveIndices[i]` of <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#geometry">`Geometry`</a>, so a leaf's triangles are one run. Filled by the build and by every refit; the GPU copy sends them as they are.

<h3 id="version"><span class="prop"><code>Version</code></span> <a class="ctx" href="/docs/ray-tracing-meshes/#meshblas-properties" title="Version in context on the meshes page" aria-label="Version in context on the meshes page">→</a></h3>

`int` · Read-only. 0 when built, one more after every <a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#refit">`Refit`</a>. A <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas/">`Tlas`</a> and a <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/">`GpuAccelerationStructure`</a> compare it with the version they last saw, to tell a BLAS that moved.

## Methods

<h3 id="build"><span class="method"><code>Build()</code></span> <a class="ctx" href="/docs/ray-tracing-meshes/#meshblas-build" title="Build() in context on the meshes page" aria-label="Build() in context on the meshes page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#build">`Build(ITriangleMesh geometry)`</a> · Static. Returns `MeshBlas?`: a tree over the mesh's triangles, or `null` for a mesh with none, which has nothing to trace. Reads the mesh twice, once for each triangle's box and centroid and once more for the triangles in the tree's order, and allocates: build at load time. Throws `ArgumentNullException` for a `null` mesh.

| Parameter | Type | Description |
| --- | --- | --- |
| `geometry` | <a class="ref" href="/docs/ray-tracing-glossary/scene/i-triangle-mesh/">`ITriangleMesh`</a> | The mesh, in its own space. |

<h3 id="intersect"><span class="method"><code>Intersect()</code></span> <a class="ctx" href="/docs/ray-tracing-queries/#meshblas-queries" title="Intersect() in context on the CPU queries page" aria-label="Intersect() in context on the CPU queries page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#intersect">`Intersect(in Ray ray, float maxDistance, out float distance, out int triangleIndex, out float u, out float v)`</a> · Whether the ray hits a triangle closer than `maxDistance`, and the nearest: the closest hit on this mesh alone, in its own space. The direction need not be of length 1, and the distance is in the ray's own parameter: a world ray taken into the mesh's space without normalizing its direction gets the distance along the world ray. Hits closer than 10<sup>−4</sup> are ignored.

| Parameter | Type | Description |
| --- | --- | --- |
| `ray` | `Ray` | The ray, in the mesh's space. |
| `maxDistance` | `float` | Hits at or beyond this ray parameter are left out. |
| `distance` | `out float` | The hit's ray parameter; `maxDistance` when there is none. |
| `triangleIndex` | `out int` | The triangle hit, as <a class="ref method" href="/docs/ray-tracing-glossary/scene/i-triangle-mesh/#gettriangle">`GetTriangle`</a> numbers it; −1 for none. |
| `u` | `out float` | The hit's barycentric weight of the triangle's second corner. Not a texture coordinate. |
| `v` | `out float` | The weight of its third corner. The first's is `1 - u - v`. |

<h3 id="intersectany"><span class="method"><code>IntersectAny()</code></span> <a class="ctx" href="/docs/ray-tracing-queries/#meshblas-queries" title="IntersectAny() in context on the CPU queries page" aria-label="IntersectAny() in context on the CPU queries page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#intersectany">`IntersectAny(in Ray ray, float maxDistance)`</a> · Whether any triangle blocks the ray closer than `maxDistance`, in the mesh's space. Stops at the first hit and keeps no order, so it walks the nodes in one forward pass with no stack, and costs less than the closest hit. The root's own box isn't tested.

| Parameter | Type | Description |
| --- | --- | --- |
| `ray` | `Ray` | The ray, in the mesh's space. |
| `maxDistance` | `float` | Hits at or beyond this ray parameter don't count. |

<h3 id="refit"><span class="method"><code>Refit()</code></span> <a class="ctx" href="/docs/ray-tracing-meshes/#meshblas-refit-method" title="Refit() in context on the meshes page" aria-label="Refit() in context on the meshes page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#refit">`Refit()`</a> · Reads the mesh's current positions, copies the triangles and recomputes every box, keeping the tree's shape: for a mesh that deforms, a skinned character or a cloth. Moves <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#localbounds">`LocalBounds`</a> and <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#version">`Version`</a>; the next <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#add">`Tlas.Add`</a> of an instance and the next <a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#upload">`Upload`</a> follow it with no other call. The splits stay the ones chosen for the pose it was built in, so after a large change of pose, build afresh. Throws `InvalidOperationException` when the mesh no longer has the triangle count it was built with.
