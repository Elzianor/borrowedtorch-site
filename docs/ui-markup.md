---
layout: docs
legend: [prop, dp, method, event]
title: "UI: markup"
description: Build element trees from XML with BorrowedTorch.UI.Markup, with properties, items, events, bindings, your own types and errors.
---

BorrowedTorch.UI.Markup builds elements from XML markup, so a UI can be written as data instead of code: loaded by the
game at run time, or edited live in a tool. A markup names the UI's elements by their type names and sets the same
properties code sets. It is a package of its own next to BorrowedTorch.UI, with
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

The types are in the `BorrowedTorch.UI.Markup` namespace.

## Loading markup

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`UiMarkup.Load`</a> reads a markup from a string, and <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadfile">`LoadFile`</a> from a file (any path `File.ReadAllText`
takes; any extension does, these pages use `.btui`). Both return the elements written under `<Ui>`, in the order they
are written, not added anywhere yet: add them to the root with
<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#addelementtoroot">`AddElementToRoot`</a> or to an element of your own. An element you don't add stays yours to dispose.

The elements are made as code would make them, with their constructors. So load a markup on the thread that updates
the UI, once the UI exists: an image's `Source` loads its texture through the UI's `ContentManager` while the markup
is read.

A <a class="ref" href="/docs/ui-glossary/types/markup-context/">`MarkupContext`</a> gives a markup what it reaches besides the UI's own types: the object whose methods handle
its events, the object its bindings read, and [types and converters of your own](#types-and-converters-of-your-own).
A markup without events, bindings or types of your own needs none.

### UiMarkup

A static class.

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load(string markup, MarkupContext context = null)`</a> | Returns the elements under `<Ui>` (an `IReadOnlyList<BaseElement>`), in the order they are written, not added anywhere. Throws a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a> for a markup that can't be read, an `ArgumentNullException` for a `null` markup. |
| <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadfile">`LoadFile(string path, MarkupContext context = null)`</a> | <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a> of the text of a file. The errors of the file itself, such as a missing file, are thrown as they are. |

## Writing markup

### Elements

The root is `<Ui>`, with no attributes. Every element in it is one of the UI's elements by its type name: `<Button>`,
`<StackPanel>`, `<Grid>`, `<Window>`. The markup knows every public class of the UI that isn't abstract or generic:
the elements, the styles and the objects they take, such as a <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a>.
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
[converter of your own](#types-and-converters-of-your-own) to the context.

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

### Bindings

`{Binding Name}` binds a property to the property `Name` of the context's
<a class="ref prop" href="/docs/ui-glossary/types/markup-context/#datacontext">`DataContext`</a>, usually a [`Bindable`](/docs/ui-styles/#bindable) view model whose changes the
element follows. `Mode` sets the direction, one of the <a class="ref" href="/docs/ui-glossary/types/binding-mode/">`BindingMode`</a> values: `{Binding Volume, Mode=TwoWay}`.
Without it the binding is `OneWay`. `Path=Volume` names the property too.

A binding in markup is the binding code makes with the property's
<a class="ref method" href="/docs/ui-glossary/types/dependency-property/#bind">`Bind`</a> (see [bindings](/docs/ui-styles/#bindings)), so only a dependency property can be bound. It takes
no converter: make a binding that needs one in code. A text that starts with a brace and is no binding starts with
`{}`, which is left out: `Text="{}{not bound}"` shows `{not bound}`.

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
| <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#datacontext">`DataContext`</a> | `object` | The object `{Binding Name}` binds to, usually a <a class="ref" href="/docs/ui-glossary/types/bindable/">`Bindable`</a> view model. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/markup-context/#markupcontext">`MarkupContext()`</a> | Creates a context without handlers, data context, types or converters. |
| <a class="ref method" href="/docs/ui-glossary/types/markup-context/#addtype">`AddType<T>()`</a> | Makes a type of your own usable by its name, in place of a type of the UI with the same name. Returns the context. |
| <a class="ref method" href="/docs/ui-glossary/types/markup-context/#addconverter">`AddConverter<T>(Func<string, T> convert)`</a> | Reads the values of type `T` from text with `convert`, in place of the markup's own way. Returns the context. |

## Errors

A markup that can't be read throws a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a>, whose `Message` starts with the line and the
column, counted from 1 as text editors count them: `Line 4, column 17: Button has no property Txt to set`. Each
mistake is reported where it is written:

- XML that isn't well formed, or a root other than `<Ui>`;
- an unknown element or property, or a value that can't be read;
- a child element where none is taken, or a second one where one content is taken;
- a binding without a data context, or to a property the data context doesn't have;
- an event handler that is missing, or takes other parameters.

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
BorrowedTorch.UI breaks a markup when it is loaded, not when the game is built. After updating BorrowedTorch.UI, load
every markup file once (a test that loads each one is enough): a name that changed throws a
<a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a> pointing at it.
