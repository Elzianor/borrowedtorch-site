---
layout: docs
legend: [prop, dp, method]
title: "Glossary: Border"
description: "The properties, methods and events of Border, in alphabetical order."
---

A frame around one <a class="ref dp" href="/docs/ui-glossary/elements/border/#content">`Content`</a> element, drawn in a solid color or from eight textures.

`Border` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [layout page](/docs/ui-layout/#border) shows it in context, with code and screenshots.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="content"><span class="dp"><code>Content</code></span> <a class="ctx" href="/docs/ui-layout/#border-properties" title="Content in context on the layout page" aria-label="Content in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · The element inside the frame. A style can't set it.

<h3 id="contentareamargin"><span class="dp"><code>ContentAreaMargin</code></span> <a class="ctx" href="/docs/ui-layout/#border-properties" title="ContentAreaMargin in context on the layout page" aria-label="ContentAreaMargin in context on the layout page">🠆</a></h3>

<code><a href="/docs/ui-glossary/types/margin/">Margin</a>?</code> · The inset of the content area (the background and the content) from the border's outer edges, used instead of <a class="ref dp" href="/docs/ui-glossary/elements/border/#thickness">`Thickness`</a>. Smaller than the thickness, it lets the background reach under the frame's transparent pixels. Null (the default) insets the content area by the thickness. Called `Padding` before 2.0.0; for space between the frame and the content, give the content a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#margin">`Margin`</a>.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="thickness"><span class="dp"><code>Thickness</code></span> <a class="ctx" href="/docs/ui-layout/#border-properties" title="Thickness in context on the layout page" aria-label="Thickness in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The width of the frame per side (`Left`, `Top`, `Right`, `Bottom`), in units. 1 on every side unless set (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultborderthickness">`DefaultSettings.DefaultBorderThickness`</a>).

## Methods

<h3 id="border"><span class="method"><code>Border()</code></span> <a class="ctx" href="/docs/ui-layout/#border-methods" title="Border() in context on the layout page" aria-label="Border() in context on the layout page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/border/#border">`Border(string name = null)`</a> · Creates a border. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a>, which <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a> finds it by. Default: `null`. |
