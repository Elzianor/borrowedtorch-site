---
layout: docs
legend: [prop, method]
title: "Glossary: DependencyPropertyActions&lt;T&gt;"
description: "The members of DependencyPropertyActions<T>, in alphabetical order."
---

What the properties of one name share over all the elements of a class: the class's own pre- and post-action (set once, in its static constructor) and the default value. The generated code creates one per dependency property, as the static `FooDPActions` field of the element class.

A class. The [styles page](/docs/ui-styles/#dependencypropertyactionst) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="defaultvalue"><span class="prop"><code>DefaultValue</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyactionst" title="DefaultValue in context on the styles page" aria-label="DefaultValue in context on the styles page">🠆</a></h3>

`T` · Read-only. The value read while no source has one. Some defaults are read from <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a> each time (see [default settings](/docs/ui-styles/#default-settings)).

<h3 id="ownerpostaction"><span class="prop"><code>OwnerPostAction</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyactionst" title="OwnerPostAction in context on the styles page" aria-label="OwnerPostAction in context on the styles page">🠆</a></h3>

<code>Action&lt;BaseElement, T&gt;</code> · The element class's own reaction to a new value in effect, with the element it runs for: before the property's `PostAction` and `OnPropertyChanged`. Set once, like <a class="ref prop" href="/docs/ui-glossary/types/dependency-property-actions/#ownerpreaction">`OwnerPreAction`</a>.

<h3 id="ownerpreaction"><span class="prop"><code>OwnerPreAction</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyactionst" title="OwnerPreAction in context on the styles page" aria-label="OwnerPreAction in context on the styles page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/dependency-property-owner-pre-action-delegate/">`OwnerPreActionDelegate`</a> · The element class's own check of every value before it is stored, from any source: it may correct the value or reject it (`canProceed`). It runs before the property's `PreAction`. Set it once, in the element class's static constructor: a second set throws, so the actions of a class (the library's elements' too) can't be replaced from outside.

## Methods

<h3 id="dependencypropertyactions"><span class="method"><code>DependencyPropertyActions()</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyactionst" title="DependencyPropertyActions() in context on the styles page" aria-label="DependencyPropertyActions() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/dependency-property-actions/#dependencypropertyactions">`DependencyPropertyActions()`</a> · Creates an empty set of actions with the default `default(T)`.
