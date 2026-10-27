---
layout: docs
legend: [prop, method]
title: "Glossary: FreeCameraController"
description: "The members of FreeCameraController, in alphabetical order."
---

Flight with six degrees of freedom: moves along and turns about the camera's own axes, from input you give it each frame.

`FreeCameraController` derives from [`BaseCameraController`](/docs/camera-glossary/cameras/base-camera-controller/) and has its members too. The [controllers page](/docs/camera-controllers/#the-free-camera) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="axissnapconvergencesec"><span class="prop"><code>AxisSnapConvergenceSec</code></span> <a class="ctx" href="/docs/camera-controllers/#freecameracontroller-properties" title="AxisSnapConvergenceSec in context on the controllers page" aria-label="AxisSnapConvergenceSec in context on the controllers page">→</a></h3>

`float` · The seconds a <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#snapto">`SnapTo`</a> takes to cover 95 % of its turn, whatever the frame rate. 0.18 by default; 0 or less snaps almost at once.

<h3 id="looksensitivity"><span class="prop"><code>LookSensitivity</code></span> <a class="ctx" href="/docs/camera-controllers/#freecameracontroller-properties" title="LookSensitivity in context on the controllers page" aria-label="LookSensitivity in context on the controllers page">→</a></h3>

`float` · The turn of one unit of <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#look">`Look`</a>, in radians. 0.0025 by default: 100 units turn the view by 14°.

<h3 id="movespeedunitsec"><span class="prop"><code>MoveSpeedUnitSec</code></span> <a class="ctx" href="/docs/camera-controllers/#freecameracontroller-properties" title="MoveSpeedUnitSec in context on the controllers page" aria-label="MoveSpeedUnitSec in context on the controllers page">→</a></h3>

`float` · The speed of a full <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#move">`Move`</a>, in world units per second. 20 by default.

<h3 id="rollspeedradsec"><span class="prop"><code>RollSpeedRadSec</code></span> <a class="ctx" href="/docs/camera-controllers/#freecameracontroller-properties" title="RollSpeedRadSec in context on the controllers page" aria-label="RollSpeedRadSec in context on the controllers page">→</a></h3>

`float` · The speed of a full <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#roll">`Roll`</a>, in radians per second. 2.5 by default.

## Methods

<h3 id="freecameracontroller"><span class="method"><code>FreeCameraController()</code></span> <a class="ctx" href="/docs/camera-controllers/#freecameracontroller-methods" title="FreeCameraController() in context on the controllers page" aria-label="FreeCameraController() in context on the controllers page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#freecameracontroller">`FreeCameraController()`</a> · A free camera with the default speeds and sensitivity. Attached, it takes over the camera's orientation, roll included.

<h3 id="look"><span class="method"><code>Look()</code></span> <a class="ctx" href="/docs/camera-controllers/#freecameracontroller-methods" title="Look() in context on the controllers page" aria-label="Look() in context on the controllers page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#look">`Look(float deltaYaw, float deltaPitch)`</a> · Turns about the camera's own up and right by the deltas times <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#looksensitivity">`LookSensitivity`</a>. Calls within a frame add up, and aren't scaled by the time. Cancels a snap.

| Parameter | Type | Description |
| --- | --- | --- |
| `deltaYaw` | `float` | Positive looks right, the way the mouse's x grows. |
| `deltaPitch` | `float` | Positive looks down, the way the mouse's y grows. |

<h3 id="move"><span class="method"><code>Move()</code></span> <a class="ctx" href="/docs/camera-controllers/#freecameracontroller-methods" title="Move() in context on the controllers page" aria-label="Move() in context on the controllers page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#move">`Move(Vector3 delta)`</a> · Moves in the camera's own frame. Calls within a frame add up, and the sum is capped at unit length: it moves at <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#movespeedunitsec">`MoveSpeedUnitSec`</a> times its length.

| Parameter | Type | Description |
| --- | --- | --- |
| `delta` | `Vector3` | x right, y up and −z forward: `Vector3.Forward` moves ahead. |

<h3 id="roll"><span class="method"><code>Roll()</code></span> <a class="ctx" href="/docs/camera-controllers/#freecameracontroller-methods" title="Roll() in context on the controllers page" aria-label="Roll() in context on the controllers page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#roll">`Roll(float direction)`</a> · Rolls about the camera's forward at <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#rollspeedradsec">`RollSpeedRadSec`</a> times the value. Calls within a frame add up. Cancels a snap.

| Parameter | Type | Description |
| --- | --- | --- |
| `direction` | `float` | Positive rolls clockwise, negative counterclockwise; 1 is full speed. |

<h3 id="snapto"><span class="method"><code>SnapTo()</code></span> <a class="ctx" href="/docs/camera-controllers/#freecameracontroller-methods" title="SnapTo() in context on the controllers page" aria-label="SnapTo() in context on the controllers page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#snapto">`SnapTo(Vector3 forward)`</a> · Turns smoothly to face the direction, with the roll leveled against world +Y, covering 95 % of the turn in <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#axissnapconvergencesec">`AxisSnapConvergenceSec`</a>. <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#look">`Look`</a> or <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#roll">`Roll`</a> input cancels it; <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#move">`Move`</a> doesn't.

| Parameter | Type | Description |
| --- | --- | --- |
| `forward` | `Vector3` | The direction to face. One of length zero is ignored. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/camera-controllers/#freecameracontroller-methods" title="Update() in context on the controllers page" aria-label="Update() in context on the controllers page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#update">`Update(float elapsedSeconds)`</a> · Override. Applies the frame's input to the camera and clears it. The camera calls it.

| Parameter | Type | Description |
| --- | --- | --- |
| `elapsedSeconds` | `float` | The seconds since the last update. |
