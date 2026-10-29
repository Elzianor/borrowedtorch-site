---
layout: docs
legend: [prop, method]
title: "Transform gizmo: drawing"
description: Drawing the gizmo over the scene, the render states it sets, its size on screen, the order its handles are painted in, colors, and painter's order for overlays of your own.
---

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw`</a> renders the gizmo at the target's pivot with its own `BasicEffect`, over everything else.
It builds the handles' triangles again each frame from the camera and the target, so there is nothing to keep in sync
and nothing to load. Names are colored by what they are: a <span class="kb kb-prop">property</span> or a
<span class="kb kb-method">method</span>; values and fields keep the plain color.

## Drawing the gizmo

Call <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw`</a> after the scene, with the camera and the target given to
<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a>:

```csharp
protected override void Draw(GameTime gameTime)
{
    GraphicsDevice.Clear(Color.Black);

    DrawScene();
    gizmo.Draw(camera, selected); // over the scene
    DrawPanels();                 // the editor's 2D panels over the gizmo

    base.Draw(gameTime);
}
```

It draws into the device's current viewport and render target. Nothing is drawn without a target, or for one that
offers no mode, and like <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> it keeps <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#mode">`Mode`</a> on a mode the target offers.

What it draws follows the mode: the three move arms, the three rings, or the three scale arms when the target offers
<a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scaleaxes">`ScaleAxes`</a>. The pivot square comes with every mode.

### TransformGizmo drawing method

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw(Camera camera, ITransformGizmoTarget target)`</a> | Draws the gizmo at the target's pivot, over everything, and puts back the render states it changed. Draws nothing for a `null` target or one that offers no mode. Throws `ArgumentNullException` for a `null` camera. |

## Render states

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw`</a> sets three states for its draw call and puts the ones it found back after it:

| State | Set to | Because |
| --- | --- | --- |
| `DepthStencilState` | `None` | The gizmo is drawn over everything, never hidden by what is in front of it. |
| `BlendState` | `AlphaBlend` | Colors with alpha blend with the scene. |
| `RasterizerState` | `CullNone` | The handles are flat, and seen from either side. |

The effect gets the camera's <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#view">`View`</a> and <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#projection">`Projection`</a> and an identity world matrix: the
vertices are built relative to the camera's <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#offset">`Offset`</a> already. The gizmo touches no texture, sampler or
render target.

## Size on screen

Each arm is 13% of the viewport's height long, wherever the target is on screen and however far away. The gizmo works
out the arm's length in world units from the camera's field of view and the target's depth: its distance along the
view's forward rather than in a straight line, so a gizmo at the side of a wide view is no smaller than one in the
middle. A target at or behind the camera gets the near plane's depth. Every other size is a share of the arm's length:

<figure class="shot">
  <img src="{{ '/assets/img/transform-gizmo/proportions.svg' | relative_url }}" width="640" height="316" alt="The handles measured in arm lengths L: a move arm of length L with an arrowhead 0.28 L long and 0.18 L wide on a shaft 0.05 L thick; a scale arm of length L tipped with a box 0.12 L across; a pivot square 0.12 L across; a rotate ring of radius 0.9 L">
  <figcaption>The handles in arm lengths, L being 13% of the viewport's height.</figcaption>
</figure>

| Part | Size |
| --- | --- |
| Arm | L, 13% of the viewport's height |
| Shaft | 0.05 L thick |
| Arrowhead | 0.28 L long and 0.18 L wide |
| Scale box | 0.12 L across |
| Pivot square | 0.12 L across |
| Ring | 0.9 L in radius, with a band 0.03 L wide, in 64 segments |

The sizes are fixed: the gizmo has no setting for them. Arms, boxes and squares are flat and turned to face the
camera, and each ring's band is a ribbon turned to face it all the way round, so every part keeps its width from any
angle, a ring seen edge-on included.

## Overlap

With depth testing off, the order the handles are painted in decides which covers which. The gizmo paints far to
near:

- **The arms** by the depth of their tips, so an arm pointing toward the camera lies over the others.
- **The rings** segment by segment: the 192 segments of the three rings are sorted together by the depth of their
  middles, so where two rings cross, the nearer arc is on top from any angle. A fixed order of whole rings would get
  one of the crossings wrong, as a ring's near and far arcs need opposite orders.
- **The pivot square** last, over everything.

## Colors

The handles take the colors of their axes, and the pivot square its own. Set them at any time:

```csharp
gizmo.AxisXColor = new Color(255, 96, 96);
gizmo.CenterColor = Color.Gold;
```

The handle under the pointer, and the one being dragged, is drawn halfway from its color to white. For translucent
handles, scale the whole color rather than only its alpha: `AlphaBlend` expects colors premultiplied by their alpha.

```csharp
gizmo.AxisZColor = new Color(80, 140, 230) * 0.6f; // 60% opaque
```

The highlight goes halfway to an opaque white, so a translucent handle also grows more opaque under the pointer.

### TransformGizmo color properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#axisxcolor">`AxisXColor`</a> | `Color` | The X arm, ring or scale box. (220, 70, 70), a red, by default. |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#axisycolor">`AxisYColor`</a> | `Color` | The Y arm, ring or scale box. (90, 210, 90), a green, by default. |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#axiszcolor">`AxisZColor`</a> | `Color` | The Z arm, ring or scale box. (80, 140, 230), a blue, by default. |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#centercolor">`CenterColor`</a> | `Color` | The pivot square. (210, 210, 210), a light gray, by default. |

## Painter's order for overlays of your own

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/painter-order-depth-sort/#fartonear">`FarToNear`</a> is the sort the gizmo paints with, public for overlays of your own drawn with
depth testing off: light and camera icons, selection outlines, labels. Give it one depth per item, larger farther,
such as the distance along the camera's forward, and a span to fill; it fills the span with the items' indices,
farthest first.

```csharp
// icons drawn over the scene, nearer ones on top
Span<float> depths = stackalloc float[icons.Count];
Span<int> order = stackalloc int[icons.Count];

for (var i = 0; i < icons.Count; i++)
    depths[i] = Vector3.Dot(camera.Forward, icons[i].Position - camera.Position);

PainterOrderDepthSort.FarToNear(depths, order);

foreach (var i in order) DrawIcon(icons[i]);
```

It is an insertion sort: it allocates nothing, is quick for the tens to hundreds of items an overlay has, and is
stable, so items at the same depth keep their order. It sorts as many items as `order` is long, and leaves `depths` as
they are.

### PainterOrderDepthSort methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/painter-order-depth-sort/#fartonear">`FarToNear(ReadOnlySpan<float> depths, Span<int> order)`</a> | Static. Fills `order` with the indices from 0 to its length − 1, farthest first: by depth, from the largest to the smallest. Stable; `depths` must be at least as long as `order`. |
