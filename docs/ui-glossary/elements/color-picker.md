---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: ColorPicker"
description: "The properties, methods and events of ColorPicker, in alphabetical order."
---

A colour wheel to pick a colour from with a click. The hue goes around the centre, the saturation grows from white at the centre to the full colour at the edge, and <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a> darkens the result.

`ColorPicker` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [controls page](/docs/ui-controls/#colorpicker) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="brightness"><span class="dp"><code>Brightness</code></span> <a class="ctx" href="/docs/ui-controls/#colorpicker-properties" title="Brightness in context on the controls page" aria-label="Brightness in context on the controls page">→</a></h3>

`float` · Scales the picked colour, from 0 (black) to 1 (the palette's colour, the default). Values outside are clamped. Changing it recomputes <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#selectedcolor">`SelectedColor`</a> from the picked spot.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/color-picker-style/">`ColorPickerStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="selectedcolor"><span class="dp"><code>SelectedColor</code></span> <a class="ctx" href="/docs/ui-controls/#colorpicker-properties" title="SelectedColor in context on the controls page" aria-label="SelectedColor in context on the controls page">→</a></h3>

`Color` · The picked colour times <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a>, always opaque. It starts black. Setting it raises <a class="ref event" href="/docs/ui-glossary/elements/color-picker/#onselectedcolorchanged">`OnSelectedColorChanged`</a> but does not move the pointer.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/color-picker-style/">`ColorPickerStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

## Methods

<h3 id="colorpicker"><span class="method"><code>ColorPicker()</code></span> <a class="ctx" href="/docs/ui-controls/#colorpicker-methods" title="ColorPicker() in context on the controls page" aria-label="ColorPicker() in context on the controls page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/color-picker/#colorpicker">`ColorPicker(string name = null)`</a> · Creates a colour picker. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

## Events

<h3 id="onselectedcolorchanged"><span class="event"><code>OnSelectedColorChanged</code></span> <a class="ctx" href="/docs/ui-controls/#colorpicker-events" title="OnSelectedColorChanged in context on the controls page" aria-label="OnSelectedColorChanged in context on the controls page">→</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, Color color)</code> · <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#selectedcolor">`SelectedColor`</a> changes: by a pick, a <a class="ref dp" href="/docs/ui-glossary/elements/color-picker/#brightness">`Brightness`</a> change, or from code.
