---
layout: docs
title: "Glossary: DependencyProperty&lt;T&gt;.PreActionDelegate"
description: "The signature of DependencyProperty<T>.PreActionDelegate and the events it handles."
---

A delegate: the handler type of an event.

Signature: `void PreActionDelegate(ref T value, ref bool canProceed)`

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `ref T` | The value about to be stored; change it to store another one. |
| `canProceed` | `ref bool` | Set it to `false` to reject the value: nothing is stored. |
