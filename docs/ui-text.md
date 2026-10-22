---
layout: docs
title: "UI: text"
description: Plain labels, the rich text box for formatted, editable and scrolling text, and the fonts both of them draw with.
---

Two elements show text. `Label` is the cheap one: plain text in one or more lines, nothing else. `RichTextBox` adds
coloured words, links, inline images, editing, scrolling and a typing animation. Both draw their glyphs straight from a
font atlas every frame, so no text texture is made, and both get their fonts the same way (see [Fonts](#fonts)).

Both are elements: they have all the properties, events and methods of [`BaseElement`](/docs/ui-base-element/), which
the tables below don't repeat (the text colour, for example, is the inherited `ForegroundColor`). Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>: `Foo` is backed by `FooDP`, which a style, a binding or an animation
can set (see [styles, bindings and animation](/docs/ui-styles/)). Screenshots use the theme from
[styles](/docs/ui-styles/#the-theme-of-these-pages).

## Label

A light text element for captions, list rows and short descriptions. It lays its text out once, optionally wrapped,
and draws it from the font atlas. It has no scrolling, editing or rich formatting; use a [`RichTextBox`](#richtextbox)
when you need those. `ListBox.AddTextItem` and the default items template make their rows from labels.

<figure class="shot">
  <img src="{{ '/assets/img/ui/text-label.png' | relative_url }}" width="519" height="174" alt="A gold Chapter one caption, a centred paragraph wrapped over three lines, and three short labels turned clockwise, counterclockwise and upside down">
  <figcaption>A caption, a wrapped and centred description, and three turned labels.</figcaption>
</figure>

```csharp
var caption = new Label("caption")
{
    Text = "Chapter one",
    FontSize = 24,
    ForegroundColor = new Color(233, 194, 122),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 14)
};

// wraps inside its width, centered lines
var description = new Label("description")
{
    Text = "The torch burns low. Find a way out of the caves " +
           "before the last ember dies.",
    WrapType = TextWrap.Wrap,
    TextAlignment = TextAlignment.Center,
    LineSpacing = 4,
    DesiredWidth = 260,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 56)
};

// turned on its side: the label fitted to its text swaps its width and height
Label Turned(string text, TextRotation rotation, int left) => new()
{
    Text = text,
    TextRotation = rotation,
    TextMargin = (6, 4, 6, 4),
    BackgroundColor = new Color(40, 31, 23),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (left, 16)
};

ui.AddElementToRoot(caption);
ui.AddElementToRoot(description);
ui.AddElementToRoot(Turned("Clockwise", TextRotation.Clockwise, 316));
ui.AddElementToRoot(Turned("Counterclockwise", TextRotation.CounterClockwise, 356));
ui.AddElementToRoot(Turned("Upside down", TextRotation.UpsideDown, 400));
```

A label without a size of its own fits its text: its width is the longest line plus `TextMargin`, its height the lines
plus `TextMargin`. Line breaks always start a new line (`\r\n` and `\r` are turned into `\n`, tabs into spaces).

**Wrapping.** `WrapType = TextWrap.Wrap` breaks the lines at spaces to fit the label's width, but only when the label
has a width to wrap at: a fixed `DesiredWidth`, a width stretched by its parent, or a `MaxWidth` when it fits its text.
A label sized to its text without a `MaxWidth` never wraps. Stretched in a parent that fits its content, a wrapping
label wraps at the width the parent's other content gives; alone there, it keeps one line unless the parent has a
`MaxWidth`. A word wider than the whole line gets a line of its own and is not broken. `LineCount` tells how many lines the text took.

**Alignment.** `TextAlignment` places each line across the width (`Justify` is drawn like `Left` in a label).
`VerticalTextAlignment` places the lines in a label taller than its text; lines that don't fit start at the top margin.

**Rotation.** `TextRotation` turns the text together with its frame: the margins, both alignments and the wrapping turn
with it. A label turned on its side wraps at its height, and a label fitted to its text swaps its width and height, as
the turned labels in the screenshot do. `Clockwise` reads from the top down, `CounterClockwise` from the bottom up. Only
the drawing turns: clicks and cropping keep the label's box.

By default a label is not hit-tested (`HitTest` is `false`, so clicks go to what is under it) and takes its state from
its parent (`InheritState.FromParent`), so a label inside a button follows the button's hover and pressed state.

### Label properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Text`</span> | `string` | The text shown. Line breaks start new lines, tabs become spaces. Default `""`. |
| <span class="dp">`FontSize`</span> | `float` | The font size in units. Negative values become 0, and 0 draws nothing. Default `DefaultSettings.DefaultFontSize` (14). |
| <span class="dp">`FontPath`</span> | `string` | The path of a TTF or OTF file to draw with (see [Fonts](#fonts)). A path that loads replaces the font system in use; an empty or unreadable path goes back to the general font, but keeps a font system you set by hand. |
| <span class="dp">`TextMargin`</span> | `Margin` | The space between the label's edges and its text, in units. It turns with `TextRotation`. |
| <span class="dp">`TextAlignment`</span> | `TextAlignment` | How each line is placed across the width. Default `Left`. |
| <span class="dp">`VerticalTextAlignment`</span> | `VerticalTextAlignment` | Where the lines sit in a label taller than its text. Default `Top`. |
| <span class="dp">`TextRotation`</span> | `TextRotation` | Turns the text and its frame by a quarter or a half turn. Default `None`. |
| <span class="dp">`WrapType`</span> | `TextWrap` | Whether lines break at spaces to fit the width. Applies only with a fixed or stretched width or a `MaxWidth`. Default `NoWrap`. |
| <span class="dp">`LineSpacing`</span> | `int` | Extra space between two lines, in units. Negative values become 0. |
| <span class="prop">`LineCount`</span> | `int` | Read-only. The number of laid out lines, after wrapping. |
| <span class="prop">`LastFontError`</span> | `Exception` | Read-only. The exception of the last failed font preparation, `null` when the font is fine. The label draws nothing while it has no font. |
| <span class="prop">`FontSystemOverride`</span> | `FontSystem` | A FontStashSharp font system for this label only, used instead of the general one. Setting `FontPath` sets it too. The label does not dispose it. |
| <span class="prop">`FontSystem`</span> | `FontSystem` | Read-only. The font system in use: `FontSystemOverride`, or `GeneralFontSystem` without one. |
| <span class="prop">`GeneralFontSystem`</span> | `FontSystem` | Static. The font system of every label and rich text box without one of their own; `Label.GeneralFontSystem` and `RichTextBox.GeneralFontSystem` are the same value. The bundled UbuntuMono unless you set one. |

### Label methods

| Method | Description |
| --- | --- |
| `Label(string name = null)` | Creates a label. The name is used by `GetElementByName`. |
| <span class="method">`Draw()`</span> | Draws the label's background, then its lines straight from the font atlas. The framework calls it; you don't need to. |

#### `TextAlignment`

Also used by `RichTextBox`.

| Value | Meaning |
| --- | --- |
| `Left` | Lines start at the left margin. |
| `Center` | Lines are centred in the width. |
| `Right` | Lines end at the right margin. |
| `Justify` | In a wrapping `RichTextBox`, the spaces of each line are widened so the line fills the width (not the last line of a paragraph). A label draws it like `Left`. |

#### `VerticalTextAlignment`

Also used by `RichTextBox`.

| Value | Meaning |
| --- | --- |
| `Top` | The lines start at the top margin. |
| `Center` | The lines are centred in the free height. |
| `Bottom` | The lines end at the bottom margin. |

#### `TextWrap`

Also used by `RichTextBox`.

| Value | Meaning |
| --- | --- |
| `NoWrap` | Every paragraph is one line, however long. |
| `Wrap` | Lines break to fit the width. |

#### `TextRotation`

| Value | Meaning |
| --- | --- |
| `None` | The text is drawn as usual. |
| `Clockwise` | A quarter turn to the right: the text reads from the top down. |
| `CounterClockwise` | A quarter turn to the left: the text reads from the bottom up. |
| `UpsideDown` | A half turn. |

Style class: `LabelStyle` (the same properties, see [styles](/docs/ui-styles/)). Its defaults are an empty `Text`,
`FontSize` 14, `ForegroundColor` `DefaultSettings.DefaultTextColor` (black), `HitTest` off and
`InheritState.FromParent`.

## RichTextBox

The full text element: read-only text with coloured words, links and inline images, or an editable text field with a
caret, selection, clipboard and undo. Text longer than the box scrolls inside it. Only the lines inside the visible
area are drawn each frame, so the length of the text is limited by memory, not by the GPU texture size.

### Rich formatting

<figure class="shot">
  <img src="{{ '/assets/img/ui/text-rich.png' | relative_url }}" width="466" height="67" alt="A two-line hint with Space in orange, E in green and a small check box image inside the sentence">
  <figcaption>Coloured words and an inline image in a read-only rich text box.</figcaption>
</figure>

```csharp
// the tags index these shared lists: [c=0] the first color, [a=0] the first action,
// [i=0] the first image
RichTextBox.RichColors.Add(new Color(242, 140, 40));
RichTextBox.RichColors.Add(new Color(140, 200, 120));
RichTextBox.RichActions.Add(() => Console.WriteLine("Open the help"));
RichTextBox.RichImages.Add(LoadTexture("CheckBox/Checked.png"));

var hint = new RichTextBox("hint")
{
    Text = "Press [c=0]Space[/] to jump and [c=1]E[/] to use. " +
           "Quests marked [i=0][/] are done, read the [a=0]help[/] for more.",
    Formatting = RichTextBoxFormatting.Rich,
    WrapType = TextWrap.Wrap,
    DesiredWidth = 440,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16),
    BackgroundColor = Color.Transparent
};

ui.AddElementToRoot(hint);
```

With `Formatting = RichTextBoxFormatting.Rich` a read-only box reads tags out of its text. A tag in square brackets
holds one or more instructions separated by commas, each a letter and an index into one of three static lists shared by
every box:

| Tag | Effect |
| --- | --- |
| `[c=n]` | The following text is drawn in `RichTextBox.RichColors[n]`. |
| `[a=n]` | The following text is a link: pressing it runs `RichTextBox.RichActions[n]`. |
| `[i=n]` | The word is replaced by `RichTextBox.RichImages[n]`, drawn as a square one line high. A `c` instruction tints it. |
| `[/]` | Ends all formatting. |

Instructions combine, as in `[c=0,a=1]help[/]`. The formatting goes on over the following words until `[/]`, so
`[c=0]two words[/]` colours both. An image tag goes on too, so close it at once, as in `[i=0][/]`. An index past the end of its list is ignored. To show a bracket itself, escape it with
a backslash: `\[` and `\]` (`"\\["` in a C# string).

A link is drawn like the text around it, so give it a colour as well if it should stand out. Over a link the mouse shows
the link cursor of the box's `MouseCursorsSet.RichTextCursors` (see [styles](/docs/ui-styles/)), and a press on it runs
the action. The tags work in read-only boxes only: a `ReadWrite` box shows its text as it is, tags included.

### Editing

<figure class="shot">
  <img src="{{ '/assets/img/ui/text-input.png' | relative_url }}" width="474" height="138" alt="A one-line name field holding Ash with the caret after it, and a larger two-line notes field">
  <figcaption>A one-line input with its caret, and a wrapping multi-line input.</figcaption>
</figure>

```csharp
var name = new RichTextBox("playerName")
{
    Type = RichTextBoxType.ReadWrite,
    Text = "Ash",
    DesiredWidth = 240,
    DesiredHeight = 32,
    TextMargin = (8, 0),
    VerticalTextAlignment = VerticalTextAlignment.Center,
    BackgroundColor = new Color(40, 31, 23),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16),
    // every assigned text goes through it
    TextFilter = text => text.Length > 16 ? text[..16] : text
};

// Enter, or the editing ended
name.OnApply += (sender, text) => Console.WriteLine($"Name: {text}");

var notes = new RichTextBox("notes")
{
    Type = RichTextBoxType.ReadWrite,
    Text = "Selected text can be copied, cut and pasted. Ctrl+Z undoes, Ctrl+Y redoes.",
    WrapType = TextWrap.Wrap,
    DesiredWidth = 440,
    DesiredHeight = 56,
    TextMargin = (8, 6),
    BackgroundColor = new Color(40, 31, 23),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 64)
};

ui.AddElementToRoot(name);
ui.AddElementToRoot(notes);
```

Set `Type = RichTextBoxType.ReadWrite` to make the box editable. A press in it takes the keyboard and places the caret;
Shift+press extends the selection, dragging selects, and a double click selects the word (letters and digits) under the
caret. The caret blinks every `DefaultSettings.DefaultTextCursorBlinkTimeMs` (500 ms). With `InputType = Insert` it is
a vertical bar; with `Overwrite` it is a line under the character that typing replaces (a line break is never
replaced). The mouse shows the write cursor of `MouseCursorsSet.RichTextCursors` over the text.

The editing ends when the box loses the keyboard: Enter, a press somewhere else, or another element focused. Then
`OnApply` is raised with the text. It is not raised when the box loses the keyboard because it was hidden, disabled or
removed. Enter never types a line break; a pasted text can bring line breaks in.

`TextFilter` receives every text assigned to `Text` and returns the text to keep: typed characters, pastes, undo and
redo, code, bindings and styles all go through it. Setting a filter filters the text already there. When the filter
changes an edit, the edit is rejected as a whole: if it gives back the old text, the caret, the selection and the undo
history stay as they were; if it gives back another text, that text is kept and the undo history is cleared.

`OnTextChanged` is raised after every change of `Text`, whatever made it. By then the lines of the new text are laid
out, so a handler can place the caret on the new text. A text set from outside the editing (code,
a binding, an animation) clears the undo history and the selection.

Undo keeps up to 1000 steps; characters typed one after another are undone together, about a word at a time. The clipboard is the Windows clipboard.

Keys while the box has the keyboard:

| Key | Read-write box | Read-only box |
| --- | --- | --- |
| Left, Right | Moves the caret by a character (Shift selects). | Scrolls sideways by a line height. |
| Up, Down | Moves the caret by a line (Shift selects). | Scrolls by a line. |
| Home, End | Moves the caret to the start or the end of its line (Shift selects). | Scrolls to the top or the bottom, or to the left or right end when the text is not wrapped. |
| Page Up, Page Down | Scrolls back or forward by a page: up or down, or left or right when the text is not wrapped. | The same. |
| Backspace, Delete | Deletes the character before or after the caret, or the selection. | Not used. |
| Enter | Ends the editing (`OnApply`). | Not used. |
| Insert | Switches `InputType` between `Insert` and `Overwrite`. | Not used. |
| Ctrl+A | Selects the whole text. | Selects the whole text (plain boxes only). |
| Ctrl+C | Copies the selection. | Copies the selection. |
| Ctrl+X, Ctrl+V | Cuts the selection, pastes. | Not used. |
| Ctrl+Z, Ctrl+Y | Undoes, redoes. | Not used. |

Escape, Tab, the function keys and the Ctrl or Alt combinations the box has no use for go on to the elements around it.
A read-only box takes the keyboard with a press too, without a caret, so the keys above can scroll it.

### Scrolling and text animation

<figure class="shot">
  <img src="{{ '/assets/img/ui/text-scrolling.png' | relative_url }}" width="454" height="162" alt="A journal box with wrapped lines Day 1 to Day 4 and a vertical scroll bar on its right">
  <figcaption>A read-only box taller in text than in size, with a vertical scroll bar.</figcaption>
</figure>

```csharp
var journal = new RichTextBox("journal")
{
    Text = string.Join("\n", Enumerable.Range(1, 12).Select(day =>
        $"Day {day}: the corridor goes on, the walls drip and the torch holds.")),
    WrapType = TextWrap.Wrap,
    DesiredWidth = 420,
    DesiredHeight = 128,
    TextMargin = (8, 6),
    ScrollBars = ScrollBars.Vertical,
    ScrollBarsThickness = 10,
    BackgroundColor = new Color(26, 20, 15),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16)
};

ui.AddElementToRoot(journal);
```

The text scrolls inside the box with the mouse wheel and the keys above. `ScrollBars` says which bars the box may show
(`None`, `Vertical`, `Horizontal` or `Both`, see [ScrollableContainer](/docs/ui-layout/#scrollablecontainer)); a bar
is shown only while the text is larger than the box in that direction. `ScrollBarsThickness` starts at 0, so set it
with the bars. Wrapped lines that overflow the box are laid out beside the vertical bar. A box without a size of its
own fits its text and has nothing to scroll.

The box wraps like a label: at its width minus `TextMargin`, or at `MaxWidth` when it fits its text. Unlike a label, it
breaks a word wider than the line across lines. `VerticalTextAlignment` applies only to a box with a height of its own
whose text fits in it; a text that scrolls starts at the top margin. The caret, the selection, the clicks and the links
follow the alignment.

`AnimateText(text)` types a text out one character at a time, `CharacterPrintDelayMs` apart (an image counts as one
character). It makes the box `ReadOnly`; with `Formatting = Rich` the tags apply while it prints. While it runs, `Text` still holds the previous text
and the line breaks of the new one show as spaces; when it ends, or `StopTextAnimation()` stops it, `Text` becomes the
whole text. With `ScrollToEndDuringTextAnimation` the box keeps scrolled to the end while it prints and scrolls to the
end once more when it finishes. A box removed from the tree stops its animation.

```csharp
journal.CharacterPrintDelayMs = 30;
journal.ScrollToEndDuringTextAnimation = true;
journal.AnimateText("Day 13: a draught. Somewhere ahead the cave opens.");
```

With `CharacterPrintDelayMs` at 0 (its default) `AnimateText` sets the text at once.

### RichTextBox properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Type`</span> | `RichTextBoxType` | Whether the text can be edited. Default `ReadOnly`. |
| <span class="dp">`Text`</span> | `string` | The text shown. Line breaks become `\n`, tabs become spaces, then `TextFilter` is applied. Default `""`. |
| <span class="dp">`Formatting`</span> | `RichTextBoxFormatting` | Whether a read-only box reads [rich formatting](#rich-formatting) tags out of its text. Default `Plain`. |
| <span class="dp">`TextMargin`</span> | `Margin` | The space between the box's edges and its text, in units. |
| <span class="dp">`TextAlignment`</span> | `TextAlignment` | How each line is placed across the width. `Justify` widens the spaces of wrapped lines in a box with a width of its own. Default `Left`. |
| <span class="dp">`VerticalTextAlignment`</span> | `VerticalTextAlignment` | Where the lines sit in a box taller than its text. Applies only while the text fits; a scrolling text starts at the top. Default `Top`. |
| <span class="dp">`WrapType`</span> | `TextWrap` | Whether lines break to fit the width (with a fixed or stretched width, or a `MaxWidth`). Words wider than a line are broken. Default `NoWrap`. |
| <span class="dp">`InputType`</span> | `RichTextBoxInputType` | Whether typing inserts or replaces the character at the caret. The Insert key switches it. Default `Insert`. |
| <span class="dp">`TextFilter`</span> | `Func<string, string>` | Transforms every text assigned to `Text`, edits included. Setting it filters the current text. |
| <span class="dp">`FontSize`</span> | `float` | The font size in units. Negative values become 0, and 0 draws nothing. Default `DefaultSettings.DefaultFontSize` (14). |
| <span class="dp">`FontPath`</span> | `string` | The path of a TTF or OTF file to draw with (see [Fonts](#fonts)). A path that loads replaces the font system in use; an empty or unreadable path goes back to the general font, but keeps a font system you set by hand (as a label does). |
| <span class="dp">`LineSpacing`</span> | `int` | Extra space between two lines, in units. Negative values become 0. |
| <span class="dp">`TextCursorThickness`</span> | `int` | The width of the caret bar, or the height of the overwrite underline, in units. Default `DefaultSettings.DefaultTextCursorThickness` (1). |
| <span class="dp">`TextCursorColor`</span> | `Color` | The colour of the caret. Default `DefaultSettings.DefaultTextCursorColor` (black). |
| <span class="dp">`TextSelectionColor`</span> | `Color` | The colour behind selected text. Default `DefaultSettings.DefaultTextSelectionColor` (light blue). |
| <span class="dp">`ScrollBars`</span> | `ScrollBars` | Which scroll bars the box may show when its text is larger than the box. Default `None`. |
| <span class="dp">`ScrollBarsThickness`</span> | `int` | The thickness of the scroll bars in units. Default 0. |
| <span class="dp">`ScrollBarsStyle`</span> | `SliderStyle` | The style of the scroll bars. |
| <span class="dp">`BackgroundStyle`</span> | `ImageStyle` | The style of the image the box draws behind its text. |
| <span class="dp">`CharacterPrintDelayMs`</span> | `int` | The time between two characters printed by `AnimateText`, in milliseconds. Negative values become 0; 0 sets the text at once. |
| <span class="dp">`ScrollToEndDuringTextAnimation`</span> | `bool` | Whether `AnimateText` keeps the box scrolled to the end while it prints. |
| <span class="prop">`RichColors`</span> | `List<Color>` | Static field. The colours `[c=n]` tags index, shared by every box. |
| <span class="prop">`RichActions`</span> | `List<Action>` | Static field. The actions `[a=n]` links run, shared by every box. |
| <span class="prop">`RichImages`</span> | `List<Texture2D>` | Static field. The textures `[i=n]` tags show, shared by every box. |
| <span class="prop">`LastFontError`</span> | `Exception` | Read-only. The exception of the last failed font preparation (font system or font size not usable), `null` when the font is fine. The box shows no text and gives up the keyboard while it has no font. |
| <span class="prop">`FontSystemOverride`</span> | `FontSystem` | A FontStashSharp font system for this box only, used instead of the general one. Setting `FontPath` sets it too. The box does not dispose it. |
| <span class="prop">`FontSystem`</span> | `FontSystem` | Read-only. The font system in use: `FontSystemOverride`, or `GeneralFontSystem` without one. |
| <span class="prop">`GeneralFontSystem`</span> | `FontSystem` | Static. The same value as `Label.GeneralFontSystem`: the font system of every text element without one of its own. |

### RichTextBox events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnApply`</span> | `(BaseElement sender, string text)` | A read-write box ends its editing: Enter, a press elsewhere or another element focused. Not when it is hidden, disabled or removed. Raised even if the text did not change. |
| <span class="event">`OnTextChanged`</span> | `(BaseElement sender, string text)` | `Text` changed, by typing, deleting, pasting, undo or redo, code, a binding, a style or the end of a text animation. The new lines are already laid out. |

### RichTextBox methods

| Method | Description |
| --- | --- |
| `RichTextBox(string name = null)` | Creates a rich text box. The name is used by `GetElementByName`. |
| <span class="method">`SelectAllText()`</span> | Selects the whole text, scrolls to its end and gives the box the keyboard. |
| <span class="method">`SelectTextInterval(int start, int end)`</span> | Selects the text between two positions (clamped to the text), with the caret at `end`, scrolled into view, and gives the box the keyboard. Does nothing when `start` equals `end`. |
| <span class="method">`PlaceCursorAt(int position)`</span> | Moves the caret to a text position (clamped to the text), scrolls it into view and gives the box the keyboard. A read-only box shows no caret but scrolls there. |
| <span class="method">`PlaceCursorAtTextStart()`</span> | `PlaceCursorAt(0)`. |
| <span class="method">`PlaceCursorAtTextEnd()`</span> | `PlaceCursorAt(Text.Length)`. |
| <span class="method">`AnimateText(string text)`</span> | Types the text out with `CharacterPrintDelayMs` per character and makes the box read-only. Stops a running animation first. |
| <span class="method">`StopTextAnimation()`</span> | Stops a running text animation; the whole text is shown then. |

Positions count the characters of `Text`. In a read-only box with `Rich` formatting the shown text differs from `Text`
(the tags are removed), so the selection and caret methods do nothing there.

#### `RichTextBoxType`

| Value | Meaning |
| --- | --- |
| `ReadOnly` | The text is shown, scrolled and copied, not edited. Links and rich formatting work. |
| `ReadWrite` | The text can be edited with the mouse and the keyboard. Tags are shown as typed. |

#### `RichTextBoxInputType`

| Value | Meaning |
| --- | --- |
| `Insert` | Typed characters go in at the caret. |
| `Overwrite` | A typed character replaces the one at the caret. |

#### `RichTextBoxFormatting`

| Value | Meaning |
| --- | --- |
| `Plain` | The text is shown as it is. |
| `Rich` | A read-only box reads `[c=n]`, `[a=n]`, `[i=n]` and `[/]` tags. |

Style class: `RichTextBoxStyle` (the same properties, see [styles](/docs/ui-styles/)). Its defaults are an empty
`Text`, `FontSize` 14, `ForegroundColor` `DefaultSettings.DefaultTextColor` (black), the caret and selection settings
from `DefaultSettings`, and `InheritState.FromChildren`.

## Fonts

Text elements draw with [FontStashSharp](https://github.com/FontStashSharp/FontStashSharp): a `FontSystem` (namespace
`FontStashSharp`) holds one or more font files and a glyph atlas, and gives fonts of any size. An element takes its font
from the first of these that is set:

1. `FontSystemOverride`, a font system for that element only. Setting `FontPath` fills it with the font system of that
   file.
2. `GeneralFontSystem`, the static font system of all text elements. `Label.GeneralFontSystem` and
   `RichTextBox.GeneralFontSystem` are one value.

**The bundled font.** Without anything set, `GeneralFontSystem` is made on first use from UbuntuMono
(`Content/Fonts/UbuntuMono-Regular.ttf`), which the package copies next to your executable. It is looked for next to the
executable first, then relative to the working directory.

**FontSize.** Sizes are logical units like every other size, so text keeps its size relative to the rest of the UI at
any display scale. The default comes from `DefaultSettings.DefaultFontSize` (14).

**FontPath.** Set it to a TTF or OTF file to use another font in one element. Each file is loaded once (by its full
path, ignoring case) and shared by every element that names it, since every font system has its own 2048 x 2048 glyph
atlas. A relative path resolves against the working directory. A file that can't be read loads nothing.

**Your own font system.** To use several files in one font system, or other FontStashSharp settings, make the font
system yourself and give it to `FontSystemOverride`, or to `GeneralFontSystem` for every element. Set the general one
before you create text elements: an element prepares its font when its font size, font path or override changes, not
when the general font system does. Elements never dispose a font system they use; one you made is yours to dispose once
nothing uses it.

```csharp
var fontSystem = new FontSystem(new FontSystemSettings { FontResolutionFactor = 3 });
fontSystem.AddFont(File.ReadAllBytes("Content/Fonts/Title.ttf"));

var title = new Label("title")
{
    Text = "The Caves",
    FontSize = 32,
    FontSystemOverride = fontSystem
};
```

**Display scale.** The framework's own font systems (the bundled one and those loaded from a `FontPath`) rasterise their
glyphs at twice the UI scale (a resolution factor between 2 and 8), so text is as sharp at 150 % as at 100 %. When
`BorrowedTorchUI.Scale` changes they are made again for the new scale, and the elements take them. A font system you
give by hand keeps the resolution it was created with, so it may look soft at a large scale (see
[display scaling](/docs/ui/)).

If FontStashSharp throws while an element prepares its font, the element shows no text and keeps the exception in
`LastFontError`. A `FontSize` of 0 shows no text without an error.
