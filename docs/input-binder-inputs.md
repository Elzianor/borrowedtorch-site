---
layout: docs
legend: [prop, method]
title: "Input binder: inputs"
description: What makes an input, its source and id, the factories, buttons and axes, when two inputs are equal, and showing an input to the player.
---

An input is one physical control: a key, a mouse or pad button, a MIDI note, a trigger, a stick. The same classes do
two jobs. Bound to an action, an input says which control drives it. Passed to
<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#update">`Update`</a>, it says what that control is doing this frame. Names are colored by what they are: a <span class="kb kb-prop">plain property</span> or a <span class="kb kb-method">method</span>.

## What an input is

An input holds two kinds of data:

<figure class="shot">
  <img src="{{ '/assets/img/input-binder/identity.svg' | relative_url }}" width="640" height="240" alt="A ButtonInput for the Space key, split in two. Its identity: Source Keyboard, shape Button, ButtonId 32 and Modifier None, fixed when it is made, and what equality, bindings and lookups compare. Its live data: State Pressed and PlayerNumber 0, set again every frame, and what the action's callback gets. Representation is neither: kept for the game, compared by nothing, given to no callback">
  <figcaption>The identity of an input decides which binding it matches; its live data is what the action's callback gets.</figcaption>
</figure>

- **Its identity**: the source, the shape, the id and, for a key, the modifier. They are fixed when the input is made,
  and they are all the binder compares: a polled input matches the binding with the same identity.
- **Its live data**: a button's <a class="ref prop" href="/docs/input-binder-glossary/inputs/button-input/#state">`State`</a> or an axis's <a class="ref prop" href="/docs/input-binder-glossary/inputs/one-axis-input/#value">`Value`</a>, and the <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#playernumber">`PlayerNumber`</a>. They can be
  set at any time, so the game makes each polled input once and refills it every frame, and they never change which
  binding an input matches.

## Sources and ids

<a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#source">`Source`</a> says which kind of device an input is on:

#### `InputSource`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/#keyboard">`Keyboard`</a> | A key. The only source whose buttons can carry a modifier. |
| <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/#mouse">`Mouse`</a> | A mouse button, wheel or movement. |
| <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/#gamepad">`GamePad`</a> | A pad button, trigger or stick. |
| <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/#midi">`Midi`</a> | A MIDI note, knob or slider. |

The id tells the inputs of one source and shape apart, and its meaning is the game's: the binder only compares ids.
Pick one numbering per source and keep it, since saved bindings store the ids. With MonoGame and
[MonoInput](/docs/monoinput/), these fit:

| Inputs | Ids |
| --- | --- |
| Keys | MonoGame's `Keys` values: `(int)Keys.Space` is 32 |
| Mouse buttons | MonoInput's <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-types/">`MouseButtonTypes`</a>, as `int` |
| Pad buttons | MonoInput's <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/">`GamePadButtonTypes`</a>, as `int` |
| MIDI notes | The note number, 0 to 127 |
| Axes | Numbers of your own, per source: say 0 for the left trigger and 1 for the right, 0 for the left stick and 1 for the right |

The source and the shape are part of the identity, so ids only need to be unique within them: mouse button 0 and pad
button 0 are two inputs, and so are pad axis 0, a trigger, and pad axes 0, a stick.

## Making inputs

<a class="ref" href="/docs/input-binder-glossary/inputs/input-factory/">`InputFactory`</a> makes each kind of input in a few characters, both to bind and to poll:

```csharp
binder.GetAction("Jump").Bind(0, InputFactory.GamePadButton((int)GamePadButtonTypes.A));
binder.GetAction("Save").Bind(0, InputFactory.Key((int)Keys.S, modifier: ButtonModifier.Ctrl)); // Ctrl+S

var rightTrigger = InputFactory.GamePadAxis(1);         // polled every frame
var leftStick = InputFactory.GamePadAxes(0);
```

A key's second parameter is its state, so pass the modifier by name. The state or value matters only to a polled
input: a binding matches on identity alone. The factories are short for the constructors, which do the same:
`InputFactory.Key(32)` is `new ButtonInput(InputSource.Keyboard, 32)`.

### InputFactory methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#key">`Key(int keyCode, ButtonState state = None, ButtonModifier modifier = None)`</a> | Static. A key, with a modifier for a binding such as Ctrl+S. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#mousebutton">`MouseButton(int button, ButtonState state = None)`</a> | Static. A mouse button. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#gamepadbutton">`GamePadButton(int button, ButtonState state = None)`</a> | Static. A pad button. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#midibutton">`MidiButton(int note, ButtonState state = None)`</a> | Static. A MIDI note, as a button. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#button">`Button(InputSource source, int buttonId, ButtonState state = None, ButtonModifier modifier = None)`</a> | Static. A button on any source. The modifier is kept for the keyboard only. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#mouseaxis">`MouseAxis(int axisId, float? value = null)`</a> | Static. A one-axis mouse input, such as the wheel. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#gamepadaxis">`GamePadAxis(int axisId, float? value = null)`</a> | Static. A one-axis pad input, such as a trigger. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#midiaxis">`MidiAxis(int axisId, float? value = null)`</a> | Static. A one-axis MIDI input, such as a knob. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#axis">`Axis(InputSource source, int axisId, float? value = null)`</a> | Static. A one-axis input on any source. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#mouseaxes">`MouseAxes(int axesId, Vector2? value = null)`</a> | Static. A two-axes mouse input, such as its movement. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#gamepadaxes">`GamePadAxes(int axesId, Vector2? value = null)`</a> | Static. A two-axes pad input, such as a stick. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#axes">`Axes(InputSource source, int axesId, Vector2? value = null)`</a> | Static. A two-axes input on any source. |

## Buttons

A <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a> is a key, a mouse or pad button, or a MIDI note. Its <a class="ref prop" href="/docs/input-binder-glossary/inputs/button-input/#state">`State`</a> is where the button is this
frame, one of four:

#### `ButtonState`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/#none">`None`</a> | Not touched. The state a new input starts with. |
| <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/#pressed">`Pressed`</a> | Just went down: the first frame the button is held. |
| <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/#down">`Down`</a> | Still held, from the second frame on. |
| <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/#up">`Up`</a> | Just let go: the frame after the last one it was held. |

They are the [four states of MonoInput](/docs/monoinput-states/#the-four-states), with `None` for its `Idle`. The binder
doesn't work them out: the game polls them, and the binder passes them on. A key's
<a class="ref prop" href="/docs/input-binder-glossary/inputs/button-input/#modifier">`Modifier`</a> is covered on the [modifier keys page](/docs/input-binder-modifiers/).

### ButtonInput members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/input-binder-glossary/inputs/button-input/#buttonid">`ButtonId`</a> | Read-only `int`. Which button of its source. Part of the identity. |
| <a class="ref prop" href="/docs/input-binder-glossary/inputs/button-input/#modifier">`Modifier`</a> | Read-only <a class="ref" href="/docs/input-binder-glossary/inputs/button-modifier/">`ButtonModifier`</a>. Shift, Ctrl or Alt with the key, or `None`; always `None` off the keyboard. Part of the identity. |
| <a class="ref prop" href="/docs/input-binder-glossary/inputs/button-input/#state">`State`</a> | <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a>. Where the button is this frame. Live data: what a button action's callback gets. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/button-input/#buttoninput">`ButtonInput(InputSource source, int buttonId, ButtonModifier modifier = None)`</a> | A button input, `None`. A modifier off the keyboard is dropped. |

## Axes

A <a class="ref" href="/docs/input-binder-glossary/inputs/one-axis-input/">`OneAxisInput`</a> is a single value, such as a trigger, a wheel or a knob, and a <a class="ref" href="/docs/input-binder-glossary/inputs/two-axes-input/">`TwoAxesInput`</a> a pair, such as a
stick or the mouse's movement. Their <a class="ref prop" href="/docs/input-binder-glossary/inputs/one-axis-input/#value">`Value`</a> goes to the action as it is: the binder sets no range and no dead
zone. Scale values the way the actions expect them, a stick from −1 to 1 and a trigger from 0 to 1, say, before the
update; [MonoInput](/docs/monoinput-gamepads/) already reports the pad's that way, with the dead zone applied.

```csharp
var leftStick = InputFactory.GamePadAxes(0);

// each frame, from MonoInput's first player slot
var stick = GamePadManager.GamePadsStatus[0].LeftStickShift; // MonoGame's Vector2
leftStick.Value = new System.Numerics.Vector2(stick.X, stick.Y);
```

### OneAxisInput members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/input-binder-glossary/inputs/one-axis-input/#axisid">`AxisId`</a> | Read-only `int`. Which axis of its source. Part of the identity. |
| <a class="ref prop" href="/docs/input-binder-glossary/inputs/one-axis-input/#value">`Value`</a> | `float`. The axis this frame. Live data: what a one-axis action's callback gets. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/one-axis-input/#oneaxisinput">`OneAxisInput(InputSource source, int axisId, float? value = null)`</a> | A one-axis input, at the value, or 0. |

### TwoAxesInput members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/input-binder-glossary/inputs/two-axes-input/#axesid">`AxesId`</a> | Read-only `int`. Which pair of axes of its source. Part of the identity. |
| <a class="ref prop" href="/docs/input-binder-glossary/inputs/two-axes-input/#value">`Value`</a> | `Vector2`, of `System.Numerics`. The axes this frame. Live data: what a two-axes action's callback gets. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/two-axes-input/#twoaxesinput">`TwoAxesInput(InputSource source, int axesId, Vector2? value = null)`</a> | A two-axes input, at the value, or zero. |

## Equality

Two inputs are equal when their identities are: the same source, shape, id and modifier. Their live data and
representation don't count, so the input polled this frame equals the one bound last week:

```csharp
var bound = InputFactory.Key(32);
var polled = InputFactory.Key(32, ButtonState.Pressed);
polled.PlayerNumber = 1;

Console.WriteLine(bound == polled);                                               // True: the same key
Console.WriteLine(bound == InputFactory.Key(32, modifier: ButtonModifier.Shift)); // False: Shift+Space is another input
Console.WriteLine(bound == InputFactory.GamePadButton(32));                       // False: another source
```

`==`, `!=`, <a class="ref method" href="/docs/input-binder-glossary/inputs/base-input/#equals">`Equals`</a> and <a class="ref method" href="/docs/input-binder-glossary/inputs/base-input/#gethashcode">`GetHashCode`</a> all compare that way, and the identity never changes, so an input can
be a dictionary key, such as for a table of input names. The shapes are told apart too: a button never equals an
axis.

### BaseInput members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#source">`Source`</a> | Read-only <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/">`InputSource`</a>. Which kind of device. Part of the identity. |
| <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#playernumber">`PlayerNumber`</a> | `int`. Which player the input is from this frame. Live data: every callback gets it. 0 at first. |
| <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#representation">`Representation`</a> | Init-only `object`. Anything the game shows the input with. Not part of the identity. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/base-input/#equals">`Equals(BaseInput other)`</a> | True for an input with the same identity. `Equals(object)` is the same. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/base-input/#equality-operators">`operator ==(BaseInput left, BaseInput right)`</a> | True when both have the same identity, or both are `null`. `!=` is its opposite. |
| <a class="ref method" href="/docs/input-binder-glossary/inputs/base-input/#gethashcode">`GetHashCode()`</a> | A hash of the identity, the same for equal inputs. |

## Showing an input to the player

A settings menu shows each binding as something the player recognises: "Space", "Left mouse button", a picture of the
A button. Two ways to get there:

- **A table of the game's own**, from identity to name. Since inputs are equal by identity, a dictionary keyed by input
  works, and it also names the inputs of bindings loaded from a save:

  ```csharp
  private static readonly Dictionary<BaseInput, string> InputNames = new()
  {
      [InputFactory.Key((int)Keys.Space)] = "Space",
      [InputFactory.MouseButton((int)MouseButtonTypes.Left)] = "Left mouse button",
      [InputFactory.GamePadButton((int)GamePadButtonTypes.A)] = "A",
  };
  ```

- **The input's <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#representation">`Representation`</a>**, any object set when it is made. The factories don't take one, so
  make the input with its constructor:

  ```csharp
  var space = new ButtonInput(InputSource.Keyboard, (int)Keys.Space) { Representation = _icons.SpaceBar };
  ```

  The binding keeps the object it was given, so the representation is there when the menu reads
  <a class="ref prop" href="/docs/input-binder-glossary/binder/registered-action-handle/#inputs">`Inputs`</a> back.

<a class="ref" href="/docs/input-binder-glossary/inputs/base-input/">`BaseInput`</a> can't be derived from outside the library: the three input classes are the only ones.
