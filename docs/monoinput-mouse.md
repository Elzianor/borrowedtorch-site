---
layout: docs
legend: [prop, method, event]
title: "MonoInput: mouse"
description: The five buttons, the pointer and how far it moved, both wheels, the mouse events, snapshots of the buttons, and updating part of the mouse.
---

<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-manager/">`MouseManager`</a> reads the mouse at every update into one <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-status/">`MouseStatus`</a>: five buttons, the pointer and two wheels,
each with how far it moved since the update before. Game code reads the status, or listens to the manager's events.
Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## The mouse status

<a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-manager/#mousestatus">`MouseStatus`</a> is the same object for the whole run, and its buttons are too, so a reference to either
stays good:

```csharp
var mouse = MouseManager.MouseStatus; // once, or every frame: it is the same object

if (mouse.RightButton.Pressed) OpenContextMenu(mouse.Position);
```

The status is only ever updated by the manager. <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-status/">`MouseStatus`</a> has a public constructor, but a status you create
stays idle and at zero.

### MouseManager properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-manager/#mousestatus">`MouseStatus`</a> | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-status/">`MouseStatus`</a> | Static, read-only. The mouse as of the last update. The same object for the whole run. |

## Buttons

<a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#leftbutton">`LeftButton`</a>, <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#middlebutton">`MiddleButton`</a>, <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#rightbutton">`RightButton`</a>, <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#xbutton1">`XButton1`</a> and
<a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#xbutton2">`XButton2`</a> are each a <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a>, with the state and the [five checks](/docs/monoinput-states/#the-five-checks)
of every button. Pressed, Down and Up are the three moments of a drag:

```csharp
var mouse = MouseManager.MouseStatus;

if (mouse.LeftButton.Pressed) _dragStart = mouse.Position;                         // the drag starts
if (mouse.LeftButton.Down) _selection = RectangleBetween(_dragStart, mouse.Position); // it goes on
if (mouse.LeftButton.Up) SelectUnitsIn(_selection);                                // it ends
```

`RectangleBetween` and `SelectUnitsIn` stand for your own code. The middle button is usually a press on the wheel, and
the X buttons are the side buttons, back and forward on most mice.

The four `IsAnyButton` properties ask about all five buttons at once, such as "click anywhere to continue":

```csharp
if (MouseManager.MouseStatus.IsAnyButtonPressed) SkipCutscene();
```

### MouseStatus button properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#leftbutton">`LeftButton`</a> | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> | Read-only. The left button. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#middlebutton">`MiddleButton`</a> | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> | Read-only. The middle button, usually a press on the wheel. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#rightbutton">`RightButton`</a> | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> | Read-only. The right button. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#xbutton1">`XButton1`</a> | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> | Read-only. The first side button, back on most mice. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#xbutton2">`XButton2`</a> | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> | Read-only. The second side button, forward on most mice. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#isanybuttonpressed">`IsAnyButtonPressed`</a> | `bool` | Read-only. Any of the five buttons went down at the last update. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#isanybuttondown">`IsAnyButtonDown`</a> | `bool` | Read-only. Any of the five buttons is held: `Pressed` or `Down`. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#isanybuttonup">`IsAnyButtonUp`</a> | `bool` | Read-only. Any of the five buttons was let go at the last update. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#isanybuttonactive">`IsAnyButtonActive`</a> | `bool` | Read-only. Any of the five buttons is pressed, held or just let go. |

### MouseButtonInfo members

`MouseButtonInfo` derives from <a class="ref" href="/docs/monoinput-glossary/states/button-info/">`ButtonInfo`</a>, whose [properties](/docs/monoinput-states/#buttoninfo-properties) are the
state and the checks. It adds:

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-button-info/#type">`Type`</a> | Read-only <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-types/">`MouseButtonTypes`</a>. Which button it is. |
| <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-button-info/#tostring">`ToString()`</a> | The type and the state, such as <code>Left &#124; Pressed</code>. |
| <span class="method"><code><a href="/docs/monoinput-glossary/mouse/mouse-button-info/#mousebuttoninfo">MouseButtonInfo</a>(<a href="/docs/monoinput-glossary/mouse/mouse-button-types/">MouseButtonTypes</a> type)</code></span> | A button of the type, `Idle`. The mouse status makes its own five; one you create is never updated. |

#### `MouseButtonTypes`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-types/#left">`Left`</a> | The left button. |
| <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-types/#middle">`Middle`</a> | The middle button, usually a press on the wheel. |
| <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-types/#right">`Right`</a> | The right button. |
| <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-types/#xbutton1">`XButton1`</a> | The first side button, back on most mice. |
| <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-types/#xbutton2">`XButton2`</a> | The second side button, forward on most mice. |

## The pointer

<a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#position">`Position`</a> is where the pointer is, in pixels from the top-left corner of the window's client area, as
MonoGame gives it. Outside the window it goes on counting, so it can be negative or larger than the window.
<a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#positiondelta">`PositionDelta`</a> is how far it moved since the update before: the first update only takes the position,
and its delta is zero, so the game doesn't see a jump from (0, 0) to wherever the pointer was.

```csharp
// dragging the map with the right button
if (mouse.RightButton.Down) _cameraOffset -= mouse.PositionDelta.ToVector2();
```

The delta counts every move of the pointer, the game's own too. After `Mouse.SetPosition`, the next delta includes the
jump to the new position, so mouse look that puts the pointer back in the middle of the window each frame measures
from the middle itself:

```csharp
var center = new Point(Window.ClientBounds.Width / 2, Window.ClientBounds.Height / 2);
var look = mouse.Position - center; // not PositionDelta, which includes the jump back
_camera.Turn(look.X * Sensitivity, look.Y * Sensitivity);
Mouse.SetPosition(center.X, center.Y);
```

### MouseStatus pointer properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#position">`Position`</a> | `Point` | Read-only. Where the pointer is, in pixels from the top-left corner of the window's client area. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#positiondelta">`PositionDelta`</a> | `Point` | Read-only. How far the pointer moved since the update before, in pixels. Zero at the first update. |

## The wheels

MonoGame keeps a running total for each wheel, and the status keeps it as well as how far it changed:
<a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#wheeldelta">`WheelDelta`</a> is how far the wheel turned since the update before, positive away from you, 120 a notch
on most mice. Touchpads and free-spinning wheels send smaller steps, so divide by 120 rather than counting events:

```csharp
// zoom by 10% a notch, smoothly on a touchpad
if (mouse.WheelDelta != 0) _zoom *= MathF.Pow(1.1f, mouse.WheelDelta / 120f);
```

The horizontal wheel, a tilting wheel or a two-finger swipe on a touchpad, works the same way, positive to the right.
The first update only takes the totals, so scrolling done before it doesn't arrive as one big delta.

### MouseStatus wheel properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#wheeldelta">`WheelDelta`</a> | `int` | Read-only. How far the wheel turned since the update before: positive away from you, 120 a notch on most mice. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#wheelcumulativevalue">`WheelCumulativeValue`</a> | `int` | Read-only. The wheel's running total, MonoGame's `ScrollWheelValue`: 0 when the game starts. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#horizontalwheeldelta">`HorizontalWheelDelta`</a> | `int` | Read-only. How far the horizontal wheel turned since the update before, positive to the right. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#horizontalwheelcumulativevalue">`HorizontalWheelCumulativeValue`</a> | `int` | Read-only. The horizontal wheel's running total, MonoGame's `HorizontalScrollWheelValue`. |

## Events

The manager raises four events from inside its update methods, on the game thread:

```csharp
MouseManager.OnButtonsStatesChanged += states =>
{
    if (states.LeftButtonState == ButtonStates.Pressed) _clicks++;
};
MouseManager.OnPositionChanged += position => _cursor.Position = position.ToVector2();
MouseManager.OnWheelDeltaChanged += delta => _list.Scroll(delta / 120f);
```

- **<a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onbuttonsstateschanged">`OnButtonsStatesChanged`</a>** is raised once per update when any button changed state, after all five
  have moved, with a [snapshot](#snapshots-of-the-buttons) of the five. Every step counts, not only presses: a click
  held for a few frames raises it at `Pressed`, `Down`, `Up` and `Idle`. Check the state in the handler, as above.
- **<a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onpositionchanged">`OnPositionChanged`</a>** is raised when the pointer is somewhere new, also at the first update, unless
  the pointer starts at (0, 0). <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#update">`Update`</a> updates the pointer first, so in this handler the buttons still
  hold their states of the update before.
- **<a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onwheeldeltachanged">`OnWheelDeltaChanged`</a>** and **<a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onhorizontalwheeldeltachanged">`OnHorizontalWheelDeltaChanged`</a>** are raised at every
  update the wheel turns, not only when the amount changes, despite their names.

The events are static: a handler stays subscribed, and keeps its object alive, until it is removed.

### MouseManager events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onbuttonsstateschanged">`OnButtonsStatesChanged`</a> | <code>(<a href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">MouseButtonsStates</a> mouseButtonsStates)</code> | Static. A button changed state at an update, at any step. Once per update, after all five buttons moved. |
| <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onpositionchanged">`OnPositionChanged`</a> | `(Point newPosition)` | Static. The pointer is somewhere new at an update. Before the wheels and the buttons update. |
| <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onwheeldeltachanged">`OnWheelDeltaChanged`</a> | `(int delta)` | Static. The wheel turned since the update before. |
| <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onhorizontalwheeldeltachanged">`OnHorizontalWheelDeltaChanged`</a> | `(int delta)` | Static. The horizontal wheel turned since the update before. |

The handler types are delegates nested in the manager: <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-manager-buttons-states-changed/">`ButtonsStatesChanged`</a>,
<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-manager-position-changed/">`PositionChanged`</a>, <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-manager-wheel-delta-changed/">`WheelDeltaChanged`</a> and
<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-manager-horizontal-wheel-delta-changed/">`HorizontalWheelDeltaChanged`</a>.

## Snapshots of the buttons

A <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">`MouseButtonsStates`</a> holds the states of the five buttons at one moment, and never changes after. The buttons
event hands one to its handlers; <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#getbuttonsstates">`GetButtonsStates`</a> makes one now. Two snapshots compare with `==`,
state by state, which tells whether the buttons are as they were:

```csharp
// the button hints on screen, redrawn only when a button changed
var now = MouseManager.GetButtonsStates();
if (now != _lastButtons) RedrawButtonHints(now);
_lastButtons = now;
```

A snapshot is a class, so each one allocates. The buttons event makes one at each update it is raised, when it has
handlers.

### MouseButtonsStates members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#leftbuttonstate">`LeftButtonState`</a> | Read-only <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a>. The state of the left button when the snapshot was taken. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#middlebuttonstate">`MiddleButtonState`</a> | Read-only <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a>. The state of the middle button. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#rightbuttonstate">`RightButtonState`</a> | Read-only <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a>. The state of the right button. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#xbutton1state">`XButton1State`</a> | Read-only <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a>. The state of the first side button. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#xbutton2state">`XButton2State`</a> | Read-only <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a>. The state of the second side button. |
| <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#mousebuttonsstates">`MouseButtonsStates()`</a> | A snapshot of the five buttons as they are now, the same as <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#getbuttonsstates">`GetButtonsStates`</a>. |
| <code>operator ==(<a href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">MouseButtonsStates</a> first, <a href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">MouseButtonsStates</a> second)</code> | True when the five states are equal, or both snapshots are `null`. `!=` is its opposite, and <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#equals">`Equals`</a> compares the same way. |
| <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#tostring">`ToString()`</a> | The five states, such as `L: Pressed M: Idle R: Idle X1: Idle X2: Idle`. |

## Updating part of the mouse

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#update">`Update`</a> reads the mouse once and updates the three parts in order: the pointer, the wheels, then the
buttons. Each part also has an update method of its own, for a game that needs only one of them, or updates them at
different moments. Each reads the mouse again, and each part's delta counts from that part's own update before.

### MouseManager methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#update">`Update()`</a> | Static. Reads the mouse once and updates the pointer, the wheels and the buttons, in that order, raising their events. Call it once per frame. |
| <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#updatepositiondata">`UpdatePositionData()`</a> | Static. Reads the mouse and updates the position and its delta, nothing else. Raises <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onpositionchanged">`OnPositionChanged`</a> when the pointer moved. |
| <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#updatewheelsdata">`UpdateWheelsData()`</a> | Static. Reads the mouse and updates the two wheels, nothing else. Raises the event of each wheel that turned. |
| <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#updatebuttonsstates">`UpdateButtonsStates()`</a> | Static. Reads the mouse and moves the five buttons one step, nothing else. Raises <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onbuttonsstateschanged">`OnButtonsStatesChanged`</a> when any changed. |
| <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#getbuttonsstates">`GetButtonsStates()`</a> | Static. Returns a new <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">`MouseButtonsStates`</a>: the states of the five buttons as they are now. |
