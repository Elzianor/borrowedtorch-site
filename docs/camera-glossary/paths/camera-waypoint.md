---
layout: docs
legend: [method]
title: "Glossary: CameraWaypoint"
description: "The members of CameraWaypoint, in alphabetical order."
---

A point a camera path passes through, the way the camera faces there, and how the camera eases into, out of and waits at it.

A struct of plain fields; the factories fill them for each mode and leave the easing and the hold off. The [camera paths page](/docs/camera-paths/#waypoints) shows it in context, with code, and its [easing and holds](/docs/camera-paths/#easing-and-holds) section how a run is timed.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Fields

<h3 id="easein"><code>EaseIn</code> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-fields" title="EaseIn in context on the camera paths page" aria-label="EaseIn in context on the camera paths page">→</a></h3>

<a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction?`</a> · How the camera leaves the waypoint: the curve it travels the first half of the next segment by, read as progress over time. An ease in such as <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in/">`QuadraticEaseIn`</a> starts it from rest; the half then takes as long as the curve needs to meet cruise speed, about twice the cruise time for a quadratic and at most eight times. `null` travels the half at cruise speed: the default, and what the factories give. Set the waypoint again after changing the curve's parameters, so the path retimes itself.

<h3 id="easeout"><code>EaseOut</code> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-fields" title="EaseOut in context on the camera paths page" aria-label="EaseOut in context on the camera paths page">→</a></h3>

<a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction?`</a> · How the camera arrives at the waypoint: the curve it travels the second half of the segment before by, read as progress over time. An ease out such as <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-out/">`QuadraticEaseOut`</a> brings it to rest here; the half takes as long as <a class="ref" href="#easein">`EaseIn`</a>'s would. `null` travels the half at cruise speed: the default, and what the factories give.

<h3 id="holdsec"><code>HoldSec</code> <a class="ctx" href="/docs/camera-paths/#camerawaypoint-fields" title="HoldSec in context on the camera paths page" aria-label="HoldSec in context on the camera paths page">→</a></h3>

`float` · The seconds the camera waits at the waypoint before it leaves: at the first waypoint before it sets off, at the last of an open path before the run ends. Plain seconds, which the cruise speed doesn't change. 0, the default, passes straight through; a negative or non-finite value counts as 0.

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
