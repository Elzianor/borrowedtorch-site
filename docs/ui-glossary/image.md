---
layout: docs
title: "Glossary: Image"
description: The properties, methods and events of Image, in alphabetical order.
---

Draws a texture, stretched over the image, centred at its own size or repeated as tiles.

`Image` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [images page](/docs/ui-images/#image) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="fill"><span class="dp"><code>Fill</code></span></h3>

`ImageFill` · How the texture covers the image. Defaults to `Stretch`. ([in context](/docs/ui-images/#image-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`ImageStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="source"><span class="dp"><code>Source</code></span></h3>

`SourceData` · The texture drawn. Assign a `Texture2D` or a content path. A new source lays the image out again. ([in context](/docs/ui-images/#image-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`ImageStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))
