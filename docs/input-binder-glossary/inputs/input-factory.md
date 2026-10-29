---
layout: docs
legend: [method]
title: "Glossary: InputFactory"
description: "The methods of InputFactory, in alphabetical order."
---

Makes inputs in a few characters, to bind or to poll.

A static class, in the namespace `BorrowedTorch.InputBinding.Factories`. Each method is short for a constructor: `InputFactory.Key(32)` is `new ButtonInput(InputSource.Keyboard, 32)`. The state or value only matters to a polled input, since a binding matches on identity alone. None of them takes a <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#representation">`Representation`</a>: for one, use the constructor with an initializer. The [inputs page](/docs/input-binder-inputs/#inputfactory-methods) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>.

## Methods

<h3 id="axes"><span class="method"><code>Axes()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="Axes() in context on the inputs page" aria-label="Axes() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#axes">`Axes(InputSource source, int axesId, Vector2? value = null)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/two-axes-input/">`TwoAxesInput`</a> on any source.

| Parameter | Type | Description |
| --- | --- | --- |
| `source` | <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/">`InputSource`</a> | Which kind of device. |
| `axesId` | `int` | Which pair of axes. |
| `value` | `Vector2?` | The value, for a polled input. Default: `null`, for zero. |

<h3 id="axis"><span class="method"><code>Axis()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="Axis() in context on the inputs page" aria-label="Axis() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#axis">`Axis(InputSource source, int axisId, float? value = null)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/one-axis-input/">`OneAxisInput`</a> on any source.

| Parameter | Type | Description |
| --- | --- | --- |
| `source` | <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/">`InputSource`</a> | Which kind of device. |
| `axisId` | `int` | Which axis. |
| `value` | `float?` | The value, for a polled input. Default: `null`, for 0. |

<h3 id="button"><span class="method"><code>Button()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="Button() in context on the inputs page" aria-label="Button() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#button">`Button(InputSource source, int buttonId, ButtonState state = ButtonState.None, ButtonModifier modifier = ButtonModifier.None)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a> on any source. The modifier is kept for the keyboard only.

| Parameter | Type | Description |
| --- | --- | --- |
| `source` | <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/">`InputSource`</a> | Which kind of device. |
| `buttonId` | `int` | Which button. |
| `state` | <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a> | The state, for a polled input. Default: `None`. |
| `modifier` | <a class="ref" href="/docs/input-binder-glossary/inputs/button-modifier/">`ButtonModifier`</a> | For a key, the modifier held with it. Default: `None`. |

<h3 id="gamepadaxes"><span class="method"><code>GamePadAxes()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="GamePadAxes() in context on the inputs page" aria-label="GamePadAxes() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#gamepadaxes">`GamePadAxes(int axesId, Vector2? value = null)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/two-axes-input/">`TwoAxesInput`</a> on a pad, such as a stick.

| Parameter | Type | Description |
| --- | --- | --- |
| `axesId` | `int` | Which pair of axes, such as 0 for the left stick. |
| `value` | `Vector2?` | The value, for a polled input. Default: `null`, for zero. |

<h3 id="gamepadaxis"><span class="method"><code>GamePadAxis()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="GamePadAxis() in context on the inputs page" aria-label="GamePadAxis() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#gamepadaxis">`GamePadAxis(int axisId, float? value = null)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/one-axis-input/">`OneAxisInput`</a> on a pad, such as a trigger.

| Parameter | Type | Description |
| --- | --- | --- |
| `axisId` | `int` | Which axis, such as 0 for the left trigger. |
| `value` | `float?` | The value, for a polled input. Default: `null`, for 0. |

<h3 id="gamepadbutton"><span class="method"><code>GamePadButton()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="GamePadButton() in context on the inputs page" aria-label="GamePadButton() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#gamepadbutton">`GamePadButton(int button, ButtonState state = ButtonState.None)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a> on a pad.

| Parameter | Type | Description |
| --- | --- | --- |
| `button` | `int` | Which button, such as `(int)GamePadButtonTypes.A` with MonoInput. |
| `state` | <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a> | The state, for a polled input. Default: `None`. |

<h3 id="key"><span class="method"><code>Key()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="Key() in context on the inputs page" aria-label="Key() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#key">`Key(int keyCode, ButtonState state = ButtonState.None, ButtonModifier modifier = ButtonModifier.None)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a> on the keyboard. Pass the modifier by name, `modifier: ButtonModifier.Ctrl`, since the second parameter is the state.

| Parameter | Type | Description |
| --- | --- | --- |
| `keyCode` | `int` | Which key, such as `(int)Keys.Space` with MonoGame. |
| `state` | <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a> | The state, for a polled input. Default: `None`. |
| `modifier` | <a class="ref" href="/docs/input-binder-glossary/inputs/button-modifier/">`ButtonModifier`</a> | The modifier held with the key, for a binding such as Ctrl+S. Default: `None`. |

<h3 id="midiaxis"><span class="method"><code>MidiAxis()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="MidiAxis() in context on the inputs page" aria-label="MidiAxis() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#midiaxis">`MidiAxis(int axisId, float? value = null)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/one-axis-input/">`OneAxisInput`</a> on a MIDI device, such as a knob.

| Parameter | Type | Description |
| --- | --- | --- |
| `axisId` | `int` | Which axis, such as the controller number. |
| `value` | `float?` | The value, for a polled input. Default: `null`, for 0. |

<h3 id="midibutton"><span class="method"><code>MidiButton()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="MidiButton() in context on the inputs page" aria-label="MidiButton() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#midibutton">`MidiButton(int note, ButtonState state = ButtonState.None)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a> on a MIDI device: a note.

| Parameter | Type | Description |
| --- | --- | --- |
| `note` | `int` | The note number, 0 to 127. |
| `state` | <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a> | The state, for a polled input. Default: `None`. |

<h3 id="mouseaxes"><span class="method"><code>MouseAxes()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="MouseAxes() in context on the inputs page" aria-label="MouseAxes() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#mouseaxes">`MouseAxes(int axesId, Vector2? value = null)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/two-axes-input/">`TwoAxesInput`</a> on the mouse, such as its movement.

| Parameter | Type | Description |
| --- | --- | --- |
| `axesId` | `int` | Which pair of axes. |
| `value` | `Vector2?` | The value, for a polled input. Default: `null`, for zero. |

<h3 id="mouseaxis"><span class="method"><code>MouseAxis()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="MouseAxis() in context on the inputs page" aria-label="MouseAxis() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#mouseaxis">`MouseAxis(int axisId, float? value = null)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/one-axis-input/">`OneAxisInput`</a> on the mouse, such as the wheel.

| Parameter | Type | Description |
| --- | --- | --- |
| `axisId` | `int` | Which axis. |
| `value` | `float?` | The value, for a polled input. Default: `null`, for 0. |

<h3 id="mousebutton"><span class="method"><code>MouseButton()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#inputfactory-methods" title="MouseButton() in context on the inputs page" aria-label="MouseButton() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/input-factory/#mousebutton">`MouseButton(int button, ButtonState state = ButtonState.None)`</a> · Static. A <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a> on the mouse.

| Parameter | Type | Description |
| --- | --- | --- |
| `button` | `int` | Which button, such as `(int)MouseButtonTypes.Left` with MonoInput. |
| `state` | <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a> | The state, for a polled input. Default: `None`. |
