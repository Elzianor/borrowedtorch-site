---
layout: docs
title: "Glossary: InputBinderResult"
description: "The values of InputBinderResult."
---

Why a bind succeeded or didn't.

An enum, in the namespace `BorrowedTorch.InputBinding.Types`. The <a class="ref prop" href="/docs/input-binder-glossary/binder/bind-result/#result">`Result`</a> of a <a class="ref" href="/docs/input-binder-glossary/binder/bind-result/">`BindResult`</a>. A bind that fails for several reasons reports the first, in the order below. The [binding page](/docs/input-binder-binding/#inputbinderresult) shows it in context.

## Values

<h3 id="none"><code>None</code> <a class="ctx" href="/docs/input-binder-binding/#inputbinderresult" title="None in context on the binding page" aria-label="None in context on the binding page">→</a></h3>

No result: the value of a `BindResult` no bind returned, such as a `default` one. A bind never returns it, and it isn't `Success`.

<h3 id="success"><code>Success</code> <a class="ctx" href="/docs/input-binder-binding/#inputbinderresult" title="Success in context on the binding page" aria-label="Success in context on the binding page">→</a></h3>

Bound. The input runs the action from the next update.

<h3 id="inputnull"><code>InputNull</code> <a class="ctx" href="/docs/input-binder-binding/#inputbinderresult" title="InputNull in context on the binding page" aria-label="InputNull in context on the binding page">→</a></h3>

The input was `null`. To empty a slot, use [`Unbind`](/docs/input-binder-glossary/binder/registered-action-handle/#unbind).

<h3 id="actionnull"><code>ActionNull</code> <a class="ctx" href="/docs/input-binder-binding/#inputbinderresult" title="ActionNull in context on the binding page" aria-label="ActionNull in context on the binding page">→</a></h3>

There was no action. A handle always has one, so binding through it never returns this.

<h3 id="indexoutsideofrange"><code>IndexOutsideOfRange</code> <a class="ctx" href="/docs/input-binder-binding/#inputbinderresult" title="IndexOutsideOfRange in context on the binding page" aria-label="IndexOutsideOfRange in context on the binding page">→</a></h3>

The slot is below 0, or not below <a class="ref prop" href="/docs/input-binder-glossary/binder/input-binder/#inputbindingsperaction">`InputBindingsPerAction`</a>.

<h3 id="typesmismatch"><code>TypesMismatch</code> <a class="ctx" href="/docs/input-binder-binding/#inputbinderresult" title="TypesMismatch in context on the binding page" aria-label="TypesMismatch in context on the binding page">→</a></h3>

The input's shape isn't the action's <a class="ref" href="/docs/input-binder-glossary/actions/input-type/">`InputType`</a>: a key for a stick's action, say.

<h3 id="inputboundtootheraction"><code>InputBoundToOtherAction</code> <a class="ctx" href="/docs/input-binder-binding/#inputbinderresult" title="InputBoundToOtherAction in context on the binding page" aria-label="InputBoundToOtherAction in context on the binding page">→</a></h3>

Another action has the input, and the bind wasn't forced. <a class="ref prop" href="/docs/input-binder-glossary/binder/bind-result/#conflictingactionhandle">`ConflictingActionHandle`</a> says which.

<h3 id="actionnotregistered"><code>ActionNotRegistered</code> <a class="ctx" href="/docs/input-binder-binding/#inputbinderresult" title="ActionNotRegistered in context on the binding page" aria-label="ActionNotRegistered in context on the binding page">→</a></h3>

The handle's action was unregistered.
