---
layout: docs
legend: [prop]
title: "Glossary: GamePadStatus"
description: "The properties of GamePadStatus, in alphabetical order."
---

One player slot: whether a pad is connected, its fifteen buttons, both sticks and both triggers, with how far each moved since the update before.

A class, in the namespace `BorrowedTorch.MonoInput.Inputs.GamePad`. It has no public constructor: <a class="ref prop" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#gamepadsstatus">`GamePadsStatus`</a> holds four, one per slot, for the whole run. A slot with no pad reads idle and at zero. The [gamepads page](/docs/monoinput-gamepads/#gamepadstatus-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>.

## Properties

<h3 id="a"><span class="prop"><code>A</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="A in context on the gamepads page" aria-label="A in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. The bottom face button, `A` on an Xbox layout.

<h3 id="b"><span class="prop"><code>B</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="B in context on the gamepads page" aria-label="B in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. The right face button, `B` on an Xbox layout.

<h3 id="back"><span class="prop"><code>Back</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="Back in context on the gamepads page" aria-label="Back in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. The Back or View button, left of the middle.

<h3 id="down"><span class="prop"><code>Down</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="Down in context on the gamepads page" aria-label="Down in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. Down on the D-pad.

<h3 id="home"><span class="prop"><code>Home</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="Home in context on the gamepads page" aria-label="Home in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. The guide button in the middle, MonoGame's `BigButton`. Not every platform reports it.

<h3 id="isanybuttonactive"><span class="prop"><code>IsAnyButtonActive</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-properties" title="IsAnyButtonActive in context on the gamepads page" aria-label="IsAnyButtonActive in context on the gamepads page">→</a></h3>

`bool` · Read-only. Any of the fifteen buttons is pressed, held or just let go. The triggers aren't buttons and don't count.

<h3 id="isanybuttondown"><span class="prop"><code>IsAnyButtonDown</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-properties" title="IsAnyButtonDown in context on the gamepads page" aria-label="IsAnyButtonDown in context on the gamepads page">→</a></h3>

`bool` · Read-only. Any of the fifteen buttons is held: `Pressed` or `Down`.

<h3 id="isanybuttonpressed"><span class="prop"><code>IsAnyButtonPressed</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-properties" title="IsAnyButtonPressed in context on the gamepads page" aria-label="IsAnyButtonPressed in context on the gamepads page">→</a></h3>

`bool` · Read-only. Any of the fifteen buttons went down at the last update.

<h3 id="isanybuttonup"><span class="prop"><code>IsAnyButtonUp</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-properties" title="IsAnyButtonUp in context on the gamepads page" aria-label="IsAnyButtonUp in context on the gamepads page">→</a></h3>

`bool` · Read-only. Any of the fifteen buttons was let go at the last update.

<h3 id="isconnected"><span class="prop"><code>IsConnected</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-properties" title="IsConnected in context on the gamepads page" aria-label="IsConnected in context on the gamepads page">→</a></h3>

`bool` · Read-only. A pad is connected in the slot. At the update it disconnects, its buttons go `Up` and its sticks and triggers back to zero; at the next, the buttons are `Idle`.

<h3 id="left"><span class="prop"><code>Left</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="Left in context on the gamepads page" aria-label="Left in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. Left on the D-pad.

<h3 id="leftshoulder"><span class="prop"><code>LeftShoulder</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="LeftShoulder in context on the gamepads page" aria-label="LeftShoulder in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. The left bumper, above the left trigger.

<h3 id="leftstick"><span class="prop"><code>LeftStick</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="LeftStick in context on the gamepads page" aria-label="LeftStick in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. A press on the left stick.

<h3 id="leftstickshift"><span class="prop"><code>LeftStickShift</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-stick-properties" title="LeftStickShift in context on the gamepads page" aria-label="LeftStickShift in context on the gamepads page">→</a></h3>

`Vector2` · Read-only. Where the left stick is, each axis from −1 to 1: X to the right, Y up. Exactly zero at rest, inside the circular dead zone.

<h3 id="leftstickshiftdelta"><span class="prop"><code>LeftStickShiftDelta</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-stick-properties" title="LeftStickShiftDelta in context on the gamepads page" aria-label="LeftStickShiftDelta in context on the gamepads page">→</a></h3>

`Vector2` · Read-only. How far the left stick moved since the update before.

<h3 id="lefttriggervalue"><span class="prop"><code>LeftTriggerValue</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-trigger-properties" title="LeftTriggerValue in context on the gamepads page" aria-label="LeftTriggerValue in context on the gamepads page">→</a></h3>

`float` · Read-only. How far the left trigger is pulled, from 0 to 1.

<h3 id="lefttriggervaluedelta"><span class="prop"><code>LeftTriggerValueDelta</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-trigger-properties" title="LeftTriggerValueDelta in context on the gamepads page" aria-label="LeftTriggerValueDelta in context on the gamepads page">→</a></h3>

`float` · Read-only. How far the left trigger moved since the update before: positive when pulled further.

<h3 id="playerindex"><span class="prop"><code>PlayerIndex</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-properties" title="PlayerIndex in context on the gamepads page" aria-label="PlayerIndex in context on the gamepads page">→</a></h3>

`PlayerIndex` · Read-only. The slot, from `One` to `Four`.

<h3 id="right"><span class="prop"><code>Right</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="Right in context on the gamepads page" aria-label="Right in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. Right on the D-pad.

<h3 id="rightshoulder"><span class="prop"><code>RightShoulder</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="RightShoulder in context on the gamepads page" aria-label="RightShoulder in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. The right bumper, above the right trigger.

<h3 id="rightstick"><span class="prop"><code>RightStick</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="RightStick in context on the gamepads page" aria-label="RightStick in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. A press on the right stick.

<h3 id="rightstickshift"><span class="prop"><code>RightStickShift</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-stick-properties" title="RightStickShift in context on the gamepads page" aria-label="RightStickShift in context on the gamepads page">→</a></h3>

`Vector2` · Read-only. Where the right stick is, each axis from −1 to 1: X to the right, Y up. Exactly zero at rest, inside the circular dead zone.

<h3 id="rightstickshiftdelta"><span class="prop"><code>RightStickShiftDelta</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-stick-properties" title="RightStickShiftDelta in context on the gamepads page" aria-label="RightStickShiftDelta in context on the gamepads page">→</a></h3>

`Vector2` · Read-only. How far the right stick moved since the update before.

<h3 id="righttriggervalue"><span class="prop"><code>RightTriggerValue</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-trigger-properties" title="RightTriggerValue in context on the gamepads page" aria-label="RightTriggerValue in context on the gamepads page">→</a></h3>

`float` · Read-only. How far the right trigger is pulled, from 0 to 1.

<h3 id="righttriggervaluedelta"><span class="prop"><code>RightTriggerValueDelta</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-trigger-properties" title="RightTriggerValueDelta in context on the gamepads page" aria-label="RightTriggerValueDelta in context on the gamepads page">→</a></h3>

`float` · Read-only. How far the right trigger moved since the update before: positive when pulled further.

<h3 id="start"><span class="prop"><code>Start</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="Start in context on the gamepads page" aria-label="Start in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. The Start or Menu button, right of the middle.

<h3 id="up"><span class="prop"><code>Up</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="Up in context on the gamepads page" aria-label="Up in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. Up on the D-pad.

<h3 id="x"><span class="prop"><code>X</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="X in context on the gamepads page" aria-label="X in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. The left face button, `X` on an Xbox layout.

<h3 id="y"><span class="prop"><code>Y</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadstatus-button-properties" title="Y in context on the gamepads page" aria-label="Y in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> · Read-only. The top face button, `Y` on an Xbox layout.
