---
layout: docs
title: "Glossary: Stencil"
description: The properties, methods and events of Stencil, in alphabetical order.
---

Shows a picture through a mask texture: where the mask has the key colour, the picture shows, and the rest of the mask stays. A portrait in a frame is the usual case.

`Stencil` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [images page](/docs/ui-images/#stencil) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`StencilStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="keycolor"><span class="dp"><code>KeyColor</code></span></h3>

`Color` · The stencil colour, alpha included, where the source shows through. Defaults to transparent black (`0, 0, 0, 0`). ([in context](/docs/ui-images/#stencil-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="sourcetexture"><span class="dp"><code>SourceTexture</code></span></h3>

`Texture2D` · The picture that shows where the stencil has the key colour. Not part of `StencilStyle`. ([in context](/docs/ui-images/#stencil-properties))

<h3 id="stenciltexture"><span class="dp"><code>StencilTexture</code></span></h3>

`Texture2D` · The mask drawn over the picture. A stencil that fits its content takes its size. Not part of `StencilStyle`. ([in context](/docs/ui-images/#stencil-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`StencilStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="tolerance"><span class="dp"><code>Tolerance</code></span></h3>

`float` · How far a stencil pixel may be from `KeyColor` and still be keyed, on a 0 to 1 scale per channel. Defaults to `0` (an exact match). ([in context](/docs/ui-images/#stencil-properties))
