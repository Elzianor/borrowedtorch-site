---
layout: docs
legend: [prop, dp, method]
title: "Glossary: StencilStyle"
description: "The members of StencilStyle, in alphabetical order."
---

The style class of [`Stencil`](/docs/ui-images/#stencil): the properties a style can set on it. Leaves out <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#sourcetexture">`SourceTexture`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#stenciltexture">`StencilTexture`</a>. Framework defaults: none beyond the base ones.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="keycolor"><span class="prop"><code>KeyColor</code></span> <a class="ctx" href="/docs/ui-images/#stencil-properties" title="KeyColor in context on the images page" aria-label="KeyColor in context on the images page">🠆</a></h3>

`Color` · The stencil color, alpha included, where the source shows through. Defaults to transparent black (`0, 0, 0, 0`).

<h3 id="tolerance"><span class="prop"><code>Tolerance</code></span> <a class="ctx" href="/docs/ui-images/#stencil-properties" title="Tolerance in context on the images page" aria-label="Tolerance in context on the images page">🠆</a></h3>

`float` · How far a stencil pixel may be from <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#keycolor">`KeyColor`</a> and still be keyed, on a 0 to 1 scale per channel. Defaults to `0` (an exact match).

## Methods

<h3 id="stencilstyle"><span class="method"><code>StencilStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/stencil-style/#stencilstyle">`StencilStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/stencil-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.

| Parameter | Type | Description |
| --- | --- | --- |
| `propertyName` | `string` | The name of a property of the style; `nameof` keeps it right. |
