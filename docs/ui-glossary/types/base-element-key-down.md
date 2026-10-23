---
layout: docs
title: "Glossary: BaseElement.KeyDown"
description: "The signature of BaseElement.KeyDown and the events it handles."
---

A delegate: the handler type of an event.

Signature: <code>void KeyDown(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/key-down-event-args/">KeyDownEventArgs</a> e)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element that raised the event. |
| `e` | <a class="ref" href="/docs/ui-glossary/types/key-down-event-args/">`KeyDownEventArgs`</a> | The pressed key. Set `e.Handled` so the element's parents don't get it. |

Handles [`BaseElement.OnKeyDown`](/docs/ui-glossary/elements/base-element/#onkeydown).
