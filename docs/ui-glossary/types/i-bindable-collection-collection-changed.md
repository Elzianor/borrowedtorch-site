---
layout: docs
title: "Glossary: IBindableCollection.CollectionChanged"
description: "The signature of IBindableCollection.CollectionChanged and the events it handles."
---

A delegate: the handler type of an event.

Signature: `void CollectionChanged(bool isItemsAdded, int startIndex, int count)`

| Parameter | Type | Description |
| --- | --- | --- |
| `isItemsAdded` | `bool` | `true` when items were added, `false` when they were removed. |
| `startIndex` | `int` | The index of the first item added or removed. |
| `count` | `int` | The number of items added or removed. |

Handles [`BindableCollection.OnCollectionChanged`](/docs/ui-glossary/types/bindable-collection/#oncollectionchanged), [`IBindableCollection.OnCollectionChanged`](/docs/ui-glossary/types/i-bindable-collection/#oncollectionchanged).
