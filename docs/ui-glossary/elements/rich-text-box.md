---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: RichTextBox"
description: "The properties, methods and events of RichTextBox, in alphabetical order."
---

The full text element: read-only text with coloured words, links and inline images, or an editable text field with a caret, selection, clipboard and undo. Text longer than the box scrolls inside it. Only the lines inside the visible area are drawn each frame, so the length of the text is limited by memory, not by the GPU texture size.

`RichTextBox` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [text page](/docs/ui-text/#richtextbox) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="backgroundstyle"><span class="dp"><code>BackgroundStyle</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="BackgroundStyle in context on the text page" aria-label="BackgroundStyle in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the image the box draws behind its text.

<h3 id="characterprintdelayms"><span class="dp"><code>CharacterPrintDelayMs</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="CharacterPrintDelayMs in context on the text page" aria-label="CharacterPrintDelayMs in context on the text page">➤</a></h3>

`int` · The time between two characters printed by <a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#animatetext">`AnimateText`</a>, in milliseconds. Negative values become 0; 0 sets the text at once.

<h3 id="fontpath"><span class="dp"><code>FontPath</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="FontPath in context on the text page" aria-label="FontPath in context on the text page">➤</a></h3>

`string` · The path of a TTF or OTF file to draw with (see [Fonts](#fonts)). A path that loads replaces the font system in use; an empty or unreadable path goes back to the general font, but keeps a font system you set by hand (as a label does).

<h3 id="fontsize"><span class="dp"><code>FontSize</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="FontSize in context on the text page" aria-label="FontSize in context on the text page">➤</a></h3>

`float` · The font size in units. Negative values become 0, and 0 draws nothing. Default <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultfontsize">`DefaultSettings.DefaultFontSize`</a> (14).

<h3 id="fontsystem"><span class="prop"><code>FontSystem</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="FontSystem in context on the text page" aria-label="FontSystem in context on the text page">➤</a></h3>

<a class="ref prop" href="/docs/ui-glossary/elements/rich-text-box/#fontsystem">`FontSystem`</a> · Read-only. The font system in use: <a class="ref prop" href="/docs/ui-glossary/elements/rich-text-box/#fontsystemoverride">`FontSystemOverride`</a>, or <a class="ref prop" href="/docs/ui-glossary/elements/rich-text-box/#generalfontsystem">`GeneralFontSystem`</a> without one.

<h3 id="fontsystemoverride"><span class="prop"><code>FontSystemOverride</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="FontSystemOverride in context on the text page" aria-label="FontSystemOverride in context on the text page">➤</a></h3>

<a class="ref prop" href="/docs/ui-glossary/elements/rich-text-box/#fontsystem">`FontSystem`</a> · A FontStashSharp font system for this box only, used instead of the general one. Setting <a class="ref dp" href="/docs/ui-glossary/elements/rich-text-box/#fontpath">`FontPath`</a> sets it too. The box does not dispose it.

<h3 id="formatting"><span class="dp"><code>Formatting</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="Formatting in context on the text page" aria-label="Formatting in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-box-formatting/">`RichTextBoxFormatting`</a> · Whether a read-only box reads [rich formatting](#rich-formatting) tags out of its text. Default `Plain`.

<h3 id="generalfontsystem"><span class="prop"><code>GeneralFontSystem</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="GeneralFontSystem in context on the text page" aria-label="GeneralFontSystem in context on the text page">➤</a></h3>

<a class="ref prop" href="/docs/ui-glossary/elements/rich-text-box/#fontsystem">`FontSystem`</a> · Static. The same value as <a class="ref prop" href="/docs/ui-glossary/elements/label/#generalfontsystem">`Label.GeneralFontSystem`</a>: the font system of every text element without one of its own.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="inputtype"><span class="dp"><code>InputType</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="InputType in context on the text page" aria-label="InputType in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-box-input-type/">`RichTextBoxInputType`</a> · Whether typing inserts or replaces the character at the caret. The Insert key switches it. Default `Insert`.

<h3 id="lastfonterror"><span class="prop"><code>LastFontError</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="LastFontError in context on the text page" aria-label="LastFontError in context on the text page">➤</a></h3>

`Exception` · Read-only. The exception of the last failed font preparation (font system or font size not usable), `null` when the font is fine. The box shows no text and gives up the keyboard while it has no font.

<h3 id="linespacing"><span class="dp"><code>LineSpacing</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="LineSpacing in context on the text page" aria-label="LineSpacing in context on the text page">➤</a></h3>

`int` · Extra space between two lines, in units. Negative values become 0.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="scrollbars"><span class="dp"><code>ScrollBars</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="ScrollBars in context on the text page" aria-label="ScrollBars in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/scroll-bars/">`ScrollBars`</a> · Which scroll bars the box may show when its text is larger than the box. Default `None`.

<h3 id="scrollbarsstyle"><span class="dp"><code>ScrollBarsStyle</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="ScrollBarsStyle in context on the text page" aria-label="ScrollBarsStyle in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a> · The style of the scroll bars.

<h3 id="scrollbarsthickness"><span class="dp"><code>ScrollBarsThickness</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="ScrollBarsThickness in context on the text page" aria-label="ScrollBarsThickness in context on the text page">➤</a></h3>

`int` · The thickness of the scroll bars in units. Default 0.

<h3 id="scrolltoendduringtextanimation"><span class="dp"><code>ScrollToEndDuringTextAnimation</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="ScrollToEndDuringTextAnimation in context on the text page" aria-label="ScrollToEndDuringTextAnimation in context on the text page">➤</a></h3>

`bool` · Whether <a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#animatetext">`AnimateText`</a> keeps the box scrolled to the end while it prints.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="text"><span class="dp"><code>Text</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="Text in context on the text page" aria-label="Text in context on the text page">➤</a></h3>

`string` · The text shown. Line breaks become `\n`, tabs become spaces, then <a class="ref dp" href="/docs/ui-glossary/elements/rich-text-box/#textfilter">`TextFilter`</a> is applied. Default `""`.

<h3 id="textalignment"><span class="dp"><code>TextAlignment</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextAlignment in context on the text page" aria-label="TextAlignment in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/text-alignment/">`TextAlignment`</a> · How each line is placed across the width. `Justify` widens the spaces of wrapped lines in a box with a width of its own. Default `Left`.

<h3 id="textcursorcolor"><span class="dp"><code>TextCursorColor</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextCursorColor in context on the text page" aria-label="TextCursorColor in context on the text page">➤</a></h3>

`Color` · The colour of the caret. Default <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaulttextcursorcolor">`DefaultSettings.DefaultTextCursorColor`</a> (black).

<h3 id="textcursorthickness"><span class="dp"><code>TextCursorThickness</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextCursorThickness in context on the text page" aria-label="TextCursorThickness in context on the text page">➤</a></h3>

`int` · The width of the caret bar, or the height of the overwrite underline, in units. Default <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaulttextcursorthickness">`DefaultSettings.DefaultTextCursorThickness`</a> (1).

<h3 id="textfilter"><span class="dp"><code>TextFilter</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextFilter in context on the text page" aria-label="TextFilter in context on the text page">➤</a></h3>

`Func<string, string>` · Transforms every text assigned to <a class="ref dp" href="/docs/ui-glossary/elements/rich-text-box/#text">`Text`</a>, edits included. Setting it filters the current text.

<h3 id="textmargin"><span class="dp"><code>TextMargin</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextMargin in context on the text page" aria-label="TextMargin in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The space between the box's edges and its text, in units.

<h3 id="textselectioncolor"><span class="dp"><code>TextSelectionColor</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="TextSelectionColor in context on the text page" aria-label="TextSelectionColor in context on the text page">➤</a></h3>

`Color` · The colour behind selected text. Default <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaulttextselectioncolor">`DefaultSettings.DefaultTextSelectionColor`</a> (light blue).

<h3 id="type"><span class="dp"><code>Type</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="Type in context on the text page" aria-label="Type in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-box-type/">`RichTextBoxType`</a> · Whether the text can be edited. Default `ReadOnly`.

<h3 id="verticaltextalignment"><span class="dp"><code>VerticalTextAlignment</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="VerticalTextAlignment in context on the text page" aria-label="VerticalTextAlignment in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/vertical-text-alignment/">`VerticalTextAlignment`</a> · Where the lines sit in a box taller than its text. Applies only while the text fits; a scrolling text starts at the top. Default `Top`.

<h3 id="wraptype"><span class="dp"><code>WrapType</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="WrapType in context on the text page" aria-label="WrapType in context on the text page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/text-wrap/">`TextWrap`</a> · Whether lines break to fit the width (with a fixed or stretched width, or a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxwidth">`MaxWidth`</a>). Words wider than a line are broken. Default `NoWrap`.

## Fields

<h3 id="richactions"><code>RichActions</code> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="RichActions in context on the text page" aria-label="RichActions in context on the text page">➤</a></h3>

`List<Action>` · Static field. The actions `[a=n]` links run, shared by every box.

<h3 id="richcolors"><code>RichColors</code> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="RichColors in context on the text page" aria-label="RichColors in context on the text page">➤</a></h3>

`List<Color>` · Static field. The colours `[c=n]` tags index, shared by every box.

<h3 id="richimages"><code>RichImages</code> <a class="ctx" href="/docs/ui-text/#richtextbox-properties" title="RichImages in context on the text page" aria-label="RichImages in context on the text page">➤</a></h3>

`List<Texture2D>` · Static field. The textures `[i=n]` tags show, shared by every box.

## Methods

<h3 id="richtextbox"><span class="method"><code>RichTextBox()</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-methods" title="RichTextBox() in context on the text page" aria-label="RichTextBox() in context on the text page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#richtextbox">`RichTextBox(string name = null)`</a> · Creates a rich text box. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

<h3 id="animatetext"><span class="method"><code>AnimateText()</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-methods" title="AnimateText() in context on the text page" aria-label="AnimateText() in context on the text page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#animatetext">`AnimateText(string text)`</a> · Types the text out with <a class="ref dp" href="/docs/ui-glossary/elements/rich-text-box/#characterprintdelayms">`CharacterPrintDelayMs`</a> per character and makes the box read-only. Stops a running animation first.

<h3 id="placecursorat"><span class="method"><code>PlaceCursorAt()</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-methods" title="PlaceCursorAt() in context on the text page" aria-label="PlaceCursorAt() in context on the text page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#placecursorat">`PlaceCursorAt(int position)`</a> · Moves the caret to a text position (clamped to the text), scrolls it into view and gives the box the keyboard. A read-only box shows no caret but scrolls there.

<h3 id="placecursorattextend"><span class="method"><code>PlaceCursorAtTextEnd()</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-methods" title="PlaceCursorAtTextEnd() in context on the text page" aria-label="PlaceCursorAtTextEnd() in context on the text page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#placecursorattextend">`PlaceCursorAtTextEnd()`</a> · <a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#placecursorat">`PlaceCursorAt(Text.Length)`</a>.

<h3 id="placecursorattextstart"><span class="method"><code>PlaceCursorAtTextStart()</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-methods" title="PlaceCursorAtTextStart() in context on the text page" aria-label="PlaceCursorAtTextStart() in context on the text page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#placecursorattextstart">`PlaceCursorAtTextStart()`</a> · <a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#placecursorat">`PlaceCursorAt(0)`</a>.

<h3 id="selectalltext"><span class="method"><code>SelectAllText()</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-methods" title="SelectAllText() in context on the text page" aria-label="SelectAllText() in context on the text page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#selectalltext">`SelectAllText()`</a> · Selects the whole text, scrolls to its end and gives the box the keyboard.

<h3 id="selecttextinterval"><span class="method"><code>SelectTextInterval()</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-methods" title="SelectTextInterval() in context on the text page" aria-label="SelectTextInterval() in context on the text page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#selecttextinterval">`SelectTextInterval(int start, int end)`</a> · Selects the text between two positions (clamped to the text), with the caret at `end`, scrolled into view, and gives the box the keyboard. Does nothing when `start` equals `end`.

<h3 id="stoptextanimation"><span class="method"><code>StopTextAnimation()</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-methods" title="StopTextAnimation() in context on the text page" aria-label="StopTextAnimation() in context on the text page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/rich-text-box/#stoptextanimation">`StopTextAnimation()`</a> · Stops a running text animation; the whole text is shown then.

## Events

<h3 id="onapply"><span class="event"><code>OnApply</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-events" title="OnApply in context on the text page" aria-label="OnApply in context on the text page">➤</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, string text)</code> · A read-write box ends its editing: Enter, a press elsewhere or another element focused. Not when it is hidden, disabled or removed. Raised even if the text did not change.

<h3 id="ontextchanged"><span class="event"><code>OnTextChanged</code></span> <a class="ctx" href="/docs/ui-text/#richtextbox-events" title="OnTextChanged in context on the text page" aria-label="OnTextChanged in context on the text page">➤</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, string text)</code> · <a class="ref dp" href="/docs/ui-glossary/elements/rich-text-box/#text">`Text`</a> changed, by typing, deleting, pasting, undo or redo, code, a binding, a style or the end of a text animation. The new lines are already laid out.
