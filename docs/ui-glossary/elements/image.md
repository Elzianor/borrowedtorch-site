---
layout: docs
legend: [prop, dp, method]
title: "Glossary: Image"
description: "The properties, methods and events of Image, in alphabetical order."
---

Draws a texture, stretched over the image, centred at its own size or repeated as tiles.

`Image` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [images page](/docs/ui-images/#image) shows it in context, with code and screenshots.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="fill"><span class="dp"><code>Fill</code></span> <a class="ctx" href="/docs/ui-images/#image-properties" title="Fill in context on the images page" aria-label="Fill in context on the images page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-fill/">`ImageFill`</a> · How the texture covers the image. Defaults to `Stretch`.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="source"><span class="dp"><code>Source</code></span> <a class="ctx" href="/docs/ui-images/#image-properties" title="Source in context on the images page" aria-label="Source in context on the images page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/source-data/">`SourceData`</a> · The texture drawn. Assign a `Texture2D` or a content path. A new source lays the image out again.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

## Methods

<h3 id="image"><span class="method"><code>Image()</code></span> <a class="ctx" href="/docs/ui-images/#image-methods" title="Image() in context on the images page" aria-label="Image() in context on the images page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/image/#image">`Image(string name = null)`</a> · Creates an image. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a>, which <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a> finds it by. Default: `null`. |
