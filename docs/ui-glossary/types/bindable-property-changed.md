---
layout: docs
title: "Glossary: Bindable.PropertyChanged"
description: "The signature of Bindable.PropertyChanged and the events it handles."
---

A delegate: the handler type of an event.

Signature: `void PropertyChanged(string propertyName)`

| Parameter | Type | Description |
| --- | --- | --- |
| `propertyName` | `string` | The name of the property that changed; empty or `null` means every property changed. |

Handles [`Bindable.OnPropertyChanged`](/docs/ui-glossary/types/bindable/#onpropertychanged).
