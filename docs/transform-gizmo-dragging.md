---
layout: docs
legend: [prop, method, event]
title: "Transform gizmo: picking and dragging"
description: The order of the gizmo's calls in a frame, hovering, starting, ending and cancelling a drag, the dead zone, undo, viewports, and worlds far from the origin.
---

The gizmo and the scene share the pointer, and the gizmo goes first. It says whether the pointer is over one of its
handles, and a click on one starts a drag that the gizmo owns until the button comes up. Any other click is the
scene's. Names are colored by what they are: a <span class="kb kb-prop">property</span>, a
<span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the
plain color.

## The order of a frame

1. **Update the camera**, so the pointer's ray and the gizmo's size follow this frame's view.
2. **Update the gizmo** with the pointer: <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> picks the handle under it, or writes the
   dragged pose while a drag runs.
3. **On a press, try the gizmo first.** <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a> returns `true` when the click grabbed a
   handle. On `false`, the click is the scene's: select, deselect, or whatever the scene does with it.
4. **The scene's own hover and picking**, left out while the pointer is the gizmo's.
5. **Draw the scene, then the gizmo**, last, over everything.

```csharp
var pixel = new Point(mouse.X, mouse.Y);
var ray = camera.ScreenPointToRay(pixel.ToVector2(), GraphicsDevice.Viewport);
var down = mouse.LeftButton == ButtonState.Pressed;
var pressed = down && previousMouse.LeftButton == ButtonState.Released;

gizmo.Update(camera, selected, pixel, down, ray);

if (pressed && !gizmo.TryBeginDrag(camera, selected, pixel, ray))
    selected = PickScene(ray); // null on empty space

// the scene's hover highlight, when the pointer isn't the gizmo's
if (!gizmo.IsHovering && !gizmo.IsDragging)
    HighlightUnder(ray);
```

The pixel and the ray must be the same point: the pixel in window coordinates, as the mouse gives it, and the ray
from <a class="ref method" href="/docs/camera-glossary/cameras/camera/#screenpointtoray">`ScreenPointToRay`</a> with that pixel. The gizmo picks with the pixel and drags with both.
`leftButtonDown` is `true` for as long as the button is held, the frame it went down included.

### TransformGizmo pointer methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update(Camera camera, ITransformGizmoTarget target, Point mousePixel, bool leftButtonDown, Ray mouseRay)`</a> | With no drag running, picks the handle under the pointer. During a drag, writes the dragged pose to the target and raises <a class="ref event" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#transformmutated">`TransformMutated`</a> once the pointer is past the dead zone, and ends the drag when the button is up or the target is `null`. Throws `ArgumentNullException` for a `null` camera. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag(Camera camera, ITransformGizmoTarget target, Point mousePixel, Ray mouseRay)`</a> | Starts a drag on the handle under the pointer and returns `true`. Returns `false` and changes nothing when there is no handle there, no target, no mode offered, or a drag running already. Throws `ArgumentNullException` for a `null` camera. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#enddrag">`EndDrag()`</a> | Ends the drag, if one is running, and leaves the pose as the drag left it. |

## Hovering

With no drag running, <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> picks the handle under the pointer, and <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw`</a>
draws it lightened halfway to white. <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#ishovering">`IsHovering`</a> says whether there is one, for a cursor, say:

```csharp
Mouse.SetCursor(gizmo.IsHovering ? MouseCursor.Hand : MouseCursor.Arrow);
```

The pointer is over a handle when it is:

- **within 9 pixels of an arm**, move or scale: of the line from the pivot to the arm's tip, its box included. Where
  two arms are that close, the nearer one wins.
- **over a plane square**, move or scale, as it is drawn on screen. Where two squares overlap, the nearer one wins.
  An arm within 9 pixels wins over a square: the squares stand off the arms, so the two only meet where a steep view
  lays a square across an arm, and the arm is the narrower target there.
- **within 9 pixels of a ring**, as it is drawn on screen, sampled in 64 segments. The nearer ring wins, whether the
  pointer is at its front or its back.
- **over the center square**, in scale mode, for a target that offers <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scaleuniform">`ScaleUniform`</a>: within
  half the square's width of the pivot. The square sits over the roots of the arms, so it is tried first.

Some handles are left out. An arm shorter than 8 pixels on screen points nearly straight at the camera, and a drag
along it would be ill-conditioned: the point of the axis nearest the pointer would swing along it by far more than the
pointer moved, and fling the target down the axis. Such an arm can't be picked; it is a few pixels at the pivot
anyway. A plane square turned within about 9 degrees of edge-on can't be picked either, for the same reason: it is a
sliver by then, and a pixel of pointer travel across it would be a long way across its plane. And no arm or center
square is picked while the pivot is behind the camera, no plane square with a corner behind it, and no part of a ring
that is.

<a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#ishovering">`IsHovering`</a> is `false` without a target, and during a drag it is `true`, for the handle grabbed,
which stays lightened.

### TransformGizmo state properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#ishovering">`IsHovering`</a> | `bool` | Read-only. Whether a handle is under the pointer, as of the last <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> or <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a>. `true` during a drag. |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#isdragging">`IsDragging`</a> | `bool` | Read-only. Whether a drag is running, from a successful <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a> to its end. |

## Starting a drag

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a> picks the handle under the pointer itself, so it needs no hover from an earlier
<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a>. When there is one, it takes what the drag needs: the handle, its axis or plane as it points now,
the part of the pose the handle edits, and the pointer. It writes nothing to the target. It returns `false`, and
changes nothing, when no handle is under the pointer, when there is no target or the target offers no mode, and when
a drag is running already.

A drag writes nothing until the pointer has gone 4 pixels from where it was grabbed. Pressing a button nudges the
pointer a pixel or two, and without the dead zone that nudge would be a drag: a click on a ring would turn the target
by a degree, and a click on a scale box would scale it a little, a little more with every click. Once past the dead
zone, the drag measures from the grab point itself, so the target jumps by no more than those 4 pixels' worth, and it
stays live from then on, even back near the grab point.

## During a drag

Each <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> with the button down writes the dragged pose to the target it is given and raises
<a class="ref event" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#transformmutated">`TransformMutated`</a> with that target. Every frame of a drag past the dead zone writes, whether the
pointer moved or not, but for a rotate frame with no usable angle and a square move frame with no usable point, see
[moving](/docs/transform-gizmo-modes/#moving).

- **Keep passing the same target.** The drag writes to the target it is given, not to the one it was grabbed on. To
  change the selection while a drag runs, end the drag first.
- **Refresh with the event, don't record.** <a class="ref event" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#transformmutated">`TransformMutated`</a> suits an inspector that shows the
  pose and reads it again. For undo, take one step per drag, [below](#undo).
- **The rest holds.** <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a>, <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a>, the target's capabilities and the axis
  grabbed stay as they were at the grab. Setting the mode or the frame does nothing until the drag ends.

Each frame works out the pose from what the drag took at the grab, not from the last frame's pose, so the target
never drifts from under the pointer.

### TransformGizmo event

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#transformmutated">`TransformMutated`</a> | <code>(<a href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/">ITransformGizmoTarget</a> target)</code> | A drag writes a pose to the target: from <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a>, every frame of a drag past the dead zone, but for a rotate frame with no usable angle or a square move frame with no usable point. |

## Ending and cancelling

A drag ends when <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> sees the button up, when it gets a `null` target, as when the selection
goes away, and when <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#enddrag">`EndDrag`</a> is called. Ending writes nothing: the pose stays as the drag's last
frame left it. Nothing is raised either; compare <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#isdragging">`IsDragging`</a> before and after the update to see a
drag end.

To cancel a drag, keep the pose from when it began and put it back after <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#enddrag">`EndDrag`</a>:

```csharp
if (pressed && gizmo.TryBeginDrag(camera, selected, pixel, ray))
    grabbed = (selected.WorldPosition, selected.LocalRotation, selected.LocalScale);

// Escape cancels
if (gizmo.IsDragging && escapePressed)
{
    gizmo.EndDrag();
    (selected.WorldPosition, selected.LocalRotation, selected.LocalScale) = grabbed;
}
```

## Undo

One undo step per drag: take the pose when the drag begins, note whether the drag wrote anything, and push the step
when it ends.

```csharp
gizmo.TransformMutated += _ => moved = true;

// every frame
var wasDragging = gizmo.IsDragging;
gizmo.Update(camera, selected, pixel, down, ray);

if (wasDragging && !gizmo.IsDragging && moved)
    history.Push(new PoseChange(selected, grabbed, Pose.Of(selected)));

if (pressed && gizmo.TryBeginDrag(camera, selected, pixel, ray))
{
    grabbed = Pose.Of(selected);
    moved = false;
}
```

`Pose` is the one of [the small editor](/docs/transform-gizmo/#a-small-editor), which puts undo and cancelling
together. A click that never leaves the dead zone writes nothing, and leaves nothing to undo.

## Viewports

The gizmo picks in the graphics device's current viewport: it projects its handles into it to compare them with the
pointer. The pointer stays in window coordinates, and the viewport's place in the window is taken into account, as by
<a class="ref method" href="/docs/camera-glossary/cameras/camera/#screenpointtoray">`ScreenPointToRay`</a>. For a split screen, or a scene view inside a larger editor window, set the device's
viewport to the view's before <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> and <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a>, as for drawing:

```csharp
GraphicsDevice.Viewport = sceneView; // the editor's 3D view

var ray = camera.ScreenPointToRay(pixel.ToVector2(), sceneView);
gizmo.Update(camera, selected, pixel, down, ray);
```

Give the camera that viewport's aspect ratio too, see
[a window that changes size](/docs/camera-pose/#a-window-that-changes-size).

## Far from the origin

The gizmo draws and picks relative to the camera's <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#offset">`Offset`</a>, the
[floating origin](/docs/camera-picking/#the-floating-origin) its view is built from, so its handles stay crisp and
its picking exact however far the world reaches. Targets give their positions in world coordinates as usual, never
rebased, and the drags are worked out in world coordinates too.
