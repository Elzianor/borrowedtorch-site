---
layout: docs
title: "Glossary: InputType"
description: "The values of InputType."
---

The three shapes of actions and inputs.

An enum, in the namespace `BorrowedTorch.InputBinding.Types`. The <a class="ref prop" href="/docs/input-binder-glossary/binder/registered-action-handle/#type">`Type`</a> of a handle. An input is bound to an action of its own shape only, or the bind returns `TypesMismatch`. The [actions page](/docs/input-binder-actions/#inputtype) shows it in context.

## Values

<h3 id="button"><code>Button</code> <a class="ctx" href="/docs/input-binder-actions/#inputtype" title="Button in context on the actions page" aria-label="Button in context on the actions page">→</a></h3>

A <a class="ref" href="/docs/input-binder-glossary/actions/button-action/">`ButtonAction`</a>, driven by <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a>s: keys, mouse, pad and MIDI buttons.

<h3 id="oneaxis"><code>OneAxis</code> <a class="ctx" href="/docs/input-binder-actions/#inputtype" title="OneAxis in context on the actions page" aria-label="OneAxis in context on the actions page">→</a></h3>

A <a class="ref" href="/docs/input-binder-glossary/actions/one-axis-action/">`OneAxisAction`</a>, driven by <a class="ref" href="/docs/input-binder-glossary/inputs/one-axis-input/">`OneAxisInput`</a>s: a `float`, such as a trigger or a wheel.

<h3 id="twoaxes"><code>TwoAxes</code> <a class="ctx" href="/docs/input-binder-actions/#inputtype" title="TwoAxes in context on the actions page" aria-label="TwoAxes in context on the actions page">→</a></h3>

A <a class="ref" href="/docs/input-binder-glossary/actions/two-axes-action/">`TwoAxesAction`</a>, driven by <a class="ref" href="/docs/input-binder-glossary/inputs/two-axes-input/">`TwoAxesInput`</a>s: a `Vector2`, such as a stick or the mouse's movement.
