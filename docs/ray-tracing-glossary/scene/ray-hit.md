---
layout: docs
legend: [prop, method]
title: "Glossary: RayHit"
description: "The members of RayHit, in alphabetical order."
---

What a closest hit found: how far along the ray, which instance, which triangle, and where in it.

A struct of public fields, filled by <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#intersect">`Tlas.Intersect`</a>. The [CPU queries page](/docs/ray-tracing-queries/#what-a-hit-holds) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="hashit"><span class="prop"><code>HasHit</code></span> <a class="ctx" href="/docs/ray-tracing-queries/#rayhit-members" title="HasHit in context on the CPU queries page" aria-label="HasHit in context on the CPU queries page">→</a></h3>

`bool` · Read-only. Something was hit: <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-hit/#instanceindex">`InstanceIndex`</a> isn't −1.

## Fields

<h3 id="distance"><code>Distance</code> <a class="ctx" href="/docs/ray-tracing-queries/#rayhit-members" title="Distance in context on the CPU queries page" aria-label="Distance in context on the CPU queries page">→</a></h3>

`float` · The ray parameter of the hit: the point is `ray.Position + ray.Direction * Distance`. For a direction of length 1 it is the distance in world units, and for one of length 2 half of it. The maximum distance asked for when nothing was hit.

<h3 id="instanceid"><code>InstanceId</code> <a class="ctx" href="/docs/ray-tracing-queries/#rayhit-members" title="InstanceId in context on the CPU queries page" aria-label="InstanceId in context on the CPU queries page">→</a></h3>

`ulong` · The id the instance hit was declared with, in <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#add">`Tlas.Add`</a>. Means nothing unless <a class="ref prop" href="/docs/ray-tracing-glossary/scene/ray-hit/#hashit">`HasHit`</a>.

<h3 id="instanceindex"><code>InstanceIndex</code> <a class="ctx" href="/docs/ray-tracing-queries/#rayhit-members" title="InstanceIndex in context on the CPU queries page" aria-label="InstanceIndex in context on the CPU queries page">→</a></h3>

`int` · The instance's place in <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#instances">`Tlas.Instances`</a>, which has its BLAS and its matrix; −1 for no hit. Good until the next <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#beginupdate">`BeginUpdate`</a>.

<h3 id="triangleindex"><code>TriangleIndex</code> <a class="ctx" href="/docs/ray-tracing-queries/#rayhit-members" title="TriangleIndex in context on the CPU queries page" aria-label="TriangleIndex in context on the CPU queries page">→</a></h3>

`int` · The triangle hit, in the instance's mesh, as <a class="ref method" href="/docs/ray-tracing-glossary/scene/i-triangle-mesh/#gettriangle">`GetTriangle`</a> numbers it; −1 for no hit.

<h3 id="u"><code>U</code> <a class="ctx" href="/docs/ray-tracing-queries/#rayhit-members" title="U in context on the CPU queries page" aria-label="U in context on the CPU queries page">→</a></h3>

`float` · The hit's barycentric weight of the triangle's second corner, `v1`. Not a texture coordinate: with <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-hit/#v">`V`</a>, where in the triangle the ray landed, `v0 * (1 - U - V) + v1 * U + v2 * V`. The same weights blend anything else the corners carry, see [attributes at a hit](/docs/ray-tracing-queries/#attributes-at-a-hit).

<h3 id="v"><code>V</code> <a class="ctx" href="/docs/ray-tracing-queries/#rayhit-members" title="V in context on the CPU queries page" aria-label="V in context on the CPU queries page">→</a></h3>

`float` · The weight of the triangle's third corner, `v2`. See <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-hit/#u">`U`</a>.

## Methods

<h3 id="none"><span class="method"><code>None()</code></span> <a class="ctx" href="/docs/ray-tracing-queries/#rayhit-members" title="None() in context on the CPU queries page" aria-label="None() in context on the CPU queries page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/ray-hit/#none">`None(float maxDistance = float.MaxValue)`</a> · Static. Returns `RayHit`: a hit of nothing, at the distance given, its two indexes −1. What <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#intersect">`Intersect`</a> hands back when it finds nothing.

| Parameter | Type | Description |
| --- | --- | --- |
| `maxDistance` | `float` | The `Distance` it carries. Default: `float.MaxValue`. |
