---
layout: docs
title: "UI: base element"
description: What every element has in common, input and states, resizing, the root element and how to write your own element.
---

Every element derives from `BaseElement`, so everything on this page applies to all of them: buttons, labels, stack
panels, windows and your own elements. The other UI pages list only what each element adds. Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>: `Foo` is backed by `FooDP`, which a style, a binding or an animation can
set (see [styles, bindings and animation](/docs/ui-styles/)), and the class has a static `FooDPActions` with the
property's shared actions and default. Screenshots use the theme from
[styles](/docs/ui-styles/#the-theme-of-these-pages).

The event handler types are delegates nested in `BaseElement` (`BaseElement.Click`, `BaseElement.KeyDown` and so on);
the tables give their signatures.

## Size and position

An element's size along each side comes from its own settings and its parent:

- With a `DesiredWidth` (or `DesiredHeight`) above 0 it has that size.
- With 0 and `Stretch` alignment it takes the slot its parent gives it, less its margins.
- With 0 and any other alignment it fits its content.

`MinWidth`, `MinHeight`, `MaxWidth` and `MaxHeight` then limit the result (0 means no limit). The layout hands the
result back as `ActualWidth` and `ActualHeight`, and the position as `Location`, in screen coordinates. All of these
are logical units: one unit is one pixel at 100 % display scale (see the [quick start guide](/docs/ui/#display-scaling)).

In its slot an element is placed by its alignment and margins: `Left` / `Top` at its left / top margin, `Right` /
`Bottom` at its right / bottom margin, `Center` centred between both margins, `Stretch` over the whole slot less both
margins. A `Stretch` element that has a desired size is placed at its left / top margin.

A child's margin counts toward the content size of a parent that fits its content only on the side the child is
aligned to: the left / top margin for `Left` / `Top`, the right / bottom margin for `Right` / `Bottom`, both for
`Center`, and both for a `Stretch` child without a desired size (with one, only the left / top margin). The margin on
the other side is not counted. So in a horizontal `StackPanel`, the `Margin.Right` of a `Left` aligned item adds no
gap: put the gap on the left (or top) margin of the next item. A stretched child in a parent that fits its content
counts with the size of its own content, as in WPF, except wrapping text along the width: it takes the width the rest
of the content decides and wraps there. When nothing else gives a width, it keeps its one line, and a `MaxWidth` on the
parent makes it wrap (see [sizes and alignment](/docs/ui/#sizes-and-alignment)).

### Size and position properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`DesiredWidth`</span> | `int` | The width in units. 0 (the default) fits the content, or stretches over the slot when `HorizontalAlignment` is `Stretch`. |
| <span class="dp">`DesiredHeight`</span> | `int` | The height in units. 0 (the default) fits the content, or stretches over the slot when `VerticalAlignment` is `Stretch`. |
| <span class="dp">`MinWidth`</span> | `int` | The smallest width the layout (and a resize) gives the element. 0 is no limit. |
| <span class="dp">`MinHeight`</span> | `int` | The smallest height the layout (and a resize) gives the element. 0 is no limit. |
| <span class="dp">`MaxWidth`</span> | `int` | The largest width the layout (and a resize) gives the element. 0 is no limit. |
| <span class="dp">`MaxHeight`</span> | `int` | The largest height the layout (and a resize) gives the element. 0 is no limit. |
| <span class="dp">`HorizontalAlignment`</span> | `HorizontalAlignment` | Where the element sits in its slot horizontally, and whether it stretches over it. The default is `Stretch`. |
| <span class="dp">`VerticalAlignment`</span> | `VerticalAlignment` | Where the element sits in its slot vertically, and whether it stretches over it. The default is `Stretch`. |
| <span class="dp">`Margin`</span> | `Margin` | The space between the element and the edges of its slot. Which sides count is described above. |
| <span class="prop">`ActualWidth`</span> | `int` | Read-only. The width the last layout gave the element, within its size limits. |
| <span class="prop">`ActualHeight`</span> | `int` | Read-only. The height the last layout gave the element, within its size limits. |
| <span class="prop">`Location`</span> | `Point` | Read-only. The top left corner of the element on the screen. |
| <span class="prop">`Left`</span> | `int` | Read-only. `Location.X`. |
| <span class="prop">`Top`</span> | `int` | Read-only. `Location.Y`. |
| <span class="prop">`Right`</span> | `int` | Read-only. `Left + ActualWidth`. |
| <span class="prop">`Bottom`</span> | `int` | Read-only. `Top + ActualHeight`. |
| <span class="prop">`Bounds`</span> | `Rectangle` | Read-only. `Location` and the actual size as one rectangle. |
| <span class="prop">`MeasuredWidth`</span> | `int` | Read-only. The width the last measure found: fixed, stretched over the slot or fitted to the content. |
| <span class="prop">`MeasuredHeight`</span> | `int` | Read-only. The height the last measure found. |
| <span class="prop">`MeasuredContentWidth`</span> | `int` | Read-only. The width the content needed at the last measure, whatever width the element was given. |
| <span class="prop">`MeasuredContentHeight`</span> | `int` | Read-only. The height the content needed at the last measure. |

The measure and arrange methods (`Measure`, `MeasureAt`, `Arrange`, `ArrangeAt`, `InvalidateMeasure`,
`InvalidateArrange`) are public, but you only need them in your own elements: see
[writing your own element](#writing-your-own-element).

`HorizontalAlignment`:

| Value | Meaning |
| --- | --- |
| `Stretch` | Fills the slot less both margins when the element has no `DesiredWidth`, otherwise sits at the left margin. |
| `Left` | At the left margin. |
| `Center` | Centred between the left and the right margin. |
| `Right` | At the right margin. |

`VerticalAlignment`:

| Value | Meaning |
| --- | --- |
| `Stretch` | Fills the slot less both margins when the element has no `DesiredHeight`, otherwise sits at the top margin. |
| `Top` | At the top margin. |
| `Center` | Centred between the top and the bottom margin. |
| `Bottom` | At the bottom margin. |

`Orientation` (used by `StackPanel`, `Slider` and `ProgressBar`, see [layout](/docs/ui-layout/) and
[controls](/docs/ui-controls/)):

| Value | Meaning |
| --- | --- |
| `Horizontal` | From left to right. |
| `Vertical` | From top to bottom. |

### Margin

A small read-only struct with one value per side. It converts implicitly from an `int` and from tuples, so you rarely
write `new Margin(...)`:

```csharp
element.Margin = 5;                 // all sides
element.Margin = (10, 20);          // left, top
element.Margin = (10, 20, 30);      // left, top, right
element.Margin = (10, 20, 30, 40);  // left, top, right, bottom
```

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`Left`</span> | `int` | Read-only field. The left margin. |
| <span class="prop">`Top`</span> | `int` | Read-only field. The top margin. |
| <span class="prop">`Right`</span> | `int` | Read-only field. The right margin. |
| <span class="prop">`Bottom`</span> | `int` | Read-only field. The bottom margin. |
| <span class="prop">`Zero`</span> | `Margin` | Static, read-only. A margin of 0 on every side. |

| Method | Description |
| --- | --- |
| `Margin()` | A margin of 0 on every side. |
| `Margin(int all)` | The same margin on every side. |
| `Margin(int left = 0, int top = 0, int right = 0, int bottom = 0)` | A margin per side; the sides left out are 0. |
| <span class="method">`implicit operator Margin(int all)`</span> | `element.Margin = 5` sets 5 on every side. |
| <span class="method">`implicit operator Margin((int left, int top) tuple)`</span> | Left and top; right and bottom are 0. |
| <span class="method">`implicit operator Margin((int left, int top, int right) tuple)`</span> | Left, top and right; bottom is 0. |
| <span class="method">`implicit operator Margin((int left, int top, int right, int bottom) tuple)`</span> | All four sides. |
| <span class="method">`operator -(Margin margin)`</span> | The margin with every side negated. |
| <span class="method">`operator +(Margin margin1, Margin margin2)`</span> | Adds the margins side by side. |
| <span class="method">`operator -(Margin margin1, Margin margin2)`</span> | Subtracts the second margin from the first, side by side. |
| <span class="method">`operator ==(Margin margin1, Margin margin2)`</span> | True when all four sides are equal. `!=` is the opposite. |
| <span class="method">`Equals(Margin other)`</span> | True when all four sides are equal (`Equals(object)` as well, for another `Margin`). |
| <span class="method">`GetHashCode()`</span> | A hash of the four sides. |
| <span class="method">`ToString()`</span> | The sides as text, for example `L: 10 R: 30 T: 20 B: 40`. |

## Appearance

Without textures an element fills its bounds with `BackgroundColor`. With `TexturesPath` set, the elements that use
textures draw them from that folder instead (each element's section says which textures it reads). A disabled element
is drawn darker, and `Transparency` fades the element together with everything inside it.

<figure class="shot">
  <img src="{{ '/assets/img/ui/base-transparency.png' | relative_url }}" width="494" height="98" alt="Four sand coloured labels reading 0.00, 0.25, 0.50 and 0.75, each one more faded into the dark background than the one before">
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
child is never more opaque than the panel it is in. `Visibility` and `Disabled` are inherited the same way: the
children of a hidden or disabled element are hidden or disabled with it, while their own properties keep their values.

`Hidden` keeps the element's space in the layout but draws nothing and takes no input; `Collapsed` also gives it no
size, so the elements around it move up.

### Appearance properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Visibility`</span> | `Visibility` | Whether the element is shown, hidden in its space or collapsed. The default is `Visible`. A hidden element loses the keyboard focus and any mouse state. |
| <span class="dp">`BackgroundColor`</span> | `Color` | The colour the element's background is filled with. `Transparent` (the default) fills nothing. |
| <span class="dp">`ForegroundColor`</span> | `Color` | The colour of what the element draws over its background, such as a label's text. An element drawn from textures tints them with it when it is not `Transparent`. |
| <span class="dp">`TexturesPath`</span> | `string` | A content folder with the element's textures, for example `UITextures/Button/`. A missing trailing path separator is added. |
| <span class="prop">`TexturesPresent`</span> | `bool` | Read-only. True when `TexturesPath` is set. |
| <span class="dp">`Transparency`</span> | `float` | From 0 (opaque, the default) to 1 (invisible); values outside are clamped. Applies to the element and its subtree, combined with the parents' transparency. |
| <span class="dp">`CropOutsideOfParentBorder`</span> | `bool` | Clips the element to its parent's bounds. Without it the element may overflow its parent but is still clipped by whatever clips the parent (a scroll view, a window's content area). On by default for every element with a style. |
| <span class="dp">`CustomEffect`</span> | `Effect` | A shader the element draws its background (or texture, an image's picture) with. Setting it sets it on the children as well, and a child added later takes it. An effect with a `ModulationColor` parameter gets the draw colour there. |
| <span class="prop">`PreDrawAction`</span> | `Action` | Runs before the element and its subtree are drawn, for example to change the sprite batch state. |
| <span class="prop">`PostDrawAction`</span> | `Action` | Runs after the element and its subtree are drawn, for example to restore what `PreDrawAction` changed. |

Tooltips, context menus, drop-downs and modal windows are never clipped by the elements they open from.
`PreDrawAction` and `PostDrawAction` come in pairs: a hidden element runs neither of them.

### Appearance methods

| Method | Description |
| --- | --- |
| <span class="method">`Draw()`</span> | Draws the element, its children and the popups above them. The UI calls it on the root every frame, you don't call it yourself. |

`Visibility`:

| Value | Meaning |
| --- | --- |
| `Visible` | Drawn and takes input. |
| `Hidden` | Not drawn, takes no input, keeps its space in the layout. |
| `Collapsed` | Not drawn, takes no input, has no size. |

## Items and content

The elements you put into another element are its items. `AddItem` and the other item methods act on them only, never
on the parts an element made itself (a slider's buttons, a window's title bar). Containers override them: a stack
panel, for example, wraps each item (see its section). Elements that host a single child give it through a `Content`
or `Text` property instead, and they and the other elements without items (sliders, progress bars, text elements)
ignore the item methods.

An element has one parent. Adding an element that is already in another one throws an `InvalidOperationException`
(remove it there first), adding it to itself throws as well, and adding it again to the element it is in changes
nothing. Null items are ignored.

Ownership decides what is disposed:

- Removing an item (`RemoveItem`, `ClearItems` and so on) only detaches it: it is yours, dispose or reuse it.
- `Dispose()` takes the element out of its parent, disposes what it made itself (its parts, the text content of a
  button, its resize areas), detaches what you gave it (items, content, tooltip, context menu, drag representation) and
  raises `OnDisposed`. A second call does nothing.
- A disposed element can't be added anywhere again: that throws an `ObjectDisposedException`.

### Items and content properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`Id`</span> | `Guid` | Read-only field. A unique id made when the element is created. |
| <span class="prop">`Name`</span> | `string` | Read-only. The name given to the constructor, used by `GetElementByName`. |
| <span class="prop">`Parent`</span> | `BaseElement` | Read-only. The element this one is in, null when it is not in one. |
| <span class="prop">`Children`</span> | `IReadOnlyList<BaseElement>` | Read-only. The element's children: its items and the parts it made itself. |
| <span class="prop">`IsDisposed`</span> | `bool` | Read-only. True once `Dispose()` was called. |

### Items and content events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnDisposed`</span> | `(BaseElement sender)` | The element was disposed. Raised once, at the end of `Dispose()`; the handlers are let go afterwards. |

### Items and content methods

| Method | Description |
| --- | --- |
| <span class="method">`AddItem(BaseElement item)`</span> | Adds the item after the other children. |
| <span class="method">`AddItemAt(BaseElement item, int index)`</span> | Inserts the item at the index in `Children`. An index below 0 or above the count is ignored. |
| <span class="method">`AddItemsRange(IEnumerable<BaseElement> items)`</span> | Adds the items in order after the other children. |
| <span class="method">`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)`</span> | Inserts the items in order from the index; a null item takes no place. |
| <span class="method">`RemoveItem(BaseElement item)`</span> | Takes the item out without disposing it. Does nothing for a part of the element. |
| <span class="method">`RemoveItemAt(int index)`</span> | Takes the item at the index out without disposing it. |
| <span class="method">`RemoveItemsRangeAt(int index, int count)`</span> | Takes `count` items out from the index on (fewer when the children end first), without disposing them. |
| <span class="method">`ClearItems()`</span> | Takes every item out without disposing them; the element's own parts stay. |
| <span class="method">`GetElementByName(string name)`</span> | Finds an element by name below this one (its children first, then deeper, popups such as its tooltip included). Null when there is none. |
| <span class="method">`Dispose()`</span> | Disposes the element as described above. |

`BorrowedTorchUI` has a `GetElementByName<T>(string name)` that searches from the root and casts the result (see the
[quick start guide](/docs/ui/)).

### DisposableBase

The base class of `BaseElement`, with the dispose pattern every element uses.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`IsDisposed`</span> | `bool` | Read-only. True once `Dispose()` was called. |

| Method | Description |
| --- | --- |
| <span class="method">`Dispose()`</span> | Marks the object disposed and runs `DisposeHandler` once; later calls do nothing. |
| <span class="method">`DisposeHandler()`</span> | Protected, abstract. The clean-up of the derived class; `BaseElement` implements it as described above. |

## Mouse and states

The mouse goes to one element at a time. The UI checks the children before their parent, and the later children
before the earlier ones (the ones drawn on top); the first element with `HitTest` on whose hit rectangle (its bounds,
cropped by whatever clips it) contains the mouse takes it, and nothing below it is hovered. An element with `HitTest`
off is passed over, so the element behind it gets the mouse. A hidden element takes no mouse. A disabled element
still takes it (the element behind it is not hovered) but shows no state and raises no mouse events. While a modal
window is shown, only its subtree gets the mouse.

An element's own state is `Hover` while it takes the mouse, `MouseButtonsActivity` while a button pressed on it is
held, and `DropAllowed` or `DropDenied` while a dragged element is over it. `StateData` holds the state it shows,
which can also come from its parent or its children through `InheritState`: the element shows the highest of its own
state and the ones it takes (in the order of the `ElementState` values; its own state wins a tie). It passes its own
and its children's state up, and its own and its parent's state down, so a state never comes back to where it came
from: a list lit by a hovered row does not light its other rows. A title bar with `FromChildren` lights up while its
label is hovered; the label with `FromParent` lights up with the title bar. The hidden parts of a control pass states
through as if they were not there, so only the elements you created decide.

<figure class="shot">
  <img src="{{ '/assets/img/ui/base-states.png' | relative_url }}" width="486" height="74" alt="Three buttons side by side: Normal in sand brown, Hovered in a lighter sand colour, Disabled in a dark brown">
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
hovered or pressed meanwhile. Moving off it ends its pressed state (`OnMouseLeave` is raised and repeated clicks stop),
moving back onto it while the button is still held presses it again.

`OnClick` is raised when a mouse button is released over the element it was pressed on, so moving off before releasing
cancels the click. Any button clicks: `e.ButtonsStates` tells which one. A right click also opens the element's
`ContextMenu`. `OnDoubleClick` is raised on the second left press within `DoubleClickIntervalMs` of the first; both
releases still raise `OnClick`. For repeated clicks see [click timing](#click-timing).

`OnMouseEnter` and `OnMouseLeave` are about the element taking the mouse itself, and they always come in pairs. Moving
from a panel onto a child that takes the mouse raises `OnMouseLeave` on the panel. To follow a whole area, give it
`InheritState.FromChildren` and watch `OnStateChanged` instead. An element that gets disabled or hidden under the mouse
raises `OnMouseLeave` too. Entering a drop target during a drag and drop raises no `OnMouseEnter`.

Where a part of a control has no `ToolTip`, `DragType` or drop settings of its own, the control's apply: a text box's
tooltip shows over its text, and a drop on a list's row is decided and taken by the list. Clicks stay with the part;
the controls raise their own events for them (a selection, a value change).

### Mouse and states properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`HitTest`</span> | `bool` | Whether the element itself takes the mouse. On by default for every element with a style; off for an element deriving from `BaseElement` directly. |
| <span class="dp">`Disabled`</span> | `bool` | Stops the element and its subtree from showing states, raising mouse events and taking the keyboard, and draws them darker. |
| <span class="dp">`InheritState`</span> | `InheritState` | Which states the element shows besides its own: its parent's, its children's, both or none (the default). |
| <span class="prop">`StateData`</span> | `ElementStateData` | Read-only. The state the element shows now and where it comes from. |

### Mouse and states events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnStateChanged`</span> | `(BaseElement sender, ElementStateData e)` | The state the element shows changes, its own or one it takes. Raised again for every change of the mouse buttons while the element is pressed. |
| <span class="event">`OnMouseEnter`</span> | `(BaseElement sender)` | The element starts taking the mouse. |
| <span class="event">`OnMouseLeave`</span> | `(BaseElement sender)` | The element stops taking the mouse: the mouse left, moved onto a child that takes it, or the element got disabled or hidden. |
| <span class="event">`OnClick`</span> | `(BaseElement sender, MouseClickEventArgs e)` | A mouse button pressed on the element is released over it (with `RepeatClicks`: on the press and while it is held). |
| <span class="event">`OnDoubleClick`</span> | `(BaseElement sender, MouseClickEventArgs e)` | The left button is pressed a second time within `DoubleClickIntervalMs`. Not raised by an element with `RepeatClicks`. |

`InheritState` (flags):

| Value | Meaning |
| --- | --- |
| `None` | Shows its own state only. |
| `FromParent` | Also shows its parent's state (its own and what the parent took from above). |
| `FromChildren` | Also shows the highest state of its children. |
| `Both` | `FromParent` and `FromChildren`. |

`ElementState`, from the lowest to the highest:

| Value | Meaning |
| --- | --- |
| `Normal` | Nothing is happening to the element. |
| `Hover` | The element takes the mouse. |
| `MouseButtonsActivity` | A mouse button pressed on the element is held. |
| `DropDenied` | A dragged element is over the element and it does not take the drop. |
| `DropAllowed` | A dragged element is over the element and it takes the drop. |

`StateSource`:

| Value | Meaning |
| --- | --- |
| `Own` | The element's own state. |
| `Parent` | Taken from the parent (`InheritState.FromParent`). |
| `Children` | Taken from the children (`InheritState.FromChildren`). |

### ElementStateData

The state an element shows, passed to `OnStateChanged`. The UI shares one immutable instance per state and source.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`State`</span> | `ElementState` | Read-only. The state shown. |
| <span class="prop">`Source`</span> | `StateSource` | Read-only. Where the state comes from. |
| <span class="prop">`MouseButtonsStates`</span> | `MouseButtonsStates` | Read-only. The current states of the mouse buttons (read when you read it, not stored with the state). |
| <span class="prop">`NormalOwn`</span> | `ElementStateData` | Static, read-only field. The `Normal` / `Own` state every element starts with. |

| Method | Description |
| --- | --- |
| `ElementStateData(ElementState state, StateSource source)` | Creates a state, for example to compare with `StateData`. |
| <span class="method">`operator ==(ElementStateData state1, ElementStateData state2)`</span> | True when the state and the source are equal. `!=` and `Equals` compare the same way. |
| <span class="method">`GetHashCode()`</span> | A hash of the state and the source. |
| <span class="method">`ToString()`</span> | The state and the source as text, separated by a vertical bar. |

### MouseClickEventArgs

What `OnClick` and `OnDoubleClick` get, taken when the click happens.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`MousePosition`</span> | `Point` | Read-only. The mouse position in units, like the element positions. |
| <span class="prop">`ButtonsStates`</span> | `MouseButtonsStates` | Read-only. The states of the mouse buttons, to tell which button clicked. |

| Method | Description |
| --- | --- |
| `MouseClickEventArgs()` | Takes the current mouse position and buttons states. |

## Click timing

Four properties set how an element turns presses into clicks. Their defaults come from `DefaultSettings`
(`DefaultTimeBeforeRepeatStartsMs`, `DefaultTimeBetweenRepeatsMs`, `DefaultDoubleClickIntervalMs`); change those before
you create the elements to change them everywhere (see [styles](/docs/ui-styles/)).

With `RepeatClicks` on, `OnClick` is raised as soon as the left button is pressed, again after
`TimeBeforeRepeatStartsMs`, then every `TimeBetweenRepeatsMs` while the button is held over the element. The repeats
stop when the button is released, when the mouse leaves the element, and when the element is disabled, hidden or
removed. A repeating element raises no `OnClick` on release and no `OnDoubleClick`, and only the left button clicks it.

A control passes its timings to its own parts: setting `TimeBeforeRepeatStartsMs`, `TimeBetweenRepeatsMs` or
`DoubleClickIntervalMs` on a list sets them on its scroll bars too (also on parts added later, such as a scroll bar
shown for the first time). Your own elements inside a control keep theirs. `RepeatClicks` is not passed on.

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`RepeatClicks`</span> | `bool` | Raises `OnClick` on the press and repeatedly while the left button is held, instead of once on release. Off by default. |
| <span class="dp">`TimeBeforeRepeatStartsMs`</span> | `int` | Milliseconds from the press to the first repeated click. 1000 by default; negative values are taken as 0. |
| <span class="dp">`TimeBetweenRepeatsMs`</span> | `int` | Milliseconds between the repeated clicks after the first one. 300 by default; negative values are taken as 0. |
| <span class="dp">`DoubleClickIntervalMs`</span> | `int` | The longest time in milliseconds between two left presses that make a double click. 300 by default; negative values are taken as 0. |

## Keyboard and focus

One element at a time has the keyboard. `Focus()` gives it to an element; the keys and the typed text then go to that
element only, until another element is focused, a mouse press lands outside of it, or it is hidden, disabled or taken
out of the tree. Without a focused element no element gets keys.

A key goes to the focused element first, then up through its parents until one sets `Handled`. On each element the
element's own use of the key comes first, then its `OnKeyDown`. The built-in controls handle the keys they use (a list
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

The focused element's own `OnKeyDown` is raised even for a key its control used; `Handled` is already true then.

### Keyboard and focus properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`IsFocused`</span> | `bool` | Read-only. True while the element has the keyboard. |

### Keyboard and focus events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnKeyDown`</span> | `(BaseElement sender, KeyDownEventArgs e)` | A key is pressed while the element, or an element inside it that left the key unhandled, has the keyboard. |

### Keyboard and focus methods

| Method | Description |
| --- | --- |
| <span class="method">`Focus()`</span> | Gives the element the keyboard. Returns false when it can't take it: it is not in the tree, hidden or disabled. |

### KeyDownEventArgs

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`Key`</span> | `Keys` | Read-only. The key pressed. |
| <span class="prop">`Handled`</span> | `bool` | Set it to true to stop the key from going on to the parents. |

| Method | Description |
| --- | --- |
| `KeyDownEventArgs(Keys key)` | Creates the arguments for a key. |

## Tooltips and context menus

Any element can have a tooltip and a context menu. Both are elements you create and give to it; neither is disposed
with the element, and setting the property to null (or to another tooltip or menu) only detaches the old one. A
tooltip or menu belongs to one element at a time: giving it to another element takes it from the first.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`ToolTip`</span> | `ToolTip` | Shown while the element is hovered, after the tooltip's delay. See [ToolTip](/docs/ui-controls/#tooltip). |
| <span class="prop">`ContextMenu`</span> | `ContextMenu` | Opened at the mouse by a right click on the element, or on an element inside it without a menu of its own. See [ContextMenu](/docs/ui-lists/#contextmenu). |

## Resizing

Set `IsResizable` to let the user resize an element with the mouse. It gets resize areas over its edges and corners,
reaching `ResizeAreaHalfWidth` units to each side of the edge, with the resize cursors of its `MouseCursorsSet`.
Dragging an area changes `DesiredWidth` / `DesiredHeight` (or the margins of a stretched element without a desired
size) so that the opposite edge stays where it was; a centred element grows on both sides. The size stays within
`MinWidth` ... `MaxHeight`; without a minimum it is at least two resize areas wide. The element needs a parent; the root can't be made
resizable.

With `ResizeWithElementContour` the element stays as it is while you drag: a contour, drawn above everything, shows
the new bounds, and the element is resized there once when the button is released.

<figure class="shot">
  <img src="{{ '/assets/img/ui/base-resize.png' | relative_url }}" width="348" height="154" alt="A dark panel reading Pull the edges, with a sand coloured contour around it reaching further to the right, where the panel will be resized to">
  <figcaption>A resize with the contour: the panel is resized to the contour on release.</figcaption>
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
| <span class="dp">`IsResizable`</span> | `bool` | Lets the user resize the element by dragging its edges and corners. |
| <span class="dp">`ResizeAreaHalfWidth`</span> | `int` | How far the resize areas reach to each side of the edges, in units. 3 by default (`DefaultSettings.DefaultResizeAreaHalfWidth`); negative values are taken as 0. |
| <span class="dp">`ResizeWithElementContour`</span> | `bool` | Shows a contour while dragging and resizes the element once on release, instead of resizing it as the mouse moves. |
| <span class="dp">`ResizeContourColor`</span> | `Color` | The colour of the contour. `(50, 50, 50, 190)` by default (`DefaultSettings.DefaultResizeContourColor`); it fades and darkens with the element. |

`ResizeState` names the edge or corner a resize drags; `ResizeCursors` has a cursor set for each one (see
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

An element with a `DragType` is dragged with the left button. `DragOnly` moves its `DragTarget` with the mouse by
changing its margins (a window's title bar moves the window this way). `DragAndDrop` shows the target's
`DragAndDropRepresentation` under the mouse and asks each element it passes over whether it takes the drop. The full
walk-through with a screenshot is on the [images page](/docs/ui-images/#drag-and-drop).

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`DragType`</span> | `DragType` | Whether a press on the element drags something: nothing (the default), the element itself, or a drag and drop. |
| <span class="prop">`DragTarget`</span> | `BaseElement` | The element that is dragged; the element itself by default. |
| <span class="prop">`DragAndDropRepresentation`</span> | `DragAndDropRepresentation` | What is drawn under the mouse while the element is the dragged one. Detached, not disposed, with the element. |
| <span class="prop">`IsDropAllowedPredicate`</span> | `IfDropAllowed` | Decides whether a dragged element can be dropped here: `bool (BaseElement draggedElement)`. Without one every drop is denied. |

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnDragAndDropStart`</span> | `(BaseElement draggedElement)` | A drag and drop of this element (as the `DragTarget`) starts; the argument is the element whose `DragType` started it. |
| <span class="event">`OnDrop`</span> | `(BaseElement draggedElement, BaseElement dragAndDropDestination)` | A dragged element is released over this element and its predicate allowed it. |
| <span class="event">`OnDropDenied`</span> | `(BaseElement draggedElement, BaseElement dragAndDropDestination)` | A dragged element is released over this element and the drop is denied. |

`DragType`:

| Value | Meaning |
| --- | --- |
| `None` | A press drags nothing. |
| `DragOnly` | A press moves the `DragTarget` with the mouse. |
| `DragAndDrop` | A press starts a drag and drop of the `DragTarget`. |

## Grid placement

These properties place an element inside a [`Grid`](/docs/ui-layout/#grid); other parents ignore them.

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`GridRow`</span> | `int` | The row the element starts in, from 0. |
| <span class="dp">`GridColumn`</span> | `int` | The column the element starts in, from 0. |
| <span class="dp">`GridRowSpan`</span> | `int` | How many rows the element covers; values below 1 are taken as 1. |
| <span class="dp">`GridColumnSpan`</span> | `int` | How many columns the element covers; values below 1 are taken as 1. |

## Debug helpers

`BaseElement.ShowStateTint = true` tints every element whose own state is not `Normal`: hovered, pressed (with the
left button), or a drop target. Per element, `ShowHitRectangle` and `ShowActualSizeRectangle` outline where the element
takes the mouse and where the layout put it. None of these are dependency properties. `Grid.ShowLayout` draws a grid's
cells (see [Grid](/docs/ui-layout/#grid)).

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`ShowStateTint`</span> | `bool` | Static. Draws the state tints below over the elements. Off by default. |
| <span class="prop">`HoverTint`</span> | `Color` | Static. The tint of a hovered element, `(0, 10, 60, 10)` by default. |
| <span class="prop">`PressedTint`</span> | `Color` | Static. The tint of a pressed element, `(128, 128, 0, 10)` by default. |
| <span class="prop">`DropAllowedTint`</span> | `Color` | Static. The tint of a drop target that takes the dragged element, `(0, 100, 0, 10)` by default. |
| <span class="prop">`DropDeniedTint`</span> | `Color` | Static. The tint of a drop target that denies it, `(100, 0, 0, 10)` by default. |
| <span class="prop">`ModalWindowActiveShadeTint`</span> | `Color` | Static. The shade drawn over everything below the top modal window, `(0, 0, 0, 75)` by default. Always drawn, not a debug setting. |
| <span class="prop">`ShowHitRectangle`</span> | `bool` | Outlines the element's hit rectangle: its bounds as clipped by its parents. |
| <span class="prop">`ShowHitRectangleDiagonals`</span> | `bool` | Adds the diagonals to the hit rectangle outline. |
| <span class="prop">`HitRectangleColor`</span> | `Color` | The colour of the hit rectangle outline, `White` by default. |
| <span class="prop">`ShowActualSizeRectangle`</span> | `bool` | Outlines the element's `Bounds`, without clipping. |
| <span class="prop">`ShowActualSizeRectangleDiagonals`</span> | `bool` | Adds the diagonals to the bounds outline. |
| <span class="prop">`ActualSizeRectangleColor`</span> | `Color` | The colour of the bounds outline, `Green` by default. |

## Styles and cursors

Almost every element derives from `GenericStyleAndMouseCursorsData<TStyle>`, which ties it to a style class: a `Button`
is a `GenericStyleAndMouseCursorsData<ButtonStyle>`, so `Button.GeneralStyle` styles every button and
`button.StyleOverride` one button. A value you set on the element itself wins over both. `Grid`, `Separator` and the
parts made for other elements (rows, cells, title bars) derive from `BaseElement` directly and have no style. Styles
and cursor sets are explained on the [styles page](/docs/ui-styles/).

The cursors work the same way, from the most general to the most specific: `BaseElement.DefaultMouseCursorsSet` for
every element, `GeneralMouseCursorsSet` per element type, `MouseCursorsSetOverride` per element. A set given to a
control reaches its parts (the scroll bars of a list, the title bar of a window) unless they have one of their own.

### GenericStyleAndMouseCursorsData properties

`TStyle` is a style class (deriving from `BaseStyle`, with a parameterless constructor).

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`GeneralStyle`</span> | `TStyle` | Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. |
| <span class="prop">`StyleOverride`</span> | `TStyle` | A style for this element only, applied over the general style. Setting it to null takes its values back out. |
| <span class="prop">`GeneralMouseCursorsSet`</span> | `MouseCursorsSet` | Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. |
| <span class="prop">`MouseCursorsSetOverride`</span> | `MouseCursorsSet` | The cursors of this element only, passed on to its parts that have none of their own. |
| <span class="prop">`MouseCursorsSet`</span> | `MouseCursorsSet` | Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. |

### BaseElement cursor properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`DefaultMouseCursorsSet`</span> | `MouseCursorsSet` | Static. The cursors of every element without a more specific set: an arrow on hover, a hand over an element that can be dragged, a "no" cursor over a denied drop, and the sizing arrows over resize areas. `BorrowedTorchUI.SetDefaultMouseCursorsSet` sets it too. |
| <span class="prop">`MouseCursorsSet`</span> | `MouseCursorsSet` | Read-only. The cursors the element shows. On an element without a style: its control's cursors when it is a part of one, otherwise `DefaultMouseCursorsSet`. |

## The root element

`RootElement` is the top of the element tree. `BorrowedTorchUI` creates it (you can't create one yourself) and gives
it as `ui.RootElement`; `ui.AddElementToRoot(element)` adds an item to it. It has the size of the game window in
units (the back buffer size divided by the display scale) and follows the back buffer when the window is resized,
or takes the size given to `ApplyGameWindowSize`. It can't be resizable and it draws no background of its own, so give a full-screen panel your background
colour instead.

Above the tree the root draws the popups: the modal windows (with `ModalWindowActiveShadeTint` under the top one), the
open drop-down, the open context menu, the tooltip, the dragged representation and the resize contour, in that order
from the bottom. A drag and drop released where no element takes it is denied by the root (its `OnDropDenied` is
raised).

`ui.Dispose()` disposes the root. The elements you added to it are detached, not disposed: dispose the ones that hold
resources yourself.

`RootElement` adds no public members to `GenericStyleAndMouseCursorsData<RootElementStyle>`. Style class:
`RootElementStyle` (the base element properties only, see [styles](/docs/ui-styles/)).

## Writing your own element

The layout runs when something changed, in two walks down the tree. **Measure** finds every element's size from its
own settings, the slot its parent gives it and its content. **Arrange** then gives every element its final size
(`ActualWidth`, `ActualHeight`) and position (`Location`). One measure and one arrange settle a change, and nothing
reacts to a size while they run.

A custom element derives from `BaseElement` (or from `GenericStyleAndMouseCursorsData<TStyle>` to have a general
style) and overrides two methods:

- `MeasureContent(int width, int height)` measures the children and returns the size of the content. `width` and
  `height` are the element's own size where it is known (fixed or stretched, already within its size limits) and `-1`
  where the element fits its content: along such a side it takes the size you return. Measure a child with
  `child.Measure(slotWidth, slotHeight)` (the space you give it, `-1` for a size you don't know yet) or
  `child.MeasureAt(width, height)` (a size of your choice, `-1` for its own size), then read `child.MeasuredWidth` /
  `MeasuredHeight` (and `MeasuredContentWidth` / `MeasuredContentHeight`, what its content needs whatever size it got).
  The default lays the children over each other, each placed by its margins and alignment.
- `ArrangeContent()` places the children inside the element's final `Bounds`: `child.Arrange(slot)` places a child in
  a slot by its own margins and alignment, `child.ArrangeAt(bounds)` or `child.ArrangeAt(position)` puts it exactly
  there (in screen coordinates). The default arranges every child in the element's bounds.

Measure and arrange every child, or it keeps its old size and place. An element whose final size differs from the
measured one is measured again at it before it is arranged. `ActualWidthChangedHandlerOverride` and the other size
handlers run after a size was given, so laying out parts there is too late.

A setting of your element that changes its size or its content's calls `InvalidateMeasure()`; the layout properties
of `BaseElement` do this themselves. The arrange is incremental: an element in the same slot that was not measured
again is not arranged again. So any state your `ArrangeContent` reads that can change outside a measure (an offset, a
scroll position) must call `InvalidateArrange()` when it changes, or the children stay where they were.

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

`MeasureAt(-1, height)` lets each label keep its own width and gives it the row's height (or its own height where the
row fits its content). `ArrangeAt` then places each label exactly, so the labels' margins and alignment don't apply.

An element deriving from `BaseElement` directly has no style, so `HitTest` and `CropOutsideOfParentBorder` start off
(the styles turn them on): set them in your constructor if the element should take the mouse or be clipped to its
parent. An element deriving from `GenericStyleAndMouseCursorsData<TStyle>` should call `ApplyGeneralStyle()` at the end
of its constructor to take its general style. A derived element opts out of items with
`protected override bool AcceptsItems => false`.

### Layout methods

| Method | Description |
| --- | --- |
| <span class="method">`MeasureContent(int width, int height)`</span> | Protected virtual, returns `Point`. Measures the children and returns the content size, as described above. |
| <span class="method">`ArrangeContent()`</span> | Protected virtual. Arranges the children inside `Bounds`, as described above. |
| <span class="method">`Measure(int slotWidth, int slotHeight)`</span> | Measures the element for the slot its parent gives it (`-1`: a size the parent does not know yet): a stretched element takes the slot less its margins, a fixed one its desired size, the others fit their content. |
| <span class="method">`MeasureAt(int width, int height)`</span> | Measures the element at a size its container chose for it; along a side given as `-1` it has its own size (fixed, or fitted to its content). |
| <span class="method">`Arrange(Rectangle slot)`</span> | Gives the element its size and position in the slot: a stretched element takes the slot less its margins, the others keep their measured size and are placed by their margins and alignment. |
| <span class="method">`ArrangeAt(Point position)`</span> | Places the element at a position its container chose, at its measured size; its margins and alignment are not applied. |
| <span class="method">`ArrangeAt(Rectangle bounds)`</span> | Places the element at a position and size its container chose. |
| <span class="method">`InvalidateMeasure()`</span> | Asks for a new measure and arrange of the element: a setting of its own changed its size or its content's. |
| <span class="method">`InvalidateArrange()`</span> | Asks for the element's children to be placed again; its size stays. |

### Members for derived elements

| Method | Description |
| --- | --- |
| <span class="method">`BaseElement(string name = null)`</span> | Protected. Sets the name `GetElementByName` finds the element by. |
| <span class="method">`GenericStyleAndMouseCursorsData(string name = null)`</span> | Protected. The same, for an element with a style. |
| <span class="method">`AcceptsItems`</span> | Protected virtual property, `true` by default. Return false and the item methods do nothing on the element. |
| <span class="method">`AddChild(BaseElement child, bool isSole = false, int insertIndex = -1, bool isVisualComponent = true)`</span> | Protected. Adds a child; by default an own part, which the item methods leave alone and which is disposed when it is removed. `isSole` removes the other items first. |
| <span class="method">`RemoveChild(BaseElement child)`</span> | Protected. Takes a child out: an own part is disposed, an item only detached. |
| <span class="method">`RemoveChildAt(int index)`</span> | Protected. The same, by index in `Children`. |
| <span class="method">`DetachChild(BaseElement child)`</span> | Protected. Takes a child out without disposing it, to add it again later. |
| <span class="method">`DetachChildren()`</span> | Protected. Takes every child out without disposing them. |
| <span class="method">`DetachChildren(Predicate<BaseElement> match)`</span> | Protected. Takes the matching children out without disposing them. |
| <span class="method">`ActualWidth`</span>, <span class="method">`ActualHeight`</span> | Their setters are protected; the layout sets them, you normally don't. |
| <span class="method">`LoadTextures()`</span> | Protected virtual. Called when `TexturesPath` changes; load the element's textures from the folder here and call the base. |
| <span class="method">`UnsubscribeSelf()`</span> | Protected virtual. Called on dispose: release the element's subscriptions to other objects here. |
| <span class="method">`DisposeHandler()`</span> | Protected override. The element's dispose (see [items and content](#items-and-content)); call the base when you override it. |
| <span class="method">`CursorsPropertyChangedHandler()`</span> | Protected. Shows the element's current cursors again, after its cursor set changed. |
| <span class="method">`ApplyStyle(BaseStyle style, ValueSources valueSource)`</span> | Protected. Applies the style's assigned properties to the element as the given value source. |
| <span class="method">`Style`</span> | Protected property of `GenericStyleAndMouseCursorsData<TStyle>`: the style override, or the general style. |
| <span class="method">`ApplyGeneralStyle()`</span> | Protected, of `GenericStyleAndMouseCursorsData<TStyle>`. Applies the general style over the framework defaults. |
| <span class="method">`ApplyStyleOverride()`</span> | Protected, of `GenericStyleAndMouseCursorsData<TStyle>`. Applies the style override again. |

### Handler overrides

Each one is protected virtual and empty in `BaseElement`. An element overrides them to react to its own changes
before the matching public event (if any) is raised.

| Method | Description |
| --- | --- |
| <span class="method">`LocationChangedHandlerOverride(Point location)`</span> | The element moved. |
| <span class="method">`ActualWidthChangedHandlerOverride(int width)`</span> | The layout gave the element another width. |
| <span class="method">`ActualHeightChangedHandlerOverride(int height)`</span> | The layout gave the element another height. |
| <span class="method">`VisibilityChangedHandlerOverride(Visibility visibility)`</span> | `Visibility` changed; called before the children hear of it. |
| <span class="method">`VisibilityPropertyChangedHandlerOverride(Visibility value)`</span> | `Visibility` changed; called after the children heard of it. |
| <span class="method">`StateChangedHandlerOverride(BaseElement sender, ElementStateData stateData)`</span> | The shown state changed, before `OnStateChanged`. |
| <span class="method">`MouseEnterHandlerOverride()`</span> | Before `OnMouseEnter`. |
| <span class="method">`MouseLeaveHandlerOverride()`</span> | Before `OnMouseLeave`. |
| <span class="method">`ClickHandlerOverride(BaseElement sender, MouseClickEventArgs e)`</span> | Before `OnClick`. |
| <span class="method">`DoubleClickHandlerOverride(BaseElement sender, MouseClickEventArgs e)`</span> | Before `OnDoubleClick`. |
| <span class="method">`GotFocusHandlerOverride()`</span> | The element got the keyboard. |
| <span class="method">`LostFocusHandlerOverride()`</span> | The element lost the keyboard. Focusing another element here (the next field of a form) works. |
| <span class="method">`KeyDownHandlerOverride(KeyDownEventArgs e)`</span> | A key reached the element, before `OnKeyDown`; set `e.Handled` for a key the element uses. |
| <span class="method">`TextInputHandlerOverride(TextInputEventArgs e)`</span> | Typed text reached the focused element. |
| <span class="method">`InheritStatePropertyChangedHandlerOverride(InheritState value)`</span> | `InheritState` changed. |
| <span class="method">`ForegroundColorPropertyChangedHandlerOverride(Color value)`</span> | `ForegroundColor` changed. |
| <span class="method">`HitTestPropertyChangedHandlerOverride(bool value)`</span> | `HitTest` changed. |
| <span class="method">`TimeBeforeRepeatStartsMsPropertyChangedHandlerOverride(int value)`</span> | `TimeBeforeRepeatStartsMs` changed (after it was passed to the parts). |
| <span class="method">`TimeBetweenRepeatsMsPropertyChangedHandlerOverride(int value)`</span> | `TimeBetweenRepeatsMs` changed (after it was passed to the parts). |
| <span class="method">`DoubleClickIntervalMsPropertyChangedHandlerOverride(int value)`</span> | `DoubleClickIntervalMs` changed (after it was passed to the parts). |
