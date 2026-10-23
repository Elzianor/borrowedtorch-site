---
layout: docs
legend: [prop, dp, method]
title: "Glossary: RichTextBoxStyle"
description: "The members of RichTextBoxStyle, in alphabetical order."
---

The style class of [`RichTextBox`](/docs/ui-text/#richtextbox): the properties a style can set on it. Part styles <a class="ref prop" href="/docs/ui-glossary/types/rich-text-box-style/#scrollbarsstyle">`ScrollBarsStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>) and <a class="ref prop" href="/docs/ui-glossary/types/rich-text-box-style/#backgroundstyle">`BackgroundStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>). Framework defaults: <a class="ref prop" href="/docs/ui-glossary/types/rich-text-box-style/#text">`Text`</a> empty, <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>, and <a class="ref prop" href="/docs/ui-glossary/types/rich-text-box-style/#fontsize">`FontSize`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a>, <a class="ref prop" href="/docs/ui-glossary/types/rich-text-box-style/#textcursorthickness">`TextCursorThickness`</a>, <a class="ref prop" href="/docs/ui-glossary/types/rich-text-box-style/#textcursorcolor">`TextCursorColor`</a>, <a class="ref prop" href="/docs/ui-glossary/types/rich-text-box-style/#textselectioncolor">`TextSelectionColor`</a> from <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a>.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="backgroundstyle"><span class="prop"><code>BackgroundStyle</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="BackgroundStyle in context on the text page" aria-label="BackgroundStyle in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the image the box draws behind its text.

<h3 id="characterprintdelayms"><span class="prop"><code>CharacterPrintDelayMs</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="CharacterPrintDelayMs in context on the text page" aria-label="CharacterPrintDelayMs in context on the text page">➤</a></h3>

`int` · The time between two characters printed by <a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#animatetext">`AnimateText`</a>, in milliseconds. Negative values become 0; 0 sets the text at once.

<h3 id="fontpath"><span class="prop"><code>FontPath</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="FontPath in context on the text page" aria-label="FontPath in context on the text page">➤</a></h3>

`string` · The path of a TTF or OTF file to draw with (see [Fonts](#fonts)). A path that loads replaces the font system in use; an empty or unreadable path goes back to the general font, but keeps a font system you set by hand (as a label does).

<h3 id="fontsize"><span class="prop"><code>FontSize</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="FontSize in context on the text page" aria-label="FontSize in context on the text page">➤</a></h3>

`float` · The font size in units. Negative values become 0, and 0 draws nothing. Default <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultfontsize">`DefaultSettings.DefaultFontSize`</a> (14).

<h3 id="formatting"><span class="prop"><code>Formatting</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="Formatting in context on the text page" aria-label="Formatting in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-box-formatting/">`RichTextBoxFormatting`</a> · Whether a read-only box reads [rich formatting](#rich-formatting) tags out of its text. Default `Plain`.

<h3 id="inputtype"><span class="prop"><code>InputType</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="InputType in context on the text page" aria-label="InputType in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-box-input-type/">`RichTextBoxInputType`</a> · Whether typing inserts or replaces the character at the caret. The Insert key switches it. Default `Insert`.

<h3 id="linespacing"><span class="prop"><code>LineSpacing</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="LineSpacing in context on the text page" aria-label="LineSpacing in context on the text page">➤</a></h3>

`int` · Extra space between two lines, in units. Negative values become 0.

<h3 id="scrollbars"><span class="prop"><code>ScrollBars</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="ScrollBars in context on the text page" aria-label="ScrollBars in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/scroll-bars/">`ScrollBars`</a> · Which scroll bars the box may show when its text is larger than the box. Default `None`.

<h3 id="scrollbarsstyle"><span class="prop"><code>ScrollBarsStyle</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="ScrollBarsStyle in context on the text page" aria-label="ScrollBarsStyle in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a> · The style of the scroll bars.

<h3 id="scrollbarsthickness"><span class="prop"><code>ScrollBarsThickness</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="ScrollBarsThickness in context on the text page" aria-label="ScrollBarsThickness in context on the text page">➤</a></h3>

`int` · The thickness of the scroll bars in units. Default 0.

<h3 id="scrolltoendduringtextanimation"><span class="prop"><code>ScrollToEndDuringTextAnimation</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="ScrollToEndDuringTextAnimation in context on the text page" aria-label="ScrollToEndDuringTextAnimation in context on the text page">➤</a></h3>

`bool` · Whether <a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#animatetext">`AnimateText`</a> keeps the box scrolled to the end while it prints.

<h3 id="text"><span class="prop"><code>Text</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="Text in context on the text page" aria-label="Text in context on the text page">➤</a></h3>

`string` · The text shown. Line breaks become `\n`, tabs become spaces, then <a class="ref dp" href="/docs/ui-glossary/elements/rich-text-box/#textfilter">`TextFilter`</a> is applied. Default `""`.

<h3 id="textalignment"><span class="prop"><code>TextAlignment</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextAlignment in context on the text page" aria-label="TextAlignment in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/text-alignment/">`TextAlignment`</a> · How each line is placed across the width. `Justify` widens the spaces of wrapped lines in a box with a width of its own. Default `Left`.

<h3 id="textcursorcolor"><span class="prop"><code>TextCursorColor</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextCursorColor in context on the text page" aria-label="TextCursorColor in context on the text page">➤</a></h3>

`Color` · The colour of the caret. Default <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaulttextcursorcolor">`DefaultSettings.DefaultTextCursorColor`</a> (black).

<h3 id="textcursorthickness"><span class="prop"><code>TextCursorThickness</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextCursorThickness in context on the text page" aria-label="TextCursorThickness in context on the text page">➤</a></h3>

`int` · The width of the caret bar, or the height of the overwrite underline, in units. Default <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaulttextcursorthickness">`DefaultSettings.DefaultTextCursorThickness`</a> (1).

<h3 id="textfilter"><span class="prop"><code>TextFilter</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextFilter in context on the text page" aria-label="TextFilter in context on the text page">➤</a></h3>

`Func<string, string>` · Transforms every text assigned to <a class="ref dp" href="/docs/ui-glossary/elements/rich-text-box/#text">`Text`</a>, edits included. Setting it filters the current text.

<h3 id="textmargin"><span class="prop"><code>TextMargin</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextMargin in context on the text page" aria-label="TextMargin in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The space between the box's edges and its text, in units.

<h3 id="textselectioncolor"><span class="prop"><code>TextSelectionColor</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextSelectionColor in context on the text page" aria-label="TextSelectionColor in context on the text page">➤</a></h3>

`Color` · The colour behind selected text. Default <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaulttextselectioncolor">`DefaultSettings.DefaultTextSelectionColor`</a> (light blue).

<h3 id="type"><span class="prop"><code>Type</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="Type in context on the text page" aria-label="Type in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-box-type/">`RichTextBoxType`</a> · Whether the text can be edited. Default `ReadOnly`.

<h3 id="verticaltextalignment"><span class="prop"><code>VerticalTextAlignment</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="VerticalTextAlignment in context on the text page" aria-label="VerticalTextAlignment in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/vertical-text-alignment/">`VerticalTextAlignment`</a> · Where the lines sit in a box taller than its text. Applies only while the text fits; a scrolling text starts at the top. Default `Top`.

<h3 id="wraptype"><span class="prop"><code>WrapType</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="WrapType in context on the text page" aria-label="WrapType in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/text-wrap/">`TextWrap`</a> · Whether lines break to fit the width (with a fixed or stretched width, or a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxwidth">`MaxWidth`</a>). Words wider than a line are broken. Default `NoWrap`.

## Methods

<h3 id="richtextboxstyle"><span class="method"><code>RichTextBoxStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/rich-text-box-style/#richtextboxstyle">`RichTextBoxStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/rich-text-box-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
