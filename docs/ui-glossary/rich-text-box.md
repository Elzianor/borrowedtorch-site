---
layout: docs
title: "Glossary: RichTextBox"
description: The properties, methods and events of RichTextBox, in alphabetical order.
---

The full text element: read-only text with coloured words, links and inline images, or an editable text field with a caret, selection, clipboard and undo. Text longer than the box scrolls inside it. Only the lines inside the visible area are drawn each frame, so the length of the text is limited by memory, not by the GPU texture size.

`RichTextBox` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [text page](/docs/ui-text/#richtextbox) shows it in context, with code and screenshots.

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property, which a style, a binding or an animation can set.

## Properties

<h3 id="backgroundstyle"><span class="dp"><code>BackgroundStyle</code></span></h3>

`ImageStyle` · The style of the image the box draws behind its text. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="characterprintdelayms"><span class="dp"><code>CharacterPrintDelayMs</code></span></h3>

`int` · The time between two characters printed by `AnimateText`, in milliseconds. Negative values become 0; 0 sets the text at once. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="fontpath"><span class="dp"><code>FontPath</code></span></h3>

`string` · The path of a TTF or OTF file to draw with (see [Fonts](#fonts)). A path that loads replaces the font system in use; an empty or unreadable path goes back to the general font, but keeps a font system you set by hand (as a label does). ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="fontsize"><span class="dp"><code>FontSize</code></span></h3>

`float` · The font size in units. Negative values become 0, and 0 draws nothing. Default `DefaultSettings.DefaultFontSize` (14). ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="fontsystem"><span class="prop"><code>FontSystem</code></span></h3>

`FontSystem` · Read-only. The font system in use: `FontSystemOverride`, or `GeneralFontSystem` without one. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="fontsystemoverride"><span class="prop"><code>FontSystemOverride</code></span></h3>

`FontSystem` · A FontStashSharp font system for this box only, used instead of the general one. Setting `FontPath` sets it too. The box does not dispose it. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="formatting"><span class="dp"><code>Formatting</code></span></h3>

`RichTextBoxFormatting` · Whether a read-only box reads [rich formatting](#rich-formatting) tags out of its text. Default `Plain`. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="generalfontsystem"><span class="prop"><code>GeneralFontSystem</code></span></h3>

`FontSystem` · Static. The same value as `Label.GeneralFontSystem`: the font system of every text element without one of its own. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`RichTextBoxStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="inputtype"><span class="dp"><code>InputType</code></span></h3>

`RichTextBoxInputType` · Whether typing inserts or replaces the character at the caret. The Insert key switches it. Default `Insert`. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="lastfonterror"><span class="prop"><code>LastFontError</code></span></h3>

`Exception` · Read-only. The exception of the last failed font preparation (font system or font size not usable), `null` when the font is fine. The box shows no text and gives up the keyboard while it has no font. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="linespacing"><span class="dp"><code>LineSpacing</code></span></h3>

`int` · Extra space between two lines, in units. Negative values become 0. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="richactions"><span class="prop"><code>RichActions</code></span></h3>

`List<Action>` · Static field. The actions `[a=n]` links run, shared by every box. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="richcolors"><span class="prop"><code>RichColors</code></span></h3>

`List<Color>` · Static field. The colours `[c=n]` tags index, shared by every box. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="richimages"><span class="prop"><code>RichImages</code></span></h3>

`List<Texture2D>` · Static field. The textures `[i=n]` tags show, shared by every box. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="scrollbars"><span class="dp"><code>ScrollBars</code></span></h3>

`ScrollBars` · Which scroll bars the box may show when its text is larger than the box. Default `None`. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="scrollbarsstyle"><span class="dp"><code>ScrollBarsStyle</code></span></h3>

`SliderStyle` · The style of the scroll bars. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="scrollbarsthickness"><span class="dp"><code>ScrollBarsThickness</code></span></h3>

`int` · The thickness of the scroll bars in units. Default 0. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="scrolltoendduringtextanimation"><span class="dp"><code>ScrollToEndDuringTextAnimation</code></span></h3>

`bool` · Whether `AnimateText` keeps the box scrolled to the end while it prints. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`RichTextBoxStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="text"><span class="dp"><code>Text</code></span></h3>

`string` · The text shown. Line breaks become `\n`, tabs become spaces, then `TextFilter` is applied. Default `""`. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="textalignment"><span class="dp"><code>TextAlignment</code></span></h3>

`TextAlignment` · How each line is placed across the width. `Justify` widens the spaces of wrapped lines in a box with a width of its own. Default `Left`. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="textcursorcolor"><span class="dp"><code>TextCursorColor</code></span></h3>

`Color` · The colour of the caret. Default `DefaultSettings.DefaultTextCursorColor` (black). ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="textcursorthickness"><span class="dp"><code>TextCursorThickness</code></span></h3>

`int` · The width of the caret bar, or the height of the overwrite underline, in units. Default `DefaultSettings.DefaultTextCursorThickness` (1). ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="textfilter"><span class="dp"><code>TextFilter</code></span></h3>

`Func<string, string>` · Transforms every text assigned to `Text`, edits included. Setting it filters the current text. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="textmargin"><span class="dp"><code>TextMargin</code></span></h3>

`Margin` · The space between the box's edges and its text, in units. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="textselectioncolor"><span class="dp"><code>TextSelectionColor</code></span></h3>

`Color` · The colour behind selected text. Default `DefaultSettings.DefaultTextSelectionColor` (light blue). ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="type"><span class="dp"><code>Type</code></span></h3>

`RichTextBoxType` · Whether the text can be edited. Default `ReadOnly`. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="verticaltextalignment"><span class="dp"><code>VerticalTextAlignment</code></span></h3>

`VerticalTextAlignment` · Where the lines sit in a box taller than its text. Applies only while the text fits; a scrolling text starts at the top. Default `Top`. ([in context](/docs/ui-text/#richtextbox-properties))

<h3 id="wraptype"><span class="dp"><code>WrapType</code></span></h3>

`TextWrap` · Whether lines break to fit the width (with a fixed or stretched width, or a `MaxWidth`). Words wider than a line are broken. Default `NoWrap`. ([in context](/docs/ui-text/#richtextbox-properties))

## Methods

<h3 id="animatetext"><span class="method"><code>AnimateText()</code></span></h3>

`AnimateText(string text)` · Types the text out with `CharacterPrintDelayMs` per character and makes the box read-only. Stops a running animation first.

<h3 id="placecursorat"><span class="method"><code>PlaceCursorAt()</code></span></h3>

`PlaceCursorAt(int position)` · Moves the caret to a text position (clamped to the text), scrolls it into view and gives the box the keyboard. A read-only box shows no caret but scrolls there.

<h3 id="placecursorattextend"><span class="method"><code>PlaceCursorAtTextEnd()</code></span></h3>

`PlaceCursorAtTextEnd()` · `PlaceCursorAt(Text.Length)`.

<h3 id="placecursorattextstart"><span class="method"><code>PlaceCursorAtTextStart()</code></span></h3>

`PlaceCursorAtTextStart()` · `PlaceCursorAt(0)`.

<h3 id="selectalltext"><span class="method"><code>SelectAllText()</code></span></h3>

`SelectAllText()` · Selects the whole text, scrolls to its end and gives the box the keyboard.

<h3 id="selecttextinterval"><span class="method"><code>SelectTextInterval()</code></span></h3>

`SelectTextInterval(int start, int end)` · Selects the text between two positions (clamped to the text), with the caret at `end`, scrolled into view, and gives the box the keyboard. Does nothing when `start` equals `end`.

<h3 id="stoptextanimation"><span class="method"><code>StopTextAnimation()</code></span></h3>

`StopTextAnimation()` · Stops a running text animation; the whole text is shown then.

## Events

<h3 id="onapply"><span class="event"><code>OnApply</code></span></h3>

`(BaseElement sender, string text)` · A read-write box ends its editing: Enter, a press elsewhere or another element focused. Not when it is hidden, disabled or removed. Raised even if the text did not change. ([in context](/docs/ui-text/#richtextbox-events))

<h3 id="ontextchanged"><span class="event"><code>OnTextChanged</code></span></h3>

`(BaseElement sender, string text)` · `Text` changed, by typing, deleting, pasting, undo or redo, code, a binding, a style or the end of a text animation. The new lines are already laid out. ([in context](/docs/ui-text/#richtextbox-events))
