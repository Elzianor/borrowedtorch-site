---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: Slider"
description: "The properties, methods and events of Slider, in alphabetical order."
---

A track with a thumb that picks a value between <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a>. The same element is the scroll bar of scrollable elements: with <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> its thumb shows how much of the content is in view.

`Slider` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [controls page](/docs/ui-controls/#slider) shows it in context, with code and screenshots.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="buttonssolidcolor"><span class="dp"><code>ButtonsSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ButtonsSolidColor in context on the controls page" aria-label="ButtonsSolidColor in context on the controls page">🠆</a></h3>

`Color` · The color of the end buttons and caps, without textures.

<h3 id="contentsize"><span class="prop"><code>ContentSize</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ContentSize in context on the controls page" aria-label="ContentSize in context on the controls page">🠆</a></h3>

`Point` · The size of the content a scroll bar scrolls, in units. Changing it keeps the same content in view.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="linedecreasesolidcolor"><span class="dp"><code>LineDecreaseSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="LineDecreaseSolidColor in context on the controls page" aria-label="LineDecreaseSolidColor in context on the controls page">🠆</a></h3>

`Color` · The color of the track between the start and the thumb, without textures.

<h3 id="lineincreasesolidcolor"><span class="dp"><code>LineIncreaseSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="LineIncreaseSolidColor in context on the controls page" aria-label="LineIncreaseSolidColor in context on the controls page">🠆</a></h3>

`Color` · The color of the track between the thumb and the end, without textures.

<h3 id="max"><span class="dp"><code>Max</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Max in context on the controls page" aria-label="Max in context on the controls page">🠆</a></h3>

`float` · The largest value. Setting it below <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> along.

<h3 id="min"><span class="dp"><code>Min</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Min in context on the controls page" aria-label="Min in context on the controls page">🠆</a></h3>

`float` · The smallest value. Setting it above <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> along.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="movetopoint"><span class="dp"><code>MoveToPoint</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="MoveToPoint in context on the controls page" aria-label="MoveToPoint in context on the controls page">🠆</a></h3>

`bool` · When set, a click on the track moves the thumb to the clicked point instead of stepping.

<h3 id="normalizedvalue"><span class="prop"><code>NormalizedValue</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="NormalizedValue in context on the controls page" aria-label="NormalizedValue in context on the controls page">🠆</a></h3>

`float` · Read-only. Where the value lies in the range, from 0 at <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> to 1 at <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a> (0 when <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> equals <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a>).

<h3 id="orientation"><span class="dp"><code>Orientation</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Orientation in context on the controls page" aria-label="Orientation in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/orientation/">`Orientation`</a> · `Horizontal` (the default) or `Vertical`. A vertical slider has <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> at the bottom.

<h3 id="scrollareasize"><span class="prop"><code>ScrollAreaSize</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ScrollAreaSize in context on the controls page" aria-label="ScrollAreaSize in context on the controls page">🠆</a></h3>

`Vector2` · Read-only. <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> minus <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a>: how far the content can scroll.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="thumbmargin"><span class="dp"><code>ThumbMargin</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ThumbMargin in context on the controls page" aria-label="ThumbMargin in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · Moves the thumb across the track: it is centred in the slider's thickness minus `ThumbMargin.Top` (horizontal) or `ThumbMargin.Left` (vertical). The other sides are not used.

<h3 id="thumbminsize"><span class="dp"><code>ThumbMinSize</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ThumbMinSize in context on the controls page" aria-label="ThumbMinSize in context on the controls page">🠆</a></h3>

`float` · The smallest length of the thumb along the track, in units. It keeps a scroll bar's thumb usable over long content.

<h3 id="thumbscale"><span class="dp"><code>ThumbScale</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ThumbScale in context on the controls page" aria-label="ThumbScale in context on the controls page">🠆</a></h3>

`Vector2` · The thumb's width (`X`) and height (`Y`) as a share of the slider's thickness. On a scroll bar with <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a>, the length along the track comes from them instead.

<h3 id="thumbsolidcolor"><span class="dp"><code>ThumbSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ThumbSolidColor in context on the controls page" aria-label="ThumbSolidColor in context on the controls page">🠆</a></h3>

`Color` · The color of the thumb, without textures.

<h3 id="tick"><span class="dp"><code>Tick</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Tick in context on the controls page" aria-label="Tick in context on the controls page">🠆</a></h3>

`float` · The step the value snaps to, from <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a>. 0 (the default) means no snapping and no tick marks.

<h3 id="tickoffset"><span class="dp"><code>TickOffset</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="TickOffset in context on the controls page" aria-label="TickOffset in context on the controls page">🠆</a></h3>

`int` · The gap between the slider's edge and the tick marks, in units.

<h3 id="tickpassedcolor"><span class="dp"><code>TickPassedColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="TickPassedColor in context on the controls page" aria-label="TickPassedColor in context on the controls page">🠆</a></h3>

`Color` · The color of the tick marks at or below the value.

<h3 id="tickplacement"><span class="dp"><code>TickPlacement</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="TickPlacement in context on the controls page" aria-label="TickPlacement in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/tick-placement/">`TickPlacement`</a> · Where the tick marks are drawn. `None` (the default) draws none.

<h3 id="tickremainingcolor"><span class="dp"><code>TickRemainingColor</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="TickRemainingColor in context on the controls page" aria-label="TickRemainingColor in context on the controls page">🠆</a></h3>

`Color` · The color of the tick marks above the value.

<h3 id="ticksize"><span class="dp"><code>TickSize</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="TickSize in context on the controls page" aria-label="TickSize in context on the controls page">🠆</a></h3>

`Point` · The width and height of a tick mark, in units.

<h3 id="type"><span class="dp"><code>Type</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Type in context on the controls page" aria-label="Type in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/slider-type/">`SliderType`</a> · The kind of slider: `Slider` (the default), `SliderWithCaps`, `ScrollBar` or `ScrollBarNoButtons`.

<h3 id="value"><span class="dp"><code>Value</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="Value in context on the controls page" aria-label="Value in context on the controls page">🠆</a></h3>

`float` · The value, between <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a>. A value you set is clamped to the range and snapped to the ticks.

<h3 id="viewsize"><span class="prop"><code>ViewSize</code></span> <a class="ctx" href="/docs/ui-controls/#slider-properties" title="ViewSize in context on the controls page" aria-label="ViewSize in context on the controls page">🠆</a></h3>

`Point` · The size of the visible part of that content, in units. Changing it keeps the same content in view.

## Methods

<h3 id="slider"><span class="method"><code>Slider()</code></span> <a class="ctx" href="/docs/ui-controls/#slider-methods" title="Slider() in context on the controls page" aria-label="Slider() in context on the controls page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/slider/#slider">`Slider(string name = null)`</a> · Creates a slider. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a>, which <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a> finds it by. Default: `null`. |

<h3 id="draw"><span class="method"><code>Draw()</code></span> <a class="ctx" href="/docs/ui-controls/#slider-methods" title="Draw() in context on the controls page" aria-label="Draw() in context on the controls page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/slider/#draw">`Draw()`</a> · Draws the slider, then its tick marks. The framework calls it; you don't need to.

<h3 id="pagedecrease"><span class="method"><code>PageDecrease()</code></span> <a class="ctx" href="/docs/ui-controls/#slider-methods" title="PageDecrease() in context on the controls page" aria-label="PageDecrease() in context on the controls page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/slider/#pagedecrease">`PageDecrease()`</a> · Moves the value down by a page: one tick when <a class="ref dp" href="/docs/ui-glossary/elements/slider/#tick">`Tick`</a> is set, otherwise the share of the range that <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> is of `ContentSize - ViewSize`. Does nothing when <a class="ref dp" href="/docs/ui-glossary/elements/slider/#type">`Type`</a> is `Slider`.

<h3 id="pageincrease"><span class="method"><code>PageIncrease()</code></span> <a class="ctx" href="/docs/ui-controls/#slider-methods" title="PageIncrease() in context on the controls page" aria-label="PageIncrease() in context on the controls page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/slider/#pageincrease">`PageIncrease()`</a> · Moves the value up by a page, as <a class="ref method" href="/docs/ui-glossary/elements/slider/#pagedecrease">`PageDecrease`</a> moves it down. Does nothing when <a class="ref dp" href="/docs/ui-glossary/elements/slider/#type">`Type`</a> is `Slider`.

## Events

<h3 id="onvaluechanged"><span class="event"><code>OnValueChanged</code></span> <a class="ctx" href="/docs/ui-controls/#slider-events" title="OnValueChanged in context on the controls page" aria-label="OnValueChanged in context on the controls page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, float value)</code> · <a class="ref dp" href="/docs/ui-glossary/elements/slider/#value">`Value`</a> changes: by a drag, a click, from code, or when a new range, tick, <a class="ref prop" href="/docs/ui-glossary/elements/slider/#contentsize">`ContentSize`</a> or <a class="ref prop" href="/docs/ui-glossary/elements/slider/#viewsize">`ViewSize`</a> moves it. The value is already clamped and snapped.
