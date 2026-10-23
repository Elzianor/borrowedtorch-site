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

<a class="ref method" href="/docs/ui-glossary/types/bindable/#propertychangedinvoke">`PropertyChangedInvoke(string propertyName)`</a> · Protected. Raises <a class="ref event" href="/docs/ui-glossary/types/bindable/#onpropertychanged">`OnPropertyChanged`</a>; call it from a property setter with `nameof` the property.

## Events

<h3 id="onpropertychanged"><span class="event"><code>OnPropertyChanged</code></span> <a class="ctx" href="/docs/ui-styles/#bindable" title="OnPropertyChanged in context on the styles page" aria-label="OnPropertyChanged in context on the styles page">🠆</a></h3>

`(string propertyName)` · The view model calls <a class="ref method" href="/docs/ui-glossary/types/bindable/#propertychangedinvoke">`PropertyChangedInvoke`</a>. An empty name means every property changed.
