---
layout: docs
legend: [prop, method]
title: "Glossary: BaseCameraController"
description: "The members of BaseCameraController, in alphabetical order."
---

The base of every camera controller: what drives a camera from inside its update.

An abstract class. The [controllers page](/docs/camera-controllers/#writing-a-controller) shows it in context, with code. Derive from it for a controller of your own.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="camera"><span class="prop"><code>Camera</code></span> <a class="ctx" href="/docs/camera-controllers/#basecameracontroller-members" title="Camera in context on the controllers page" aria-label="Camera in context on the controllers page">→</a></h3>

<a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera?`</a> · Protected, read-only. The camera this controller drives, or `null` while it is detached. Already set when <a class="ref method" href="/docs/camera-glossary/cameras/base-camera-controller/#syncfrom">`SyncFrom`</a> runs.

## Fields

<h3 id="convergenceamount"><code>ConvergenceAmount</code> <a class="ctx" href="/docs/camera-controllers/#basecameracontroller-members" title="ConvergenceAmount in context on the controllers page" aria-label="ConvergenceAmount in context on the controllers page">→</a></h3>

`float` · Protected constant. 0.95: the share of the way an easing covers in its convergence time, as a free camera's snap does in <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#axissnapconvergencesec">`AxisSnapConvergenceSec`</a>.

## Methods

<h3 id="applyto"><span class="method"><code>ApplyTo()</code></span> <a class="ctx" href="/docs/camera-controllers/#basecameracontroller-members" title="ApplyTo() in context on the controllers page" aria-label="ApplyTo() in context on the controllers page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/base-camera-controller/#applyto">`ApplyTo(Camera camera)`</a> · Virtual. Attaches the controller to the camera, the same as assigning <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#controller">`camera.Controller`</a>. Throws `ArgumentNullException` for `null`.

| Parameter | Type | Description |
| --- | --- | --- |
| `camera` | <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> | The camera to drive. |

<h3 id="syncfrom"><span class="method"><code>SyncFrom()</code></span> <a class="ctx" href="/docs/camera-controllers/#basecameracontroller-members" title="SyncFrom() in context on the controllers page" aria-label="SyncFrom() in context on the controllers page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/base-camera-controller/#syncfrom">`SyncFrom()`</a> · Protected, virtual. Called once when the controller is attached, with <a class="ref prop" href="/docs/camera-glossary/cameras/base-camera-controller/#camera">`Camera`</a> set, to take over the camera's current state. Does nothing by default.

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/camera-controllers/#basecameracontroller-members" title="Update() in context on the controllers page" aria-label="Update() in context on the controllers page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/cameras/base-camera-controller/#update">`Update(float elapsedSeconds)`</a> · Abstract. Moves the camera. The camera calls it at the start of its own update; don't call it yourself as well.

| Parameter | Type | Description |
| --- | --- | --- |
| `elapsedSeconds` | `float` | The seconds since the last update. |
