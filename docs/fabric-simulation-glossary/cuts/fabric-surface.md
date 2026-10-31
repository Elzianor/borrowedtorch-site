---
layout: docs
legend: [prop, method]
title: "Glossary: FabricSurface"
description: "The members of FabricSurface, in alphabetical order."
---

One pose of the sheet to pick against: the triangles the renderer draws, lips and seams included, frozen where they stood. It turns a world-space ray into the flat-sheet point <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Fabric.Cut`</a> takes, which on crumpled cloth only the current triangles can tell.

A sealed class with no public constructor: <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#capturesurface">`Fabric.CaptureSurface`</a> makes one, at the cost of a GPU readback, so capture one per gesture rather than per ray; a <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-stroke/">`FabricStroke`</a> holds one for a knife's drag. It picks against <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createcutmesh">`CreateCutMesh`</a>'s triangles, so what can be picked is exactly what that mesh draws. The capture also files the triangles into a uniform grid, so a ray costs the cloth it passes near rather than the whole sheet. Nothing changes after that: any number of threads may pick against one surface at once, and it keeps answering for the pose it was captured in however far the sheet has moved on. Cameras stay out of it: unproject a screen point with your own view and projection, and pass the ray. The [picking page](/docs/fabric-simulation-picking/#fabricsurface-members) shows it in context, with code.

A surface belongs to the sheet and the build it was captured from: <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Fabric.Cut`</a> throws for one from another sheet or from before the last <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>. Its own methods don't check, so hits gathered with them are yours to drop when <a class="ref event" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuilt">`Rebuilt`</a> is raised.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="trianglecount"><span class="prop"><code>TriangleCount</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricsurface-members" title="TriangleCount in context on the picking page" aria-label="TriangleCount in context on the picking page">→</a></h3>

`int` · Read-only. The triangles in the pose, as the cut mesh had them when it was captured. Triangles with a corner that has diverged to infinity or NaN are counted, but never picked: such a point has nowhere to be.

## Methods

<h3 id="raycast"><span class="method"><code>Raycast()</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricsurface-members" title="Raycast() in context on the picking page" aria-label="Raycast() in context on the picking page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-surface/#raycast">`Raycast(Ray ray, Span<FabricSurfaceHit> hits)`</a> · Returns `int`: how many hits it wrote. Every layer of cloth the ray passes through, nearest first. A crumpled sheet stacks several layers under one point, a hard press eight or more, and which of them a knife takes is yours to decide: the nearest is a blade, all of them are scissors, and <a class="ref prop" href="/docs/fabric-simulation-glossary/cuts/fabric-surface-hit/#distance">`Distance`</a> carries the depth for anything in between. Each layer counts once, even where the ray threads an edge or a corner two triangles share, or the closed lips of a cut. Triangles are hit from either side. The ray runs from its origin forward with no far end, and its direction need not be of length 1. When the span is full, the furthest hits are dropped: it keeps the nearest `hits.Length`. A ray with no direction, zero or not finite, or an origin that isn't finite meets nothing, and so does any ray when the span is empty or nothing in the pose is pickable.

| Parameter | Type | Description |
| --- | --- | --- |
| `ray` | `Ray` | In world space, from your camera: `Viewport.Unproject` of a screen point at depth 0 and 1, the direction the second minus the first. |
| `hits` | <code>Span&lt;<a href="/docs/fabric-simulation-glossary/cuts/fabric-surface-hit/">FabricSurfaceHit</a>&gt;</code> | Filled from the start, nearest first; its length is the most layers wanted. A `stackalloc` of 16 covers a crushed pile. |

<h3 id="tryraycast"><span class="method"><code>TryRaycast()</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricsurface-members" title="TryRaycast() in context on the picking page" aria-label="TryRaycast() in context on the picking page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-surface/#tryraycast">`TryRaycast(Ray ray, out FabricSurfaceHit hit)`</a> · Returns `bool`: whether the ray meets the cloth. The nearest layer alone, a blade's: <a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-surface/#raycast">`Raycast`</a> with room for one hit. What <a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-stroke/#add">`FabricStroke.Add`</a> picks with.

| Parameter | Type | Description |
| --- | --- | --- |
| `ray` | `Ray` | In world space; any direction length. |
| `hit` | <code>out <a href="/docs/fabric-simulation-glossary/cuts/fabric-surface-hit/">FabricSurfaceHit</a></code> | The nearest layer's hit, or `default`, every value 0, on a miss. |
