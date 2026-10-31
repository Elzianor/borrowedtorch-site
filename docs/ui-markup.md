---
layout: docs
legend: [prop, dp, method, event]
title: "UI: markup"
description: Build element trees from XML with BorrowedTorch.UI.Markup, with properties, items, events, bindings, style dictionaries, included files, your own types and errors.
---

BorrowedTorch.UI.Markup builds elements from XML markup, so a UI can be written as data instead of code: loaded by the
game at run time, or edited live in a tool. A markup names the UI's elements by their type names and sets the same
properties code sets. Styles can be written as markup too, in style dictionaries, and a markup can include other files.
It is a package of its own next to BorrowedTorch.UI, with
[a repository of its own](https://github.com/BorrowedTorchStudio/BorrowedTorch.UI.Markup).

```xml
<Ui>
    <StackPanel Name="menu" Orientation="Vertical" HorizontalAlignment="Center" VerticalAlignment="Center">
        <Button Name="newGame" Text="New game" DesiredWidth="200" DesiredHeight="40" OnClick="StartNewGame" />
        <Button Name="options" Text="Options" DesiredWidth="200" DesiredHeight="40" Margin="0, 8" />
        <Label Text="{Binding PlayerName}" Margin="0, 8" />
    </StackPanel>
</Ui>
```

```csharp
using BorrowedTorch.UI.Markup;

// this object has the StartNewGame method, settings has the PlayerName property
var context = new MarkupContext { Handlers = this, DataContext = settings };

foreach (var element in UiMarkup.LoadFile("UI/MainMenu.btui", context))
    ui.AddElementToRoot(element);
```

## Installing

```shell
dotnet add package BorrowedTorch.UI.Markup
```

| Requirement | Version |
| --- | --- |
| UI | [`BorrowedTorch.UI`](/docs/ui/#installing) 1.6.1 or later, installed with the markup |
| .NET | 10, Windows (`net10.0-windows10.0.19041.0`), as the UI |

The types are in the `BorrowedTorch.UI.Markup` namespace. This page covers version 1.3.0.

## Loading markup

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`UiMarkup.Load`</a> reads a markup from a string, and <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadfile">`LoadFile`</a> from a file (any path `File.ReadAllText`
takes; any extension does, these pages use `.btui`). Both return the elements written under `<Ui>`, in the order they
are written, not added anywhere yet: add them to the root with
<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#addelementtoroot">`AddElementToRoot`</a> or to an element of your own. An element you don't add stays yours to dispose.

The elements are made as code would make them, with their constructors. So load a markup on the thread that updates
the UI, once the UI exists: an image's `Source` loads its texture through the UI's `ContentManager` while the markup
is read.

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocument">`LoadDocument`</a> and <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocumentfile">`LoadDocumentFile`</a> return the same elements in a <a class="ref" href="/docs/ui-glossary/types/markup-document/">`MarkupDocument`</a>, which
remembers every element the markup made. Disposing the document disposes all of them, the items and contents of its
panels included, which disposing a panel only detaches. That is the way to take a whole UI away: a screen that is left,
or a markup loaded again in its place, as a tool does after an edit.

```csharp
_menu?.Dispose();
_menu = UiMarkup.LoadDocumentFile("UI/MainMenu.btui", context);

foreach (var element in _menu.Elements)
    ui.AddElementToRoot(element);
```

A <a class="ref" href="/docs/ui-glossary/types/markup-context/">`MarkupContext`</a> gives a markup what it reaches besides the UI's own types: the object whose methods handle
its events, the object its bindings read, the [style dictionaries](#style-dictionaries) its styles come from, where it
finds the [files it includes](#including-other-files), and [types and converters of your own](#types-and-converters-of-your-own).
A markup that uses none of them needs no context.

### UiMarkup

A static class.

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load(string markup, MarkupContext context = null)`</a> | Returns the elements under `<Ui>` (an `IReadOnlyList<BaseElement>`), in the order they are written, not added anywhere. Throws a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a> for a markup that can't be read, an `ArgumentNullException` for a `null` markup. |
| <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadfile">`LoadFile(string path, MarkupContext context = null)`</a> | <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a> of the text of a file, read through the context's <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#readfile">`ReadFile`</a>; its includes are found from its directory. The errors of reading the file itself, such as a missing file, are thrown as they are. |
| <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocument">`LoadDocument(string markup, MarkupContext context = null)`</a> | <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a>, returning a <a class="ref" href="/docs/ui-glossary/types/markup-document/">`MarkupDocument`</a> that keeps every element the markup made, to dispose them all at once. |
| <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocumentfile">`LoadDocumentFile(string path, MarkupContext context = null)`</a> | <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocument">`LoadDocument`</a> of the text of a file, read as <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadfile">`LoadFile`</a> reads it. |
| <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstyles">`LoadStyles(string markup, MarkupContext context = null)`</a> | Reads a [style dictionary](#style-dictionaries), a markup whose root is `<Styles>`, into a <a class="ref" href="/docs/ui-glossary/types/style-dictionary/">`StyleDictionary`</a>. Throws a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a> for one that can't be read. |
| <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstylesfile">`LoadStylesFile(string path, MarkupContext context = null)`</a> | <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstyles">`LoadStyles`</a> of the text of a file, read as <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadfile">`LoadFile`</a> reads it. |
| <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#isstyledictionary">`IsStyleDictionary(string markup)`</a> | Whether a markup's root is `<Styles>` (for <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstyles">`LoadStyles`</a>) rather than `<Ui>` (for <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a>), for a tool that takes both. It reads up to the root only; a markup that isn't well formed that far is no dictionary. |
| <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#tryreadcolor">`TryReadColor(string text, out Color color)`</a> | Reads a text as a `Color` property's value is read, and returns whether it could. For a tool that shows the colors of a markup. |

### MarkupDocument

A sealed class, `IDisposable`.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-document/#elements">`Elements`</a> | `IReadOnlyList<BaseElement>` | Read-only. The elements under `<Ui>`, in the order they are written. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/markup-document/#dispose">`Dispose()`</a> | Disposes every element the markup made, the items and contents of its panels included; a disposed element leaves its parent, the root as well. Elements added to them since are only detached, as a panel's own items are. |

## Writing markup

### Elements

The root is `<Ui>`, with no attributes; it holds the UI's elements and its own [styles](#a-uis-own-styles). Every
element in it is one of the UI's elements by its type name: `<Button>`, `<StackPanel>`, `<Grid>`, `<Window>`. The
markup knows every public class of the UI that isn't abstract or generic: the elements, the styles and the objects they
take, such as a <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a>.
<a class="ref method" href="/docs/ui-glossary/types/markup-context/#addtype">`MarkupContext.AddType`</a> adds types of your own.

`Name` is the element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a>, given to its constructor (an element's name never changes). An element
written without one has no name, and <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#getelementbyname">`GetElementByName`</a> doesn't find it. An element is made with its constructor
taking a name, which every element of the UI that code makes has. The parts the controls make themselves (a list's
`ListBoxItem`, a menu's `ContextMenuItem`, a tree's `TreeViewItem`) have none and can't be written. XML comments are
fine, and namespace declarations (`xmlns`) are passed over.

### Properties

An attribute sets the property of its name: any public property that can be set, the same ones code sets. Its text is
read by the property's type:

| Type | Written as |
| --- | --- |
| `string` | As it is. |
| Numbers | `120`, `0.5`: a point, whatever the decimal separator of the machine. |
| `bool` | `true`, `false`. |
| Enums | The name of a value, in any case: `Center`, `collapsed`. |
| `Color` | `#RRGGBB`, `#RRGGBBAA`, `r, g, b` or `r, g, b, a` (0 to 255), or the name of one of `Color`'s colors: `CornflowerBlue`. |
| <a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> | `5` (every side), `10, 20` (left, top), `10, 20, 30` (left, top, right) or `10, 20, 30, 40`, as in code. The sides not written are 0. |
| `Point`, `Vector2` | `x, y`. |
| A type that converts from a string | An image's <a class="ref dp" href="/docs/ui-glossary/elements/image/#source">`Source`</a> (<a class="ref" href="/docs/ui-glossary/types/source-data/">`SourceData`</a>): a content path, loaded through the UI's `ContentManager`. |
| A nullable type | An empty text is `null`, any other is read as the type. |

Any other type can't be written as text: give it in a [property element](#property-elements), or add a
[converter of your own](#types-and-converters-of-your-own) to the context. A tool that shows the colors of a markup
reads them as the markup does with <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#tryreadcolor">`UiMarkup.TryReadColor`</a>.

The text inside an element is its `Text`: `<Label>Score</Label>` is `<Label Text="Score" />`. Giving both is an error.

### Items and content

A child element is an item of the element it is in, added with <a class="ref method" href="/docs/ui-glossary/elements/base-element/#additem">`AddItem`</a>: the buttons of a stack
panel, the rows of a list box or a combo box, the elements of a grid's cells, the top-level items of a tree view. An
element with a `Content` (a [`Border`](/docs/ui-layout/#border), a [`Button`](/docs/ui-controls/#button), a
[`CheckBox`](/docs/ui-controls/#checkbox), a [`ToolTip`](/docs/ui-controls/#tooltip), a
[`Window`](/docs/ui-layout/#window)) holds one child element instead, its content: put several in a panel. An element
that takes neither, such as a `Label` or a `Slider`, refuses child elements.

```xml
<Window Name="inventory" DesiredWidth="300" DesiredHeight="240">
    <StackPanel Orientation="Vertical">
        <Label>Inventory</Label>
        <ListBox DesiredWidth="260" DesiredHeight="160">
            <Label Text="Rope" />
            <Label Text="Lantern" />
        </ListBox>
    </StackPanel>
</Window>
```

### Property elements

A property whose value is no text, such as an element or a style, is given by a property element, named after the
element and the property: `<Button.ToolTip>` inside a `<Button>`. It takes no attributes and holds one value, written
as an element is. A style or another object that is no element sets its properties by attributes too, and its own
objects by property elements; it needs a constructor without parameters. A property element with only text in it
gives that text, for a text too long for an attribute.

```xml
<Button Name="save" Text="Save" DesiredWidth="120" DesiredHeight="32">
    <Button.ToolTip>
        <ToolTip Text="Save the game (Ctrl+S)" />
    </Button.ToolTip>
    <Button.TextStyle>
        <LabelStyle FontSize="18" ForegroundColor="White" />
    </Button.TextStyle>
</Button>
```

### Grid columns and rows

A [`Grid`](/docs/ui-layout/#grid)'s `Columns` and `Rows` list its column and row definitions, in order: a number is a
**fixed** size in units, `auto` an **auto** size as large as the content, and `*` or `2*` a **proportional** size, a
share of the space left. They are the three kinds of
<a class="ref method" href="/docs/ui-glossary/elements/grid/#addcolumndefinition">`AddColumnDefinition`</a> and <a class="ref method" href="/docs/ui-glossary/elements/grid/#addrowdefinition">`AddRowDefinition`</a>. The elements in the grid take their cells by
<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridrow">`GridRow`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridcolumn">`GridColumn`</a> and their spans, as in code.

```xml
<Grid Columns="200, *" Rows="auto, *">
    <Label Text="Title" GridColumnSpan="2" />
    <ListBox GridRow="1" />
    <Image GridColumn="1" GridRow="1" Source="Textures/Preview" />
</Grid>
```

### Events

An attribute named after an event subscribes a method of the context's
<a class="ref prop" href="/docs/ui-glossary/types/markup-context/#handlers">`Handlers`</a>: `OnClick="StartNewGame"` subscribes its `StartNewGame`. The method can be public or not, and
takes either the event's parameters, such as `(BaseElement sender, MouseClickEventArgs e)` for
<a class="ref event" href="/docs/ui-glossary/elements/base-element/#onclick">`OnClick`</a>, or none.

Without such a method the markup can't be read, unless the context has a
<a class="ref prop" href="/docs/ui-glossary/types/markup-context/#missinghandler">`MissingHandler`</a>: then the event calls that instead, with the element, the event's name and the handler's
name. A tool shows a markup's events that way, without the game's code to handle them. A method that is there but
takes other parameters is still an error.

```csharp
var context = new MarkupContext
{
    MissingHandler = (sender, eventName, handlerName) =>
        Console.WriteLine($"{((BaseElement)sender).Name}: {eventName} would call {handlerName}")
};
```

### Bindings

`{Binding Name}` binds a property to the property `Name` of the context's
<a class="ref prop" href="/docs/ui-glossary/types/markup-context/#datacontext">`DataContext`</a>, usually a [`Bindable`](/docs/ui-styles/#bindable) view model whose changes the
element follows. `Mode` sets the direction, one of the <a class="ref" href="/docs/ui-glossary/types/binding-mode/">`BindingMode`</a> values: `{Binding Volume, Mode=TwoWay}`.
Without it the binding is `OneWay`. `Path=Volume` names the property too.

A binding in markup is the binding code makes with the property's
<a class="ref method" href="/docs/ui-glossary/types/dependency-property/#bind">`Bind`</a> (see [bindings](/docs/ui-styles/#bindings)), so only a dependency property can be bound. It takes
no converter: make a binding that needs one in code. A text that starts with a brace and is no binding starts with
`{}`, which is left out: `Text="{}{not bound}"` shows `{not bound}`.

## Styles

### Style dictionaries

A style dictionary is a markup whose root is `<Styles>`, holding [styles](/docs/ui-styles/#style-classes) by their
type names. A style with a `Key` is named by markups; one without is the general style of its type, one of each type.
`BasedOn` starts a style as a copy of another of the same type, written before it in the dictionary or in a dictionary
of the context: the copy is made as the dictionary is read, so a later change to the other style doesn't reach it.

```xml
<!-- UI/Theme.btui -->
<Styles>
    <ButtonStyle DesiredHeight="36" NormalColor="168, 131, 74" HoverColor="233, 194, 122"
                 PressedColor="128, 98, 54">
        <ButtonStyle.TextStyle>
            <LabelStyle ForegroundColor="20, 14, 10" />
        </ButtonStyle.TextStyle>
    </ButtonStyle>
    <ButtonStyle Key="danger" NormalColor="150, 52, 30" HoverColor="242, 140, 40" />
    <ButtonStyle Key="bigDanger" BasedOn="danger" DesiredHeight="48" />
    <LabelStyle Key="title" FontSize="24" ForegroundColor="233, 194, 122" />
</Styles>
```

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstylesfile">`UiMarkup.LoadStylesFile`</a> reads it into a <a class="ref" href="/docs/ui-glossary/types/style-dictionary/">`StyleDictionary`</a>. Its general styles are applied apart, with
<a class="ref method" href="/docs/ui-glossary/types/style-dictionary/#applygeneralstyles">`ApplyGeneralStyles`</a>, and its keys reach the markups loaded with a context it is added to with
<a class="ref method" href="/docs/ui-glossary/types/markup-context/#addstyles">`AddStyles`</a>:

```csharp
var theme = UiMarkup.LoadStylesFile("UI/Theme.btui");

// the styles without a key: Button.GeneralStyle, for every button of the game
var generalStyles = theme.ApplyGeneralStyles();

// the keys, for the markups loaded with this context
var context = new MarkupContext { Handlers = this }.AddStyles(theme);
```

Disposing what <a class="ref method" href="/docs/ui-glossary/types/style-dictionary/#applygeneralstyles">`ApplyGeneralStyles`</a> returns puts back the general styles there were before, for a theme that
changes. <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstyles">`LoadStyles`</a> takes a context too, for style types and converters of your own and for the keys of the
dictionaries loaded before it, which `BasedOn` can name.

### Naming a style

`Style="key"` gives an element the style of the key as its
<a class="ref prop" href="/docs/ui-glossary/elements/button/#styleoverride">`StyleOverride`</a>, over its general style: the `danger` button below keeps the general height and text
color, and changes only its colors. `{Style key}` gives a keyed style to any style property, such as a button's
`TextStyle`.

```xml
<StackPanel Orientation="Vertical">
    <Label Text="Delete the save?" Style="title" />
    <Button Text="Delete" Style="danger" OnClick="DeleteSave" />
    <Button Text="Keep it" TextStyle="{Style title}" />
</StackPanel>
```

The elements naming a style share it: a change made to it later, such as
`theme.Get<ButtonStyle>("danger").NormalColor = Color.DarkRed`, reaches all of them. A key is looked up in the UI's own
styles first, then in those of the UIs that include it, then in the context's dictionaries, the one added last first.

### A UI's own styles

A UI can hold styles of its own in `<Ui.Styles>`, read before its elements wherever it is written. Their keys are found
before the context's. A style there without a key is given to the UI's elements of its type that name no style of their
own, as their `StyleOverride`: unlike a dictionary's general styles, which every element of the game takes, it reaches
only the elements of this markup.

```xml
<Ui>
    <Ui.Styles>
        <ButtonStyle DesiredWidth="200" />
        <LabelStyle Key="hint" FontSize="12" ForegroundColor="Gray" />
    </Ui.Styles>
    <StackPanel Orientation="Vertical">
        <Button Text="Play" />
        <Label Text="Press F1 for help" Style="hint" />
    </StackPanel>
</Ui>
```

### StyleDictionary

A sealed class.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/style-dictionary/#keyed">`Keyed`</a> | `IReadOnlyDictionary<string, BaseStyle>` | Read-only. The styles with a key, by their keys. |
| <a class="ref prop" href="/docs/ui-glossary/types/style-dictionary/#general">`General`</a> | `IReadOnlyDictionary<Type, BaseStyle>` | Read-only. The styles without a key, by their style types, one each. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/style-dictionary/#get">`Get<T>(string key)`</a> | The style with the key, as its type `T`. A key that isn't there throws a `KeyNotFoundException`, a style of another type an `InvalidCastException`. |
| <a class="ref method" href="/docs/ui-glossary/types/style-dictionary/#applygeneralstyles">`ApplyGeneralStyles()`</a> | Makes each style without a key the general style of its type (`Button.GeneralStyle` for a `ButtonStyle`), which every element of the type takes under its own values. Returns an `IDisposable` that puts back the general styles there were before, where they are still the dictionary's: a general style set since stays. |

## Including other files

`<Include Source="..." />` puts what another file holds in its place, its path relative to the including file's
directory. Among elements it gives the elements of another UI, as if written there, so a screen is made of parts and a
part used by many screens is written once:

```xml
<!-- UI/MainMenu.btui -->
<Ui>
    <StackPanel Orientation="Vertical" HorizontalAlignment="Center" VerticalAlignment="Center">
        <Include Source="Parts/Header.btui" />
        <Button Name="play" Text="Play" DesiredWidth="200" DesiredHeight="40" OnClick="Play" />
        <Include Source="Parts/VolumeSlider.btui" Name="music" />
        <Include Source="Parts/VolumeSlider.btui" Name="effects" />
    </StackPanel>
</Ui>
```

```xml
<!-- UI/Parts/VolumeSlider.btui -->
<Ui>
    <StackPanel Orientation="Horizontal" Margin="0, 8">
        <Label Name="label" DesiredWidth="80" />
        <Slider Name="slider" DesiredWidth="160" DesiredHeight="18" />
    </StackPanel>
</Ui>
```

A `Name` on the include goes before the names of its elements: the `slider` of `VolumeSlider.btui` is `music.slider`
in one place and `effects.slider` in the other, found apart with
<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#getelementbyname">`GetElementByName`</a>:

```csharp
ui.GetElementByName<Label>("music.label").Text = "Music";
ui.GetElementByName<Label>("effects.label").Text = "Effects";
```

An include where one element is taken, a `Content` or a property element, gives the one element of its UI. An included
UI looks a key up in its own `<Ui.Styles>` first, then in the including UI's, and takes the including UI's general
styles where it has none of its own.

In a style dictionary or a UI's `<Ui.Styles>`, an include gives the styles of another dictionary, as if written there. A
style written after it with the same key, or without a key and of the same type, replaces the included one. A theme is
made of parts that way, and a screen names its own theme without code:

```xml
<Ui>
    <Ui.Styles>
        <Include Source="Theme.btui" />
        <ButtonStyle Key="danger" NormalColor="DarkRed" />
    </Ui.Styles>
    <!-- the screen's elements -->
</Ui>
```

The theme's general styles are then the screen's own, given to its elements only, where
<a class="ref method" href="/docs/ui-glossary/types/style-dictionary/#applygeneralstyles">`ApplyGeneralStyles`</a> gives them to the whole game.

A markup loaded with <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadfile">`LoadFile`</a>, <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocumentfile">`LoadDocumentFile`</a> or <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstylesfile">`LoadStylesFile`</a> finds its includes from its file's
directory; one given as text, from the context's <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#basedirectory">`BaseDirectory`</a> (the current directory without one). Every
file, the loaded one and the included ones, is read through the context's <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#readfile">`ReadFile`</a>, `File.ReadAllText`
without one: a game whose files are elsewhere, such as in a content package, gives its own, and a tool can follow which
files a markup read.

An include holds nothing and takes a `Source` and a `Name` (only a `Source` among styles). A file that can't be read, a
file that includes itself, a UI included among styles and a style dictionary included among elements are errors at the
include. An error inside an included file is reported at the include too, with the file, line and column it is at.

## A pause menu in markup

The quick start's [pause menu](/docs/ui/#a-pause-menu) written as markup, with its handlers in a class of the game.
The window's title bar is a part the window makes itself, so its texts are set in code once the markup is loaded.

```xml
<Ui>
    <Window Name="pause" DesiredWidth="260" DesiredHeight="210"
            HorizontalAlignment="Center" VerticalAlignment="Center"
            IsModal="true" OnKeyDown="CloseOnEscape">
        <StackPanel Name="pauseButtons" Orientation="Vertical"
                    HorizontalAlignment="Center" VerticalAlignment="Center">
            <Button Name="resume" Text="Resume" DesiredWidth="200" DesiredHeight="36" OnClick="Resume" />
            <Button Name="settings" Text="Settings" DesiredWidth="200" DesiredHeight="36" Margin="0, 10" />
            <Button Name="quit" Text="Quit to menu" DesiredWidth="200" DesiredHeight="36" Margin="0, 10"
                    OnClick="QuitToMenu" />
        </StackPanel>
    </Window>
</Ui>
```

```csharp
public sealed class PauseMenu
{
    private readonly Window _window;

    public PauseMenu(BorrowedTorchUI ui)
    {
        _window = (Window)UiMarkup.LoadFile("UI/PauseMenu.btui", new MarkupContext { Handlers = this })[0];

        var titleBar = (DefaultWindowTitleBar)_window.TitleBar;
        titleBar.Title.Text = "Paused";
        titleBar.CloseButton.Text = "x";

        ui.AddElementToRoot(_window);
    }

    public void Show() => _window.Show();

    private void Resume() => _window.Hide();

    private void QuitToMenu() => Console.WriteLine("Back to the main menu");

    // Escape closes the menu while anything in it has the keyboard
    private void CloseOnEscape(BaseElement sender, KeyDownEventArgs e)
    {
        if (e.Key != Keys.Escape) return;

        _window.Hide();
        e.Handled = true;
    }
}
```

## Bound settings in markup

The [bindings example](/docs/ui-styles/#bindings) of the styles page written as markup, bound to the same
`SettingsViewModel`. The label of the volume shows it through a `PercentConverter`, which a markup binding doesn't
take: the markup gives the label a name, and code finds it and binds it.

```xml
<Ui>
    <RichTextBox Name="name" Type="ReadWrite" DesiredWidth="220" DesiredHeight="30" TextMargin="8, 0"
                 VerticalTextAlignment="Center" BackgroundColor="40, 31, 23"
                 HorizontalAlignment="Left" VerticalAlignment="Top" Margin="16, 16"
                 Text="{Binding PlayerName, Mode=TwoWay}" />
    <Label HorizontalAlignment="Left" VerticalAlignment="Top" Margin="252, 22" Text="{Binding Greeting}" />
    <Slider DesiredWidth="220" DesiredHeight="18" Max="1" Margin="16, 66" Value="{Binding Volume, Mode=TwoWay}" />
    <Label Name="volumeText" HorizontalAlignment="Left" VerticalAlignment="Top" Margin="252, 66" />
    <ListBox DesiredWidth="220" DesiredHeight="90" Margin="16, 100" ItemsSource="{Binding Levels}" />
</Ui>
```

```csharp
var settings = new SettingsViewModel();

foreach (var element in UiMarkup.LoadFile("UI/Settings.btui", new MarkupContext { DataContext = settings }))
    ui.AddElementToRoot(element);

// a binding with a converter is made in code
ui.GetElementByName<Label>("volumeText").TextDP.Bind(settings, nameof(settings.Volume), BindingMode.OneWay,
    new PercentConverter());
```

## Types and converters of your own

A type of your own is found by its name, as the UI's are, once <a class="ref method" href="/docs/ui-glossary/types/markup-context/#addtype">`AddType`</a> adds it to the context. An
element needs a constructor taking its name, any other object (a style) a constructor without parameters. It takes the
place of a type of the UI with the same name.

A converter reads the values of one property type from text, in place of the markup's own way for that type (a
converter of a type `T` reads `T?` too). <a class="ref method" href="/docs/ui-glossary/types/markup-context/#addconverter">`AddConverter`</a> adds it. Both return the context, so the calls chain.

```csharp
var context = new MarkupContext()
    // an element of your own, with a constructor taking its name
    .AddType<HealthBar>()
    // its Cooldown is a TimeSpan, written in seconds
    .AddConverter(text => TimeSpan.FromSeconds(double.Parse(text, CultureInfo.InvariantCulture)));
```

```xml
<Ui>
    <HealthBar Name="health" DesiredWidth="200" DesiredHeight="16" Cooldown="1.5" />
</Ui>
```

### MarkupContext

A sealed class.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#handlers">`Handlers`</a> | `object` | The object whose methods the events name: `OnClick="StartGame"` subscribes its `StartGame`, public or not, taking the event's parameters or none. |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#missinghandler">`MissingHandler`</a> | `Action<object, string, string>` | Called in place of a handler that <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#handlers">`Handlers`</a> doesn't have, whenever its event is raised: with the element, the event's name and the handler's name. Set, a missing handler is no error. |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#datacontext">`DataContext`</a> | `object` | The object `{Binding Name}` binds to, usually a <a class="ref" href="/docs/ui-glossary/types/bindable/">`Bindable`</a> view model. |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#basedirectory">`BaseDirectory`</a> | `string` | The directory a markup given as text finds its includes from. Without one, the current directory. |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#readfile">`ReadFile`</a> | `Func<string, string>` | Reads a markup file given its full path: the one loaded and the ones included. `File.ReadAllText` without one. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/markup-context/#markupcontext">`MarkupContext()`</a> | Creates a context without handlers, data context, styles, types or converters. |
| <a class="ref method" href="/docs/ui-glossary/types/markup-context/#addtype">`AddType<T>()`</a> | Makes a type of your own usable by its name, in place of a type of the UI with the same name. Returns the context. |
| <a class="ref method" href="/docs/ui-glossary/types/markup-context/#addconverter">`AddConverter<T>(Func<string, T> convert)`</a> | Reads the values of type `T` from text with `convert`, in place of the markup's own way. Returns the context. |
| <a class="ref method" href="/docs/ui-glossary/types/markup-context/#addstyles">`AddStyles(StyleDictionary styles)`</a> | Makes the keyed styles of a [style dictionary](#style-dictionaries) usable by their keys. A key in more than one dictionary names the style of the one added last. Returns the context. |

## Errors

A markup that can't be read throws a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a>, whose `Message` starts with the line and the
column, counted from 1 as text editors count them: `Line 4, column 17: Button has no property Txt to set`. Each
mistake is reported where it is written:

- XML that isn't well formed, or a root other than `<Ui>` (`<Styles>` for a style dictionary);
- an unknown element or property, or a value that can't be read;
- a child element where none is taken, or a second one where one content is taken;
- a binding without a data context, or to a property the data context doesn't have;
- an event handler that is missing (without a <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#missinghandler">`MissingHandler`</a>), or takes other parameters;
- a style that isn't there or doesn't fit, two styles with one key, or two of one type without a key;
- an include whose file can't be read, that includes itself, or that holds a UI where styles are taken (or the other
  way round).

An error in an included file is reported at the include, followed by the file and its own place:
`Line 4, column 9: Parts/Header.btui, line 2, column 17: Button has no property Txt to set`.

An exception thrown on the way, by a constructor, a setter or a converter, is the
<a class="ref prop" href="/docs/ui-glossary/types/markup-exception/#innerexception">`InnerException`</a>. A load that fails keeps nothing of what it made: every element made so far is disposed.

### MarkupException

A sealed class deriving from `Exception`.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-exception/#line">`Line`</a> | `int` | Read-only. The line of the mistake, from 1; 0 when the place isn't known. |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-exception/#column">`Column`</a> | `int` | Read-only. The column of the mistake, from 1; 0 when the place isn't known. |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-exception/#reason">`Reason`</a> | `string` | Read-only. What is wrong, without the place. |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-exception/#message">`Message`</a> | `string` | Read-only. `Line {Line}, column {Column}: ` and the reason. |
| <a class="ref prop" href="/docs/ui-glossary/types/markup-exception/#innerexception">`InnerException`</a> | `Exception` | Read-only. The exception behind the mistake: the XML reader's, or the one a constructor, a setter or a converter threw. `null` when there is none. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/markup-exception/#markupexception">`MarkupException(string reason, int line, int column, Exception innerException = null)`</a> | Creates the exception, its `Message` made of the place and the reason. |

## Keeping markup in step with the UI

The markup finds the elements and their properties by name when it is read. A property renamed or removed in a later
BorrowedTorch.UI breaks a markup when it is loaded, not when the game is built: BorrowedTorch.UI 2.0.0 renamed
`Border.Padding` to [`ContentAreaMargin`](/docs/ui-layout/#border), so a markup still setting `Padding` throws at that
attribute. After updating BorrowedTorch.UI, load every markup file once (a test that loads each one is enough): a name
that changed throws a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a> pointing at it.
