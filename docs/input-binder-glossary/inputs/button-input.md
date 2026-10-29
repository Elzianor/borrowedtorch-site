---
layout: docs
legend: [prop, method]
title: "Glossary: ButtonInput"
description: "The members of ButtonInput, in alphabetical order."
---

A button: a key, a mouse or pad button, or a MIDI note, with its state this frame.

A class, in the namespace `BorrowedTorch.InputBinding.Types.Inputs`. It derives from <a class="ref" href="/docs/input-binder-glossary/inputs/base-input/">`BaseInput`</a>. Its identity is its <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#source">`Source`</a>, <a class="ref prop" href="/docs/input-binder-glossary/inputs/button-input/#buttonid">`ButtonId`</a> and <a class="ref prop" href="/docs/input-binder-glossary/inputs/button-input/#modifier">`Modifier`</a>. The factories of <a class="ref" href="/docs/input-binder-glossary/inputs/input-factory/">`InputFactory`</a> make one in fewer characters. The [inputs page](/docs/input-binder-inputs/#buttoninput-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="buttonid"><span class="prop"><code>ButtonId</code></span> <a class="ctx" href="/docs/input-binder-inputs/#buttoninput-members" title="ButtonId in context on the inputs page" aria-label="ButtonId in context on the inputs page">→</a></h3>

`int` · Read-only. Which button of its source, in a numbering the game chooses, such as MonoGame's `Keys` values for keys. Part of the identity.

<h3 id="modifier"><span class="prop"><code>Modifier</code></span> <a class="ctx" href="/docs/input-binder-inputs/#buttoninput-members" title="Modifier in context on the inputs page" aria-label="Modifier in context on the inputs page">→</a></h3>

<a class="ref" href="/docs/input-binder-glossary/inputs/button-modifier/">`ButtonModifier`</a> · Read-only. For a key, `Shift`, `Ctrl` or `Alt` held with it, or `None`; always `None` off the keyboard. Part of the identity: Ctrl+S isn't S. See the [modifier keys page](/docs/input-binder-modifiers/).

<h3 id="state"><span class="prop"><code>State</code></span> <a class="ctx" href="/docs/input-binder-inputs/#buttoninput-members" title="State in context on the inputs page" aria-label="State in context on the inputs page">→</a></h3>

<a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a> · Where the button is this frame, `None` at first. Live data: what a button action's callback gets. The game sets it before each update.

## Methods

<h3 id="buttoninput"><span class="method"><code>ButtonInput()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#buttoninput-members" title="ButtonInput() in context on the inputs page" aria-label="ButtonInput() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/button-input/#buttoninput">`ButtonInput(InputSource source, int buttonId, ButtonModifier modifier = ButtonModifier.None)`</a> · A button input, `None`. A modifier given off the keyboard is dropped.

| Parameter | Type | Description |
| --- | --- | --- |
| `source` | <a class="ref" href="/docs/input-binder-glossary/inputs/input-source/">`InputSource`</a> | Which kind of device. |
| `buttonId` | `int` | Which button of the source. |
| `modifier` | <a class="ref" href="/docs/input-binder-glossary/inputs/button-modifier/">`ButtonModifier`</a> | For a key, the modifier held with it. Default: `None`. |
