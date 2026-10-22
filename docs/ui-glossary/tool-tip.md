---
layout: docs
title: "Glossary: ToolTip"
description: The properties, methods and events of ToolTip, in alphabetical order.
---

A small popup that appears next to the mouse cursor while it rests over an element. You attach it through the element's `ToolTip` property (see the [base element](/docs/ui-base-element/)), not by adding it to the tree.

`ToolTip` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [controls page](/docs/ui-controls/#tooltip) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="content"><span class="dp"><code>Content</code></span></h3>

`BaseElement` · Any element shown in the tooltip instead of a text. ([in context](/docs/ui-controls/#tooltip-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`ToolTipStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="marginfrommousecursor"><span class="dp"><code>MarginFromMouseCursor</code></span></h3>

`Margin` · The shift from the cursor, in units: `Left` is added to the x position and `Top` to the y position, whatever the placement (use negative values to move a `TopLeft` tooltip away from the cursor). The other sides are not used. ([in context](/docs/ui-controls/#tooltip-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="placement"><span class="dp"><code>Placement</code></span></h3>

`ToolTipPlacement` · Which side of the cursor the tooltip appears on. `TopLeft` is the default. ([in context](/docs/ui-controls/#tooltip-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`ToolTipStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="text"><span class="dp"><code>Text</code></span></h3>

`string` · Creates a centred `RichTextBox` content showing this text, styled by `TextStyle`. ([in context](/docs/ui-controls/#tooltip-properties))

<h3 id="textstyle"><span class="dp"><code>TextStyle</code></span></h3>

`RichTextBoxStyle` · The style of the text content made from `Text`. ([in context](/docs/ui-controls/#tooltip-properties))

<h3 id="timebeforeshowms"><span class="dp"><code>TimeBeforeShowMs</code></span></h3>

`int` · How long the mouse rests on the element before the tooltip appears, in milliseconds. 0 shows it at once. ([in context](/docs/ui-controls/#tooltip-properties))

## Methods

<h3 id="show"><span class="method"><code>Show()</code></span></h3>

`Show()` · Places the tooltip at the mouse cursor and shows it after the next layout pass. The element it is attached to calls this; it does nothing for a tooltip not attached to an element.
