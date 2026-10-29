---
layout: docs
legend: [method]
title: "Glossary: GBuffer.fxh"
description: "The functions of GBuffer.fxh, in alphabetical order."
---

Reading the G-buffer back in a shader: the position and the normal of the surface at a pixel, and the pixels a pass at a reduced resolution reads.

An HLSL header, copied to your build output at `Content/Effects/Lib/`: `#include "Lib/GBuffer.fxh"`. It undoes the encoding of a <a class="ref" href="/docs/ray-tracing-glossary/gpu/g-buffer/">`GBuffer`</a>'s targets in one place, so every pass that reads them agrees on where a surface is. The [G-buffer page](/docs/ray-tracing-gbuffer/#reading-it-back) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Functions

<h3 id="gbufferpixelof"><span class="method"><code>GBufferPixelOf()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbufferfxh-functions" title="GBufferPixelOf() in context on the G-buffer page" aria-label="GBufferPixelOf() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferpixelof">`int2 GBufferPixelOf(uint2 pixel, int pixelScale)`</a> · The G-buffer pixel a pass at 1 / `pixelScale` of the resolution reads for a pixel of its own: the top-left of the block it covers, `pixel * pixelScale`. Never an average of the block: across an edge, that is a surface that isn't there.

| Parameter | Type | Description |
| --- | --- | --- |
| `pixel` | `uint2` | The pass's pixel. |
| `pixelScale` | `int` | How many G-buffer pixels a pass pixel covers each way: 2 for half the resolution. |

<h3 id="gbufferviewnormal"><span class="method"><code>GBufferViewNormal()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbufferfxh-functions" title="GBufferViewNormal() in context on the G-buffer page" aria-label="GBufferViewNormal() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferviewnormal">`float3 GBufferViewNormal(float4 packed)`</a> · The view-space normal, unpacked from 0..1 and normalized again: eight bits a channel doesn't keep its length.

| Parameter | Type | Description |
| --- | --- | --- |
| `packed` | `float4` | The `Normal` target at the pixel. |

<h3 id="gbufferviewposition"><span class="method"><code>GBufferViewPosition()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbufferfxh-functions" title="GBufferViewPosition() in context on the G-buffer page" aria-label="GBufferViewPosition() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferviewposition">`float3 GBufferViewPosition(int2 pixel, float4 gBufferSize, float depth, float4x4 inverseProjection)`</a> · The view-space point of the surface at a pixel: on the line from the eye through the pixel's centre, where its distance in front of the camera is `depth`. Perspective projections only; an orthographic camera needs a function of your own, see [perspective only](/docs/ray-tracing-gbuffer/#perspective-only).

| Parameter | Type | Description |
| --- | --- | --- |
| `pixel` | `int2` | The G-buffer pixel. |
| `gBufferSize` | `float4` | The G-buffer's `(width, height, 1 / width, 1 / height)`. Only the last two are read. |
| `depth` | `float` | The `Depth` target at the pixel. 0, nothing drawn, gives the eye. |
| `inverseProjection` | `float4x4` | The inverse of the projection the prepass drew with. |

<h3 id="gbufferworldnormal"><span class="method"><code>GBufferWorldNormal()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbufferfxh-functions" title="GBufferWorldNormal() in context on the G-buffer page" aria-label="GBufferWorldNormal() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferworldnormal">`float3 GBufferWorldNormal(float4 packed, float4x4 inverseView)`</a> · The normal, taken through `inverseView` and normalized.

| Parameter | Type | Description |
| --- | --- | --- |
| `packed` | `float4` | The `Normal` target at the pixel. |
| `inverseView` | `float4x4` | The inverse of the view the prepass drew with. |

<h3 id="gbufferworldposition"><span class="method"><code>GBufferWorldPosition()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbufferfxh-functions" title="GBufferWorldPosition() in context on the G-buffer page" aria-label="GBufferWorldPosition() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferworldposition">`float3 GBufferWorldPosition(int2 pixel, float4 gBufferSize, float depth, float4x4 inverseProjection, float4x4 inverseView)`</a> · <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferviewposition">`GBufferViewPosition`</a>'s point, taken through `inverseView`: in the space the view matrix was made from, which for a traced pass has to be the space the instances were declared in.

| Parameter | Type | Description |
| --- | --- | --- |
| `pixel` | `int2` | The G-buffer pixel. |
| `gBufferSize` | `float4` | The G-buffer's `(width, height, 1 / width, 1 / height)`. |
| `depth` | `float` | The `Depth` target at the pixel. |
| `inverseProjection` | `float4x4` | The inverse of the projection the prepass drew with. |
| `inverseView` | `float4x4` | The inverse of the view it drew with. |

<h3 id="reducedgridposition"><span class="method"><code>ReducedGridPosition()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbufferfxh-functions" title="ReducedGridPosition() in context on the G-buffer page" aria-label="ReducedGridPosition() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#reducedgridposition">`float2 ReducedGridPosition(float2 fullResolution, int pixelScale)`</a> · Where a full-resolution position falls on the grid of a pass at 1 / `pixelScale` of the resolution, in the grid's texels, with the whole numbers on the pixels the pass computed: `(fullResolution - 0.5) / pixelScale`. The nearest texel is `floor(position + 0.5)`, and a bilinear weight is the fraction as it stands.

| Parameter | Type | Description |
| --- | --- | --- |
| `fullResolution` | `float2` | A position in G-buffer pixels, pixel `k`'s centre at `k + 0.5`: `SV_Position.xy`, or a UV times the G-buffer's size. |
| `pixelScale` | `int` | The pass's scale, as given to `GBufferPixelOf`. |
