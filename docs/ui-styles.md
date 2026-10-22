---
layout: docs
title: "UI: styles, bindings and animation"
description: Style classes, mouse cursors, default settings, dependency properties, view model bindings, items templates and animations.
---

Every element property listed on the element pages is a dependency property: `Foo` is backed by `FooDP`, a
`DependencyProperty<T>` that a style, a binding or an animation sets (see
[dependency properties](#dependency-properties)), and each element class has a static `FooDPActions` that holds what
the class does when the value changes. This page covers what sets those properties: styles, bindings and animations,
plus mouse cursors and the framework-wide defaults. None of the properties of the types on this page are dependency
properties themselves. Screenshots use the theme shown in [the next section](#the-theme-of-these-pages).

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event.

## The theme of these pages

Every screenshot on the UI pages is drawn with this theme. It changes a few framework-wide defaults and gives the
element types general styles in dark browns and gold. The game calls `Theme.Apply()` once at start, before it creates
the UI and its elements.

```csharp
// the palette of the screenshots on these pages
static readonly Color Panel = new(26, 20, 15);
static readonly Color PanelLight = new(40, 31, 23);
static readonly Color Line = new(70, 56, 42);
static readonly Color Gold = new(233, 194, 122);
static readonly Color GoldDim = new(168, 131, 74);
static readonly Color Ink = new(20, 14, 10);
static readonly Color Text = new(217, 203, 180);
static readonly Color Flame = new(242, 140, 40);

public static void Apply()
{
    // framework-wide defaults: set them before the UI and its elements are created
    BaseElement.ModalWindowActiveShadeTint = new Color(0, 0, 0, 150);
    DefaultSettings.DefaultFontSize = 16;
    DefaultSettings.DefaultTextColor = Text;
    DefaultSettings.DefaultTextCursorColor = Gold;
    DefaultSettings.DefaultTextSelectionColor = new Color(168, 131, 74, 120);
    DefaultSettings.DefaultWindowBackgroundColor = Panel;
    DefaultSettings.DefaultWindowTitleBarColor = PanelLight;
    DefaultSettings.DefaultWindowBorderColor = GoldDim;
    DefaultSettings.DefaultWindowBorderThickness = 1;
    DefaultSettings.DefaultContextMenuBackgroundColor = PanelLight;
    DefaultSettings.DefaultContextMenuBorderColor = GoldDim;
    DefaultSettings.DefaultContextMenuHighlightColor = new Color(80, 60, 38);
    DefaultSettings.DefaultContextMenuIconColor = Gold;

    var scrollBars = new SliderStyle
    {
        ButtonsSolidColor = Line,
        LineDecreaseSolidColor = PanelLight,
        LineIncreaseSolidColor = PanelLight,
        ThumbSolidColor = new Color(110, 88, 62)
    };

    // every element of a type takes its general style
    Button.GeneralStyle = new ButtonStyle
    {
        NormalColor = GoldDim,
        HoverColor = Gold,
        PressedColor = new Color(128, 98, 54),
        ToggledColor = Flame,
        TextStyle = new RichTextBoxStyle { ForegroundColor = Ink }
    };

    CheckBox.GeneralStyle = new CheckBoxStyle
    {
        HorizontalAlignment = HorizontalAlignment.Left,
        VerticalAlignment = VerticalAlignment.Top,
        CheckedSolidColor = Gold,
        UncheckedSolidColor = Line
    };

    Slider.GeneralStyle = new SliderStyle
    {
        ButtonsSolidColor = Line,
        LineDecreaseSolidColor = Gold,
        LineIncreaseSolidColor = PanelLight,
        ThumbSolidColor = new Color(240, 227, 204),
        TickPassedColor = Gold,
        TickRemainingColor = Line
    };

    ProgressBar.GeneralStyle = new ProgressBarStyle
    {
        BackgroundColor = PanelLight,
        ForegroundColor = Gold
    };

    ScrollableContainer.GeneralStyle = new ScrollableContainerStyle
    {
        ScrollBarsThickness = 10,
        ScrollBarsStyle = scrollBars
    };

    ListBox.GeneralStyle = new ListBoxStyle
    {
        BackgroundColor = Panel,
        UseDualColors = true,
        NormalItemColor = Panel,
        AlternativeItemColor = new Color(31, 24, 18),
        HoverItemColor = new Color(58, 44, 30),
        PressedItemColor = new Color(80, 60, 38),
        SelectedItemColor = new Color(110, 82, 48),
        ScrollableContainerStyle = new ScrollableContainerStyle
        {
            ScrollBarsThickness = 10,
            ScrollBarsStyle = scrollBars
        }
    };

    ComboBox.GeneralStyle = new ComboBoxStyle
    {
        SelectionStyle = new ImageStyle { BackgroundColor = PanelLight },
        ToggleButtonStyle = new ButtonStyle
        {
            NormalColor = GoldDim,
            HoverColor = Gold,
            PressedColor = new Color(128, 98, 54),
            ToggledColor = Gold,
            TextStyle = new RichTextBoxStyle { ForegroundColor = Ink }
        }
    };

    TreeView.GeneralStyle = new TreeViewStyle
    {
        MinimizedIconColor = GoldDim,
        ExpandIconStyle = new ImageStyle
        {
            DesiredWidth = 10,
            DesiredHeight = 10,
            Margin = (4, 6, 6, 0),
            HitTest = false
        },
        ExpandedIconColor = Gold,
        ListBoxStyle = new ListBoxStyle
        {
            BackgroundColor = Panel,
            NormalItemColor = Panel,
            HoverItemColor = new Color(58, 44, 30),
            SelectedItemColor = new Color(110, 82, 48)
        }
    };

    ToolTip.GeneralStyle = new ToolTipStyle
    {
        BackgroundColor = new Color(52, 40, 29),
        TextStyle = new RichTextBoxStyle { ForegroundColor = Text, TextMargin = (8, 5) }
    };
}
```

Set `DefaultSettings` first: the framework defaults of a style type read `DefaultSettings` once, the first time that
style type is used (see [default settings](#default-settings)).

## Styles

Every element type `X` that has a style has an `XStyle` class with the same properties as `X`'s dependency properties.
A style is applied at one of two levels: `X.GeneralStyle` for every element of the type, and `element.StyleOverride`
for one element, over its general style. A value set in code wins over both.

<figure class="shot">
  <img src="{{ '/assets/img/ui/styles-override.png' | relative_url }}" width="486" height="74" alt="Three buttons in a row: a gold Keep button, a dark red Delete save button with light text, and a green Own color button">
  <figcaption>The general button style, a style override, and a colour set in code.</figcaption>
</figure>

```csharp
// a style for one element, over the general style of its type
var danger = new ButtonStyle
{
    NormalColor = new Color(150, 52, 30),
    HoverColor = new Color(190, 70, 40),
    PressedColor = new Color(110, 38, 22),
    TextStyle = new RichTextBoxStyle { ForegroundColor = new Color(255, 236, 214) }
};

var row = new StackPanel { Orientation = Orientation.Horizontal, Margin = (16, 18) };

row.AddItem(new Button { Text = "Keep", DesiredWidth = 140, DesiredHeight = 36 });
row.AddItem(new Button
{
    Text = "Delete save",
    DesiredWidth = 140,
    DesiredHeight = 36,
    Margin = (16, 0),
    StyleOverride = danger
});

// a value set in code wins over every style
row.AddItem(new Button
{
    Text = "Own color",
    DesiredWidth = 140,
    DesiredHeight = 36,
    Margin = (16, 0),
    NormalColor = new Color(120, 140, 90)
});

ui.AddElementToRoot(row);
```

A style applies only the properties assigned to it, also when a property is assigned its type's default value. A new
style has none assigned, so `new ButtonStyle { NormalColor = Color.Red }` changes the colour and leaves everything else
to the level below. The "Delete save" button above takes its colours from `danger` and its size from code; anything
`danger` doesn't assign comes from `Button.GeneralStyle`.

- **General style.** `X.GeneralStyle` (static) lies over the framework defaults of the type: a property it leaves
  unassigned takes the framework default (listed in the [style classes](#style-classes) table), or the property's own
  default when the type has none. It starts as a copy of the framework defaults, so reading `Button.GeneralStyle` gives
  the defaults and changing one of its properties in place keeps the others. Assigning a new style replaces it as a
  whole; setting it to `null` leaves only the framework defaults.
- **Style override.** `element.StyleOverride` applies to one element. Its unassigned properties fall through to the
  general style. Setting it back to `null` removes its values from the element.
- **Live changes.** Changing a property of a style in use, or replacing a general style, updates every element that
  uses it. Changes are delivered by walking the element tree; an element that is not in the tree at that moment (created
  but not added yet, or removed) catches up when it is attached.
- **Part styles.** Properties such as `ButtonStyle.TextStyle` or `ListBoxStyle.ScrollableContainerStyle` hold the
  style of a part inside the control. The part takes it as its own `StyleOverride`, so it lies over the part type's
  general style: `TextStyle = new RichTextBoxStyle { ForegroundColor = ... }` changes the text colour and keeps the
  rest of `RichTextBox.GeneralStyle`.
- **No style class.** `Grid`, `Separator`, `TabControl` and the parts that only exist inside an element
  (`ListBoxItem`, `TreeViewItem`, `ContextMenuItem`, `GridCell`, `ContentContainer`, `DefaultWindowTitleBar`) have no
  style. They are set in code; their double click interval, repeat timings and resize area come from
  [`DefaultSettings`](#default-settings) like every element's.

`StyleOverride`, `GeneralStyle`, `MouseCursorsSetOverride` and `GeneralMouseCursorsSet` are members of every styled
element, described on the [base element](/docs/ui-base-element/) page.

### Value priority

Each dependency property keeps up to three values, one per source, and uses the one with the highest priority:
`ManualAssign` > `StyleOverride` > `GeneralStyle`. With none of them set it reads its default. Bindings and animations
write `ManualAssign` values like code does. To give a property set in code back to the styles, clear its manual value:

```csharp
button.NormalColorDP.ClearValue(ValueSources.ManualAssign); // the style's color again
```

`ValueSources`:

| Value | Meaning |
| --- | --- |
| `ManualAssign` | A value set in code (`element.Foo = ...` or `FooDP.SetValue`), by a binding or by an animation. Highest priority. |
| `StyleOverride` | A value from the element's `StyleOverride`. |
| `GeneralStyle` | A value from the general style of the type, or from the framework defaults under it. Lowest priority. |
| `None` | No source has a value: the property reads its default. Returned by `ValueSource`; setting or clearing with it does nothing. |

### BaseStyle

The abstract base of every style class. It has one property for each dependency property of
[`BaseElement`](/docs/ui-base-element/) (`Margin`, `DesiredWidth`, `DesiredHeight`, `MinWidth`, `MinHeight`,
`MaxWidth`, `MaxHeight`, `HorizontalAlignment`, `VerticalAlignment`, `Visibility`, `Disabled`, `BackgroundColor`,
`ForegroundColor`, `TexturesPath`, `Transparency`, `InheritState`, `HitTest`, `GridRow`, `GridColumn`, `GridRowSpan`,
`GridColumnSpan`, `RepeatClicks`, `TimeBeforeRepeatStartsMs`, `TimeBetweenRepeatsMs`, `DoubleClickIntervalMs`,
`CropOutsideOfParentBorder`, `IsResizable`, `ResizeWithElementContour`, `ResizeContourColor`, `ResizeAreaHalfWidth`,
`DragType`, `CustomEffect`), with the same names and types, so every style class has them too. Setting a property
assigns it, even to the value it already has. The framework defaults of every style type include `HitTest = true` and
`CropOutsideOfParentBorder = true`.

| Method | Description |
| --- | --- |
| <span class="method">`IsSet(string propertyName)`</span> | Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`. |
| <span class="method">`Unset(string propertyName)`</span> | Takes the property back out of the style: the style stops applying it, it reads its type's default again, and the elements using the style update. |
| <span class="method">`Clone()`</span> | Returns a copy (as `object`) with the same properties assigned. Part styles in it are copied too. |

### Style classes

Each style class has a public parameterless constructor that creates a style with nothing assigned, and the
properties of its element's dependency properties (see the element's section) except the ones in the third column.
None has properties beyond its element's. The last column lists the framework defaults the class assigns on top of the
`BaseStyle` ones; they are what the general style starts with.

| Style class | Element | Part styles, and element properties left out | Framework defaults |
| --- | --- | --- | --- |
| `BorderStyle` | [`Border`](/docs/ui-layout/#border) | Leaves out `Content`. | None beyond the base ones. |
| `ButtonStyle` | [`Button`](/docs/ui-controls/#button) | Part styles `TextStyle` (`RichTextBoxStyle`) and `BackgroundStyle` (`ImageStyle`). Leaves out `Content`. | None beyond the base ones. |
| `CheckBoxStyle` | [`CheckBox`](/docs/ui-controls/#checkbox) | Part styles `TextStyle` (`RichTextBoxStyle`) and `ImageStyle` (`ImageStyle`). Leaves out `Content`. | None beyond the base ones. |
| `ColorPickerStyle` | [`ColorPicker`](/docs/ui-controls/#colorpicker) | Leaves out `Brightness` and `SelectedColor`, so it has only the `BaseStyle` properties. | `ForegroundColor` white. |
| `ComboBoxStyle` | [`ComboBox`](/docs/ui-lists/#combobox) | Part styles `SelectionStyle` (`ImageStyle`), `ToggleButtonStyle` (`ButtonStyle`) and `ListBoxStyle` (`ListBoxStyle`). | Aligned left and top, `InheritState.FromChildren`. |
| `ContextMenuStyle` | [`ContextMenu`](/docs/ui-lists/#contextmenu) | Part styles `BorderStyle`, `ListBoxStyle`, `CheckIconStyle` and `ExpandIconStyle` (`ImageStyle`). Leaves out `ItemsSource`. | Aligned left and top, `HitTest` off, `Placement` `BottomRight`. A border 1 unit thick in the context menu colours of `DefaultSettings`; a transparent list without dual colours whose hover and selected rows use `DefaultContextMenuHighlightColor`; an 8 by 8 check icon and a 6 by 8 expand icon in `DefaultContextMenuIconColor`. |
| `ImageStyle` | [`Image`](/docs/ui-images/#image) | None. | `ForegroundColor` white. |
| `LabelStyle` | [`Label`](/docs/ui-text/#label) | None. | `Text` empty, `FontSize` `DefaultFontSize`, `ForegroundColor` `DefaultTextColor`, `HitTest` off, `InheritState.FromParent`. |
| `ListBoxStyle` | [`ListBox`](/docs/ui-lists/#listbox) | Part style `ScrollableContainerStyle`. Leaves out `SelectedItem`, `SelectedIndex` and `ItemsSource`. | `InheritState.FromChildren`. |
| `ProgressBarStyle` | [`ProgressBar`](/docs/ui-controls/#progressbar) | None. | None beyond the base ones. |
| `RichTextBoxStyle` | [`RichTextBox`](/docs/ui-text/#richtextbox) | Part styles `ScrollBarsStyle` (`SliderStyle`) and `BackgroundStyle` (`ImageStyle`). | `Text` empty, `InheritState.FromChildren`, and `FontSize`, `ForegroundColor`, `TextCursorThickness`, `TextCursorColor`, `TextSelectionColor` from `DefaultSettings`. |
| `RootElementStyle` | [`RootElement`](/docs/ui-base-element/#the-root-element) | Only the `BaseStyle` properties. | None beyond the base ones. |
| `ScrollableContainerStyle` | [`ScrollableContainer`](/docs/ui-layout/#scrollablecontainer) | Part style `ScrollBarsStyle` (`SliderStyle`), used by both scroll bars (the vertical one with its two line colours swapped). | `InheritState.FromChildren`. |
| `SliderStyle` | [`Slider`](/docs/ui-controls/#slider) | None. | `InheritState.FromChildren`, `ThumbScale` (1, 1). |
| `StackPanelStyle` | [`StackPanel`](/docs/ui-layout/#stackpanel) | None. | Aligned left and top, `HitTest` off, `InheritState.FromChildren`. |
| `StencilStyle` | [`Stencil`](/docs/ui-images/#stencil) | Leaves out `SourceTexture` and `StencilTexture`. | None beyond the base ones. |
| `ToolTipStyle` | [`ToolTip`](/docs/ui-controls/#tooltip) | Part style `TextStyle` (`RichTextBoxStyle`). Leaves out `Content`. | Aligned left and top, `HitTest` off, `TimeBeforeShowMs` `DefaultTimeBeforeShowToolTipMs`. |
| `TreeViewStyle` | [`TreeView`](/docs/ui-lists/#treeview) | Part styles `ListBoxStyle` and `ExpandIconStyle` (`ImageStyle`). Leaves out `SelectedItem` and `ItemsSource`. | An `ExpandIconStyle` of an 8 by 8 block, centred, `MinimizedIconColor` (150, 150, 160), `ExpandedIconColor` (90, 90, 100). |
| `ViewPortStyle` | [`ViewPort`](/docs/ui-images/#viewport) | None. | `HitTest` off, `MinDepth` and `MaxDepth` from `DefaultSettings`. |
| `WindowStyle` | [`Window`](/docs/ui-layout/#window) | Part style `BorderStyle`. Leaves out `TitleBar` and `Content`. | A border `DefaultWindowBorderThickness` thick, filled with `DefaultWindowBackgroundColor`, in `DefaultWindowBorderColor`. |

`DefaultWindowTitleBarStyle` is an empty class that does not derive from `BaseStyle`; nothing uses it, and
`DefaultWindowTitleBar` has no style.

### GenericStyle&lt;T&gt;

The static holder of the general style of one style type, where `T` is the style class. `Button.GeneralStyle` reads
and writes `GenericStyle<ButtonStyle>.GeneralStyle`. It also keeps the framework defaults of the type, built the first
time the type is used from the class's defaults (internal, not reachable from your code).

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`GeneralStyle`</span> | `T` | Static. The style every element of the type takes, over the framework defaults. Starts as a copy of the defaults; `null` leaves only the defaults. |

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnGeneralStyleChanged`</span> | `(T prevStyle)` | Static. `GeneralStyle` is replaced by another style; the handler gets the previous one. Not raised when a property of the style changes. |

## Mouse cursors

Mouse cursors are chosen in the same layers as styles. An element with a style class shows, in this order of
priority:

1. its own set, `element.MouseCursorsSetOverride`;
2. the set given by hand (`MouseCursorsSetOverride`) to the control it is a part of;
3. the general set of its type, `X.GeneralMouseCursorsSet` (`null` at start);
4. `BaseElement.DefaultMouseCursorsSet`, which `BorrowedTorchUI.SetDefaultMouseCursorsSet` also sets.

So a set given to a control reaches the controls inside it (the scroll bars of a list, the list of a tree view or
combo box, the title bar of a window) unless they have a set of their own. Without one on the control, those parts
keep their own type's `GeneralMouseCursorsSet` (a list's scroll bars use `Slider.GeneralMouseCursorsSet`). A part
without a style class shows its owner's cursors. Your own elements placed in a control keep their own cursors.
Changing a property of a set in use, or replacing a general or default set, updates the elements.

```csharp
Button.GeneralMouseCursorsSet = new MouseCursorsSet
{
    // LoadPng: your own loader of PNG files as Texture2D
    HoverCursor = MouseCursor.FromTexture2D(
        LoadPng("UITextures/MouseCursors/ArrowHover.png"), 0, 0),
    PressedCursor = MouseCursor.FromTexture2D(
        LoadPng("UITextures/MouseCursors/ArrowPressed.png"), 0, 0)
};
```

A cursor property left `null` sets no cursor, so the one shown before stays. The default set shows the arrow on hover,
the hand over a draggable element, the "no" cursor where a drop is denied, and the sizing arrows on the edges and
corners of a resizable element; it has no pressed, drag pressed or drop allowed cursor and no rich text cursors.

### MouseCursorsSet

The cursors an element shows. It is disposable: disposing it disposes its `DragAndDropCursors`, `ResizeCursors` and
`RichTextCursors`, and a disposed set ignores new values.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`HoverCursor`</span> | `MouseCursor` | The cursor while the mouse is over the element. |
| <span class="prop">`PressedCursor`</span> | `MouseCursor` | The cursor while the left button is held on the element. |
| <span class="prop">`DragAndDropCursors`</span> | `DragAndDropCursors` | The cursors of a draggable element and of drop targets. |
| <span class="prop">`ResizeCursors`</span> | `ResizeCursors` | The cursors on the edges and corners of a resizable element. |
| <span class="prop">`RichTextCursors`</span> | `RichTextCursors` | The cursors over the text of a rich text box. |

| Method | Description |
| --- | --- |
| `MouseCursorsSet()` | Creates an empty set. |
| <span class="method">`Clone()`</span> | Returns a copy (as `object`), with copies of the three nested sets; the `MouseCursor` objects are shared. Returns `null` for a disposed set. |

### DragAndDropCursors

The cursors of [drag and drop](/docs/ui-images/#drag-and-drop). Disposable like `MouseCursorsSet`.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`DragHoverCursor`</span> | `MouseCursor` | Shown instead of `HoverCursor` over an element that can be dragged. |
| <span class="prop">`DragPressedCursor`</span> | `MouseCursor` | Shown instead of `PressedCursor` while the left button is held on an element that can be dragged. |
| <span class="prop">`DropAllowedCursor`</span> | `MouseCursor` | Shown over a drop target that accepts what is dragged. |
| <span class="prop">`DropDeniedCursor`</span> | `MouseCursor` | Shown over a drop target that refuses what is dragged. |

| Method | Description |
| --- | --- |
| `DragAndDropCursors()` | Creates an empty set. |
| <span class="method">`Clone()`</span> | Returns a copy (as `object`), or `null` when disposed. |

### ResizeCursors

The cursors of the eight grips around a [resizable](/docs/ui-base-element/#resizing) element. Each grip is a
`MouseCursorsSet`, so it can have a hover and a pressed cursor. A sealed, disposable class.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`LeftTop`</span> | `MouseCursorsSet` | The top left corner. |
| <span class="prop">`RightTop`</span> | `MouseCursorsSet` | The top right corner. |
| <span class="prop">`LeftBottom`</span> | `MouseCursorsSet` | The bottom left corner. |
| <span class="prop">`RightBottom`</span> | `MouseCursorsSet` | The bottom right corner. |
| <span class="prop">`Left`</span> | `MouseCursorsSet` | The left edge. |
| <span class="prop">`Right`</span> | `MouseCursorsSet` | The right edge. |
| <span class="prop">`Top`</span> | `MouseCursorsSet` | The top edge. |
| <span class="prop">`Bottom`</span> | `MouseCursorsSet` | The bottom edge. |

| Method | Description |
| --- | --- |
| `ResizeCursors()` | Creates an empty set. |
| <span class="method">`Clone()`</span> | Returns a copy (as `object`) that shares the eight sets, or `null` when disposed. |

### RichTextCursors

The cursors over the text of a [`RichTextBox`](/docs/ui-text/#richtextbox). They replace the hover and pressed cursors
of the box's set. Disposable like `MouseCursorsSet`.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`WriteCursor`</span> | `MouseCursorsSet` | Its hover and pressed cursors are shown over the text of an editable (`ReadWrite`) box. |
| <span class="prop">`LinkCursor`</span> | `MouseCursorsSet` | Its hover and pressed cursors are shown over a link in a box that is not editable. |

| Method | Description |
| --- | --- |
| `RichTextCursors()` | Creates an empty set. |
| <span class="method">`Clone()`</span> | Returns a copy (as `object`) that shares the two sets, or `null` when disposed. |

### GenericMouseCursorsData&lt;T&gt;

The static holder of the general mouse cursors set of one element type, keyed by its style class `T`.
`Button.GeneralMouseCursorsSet` reads and writes `GenericMouseCursorsData<ButtonStyle>.GeneralMouseCursorsSet`.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`GeneralMouseCursorsSet`</span> | `MouseCursorsSet` | Static. The set of every element of the type that has none of its own. `null` at start, which means the default set. |

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnGeneralMouseCursorsSetChanged`</span> | `(MouseCursorsSet prevMouseCursorsSet)` | Static. `GeneralMouseCursorsSet` is replaced; the handler gets the previous set. Not raised when a property of the set changes. |

## Default settings

`DefaultSettings` (namespace `BorrowedTorch.UI.Settings`) is a static class of public fields that hold framework-wide
defaults. Set them at start, before you create elements. Most are read when the framework defaults of a style type are
built, which happens once, the first time that style type is used (normally when the first element of the type is
created, or when you touch `X.GeneralStyle`); changing them later doesn't reach that type. The ones marked "on use" are
read each time they are needed.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `DefaultFontSize` | `int` | `14` | The `FontSize` default of `LabelStyle` and `RichTextBoxStyle`. |
| `DefaultTextColor` | `Color` | `Color.Black` | The `ForegroundColor` default of `LabelStyle` and `RichTextBoxStyle`. |
| `DefaultTextCursorThickness` | `int` | `1` | The `TextCursorThickness` default of `RichTextBoxStyle`, in units. |
| `DefaultTextCursorColor` | `Color` | `Color.Black` | The `TextCursorColor` default of `RichTextBoxStyle`. |
| `DefaultTextSelectionColor` | `Color` | `Color.LightBlue` | The `TextSelectionColor` default of `RichTextBoxStyle`. |
| `DefaultTextCursorBlinkTimeMs` | `int` | `500` | How long the text cursor stays on and off, in milliseconds. Read when a text cursor starts blinking. |
| `DefaultResizeAreaHalfWidth` | `int` | `3` | On use. The `ResizeAreaHalfWidth` default of every element: half the width of the grips of a resizable element, in units. |
| `DefaultResizeContourHalfWidth` | `int` | `1` | On use. Half the width of the contour drawn while an element is resized, in units. |
| `DefaultResizeContourColor` | `Color` | `new(50, 50, 50, 190)` | On use. The `ResizeContourColor` default of every element. |
| `DefaultWindowTitleThickness` | `int` | `30` | The height of a window's default title bar (its close button is 4 units smaller). Read when a window is created, and for the close button when the title bar is measured. |
| `DefaultWindowBorderThickness` | `int` | `2` | The border thickness of `WindowStyle`'s default border. |
| `DefaultWindowBackgroundColor` | `Color` | `Color.Wheat` | The background colour of `WindowStyle`'s default border. |
| `DefaultWindowTitleBarColor` | `Color` | `Color.LightBlue` | The background colour of a window's default title bar, read when the title bar is created. |
| `DefaultWindowBorderColor` | `Color` | `new(80, 80, 80, 255)` | The border colour of `WindowStyle`'s default border. |
| `DefaultTimeBeforeShowToolTipMs` | `int` | `500` | The `TimeBeforeShowMs` default of `ToolTipStyle`. |
| `DefaultContextMenuBackgroundColor` | `Color` | `Color.White` | The background colour of `ContextMenuStyle`'s default border. |
| `DefaultContextMenuBorderColor` | `Color` | `new(80, 80, 80, 255)` | The border colour of `ContextMenuStyle`'s default border. |
| `DefaultContextMenuHighlightColor` | `Color` | `new(200, 220, 240, 255)` | The colour of the hovered and selected rows of `ContextMenuStyle`'s default list style. |
| `DefaultContextMenuIconColor` | `Color` | `new(80, 80, 80, 255)` | The colour of the check and expand icons of `ContextMenuStyle`. |
| `DefaultDoubleClickIntervalMs` | `int` | `300` | On use. The `DoubleClickIntervalMs` default of every element. |
| `DefaultTimeBeforeRepeatStartsMs` | `int` | `1000` | On use. The `TimeBeforeRepeatStartsMs` default of every element. |
| `DefaultTimeBetweenRepeatsMs` | `int` | `300` | On use. The `TimeBetweenRepeatsMs` default of every element. |
| `DefaultMinDepth` | `float` | `0` | The `MinDepth` default of `ViewPortStyle`. |
| `DefaultMaxDepth` | `float` | `1` | The `MaxDepth` default of `ViewPortStyle`. |

The "on use" defaults apply to every element whose property has no value from code or a style, also to elements
without a style class such as `Grid`.

## Dependency properties

Every element property `Foo` is backed by `FooDP`, a `DependencyProperty<T>`. It holds the prioritised values (see
[value priority](#value-priority)), runs the element's reaction to a change, raises events, and can be bound or
animated. An element creates `FooDP` the first time it is used: set, bound, subscribed to, or read through `FooDP`.
Reading `Foo` doesn't create it, so an element pays only for the properties it uses. Setting `Foo` is the same as
`FooDP.SetValue(value)`.

```csharp
// the same as button.DesiredWidth = 120
button.DesiredWidthDP.SetValue(120);

// back to the style value
button.DesiredWidthDP.ClearValue(ValueSources.ManualAssign);

button.DesiredWidthDP.OnPropertyChanged += width => Console.WriteLine(width);
button.DesiredWidthDP.PreAction = (ref int value, ref bool canProceed) =>
    value = Math.Max(value, 50);
```

`OnPropertyChanged`, and the element's own reaction, come when the value in effect changes: setting by hand the value
a style already gives, or clearing a value that leaves the same value in effect, raises nothing. The first value a
property gets is always raised, even if it equals the default. A value set at a lower priority than one already set is
stored but changes nothing until the higher one is cleared.

The `FooDP` and `Foo` properties and the style classes are generated at build time by the
`BorrowedTorch.UIDPGenerator` package from the `.dpg` file next to each element. How to add properties to an element
of your own is on the [base element](/docs/ui-base-element/) page.

### DependencyProperty&lt;T&gt; properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`Value`</span> | `T` | Read-only. The value in effect: the one of the highest priority source, or the default when no source has one. |
| <span class="prop">`ValueSource`</span> | `ValueSources` | Read-only. The source the value in effect comes from, `None` when the property reads its default. |
| <span class="prop">`PreAction`</span> | `PreActionDelegate` | Called with `(ref T value, ref bool canProceed)` before every value is stored, from any source: change `value` to correct it, or set `canProceed` to `false` to reject it. Runs after the element's own pre-action. |
| <span class="prop">`PostAction`</span> | `Action<T>` | Called with the new value in effect after the element's own reaction, before `OnPropertyChanged`. |

### DependencyProperty&lt;T&gt; events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnPropertyChanged`</span> | `(T value)` | The value in effect changes. The handler gets the new value. |
| <span class="event">`OnSourcePropertyChanged`</span> | `(object propertyValue)` | The bound `Bindable` source reports a change of the bound property (or of all properties, with an empty name). The handler gets the source property's value, before conversion. Not raised for the echo of the property's own write, nor in `OneWayToSource` mode. |
| <span class="event">`OnSourceCollectionChanged`</span> | `(CollectionChangeType changeType, int startIndex, int count)` | The `IBindableCollection` held by the bound source property adds (`Add`) or removes (`Remove`) items. Not raised in `OneWayToSource` mode. |

### DependencyProperty&lt;T&gt; methods

| Method | Description |
| --- | --- |
| `DependencyProperty(BaseElement owner, Action<T> postAction = null, PreActionDelegate preAction = null)` | Creates a stand-alone property owned by an element, with an optional post- and pre-action. Its default is `default(T)`. |
| `DependencyProperty(BaseElement owner, DependencyPropertyActions<T> actions)` | Creates a property that shares the element class's actions and default; the generated `FooDP` properties use it. |
| <span class="method">`SetValue(T value, bool checkForEquality = true, bool setSourceValue = true, ValueSources valueSource = ValueSources.ManualAssign)`</span> | Stores the value for the source. With `checkForEquality` off, the same value raises the change again. With `setSourceValue` off, a bound source is not written. |
| <span class="method">`ClearValue(ValueSources valueSource)`</span> | Removes the value of that source. If it was the value in effect, the next source (or the default) takes over and the change is raised when the value differs. |
| <span class="method">`Bind(object dataContext, string sourcePropertyName, BindingMode mode, IConverter converter = null)`</span> | Binds the property to a public property of `dataContext`, replacing any earlier binding. See [bindings](#bindings). |
| <span class="method">`Dispose()`</span> | Removes the binding and the event handlers. The element calls it when it is disposed. |

`OwnerPreActionDelegate`, with the signature `(BaseElement owner, ref T value, ref bool canProceed, ValueSources
valueSource)`, is the type of the element class's own pre-action. It is assigned inside the library; you can't set one
from your code.

### DependencyPropertyActions&lt;T&gt;

What the properties of one name share over all the elements of a class: the class's own pre- and post-action (set
once, in its static constructor) and the default value. The generated code creates one per dependency property, as
the static `FooDPActions` field of the element class.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`DefaultValue`</span> | `T` | Read-only. The value read while no source has one. Some defaults are read from `DefaultSettings` each time (see [default settings](#default-settings)). |

| Method | Description |
| --- | --- |
| `DependencyPropertyActions()` | Creates an empty set of actions with the default `default(T)`. |

## Bindings

A dependency property can be bound to a public property of any object, the view model. When the object derives
from `Bindable` and calls `PropertyChangedInvoke`, the element follows its changes. `BindableCollection<T>` is a list
that tells a bound list box about added and removed items. This view model and converter are used by the example
below:

```csharp
// a view model: the elements bound to it follow its PropertyChangedInvoke calls
public sealed class SettingsViewModel : Bindable
{
    private string _playerName = "";
    private float _volume = 0.5f;

    public string PlayerName
    {
        get => _playerName;
        set
        {
            _playerName = value;
            PropertyChangedInvoke(nameof(PlayerName));
            PropertyChangedInvoke(nameof(Greeting));
        }
    }

    public string Greeting => $"Welcome, {PlayerName}";

    public float Volume
    {
        get => _volume;
        set
        {
            _volume = value;
            PropertyChangedInvoke(nameof(Volume));
        }
    }

    // added and removed items reach a bound list
    public BindableCollection<string> Levels { get; } = [];
}

// turns the volume (0..1) into the text of a label
public sealed class PercentConverter : IConverter
{
    public object Convert(object value) => $"Volume {(float)value * 100:0} %";

    public object ConvertBack(object value) => throw new NotSupportedException();
}
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/styles-bindings.png' | relative_url }}" width="366" height="208" alt="A text box with Ash and the label Welcome, Ash beside it; a slider at 65 percent with the label Volume 65 %; a list with Forest, Desert and Caves">
  <figcaption>A text box, a slider and a list bound to one view model.</figcaption>
</figure>

```csharp
var settings = new SettingsViewModel();

var name = new RichTextBox("name")
{
    Type = RichTextBoxType.ReadWrite,
    DesiredWidth = 220,
    DesiredHeight = 30,
    TextMargin = (8, 0),
    VerticalTextAlignment = VerticalTextAlignment.Center,
    BackgroundColor = new Color(40, 31, 23),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16)
};
var greeting = new Label
{
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (252, 22)
};
var volume = new Slider
{
    DesiredWidth = 220,
    DesiredHeight = 18,
    Max = 1,
    Margin = (16, 66)
};
var volumeText = new Label
{
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (252, 66)
};
var levels = new ListBox { DesiredWidth = 220, DesiredHeight = 90, Margin = (16, 100) };

name.TextDP.Bind(settings, nameof(settings.PlayerName), BindingMode.TwoWay);
greeting.TextDP.Bind(settings, nameof(settings.Greeting), BindingMode.OneWay);
volume.ValueDP.Bind(settings, nameof(settings.Volume), BindingMode.TwoWay);
volumeText.TextDP.Bind(settings, nameof(settings.Volume), BindingMode.OneWay,
    new PercentConverter());
levels.ItemsSourceDP.Bind(settings, nameof(settings.Levels), BindingMode.OneWay);

// changes of the view model reach the elements,
// and the edits of the user reach the view model
settings.PlayerName = "Ash";
settings.Volume = 0.65f;
settings.Levels.Add("Forest");
settings.Levels.Add("Desert");
settings.Levels.Add("Caves");

ui.AddElementToRoot(name);
ui.AddElementToRoot(greeting);
ui.AddElementToRoot(volume);
ui.AddElementToRoot(volumeText);
ui.AddElementToRoot(levels);
```

How a binding behaves:

- `Bind` finds the source property by name. Unless the mode is `OneWayToSource`, it reads the source value right away;
  in `OneWayToSource` mode the source is first written at the element's next change.
- Values from the source are `ManualAssign` values. A source value of the property's type is taken as it is, `null`
  clears a reference-type property, and any value becomes its `ToString()` for a `string` property. Other values are
  ignored. With a converter, `Convert` runs first and its result must have the property's type (or be `null`).
- Writing to the source (`OneWayToSource`, `TwoWay`) needs a writable source property. The value goes through
  `ConvertBack` when there is a converter, and is skipped when it can't be assigned to the source property's type.
- The source's notification of a two-way write is no change for the element, but a value the source changed on the way
  (clamped, for example) is taken. A notification without a new value raises nothing; a collection is taken again,
  since its items may have changed.
- The view model and the bound collection reference the binding weakly: a bound element that is dropped without being
  disposed doesn't stay alive because its view model does.

`BindingMode`:

| Value | Meaning |
| --- | --- |
| `OneWay` | Source to element. |
| `OneWayToSource` | Element to source. |
| `TwoWay` | Both ways. |

### Bindable

The abstract base of a view model.

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnPropertyChanged`</span> | `(string propertyName)` | The view model calls `PropertyChangedInvoke`. An empty name means every property changed. |

| Method | Description |
| --- | --- |
| <span class="method">`PropertyChangedInvoke(string propertyName)`</span> | Protected. Raises `OnPropertyChanged`; call it from a property setter with `nameof` the property. |

### BindableCollection&lt;T&gt;

A list that raises `OnCollectionChanged` for every change, so a bound `ListBox`, `ComboBox`, `TreeView` or
`ContextMenu` updates only the changed rows. It implements `IBindableCollection` and `IReadOnlyList<T>`, and can be
filled with a collection initializer or `[]`.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`this[int index]`</span> | `T` | The item at the index. Setting it is reported as the old item removed and the new one added at that index. |
| <span class="prop">`Count`</span> | `int` | Read-only. The number of items. |
| <span class="prop">`IsReadOnly`</span> | `bool` | Read-only. Always `false`. |

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnCollectionChanged`</span> | `(bool isItemsAdded, int startIndex, int count)` | Items are added (`isItemsAdded` is `true`) or removed, starting at `startIndex`. |

| Method | Description |
| --- | --- |
| `BindableCollection()` | Creates an empty collection. |
| <span class="method">`Add(T item)`</span> | Adds the item at the end. |
| <span class="method">`AddRange(IEnumerable<T> collection)`</span> | Adds the items at the end, reported as one change. Does nothing for `null` or an empty collection. |
| <span class="method">`Insert(int index, T item)`</span> | Inserts the item at the index. An index outside `0..Count` is ignored. |
| <span class="method">`InsertRange(int index, IEnumerable<T> collection)`</span> | Inserts the items at the index, reported as one change. An index outside `0..Count` is ignored. |
| <span class="method">`Remove(T item)`</span> | Removes the first occurrence of the item. Returns `false` when it is not in the collection. |
| <span class="method">`RemoveAt(int index)`</span> | Removes the item at the index. An index out of range is ignored. |
| <span class="method">`RemoveRange(int index, int count)`</span> | Removes up to `count` items from the index, reported as one change. |
| <span class="method">`Clear()`</span> | Removes every item, reported as one change. |
| <span class="method">`TryGetElementAt(int index)`</span> | Returns the item at the index, or `default` when the index is out of range. |
| <span class="method">`Contains(T item)`</span> | Whether the item is in the collection. |
| <span class="method">`CopyTo(T[] array, int arrayIndex)`</span> | Copies the items into the array from the index. |
| <span class="method">`GetEnumerator()`</span> | Enumerates the items. |

### IBindableCollection

An `IEnumerable` that reports its changes. Implement it for a collection of your own to use it as a bound items
source.

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnCollectionChanged`</span> | `(bool isItemsAdded, int startIndex, int count)` | Items were added (`true`) or removed (`false`), `count` of them from `startIndex`. |

`CollectionChangeType` (in `OnSourceCollectionChanged`):

| Value | Meaning |
| --- | --- |
| `Initialize` | The whole source is taken again. Used by the list box when it rebuilds its rows; `OnSourceCollectionChanged` doesn't raise it. |
| `Add` | Items were added. |
| `Remove` | Items were removed. |

### IConverter

Translates between the source's type and the property's type.

| Method | Description |
| --- | --- |
| <span class="method">`Convert(object value)`</span> | Turns a source value into the property's value. Used in `OneWay` and `TwoWay` mode. |
| <span class="method">`ConvertBack(object value)`</span> | Turns the property's value into a source value. Used in `OneWayToSource` and `TwoWay` mode. |

## Items templates

A list box, combo box, tree view or context menu with an `ItemsSource` makes one row per source object. Its
`ItemsTemplate` makes the element shown in each row; without one, the row shows the object's `ToString()` in a
`Label`. The elements a template makes belong to the list, which may dispose or reuse them, so don't keep or move
them. Setting another
template on a list box with an items source rebuilds its rows. This template and record are used by the example
below:

```csharp
public sealed record Quest(string Title, bool Done);

// makes the element of a row from its source object
public sealed class QuestTemplate : IItemsTemplate
{
    public BaseElement GenerateItemElement(object data)
    {
        var quest = (Quest)data;

        return new CheckBox
        {
            Text = quest.Title,
            Checked = quest.Done,
            DesiredHeight = 22,
            Margin = (6, 3),
            HorizontalAlignment = HorizontalAlignment.Left,
            VerticalAlignment = VerticalAlignment.Top
        };
    }
}
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/styles-items-template.png' | relative_url }}" width="334" height="154" alt="A list of four check boxes: Light the beacon and Rest by the fire checked, Find the map and Cross the river unchecked">
  <figcaption>Each quest of the source shown as a check box.</figcaption>
</figure>

```csharp
var quests = new BindableCollection<Quest>
{
    new("Light the beacon", true),
    new("Find the map", false),
    new("Cross the river", false)
};

var list = new ListBox("quests")
{
    DesiredWidth = 300,
    DesiredHeight = 120,
    Margin = 16,
    ItemsTemplate = new QuestTemplate(),     // one row element per quest
    ItemsSource = quests
};

quests.Add(new Quest("Rest by the fire", true));   // a new row appears

ui.AddElementToRoot(list);
```

### IItemsTemplate

| Method | Description |
| --- | --- |
| <span class="method">`GenerateItemElement(object data)`</span> | Returns a new element that shows the source object. |

### IRecyclingItemsTemplate

An `IItemsTemplate` whose elements can be re-bound to another source object. A virtualized
[`ListBox`](/docs/ui-lists/#listbox) (`VirtualizationMode` `Fixed`) then reuses the row elements that scroll out of
view instead of generating new ones.

| Method | Description |
| --- | --- |
| <span class="method">`UpdateItemElement(BaseElement element, object data)`</span> | Shows `data` in an element that `GenerateItemElement` of this template made earlier. |

```csharp
public class LevelTemplate : IRecyclingItemsTemplate
{
    public BaseElement GenerateItemElement(object data) =>
        new Label { Text = (string)data, Margin = 5 };

    public void UpdateItemElement(BaseElement element, object data) =>
        ((Label)element).Text = (string)data;
}
```

## Animations

An `Animation<T>` drives one or more dependency properties of type `T` along a time line of `durationMs`. Frames
describe the values: `SmoothAnimationFrame<T>` goes from one value to another over a stretch of the time line,
`DiscreteAnimationFrame<T>` sets a value at a point of it. Register the animation with `BorrowedTorchUI.AddAnimation`
and start it.

<figure class="shot">
  <img src="{{ '/assets/img/ui/styles-animation.png' | relative_url }}" width="334" height="103" alt="The orange text Level complete above a progress bar filled to about forty percent">
  <figcaption>A banner that slid in and a bar that is filling, captured while running.</figcaption>
</figure>

```csharp
var banner = new Label("banner")
{
    Text = "Level complete",
    FontSize = 22,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (-300, 16)
};
var experience = new ProgressBar
{
    DesiredWidth = 300,
    DesiredHeight = 12,
    Max = 100,
    Margin = (16, 70)
};

ui.AddElementToRoot(banner);
ui.AddElementToRoot(experience);

// the banner slides in from the left, easing out
var slideIn = new Animation<Margin>(500);
slideIn.AddFrame(new SmoothAnimationFrame<Margin>((-300, 16), (16, 16), 500,
    shapingFunction: new CubicEaseOut()));
slideIn.AddDependencyProperty(banner.MarginDP);

// the bar fills over a second, and its color pulses back and forth
var fill = new Animation<float>(1000);
fill.AddFrame(new SmoothAnimationFrame<float>(0, 100, 1000));
fill.AddDependencyProperty(experience.ValueDP);

var pulse = new Animation<Color>(400, AnimationRepeatType.Infinite,
    autoReverse: true, deleteOnComplete: false);
pulse.AddFrame(new SmoothAnimationFrame<Color>(new Color(233, 194, 122),
    new Color(242, 140, 40), 400));
pulse.AddDependencyProperty(banner.ForegroundColorDP);

ui.AddAnimation(slideIn);
ui.AddAnimation(fill);
ui.AddAnimation(pulse);

slideIn.Start();
fill.Start();
pulse.Start();
```

The UI advances its running animations on every `Update`, by the frame's elapsed game time. A long
frame doesn't skip boundaries: the animation still turns around, ends its runs and lands on the exact end values.

- A run goes once along the time line, or forth and back with `autoReverse`. `AnimationRepeatType.None` plays one run,
  `NumberOfTimes` plays `repeatsNumber` runs, `Infinite` repeats until you pause or remove it.
- When it completes, the animation applies the values of the end of its time line (its start, with `autoReverse`),
  then `RunBoundaryValues.EndValue` if it has one. With `deleteOnComplete` (the default) it is then removed from the
  UI; add it again to play it after a `Reset`.
- Animated values are `ManualAssign` values: they win over styles and stay after the animation. Clear them with
  `FooDP.ClearValue(ValueSources.ManualAssign)` to give the property back to its style.
- `int`, `float`, `Margin` and `Color` are interpolated. A smooth frame of any other type keeps `From` until the end of
  the frame, then switches to `To`.
- An animation whose properties all belong to disposed elements is removed automatically.

### Animation&lt;T&gt;

An animation of properties of type `T`. It has the properties of [`BaseAnimation`](#baseanimation).

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`State`</span> | `AnimationState` | Read-only. Where the animation is: not started, running, paused or completed. |
| <span class="prop">`RunBoundaryValues`</span> | `RunBoundaryValues<T>` | Read-only. The values applied when the animation starts and when it completes, or `null`. |

| Method | Description |
| --- | --- |
| `Animation(int durationMs, AnimationRepeatType repeatType = AnimationRepeatType.None, bool autoReverse = false, bool deleteOnComplete = true, RunBoundaryValues<T> runBoundaryValues = null, uint repeatsNumber = 1)` | Creates an animation with a time line of `durationMs` milliseconds. `repeatsNumber` counts the runs of a `NumberOfTimes` animation. A duration of 0 or less completes at once with the end values. |
| <span class="method">`AddFrame(BaseAnimationFrame<T> frame)`</span> | Adds a smooth or discrete frame. |
| <span class="method">`AddDependencyProperty(DependencyProperty<T> property)`</span> | Adds a property the animation drives. One animation can drive several properties. |
| <span class="method">`Start()`</span> | Runs a not started or paused animation. On the first start it applies `RunBoundaryValues.StartValue` and the values of the time line's start. Does nothing on a completed animation (call `Reset` first) or on a `NumberOfTimes` animation with 0 repeats. |
| <span class="method">`Pause()`</span> | Pauses a running animation; `Start` continues it. |
| <span class="method">`Reset()`</span> | Puts the animation back to not started, at the start of its time line with its repeats restored. The properties keep their current values. |

### BaseAnimation

The abstract base of animations, the type `AddAnimation` takes. Its properties are set by the constructor.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`State`</span> | `AnimationState` | Read-only. The state of the animation. |
| <span class="prop">`DurationMs`</span> | `int` | Read-only. The length of the time line in milliseconds. |
| <span class="prop">`RepeatType`</span> | `AnimationRepeatType` | Read-only. How the runs repeat. |
| <span class="prop">`RepeatsNumber`</span> | `uint` | Read-only. The number of runs of a `NumberOfTimes` animation. |
| <span class="prop">`AutoReverse`</span> | `bool` | Read-only. Whether a run goes forth and back along the time line. |
| <span class="prop">`DeleteOnComplete`</span> | `bool` | Read-only. Whether the UI removes the animation when it completes. |

`AnimationState`:

| Value | Meaning |
| --- | --- |
| `NotStarted` | Created or reset, not started yet. |
| `Running` | Advancing with every update. |
| `Paused` | Stopped where it was; `Start` continues it. |
| `Completed` | All runs are done; `Reset` makes it playable again. |

`AnimationRepeatType`:

| Value | Meaning |
| --- | --- |
| `None` | One run. |
| `NumberOfTimes` | `RepeatsNumber` runs. |
| `Infinite` | Runs until paused or removed. |

### BaseAnimationFrame&lt;T&gt;

The abstract base of the frames an `Animation<T>` takes. It has no public members; use `SmoothAnimationFrame<T>` or
`DiscreteAnimationFrame<T>`.

### SmoothAnimationFrame&lt;T&gt;

Goes from `From` to `To` between `StartAtMs` and `StartAtMs + DurationMs` of the time line, and goes back the same way
when the time line reverses. Before its start it sets nothing. A shaping function bends the progress: pass any
`BaseShapingFunction` from the `BorrowedTorch.ShapingFunctions` package, such as `new CubicEaseOut()`, or create one
with `ShapingFunctionFactory.Create(ShapingFunctionId.CubicEaseInOut)`.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`From`</span> | `T` | Read-only. The value at the start of the frame. |
| <span class="prop">`To`</span> | `T` | Read-only. The value at the end of the frame. |
| <span class="prop">`DurationMs`</span> | `int` | Read-only. The length of the frame in milliseconds. |
| <span class="prop">`StartAtMs`</span> | `int` | Read-only. Where the frame starts on the time line, in milliseconds. |
| <span class="prop">`ShapingFunction`</span> | `BaseShapingFunction` | Read-only. The function that maps the frame's progress (0 to 1) to the share of the way from `From` to `To`. `Linear` when none is given. |

| Method | Description |
| --- | --- |
| `SmoothAnimationFrame(T from, T to, int durationMs, int startAtMs = 0, BaseShapingFunction shapingFunction = null)` | Creates the frame. |

### DiscreteAnimationFrame&lt;T&gt;

Sets `Value` when the time line reaches `ApplyAtMs`. The discrete frames of an animation form one track: the value in
effect is the one of the latest frame at or before the time line's position, going forth and back alike. Of frames at
the same time, the one added last wins.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`Value`</span> | `T` | Read-only. The value the frame sets. |
| <span class="prop">`ApplyAtMs`</span> | `int` | Read-only. The point of the time line where it is set, in milliseconds. |

| Method | Description |
| --- | --- |
| `DiscreteAnimationFrame(T value, int applyAtMs)` | Creates the frame. |

### RunBoundaryValues&lt;T&gt;

Values set on the animated properties outside the frames: `StartValue` when the animation first starts, `EndValue`
when it completes. Pass it to the `Animation<T>` constructor.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`StartValue`</span> | `T` | The value set when the animation starts from not started. |
| <span class="prop">`EndValue`</span> | `T` | The value set after the end values of the frames when the animation completes. |

| Method | Description |
| --- | --- |
| `RunBoundaryValues()` | Creates the values, both `default(T)`. |

### BorrowedTorchUI animation methods

| Method | Description |
| --- | --- |
| <span class="method">`AddAnimation(BaseAnimation animation)`</span> | Registers the animation so the UI advances it while it runs. Adding it again while registered, or adding `null`, does nothing. |
| <span class="method">`RemoveAnimation(BaseAnimation animation)`</span> | Stops advancing the animation. It keeps its state; adding it again continues it. |
