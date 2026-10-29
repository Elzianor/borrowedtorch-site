---
layout: docs
legend: [prop, method]
title: "Glossary: OneAxisInput"
description: "The members of OneAxisInput, in alphabetical order."
---

A single axis, such as a trigger, a wheel or a knob, with its value this frame.

A class, in the namespace `BorrowedTorch.InputBinding.Types.Inputs`. It derives from <a class="ref" href="/docs/input-binder-glossary/inputs/base-input/">`BaseInput`</a>. Its identity is its <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#source">`Source`</a> and <a class="ref prop" href="/docs/input-binder-glossary/inputs/one-axis-input/#axisid">`AxisId`</a>. The binder passes its value on as it is, with no range or dead zone of its own. The [inputs page](/docs/input-binder-inputs/#oneaxisinput-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="axisid"><span class="prop"><code>AxisId</code></span> <a class="ctx" href="/docs/input-binder-inputs/#oneaxisinput-members" title="AxisId in context on the inputs page" aria-label="AxisId in context on the inputs page">→</a></h3>

`int` · Read-only. Which axis of its source, in a numbering the game chooses. Part of the identity.

<h3 id="value"><span class="prop"><code>Value</code></span> <a class="ctx" href="/docs/input-binder-inputs/#oneaxisinput-members" title="Value in context on the inputs page" aria-label="Value in context on the inputs page">→</a></h3>

`float` · The axis this frame, 0 at first unless the constructor was given one. Live data: what a one-axis action's callback gets. The game sets it before each update.

## Methods

<h3 id="oneaxisinput"><span class="method"><code>OneAxisInput()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#oneaxisinput-members" title="OneAxisInput() in context on the inputs page" aria-label="OneAxisInput() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/one-axis-input/#oneaxisinput">`OneAxisInput(InputSource source, int axisId, float? value = null)`</a> · A one-axis input, at the value, or 0.

| Parameter | Type | Description |
| --- | --- | --- |
| `source` | <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/">`InputSource`</a> | Which kind of device. |
| `axisId` | `int` | Which axis of the source. |
| `value` | `float?` | The value to start at. Default: `null`, for 0. |
