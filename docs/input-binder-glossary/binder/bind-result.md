---
layout: docs
legend: [prop]
title: "Glossary: BindResult"
description: "The properties of BindResult, in alphabetical order."
---

What a bind returns: whether the input was bound and, on a conflict, which action has it.

A readonly struct, in the namespace `BorrowedTorch.InputBinding.Types.Results`. It has no public constructor: <a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#bind">`Bind`</a> returns one. A `default` one reads `InputBinderResult.None`, never `Success`. The [binding page](/docs/input-binder-binding/#bindresult-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>.

## Properties

<h3 id="conflictingactionhandle"><span class="prop"><code>ConflictingActionHandle</code></span> <a class="ctx" href="/docs/input-binder-binding/#bindresult-properties" title="ConflictingActionHandle in context on the binding page" aria-label="ConflictingActionHandle in context on the binding page">→</a></h3>

<a class="ref" href="/docs/input-binder-glossary/binder/registered-action-handle/">`RegisteredActionHandle`</a> · Read-only. For `InputBoundToOtherAction`, the handle of the action that has the input, to name it to the player; `null` for any other result.

<h3 id="result"><span class="prop"><code>Result</code></span> <a class="ctx" href="/docs/input-binder-binding/#bindresult-properties" title="Result in context on the binding page" aria-label="Result in context on the binding page">→</a></h3>

<a class="ref" href="/docs/input-binder-glossary/binder/input-binder-result/">`InputBinderResult`</a> · Read-only. `Success`, or the first reason the input couldn't be bound.

<h3 id="success"><span class="prop"><code>Success</code></span> <a class="ctx" href="/docs/input-binder-binding/#bindresult-properties" title="Success in context on the binding page" aria-label="Success in context on the binding page">→</a></h3>

`bool` · Read-only. <a class="ref prop" href="/docs/input-binder-glossary/binder/bind-result/#result">`Result`</a> is `Success`: the input is bound.
