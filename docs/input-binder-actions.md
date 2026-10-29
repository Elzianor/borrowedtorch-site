---
layout: docs
legend: [prop, method]
title: "Input binder: actions"
description: The three shapes of action, registering them with a callback, actions built ahead, names, descriptions and pictures, and finding and unregistering actions.
---

An action is something the game can do, under a name the player sees in the settings menu: "Jump", "Fire", "Look".
The binder holds the game's actions, each with the callback that does it, and the inputs bound to it run that callback.
Names are colored by what they are: a <span class="kb kb-prop">plain property</span> or a <span class="kb kb-method">method</span>.

## Three shapes

Actions and inputs come in the same three shapes, and an input is bound to an action of its own shape only: a key
can't drive a stick's action.

| Shape | Action | Its callback gets | Bound to | For |
| --- | --- | --- | --- | --- |
| Button | <a class="ref" href="/docs/input-binder-glossary/actions/button-action/">`ButtonAction`</a> | the button's <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a> and the player | a <a class="ref" href="/docs/input-binder-glossary/inputs/button-input/">`ButtonInput`</a>: a key, a mouse, pad or MIDI button | Jumping, firing, opening a menu |
| One axis | <a class="ref" href="/docs/input-binder-glossary/actions/one-axis-action/">`OneAxisAction`</a> | a `float` and the player | a <a class="ref" href="/docs/input-binder-glossary/inputs/one-axis-input/">`OneAxisInput`</a>: a trigger, a wheel, a MIDI knob | Throttle, zoom, a volume knob |
| Two axes | <a class="ref" href="/docs/input-binder-glossary/actions/two-axes-action/">`TwoAxesAction`</a> | a `Vector2` and the player | a <a class="ref" href="/docs/input-binder-glossary/inputs/two-axes-input/">`TwoAxesInput`</a>: a stick, the mouse's movement | Walking, aiming, looking around |

A handle tells the shape of its action with <a class="ref prop" href="/docs/input-binder-glossary/binder/registered-action-handle/#type">`Type`</a>, an <a class="ref" href="/docs/input-binder-glossary/actions/input-type/">`InputType`</a>, so a settings menu can offer
only the inputs that fit.

#### `InputType`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/input-binder-glossary/actions/input-type/#button">`Button`</a> | A button action, or a button input. |
| <a class="ref" href="/docs/input-binder-glossary/actions/input-type/#oneaxis">`OneAxis`</a> | A one-axis action, or a one-axis input: a `float`. |
| <a class="ref" href="/docs/input-binder-glossary/actions/input-type/#twoaxes">`TwoAxes`</a> | A two-axes action, or a two-axes input: a `Vector2`. |

## Registering an action

The binder's register methods create an action, register it and return its <a class="ref" href="/docs/input-binder-glossary/binder/registered-action-handle/">`RegisteredActionHandle`</a>, one method per
shape:

```csharp
var binder = new InputBinder();

var jump = binder.RegisterButtonAction("Jump",
                                       (state, player) => { if (state == ButtonState.Pressed) Jump(player); },
                                       description: "Jump over a gap");

var throttle = binder.RegisterOneAxisAction("Throttle", (value, player) => _ships[player].Throttle = value);

var move = binder.RegisterTwoAxesAction("Move", (direction, player) => _heroes[player].Walk(direction));
```

The name is the action's key: no two registered actions share one, and the binder throws
`InvalidOperationException` for a name already registered. Names are compared exactly, so "jump" and "Jump" are two
actions. An action is registered with no inputs bound: chain
<a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#withdefaultbinding">`WithDefaultBinding`</a> to give it some, see [default bindings](/docs/input-binder-binding/#default-bindings).

Register the actions once, at startup, before the settings menu lists them or saved bindings are loaded onto them.

### InputBinder registration methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registerbuttonaction">`RegisterButtonAction(string name, Action<ButtonState, int> callback, string description = null, object representation = null)`</a> | Registers a button action and returns its handle. |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registeroneaxisaction">`RegisterOneAxisAction(string name, Action<float, int> callback, string description = null, object representation = null)`</a> | Registers a one-axis action and returns its handle. |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registertwoaxesaction">`RegisterTwoAxesAction(string name, Action<Vector2, int> callback, string description = null, object representation = null)`</a> | Registers a two-axes action and returns its handle. |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registeraction">`RegisterAction(BaseAction action)`</a> | Registers an action built ahead, see [below](#actions-built-ahead), and returns its handle. |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registeractionrange">`RegisterActionRange(params BaseAction[] actions)`</a> | Registers several, in order, and returns their handles in that order. |

Each throws `ArgumentNullException` for a `null` name or action, `ArgumentException` for an empty name, and
`InvalidOperationException` for a name already registered.

## Callbacks

The binder calls an action's callback from inside <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#update">`Update`</a>, once for each input bound to it that the game
passed, with that input's live data: a button's state, an axis's value, and the player number of the input.

| Action | Callback | Called with |
| --- | --- | --- |
| <a class="ref" href="/docs/input-binder-glossary/actions/button-action/">`ButtonAction`</a> | `Action<ButtonState, int>` | The input's <a class="ref prop" href="/docs/input-binder-glossary/inputs/button-input/#state">`State`</a> and <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#playernumber">`PlayerNumber`</a>. |
| <a class="ref" href="/docs/input-binder-glossary/actions/one-axis-action/">`OneAxisAction`</a> | `Action<float, int>` | The input's <a class="ref prop" href="/docs/input-binder-glossary/inputs/one-axis-input/#value">`Value`</a> and <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#playernumber">`PlayerNumber`</a>. |
| <a class="ref" href="/docs/input-binder-glossary/actions/two-axes-action/">`TwoAxesAction`</a> | `Action<Vector2, int>` | The input's <a class="ref prop" href="/docs/input-binder-glossary/inputs/two-axes-input/#value">`Value`</a> and <a class="ref prop" href="/docs/input-binder-glossary/inputs/base-input/#playernumber">`PlayerNumber`</a>. |

A button callback is called with every state the game passes, not only presses, so it picks the ones it acts on:

```csharp
binder.RegisterButtonAction("Charge shot", (state, player) =>
{
    switch (state)
    {
        case ButtonState.Pressed: _guns[player].StartCharging(); break; // once, the first frame
        case ButtonState.Down: _guns[player].Charge(); break;           // every frame it is held
        case ButtonState.Up: _guns[player].Release(); break;            // once, the frame it is let go
    }
});
```

`ButtonState.None` reaches the callback only for an idle input the game passed anyway; see
[which inputs to pass](/docs/input-binder-update/#which-inputs-to-pass). An action with two inputs bound, Space and W,
is called once for each of them the game passes, so holding both at once calls it twice per frame.

The `Vector2` is the one of `System.Numerics`. MonoGame 3.8.2 and later converts it to its own `Vector2` without a
cast, and back with `ToNumerics()`.

A callback may be `null`: the action is listed and bound like any other and does nothing, a placeholder for a feature
still to come.

## Actions built ahead

An action can also be built on its own and registered later, for example from a list kept per game mode. Its
description and representation are set in an initializer:

```csharp
BaseAction[] driving =
[
    new OneAxisAction("Steer", (value, player) => _cars[player].Steer(value)) { Description = "Turn the wheel" },
    new ButtonAction("Horn", (state, player) => { if (state == ButtonState.Pressed) _cars[player].Honk(); }),
];

var handles = binder.RegisterActionRange(driving);
handles[0].WithDefaultBinding(0, InputFactory.GamePadAxis(0));
```

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registeractionrange">`RegisterActionRange`</a> registers the actions one by one and stops at the first that throws: those before it
stay registered. An action object is one action: registered under its name, it can't be registered a second time in
the same binder.

The three action classes are the only ones: <a class="ref" href="/docs/input-binder-glossary/actions/base-action/">`BaseAction`</a> can't be derived from outside the library, since the binder
calls actions through an internal method.

### Action members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/input-binder-glossary/actions/base-action/#name">`BaseAction.Name`</a> | Read-only `string`. The action's name, never `null` or empty. |
| <a class="ref prop" href="/docs/input-binder-glossary/actions/base-action/#description">`BaseAction.Description`</a> | Init-only `string`. Text for the settings menu. The binder never reads it. |
| <a class="ref prop" href="/docs/input-binder-glossary/actions/base-action/#representation">`BaseAction.Representation`</a> | Init-only `object`. Anything the game shows the action with. The binder never reads it. |
| <a class="ref method" href="/docs/input-binder-glossary/actions/button-action/#buttonaction">`ButtonAction(string name, Action<ButtonState, int> action)`</a> | A button action. Throws for a `null` or empty name. |
| <a class="ref method" href="/docs/input-binder-glossary/actions/one-axis-action/#oneaxisaction">`OneAxisAction(string name, Action<float, int> action)`</a> | A one-axis action. Throws for a `null` or empty name. |
| <a class="ref method" href="/docs/input-binder-glossary/actions/two-axes-action/#twoaxesaction">`TwoAxesAction(string name, Action<Vector2, int> action)`</a> | A two-axes action. Throws for a `null` or empty name. |

## Names, descriptions and pictures

An action carries three things for the settings menu, and the binder uses only the first:

- **The name** identifies the action: <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#getaction">`GetAction`</a> and <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#unregisteraction">`UnregisterAction`</a> take it, and saved bindings are
  best stored under it. Keep it the same from version to version, and show the player a translated text instead.
- **The description** is a line of text, such as "Jump over a gap", or a key into the game's translations.
- **The representation** is any object: an icon, a sprite, a record of your own. The binder keeps it and hands it back.

## Finding an action

<a class="ref prop" href="/docs/input-binder-glossary/binder/input-binder/#actions">`Actions`</a> lists the handles of every registered action in the order they were registered, the order a settings
menu shows them in; <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#getaction">`GetAction`</a> finds one by its name:

```csharp
foreach (var action in binder.Actions)
    Console.WriteLine($"{action.Name} ({action.Type}): {action.Description}");

var jump = binder.GetAction("Jump"); // null when there is no such action
```

`Actions` is a live, read-only view: it follows registrations and unregistrations, and can't be changed through a
cast. An action unregistered leaves it, and the others keep their order.

### InputBinder lookup members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/input-binder-glossary/binder/input-binder/#actions">`Actions`</a> | Read-only <code>IReadOnlyList&lt;<a href="/docs/input-binder-glossary/binder/registered-action-handle/">RegisteredActionHandle</a>&gt;</code>. Every registered action, in registration order. A live view. |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#getaction">`GetAction(string actionName)`</a> | The handle of the action of that name, or `null` when there is none, the name `null` included. |

### RegisteredActionHandle properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/input-binder-glossary/binder/registered-action-handle/#name">`Name`</a> | `string` | Read-only. The action's name. |
| <a class="ref prop" href="/docs/input-binder-glossary/binder/registered-action-handle/#description">`Description`</a> | `string` | Read-only. The action's description, or `null`. |
| <a class="ref prop" href="/docs/input-binder-glossary/binder/registered-action-handle/#representation">`Representation`</a> | `object` | Read-only. The action's representation, or `null`. |
| <a class="ref prop" href="/docs/input-binder-glossary/binder/registered-action-handle/#type">`Type`</a> | <a class="ref" href="/docs/input-binder-glossary/actions/input-type/">`InputType`</a> | Read-only. The action's shape. |

The handle's bindings, <a class="ref prop" href="/docs/input-binder-glossary/binder/registered-action-handle/#inputs">`Inputs`</a> and its methods, are on the
[binding page](/docs/input-binder-binding/#registeredactionhandle-binding-members).

## Unregistering

<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#unregisteraction">`UnregisterAction`</a> removes an action, by its name or by its handle, and releases its inputs: they can be bound
to other actions straight away. It returns `false` when there was nothing to remove.

```csharp
binder.UnregisterAction("Horn");
binder.UnregisterAction(handles[0]); // Steer, by the handle RegisterActionRange returned
```

A handle outlives its action, and goes inert once the action is unregistered:
<a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#bind">`Bind`</a> returns `ActionNotRegistered`, <a class="ref prop" href="/docs/input-binder-glossary/binder/registered-action-handle/#inputs">`Inputs`</a> is empty, <a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#getinput">`GetInput`</a> returns `null` and
<a class="ref method" href="/docs/input-binder-glossary/binder/registered-action-handle/#unbind">`Unbind`</a> `false`. It never reaches a later action registered under the same name, so a handle kept by a menu
can't unregister or rebind the action that replaced its own. Only registering the same action object again, with
<a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#registeraction">`RegisterAction`</a>, wakes its old handles, onto the new, empty slots.

### InputBinder unregistration methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#unregisteraction">`UnregisterAction(string actionName)`</a> | Removes the action of that name and releases its inputs. `false` when there is none, the name `null` included. |
| <a class="ref method" href="/docs/input-binder-glossary/binder/input-binder/#unregisteraction">`UnregisterAction(RegisteredActionHandle actionHandle)`</a> | Removes the action the handle was issued for, and releases its inputs. `false` for `null`, or when that action isn't registered, even if another action has its name. |
