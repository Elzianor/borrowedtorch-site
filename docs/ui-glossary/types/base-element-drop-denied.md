---
layout: docs
title: "Glossary: BaseElement.DropDenied"
description: "The signature of BaseElement.DropDenied and the events it handles."
---

A delegate: the handler type of an event.

Signature: <code>void DropDenied(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> draggedElement, <a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> dragAndDropDestination)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `draggedElement` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The dragged element. |
| `dragAndDropDestination` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element it was released over. |

Handles [`BaseElement.OnDropDenied`](/docs/ui-glossary/elements/base-element/#ondropdenied).
