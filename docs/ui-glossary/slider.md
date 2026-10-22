---
layout: docs
title: "Glossary: Slider"
description: The properties, methods and events of Slider, in alphabetical order.
---

A track with a thumb that picks a value between `Min` and `Max`. The same element is the scroll bar of scrollable elements: with `ContentSize` and `ViewSize` its thumb shows how much of the content is in view.

`Slider` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [controls page](/docs/ui-controls/#slider) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="buttonssolidcolor"><span class="dp"><code>ButtonsSolidColor</code></span></h3>

`Color` · The colour of the end buttons and caps, without textures. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="contentsize"><span class="prop"><code>ContentSize</code></span></h3>

`Point` · The size of the content a scroll bar scrolls, in units. Changing it keeps the same content in view. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`SliderStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="linedecreasesolidcolor"><span class="dp"><code>LineDecreaseSolidColor</code></span></h3>

`Color` · The colour of the track between the start and the thumb, without textures. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="lineincreasesolidcolor"><span class="dp"><code>LineIncreaseSolidColor</code></span></h3>

`Color` · The colour of the track between the thumb and the end, without textures. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="max"><span class="dp"><code>Max</code></span></h3>

`float` · The largest value. Setting it below `Min` moves `Min` along. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="min"><span class="dp"><code>Min</code></span></h3>

`float` · The smallest value. Setting it above `Max` moves `Max` along. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="movetopoint"><span class="dp"><code>MoveToPoint</code></span></h3>

`bool` · When set, a click on the track moves the thumb to the clicked point instead of stepping. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="normalizedvalue"><span class="prop"><code>NormalizedValue</code></span></h3>

`float` · Read-only. Where the value lies in the range, from 0 at `Min` to 1 at `Max` (0 when `Min` equals `Max`). ([in context](/docs/ui-controls/#slider-properties))

<h3 id="orientation"><span class="dp"><code>Orientation</code></span></h3>

`Orientation` · `Horizontal` (the default) or `Vertical`. A vertical slider has `Min` at the bottom. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="scrollareasize"><span class="prop"><code>ScrollAreaSize</code></span></h3>

`Vector2` · Read-only. `ContentSize` minus `ViewSize`: how far the content can scroll. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`SliderStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="thumbmargin"><span class="dp"><code>ThumbMargin</code></span></h3>

`Margin` · Moves the thumb across the track: it is centred in the slider's thickness minus `ThumbMargin.Top` (horizontal) or `ThumbMargin.Left` (vertical). The other sides are not used. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="thumbminsize"><span class="dp"><code>ThumbMinSize</code></span></h3>

`float` · The smallest length of the thumb along the track, in units. It keeps a scroll bar's thumb usable over long content. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="thumbscale"><span class="dp"><code>ThumbScale</code></span></h3>

`Vector2` · The thumb's width (`X`) and height (`Y`) as a share of the slider's thickness. On a scroll bar with `ContentSize` and `ViewSize`, the length along the track comes from them instead. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="thumbsolidcolor"><span class="dp"><code>ThumbSolidColor</code></span></h3>

`Color` · The colour of the thumb, without textures. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="tick"><span class="dp"><code>Tick</code></span></h3>

`float` · The step the value snaps to, from `Min`. 0 (the default) means no snapping and no tick marks. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="tickoffset"><span class="dp"><code>TickOffset</code></span></h3>

`int` · The gap between the slider's edge and the tick marks, in units. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="tickpassedcolor"><span class="dp"><code>TickPassedColor</code></span></h3>

`Color` · The colour of the tick marks at or below the value. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="tickplacement"><span class="dp"><code>TickPlacement</code></span></h3>

`TickPlacement` · Where the tick marks are drawn. `None` (the default) draws none. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="tickremainingcolor"><span class="dp"><code>TickRemainingColor</code></span></h3>

`Color` · The colour of the tick marks above the value. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="ticksize"><span class="dp"><code>TickSize</code></span></h3>

`Point` · The width and height of a tick mark, in units. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="type"><span class="dp"><code>Type</code></span></h3>

`SliderType` · The kind of slider: `Slider` (the default), `SliderWithCaps`, `ScrollBar` or `ScrollBarNoButtons`. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="value"><span class="dp"><code>Value</code></span></h3>

`float` · The value, between `Min` and `Max`. A value you set is clamped to the range and snapped to the ticks. ([in context](/docs/ui-controls/#slider-properties))

<h3 id="viewsize"><span class="prop"><code>ViewSize</code></span></h3>

`Point` · The size of the visible part of that content, in units. Changing it keeps the same content in view. ([in context](/docs/ui-controls/#slider-properties))

## Methods

<h3 id="draw"><span class="method"><code>Draw()</code></span></h3>

`Draw()` · Draws the slider, then its tick marks. The framework calls it; you don't need to.

<h3 id="pagedecrease"><span class="method"><code>PageDecrease()</code></span></h3>

`PageDecrease()` · Moves the value down by a page: one tick when `Tick` is set, otherwise the share of the range that `ViewSize` is of `ContentSize - ViewSize`. Does nothing when `Type` is `Slider`.

<h3 id="pageincrease"><span class="method"><code>PageIncrease()</code></span></h3>

`PageIncrease()` · Moves the value up by a page, as `PageDecrease` moves it down. Does nothing when `Type` is `Slider`.

## Events

<h3 id="onvaluechanged"><span class="event"><code>OnValueChanged</code></span></h3>

`(BaseElement sender, float value)` · `Value` changes: by a drag, a click, from code, or when a new range, tick, `ContentSize` or `ViewSize` moves it. The value is already clamped and snapped. ([in context](/docs/ui-controls/#slider-events))
