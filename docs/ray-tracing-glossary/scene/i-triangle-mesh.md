---
layout: docs
legend: [prop, method]
title: "Glossary: ITriangleMesh"
description: "The members of ITriangleMesh, in alphabetical order."
---

Your mesh as the library reads it: a triangle count, and the three corners of each triangle in the mesh's own space.

An interface, in the namespace `BorrowedTorch.RayTracing`. Implement it over whatever your engine keeps on the CPU, and hand it to <a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#build">`MeshBlas.Build`</a>; nothing is copied into a format of the library's. The [meshes page](/docs/ray-tracing-meshes/#the-triangle-mesh) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="trianglecount"><span class="prop"><code>TriangleCount</code></span> <a class="ctx" href="/docs/ray-tracing-meshes/#itrianglemesh-members" title="TriangleCount in context on the meshes page" aria-label="TriangleCount in context on the meshes page">→</a></h3>

`int` · Read-only. How many triangles the mesh has. A BLAS is built over this many, and <a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#refit">`Refit`</a> needs the same count again: a mesh whose count changed needs a new build.

## Methods

<h3 id="gettriangle"><span class="method"><code>GetTriangle()</code></span> <a class="ctx" href="/docs/ray-tracing-meshes/#itrianglemesh-members" title="GetTriangle() in context on the meshes page" aria-label="GetTriangle() in context on the meshes page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/i-triangle-mesh/#gettriangle">`GetTriangle(int triangle, out Vector3 v0, out Vector3 v1, out Vector3 v2)`</a> · The three corners of a triangle, in the mesh's own space. Asked for every triangle twice by a build and once by every refit, and never in between: the BLAS keeps a copy of its own. A hit names its triangle by this index, in <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-hit/#triangleindex">`TriangleIndex`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `triangle` | `int` | Which triangle, from 0 to `TriangleCount - 1`. Keep the numbering stable: it is the one hits report. |
| `v0` | `out Vector3` | The first corner. Its weight at a hit is `1 - U - V`. |
| `v1` | `out Vector3` | The second corner, weighted `U` at a hit. |
| `v2` | `out Vector3` | The third corner, weighted `V` at a hit. |
