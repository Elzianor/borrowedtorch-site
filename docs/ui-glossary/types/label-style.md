---
layout: docs
legend: [prop, method, dp]
title: "Glossary: LabelStyle"
description: "The members of LabelStyle, in alphabetical order."
---

The style class of [`Label`](/docs/ui-text/#label): the properties a style can set on it. None. Framework defaults: <a class="ref prop" href="/docs/ui-glossary/types/label-style/#text">`Text`</a> empty, <a class="ref prop" href="/docs/ui-glossary/types/label-style/#fontsize">`FontSize`</a> `DefaultFontSize`, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a> `DefaultTextColor`, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a> off, <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromparent">`InheritState.FromParent`</a>.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="fontpath"><span class="prop"><code>FontPath</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="FontPath in context on the text page" aria-label="FontPath in context on the text page">→</a></h3>

`string` · The path of a TTF or OTF file to draw with (see [Fonts](#fonts)). A path that loads replaces the font system in use; an empty or unreadable path goes back to the general font, but keeps a font system you set by hand.

<h3 id="fontsize"><span class="prop"><code>FontSize</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="FontSize in context on the text page" aria-label="FontSize in context on the text page">→</a></h3>

`float` · The font size in units. Negative values become 0, and 0 draws nothing. Default <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultfontsize">`DefaultSettings.DefaultFontSize`</a> (14).

<h3 id="linespacing"><span class="prop"><code>LineSpacing</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="LineSpacing in context on the text page" aria-label="LineSpacing in context on the text page">→</a></h3>

`int` · Extra space between two lines, in units. Negative values become 0.

<h3 id="text"><span class="prop"><code>Text</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="Text in context on the text page" aria-label="Text in context on the text page">→</a></h3>

`string` · The text shown. Line breaks start new lines, tabs become spaces. Default `""`.

<h3 id="textalignment"><span class="prop"><code>TextAlignment</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="TextAlignment in context on the text page" aria-label="TextAlignment in context on the text page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/text-alignment/">`TextAlignment`</a> · How each line is placed across the width. Default `Left`.

<h3 id="textmargin"><span class="prop"><code>TextMargin</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="TextMargin in context on the text page" aria-label="TextMargin in context on the text page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The space between the label's edges and its text, in units. It turns with <a class="ref dp" href="/docs/ui-glossary/elements/label/#textrotation">`TextRotation`</a>.

<h3 id="textrotation"><span class="prop"><code>TextRotation</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="TextRotation in context on the text page" aria-label="TextRotation in context on the text page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/text-rotation/">`TextRotation`</a> · Turns the text and its frame by a quarter or a half turn. Default `None`.

<h3 id="verticaltextalignment"><span class="prop"><code>VerticalTextAlignment</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="VerticalTextAlignment in context on the text page" aria-label="VerticalTextAlignment in context on the text page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/vertical-text-alignment/">`VerticalTextAlignment`</a> · Where the lines sit in a label taller than its text. Default `Top`.

<h3 id="wraptype"><span class="prop"><code>WrapType</code></span> <a class="ctx" href="/docs/ui-text/#label-properties" title="WrapType in context on the text page" aria-label="WrapType in context on the text page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/text-wrap/">`TextWrap`</a> · Whether lines break at spaces to fit the width. Applies only with a fixed or stretched width or a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxwidth">`MaxWidth`</a>. Default `NoWrap`.

## Methods

<h3 id="labelstyle"><span class="method"><code>LabelStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/label-style/#labelstyle">`LabelStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/label-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
