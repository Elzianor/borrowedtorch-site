---
layout: docs
legend: [prop, method]
title: "Transform gizmo: capabilities"
description: The flags that choose the modes and frames each target offers, why scale has no world frame, the rules that turn flags into a mode and a frame, and a mode toolbar that follows them.
---

One gizmo serves every kind of target, and each target says what the gizmo may do to it through
<a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#capabilities">`Capabilities`</a>: which modes it offers and, for move and rotate, along whose axes. A crate
takes everything, a point light only moves, a sphere trigger moves and grows. Names are colored by what they are: a
<span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the
plain color.

## The flags

<a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a> is a set of flags. Each one offers a mode in one frame, or one kind of scale handle, and they
combine with `|`:

| Flag | Offers |
| --- | --- |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#translateglobal">`TranslateGlobal`</a> | The move arms along the world's axes. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#translatelocal">`TranslateLocal`</a> | The move arms along the target's own axes. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#rotateglobal">`RotateGlobal`</a> | The rings about the world's axes. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#rotatelocal">`RotateLocal`</a> | The rings about the target's own axes. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scaleaxes">`ScaleAxes`</a> | The three scale arms, each scaling one axis. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scaleuniform">`ScaleUniform`</a> | The center square, scaling all three axes together. |

<a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#translate">`Translate`</a>, <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#rotate">`Rotate`</a> and <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scale">`Scale`</a> are the two
flags of each mode together, and <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#all">`All`</a> is everything. <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#none">`None`</a> hides the
gizmo for the target: nothing is drawn or picked, and every click goes to the scene.

Any combination is valid. Some that fit common objects:

| Object | Capabilities | Because |
| --- | --- | --- |
| A crate, a rock, any mesh | `All` | It can go anywhere, face any way and take any size. |
| A point light, a sound emitter | `Translate` | A point has no orientation and no size. |
| A spot light, a camera | <code>Translate &#124; Rotate</code> | It aims, but has no size. |
| A sphere trigger | <code>Translate &#124; ScaleUniform</code> | Its one size is its radius, the same along every axis. |
| A camera path waypoint | `TranslateGlobal` | It is placed in the world; the way the camera faces there is set elsewhere. |

The gizmo reads the capabilities every frame while no drag runs, so they can follow the target's state: return `None`
for a locked object, or leave scale out while a physics body is simulating. A drag keeps the capabilities it began
with until it ends.

### GizmoCapabilities values

| Value | Description |
| --- | --- |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#none">`None`</a> | Nothing: the gizmo hides for the target. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#translateglobal">`TranslateGlobal`</a> | The move arms along the world's axes. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#translatelocal">`TranslateLocal`</a> | The move arms along the target's own axes. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#rotateglobal">`RotateGlobal`</a> | The rings about the world's axes. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#rotatelocal">`RotateLocal`</a> | The rings about the target's own axes. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scaleaxes">`ScaleAxes`</a> | The three scale arms. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scaleuniform">`ScaleUniform`</a> | The center square. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#translate">`Translate`</a> | <code>TranslateGlobal &#124; TranslateLocal</code>. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#rotate">`Rotate`</a> | <code>RotateGlobal &#124; RotateLocal</code>. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scale">`Scale`</a> | <code>ScaleAxes &#124; ScaleUniform</code>. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#all">`All`</a> | Every flag. |

## Scale is always local

Move and rotate come in two frames; scale comes in one. Scaling a turned object along one of the world's axes shears
it: a box leans over into a slanted shape. A pose made of a scale, a rotation and a position has nowhere to keep a
shear, so a scale handle along a world axis would have nothing true to write. Scale always works along the target's
own axes, and its two flags split it by handle instead: the arms, each scaling one axis, and the center square,
scaling all three, which is the same in any frame.

## The rules

<a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/">`GizmoCapabilitiesExtensions`</a> holds the rules that turn a target's flags into what the gizmo does. The gizmo asks
them itself, and they are public extension methods of <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a> that need no graphics device, so a
toolbar or an inspector can ask the same questions:

- **<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#allows">`Allows(mode)`</a>** says whether a mode is offered at all, and
  <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#allows">`Allows(mode, space)`</a> whether it is offered in that frame. Scale is offered
  only in `Local`.
- **<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#resolvespace">`ResolveSpace`</a>** settles the frame a mode works in: the preferred one when the
  mode is offered there, otherwise the other one. Scale is always `Local`, and a mode offered in neither frame gets
  the preferred one.
- **<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#nextmode">`NextMode`</a>** steps to the next offered mode in translate, rotate, scale order,
  wrapping round. A lone mode steps to itself, and with nothing offered the current mode comes back.
- **<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#tryclampmode">`TryClampMode`</a>** keeps a mode on one the target offers: the current mode when it
  is offered, else the first offered one in translate, rotate, scale order. It returns `false`, with the current mode
  unchanged, when nothing is offered.

```csharp
var caps = GizmoCapabilities.Translate | GizmoCapabilities.RotateLocal;

caps.Allows(GizmoMode.Scale);                              // false
caps.Allows(GizmoMode.Rotate, GizmoSpace.Global);          // false: only about its own axes
caps.ResolveSpace(GizmoMode.Rotate, GizmoSpace.Global);    // Local, the one frame rotate has
caps.ResolveSpace(GizmoMode.Translate, GizmoSpace.Global); // Global, as preferred
caps.NextMode(GizmoMode.Rotate);                           // Translate: scale is skipped
caps.TryClampMode(GizmoMode.Scale, out var mode);          // true, and mode is Translate
```

The gizmo runs <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#tryclampmode">`TryClampMode`</a> on <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> in every
<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a>, <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a> and <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw`</a> while no drag runs,
<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#nextmode">`NextMode`</a> in <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#cyclemode">`CycleMode`</a>, and
<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#resolvespace">`ResolveSpace`</a> wherever it needs a frame. The
[modes and frames page](/docs/transform-gizmo-modes/) shows what that does to the handles.

### GizmoCapabilitiesExtensions methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#allows">`Allows(this GizmoCapabilities capabilities, GizmoMode mode)`</a> | Whether the mode is offered at all, in either frame or with either scale handle. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#allows">`Allows(this GizmoCapabilities capabilities, GizmoMode mode, GizmoSpace space)`</a> | Whether the mode is offered in the frame. Scale is offered only in `Local`. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#resolvespace">`ResolveSpace(this GizmoCapabilities capabilities, GizmoMode mode, GizmoSpace preferred)`</a> | The frame the mode works in: `preferred` when the mode is offered there, else the other frame when it is. Always `Local` for scale. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#nextmode">`NextMode(this GizmoCapabilities capabilities, GizmoMode current)`</a> | The next offered mode after `current`, in translate, rotate, scale order, wrapping round; `current` itself when nothing else is offered. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#tryclampmode">`TryClampMode(this GizmoCapabilities capabilities, GizmoMode current, out GizmoMode mode)`</a> | `current` when it is offered, else the first offered mode in translate, rotate, scale order. `false`, with `current` in `mode`, when nothing is offered. |

## A mode toolbar

An editor's toolbar with a button for each mode and one for the frame, grayed out where the selection has nothing to
offer. It follows the same rules as the gizmo, so a button never offers what the gizmo would refuse:

```csharp
// once per frame, after the gizmo's update
var caps = selected?.Capabilities ?? GizmoCapabilities.None;
var mode = gizmo.Mode;

moveButton.Enabled = caps.Allows(GizmoMode.Translate);
rotateButton.Enabled = caps.Allows(GizmoMode.Rotate);
scaleButton.Enabled = caps.Allows(GizmoMode.Scale);

moveButton.Checked = mode == GizmoMode.Translate;
rotateButton.Checked = mode == GizmoMode.Rotate;
scaleButton.Checked = mode == GizmoMode.Scale;

// the frame in use, and whether there is another one to switch to
spaceButton.Text = caps.ResolveSpace(mode, gizmo.Space) == GizmoSpace.Local ? "Local" : "Global";
spaceButton.Enabled = caps.Allows(mode, GizmoSpace.Global) && caps.Allows(mode, GizmoSpace.Local);
```

with the buttons setting <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> and calling <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#togglespace">`ToggleSpace`</a> when clicked. Read
<a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> after the gizmo's update: the update is what moves it onto a mode the selection offers.

The frame button shows the frame in use rather than the preference: for a target that turns only about its own axes,
rotate says `Local` whatever <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a> holds, and the button is grayed out, since there is no other
frame to switch to.
