---
layout: docs
legend: [prop, method]
title: "Glossary: TwoAxesInput"
description: "The members of TwoAxesInput, in alphabetical order."
---

A pair of axes, such as a stick or the mouse's movement, with its value this frame.

A class, in the namespace `BorrowedTorch.InputBinding.Types.Inputs`. It derives from <a class="ref" href="/docs/input-binder-glossary/inputs/base-input/">`BaseInput`</a>. Its identity is its <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#source">`Source`</a> and <a class="ref prop" href="/docs/input-binder-glossary/inputs/two-axes-input/#axesid">`AxesId`</a>. The binder passes its value on as it is, with no range or dead zone of its own. The [inputs page](/docs/input-binder-inputs/#twoaxesinput-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="axesid"><span class="prop"><code>AxesId</code></span> <a class="ctx" href="/docs/input-binder-inputs/#twoaxesinput-members" title="AxesId in context on the inputs page" aria-label="AxesId in context on the inputs page">→</a></h3>

`int` · Read-only. Which pair of axes of its source, in a numbering the game chooses. Part of the identity.

<h3 id="value"><span class="prop"><code>Value</code></span> <a class="ctx" href="/docs/input-binder-inputs/#twoaxesinput-members" title="Value in context on the inputs page" aria-label="Value in context on the inputs page">→</a></h3>

`Vector2`, of `System.Numerics` · The pair of axes this frame, zero at first unless the constructor was given one. Live data: what a two-axes action's callback gets. The game sets it before each update.

## Methods

<h3 id="twoaxesinput"><span class="method"><code>TwoAxesInput()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#twoaxesinput-members" title="TwoAxesInput() in context on the inputs page" aria-label="TwoAxesInput() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/two-axes-input/#twoaxesinput">`TwoAxesInput(InputSource source, int axesId, Vector2? value = null)`</a> · A two-axes input, at the value, or zero.

| Parameter | Type | Description |
| --- | --- | --- |
| `source` | <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/">`InputSource`</a> | Which kind of device. |
| `axesId` | `int` | Which pair of axes of the source. |
| `value` | `Vector2?` | The value to start at. Default: `null`, for zero. |
