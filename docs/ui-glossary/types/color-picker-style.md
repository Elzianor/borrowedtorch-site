---
layout: docs
legend: [prop, dp, method]
title: "Glossary: ColorPickerStyle"
description: "The members of ColorPickerStyle, in alphabetical order."
---

The style class of [`ColorPicker`](/docs/ui-controls/#colorpicker): the properties a style can set on it. Leaves out <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#selectedcolor">`SelectedColor`</a>, so it has only the <a class="ref" href="/docs/ui-glossary/types/base-style/">`BaseStyle`</a> properties. Framework defaults: <a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a> white.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="pointerstyle"><span class="prop"><code>PointerStyle</code></span> <a class="ctx" href="/docs/ui-controls/#colorpicker-properties" title="PointerStyle in context on the controls page" aria-label="PointerStyle in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the pointer. Its `Source` replaces the ring the picker makes; the pointer is centered on the picked pixel at whatever size it gets.

## Methods

<h3 id="colorpickerstyle"><span class="method"><code>ColorPickerStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/color-picker-style/#colorpickerstyle">`ColorPickerStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/color-picker-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
