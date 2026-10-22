---
layout: docs
title: "Glossary: ProgressBar"
description: The properties, methods and events of ProgressBar, in alphabetical order.
---

A bar that fills in proportion to `Value` between `Min` and `Max`. It only shows a value; the mouse does not change it.

`ProgressBar` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [controls page](/docs/ui-controls/#progressbar) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`ProgressBarStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="max"><span class="dp"><code>Max</code></span></h3>

`float` · The value of a full bar. Setting it below `Min` moves `Min` along. ([in context](/docs/ui-controls/#progressbar-properties))

<h3 id="min"><span class="dp"><code>Min</code></span></h3>

`float` · The value of an empty bar. Setting it above `Max` moves `Max` along. ([in context](/docs/ui-controls/#progressbar-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="orientation"><span class="dp"><code>Orientation</code></span></h3>

`Orientation` · `Horizontal` (the default, fills from the left) or `Vertical` (fills from the bottom). ([in context](/docs/ui-controls/#progressbar-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`ProgressBarStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="value"><span class="dp"><code>Value</code></span></h3>

`float` · The current value, clamped to the range between `Min` and `Max`. ([in context](/docs/ui-controls/#progressbar-properties))
