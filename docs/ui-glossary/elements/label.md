---
layout: docs
legend: [prop, dp, method]
title: "Glossary: Label"
description: "The properties, methods and events of Label, in alphabetical order."
---

A light text element for captions, list rows and short descriptions. It lays its text out once, optionally wrapped, and draws it from the font atlas. It has no scrolling, editing or rich formatting; use a [`RichTextBox`](#richtextbox) when you need those. <a class="ref method" href="/docs/ui-glossary/elements/list-box/#addtextitem">`ListBox.AddTextItem`</a> and the default items template make their rows from labels.

`Label` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [text page](/docs/ui-text/#label) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="fontpath"><span class="dp"><code>FontPath</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="FontPath in context on the text page" aria-label="FontPath in context on the text page">🠆</a></h3>

`string` · The path of a TTF or OTF file to draw with (see [Fonts](#fonts)). A path that loads replaces the font system in use; an empty or unreadable path goes back to the general font, but keeps a font system you set by hand.

<h3 id="fontsize"><span class="dp"><code>FontSize</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="FontSize in context on the text page" aria-label="FontSize in context on the text page">🠆</a></h3>

`float` · The font size in units. Negative values become 0, and 0 draws nothing. Default <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultfontsize">`DefaultSettings.DefaultFontSize`</a> (14).

<h3 id="fontsystem"><span class="prop"><code>FontSystem</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="FontSystem in context on the text page" aria-label="FontSystem in context on the text page">🠆</a></h3>

<a class="ref prop" href="/docs/ui-glossary/elements/label/#fontsystem">`FontSystem`</a> · Read-only. The font system in use: <a class="ref prop" href="/docs/ui-glossary/elements/label/#fontsystemoverride">`FontSystemOverride`</a>, or <a class="ref prop" href="/docs/ui-glossary/elements/label/#generalfontsystem">`GeneralFontSystem`</a> without one.

<h3 id="fontsystemoverride"><span class="prop"><code>FontSystemOverride</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="FontSystemOverride in context on the text page" aria-label="FontSystemOverride in context on the text page">🠆</a></h3>

<a class="ref prop" href="/docs/ui-glossary/elements/label/#fontsystem">`FontSystem`</a> · A FontStashSharp font system for this label only, used instead of the general one. Setting <a class="ref dp" href="/docs/ui-glossary/elements/label/#fontpath">`FontPath`</a> sets it too. The label does not dispose it.

<h3 id="generalfontsystem"><span class="prop"><code>GeneralFontSystem</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="GeneralFontSystem in context on the text page" aria-label="GeneralFontSystem in context on the text page">🠆</a></h3>

<a class="ref prop" href="/docs/ui-glossary/elements/label/#fontsystem">`FontSystem`</a> · Static. The font system of every label and rich text box without one of their own; <a class="ref prop" href="/docs/ui-glossary/elements/label/#generalfontsystem">`Label.GeneralFontSystem`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/rich-text-box/#generalfontsystem">`RichTextBox.GeneralFontSystem`</a> are the same value. The bundled UbuntuMono unless you set one.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="lastfonterror"><span class="prop"><code>LastFontError</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="LastFontError in context on the text page" aria-label="LastFontError in context on the text page">🠆</a></h3>

`Exception` · Read-only. The exception of the last failed font preparation, `null` when the font is fine. The label draws nothing while it has no font.

<h3 id="linecount"><span class="prop"><code>LineCount</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="LineCount in context on the text page" aria-label="LineCount in context on the text page">🠆</a></h3>

`int` · Read-only. The number of laid out lines, after wrapping.

<h3 id="linespacing"><span class="dp"><code>LineSpacing</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="LineSpacing in context on the text page" aria-label="LineSpacing in context on the text page">🠆</a></h3>

`int` · Extra space between two lines, in units. Negative values become 0.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="text"><span class="dp"><code>Text</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="Text in context on the text page" aria-label="Text in context on the text page">🠆</a></h3>

`string` · The text shown. Line breaks start new lines, tabs become spaces. Default `""`.

<h3 id="textalignment"><span class="dp"><code>TextAlignment</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="TextAlignment in context on the text page" aria-label="TextAlignment in context on the text page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/text-alignment/">`TextAlignment`</a> · How each line is placed across the width. Default `Left`.

<h3 id="textmargin"><span class="dp"><code>TextMargin</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="TextMargin in context on the text page" aria-label="TextMargin in context on the text page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The space between the label's edges and its text, in units. It turns with <a class="ref dp" href="/docs/ui-glossary/elements/label/#textrotation">`TextRotation`</a>.

<h3 id="textrotation"><span class="dp"><code>TextRotation</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="TextRotation in context on the text page" aria-label="TextRotation in context on the text page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/text-rotation/">`TextRotation`</a> · Turns the text and its frame by a quarter or a half turn. Default `None`.

<h3 id="verticaltextalignment"><span class="dp"><code>VerticalTextAlignment</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="VerticalTextAlignment in context on the text page" aria-label="VerticalTextAlignment in context on the text page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/vertical-text-alignment/">`VerticalTextAlignment`</a> · Where the lines sit in a label taller than its text. Default `Top`.

<h3 id="wraptype"><span class="dp"><code>WrapType</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="WrapType in context on the text page" aria-label="WrapType in context on the text page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/text-wrap/">`TextWrap`</a> · Whether lines break at spaces to fit the width. Applies only with a fixed or stretched width or a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxwidth">`MaxWidth`</a>. Default `NoWrap`.

## Methods

<h3 id="label"><span class="method"><code>Label()</code></span> <a class="ctx" href="/docs/ui-text/#label-methods" title="Label() in context on the text page" aria-label="Label() in context on the text page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/label/#label">`Label(string name = null)`</a> · Creates a label. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

<h3 id="draw"><span class="method"><code>Draw()</code></span> <a class="ctx" href="/docs/ui-text/#label-methods" title="Draw() in context on the text page" aria-label="Draw() in context on the text page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/label/#draw">`Draw()`</a> · Draws the label's background, then its lines straight from the font atlas. The framework calls it; you don't need to.
