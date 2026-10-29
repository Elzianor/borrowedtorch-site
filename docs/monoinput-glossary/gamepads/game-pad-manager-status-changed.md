---
layout: docs
title: "Glossary: GamePadManager.StatusChanged"
description: "The signature of GamePadManager.StatusChanged and the event it handles."
---

A delegate nested in <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-manager/">`GamePadManager`</a>: the handler type of an event.

Signature: <code>void StatusChanged(PlayerIndex playerIndex)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `playerIndex` | `PlayerIndex` | The player slot of the pad that changed. |

Handles [`GamePadManager.OnStatusChanged`](/docs/monoinput-glossary/gamepads/game-pad-manager/#onstatuschanged).
