---
layout: docs
legend: [prop, method]
title: "Glossary: InputBinder"
description: "The members of InputBinder, in alphabetical order."
---

Holds a game's actions and the inputs bound to them, and runs the bound actions for the inputs polled each frame.

A class, in the namespace `BorrowedTorch.InputBinding`. Registering an action returns a <a class="ref" href="/docs/input-binder-glossary/binder/registered-action-handle/">`RegisteredActionHandle`</a>, which binds its inputs. The binder keeps one input on one action at most, and isn't thread-safe: use it from the game's thread. The [actions page](/docs/input-binder-actions/) and the [binding page](/docs/input-binder-binding/) show it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="actions"><span class="prop"><code>Actions</code></span> <a class="ctx" href="/docs/input-binder-actions/#inputbinder-lookup-members" title="Actions in context on the actions page" aria-label="Actions in context on the actions page">→</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/input-binder-glossary/binder/registered-action-handle/">RegisteredActionHandle</a>&gt;</code> · Read-only. The handle of every registered action, in the order they were registered: the order a settings menu lists them in. A live view: it follows registrations and unregistrations, and can't be changed through a cast.

<h3 id="inputbindingsperaction"><span class="prop"><code>InputBindingsPerAction</code></span> <a class="ctx" href="/docs/input-binder-binding/#inputbinder-slot-members" title="InputBindingsPerAction in context on the binding page" aria-label="InputBindingsPerAction in context on the binding page">→</a></h3>

`int` · Read-only. The number of slots of every action, set by the constructor: how many inputs an action can have bound at once.

## Methods

<h3 id="inputbinder"><span class="method"><code>InputBinder()</code></span> <a class="ctx" href="/docs/input-binder-binding/#inputbinder-slot-members" title="InputBinder() in context on the binding page" aria-label="InputBinder() in context on the binding page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#inputbinder">`InputBinder(int inputBindingsPerAction = 2)`</a> · A binder with no actions, whose actions will have that many slots each. Throws `ArgumentOutOfRangeException` below 1.

| Parameter | Type | Description |
| --- | --- | --- |
| `inputBindingsPerAction` | `int` | The number of slots per action: the columns of a settings menu. Default: `2`. |

<h3 id="getaction"><span class="method"><code>GetAction()</code></span> <a class="ctx" href="/docs/input-binder-actions/#inputbinder-lookup-members" title="GetAction() in context on the actions page" aria-label="GetAction() in context on the actions page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#getaction">`GetAction(string actionName)`</a> · The <a class="ref" href="/docs/input-binder-glossary/binder/registered-action-handle/">`RegisteredActionHandle`</a> of the action of that name, or `null` when there is none, the name `null` included.

| Parameter | Type | Description |
| --- | --- | --- |
| `actionName` | `string` | The action's name, compared exactly. |

<h3 id="registeraction"><span class="method"><code>RegisterAction()</code></span> <a class="ctx" href="/docs/input-binder-actions/#inputbinder-registration-methods" title="RegisterAction() in context on the actions page" aria-label="RegisterAction() in context on the actions page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registeraction">`RegisterAction(BaseAction action)`</a> · Registers an action built ahead, such as a <a class="ref" href="/docs/input-binder-glossary/actions/button-action/">`ButtonAction`</a>, with every slot empty, and returns its handle. Throws `ArgumentNullException` for `null`, and `InvalidOperationException` when an action of that name is registered, the same action object included.

| Parameter | Type | Description |
| --- | --- | --- |
| `action` | <a class="ref" href="/docs/input-binder-glossary/actions/base-action/">`BaseAction`</a> | The action. Registering it again after it was unregistered wakes its old handles. |

<h3 id="registeractionrange"><span class="method"><code>RegisterActionRange()</code></span> <a class="ctx" href="/docs/input-binder-actions/#inputbinder-registration-methods" title="RegisterActionRange() in context on the actions page" aria-label="RegisterActionRange() in context on the actions page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registeractionrange">`RegisterActionRange(params BaseAction[] actions)`</a> · Registers the actions in order, as <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registeraction">`RegisterAction`</a> does, and returns their handles in the same order, as an <code>IReadOnlyList&lt;<a href="/docs/input-binder-glossary/binder/registered-action-handle/">RegisteredActionHandle</a>&gt;</code>. Stops at the first action that throws: those before it stay registered. Throws `ArgumentNullException` for a `null` array.

| Parameter | Type | Description |
| --- | --- | --- |
| `actions` | <code><a href="/docs/input-binder-glossary/actions/base-action/">BaseAction</a>[]</code> | The actions, in the order to register them. |

<h3 id="registerbuttonaction"><span class="method"><code>RegisterButtonAction()</code></span> <a class="ctx" href="/docs/input-binder-actions/#inputbinder-registration-methods" title="RegisterButtonAction() in context on the actions page" aria-label="RegisterButtonAction() in context on the actions page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registerbuttonaction">`RegisterButtonAction(string name, Action<ButtonState, int> callback, string description = null, object representation = null)`</a> · Registers a <a class="ref" href="/docs/input-binder-glossary/actions/button-action/">`ButtonAction`</a> with every slot empty, and returns its handle. Throws `ArgumentNullException` for a `null` name, `ArgumentException` for an empty one, and `InvalidOperationException` when an action of that name is registered.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The action's name, unique in the binder. |
| `callback` | `Action<ButtonState, int>` | Called with the <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a> and the player number of each bound input passed to <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#update">`Update`</a>. May be `null`: the action then does nothing. |
| `description` | `string` | Text for the settings menu. Default: `null`. |
| `representation` | `object` | Anything the game shows the action with. Default: `null`. |

<h3 id="registeroneaxisaction"><span class="method"><code>RegisterOneAxisAction()</code></span> <a class="ctx" href="/docs/input-binder-actions/#inputbinder-registration-methods" title="RegisterOneAxisAction() in context on the actions page" aria-label="RegisterOneAxisAction() in context on the actions page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registeroneaxisaction">`RegisterOneAxisAction(string name, Action<float, int> callback, string description = null, object representation = null)`</a> · Registers a <a class="ref" href="/docs/input-binder-glossary/actions/one-axis-action/">`OneAxisAction`</a> with every slot empty, and returns its handle. Throws as <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registerbuttonaction">`RegisterButtonAction`</a> does.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The action's name, unique in the binder. |
| `callback` | `Action<float, int>` | Called with the value and the player number of each bound input passed to `Update`. May be `null`. |
| `description` | `string` | Text for the settings menu. Default: `null`. |
| `representation` | `object` | Anything the game shows the action with. Default: `null`. |

<h3 id="registertwoaxesaction"><span class="method"><code>RegisterTwoAxesAction()</code></span> <a class="ctx" href="/docs/input-binder-actions/#inputbinder-registration-methods" title="RegisterTwoAxesAction() in context on the actions page" aria-label="RegisterTwoAxesAction() in context on the actions page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registertwoaxesaction">`RegisterTwoAxesAction(string name, Action<Vector2, int> callback, string description = null, object representation = null)`</a> · Registers a <a class="ref" href="/docs/input-binder-glossary/actions/two-axes-action/">`TwoAxesAction`</a> with every slot empty, and returns its handle. Throws as <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registerbuttonaction">`RegisterButtonAction`</a> does.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The action's name, unique in the binder. |
| `callback` | `Action<Vector2, int>` | Called with the value, a `System.Numerics.Vector2`, and the player number of each bound input passed to `Update`. May be `null`. |
| `description` | `string` | Text for the settings menu. Default: `null`. |
| `representation` | `object` | Anything the game shows the action with. Default: `null`. |

<h3 id="unregisteraction"><span class="method"><code>UnregisterAction()</code></span> <a class="ctx" href="/docs/input-binder-actions/#inputbinder-unregistration-methods" title="UnregisterAction() in context on the actions page" aria-label="UnregisterAction() in context on the actions page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#unregisteraction">`UnregisterAction(string actionName)`</a> · Removes the action of that name and releases its inputs, which other actions can then be given. Returns `false` when there is no such action, the name `null` included. The action's handles go inert.

| Parameter | Type | Description |
| --- | --- | --- |
| `actionName` | `string` | The action's name. |

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#unregisteraction">`UnregisterAction(RegisteredActionHandle actionHandle)`</a> · Removes the action the handle was issued for and releases its inputs. Returns `false` for `null`, or when that action isn't registered: a stale handle never removes a later action registered under its name.

| Parameter | Type | Description |
| --- | --- | --- |
| `actionHandle` | <a class="ref" href="/docs/input-binder-glossary/binder/registered-action-handle/">`RegisteredActionHandle`</a> | A handle of the action. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/input-binder-update/#inputbinder-update-method" title="Update() in context on the updating page" aria-label="Update() in context on the updating page">→</a></h3>

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#update">`Update(IReadOnlyList<ButtonInput> buttonInputs, IReadOnlyList<OneAxisInput> oneAxisInputs, IReadOnlyList<TwoAxesInput> twoAxesInputs, bool withShift, bool withCtrl, bool withAlt)`</a> · For each input of the three lists, in that order, finds the binding with the same identity and calls its action with the input's state or value and <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#playernumber">`PlayerNumber`</a>. An input bound to nothing is skipped, and every input passed calls its action, whatever its state. A key polled without a modifier goes to the binding of the held modifiers first, see the [modifier keys page](/docs/input-binder-modifiers/). The callbacks run inside the call. Allocates nothing.

| Parameter | Type | Description |
| --- | --- | --- |
| `buttonInputs` | <code>IReadOnlyList&lt;<a href="/docs/input-binder-glossary/inputs/button-input/">ButtonInput</a>&gt;</code> | The buttons polled this frame, or `null`. |
| `oneAxisInputs` | <code>IReadOnlyList&lt;<a href="/docs/input-binder-glossary/inputs/one-axis-input/">OneAxisInput</a>&gt;</code> | The single axes polled this frame, or `null`. |
| `twoAxesInputs` | <code>IReadOnlyList&lt;<a href="/docs/input-binder-glossary/inputs/two-axes-input/">TwoAxesInput</a>&gt;</code> | The pairs of axes polled this frame, or `null`. |
| `withShift` | `bool` | Shift is held. |
| `withCtrl` | `bool` | Ctrl is held. |
| `withAlt` | `bool` | Alt is held. |
