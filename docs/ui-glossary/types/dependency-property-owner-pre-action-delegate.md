---
layout: docs
title: "Glossary: DependencyProperty&lt;T&gt;.OwnerPreActionDelegate"
description: "The signature of DependencyProperty<T>.OwnerPreActionDelegate and the events it handles."
---

A delegate: the handler type of an event.

Signature: <code>void OwnerPreActionDelegate(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> owner, ref T value, ref bool canProceed, <a href="/docs/ui-glossary/types/value-sources/">ValueSources</a> valueSource)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `owner` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element the property belongs to. |
| `value` | `ref T` | The value about to be stored; change it to store another one. |
| `canProceed` | `ref bool` | Set it to `false` to reject the value: nothing is stored. |
| `valueSource` | <a class="ref" href="/docs/ui-glossary/types/value-sources/">`ValueSources`</a> | The source the value is for. |
