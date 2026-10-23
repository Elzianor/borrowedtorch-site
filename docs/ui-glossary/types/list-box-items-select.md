---
layout: docs
legend: [prop]
title: "Glossary: ListBox.ItemsSelect"
description: "The signature of ListBox.ItemsSelect and the events it handles."
---

A delegate: the handler type of an event.

Signature: <code>void ItemsSelect(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a>&gt; items)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element that raised the event. |
| `items` | <code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a>&gt;</code> | The selected rows that have an element (<a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selecteditems">`SelectedItems`</a>). |

Handles [`ListBox.OnItemsSelect`](/docs/ui-glossary/elements/list-box/#onitemsselect).
