---
layout: docs
legend: [prop, method]
title: "Glossary: ScrollableContainerStyle"
description: "The members of ScrollableContainerStyle, in alphabetical order."
---

The style class of [`ScrollableContainer`](/docs/ui-layout/#scrollablecontainer): the properties a style can set on it. Part style <a class="ref prop" href="/docs/ui-glossary/types/scrollable-container-style/#scrollbarsstyle">`ScrollBarsStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>), used by both scroll bars (the vertical one with its two line colours swapped). Framework defaults: <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="horizontalscrollingvalue"><span class="prop"><code>HorizontalScrollingValue</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="HorizontalScrollingValue in context on the layout page" aria-label="HorizontalScrollingValue in context on the layout page">🠆</a></h3>

`float` · How far the content is scrolled sideways, from 0 (the left) to 1 (the right).

<h3 id="scrollbars"><span class="prop"><code>ScrollBars</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="ScrollBars in context on the layout page" aria-label="ScrollBars in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/scroll-bars/">`ScrollBars`</a> · Which scroll bars may show: `None` (the default), `Vertical`, `Horizontal` or `Both`.

<h3 id="scrollbarsstyle"><span class="prop"><code>ScrollBarsStyle</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="ScrollBarsStyle in context on the layout page" aria-label="ScrollBarsStyle in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a> · The style of the scroll bars (see [sliders](/docs/ui-controls/#slider)). The vertical bar gets a copy with the colours of its two line halves swapped.

<h3 id="scrollbarsthickness"><span class="prop"><code>ScrollBarsThickness</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="ScrollBarsThickness in context on the layout page" aria-label="ScrollBarsThickness in context on the layout page">🠆</a></h3>

`int` · The width of a vertical bar and the height of a horizontal one, in units. The default is 0.

<h3 id="verticalscrollingvalue"><span class="prop"><code>VerticalScrollingValue</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="VerticalScrollingValue in context on the layout page" aria-label="VerticalScrollingValue in context on the layout page">🠆</a></h3>

`float` · How far the content is scrolled down, from 0 (the top) to 1 (the bottom).

## Methods

<h3 id="scrollablecontainerstyle"><span class="method"><code>ScrollableContainerStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/scrollable-container-style/#scrollablecontainerstyle">`ScrollableContainerStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/scrollable-container-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
