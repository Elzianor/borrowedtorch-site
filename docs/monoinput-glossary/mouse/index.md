---
layout: docs
title: "MonoInput glossary: mouse"
description: "The mouse manager, the mouse status, its buttons, snapshots of them, and the handlers of the mouse events, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each class under its name. An enum's page lists its values, and a delegate's page its signature.

| Type | What it is |
| --- | --- |
| [`MouseManager`](/docs/monoinput-glossary/mouse/mouse-manager/) | Reads the mouse at every update, its five buttons, the pointer and both wheels, with events for what changed. |
| [`MouseStatus`](/docs/monoinput-glossary/mouse/mouse-status/) | The mouse as of the last update: five buttons, the pointer and how far it moved, two wheels and how far they turned. |
| [`MouseButtonInfo`](/docs/monoinput-glossary/mouse/mouse-button-info/) | One mouse button: which one, and its state. |
| [`MouseButtonsStates`](/docs/monoinput-glossary/mouse/mouse-buttons-states/) | The states of the five mouse buttons at one moment, compared with `==`: what <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onbuttonsstateschanged">`OnButtonsStatesChanged`</a> hands its handlers. |
| [`MouseButtonTypes`](/docs/monoinput-glossary/mouse/mouse-button-types/) | Names the five mouse buttons. |
| [`MouseManager.ButtonsStatesChanged`](/docs/monoinput-glossary/mouse/mouse-manager-buttons-states-changed/) | The handler of <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onbuttonsstateschanged">`MouseManager.OnButtonsStatesChanged`</a>. |
| [`MouseManager.HorizontalWheelDeltaChanged`](/docs/monoinput-glossary/mouse/mouse-manager-horizontal-wheel-delta-changed/) | The handler of <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onhorizontalwheeldeltachanged">`MouseManager.OnHorizontalWheelDeltaChanged`</a>. |
| [`MouseManager.PositionChanged`](/docs/monoinput-glossary/mouse/mouse-manager-position-changed/) | The handler of <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onpositionchanged">`MouseManager.OnPositionChanged`</a>. |
| [`MouseManager.WheelDeltaChanged`](/docs/monoinput-glossary/mouse/mouse-manager-wheel-delta-changed/) | The handler of <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onwheeldeltachanged">`MouseManager.OnWheelDeltaChanged`</a>. |
