---
layout: docs
title: "Glossary: ContextMenu.ItemSelect"
description: "The signature of ContextMenu.ItemSelect and the events it handles."
---

A delegate: the handler type of an event.

Signature: <code>void ItemSelect(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/elements/context-menu-item/">ContextMenuItem</a> item)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The menu the item is in: the element's menu or one of its sub-menus. |
| `item` | <a class="ref" href="/docs/ui-glossary/elements/context-menu-item/">`ContextMenuItem`</a> | The chosen item. |

Handles [`ContextMenu.OnItemSelect`](/docs/ui-glossary/elements/context-menu/#onitemselect).
