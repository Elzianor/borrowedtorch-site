---
layout: docs
legend: [prop, method]
title: "Glossary: FabricStroke"
description: "The members of FabricStroke, in alphabetical order."
---

A knife's drag, recorded against one captured pose: each ray's nearest layer, or its miss, in the order the rays came.

A sealed class. Capture a surface at the press, <a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-stroke/#add">`Add`</a> the cursor's ray every frame the button is held, drawing the preview from the hit it returns, and hand the stroke to <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Fabric.Cut`</a> on release. The cut is made from the samples themselves, never picked again, so it lands exactly where the preview showed it however far the cloth has blown since the press. Misses are kept in their place, so the cut can tell where the knife left the cloth and where it came back. Not thread-safe: one gesture, one thread, though the surface under it may be shared. The [picking page](/docs/fabric-simulation-picking/#fabricstroke-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="count"><span class="prop"><code>Count</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricstroke-members" title="Count in context on the picking page" aria-label="Count in context on the picking page">→</a></h3>

`int` · Read-only. The samples recorded so far, misses included.

<h3 id="surface"><span class="prop"><code>Surface</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricstroke-members" title="Surface in context on the picking page" aria-label="Surface in context on the picking page">→</a></h3>

<a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-surface/">`FabricSurface`</a> · Read-only. The pose every ray of the stroke is picked against, given to the constructor. `Cut` throws when it comes from another sheet, or from this one before its last <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>.

## Methods

<h3 id="fabricstroke"><span class="method"><code>FabricStroke()</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricstroke-members" title="FabricStroke() in context on the picking page" aria-label="FabricStroke() in context on the picking page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-stroke/#fabricstroke">`FabricStroke(FabricSurface surface)`</a> · An empty stroke over a pose. Throws `ArgumentNullException` for a `null` surface.

| Parameter | Type | Description |
| --- | --- | --- |
| `surface` | <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-surface/">`FabricSurface`</a> | From <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#capturesurface">`Fabric.CaptureSurface`</a>, captured at the press. |

<h3 id="add"><span class="method"><code>Add()</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricstroke-members" title="Add() in context on the picking page" aria-label="Add() in context on the picking page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-stroke/#add">`Add(Ray ray, out FabricSurfaceHit hit)`</a> · Returns `bool`: whether the ray hit the cloth. Picks the ray's nearest layer, a blade's, with <a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-surface/#tryraycast">`TryRaycast`</a>, and records it, or the miss, as the stroke's next sample. Each ray is picked once, here, for both the preview and the cut.

| Parameter | Type | Description |
| --- | --- | --- |
| `ray` | `Ray` | The cursor's ray in world space, unprojected through your own camera; any direction length. |
| `hit` | <code>out <a href="/docs/fabric-simulation-glossary/cuts/fabric-surface-hit/">FabricSurfaceHit</a></code> | The hit to draw the preview from; `default` on a miss. |

<h3 id="clear"><span class="method"><code>Clear()</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricstroke-members" title="Clear() in context on the picking page" aria-label="Clear() in context on the picking page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-stroke/#clear">`Clear()`</a> · Forgets every sample and keeps the surface: a cancelled drag, started again over the same capture.
