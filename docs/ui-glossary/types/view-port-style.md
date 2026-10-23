---
layout: docs
legend: [prop, method]
title: "Glossary: ViewPortStyle"
description: "The members of ViewPortStyle, in alphabetical order."
---

The style class of [`ViewPort`](/docs/ui-images/#viewport): the properties a style can set on it. None. Framework defaults: <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a> off, <a class="ref prop" href="/docs/ui-glossary/types/view-port-style/#mindepth">`MinDepth`</a> and <a class="ref prop" href="/docs/ui-glossary/types/view-port-style/#maxdepth">`MaxDepth`</a> from <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a>.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="maxdepth"><span class="prop"><code>MaxDepth</code></span> <a class="ctx" href="/docs/ui-images/#viewport-properties" title="MaxDepth in context on the images page" aria-label="MaxDepth in context on the images page">🠆</a></h3>

`float` · The maximum depth of the viewport's depth range. Defaults to <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultmaxdepth">`DefaultSettings.DefaultMaxDepth`</a> (`1`).

<h3 id="mindepth"><span class="prop"><code>MinDepth</code></span> <a class="ctx" href="/docs/ui-images/#viewport-properties" title="MinDepth in context on the images page" aria-label="MinDepth in context on the images page">🠆</a></h3>

`float` · The minimum depth of the viewport's depth range. Defaults to <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultmindepth">`DefaultSettings.DefaultMinDepth`</a> (`0`).

## Methods

<h3 id="viewportstyle"><span class="method"><code>ViewPortStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/view-port-style/#viewportstyle">`ViewPortStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/view-port-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
