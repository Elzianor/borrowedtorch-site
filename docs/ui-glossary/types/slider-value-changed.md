---
layout: docs
title: "Glossary: Slider.ValueChanged"
description: "The signature of Slider.ValueChanged and the events it handles."
---

A delegate: the handler type of an event.

Signature: <code>void ValueChanged(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, float value)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element that raised the event. |
| `value` | `float` | The new value, already clamped and snapped. |

Handles [`Slider.OnValueChanged`](/docs/ui-glossary/elements/slider/#onvaluechanged).
