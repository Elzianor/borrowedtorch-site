---
layout: docs
legend: [prop, dp, method]
title: "Glossary: SliderStyle"
description: "The members of SliderStyle, in alphabetical order."
---

The style class of [`Slider`](/docs/ui-controls/#slider): the properties a style can set on it. None. Framework defaults: <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>, <a class="ref prop" href="/docs/ui-glossary/types/slider-style/#thumbscale">`ThumbScale`</a> (1, 1).

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="buttonssolidcolor"><span class="prop"><code>ButtonsSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ButtonsSolidColor in context on the controls page" aria-label="ButtonsSolidColor in context on the controls page">→</a></h3>

`Color` · The colour of the end buttons and caps, without textures.

<h3 id="linedecreasesolidcolor"><span class="prop"><code>LineDecreaseSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="LineDecreaseSolidColor in context on the controls page" aria-label="LineDecreaseSolidColor in context on the controls page">→</a></h3>

`Color` · The colour of the track between the start and the thumb, without textures.

<h3 id="lineincreasesolidcolor"><span class="prop"><code>LineIncreaseSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="LineIncreaseSolidColor in context on the controls page" aria-label="LineIncreaseSolidColor in context on the controls page">→</a></h3>

`Color` · The colour of the track between the thumb and the end, without textures.

<h3 id="max"><span class="prop"><code>Max</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Max in context on the controls page" aria-label="Max in context on the controls page">→</a></h3>

`float` · The largest value. Setting it below <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> along.

<h3 id="min"><span class="prop"><code>Min</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Min in context on the controls page" aria-label="Min in context on the controls page">→</a></h3>

`float` · The smallest value. Setting it above <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> along.

<h3 id="movetopoint"><span class="prop"><code>MoveToPoint</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="MoveToPoint in context on the controls page" aria-label="MoveToPoint in context on the controls page">→</a></h3>

`bool` · When set, a click on the track moves the thumb to the clicked point instead of stepping.

<h3 id="orientation"><span class="prop"><code>Orientation</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Orientation in context on the controls page" aria-label="Orientation in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/orientation/">`Orientation`</a> · `Horizontal` (the default) or `Vertical`. A vertical slider has <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> at the bottom.

<h3 id="thumbmargin"><span class="prop"><code>ThumbMargin</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ThumbMargin in context on the controls page" aria-label="ThumbMargin in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · Moves the thumb across the track: it is centred in the slider's thickness minus `ThumbMargin.Top` (horizontal) or `ThumbMargin.Left` (vertical). The other sides are not used.

<h3 id="thumbminsize"><span class="prop"><code>ThumbMinSize</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ThumbMinSize in context on the controls page" aria-label="ThumbMinSize in context on the controls page">→</a></h3>

`float` · The smallest length of the thumb along the track, in units. It keeps a scroll bar's thumb usable over long content.

<h3 id="thumbscale"><span class="prop"><code>ThumbScale</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ThumbScale in context on the controls page" aria-label="ThumbScale in context on the controls page">→</a></h3>

`Vector2` · The thumb's width (`X`) and height (`Y`) as a share of the slider's thickness. On a scroll bar with <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a>, the length along the track comes from them instead.

<h3 id="thumbsolidcolor"><span class="prop"><code>ThumbSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ThumbSolidColor in context on the controls page" aria-label="ThumbSolidColor in context on the controls page">→</a></h3>

`Color` · The colour of the thumb, without textures.

<h3 id="tick"><span class="prop"><code>Tick</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Tick in context on the controls page" aria-label="Tick in context on the controls page">→</a></h3>

`float` · The step the value snaps to, from <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a>. 0 (the default) means no snapping and no tick marks.

<h3 id="tickoffset"><span class="prop"><code>TickOffset</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="TickOffset in context on the controls page" aria-label="TickOffset in context on the controls page">→</a></h3>

`int` · The gap between the slider's edge and the tick marks, in units.

<h3 id="tickpassedcolor"><span class="prop"><code>TickPassedColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="TickPassedColor in context on the controls page" aria-label="TickPassedColor in context on the controls page">→</a></h3>

`Color` · The colour of the tick marks at or below the value.

<h3 id="tickplacement"><span class="prop"><code>TickPlacement</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="TickPlacement in context on the controls page" aria-label="TickPlacement in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/tick-placement/">`TickPlacement`</a> · Where the tick marks are drawn. `None` (the default) draws none.

<h3 id="tickremainingcolor"><span class="prop"><code>TickRemainingColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="TickRemainingColor in context on the controls page" aria-label="TickRemainingColor in context on the controls page">→</a></h3>

`Color` · The colour of the tick marks above the value.

<h3 id="ticksize"><span class="prop"><code>TickSize</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="TickSize in context on the controls page" aria-label="TickSize in context on the controls page">→</a></h3>

`Point` · The width and height of a tick mark, in units.

<h3 id="type"><span class="prop"><code>Type</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Type in context on the controls page" aria-label="Type in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/slider-type/">`SliderType`</a> · The kind of slider: <a class="ref" href="/docs/ui-glossary/elements/slider/">`Slider`</a> (the default), `SliderWithCaps`, `ScrollBar` or `ScrollBarNoButtons`.

<h3 id="value"><span class="prop"><code>Value</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Value in context on the controls page" aria-label="Value in context on the controls page">→</a></h3>

`float` · The value, between <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a>. A value you set is clamped to the range and snapped to the ticks.

## Methods

<h3 id="sliderstyle"><span class="method"><code>SliderStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/slider-style/#sliderstyle">`SliderStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/slider-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
