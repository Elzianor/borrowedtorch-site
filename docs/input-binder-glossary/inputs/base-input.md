---
layout: docs
legend: [prop, method]
title: "Glossary: BaseInput"
description: "The members of BaseInput, in alphabetical order."
---

The base of the three inputs: a physical control, with its identity and its live data.

An abstract class, in the namespace `BorrowedTorch.InputBinding.Types.Inputs.Base`. It implements `IEquatable<BaseInput>`. <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a>, <a class="ref" href="/docs/input-binder-glossary/inputs/one-axis-input/">`OneAxisInput`</a> and <a class="ref" href="/docs/input-binder-glossary/inputs/two-axes-input/">`TwoAxesInput`</a> derive from it, and they are the only ones: a class outside the library can't derive from it. An input's identity, its source, shape, id and modifier, is fixed when it is made, and is all that equality and bindings compare; its live data can be set every frame. The [inputs page](/docs/input-binder-inputs/#baseinput-members) shows it in context, with a picture.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="playernumber"><span class="prop"><code>PlayerNumber</code></span> <a class="ctx" href="/docs/input-binder-inputs/#baseinput-members" title="PlayerNumber in context on the inputs page" aria-label="PlayerNumber in context on the inputs page">→</a></h3>

`int` · Which player the input is from this frame: every action's callback gets it. 0 at first. Live data, not part of the identity, so one binding serves every player.

<h3 id="representation"><span class="prop"><code>Representation</code></span> <a class="ctx" href="/docs/input-binder-inputs/#showing-an-input-to-the-player" title="Representation in context on the inputs page" aria-label="Representation in context on the inputs page">→</a></h3>

`object` · Init-only. Anything the game shows the input with, such as an icon. `null` by default. Not part of the identity; the binder never reads it.

<h3 id="source"><span class="prop"><code>Source</code></span> <a class="ctx" href="/docs/input-binder-inputs/#baseinput-members" title="Source in context on the inputs page" aria-label="Source in context on the inputs page">→</a></h3>

<a class="ref" href="/docs/input-binder-glossary/inputs/input-source/">`InputSource`</a> · Read-only. Which kind of device the input is on. Part of the identity.

## Methods

<h3 id="equality-operators"><span class="method"><code>==()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#baseinput-members" title="==() in context on the inputs page" aria-label="==() in context on the inputs page">→</a></h3>

<code>operator ==(<a href="/docs/input-binder-glossary/inputs/base-input/">BaseInput</a> left, <a href="/docs/input-binder-glossary/inputs/base-input/">BaseInput</a> right)</code> · True when both have the same identity, or both are `null`. `!=` is its opposite, and <a class="ref method" href="/docs/input-binder-glossary/inputs/base-input/#equals">`Equals`</a> compares the same way.

| Parameter | Type | Description |
| --- | --- | --- |
| `left` | <a class="ref" href="/docs/input-binder-glossary/inputs/base-input/">`BaseInput`</a> | The first input. |
| `right` | <a class="ref" href="/docs/input-binder-glossary/inputs/base-input/">`BaseInput`</a> | The second input. |

<h3 id="equals"><span class="method"><code>Equals()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#baseinput-members" title="Equals() in context on the inputs page" aria-label="Equals() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/base-input/#equals">`Equals(BaseInput other)`</a> · True for an input with the same identity: source, shape, id and modifier. The live data and the representation don't count.

| Parameter | Type | Description |
| --- | --- | --- |
| `other` | <a class="ref" href="/docs/input-binder-glossary/inputs/base-input/">`BaseInput`</a> | The input to compare with. `null` gives `false`. |

<a class="ref method" href="/docs/input-binder-glossary/inputs/base-input/#equals">`Equals(object obj)`</a> · The same, for an object: `false` for anything that isn't an input.

| Parameter | Type | Description |
| --- | --- | --- |
| `obj` | `object` | The object to compare with. |

<h3 id="gethashcode"><span class="method"><code>GetHashCode()</code></span> <a class="ctx" href="/docs/input-binder-inputs/#baseinput-members" title="GetHashCode() in context on the inputs page" aria-label="GetHashCode() in context on the inputs page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/inputs/base-input/#gethashcode">`GetHashCode()`</a> · A hash of the identity, the same for equal inputs, so an input can be a dictionary key.
