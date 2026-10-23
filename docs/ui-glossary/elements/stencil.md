---
layout: docs
legend: [prop, dp, method]
title: "Glossary: Stencil"
description: "The properties, methods and events of Stencil, in alphabetical order."
---

Shows a picture through a mask texture: where the mask has the key color, the picture shows, and the rest of the mask stays. A portrait in a frame is the usual case.

`Stencil` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [images page](/docs/ui-images/#stencil) shows it in context, with code and screenshots.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/stencil-style/">`StencilStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="keycolor"><span class="dp"><code>KeyColor</code></span> <a class="ctx" href="/docs/ui-images/#stencil-properties" title="KeyColor in context on the images page" aria-label="KeyColor in context on the images page">🠆</a></h3>

`Color` · The stencil color, alpha included, where the source shows through. Defaults to transparent black (`0, 0, 0, 0`).

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="sourcetexture"><span class="dp"><code>SourceTexture</code></span> <a class="ctx" href="/docs/ui-images/#stencil-properties" title="SourceTexture in context on the images page" aria-label="SourceTexture in context on the images page">🠆</a></h3>

`Texture2D` · The picture that shows where the stencil has the key color. Not part of <a class="ref" href="/docs/ui-glossary/types/stencil-style/">`StencilStyle`</a>.

<h3 id="stenciltexture"><span class="dp"><code>StencilTexture</code></span> <a class="ctx" href="/docs/ui-images/#stencil-properties" title="StencilTexture in context on the images page" aria-label="StencilTexture in context on the images page">🠆</a></h3>

`Texture2D` · The mask drawn over the picture. A stencil that fits its content takes its size. Not part of <a class="ref" href="/docs/ui-glossary/types/stencil-style/">`StencilStyle`</a>.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/stencil-style/">`StencilStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="tolerance"><span class="dp"><code>Tolerance</code></span> <a class="ctx" href="/docs/ui-images/#stencil-properties" title="Tolerance in context on the images page" aria-label="Tolerance in context on the images page">🠆</a></h3>

`float` · How far a stencil pixel may be from <a class="ref dp" href="/docs/ui-glossary/elements/stencil/#keycolor">`KeyColor`</a> and still be keyed, on a 0 to 1 scale per channel. Defaults to `0` (an exact match).

## Methods

<h3 id="stencil"><span class="method"><code>Stencil()</code></span> <a class="ctx" href="/docs/ui-images/#stencil-methods" title="Stencil() in context on the images page" aria-label="Stencil() in context on the images page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/stencil/#stencil">`Stencil(string name = null)`</a> · Creates a stencil. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a>, which <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a> finds it by. Default: `null`. |
