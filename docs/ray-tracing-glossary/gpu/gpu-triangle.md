---
layout: docs
legend: [method]
title: "Glossary: GpuTriangle"
description: "The members of GpuTriangle, in alphabetical order."
---

One triangle as the walks test it: a corner, and the two edges from it.

A struct of public fields, 36 bytes, sent to the GPU byte for byte: `GpuTriangle` in <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/">`RayTraversal.fxh`</a> declares the same three fields. <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#triangles">`MeshBlas.Triangles`</a> holds them in the tree's order; the CPU walks test them, and the GPU copy sends them as they are. The [BVH page](/docs/ray-tracing-bvh/#the-gpu-layouts) shows it in context.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Fields

<h3 id="edge1"><code>Edge1</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gputriangle-members" title="Edge1 in context on the BVH page" aria-label="Edge1 in context on the BVH page">→</a></h3>

`Vector3` · The second corner less the first. The triangle test, Möller–Trumbore, starts from the two edges, so they are worked out once, when the BLAS is built or refitted, rather than for every ray.

<h3 id="edge2"><code>Edge2</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gputriangle-members" title="Edge2 in context on the BVH page" aria-label="Edge2 in context on the BVH page">→</a></h3>

`Vector3` · The third corner less the first.

<h3 id="v0"><code>V0</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gputriangle-members" title="V0 in context on the BVH page" aria-label="V0 in context on the BVH page">→</a></h3>

`Vector3` · The first corner, in the mesh's space.

## Methods

<h3 id="gputriangle"><span class="method"><code>GpuTriangle()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#gputriangle-members" title="GpuTriangle() in context on the BVH page" aria-label="GpuTriangle() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-triangle/#gputriangle">`GpuTriangle(in Vector3 v0, in Vector3 v1, in Vector3 v2)`</a> · The triangle of three corners: `V0` is `v0`, and the edges run from it to `v1` and `v2`.

| Parameter | Type | Description |
| --- | --- | --- |
| `v0` | `Vector3` | The first corner. |
| `v1` | `Vector3` | The second corner. |
| `v2` | `Vector3` | The third corner. |
