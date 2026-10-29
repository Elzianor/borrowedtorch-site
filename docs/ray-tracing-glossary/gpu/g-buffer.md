---
layout: docs
legend: [prop, method]
title: "Glossary: GBuffer"
description: "The members of GBuffer, in alphabetical order."
---

The two screen-sized targets a traced pass starts from: the linear depth and the normal of the nearest surface at every pixel.

A sealed class that implements `IDisposable`. Your prepass fills it, between <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#bindandclear">`BindAndClear`</a> and <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#unbind">`Unbind`</a>, in the encoding <a class="ref" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/">`GBuffer.fxh`</a> reads back. The [G-buffer page](/docs/ray-tracing-gbuffer/#filling-it) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="contentversion"><span class="prop"><code>ContentVersion</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-state" title="ContentVersion in context on the G-buffer page" aria-label="ContentVersion in context on the G-buffer page">→</a></h3>

`int` · Read-only. Moves at every <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#unbind">`Unbind`</a> that ends a prepass, and not at a <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#confirmcurrent">`ConfirmCurrent`</a>: a pass tells new surfaces from the same ones by it.

<h3 id="depth"><span class="prop"><code>Depth</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-targets" title="Depth in context on the G-buffer page" aria-label="Depth in context on the G-buffer page">→</a></h3>

`RenderTarget2D?` · Read-only. The nearest surface's distance in front of the camera, `-PositionVS.z`, as a 32-bit float, `SurfaceFormat.Single`; 0 where nothing was drawn. It has a 24-bit depth buffer for the prepass's depth test, and keeps its contents when bound. `null` until the first <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize`</a>.

<h3 id="height"><span class="prop"><code>Height</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-targets" title="Height in context on the G-buffer page" aria-label="Height in context on the G-buffer page">→</a></h3>

`int` · Read-only. The targets' height in pixels; 0 before the first <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize`</a>.

<h3 id="iscurrent"><span class="prop"><code>IsCurrent</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-state" title="IsCurrent in context on the G-buffer page" aria-label="IsCurrent in context on the G-buffer page">→</a></h3>

`bool` · Read-only. The targets hold this frame's surfaces: the prepass drew them, or <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#confirmcurrent">`ConfirmCurrent`</a> said they already did. False after a resize to a new size, after <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#invalidate">`Invalidate`</a> and after <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#dispose">`Dispose`</a>. Gate every pass that reads the G-buffer on it, not on <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#isready">`IsReady`</a>.

<h3 id="isdisposed"><span class="prop"><code>IsDisposed</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-lifetime" title="IsDisposed in context on the G-buffer page" aria-label="IsDisposed in context on the G-buffer page">→</a></h3>

`bool` · Read-only. <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#dispose">`Dispose`</a> has been called.

<h3 id="isready"><span class="prop"><code>IsReady</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-targets" title="IsReady in context on the G-buffer page" aria-label="IsReady in context on the G-buffer page">→</a></h3>

`bool` · Read-only. The targets exist. Says nothing of what is in them: see <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#iscurrent">`IsCurrent`</a>.

<h3 id="normal"><span class="prop"><code>Normal</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-targets" title="Normal in context on the G-buffer page" aria-label="Normal in context on the G-buffer page">→</a></h3>

`RenderTarget2D?` · Read-only. The nearest surface's view-space normal packed into 0..1, `normal * 0.5 + 0.5`, 8 bits a channel, `SurfaceFormat.Color`. No depth buffer of its own. `null` until the first <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize`</a>.

<h3 id="width"><span class="prop"><code>Width</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-targets" title="Width in context on the G-buffer page" aria-label="Width in context on the G-buffer page">→</a></h3>

`int` · Read-only. The targets' width in pixels; 0 before the first <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize`</a>.

## Methods

<h3 id="gbuffer"><span class="method"><code>GBuffer()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-targets" title="GBuffer() in context on the G-buffer page" aria-label="GBuffer() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#gbuffer">`GBuffer(GraphicsDevice graphicsDevice)`</a> · A G-buffer on the device, with no targets until the first <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `graphicsDevice` | `GraphicsDevice` | The device the targets are made on. |

<h3 id="bindandclear"><span class="method"><code>BindAndClear()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-prepass-methods" title="BindAndClear() in context on the G-buffer page" aria-label="BindAndClear() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#bindandclear">`BindAndClear()`</a> · Binds both targets and clears them: the distance and the normal to 0, "nothing here", and the depth buffer to 1. Throws `InvalidOperationException` before the first <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize`</a>: with no targets bound, the clear would wipe the back buffer.

<h3 id="confirmcurrent"><span class="method"><code>ConfirmCurrent()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-state" title="ConfirmCurrent() in context on the G-buffer page" aria-label="ConfirmCurrent() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#confirmcurrent">`ConfirmCurrent()`</a> · The targets already hold this frame's surfaces, and weren't redrawn: makes the G-buffer current, if it has targets, without moving <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#contentversion">`ContentVersion`</a>.

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-lifetime" title="Dispose() in context on the G-buffer page" aria-label="Dispose() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#dispose">`Dispose()`</a> · Frees both targets; the G-buffer is no longer current. A second call does nothing.

<h3 id="invalidate"><span class="method"><code>Invalidate()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-state" title="Invalidate() in context on the G-buffer page" aria-label="Invalidate() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#invalidate">`Invalidate()`</a> · This frame's surfaces couldn't be drawn, the prepass's effect missing say: the G-buffer isn't current, and the passes that gate on it skip the frame.

<h3 id="resize"><span class="method"><code>Resize()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-prepass-methods" title="Resize() in context on the G-buffer page" aria-label="Resize() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize(int width, int height)`</a> · Makes the targets at this size, or new ones at a new size, and does nothing when they already have it: hand it the viewport's size every frame. New targets aren't current until the next prepass.

| Parameter | Type | Description |
| --- | --- | --- |
| `width` | `int` | The width in pixels. Less than 1 counts as 1. |
| `height` | `int` | The height in pixels. Less than 1 counts as 1. |

<h3 id="unbind"><span class="method"><code>Unbind()</code></span> <a class="ctx" href="/docs/ray-tracing-gbuffer/#gbuffer-prepass-methods" title="Unbind() in context on the G-buffer page" aria-label="Unbind() in context on the G-buffer page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#unbind">`Unbind()`</a> · Binds the back buffer. What was drawn since <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#bindandclear">`BindAndClear`</a> is this frame's G-buffer: it is current, and <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#contentversion">`ContentVersion`</a> moves. With no targets, it isn't current and nothing moves. A game that draws into a render target of its own sets it again after.
