---
layout: docs
legend: [prop, dp, method]
title: "Glossary: BorderStyle"
description: "The members of BorderStyle, in alphabetical order."
---

The style class of [`Border`](/docs/ui-layout/#border): the properties a style can set on it. Leaves out `Content`. Framework defaults: none beyond the base ones.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="padding"><span class="prop"><code>Padding</code></span> <a class="ctx" href="/docs/ui-layout/#border-properties" title="Padding in context on the layout page" aria-label="Padding in context on the layout page">→</a></h3>

<code><a href="/docs/ui-glossary/types/margin/">Margin</a>?</code> · The inset of the content from the border's edges, used instead of <a class="ref dp" href="/docs/ui-glossary/elements/border/#thickness">`Thickness`</a>. Null (the default) insets the content by the thickness.

<h3 id="thickness"><span class="prop"><code>Thickness</code></span> <a class="ctx" href="/docs/ui-layout/#border-properties" title="Thickness in context on the layout page" aria-label="Thickness in context on the layout page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The width of the frame per side (`Left`, `Top`, `Right`, `Bottom`), in units.

## Methods

<h3 id="borderstyle"><span class="method"><code>BorderStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/border-style/#borderstyle">`BorderStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/border-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
