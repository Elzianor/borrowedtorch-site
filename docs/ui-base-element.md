---
layout: docs
title: "UI: base element"
description: What every element has in common, input and states, resizing, the root element and how to write your own element.
---

Every element derives from `BaseElement`, so everything on this page applies to all of them: buttons, labels, stack
panels, windows and your own elements. The other UI pages list only what each element adds. Every property listed is
a dependency property unless marked otherwise: `Foo` is backed by `FooDP`, which a style, a binding or an animation can
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
are logical units: one unit is one pixel at 100 % display scale (see [UI](/docs/ui/)).

In its slot an element is placed by its alignment and margins: `Left` / `Top` at its left / top margin, `Right` /
`Bottom` at its right / bottom margin, `Center` centred between both margins, `Stretch` over the whole slot less both
margins. A `Stretch` element that has a desired size is placed at its left / top margin.

A child's margin counts toward the content size of a parent that fits its content only on the side the child is
aligned to: the left / top margin for `Left` / `Top`, the right / bottom margin for `Right` / `Bottom`, both for
`Center`, and both for a `Stretch` child without a desired size (with one, only the left / top margin). The margin on
the other side is not counted. So in a horizontal `StackPanel`, the `Margin.Right` of a `Left` aligned item adds no
gap: put the gap on the left (or top) margin of the next item. A stretched child in a parent that fits its content
counts with the size of its own content, as in WPF, except wrapping text along the width: it takes the width the rest
of the content decides and wraps there (see [sizes and alignment](/docs/ui/#sizes-and-alignment)).

### Size and position properties

| Property | Type | Description |
| --- | --- | --- |
| `DesiredWidth` | `int` | The width in units. 0 (the default) fits the content, or stretches over the slot when `HorizontalAlignment` is `Stretch`. |
| `DesiredHeight` | `int` | The height in units. 0 (the default) fits the content, or stretches over the slot when `VerticalAlignment` is `Stretch`. |
| `MinWidth` | `int` | The smallest width the layout (and a resize) gives the element. 0 is no limit. |
| `MinHeight` | `int` | The smallest height the layout (and a resize) gives the element. 0 is no limit. |
| `MaxWidth` | `int` | The largest width the layout (and a resize) gives the element. 0 is no limit. |
| `MaxHeight` | `int` | The largest height the layout (and a resize) gives the element. 0 is no limit. |
| `HorizontalAlignment` | `HorizontalAlignment` | Where the element sits in its slot horizontally, and whether it stretches over it. The default is `Stretch`. |
| `VerticalAlignment` | `VerticalAlignment` | Where the element sits in its slot vertically, and whether it stretches over it. The default is `Stretch`. |
| `Margin` | `Margin` | The space between the element and the edges of its slot. Which sides count is described above. |
| `ActualWidth` | `int` | Read-only. The width the last layout gave the element, within its size limits (not a dependency property). |
| `ActualHeight` | `int` | Read-only. The height the last layout gave the element, within its size limits (not a dependency property). |
| `Location` | `Point` | Read-only. The top left corner of the element on the screen (not a dependency property). |
| `Left` | `int` | Read-only. `Location.X` (not a dependency property). |
| `Top` | `int` | Read-only. `Location.Y` (not a dependency property). |
| `Right` | `int` | Read-only. `Left + ActualWidth` (not a dependency property). |
| `Bottom` | `int` | Read-only. `Top + ActualHeight` (not a dependency property). |
| `Bounds` | `Rectangle` | Read-only. `Location` and the actual size as one rectangle (not a dependency property). |
| `MeasuredWidth` | `int` | Read-only. The width the last measure found: fixed, stretched over the slot or fitted to the content (not a dependency property). |
| `MeasuredHeight` | `int` | Read-only. The height the last measure found (not a dependency property). |
| `MeasuredContentWidth` | `int` | Read-only. The width the content needed at the last measure, whatever width the element was given (not a dependency property). |
| `MeasuredContentHeight` | `int` | Read-only. The height the content needed at the last measure (not a dependency property). |

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
| `Left` | `int` | Read-only field. The left margin. |
| `Top` | `int` | Read-only field. The top margin. |
| `Right` | `int` | Read-only field. The right margin. |
| `Bottom` | `int` | Read-only field. The bottom margin. |
| `Zero` | `Margin` | Static, read-only. A margin of 0 on every side. |

| Method | Description |
| --- | --- |
| `Margin()` | A margin of 0 on every side. |
| `Margin(int all)` | The same margin on every side. |
| `Margin(int left = 0, int top = 0, int right = 0, int bottom = 0)` | A margin per side; the sides left out are 0. |
| `implicit operator Margin(int all)` | `element.Margin = 5` sets 5 on every side. |
| `implicit operator Margin((int left, int top) tuple)` | Left and top; right and bottom are 0. |
| `implicit operator Margin((int left, int top, int right) tuple)` | Left, top and right; bottom is 0. |
| `implicit operator Margin((int left, int top, int right, int bottom) tuple)` | All four sides. |
| `operator -(Margin margin)` | The margin with every side negated. |
| `operator +(Margin margin1, Margin margin2)` | Adds the margins side by side. |
| `operator -(Margin margin1, Margin margin2)` | Subtracts the second margin from the first, side by side. |
| `operator ==(Margin margin1, Margin margin2)` | True when all four sides are equal. `!=` is the opposite. |
| `Equals(Margin other)` | True when all four sides are equal (`Equals(object)` as well, for another `Margin`). |
| `GetHashCode()` | A hash of the four sides. |
| `ToString()` | The sides as text, for example `L: 10 R: 30 T: 20 B: 40`. |

## Appearance

Without textures an element fills its bounds with `BackgroundColor`. With `TexturesPath` set, the elements that use
textures draw them from that folder instead (each element's section says which textures it reads). A disabled element
is drawn darker, and `Transparency` fades the element together with everything inside it.

<figure class="shot">
  <img src="{{ '/assets/img/ui/base-transparency.png' | relative_url }}" width="520" height="96" alt="Four sand coloured labels reading 0.00, 0.25, 0.50 and 0.75, each one more faded into the dark background than the one before">
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
| `Visibility` | `Visibility` | Whether the element is shown, hidden in its space or collapsed. The default is `Visible`. A hidden element loses the keyboard focus and any mouse state. |
| `BackgroundColor` | `Color` | The colour the element's background is filled with. `Transparent` (the default) fills nothing. |
| `ForegroundColor` | `Color` | The colour of what the element draws over its background, such as a label's text. An element drawn from textures tints them with it when it is not `Transparent`. |
| `TexturesPath` | `string` | A content folder with the element's textures, for example `UITextures/Button/`. A missing trailing path separator is added. |
| `TexturesPresent` | `bool` | Read-only. True when `TexturesPath` is set (not a dependency property). |
| `Transparency` | `float` | From 0 (opaque, the default) to 1 (invisible); values outside are clamped. Applies to the element and its subtree, combined with the parents' transparency. |
| `CropOutsideOfParentBorder` | `bool` | Clips the element to its parent's bounds. Without it the element may overflow its parent but is still clipped by whatever clips the parent (a scroll view, a window's content area). On by default for every element with a style. |
| `CustomEffect` | `Effect` | A shader the element draws its background (or texture, an image's picture) with. Setting it sets it on the children as well, and a child added later takes it. An effect with a `ModulationColor` parameter gets the draw colour there. |
| `PreDrawAction` | `Action` | Runs before the element and its subtree are drawn, for example to change the sprite batch state (not a dependency property). |
| `PostDrawAction` | `Action` | Runs after the element and its subtree are drawn, for example to restore what `PreDrawAction` changed (not a dependency property). |

Tooltips, context menus, drop-downs and modal windows are never clipped by the elements they open from.
`PreDrawAction` and `PostDrawAction` come in pairs: a hidden element runs neither of them.

### Appearance methods

| Method | Description |
| --- | --- |
| `Draw()` | Draws the element, its children and the popups above them. The UI calls it on the root every frame, you don't call it yourself. |

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
| `Id` | `Guid` | Read-only field. A unique id made when the element is created. |
| `Name` | `string` | Read-only. The name given to the constructor, used by `GetElementByName` (not a dependency property). |
| `Parent` | `BaseElement` | Read-only. The element this one is in, null when it is not in one (not a dependency property). |
| `Children` | `IReadOnlyList<BaseElement>` | Read-only. The element's children: its items and the parts it made itself (not a dependency property). |
| `IsDisposed` | `bool` | Read-only. True once `Dispose()` was called (not a dependency property). |

### Items and content events

| Event | Handler | Raised when |
| --- | --- | --- |
| `OnDisposed` | `(BaseElement sender)` | The element was disposed. Raised once, at the end of `Dispose()`; the handlers are let go afterwards. |

### Items and content methods

| Method | Description |
| --- | --- |
| `AddItem(BaseElement item)` | Adds the item after the other children. |
| `AddItemAt(BaseElement item, int index)` | Inserts the item at the index in `Children`. An index below 0 or above the count is ignored. |
| `AddItemsRange(IEnumerable<BaseElement> items)` | Adds the items in order after the other children. |
| `AddItemsRangeAt(IEnumerable<BaseElement> items, int index)` | Inserts the items in order from the index; a null item takes no place. |
| `RemoveItem(BaseElement item)` | Takes the item out without disposing it. Does nothing for a part of the element. |
| `RemoveItemAt(int index)` | Takes the item at the index out without disposing it. |
| `RemoveItemsRangeAt(int index, int count)` | Takes `count` items out from the index on (fewer when the children end first), without disposing them. |
| `ClearItems()` | Takes every item out without disposing them; the element's own parts stay. |
| `GetElementByName(string name)` | Finds an element by name below this one (its children first, then deeper, popups such as its tooltip included). Null when there is none. |
| `Dispose()` | Disposes the element as described above. |

`BorrowedTorchUI` has a `GetElementByName<T>(string name)` that searches from the root and casts the result (see
[UI](/docs/ui/)).

### DisposableBase

The base class of `BaseElement`, with the dispose pattern every element uses.

| Property | Type | Description |
| --- | --- | --- |
| `IsDisposed` | `bool` | Read-only. True once `Dispose()` was called. |

| Method | Description |
| --- | --- |
| `Dispose()` | Marks the object disposed and runs `DisposeHandler` once; later calls do nothing. |
| `DisposeHandler()` | Protected, abstract. The clean-up of the derived class; `BaseElement` implements it as described above. |

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
  <img src="{{ '/assets/img/ui/base-states.png' | relative_url }}" width="520" height="72" alt="Three buttons side by side: Normal in sand brown, Hovered in a lighter sand colour, Disabled in a dark brown">
  <figcaption>A button in its normal state, hovered, and disabled.</figcaption>
</figure>

```csharp
var row = new StackPanel { Orientation = Orientation.Horizontal, Margin = (16, 18) };

row.AddItem(new Button { Text = "Normal", DesiredWidth = 140, DesiredHeight = 36 });
row.AddItem(new Button("hovered") { Text = "Hovered", DesiredWidth = 140, DesiredHeight = 36, Margin = (16, 0) });
row.AddItem(new Button { Text = "Disabled", DesiredWidth = 140, DesiredHeight = 36, Margin = (16, 0), Disabled = true });

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
| `HitTest` | `bool` | Whether the element itself takes the mouse. On by default for every element with a style; off for an element deriving from `BaseElement` directly. |
| `Disabled` | `bool` | Stops the element and its subtree from showing states, raising mouse events and taking the keyboard, and draws them darker. |
| `InheritState` | `InheritState` | Which states the element shows besides its own: its parent's, its children's, both or none (the default). |
| `StateData` | `ElementStateData` | Read-only. The state the element shows now and where it comes from (not a dependency property). |

### Mouse and states events

| Event | Handler | Raised when |
| --- | --- | --- |
| `OnStateChanged` | `(BaseElement sender, ElementStateData e)` | The state the element shows changes, its own or one it takes. Raised again for every change of the mouse buttons while the element is pressed. |
| `OnMouseEnter` | `(BaseElement sender)` | The element starts taking the mouse. |
| `OnMouseLeave` | `(BaseElement sender)` | The element stops taking the mouse: the mouse left, moved onto a child that takes it, or the element got disabled or hidden. |
| `OnClick` | `(BaseElement sender, MouseClickEventArgs e)` | A mouse button pressed on the element is released over it (with `RepeatClicks`: on the press and while it is held). |
| `OnDoubleClick` | `(BaseElement sender, MouseClickEventArgs e)` | The left button is pressed a second time within `DoubleClickIntervalMs`. Not raised by an element with `RepeatClicks`. |

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
| `State` | `ElementState` | Read-only. The state shown. |
| `Source` | `StateSource` | Read-only. Where the state comes from. |
| `MouseButtonsStates` | `MouseButtonsStates` | Read-only. The current states of the mouse buttons (read when you read it, not stored with the state). |
| `NormalOwn` | `ElementStateData` | Static, read-only field. The `Normal` / `Own` state every element starts with. |

| Method | Description |
| --- | --- |
| `ElementStateData(ElementState state, StateSource source)` | Creates a state, for example to compare with `StateData`. |
| `operator ==(ElementStateData state1, ElementStateData state2)` | True when the state and the source are equal. `!=` and `Equals` compare the same way. |
| `GetHashCode()` | A hash of the state and the source. |
| `ToString()` | The state and the source as text, separated by a vertical bar. |

### MouseClickEventArgs

What `OnClick` and `OnDoubleClick` get, taken when the click happens.

| Property | Type | Description |
| --- | --- | --- |
| `MousePosition` | `Point` | Read-only. The mouse position in units, like the element positions. |
| `ButtonsStates` | `MouseButtonsStates` | Read-only. The states of the mouse buttons, to tell which button clicked. |

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
| `RepeatClicks` | `bool` | Raises `OnClick` on the press and repeatedly while the left button is held, instead of once on release. Off by default. |
| `TimeBeforeRepeatStartsMs` | `int` | Milliseconds from the press to the first repeated click. 1000 by default; negative values are taken as 0. |
| `TimeBetweenRepeatsMs` | `int` | Milliseconds between the repeated clicks after the first one. 300 by default; negative values are taken as 0. |
| `DoubleClickIntervalMs` | `int` | The longest time in milliseconds between two left presses that make a double click. 300 by default; negative values are taken as 0. |

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
| `IsFocused` | `bool` | Read-only. True while the element has the keyboard (not a dependency property). |

### Keyboard and focus events

| Event | Handler | Raised when |
| --- | --- | --- |
| `OnKeyDown` | `(BaseElement sender, KeyDownEventArgs e)` | A key is pressed while the element, or an element inside it that left the key unhandled, has the keyboard. |

### Keyboard and focus methods

| Method | Description |
| --- | --- |
| `Focus()` | Gives the element the keyboard. Returns false when it can't take it: it is not in the tree, hidden or disabled. |

### KeyDownEventArgs

| Property | Type | Description |
| --- | --- | --- |
| `Key` | `Keys` | Read-only. The key pressed. |
| `Handled` | `bool` | Set it to true to stop the key from going on to the parents. |

| Method | Description |
| --- | --- |
| `KeyDownEventArgs(Keys key)` | Creates the arguments for a key. |

## Tooltips and context menus

Any element can have a tooltip and a context menu. Both are elements you create and give to it; neither is disposed
with the element, and setting the property to null (or to another tooltip or menu) only detaches the old one. A
tooltip or menu belongs to one element at a time: giving it to another element takes it from the first.

| Property | Type | Description |
| --- | --- | --- |
| `ToolTip` | `ToolTip` | Shown while the element is hovered, after the tooltip's delay (not a dependency property). See [ToolTip](/docs/ui-controls/#tooltip). |
| `ContextMenu` | `ContextMenu` | Opened at the mouse by a right click on the element, or on an element inside it without a menu of its own (not a dependency property). See [ContextMenu](/docs/ui-lists/#contextmenu). |

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
  <img src="{{ '/assets/img/ui/base-resize.png' | relative_url }}" width="460" height="190" alt="A dark panel reading Pull the edges, with a sand coloured contour around it reaching further to the right, where the panel will be resized to">
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
| `IsResizable` | `bool` | Lets the user resize the element by dragging its edges and corners. |
| `ResizeAreaHalfWidth` | `int` | How far the resize areas reach to each side of the edges, in units. 3 by default (`DefaultSettings.DefaultResizeAreaHalfWidth`); negative values are taken as 0. |
| `ResizeWithElementContour` | `bool` | Shows a contour while dragging and resizes the element once on release, instead of resizing it as the mouse moves. |
| `ResizeContourColor` | `Color` | The colour of the contour. `(50, 50, 50, 190)` by default (`DefaultSettings.DefaultResizeContourColor`); it fades and darkens with the element. |

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
| `DragType` | `DragType` | Whether a press on the element drags something: nothing (the default), the element itself, or a drag and drop. |
| `DragTarget` | `BaseElement` | The element that is dragged; the element itself by default (not a dependency property). |
| `DragAndDropRepresentation` | `DragAndDropRepresentation` | What is drawn under the mouse while the element is the dragged one. Detached, not disposed, with the element (not a dependency property). |
| `IsDropAllowedPredicate` | `IfDropAllowed` | Decides whether a dragged element can be dropped here: `bool (BaseElement draggedElement)`. Without one every drop is denied (not a dependency property). |

| Event | Handler | Raised when |
| --- | --- | --- |
| `OnDragAndDropStart` | `(BaseElement draggedElement)` | A drag and drop of this element (as the `DragTarget`) starts; the argument is the element whose `DragType` started it. |
| `OnDrop` | `(BaseElement draggedElement, BaseElement dragAndDropDestination)` | A dragged element is released over this element and its predicate allowed it. |
| `OnDropDenied` | `(BaseElement draggedElement, BaseElement dragAndDropDestination)` | A dragged element is released over this element and the drop is denied. |

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
| `GridRow` | `int` | The row the element starts in, from 0. |
| `GridColumn` | `int` | The column the element starts in, from 0. |
| `GridRowSpan` | `int` | How many rows the element covers; values below 1 are taken as 1. |
| `GridColumnSpan` | `int` | How many columns the element covers; values below 1 are taken as 1. |

## Debug helpers

`BaseElement.ShowStateTint = true` tints every element whose own state is not `Normal`: hovered, pressed (with the
left button), or a drop target. Per element, `ShowHitRectangle` and `ShowActualSizeRectangle` outline where the element
takes the mouse and where the layout put it. None of these are dependency properties. `Grid.ShowLayout` draws a grid's
cells (see [Grid](/docs/ui-layout/#grid)).

| Property | Type | Description |
| --- | --- | --- |
| `ShowStateTint` | `bool` | Static. Draws the state tints below over the elements. Off by default. |
| `HoverTint` | `Color` | Static. The tint of a hovered element, `(0, 10, 60, 10)` by default. |
| `PressedTint` | `Color` | Static. The tint of a pressed element, `(128, 128, 0, 10)` by default. |
| `DropAllowedTint` | `Color` | Static. The tint of a drop target that takes the dragged element, `(0, 100, 0, 10)` by default. |
| `DropDeniedTint` | `Color` | Static. The tint of a drop target that denies it, `(100, 0, 0, 10)` by default. |
| `ModalWindowActiveShadeTint` | `Color` | Static. The shade drawn over everything below the top modal window, `(0, 0, 0, 75)` by default. Always drawn, not a debug setting. |
| `ShowHitRectangle` | `bool` | Outlines the element's hit rectangle: its bounds as clipped by its parents. |
| `ShowHitRectangleDiagonals` | `bool` | Adds the diagonals to the hit rectangle outline. |
| `HitRectangleColor` | `Color` | The colour of the hit rectangle outline, `White` by default. |
| `ShowActualSizeRectangle` | `bool` | Outlines the element's `Bounds`, without clipping. |
| `ShowActualSizeRectangleDiagonals` | `bool` | Adds the diagonals to the bounds outline. |
| `ActualSizeRectangleColor` | `Color` | The colour of the bounds outline, `Green` by default. |

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
| `GeneralStyle` | `TStyle` | Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default (not a dependency property). |
| `StyleOverride` | `TStyle` | A style for this element only, applied over the general style. Setting it to null takes its values back out (not a dependency property). |
| `GeneralMouseCursorsSet` | `MouseCursorsSet` | Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet` (not a dependency property). |
| `MouseCursorsSetOverride` | `MouseCursorsSet` | The cursors of this element only, passed on to its parts that have none of their own (not a dependency property). |
| `MouseCursorsSet` | `MouseCursorsSet` | Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet` (not a dependency property). |

### BaseElement cursor properties

| Property | Type | Description |
| --- | --- | --- |
| `DefaultMouseCursorsSet` | `MouseCursorsSet` | Static. The cursors of every element without a more specific set: an arrow on hover, a hand over an element that can be dragged, a "no" cursor over a denied drop, and the sizing arrows over resize areas. `BorrowedTorchUI.SetDefaultMouseCursorsSet` sets it too (not a dependency property). |
| `MouseCursorsSet` | `MouseCursorsSet` | Read-only. The cursors the element shows. On an element without a style: its control's cursors when it is a part of one, otherwise `DefaultMouseCursorsSet` (not a dependency property). |

## The root element

`RootElement` is the top of the element tree. `BorrowedTorchUI` creates it (you can't create one yourself) and gives
it as `ui.RootElement`; `ui.AddElementToRoot(element)` adds an item to it. It has the size of the game window in
units (the back buffer size divided by the display scale) and follows the window when `ApplyNewGameWindowSizeHandler`
is called. It can't be resizable and it draws no background of its own, so give a full-screen panel your background
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
// its items side by side, each at its own width and at the row's height, with a gap between them
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
  <img src="{{ '/assets/img/ui/base-custom-element.png' | relative_url }}" width="460" height="96" alt="Four sand brown labels in a row reading 60, 100, 40 and 140, each as wide as its number, with even gaps between them">
  <figcaption>The custom Row element with four labels of different widths and a gap of 10.</figcaption>
</figure>

```csharp
var row = new Row("row") { Gap = 10, Margin = (16, 16), HorizontalAlignment = HorizontalAlignment.Left, VerticalAlignment = VerticalAlignment.Top };

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
| `MeasureContent(int width, int height)` | Protected virtual, returns `Point`. Measures the children and returns the content size, as described above. |
| `ArrangeContent()` | Protected virtual. Arranges the children inside `Bounds`, as described above. |
| `Measure(int slotWidth, int slotHeight)` | Measures the element for the slot its parent gives it (`-1`: a size the parent does not know yet): a stretched element takes the slot less its margins, a fixed one its desired size, the others fit their content. |
| `MeasureAt(int width, int height)` | Measures the element at a size its container chose for it; along a side given as `-1` it has its own size (fixed, or fitted to its content). |
| `Arrange(Rectangle slot)` | Gives the element its size and position in the slot: a stretched element takes the slot less its margins, the others keep their measured size and are placed by their margins and alignment. |
| `ArrangeAt(Point position)` | Places the element at a position its container chose, at its measured size; its margins and alignment are not applied. |
| `ArrangeAt(Rectangle bounds)` | Places the element at a position and size its container chose. |
| `InvalidateMeasure()` | Asks for a new measure and arrange of the element: a setting of its own changed its size or its content's. |
| `InvalidateArrange()` | Asks for the element's children to be placed again; its size stays. |

### Members for derived elements

| Method | Description |
| --- | --- |
| `BaseElement(string name = null)` | Protected. Sets the name `GetElementByName` finds the element by. |
| `GenericStyleAndMouseCursorsData(string name = null)` | Protected. The same, for an element with a style. |
| `AcceptsItems` | Protected virtual property, `true` by default. Return false and the item methods do nothing on the element. |
| `AddChild(BaseElement child, bool isSole = false, int insertIndex = -1, bool isVisualComponent = true)` | Protected. Adds a child; by default an own part, which the item methods leave alone and which is disposed when it is removed. `isSole` removes the other items first. |
| `RemoveChild(BaseElement child)` | Protected. Takes a child out: an own part is disposed, an item only detached. |
| `RemoveChildAt(int index)` | Protected. The same, by index in `Children`. |
| `DetachChild(BaseElement child)` | Protected. Takes a child out without disposing it, to add it again later. |
| `DetachChildren()` | Protected. Takes every child out without disposing them. |
| `DetachChildren(Predicate<BaseElement> match)` | Protected. Takes the matching children out without disposing them. |
| `ActualWidth`, `ActualHeight` | Their setters are protected; the layout sets them, you normally don't. |
| `LoadTextures()` | Protected virtual. Called when `TexturesPath` changes; load the element's textures from the folder here and call the base. |
| `UnsubscribeSelf()` | Protected virtual. Called on dispose: release the element's subscriptions to other objects here. |
| `DisposeHandler()` | Protected override. The element's dispose (see [items and content](#items-and-content)); call the base when you override it. |
| `CursorsPropertyChangedHandler()` | Protected. Shows the element's current cursors again, after its cursor set changed. |
| `ApplyStyle(BaseStyle style, ValueSources valueSource)` | Protected. Applies the style's assigned properties to the element as the given value source. |
| `Style` | Protected property of `GenericStyleAndMouseCursorsData<TStyle>`: the style override, or the general style. |
| `ApplyGeneralStyle()` | Protected, of `GenericStyleAndMouseCursorsData<TStyle>`. Applies the general style over the framework defaults. |
| `ApplyStyleOverride()` | Protected, of `GenericStyleAndMouseCursorsData<TStyle>`. Applies the style override again. |

### Handler overrides

Each one is protected virtual and empty in `BaseElement`. An element overrides them to react to its own changes
before the matching public event (if any) is raised.

| Method | Description |
| --- | --- |
| `LocationChangedHandlerOverride(Point location)` | The element moved. |
| `ActualWidthChangedHandlerOverride(int width)` | The layout gave the element another width. |
| `ActualHeightChangedHandlerOverride(int height)` | The layout gave the element another height. |
| `VisibilityChangedHandlerOverride(Visibility visibility)` | `Visibility` changed; called before the children hear of it. |
| `VisibilityPropertyChangedHandlerOverride(Visibility value)` | `Visibility` changed; called after the children heard of it. |
| `StateChangedHandlerOverride(BaseElement sender, ElementStateData stateData)` | The shown state changed, before `OnStateChanged`. |
| `MouseEnterHandlerOverride()` | Before `OnMouseEnter`. |
| `MouseLeaveHandlerOverride()` | Before `OnMouseLeave`. |
| `ClickHandlerOverride(BaseElement sender, MouseClickEventArgs e)` | Before `OnClick`. |
| `DoubleClickHandlerOverride(BaseElement sender, MouseClickEventArgs e)` | Before `OnDoubleClick`. |
| `GotFocusHandlerOverride()` | The element got the keyboard. |
| `LostFocusHandlerOverride()` | The element lost the keyboard. Focusing another element here (the next field of a form) works. |
| `KeyDownHandlerOverride(KeyDownEventArgs e)` | A key reached the element, before `OnKeyDown`; set `e.Handled` for a key the element uses. |
| `TextInputHandlerOverride(TextInputEventArgs e)` | Typed text reached the focused element. |
| `InheritStatePropertyChangedHandlerOverride(InheritState value)` | `InheritState` changed. |
| `ForegroundColorPropertyChangedHandlerOverride(Color value)` | `ForegroundColor` changed. |
| `HitTestPropertyChangedHandlerOverride(bool value)` | `HitTest` changed. |
| `TimeBeforeRepeatStartsMsPropertyChangedHandlerOverride(int value)` | `TimeBeforeRepeatStartsMs` changed (after it was passed to the parts). |
| `TimeBetweenRepeatsMsPropertyChangedHandlerOverride(int value)` | `TimeBetweenRepeatsMs` changed (after it was passed to the parts). |
| `DoubleClickIntervalMsPropertyChangedHandlerOverride(int value)` | `DoubleClickIntervalMs` changed (after it was passed to the parts). |
