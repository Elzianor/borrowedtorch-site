---
layout: docs
title: "Glossary: CheckBox"
description: The properties, methods and events of CheckBox, in alphabetical order.
---

A box with a text or any element beside it. It works as a check box that turns on and off, or as a radio button that is one choice of a group.

`CheckBox` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [controls page](/docs/ui-controls/#checkbox) shows it in context, with code and screenshots.

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property, which a style, a binding or an animation can set.

## Properties

<h3 id="checked"><span class="dp"><code>Checked</code></span></h3>

`bool` · Whether the box is checked. Setting it raises `OnCheckedUnchecked`, and checking a radio button unchecks the others of its group. ([in context](/docs/ui-controls/#checkbox-properties))

<h3 id="checkedsolidcolor"><span class="dp"><code>CheckedSolidColor</code></span></h3>

`Color` · The colour of the box while it is checked, without textures. ([in context](/docs/ui-controls/#checkbox-properties))

<h3 id="content"><span class="dp"><code>Content</code></span></h3>

`BaseElement` · Any element shown beside the box instead of a text. A content you give is detached, not disposed, when it is replaced. ([in context](/docs/ui-controls/#checkbox-properties))

<h3 id="direction"><span class="dp"><code>Direction</code></span></h3>

`CheckBoxDirection` · Which side of the content the box is on: `Left` (the default) or `Right`. ([in context](/docs/ui-controls/#checkbox-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`CheckBoxStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="groupid"><span class="dp"><code>GroupId</code></span></h3>

`string` · The group of a radio button: the radio buttons in the tree with the same id uncheck each other. Not used by a `CheckBox`. ([in context](/docs/ui-controls/#checkbox-properties))

<h3 id="imagestyle"><span class="dp"><code>ImageStyle</code></span></h3>

`ImageStyle` · The style of the image that draws the box. ([in context](/docs/ui-controls/#checkbox-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`CheckBoxStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="text"><span class="dp"><code>Text</code></span></h3>

`string` · Creates a `RichTextBox` content showing this text, styled by `TextStyle`. ([in context](/docs/ui-controls/#checkbox-properties))

<h3 id="textstyle"><span class="dp"><code>TextStyle</code></span></h3>

`RichTextBoxStyle` · The style of the text content made from `Text`. ([in context](/docs/ui-controls/#checkbox-properties))

<h3 id="type"><span class="dp"><code>Type</code></span></h3>

`CheckBoxType` · `CheckBox` (the default) or `RadioButton`. ([in context](/docs/ui-controls/#checkbox-properties))

<h3 id="uncheckedsolidcolor"><span class="dp"><code>UncheckedSolidColor</code></span></h3>

`Color` · The colour of the box while it is unchecked, without textures. ([in context](/docs/ui-controls/#checkbox-properties))

## Events

<h3 id="oncheckedunchecked"><span class="event"><code>OnCheckedUnchecked</code></span></h3>

`(BaseElement sender, bool isChecked)` · `Checked` changes: by a click, from code, by a binding, or because another box of the group was checked. ([in context](/docs/ui-controls/#checkbox-events))
