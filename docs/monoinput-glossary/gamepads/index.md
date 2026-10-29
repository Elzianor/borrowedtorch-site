---
layout: docs
title: "MonoInput glossary: gamepads"
description: "The gamepad manager, the status of a player slot, a pad button, the names of the buttons and the handler of the status event, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each class under its name. An enum's page lists its values, and a delegate's page its signature.

| Type | What it is |
| --- | --- |
| [`GamePadManager`](/docs/monoinput-glossary/gamepads/game-pad-manager/) | Reads the four player slots at every update, raises an event for each pad that changed, and sets their vibration. |
| [`GamePadStatus`](/docs/monoinput-glossary/gamepads/game-pad-status/) | One player slot: whether a pad is connected, its fifteen buttons, both sticks and both triggers, with how far each moved since the update before. |
| [`GamePadButtonInfo`](/docs/monoinput-glossary/gamepads/game-pad-button-info/) | One pad button: which one, and its state. |
| [`GamePadButtonTypes`](/docs/monoinput-glossary/gamepads/game-pad-button-types/) | Names the fifteen pad buttons. |
| [`GamePadManager.StatusChanged`](/docs/monoinput-glossary/gamepads/game-pad-manager-status-changed/) | The handler of <a class="ref event" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#onstatuschanged">`GamePadManager.OnStatusChanged`</a>. |
