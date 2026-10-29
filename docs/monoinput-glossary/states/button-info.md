---
layout: docs
legend: [prop]
title: "Glossary: ButtonInfo"
description: "The properties of ButtonInfo, in alphabetical order."
---

One button of a set that never changes, a mouse or a pad button: its state and the five checks that read it.

An abstract class, in the namespace `BorrowedTorch.MonoInput.Inputs`. <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> and <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a> derive from it. The managers create every button once and change its state in place at each update, so a reference to a button stays good for the whole run. The [button states page](/docs/monoinput-states/#buttoninfo-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>.

## Properties

<h3 id="active"><span class="prop"><code>Active</code></span> <a class="ctx" href="/docs/monoinput-states/#buttoninfo-properties" title="Active in context on the button states page" aria-label="Active in context on the button states page">→</a></h3>

`bool` · Read-only. Anything but `Idle`: pressed, held or just let go.

<h3 id="down"><span class="prop"><code>Down</code></span> <a class="ctx" href="/docs/monoinput-states/#buttoninfo-properties" title="Down in context on the button states page" aria-label="Down in context on the button states page">→</a></h3>

`bool` · Read-only. Held: `Pressed` or `Down`. True every update the button is held, the first one included, as in MonoGame's own `IsKeyDown`.

<h3 id="idle"><span class="prop"><code>Idle</code></span> <a class="ctx" href="/docs/monoinput-states/#buttoninfo-properties" title="Idle in context on the button states page" aria-label="Idle in context on the button states page">→</a></h3>

`bool` · Read-only. `Idle`: not touched.

<h3 id="pressed"><span class="prop"><code>Pressed</code></span> <a class="ctx" href="/docs/monoinput-states/#buttoninfo-properties" title="Pressed in context on the button states page" aria-label="Pressed in context on the button states page">→</a></h3>

`bool` · Read-only. `Pressed`: true for the first update the button is held, only.

<h3 id="state"><span class="prop"><code>State</code></span> <a class="ctx" href="/docs/monoinput-states/#buttoninfo-properties" title="State in context on the button states page" aria-label="State in context on the button states page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a> · Read-only. Where the button is. `Idle` at first; it moves one step at each update of its manager.

<h3 id="up"><span class="prop"><code>Up</code></span> <a class="ctx" href="/docs/monoinput-states/#buttoninfo-properties" title="Up in context on the button states page" aria-label="Up in context on the button states page">→</a></h3>

`bool` · Read-only. `Up`: true for the update the button was let go, only.
