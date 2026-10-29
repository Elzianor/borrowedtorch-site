---
layout: docs
legend: [prop, method, event]
title: "Glossary: GamePadManager"
description: "The members of GamePadManager, in alphabetical order."
---

Reads the four player slots at every update, raises an event for each pad that changed, and sets their vibration.

A static class, in the namespace `BorrowedTorch.MonoInput.Inputs.GamePad`. It holds one <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-status/">`GamePadStatus`</a> per player slot for the whole run, connected or not. The [gamepads page](/docs/monoinput-gamepads/#gamepadmanager-methods) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="gamepadsstatus"><span class="prop"><code>GamePadsStatus</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadmanager-properties" title="GamePadsStatus in context on the gamepads page" aria-label="GamePadsStatus in context on the gamepads page">→</a></h3>

<code>ImmutableArray&lt;<a href="/docs/monoinput-glossary/gamepads/game-pad-status/">GamePadStatus</a>&gt;</code> · Static, read-only. The four player slots, indexed by `(int)PlayerIndex`. Each status is the same object for the whole run.

## Methods

<h3 id="setvibration"><span class="method"><code>SetVibration()</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadmanager-methods" title="SetVibration() in context on the gamepads page" aria-label="SetVibration() in context on the gamepads page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#setvibration">`SetVibration(PlayerIndex index, float lowFreqMotor, float highFreqMotor)`</a> · Static. Sets the speed of a pad's two vibration motors, through MonoGame's `GamePad.SetVibration`. They keep that speed until the next call: set both to 0 to stop them. Does nothing for a pad that isn't connected or can't vibrate.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `PlayerIndex` | The player slot of the pad. |
| `lowFreqMotor` | `float` | The low-frequency motor, the left one on most pads: 0 stops it, 1 is full speed. |
| `highFreqMotor` | `float` | The high-frequency motor, the right one on most pads: 0 to 1. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadmanager-methods" title="Update() in context on the gamepads page" aria-label="Update() in context on the gamepads page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#update">`Update()`</a> · Static. Reads the four slots with `GamePad.GetState` and a circular dead zone, moves their buttons one step, and raises <a class="ref event" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#onstatuschanged">`OnStatusChanged`</a> for each pad that changed. Call it once per frame, before anything reads a pad.

## Events

<h3 id="onstatuschanged"><span class="event"><code>OnStatusChanged</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadmanager-events" title="OnStatusChanged in context on the gamepads page" aria-label="OnStatusChanged in context on the gamepads page">→</a></h3>

<code>(PlayerIndex playerIndex)</code> · Static. Something about a pad changed at an update: it connected or disconnected, a button changed state at any step, or a stick or a trigger moved. Raised at most once per pad per update, slot One first.

| Parameter | Type | Description |
| --- | --- | --- |
| `playerIndex` | `PlayerIndex` | The slot of the pad: index <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#gamepadsstatus">`GamePadsStatus`</a> with it. |
