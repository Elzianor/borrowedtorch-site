---
layout: docs
legend: [prop]
title: "Glossary: BaseAction"
description: "The properties of BaseAction, in alphabetical order."
---

The base of the three actions: a named callback, with what a settings menu shows it with.

An abstract class, in the namespace `BorrowedTorch.InputBinding.Types.Actions.Base`. <a class="ref" href="/docs/input-binder-glossary/actions/button-action/">`ButtonAction`</a>, <a class="ref" href="/docs/input-binder-glossary/actions/one-axis-action/">`OneAxisAction`</a> and <a class="ref" href="/docs/input-binder-glossary/actions/two-axes-action/">`TwoAxesAction`</a> derive from it, and they are the only ones: the binder calls actions through an internal method, so a class outside the library can't derive from it. An action is one object: two actions with the same name are still two actions, and a binder registers one name once. The [actions page](/docs/input-binder-actions/#action-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>.

## Properties

<h3 id="description"><span class="prop"><code>Description</code></span> <a class="ctx" href="/docs/input-binder-actions/#action-members" title="Description in context on the actions page" aria-label="Description in context on the actions page">→</a></h3>

`string` · Init-only. Text for the settings menu, or a key into the game's translations. `null` by default. The binder never reads it.

<h3 id="name"><span class="prop"><code>Name</code></span> <a class="ctx" href="/docs/input-binder-actions/#action-members" title="Name in context on the actions page" aria-label="Name in context on the actions page">→</a></h3>

`string` · Read-only. The action's name, never `null` or empty: its key in a binder. Keep it the same from version to version, since saved bindings are best stored under it.

<h3 id="representation"><span class="prop"><code>Representation</code></span> <a class="ctx" href="/docs/input-binder-actions/#action-members" title="Representation in context on the actions page" aria-label="Representation in context on the actions page">→</a></h3>

`object` · Init-only. Anything the game shows the action with, such as an icon. `null` by default. The binder never reads it.
