---
layout: docs
legend: [prop, dp, method, event]
title: "UI: base element"
description: What every element has in common, input and states, resizing, the root element and how to write your own element.
---

Every element derives from `BaseElement`, so everything on this page applies to all of them: buttons, labels, stack
panels, windows and your own elements. The other UI pages list only what each element adds. Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>: `Foo` is backed by `FooDP`, which a style, a binding or an animation can
set (see [styles, bindings and animation](/docs/ui-styles/)), and the class has a static `FooDPActions` with the
property's shared actions and default. Screenshots use the theme from
[styles](/docs/ui-styles/#the-theme-of-these-pages).

The event handler types are delegates nested in `BaseElement` (<a class="ref" href="/docs/ui-glossary/types/base-element-click/">`BaseElement.Click`</a>, <a class="ref" href="/docs/ui-glossary/types/base-element-key-down/">`BaseElement.KeyDown`</a> and so on);
the tables give their signatures.

## Size and position

An element's size along each side comes from its own settings and its parent:

- With a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredwidth">`DesiredWidth`</a> (or <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredheight">`DesiredHeight`</a>) above 0 it has that size.
- With 0 and `Stretch` alignment it takes the slot its parent gives it, less its margins.
- With 0 and any other alignment it fits its content.

<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#minwidth">`MinWidth`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#minheight">`MinHeight`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxwidth">`MaxWidth`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxheight">`MaxHeight`</a> then limit the result (0 means no limit). The layout hands the
result back as <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualwidth">`ActualWidth`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualheight">`ActualHeight`</a>, and the position as <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#location">`Location`</a>, in screen coordinates. All of these
are logical units: one unit is one pixel at 100 % display scale (see the [quick start guide](/docs/ui/#display-scaling)).

In its slot an element is placed by its alignment and margins: `Left` / `Top` at its left / top margin, `Right` /
`Bottom` at its right / bottom margin, `Center` centred between both margins, `Stretch` over the whole slot less both
margins. A `Stretch` element that has a desired size is placed at its left / top margin.

A child's margin counts toward the content size of a parent that fits its content only on the side the child is
aligned to: the left / top margin for `Left` / `Top`, the right / bottom margin for `Right` / `Bottom`, both for
`Center`, and both for a `Stretch` child without a desired size (with one, only the left / top margin). The margin on
the other side is not counted. So in a horizontal <a class="ref" href="/docs/ui-glossary/elements/stack-panel/">`StackPanel`</a>, the <a class="ref" href="/docs/ui-glossary/types/margin/#right-1">`Margin.Right`</a> of a `Left` aligned item adds no
gap: put the gap on the left (or top) margin of the next item. A stretched child in a parent that fits its content
counts with the size of its own content, as in WPF, except wrapping text along the width: it takes the width the rest
of the content decides and wraps there. When nothing else gives a width, it keeps its one line, and a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxwidth">`MaxWidth`</a> on the
parent makes it wrap (see [sizes and alignment](/docs/ui/#sizes-and-alignment)).

### Size and position properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredwidth">`DesiredWidth`</a> | `int` | The width in units. 0 (the default) fits the content, or stretches over the slot when <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#horizontalalignment">`HorizontalAlignment`</a> is `Stretch`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredheight">`DesiredHeight`</a> | `int` | The height in units. 0 (the default) fits the content, or stretches over the slot when <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#verticalalignment">`VerticalAlignment`</a> is `Stretch`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#minwidth">`MinWidth`</a> | `int` | The smallest width the layout (and a resize) gives the element. 0 is no limit. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#minheight">`MinHeight`</a> | `int` | The smallest height the layout (and a resize) gives the element. 0 is no limit. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxwidth">`MaxWidth`</a> | `int` | The largest width the layout (and a resize) gives the element. 0 is no limit. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxheight">`MaxHeight`</a> | `int` | The largest height the layout (and a resize) gives the element. 0 is no limit. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#horizontalalignment">`HorizontalAlignment`</a> | <a class="ref" href="/docs/ui-glossary/types/horizontal-alignment/">`HorizontalAlignment`</a> | Where the element sits in its slot horizontally, and whether it stretches over it. The default is `Stretch`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#verticalalignment">`VerticalAlignment`</a> | <a class="ref" href="/docs/ui-glossary/types/vertical-alignment/">`VerticalAlignment`</a> | Where the element sits in its slot vertically, and whether it stretches over it. The default is `Stretch`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#margin">`Margin`</a> | <a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> | The space between the element and the edges of its slot. Which sides count is described above. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualwidth">`ActualWidth`</a> | `int` | Read-only. The width the last layout gave the element, within its size limits. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualheight">`ActualHeight`</a> | `int` | Read-only. The height the last layout gave the element, within its size limits. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#location">`Location`</a> | `Point` | Read-only. The top left corner of the element on the screen. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#left">`Left`</a> | `int` | Read-only. `Location.X`. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#top">`Top`</a> | `int` | Read-only. `Location.Y`. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#right">`Right`</a> | `int` | Read-only. `Left + ActualWidth`. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#bottom">`Bottom`</a> | `int` | Read-only. `Top + ActualHeight`. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#bounds">`Bounds`</a> | `Rectangle` | Read-only. <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#location">`Location`</a> and the actual size as one rectangle. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#hitrectangle">`HitRectangle`</a> | `Rectangle` | Read-only. The part of the element on screen: its bounds as its cropping parents leave them (a scrollable container, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#cropoutsideofparentborder">`CropOutsideOfParentBorder`</a>), empty when it is cropped away. The mouse hits the element only inside it. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#measuredwidth">`MeasuredWidth`</a> | `int` | Read-only. The width the last measure found: fixed, stretched over the slot or fitted to the content. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#measuredheight">`MeasuredHeight`</a> | `int` | Read-only. The height the last measure found. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#measuredcontentwidth">`MeasuredContentWidth`</a> | `int` | Read-only. The width the content needed at the last measure, whatever width the element was given. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#measuredcontentheight">`MeasuredContentHeight`</a> | `int` | Read-only. The height the content needed at the last measure. |

The measure and arrange methods (<a class="ref method" href="/docs/ui-glossary/elements/base-element/#measure">`Measure`</a>, <a class="ref method" href="/docs/ui-glossary/elements/base-element/#measureat">`MeasureAt`</a>, <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrange">`Arrange`</a>, <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangeat">`ArrangeAt`</a>, <a class="ref method" href="/docs/ui-glossary/elements/base-element/#invalidatemeasure">`InvalidateMeasure`</a>,
<a class="ref method" href="/docs/ui-glossary/elements/base-element/#invalidatearrange">`InvalidateArrange`</a>) are public, but you only need them in your own elements: see
[writing your own element](#writing-your-own-element).

#### `HorizontalAlignment`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/horizontal-alignment/#stretch">`Stretch`</a> | Fills the slot less both margins when the element has no <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredwidth">`DesiredWidth`</a>, otherwise sits at the left margin. |
| <a class="ref" href="/docs/ui-glossary/types/horizontal-alignment/#left">`Left`</a> | At the left margin. |
| <a class="ref" href="/docs/ui-glossary/types/horizontal-alignment/#center">`Center`</a> | Centred between the left and the right margin. |
| <a class="ref" href="/docs/ui-glossary/types/horizontal-alignment/#right">`Right`</a> | At the right margin. |

#### `VerticalAlignment`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/vertical-alignment/#stretch">`Stretch`</a> | Fills the slot less both margins when the element has no <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredheight">`DesiredHeight`</a>, otherwise sits at the top margin. |
| <a class="ref" href="/docs/ui-glossary/types/vertical-alignment/#top">`Top`</a> | At the top margin. |
| <a class="ref" href="/docs/ui-glossary/types/vertical-alignment/#center">`Center`</a> | Centred between the top and the bottom margin. |
| <a class="ref" href="/docs/ui-glossary/types/vertical-alignment/#bottom">`Bottom`</a> | At the bottom margin. |

#### `Orientation`

Used by <a class="ref" href="/docs/ui-glossary/elements/stack-panel/">`StackPanel`</a>, <a class="ref" href="/docs/ui-glossary/elements/slider/">`Slider`</a> and <a class="ref" href="/docs/ui-glossary/elements/progress-bar/">`ProgressBar`</a>, see [layout](/docs/ui-layout/) and [controls](/docs/ui-controls/).

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/orientation/#horizontal">`Horizontal`</a> | From left to right. |
| <a class="ref" href="/docs/ui-glossary/types/orientation/#vertical">`Vertical`</a> | From top to bottom. |

### Margin

A small read-only struct with one value per side. It converts implicitly from an `int` and from tuples, so you rarely
write <code>new <a href="/docs/ui-glossary/types/margin/">Margin</a>(...)</code>:

```csharp
element.Margin = 5;                 // all sides
element.Margin = (10, 20);          // left, top
element.Margin = (10, 20, 30);      // left, top, right
element.Margin = (10, 20, 30, 40);  // left, top, right, bottom
```

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/margin/#left-1">`Left`</a> | `int` | Read-only field. The left margin. |
| <a class="ref prop" href="/docs/ui-glossary/types/margin/#top-1">`Top`</a> | `int` | Read-only field. The top margin. |
| <a class="ref prop" href="/docs/ui-glossary/types/margin/#right-1">`Right`</a> | `int` | Read-only field. The right margin. |
| <a class="ref prop" href="/docs/ui-glossary/types/margin/#bottom-1">`Bottom`</a> | `int` | Read-only field. The bottom margin. |
| <a class="ref prop" href="/docs/ui-glossary/types/margin/#zero">`Zero`</a> | `Margin` | Static, read-only. A margin of 0 on every side. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/margin/#margin">`Margin()`</a> | A margin of 0 on every side. |
| <a class="ref method" href="/docs/ui-glossary/types/margin/#margin">`Margin(int all)`</a> | The same margin on every side. |
| <a class="ref method" href="/docs/ui-glossary/types/margin/#margin">`Margin(int left = 0, int top = 0, int right = 0, int bottom = 0)`</a> | A margin per side; the sides left out are 0. |
| <span class="method"><code>implicit <a href="/docs/ui-glossary/types/margin/#margin">operator</a> <a href="/docs/ui-glossary/types/margin/">Margin</a>(int all)</code></span> | `element.Margin = 5` sets 5 on every side. |
| <span class="method"><code>implicit <a href="/docs/ui-glossary/types/margin/#margin">operator</a> <a href="/docs/ui-glossary/types/margin/">Margin</a>((int left, int top) tuple)</code></span> | Left and top; right and bottom are 0. |
| <span class="method"><code>implicit <a href="/docs/ui-glossary/types/margin/#margin">operator</a> <a href="/docs/ui-glossary/types/margin/">Margin</a>((int left, int top, int right) tuple)</code></span> | Left, top and right; bottom is 0. |
| <span class="method"><code>implicit <a href="/docs/ui-glossary/types/margin/#margin">operator</a> <a href="/docs/ui-glossary/types/margin/">Margin</a>((int left, int top, int right, int bottom) tuple)</code></span> | All four sides. |
| <span class="method"><code><a href="/docs/ui-glossary/types/margin/#section-1">operator</a> -(<a href="/docs/ui-glossary/types/margin/">Margin</a> margin)</code></span> | The margin with every side negated. |
| <span class="method"><code><a href="/docs/ui-glossary/types/margin/#section">operator</a> +(<a href="/docs/ui-glossary/types/margin/">Margin</a> margin1, <a href="/docs/ui-glossary/types/margin/">Margin</a> margin2)</code></span> | Adds the margins side by side. |
| <span class="method"><code><a href="/docs/ui-glossary/types/margin/#section-1">operator</a> -(<a href="/docs/ui-glossary/types/margin/">Margin</a> margin1, <a href="/docs/ui-glossary/types/margin/">Margin</a> margin2)</code></span> | Subtracts the second margin from the first, side by side. |
| <span class="method"><code><a href="/docs/ui-glossary/types/margin/#section-1-1">operator</a> ==(<a href="/docs/ui-glossary/types/margin/">Margin</a> margin1, <a href="/docs/ui-glossary/types/margin/">Margin</a> margin2)</code></span> | True when all four sides are equal. `!=` is the opposite. |
| <span class="method"><code><a href="/docs/ui-glossary/types/margin/#equals">Equals</a>(<a href="/docs/ui-glossary/types/margin/">Margin</a> other)</code></span> | True when all four sides are equal (<a class="ref method" href="/docs/ui-glossary/types/margin/#equals">`Equals(object)`</a> as well, for another `Margin`). |
| <a class="ref method" href="/docs/ui-glossary/types/margin/#gethashcode">`GetHashCode()`</a> | A hash of the four sides. |
| <a class="ref method" href="/docs/ui-glossary/types/margin/#tostring">`ToString()`</a> | The sides as text, for example `L: 10 R: 30 T: 20 B: 40`. |

## Appearance

Without textures an element fills its bounds with <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a>. With <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> set, the elements that use
textures draw them from that folder instead (each element's section says which textures it reads). A disabled element
is drawn darker, and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#transparency">`Transparency`</a> fades the element together with everything inside it.

<figure class="shot">
  <img src="{{ '/assets/img/ui/base-transparency.png' | relative_url }}" width="494" height="98" alt="Four sand colored labels reading 0.00, 0.25, 0.50 and 0.75, each one more faded into the dark background than the one before">
  <figcaption>The same label at a transparency of 0, 0.25, 0.5 and 0.75.</figcaption>
</figure>

```csharp
var row = new StackPanel { Orientation = Orientation.Horizontal, Margin = (16, 16) };

foreach (var transparency in new[] { 0f, 0.25f, 0.5f, 0.75f })
    row.AddItem(new Label
    {
        Text = $"{transparency:0.00}",
        DesiredWidth = 100,
        DesiredHeight = 64,
        TextAlignment = TextAlignment.Center,
        VerticalTextAlignment = VerticalTextAlignment.Center,
        ForegroundColor = new Color(20, 14, 10),
        BackgroundColor = new Color(233, 194, 122),
        Transparency = transparency,
        Margin = (transparency == 0 ? 0 : 20, 0)
    });

ui.AddElementToRoot(row);
```

Transparency is inherited: an element's own transparency combines with its parent's (their opacities multiply), so a
child is never more opaque than the panel it is in. <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#visibility">`Visibility`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#disabled">`Disabled`</a> are inherited the same way: the
children of a hidden or disabled element are hidden or disabled with it, while their own properties keep their values.

`Hidden` keeps the element's space in the layout but draws nothing and takes no input; `Collapsed` also gives it no
size, so the elements around it move up.

Overlapping siblings are drawn in the order they were added, the last one on top, and the mouse goes to the one on
top. <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#zindex">`ZIndex`</a> changes that order: a sibling with a higher <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#zindex">`ZIndex`</a> is drawn above and gets the mouse first, a lower
one (it can be negative) goes below, and siblings with the same <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#zindex">`ZIndex`</a> keep the order they were added in. The
layout, the order of the items and the keyboard order stay as they are.

<figure class="shot">
  <img src="{{ '/assets/img/ui/base-zindex.png' | relative_url }}" width="374" height="138" alt="Three overlapping cards, First, Second and Third, where the lower Second card covers a corner of each of its neighbours">
  <figcaption>The second card has a ZIndex of 1, so it lies over the third card, which was added after it.</figcaption>
</figure>

```csharp
Label Card(string text, Color color, int left, int top) => new()
{
    Text = text,
    DesiredWidth = 140,
    DesiredHeight = 80,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (left, top),
    TextAlignment = TextAlignment.Center,
    VerticalTextAlignment = VerticalTextAlignment.Center,
    ForegroundColor = new Color(20, 14, 10),
    BackgroundColor = color
};

var first = Card("First", new Color(233, 194, 122), 16, 16);
var second = Card("Second", new Color(242, 166, 90), 116, 40);
var third = Card("Third", new Color(181, 199, 122), 216, 16);

// added second, drawn last: above both of its neighbours
second.ZIndex = 1;

ui.AddElementToRoot(first);
ui.AddElementToRoot(second);
ui.AddElementToRoot(third);
```

<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#zindex">`ZIndex`</a> orders siblings only: an element stays where its parent is among the parent's siblings, and the parent's
clipping still applies. A stack panel and a list keep every item in a slot of its own, so their items don't overlap.
In a [grid](/docs/ui-layout/#grid) a cell goes by the highest <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#zindex">`ZIndex`</a> of its items, so an item spanning other cells
can be put above or below their items. Non-modal [windows](/docs/ui-layout/#window) stay above their siblings
whatever their <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#zindex">`ZIndex`</a>.

### Appearance properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#visibility">`Visibility`</a> | <a class="ref" href="/docs/ui-glossary/types/visibility/">`Visibility`</a> | Whether the element is shown, hidden in its space or collapsed. The default is `Visible`. A hidden element loses the keyboard focus and any mouse state. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#zindex">`ZIndex`</a> | `int` | The element's place among its overlapping siblings: a higher one is drawn above them and gets the mouse first, a lower one (it can be negative) goes below. The default is 0; siblings with the same one keep the order they were added in. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> | `Color` | The color the element's background is filled with. `Transparent` (the default) fills nothing. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a> | `Color` | The color of what the element draws over its background, such as a label's text. An element drawn from textures tints them with it when it is not `Transparent`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> | `string` | A content folder with the element's textures, for example <code>UITextures/<a href="/docs/ui-glossary/elements/button/">Button</a>/</code>. A missing trailing path separator is added. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#texturespresent">`TexturesPresent`</a> | `bool` | Read-only. True when <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> is set. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#transparency">`Transparency`</a> | `float` | From 0 (opaque, the default) to 1 (invisible); values outside are clamped. Applies to the element and its subtree, combined with the parents' transparency. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#cropoutsideofparentborder">`CropOutsideOfParentBorder`</a> | `bool` | Clips the element to its parent's bounds. Without it the element may overflow its parent but is still clipped by whatever clips the parent (a scroll view, a window's content area). On by default for every element with a style. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#customeffect">`CustomEffect`</a> | `Effect` | A shader the element draws its background (or texture, an image's picture) with. Setting it sets it on the children as well, and a child added later takes it. An effect with a `ModulationColor` parameter gets the draw color there. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#predrawaction">`PreDrawAction`</a> | `Action` | Runs before the element and its subtree are drawn, for example to change the sprite batch state. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#postdrawaction">`PostDrawAction`</a> | `Action` | Runs after the element and its subtree are drawn, for example to restore what <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#predrawaction">`PreDrawAction`</a> changed. |

Tooltips, context menus, drop-downs and modal windows are never clipped by the elements they open from.
<a class="ref prop" href="/docs/ui-glossary/elements/base-element/#predrawaction">`PreDrawAction`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#postdrawaction">`PostDrawAction`</a> come in pairs: a hidden element runs neither of them.

### Appearance methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#draw">`Draw()`</a> | Draws the element, its children and the popups above them. The UI calls it on the root every frame, you don't call it yourself. |

#### `Visibility`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/visibility/#visible">`Visible`</a> | Drawn and takes input. |
| <a class="ref" href="/docs/ui-glossary/types/visibility/#hidden">`Hidden`</a> | Not drawn, takes no input, keeps its space in the layout. |
| <a class="ref" href="/docs/ui-glossary/types/visibility/#collapsed">`Collapsed`</a> | Not drawn, takes no input, has no size. |

## Items and content

The elements you put into another element are its items. <a class="ref method" href="/docs/ui-glossary/elements/base-element/#additem">`AddItem`</a> and the other item methods act on them only, never
on the parts an element made itself (a slider's buttons, a window's title bar). Containers override them: a stack
panel, for example, wraps each item (see its section). Elements that host a single child give it through a `Content`
or <span class="dp">`Text`</span> property instead, and they and the other elements without items (sliders, progress bars, text elements)
ignore the item methods.

An element has one parent. Adding an element that is already in another one throws an `InvalidOperationException`
(remove it there first), adding it to itself throws as well, and adding it again to the element it is in changes
nothing. Null items are ignored.

Ownership decides what is disposed:

- Removing an item (<a class="ref method" href="/docs/ui-glossary/elements/base-element/#removeitem">`RemoveItem`</a>, <a class="ref method" href="/docs/ui-glossary/elements/base-element/#clearitems">`ClearItems`</a> and so on) only detaches it: it is yours, dispose or reuse it.
- <a class="ref method" href="/docs/ui-glossary/elements/base-element/#dispose">`Dispose()`</a> takes the element out of its parent, disposes what it made itself (its parts, the text content of a
  button, its resize areas), detaches what you gave it (items, content, tooltip, context menu, drag representation) and
  raises <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondisposed">`OnDisposed`</a>. A second call does nothing.
- A disposed element can't be added anywhere again: that throws an `ObjectDisposedException`.

### Items and content properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#id-1">`Id`</a> | `Guid` | Read-only field. A unique id made when the element is created. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a> | `string` | Read-only. The name given to the constructor, used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#parent">`Parent`</a> | `BaseElement` | Read-only. The element this one is in, null when it is not in one. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#children">`Children`</a> | <code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt;</code> | Read-only. The element's children: its items and the parts it made itself. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#isdisposed">`IsDisposed`</a> | `bool` | Read-only. True once <a class="ref method" href="/docs/ui-glossary/elements/base-element/#dispose">`Dispose()`</a> was called. |

### Items and content events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondisposed">`OnDisposed`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender)</code> | The element was disposed. Raised once, at the end of <a class="ref method" href="/docs/ui-glossary/elements/base-element/#dispose">`Dispose()`</a>; the handlers are let go afterwards. |

### Items and content methods

| Method | Description |
| --- | --- |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Adds the item after the other children. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> | Inserts the item at the index in `Children`. An index below 0 or above the count is ignored. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> | Adds the items in order after the other children. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> | Inserts the items in order from the index; a null item takes no place. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Takes the item out without disposing it. Does nothing for a part of the element. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#removeitemat">`RemoveItemAt(int index)`</a> | Takes the item at the index out without disposing it. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> | Takes `count` items out from the index on (fewer when the children end first), without disposing them. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#clearitems">`ClearItems()`</a> | Takes every item out without disposing them; the element's own parts stay. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName(string name)`</a> | Finds an element by name below this one (its children first, then deeper, popups such as its tooltip included). Null when there is none. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#dispose">`Dispose()`</a> | Disposes the element as described above. |

<a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/">`BorrowedTorchUI`</a> has a <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName<T>(string name)`</a> that searches from the root and casts the result (see the
[quick start guide](/docs/ui/)).

### DisposableBase

The base class of <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a>, with the dispose pattern every element uses.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/disposable-base/#isdisposed">`IsDisposed`</a> | `bool` | Read-only. True once <a class="ref method" href="/docs/ui-glossary/types/disposable-base/#dispose">`Dispose()`</a> was called. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/disposable-base/#dispose">`Dispose()`</a> | Marks the object disposed and runs <a class="ref method" href="/docs/ui-glossary/types/disposable-base/#disposehandler">`DisposeHandler`</a> once; later calls do nothing. |
| <a class="ref method" href="/docs/ui-glossary/types/disposable-base/#disposehandler">`DisposeHandler()`</a> | Protected, abstract. The clean-up of the derived class; <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> implements it as described above. |

## Mouse and states

The mouse goes to one element at a time. The UI checks the children before their parent, and the later children
before the earlier ones (the ones drawn on top); the first element with <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a> on whose hit rectangle (its bounds,
cropped by whatever clips it) contains the mouse takes it, and nothing below it is hovered. An element with <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a>
off is passed over, so the element behind it gets the mouse. A hidden element takes no mouse. A disabled element
still takes it (the element behind it is not hovered) but shows no state and raises no mouse events. While a modal
window is shown, only its subtree gets the mouse.

An element's own state is `Hover` while it takes the mouse, `MouseButtonsActivity` while a button pressed on it is
held, and `DropAllowed` or `DropDenied` while a dragged element is over it. <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#statedata">`StateData`</a> holds the state it shows,
which can also come from its parent or its children through <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#inheritstate">`InheritState`</a>: the element shows the highest of its own
state and the ones it takes (in the order of the <a class="ref" href="/docs/ui-glossary/types/element-state/">`ElementState`</a> values; its own state wins a tie). It passes its own
and its children's state up, and its own and its parent's state down, so a state never comes back to where it came
from: a list lit by a hovered row does not light its other rows. A title bar with `FromChildren` lights up while its
label is hovered; the label with `FromParent` lights up with the title bar. The hidden parts of a control pass states
through as if they were not there, so only the elements you created decide.

<figure class="shot">
  <img src="{{ '/assets/img/ui/base-states.png' | relative_url }}" width="486" height="74" alt="Three buttons side by side: Normal in sand brown, Hovered in a lighter sand color, Disabled in a dark brown">
  <figcaption>A button in its normal state, hovered, and disabled.</figcaption>
</figure>

```csharp
var row = new StackPanel { Orientation = Orientation.Horizontal, Margin = (16, 18) };

row.AddItem(new Button { Text = "Normal", DesiredWidth = 140, DesiredHeight = 36 });
row.AddItem(new Button("hovered")
{
    Text = "Hovered",
    DesiredWidth = 140,
    DesiredHeight = 36,
    Margin = (16, 0)
});
row.AddItem(new Button
{
    Text = "Disabled",
    DesiredWidth = 140,
    DesiredHeight = 36,
    Margin = (16, 0),
    Disabled = true
});

ui.AddElementToRoot(row);
```

The element the mouse buttons were pressed on holds the mouse capture until they are released: no other element is
hovered or pressed meanwhile. Moving off it ends its pressed state (<a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseleave">`OnMouseLeave`</a> is raised and repeated clicks stop),
moving back onto it while the button is still held presses it again.

`OnClick` is raised when a mouse button is released over the element it was pressed on, so moving off before releasing
cancels the click. Any button clicks: `e.ButtonsStates` tells which one. A right click also opens the element's
<a class="ref prop" href="/docs/ui-glossary/elements/base-element/#contextmenu">`ContextMenu`</a>. <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondoubleclick">`OnDoubleClick`</a> is raised on the second left press within <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalms">`DoubleClickIntervalMs`</a> of the first; both
releases still raise `OnClick`. For repeated clicks see [click timing](#click-timing).

<a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseenter">`OnMouseEnter`</a> and <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseleave">`OnMouseLeave`</a> are about the element taking the mouse itself, and they always come in pairs. Moving
from a panel onto a child that takes the mouse raises <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseleave">`OnMouseLeave`</a> on the panel. To follow a whole area, give it
<a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a> and watch <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onstatechanged">`OnStateChanged`</a> instead. An element that gets disabled or hidden under the mouse
raises <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseleave">`OnMouseLeave`</a> too. Entering a drop target during a drag and drop raises no <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseenter">`OnMouseEnter`</a>.

Where a part of a control has no <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#tooltip">`ToolTip`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#dragtype">`DragType`</a> or drop settings of its own, the control's apply: a text box's
tooltip shows over its text, and a drop on a list's row is decided and taken by the list. Clicks stay with the part;
the controls raise their own events for them (a selection, a value change).

### Mouse and states properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a> | `bool` | Whether the element itself takes the mouse. On by default for every element with a style; off for an element deriving from `BaseElement` directly. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#disabled">`Disabled`</a> | `bool` | Stops the element and its subtree from showing states, raising mouse events and taking the keyboard, and draws them darker. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#inheritstate">`InheritState`</a> | <a class="ref" href="/docs/ui-glossary/types/inherit-state/">`InheritState`</a> | Which states the element shows besides its own: its parent's, its children's, both or none (the default). |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#statedata">`StateData`</a> | <a class="ref" href="/docs/ui-glossary/types/element-state-data/">`ElementStateData`</a> | Read-only. The state the element shows now and where it comes from. |

### Mouse and states events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onstatechanged">`OnStateChanged`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/element-state-data/">ElementStateData</a> e)</code> | The state the element shows changes, its own or one it takes. Raised again for every change of the mouse buttons while the element is pressed. |
| <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseenter">`OnMouseEnter`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender)</code> | The element starts taking the mouse. |
| <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseleave">`OnMouseLeave`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender)</code> | The element stops taking the mouse: the mouse left, moved onto a child that takes it, or the element got disabled or hidden. |
| <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onclick">`OnClick`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/mouse-click-event-args/">MouseClickEventArgs</a> e)</code> | A mouse button pressed on the element is released over it (with <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#repeatclicks">`RepeatClicks`</a>: on the press and while it is held). |
| <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondoubleclick">`OnDoubleClick`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/mouse-click-event-args/">MouseClickEventArgs</a> e)</code> | The left button is pressed a second time within <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalms">`DoubleClickIntervalMs`</a>. Not raised by an element with <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#repeatclicks">`RepeatClicks`</a>. |

#### `InheritState`

A set of flags: the values combine.

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/inherit-state/#none">`None`</a> | Shows its own state only. |
| <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromparent">`FromParent`</a> | Also shows its parent's state (its own and what the parent took from above). |
| <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`FromChildren`</a> | Also shows the highest state of its children. |
| <a class="ref" href="/docs/ui-glossary/types/inherit-state/#both">`Both`</a> | <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromparent">`FromParent`</a> and <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`FromChildren`</a>. |

#### `ElementState`

From the lowest to the highest.

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/element-state/#normal">`Normal`</a> | Nothing is happening to the element. |
| <a class="ref" href="/docs/ui-glossary/types/element-state/#hover">`Hover`</a> | The element takes the mouse. |
| <a class="ref" href="/docs/ui-glossary/types/element-state/#mousebuttonsactivity">`MouseButtonsActivity`</a> | A mouse button pressed on the element is held. |
| <a class="ref" href="/docs/ui-glossary/types/element-state/#dropdenied">`DropDenied`</a> | A dragged element is over the element and it does not take the drop. |
| <a class="ref" href="/docs/ui-glossary/types/element-state/#dropallowed">`DropAllowed`</a> | A dragged element is over the element and it takes the drop. |

#### `StateSource`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/state-source/#own">`Own`</a> | The element's own state. |
| <a class="ref" href="/docs/ui-glossary/types/state-source/#parent">`Parent`</a> | Taken from the parent (<a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromparent">`InheritState.FromParent`</a>). |
| <a class="ref" href="/docs/ui-glossary/types/state-source/#children">`Children`</a> | Taken from the children (<a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>). |

### ElementStateData

The state an element shows, passed to <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onstatechanged">`OnStateChanged`</a>. The UI shares one immutable instance per state and source.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/element-state-data/#state">`State`</a> | <a class="ref" href="/docs/ui-glossary/types/element-state/">`ElementState`</a> | Read-only. The state shown. |
| <a class="ref prop" href="/docs/ui-glossary/types/element-state-data/#source">`Source`</a> | <a class="ref" href="/docs/ui-glossary/types/state-source/">`StateSource`</a> | Read-only. Where the state comes from. |
| <a class="ref prop" href="/docs/ui-glossary/types/element-state-data/#mousebuttonsstates">`MouseButtonsStates`</a> | <a class="ref prop" href="/docs/ui-glossary/types/element-state-data/#mousebuttonsstates">`MouseButtonsStates`</a> | Read-only. The current states of the mouse buttons (read when you read it, not stored with the state). |
| <a class="ref prop" href="/docs/ui-glossary/types/element-state-data/#normalown-1">`NormalOwn`</a> | `ElementStateData` | Static, read-only field. The `Normal` / `Own` state every element starts with. |

| Method | Description |
| --- | --- |
| <span class="method"><code><a href="/docs/ui-glossary/types/element-state-data/#elementstatedata">ElementStateData</a>(<a href="/docs/ui-glossary/types/element-state/">ElementState</a> state, <a href="/docs/ui-glossary/types/state-source/">StateSource</a> source)</code></span> | Creates a state, for example to compare with <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#statedata">`StateData`</a>. |
| <span class="method"><code><a href="/docs/ui-glossary/types/element-state-data/#section">operator</a> ==(<a href="/docs/ui-glossary/types/element-state-data/">ElementStateData</a> state1, <a href="/docs/ui-glossary/types/element-state-data/">ElementStateData</a> state2)</code></span> | True when the state and the source are equal. `!=` and `Equals` compare the same way. |
| <a class="ref method" href="/docs/ui-glossary/types/element-state-data/#gethashcode">`GetHashCode()`</a> | A hash of the state and the source. |
| <a class="ref method" href="/docs/ui-glossary/types/element-state-data/#tostring">`ToString()`</a> | The state and the source as text, separated by a vertical bar. |

### MouseClickEventArgs

What `OnClick` and <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondoubleclick">`OnDoubleClick`</a> get, taken when the click happens.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/mouse-click-event-args/#mouseposition">`MousePosition`</a> | `Point` | Read-only. The mouse position in units, like the element positions. |
| <a class="ref prop" href="/docs/ui-glossary/types/mouse-click-event-args/#buttonsstates">`ButtonsStates`</a> | `MouseButtonsStates` | Read-only. The states of the mouse buttons, to tell which button clicked. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/mouse-click-event-args/#mouseclickeventargs">`MouseClickEventArgs()`</a> | Takes the current mouse position and buttons states. |

## Click timing

Four properties set how an element turns presses into clicks. Their defaults come from <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a>
(`DefaultTimeBeforeRepeatStartsMs`, `DefaultTimeBetweenRepeatsMs`, `DefaultDoubleClickIntervalMs`); change those before
you create the elements to change them everywhere (see [styles](/docs/ui-styles/)).

With <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#repeatclicks">`RepeatClicks`</a> on, `OnClick` is raised as soon as the left button is pressed, again after
<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebeforerepeatstartsms">`TimeBeforeRepeatStartsMs`</a>, then every <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebetweenrepeatsms">`TimeBetweenRepeatsMs`</a> while the button is held over the element. The repeats
stop when the button is released, when the mouse leaves the element, and when the element is disabled, hidden or
removed. A repeating element raises no `OnClick` on release and no <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondoubleclick">`OnDoubleClick`</a>, and only the left button clicks it.

A control passes its timings to its own parts: setting <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebeforerepeatstartsms">`TimeBeforeRepeatStartsMs`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebetweenrepeatsms">`TimeBetweenRepeatsMs`</a> or
<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalms">`DoubleClickIntervalMs`</a> on a list sets them on its scroll bars too (also on parts added later, such as a scroll bar
shown for the first time). Your own elements inside a control keep theirs. <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#repeatclicks">`RepeatClicks`</a> is not passed on.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#repeatclicks">`RepeatClicks`</a> | `bool` | Raises `OnClick` on the press and repeatedly while the left button is held, instead of once on release. Off by default. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebeforerepeatstartsms">`TimeBeforeRepeatStartsMs`</a> | `int` | Milliseconds from the press to the first repeated click. 1000 by default; negative values are taken as 0. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebetweenrepeatsms">`TimeBetweenRepeatsMs`</a> | `int` | Milliseconds between the repeated clicks after the first one. 300 by default; negative values are taken as 0. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalms">`DoubleClickIntervalMs`</a> | `int` | The longest time in milliseconds between two left presses that make a double click. 300 by default; negative values are taken as 0. |

## Keyboard and focus

One element at a time has the keyboard. <a class="ref method" href="/docs/ui-glossary/elements/base-element/#focus">`Focus()`</a> gives it to an element; the keys and the typed text then go to that
element only, until another element is focused, a mouse press lands outside of it, or it is hidden, disabled or taken
out of the tree. Without a focused element no element gets keys.

A key goes to the focused element first, then up through its parents until one sets `Handled`. On each element the
element's own use of the key comes first, then its <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onkeydown">`OnKeyDown`</a>. The built-in controls handle the keys they use (a list
its navigation keys, a text box its caret keys, an open context menu every key), so a window or a panel around them
gets the others, such as Escape or a shortcut:

```csharp
window.OnKeyDown += (_, e) =>
{
    if (e.Key != Keys.Escape) return;

    window.Hide();
    e.Handled = true;
};
```

The focused element's own <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onkeydown">`OnKeyDown`</a> is raised even for a key its control used; `Handled` is already true then.

### Keyboard and focus properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#isfocused">`IsFocused`</a> | `bool` | Read-only. True while the element has the keyboard. |

### Keyboard and focus events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onkeydown">`OnKeyDown`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/key-down-event-args/">KeyDownEventArgs</a> e)</code> | A key is pressed while the element, or an element inside it that left the key unhandled, has the keyboard. |

### Keyboard and focus methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#focus">`Focus()`</a> | Gives the element the keyboard. Returns false when it can't take it: it is not in the tree, hidden or disabled. |

### KeyDownEventArgs

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/key-down-event-args/#key">`Key`</a> | `Keys` | Read-only. The key pressed. |
| <a class="ref prop" href="/docs/ui-glossary/types/key-down-event-args/#handled">`Handled`</a> | `bool` | Set it to true to stop the key from going on to the parents. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/key-down-event-args/#keydowneventargs">`KeyDownEventArgs(Keys key)`</a> | Creates the arguments for a key. |

## Tooltips and context menus

Any element can have a tooltip and a context menu. Both are elements you create and give to it; neither is disposed
with the element, and setting the property to null (or to another tooltip or menu) only detaches the old one. A
tooltip or menu belongs to one element at a time: giving it to another element takes it from the first.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#tooltip">`ToolTip`</a> | <a class="ref" href="/docs/ui-glossary/elements/tool-tip/">`ToolTip`</a> | Shown while the element is hovered, after the tooltip's delay. See [ToolTip](/docs/ui-controls/#tooltip). |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#contextmenu">`ContextMenu`</a> | <a class="ref" href="/docs/ui-glossary/elements/context-menu/">`ContextMenu`</a> | Opened at the mouse by a right click on the element, or on an element inside it without a menu of its own. See [ContextMenu](/docs/ui-lists/#contextmenu). |

## Resizing

Set <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#isresizable">`IsResizable`</a> to let the user resize an element with the mouse. It gets resize areas over its edges and corners,
reaching <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#resizeareahalfwidth">`ResizeAreaHalfWidth`</a> units to each side of the edge, with the resize cursors of its <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#mousecursorsset">`MouseCursorsSet`</a>.
Dragging an area changes <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredwidth">`DesiredWidth`</a> / <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredheight">`DesiredHeight`</a> (or the margins of a stretched element without a desired
size) so that the opposite edge stays where it was; a centred element grows on both sides. The size stays within
<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#minwidth">`MinWidth`</a> ... <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxheight">`MaxHeight`</a>; without a minimum it is at least two resize areas wide. The element needs a parent; the root can't be made
resizable.

With <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#resizewithelementcontour">`ResizeWithElementContour`</a> the element stays as it is while you drag: a contour, drawn above everything, shows
the new bounds, and the element is resized there once when the button is released.

<figure class="shot">
  <img src="{{ '/assets/img/ui/base-resize.png' | relative_url }}" width="348" height="154" alt="The mouse cursor goes to the right edge of a dark panel reading Pull the edges and drags it to the right; a sand colored contour follows the cursor, and when the button is released the panel takes the contour's width">
  <figcaption>The cursor pulls the right edge: the contour follows it, and the panel is resized to the contour on release.</figcaption>
</figure>

```csharp
var panel = new Label("panel")
{
    Text = "Pull the edges",
    TextAlignment = TextAlignment.Center,
    VerticalTextAlignment = VerticalTextAlignment.Center,
    DesiredWidth = 200,
    DesiredHeight = 120,
    MinWidth = 120,
    MaxWidth = 400,
    BackgroundColor = new Color(40, 31, 23),
    Margin = (16, 16),
    IsResizable = true,
    ResizeAreaHalfWidth = 4,
    ResizeWithElementContour = true,
    ResizeContourColor = new Color(233, 194, 122)
};

ui.AddElementToRoot(panel);
```

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#isresizable">`IsResizable`</a> | `bool` | Lets the user resize the element by dragging its edges and corners. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#resizeareahalfwidth">`ResizeAreaHalfWidth`</a> | `int` | How far the resize areas reach to each side of the edges, in units. 3 by default (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultresizeareahalfwidth">`DefaultSettings.DefaultResizeAreaHalfWidth`</a>); negative values are taken as 0. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#resizewithelementcontour">`ResizeWithElementContour`</a> | `bool` | Shows a contour while dragging and resizes the element once on release, instead of resizing it as the mouse moves. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#resizecontourcolor">`ResizeContourColor`</a> | `Color` | The color of the contour. `(50, 50, 50, 190)` by default (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultresizecontourcolor">`DefaultSettings.DefaultResizeContourColor`</a>); it fades and darkens with the element. |

<a class="ref" href="/docs/ui-glossary/types/resize-state/">`ResizeState`</a> names the edge or corner a resize drags; <a class="ref" href="/docs/ui-glossary/types/resize-cursors/">`ResizeCursors`</a> has a cursor set for each one (see
[styles](/docs/ui-styles/)).

| Value | Meaning |
| --- | --- |
| `None` | No resize. |
| `LeftTop` | The top left corner. |
| `RightTop` | The top right corner. |
| `LeftBottom` | The bottom left corner. |
| `RightBottom` | The bottom right corner. |
| `Left` | The left edge. |
| `Right` | The right edge. |
| `Top` | The top edge. |
| `Bottom` | The bottom edge. |

## Drag and drop properties

An element with a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#dragtype">`DragType`</a> is dragged with the left button. `DragOnly` moves its <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a> with the mouse by
changing its margins (a window's title bar moves the window this way). `DragAndDrop` shows the target's
<a class="ref prop" href="/docs/ui-glossary/elements/base-element/#draganddroprepresentation">`DragAndDropRepresentation`</a> under the mouse and asks each element it passes over whether it takes the drop. The full
walk-through with a screenshot is on the [images page](/docs/ui-images/#drag-and-drop).

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#dragtype">`DragType`</a> | <a class="ref" href="/docs/ui-glossary/types/drag-type/">`DragType`</a> | Whether a press on the element drags something: nothing (the default), the element itself, or a drag and drop. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a> | `BaseElement` | The element that is dragged; the element itself by default. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#draganddroprepresentation">`DragAndDropRepresentation`</a> | <a class="ref" href="/docs/ui-glossary/elements/drag-and-drop-representation/">`DragAndDropRepresentation`</a> | What is drawn under the mouse while the element is the dragged one. Detached, not disposed, with the element. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#isdropallowedpredicate">`IsDropAllowedPredicate`</a> | `IfDropAllowed` | Decides whether a dragged element can be dropped here: <code>bool (<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> draggedElement)</code>. Without one every drop is denied. |

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondraganddropstart">`OnDragAndDropStart`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> draggedElement)</code> | A drag and drop of this element (as the <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a>) starts; the argument is the element whose <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#dragtype">`DragType`</a> started it. |
| <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondrop">`OnDrop`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> draggedElement, <a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> dragAndDropDestination)</code> | A dragged element is released over this element and its predicate allowed it. |
| <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondropdenied">`OnDropDenied`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> draggedElement, <a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> dragAndDropDestination)</code> | A dragged element is released over this element and the drop is denied. |

#### `DragType`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/drag-type/#none">`None`</a> | A press drags nothing. |
| <a class="ref" href="/docs/ui-glossary/types/drag-type/#dragonly">`DragOnly`</a> | A press moves the <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a> with the mouse. |
| <a class="ref" href="/docs/ui-glossary/types/drag-type/#draganddrop">`DragAndDrop`</a> | A press starts a drag and drop of the <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a>. |

## Grid placement

These properties place an element inside a [`Grid`](/docs/ui-layout/#grid); other parents ignore them.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridrow">`GridRow`</a> | `int` | The row the element starts in, from 0. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridcolumn">`GridColumn`</a> | `int` | The column the element starts in, from 0. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridrowspan">`GridRowSpan`</a> | `int` | How many rows the element covers; values below 1 are taken as 1. |
| <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridcolumnspan">`GridColumnSpan`</a> | `int` | How many columns the element covers; values below 1 are taken as 1. |

## Debug helpers

<code><a href="/docs/ui-glossary/elements/base-element/#showstatetint">BaseElement.ShowStateTint</a> = true</code> tints every element whose own state is not `Normal`: hovered, pressed (with the
left button), or a drop target. Per element, <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#showhitrectangle">`ShowHitRectangle`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#showactualsizerectangle">`ShowActualSizeRectangle`</a> outline where the element
takes the mouse and where the layout put it. None of these are dependency properties. <a class="ref prop" href="/docs/ui-glossary/elements/grid/#showlayout">`Grid.ShowLayout`</a> draws a grid's
cells (see [Grid](/docs/ui-layout/#grid)).

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#showstatetint">`ShowStateTint`</a> | `bool` | Static. Draws the state tints below over the elements. Off by default. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#hovertint">`HoverTint`</a> | `Color` | Static. The tint of a hovered element, `(0, 10, 60, 10)` by default. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#pressedtint">`PressedTint`</a> | `Color` | Static. The tint of a pressed element, `(128, 128, 0, 10)` by default. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dropallowedtint">`DropAllowedTint`</a> | `Color` | Static. The tint of a drop target that takes the dragged element, `(0, 100, 0, 10)` by default. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dropdeniedtint">`DropDeniedTint`</a> | `Color` | Static. The tint of a drop target that denies it, `(100, 0, 0, 10)` by default. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#modalwindowactiveshadetint">`ModalWindowActiveShadeTint`</a> | `Color` | Static. The shade drawn over everything below the top modal window, `(0, 0, 0, 75)` by default. Always drawn, not a debug setting. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#showhitrectangle">`ShowHitRectangle`</a> | `bool` | Outlines the element's hit rectangle: its bounds as clipped by its parents. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#showhitrectanglediagonals">`ShowHitRectangleDiagonals`</a> | `bool` | Adds the diagonals to the hit rectangle outline. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#hitrectanglecolor">`HitRectangleColor`</a> | `Color` | The color of the hit rectangle outline, `White` by default. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#showactualsizerectangle">`ShowActualSizeRectangle`</a> | `bool` | Outlines the element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#bounds">`Bounds`</a>, without clipping. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#showactualsizerectanglediagonals">`ShowActualSizeRectangleDiagonals`</a> | `bool` | Adds the diagonals to the bounds outline. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualsizerectanglecolor">`ActualSizeRectangleColor`</a> | `Color` | The color of the bounds outline, `Green` by default. |

## Styles and cursors

Almost every element derives from <a class="ref method" href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">`GenericStyleAndMouseCursorsData<TStyle>`</a>, which ties it to a style class: a <a class="ref" href="/docs/ui-glossary/elements/button/">`Button`</a>
is a <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">GenericStyleAndMouseCursorsData</a>&lt;<a href="/docs/ui-glossary/types/button-style/">ButtonStyle</a>&gt;</code></span>, so <a class="ref prop" href="/docs/ui-glossary/elements/button/#generalstyle">`Button.GeneralStyle`</a> styles every button and
<span class="prop">`button.StyleOverride`</span> one button. A value you set on the element itself wins over both. <a class="ref" href="/docs/ui-glossary/elements/grid/">`Grid`</a>, <a class="ref" href="/docs/ui-glossary/elements/separator/">`Separator`</a> and the
parts made for other elements (rows, cells, title bars) derive from `BaseElement` directly and have no style. Styles
and cursor sets are explained on the [styles page](/docs/ui-styles/).

The cursors work the same way, from the most general to the most specific: <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`BaseElement.DefaultMouseCursorsSet`</a> for
every element, <span class="prop">`GeneralMouseCursorsSet`</span> per element type, <span class="prop">`MouseCursorsSetOverride`</span> per element. A set given to a
control reaches its parts (the scroll bars of a list, the title bar of a window) unless they have one of their own.

### GenericStyleAndMouseCursorsData properties

`TStyle` is a style class (deriving from <a class="ref" href="/docs/ui-glossary/types/base-style/">`BaseStyle`</a>, with a parameterless constructor).

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/generic-style-and-mouse-cursors-data/#generalstyle">`GeneralStyle`</a> | `TStyle` | Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. |
| <a class="ref prop" href="/docs/ui-glossary/types/generic-style-and-mouse-cursors-data/#styleoverride">`StyleOverride`</a> | `TStyle` | A style for this element only, applied over the general style. Setting it to null takes its values back out. |
| <a class="ref prop" href="/docs/ui-glossary/types/generic-style-and-mouse-cursors-data/#generalmousecursorsset">`GeneralMouseCursorsSet`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>. |
| <a class="ref prop" href="/docs/ui-glossary/types/generic-style-and-mouse-cursors-data/#mousecursorssetoverride">`MouseCursorsSetOverride`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | The cursors of this element only, passed on to its parts that have none of their own. |
| <a class="ref prop" href="/docs/ui-glossary/types/generic-style-and-mouse-cursors-data/#mousecursorsset">`MouseCursorsSet`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>. |

### BaseElement cursor properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`DefaultMouseCursorsSet`</span> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | Static. The cursors of every element without a more specific set: an arrow on hover, a hand over an element that can be dragged, a "no" cursor over a denied drop, and the sizing arrows over resize areas. <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#setdefaultmousecursorsset">`BorrowedTorchUI.SetDefaultMouseCursorsSet`</a> sets it too. |
| <a class="ref prop" href="/docs/ui-glossary/types/generic-style-and-mouse-cursors-data/#mousecursorsset">`MouseCursorsSet`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | Read-only. The cursors the element shows. On an element without a style: its control's cursors when it is a part of one, otherwise <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>. |

## The root element

<a class="ref" href="/docs/ui-glossary/elements/root-element/">`RootElement`</a> is the top of the element tree. <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/">`BorrowedTorchUI`</a> creates it (you can't create one yourself) and gives
it as `ui.RootElement`; `ui.AddElementToRoot(element)` adds an item to it. It has the size of the game window in
units (the back buffer size divided by the display scale) and follows the back buffer when the window is resized,
or takes the size given to `ApplyGameWindowSize`. It can't be resizable and it draws no background of its own, so give a full-screen panel your background
color instead.

Above the tree the root draws the popups: the modal windows (with <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#modalwindowactiveshadetint">`ModalWindowActiveShadeTint`</a> under the top one), the
open drop-down, the open context menu, the tooltip, the dragged representation and the resize contour, in that order
from the bottom. A drag and drop released where no element takes it is denied by the root (its <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondropdenied">`OnDropDenied`</a> is
raised).

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#dispose">`ui.Dispose()`</a> disposes the root. The elements you added to it are detached, not disposed: dispose the ones that hold
resources yourself.

<a class="ref" href="/docs/ui-glossary/elements/root-element/">`RootElement`</a> adds no public members to <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">GenericStyleAndMouseCursorsData</a>&lt;<a href="/docs/ui-glossary/types/root-element-style/">RootElementStyle</a>&gt;</code></span>. Style class:
<a class="ref" href="/docs/ui-glossary/types/root-element-style/">`RootElementStyle`</a> (the base element properties only, see [styles](/docs/ui-styles/)).

## Writing your own element

The layout runs when something changed, in two walks down the tree. **Measure** finds every element's size from its
own settings, the slot its parent gives it and its content. **Arrange** then gives every element its final size
(<a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualwidth">`ActualWidth`</a>, <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualheight">`ActualHeight`</a>) and position (<a class="ref prop" href="/docs/ui-glossary/elements/base-element/#location">`Location`</a>). One measure and one arrange settle a change, and nothing
reacts to a size while they run.

A custom element derives from `BaseElement` (or from <a class="ref method" href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">`GenericStyleAndMouseCursorsData<TStyle>`</a> to have a general
style) and overrides two methods:

- <a class="ref method" href="/docs/ui-glossary/elements/base-element/#measurecontent">`MeasureContent(int width, int height)`</a> measures the children and returns the size of the content. `width` and
  `height` are the element's own size where it is known (fixed or stretched, already within its size limits) and `-1`
  where the element fits its content: along such a side it takes the size you return. Measure a child with
  <a class="ref method" href="/docs/ui-glossary/elements/base-element/#measure">`child.Measure(slotWidth, slotHeight)`</a> (the space you give it, `-1` for a size you don't know yet) or
  <a class="ref method" href="/docs/ui-glossary/elements/base-element/#measureat">`child.MeasureAt(width, height)`</a> (a size of your choice, `-1` for its own size), then read <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#measuredwidth">`child.MeasuredWidth`</a> /
  <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#measuredheight">`MeasuredHeight`</a> (and <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#measuredcontentwidth">`MeasuredContentWidth`</a> / <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#measuredcontentheight">`MeasuredContentHeight`</a>, what its content needs whatever size it got).
  The default lays the children over each other, each placed by its margins and alignment.
- <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangecontent">`ArrangeContent()`</a> places the children inside the element's final <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#bounds">`Bounds`</a>: <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrange">`child.Arrange(slot)`</a> places a child in
  a slot by its own margins and alignment, <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangeat">`child.ArrangeAt(bounds)`</a> or <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangeat">`child.ArrangeAt(position)`</a> puts it exactly
  there (in screen coordinates). The default arranges every child in the element's bounds.

Measure and arrange every child, or it keeps its old size and place. An element whose final size differs from the
measured one is measured again at it before it is arranged. <a class="ref method" href="/docs/ui-glossary/elements/base-element/#actualwidthchangedhandleroverride">`ActualWidthChangedHandlerOverride`</a> and the other size
handlers run after a size was given, so laying out parts there is too late.

A setting of your element that changes its size or its content's calls <a class="ref method" href="/docs/ui-glossary/elements/base-element/#invalidatemeasure">`InvalidateMeasure()`</a>; the layout properties
of `BaseElement` do this themselves. The arrange is incremental: an element in the same slot that was not measured
again is not arranged again. So any state your <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangecontent">`ArrangeContent`</a> reads that can change outside a measure (an offset, a
scroll position) must call <a class="ref method" href="/docs/ui-glossary/elements/base-element/#invalidatearrange">`InvalidateArrange()`</a> when it changes, or the children stay where they were.

Here is a row that lays its items side by side, each at its own width and at the row's height, with a gap:

```csharp
// its items side by side, each at its own width and at the row's height,
// with a gap between them
public class Row : BaseElement
{
    private int _gap;

    public int Gap
    {
        get => _gap;
        set
        {
            _gap = value;
            InvalidateMeasure();
        }
    }

    public Row(string name = null) : base(name)
    {
    }

    protected override Point MeasureContent(int width, int height)
    {
        var contentWidth = 0;
        var contentHeight = 0;

        foreach (var child in Children)
        {
            child.MeasureAt(-1, height);

            contentWidth += child.MeasuredWidth + _gap;
            contentHeight = Math.Max(contentHeight, child.MeasuredHeight);
        }

        return new Point(Math.Max(contentWidth - _gap, 0), contentHeight);
    }

    protected override void ArrangeContent()
    {
        var x = Left;

        foreach (var child in Children)
        {
            child.ArrangeAt(new Rectangle(x, Top, child.MeasuredWidth, ActualHeight));
            x += child.MeasuredWidth + _gap;
        }
    }
}
```

And the row in use:

<figure class="shot">
  <img src="{{ '/assets/img/ui/base-custom-element.png' | relative_url }}" width="404" height="82" alt="Four sand brown labels in a row reading 60, 100, 40 and 140, each as wide as its number, with even gaps between them">
  <figcaption>The custom Row element with four labels of different widths and a gap of 10.</figcaption>
</figure>

```csharp
var row = new Row("row")
{
    Gap = 10,
    Margin = (16, 16),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top
};

foreach (var width in new[] { 60, 100, 40, 140 })
    row.AddItem(new Label
    {
        Text = $"{width}",
        DesiredWidth = width,
        DesiredHeight = 48,
        TextAlignment = TextAlignment.Center,
        VerticalTextAlignment = VerticalTextAlignment.Center,
        ForegroundColor = new Color(20, 14, 10),
        BackgroundColor = new Color(168, 131, 74)
    });

ui.AddElementToRoot(row);
```

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#measureat">`MeasureAt(-1, height)`</a> lets each label keep its own width and gives it the row's height (or its own height where the
row fits its content). <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangeat">`ArrangeAt`</a> then places each label exactly, so the labels' margins and alignment don't apply.

An element deriving from `BaseElement` directly has no style, so <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#cropoutsideofparentborder">`CropOutsideOfParentBorder`</a> start off
(the styles turn them on): set them in your constructor if the element should take the mouse or be clipped to its
parent. An element deriving from <a class="ref method" href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">`GenericStyleAndMouseCursorsData<TStyle>`</a> should call <a class="ref method" href="/docs/ui-glossary/elements/base-element/#applygeneralstyle">`ApplyGeneralStyle()`</a> at the end
of its constructor to take its general style. A derived element opts out of items with
`protected override bool AcceptsItems => false`.

### Layout methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#measurecontent">`MeasureContent(int width, int height)`</a> | Protected virtual, returns `Point`. Measures the children and returns the content size, as described above. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangecontent">`ArrangeContent()`</a> | Protected virtual. Arranges the children inside <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#bounds">`Bounds`</a>, as described above. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#measure">`Measure(int slotWidth, int slotHeight)`</a> | Measures the element for the slot its parent gives it (`-1`: a size the parent does not know yet): a stretched element takes the slot less its margins, a fixed one its desired size, the others fit their content. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#measureat">`MeasureAt(int width, int height)`</a> | Measures the element at a size its container chose for it; along a side given as `-1` it has its own size (fixed, or fitted to its content). |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrange">`Arrange(Rectangle slot)`</a> | Gives the element its size and position in the slot: a stretched element takes the slot less its margins, the others keep their measured size and are placed by their margins and alignment. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangeat">`ArrangeAt(Point position)`</a> | Places the element at a position its container chose, at its measured size; its margins and alignment are not applied. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangeat">`ArrangeAt(Rectangle bounds)`</a> | Places the element at a position and size its container chose. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#invalidatemeasure">`InvalidateMeasure()`</a> | Asks for a new measure and arrange of the element: a setting of its own changed its size or its content's. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#invalidatearrange">`InvalidateArrange()`</a> | Asks for the element's children to be placed again; its size stays. |

### Members for derived elements

| Method | Description |
| --- | --- |
| <span class="method">`BaseElement(string name = null)`</span> | Protected. Sets the name <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a> finds the element by. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">`GenericStyleAndMouseCursorsData(string name = null)`</a> | Protected. The same, for an element with a style. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#acceptsitems">`AcceptsItems`</a> | Protected virtual property, `true` by default. Return false and the item methods do nothing on the element. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#addchild">AddChild</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> child, bool isSole = false, int insertIndex = -1, bool isVisualComponent = true)</code></span> | Protected. Adds a child; by default an own part, which the item methods leave alone and which is disposed when it is removed. `isSole` removes the other items first. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#removechild">RemoveChild</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> child)</code></span> | Protected. Takes a child out: an own part is disposed, an item only detached. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#removechildat">`RemoveChildAt(int index)`</a> | Protected. The same, by index in `Children`. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#detachchild">DetachChild</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> child)</code></span> | Protected. Takes a child out without disposing it, to add it again later. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#detachchildren">`DetachChildren()`</a> | Protected. Takes every child out without disposing them. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#detachchildren">DetachChildren</a>(Predicate&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; match)</code></span> | Protected. Takes the matching children out without disposing them. |
| <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualwidth">`ActualWidth`</a>, <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualheight">`ActualHeight`</a> | Their setters are protected; the layout sets them, you normally don't. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#loadtextures">`LoadTextures()`</a> | Protected virtual. Called when <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> changes; load the element's textures from the folder here and call the base. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#unsubscribeself">`UnsubscribeSelf()`</a> | Protected virtual. Called on dispose: release the element's subscriptions to other objects here. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#disposehandler">`DisposeHandler()`</a> | Protected override. The element's dispose (see [items and content](#items-and-content)); call the base when you override it. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#cursorspropertychangedhandler">`CursorsPropertyChangedHandler()`</a> | Protected. Shows the element's current cursors again, after its cursor set changed. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#applystyle">ApplyStyle</a>(<a href="/docs/ui-glossary/types/base-style/">BaseStyle</a> style, <a href="/docs/ui-glossary/types/value-sources/">ValueSources</a> valueSource)</code></span> | Protected. Applies the style's assigned properties to the element as the given value source. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#style">`Style`</a> | Protected property of <a class="ref method" href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">`GenericStyleAndMouseCursorsData<TStyle>`</a>: the style override, or the general style. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#applygeneralstyle">`ApplyGeneralStyle()`</a> | Protected, of <a class="ref method" href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">`GenericStyleAndMouseCursorsData<TStyle>`</a>. Applies the general style over the framework defaults. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#applystyleoverride">`ApplyStyleOverride()`</a> | Protected, of <a class="ref method" href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">`GenericStyleAndMouseCursorsData<TStyle>`</a>. Applies the style override again. |

### Handler overrides

Each one is protected virtual and empty in `BaseElement`. An element overrides them to react to its own changes
before the matching public event (if any) is raised.

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#locationchangedhandleroverride">`LocationChangedHandlerOverride(Point location)`</a> | The element moved. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#actualwidthchangedhandleroverride">`ActualWidthChangedHandlerOverride(int width)`</a> | The layout gave the element another width. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#actualheightchangedhandleroverride">`ActualHeightChangedHandlerOverride(int height)`</a> | The layout gave the element another height. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#visibilitychangedhandleroverride">VisibilityChangedHandlerOverride</a>(<a href="/docs/ui-glossary/types/visibility/">Visibility</a> visibility)</code></span> | <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#visibility">`Visibility`</a> changed; called before the children hear of it. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#visibilitypropertychangedhandleroverride">VisibilityPropertyChangedHandlerOverride</a>(<a href="/docs/ui-glossary/types/visibility/">Visibility</a> value)</code></span> | <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#visibility">`Visibility`</a> changed; called after the children heard of it. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#statechangedhandleroverride">StateChangedHandlerOverride</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/element-state-data/">ElementStateData</a> stateData)</code></span> | The shown state changed, before <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onstatechanged">`OnStateChanged`</a>. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#mouseenterhandleroverride">`MouseEnterHandlerOverride()`</a> | Before <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseenter">`OnMouseEnter`</a>. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#mouseleavehandleroverride">`MouseLeaveHandlerOverride()`</a> | Before <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseleave">`OnMouseLeave`</a>. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#clickhandleroverride">ClickHandlerOverride</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/mouse-click-event-args/">MouseClickEventArgs</a> e)</code></span> | Before `OnClick`. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#doubleclickhandleroverride">DoubleClickHandlerOverride</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/mouse-click-event-args/">MouseClickEventArgs</a> e)</code></span> | Before <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondoubleclick">`OnDoubleClick`</a>. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#gotfocushandleroverride">`GotFocusHandlerOverride()`</a> | The element got the keyboard. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#lostfocushandleroverride">`LostFocusHandlerOverride()`</a> | The element lost the keyboard. Focusing another element here (the next field of a form) works. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#keydownhandleroverride">KeyDownHandlerOverride</a>(<a href="/docs/ui-glossary/types/key-down-event-args/">KeyDownEventArgs</a> e)</code></span> | A key reached the element, before <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onkeydown">`OnKeyDown`</a>; set `e.Handled` for a key the element uses. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#textinputhandleroverride">`TextInputHandlerOverride(TextInputEventArgs e)`</a> | Typed text reached the focused element. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#inheritstatepropertychangedhandleroverride">InheritStatePropertyChangedHandlerOverride</a>(<a href="/docs/ui-glossary/types/inherit-state/">InheritState</a> value)</code></span> | <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#inheritstate">`InheritState`</a> changed. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#foregroundcolorpropertychangedhandleroverride">`ForegroundColorPropertyChangedHandlerOverride(Color value)`</a> | <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a> changed. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#hittestpropertychangedhandleroverride">`HitTestPropertyChangedHandlerOverride(bool value)`</a> | <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a> changed. |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#timebeforerepeatstartsmspropertychangedhandleroverride">`TimeBeforeRepeatStartsMsPropertyChangedHandlerOverride(int value)`</a> | <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebeforerepeatstartsms">`TimeBeforeRepeatStartsMs`</a> changed (after it was passed to the parts). |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#timebetweenrepeatsmspropertychangedhandleroverride">`TimeBetweenRepeatsMsPropertyChangedHandlerOverride(int value)`</a> | <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebetweenrepeatsms">`TimeBetweenRepeatsMs`</a> changed (after it was passed to the parts). |
| <a class="ref method" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalmspropertychangedhandleroverride">`DoubleClickIntervalMsPropertyChangedHandlerOverride(int value)`</a> | <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalms">`DoubleClickIntervalMs`</a> changed (after it was passed to the parts). |
