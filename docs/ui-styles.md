---
layout: docs
legend: [prop, dp, method, event]
title: "UI: styles, bindings and animation"
description: Style classes, mouse cursors, default settings, dependency properties, view model bindings, items templates and animations.
---

Every element property listed on the element pages is a dependency property: `Foo` is backed by `FooDP`, a
<code><a href="/docs/ui-glossary/types/dependency-property/">DependencyProperty</a>&lt;T&gt;</code> that a style, a binding or an animation sets (see
[dependency properties](#dependency-properties)), and each element class has a static `FooDPActions` that holds what
the class does when the value changes. This page covers what sets those properties: styles, bindings and animations,
plus mouse cursors and the framework-wide defaults. None of the properties of the types on this page are dependency
properties themselves. Screenshots use the theme shown in [the next section](#the-theme-of-these-pages).

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

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
        TextStyle = new LabelStyle { ForegroundColor = Ink }
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
        BackgroundColor = PanelLight,
        ToggleButtonStyle = new ButtonStyle
        {
            NormalColor = GoldDim,
            HoverColor = Gold,
            PressedColor = new Color(128, 98, 54),
            ToggledColor = Gold,
            TextStyle = new LabelStyle { ForegroundColor = Ink }
        }
    };

    TreeView.GeneralStyle = new TreeViewStyle
    {
        // the size and place of the expand icon: the tree view on these
        // pages draws its arrow pictures (FoldedIcon and ExpandedIcon,
        // from its TexturesPath) in this box
        ExpandIconStyle = new ImageStyle
        {
            DesiredWidth = 10,
            DesiredHeight = 10,
            Margin = (4, 0, 6, 0),
            VerticalAlignment = VerticalAlignment.Center,
            HitTest = false
        },
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
        TextStyle = new LabelStyle { ForegroundColor = Text, TextMargin = (8, 5) }
    };
}
```

Set <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a> first: the framework defaults of a style type read <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a> once, the first time that
style type is used (see [default settings](#default-settings)).

## Styles

Every element type `X` that has a style has an `XStyle` class with the same properties as `X`'s dependency properties.
A style is applied at one of two levels: `X.GeneralStyle` for every element of the type, and `element.StyleOverride`
for one element, over its general style. A value set in code wins over both.

<figure class="shot">
  <img src="{{ '/assets/img/ui/styles-override.png' | relative_url }}" width="486" height="74" alt="Three buttons in a row: a gold Keep button, a dark red Delete save button with light text, and a green Own color button">
  <figcaption>The general button style, a style override, and a color set in code.</figcaption>
</figure>

```csharp
// a style for one element, over the general style of its type
var danger = new ButtonStyle
{
    NormalColor = new Color(150, 52, 30),
    HoverColor = new Color(190, 70, 40),
    PressedColor = new Color(110, 38, 22),
    TextStyle = new LabelStyle { ForegroundColor = new Color(255, 236, 214) }
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
style has none assigned, so <code>new <a href="/docs/ui-glossary/types/button-style/">ButtonStyle</a> { NormalColor = Color.Red }</code> changes the color and leaves everything else
to the level below. The "Delete save" button above takes its colors from `danger` and its size from code; anything
`danger` doesn't assign comes from <a class="ref prop" href="/docs/ui-glossary/elements/button/#generalstyle">`Button.GeneralStyle`</a>.

- **General style.** `X.GeneralStyle` (static) lies over the framework defaults of the type: a property it leaves
  unassigned takes the framework default (listed in the [style classes](#style-classes) table), or the property's own
  default when the type has none. It starts as a copy of the framework defaults, so reading <a class="ref prop" href="/docs/ui-glossary/elements/button/#generalstyle">`Button.GeneralStyle`</a> gives
  the defaults and changing one of its properties in place keeps the others. Assigning a new style replaces it as a
  whole; setting it to `null` leaves only the framework defaults.
- **Style override.** `element.StyleOverride` applies to one element. Its unassigned properties fall through to the
  general style. Setting it back to `null` removes its values from the element.
- **Live changes.** Changing a property of a style in use, or replacing a general style, updates every element that
  uses it. Changes are delivered by walking the element tree; an element that is not in the tree at that moment (created
  but not added yet, or removed) catches up when it is attached.
- **Part styles.** Properties such as <a class="ref prop" href="/docs/ui-glossary/types/button-style/#textstyle">`ButtonStyle.TextStyle`</a> or <a class="ref prop" href="/docs/ui-glossary/types/list-box-style/#scrollablecontainerstyle">`ListBoxStyle.ScrollableContainerStyle`</a> hold the
  style of a part inside the control. The part takes it as its own `StyleOverride`, so it lies over the part type's
  general style: <code>TextStyle = new <a href="/docs/ui-glossary/types/label-style/">LabelStyle</a> { ForegroundColor = ... }</code> changes the text color and keeps the
  rest of <a class="ref prop" href="/docs/ui-glossary/elements/label/#generalstyle">`Label.GeneralStyle`</a>.
- **No style class.** <a class="ref" href="/docs/ui-glossary/elements/grid/">`Grid`</a>, <a class="ref" href="/docs/ui-glossary/elements/separator/">`Separator`</a>, <a class="ref" href="/docs/ui-glossary/types/tab-control/">`TabControl`</a> and the parts that only exist inside an element
  (<a class="ref" href="/docs/ui-glossary/elements/list-box-item/">`ListBoxItem`</a>, <a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a>, <a class="ref" href="/docs/ui-glossary/elements/context-menu-item/">`ContextMenuItem`</a>, <a class="ref" href="/docs/ui-glossary/elements/grid-cell/">`GridCell`</a>, <a class="ref" href="/docs/ui-glossary/elements/content-container/">`ContentContainer`</a>, <a class="ref" href="/docs/ui-glossary/elements/default-window-title-bar/">`DefaultWindowTitleBar`</a>) have no
  style. They are set in code; their double click interval, repeat timings and resize area come from
  [`DefaultSettings`](#default-settings) like every element's.

`StyleOverride`, `GeneralStyle`, `MouseCursorsSetOverride` and `GeneralMouseCursorsSet` are members of every styled
element, described on the [base element](/docs/ui-base-element/#styles-and-cursors) page.

### Value priority

Each dependency property keeps up to three values, one per source, and uses the one with the highest priority:
`ManualAssign` > `StyleOverride` > `GeneralStyle`. With none of them set it reads its default. Bindings and animations
write `ManualAssign` values like code does. To give a property set in code back to the styles, clear its manual value:

```csharp
button.NormalColorDP.ClearValue(ValueSources.ManualAssign); // the style's color again
```

#### `ValueSources`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/value-sources/#manualassign">`ManualAssign`</a> | A value set in code (`element.Foo = ...` or `FooDP.SetValue`), by a binding or by an animation. Highest priority. |
| <a class="ref" href="/docs/ui-glossary/types/value-sources/#styleoverride">`StyleOverride`</a> | A value from the element's <a class="ref" href="/docs/ui-glossary/types/value-sources/#styleoverride">`StyleOverride`</a>. |
| <a class="ref" href="/docs/ui-glossary/types/value-sources/#generalstyle">`GeneralStyle`</a> | A value from the general style of the type, or from the framework defaults under it. Lowest priority. |
| <a class="ref" href="/docs/ui-glossary/types/value-sources/#none">`None`</a> | No source has a value: the property reads its default. Returned by `ValueSource`; setting or clearing with it does nothing. |

### BaseStyle

The abstract base of every style class. It has one property for each dependency property of
[`BaseElement`](/docs/ui-base-element/) (<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#desiredwidth">`DesiredWidth`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#desiredheight">`DesiredHeight`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#minwidth">`MinWidth`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#minheight">`MinHeight`</a>,
<a class="ref prop" href="/docs/ui-glossary/types/base-style/#maxwidth">`MaxWidth`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#maxheight">`MaxHeight`</a>, <a class="ref" href="/docs/ui-glossary/types/horizontal-alignment/">`HorizontalAlignment`</a>, <a class="ref" href="/docs/ui-glossary/types/vertical-alignment/">`VerticalAlignment`</a>, <a class="ref" href="/docs/ui-glossary/types/visibility/">`Visibility`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#disabled">`Disabled`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#backgroundcolor">`BackgroundColor`</a>,
<a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#texturespath">`TexturesPath`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#transparency">`Transparency`</a>, <a class="ref" href="/docs/ui-glossary/types/inherit-state/">`InheritState`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#gridrow">`GridRow`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#gridcolumn">`GridColumn`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#gridrowspan">`GridRowSpan`</a>,
<a class="ref prop" href="/docs/ui-glossary/types/base-style/#gridcolumnspan">`GridColumnSpan`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#zindex">`ZIndex`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#repeatclicks">`RepeatClicks`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#timebeforerepeatstartsms">`TimeBeforeRepeatStartsMs`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#timebetweenrepeatsms">`TimeBetweenRepeatsMs`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#doubleclickintervalms">`DoubleClickIntervalMs`</a>,
<a class="ref prop" href="/docs/ui-glossary/types/base-style/#cropoutsideofparentborder">`CropOutsideOfParentBorder`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#isresizable">`IsResizable`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#resizewithelementcontour">`ResizeWithElementContour`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#resizecontourcolor">`ResizeContourColor`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#resizeareahalfwidth">`ResizeAreaHalfWidth`</a>,
<a class="ref" href="/docs/ui-glossary/types/drag-type/">`DragType`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#customeffect">`CustomEffect`</a>), with the same names and types, so every style class has them too. Setting a property
assigns it, even to the value it already has. The framework defaults of every style type include `HitTest = true` and
`CropOutsideOfParentBorder = true`.

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/base-style/#isset">`IsSet(string propertyName)`</a> | Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`. |
| <a class="ref method" href="/docs/ui-glossary/types/base-style/#unset">`Unset(string propertyName)`</a> | Takes the property back out of the style: the style stops applying it, it reads its type's default again, and the elements using the style update. |
| <a class="ref method" href="/docs/ui-glossary/types/base-style/#clone">`Clone()`</a> | Returns a copy (as `object`) with the same properties assigned. Part styles in it are copied too. |

### Style classes

Each style class has a public parameterless constructor that creates a style with nothing assigned, and the
properties of its element's dependency properties (see the element's section) except the ones in the third column.
None has properties beyond its element's. The last column lists the framework defaults the class assigns on top of the
`BaseStyle` ones; they are what the general style starts with.

| Style class | Element | Part styles, and element properties left out | Framework defaults |
| --- | --- | --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a> | [`Border`](/docs/ui-layout/#border) | Leaves out `Content`. | None beyond the base ones. |
| <a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a> | [`Button`](/docs/ui-controls/#button) | Part styles `TextStyle` (<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a>) and `BackgroundStyle` (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>). Leaves out `Content`. | None beyond the base ones. |
| <a class="ref" href="/docs/ui-glossary/types/check-box-style/">`CheckBoxStyle`</a> | [`CheckBox`](/docs/ui-controls/#checkbox) | Part styles `TextStyle` (<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a>) and <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>). Leaves out `Content`. | None beyond the base ones. |
| <a class="ref" href="/docs/ui-glossary/types/color-picker-style/">`ColorPickerStyle`</a> | [`ColorPicker`](/docs/ui-controls/#colorpicker) | Leaves out `Brightness` and `SelectedColor`, so it has only the `BaseStyle` properties. | <a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a> white. |
| <a class="ref" href="/docs/ui-glossary/types/combo-box-style/">`ComboBoxStyle`</a> | [`ComboBox`](/docs/ui-lists/#combobox) | Part styles `SelectionStyle` (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>), `ToggleButtonStyle` (<a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a>) and <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a>). | Aligned left and top, <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>. |
| <a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a> | [`ContextMenu`](/docs/ui-lists/#contextmenu) | Part styles <a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a>, <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a>, `CheckIconStyle` and `ExpandIconStyle` (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>). Leaves out `ItemsSource`. | Aligned left and top, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a> off, `Placement` `BottomRight`. A border 1 unit thick in the context menu colors of <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a>; a transparent list without dual colors whose hover and selected rows use `DefaultContextMenuHighlightColor`; an 8 by 8 check icon and a 6 by 8 expand icon in `DefaultContextMenuIconColor`. |
| <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> | [`Image`](/docs/ui-images/#image) | None. | <a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a> white. |
| <a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> | [`Label`](/docs/ui-text/#label) | None. | `Text` empty, `FontSize` `DefaultFontSize`, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a> `DefaultTextColor`, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a> off, <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromparent">`InheritState.FromParent`</a>. |
| <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> | [`ListBox`](/docs/ui-lists/#listbox) | Part style <a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a>. Leaves out `SelectedItem`, `SelectedIndex` and `ItemsSource`. | <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>. |
| <a class="ref" href="/docs/ui-glossary/types/progress-bar-style/">`ProgressBarStyle`</a> | [`ProgressBar`](/docs/ui-controls/#progressbar) | None. | None beyond the base ones. |
| <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a> | [`RichTextBox`](/docs/ui-text/#richtextbox) | Part styles `ScrollBarsStyle` (<a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>) and `BackgroundStyle` (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>). | `Text` empty, <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>, and `FontSize`, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a>, `TextCursorThickness`, `TextCursorColor`, `TextSelectionColor` from <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a>. |
| <a class="ref" href="/docs/ui-glossary/types/root-element-style/">`RootElementStyle`</a> | [`RootElement`](/docs/ui-base-element/#the-root-element) | Only the `BaseStyle` properties. | None beyond the base ones. |
| <a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a> | [`ScrollableContainer`](/docs/ui-layout/#scrollablecontainer) | Part style `ScrollBarsStyle` (<a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>), used by both scroll bars (the vertical one with its two line colors swapped). | <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>. |
| <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a> | [`Slider`](/docs/ui-controls/#slider) | None. | <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>, `ThumbScale` (1, 1). |
| <a class="ref" href="/docs/ui-glossary/types/stack-panel-style/">`StackPanelStyle`</a> | [`StackPanel`](/docs/ui-layout/#stackpanel) | None. | Aligned left and top, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a> off, <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>. |
| <a class="ref" href="/docs/ui-glossary/types/stencil-style/">`StencilStyle`</a> | [`Stencil`](/docs/ui-images/#stencil) | Leaves out `SourceTexture` and `StencilTexture`. | None beyond the base ones. |
| <a class="ref" href="/docs/ui-glossary/types/tool-tip-style/">`ToolTipStyle`</a> | [`ToolTip`](/docs/ui-controls/#tooltip) | Part style `TextStyle` (<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a>). Leaves out `Content`. | Aligned left and top, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a> off, `TimeBeforeShowMs` `DefaultTimeBeforeShowToolTipMs`. |
| <a class="ref" href="/docs/ui-glossary/types/tree-view-style/">`TreeViewStyle`</a> | [`TreeView`](/docs/ui-lists/#treeview) | Part styles <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> and `ExpandIconStyle` (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>). Leaves out `SelectedItem` and `ItemsSource`. | An `ExpandIconStyle` of an 8 by 8 block, centred, `FoldedIconColor` (150, 150, 160), `ExpandedIconColor` (90, 90, 100). |
| <a class="ref" href="/docs/ui-glossary/types/view-port-style/">`ViewPortStyle`</a> | [`ViewPort`](/docs/ui-images/#viewport) | None. | <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a> off, `MinDepth` and `MaxDepth` from <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a>. |
| <a class="ref" href="/docs/ui-glossary/types/window-style/">`WindowStyle`</a> | [`Window`](/docs/ui-layout/#window) | Part style <a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a>. Leaves out `TitleBar` and `Content`. | A border `DefaultWindowBorderThickness` thick, filled with `DefaultWindowBackgroundColor`, in `DefaultWindowBorderColor`. |

<a class="ref" href="/docs/ui-glossary/types/default-window-title-bar-style/">`DefaultWindowTitleBarStyle`</a> is an empty class that does not derive from `BaseStyle`; nothing uses it, and
<a class="ref" href="/docs/ui-glossary/elements/default-window-title-bar/">`DefaultWindowTitleBar`</a> has no style.

### GenericStyle&lt;T&gt;

The static holder of the general style of one style type, where `T` is the style class. <a class="ref prop" href="/docs/ui-glossary/elements/button/#generalstyle">`Button.GeneralStyle`</a> reads
and writes <code><a href="/docs/ui-glossary/types/generic-style/">GenericStyle</a>&lt;<a href="/docs/ui-glossary/types/button-style/">ButtonStyle</a>&gt;.GeneralStyle</code>. It also keeps the framework defaults of the type, built the first
time the type is used from the class's defaults (internal, not reachable from your code).

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/generic-style/#generalstyle">`GeneralStyle`</a> | `T` | Static. The style every element of the type takes, over the framework defaults. Starts as a copy of the defaults; `null` leaves only the defaults. |

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/types/generic-style/#ongeneralstylechanged">`OnGeneralStyleChanged`</a> | `(T prevStyle)` | Static. <a class="ref prop" href="/docs/ui-glossary/types/generic-style/#generalstyle">`GeneralStyle`</a> is replaced by another style; the handler gets the previous one. Not raised when a property of the style changes. |

## Mouse cursors

Mouse cursors are chosen in the same layers as styles. An element with a style class shows, in this order of
priority:

1. its own set, `element.MouseCursorsSetOverride`;
2. the set given by hand (`MouseCursorsSetOverride`) to the control it is a part of;
3. the general set of its type, `X.GeneralMouseCursorsSet` (`null` at start);
4. <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`BaseElement.DefaultMouseCursorsSet`</a>, which <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#setdefaultmousecursorsset">`BorrowedTorchUI.SetDefaultMouseCursorsSet`</a> also sets.

So a set given to a control reaches the controls inside it (the scroll bars of a list, the list of a tree view or
combo box, the title bar of a window) unless they have a set of their own. Without one on the control, those parts
keep their own type's `GeneralMouseCursorsSet` (a list's scroll bars use <a class="ref prop" href="/docs/ui-glossary/elements/slider/#generalmousecursorsset">`Slider.GeneralMouseCursorsSet`</a>). A part
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

The Example columns below show the cursors of the `UITextures/MouseCursors` folder that comes with BorrowedTorch.UI
(the set the snippet above loads from), the hover cursor first and the pressed one second where a set has both.
They are one possible look: any picture can be a cursor (`MouseCursor.FromTexture2D`).

### MouseCursorsSet

The cursors an element shows. It is disposable: disposing it disposes its <a class="ref" href="/docs/ui-glossary/types/drag-and-drop-cursors/">`DragAndDropCursors`</a>, <a class="ref" href="/docs/ui-glossary/types/resize-cursors/">`ResizeCursors`</a> and
<a class="ref" href="/docs/ui-glossary/types/rich-text-cursors/">`RichTextCursors`</a>, and a disposed set ignores new values.

| Property | Type | Description | Example |
| --- | --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/mouse-cursors-set/#hovercursor">`HoverCursor`</a> | `MouseCursor` | The cursor while the mouse is over the element. | <img class="cursor" src="{{ '/assets/img/ui/cursors/ArrowHover.png' | relative_url }}" width="32" height="32" alt="arrow cursor" title="Arrow cursor"> |
| <a class="ref prop" href="/docs/ui-glossary/types/mouse-cursors-set/#pressedcursor">`PressedCursor`</a> | `MouseCursor` | The cursor while the left button is held on the element. | <img class="cursor" src="{{ '/assets/img/ui/cursors/ArrowPressed.png' | relative_url }}" width="32" height="32" alt="pressed arrow cursor" title="Pressed arrow cursor"> |
| <a class="ref prop" href="/docs/ui-glossary/types/mouse-cursors-set/#draganddropcursors">`DragAndDropCursors`</a> | <a class="ref" href="/docs/ui-glossary/types/drag-and-drop-cursors/">`DragAndDropCursors`</a> | The cursors of a draggable element and of drop targets. |  |
| <a class="ref prop" href="/docs/ui-glossary/types/mouse-cursors-set/#resizecursors">`ResizeCursors`</a> | <a class="ref" href="/docs/ui-glossary/types/resize-cursors/">`ResizeCursors`</a> | The cursors on the edges and corners of a resizable element. |  |
| <a class="ref prop" href="/docs/ui-glossary/types/mouse-cursors-set/#richtextcursors">`RichTextCursors`</a> | <a class="ref" href="/docs/ui-glossary/types/rich-text-cursors/">`RichTextCursors`</a> | The cursors over the text of a rich text box. |  |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/mouse-cursors-set/#mousecursorsset">`MouseCursorsSet()`</a> | Creates an empty set. |
| <a class="ref method" href="/docs/ui-glossary/types/mouse-cursors-set/#clone">`Clone()`</a> | Returns a copy (as `object`), with copies of the three nested sets; the `MouseCursor` objects are shared. Returns `null` for a disposed set. |

### DragAndDropCursors

The cursors of [drag and drop](/docs/ui-images/#drag-and-drop). Disposable like <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a>.

| Property | Type | Description | Example |
| --- | --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/drag-and-drop-cursors/#draghovercursor">`DragHoverCursor`</a> | `MouseCursor` | Shown instead of `HoverCursor` over an element that can be dragged. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Drag/Hover.png' | relative_url }}" width="32" height="32" alt="open hand cursor" title="Open hand cursor"> |
| <a class="ref prop" href="/docs/ui-glossary/types/drag-and-drop-cursors/#dragpressedcursor">`DragPressedCursor`</a> | `MouseCursor` | Shown instead of `PressedCursor` while the left button is held on an element that can be dragged. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Drag/Grab.png' | relative_url }}" width="32" height="32" alt="grabbing hand cursor" title="Grabbing hand cursor"> |
| <a class="ref prop" href="/docs/ui-glossary/types/drag-and-drop-cursors/#dropallowedcursor">`DropAllowedCursor`</a> | `MouseCursor` | Shown over a drop target that accepts what is dragged. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Drag/DropAllowed.png' | relative_url }}" width="32" height="32" alt="drop allowed cursor" title="Drop allowed cursor"> |
| <a class="ref prop" href="/docs/ui-glossary/types/drag-and-drop-cursors/#dropdeniedcursor">`DropDeniedCursor`</a> | `MouseCursor` | Shown over a drop target that refuses what is dragged. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Drag/DropDenied.png' | relative_url }}" width="32" height="32" alt="drop denied cursor" title="Drop denied cursor"> |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/drag-and-drop-cursors/#draganddropcursors">`DragAndDropCursors()`</a> | Creates an empty set. |
| <a class="ref method" href="/docs/ui-glossary/types/drag-and-drop-cursors/#clone">`Clone()`</a> | Returns a copy (as `object`), or `null` when disposed. |

### ResizeCursors

The cursors of the eight grips around a [resizable](/docs/ui-base-element/#resizing) element. Each grip is a
<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a>, so it can have a hover and a pressed cursor. A sealed, disposable class.

| Property | Type | Description | Example |
| --- | --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/resize-cursors/#lefttop">`LeftTop`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | The top left corner. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Hover/LeftTop.png' | relative_url }}" width="38" height="38" alt="top left resize cursor, hover" title="Hover"> <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Pressed/LeftTop.png' | relative_url }}" width="38" height="38" alt="top left resize cursor, pressed" title="Pressed"> |
| <a class="ref prop" href="/docs/ui-glossary/types/resize-cursors/#righttop">`RightTop`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | The top right corner. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Hover/RightTop.png' | relative_url }}" width="38" height="38" alt="top right resize cursor, hover" title="Hover"> <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Pressed/RightTop.png' | relative_url }}" width="38" height="38" alt="top right resize cursor, pressed" title="Pressed"> |
| <a class="ref prop" href="/docs/ui-glossary/types/resize-cursors/#leftbottom">`LeftBottom`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | The bottom left corner. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Hover/LeftBottom.png' | relative_url }}" width="38" height="38" alt="bottom left resize cursor, hover" title="Hover"> <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Pressed/LeftBottom.png' | relative_url }}" width="38" height="38" alt="bottom left resize cursor, pressed" title="Pressed"> |
| <a class="ref prop" href="/docs/ui-glossary/types/resize-cursors/#rightbottom">`RightBottom`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | The bottom right corner. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Hover/RightBottom.png' | relative_url }}" width="38" height="38" alt="bottom right resize cursor, hover" title="Hover"> <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Pressed/RightBottom.png' | relative_url }}" width="38" height="38" alt="bottom right resize cursor, pressed" title="Pressed"> |
| <a class="ref prop" href="/docs/ui-glossary/types/resize-cursors/#left">`Left`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | The left edge. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Hover/Left.png' | relative_url }}" width="38" height="38" alt="left resize cursor, hover" title="Hover"> <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Pressed/Left.png' | relative_url }}" width="38" height="38" alt="left resize cursor, pressed" title="Pressed"> |
| <a class="ref prop" href="/docs/ui-glossary/types/resize-cursors/#right">`Right`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | The right edge. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Hover/Right.png' | relative_url }}" width="38" height="38" alt="right resize cursor, hover" title="Hover"> <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Pressed/Right.png' | relative_url }}" width="38" height="38" alt="right resize cursor, pressed" title="Pressed"> |
| <a class="ref prop" href="/docs/ui-glossary/types/resize-cursors/#top">`Top`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | The top edge. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Hover/Up.png' | relative_url }}" width="38" height="38" alt="top resize cursor, hover" title="Hover"> <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Pressed/Up.png' | relative_url }}" width="38" height="38" alt="top resize cursor, pressed" title="Pressed"> |
| <a class="ref prop" href="/docs/ui-glossary/types/resize-cursors/#bottom">`Bottom`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | The bottom edge. | <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Hover/Down.png' | relative_url }}" width="38" height="38" alt="bottom resize cursor, hover" title="Hover"> <img class="cursor" src="{{ '/assets/img/ui/cursors/Resize/Pressed/Down.png' | relative_url }}" width="38" height="38" alt="bottom resize cursor, pressed" title="Pressed"> |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/resize-cursors/#resizecursors">`ResizeCursors()`</a> | Creates an empty set. |
| <a class="ref method" href="/docs/ui-glossary/types/resize-cursors/#clone">`Clone()`</a> | Returns a copy (as `object`) that shares the eight sets, or `null` when disposed. |

### RichTextCursors

The cursors over the text of a [`RichTextBox`](/docs/ui-text/#richtextbox). They replace the hover and pressed cursors
of the box's set. Disposable like <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a>.

| Property | Type | Description | Example |
| --- | --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/rich-text-cursors/#writecursor">`WriteCursor`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | Its hover and pressed cursors are shown over the text of an editable (`ReadWrite`) box. | <img class="cursor" src="{{ '/assets/img/ui/cursors/RichText/TextHover.png' | relative_url }}" width="32" height="32" alt="text cursor, hover" title="Hover"> <img class="cursor" src="{{ '/assets/img/ui/cursors/RichText/TextPressed.png' | relative_url }}" width="32" height="32" alt="text cursor, pressed" title="Pressed"> |
| <a class="ref prop" href="/docs/ui-glossary/types/rich-text-cursors/#linkcursor">`LinkCursor`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | Its hover and pressed cursors are shown over a link in a box that is not editable. | <img class="cursor" src="{{ '/assets/img/ui/cursors/RichText/LinkHover.png' | relative_url }}" width="32" height="32" alt="link cursor, hover" title="Hover"> <img class="cursor" src="{{ '/assets/img/ui/cursors/RichText/LinkPressed.png' | relative_url }}" width="32" height="32" alt="link cursor, pressed" title="Pressed"> |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/rich-text-cursors/#richtextcursors">`RichTextCursors()`</a> | Creates an empty set. |
| <a class="ref method" href="/docs/ui-glossary/types/rich-text-cursors/#clone">`Clone()`</a> | Returns a copy (as `object`) that shares the two sets, or `null` when disposed. |

### GenericMouseCursorsData&lt;T&gt;

The static holder of the general mouse cursors set of one element type, keyed by its style class `T`.
<a class="ref prop" href="/docs/ui-glossary/elements/button/#generalmousecursorsset">`Button.GeneralMouseCursorsSet`</a> reads and writes <code><a href="/docs/ui-glossary/types/generic-mouse-cursors-data/">GenericMouseCursorsData</a>&lt;<a href="/docs/ui-glossary/types/button-style/">ButtonStyle</a>&gt;.GeneralMouseCursorsSet</code>.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/generic-mouse-cursors-data/#generalmousecursorsset">`GeneralMouseCursorsSet`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | Static. The set of every element of the type that has none of its own. `null` at start, which means the default set. |

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/types/generic-mouse-cursors-data/#ongeneralmousecursorssetchanged">`OnGeneralMouseCursorsSetChanged`</a> | <code>(<a href="/docs/ui-glossary/types/mouse-cursors-set/">MouseCursorsSet</a> prevMouseCursorsSet)</code> | Static. <a class="ref prop" href="/docs/ui-glossary/types/generic-mouse-cursors-data/#generalmousecursorsset">`GeneralMouseCursorsSet`</a> is replaced; the handler gets the previous set. Not raised when a property of the set changes. |

## Texture sets

An element whose <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> names a content folder draws pictures from that folder instead of its solid colors.
It loads each picture by a fixed name: the asset name the content pipeline gives it, its file name without the
extension. So a button with <code>TexturesPath = "UITextures/<a href="/docs/ui-glossary/elements/button/">Button</a>/"</code> loads <code>UITextures/<a href="/docs/ui-glossary/elements/button/">Button</a>/Normal</code> (compiled from
`Normal.png`) and the others below. A name the element loads has to be in the folder: when it is missing, the
content manager throws a `ContentLoadException`. The pictures are drawn in their own colors.

The examples are one possible look. Any pictures with these names work, at any size: each is stretched or tiled
over its part as the tables say.

### Button textures

<a class="ref" href="/docs/ui-glossary/elements/button/">`Button`</a>, and the buttons inside other elements: the toggle button of a <a class="ref" href="/docs/ui-glossary/elements/combo-box/">`ComboBox`</a> (its `ToggleButtonStyle`) and the
`CloseButton` of a window's <a class="ref" href="/docs/ui-glossary/elements/default-window-title-bar/">`DefaultWindowTitleBar`</a>. Each texture is stretched over the button (its `BackgroundStyle`
can give another `Fill`). A texture is loaded the first time the button shows its state, so a button that is never a
`Toggle` needs no `Toggled`, as the close button below.

| Texture | Shown | Button | Combo box toggle | Close button |
| --- | --- | --- | --- | --- |
| `Normal` | The button at rest. | <img class="texture" src="{{ '/assets/img/ui/textures/button/Normal.png' | relative_url }}" width="96" height="32" alt="The Normal texture of the example button"> | <img class="texture" src="{{ '/assets/img/ui/textures/combo-box-toggle-button/Normal.png' | relative_url }}" width="32" height="32" alt="The Normal texture of the example combo box toggle button"> | <img class="texture" src="{{ '/assets/img/ui/textures/close-button/Normal.png' | relative_url }}" width="32" height="32" alt="The Normal texture of the example close button"> |
| `Hover` | The mouse is over the button. | <img class="texture" src="{{ '/assets/img/ui/textures/button/Hover.png' | relative_url }}" width="96" height="32" alt="The Hover texture of the example button"> | <img class="texture" src="{{ '/assets/img/ui/textures/combo-box-toggle-button/Hover.png' | relative_url }}" width="32" height="32" alt="The Hover texture of the example combo box toggle button"> | <img class="texture" src="{{ '/assets/img/ui/textures/close-button/Hover.png' | relative_url }}" width="32" height="32" alt="The Hover texture of the example close button"> |
| `Pressed` | The left button is held down on it. | <img class="texture" src="{{ '/assets/img/ui/textures/button/Pressed.png' | relative_url }}" width="96" height="32" alt="The Pressed texture of the example button"> | <img class="texture" src="{{ '/assets/img/ui/textures/combo-box-toggle-button/Pressed.png' | relative_url }}" width="32" height="32" alt="The Pressed texture of the example combo box toggle button"> | <img class="texture" src="{{ '/assets/img/ui/textures/close-button/Pressed.png' | relative_url }}" width="32" height="32" alt="The Pressed texture of the example close button"> |
| `Toggled` | A `Toggle` button that is on (`ToggledOn`), at rest or under the mouse. `Pressed` still shows while it is held down. | <img class="texture" src="{{ '/assets/img/ui/textures/button/Toggled.png' | relative_url }}" width="96" height="32" alt="The Toggled texture of the example button"> | <img class="texture" src="{{ '/assets/img/ui/textures/combo-box-toggle-button/Toggled.png' | relative_url }}" width="32" height="32" alt="The Toggled texture of the example combo box toggle button"> | Not needed: it never toggles. |

### CheckBox textures

Stretched over the box's square. A radio button (`Type` `RadioButton`) takes the same names, from a folder of its own
for another look. Each one is loaded the first time the box shows it.

| Texture | Shown | Check box | Radio button |
| --- | --- | --- | --- |
| `Checked` | `Checked` is true. | <img class="texture" src="{{ '/assets/img/ui/textures/check-box/Checked.png' | relative_url }}" width="32" height="32" alt="The Checked texture of the example check box"> | <img class="texture" src="{{ '/assets/img/ui/textures/radio-button/Checked.png' | relative_url }}" width="32" height="32" alt="The Checked texture of the example radio button"> |
| `Unchecked` | `Checked` is false. | <img class="texture" src="{{ '/assets/img/ui/textures/check-box/Unchecked.png' | relative_url }}" width="32" height="32" alt="The Unchecked texture of the example check box"> | <img class="texture" src="{{ '/assets/img/ui/textures/radio-button/Unchecked.png' | relative_url }}" width="32" height="32" alt="The Unchecked texture of the example radio button"> |

### Border textures

<a class="ref" href="/docs/ui-glossary/elements/border/">`Border`</a>, and the frame of a <a class="ref" href="/docs/ui-glossary/elements/window/">`Window`</a>, a <a class="ref" href="/docs/ui-glossary/elements/context-menu/">`ContextMenu`</a> and a <a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a> (their <a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a>). All eight are
loaded together, each one stretched over its part.

| Texture | Part | Example |
| --- | --- | --- |
| `LeftTop` | The top left corner. | <img class="texture" src="{{ '/assets/img/ui/textures/border/LeftTop.png' | relative_url }}" width="48" height="48" alt="The LeftTop texture of the example border"> |
| `RightTop` | The top right corner. | <img class="texture" src="{{ '/assets/img/ui/textures/border/RightTop.png' | relative_url }}" width="48" height="48" alt="The RightTop texture of the example border"> |
| `LeftBottom` | The bottom left corner. | <img class="texture" src="{{ '/assets/img/ui/textures/border/LeftBottom.png' | relative_url }}" width="48" height="48" alt="The LeftBottom texture of the example border"> |
| `RightBottom` | The bottom right corner. | <img class="texture" src="{{ '/assets/img/ui/textures/border/RightBottom.png' | relative_url }}" width="48" height="48" alt="The RightBottom texture of the example border"> |
| `Left` | The left side, between the left corners. | <img class="texture" src="{{ '/assets/img/ui/textures/border/Left.png' | relative_url }}" width="48" height="48" alt="The Left texture of the example border"> |
| `Right` | The right side, between the right corners. | <img class="texture" src="{{ '/assets/img/ui/textures/border/Right.png' | relative_url }}" width="48" height="48" alt="The Right texture of the example border"> |
| `Top` | The top side, between the top corners. | <img class="texture" src="{{ '/assets/img/ui/textures/border/Top.png' | relative_url }}" width="48" height="48" alt="The Top texture of the example border"> |
| `Bottom` | The bottom side, between the bottom corners. | <img class="texture" src="{{ '/assets/img/ui/textures/border/Bottom.png' | relative_url }}" width="48" height="48" alt="The Bottom texture of the example border"> |

### ProgressBar textures

Both are loaded together and tiled.

| Texture | Part | Example |
| --- | --- | --- |
| `Background` | The track, tiled over the whole bar. | <img class="texture" src="{{ '/assets/img/ui/textures/progress-bar/Background.png' | relative_url }}" width="48" height="48" alt="The Background texture of the example progress bar"> |
| `Bar` | The filled part, tiled over it. | <img class="texture" src="{{ '/assets/img/ui/textures/progress-bar/Bar.png' | relative_url }}" width="48" height="48" alt="The Bar texture of the example progress bar"> |

### Slider textures

<a class="ref" href="/docs/ui-glossary/elements/slider/">`Slider`</a>, and the scroll bars of a <a class="ref" href="/docs/ui-glossary/elements/scrollable-container/">`ScrollableContainer`</a> and a <a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a> (their `ScrollBarsStyle`) and of a
<a class="ref" href="/docs/ui-glossary/elements/list-box/">`ListBox`</a> (its <a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a>). A slider loads the seven textures of its <a class="ref" href="/docs/ui-glossary/types/orientation/">`Orientation`</a> and `Type`: the caps
or the buttons at its ends, the two halves of the track and the three pieces of the thumb. A vertical slider starts
at the bottom. `ScrollBarNoButtons` loads the button textures too, though it doesn't show them. The track halves and
the thumb's middle are tiled along the slider, the rest is stretched.

| Part | Horizontal | Example | Vertical | Example |
| --- | --- | --- | --- | --- |
| Start cap (<a class="ref" href="/docs/ui-glossary/elements/slider/">`Slider`</a>, `SliderWithCaps`) | `LeftEnd` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/LeftEnd.png' | relative_url }}" width="16" height="32" alt="The LeftEnd texture of the example slider"> | `BottomEnd` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/BottomEnd.png' | relative_url }}" width="32" height="16" alt="The BottomEnd texture of the example slider"> |
| End cap (<a class="ref" href="/docs/ui-glossary/elements/slider/">`Slider`</a>, `SliderWithCaps`) | `RightEnd` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/RightEnd.png' | relative_url }}" width="16" height="32" alt="The RightEnd texture of the example slider"> | `TopEnd` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/TopEnd.png' | relative_url }}" width="32" height="16" alt="The TopEnd texture of the example slider"> |
| Start button (`ScrollBar`, `ScrollBarNoButtons`) | `LeftButton` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/LeftButton.png' | relative_url }}" width="32" height="32" alt="The LeftButton texture of the example slider"> | `DownButton` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/DownButton.png' | relative_url }}" width="32" height="32" alt="The DownButton texture of the example slider"> |
| End button (`ScrollBar`, `ScrollBarNoButtons`) | `RightButton` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/RightButton.png' | relative_url }}" width="32" height="32" alt="The RightButton texture of the example slider"> | `UpButton` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/UpButton.png' | relative_url }}" width="32" height="32" alt="The UpButton texture of the example slider"> |
| Track before the thumb (tiled) | `HorizontalDecrease` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/HorizontalDecrease.png' | relative_url }}" width="32" height="32" alt="The HorizontalDecrease texture of the example slider"> | `VerticalDecrease` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/VerticalDecrease.png' | relative_url }}" width="32" height="32" alt="The VerticalDecrease texture of the example slider"> |
| Track after the thumb (tiled) | `HorizontalIncrease` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/HorizontalIncrease.png' | relative_url }}" width="32" height="32" alt="The HorizontalIncrease texture of the example slider"> | `VerticalIncrease` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/VerticalIncrease.png' | relative_url }}" width="32" height="32" alt="The VerticalIncrease texture of the example slider"> |
| Thumb's start | `ThumbLeft` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/ThumbLeft.png' | relative_url }}" width="8" height="32" alt="The ThumbLeft texture of the example slider"> | `ThumbBottom` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/ThumbBottom.png' | relative_url }}" width="32" height="8" alt="The ThumbBottom texture of the example slider"> |
| Thumb's middle (tiled) | `ThumbHorizontal` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/ThumbHorizontal.png' | relative_url }}" width="8" height="32" alt="The ThumbHorizontal texture of the example slider"> | `ThumbVertical` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/ThumbVertical.png' | relative_url }}" width="32" height="8" alt="The ThumbVertical texture of the example slider"> |
| Thumb's end | `ThumbRight` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/ThumbRight.png' | relative_url }}" width="8" height="32" alt="The ThumbRight texture of the example slider"> | `ThumbTop` | <img class="texture" src="{{ '/assets/img/ui/textures/slider/ThumbTop.png' | relative_url }}" width="32" height="8" alt="The ThumbTop texture of the example slider"> |

### TreeView textures

The expand icon before an item with leaves, at the size of `ExpandIconStyle`. Both are loaded when an item shows its
icon. The example is the arrow pair these pages use.

| Texture | Shown | Example |
| --- | --- | --- |
| `FoldedIcon` | The item's branch is collapsed. | <img class="texture" src="{{ '/assets/img/ui/textures/tree-view/FoldedIcon.png' | relative_url }}" width="20" height="20" alt="The FoldedIcon texture of the example tree view"> |
| `ExpandedIcon` | The item's branch is expanded. | <img class="texture" src="{{ '/assets/img/ui/textures/tree-view/ExpandedIcon.png' | relative_url }}" width="20" height="20" alt="The ExpandedIcon texture of the example tree view"> |

## Default settings

<a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a> (namespace `BorrowedTorch.UI.Settings`) is a static class of public fields that hold framework-wide
defaults. Set them at start, before you create elements. Most are read when the framework defaults of a style type are
built, which happens once, the first time that style type is used (normally when the first element of the type is
created, or when you touch `X.GeneralStyle`); changing them later doesn't reach that type. The ones marked "on use" are
read each time they are needed.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `DefaultFontSize` | `int` | `14` | The `FontSize` default of <a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> and <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>. |
| `DefaultTextColor` | `Color` | `Color.Black` | The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a> default of <a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> and <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>. |
| `DefaultTextCursorThickness` | `int` | `1` | The `TextCursorThickness` default of <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>, in units. |
| `DefaultTextCursorColor` | `Color` | `Color.Black` | The `TextCursorColor` default of <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>. |
| `DefaultTextSelectionColor` | `Color` | `Color.LightBlue` | The `TextSelectionColor` default of <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>. |
| `DefaultTextCursorBlinkTimeMs` | `int` | `500` | How long the text cursor stays on and off, in milliseconds. Read when a text cursor starts blinking. |
| `DefaultResizeAreaHalfWidth` | `int` | `3` | On use. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#resizeareahalfwidth">`ResizeAreaHalfWidth`</a> default of every element: half the width of the grips of a resizable element, in units. |
| `DefaultResizeContourHalfWidth` | `int` | `1` | On use. Half the width of the contour drawn while an element is resized, in units. |
| `DefaultResizeContourColor` | `Color` | `new(50, 50, 50, 190)` | On use. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#resizecontourcolor">`ResizeContourColor`</a> default of every element. |
| `DefaultWindowTitleThickness` | `int` | `30` | The height of a window's default title bar (its close button is 4 units smaller). Read when a window is created, and for the close button when the title bar is measured. |
| `DefaultWindowBorderThickness` | `int` | `2` | The border thickness of <a class="ref" href="/docs/ui-glossary/types/window-style/">`WindowStyle`</a>'s default border. |
| `DefaultWindowBackgroundColor` | `Color` | `Color.Wheat` | The background color of <a class="ref" href="/docs/ui-glossary/types/window-style/">`WindowStyle`</a>'s default border. |
| `DefaultWindowTitleBarColor` | `Color` | `Color.LightBlue` | The background color of a window's default title bar, read when the title bar is created. |
| `DefaultWindowBorderColor` | `Color` | `new(80, 80, 80, 255)` | The border color of <a class="ref" href="/docs/ui-glossary/types/window-style/">`WindowStyle`</a>'s default border. |
| `DefaultTimeBeforeShowToolTipMs` | `int` | `500` | The `TimeBeforeShowMs` default of <a class="ref" href="/docs/ui-glossary/types/tool-tip-style/">`ToolTipStyle`</a>. |
| `DefaultContextMenuBackgroundColor` | `Color` | `Color.White` | The background color of <a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a>'s default border. |
| `DefaultContextMenuBorderColor` | `Color` | `new(80, 80, 80, 255)` | The border color of <a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a>'s default border. |
| `DefaultContextMenuHighlightColor` | `Color` | `new(200, 220, 240, 255)` | The color of the hovered and selected rows of <a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a>'s default list style. |
| `DefaultContextMenuIconColor` | `Color` | `new(80, 80, 80, 255)` | The color of the check and expand icons of <a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a>. |
| `DefaultDoubleClickIntervalMs` | `int` | `300` | On use. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalms">`DoubleClickIntervalMs`</a> default of every element. |
| `DefaultTimeBeforeRepeatStartsMs` | `int` | `1000` | On use. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebeforerepeatstartsms">`TimeBeforeRepeatStartsMs`</a> default of every element. |
| `DefaultTimeBetweenRepeatsMs` | `int` | `300` | On use. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebetweenrepeatsms">`TimeBetweenRepeatsMs`</a> default of every element. |
| `DefaultMinDepth` | `float` | `0` | The `MinDepth` default of <a class="ref" href="/docs/ui-glossary/types/view-port-style/">`ViewPortStyle`</a>. |
| `DefaultMaxDepth` | `float` | `1` | The `MaxDepth` default of <a class="ref" href="/docs/ui-glossary/types/view-port-style/">`ViewPortStyle`</a>. |

The "on use" defaults apply to every element whose property has no value from code or a style, also to elements
without a style class such as <a class="ref" href="/docs/ui-glossary/elements/grid/">`Grid`</a>.

## Dependency properties

Every element property `Foo` is backed by `FooDP`, a <code><a href="/docs/ui-glossary/types/dependency-property/">DependencyProperty</a>&lt;T&gt;</code>. It holds the prioritised values (see
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
of your own is on the [base element](/docs/ui-base-element/#writing-your-own-element) page.

### Setting a value

<a class="ref method" href="/docs/ui-glossary/types/dependency-property/#setvalue">`SetValue`</a> (and so setting `Foo`) goes through these steps:

1. The element class's own check, its `OwnerPreAction` (see [`DependencyPropertyActions<T>`](#dependencypropertyactionst)), may correct the value or
   reject it. For example, <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> clamps <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#transparency">`Transparency`</a> to 0 ... 1 and keeps <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridcolumnspan">`GridColumnSpan`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridrowspan">`GridRowSpan`</a>
   at 1 or more.
2. The property's <a class="ref prop" href="/docs/ui-glossary/types/dependency-property/#preaction">`PreAction`</a>, if you set one, gets the value the element already corrected (a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#transparency">`Transparency`</a> of 3
   arrives as 1). It doesn't run for a value the element rejected, and it can correct or reject the value too.
3. The value is stored for its source: set by hand, by the style override or by the general style. Setting the same
   value again for the same source stops here (unless `checkForEquality` is off).
4. If a source of higher priority has a value, that one stays in effect and nothing else happens.
5. If the value in effect changed, the element class's own reaction runs, its `OwnerPostAction` (for example, the
   element is laid out again after a size change).
6. Then the property's <a class="ref prop" href="/docs/ui-glossary/types/dependency-property/#postaction">`PostAction`</a>, then <a class="ref event" href="/docs/ui-glossary/types/dependency-property/#onpropertychanged">`OnPropertyChanged`</a>, and a binding that writes to its source passes the
   value on.

<a class="ref method" href="/docs/ui-glossary/types/dependency-property/#clearvalue">`ClearValue`</a> skips the pre-actions: when the value in effect changes, steps 5 and 6 run with the value that takes
over.

### DependencyProperty&lt;T&gt; properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/dependency-property/#value">`Value`</a> | `T` | Read-only. The value in effect: the one of the highest priority source, or the default when no source has one. |
| <a class="ref prop" href="/docs/ui-glossary/types/dependency-property/#valuesource">`ValueSource`</a> | <a class="ref" href="/docs/ui-glossary/types/value-sources/">`ValueSources`</a> | Read-only. The source the value in effect comes from, `None` when the property reads its default. |
| <a class="ref prop" href="/docs/ui-glossary/types/dependency-property/#preaction">`PreAction`</a> | <a class="ref" href="/docs/ui-glossary/types/dependency-property-pre-action-delegate/">`PreActionDelegate`</a> | Called with `(ref T value, ref bool canProceed)` before every value is stored, from any source: change `value` to correct it, or set `canProceed` to `false` to reject it. It runs after the element class's own check (its `OwnerPreAction`), so it gets the value the element already corrected, and it doesn't run for a value the element rejected (see [setting a value](#setting-a-value)). |
| <a class="ref prop" href="/docs/ui-glossary/types/dependency-property/#postaction">`PostAction`</a> | `Action<T>` | Called with the new value in effect after the element class's own reaction (its `OwnerPostAction`), only when the value in effect changes (see [setting a value](#setting-a-value)), before <a class="ref event" href="/docs/ui-glossary/types/dependency-property/#onpropertychanged">`OnPropertyChanged`</a>. |

### DependencyProperty&lt;T&gt; events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/types/dependency-property/#onpropertychanged">`OnPropertyChanged`</a> | `(T value)` | The value in effect changes. The handler gets the new value. |
| <a class="ref event" href="/docs/ui-glossary/types/dependency-property/#onsourcepropertychanged">`OnSourcePropertyChanged`</a> | `(object propertyValue)` | The bound <a class="ref" href="/docs/ui-glossary/types/bindable/">`Bindable`</a> source reports a change of the bound property (or of all properties, with an empty name). The handler gets the source property's value, before conversion. Not raised for the echo of the property's own write, nor in `OneWayToSource` mode. |
| <a class="ref event" href="/docs/ui-glossary/types/dependency-property/#onsourcecollectionchanged">`OnSourceCollectionChanged`</a> | <code>(<a href="/docs/ui-glossary/types/collection-change-type/">CollectionChangeType</a> changeType, int startIndex, int count)</code> | The <a class="ref" href="/docs/ui-glossary/types/i-bindable-collection/">`IBindableCollection`</a> held by the bound source property adds (`Add`) or removes (`Remove`) items. Not raised in `OneWayToSource` mode. |

### DependencyProperty&lt;T&gt; methods

| Method | Description |
| --- | --- |
| <span class="method"><code><a href="/docs/ui-glossary/types/dependency-property/#dependencyproperty">DependencyProperty</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> owner, Action&lt;T&gt; postAction = null, PreActionDelegate preAction = null)</code></span> | Creates a stand-alone property owned by an element, with an optional post- and pre-action. Its default is `default(T)`. |
| <span class="method"><code><a href="/docs/ui-glossary/types/dependency-property/#dependencyproperty">DependencyProperty</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> owner, <a href="/docs/ui-glossary/types/dependency-property-actions/">DependencyPropertyActions</a>&lt;T&gt; actions)</code></span> | Creates a property that shares the element class's actions and default; the generated `FooDP` properties use it. |
| <span class="method"><code><a href="/docs/ui-glossary/types/dependency-property/#setvalue">SetValue</a>(T value, bool checkForEquality = true, bool setSourceValue = true, <a href="/docs/ui-glossary/types/value-sources/">ValueSources</a> valueSource = <a href="/docs/ui-glossary/types/value-sources/#manualassign">ValueSources.ManualAssign</a>)</code></span> | Stores the value for the source. With `checkForEquality` off, the same value raises the change again. With `setSourceValue` off, a bound source is not written. |
| <span class="method"><code><a href="/docs/ui-glossary/types/dependency-property/#clearvalue">ClearValue</a>(<a href="/docs/ui-glossary/types/value-sources/">ValueSources</a> valueSource)</code></span> | Removes the value of that source. If it was the value in effect, the next source (or the default) takes over and the change is raised when the value differs. |
| <span class="method"><code><a href="/docs/ui-glossary/types/dependency-property/#bind">Bind</a>(object dataContext, string sourcePropertyName, <a href="/docs/ui-glossary/types/binding-mode/">BindingMode</a> mode, <a href="/docs/ui-glossary/types/i-converter/">IConverter</a> converter = null)</code></span> | Binds the property to a public property of `dataContext`, replacing any earlier binding. See [bindings](#bindings). |
| <a class="ref method" href="/docs/ui-glossary/types/dependency-property/#dispose">`Dispose()`</a> | Removes the binding and the event handlers. The element calls it when it is disposed. |

<a class="ref" href="/docs/ui-glossary/types/dependency-property-owner-pre-action-delegate/">`OwnerPreActionDelegate`</a>, with the signature `(BaseElement owner, ref T value, ref bool canProceed, ValueSources
valueSource)`, is the type of the element class's own pre-action, `FooDPActions.OwnerPreAction` (see below).

### DependencyPropertyActions&lt;T&gt;

What the properties of one name share over all the elements of a class: the class's own pre- and post-action (set
once, in its static constructor) and the default value. The generated code creates one per dependency property, as
the static `FooDPActions` field of the element class.

| Property | Type | Description |
| --- | --- | --- |
| `OwnerPreAction` | <a class="ref" href="/docs/ui-glossary/types/dependency-property-owner-pre-action-delegate/">`OwnerPreActionDelegate`</a> | The element class's own check of every value before it is stored, from any source: it may correct the value or reject it (`canProceed`). It runs before the property's `PreAction`. Set it once, in the element class's static constructor: a second set throws, so the actions of a class (the library's elements' too) can't be replaced from outside. |
| `OwnerPostAction` | <code>Action&lt;BaseElement, T&gt;</code> | The element class's own reaction to a new value in effect, with the element it runs for: before the property's `PostAction` and `OnPropertyChanged`. Set once, like <a class="ref prop" href="/docs/ui-glossary/types/dependency-property-actions/#ownerpreaction">`OwnerPreAction`</a>. |
| <a class="ref prop" href="/docs/ui-glossary/types/dependency-property-actions/#defaultvalue">`DefaultValue`</a> | `T` | Read-only. The value read while no source has one. Some defaults are read from <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a> each time (see [default settings](#default-settings)). |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/dependency-property-actions/#dependencypropertyactions">`DependencyPropertyActions()`</a> | Creates an empty set of actions with the default `default(T)`. |

## Bindings

A dependency property can be bound to a public property of any object, the view model. When the object derives
from <a class="ref" href="/docs/ui-glossary/types/bindable/">`Bindable`</a> and calls `PropertyChangedInvoke`, the element follows its changes. <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is a list
that tells a bound list box about added and removed items. This view model and converter are used by the example
below:

```csharp
// a view model: the elements bound to it follow its PropertyChangedInvoke calls
// (in a setter without a name for the setter's own property, with nameof for another)
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
            PropertyChangedInvoke();
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
            PropertyChangedInvoke();
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

#### `BindingMode`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/binding-mode/#oneway">`OneWay`</a> | Source to element. |
| <a class="ref" href="/docs/ui-glossary/types/binding-mode/#onewaytosource">`OneWayToSource`</a> | Element to source. |
| <a class="ref" href="/docs/ui-glossary/types/binding-mode/#twoway">`TwoWay`</a> | Both ways. |

### Bindable

The abstract base of a view model.

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/types/bindable/#onpropertychanged">`OnPropertyChanged`</a> | `(string propertyName)` | The view model calls <a class="ref method" href="/docs/ui-glossary/types/bindable/#propertychangedinvoke">`PropertyChangedInvoke`</a>. The handler gets the name of the property that changed; an empty (or `null`) name means every property changed. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/bindable/#propertychangedinvoke">`PropertyChangedInvoke(string propertyName = "")`</a> | Protected. Raises <a class="ref event" href="/docs/ui-glossary/types/bindable/#onpropertychanged">`OnPropertyChanged`</a>. Called from a property's setter without a name, it names that property (`[CallerMemberName]`); another property is named with `nameof`. An empty or `null` name means every property changed: <a class="ref method" href="/docs/ui-glossary/types/bindable/#propertychangedinvoke">`PropertyChangedInvoke(string.Empty)`</a> (with no argument outside a setter, it names the calling method instead). |

### BindableCollection&lt;T&gt;

A list that raises <a class="ref event" href="/docs/ui-glossary/types/bindable-collection/#oncollectionchanged">`OnCollectionChanged`</a> for every change, so a bound <a class="ref" href="/docs/ui-glossary/elements/list-box/">`ListBox`</a>, <a class="ref" href="/docs/ui-glossary/elements/combo-box/">`ComboBox`</a>, <a class="ref" href="/docs/ui-glossary/elements/tree-view/">`TreeView`</a> or
<a class="ref" href="/docs/ui-glossary/elements/context-menu/">`ContextMenu`</a> updates only the changed rows. It implements <a class="ref" href="/docs/ui-glossary/types/i-bindable-collection/">`IBindableCollection`</a> and `IReadOnlyList<T>`, and can be
filled with a collection initializer or `[]`.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`this[int index]`</span> | `T` | The item at the index. Setting it is reported as the old item removed and the new one added at that index. |
| <a class="ref prop" href="/docs/ui-glossary/types/bindable-collection/#count">`Count`</a> | `int` | Read-only. The number of items. |
| <a class="ref prop" href="/docs/ui-glossary/types/bindable-collection/#isreadonly">`IsReadOnly`</a> | `bool` | Read-only. Always `false`. |

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/types/bindable-collection/#oncollectionchanged">`OnCollectionChanged`</a> | `(bool isItemsAdded, int startIndex, int count)` | Items are added (`isItemsAdded` is `true`) or removed, starting at `startIndex`. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#bindablecollection">`BindableCollection()`</a> | Creates an empty collection. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#add">`Add(T item)`</a> | Adds the item at the end. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#addrange">`AddRange(IEnumerable<T> collection)`</a> | Adds the items at the end, reported as one change. Does nothing for `null` or an empty collection. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#insert">`Insert(int index, T item)`</a> | Inserts the item at the index. An index outside `0..Count` is ignored. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#insertrange">`InsertRange(int index, IEnumerable<T> collection)`</a> | Inserts the items at the index, reported as one change. An index outside `0..Count` is ignored. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#remove">`Remove(T item)`</a> | Removes the first occurrence of the item. Returns `false` when it is not in the collection. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#removeat">`RemoveAt(int index)`</a> | Removes the item at the index. An index out of range is ignored. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#removerange">`RemoveRange(int index, int count)`</a> | Removes up to `count` items from the index, reported as one change. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#clear">`Clear()`</a> | Removes every item, reported as one change. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#trygetelementat">`TryGetElementAt(int index)`</a> | Returns the item at the index, or `default` when the index is out of range. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#contains">`Contains(T item)`</a> | Whether the item is in the collection. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#copyto">`CopyTo(T[] array, int arrayIndex)`</a> | Copies the items into the array from the index. |
| <a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#getenumerator">`GetEnumerator()`</a> | Enumerates the items. |

### IBindableCollection

An `IEnumerable` that reports its changes. Implement it for a collection of your own to use it as a bound items
source.

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/types/i-bindable-collection/#oncollectionchanged">`OnCollectionChanged`</a> | `(bool isItemsAdded, int startIndex, int count)` | Items were added (`true`) or removed (`false`), `count` of them from `startIndex`. |

#### `CollectionChangeType`

Passed to `OnSourceCollectionChanged`.

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/collection-change-type/#initialize">`Initialize`</a> | The whole source is taken again. Used by the list box when it rebuilds its rows; `OnSourceCollectionChanged` doesn't raise it. |
| <a class="ref" href="/docs/ui-glossary/types/collection-change-type/#add">`Add`</a> | Items were added. |
| <a class="ref" href="/docs/ui-glossary/types/collection-change-type/#remove">`Remove`</a> | Items were removed. |

### IConverter

Translates between the source's type and the property's type.

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/i-converter/#convert">`Convert(object value)`</a> | Turns a source value into the property's value. Used in `OneWay` and `TwoWay` mode. |
| <a class="ref method" href="/docs/ui-glossary/types/i-converter/#convertback">`ConvertBack(object value)`</a> | Turns the property's value into a source value. Used in `OneWayToSource` and `TwoWay` mode. |

## Items templates

A list box, combo box, tree view or context menu with an `ItemsSource` makes one row per source object. Its
`ItemsTemplate` makes the element shown in each row; without one, the row shows the object's `ToString()` in a
<a class="ref" href="/docs/ui-glossary/elements/label/">`Label`</a>. The elements a template makes belong to the list, which may dispose or reuse them, so don't keep or move
them. Setting another
template on a list box with an items source rebuilds its rows. The template below binds each row's check box to its
quest, so the row follows the quest and the quest follows the row:

```csharp
// a quest that tells its bound elements when it is done or not
public sealed class Quest(string title, bool done) : Bindable
{
    private bool _done = done;

    public string Title { get; } = title;

    public bool Done
    {
        get => _done;
        set
        {
            _done = value;
            PropertyChangedInvoke();
        }
    }
}

// makes the element of a row from its source object
public sealed class QuestTemplate : IItemsTemplate
{
    public BaseElement GenerateItemElement(object data)
    {
        var quest = (Quest)data;

        var checkBox = new CheckBox
        {
            Text = quest.Title,
            DesiredHeight = 22,
            Margin = (6, 3),
            HorizontalAlignment = HorizontalAlignment.Left,
            VerticalAlignment = VerticalAlignment.Top
        };

        // both ways: the box shows Done, and a click on the box sets Done
        checkBox.CheckedDP.Bind(quest, nameof(Quest.Done), BindingMode.TwoWay);

        return checkBox;
    }
}
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/styles-items-template.png' | relative_url }}" width="334" height="154" alt="A list of four check boxes: Light the beacon and Rest by the fire checked, Find the map and Cross the river unchecked">
  <figcaption>Each quest of the source shown as a check box bound to its Done: the last quest was added not done, and setting its Done checked its box.</figcaption>
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

var rest = new Quest("Rest by the fire", false);

quests.Add(rest);    // a new row appears, its box not checked
rest.Done = true;    // the box checks itself

ui.AddElementToRoot(list);
```

### IItemsTemplate

A list's `ItemsTemplate`. A virtualized [`ListBox`](/docs/ui-lists/#listbox) (`VirtualizationMode` `Fixed`) reuses the
rows that scroll out of view: a template that can show another source object in an element it made overrides
<a class="ref method" href="/docs/ui-glossary/types/i-items-template/#updateitemelement">`UpdateItemElement`</a>, otherwise a reused row gets a new element, as without virtualization.

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/i-items-template/#generateitemelement">`GenerateItemElement(object data)`</a> | Returns a new element that shows the source object. |
| <code>UpdateItemElement(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> element, object data)</code> | Returns the element that shows `data` in a row whose element, made by this template, showed another source object: `element` updated, or a new one, which replaces it (the list disposes the replaced one). By default it returns <a class="ref method" href="/docs/ui-glossary/types/i-items-template/#generateitemelement">`GenerateItemElement(data)`</a>. |

```csharp
// updates the label it made instead of making a new one
public class LevelTemplate : IItemsTemplate
{
    public BaseElement GenerateItemElement(object data) =>
        new Label { Text = (string)data, Margin = 5 };

    public BaseElement UpdateItemElement(BaseElement element, object data)
    {
        ((Label)element).Text = (string)data;

        return element;
    }
}
```

## Animations

An <code><a href="/docs/ui-glossary/types/animation/">Animation</a>&lt;T&gt;</code> drives one or more dependency properties of type `T` along a time line of `durationMs`. Frames
describe the values: <code><a href="/docs/ui-glossary/types/smooth-animation-frame/">SmoothAnimationFrame</a>&lt;T&gt;</code> goes from one value to another over a stretch of the time line,
<code><a href="/docs/ui-glossary/types/discrete-animation-frame/">DiscreteAnimationFrame</a>&lt;T&gt;</code> sets a value at a point of it. Register the animation with <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#addanimation">`BorrowedTorchUI.AddAnimation`</a>
and start it.

<figure class="shot">
  <img src="{{ '/assets/img/ui/styles-animation.png' | relative_url }}" width="494" height="134" alt="Two columns, Smooth frames and Discrete frames, each with the banner Level complete sliding in and a progress bar filling: on the left both move evenly, on the right they jump in steps, and the banner's color fades on the left and blinks on the right">
  <figcaption>The same animations with smooth frames (left) and with discrete frames at points of the same time lines (right).</figcaption>
</figure>

```csharp
var grid = new Grid
{
    DesiredWidth = 460,
    DesiredHeight = 100,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = 16
};
grid.AddColumnDefinition(1.0f);
grid.AddColumnDefinition(1.0f);
grid.AddRowDefinition(1.0f);

// the same banner and bar in each column (a grid cell clips them, so a banner
// slides in from the left edge of its own column)
(Label Banner, ProgressBar Bar) Example(int column, string title)
{
    var banner = new Label
    {
        Text = "Level complete",
        FontSize = 22,
        GridColumn = column,
        HorizontalAlignment = HorizontalAlignment.Left,
        VerticalAlignment = VerticalAlignment.Top,
        Margin = (-220, 28)
    };
    var bar = new ProgressBar
    {
        DesiredWidth = 200,
        DesiredHeight = 12,
        Max = 100,
        GridColumn = column,
        HorizontalAlignment = HorizontalAlignment.Left,
        VerticalAlignment = VerticalAlignment.Top,
        Margin = (0, 78)
    };

    grid.AddItem(new Label
    {
        Text = title,
        GridColumn = column,
        HorizontalAlignment = HorizontalAlignment.Left,
        VerticalAlignment = VerticalAlignment.Top
    });
    grid.AddItem(banner);
    grid.AddItem(bar);

    return (banner, bar);
}

var smooth = Example(0, "Smooth frames");
var discrete = Example(1, "Discrete frames");

ui.AddElementToRoot(grid);

// one animation of a property, started at once
void Animate<T>(DependencyProperty<T> property, int durationMs, bool pulse,
    params BaseAnimationFrame<T>[] frames)
{
    var animation = pulse
        ? new Animation<T>(durationMs, AnimationRepeatType.Infinite,
            autoReverse: true, deleteOnComplete: false)
        : new Animation<T>(durationMs);

    foreach (var frame in frames) animation.AddFrame(frame);

    animation.AddDependencyProperty(property);
    ui.AddAnimation(animation);
    animation.Start();
}

var gold = new Color(233, 194, 122);
var flame = new Color(242, 140, 40);

// smooth frames: from one value to another over a stretch of the time line
Animate(smooth.Banner.MarginDP, 500, false,
    new SmoothAnimationFrame<Margin>((-220, 28), (0, 28), 500,
        shapingFunction: new CubicEaseOut()));
Animate(smooth.Bar.ValueDP, 1000, false, new SmoothAnimationFrame<float>(0, 100, 1000));
Animate(smooth.Banner.ForegroundColorDP, 400, true,
    new SmoothAnimationFrame<Color>(gold, flame, 400));

// discrete frames: a value at a point of the time line, kept until the next one
Animate(discrete.Banner.MarginDP, 500, false,
    new DiscreteAnimationFrame<Margin>((-220, 28), 0),
    new DiscreteAnimationFrame<Margin>((-110, 28), 125),
    new DiscreteAnimationFrame<Margin>((-45, 28), 250),
    new DiscreteAnimationFrame<Margin>((-10, 28), 375),
    new DiscreteAnimationFrame<Margin>((0, 28), 500));
Animate(discrete.Bar.ValueDP, 1000, false,
    new DiscreteAnimationFrame<float>(0, 0),
    new DiscreteAnimationFrame<float>(25, 250),
    new DiscreteAnimationFrame<float>(50, 500),
    new DiscreteAnimationFrame<float>(75, 750),
    new DiscreteAnimationFrame<float>(100, 1000));
Animate(discrete.Banner.ForegroundColorDP, 400, true,
    new DiscreteAnimationFrame<Color>(gold, 0),
    new DiscreteAnimationFrame<Color>(flame, 200));
```

The UI advances its running animations on every `Update`, by the frame's elapsed game time. A long
frame doesn't skip boundaries: the animation still turns around, ends its runs and lands on the exact end values.

- A run goes once along the time line, or forth and back with `autoReverse`. <a class="ref" href="/docs/ui-glossary/types/animation-repeat-type/#none">`AnimationRepeatType.None`</a> plays one run,
  `NumberOfTimes` plays `repeatsNumber` runs, `Infinite` repeats until you pause or remove it.
- When it completes, the animation applies the values of the end of its time line (its start, with `autoReverse`),
  then <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#endvalue">`RunBoundaryValues.EndValue`</a> if it has one. With `deleteOnComplete` (the default) it is then removed from the
  UI; add it again to play it after a `Reset`.
- Animated values are `ManualAssign` values: they win over styles and stay after the animation. Clear them with
  <code>FooDP.ClearValue(<a href="/docs/ui-glossary/types/value-sources/#manualassign">ValueSources.ManualAssign</a>)</code> to give the property back to its style.
- `int`, `float`, <a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> and `Color` are interpolated. A smooth frame of any other type keeps `From` until the end of
  the frame, then switches to `To`.
- An animation whose properties all belong to disposed elements is removed automatically.

### Animation&lt;T&gt;

An animation of properties of type `T`. It has the properties of [`BaseAnimation`](#baseanimation).

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/animation/#state">`State`</a> | <a class="ref" href="/docs/ui-glossary/types/animation-state/">`AnimationState`</a> | Read-only. Where the animation is: not started, running, paused or completed. |
| <a class="ref prop" href="/docs/ui-glossary/types/animation/#runboundaryvalues">`RunBoundaryValues`</a> | <a class="ref prop" href="/docs/ui-glossary/types/animation/#runboundaryvalues">`RunBoundaryValues<T>`</a> | Read-only. The values applied when the animation starts and when it completes, or `null`. |

| Method | Description |
| --- | --- |
| <span class="method"><code><a href="/docs/ui-glossary/types/animation/#animation">Animation</a>(int durationMs, <a href="/docs/ui-glossary/types/animation-repeat-type/">AnimationRepeatType</a> repeatType = <a href="/docs/ui-glossary/types/animation-repeat-type/#none">AnimationRepeatType.None</a>, bool autoReverse = false, bool deleteOnComplete = true, <a href="/docs/ui-glossary/types/run-boundary-values/">RunBoundaryValues</a>&lt;T&gt; runBoundaryValues = null, uint repeatsNumber = 1)</code></span> | Creates an animation with a time line of `durationMs` milliseconds. `repeatsNumber` counts the runs of a `NumberOfTimes` animation. A duration of 0 or less completes at once with the end values. |
| <span class="method"><code><a href="/docs/ui-glossary/types/animation/#addframe">AddFrame</a>(<a href="/docs/ui-glossary/types/base-animation-frame/">BaseAnimationFrame</a>&lt;T&gt; frame)</code></span> | Adds a smooth or discrete frame. |
| <span class="method"><code><a href="/docs/ui-glossary/types/animation/#adddependencyproperty">AddDependencyProperty</a>(<a href="/docs/ui-glossary/types/dependency-property/">DependencyProperty</a>&lt;T&gt; property)</code></span> | Adds a property the animation drives. One animation can drive several properties. |
| <a class="ref method" href="/docs/ui-glossary/types/animation/#start">`Start()`</a> | Runs a not started or paused animation. On the first start it applies <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#startvalue">`RunBoundaryValues.StartValue`</a>, then the values of the time line's start, so a frame that applies at 0 ms replaces `StartValue` at once. Does nothing on a completed animation (call <a class="ref method" href="/docs/ui-glossary/types/animation/#reset">`Reset`</a> first) or on a `NumberOfTimes` animation with 0 repeats. |
| <a class="ref method" href="/docs/ui-glossary/types/animation/#pause">`Pause()`</a> | Pauses a running animation; <a class="ref method" href="/docs/ui-glossary/types/animation/#start">`Start`</a> continues it. |
| <a class="ref method" href="/docs/ui-glossary/types/animation/#reset">`Reset()`</a> | Puts the animation back to not started, at the start of its time line with its repeats restored. The properties keep their current values. |

### BaseAnimation

The abstract base of animations, the type `AddAnimation` takes. Its properties are set by the constructor.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/base-animation/#state">`State`</a> | <a class="ref" href="/docs/ui-glossary/types/animation-state/">`AnimationState`</a> | Read-only. The state of the animation. |
| <a class="ref prop" href="/docs/ui-glossary/types/base-animation/#durationms">`DurationMs`</a> | `int` | Read-only. The length of the time line in milliseconds. |
| <a class="ref prop" href="/docs/ui-glossary/types/base-animation/#repeattype">`RepeatType`</a> | <a class="ref" href="/docs/ui-glossary/types/animation-repeat-type/">`AnimationRepeatType`</a> | Read-only. How the runs repeat. |
| <a class="ref prop" href="/docs/ui-glossary/types/base-animation/#repeatsnumber">`RepeatsNumber`</a> | `uint` | Read-only. The number of runs of a `NumberOfTimes` animation. |
| <a class="ref prop" href="/docs/ui-glossary/types/base-animation/#autoreverse">`AutoReverse`</a> | `bool` | Read-only. Whether a run goes forth and back along the time line. |
| <a class="ref prop" href="/docs/ui-glossary/types/base-animation/#deleteoncomplete">`DeleteOnComplete`</a> | `bool` | Read-only. Whether the UI removes the animation when it completes. |

#### `AnimationState`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/animation-state/#notstarted">`NotStarted`</a> | Created or reset, not started yet. |
| <a class="ref" href="/docs/ui-glossary/types/animation-state/#running">`Running`</a> | Advancing with every update. |
| <a class="ref" href="/docs/ui-glossary/types/animation-state/#paused">`Paused`</a> | Stopped where it was; `Start` continues it. |
| <a class="ref" href="/docs/ui-glossary/types/animation-state/#completed">`Completed`</a> | All runs are done; `Reset` makes it playable again. |

#### `AnimationRepeatType`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/animation-repeat-type/#none">`None`</a> | One run. |
| <a class="ref" href="/docs/ui-glossary/types/animation-repeat-type/#numberoftimes">`NumberOfTimes`</a> | `RepeatsNumber` runs. |
| <a class="ref" href="/docs/ui-glossary/types/animation-repeat-type/#infinite">`Infinite`</a> | Runs until paused or removed. |

### BaseAnimationFrame&lt;T&gt;

The abstract base of the frames an <code><a href="/docs/ui-glossary/types/animation/">Animation</a>&lt;T&gt;</code> takes. It has no public members; use <code><a href="/docs/ui-glossary/types/smooth-animation-frame/">SmoothAnimationFrame</a>&lt;T&gt;</code> or
<code><a href="/docs/ui-glossary/types/discrete-animation-frame/">DiscreteAnimationFrame</a>&lt;T&gt;</code>.

### SmoothAnimationFrame&lt;T&gt;

Goes from <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#from">`From`</a> to <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#to">`To`</a> between <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#startatms">`StartAtMs`</a> and `StartAtMs + DurationMs` of the time line, and goes back the same way
when the time line reverses. Before its start it sets nothing. A shaping function bends the progress: pass any
`BaseShapingFunction` from the `BorrowedTorch.ShapingFunctions` package, such as `new CubicEaseOut()`, or create one
with `ShapingFunctionFactory.Create(ShapingFunctionId.CubicEaseInOut)`.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#from">`From`</a> | `T` | Read-only. The value at the start of the frame. |
| <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#to">`To`</a> | `T` | Read-only. The value at the end of the frame. |
| <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#durationms">`DurationMs`</a> | `int` | Read-only. The length of the frame in milliseconds. |
| <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#startatms">`StartAtMs`</a> | `int` | Read-only. Where the frame starts on the time line, in milliseconds. |
| <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#shapingfunction">`ShapingFunction`</a> | `BaseShapingFunction` | Read-only. The function that maps the frame's progress (0 to 1) to the share of the way from <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#from">`From`</a> to <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#to">`To`</a>. `Linear` when none is given. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/smooth-animation-frame/#smoothanimationframe">`SmoothAnimationFrame(T from, T to, int durationMs, int startAtMs = 0, BaseShapingFunction shapingFunction = null)`</a> | Creates the frame. |

### DiscreteAnimationFrame&lt;T&gt;

Sets <a class="ref prop" href="/docs/ui-glossary/types/discrete-animation-frame/#value">`Value`</a> when the time line reaches <a class="ref prop" href="/docs/ui-glossary/types/discrete-animation-frame/#applyatms">`ApplyAtMs`</a>. The discrete frames of an animation form one track: the value in
effect is the one of the latest frame at or before the time line's position, going forth and back alike. Of frames at
the same time, the one added last wins.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/discrete-animation-frame/#value">`Value`</a> | `T` | Read-only. The value the frame sets. |
| <a class="ref prop" href="/docs/ui-glossary/types/discrete-animation-frame/#applyatms">`ApplyAtMs`</a> | `int` | Read-only. The point of the time line where it is set, in milliseconds. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/discrete-animation-frame/#discreteanimationframe">`DiscreteAnimationFrame(T value, int applyAtMs)`</a> | Creates the frame. |

### RunBoundaryValues&lt;T&gt;

Values set on the animated properties outside the frames: <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#startvalue">`StartValue`</a> when the animation first starts, <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#endvalue">`EndValue`</a>
when it completes. Pass it to the <code><a href="/docs/ui-glossary/types/animation/">Animation</a>&lt;T&gt;</code> constructor.

- Both values are always applied: one you don't set is `default(T)`, such as 0 or a transparent `Color`.
- <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#startvalue">`StartValue`</a> is applied before the values of the time line's start, so a frame that applies at 0 ms replaces it
  at once. It shows only until the first frame begins (a discrete frame with `applyAtMs` above 0, a smooth frame
  with `startAtMs` above 0): use it to hold a value through a delay.
- <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#endvalue">`EndValue`</a> is applied after the end values of the frames and stays. An `Infinite` animation never completes, so
  it never applies <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#endvalue">`EndValue`</a>.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#startvalue">`StartValue`</a> | `T` | The value set when the animation starts from not started, before the values of the time line's start: a frame that applies at 0 ms replaces it at once. |
| <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#endvalue">`EndValue`</a> | `T` | The value set after the end values of the frames when the animation completes. Never applied by an `Infinite` animation, which doesn't complete. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/types/run-boundary-values/#runboundaryvalues">`RunBoundaryValues()`</a> | Creates the values, both `default(T)`. |

### BorrowedTorchUI animation methods

| Method | Description |
| --- | --- |
| <span class="method">`AddAnimation(BaseAnimation animation)`</span> | Registers the animation so the UI advances it while it runs. Adding it again while registered, or adding `null`, does nothing. |
| <span class="method">`RemoveAnimation(BaseAnimation animation)`</span> | Stops advancing the animation. It keeps its state; adding it again continues it. |
