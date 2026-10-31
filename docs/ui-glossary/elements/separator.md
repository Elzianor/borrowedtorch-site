---
layout: docs
legend: [prop, dp, method]
title: "Glossary: Separator"
description: "The properties, methods and events of Separator, in alphabetical order."
---

An empty element to draw a dividing line or leave a gap: give it a size along one side, stretch it along the other, and it fills itself with its <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a>. Unless given a color and a size, it is a gray line (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultseparatorcolor">`DefaultSettings.DefaultSeparatorColor`</a>) at least 1 unit thick across whichever way it stretches: a horizontal line in a vertical stack panel or among a list's rows, a vertical one in a horizontal stack panel. For a gap, give it a transparent background.

`Separator` derives from [`ContentContainer`](/docs/ui-glossary/elements/content-container/) and has its members too. The [layout page](/docs/ui-layout/#separator) shows it in context, with code and screenshots.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Methods

<h3 id="separator"><span class="method"><code>Separator()</code></span> <a class="ctx" href="/docs/ui-layout/#separator-methods" title="Separator() in context on the layout page" aria-label="Separator() in context on the layout page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/separator/#separator">`Separator(string name = null)`</a> · Creates a separator. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a>, which <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a> finds it by. Default: `null`. |
