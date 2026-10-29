---
layout: docs
legend: [prop, method]
title: "Glossary: OrientationGizmo"
description: "The members of OrientationGizmo, in alphabetical order."
---

The world's axes in the top-right corner of the viewport, turning exactly as the camera turns, drawn over the scene; the tip under the pointer lights up, and a click on a tip gives its axis.

A sealed class, `IDisposable`. The [quick start guide](/docs/scene-gizmo/#setting-up-the-gizmo) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="axislettercolor"><span class="prop"><code>AxisLetterColor</code></span> <a class="ctx" href="/docs/scene-gizmo-drawing/#orientationgizmo-color-properties" title="AxisLetterColor in context on the drawing page" aria-label="AxisLetterColor in context on the drawing page">→</a></h3>

`Color` · The color of the letters X, Y and Z on the knobs of the positive arms. (245, 245, 245), an off-white, by default. Not lightened under the pointer.

<h3 id="axisxcolor"><span class="prop"><code>AxisXColor</code></span> <a class="ctx" href="/docs/scene-gizmo-drawing/#orientationgizmo-color-properties" title="AxisXColor in context on the drawing page" aria-label="AxisXColor in context on the drawing page">→</a></h3>

`Color` · The color of the +X arm and its knob. (220, 70, 70), a red, by default. The −X arm takes 40% of its red, green and blue, opaque. An arm under the pointer is drawn halfway toward white.

<h3 id="axisycolor"><span class="prop"><code>AxisYColor</code></span> <a class="ctx" href="/docs/scene-gizmo-drawing/#orientationgizmo-color-properties" title="AxisYColor in context on the drawing page" aria-label="AxisYColor in context on the drawing page">→</a></h3>

`Color` · The color of the +Y arm and its knob. (90, 210, 90), a green, by default. The −Y arm takes 40% of its red, green and blue, opaque.

<h3 id="axiszcolor"><span class="prop"><code>AxisZColor</code></span> <a class="ctx" href="/docs/scene-gizmo-drawing/#orientationgizmo-color-properties" title="AxisZColor in context on the drawing page" aria-label="AxisZColor in context on the drawing page">→</a></h3>

`Color` · The color of the +Z arm and its knob. (80, 140, 230), a blue, by default. The −Z arm takes 40% of its red, green and blue, opaque.

## Methods

<h3 id="orientationgizmo"><span class="method"><code>OrientationGizmo()</code></span> <a class="ctx" href="/docs/scene-gizmo/#orientationgizmo-constructor-and-dispose" title="OrientationGizmo() in context on the quick start guide" aria-label="OrientationGizmo() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#orientationgizmo">`OrientationGizmo(GraphicsDevice graphicsDevice)`</a> · A widget in the default colors. Creates the `BasicEffect` it draws with. Throws `ArgumentNullException` for a `null` device.

| Parameter | Type | Description |
| --- | --- | --- |
| `graphicsDevice` | `GraphicsDevice` | The device to draw with. The widget's square is placed in its current viewport, for drawing and for picking. |

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/scene-gizmo/#orientationgizmo-constructor-and-dispose" title="Dispose() in context on the quick start guide" aria-label="Dispose() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#dispose">`Dispose()`</a> · Disposes the gizmo's `BasicEffect`. Call it when the graphics device goes. A second call does nothing; <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a> after it throws `ObjectDisposedException`.

<h3 id="draw"><span class="method"><code>Draw()</code></span> <a class="ctx" href="/docs/scene-gizmo-drawing/#orientationgizmo-drawing-method" title="Draw() in context on the drawing page" aria-label="Draw() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw(Camera camera)`</a> · Draws the widget in a 110-pixel square, 12 pixels in from the top-right corner of the current viewport, over what is there: its own viewport and projection, depth testing off, alpha blending on and no culling, with the viewport and the three states put back after. The arm under the pointer, as the last <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#updatehover">`UpdateHover`</a> found it, is lit up. Throws `ArgumentNullException` for a `null` camera, and `ObjectDisposedException` after <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#dispose">`Dispose`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `camera` | <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> | The camera the scene is drawn with. Only its <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#view">`View`</a> is read, for the turn of the widget. |

<h3 id="trypickaxis"><span class="method"><code>TryPickAxis()</code></span> <a class="ctx" href="/docs/scene-gizmo-picking/#orientationgizmo-pointer-methods" title="TryPickAxis() in context on the picking and snapping page" aria-label="TryPickAxis() in context on the picking and snapping page">→</a></h3>

<a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#trypickaxis">`TryPickAxis(Camera camera, Point mousePosition, out Vector3 axis)`</a> · Returns `true` when the pointer is inside the widget's square and within 14 pixels of a tip, with that tip's axis; of two tips that close, the one nearer the camera. Returns `false` otherwise, with `Vector3.Zero`. Changes nothing, the hover included. Throws `ArgumentNullException` for a `null` camera.

| Parameter | Type | Description |
| --- | --- | --- |
| `camera` | <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> | The camera the scene is drawn with. Only its <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#view">`View`</a> is read. |
| `mousePosition` | `Point` | The pointer in window pixels, from the top left corner, as the mouse gives it. |
| `axis` | `Vector3` | Out. The world axis of the tip, as a signed unit vector: `Vector3.UnitX`, `-Vector3.UnitZ` and so on. `Vector3.Zero` when no tip is picked. |

<h3 id="updatehover"><span class="method"><code>UpdateHover()</code></span> <a class="ctx" href="/docs/scene-gizmo-picking/#orientationgizmo-pointer-methods" title="UpdateHover() in context on the picking and snapping page" aria-label="UpdateHover() in context on the picking and snapping page">→</a></h3>

<a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#updatehover">`UpdateHover(Camera camera, Point mousePosition)`</a> · Finds the tip under the pointer, by the rules of <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#trypickaxis">`TryPickAxis`</a>, for <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a> to light up its arm; a pointer on no tip clears the highlight. Call it once a frame, before <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a>, wherever the pointer is. Throws `ArgumentNullException` for a `null` camera.

| Parameter | Type | Description |
| --- | --- | --- |
| `camera` | <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> | The camera the scene is drawn with. Only its <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#view">`View`</a> is read. |
| `mousePosition` | `Point` | The pointer in window pixels, from the top left corner, as the mouse gives it. |
