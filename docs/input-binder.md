---
layout: docs
legend: [prop, method]
title: "Input binder: quick start guide"
description: Set up BorrowedTorch.InputBinder, register a first game's actions with default bindings, feed it the input polled each frame, and find your way around the input binder pages.
---

BorrowedTorch.InputBinder connects the physical inputs of a game, keys, buttons, sticks and triggers, to what they do:
named actions such as "Jump", "Fire" or "Look". The game registers its actions once, with the bindings they start
with. The player can rebind them later, in a settings menu, and the binder refuses to give one input to two actions
without asking. Every frame the game hands the binder the inputs it polled, and the binder runs the callback of the
action each one is bound to.

The binder reads no hardware itself. It takes whatever the game polled, from [MonoInput](/docs/monoinput/), MonoGame or
anything else, so it depends on neither and runs anywhere .NET does.

These pages cover the library from setup to every public type:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/input-binder/) (this page) | Installing, the parts and their namespaces, a first game's actions, feeding the binder every frame, a first rebind |
| [Actions](/docs/input-binder-actions/) | The three shapes, registering, callbacks, actions built ahead, names and descriptions, finding and unregistering actions |
| [Inputs](/docs/input-binder-inputs/) | What makes an input, sources and ids, the factories, buttons and axes, equality, showing an input to the player |
| [Binding and rebinding](/docs/input-binder-binding/) | Slots, default bindings, binding and its results, conflicts, unbinding, a rebinding screen, saving bindings |
| [Updating every frame](/docs/input-binder-update/) | What an update does, which inputs to pass, reusing inputs, players, feeding the binder from MonoInput, threads |
| [Modifier keys](/docs/input-binder-modifiers/) | Ctrl, Shift and Alt bindings, the most specific binding winning, a press keeping its binding, modifier keys as bindings |
| [Glossary](/docs/input-binder-glossary/) | Every public type with its members in alphabetical order, one page per type |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.InputBinder
```

| Requirement | Version |
| --- | --- |
| .NET | 8 or 10 |
| Operating system | Any: the binder reads no hardware |
| MonoGame | Not needed. The two-axes values are `System.Numerics.Vector2`, which MonoGame 3.8.2 and later converts to its own `Vector2` |
| Borrowed Torch packages | None. [MonoInput](/docs/monoinput/) is a good source of polled input, see [feeding the binder from MonoInput](/docs/input-binder-update/#feeding-the-binder-from-monoinput) |

## The parts

- **Actions.** What the game can do, in three shapes: a <a class="ref" href="/docs/input-binder-glossary/actions/button-action/">`ButtonAction`</a> is told a button's state, a
  <a class="ref" href="/docs/input-binder-glossary/actions/one-axis-action/">`OneAxisAction`</a> a `float` such as a trigger's, and a <a class="ref" href="/docs/input-binder-glossary/actions/two-axes-action/">`TwoAxesAction`</a> a `Vector2` such as a stick's. See
  [actions](/docs/input-binder-actions/).
- **Inputs.** The physical controls: a <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a>, a <a class="ref" href="/docs/input-binder-glossary/inputs/one-axis-input/">`OneAxisInput`</a> or a <a class="ref" href="/docs/input-binder-glossary/inputs/two-axes-input/">`TwoAxesInput`</a>, each on a
  keyboard, a mouse, a gamepad or a MIDI device. <a class="ref" href="/docs/input-binder-glossary/inputs/input-factory/">`InputFactory`</a> makes them in a few characters. An input is
  bound to an action of its own shape only. See [inputs](/docs/input-binder-inputs/).
- **The binder.** <a class="ref" href="/docs/input-binder-glossary/binder/input-binder/">`InputBinder`</a> keeps the actions and which inputs drive them. Registering an action returns a
  <a class="ref" href="/docs/input-binder-glossary/binder/registered-action-handle/">`RegisteredActionHandle`</a>, which binds and unbinds the action's inputs and reads them back for a settings
  menu. See [binding and rebinding](/docs/input-binder-binding/).

| Namespace | Types |
| --- | --- |
| `BorrowedTorch.InputBinding` | <a class="ref" href="/docs/input-binder-glossary/binder/input-binder/">`InputBinder`</a> |
| `BorrowedTorch.InputBinding.Factories` | <a class="ref" href="/docs/input-binder-glossary/inputs/input-factory/">`InputFactory`</a> |
| `BorrowedTorch.InputBinding.Types` | <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a>, <a class="ref" href="/docs/input-binder-glossary/inputs/button-modifier/">`ButtonModifier`</a>, <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/">`InputSource`</a>, <a class="ref" href="/docs/input-binder-glossary/actions/input-type/">`InputType`</a>, <a class="ref" href="/docs/input-binder-glossary/binder/input-binder-result/">`InputBinderResult`</a>: the enums |
| `BorrowedTorch.InputBinding.Types.Actions` | <a class="ref" href="/docs/input-binder-glossary/actions/button-action/">`ButtonAction`</a>, <a class="ref" href="/docs/input-binder-glossary/actions/one-axis-action/">`OneAxisAction`</a>, <a class="ref" href="/docs/input-binder-glossary/actions/two-axes-action/">`TwoAxesAction`</a> |
| `BorrowedTorch.InputBinding.Types.Actions.Base` | <a class="ref" href="/docs/input-binder-glossary/actions/base-action/">`BaseAction`</a> |
| `BorrowedTorch.InputBinding.Types.Inputs` | <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a>, <a class="ref" href="/docs/input-binder-glossary/inputs/one-axis-input/">`OneAxisInput`</a>, <a class="ref" href="/docs/input-binder-glossary/inputs/two-axes-input/">`TwoAxesInput`</a> |
| `BorrowedTorch.InputBinding.Types.Inputs.Base` | <a class="ref" href="/docs/input-binder-glossary/inputs/base-input/">`BaseInput`</a> |
| `BorrowedTorch.InputBinding.Types.Handles` | <a class="ref" href="/docs/input-binder-glossary/binder/registered-action-handle/">`RegisteredActionHandle`</a> |
| `BorrowedTorch.InputBinding.Types.Results` | <a class="ref" href="/docs/input-binder-glossary/binder/bind-result/">`BindResult`</a> |

## A first game

A player that jumps with Space or W, fires with the left mouse button or Ctrl, and looks around with the mouse. The
actions are registered once, each with the bindings it starts with:

```csharp
using BorrowedTorch.InputBinding;
using BorrowedTorch.InputBinding.Factories;
using BorrowedTorch.InputBinding.Types;
using BorrowedTorch.MonoInput.Inputs.Mouse;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

public class MyGame : Game
{
    private readonly InputBinder _binder = new(); // two bindings per action

    protected override void Initialize()
    {
        // a button callback gets every state polled, so it picks the ones it acts on
        _binder.RegisterButtonAction("Jump",
                                     (state, player) => { if (state == ButtonState.Pressed) _player.Jump(); },
                                     description: "Jump over a gap")
               .WithDefaultBinding(0, InputFactory.Key((int)Keys.Space))
               .WithDefaultBinding(1, InputFactory.Key((int)Keys.W));

        _binder.RegisterButtonAction("Fire",
                                     (state, player) => { if (state == ButtonState.Pressed) _player.Fire(); },
                                     description: "Fire the torch")
               .WithDefaultBinding(0, InputFactory.MouseButton((int)MouseButtonTypes.Left))
               .WithDefaultBinding(1, InputFactory.Key((int)Keys.LeftControl));

        _binder.RegisterTwoAxesAction("Look",
                                      (delta, player) => _camera.Turn(delta.X, delta.Y),
                                      description: "Look around")
               .WithDefaultBinding(0, InputFactory.MouseAxes(0)); // 0: the pointer's movement, an id of our own

        base.Initialize();
    }
}
```

`_player` and `_camera` stand for your own code. The numbers are ids the game chooses: here MonoGame's `Keys` values
for keys and MonoInput's `MouseButtonTypes` for mouse buttons. The binder only compares them, see
[sources and ids](/docs/input-binder-inputs/#sources-and-ids). Two actions given the same default input throw at
startup, rather than one of them quietly going without it.

### InputBinder members used here

| Member | Description |
| --- | --- |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#inputbinder">`InputBinder(int inputBindingsPerAction = 2)`</a> | A binder whose actions have that many binding slots each. |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registerbuttonaction">`RegisterButtonAction(name, callback, description, representation)`</a> | Registers a button action and returns its handle. Throws when an action of that name is already registered. |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registertwoaxesaction">`RegisterTwoAxesAction(name, callback, description, representation)`</a> | Registers a two-axes action and returns its handle. |
| <a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#withdefaultbinding">`WithDefaultBinding(int index, BaseInput input)`</a> | On the handle. Binds the input into a slot and returns the handle, for chaining. Throws when the input can't be bound there. |

## Feeding it every frame

Each frame the game polls its devices into inputs and passes them to <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#update">`Update`</a>, with the modifier keys held.
Here the input comes from [MonoInput](/docs/monoinput/), whose managers update first:

```csharp
using BorrowedTorch.InputBinding.Types.Inputs;
using BorrowedTorch.MonoInput.Inputs;
using BorrowedTorch.MonoInput.Inputs.Keyboard;

// polled inputs, made once and refilled every frame: Update then allocates nothing
private readonly ButtonInput[] _keys = new ButtonInput[256]; // one per Keys value, made at its first press
private readonly ButtonInput _leftButton = InputFactory.MouseButton((int)MouseButtonTypes.Left);
private readonly TwoAxesInput[] _pointer = [InputFactory.MouseAxes(0)];
private readonly List<ButtonInput> _buttons = new(32);

protected override void Update(GameTime gameTime)
{
    KeyboardManager.Update();
    MouseManager.Update();

    _buttons.Clear();

    // every key pressed, held or just let go
    foreach (var status in KeyboardManager.ActiveKeys)
    {
        var key = _keys[(int)status.Key] ??= InputFactory.Key((int)status.Key);
        key.State = ToBinder(status.State);
        _buttons.Add(key);
    }

    var mouse = MouseManager.MouseStatus;
    _leftButton.State = ToBinder(mouse.LeftButton.State);
    _buttons.Add(_leftButton);
    _pointer[0].Value = new System.Numerics.Vector2(mouse.PositionDelta.X, mouse.PositionDelta.Y);

    // runs Jump, Fire and Look for the inputs bound to them
    _binder.Update(_buttons, null, _pointer,
                   withShift: KeyboardManager.IsShiftDown,
                   withCtrl: KeyboardManager.IsCtrlDown,
                   withAlt: KeyboardManager.IsAltDown);

    base.Update(gameTime);
}

// MonoInput's states to the binder's: Idle is None
private static ButtonState ToBinder(ButtonStates state) => state switch
{
    ButtonStates.Pressed => ButtonState.Pressed,
    ButtonStates.Down => ButtonState.Down,
    ButtonStates.Up => ButtonState.Up,
    _ => ButtonState.None
};
```

The binder looks each input up by what it is, its source, shape, id and modifier, and calls the bound action with its
state or value and its player number. An input bound to nothing is skipped. Every input passed calls its action,
whatever its state, which is why the callbacks above check for `Pressed`: the mouse button is passed every frame, idle
or not. The [updating page](/docs/input-binder-update/) has the details, and an adapter for the whole of MonoInput:
gamepads included.

### InputBinder update method

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#update">`Update(buttonInputs, oneAxisInputs, twoAxesInputs, withShift, withCtrl, withAlt)`</a> | Runs the action bound to each input of the three lists, any of which may be `null`. The flags say which modifier keys are held. |

## A first rebind

In a settings menu, the player picks Jump and presses J. The handle binds it, and reports a conflict rather than take
J from another action:

```csharp
var jump = _binder.GetAction("Jump");
var result = jump.Bind(0, InputFactory.Key((int)Keys.J));

if (result.Result == InputBinderResult.InputBoundToOtherAction)
{
    // J belongs to result.ConflictingActionHandle: ask the player, then take it
    jump.Bind(0, InputFactory.Key((int)Keys.J), forceMap: true);
}
```

Space, which was in that slot, is released, and from the next update J jumps. The
[binding page](/docs/input-binder-binding/) covers the slots, every result, and saving the player's bindings.

### Members used here

| Member | Description |
| --- | --- |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#getaction">`InputBinder.GetAction(string actionName)`</a> | The handle of the action of that name, or `null`. |
| <a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#bind">`RegisteredActionHandle.Bind(int index, BaseInput input, bool forceMap = false)`</a> | Binds the input into the slot, and returns a <a class="ref" href="/docs/input-binder-glossary/binder/bind-result/">`BindResult`</a>. With `forceMap`, takes the input from the action that has it. |
| <a class="ref prop" href="/docs/input-binder-glossary/binder/bind-result/#result">`BindResult.Result`</a> | <a class="ref" href="/docs/input-binder-glossary/binder/input-binder-result/">`InputBinderResult`</a>. `Success`, or why the input wasn't bound. |
| <a class="ref prop" href="/docs/input-binder-glossary/binder/bind-result/#conflictingactionhandle">`BindResult.ConflictingActionHandle`</a> | The handle of the action that has the input, on a conflict. |
