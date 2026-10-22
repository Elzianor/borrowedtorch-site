---
layout: docs
title: "UI: controls"
description: Buttons, check boxes, sliders, progress bars, tooltips and the colour picker.
---

Every control here is an element: it has all the properties, events and methods of
[`BaseElement`](/docs/ui-base-element/), which the tables below don't repeat. Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property: `Foo` is backed by `FooDP`, which a style, a binding or an animation can set (see
[styles, bindings and animation](/docs/ui-styles/)), and by a static `FooDPActions` shared by all elements of the
class. Screenshots use the theme from [styles](/docs/ui-styles/#the-theme-of-these-pages).

## Button

A clickable element with a text or any element as content. It can act once per click, repeat while held, or toggle
on and off.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-button.png' | relative_url }}" width="486" height="74" alt="Three buttons: Play, a toggled Music button, and Zoom in">
  <figcaption>A normal, a toggled and a repeat button.</figcaption>
</figure>

```csharp
var play = new Button("play") { Text = "Play", DesiredWidth = 140, DesiredHeight = 36 };
play.OnClick += (sender, e) => Console.WriteLine("Play");

// a toggle keeps its state: ToggledOn, OnToggled
var music = new Button("music")
{
    Text = "Music: on",
    Type = ButtonType.Toggle,
    ToggledOn = true,
    DesiredWidth = 140,
    DesiredHeight = 36,
    Margin = (16, 0)
};
music.OnToggled += (sender, isOn) => music.Text = isOn ? "Music: on" : "Music: off";

// a repeat button raises OnClick again and again while it is held
var zoom = new Button("zoomIn")
{
    Text = "Zoom in +",
    Type = ButtonType.Repeat,
    DesiredWidth = 140,
    DesiredHeight = 36,
    Margin = (16, 0)
};
zoom.OnClick += (sender, e) => Console.WriteLine("Zoom");

var row = new StackPanel { Orientation = Orientation.Horizontal, Margin = (16, 18) };
row.AddItemsRange([play, music, zoom]);

ui.AddElementToRoot(row);
```

A click happens when the left button is released over the button it was pressed on, so moving off the button before
releasing cancels it. A `Repeat` button raises `OnClick` as soon as it is pressed, then again after
`TimeBeforeRepeatStartsMs` and every `TimeBetweenRepeatsMs` while held (see the
[base element](/docs/ui-base-element/#click-timing)).

Without textures the button is drawn in the solid colour of its state. With `TexturesPath` set, it draws the
`Normal`, `Hover`, `Pressed` and `Toggled` textures from that folder instead.

### Button properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Text`</span> | `string` | Creates a centred `RichTextBox` content showing this text, styled by `TextStyle`. |
| <span class="dp">`Content`</span> | `BaseElement` | Any element shown inside the button instead of a text. A content you give is detached, not disposed, when it is replaced. |
| <span class="dp">`Type`</span> | `ButtonType` | How the button reacts to the mouse: `Normal`, `Repeat` or `Toggle`. |
| <span class="dp">`ToggledOn`</span> | `bool` | Whether a `Toggle` button is on. Set it to switch the button from code; `OnToggled` is raised. |
| <span class="dp">`NormalColor`</span> | `Color` | The solid colour while nothing happens. |
| <span class="dp">`HoverColor`</span> | `Color` | The solid colour while the mouse is over the button. |
| <span class="dp">`PressedColor`</span> | `Color` | The solid colour while the button is pressed. |
| <span class="dp">`ToggledColor`</span> | `Color` | The solid colour of a `Toggle` button that is on. |
| <span class="dp">`TextStyle`</span> | `RichTextBoxStyle` | The style of the text content made from `Text`. |
| <span class="dp">`BackgroundStyle`</span> | `ImageStyle` | The style of the image the button draws its background with. |

### Button events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnToggled`</span> | `(BaseElement sender, bool isToggledOn)` | A `Toggle` button turns on or off, by a click or from code. |

Clicks come through the inherited `OnClick`.

### Button methods

| Method | Description |
| --- | --- |
| `Button(string name = null)` | Creates a button. The name is used by `GetElementByName`. |

`ButtonType`:

| Value | Meaning |
| --- | --- |
| `Normal` | One `OnClick` per click, on release. |
| `Repeat` | `OnClick` on press, then repeatedly while held. |
| `Toggle` | Each click switches `ToggledOn`. |

Style class: `ButtonStyle` (the same properties, see [styles](/docs/ui-styles/)).

## CheckBox

A box with a text or any element beside it. It works as a check box that turns on and off, or as a radio button
that is one choice of a group.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-checkbox.png' | relative_url }}" width="275" height="124" alt="Check boxes Subtitles (checked) and Vibration, radio buttons Easy, Normal (checked) and Hard, and a checked box to the right of its text">
  <figcaption>Two check boxes, a radio group and a box on the right of its text.</figcaption>
</figure>

```csharp
var subtitles = new CheckBox("subtitles")
{
    Text = "Subtitles",
    Checked = true,
    DesiredHeight = 22
};
var vibration = new CheckBox("vibration")
{
    Text = "Vibration",
    DesiredHeight = 22,
    Margin = (24, 0)
};
subtitles.OnCheckedUnchecked += (sender, isChecked) =>
    Console.WriteLine($"Subtitles {isChecked}");

// radio buttons of one group uncheck each other
CheckBox Difficulty(string text) => new()
{
    Type = CheckBoxType.RadioButton,
    GroupId = "difficulty",
    Text = text,
    DesiredHeight = 22
};

var easy = Difficulty("Easy");
var normal = Difficulty("Normal");
var hard = Difficulty("Hard");
normal.Margin = hard.Margin = (24, 0);

// the box on the right of its text
var mirrored = new CheckBox("rightBox")
{
    Text = "Box on the right",
    Direction = CheckBoxDirection.Right,
    Checked = true,
    DesiredHeight = 22,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 84)
};

var options = new StackPanel
{
    Orientation = Orientation.Horizontal,
    Margin = (16, 16)
};
options.AddItemsRange([subtitles, vibration]);

var levels = new StackPanel { Orientation = Orientation.Horizontal, Margin = (16, 50) };
levels.AddItemsRange([easy, normal, hard]);

ui.AddElementToRoot(options);
ui.AddElementToRoot(levels);
ui.AddElementToRoot(mirrored);

normal.Checked = true;
```

The box is a square as high as the check box, and the content takes the rest of the width beside it. Without a
`DesiredHeight` the check box is as high as its content. A text content is left-aligned, vertically centred and kept
5 units from the box.

Like a button click, a change happens when the left button is released over the check box it was pressed on. A
`CheckBox` switches `Checked` on each click. A `RadioButton` is only checked by a click, never unchecked: it is
unchecked when another box of its group is checked.

Radio buttons with the same `GroupId` form a group while they are in the element tree:

- Checking one box of the group unchecks the others, however it got checked: a click, code or a binding.
- The first box to join a group starts checked, unless you set its `Checked` by hand before. In the snippet `Easy`
  starts checked, then `normal.Checked = true` moves the choice to `Normal`.
- A checked box that joins a group stays checked and unchecks the others.
- A box leaves its group when it leaves the tree, so a rebuilt panel with the same group id starts clean.

A radio button without a `GroupId` is a group of its own: a click checks it and nothing unchecks it.

Without textures the box is a solid square in `CheckedSolidColor` or `UncheckedSolidColor`. These have no default
colour, so give them in a style or on the element. With `TexturesPath` set, the box shows the `Checked` and
`Unchecked` textures from that folder instead, stretched over the square.

### CheckBox properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Text`</span> | `string` | Creates a `RichTextBox` content showing this text, styled by `TextStyle`. |
| <span class="dp">`Content`</span> | `BaseElement` | Any element shown beside the box instead of a text. A content you give is detached, not disposed, when it is replaced. |
| <span class="dp">`Checked`</span> | `bool` | Whether the box is checked. Setting it raises `OnCheckedUnchecked`, and checking a radio button unchecks the others of its group. |
| <span class="dp">`Type`</span> | `CheckBoxType` | `CheckBox` (the default) or `RadioButton`. |
| <span class="dp">`GroupId`</span> | `string` | The group of a radio button: the radio buttons in the tree with the same id uncheck each other. Not used by a `CheckBox`. |
| <span class="dp">`Direction`</span> | `CheckBoxDirection` | Which side of the content the box is on: `Left` (the default) or `Right`. |
| <span class="dp">`CheckedSolidColor`</span> | `Color` | The colour of the box while it is checked, without textures. |
| <span class="dp">`UncheckedSolidColor`</span> | `Color` | The colour of the box while it is unchecked, without textures. |
| <span class="dp">`TextStyle`</span> | `RichTextBoxStyle` | The style of the text content made from `Text`. |
| <span class="dp">`ImageStyle`</span> | `ImageStyle` | The style of the image that draws the box. |

### CheckBox events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnCheckedUnchecked`</span> | `(BaseElement sender, bool isChecked)` | `Checked` changes: by a click, from code, by a binding, or because another box of the group was checked. |

### CheckBox methods

| Method | Description |
| --- | --- |
| `CheckBox(string name = null)` | Creates a check box. The name is used by `GetElementByName`. |

`CheckBoxType`:

| Value | Meaning |
| --- | --- |
| `CheckBox` | Each click switches `Checked` on or off. |
| `RadioButton` | A click checks the box; checking it unchecks the other boxes of its `GroupId`. |

`CheckBoxDirection`:

| Value | Meaning |
| --- | --- |
| `Left` | The box is on the left, the content on its right. |
| `Right` | The box is on the right, the content on its left. |

Style class: `CheckBoxStyle` (the same properties except `Content`, see [styles](/docs/ui-styles/)).

## Slider

A track with a thumb that picks a value between `Min` and `Max`. The same element is the scroll bar of scrollable
elements: with `ContentSize` and `ViewSize` its thumb shows how much of the content is in view.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-slider.png' | relative_url }}" width="395" height="184" alt="A volume slider at 60 with tick marks under it, a slider with end caps, a scroll bar with a long thumb, and a vertical slider">
  <figcaption>A slider with ticks, a slider with caps, a scroll bar and a vertical slider.</figcaption>
</figure>

```csharp
var volume = new Slider("volume")
{
    DesiredWidth = 300,
    DesiredHeight = 18,
    Min = 0,
    Max = 100,
    Value = 60,
    Tick = 10,                                // snaps to steps of 10, with tick marks
    TickPlacement = TickPlacement.BottomOrRight,
    TickSize = new Point(1, 5),
    TickOffset = 3,
    ThumbScale = new Vector2(0.6f, 1.0f),
    Margin = (16, 16)
};
volume.OnValueChanged += (sender, value) => Console.WriteLine($"Volume {value}");

// end buttons that jump to the minimum and the maximum
var brightness = new Slider("brightness")
{
    Type = SliderType.SliderWithCaps,
    DesiredWidth = 300,
    DesiredHeight = 18,
    Max = 1,
    Value = 0.3f,
    Margin = (16, 66)
};

// a scroll bar: the thumb's length is the view's share of the content
var scrollBar = new Slider("scrollBar")
{
    Type = SliderType.ScrollBar,
    DesiredWidth = 300,
    DesiredHeight = 14,
    ContentSize = new Point(1200, 0),
    ViewSize = new Point(400, 0),
    Value = 0.5f,
    Max = 1,
    Margin = (16, 110)
};

var height = new Slider("height")
{
    Orientation = Orientation.Vertical,
    DesiredWidth = 18,
    DesiredHeight = 150,
    Max = 100,
    Value = 70,
    Margin = (360, 16)
};

ui.AddElementToRoot(volume);
ui.AddElementToRoot(brightness);
ui.AddElementToRoot(scrollBar);
ui.AddElementToRoot(height);
```

**Value.** `Min` and `Max` both start at 0, so set `Max`. `Value` is always kept inside the range, and the order you
set the three in does not matter: a value outside the range is clamped, and comes back once the range is widened to
include it. Setting `Min` above `Max` moves `Max` along, and the other way round. A vertical slider has `Min` at the
bottom.

**Ticks.** With `Tick` above 0 the value snaps to the closest of `Min`, `Min + Tick`, `Min + 2 × Tick` and so on,
or to `Max` (which counts as a tick when the range is not a multiple of `Tick`). Changing `Tick` snaps the current
value again. With `TickPlacement` other than `None`, a mark is drawn at every tick, `Min` and `Max` included, as a
solid rectangle of `TickSize` units, `TickOffset` units outside the slider's edge. Marks at or below the value use
`TickPassedColor`, the others `TickRemainingColor`. `TickSize` starts at 0 by 0, so set it to see the marks. When
the ticks are denser than the track's pixels, only some of them are drawn.

**Mouse.** Drag the thumb to change the value. A click on the track either side of the thumb steps the value
towards the click, and holding the button repeats the step:

- A plain step is one tick, or 5 % of the range without `Tick`.
- On a `ScrollBar` or `ScrollBarNoButtons` with `ContentSize` and `ViewSize` set, a track click moves a page
  instead (see `PageIncrease`).
- With `MoveToPoint` set, a track click moves the thumb straight to the clicked point.

The end buttons of a `ScrollBar` make a plain step (never a page) and repeat while held. The caps of a
`SliderWithCaps` jump to `Min` and `Max`.

**Scroll bars.** `ContentSize` and `ViewSize` are the size of the scrolled content and of the visible part of it,
in units. The slider uses their `X` when horizontal and their `Y` when vertical. The thumb's length along the track
is the track's length times `ViewSize / ContentSize`, at least `ThumbMinSize` and at most the whole track. When
either size changes, the value is adjusted so the same content stays in view; content that fits in the view again
goes back to the start. Scrollable elements set these for you (see
[layout elements](/docs/ui-layout/)).

**Size.** A slider has no content size of its own, so give it a size (`DesiredWidth` and `DesiredHeight`, or a
stretching alignment). Without `ContentSize` and `ViewSize`, the thumb's size comes from the slider's thickness (its
height when horizontal, its width when vertical) times `ThumbScale`, which starts at (1, 1): a square thumb. When
the slider is too short for its buttons and thumb, its parts are not drawn.

**Drawing.** Without textures the parts are solid rectangles: `ButtonsSolidColor` for the end buttons and caps,
`LineDecreaseSolidColor` for the track from the start (left, or bottom) to the thumb, `LineIncreaseSolidColor` for
the rest of the track, and `ThumbSolidColor` for the thumb. These have no default colour, so give them in a style or
on the element. With `TexturesPath` set, the slider draws these textures from that folder instead (the track halves
and the thumb's middle are tiled, the rest stretched):

| Part | Horizontal | Vertical |
| --- | --- | --- |
| Caps (`Slider`, `SliderWithCaps`) | `LeftEnd`, `RightEnd` | `BottomEnd`, `TopEnd` |
| Buttons (`ScrollBar`, `ScrollBarNoButtons`) | `LeftButton`, `RightButton` | `DownButton`, `UpButton` |
| Track before and after the thumb | `HorizontalDecrease`, `HorizontalIncrease` | `VerticalDecrease`, `VerticalIncrease` |
| Thumb: first end, middle, second end | `ThumbLeft`, `ThumbHorizontal`, `ThumbRight` | `ThumbBottom`, `ThumbVertical`, `ThumbTop` |

A plain `Slider` and a `ScrollBarNoButtons` have no end parts, so their cap or button textures are not shown. Tick
marks are drawn in their colours with or without textures.

### Slider properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Min`</span> | `float` | The smallest value. Setting it above `Max` moves `Max` along. |
| <span class="dp">`Max`</span> | `float` | The largest value. Setting it below `Min` moves `Min` along. |
| <span class="dp">`Value`</span> | `float` | The value, between `Min` and `Max`. A value you set is clamped to the range and snapped to the ticks. |
| <span class="prop">`NormalizedValue`</span> | `float` | Read-only. Where the value lies in the range, from 0 at `Min` to 1 at `Max` (0 when `Min` equals `Max`). |
| <span class="dp">`Orientation`</span> | `Orientation` | `Horizontal` (the default) or `Vertical`. A vertical slider has `Min` at the bottom. |
| <span class="dp">`Type`</span> | `SliderType` | The kind of slider: `Slider` (the default), `SliderWithCaps`, `ScrollBar` or `ScrollBarNoButtons`. |
| <span class="dp">`Tick`</span> | `float` | The step the value snaps to, from `Min`. 0 (the default) means no snapping and no tick marks. |
| <span class="dp">`TickPlacement`</span> | `TickPlacement` | Where the tick marks are drawn. `None` (the default) draws none. |
| <span class="dp">`TickSize`</span> | `Point` | The width and height of a tick mark, in units. |
| <span class="dp">`TickOffset`</span> | `int` | The gap between the slider's edge and the tick marks, in units. |
| <span class="dp">`TickPassedColor`</span> | `Color` | The colour of the tick marks at or below the value. |
| <span class="dp">`TickRemainingColor`</span> | `Color` | The colour of the tick marks above the value. |
| <span class="dp">`ThumbScale`</span> | `Vector2` | The thumb's width (`X`) and height (`Y`) as a share of the slider's thickness. On a scroll bar with `ContentSize` and `ViewSize`, the length along the track comes from them instead. |
| <span class="dp">`ThumbMargin`</span> | `Margin` | Moves the thumb across the track: it is centred in the slider's thickness minus `ThumbMargin.Top` (horizontal) or `ThumbMargin.Left` (vertical). The other sides are not used. |
| <span class="dp">`ThumbMinSize`</span> | `float` | The smallest length of the thumb along the track, in units. It keeps a scroll bar's thumb usable over long content. |
| <span class="dp">`MoveToPoint`</span> | `bool` | When set, a click on the track moves the thumb to the clicked point instead of stepping. |
| <span class="prop">`ContentSize`</span> | `Point` | The size of the content a scroll bar scrolls, in units. Changing it keeps the same content in view. |
| <span class="prop">`ViewSize`</span> | `Point` | The size of the visible part of that content, in units. Changing it keeps the same content in view. |
| <span class="prop">`ScrollAreaSize`</span> | `Vector2` | Read-only. `ContentSize` minus `ViewSize`: how far the content can scroll. |
| <span class="dp">`ButtonsSolidColor`</span> | `Color` | The colour of the end buttons and caps, without textures. |
| <span class="dp">`LineDecreaseSolidColor`</span> | `Color` | The colour of the track between the start and the thumb, without textures. |
| <span class="dp">`LineIncreaseSolidColor`</span> | `Color` | The colour of the track between the thumb and the end, without textures. |
| <span class="dp">`ThumbSolidColor`</span> | `Color` | The colour of the thumb, without textures. |

### Slider events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnValueChanged`</span> | `(BaseElement sender, float value)` | `Value` changes: by a drag, a click, from code, or when a new range, tick, `ContentSize` or `ViewSize` moves it. The value is already clamped and snapped. |

### Slider methods

| Method | Description |
| --- | --- |
| `Slider(string name = null)` | Creates a slider. The name is used by `GetElementByName`. |
| <span class="method">`PageDecrease()`</span> | Moves the value down by a page: one tick when `Tick` is set, otherwise the share of the range that `ViewSize` is of `ContentSize - ViewSize`. Does nothing when `Type` is `Slider`. |
| <span class="method">`PageIncrease()`</span> | Moves the value up by a page, as `PageDecrease` moves it down. Does nothing when `Type` is `Slider`. |
| <span class="method">`Draw()`</span> | Draws the slider, then its tick marks. The framework calls it; you don't need to. |

Without `Tick`, set `ContentSize` and `ViewSize` along the slider's orientation before paging: the page size comes
from them.

`SliderType`:

| Value | Meaning |
| --- | --- |
| `Slider` | No end parts: the thumb moves along the whole length. |
| `SliderWithCaps` | Caps half the slider's thickness long at both ends; clicking one jumps to `Min` or `Max`. |
| `ScrollBar` | Square buttons at both ends that make a plain step; track clicks page when `ContentSize` and `ViewSize` are set. |
| `ScrollBarNoButtons` | A scroll bar without the end buttons. |

`TickPlacement`:

| Value | Meaning |
| --- | --- |
| `None` | No tick marks. |
| `TopOrLeft` | Above a horizontal slider, left of a vertical one. |
| `BottomOrRight` | Below a horizontal slider, right of a vertical one. |
| `Both` | On both sides. |

Style class: `SliderStyle` (the same properties except the four that are not dependency properties, see
[styles](/docs/ui-styles/)). Its defaults set `ThumbScale` to (1, 1) and `InheritState` to `FromChildren`, so the
slider shows the hover and pressed states of its parts.

## ProgressBar

A bar that fills in proportion to `Value` between `Min` and `Max`. It only shows a value; the mouse does not change
it.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-progressbar.png' | relative_url }}" width="392" height="130" alt="Two horizontal progress bars, one at 35 percent and an orange one at 80 percent, and a vertical bar at 60 percent">
  <figcaption>Two horizontal bars, one with its own colours, and a vertical bar.</figcaption>
</figure>

```csharp
var loading = new ProgressBar("loading")
{
    DesiredWidth = 300,
    DesiredHeight = 14,
    Max = 100,
    Value = 35,
    Margin = (16, 20)
};
var health = new ProgressBar("health")
{
    DesiredWidth = 300,
    DesiredHeight = 14,
    Max = 100,
    Value = 80,
    ForegroundColor = new Color(242, 140, 40),   // the bar
    BackgroundColor = new Color(58, 30, 16),     // the track
    Margin = (16, 52)
};
var charge = new ProgressBar("charge")
{
    Orientation = Orientation.Vertical,
    DesiredWidth = 14,
    DesiredHeight = 96,
    Max = 1,
    Value = 0.6f,
    Margin = (360, 16)
};

ui.AddElementToRoot(loading);
ui.AddElementToRoot(health);
ui.AddElementToRoot(charge);
```

The bar fills from the left, or from the bottom when vertical. At `Min` there is no bar. `Value`, `Min` and `Max`
behave as on a slider: `Min` and `Max` start at 0, the value is clamped to the range, the order you set them in does
not matter, and setting one bound past the other moves the other along.

Without textures the inherited `BackgroundColor` is the track and `ForegroundColor` the bar. With `TexturesPath`
set, it tiles the `Background` texture over the whole element and the `Bar` texture over the filled part instead.

### ProgressBar properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Min`</span> | `float` | The value of an empty bar. Setting it above `Max` moves `Max` along. |
| <span class="dp">`Max`</span> | `float` | The value of a full bar. Setting it below `Min` moves `Min` along. |
| <span class="dp">`Value`</span> | `float` | The current value, clamped to the range between `Min` and `Max`. |
| <span class="dp">`Orientation`</span> | `Orientation` | `Horizontal` (the default, fills from the left) or `Vertical` (fills from the bottom). |

### ProgressBar methods

| Method | Description |
| --- | --- |
| `ProgressBar(string name = null)` | Creates a progress bar. The name is used by `GetElementByName`. |

Style class: `ProgressBarStyle` (the same properties, see [styles](/docs/ui-styles/)).

## ToolTip

A small popup that appears next to the mouse cursor while it rests over an element. You attach it through the
element's `ToolTip` property (see the [base element](/docs/ui-base-element/)), not by adding it to the tree.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-tooltip.png' | relative_url }}" width="296" height="95" alt="A Save button with a tooltip reading Save the game (Ctrl+S) below and to the right of the cursor">
  <figcaption>A tooltip placed below and to the right of the cursor.</figcaption>
</figure>

```csharp
var save = new Button("save")
{
    Text = "Save",
    DesiredWidth = 120,
    DesiredHeight = 34,
    Margin = (16, 16),
    ToolTip = new ToolTip("saveTip")
    {
        Text = "Save the game (Ctrl+S)",
        Placement = ToolTipPlacement.BottomRight,
        MarginFromMouseCursor = (14, 16),
        TimeBeforeShowMs = 300
    }
};

ui.AddElementToRoot(save);
```

When the mouse enters the element, the tooltip waits `TimeBeforeShowMs` (500 ms by default, from
`DefaultSettings.DefaultTimeBeforeShowToolTipMs`) and then appears at the cursor. A delay of 0 shows it at once. It
is placed once, when it appears, and goes away when the mouse leaves the element or the element leaves the tree. The
parts of a control (a slider's thumb, a list's rows) show the tooltip of their control. Only one tooltip is on screen
at a time, drawn above the element tree.

`Placement` says which corner of the tooltip is at the cursor, and `MarginFromMouseCursor` shifts it from there. The
tooltip is then moved as needed to stay inside the screen. A tooltip ignores the mouse (its style sets `HitTest` to
false), so it never hides the element under it from the cursor. A text tooltip has 5 units of space around its text,
which does not wrap; the tooltip's own `BackgroundColor` is drawn behind it.

### ToolTip properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Text`</span> | `string` | Creates a centred `RichTextBox` content showing this text, styled by `TextStyle`. |
| <span class="dp">`Content`</span> | `BaseElement` | Any element shown in the tooltip instead of a text. |
| <span class="dp">`Placement`</span> | `ToolTipPlacement` | Which side of the cursor the tooltip appears on. `TopLeft` is the default. |
| <span class="dp">`MarginFromMouseCursor`</span> | `Margin` | The shift from the cursor, in units: `Left` is added to the x position and `Top` to the y position, whatever the placement (use negative values to move a `TopLeft` tooltip away from the cursor). The other sides are not used. |
| <span class="dp">`TimeBeforeShowMs`</span> | `int` | How long the mouse rests on the element before the tooltip appears, in milliseconds. 0 shows it at once. |
| <span class="dp">`TextStyle`</span> | `RichTextBoxStyle` | The style of the text content made from `Text`. |

### ToolTip methods

| Method | Description |
| --- | --- |
| `ToolTip(string name = null)` | Creates a tooltip. The name is used by `GetElementByName`. |
| <span class="method">`Show()`</span> | Places the tooltip at the mouse cursor and shows it after the next layout pass. The element it is attached to calls this; it does nothing for a tooltip not attached to an element. |

`ToolTipPlacement`:

| Value | Meaning |
| --- | --- |
| `TopLeft` | Above and to the left: the tooltip's bottom right corner is at the cursor. |
| `TopRight` | Above and to the right: its bottom left corner is at the cursor. |
| `BottomLeft` | Below and to the left: its top right corner is at the cursor. |
| `BottomRight` | Below and to the right: its top left corner is at the cursor. |

Style class: `ToolTipStyle` (the same properties except `Content`, see [styles](/docs/ui-styles/)). Its defaults set
`TimeBeforeShowMs`, `HitTest` to false, and left and top alignment.

## ColorPicker

A colour wheel to pick a colour from with a click. The hue goes around the centre, the saturation grows from white
at the centre to the full colour at the edge, and `Brightness` darkens the result.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-colorpicker.png' | relative_url }}" width="334" height="222" alt="A square colour wheel with a ring pointer on a light yellow-green, and a swatch of the picked colour beside it">
  <figcaption>The picker and a label showing the selected colour.</figcaption>
</figure>

```csharp
var swatch = new Label
{
    DesiredWidth = 96,
    DesiredHeight = 96,
    Margin = (220, 16),
    BackgroundColor = Color.White
};

var picker = new ColorPicker("tint")
{
    DesiredWidth = 188,
    DesiredHeight = 188,
    Brightness = 0.95f,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16)
};
picker.OnSelectedColorChanged += (sender, color) => swatch.BackgroundColor = color;

ui.AddElementToRoot(picker);
ui.AddElementToRoot(swatch);
```

The palette fills the whole element: red at the left, then round through orange, yellow, green and blue to purple,
with full saturation from the edge of the circle out into the corners. Releasing the left button over the picker
picks the colour under the cursor, moves the pointer there and sets `SelectedColor` to that colour times
`Brightness`. The pointer stays on the picked spot when the picker is resized. Before the first pick it is moved off
the picker's top left corner.

The picker has no content size of its own, so give it a size. Its `ForegroundColor` (white by default) tints the
drawn palette; it does not change `SelectedColor`.

The pointer is the texture `Textures/SelectedColorPointer`, loaded through the `ContentManager` you give
`BorrowedTorchUI`. The package copies `Content/Textures/SelectedColorPointer.xnb` next to your game, so it is found
when the content manager's root is `Content`. Without a content manager the picker works but shows no pointer.

### ColorPicker properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Brightness`</span> | `float` | Scales the picked colour, from 0 (black) to 1 (the palette's colour, the default). Values outside are clamped. Changing it recomputes `SelectedColor` from the picked spot. |
| <span class="dp">`SelectedColor`</span> | `Color` | The picked colour times `Brightness`, always opaque. It starts black. Setting it raises `OnSelectedColorChanged` but does not move the pointer. |

Before anything is picked, changing `Brightness` sets `SelectedColor` to black.

### ColorPicker events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnSelectedColorChanged`</span> | `(BaseElement sender, Color color)` | `SelectedColor` changes: by a pick, a `Brightness` change, or from code. |

### ColorPicker methods

| Method | Description |
| --- | --- |
| `ColorPicker(string name = null)` | Creates a colour picker. The name is used by `GetElementByName`. |

Style class: `ColorPickerStyle` (the inherited properties only: `Brightness` and `SelectedColor` are not styled, see
[styles](/docs/ui-styles/)). Its defaults set `ForegroundColor` to white.
