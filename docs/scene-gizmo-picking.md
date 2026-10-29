---
layout: docs
legend: [prop, method]
title: "Scene gizmo: picking and snapping"
description: The order of the gizmo's calls in a frame, the hover highlight, which tip a click picks, turning the view to look along an axis, sharing the pointer with the scene, and viewports.
---

The widget and the scene share the pointer. The widget answers two questions about it: which tip the pointer is on,
for the highlight, and which axis a click picked. What to do with the axis is the game's to decide; most often it turns
the camera to look along it. Names are colored by what they are: a <span class="kb kb-prop">property</span> or a
<span class="kb kb-method">method</span>; values and fields keep the plain color.

## The order of a frame

1. **Update the camera**, so the widget turns with this frame's view.
2. **Update the hover** with the pointer: <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#updatehover">`UpdateHover`</a> finds the tip under it, for
   <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a> to light up.
3. **On a press, try the widget first.** <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#trypickaxis">`TryPickAxis`</a> returns `true` and the axis when the click is
   on a tip. On `false`, the click is the scene's: select, deselect, or whatever the scene does with it.
4. **Draw the scene, then the widget**, over it.

```csharp
var mouse = Mouse.GetState();
var pressed = mouse.LeftButton == ButtonState.Pressed && previousMouse.LeftButton == ButtonState.Released;

camera.Update(elapsedSeconds);
gizmo.UpdateHover(camera, mouse.Position);

if (pressed)
{
    if (gizmo.TryPickAxis(camera, mouse.Position, out var axis))
        free.SnapTo(-axis);
    else
        SelectUnder(mouse.Position); // the scene's click
}
```

Both methods take the camera the scene is drawn with and the pointer in window pixels, as the mouse gives it. They
read the camera's <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#view">`View`</a>, which changes only in the camera's <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a>: with the camera updated first, the
hover, the pick and the picture all come from the same view.

### OrientationGizmo pointer methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#updatehover">`UpdateHover(Camera camera, Point mousePosition)`</a> | Finds the tip under the pointer, by the same rules as a click, for <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a> to light up its arm. Call it once a frame, before <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a>, wherever the pointer is: a pointer on no tip clears the highlight. Throws `ArgumentNullException` for a `null` camera. |
| <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#trypickaxis">`TryPickAxis(Camera camera, Point mousePosition, out Vector3 axis)`</a> | Returns `true` and the axis of the tip under the pointer, as a signed unit vector, the nearer tip when two are close enough. Returns `false` and `Vector3.Zero` when the pointer is outside the widget's square or near no tip. Changes nothing. Throws `ArgumentNullException` for a `null` camera. |

## Hovering

<a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#updatehover">`UpdateHover`</a> finds the tip under the pointer by the same rules as a click, [below](#picking-an-axis), and
<a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a> draws that tip's arm halfway from its color to white, with its knob for a positive axis. Only that
one arm lights up: the pointer on the X tip lights +X, not −X. The letter keeps its color.

Call it every frame, and pass the pointer even when it is far from the widget. The highlight stays as the last call
left it, so a call skipped while the pointer is elsewhere leaves a tip lit up.

The gizmo has no property to read the hover from. <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#trypickaxis">`TryPickAxis`</a> changes nothing and costs six projected
points, so call it for a cursor, or for a tooltip that names the axis:

```csharp
var onTip = gizmo.TryPickAxis(camera, mouse.Position, out var axis);

Mouse.SetCursor(onTip ? MouseCursor.Hand : MouseCursor.Arrow);
```

## Picking an axis

<a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#trypickaxis">`TryPickAxis`</a> picks a tip, not an arm. The pointer is on a tip when it is:

- **inside the widget's square**, the 110-pixel square in the corner of the viewport, and
- **within 14 pixels of the tip**: of the center of the knob of a positive axis, or of the bare end of a negative
  arm. Those ends are pickable too, for the view from the other side.

Where two tips are both that close, the one nearer the camera wins. In a view along an axis, both ends of it sit in
the middle of the widget, one in front of the other, and a click there picks the end pointing at you.

<figure class="shot">
  <img src="{{ '/assets/img/scene-gizmo/placement.svg' | relative_url }}" width="640" height="290" alt="The top-right corner of a viewport at twice its size: the widget's square, 110 pixels across and 12 pixels in from the top and right edges, holds the six arms; a dashed circle 14 pixels in radius is drawn around each tip, and the pointer is inside the circle of the X tip, whose arm is lit up">
  <figcaption>The widget's square in the corner of the viewport, at twice its size, and the circle around each tip that a click picks it in.</figcaption>
</figure>

The axis comes back as a signed unit vector in the world: `Vector3.UnitX` for the X tip, `-Vector3.UnitZ` for the
end of −Z. It is exact, so it can be compared with `==`:

```csharp
var name = axis == Vector3.UnitY ? "Top" : axis == -Vector3.UnitY ? "Bottom" : "Side";
```

## Snapping the view

The axis is the direction of the tip in the world. To look along it the way the widget shows it, with the clicked axis
pointing at you, turn the camera to face the opposite way. A <a class="ref" href="/docs/camera-glossary/cameras/free-camera-controller/">`FreeCameraController`</a> does it smoothly:

```csharp
if (pressed && gizmo.TryPickAxis(camera, mouse.Position, out var axis))
    free.SnapTo(-axis);
```

After the turn, the clicked axis points straight out of the screen. Its arm has no length to show, and its knob and
letter sit in the middle of the widget, over the other arms.

<figure class="shot">
  <img src="{{ '/assets/img/scene-gizmo/snapping.svg' | relative_url }}" width="640" height="236" alt="Three widgets. The first, from a camera at (4, 3, 6), has the pointer on the lit-up X tip: axis is Vector3.UnitX. The second is the view after SnapTo(−axis): the X knob and letter in the middle, Y up and Z to the left. The third is the view after a click on Y, SnapTo(−Vector3.UnitY): the Y knob in the middle, X to the right and Z down">
  <figcaption>A click on the X tip and the view it turns to, and the top view, from a click on the Y tip.</figcaption>
</figure>

| Tip clicked | `axis` | Snapped to | The view |
| --- | --- | --- | --- |
| X | `Vector3.UnitX` | `-Vector3.UnitX` | From the +X side: +Z to the left |
| Y | `Vector3.UnitY` | `-Vector3.UnitY` | From above, the top view: −Z at the top of the screen |
| Z | `Vector3.UnitZ` | `-Vector3.UnitZ` | From the +Z side, the front view: +X to the right, as a new camera looks |
| −X | `-Vector3.UnitX` | `Vector3.UnitX` | From the −X side: +Z to the right |
| −Y | `-Vector3.UnitY` | `Vector3.UnitY` | From below, the bottom view |
| −Z | `-Vector3.UnitZ` | `Vector3.UnitZ` | From the −Z side, the back view: +X to the left |

<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#snapto">`SnapTo`</a> levels the roll against world +Y, and slows down as it closes in: it covers 95% of the turn in
<a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#axissnapconvergencesec">`AxisSnapConvergenceSec`</a>, 0.18 seconds by default. Any <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#look">`Look`</a> or <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#roll">`Roll`</a> input cancels it and takes over, see
[snapping to an axis](/docs/camera-controllers/#snapping-to-an-axis). The widget turns along with the view, frame by
frame.

### Looking from the other side

A click on the tip in the middle, the axis already pointing at you, picks that axis again, and `SnapTo(-axis)` turns
nowhere. To turn the view round instead, as a second click does in many editors, look whether the camera faces that
way already:

```csharp
if (pressed && gizmo.TryPickAxis(camera, mouse.Position, out var axis))
{
    // within about 2.5° of looking along the axis
    var lookingAlong = Vector3.Dot(camera.Forward, -axis) > 0.999f;

    free.SnapTo(lookingAlong ? axis : -axis);
}
```

<a class="ref prop" href="/docs/camera-glossary/cameras/camera/#forward">`Forward`</a> is a unit vector, so the dot product is the cosine of the angle between the view and the axis.

### Cameras without the free controller

<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#snapto">`SnapTo`</a> belongs to the free camera. For a camera with no controller, the axis gives the side to put it
on: move it there, at its distance from what it looks at, and look back.

```csharp
// an instant turn round the point the camera looks at
camera.Position = pivot + axis * distance;
camera.LookAt(pivot, Vector3.Up);
```

<a class="ref method" href="/docs/camera-glossary/cameras/camera/#lookat">`LookAt`</a> gives the top and bottom views a valid roll too: with the pivot straight below, the top of the
view points toward −Z, as in the top view above. A controller of your own, an orbit camera for one, can take the axis
the same way, see [writing a controller](/docs/camera-controllers/#writing-a-controller).

## Sharing the pointer with the scene

The widget is drawn over the scene, so a click on it must not reach the scene as well: try the widget first, and give
the scene only the clicks the widget doesn't take, as in [the order of a frame](#the-order-of-a-frame).

The widget takes only clicks on its tips. Its square is mostly empty, with the scene showing through, and a click in
it that misses every tip is the scene's, to select what is under it there.

## Viewports

The gizmo places its square in the top-right corner of the graphics device's current viewport, and picks against the
square where it would draw it. The pointer stays in window pixels: the viewport's place in the window is taken into
account. For a split screen, or a scene view inside a larger editor window, set the device's viewport to the view's
before <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#updatehover">`UpdateHover`</a> and <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#trypickaxis">`TryPickAxis`</a>, as for <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a>:

```csharp
GraphicsDevice.Viewport = sceneView; // the editor's 3D view

gizmo.UpdateHover(camera, mouse.Position);
```

With the window's viewport set while picking, the widget would pick in the window's corner and draw in the view's,
and a click on what is drawn would miss. [A scene view in an editor](/docs/scene-gizmo/#a-scene-view-in-an-editor) sets
the view's viewport around all three calls.

### Two views, two gizmos

The hover is kept in the gizmo from one <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#updatehover">`UpdateHover`</a> to the next, and every <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a> shows it. A
gizmo shared by two views would show the hover of the view it was last updated for in both, or in neither. Give each
view a gizmo of its own, with its own camera: each holds a `BasicEffect` and a few kilobytes of vertices.
