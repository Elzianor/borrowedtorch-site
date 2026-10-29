---
layout: docs
legend: [prop, method]
title: "Transform gizmo: modes and frames"
description: Translate, rotate and scale and what each drag does, switching modes, the world's axes and the target's own, and objects that are skewed or mirrored.
---

The gizmo shows one mode at a time, arms to move, rings to turn or boxes to scale, and works along one frame, the
world's axes or the target's own. <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> and <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a> choose them, within what
the target [offers](/docs/transform-gizmo-capabilities/). Names are colored by what they are: a
<span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the
plain color.

## Modes

<figure class="shot">
  <img src="{{ '/assets/img/transform-gizmo/modes.svg' | relative_url }}" width="640" height="236" alt="The gizmo in its three modes, seen from above and to one side: three arrowed arms in red, green and blue for translate; three crossing rings for rotate; three arms tipped with square boxes for scale; a small gray square at the pivot in each">
  <figcaption>The three modes, drawn from the gizmo's own geometry. X is red, Y green and Z blue; the gray square marks the pivot, and in scale mode it is a handle too.</figcaption>
</figure>

- **Translate** shows three arrowed arms. Dragging one moves the target along its axis.
- **Rotate** shows three rings, each square to its axis. Dragging one turns the target about that axis.
- **Scale** shows three arms tipped with boxes, and makes the pivot square a handle. Dragging an arm scales the target
  along its axis; dragging the square scales all three axes together. A target that offers only
  <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scaleuniform">`ScaleUniform`</a> shows the square alone, and one that offers only
  <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scaleaxes">`ScaleAxes`</a> shows the arms, with a square that isn't a handle.

The pivot square is drawn in every mode, where the target's <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldposition">`WorldPosition`</a> is.

### GizmoMode values

| Value | Description |
| --- | --- |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/#translate">`Translate`</a> | Three arrowed arms, each moving the target along its axis. The mode of a new gizmo. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/#rotate">`Rotate`</a> | Three rings, each turning the target about its axis. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/#scale">`Scale`</a> | Three scale arms, each scaling one axis, and the center square, scaling all three. |

## Choosing a mode

Set <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> from a key or a button, or step through the modes with
<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#cyclemode">`CycleMode`</a>, which goes translate, rotate, scale and round again, skipping the modes the target
doesn't offer:

```csharp
if (WasPressed(Keys.D1)) gizmo.Mode = GizmoMode.Translate;
if (WasPressed(Keys.D2)) gizmo.Mode = GizmoMode.Rotate;
if (WasPressed(Keys.D3)) gizmo.Mode = GizmoMode.Scale;
if (WasPressed(Keys.Tab)) gizmo.CycleMode(selected);
```

The gizmo keeps <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> on a mode the target offers. Every <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a>,
<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a> and <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw`</a> with a target checks it, and moves it to the first
offered mode in translate, rotate, scale order when the target doesn't offer it. So `Scale`, left over from a crate,
becomes `Translate` when a point light is selected, and stays `Translate` when the crate is selected again. A mode
set that the target doesn't offer lasts until the next of those calls; a
[toolbar](/docs/transform-gizmo-capabilities/#a-mode-toolbar) can gray such modes out. A target that offers no mode
at all shows no gizmo and leaves <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> as it is.

During a drag, setting <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> and calling <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#cyclemode">`CycleMode`</a> do nothing: the drag
holds what it captured for its own mode, and another mode would write that to the wrong part of the pose.

### TransformGizmo mode members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> | Which handles are up, a <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/">`GizmoMode`</a>. `Translate` for a new gizmo. Kept on a mode the target offers; setting it during a drag does nothing. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#cyclemode">`CycleMode(ITransformGizmoTarget target)`</a> | Steps to the next mode the target offers, in translate, rotate, scale order; a lone mode stays. Does nothing for a `null` target or during a drag. |

## Frames

<figure class="shot">
  <img src="{{ '/assets/img/transform-gizmo/spaces.svg' | relative_url }}" width="640" height="236" alt="Three boxes with move arms: a turned box with the arms along the world's axes; the same box with the arms along its own edges; a box stretched and skewed by its parent, with the arms along its slanted edges">
  <figcaption>The move arms in each frame on the same turned box, and on a box whose parent stretches it out of square. Drawn from the gizmo's own geometry.</figcaption>
</figure>

<a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a> is the frame of the move arms and the rings:

- **`Global`**, the default, works along the world's axes, whichever way the target faces.
- **`Local`** works along the target's own axes, from its <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldaxes">`WorldAxes`</a>.

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#togglespace">`ToggleSpace`</a> swaps the two. <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a> is a preference, though, and the target
has the last word. A mode it offers in one frame only stays in that frame: a target with
<a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#rotatelocal">`RotateLocal`</a> alone turns about its own axes with `Global` preferred. Scale is always `Local`,
see [scale is always local](/docs/transform-gizmo-capabilities/#scale-is-always-local). So the toggle only shows once
a mode the target offers in both frames is up.

The gizmo settles the frame inside <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a>, <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a> and
<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw`</a>, with <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#resolvespace">`ResolveSpace`</a>, from <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a>,
<a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a> and the target's capabilities, so the calling code never has to. To show the frame in use,
ask <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#resolvespace">`ResolveSpace`</a> the same question.

During a drag, setting <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a> and calling <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#togglespace">`ToggleSpace`</a> do nothing: the
handles would change frame under a drag that is still running in the old one.

### GizmoSpace values

| Value | Description |
| --- | --- |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-space/#global">`Global`</a> | The world's axes. The frame of a new gizmo. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-space/#local">`Local`</a> | The target's own axes. Scale always works in it. |

### TransformGizmo frame members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a> | The preferred frame of move and rotate, a <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-space/">`GizmoSpace`</a>. `Global` for a new gizmo. Setting it during a drag does nothing. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#togglespace">`ToggleSpace()`</a> | Swaps <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a> between `Global` and `Local`. Does nothing during a drag. |

## Moving

A move drag slides the target along the arm's axis by the pointer's travel along it. Each frame, the gizmo finds the
point of the axis line nearest the pointer's ray and moves the target by as far as that point has gone since the
grab, so the target stays under the pointer, near the camera or far from it. The new position goes to
<a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldposition">`WorldPosition`</a>.

An arm that points nearly straight at the camera can't be grabbed: a drag along it would fling the target down the
axis, see [hovering](/docs/transform-gizmo-dragging/#hovering).

## Rotating

A rotate drag turns the target about the ring's axis by the pointer's angle around it. The gizmo meets the pointer's
ray with the ring's plane, through the pivot and square to the axis, and measures the angle there, so equal travel
round the ring is an equal turn, all the way round.

- **A ring seen edge-on** gives no angle, and neither does a pointer past the horizon of the ring's plane on screen,
  where the ray no longer meets the plane in front of the camera. The target keeps its last rotation until the pointer gives an
  angle again. A ring grabbed edge-on measures from the first angle it gets, so the target doesn't jump.
- **The axis is held.** The axis grabbed is the axis for the whole drag. A turn about a local axis goes on about the
  ring it started on, even as the target, and its local axes with it, turns under it.
- **The turn is composed locally.** It goes onto the <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#localrotation">`LocalRotation`</a> the target had at
  the grab, in the target's own frame, and the result is written to <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#localrotation">`LocalRotation`</a>. A
  global ring's axis is carried into that frame first, so the target turns about the world's axis whatever its
  parents do.

## Scaling

<figure class="shot">
  <img src="{{ '/assets/img/transform-gizmo/scale-drags.svg' | relative_url }}" width="640" height="228" alt="Left: a scale arm with marks along its axis from where its box was grabbed: times 0.5 halfway back toward the pivot, times 1.5 and times 2 half an arm and a whole arm beyond. Right: the center square on a diagonal running from lower left to upper right, growing up and to the right and shrinking down and to the left, with times 0.5 and times 1.5 half an arm from it either way">
  <figcaption>How far a scale drag goes. An arm scales its axis by the pointer's travel along it from the grab point, in arm lengths; the square scales all three axes by the pointer's travel up and to the right on screen, in the arm's length on screen.</figcaption>
</figure>

- **An arm** multiplies its own axis of <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#localscale">`LocalScale`</a> by one plus the pointer's travel along
  the axis from where it was grabbed, in arm lengths. Dragging a whole arm's length outward doubles that axis; half an
  arm back toward the pivot halves it. The arm is the target's own axis, as scale is always local.
- **The center square** multiplies all three by one plus the pointer's travel along the screen's diagonal, up and to
  the right, in the length of an arm on screen. Up and to the right grows, down and to the left shrinks, and travel
  across the diagonal counts for nothing. The travel is measured from the grab point rather than from the pivot: the
  square is only a few pixels across, so a distance from the pivot could hardly shrink anything.
- **There is a floor.** The factor never goes below 0.01: a drag takes no axis below 1% of the scale it had at the
  grab, so nothing collapses to nothing or turns inside out. An axis already mirrored stays mirrored.

Each frame works from the scale read at the grab, not from the last frame's, so the scale never drifts.

## Skewed and mirrored objects

- **Skewed.** Under a parent scaled more along one axis than the others, a turned child's axes are no longer
  perpendicular. The local handles follow them, so the arms and the scale boxes lie along the object's real edges, as
  in the third box [above](#frames). A ring is measured on a plane square to its own axis, so equal travel is still an
  equal turn. Where a frame has to stand in for an orientation, to carry a world axis into the object's frame for a
  global rotate, it is squared up first with <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#orthonormalized">`Orthonormalized`</a>: exact with no shear, the closest there
  is with it.
- **Mirrored.** A negative scale makes the object's frame left-handed. A turn about one of its own axes then moves it
  the opposite way in the world from an unmirrored object, so the gizmo turns the angle around: the object follows the
  pointer either way. <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#islefthanded">`IsLeftHanded`</a>, read from <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldaxes">`WorldAxes`</a> at the grab, is
  how the gizmo knows.
