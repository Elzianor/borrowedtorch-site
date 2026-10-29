---
layout: docs
title: "Glossary: ButtonState"
description: "The values of ButtonState."
---

The four states of a button, as the game polls them.

An enum, in the namespace `BorrowedTorch.InputBinding.Types`. The <a class="ref prop" href="/docs/input-binder-glossary/inputs/button-input/#state">`State`</a> of a button input, and what a button action's callback gets. The binder doesn't work states out: it passes on what the game polled. They are [MonoInput's four states](/docs/monoinput-states/#the-four-states), with `None` for its `Idle`. The [inputs page](/docs/input-binder-inputs/#buttonstate) shows it in context.

## Values

<h3 id="none"><code>None</code> <a class="ctx" href="/docs/input-binder-inputs/#buttonstate" title="None in context on the inputs page" aria-label="None in context on the inputs page">→</a></h3>

Not touched. A new input starts with it. A callback gets it only for an idle button the game passed anyway.

<h3 id="pressed"><code>Pressed</code> <a class="ctx" href="/docs/input-binder-inputs/#buttonstate" title="Pressed in context on the inputs page" aria-label="Pressed in context on the inputs page">→</a></h3>

Just went down: the first frame the button is held. A key's binding among its modifiers is chosen at this state, see the [modifier keys page](/docs/input-binder-modifiers/#a-press-keeps-its-binding).

<h3 id="down"><code>Down</code> <a class="ctx" href="/docs/input-binder-inputs/#buttonstate" title="Down in context on the inputs page" aria-label="Down in context on the inputs page">→</a></h3>

Still held, from the second frame on.

<h3 id="up"><code>Up</code> <a class="ctx" href="/docs/input-binder-inputs/#buttonstate" title="Up in context on the inputs page" aria-label="Up in context on the inputs page">→</a></h3>

Just let go: the frame after the last one it was held.
