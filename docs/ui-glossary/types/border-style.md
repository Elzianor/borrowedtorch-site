---
layout: docs
legend: [prop, dp, method]
title: "Glossary: BorderStyle"
description: "The members of BorderStyle, in alphabetical order."
---

The style class of [`Border`](/docs/ui-layout/#border): the properties a style can set on it. Leaves out `Content`. Framework defaults: `Thickness` `DefaultBorderThickness` (1) and <a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a> `DefaultBorderColor`: a frame that shows, around a clear content area.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="contentareamargin"><span class="prop"><code>ContentAreaMargin</code></span> <a class="ctx" href="/docs/ui-layout/#border-properties" title="ContentAreaMargin in context on the layout page" aria-label="ContentAreaMargin in context on the layout page">🠆</a></h3>

<code><a href="/docs/ui-glossary/types/margin/">Margin</a>?</code> · The inset of the content area (the background and the content) from the border's outer edges, used instead of <a class="ref dp" href="/docs/ui-glossary/elements/border/#thickness">`Thickness`</a>. Smaller than the thickness, it lets the background reach under the frame's transparent pixels. Null (the default) insets the content area by the thickness. Called `Padding` before 2.0.0; for space between the frame and the content, give the content a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#margin">`Margin`</a>.

<h3 id="thickness"><span class="prop"><code>Thickness</code></span> <a class="ctx" href="/docs/ui-layout/#border-properties" title="Thickness in context on the layout page" aria-label="Thickness in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The width of the frame per side (`Left`, `Top`, `Right`, `Bottom`), in units. 1 on every side unless set (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultborderthickness">`DefaultSettings.DefaultBorderThickness`</a>).

## Methods

<h3 id="borderstyle"><span class="method"><code>BorderStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/border-style/#borderstyle">`BorderStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/border-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.

| Parameter | Type | Description |
| --- | --- | --- |
| `propertyName` | `string` | The name of a property of the style; `nameof` keeps it right. |
