---
layout: docs
legend: [prop, method]
title: "Glossary: AnimatedCameraController"
description: "The members of AnimatedCameraController, in alphabetical order."
---

Moves its camera along a camera path at a constant speed, with play, pause and seek, and eases the camera onto the path when attached.

`AnimatedCameraController` derives from [`BaseCameraController`](/docs/camera-glossary/cameras/base-camera-controller/) and has its members too. The [path playback page](/docs/camera-playback/) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="durationsec"><span class="prop"><code>DurationSec</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-properties" title="DurationSec in context on the path playback page" aria-label="DurationSec in context on the path playback page">→</a></h3>

`float` · The seconds of one run from end to end, so the speed is the path's <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a> over it. 8 by default. At 0 or less, the camera doesn't move along the path.

<h3 id="entryblenddurationsec"><span class="prop"><code>EntryBlendDurationSec</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-properties" title="EntryBlendDurationSec in context on the path playback page" aria-label="EntryBlendDurationSec in context on the path playback page">→</a></h3>

`float` · The seconds the camera takes to ease from its pose onto the path when the controller is attached, starting and ending gently. 2 by default; 0 or less jumps.

<h3 id="isplaying"><span class="prop"><code>IsPlaying</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-properties" title="IsPlaying in context on the path playback page" aria-label="IsPlaying in context on the path playback page">→</a></h3>

`bool` · Read-only. Whether the camera is moving along the path. `false` for a new controller, and again once a `Stop` path reaches its end.

<h3 id="openpathanimationmode"><span class="prop"><code>OpenPathAnimationMode</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-properties" title="OpenPathAnimationMode in context on the path playback page" aria-label="OpenPathAnimationMode in context on the path playback page">→</a></h3>

<a class="ref" href="/docs/camera-glossary/types/camera-animation-mode/">`CameraAnimationMode`</a> · What an open path does at its ends. `Stop` by default. A closed path always goes round.

<h3 id="path"><span class="prop"><code>Path</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-properties" title="Path in context on the path playback page" aria-label="Path in context on the path playback page">→</a></h3>

<a class="ref" href="/docs/camera-glossary/paths/camera-path/">`CameraPath`</a> · The path to follow. An empty path of its own by default. Throws `ArgumentNullException` for `null`.

<h3 id="pathdistance"><span class="prop"><code>PathDistance</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-properties" title="PathDistance in context on the path playback page" aria-label="PathDistance in context on the path playback page">→</a></h3>

`float` · Read-only. Where the camera is, as a distance along the path in world units. Set by <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#seek">`Seek`</a>, <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#seeknormalized">`SeekNormalized`</a> and, on attachment, <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#snaptonearestonentry">`SnapToNearestOnEntry`</a>.

<h3 id="snaptonearestonentry"><span class="prop"><code>SnapToNearestOnEntry</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-properties" title="SnapToNearestOnEntry in context on the path playback page" aria-label="SnapToNearestOnEntry in context on the path playback page">→</a></h3>

`bool` · Whether attaching starts from the point of the path nearest the camera; off, it starts from <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#pathdistance">`PathDistance`</a>. On by default.

## Methods

<h3 id="animatedcameracontroller"><span class="method"><code>AnimatedCameraController()</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-methods" title="AnimatedCameraController() in context on the path playback page" aria-label="AnimatedCameraController() in context on the path playback page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#animatedcameracontroller">`AnimatedCameraController()`</a> · A paused controller with an empty path, an 8-second duration, the `Stop` mode, a 2-second entry blend and <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#snaptonearestonentry">`SnapToNearestOnEntry`</a> on.

<h3 id="addwaypoint"><span class="method"><code>AddWaypoint()</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-methods" title="AddWaypoint() in context on the path playback page" aria-label="AddWaypoint() in context on the path playback page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#addwaypoint">`AddWaypoint(Camera camera, CameraWaypointOrientationMode mode = Fixed, Vector3? lookAt = null)`</a> · Adds a waypoint at the end of <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#path">`Path`</a>, at the camera's position. The controller doesn't need to be attached to that camera. Throws `ArgumentNullException` for a `null` camera.

| Parameter | Type | Description |
| --- | --- | --- |
| `camera` | <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> | The camera whose position, and for `Fixed` whose orientation, the waypoint takes. |
| `mode` | <a class="ref" href="/docs/camera-glossary/types/camera-waypoint-orientation-mode/">`CameraWaypointOrientationMode`</a> | `Fixed` keeps the camera's orientation, `LookAtTarget` faces `lookAt`, `TangentFollow` faces along the path. Default: `Fixed`. |
| `lookAt` | `Vector3?` | The point a `LookAtTarget` waypoint faces. Default: `null`, the origin. |

<h3 id="pause"><span class="method"><code>Pause()</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-methods" title="Pause() in context on the path playback page" aria-label="Pause() in context on the path playback page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#pause">`Pause()`</a> · Holds the camera where it is on the path; the controller still keeps it there.

<h3 id="play"><span class="method"><code>Play()</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-methods" title="Play() in context on the path playback page" aria-label="Play() in context on the path playback page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#play">`Play()`</a> · Starts moving along the path. At the end of an open path in the `Stop` mode, starts over from the beginning.

<h3 id="seek"><span class="method"><code>Seek()</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-methods" title="Seek() in context on the path playback page" aria-label="Seek() in context on the path playback page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#seek">`Seek(float pathDistance)`</a> · Moves to the distance along the path, clamped to 0 to its <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a>. The camera gets there at its next update.

| Parameter | Type | Description |
| --- | --- | --- |
| `pathDistance` | `float` | In world units from the start of the path. |

<h3 id="seeknormalized"><span class="method"><code>SeekNormalized()</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-methods" title="SeekNormalized() in context on the path playback page" aria-label="SeekNormalized() in context on the path playback page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#seeknormalized">`SeekNormalized(float value)`</a> · Moves to a fraction of the path's length.

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `float` | 0 for the start, 1 for the end; clamped to 0 to 1. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/camera-playback/#animatedcameracontroller-methods" title="Update() in context on the path playback page" aria-label="Update() in context on the path playback page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#update">`Update(float elapsedSeconds)`</a> · Override. Moves along the path while playing, eases in after an attachment, and sets the camera's position and orientation. Does nothing while the path has no waypoints. The camera calls it.

| Parameter | Type | Description |
| --- | --- | --- |
| `elapsedSeconds` | `float` | The seconds since the last update. |
