---
layout: docs
legend: [method]
title: "Glossary: CameraPathGeometryBuffers"
description: "The members of CameraPathGeometryBuffers, in alphabetical order."
---

The geometry to draw a camera path: a line along the curve, the waypoints and orientation frames, as lists in world coordinates.

A sealed class. The [drawing a path page](/docs/camera-drawing/#the-geometry) shows it in context, with code. A path keeps one in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#visualgeometrybuffers">`VisualGeometryBuffers`</a>; create your own for <a class="ref method" href="/docs/camera-glossary/paths/camera-path-visualizer/#build">`Build`</a>.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Fields

<h3 id="gizmos"><code>Gizmos</code> <a class="ctx" href="/docs/camera-drawing/#camerapathgeometrybuffers-members" title="Gizmos in context on the drawing a path page" aria-label="Gizmos in context on the drawing a path page">→</a></h3>

`List<CameraPathGizmo>` · Read-only field. Orientation frames at even steps of distance, <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#gizmocount">`GizmoCount`</a> of them: on an open path from the start to the end, on a closed one evenly round.

<h3 id="polyline"><code>Polyline</code> <a class="ctx" href="/docs/camera-drawing/#camerapathgeometrybuffers-members" title="Polyline in context on the drawing a path page" aria-label="Polyline in context on the drawing a path page">→</a></h3>

`List<Vector3>` · Read-only field. Points along the curve, in order; on a closed path the last is the first again. Empty with fewer than two waypoints.

<h3 id="waypointgizmos"><code>WaypointGizmos</code> <a class="ctx" href="/docs/camera-drawing/#camerapathgeometrybuffers-members" title="WaypointGizmos in context on the drawing a path page" aria-label="WaypointGizmos in context on the drawing a path page">→</a></h3>

`List<CameraPathGizmo>` · Read-only field. One orientation frame at each waypoint, with the orientation it resolves to.

<h3 id="waypoints"><code>Waypoints</code> <a class="ctx" href="/docs/camera-drawing/#camerapathgeometrybuffers-members" title="Waypoints in context on the drawing a path page" aria-label="Waypoints in context on the drawing a path page">→</a></h3>

`List<Vector3>` · Read-only field. The position of each waypoint, in order.

## Methods

<h3 id="camerapathgeometrybuffers"><span class="method"><code>CameraPathGeometryBuffers()</code></span> <a class="ctx" href="/docs/camera-drawing/#camerapathgeometrybuffers-members" title="CameraPathGeometryBuffers() in context on the drawing a path page" aria-label="CameraPathGeometryBuffers() in context on the drawing a path page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#camerapathgeometrybuffers">`CameraPathGeometryBuffers()`</a> · Empty buffers, for <a class="ref method" href="/docs/camera-glossary/paths/camera-path-visualizer/#build">`Build`</a>.

<h3 id="clear"><span class="method"><code>Clear()</code></span> <a class="ctx" href="/docs/camera-drawing/#camerapathgeometrybuffers-members" title="Clear() in context on the drawing a path page" aria-label="Clear() in context on the drawing a path page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#clear">`Clear()`</a> · Empties the four lists.
