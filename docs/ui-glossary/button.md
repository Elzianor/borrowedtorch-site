---
layout: docs
title: "Glossary: Button"
description: The properties, methods and events of Button, in alphabetical order.
---

A clickable element with a text or any element as content. It can act once per click, repeat while held, or toggle on and off.

`Button` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [controls page](/docs/ui-controls/#button) shows it in context, with code and screenshots.

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property, which a style, a binding or an animation can set.

## Properties

<h3 id="backgroundstyle"><span class="dp"><code>BackgroundStyle</code></span></h3>

`ImageStyle` · The style of the image the button draws its background with. ([in context](/docs/ui-controls/#button-properties))

<h3 id="content"><span class="dp"><code>Content</code></span></h3>

`BaseElement` · Any element shown inside the button instead of a text. A content you give is detached, not disposed, when it is replaced. ([in context](/docs/ui-controls/#button-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`ButtonStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="hovercolor"><span class="dp"><code>HoverColor</code></span></h3>

`Color` · The solid colour while the mouse is over the button. ([in context](/docs/ui-controls/#button-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="normalcolor"><span class="dp"><code>NormalColor</code></span></h3>

`Color` · The solid colour while nothing happens. ([in context](/docs/ui-controls/#button-properties))

<h3 id="pressedcolor"><span class="dp"><code>PressedColor</code></span></h3>

`Color` · The solid colour while the button is pressed. ([in context](/docs/ui-controls/#button-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`ButtonStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="text"><span class="dp"><code>Text</code></span></h3>

`string` · Creates a centred `RichTextBox` content showing this text, styled by `TextStyle`. ([in context](/docs/ui-controls/#button-properties))

<h3 id="textstyle"><span class="dp"><code>TextStyle</code></span></h3>

`RichTextBoxStyle` · The style of the text content made from `Text`. ([in context](/docs/ui-controls/#button-properties))

<h3 id="toggledcolor"><span class="dp"><code>ToggledColor</code></span></h3>

`Color` · The solid colour of a `Toggle` button that is on. ([in context](/docs/ui-controls/#button-properties))

<h3 id="toggledon"><span class="dp"><code>ToggledOn</code></span></h3>

`bool` · Whether a `Toggle` button is on. Set it to switch the button from code; `OnToggled` is raised. ([in context](/docs/ui-controls/#button-properties))

<h3 id="type"><span class="dp"><code>Type</code></span></h3>

`ButtonType` · How the button reacts to the mouse: `Normal`, `Repeat` or `Toggle`. ([in context](/docs/ui-controls/#button-properties))

## Events

<h3 id="ontoggled"><span class="event"><code>OnToggled</code></span></h3>

`(BaseElement sender, bool isToggledOn)` · A `Toggle` button turns on or off, by a click or from code. ([in context](/docs/ui-controls/#button-events))
