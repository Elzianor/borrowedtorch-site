---
layout: docs
legend: [prop, method]
title: "Glossary: RegisteredActionHandle"
description: "The members of RegisteredActionHandle, in alphabetical order."
---

One registered action, as the game sees it: its name and shape, its bindings, and the methods that change them.

A sealed class, in the namespace `BorrowedTorch.InputBinding.Types.Handles`. It has no public constructor: the register methods of <a class="ref" href="/docs/input-binder-glossary/binder/input-binder/">`InputBinder`</a> return one. Every call goes to the binder that issued it. Once its action is unregistered it goes inert: <a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#bind">`Bind`</a> returns `ActionNotRegistered`, <a class="ref prop" href="/docs/input-binder-glossary/binder/registered-action-handle/#inputs">`Inputs`</a> is empty, and it never reaches a later action registered under the same name. The [binding page](/docs/input-binder-binding/) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="description"><span class="prop"><code>Description</code></span> <a class="ctx" href="/docs/input-binder-actions/#registeredactionhandle-properties" title="Description in context on the actions page" aria-label="Description in context on the actions page">→</a></h3>

`string` · Read-only. The action's description, or `null`.

<h3 id="inputs"><span class="prop"><code>Inputs</code></span> <a class="ctx" href="/docs/input-binder-binding/#registeredactionhandle-binding-members" title="Inputs in context on the binding page" aria-label="Inputs in context on the binding page">→</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/input-binder-glossary/inputs/base-input/">BaseInput</a>&gt;</code> · Read-only. The action's slots in order, <a class="ref prop" href="/docs/input-binder-glossary/binder/input-binder/#inputbindingsperaction">`InputBindingsPerAction`</a> of them, each the input bound there or `null`. A live view: it shows later binds, and can't be changed through a cast. Empty once the action is unregistered.

<h3 id="name"><span class="prop"><code>Name</code></span> <a class="ctx" href="/docs/input-binder-actions/#registeredactionhandle-properties" title="Name in context on the actions page" aria-label="Name in context on the actions page">→</a></h3>

`string` · Read-only. The action's name.

<h3 id="representation"><span class="prop"><code>Representation</code></span> <a class="ctx" href="/docs/input-binder-actions/#registeredactionhandle-properties" title="Representation in context on the actions page" aria-label="Representation in context on the actions page">→</a></h3>

`object` · Read-only. The action's representation, or `null`.

<h3 id="type"><span class="prop"><code>Type</code></span> <a class="ctx" href="/docs/input-binder-actions/#registeredactionhandle-properties" title="Type in context on the actions page" aria-label="Type in context on the actions page">→</a></h3>

<a class="ref" href="/docs/input-binder-glossary/actions/input-type/">`InputType`</a> · Read-only. The action's shape: only inputs of that shape can be bound to it.

## Methods

<h3 id="bind"><span class="method"><code>Bind()</code></span> <a class="ctx" href="/docs/input-binder-binding/#registeredactionhandle-binding-members" title="Bind() in context on the binding page" aria-label="Bind() in context on the binding page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#bind">`Bind(int index, BaseInput input, bool forceMap = false)`</a> · Binds the input into the slot and returns a <a class="ref" href="/docs/input-binder-glossary/binder/bind-result/">`BindResult`</a>. On success the input that was in the slot is released, and an input moved from another slot of the action leaves it. Fails, changing nothing, when the input is `null`, the slot doesn't exist, the shapes differ, the action was unregistered, or another action has the input and `forceMap` is `false`; see <a class="ref" href="/docs/input-binder-glossary/binder/input-binder-result/">`InputBinderResult`</a>. Doesn't throw.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The slot, from 0. |
| `input` | <a class="ref" href="/docs/input-binder-glossary/inputs/base-input/">`BaseInput`</a> | The input to bind. Its live data doesn't matter; the object is kept, and read back by `Inputs`. |
| `forceMap` | `bool` | Takes the input from the action that has it, emptying that action's slot. Default: `false`, which reports the conflict instead. |

<h3 id="getinput"><span class="method"><code>GetInput()</code></span> <a class="ctx" href="/docs/input-binder-binding/#registeredactionhandle-binding-members" title="GetInput() in context on the binding page" aria-label="GetInput() in context on the binding page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#getinput">`GetInput(int index)`</a> · The input bound into the slot, or `null`: for an empty slot, a slot that doesn't exist, or an unregistered action.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The slot, from 0. |

<h3 id="unbind"><span class="method"><code>Unbind()</code></span> <a class="ctx" href="/docs/input-binder-binding/#registeredactionhandle-binding-members" title="Unbind() in context on the binding page" aria-label="Unbind() in context on the binding page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#unbind">`Unbind(int index)`</a> · Empties the slot, and the input it held runs nothing from the next update. Returns `false` when the slot was already empty or doesn't exist, or the action was unregistered.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The slot, from 0. |

<h3 id="withdefaultbinding"><span class="method"><code>WithDefaultBinding()</code></span> <a class="ctx" href="/docs/input-binder-binding/#default-bindings" title="WithDefaultBinding() in context on the binding page" aria-label="WithDefaultBinding() in context on the binding page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#withdefaultbinding">`WithDefaultBinding(int index, BaseInput input)`</a> · Binds the input into the slot as <a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#bind">`Bind`</a> does without `forceMap`, and returns this handle, so the defaults chain onto the registration. Throws `ArgumentException` when the input can't be bound, naming the reason and, on a conflict, the action that has the input: two actions with the same default show at startup.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The slot, from 0. |
| `input` | <a class="ref" href="/docs/input-binder-glossary/inputs/base-input/">`BaseInput`</a> | The input to bind. |
