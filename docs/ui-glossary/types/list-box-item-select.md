---
layout: docs
title: "Glossary: ListBox.ItemSelect"
description: "The signature of ListBox.ItemSelect and the events it handles."
---

A delegate: the handler type of an event.

Signature: <code>void ItemSelect(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a> item)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The list box, or the combo box whose drop-down list it is. |
| `item` | <a class="ref" href="/docs/ui-glossary/elements/list-box-item/">`ListBoxItem`</a> | The primary selected row, or `null` when nothing is selected any more. |

Handles [`ComboBox.OnItemSelect`](/docs/ui-glossary/elements/combo-box/#onitemselect), [`ListBox.OnItemSelect`](/docs/ui-glossary/elements/list-box/#onitemselect).
