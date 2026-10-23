---
layout: docs
legend: [method, event]
title: "Glossary: Bindable"
description: "The members of Bindable, in alphabetical order."
---

The abstract base of a view model.

An abstract class. The [styles page](/docs/ui-styles/#bindable) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Methods

<h3 id="propertychangedinvoke"><span class="method"><code>PropertyChangedInvoke()</code></span> <a class="ctx" href="/docs/ui-styles/#bindable" title="PropertyChangedInvoke() in context on the styles page" aria-label="PropertyChangedInvoke() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable/#propertychangedinvoke">`PropertyChangedInvoke(string propertyName = "")`</a> · Protected. Raises <a class="ref event" href="/docs/ui-glossary/types/bindable/#onpropertychanged">`OnPropertyChanged`</a>. Called from a property's setter without a name, it names that property (`[CallerMemberName]`); another property is named with `nameof`. An empty or `null` name means every property changed: <a class="ref method" href="/docs/ui-glossary/types/bindable/#propertychangedinvoke">`PropertyChangedInvoke(string.Empty)`</a> (with no argument outside a setter, it names the calling method instead).

| Parameter | Type | Description |
| --- | --- | --- |
| `propertyName` | `string` | The name of the property that changed. Left out in a property's setter, it is that property's name; empty or `null` means every property changed. Default: `""`. |

## Events

<h3 id="onpropertychanged"><span class="event"><code>OnPropertyChanged</code></span> <a class="ctx" href="/docs/ui-styles/#bindable" title="OnPropertyChanged in context on the styles page" aria-label="OnPropertyChanged in context on the styles page">🠆</a></h3>

`(string propertyName)` · The view model calls <a class="ref method" href="/docs/ui-glossary/types/bindable/#propertychangedinvoke">`PropertyChangedInvoke`</a>. The handler gets the name of the property that changed; an empty (or `null`) name means every property changed.
