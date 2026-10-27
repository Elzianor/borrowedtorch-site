---
layout: docs
legend: [prop, method]
title: "Glossary: Camera"
description: "The members of Camera, in alphabetical order."
---

A position and an orientation in the world, with the view and projection matrices to draw what it sees, rays for picking and a floating origin for large worlds.

A class. The [quick start guide](/docs/camera/#setting-up-the-camera) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="aspectratio"><span class="prop"><code>AspectRatio</code></span> <a class="ctx" href="/docs/camera-pose/#camera-projection-properties" title="AspectRatio in context on the pose and projection page" aria-label="AspectRatio in context on the pose and projection page">→</a></h3>

`float` · The width of the view over its height. 4/3 by default; set it from the viewport. Throws `ArgumentOutOfRangeException` for a value that isn't positive and finite.

<h3 id="controller"><span class="prop"><code>Controller</code></span> <a class="ctx" href="/docs/camera-controllers/#camera-controller-property" title="Controller in context on the controllers page" aria-label="Controller in context on the controllers page">→</a></h3>

<a class="ref" href="/docs/camera-glossary/cameras/base-camera-controller/">`BaseCameraController?`</a> · The controller driving the camera, or `null` to drive it by hand. Assigning one detaches the previous controller, takes the new one from any other camera it drives, and lets it take over this camera's state once. Assigning the one already attached does nothing.

<h3 id="farplane"><span class="prop"><code>FarPlane</code></span> <a class="ctx" href="/docs/camera-pose/#camera-projection-properties" title="FarPlane in context on the pose and projection page" aria-label="FarPlane in context on the pose and projection page">→</a></h3>

`float` · The distance of the far clip plane. 1000 by default. Throws `ArgumentOutOfRangeException` for a value that isn't positive and finite; <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a> throws `InvalidOperationException` when it isn't greater than <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#nearplane">`NearPlane`</a>.

<h3 id="fieldofviewdegrees"><span class="prop"><code>FieldOfViewDegrees</code></span> <a class="ctx" href="/docs/camera-pose/#camera-projection-properties" title="FieldOfViewDegrees in context on the pose and projection page" aria-label="FieldOfViewDegrees in context on the pose and projection page">→</a></h3>

`float` · The vertical field of view, in degrees. 45 by default. Throws `ArgumentOutOfRangeException` unless it is strictly between 0 and 180.

<h3 id="forward"><span class="prop"><code>Forward</code></span> <a class="ctx" href="/docs/camera-pose/#camera-pose-properties" title="Forward in context on the pose and projection page" aria-label="Forward in context on the pose and projection page">→</a></h3>

`Vector3` · Read-only. The direction the camera faces, its local −Z, as a unit vector in world space. Follows <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#orientation">`Orientation`</a> at once, before the next update.

<h3 id="nearplane"><span class="prop"><code>NearPlane</code></span> <a class="ctx" href="/docs/camera-pose/#camera-projection-properties" title="NearPlane in context on the pose and projection page" aria-label="NearPlane in context on the pose and projection page">→</a></h3>

`float` · The distance of the near clip plane. 0.1 by default. Throws `ArgumentOutOfRangeException` for a value that isn't positive and finite; <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a> throws `InvalidOperationException` when it isn't less than <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#farplane">`FarPlane`</a>.

<h3 id="offset"><span class="prop"><code>Offset</code></span> <a class="ctx" href="/docs/camera-picking/#camera-floating-origin-properties" title="Offset in context on the picking and large worlds page" aria-label="Offset in context on the picking and large worlds page">→</a></h3>

`Vector3` · Read-only. The floating origin: a whole number of 1000-unit cells on each axis, moved by <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a> once the camera is more than a cell from it. Subtract it from world positions before drawing.

<h3 id="orientation"><span class="prop"><code>Orientation</code></span> <a class="ctx" href="/docs/camera-pose/#camera-pose-properties" title="Orientation in context on the pose and projection page" aria-label="Orientation in context on the pose and projection page">→</a></h3>

`Quaternion` · The rotation from the camera's own axes to the world's, stored normalized. Identity, looking down −Z, for `Camera()`. Throws `ArgumentException` for a quaternion of length zero, or with a `NaN` or an infinite component.

<h3 id="position"><span class="prop"><code>Position</code></span> <a class="ctx" href="/docs/camera-pose/#camera-pose-properties" title="Position in context on the pose and projection page" aria-label="Position in context on the pose and projection page">→</a></h3>

`Vector3` · Where the camera is, in world coordinates. The origin for `Camera()`.

<h3 id="projection"><span class="prop"><code>Projection</code></span> <a class="ctx" href="/docs/camera-pose/#camera-matrix-properties" title="Projection in context on the pose and projection page" aria-label="Projection in context on the pose and projection page">→</a></h3>

`Matrix` · Read-only. The perspective projection of the field of view, the aspect ratio and the clip planes, as of the last <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a>.

<h3 id="rebasedposition"><span class="prop"><code>RebasedPosition</code></span> <a class="ctx" href="/docs/camera-picking/#camera-floating-origin-properties" title="RebasedPosition in context on the picking and large worlds page" aria-label="RebasedPosition in context on the picking and large worlds page">→</a></h3>

`Vector3` · Read-only. <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#position">`Position`</a> minus <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#offset">`Offset`</a>: where the camera is in the coordinates the view matrix is built in.

<h3 id="right"><span class="prop"><code>Right</code></span> <a class="ctx" href="/docs/camera-pose/#camera-pose-properties" title="Right in context on the pose and projection page" aria-label="Right in context on the pose and projection page">→</a></h3>

`Vector3` · Read-only. The camera's right, its local +X, as a unit vector in world space. Follows <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#orientation">`Orientation`</a> at once.

<h3 id="up"><span class="prop"><code>Up</code></span> <a class="ctx" href="/docs/camera-pose/#camera-pose-properties" title="Up in context on the pose and projection page" aria-label="Up in context on the pose and projection page">→</a></h3>

`Vector3` · Read-only. The camera's up, its local +Y, as a unit vector in world space. Follows <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#orientation">`Orientation`</a> at once.

<h3 id="view"><span class="prop"><code>View</code></span> <a class="ctx" href="/docs/camera-pose/#camera-matrix-properties" title="View in context on the pose and projection page" aria-label="View in context on the pose and projection page">→</a></h3>

`Matrix` · Read-only. The view matrix, built from <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#rebasedposition">`RebasedPosition`</a> and <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#orientation">`Orientation`</a> as of the last <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a>.

## Methods

<h3 id="camera"><span class="method"><code>Camera()</code></span> <a class="ctx" href="/docs/camera/#camera-constructors" title="Camera() in context on the quick start guide" aria-label="Camera() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/camera/#camera">`Camera()`</a> · A camera at the origin looking down −Z, with a 45° field of view, a 4:3 aspect ratio and clip planes at 0.1 and 1000. Its matrices are ready at once.

<a class="ref method" href="/docs/camera-glossary/cameras/camera/#camera">`Camera(Vector3 position, Vector3 target, Vector3 up)`</a> · The same settings, at the position, turned to face the target.

| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `Vector3` | Where the camera is, in world coordinates. |
| `target` | `Vector3` | The point it faces. One at `position` leaves it looking down −Z. |
| `up` | `Vector3` | The up it levels its roll against, usually `Vector3.Up`. |

<h3 id="lookat"><span class="method"><code>LookAt()</code></span> <a class="ctx" href="/docs/camera-pose/#camera-pose-methods" title="LookAt() in context on the pose and projection page" aria-label="LookAt() in context on the pose and projection page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/camera/#lookat">`LookAt(Vector3 worldTarget, Vector3 worldUp)`</a> · Turns the camera to face the target, with no roll against `worldUp`. A target at the camera's position changes nothing. A target along `worldUp` takes world +Y as the roll reference instead, and one straight above or below gets the default view tipped up or down by 90°. An attached free camera replaces the orientation at its next update.

| Parameter | Type | Description |
| --- | --- | --- |
| `worldTarget` | `Vector3` | The point to face, in world coordinates. |
| `worldUp` | `Vector3` | The up the view levels its roll against. |

<h3 id="screenpointtoray"><span class="method"><code>ScreenPointToRay()</code></span> <a class="ctx" href="/docs/camera-picking/#camera-picking-methods" title="ScreenPointToRay() in context on the picking and large worlds page" aria-label="ScreenPointToRay() in context on the picking and large worlds page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/camera/#screenpointtoray">`ScreenPointToRay(Vector2 pixel, Viewport viewport)`</a> · A `Ray` in world coordinates through the pixel, starting on the near plane, with a unit direction. Worked out from the current pose and projection, so it needs no <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a> after they change, and accurate to about 10<sup>−7</sup> radians however far the camera is from the origin.

| Parameter | Type | Description |
| --- | --- | --- |
| `pixel` | `Vector2` | The point in window coordinates, from the top left corner, as the mouse gives it. |
| `viewport` | `Viewport` | The viewport the camera draws into. Its position in the window is taken into account. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/camera/#camera-update" title="Update() in context on the quick start guide" aria-label="Update() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update(float elapsedSeconds)`</a> · Runs the controller, if there is one, then moves the floating origin and rebuilds the view and the projection where they changed. Call it once per frame, before drawing. Throws `InvalidOperationException` when <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#nearplane">`NearPlane`</a> isn't less than <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#farplane">`FarPlane`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `elapsedSeconds` | `float` | The seconds since the last update, passed on to the controller. |
