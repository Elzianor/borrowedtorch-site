---
layout: docs
title: "Glossary: RootElement"
description: The properties, methods and events of RootElement, in alphabetical order.
---

`RootElement` is the top of the element tree. `BorrowedTorchUI` creates it (you can't create one yourself) and gives it as `ui.RootElement`; `ui.AddElementToRoot(element)` adds an item to it. It has the size of the game window in units (the back buffer size divided by the display scale) and follows the back buffer when the window is resized, or takes the size given to `ApplyGameWindowSize`. It can't be resizable and it draws no background of its own, so give a full-screen panel your background colour instead.

`RootElement` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [base element page](/docs/ui-base-element/#the-root-element) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`RootElementStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`RootElementStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))
