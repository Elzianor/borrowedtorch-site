---
layout: docs
legend: [method]
title: "Glossary: RayTraversal.fxh"
description: "The functions, names and structs of RayTraversal.fxh, in alphabetical order."
---

The GPU half of the library: the any-hit walk of the scene, for compute and pixel shaders, and the buffers it reads.

An HLSL header, copied to your build output at `Content/Effects/Lib/`: `#include "Lib/RayTraversal.fxh"`. It is a line-for-line port of <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#intersectany">`Tlas.IntersectAny`</a> and <a class="ref method" href="/docs/ray-tracing-glossary/scene/mesh-blas/#intersectany">`MeshBlas.IntersectAny`</a>, declares the buffers <a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#bind">`Bind`</a> sets, and needs nothing that only compute shaders have. The [GPU page](/docs/ray-tracing-gpu/#the-hlsl-headers) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Functions

<h3 id="rtnodehit"><span class="method"><code>RtNodeHit()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#walking-without-a-stack" title="RtNodeHit() in context on the BVH page" aria-label="RtNodeHit() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rtnodehit">`bool RtNodeHit(GpuBvhNode node, float3 origin, float3 inverseDirection, float maxDistance)`</a> · Whether the ray enters the node's box closer than `maxDistance`: the slab test, as <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#hitsnode">`Bvh.HitsNode`</a> does it. A step of the walk.

| Parameter | Type | Description |
| --- | --- | --- |
| `node` | <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#gpubvhnode">`GpuBvhNode`</a> | The node. |
| `origin` | `float3` | Where the ray starts. |
| `inverseDirection` | `float3` | One over each component of its direction. |
| `maxDistance` | `float` | Where the ray ends. |

<h3 id="rtslab"><span class="method"><code>RtSlab()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#the-closest-hit-walk" title="RtSlab() in context on the BVH page" aria-label="RtSlab() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rtslab">`void RtSlab(float boundsMin, float boundsMax, float origin, float inverseDirection, inout float tMin, inout float tMax)`</a> · Narrows the stretch of the ray inside a box, from `tMin` to `tMax`, to the part between the box's two planes on one axis. Written with comparisons rather than `min` and `max`, so a NaN, from a ray running exactly along a plane, leaves the stretch as it is: HLSL doesn't say what its `min` and `max` do with one.

| Parameter | Type | Description |
| --- | --- | --- |
| `boundsMin` | `float` | The box's low plane on the axis. |
| `boundsMax` | `float` | Its high plane. |
| `origin` | `float` | The ray's origin on the axis. |
| `inverseDirection` | `float` | One over its direction on the axis. |
| `tMin` | `inout float` | Where the stretch starts, raised to where the ray enters the slab. |
| `tMax` | `inout float` | Where it ends, lowered to where the ray leaves the slab. |

<h3 id="rttraceany"><span class="method"><code>RtTraceAny()</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-functions" title="RtTraceAny() in context on the GPU page" aria-label="RtTraceAny() in context on the GPU page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rttraceany">`bool RtTraceAny(float3 origin, float3 direction, float maxDistance, int requiredFlags)`</a> · Whether any instance with every flag in `requiredFlags` blocks the ray closer than `maxDistance`: the GPU's <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#intersectany">`Tlas.IntersectAny`</a>. The ray is in the space the instances were declared in, and its direction need not be of length 1. A `maxDistance` past <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rt_max_distance">`RT_MAX_DISTANCE`</a> is taken as it, hits closer than <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rt_min_distance">`RT_MIN_DISTANCE`</a> are ignored, and with an empty scene nothing blocks the ray.

| Parameter | Type | Description |
| --- | --- | --- |
| `origin` | `float3` | Where the ray starts: off the surface it leaves, along its normal. |
| `direction` | `float3` | Its direction. |
| `maxDistance` | `float` | Hits at or beyond this ray parameter don't count. |
| `requiredFlags` | `int` | <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rt_flag_casts_shadow">`RT_FLAG_CASTS_SHADOW`</a> or <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rt_flag_visible_to_gi">`RT_FLAG_VISIBLE_TO_GI`</a>, or the two combined; 0 for every instance. |

<h3 id="rttraceanyblas"><span class="method"><code>RtTraceAnyBlas()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#walking-without-a-stack" title="RtTraceAnyBlas() in context on the BVH page" aria-label="RtTraceAnyBlas() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rttraceanyblas">`bool RtTraceAnyBlas(int firstNode, int endNode, float3 origin, float3 direction, float maxDistance, inout uint steps)`</a> · Whether any triangle of one BLAS blocks the ray, in the mesh's space: the walk over <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#blasnodes">`BlasNodes`</a> from `firstNode` up to `endNode`, an instance's <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#blasnodeoffset">`BlasNodeOffset`</a> and <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#blasnodeend">`BlasNodeEnd`</a>. Adds every box and triangle it tests to `steps`. The bottom half of <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rttraceanycounted">`RtTraceAnyCounted`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `firstNode` | `int` | The BLAS's root in `BlasNodes`. |
| `endNode` | `int` | One past its last node. |
| `origin` | `float3` | The ray's origin, in the mesh's space. |
| `direction` | `float3` | Its direction, in the mesh's space, not normalized. |
| `maxDistance` | `float` | Hits at or beyond this ray parameter don't count. |
| `steps` | `inout uint` | Added to, once per box and once per triangle tested. |

<h3 id="rttraceanycounted"><span class="method"><code>RtTraceAnyCounted()</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-functions" title="RtTraceAnyCounted() in context on the GPU page" aria-label="RtTraceAnyCounted() in context on the GPU page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rttraceanycounted">`bool RtTraceAnyCounted(float3 origin, float3 direction, float maxDistance, int requiredFlags, inout uint steps)`</a> · <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rttraceany">`RtTraceAny`</a>, adding one to `steps` for every box and every triangle it tests: how far the ray had to walk, for a heat map or a measure of cost. `RtTraceAny` is this with a count nothing reads, which compiles away; a kernel that reads it pays a register and an add per step, so keep counting kernels apart from the real ones.

| Parameter | Type | Description |
| --- | --- | --- |
| `origin` | `float3` | Where the ray starts. |
| `direction` | `float3` | Its direction. |
| `maxDistance` | `float` | Hits at or beyond this ray parameter don't count. |
| `requiredFlags` | `int` | The flags an instance needs to block the ray; 0 for every instance. |
| `steps` | `inout uint` | Added to; start it at 0. |

<h3 id="rttrianglehit"><span class="method"><code>RtTriangleHit()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#the-gpu-layouts" title="RtTriangleHit() in context on the BVH page" aria-label="RtTriangleHit() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rttrianglehit">`bool RtTriangleHit(GpuTriangle tri, float3 origin, float3 direction, float maxDistance)`</a> · Whether the ray hits the triangle, from either side, further along than <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rt_min_distance">`RT_MIN_DISTANCE`</a> and closer than `maxDistance`: Möller–Trumbore, as on the CPU. A value below 10<sup>−12</sup> counts as a ray along the triangle's plane, or a triangle with no area.

| Parameter | Type | Description |
| --- | --- | --- |
| `tri` | <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#gputriangle">`GpuTriangle`</a> | The triangle, a corner and two edges. |
| `origin` | `float3` | Where the ray starts. |
| `direction` | `float3` | Its direction. |
| `maxDistance` | `float` | Where the ray ends. |

## Defines

<h3 id="rt_flag_casts_shadow"><code>RT_FLAG_CASTS_SHADOW</code> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-names" title="RT_FLAG_CASTS_SHADOW in context on the GPU page" aria-label="RT_FLAG_CASTS_SHADOW in context on the GPU page">→</a></h3>

`1` · <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-tracing-flags/#castsshadow">`RayTracingFlags.CastsShadow`</a>, for `requiredFlags`: instances that block shadow rays.

<h3 id="rt_flag_visible_to_gi"><code>RT_FLAG_VISIBLE_TO_GI</code> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-names" title="RT_FLAG_VISIBLE_TO_GI in context on the GPU page" aria-label="RT_FLAG_VISIBLE_TO_GI in context on the GPU page">→</a></h3>

`2` · <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-tracing-flags/#visibletogi">`RayTracingFlags.VisibleToGI`</a>, for `requiredFlags`: instances that take part in indirect light.

<h3 id="rt_max_distance"><code>RT_MAX_DISTANCE</code> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-names" title="RT_MAX_DISTANCE in context on the GPU page" aria-label="RT_MAX_DISTANCE in context on the GPU page">→</a></h3>

`3.402823466e+38` · float's largest finite value, the longest a ray may be. A longer `maxDistance`, infinity included, is taken as it, as on the CPU, so the two walks test every box alike.

<h3 id="rt_min_distance"><code>RT_MIN_DISTANCE</code> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-names" title="RT_MIN_DISTANCE in context on the GPU page" aria-label="RT_MIN_DISTANCE in context on the GPU page">→</a></h3>

`1e-4` · Hits closer than this along a ray are ignored, as on the CPU. A backstop against a surface shadowing itself: still start rays off the surface, see [starting off a surface](/docs/ray-tracing-queries/#starting-off-a-surface).

## Buffers

<h3 id="blasnodes"><code>BlasNodes</code> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-names" title="BlasNodes in context on the GPU page" aria-label="BlasNodes in context on the GPU page">→</a></h3>

<code>StructuredBuffer&lt;<a href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#gpubvhnode">GpuBvhNode</a>&gt;</code> · Every BLAS's nodes, one after the other. Set by <a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#bind">`Bind`</a>.

<h3 id="instances"><code>Instances</code> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-names" title="Instances in context on the GPU page" aria-label="Instances in context on the GPU page">→</a></h3>

<code>StructuredBuffer&lt;<a href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#gpuinstance">GpuInstance</a>&gt;</code> · One record per instance, in the order of the scene tree's leaves. Set by `Bind`.

<h3 id="tlasnodecount"><code>TlasNodeCount</code> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-names" title="TlasNodeCount in context on the GPU page" aria-label="TlasNodeCount in context on the GPU page">→</a></h3>

`int` · How many nodes the scene's tree has, where its walk stops; 0 for an empty scene, which nothing is traced against. Set by `Bind`.

<h3 id="tlasnodes"><code>TlasNodes</code> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-names" title="TlasNodes in context on the GPU page" aria-label="TlasNodes in context on the GPU page">→</a></h3>

<code>StructuredBuffer&lt;<a href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#gpubvhnode">GpuBvhNode</a>&gt;</code> · The scene's tree. Set by `Bind`.

<h3 id="triangles"><code>Triangles</code> <a class="ctx" href="/docs/ray-tracing-gpu/#raytraversalfxh-names" title="Triangles in context on the GPU page" aria-label="Triangles in context on the GPU page">→</a></h3>

<code>StructuredBuffer&lt;<a href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#gputriangle">GpuTriangle</a>&gt;</code> · Every BLAS's triangles, one after the other. Set by `Bind`.

## Structs

<h3 id="gpubvhnode"><code>GpuBvhNode</code> <a class="ctx" href="/docs/ray-tracing-bvh/#the-gpu-layouts" title="GpuBvhNode in context on the BVH page" aria-label="GpuBvhNode in context on the BVH page">→</a></h3>

`float3 Min; int SkipOrFirst; float3 Max; int PrimitiveCount;` · The twin of <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/">`BvhNode`</a>, 32 bytes. A leaf when `PrimitiveCount` is above 0, its first triangle or instance in `SkipOrFirst`; otherwise an interior node, its first child the next node and its skip in `SkipOrFirst`.

<h3 id="gpuinstance"><code>GpuInstance</code> <a class="ctx" href="/docs/ray-tracing-bvh/#the-gpu-layouts" title="GpuInstance in context on the BVH page" aria-label="GpuInstance in context on the BVH page">→</a></h3>

`float3 WorldInverseX; int BlasNodeOffset; float3 WorldInverseY; int BlasNodeEnd; float3 WorldInverseZ; int Flags; float3 WorldInverseW; int Pad;` · The twin of <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/">`GpuInstance`</a>, 64 bytes.

<h3 id="gputriangle"><code>GpuTriangle</code> <a class="ctx" href="/docs/ray-tracing-bvh/#the-gpu-layouts" title="GpuTriangle in context on the BVH page" aria-label="GpuTriangle in context on the BVH page">→</a></h3>

`float3 V0; float3 Edge1; float3 Edge2;` · The twin of <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-triangle/">`GpuTriangle`</a>, 36 bytes: a structured buffer packs `float3`s tightly.
