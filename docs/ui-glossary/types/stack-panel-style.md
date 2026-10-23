---
layout: docs
legend: [prop, method]
title: "Glossary: StackPanelStyle"
description: "The members of StackPanelStyle, in alphabetical order."
---

The style class of [`StackPanel`](/docs/ui-layout/#stackpanel): the properties a style can set on it. None. Framework defaults: aligned left and top, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a> off, <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="orientation"><span class="prop"><code>Orientation</code></span> <a class="ctx" href="/docs/ui-layout/#stackpanel-properties" title="Orientation in context on the layout page" aria-label="Orientation in context on the layout page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/orientation/">`Orientation`</a> · `Vertical` stacks the items top to bottom, `Horizontal` left to right. The default is `Horizontal`.

## Methods

<h3 id="stackpanelstyle"><span class="method"><code>StackPanelStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/stack-panel-style/#stackpanelstyle">`StackPanelStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/stack-panel-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
