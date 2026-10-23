---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: ButtonStyle"
description: "The members of ButtonStyle, in alphabetical order."
---

The style class of [`Button`](/docs/ui-controls/#button): the properties a style can set on it. Part styles <a class="ref prop" href="/docs/ui-glossary/types/button-style/#textstyle">`TextStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a>) and <a class="ref prop" href="/docs/ui-glossary/types/button-style/#backgroundstyle">`BackgroundStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>). Leaves out `Content`. Framework defaults: none beyond the base ones.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="backgroundstyle"><span class="prop"><code>BackgroundStyle</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="BackgroundStyle in context on the controls page" aria-label="BackgroundStyle in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the image the button draws its background with.

<h3 id="hovercolor"><span class="prop"><code>HoverColor</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="HoverColor in context on the controls page" aria-label="HoverColor in context on the controls page">🠆</a></h3>

`Color` · The solid colour while the mouse is over the button.

<h3 id="normalcolor"><span class="prop"><code>NormalColor</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="NormalColor in context on the controls page" aria-label="NormalColor in context on the controls page">🠆</a></h3>

`Color` · The solid colour while nothing happens.

<h3 id="pressedcolor"><span class="prop"><code>PressedColor</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="PressedColor in context on the controls page" aria-label="PressedColor in context on the controls page">🠆</a></h3>

`Color` · The solid colour while the button is pressed.

<h3 id="text"><span class="prop"><code>Text</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="Text in context on the controls page" aria-label="Text in context on the controls page">🠆</a></h3>

`string` · Creates a centred <a class="ref" href="/docs/ui-glossary/elements/label/">`Label`</a> content showing this text, styled by <a class="ref dp" href="/docs/ui-glossary/elements/button/#textstyle">`TextStyle`</a>.

<h3 id="textstyle"><span class="prop"><code>TextStyle</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="TextStyle in context on the controls page" aria-label="TextStyle in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> · The style of the text content made from <a class="ref dp" href="/docs/ui-glossary/elements/button/#text">`Text`</a>.

<h3 id="toggledcolor"><span class="prop"><code>ToggledColor</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="ToggledColor in context on the controls page" aria-label="ToggledColor in context on the controls page">🠆</a></h3>

`Color` · The solid colour of a `Toggle` button that is on.

<h3 id="toggledon"><span class="prop"><code>ToggledOn</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="ToggledOn in context on the controls page" aria-label="ToggledOn in context on the controls page">🠆</a></h3>

`bool` · Whether a `Toggle` button is on. Set it to switch the button from code; <a class="ref event" href="/docs/ui-glossary/elements/button/#ontoggled">`OnToggled`</a> is raised.

<h3 id="type"><span class="prop"><code>Type</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="Type in context on the controls page" aria-label="Type in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/button-type/">`ButtonType`</a> · How the button reacts to the mouse: `Normal`, `Repeat` or `Toggle`.

## Methods

<h3 id="buttonstyle"><span class="method"><code>ButtonStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/button-style/#buttonstyle">`ButtonStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/button-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
