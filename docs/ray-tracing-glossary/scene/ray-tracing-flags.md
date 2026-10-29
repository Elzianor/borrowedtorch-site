---
layout: docs
title: "Glossary: RayTracingFlags"
description: "The values of RayTracingFlags."
---

The queries an instance takes part in, and the ones a query asks for.

A set of flags: the values combine.

An enum, in the namespace `BorrowedTorch.RayTracing`: the type of <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas-instance/#flags">`Flags`</a> and of a query's mask. A query sees only the instances that carry every flag in its mask. The GPU reads the same bits in <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#flags">`Flags`</a>, and <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/">`RayTraversal.fxh`</a> names two of them. The [scene page](/docs/ray-tracing-scene/#flags) shows it in context, with code.

## Values

<h3 id="none"><code>None</code> <a class="ctx" href="/docs/ray-tracing-scene/#raytracingflags-values" title="None in context on the scene page" aria-label="None in context on the scene page">→</a></h3>

0. No flags. As a mask, every instance is seen: the default of <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#intersect">`Intersect`</a> and <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#intersectany">`IntersectAny`</a>. An instance declared with it is seen only by queries with no mask.

<h3 id="castsshadow"><code>CastsShadow</code> <a class="ctx" href="/docs/ray-tracing-scene/#raytracingflags-values" title="CastsShadow in context on the scene page" aria-label="CastsShadow in context on the scene page">→</a></h3>

1. Blocks shadow rays. <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rt_flag_casts_shadow">`RT_FLAG_CASTS_SHADOW`</a> on the GPU.

<h3 id="visibletogi"><code>VisibleToGI</code> <a class="ctx" href="/docs/ray-tracing-scene/#raytracingflags-values" title="VisibleToGI in context on the scene page" aria-label="VisibleToGI in context on the scene page">→</a></h3>

2. Takes part in indirect light: bounced light, reflections, traced ambient occlusion. <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/#rt_flag_visible_to_gi">`RT_FLAG_VISIBLE_TO_GI`</a> on the GPU.

<h3 id="pickable"><code>Pickable</code> <a class="ctx" href="/docs/ray-tracing-scene/#raytracingflags-values" title="Pickable in context on the scene page" aria-label="Pickable in context on the scene page">→</a></h3>

4. Can be picked by a ray from the cursor. For the CPU: picking never runs on the GPU, and `RayTraversal.fxh` has no name for it.

<h3 id="default"><code>Default</code> <a class="ctx" href="/docs/ray-tracing-scene/#raytracingflags-values" title="Default in context on the scene page" aria-label="Default in context on the scene page">→</a></h3>

7, `CastsShadow | VisibleToGI | Pickable`. What <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#add">`Tlas.Add`</a> gives an instance unless told otherwise.
