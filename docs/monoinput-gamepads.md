---
layout: docs
legend: [prop, method, event]
title: "MonoInput: gamepads"
description: Four player slots, connecting and disconnecting, the fifteen buttons, sticks and their dead zone, triggers, vibration, and status events.
---

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-manager/">`GamePadManager`</a> reads four player slots at every update, one <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-status/">`GamePadStatus`</a> each: whether a pad is connected,
its fifteen buttons, two sticks and two triggers, each with how far it moved since the update before. Names are
colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Four players

<a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#gamepadsstatus">`GamePadsStatus`</a> holds the four slots, indexed by MonoGame's `PlayerIndex`, from `One` to `Four`.
Every slot has its status, connected or not, and each status is the same object for the whole run:

```csharp
var pad = GamePadManager.GamePadsStatus[(int)PlayerIndex.One];

// or all four
foreach (var p in GamePadManager.GamePadsStatus)
    if (p.IsConnected) DrawPlayerIcon(p.PlayerIndex);
```

Which pad lands in which slot is up to MonoGame and Windows, usually in the order they were connected. A game that
lets anyone join picks the slot from the pad that pressed a button:

```csharp
// the title screen: whoever presses a button is player one
foreach (var p in GamePadManager.GamePadsStatus)
{
    if (!p.IsAnyButtonPressed) continue;

    _playerOne = p.PlayerIndex;
    StartGame();
    break;
}
```

### GamePadManager properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#gamepadsstatus">`GamePadsStatus`</a> | <code>ImmutableArray&lt;<a href="/docs/monoinput-glossary/gamepads/game-pad-status/">GamePadStatus</a>&gt;</code> | Static, read-only. The four player slots, indexed by `(int)PlayerIndex`. The array can't be changed, and each status is the same object for the whole run. |

### GamePadStatus properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#playerindex">`PlayerIndex`</a> | `PlayerIndex` | Read-only. The slot, from `One` to `Four`. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#isconnected">`IsConnected`</a> | `bool` | Read-only. A pad is connected in the slot. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#isanybuttonpressed">`IsAnyButtonPressed`</a> | `bool` | Read-only. Any of the fifteen buttons went down at the last update. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#isanybuttondown">`IsAnyButtonDown`</a> | `bool` | Read-only. Any of the fifteen buttons is held: `Pressed` or `Down`. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#isanybuttonup">`IsAnyButtonUp`</a> | `bool` | Read-only. Any of the fifteen buttons was let go at the last update. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#isanybuttonactive">`IsAnyButtonActive`</a> | `bool` | Read-only. Any of the fifteen buttons is pressed, held or just let go. The triggers aren't buttons and don't count. |

## Connecting and disconnecting

<a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#isconnected">`IsConnected`</a> says whether a pad is in the slot. A slot without one reads idle and at zero, so game
code can read a slot without checking first: the player just doesn't move.

When a pad disconnects in the middle of a game, its slot is updated as if everything had been let go: at that update
its held buttons go `Up` and its sticks and triggers back to zero, with deltas to match, and at the next its buttons
are `Idle`. A button held at the time never stays stuck down, and a walking player stops.

There is no event of its own for a connection. <a class="ref event" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#onstatuschanged">`OnStatusChanged`</a> is raised when it changes, among other
things, so a game that pauses when its player's pad goes away remembers the last value:

```csharp
GamePadManager.OnStatusChanged += player =>
{
    if (player != _playerOne) return;

    var connected = GamePadManager.GamePadsStatus[(int)player].IsConnected;
    if (_wasConnected && !connected) Pause();
    _wasConnected = connected;
};
```

## Buttons

Each status has fifteen buttons, each a <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> with the state and the
[five checks](/docs/monoinput-states/#the-five-checks) of every button. They are named after the Xbox layout:

<figure class="shot">
  <img src="{{ '/assets/img/monoinput/gamepad.svg' | relative_url }}" width="640" height="270" alt="A gamepad seen from the front with its parts named. On the left: LeftTriggerValue on the left trigger, LeftShoulder on the bumper below it, LeftStickShift on the left stick, which is LeftStick when pressed in, and Up, Down, Left, Right on the D-pad. In the middle: Back, Home and Start. On the right: RightTriggerValue, RightShoulder, the face buttons A, B, X and Y, and RightStickShift on the right stick, which is RightStick when pressed in">
  <figcaption>The buttons and the analog parts of a pad, by the names of their properties. The triggers have values, not states.</figcaption>
</figure>

<a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#home">`Home`</a> is the guide button in the middle, MonoGame's `BigButton`. Not every platform reports it, so
don't make it the only way to do something. <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#leftstick">`LeftStick`</a> and <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#rightstick">`RightStick`</a> are presses on
the sticks, and <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#leftshoulder">`LeftShoulder`</a> and <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#rightshoulder">`RightShoulder`</a> the bumpers.

```csharp
var pad = GamePadManager.GamePadsStatus[(int)PlayerIndex.One];

if (pad.A.Pressed) _player.Jump();
if (pad.LeftStick.Pressed) _player.ToggleSprint();
if (pad.Up.Pressed) _menu.SelectPrevious();
if (pad.Down.Pressed) _menu.SelectNext();
```

A button object is the same for the whole run, so `pad.A` can be kept and read later, see
[buttons that are always there](/docs/monoinput-states/#buttons-that-are-always-there).

### GamePadStatus button properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#a">`A`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. The bottom face button. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#b">`B`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. The right face button. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#x">`X`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. The left face button. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#y">`Y`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. The top face button. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#back">`Back`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. The Back or View button, left of the middle. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#start">`Start`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. The Start or Menu button, right of the middle. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#home">`Home`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. The guide button in the middle, MonoGame's `BigButton`. Not every platform reports it. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#leftstick">`LeftStick`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. A press on the left stick. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#rightstick">`RightStick`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. A press on the right stick. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#leftshoulder">`LeftShoulder`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. The left bumper. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#rightshoulder">`RightShoulder`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. The right bumper. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#up">`Up`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. Up on the D-pad. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#down">`Down`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. Down on the D-pad. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#left">`Left`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. Left on the D-pad. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#right">`Right`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. Right on the D-pad. |

### GamePadButtonInfo members

`GamePadButtonInfo` derives from <a class="ref" href="/docs/monoinput-glossary/states/button-info/">`ButtonInfo`</a>, whose [properties](/docs/monoinput-states/#buttoninfo-properties) are
the state and the checks. It adds:

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/#type">`Type`</a> | Read-only <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/">`GamePadButtonTypes`</a>. Which button it is. |
| <a class="ref method" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/#tostring">`ToString()`</a> | The type and the state, such as <code>A &#124; Down</code>. |
| <span class="method"><code><a href="/docs/monoinput-glossary/gamepads/game-pad-button-info/#gamepadbuttoninfo">GamePadButtonInfo</a>(<a href="/docs/monoinput-glossary/gamepads/game-pad-button-types/">GamePadButtonTypes</a> type)</code></span> | A button of the type, `Idle`. A pad status makes its own fifteen; one you create is never updated. |

#### `GamePadButtonTypes`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#a">`A`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#b">`B`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#x">`X`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#y">`Y`</a> | The face buttons: bottom, right, left and top. |
| <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#back">`Back`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#start">`Start`</a> | The Back or View button and the Start or Menu button. |
| <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#home">`Home`</a> | The guide button, MonoGame's `Buttons.BigButton`. |
| <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#leftstick">`LeftStick`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#rightstick">`RightStick`</a> | Presses on the sticks. |
| <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#leftshoulder">`LeftShoulder`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#rightshoulder">`RightShoulder`</a> | The bumpers. |
| <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#up">`Up`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#down">`Down`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#left">`Left`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/#right">`Right`</a> | The D-pad. |

## Sticks

<a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#leftstickshift">`LeftStickShift`</a> and <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#rightstickshift">`RightStickShift`</a> are where the sticks are, each axis from −1
to 1: X to the right and Y up. The screen's Y goes down, so flip Y to move something on screen:

```csharp
var stick = pad.LeftStickShift;
_player.Position += new Vector2(stick.X, -stick.Y) * PlayerSpeed * dt;
```

The manager reads the sticks with MonoGame's circular dead zone. A stick at rest never sits exactly in the middle, so
small readings around it come out as zero: a stick that isn't touched reads `Vector2.Zero`, and code can compare with
zero safely. The library always asks for the circular dead zone, and has no setting for another.

<a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#leftstickshiftdelta">`LeftStickShiftDelta`</a> and <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#rightstickshiftdelta">`RightStickShiftDelta`</a> are how far each stick moved since the
update before, as for a quick flick:

```csharp
// a dodge on a fast flick of the right stick
if (pad.RightStickShiftDelta.Length() > 0.6f) _player.Dodge(pad.RightStickShift);
```

### GamePadStatus stick properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#leftstickshift">`LeftStickShift`</a> | `Vector2` | Read-only. Where the left stick is, each axis from −1 to 1: X to the right, Y up. Exactly zero at rest. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#rightstickshift">`RightStickShift`</a> | `Vector2` | Read-only. Where the right stick is, each axis from −1 to 1: X to the right, Y up. Exactly zero at rest. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#leftstickshiftdelta">`LeftStickShiftDelta`</a> | `Vector2` | Read-only. How far the left stick moved since the update before. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#rightstickshiftdelta">`RightStickShiftDelta`</a> | `Vector2` | Read-only. How far the right stick moved since the update before. |

## Triggers

The triggers are analog, so they have values, not states: <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#lefttriggervalue">`LeftTriggerValue`</a> and
<a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#righttriggervalue">`RightTriggerValue`</a>, from 0, let go, to 1, pulled all the way. Their deltas are how far they moved
since the update before, positive when pulled further.

To use a trigger as a button, choose a point along its travel. The value before this update is the value minus the
delta, so a press is the update the value crosses the point:

```csharp
const float Threshold = 0.5f;
var now = pad.RightTriggerValue;
var before = now - pad.RightTriggerValueDelta;

if (now >= Threshold && before < Threshold) _player.Fire();      // pressed
if (now < Threshold && before >= Threshold) _player.StopFire();  // let go
```

### GamePadStatus trigger properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#lefttriggervalue">`LeftTriggerValue`</a> | `float` | Read-only. How far the left trigger is pulled, from 0 to 1. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#righttriggervalue">`RightTriggerValue`</a> | `float` | Read-only. How far the right trigger is pulled, from 0 to 1. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#lefttriggervaluedelta">`LeftTriggerValueDelta`</a> | `float` | Read-only. How far the left trigger moved since the update before: positive when pulled further. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#righttriggervaluedelta">`RightTriggerValueDelta`</a> | `float` | Read-only. How far the right trigger moved since the update before: positive when pulled further. |

## Vibration

<a class="ref method" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#setvibration">`SetVibration`</a> sets the speed of a pad's two motors, each from 0, stopped, to 1, full speed. The
low-frequency motor, the left one on most pads, gives a heavy rumble; the high-frequency one, on the right, a light
buzz. The motors keep the speed they were given until the next call, so a rumble that lasts a while is stopped by the
game:

```csharp
// a hit: a quarter of a second of rumble
GamePadManager.SetVibration(PlayerIndex.One, 0.8f, 0.3f);
_rumbleLeft = 0.25f;

// every frame
if (_rumbleLeft > 0)
{
    _rumbleLeft -= dt;
    if (_rumbleLeft <= 0) GamePadManager.SetVibration(PlayerIndex.One, 0, 0);
}
```

It does nothing for a pad that isn't connected or can't vibrate. Stop the motors when the game pauses too: nothing
stops them for you.

### GamePadManager methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#update">`Update()`</a> | Static. Reads the four slots with a circular dead zone, moves their buttons one step, and raises <a class="ref event" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#onstatuschanged">`OnStatusChanged`</a> for each pad that changed. Call it once per frame. |
| <a class="ref method" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#setvibration">`SetVibration(PlayerIndex index, float lowFreqMotor, float highFreqMotor)`</a> | Static. Sets the speed of a pad's two motors, from 0 to 1. They keep it until the next call. |

## Status events

<a class="ref event" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#onstatuschanged">`OnStatusChanged`</a> is raised from <a class="ref method" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#update">`Update`</a>, at most once per pad per update, slot `One`
first, with the slot of the pad that changed. Anything counts: the pad connected or disconnected, a button changed
state at any step, `Pressed` to `Down` and `Up` to `Idle` included, or a stick or a trigger moved. So it is raised at
every update a stick is being moved, and is best for telling when to look, such as redrawing a controller test screen:

```csharp
GamePadManager.OnStatusChanged += player => _testScreen.Redraw(GamePadManager.GamePadsStatus[(int)player]);
```

The event is static: a handler stays subscribed, and keeps its object alive, until it is removed.

### GamePadManager events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#onstatuschanged">`OnStatusChanged`</a> | `(PlayerIndex playerIndex)` | Static. Something about the pad changed at an update: its connection, a button's state, a stick or a trigger. |

The handler type is the delegate <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-manager-status-changed/">`StatusChanged`</a>, nested in the manager.
