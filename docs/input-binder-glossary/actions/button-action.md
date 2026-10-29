---
layout: docs
legend: [method]
title: "Glossary: ButtonAction"
description: "The methods of ButtonAction, in alphabetical order."
---

An action driven by buttons, for jumping, firing or opening a menu.

A class, in the namespace `BorrowedTorch.InputBinding.Types.Actions`. It derives from <a class="ref" href="/docs/input-binder-glossary/actions/base-action/">`BaseAction`</a>, and has its <a class="ref prop" href="/docs/input-binder-glossary/actions/base-action/#name">`Name`</a>, <a class="ref prop" href="/docs/input-binder-glossary/actions/base-action/#description">`Description`</a> and <a class="ref prop" href="/docs/input-binder-glossary/actions/base-action/#representation">`Representation`</a>. Only a <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a> can be bound to it. <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registerbuttonaction">`RegisterButtonAction`</a> makes and registers one in a call; this class is for actions built ahead, registered with <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registeraction">`RegisterAction`</a>. The [actions page](/docs/input-binder-actions/#action-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>.

## Methods

<h3 id="buttonaction"><span class="method"><code>ButtonAction()</code></span> <a class="ctx" href="/docs/input-binder-actions/#action-members" title="ButtonAction() in context on the actions page" aria-label="ButtonAction() in context on the actions page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/actions/button-action/#buttonaction">`ButtonAction(string name, Action<ButtonState, int> action)`</a> · An action that calls the callback with the <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a> and the player number of each bound input passed to <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#update">`Update`</a>. Throws `ArgumentNullException` for a `null` name and `ArgumentException` for an empty one. Set <a class="ref prop" href="/docs/input-binder-glossary/actions/base-action/#description">`Description`</a> and <a class="ref prop" href="/docs/input-binder-glossary/actions/base-action/#representation">`Representation`</a> in an initializer.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The action's name, unique in the binder it is registered in. |
| `action` | `Action<ButtonState, int>` | The callback. May be `null`: the action then does nothing. |
