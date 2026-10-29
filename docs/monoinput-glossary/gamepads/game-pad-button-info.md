---
layout: docs
legend: [prop, method]
title: "Glossary: GamePadButtonInfo"
description: "The members of GamePadButtonInfo, in alphabetical order."
---

One pad button: which one, and its state.

A class, in the namespace `BorrowedTorch.MonoInput.Inputs.GamePad`. `GamePadButtonInfo` derives from [`ButtonInfo`](/docs/monoinput-glossary/states/button-info/) and has its members too: the state and the five checks. Each <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-status/">`GamePadStatus`</a> holds fifteen. The [gamepads page](/docs/monoinput-gamepads/#gamepadbuttoninfo-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="type"><span class="prop"><code>Type</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadbuttoninfo-members" title="Type in context on the gamepads page" aria-label="Type in context on the gamepads page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/">`GamePadButtonTypes`</a> · Read-only. Which button it is.

## Methods

<h3 id="gamepadbuttoninfo"><span class="method"><code>GamePadButtonInfo()</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadbuttoninfo-members" title="GamePadButtonInfo() in context on the gamepads page" aria-label="GamePadButtonInfo() in context on the gamepads page">→</a></h3>

<span class="method"><code><a href="/docs/monoinput-glossary/gamepads/game-pad-button-info/#gamepadbuttoninfo">GamePadButtonInfo</a>(<a href="/docs/monoinput-glossary/gamepads/game-pad-button-types/">GamePadButtonTypes</a> type)</code></span> · A button of the type, `Idle`. A pad status makes its own fifteen; one you create is never updated.

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-types/">`GamePadButtonTypes`</a> | Which button it is. |

<h3 id="tostring"><span class="method"><code>ToString()</code></span> <a class="ctx" href="/docs/monoinput-gamepads/#gamepadbuttoninfo-members" title="ToString() in context on the gamepads page" aria-label="ToString() in context on the gamepads page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/#tostring">`ToString()`</a> · The type and the state, such as `A | Down`.
