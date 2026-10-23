---
layout: docs
title: "Glossary: BaseElement.StateChanged"
description: "The signature of BaseElement.StateChanged and the events it handles."
---

A delegate: the handler type of an event.

Signature: <code>void StateChanged(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/element-state-data/">ElementStateData</a> e)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element that raised the event. |
| `e` | <a class="ref" href="/docs/ui-glossary/types/element-state-data/">`ElementStateData`</a> | The new state and where it comes from. |

Handles [`BaseElement.OnStateChanged`](/docs/ui-glossary/elements/base-element/#onstatechanged).
