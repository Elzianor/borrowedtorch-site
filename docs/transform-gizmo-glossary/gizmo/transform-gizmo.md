---
layout: docs
legend: [prop, method, event]
title: "Glossary: TransformGizmo"
description: "The members of TransformGizmo, in alphabetical order."
---

A move, rotate and scale gizmo over a target: arms with a square between each pair, or rings, at the target's pivot, the same size on screen at any distance, picked and dragged with the pointer.

A sealed class, `IDisposable`. The [quick start guide](/docs/transform-gizmo/#setting-up-the-gizmo) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="axisxcolor"><span class="prop"><code>AxisXColor</code></span> <a class="ctx" href="/docs/transform-gizmo-drawing/#transformgizmo-color-properties" title="AxisXColor in context on the drawing page" aria-label="AxisXColor in context on the drawing page">→</a></h3>

`Color` · The color of the X arm, ring or scale box, and of the YZ plane square. (220, 70, 70), a red, by default. A hovered handle is drawn halfway toward white.

<h3 id="axisycolor"><span class="prop"><code>AxisYColor</code></span> <a class="ctx" href="/docs/transform-gizmo-drawing/#transformgizmo-color-properties" title="AxisYColor in context on the drawing page" aria-label="AxisYColor in context on the drawing page">→</a></h3>

`Color` · The color of the Y arm, ring or scale box, and of the XZ plane square. (90, 210, 90), a green, by default.

<h3 id="axiszcolor"><span class="prop"><code>AxisZColor</code></span> <a class="ctx" href="/docs/transform-gizmo-drawing/#transformgizmo-color-properties" title="AxisZColor in context on the drawing page" aria-label="AxisZColor in context on the drawing page">→</a></h3>

`Color` · The color of the Z arm, ring or scale box, and of the XY plane square. (80, 140, 230), a blue, by default.

<h3 id="centercolor"><span class="prop"><code>CenterColor</code></span> <a class="ctx" href="/docs/transform-gizmo-drawing/#transformgizmo-color-properties" title="CenterColor in context on the drawing page" aria-label="CenterColor in context on the drawing page">→</a></h3>

`Color` · The color of the pivot square. (210, 210, 210), a light gray, by default.

<h3 id="isdragging"><span class="prop"><code>IsDragging</code></span> <a class="ctx" href="/docs/transform-gizmo-dragging/#transformgizmo-state-properties" title="IsDragging in context on the picking and dragging page" aria-label="IsDragging in context on the picking and dragging page">→</a></h3>

`bool` · Read-only. Whether a drag is running: from a <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a> that returned `true` until <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> sees the button up or a `null` target, or <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#enddrag">`EndDrag`</a> is called.

<h3 id="ishovering"><span class="prop"><code>IsHovering</code></span> <a class="ctx" href="/docs/transform-gizmo-dragging/#transformgizmo-state-properties" title="IsHovering in context on the picking and dragging page" aria-label="IsHovering in context on the picking and dragging page">→</a></h3>

`bool` · Read-only. Whether a handle is under the pointer, as of the last <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> or <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a>. `true` during a drag, for the handle grabbed.

<h3 id="mode"><span class="prop"><code>Mode</code></span> <a class="ctx" href="/docs/transform-gizmo-modes/#transformgizmo-mode-members" title="Mode in context on the modes and frames page" aria-label="Mode in context on the modes and frames page">→</a></h3>

<a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/">`GizmoMode`</a> · Which handles are up. `Translate` for a new gizmo. Kept on a mode the target offers: <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a>, <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a> and <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw`</a> move it to the first offered mode in translate, rotate, scale order when the target doesn't offer it. Setting it during a drag does nothing.

<h3 id="space"><span class="prop"><code>Space</code></span> <a class="ctx" href="/docs/transform-gizmo-modes/#transformgizmo-frame-members" title="Space in context on the modes and frames page" aria-label="Space in context on the modes and frames page">→</a></h3>

<a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-space/">`GizmoSpace`</a> · The preferred frame of move and rotate. `Global` for a new gizmo. A mode the target offers in one frame only stays in it, and scale is always local. Setting it during a drag does nothing.

## Methods

<h3 id="transformgizmo"><span class="method"><code>TransformGizmo()</code></span> <a class="ctx" href="/docs/transform-gizmo/#transformgizmo-constructor-and-dispose" title="TransformGizmo() in context on the quick start guide" aria-label="TransformGizmo() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#transformgizmo">`TransformGizmo(GraphicsDevice graphicsDevice)`</a> · A gizmo in `Translate` mode with the `Global` frame. Creates the `BasicEffect` it draws with. Throws `ArgumentNullException` for a `null` device.

| Parameter | Type | Description |
| --- | --- | --- |
| `graphicsDevice` | `GraphicsDevice` | The device to draw with. Picking projects into its current viewport. |

<h3 id="cyclemode"><span class="method"><code>CycleMode()</code></span> <a class="ctx" href="/docs/transform-gizmo-modes/#transformgizmo-mode-members" title="CycleMode() in context on the modes and frames page" aria-label="CycleMode() in context on the modes and frames page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#cyclemode">`CycleMode(ITransformGizmoTarget target)`</a> · Steps <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> to the next mode the target offers, in translate, rotate, scale order, wrapping round; a lone mode stays. Does nothing for a `null` target or during a drag.

| Parameter | Type | Description |
| --- | --- | --- |
| `target` | <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/">`ITransformGizmoTarget`</a> | The selection, whose capabilities decide the modes offered. |

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/transform-gizmo/#transformgizmo-constructor-and-dispose" title="Dispose() in context on the quick start guide" aria-label="Dispose() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#dispose">`Dispose()`</a> · Disposes the gizmo's `BasicEffect`. Call it when the graphics device goes.

<h3 id="draw"><span class="method"><code>Draw()</code></span> <a class="ctx" href="/docs/transform-gizmo-drawing/#transformgizmo-drawing-method" title="Draw() in context on the drawing page" aria-label="Draw() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw(Camera camera, ITransformGizmoTarget target)`</a> · Draws the gizmo at the target's pivot, over everything: depth testing off, alpha blending on and no culling, with the three states put back after. Draws nothing for a `null` target or one that offers no mode. Throws `ArgumentNullException` for a `null` camera.

| Parameter | Type | Description |
| --- | --- | --- |
| `camera` | <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> | The camera the scene is drawn with: its pose, projection and floating-origin offset. |
| `target` | <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/">`ITransformGizmoTarget`</a> | The selection, or `null` when nothing is selected. |

<h3 id="enddrag"><span class="method"><code>EndDrag()</code></span> <a class="ctx" href="/docs/transform-gizmo-dragging/#transformgizmo-pointer-methods" title="EndDrag() in context on the picking and dragging page" aria-label="EndDrag() in context on the picking and dragging page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#enddrag">`EndDrag()`</a> · Ends the drag, if one is running, and leaves the pose as the drag left it. Writes nothing and raises nothing: to cancel a drag, put back the pose taken when it began.

<h3 id="togglespace"><span class="method"><code>ToggleSpace()</code></span> <a class="ctx" href="/docs/transform-gizmo-modes/#transformgizmo-frame-members" title="ToggleSpace() in context on the modes and frames page" aria-label="ToggleSpace() in context on the modes and frames page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#togglespace">`ToggleSpace()`</a> · Swaps <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a> between `Global` and `Local`. Does nothing during a drag.

<h3 id="trybegindrag"><span class="method"><code>TryBeginDrag()</code></span> <a class="ctx" href="/docs/transform-gizmo-dragging/#transformgizmo-pointer-methods" title="TryBeginDrag() in context on the picking and dragging page" aria-label="TryBeginDrag() in context on the picking and dragging page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag(Camera camera, ITransformGizmoTarget target, Point mousePixel, Ray mouseRay)`</a> · Starts a drag on the handle under the pointer and returns `true`, capturing the handle, its axis or plane, and the pose it edits. Writes nothing to the target. Returns `false` and changes nothing when no handle is under the pointer, the target is `null` or offers no mode, or a drag is running already. Throws `ArgumentNullException` for a `null` camera.

| Parameter | Type | Description |
| --- | --- | --- |
| `camera` | <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> | The camera the scene is drawn with: its pose, projection and floating-origin offset. |
| `target` | <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/">`ITransformGizmoTarget`</a> | The selection, or `null` when nothing is selected. |
| `mousePixel` | `Point` | The pointer in window pixels, from the top left corner, as the mouse gives it. |
| `mouseRay` | `Ray` | The ray through that pixel, in world coordinates, from <a class="ref method" href="/docs/camera-glossary/cameras/camera/#screenpointtoray">`ScreenPointToRay`</a>. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/transform-gizmo-dragging/#transformgizmo-pointer-methods" title="Update() in context on the picking and dragging page" aria-label="Update() in context on the picking and dragging page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update(Camera camera, ITransformGizmoTarget target, Point mousePixel, bool leftButtonDown, Ray mouseRay)`</a> · With no drag running, picks the handle under the pointer for the hover highlight. During a drag, once the pointer is past the 4-pixel dead zone, writes the dragged pose to the target and raises <a class="ref event" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#transformmutated">`TransformMutated`</a>; ends the drag when the button is up or the target is `null`. Throws `ArgumentNullException` for a `null` camera.

| Parameter | Type | Description |
| --- | --- | --- |
| `camera` | <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> | The camera the scene is drawn with: its pose, projection and floating-origin offset. |
| `target` | <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/">`ITransformGizmoTarget`</a> | The selection, or `null` when nothing is selected. During a drag, the target the drag was grabbed on. |
| `mousePixel` | `Point` | The pointer in window pixels, from the top left corner, as the mouse gives it. |
| `leftButtonDown` | `bool` | Whether the button that drags is held, the frame it went down included. |
| `mouseRay` | `Ray` | The ray through that pixel, in world coordinates, from <a class="ref method" href="/docs/camera-glossary/cameras/camera/#screenpointtoray">`ScreenPointToRay`</a>. |

## Events

<h3 id="transformmutated"><span class="event"><code>TransformMutated</code></span> <a class="ctx" href="/docs/transform-gizmo-dragging/#transformgizmo-event" title="TransformMutated in context on the picking and dragging page" aria-label="TransformMutated in context on the picking and dragging page">→</a></h3>

<code>(<a href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/">ITransformGizmoTarget</a> target)</code> · An `Action<ITransformGizmoTarget>`, raised by <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> each frame a drag writes a pose: every frame of a drag past the dead zone, whether the pointer moved or not, but for a rotate frame with no usable angle or a square move frame with no usable point. A click that never leaves the dead zone raises nothing.

| Parameter | Type | Description |
| --- | --- | --- |
| `target` | <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/">`ITransformGizmoTarget`</a> | The target the pose was written to. |
