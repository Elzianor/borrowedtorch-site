---
layout: docs
legend: [prop, method]
title: "MonoInput: quick start guide"
description: Set up BorrowedTorch.MonoInput in a game, update it every frame, move a first player with keys, mouse and pad, feed it the keys and mouse of a window MonoGame didn't create, and find your way around the input pages.
---

BorrowedTorch.MonoInput is the input layer of Kindling. MonoGame hands you a snapshot of the hardware each frame, and
telling a press from a hold means keeping last frame's snapshot and comparing the two, for every input you care about.
MonoInput keeps that bookkeeping for the keyboard, the mouse, four gamepads and a MIDI device, and reports every key,
button and note through the same four states: idle, just pressed, held and just released. There is nothing to create:
each kind of device has a static manager, the game calls its `Update` once per frame, then asks it what happened or
listens to its events, all on the game thread.

These pages cover the library from setup to every public type:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/monoinput/) (this page) | Installing, the parts and their namespaces, updating every frame, a first player moved with keys, mouse and pad, feeding your own state |
| [Button states](/docs/monoinput-states/) | The four states, the five checks, buttons that are always there and inputs that come and go, what a frame does, events |
| [Keyboard](/docs/monoinput-keyboard/) | Checking a key, modifiers and shortcuts, every key held, a key-binding screen, typed text, updating from the keyboard or a state of your own |
| [Mouse](/docs/monoinput-mouse/) | The buttons, the pointer and how far it moved, the wheels, the mouse events, snapshots of the buttons, updating part of the mouse, a state of your own |
| [Gamepads](/docs/monoinput-gamepads/) | Four player slots, connecting and disconnecting, the buttons, sticks and their dead zone, triggers, vibration, status events |
| [MIDI](/docs/monoinput-midi/) | Finding devices, connecting, notes and notes shorter than a frame, unplugging and switching, shutting down, threads |
| [Glossary](/docs/monoinput-glossary/) | Every public type with its members in alphabetical order, one page per type |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.MonoInput
```

| Requirement | Version |
| --- | --- |
| .NET | 10, Windows (`net10.0-windows10.0.19041.0`) |
| Operating system | Windows 10 version 2004 (build 19041) or later: MIDI goes through the Windows Runtime |
| MonoGame | 3.8.1 or later, DesktopGL or WindowsDX, the compute fork included. Not installed with the package: the library works with the MonoGame your game references |
| Borrowed Torch packages | None |

The game's project targets that Windows version or a later one, whichever MonoGame platform it uses. A DesktopGL
template targets plain `net10.0`, so change its target framework:

```xml
<TargetFramework>net10.0-windows10.0.19041.0</TargetFramework>
```

[BorrowedTorch.UI](/docs/ui/) brings MonoInput with it and reads the same managers, so a game with the UI already has
the package.

## The parts

Each kind of device has a static manager. The keyboard, the mouse and the gamepads are read from MonoGame when their
manager updates; MIDI arrives from Windows and waits in a queue until its manager updates. The keyboard and the mouse
managers can also take a state the game built, for a window MonoGame didn't create: see
[feeding your own state](#feeding-your-own-state).

- **Keyboard.** <a class="ref" href="/docs/monoinput-glossary/keyboard/keyboard-manager/">`KeyboardManager`</a> answers for any key, by the `Keys` value MonoGame names it with, and lists the
  keys being touched. See [keyboard](/docs/monoinput-keyboard/).
- **Mouse.** <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-manager/">`MouseManager`</a> keeps a <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-status/">`MouseStatus`</a>: five buttons, the pointer and two wheels, with how far each
  moved since the update before. See [mouse](/docs/monoinput-mouse/).
- **Gamepads.** <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-manager/">`GamePadManager`</a> keeps a <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-status/">`GamePadStatus`</a> for each of the four player slots: fifteen buttons, two
  sticks and two triggers, and sets the vibration. See [gamepads](/docs/monoinput-gamepads/).
- **MIDI.** <a class="ref" href="/docs/monoinput-glossary/midi/midi-manager/">`MidiManager`</a> finds MIDI input devices, connects to one and lists the notes held on it. See
  [MIDI](/docs/monoinput-midi/).

Every key, button and note is in one of the four <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a>. The [button states page](/docs/monoinput-states/)
explains them, and the five checks that read them.

| Namespace | Types |
| --- | --- |
| `BorrowedTorch.MonoInput.Inputs` | <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a>, <a class="ref" href="/docs/monoinput-glossary/states/button-info/">`ButtonInfo`</a>, <a class="ref" href="/docs/monoinput-glossary/states/active-input-status/">`ActiveInputStatus<TId>`</a>, <a class="ref" href="/docs/monoinput-glossary/states/active-inputs/">`ActiveInputs<TStatus>`</a>: the states, and what the managers share |
| `BorrowedTorch.MonoInput.Inputs.Keyboard` | <a class="ref" href="/docs/monoinput-glossary/keyboard/keyboard-manager/">`KeyboardManager`</a>, <a class="ref" href="/docs/monoinput-glossary/keyboard/key-status/">`KeyStatus`</a> |
| `BorrowedTorch.MonoInput.Inputs.Mouse` | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-manager/">`MouseManager`</a>, <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-status/">`MouseStatus`</a>, <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a>, <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">`MouseButtonsStates`</a>, <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-types/">`MouseButtonTypes`</a> |
| `BorrowedTorch.MonoInput.Inputs.GamePad` | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-manager/">`GamePadManager`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-status/">`GamePadStatus`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a>, <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/">`GamePadButtonTypes`</a> |
| `BorrowedTorch.MonoInput.Inputs.Midi` | <a class="ref" href="/docs/monoinput-glossary/midi/midi-manager/">`MidiManager`</a>, <a class="ref" href="/docs/monoinput-glossary/midi/midi-device-info/">`MidiDeviceInfo`</a>, <a class="ref" href="/docs/monoinput-glossary/midi/note-status/">`NoteStatus`</a> |

## Updating every frame

Call the `Update` of each manager you use at the top of the game's `Update`, before anything reads the input:

```csharp
using BorrowedTorch.MonoInput.Inputs.GamePad;
using BorrowedTorch.MonoInput.Inputs.Keyboard;
using BorrowedTorch.MonoInput.Inputs.Midi;
using BorrowedTorch.MonoInput.Inputs.Mouse;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

public class MyGame : Game
{
    private readonly GraphicsDeviceManager _graphics;

    public MyGame()
    {
        _graphics = new GraphicsDeviceManager(this);
        Content.RootDirectory = "Content";
        IsMouseVisible = true;
    }

    protected override void Update(GameTime gameTime)
    {
        // read the hardware first, once per frame
        KeyboardManager.Update();
        MouseManager.Update();
        GamePadManager.Update();
        MidiManager.Update(); // only if the game uses MIDI

        // then the game reads the input, see "A first player" below

        base.Update(gameTime);
    }

    protected override void UnloadContent()
    {
        MidiManager.Dispose(); // only if the game uses MIDI
        base.UnloadContent();
    }
}
```

A press lasts from one update to the next: `Pressed` at the update the key went down, `Down` from the update after.
So call each `Update` once per frame, not more. A second call in the same frame moves every input one step further,
and the press is gone before the game sees it. When something else in the game, such as the UI, reads the managers
too, update them once, before both.

Leave out the managers you don't need. <a class="ref" href="/docs/monoinput-glossary/midi/midi-manager/">`MidiManager`</a> in particular starts watching Windows for MIDI devices the
first time your code touches it, and wants <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a> at the end; a game that never touches it has nothing
to dispose. The other managers need no cleanup.

### The update calls

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#update">`KeyboardManager.Update()`</a> | Reads the keyboard and moves every key one step. |
| <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#update">`MouseManager.Update()`</a> | Reads the mouse once and updates the pointer, the wheels and the buttons, in that order, raising their events. |
| <a class="ref method" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#update">`GamePadManager.Update()`</a> | Reads the four player slots, moves their buttons one step, and raises an event for each pad that changed. |
| <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`MidiManager.Update()`</a> | Takes in the device changes and notes Windows reported since the update before, then moves every note one step. |
| <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`MidiManager.Dispose()`</a> | Shuts MIDI down when the game ends. |

## A first player

A player that walks with WASD or the left stick, jumps with Space or A, aims at the pointer and fires with the left
button:

```csharp
protected override void Update(GameTime gameTime)
{
    KeyboardManager.Update();
    MouseManager.Update();
    GamePadManager.Update();

    var dt = (float)gameTime.ElapsedGameTime.TotalSeconds;
    var pad = GamePadManager.GamePadsStatus[(int)PlayerIndex.One];
    var mouse = MouseManager.MouseStatus;

    // walking, every frame a key or the stick is held
    var move = Vector2.Zero;
    if (KeyboardManager.IsKeyDown(Keys.A)) move.X -= 1;
    if (KeyboardManager.IsKeyDown(Keys.D)) move.X += 1;
    if (KeyboardManager.IsKeyDown(Keys.W)) move.Y -= 1;
    if (KeyboardManager.IsKeyDown(Keys.S)) move.Y += 1;
    // the stick's Y points up, the screen's down
    move += new Vector2(pad.LeftStickShift.X, -pad.LeftStickShift.Y);
    if (move.LengthSquared() > 1) move.Normalize();
    _player.Position += move * PlayerSpeed * dt;

    // jumping, once per press: holding the key doesn't jump again
    if (KeyboardManager.IsKeyPressed(Keys.Space) || pad.A.Pressed) _player.Jump();

    // aiming and firing
    _player.AimAt(mouse.Position.ToVector2());
    if (mouse.LeftButton.Pressed) _player.Fire();

    // a pause menu, from either device
    if (KeyboardManager.IsKeyPressed(Keys.Escape) || pad.Start.Pressed) _paused = !_paused;

    base.Update(gameTime);
}
```

`_player`, `PlayerSpeed` and `_paused` stand for your own code. A slot with no pad in it reads idle and at zero, so
the code works the same with or without one.

The walk asks whether a key is held with `IsKeyDown`, true every frame from the first one. The jump asks whether it
was just pressed with `IsKeyPressed`, true for one frame per press. The same two checks read every button:
<a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#down">`Down`</a> and <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#pressed">`Pressed`</a> on the pad's and the mouse's buttons. The
[button states page](/docs/monoinput-states/#the-five-checks) has all five.

### KeyboardManager checks used here

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeydown">`IsKeyDown(Keys key)`</a> | Static. The key is held: `Pressed` or `Down`, the update it went down included. |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeypressed">`IsKeyPressed(Keys key)`</a> | Static. The key went down at the last update: true for that update only. |

### Status properties used here

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#gamepadsstatus">`GamePadManager.GamePadsStatus`</a> | <code>ImmutableArray&lt;<a href="/docs/monoinput-glossary/gamepads/game-pad-status/">GamePadStatus</a>&gt;</code> | Static, read-only. The four player slots, indexed by `(int)PlayerIndex`. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#leftstickshift">`GamePadStatus.LeftStickShift`</a> | `Vector2` | Read-only. Where the left stick is, each axis from −1 to 1: X to the right, Y up. |
| <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#a">`GamePadStatus.A`</a>, <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-status/#start">`GamePadStatus.Start`</a> | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> | Read-only. Two of the fifteen buttons of a pad. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-manager/#mousestatus">`MouseManager.MouseStatus`</a> | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-status/">`MouseStatus`</a> | Static, read-only. The mouse as of the last update. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#position">`MouseStatus.Position`</a> | `Point` | Read-only. Where the pointer is, in pixels from the top-left corner of the window's client area. |
| <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#leftbutton">`MouseStatus.LeftButton`</a> | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> | Read-only. The left button. |

## Feeding your own state

<a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#update">`KeyboardManager.Update()`</a> and <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#update">`MouseManager.Update()`</a> read MonoGame's `Keyboard` and `Mouse`, which
follow the window MonoGame created. A game drawn into a window of its own, such as an editor viewport in a WPF or
WinForms tool, gets no keys and no mouse from them, and a replay or a test has no hardware to read at all. For those,
build the state yourself and hand it to the keyboard and mouse managers, in place of their `Update()`:

```csharp
// once per frame, at the top of the view's update
KeyboardManager.Update(new KeyboardState(_heldKeys));
MouseManager.Update(new MouseState(_pointer.X, _pointer.Y, _wheel,
    _left, _middle, _right, _xButton1, _xButton2,
    _horizontalWheel));
```

`_heldKeys` is a `Keys[]` of the keys held now, `_pointer` the pointer in the view's pixels from its top-left corner,
`_wheel` and `_horizontalWheel` the wheels' running totals, and `_left` to `_xButton2` the buttons, as `ButtonState`
values. They stand for what your host keeps from its own key and mouse events.

Everything after that is the same as with polling: the states, the checks, <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a>,
<a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-manager/#mousestatus">`MouseStatus`</a> and the mouse events. Two things are yours to get right:

- **The wheels are running totals**, as MonoGame's `ScrollWheelValue` is. Add each wheel event's delta to the total,
  120 a notch in WPF and WinForms both, and the manager works out <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#wheeldelta">`WheelDelta`</a> itself. As with polling,
  the first update only takes the totals and the position, so neither arrives as a jump.
- **One update per frame.** A second update in the same frame moves every input another step, so a key just pressed
  reads `Down`. The polled and the fed updates move the same keys and the same mouse status, so call one of the two
  for each device, not both.

As with polling, only what the state holds at the update counts: a key pressed and let go between two updates is
never seen. The [partial mouse updates](/docs/monoinput-mouse/#a-state-of-your-own) take a state too. The gamepad
and MIDI managers have no such overload: they always read their devices themselves.

### The update calls that take a state

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#update">`KeyboardManager.Update(KeyboardState keyboardState)`</a> | Moves every key one step over the state passed, instead of reading the keyboard: the keys it holds are the keys held. |
| <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#update">`MouseManager.Update(MouseState mouseState)`</a> | Updates the pointer, the wheels and the buttons from the state passed, in that order, raising their events, instead of reading the mouse. |
