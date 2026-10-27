---
layout: docs
legend: [method]
title: "Glossary: CameraPathGizmo"
description: "The members of CameraPathGizmo, in alphabetical order."
---

An orientation frame on a camera path: a position and the camera's three axes there.

A read-only struct. The [drawing a path page](/docs/camera-drawing/#the-geometry) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Fields

<h3 id="forward"><code>Forward</code> <a class="ctx" href="/docs/camera-drawing/#camerapathgizmo-fields" title="Forward in context on the drawing a path page" aria-label="Forward in context on the drawing a path page">→</a></h3>

`Vector3` · Read-only field. The way the camera faces there, its local −Z, as a unit vector in world space.

<h3 id="position"><code>Position</code> <a class="ctx" href="/docs/camera-drawing/#camerapathgizmo-fields" title="Position in context on the drawing a path page" aria-label="Position in context on the drawing a path page">→</a></h3>

`Vector3` · Read-only field. Where the frame is, in world coordinates.

<h3 id="right"><code>Right</code> <a class="ctx" href="/docs/camera-drawing/#camerapathgizmo-fields" title="Right in context on the drawing a path page" aria-label="Right in context on the drawing a path page">→</a></h3>

`Vector3` · Read-only field. The camera's right there, its local +X, as a unit vector in world space.

<h3 id="up"><code>Up</code> <a class="ctx" href="/docs/camera-drawing/#camerapathgizmo-fields" title="Up in context on the drawing a path page" aria-label="Up in context on the drawing a path page">→</a></h3>

`Vector3` · Read-only field. The camera's up there, its local +Y, as a unit vector in world space.

## Methods

<h3 id="camerapathgizmo"><span class="method"><code>CameraPathGizmo()</code></span> <a class="ctx" href="/docs/camera-drawing/#camerapathgizmo-fields" title="CameraPathGizmo() in context on the drawing a path page" aria-label="CameraPathGizmo() in context on the drawing a path page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path-gizmo/#camerapathgizmo">`CameraPathGizmo(Vector3 position, Vector3 right, Vector3 up, Vector3 forward)`</a> · A frame from its position and axes, for geometry of your own.

| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `Vector3` | Where the frame is. |
| `right` | `Vector3` | Its local +X. |
| `up` | `Vector3` | Its local +Y. |
| `forward` | `Vector3` | Its local −Z, the way it faces. |
