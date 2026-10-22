---
layout: docs
legend: [prop, dp, method, event]
title: "UI: controls"
description: Buttons, check boxes, sliders, progress bars, tooltips and the colour picker.
---

Every control here is an element: it has all the properties, events and methods of
[`BaseElement`](/docs/ui-base-element/), which the tables below don't repeat. Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>: `Foo` is backed by `FooDP`, which a style, a binding or an animation can set (see
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
<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebeforerepeatstartsms">`TimeBeforeRepeatStartsMs`</a> and every <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebetweenrepeatsms">`TimeBetweenRepeatsMs`</a> while held (see the
[base element](/docs/ui-base-element/#click-timing)).

Without textures the button is drawn in the solid colour of its state. With <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> set, it draws the
`Normal`, `Hover`, `Pressed` and `Toggled` textures from that folder instead.

### Button properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/button/#text">`Text`</a> | `string` | Creates a centred <a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a> content showing this text, styled by <a class="ref dp" href="/docs/ui-glossary/elements/button/#textstyle">`TextStyle`</a>. |
| <a class="ref dp" href="/docs/ui-glossary/elements/button/#content">`Content`</a> | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | Any element shown inside the button instead of a text. A content you give is detached, not disposed, when it is replaced. |
| <a class="ref dp" href="/docs/ui-glossary/elements/button/#type">`Type`</a> | <a class="ref" href="/docs/ui-glossary/types/button-type/">`ButtonType`</a> | How the button reacts to the mouse: `Normal`, `Repeat` or `Toggle`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/button/#toggledon">`ToggledOn`</a> | `bool` | Whether a `Toggle` button is on. Set it to switch the button from code; <a class="ref event" href="/docs/ui-glossary/elements/button/#ontoggled">`OnToggled`</a> is raised. |
| <a class="ref dp" href="/docs/ui-glossary/elements/button/#normalcolor">`NormalColor`</a> | `Color` | The solid colour while nothing happens. |
| <a class="ref dp" href="/docs/ui-glossary/elements/button/#hovercolor">`HoverColor`</a> | `Color` | The solid colour while the mouse is over the button. |
| <a class="ref dp" href="/docs/ui-glossary/elements/button/#pressedcolor">`PressedColor`</a> | `Color` | The solid colour while the button is pressed. |
| <a class="ref dp" href="/docs/ui-glossary/elements/button/#toggledcolor">`ToggledColor`</a> | `Color` | The solid colour of a `Toggle` button that is on. |
| <a class="ref dp" href="/docs/ui-glossary/elements/button/#textstyle">`TextStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a> | The style of the text content made from <a class="ref dp" href="/docs/ui-glossary/elements/button/#text">`Text`</a>. |
| <a class="ref dp" href="/docs/ui-glossary/elements/button/#backgroundstyle">`BackgroundStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> | The style of the image the button draws its background with. |

### Button events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/button/#ontoggled">`OnToggled`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, bool isToggledOn)</code> | A `Toggle` button turns on or off, by a click or from code. |

Clicks come through the inherited `OnClick`.

### Button methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/button/#button">`Button(string name = null)`</a> | Creates a button. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |

#### `ButtonType`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/button-type/#normal">`Normal`</a> | One `OnClick` per click, on release. |
| <a class="ref" href="/docs/ui-glossary/types/button-type/#repeat">`Repeat`</a> | `OnClick` on press, then repeatedly while held. |
| <a class="ref" href="/docs/ui-glossary/types/button-type/#toggle">`Toggle`</a> | Each click switches <a class="ref dp" href="/docs/ui-glossary/elements/button/#toggledon">`ToggledOn`</a>. |

Style class: <a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a> (the same properties, see [styles](/docs/ui-styles/)).

## CheckBox

A box with a text or any element beside it. It works as a check box that turns on and off, or as a radio button
that is one choice of a group.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-checkbox-check.png' | relative_url }}" width="256" height="56" alt="Two check boxes: Subtitles checked, Vibration unchecked">
  <figcaption>Two check boxes, the first one checked.</figcaption>
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

var options = new StackPanel
{
    Orientation = Orientation.Horizontal,
    Margin = (16, 16)
};
options.AddItemsRange([subtitles, vibration]);

ui.AddElementToRoot(options);
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-checkbox-radio.png' | relative_url }}" width="275" height="56" alt="Three radio buttons, Easy, Normal and Hard, with Normal chosen">
  <figcaption>A radio group: one choice of three.</figcaption>
</figure>

```csharp
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

var levels = new StackPanel
{
    Orientation = Orientation.Horizontal,
    Margin = (16, 16)
};
levels.AddItemsRange([easy, normal, hard]);

ui.AddElementToRoot(levels);

normal.Checked = true;
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-checkbox-right.png' | relative_url }}" width="189" height="56" alt="A check box with its box on the right of the text Box on the right">
  <figcaption>The box on the right of its text.</figcaption>
</figure>

```csharp
// the box on the right of its text
var mirrored = new CheckBox("rightBox")
{
    Text = "Box on the right",
    Direction = CheckBoxDirection.Right,
    Checked = true,
    DesiredHeight = 22,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16)
};

ui.AddElementToRoot(mirrored);
```

The box is a square as high as the check box, and the content takes the rest of the width beside it. Without a
<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredheight">`DesiredHeight`</a> the check box is as high as its content. A text content is left-aligned, vertically centred and kept
5 units from the box.

Like a button click, a change happens when the left button is released over the check box it was pressed on. A
`CheckBox` switches <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#checked">`Checked`</a> on each click. A `RadioButton` is only checked by a click, never unchecked: it is
unchecked when another box of its group is checked.

Radio buttons with the same <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#groupid">`GroupId`</a> form a group while they are in the element tree:

- Checking one box of the group unchecks the others, however it got checked: a click, code or a binding.
- The first box to join a group starts checked, unless you set its <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#checked">`Checked`</a> by hand before. In the snippet `Easy`
  starts checked, then `normal.Checked = true` moves the choice to `Normal`.
- A checked box that joins a group stays checked and unchecks the others.
- A box leaves its group when it leaves the tree, so a rebuilt panel with the same group id starts clean.

A radio button without a <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#groupid">`GroupId`</a> is a group of its own: a click checks it and nothing unchecks it.

Without textures the box is a solid square in <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#checkedsolidcolor">`CheckedSolidColor`</a> or <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#uncheckedsolidcolor">`UncheckedSolidColor`</a>. These have no default
colour, so give them in a style or on the element. With <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> set, the box shows the <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#checked">`Checked`</a> and
`Unchecked` textures from that folder instead, stretched over the square.

### CheckBox properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#text">`Text`</a> | `string` | Creates a <a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a> content showing this text, styled by <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#textstyle">`TextStyle`</a>. |
| <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#content">`Content`</a> | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | Any element shown beside the box instead of a text. A content you give is detached, not disposed, when it is replaced. |
| <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#checked">`Checked`</a> | `bool` | Whether the box is checked. Setting it raises <a class="ref event" href="/docs/ui-glossary/elements/check-box/#oncheckedunchecked">`OnCheckedUnchecked`</a>, and checking a radio button unchecks the others of its group. |
| <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#type">`Type`</a> | <a class="ref" href="/docs/ui-glossary/types/check-box-type/">`CheckBoxType`</a> | `CheckBox` (the default) or `RadioButton`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#groupid">`GroupId`</a> | `string` | The group of a radio button: the radio buttons in the tree with the same id uncheck each other. Not used by a `CheckBox`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#direction">`Direction`</a> | <a class="ref" href="/docs/ui-glossary/types/check-box-direction/">`CheckBoxDirection`</a> | Which side of the content the box is on: `Left` (the default) or `Right`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#checkedsolidcolor">`CheckedSolidColor`</a> | `Color` | The colour of the box while it is checked, without textures. |
| <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#uncheckedsolidcolor">`UncheckedSolidColor`</a> | `Color` | The colour of the box while it is unchecked, without textures. |
| <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#textstyle">`TextStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a> | The style of the text content made from <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#text">`Text`</a>. |
| <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#imagestyle">`ImageStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> | The style of the image that draws the box. |

### CheckBox events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/check-box/#oncheckedunchecked">`OnCheckedUnchecked`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, bool isChecked)</code> | <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#checked">`Checked`</a> changes: by a click, from code, by a binding, or because another box of the group was checked. |

### CheckBox methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/check-box/#checkbox">`CheckBox(string name = null)`</a> | Creates a check box. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |

#### `CheckBoxType`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/elements/check-box/">`CheckBox`</a> | Each click switches <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#checked">`Checked`</a> on or off. |
| <a class="ref" href="/docs/ui-glossary/types/check-box-type/#radiobutton">`RadioButton`</a> | A click checks the box; checking it unchecks the other boxes of its <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#groupid">`GroupId`</a>. |

#### `CheckBoxDirection`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/check-box-direction/#left">`Left`</a> | The box is on the left, the content on its right. |
| <a class="ref" href="/docs/ui-glossary/types/check-box-direction/#right">`Right`</a> | The box is on the right, the content on its left. |

Style class: <a class="ref" href="/docs/ui-glossary/types/check-box-style/">`CheckBoxStyle`</a> (the same properties except `Content`, see [styles](/docs/ui-styles/)).

## Slider

A track with a thumb that picks a value between <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a>. The same element is the scroll bar of scrollable
elements: with <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> its thumb shows how much of the content is in view.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-slider-ticks.png' | relative_url }}" width="333" height="60" alt="A volume slider at 60 with tick marks under it">
  <figcaption>A slider with tick marks: it snaps to steps of 10.</figcaption>
</figure>

```csharp
var volume = new Slider("volume")
{
    DesiredWidth = 300,
    DesiredHeight = 18,
    Min = 0,
    Max = 100,
    Value = 60,
    Tick = 10,  // snaps to steps of 10, with tick marks
    TickPlacement = TickPlacement.BottomOrRight,
    TickSize = new Point(1, 5),
    TickOffset = 3,
    ThumbScale = new Vector2(0.6f, 1.0f),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16)
};
volume.OnValueChanged += (sender, value) => Console.WriteLine($"Volume {value}");

ui.AddElementToRoot(volume);
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-slider-caps.png' | relative_url }}" width="334" height="52" alt="A slider with an end cap on each side of its track">
  <figcaption>A slider with caps that jump to the minimum and the maximum.</figcaption>
</figure>

```csharp
// end caps that jump to the minimum and the maximum
var brightness = new Slider("brightness")
{
    Type = SliderType.SliderWithCaps,
    DesiredWidth = 300,
    DesiredHeight = 18,
    Max = 1,
    Value = 0.3f,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16)
};

ui.AddElementToRoot(brightness);
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-slider-scrollbar.png' | relative_url }}" width="334" height="48" alt="A scroll bar whose thumb covers a third of the track">
  <figcaption>A scroll bar: the thumb is the view's share of the content.</figcaption>
</figure>

```csharp
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
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16)
};

ui.AddElementToRoot(scrollBar);
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-slider-vertical.png' | relative_url }}" width="52" height="184" alt="A vertical slider filled from the bottom to 70">
  <figcaption>A vertical slider: the minimum at the bottom.</figcaption>
</figure>

```csharp
// the minimum at the bottom, the maximum at the top
var height = new Slider("height")
{
    Orientation = Orientation.Vertical,
    DesiredWidth = 18,
    DesiredHeight = 150,
    Max = 100,
    Value = 70,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16)
};

ui.AddElementToRoot(height);
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-slider-thumb-scale.png' | relative_url }}" width="334" height="120" alt="Three sliders with a square, a narrow and a wide flat thumb">
  <figcaption><code>ThumbScale</code>: a square thumb, a narrow one and a wide flat one.</figcaption>
</figure>

```csharp
// the thumb is the slider's thickness times ThumbScale: X its width, Y its height
Slider Scaled(float x, float y, int top) => new()
{
    DesiredWidth = 300,
    DesiredHeight = 18,
    Max = 100,
    Value = 40,
    ThumbScale = new Vector2(x, y),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, top)
};

ui.AddElementToRoot(Scaled(1.0f, 1.0f, 16));    // square, the default
ui.AddElementToRoot(Scaled(0.4f, 1.0f, 50));    // narrow
ui.AddElementToRoot(Scaled(2.0f, 0.6f, 84));    // wide and flat
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-slider-thumb-margin.png' | relative_url }}" width="334" height="86" alt="Two sliders with a small thumb, centred and resting on the bottom edge">
  <figcaption><code>ThumbMargin</code>: the same thumb centred, then moved down with a top of 8.</figcaption>
</figure>

```csharp
// a thumb 10 high on a slider 18 high: centred, then resting on the bottom edge
Slider Small(Margin thumbMargin, int top) => new()
{
    DesiredWidth = 300,
    DesiredHeight = 18,
    Max = 100,
    Value = 40,
    ThumbScale = new Vector2(0.6f, 0.6f),
    ThumbMargin = thumbMargin,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, top)
};

ui.AddElementToRoot(Small(Margin.Zero, 16));

// centred below ThumbMargin.Top (ThumbMargin.Left when vertical)
ui.AddElementToRoot(Small((0, 8), 50));
```

**Value.** <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> both start at 0, so set <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a>. <a class="ref dp" href="/docs/ui-glossary/elements/slider/#value">`Value`</a> is always kept inside the range, and the order you
set the three in does not matter: a value outside the range is clamped, and comes back once the range is widened to
include it. Setting <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> above <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> along, and the other way round. A vertical slider has <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> at the
bottom.

**Ticks.** With <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tick">`Tick`</a> above 0 the value snaps to the closest of <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a>, `Min + Tick`, `Min + 2 × Tick` and so on,
or to <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> (which counts as a tick when the range is not a multiple of <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tick">`Tick`</a>). Changing <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tick">`Tick`</a> snaps the current
value again. With <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tickplacement">`TickPlacement`</a> other than `None`, a mark is drawn at every tick, <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> included, as a
solid rectangle of <a class="ref dp" href="/docs/ui-glossary/elements/slider/#ticksize">`TickSize`</a> units, <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tickoffset">`TickOffset`</a> units outside the slider's edge. Marks at or below the value use
<a class="ref dp" href="/docs/ui-glossary/elements/slider/#tickpassedcolor">`TickPassedColor`</a>, the others <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tickremainingcolor">`TickRemainingColor`</a>. <a class="ref dp" href="/docs/ui-glossary/elements/slider/#ticksize">`TickSize`</a> starts at 0 by 0, so set it to see the marks. When
the ticks are denser than the track's pixels, only some of them are drawn.

**Mouse.** Drag the thumb to change the value. A click on the track either side of the thumb steps the value
towards the click, and holding the button repeats the step:

- A plain step is one tick, or 5 % of the range without <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tick">`Tick`</a>.
- On a `ScrollBar` or `ScrollBarNoButtons` with <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> set, a track click moves a page
  instead (see <a class="ref method" href="/docs/ui-glossary/elements/slider/#pageincrease">`PageIncrease`</a>).
- With <a class="ref dp" href="/docs/ui-glossary/elements/slider/#movetopoint">`MoveToPoint`</a> set, a track click moves the thumb straight to the clicked point.

The end buttons of a `ScrollBar` make a plain step (never a page) and repeat while held. The caps of a
`SliderWithCaps` jump to <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a>.

**Scroll bars.** <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> are the size of the scrolled content and of the visible part of it,
in units. The slider uses their `X` when horizontal and their `Y` when vertical. The thumb's length along the track
is the track's length times `ViewSize / ContentSize`, at least <a class="ref dp" href="/docs/ui-glossary/elements/slider/#thumbminsize">`ThumbMinSize`</a> and at most the whole track. When
either size changes, the value is adjusted so the same content stays in view; content that fits in the view again
goes back to the start. Scrollable elements set these for you (see
[layout elements](/docs/ui-layout/)).

**Size.** A slider has no content size of its own, so give it a size (<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredwidth">`DesiredWidth`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredheight">`DesiredHeight`</a>, or a
stretching alignment). Without <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a>, the thumb's size comes from the slider's thickness (its
height when horizontal, its width when vertical) times <a class="ref dp" href="/docs/ui-glossary/elements/slider/#thumbscale">`ThumbScale`</a>, which starts at (1, 1): a square thumb. When
the slider is too short for its buttons and thumb, its parts are not drawn.

**Drawing.** Without textures the parts are solid rectangles: <a class="ref dp" href="/docs/ui-glossary/elements/slider/#buttonssolidcolor">`ButtonsSolidColor`</a> for the end buttons and caps,
<a class="ref dp" href="/docs/ui-glossary/elements/slider/#linedecreasesolidcolor">`LineDecreaseSolidColor`</a> for the track from the start (left, or bottom) to the thumb, <a class="ref dp" href="/docs/ui-glossary/elements/slider/#lineincreasesolidcolor">`LineIncreaseSolidColor`</a> for
the rest of the track, and <a class="ref dp" href="/docs/ui-glossary/elements/slider/#thumbsolidcolor">`ThumbSolidColor`</a> for the thumb. These have no default colour, so give them in a style or
on the element. With <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> set, the slider draws these textures from that folder instead (the track halves
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
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> | `float` | The smallest value. Setting it above <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> along. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> | `float` | The largest value. Setting it below <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> along. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#value">`Value`</a> | `float` | The value, between <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a>. A value you set is clamped to the range and snapped to the ticks. |
| <a class="ref prop" href="/docs/ui-glossary/elements/slider/#normalizedvalue">`NormalizedValue`</a> | `float` | Read-only. Where the value lies in the range, from 0 at <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> to 1 at <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> (0 when <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> equals <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a>). |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#orientation">`Orientation`</a> | <a class="ref" href="/docs/ui-glossary/types/orientation/">`Orientation`</a> | `Horizontal` (the default) or `Vertical`. A vertical slider has <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> at the bottom. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#type">`Type`</a> | <a class="ref" href="/docs/ui-glossary/types/slider-type/">`SliderType`</a> | The kind of slider: `Slider` (the default), `SliderWithCaps`, `ScrollBar` or `ScrollBarNoButtons`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tick">`Tick`</a> | `float` | The step the value snaps to, from <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a>. 0 (the default) means no snapping and no tick marks. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tickplacement">`TickPlacement`</a> | <a class="ref" href="/docs/ui-glossary/types/tick-placement/">`TickPlacement`</a> | Where the tick marks are drawn. `None` (the default) draws none. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#ticksize">`TickSize`</a> | `Point` | The width and height of a tick mark, in units. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tickoffset">`TickOffset`</a> | `int` | The gap between the slider's edge and the tick marks, in units. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tickpassedcolor">`TickPassedColor`</a> | `Color` | The colour of the tick marks at or below the value. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tickremainingcolor">`TickRemainingColor`</a> | `Color` | The colour of the tick marks above the value. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#thumbscale">`ThumbScale`</a> | `Vector2` | The thumb's width (`X`) and height (`Y`) as a share of the slider's thickness. On a scroll bar with <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a>, the length along the track comes from them instead. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#thumbmargin">`ThumbMargin`</a> | <a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> | Moves the thumb across the track: it is centred in the slider's thickness minus `ThumbMargin.Top` (horizontal) or `ThumbMargin.Left` (vertical). The other sides are not used. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#thumbminsize">`ThumbMinSize`</a> | `float` | The smallest length of the thumb along the track, in units. It keeps a scroll bar's thumb usable over long content. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#movetopoint">`MoveToPoint`</a> | `bool` | When set, a click on the track moves the thumb to the clicked point instead of stepping. |
| <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> | `Point` | The size of the content a scroll bar scrolls, in units. Changing it keeps the same content in view. |
| <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> | `Point` | The size of the visible part of that content, in units. Changing it keeps the same content in view. |
| <a class="ref prop" href="/docs/ui-glossary/elements/slider/#scrollareasize">`ScrollAreaSize`</a> | `Vector2` | Read-only. <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> minus <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a>: how far the content can scroll. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#buttonssolidcolor">`ButtonsSolidColor`</a> | `Color` | The colour of the end buttons and caps, without textures. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#linedecreasesolidcolor">`LineDecreaseSolidColor`</a> | `Color` | The colour of the track between the start and the thumb, without textures. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#lineincreasesolidcolor">`LineIncreaseSolidColor`</a> | `Color` | The colour of the track between the thumb and the end, without textures. |
| <a class="ref dp" href="/docs/ui-glossary/elements/slider/#thumbsolidcolor">`ThumbSolidColor`</a> | `Color` | The colour of the thumb, without textures. |

### Slider events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/slider/#onvaluechanged">`OnValueChanged`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, float value)</code> | <a class="ref dp" href="/docs/ui-glossary/elements/slider/#value">`Value`</a> changes: by a drag, a click, from code, or when a new range, tick, <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> or <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> moves it. The value is already clamped and snapped. |

### Slider methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/slider/#slider">`Slider(string name = null)`</a> | Creates a slider. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |
| <a class="ref method" href="/docs/ui-glossary/elements/slider/#pagedecrease">`PageDecrease()`</a> | Moves the value down by a page: one tick when <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tick">`Tick`</a> is set, otherwise the share of the range that <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> is of `ContentSize - ViewSize`. Does nothing when <a class="ref dp" href="/docs/ui-glossary/elements/slider/#type">`Type`</a> is `Slider`. |
| <a class="ref method" href="/docs/ui-glossary/elements/slider/#pageincrease">`PageIncrease()`</a> | Moves the value up by a page, as <a class="ref method" href="/docs/ui-glossary/elements/slider/#pagedecrease">`PageDecrease`</a> moves it down. Does nothing when <a class="ref dp" href="/docs/ui-glossary/elements/slider/#type">`Type`</a> is `Slider`. |
| <a class="ref method" href="/docs/ui-glossary/elements/slider/#draw">`Draw()`</a> | Draws the slider, then its tick marks. The framework calls it; you don't need to. |

Without <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tick">`Tick`</a>, set <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> along the slider's orientation before paging: the page size comes
from them.

#### `SliderType`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/elements/slider/">`Slider`</a> | No end parts: the thumb moves along the whole length. |
| <a class="ref" href="/docs/ui-glossary/types/slider-type/#sliderwithcaps">`SliderWithCaps`</a> | Caps half the slider's thickness long at both ends; clicking one jumps to <span class="dp">`Min`</span> or <span class="dp">`Max`</span>. |
| <a class="ref" href="/docs/ui-glossary/types/slider-type/#scrollbar">`ScrollBar`</a> | Square buttons at both ends that make a plain step; track clicks page when <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> are set. |
| <a class="ref" href="/docs/ui-glossary/types/slider-type/#scrollbarnobuttons">`ScrollBarNoButtons`</a> | A scroll bar without the end buttons. |

#### `TickPlacement`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/tick-placement/#none">`None`</a> | No tick marks. |
| <a class="ref" href="/docs/ui-glossary/types/tick-placement/#toporleft">`TopOrLeft`</a> | Above a horizontal slider, left of a vertical one. |
| <a class="ref" href="/docs/ui-glossary/types/tick-placement/#bottomorright">`BottomOrRight`</a> | Below a horizontal slider, right of a vertical one. |
| <a class="ref" href="/docs/ui-glossary/types/tick-placement/#both">`Both`</a> | On both sides. |

Style class: <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a> (the same properties except the four that are not dependency properties, see
[styles](/docs/ui-styles/)). Its defaults set <a class="ref dp" href="/docs/ui-glossary/elements/slider/#thumbscale">`ThumbScale`</a> to (1, 1) and <a class="ref" href="/docs/ui-glossary/types/inherit-state/">`InheritState`</a> to `FromChildren`, so the
slider shows the hover and pressed states of its parts.

## ProgressBar

A bar that fills in proportion to <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#value">`Value`</a> between <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a>. It only shows a value; the mouse does not change
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

The bar fills from the left, or from the bottom when vertical. At <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> there is no bar. <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#value">`Value`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a>
behave as on a slider: <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a> start at 0, the value is clamped to the range, the order you set them in does
not matter, and setting one bound past the other moves the other along.

Without textures the inherited <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> is the track and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a> the bar. With <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a>
set, it tiles the <a class="ref prop" href="/docs/ui-glossary/elements/default-window-title-bar/#background">`Background`</a> texture over the whole element and the `Bar` texture over the filled part instead.

### ProgressBar properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> | `float` | The value of an empty bar. Setting it above <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a> along. |
| <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a> | `float` | The value of a full bar. Setting it below <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> along. |
| <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#value">`Value`</a> | `float` | The current value, clamped to the range between <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a>. |
| <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#orientation">`Orientation`</a> | <a class="ref" href="/docs/ui-glossary/types/orientation/">`Orientation`</a> | `Horizontal` (the default, fills from the left) or `Vertical` (fills from the bottom). |

### ProgressBar methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/progress-bar/#progressbar">`ProgressBar(string name = null)`</a> | Creates a progress bar. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |

Style class: <a class="ref" href="/docs/ui-glossary/types/progress-bar-style/">`ProgressBarStyle`</a> (the same properties, see [styles](/docs/ui-styles/)).

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

When the mouse enters the element, the tooltip waits <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#timebeforeshowms">`TimeBeforeShowMs`</a> (500 ms by default, from
<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaulttimebeforeshowtooltipms">`DefaultSettings.DefaultTimeBeforeShowToolTipMs`</a>) and then appears at the cursor. A delay of 0 shows it at once. It
is placed once, when it appears, and goes away when the mouse leaves the element or the element leaves the tree. The
parts of a control (a slider's thumb, a list's rows) show the tooltip of their control. Only one tooltip is on screen
at a time, drawn above the element tree.

<a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#placement">`Placement`</a> says which corner of the tooltip is at the cursor, and <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#marginfrommousecursor">`MarginFromMouseCursor`</a> shifts it from there. The
tooltip is then moved as needed to stay inside the screen. A tooltip ignores the mouse (its style sets <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a> to
false), so it never hides the element under it from the cursor. A text tooltip has 5 units of space around its text,
which does not wrap; the tooltip's own <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> is drawn behind it.

### ToolTip properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#text">`Text`</a> | `string` | Creates a centred <a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a> content showing this text, styled by <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#textstyle">`TextStyle`</a>. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#content">`Content`</a> | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | Any element shown in the tooltip instead of a text. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#placement">`Placement`</a> | <a class="ref" href="/docs/ui-glossary/types/tool-tip-placement/">`ToolTipPlacement`</a> | Which side of the cursor the tooltip appears on. `TopLeft` is the default. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#marginfrommousecursor">`MarginFromMouseCursor`</a> | <a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> | The shift from the cursor, in units: `Left` is added to the x position and `Top` to the y position, whatever the placement (use negative values to move a `TopLeft` tooltip away from the cursor). The other sides are not used. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#timebeforeshowms">`TimeBeforeShowMs`</a> | `int` | How long the mouse rests on the element before the tooltip appears, in milliseconds. 0 shows it at once. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#textstyle">`TextStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a> | The style of the text content made from <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#text">`Text`</a>. |

### ToolTip methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/tool-tip/#tooltip">`ToolTip(string name = null)`</a> | Creates a tooltip. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |
| <a class="ref method" href="/docs/ui-glossary/elements/tool-tip/#show">`Show()`</a> | Places the tooltip at the mouse cursor and shows it after the next layout pass. The element it is attached to calls this; it does nothing for a tooltip not attached to an element. |

#### `ToolTipPlacement`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/tool-tip-placement/#topleft">`TopLeft`</a> | Above and to the left: the tooltip's bottom right corner is at the cursor. |
| <a class="ref" href="/docs/ui-glossary/types/tool-tip-placement/#topright">`TopRight`</a> | Above and to the right: its bottom left corner is at the cursor. |
| <a class="ref" href="/docs/ui-glossary/types/tool-tip-placement/#bottomleft">`BottomLeft`</a> | Below and to the left: its top right corner is at the cursor. |
| <a class="ref" href="/docs/ui-glossary/types/tool-tip-placement/#bottomright">`BottomRight`</a> | Below and to the right: its top left corner is at the cursor. |

Style class: <a class="ref" href="/docs/ui-glossary/types/tool-tip-style/">`ToolTipStyle`</a> (the same properties except `Content`, see [styles](/docs/ui-styles/)). Its defaults set
<a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#timebeforeshowms">`TimeBeforeShowMs`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a> to false, and left and top alignment.

## ColorPicker

A colour wheel to pick a colour from with a click. The hue goes around the centre, the saturation grows from white
at the centre to the full colour at the edge, and <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a> darkens the result.

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
picks the colour under the cursor, moves the pointer there and sets <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#selectedcolor">`SelectedColor`</a> to that colour times
<a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a>. The pointer stays on the picked spot when the picker is resized. Before the first pick it is moved off
the picker's top left corner.

The picker has no content size of its own, so give it a size. Its <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a> (white by default) tints the
drawn palette; it does not change <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#selectedcolor">`SelectedColor`</a>.

The pointer is the texture `Textures/SelectedColorPointer`, loaded through the `ContentManager` you give
<a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/">`BorrowedTorchUI`</a>. The package copies `Content/Textures/SelectedColorPointer.xnb` next to your game, so it is found
when the content manager's root is `Content`. Without a content manager the picker works but shows no pointer.

### ColorPicker properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a> | `float` | Scales the picked colour, from 0 (black) to 1 (the palette's colour, the default). Values outside are clamped. Changing it recomputes <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#selectedcolor">`SelectedColor`</a> from the picked spot. |
| <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#selectedcolor">`SelectedColor`</a> | `Color` | The picked colour times <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a>, always opaque. It starts black. Setting it raises <a class="ref event" href="/docs/ui-glossary/elements/color-picker/#onselectedcolorchanged">`OnSelectedColorChanged`</a> but does not move the pointer. |

Before anything is picked, changing <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a> sets <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#selectedcolor">`SelectedColor`</a> to black.

### ColorPicker events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/color-picker/#onselectedcolorchanged">`OnSelectedColorChanged`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, Color color)</code> | <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#selectedcolor">`SelectedColor`</a> changes: by a pick, a <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a> change, or from code. |

### ColorPicker methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/color-picker/#colorpicker">`ColorPicker(string name = null)`</a> | Creates a colour picker. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |

Style class: <a class="ref" href="/docs/ui-glossary/types/color-picker-style/">`ColorPickerStyle`</a> (the inherited properties only: <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#selectedcolor">`SelectedColor`</a> are not styled, see
[styles](/docs/ui-styles/)). Its defaults set <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a> to white.
