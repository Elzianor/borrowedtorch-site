---
layout: docs
title: "Glossary: Border"
description: The properties, methods and events of Border, in alphabetical order.
---

A frame around one `Content` element, drawn in a solid colour or from eight textures.

`Border` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [layout page](/docs/ui-layout/#border) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="content"><span class="dp"><code>Content</code></span> <a class="ctx" href="/docs/ui-layout/#border-properties" title="Content in context on the layout page" aria-label="Content in context on the layout page">→</a></h3>

`BaseElement` · The element inside the frame. A style can't set it.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">→</a></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">→</a></h3>

`BorderStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">→</a></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">→</a></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="padding"><span class="dp"><code>Padding</code></span> <a class="ctx" href="/docs/ui-layout/#border-properties" title="Padding in context on the layout page" aria-label="Padding in context on the layout page">→</a></h3>

`Margin?` · The inset of the content from the border's edges, used instead of `Thickness`. Null (the default) insets the content by the thickness.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">→</a></h3>

`BorderStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="thickness"><span class="dp"><code>Thickness</code></span> <a class="ctx" href="/docs/ui-layout/#border-properties" title="Thickness in context on the layout page" aria-label="Thickness in context on the layout page">→</a></h3>

`Margin` · The width of the frame per side (`Left`, `Top`, `Right`, `Bottom`), in units.
