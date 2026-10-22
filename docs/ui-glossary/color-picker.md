---
layout: docs
title: "Glossary: ColorPicker"
description: The properties, methods and events of ColorPicker, in alphabetical order.
---

A colour wheel to pick a colour from with a click. The hue goes around the centre, the saturation grows from white at the centre to the full colour at the edge, and `Brightness` darkens the result.

`ColorPicker` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [controls page](/docs/ui-controls/#colorpicker) shows it in context, with code and screenshots.

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property, which a style, a binding or an animation can set.

## Properties

<h3 id="brightness"><span class="dp"><code>Brightness</code></span></h3>

`float` · Scales the picked colour, from 0 (black) to 1 (the palette's colour, the default). Values outside are clamped. Changing it recomputes `SelectedColor` from the picked spot. ([in context](/docs/ui-controls/#colorpicker-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`ColorPickerStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="selectedcolor"><span class="dp"><code>SelectedColor</code></span></h3>

`Color` · The picked colour times `Brightness`, always opaque. It starts black. Setting it raises `OnSelectedColorChanged` but does not move the pointer. ([in context](/docs/ui-controls/#colorpicker-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`ColorPickerStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

## Events

<h3 id="onselectedcolorchanged"><span class="event"><code>OnSelectedColorChanged</code></span></h3>

`(BaseElement sender, Color color)` · `SelectedColor` changes: by a pick, a `Brightness` change, or from code. ([in context](/docs/ui-controls/#colorpicker-events))
