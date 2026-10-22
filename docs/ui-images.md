---
layout: docs
legend: [prop, dp, method, event]
title: "UI: images and drawing"
description: Images, stencils, view ports for your own drawing, and drag and drop.
---

Every element here has all the properties, events and methods of [`BaseElement`](/docs/ui-base-element/), which the
tables below don't repeat. Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>: `Foo` is backed by
`FooDP`, which a style, a binding or an animation can set (see [styles, bindings and animation](/docs/ui-styles/)).
Screenshots use the theme from [styles](/docs/ui-styles/#the-theme-of-these-pages).

## Image

Draws a texture, stretched over the image, centred at its own size or repeated as tiles.

<figure class="shot">
  <img src="{{ '/assets/img/ui/images-fills.png' | relative_url }}" width="514" height="154" alt="Three framed images: the Beryllium UI logo stretched over the first, a check box texture centred in the second, and the same texture tiled in rows and columns in the third, cut at the right and bottom edges">
  <figcaption>The same frame size with <code>Stretch</code>, <code>Center</code> and <code>Tile</code>.</figcaption>
</figure>

```csharp
var logo = LoadTexture("Logo/BerylliumUI Logo.png");      // 1280 x 1280
var mark = LoadTexture("CheckBox/Checked.png");           // 64 x 64

Image Framed(Texture2D texture, ImageFill fill, int left) => new()
{
    Source = texture,
    Fill = fill,
    DesiredWidth = 140,
    DesiredHeight = 120,
    BackgroundColor = new Color(40, 31, 23),
    Margin = (left, 16)
};

// the whole texture over the image
ui.AddElementToRoot(Framed(logo, ImageFill.Stretch, 16));

// its own size, in the middle
ui.AddElementToRoot(Framed(mark, ImageFill.Center, 186));

// repeated, cut at the edges
ui.AddElementToRoot(Framed(mark, ImageFill.Tile, 356));
```

<a class="ref dp" href="/docs/ui-glossary/elements/image/#source">`Source`</a> takes a `Texture2D` or a content path: both convert to a [`SourceData`](#sourcedata) by themselves. A path is
loaded through the `ContentManager` you gave <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/">`BorrowedTorchUI`</a>, so it names a compiled `.xnb` asset, without the
extension. A PNG file that is not a compiled asset can't be read that way: load it with `Texture2D.FromStream` and give
the image the texture.

```csharp
// a PNG file next to the executable
var path = Path.Combine(AppContext.BaseDirectory, "Content", "Pattern.png");
using var stream = File.OpenRead(path);
var pattern = Texture2D.FromStream(GraphicsDevice, stream);

var background = new Image("background") { Source = pattern, Fill = ImageFill.Tile };

// Badge.xnb, through the ContentManager
var badge = new Image("badge") { Source = "UITextures/Badge" };
```

The image never disposes its source. A texture you loaded yourself is yours to dispose when the game unloads; one
loaded from a path belongs to the `ContentManager`.

The source is drawn straight to the screen every frame, not kept in a texture of the image's size. An image costs no
texture memory of its own and can be larger than the GPU's texture size limit, for example a tiled background of a
long scrolled page. With the tile modes only the tiles in view are drawn. A parent that crops the image (a scrollable
container) cuts it with a scissor rectangle.

An image without a size of its own that fits its content takes the size of its source, in units, and setting a new
source lays it out again. With the default `Stretch` alignment it fills its parent instead. The texture is tinted by
<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a>, which is white by default (no change), and follows <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#transparency">`Transparency`</a> and the disabled shading like any
element.

#### `ImageFill`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/image-fill/#stretch">`Stretch`</a> | The whole texture is stretched over the image. The default. |
| <a class="ref" href="/docs/ui-glossary/types/image-fill/#center">`Center`</a> | The texture at its own size in the middle of the image. A texture larger than the image is cut at its edges. |
| <a class="ref" href="/docs/ui-glossary/types/image-fill/#tile">`Tile`</a> | The texture is repeated from the top left corner in both directions. The last tiles are cut at the right and bottom edges, not squeezed. |
| <a class="ref" href="/docs/ui-glossary/types/image-fill/#tilex">`TileX`</a> | Repeated along the width, stretched over the height. |
| <a class="ref" href="/docs/ui-glossary/types/image-fill/#tiley">`TileY`</a> | Repeated along the height, stretched over the width. |

### Image properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/image/#source">`Source`</a> | <a class="ref" href="/docs/ui-glossary/types/source-data/">`SourceData`</a> | The texture drawn. Assign a `Texture2D` or a content path. A new source lays the image out again. |
| <a class="ref dp" href="/docs/ui-glossary/elements/image/#fill">`Fill`</a> | <a class="ref" href="/docs/ui-glossary/types/image-fill/">`ImageFill`</a> | How the texture covers the image. Defaults to `Stretch`. |

### Image methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/image/#image">`Image(string name = null)`</a> | Creates an image. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |

### SourceData

The value of <a class="ref dp" href="/docs/ui-glossary/elements/image/#source">`Image.Source`</a>: a wrapper around a texture that you rarely write yourself, since a <a class="ref method" href="/docs/ui-glossary/types/source-data/#texture2d">`Texture2D`</a> or a
content path converts to it. It doesn't own the texture. Two `SourceData` are equal when they wrap the same texture
instance.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/source-data/#width">`Width`</a> | `int` | Read-only. The texture's width in pixels, `0` without a texture. |
| <a class="ref prop" href="/docs/ui-glossary/types/source-data/#height">`Height`</a> | `int` | Read-only. The texture's height in pixels, `0` without a texture. |
| <a class="ref prop" href="/docs/ui-glossary/types/source-data/#isempty">`IsEmpty`</a> | `bool` | Read-only. Whether there is nothing to draw: no texture, or a width or height of `0`. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/source-data/#sourcedata">`SourceData(Texture2D texture)`</a> | Wraps the texture. |
| <span class="method"><code>implicit <a href="/docs/ui-glossary/types/source-data/#sourcedata">operator</a> <a href="/docs/ui-glossary/types/source-data/">SourceData</a>(Texture2D texture)</code></span> | Lets you assign a texture where a `SourceData` is expected. |
| <span class="method"><code>implicit <a href="/docs/ui-glossary/types/source-data/#sourcedata">operator</a> <a href="/docs/ui-glossary/types/source-data/">SourceData</a>(string path)</code></span> | Loads the content path as a <a class="ref method" href="/docs/ui-glossary/types/source-data/#texture2d">`Texture2D`</a> through the UI's `ContentManager` and wraps it. |
| <span class="method"><code>implicit <a href="/docs/ui-glossary/types/source-data/#texture2d">operator</a> Texture2D(<a href="/docs/ui-glossary/types/source-data/">SourceData</a> data)</code></span> | Gives back the wrapped texture (`null` when it wraps none). |
| <a class="ref method" href="/docs/ui-glossary/types/source-data/#section-1">`operator ==`</a> / <a class="ref method" href="/docs/ui-glossary/types/source-data/#section">`operator !=`</a> | Compare a `SourceData` with another `SourceData`, a <a class="ref method" href="/docs/ui-glossary/types/source-data/#texture2d">`Texture2D`</a> or a content path, in either order, by texture instance. Comparing with a path loads that path through the `ContentManager`. |
| <a class="ref method" href="/docs/ui-glossary/types/source-data/#equals">`Equals(object obj)`</a> | Whether `obj` is a `SourceData` wrapping the same texture instance. |
| <a class="ref method" href="/docs/ui-glossary/types/source-data/#gethashcode">`GetHashCode()`</a> | The hash code of the wrapped texture, `0` without one. |

Style class: <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> (`Source` and <a class="ref dp" href="/docs/ui-glossary/elements/image/#fill">`Fill`</a>; it sets <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a> to white, see [styles](/docs/ui-styles/)).

## Stencil

Shows a picture through a mask texture: where the mask has the key colour, the picture shows, and the rest of the mask
stays. A portrait in a frame is the usual case.

<figure class="shot">
  <img src="{{ '/assets/img/ui/images-stencil.png' | relative_url }}" width="354" height="182" alt="A knight portrait inside a gold heraldic frame, and on the right small previews of the portrait labelled source and of the frame labelled stencil">
  <figcaption>The stencil, with its source and stencil textures on the right.</figcaption>
</figure>

```csharp
var portrait = new Stencil("portrait")
{
    SourceTexture = LoadTexture("Stencil/Source.png"),     // the picture
    // the frame: half transparent black where the picture shows
    StencilTexture = LoadTexture("Stencil/Stencil.png"),
    KeyColor = new Color(0, 0, 0, 128),                     // the alpha is compared too
    Tolerance = 0.2f,
    DesiredWidth = 152,
    DesiredHeight = 144,
    Margin = (16, 16)
};

ui.AddElementToRoot(portrait);
```

Both textures are scaled to the stencil's size, one pixel for every device pixel it covers, and then combined pixel by
pixel. A stencil pixel is replaced by the source pixel at the same place when its red, green and blue are within
<a class="ref dp" href="/docs/ui-glossary/elements/stencil/#tolerance">`Tolerance`</a> of <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#keycolor">`KeyColor`</a> (the distance between the two colours, with each channel from 0 to 1) and its alpha is within
<a class="ref dp" href="/docs/ui-glossary/elements/stencil/#tolerance">`Tolerance`</a> of the key's alpha as well. Every other stencil pixel stays as it is.

The alpha counts: the hole of this stencil is half transparent black, so the key is `new Color(0, 0, 0, 128)`. The
opaque `Color.Black` with a small tolerance would not key it, and the hole would stay dark.

The result is computed on the CPU and kept in a texture, so a stencil costs texture memory (the two scaled textures and
the result, each of its device size). It is computed again only when a texture, the size, <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#keycolor">`KeyColor`</a> or <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#tolerance">`Tolerance`</a>
changes, not every frame. The result is shown by an inner <a class="ref" href="/docs/ui-glossary/elements/image/">`Image`</a> stretched over the stencil.

A stencil without a size of its own that fits its content takes the size of <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#stenciltexture">`StencilTexture`</a>. It takes no items: it is
made of its own parts only. The stencil doesn't dispose the textures you give it.

### Stencil properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#sourcetexture">`SourceTexture`</a> | `Texture2D` | The picture that shows where the stencil has the key colour. Not part of <a class="ref" href="/docs/ui-glossary/types/stencil-style/">`StencilStyle`</a>. |
| <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#stenciltexture">`StencilTexture`</a> | `Texture2D` | The mask drawn over the picture. A stencil that fits its content takes its size. Not part of <a class="ref" href="/docs/ui-glossary/types/stencil-style/">`StencilStyle`</a>. |
| <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#keycolor">`KeyColor`</a> | `Color` | The stencil colour, alpha included, where the source shows through. Defaults to transparent black (`0, 0, 0, 0`). |
| <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#tolerance">`Tolerance`</a> | `float` | How far a stencil pixel may be from <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#keycolor">`KeyColor`</a> and still be keyed, on a 0 to 1 scale per channel. Defaults to `0` (an exact match). |

### Stencil methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/stencil/#stencil">`Stencil(string name = null)`</a> | Creates a stencil. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |

Style class: <a class="ref" href="/docs/ui-glossary/types/stencil-style/">`StencilStyle`</a> (<a class="ref dp" href="/docs/ui-glossary/elements/stencil/#keycolor">`KeyColor`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#tolerance">`Tolerance`</a>, see [styles](/docs/ui-styles/)).

## ViewPort

Reserves a rectangle in the layout and runs your own drawing code inside it, for a 3D scene, a minimap or any other
render embedded in the UI.

<figure class="shot">
  <img src="{{ '/assets/img/ui/images-viewport.png' | relative_url }}" width="314" height="202" alt="A dark rectangle with the Beryllium UI logo drawn rotated in its middle">
  <figcaption>A view port whose draw instructions draw a rotated texture with their own sprite batch.</figcaption>
</figure>

```csharp
var logo = LoadTexture("Logo/BerylliumUI Logo.png");
var batch = new SpriteBatch(GraphicsDevice);
var angle = 0.5f;

var scene = new ViewPort("scene")
{
    DesiredWidth = 280,
    DesiredHeight = 168,
    BackgroundColor = new Color(8, 6, 4),
    Margin = 16
};

// runs inside the view port: GraphicsDevice.Viewport is the view port's rectangle,
// in device pixels
scene.DrawInstructions = () =>
{
    var viewport = GraphicsDevice.Viewport;
    var size = Math.Min(viewport.Width, viewport.Height) * 0.7f;

    batch.Begin();
    batch.Draw(logo,
        new Vector2(viewport.Width / 2f, viewport.Height / 2f),
        null,
        Color.White,
        angle,
        new Vector2(logo.Width / 2f, logo.Height / 2f),
        size / logo.Width,
        SpriteEffects.None,
        0f);
    batch.End();
};

ui.AddElementToRoot(scene);
```

<a class="ref prop" href="/docs/ui-glossary/elements/view-port/#drawinstructions">`DrawInstructions`</a> runs while the UI draws, after the view port's background and children, so your drawing lies on top
of them. Before it runs, the UI ends its sprite batch and sets three device states:

- `GraphicsDevice.Viewport` is the view port's whole rectangle in device pixels (<a class="ref prop" href="/docs/ui-glossary/elements/view-port/#devicebounds">`DeviceBounds`</a>), with <a class="ref dp" href="/docs/ui-glossary/elements/view-port/#mindepth">`MinDepth`</a> and
  <a class="ref dp" href="/docs/ui-glossary/elements/view-port/#maxdepth">`MaxDepth`</a> as its depth range. Draw relative to it: `(0, 0)` is the view port's top left corner, and
  `GraphicsDevice.Viewport.Width` and `Height` give its size. The drawing is not scaled by the UI's display scale, so
  size it by these device pixels.
- `GraphicsDevice.ScissorRectangle` is the part of the view port that is on screen (<a class="ref prop" href="/docs/ui-glossary/elements/view-port/#visiblerectangle">`VisibleRectangle`</a>, in device
  pixels). The viewport keeps its full size when a parent crops the view port, so the projection of your drawing does
  not change while it scrolls.
- `GraphicsDevice.RasterizerState` is a state with `ScissorTestEnable` set, so draws that keep it are cut to the
  visible part.

Afterwards the viewport, the scissor rectangle and the rasterizer state are restored and the UI's sprite batch starts
again. The instructions are skipped while <a class="ref prop" href="/docs/ui-glossary/elements/view-port/#drawinstructions">`DrawInstructions`</a> is `null`, while the view port is hidden, has no size, or is
cropped away entirely.

`SpriteBatch.Begin()` sets its own rasterizer state, and without one it uses `RasterizerState.CullCounterClockwise`,
which has no scissor test. Your drawing then spills over the edges of a view port that a parent crops (a scrollable
container). Give your own batches a rasterizer state with the scissor test on; create it once, not every frame:

```csharp
var clipped = new RasterizerState { ScissorTestEnable = true };

batch.Begin(rasterizerState: clipped);   // cut to scene.VisibleRectangle
```

A view port doesn't take the mouse by default (its style sets <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a> to `false`).

### ViewPort properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/view-port/#drawinstructions">`DrawInstructions`</a> | `Action` | Your drawing code, run every frame inside the view port as described above. |
| <a class="ref prop" href="/docs/ui-glossary/elements/view-port/#visiblerectangle">`VisibleRectangle`</a> | `Rectangle` | Read-only. The part of the view port that is on screen, in logical units like the element's bounds: smaller than the view port where a parent crops it. The scissor rectangle is set to its device pixels. |
| <a class="ref prop" href="/docs/ui-glossary/elements/view-port/#devicebounds">`DeviceBounds`</a> | `Rectangle` | Read-only. The view port's bounds in device pixels, the rectangle `GraphicsDevice.Viewport` is set to. |
| <a class="ref dp" href="/docs/ui-glossary/elements/view-port/#mindepth">`MinDepth`</a> | `float` | The minimum depth of the viewport's depth range. Defaults to <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultmindepth">`DefaultSettings.DefaultMinDepth`</a> (`0`). |
| <a class="ref dp" href="/docs/ui-glossary/elements/view-port/#maxdepth">`MaxDepth`</a> | `float` | The maximum depth of the viewport's depth range. Defaults to <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultmaxdepth">`DefaultSettings.DefaultMaxDepth`</a> (`1`). |

### ViewPort methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/view-port/#viewport">`ViewPort(string name = null)`</a> | Creates a view port. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |

Style class: <a class="ref" href="/docs/ui-glossary/types/view-port-style/">`ViewPortStyle`</a> (<a class="ref dp" href="/docs/ui-glossary/elements/view-port/#mindepth">`MinDepth`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/view-port/#maxdepth">`MaxDepth`</a>, see [styles](/docs/ui-styles/)).

## Drag and drop

Any element can be dragged with the left mouse button. Its <a class="ref" href="/docs/ui-glossary/types/drag-type/">`DragType`</a> decides what a drag does; the drag members
(<a class="ref" href="/docs/ui-glossary/types/drag-type/">`DragType`</a>, <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a>, <a class="ref" href="/docs/ui-glossary/elements/drag-and-drop-representation/">`DragAndDropRepresentation`</a>, <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#isdropallowedpredicate">`IsDropAllowedPredicate`</a>, <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondraganddropstart">`OnDragAndDropStart`</a>, <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondrop">`OnDrop`</a>,
<a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondropdenied">`OnDropDenied`</a>) are on the [base element](/docs/ui-base-element/).

<figure class="shot">
  <img src="{{ '/assets/img/ui/images-draganddrop.png' | relative_url }}" width="416" height="162" alt="A Torch card on the left, a half transparent copy of it being dragged, and an outlined Slot on the right">
  <figcaption>The card's half transparent representation follows the mouse towards the slot.</figcaption>
</figure>

```csharp
var card = new Label("card")
{
    Text = "Torch",
    TextAlignment = TextAlignment.Center,
    VerticalTextAlignment = VerticalTextAlignment.Center,
    ForegroundColor = new Color(20, 14, 10),
    BackgroundColor = new Color(233, 194, 122),
    DesiredWidth = 90,
    DesiredHeight = 120,
    Margin = (16, 24),
    HitTest = true,
    DragType = DragType.DragAndDrop,
    // what follows the mouse: a half transparent picture of the card
    DragAndDropRepresentation = new DragAndDropRepresentation
    {
        UseTargetAppearance = true,
        Transparency = 0.4f
    }
};

var slot = new Border("slot")
{
    Thickness = 2,
    ForegroundColor = new Color(168, 131, 74),
    BackgroundColor = new Color(26, 20, 15),
    DesiredWidth = 98,
    DesiredHeight = 128,
    Margin = (300, 20),
    HitTest = true,
    Content = new Label
    {
        Text = "Slot",
        HorizontalAlignment = HorizontalAlignment.Center,
        VerticalAlignment = VerticalAlignment.Center
    }
};

// decides whether the dragged element may land here, and what happens when it does
slot.IsDropAllowedPredicate = dragged => dragged == card;
slot.OnDrop += (dragged, destination) => Console.WriteLine("Dropped in the slot");
slot.OnDropDenied += (dragged, destination) => Console.WriteLine("Not here");

ui.AddElementToRoot(card);
ui.AddElementToRoot(slot);
```

The drag starts when the left button is pressed on the element and ends when it is released. The element dragged is
its <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a>, which is the element itself unless you set another one. Both the element you press and the drop
target must take the mouse: a <a class="ref" href="/docs/ui-glossary/elements/label/">`Label`</a> doesn't by default, hence `HitTest = true` in the snippet.

With `DragOnly` the dragged element moves with the mouse: every frame, the mouse movement is added to its left and top
margins and taken from its right and bottom margins, so a stretched element keeps its size. A window's title bar works this way, with the window as its
<a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a>:

```csharp
titleBar.DragType = DragType.DragOnly;
titleBar.DragTarget = window;
```

With `DragAndDrop` the dragged element stays where it is. Its <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondraganddropstart">`OnDragAndDropStart`</a> is raised, and its
[`DragAndDropRepresentation`](#draganddroprepresentation), if it has one, is shown above everything else and follows
the mouse, keeping the point you grabbed under the cursor. A drag and drop without a representation works the same, with
nothing drawn under the mouse.

While the mouse is over an element, that element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#isdropallowedpredicate">`IsDropAllowedPredicate`</a> is asked whether it takes the dragged
element, and the element goes into the `DropAllowed` or `DropDenied` state. On release, the element under the mouse
raises <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondrop">`OnDrop`</a> when the predicate said yes and <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondropdenied">`OnDropDenied`</a> otherwise; an element without a predicate denies every
drop. Both handlers get the dragged element and the drop target. Moving the dragged element to its new place is up to
your <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondrop">`OnDrop`</a> handler. A drag released where nothing takes it, over the empty background, over a disabled element or
outside the window, is denied: the root element raises <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondropdenied">`OnDropDenied`</a>.

A part inside a control (a list row, the text of a text box) uses the drag and drop settings of its control when it has
none of its own, so pressing on the text of a draggable control drags the control.

#### `DragType`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/drag-type/#none">`None`</a> | The element can't be dragged. The default. |
| <a class="ref" href="/docs/ui-glossary/types/drag-type/#dragonly">`DragOnly`</a> | Moves the element, or its <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a>, with the mouse by changing its margins. |
| <a class="ref" href="/docs/ui-glossary/types/drag-type/#draganddrop">`DragAndDrop`</a> | Shows the representation under the mouse and drops the element on the element under the mouse on release. |

## DragAndDropRepresentation

The image that follows the mouse during a drag and drop. It is an [`Image`](#image), so it shows its own <a class="ref dp" href="/docs/ui-glossary/elements/image/#source">`Source`</a> at
its own size, unless <a class="ref prop" href="/docs/ui-glossary/elements/drag-and-drop-representation/#usetargetappearance">`UseTargetAppearance`</a> makes it a picture of the dragged element. Set it on the element that is
dragged (the <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a>) through `DragAndDropRepresentation`; <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#transparency">`Transparency`</a> makes it see-through.

The representation doesn't take the mouse, and it is aligned to the top left so that its margin places it under the
mouse; the constructor sets <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#horizontalalignment">`HorizontalAlignment`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#verticalalignment">`VerticalAlignment`</a> for this.

### DragAndDropRepresentation properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/drag-and-drop-representation/#usetargetappearance">`UseTargetAppearance`</a> | `bool` | Whether each drag takes a picture of the dragged element, at the start of the drag, and shows it at the element's size instead of <a class="ref dp" href="/docs/ui-glossary/elements/image/#source">`Source`</a>. The representation owns that picture and disposes it. |

### DragAndDropRepresentation methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/drag-and-drop-representation/#draganddroprepresentation">`DragAndDropRepresentation(string name = null)`</a> | Creates a representation that doesn't take the mouse, aligned to the top left. |

Style class: <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>, as for any image (see [styles](/docs/ui-styles/)).
