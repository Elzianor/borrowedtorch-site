---
layout: docs
legend: [prop, method, event, dp]
title: "Glossary: Button"
description: "The properties, methods and events of Button, in alphabetical order."
---

A clickable element with a text or any element as content. It can act once per click, repeat while held, or toggle on and off.

`Button` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [controls page](/docs/ui-controls/#button) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="backgroundstyle"><span class="dp"><code>BackgroundStyle</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="BackgroundStyle in context on the controls page" aria-label="BackgroundStyle in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the image the button draws its background with.

<h3 id="content"><span class="dp"><code>Content</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="Content in context on the controls page" aria-label="Content in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Any element shown inside the button instead of a text. A content you give is detached, not disposed, when it is replaced.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="hovercolor"><span class="dp"><code>HoverColor</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="HoverColor in context on the controls page" aria-label="HoverColor in context on the controls page">→</a></h3>

`Color` · The solid colour while the mouse is over the button.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="normalcolor"><span class="dp"><code>NormalColor</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="NormalColor in context on the controls page" aria-label="NormalColor in context on the controls page">→</a></h3>

`Color` · The solid colour while nothing happens.

<h3 id="pressedcolor"><span class="dp"><code>PressedColor</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="PressedColor in context on the controls page" aria-label="PressedColor in context on the controls page">→</a></h3>

`Color` · The solid colour while the button is pressed.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="text"><span class="dp"><code>Text</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="Text in context on the controls page" aria-label="Text in context on the controls page">→</a></h3>

`string` · Creates a centred <a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a> content showing this text, styled by <a class="ref dp" href="/docs/ui-glossary/elements/button/#textstyle">`TextStyle`</a>.

<h3 id="textstyle"><span class="dp"><code>TextStyle</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="TextStyle in context on the controls page" aria-label="TextStyle in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a> · The style of the text content made from <a class="ref dp" href="/docs/ui-glossary/elements/button/#text">`Text`</a>.

<h3 id="toggledcolor"><span class="dp"><code>ToggledColor</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="ToggledColor in context on the controls page" aria-label="ToggledColor in context on the controls page">→</a></h3>

`Color` · The solid colour of a `Toggle` button that is on.

<h3 id="toggledon"><span class="dp"><code>ToggledOn</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="ToggledOn in context on the controls page" aria-label="ToggledOn in context on the controls page">→</a></h3>

`bool` · Whether a `Toggle` button is on. Set it to switch the button from code; <a class="ref event" href="/docs/ui-glossary/elements/button/#ontoggled">`OnToggled`</a> is raised.

<h3 id="type"><span class="dp"><code>Type</code></span> <a class="ctx" href="/docs/ui-controls/#button-properties" title="Type in context on the controls page" aria-label="Type in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/button-type/">`ButtonType`</a> · How the button reacts to the mouse: `Normal`, `Repeat` or `Toggle`.

## Methods

<h3 id="button"><span class="method"><code>Button()</code></span> <a class="ctx" href="/docs/ui-controls/#button-methods" title="Button() in context on the controls page" aria-label="Button() in context on the controls page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/button/#button">`Button(string name = null)`</a> · Creates a button. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

## Events

<h3 id="ontoggled"><span class="event"><code>OnToggled</code></span> <a class="ctx" href="/docs/ui-controls/#button-events" title="OnToggled in context on the controls page" aria-label="OnToggled in context on the controls page">→</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, bool isToggledOn)</code> · A `Toggle` button turns on or off, by a click or from code.
