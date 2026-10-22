---
layout: docs
legend: [prop, method]
title: "Glossary: ImageStyle"
description: "The members of ImageStyle, in alphabetical order."
---

The style class of [`Image`](/docs/ui-images/#image): the properties a style can set on it. None. Framework defaults: <a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a> white.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="fill"><span class="prop"><code>Fill</code></span> <a class="ctx" href="/docs/ui-images/#image-properties" title="Fill in context on the images page" aria-label="Fill in context on the images page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-fill/">`ImageFill`</a> · How the texture covers the image. Defaults to `Stretch`.

<h3 id="source"><span class="prop"><code>Source</code></span> <a class="ctx" href="/docs/ui-images/#image-properties" title="Source in context on the images page" aria-label="Source in context on the images page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/source-data/">`SourceData`</a> · The texture drawn. Assign a `Texture2D` or a content path. A new source lays the image out again.

## Methods

<h3 id="imagestyle"><span class="method"><code>ImageStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/image-style/#imagestyle">`ImageStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/image-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
