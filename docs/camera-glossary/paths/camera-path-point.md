---
layout: docs
legend: [method]
title: "Glossary: CameraPathPoint"
description: "The members of CameraPathPoint, in alphabetical order."
---

A point sampled from a camera path: where it is, which way the curve heads, the orientation there and how far along the path it lies.

A read-only struct, returned by <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#samplebypathdistance">`SampleByPathDistance`</a>. The [camera paths page](/docs/camera-paths/#sampling) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Fields

<h3 id="distanceunits"><code>DistanceUnits</code> <a class="ctx" href="/docs/camera-paths/#camerapathpoint-fields" title="DistanceUnits in context on the camera paths page" aria-label="DistanceUnits in context on the camera paths page">→</a></h3>

`float` · Read-only field. The distance along the path that was sampled, in world units from its start, after clamping to 0 to <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a>.

<h3 id="orientation"><code>Orientation</code> <a class="ctx" href="/docs/camera-paths/#camerapathpoint-fields" title="Orientation in context on the camera paths page" aria-label="Orientation in context on the camera paths page">→</a></h3>

`Quaternion` · Read-only field. The orientation there, turned from that of the waypoint before to that of the waypoint after, in proportion to the distance along the segment.

<h3 id="position"><code>Position</code> <a class="ctx" href="/docs/camera-paths/#camerapathpoint-fields" title="Position in context on the camera paths page" aria-label="Position in context on the camera paths page">→</a></h3>

`Vector3` · Read-only field. The point on the curve, in world coordinates.

<h3 id="tangent"><code>Tangent</code> <a class="ctx" href="/docs/camera-paths/#camerapathpoint-fields" title="Tangent in context on the camera paths page" aria-label="Tangent in context on the camera paths page">→</a></h3>

`Vector3` · Read-only field. The direction the curve heads there, a unit vector. `Vector3.Forward` where it has none, as on a path of one waypoint.

## Methods

<h3 id="camerapathpoint"><span class="method"><code>CameraPathPoint()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapathpoint-fields" title="CameraPathPoint() in context on the camera paths page" aria-label="CameraPathPoint() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path-point/#camerapathpoint">`CameraPathPoint(Vector3 position, Vector3 tangent, Quaternion orientation, float distanceUnits)`</a> · A point from its parts.

| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `Vector3` | The point, in world coordinates. |
| `tangent` | `Vector3` | The direction of the curve there. |
| `orientation` | `Quaternion` | The orientation there. |
| `distanceUnits` | `float` | The distance along the path. |
