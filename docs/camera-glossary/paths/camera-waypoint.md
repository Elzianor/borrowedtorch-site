---
layout: docs
legend: [method]
title: "Glossary: CameraWaypoint"
description: "The members of CameraWaypoint, in alphabetical order."
---

A point a camera path passes through, and the way the camera faces there.

A struct of plain fields; the factories fill them for each mode. The [camera paths page](/docs/camera-paths/#waypoints) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Fields

<h3 id="lookattarget"><code>LookAtTarget</code> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-fields" title="LookAtTarget in context on the camera paths page" aria-label="LookAtTarget in context on the camera paths page">→</a></h3>

`Vector3` · The point a `LookAtTarget` waypoint faces, in world coordinates. The origin from the other factories.

<h3 id="orientation"><code>Orientation</code> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-fields" title="Orientation in context on the camera paths page" aria-label="Orientation in context on the camera paths page">→</a></h3>

`Quaternion` · The facing of a `Fixed` waypoint, normalized when used; a zero quaternion, as in `default(CameraWaypoint)`, faces −Z. Identity from the other factories.

<h3 id="orientationmode"><code>OrientationMode</code> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-fields" title="OrientationMode in context on the camera paths page" aria-label="OrientationMode in context on the camera paths page">→</a></h3>

<a class="ref" href="/docs/camera-glossary/types/camera-waypoint-orientation-mode/">`CameraWaypointOrientationMode`</a> · How the waypoint's facing is decided. `Fixed` in `default(CameraWaypoint)`.

<h3 id="position"><code>Position</code> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-fields" title="Position in context on the camera paths page" aria-label="Position in context on the camera paths page">→</a></h3>

`Vector3` · Where the waypoint is, in world coordinates. The curve passes through it.

## Methods

<h3 id="createfixed"><span class="method"><code>CreateFixed()</code></span> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-factory-methods" title="CreateFixed() in context on the camera paths page" aria-label="CreateFixed() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-waypoint/#createfixed">`CreateFixed(Vector3 position, Quaternion orientation)`</a> · Static. A `Fixed` waypoint.

| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `Vector3` | Where the waypoint is. |
| `orientation` | `Quaternion` | The way the camera faces there. |

<h3 id="createfixedfromcamera"><span class="method"><code>CreateFixedFromCamera()</code></span> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-factory-methods" title="CreateFixedFromCamera() in context on the camera paths page" aria-label="CreateFixedFromCamera() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-waypoint/#createfixedfromcamera">`CreateFixedFromCamera(Camera camera)`</a> · Static. A `Fixed` waypoint at the camera's position, with its orientation. Throws `ArgumentNullException` for `null`.

| Parameter | Type | Description |
| --- | --- | --- |
| `camera` | <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> | The camera to copy. |

<h3 id="createlookattarget"><span class="method"><code>CreateLookAtTarget()</code></span> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-factory-methods" title="CreateLookAtTarget() in context on the camera paths page" aria-label="CreateLookAtTarget() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-waypoint/#createlookattarget">`CreateLookAtTarget(Vector3 position, Vector3 lookAtTarget)`</a> · Static. A `LookAtTarget` waypoint, facing the target with no roll against the path's <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `Vector3` | Where the waypoint is. |
| `lookAtTarget` | `Vector3` | The point the camera faces there. |

<h3 id="createtangentfollow"><span class="method"><code>CreateTangentFollow()</code></span> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-factory-methods" title="CreateTangentFollow() in context on the camera paths page" aria-label="CreateTangentFollow() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-waypoint/#createtangentfollow">`CreateTangentFollow(Vector3 position)`</a> · Static. A `TangentFollow` waypoint, facing the way the path heads there with no roll against the path's <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `Vector3` | Where the waypoint is. |
