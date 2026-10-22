---
layout: docs
title: "UI: layout elements"
description: Stack panels, grids, scrolling containers, borders, separators, windows and tabs.
---

These elements arrange, frame and scroll other elements. Each of them, apart from `TabControl`, is an element: it has
all the properties, events and methods of [`BaseElement`](/docs/ui-base-element/), which the tables below don't
repeat. A property marked <span class="dp-badge">DP</span> is a dependency property: `Foo` is backed by `FooDP`, which a
style, a binding or an animation can set (see [styles, bindings and animation](/docs/ui-styles/)). Screenshots use the
theme from [styles](/docs/ui-styles/#the-theme-of-these-pages).

## StackPanel

Puts its items one after another, in a column or in a row, and fits their size.

<figure class="shot">
  <img src="{{ '/assets/img/ui/layout-stackpanel.png' | relative_url }}" width="494" height="152" alt="A column of three buttons, New game, Options and Quit, and a row of three buttons, Cut, Copy and Paste">
  <figcaption>A vertical and a horizontal stack panel.</figcaption>
</figure>

```csharp
// a column: the gaps are top margins (a bottom margin adds nothing to the panel's size)
var menu = new StackPanel("menu")
{
    Orientation = Orientation.Vertical,
    Margin = (16, 16)
};

menu.AddItem(new Button { Text = "New game", DesiredWidth = 180, DesiredHeight = 34 });
menu.AddItem(new Button
{
    Text = "Options",
    DesiredWidth = 180,
    DesiredHeight = 34,
    Margin = (0, 8)
});
menu.AddItem(new Button
{
    Text = "Quit",
    DesiredWidth = 180,
    DesiredHeight = 34,
    Margin = (0, 8)
});

// a row: the gaps are left margins
var toolbar = new StackPanel("toolbar")
{
    Orientation = Orientation.Horizontal,
    Margin = (220, 16)
};

foreach (var (text, index) in new[] { "Cut", "Copy", "Paste" }.Select((t, i) => (t, i)))
    toolbar.AddItem(new Button
    {
        Text = text,
        DesiredWidth = 80,
        DesiredHeight = 34,
        Margin = (index == 0 ? 0 : 8, 0)
    });

ui.AddElementToRoot(menu);
ui.AddElementToRoot(toolbar);
```

Along its [`Orientation`](/docs/ui-base-element/#size-and-position) every item takes its own size; across it, every item
gets the panel's size and is aligned within it. The panel fits the sum of its items along the orientation and the
largest of them across it. A stack panel is aligned `Left` and `Top` by default, so it fits its items unless you
give it a size or stretch it.

Put the gap between two items on the **left margin** (in a row) or the **top margin** (in a column) of the next item.
A parent that fits its content counts an item's margin only on the side the item is aligned to (see
[margins](/docs/ui/#margins)), so the right or bottom margin of a `Left` / `Top` aligned item adds no space.

Each item sits in a wrapper the panel makes for it, so the panel's `Children` are those wrappers. `Items` lists your
own elements in their order. The panel's `ForegroundColor`, when set, fills every wrapper behind its item.
An item that is disposed leaves the panel by itself.

### StackPanel properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Orientation`</span> | `Orientation` | `Vertical` stacks the items top to bottom, `Horizontal` left to right. The default is `Horizontal`. |
| `Items` | `IReadOnlyList<BaseElement>` | Read-only. The items in the order they are stacked: the elements you added, not the panel's wrappers. A live view, nothing is copied. |

### StackPanel methods

| Method | Description |
| --- | --- |
| `StackPanel(string name = null)` | Creates a stack panel. The name is used by `GetElementByName`. |
| `AddItem(BaseElement item)` | Adds the item at the end. A null item is ignored. |
| `AddItemAt(BaseElement item, int index)` | Inserts the item at the index (0 to the item count). |
| `RemoveItem(BaseElement item)` | Removes the item. It is detached, not disposed. |
| `RemoveItemAt(int index)` | Removes the item at the index. It is detached, not disposed. |
| `ClearItems()` | Removes every item. The items are detached, not disposed. |

Style class: `StackPanelStyle` (`Orientation`; its defaults are `HitTest` off, `Left` / `Top` alignment and
`InheritState.FromChildren`, see [styles](/docs/ui-styles/)).

## Grid

Lays its items out in columns and rows. Each column and row is fixed, fitted to its content, or a share of the space
left.

<figure class="shot">
  <img src="{{ '/assets/img/ui/layout-grid.png' | relative_url }}" width="522" height="242" alt="A grid with its cell lines drawn: a fixed Sidebar column, a narrower 1 share column and a wider 2 shares column">
  <figcaption>A fixed column and two proportional ones, with <code>ShowLayout</code> on.</figcaption>
</figure>

```csharp
var grid = new Grid("layout")
{
    Margin = 16,
    ShowLayout = true,                        // draws the cell lines (a debugging aid)
    LayoutColor = new Color(168, 131, 74)
};

grid.AddColumnDefinition(140);                // a fixed 140 wide sidebar
grid.AddColumnDefinition(1.0f);               // one share of what is left
grid.AddColumnDefinition(2.0f);               // two shares
grid.AddRowDefinition();                      // as tall as its content
grid.AddRowDefinition(1.0f);

Label Cell(string text, int column, int row, int columnSpan = 1) => new()
{
    Text = text,
    TextMargin = 8,
    GridColumn = column,
    GridRow = row,
    GridColumnSpan = columnSpan
};

grid.AddItem(Cell("Header across all columns", 0, 0, 3));
grid.AddItem(Cell("Sidebar", 0, 1));
grid.AddItem(Cell("1 share", 1, 1));
grid.AddItem(Cell("2 shares", 2, 1));

ui.AddElementToRoot(grid);
```

An item picks its place with the `GridColumn`, `GridRow`, `GridColumnSpan` and `GridRowSpan` properties every element
has (see the [base element](/docs/ui-base-element/)). Define the columns and rows first: `AddItem` ignores an item
whose column or row doesn't exist yet. A span that reaches past the last column or row is cut to the grid.

Each definition is added with one of three overloads:

- `AddColumnDefinition(int desiredSize)`: a **fixed** size in units (at least 1).
- `AddColumnDefinition()`: an **auto** size, as large as the largest content of the cells in it.
- `AddColumnDefinition(float proportion)`: a **proportional** size, a share of the space left.

`AddRowDefinition` has the same three. The columns are sized first, then the rows at the column widths, so a wrapped
text gets the height it needs at its column's width. Along each side:

1. Fixed definitions take their size.
2. Auto definitions take the largest content size of the cells in them that don't span along that side.
3. Proportional definitions share what the fixed and auto ones leave of the grid's size, in proportion to their values:
   `1.0f` and `2.0f` get a third and two thirds. A proportion of 0 gets nothing.
4. A cell that spans several definitions and needs more than they give grows the auto definitions it spans, evenly,
   taking the growth from the space the proportional definitions share. A span over no auto definition can't grow:
   its content is clipped.
5. Definitions that don't fit in the grid's size are cut, the last ones first, down to 0.

When the grid fits its content along a side (no `DesiredWidth` / `DesiredHeight` and an alignment other than
`Stretch`), its proportional definitions are sized to their content like auto ones. They share only the grid's
`MinWidth` / `MinHeight` there, and `MaxWidth` / `MaxHeight` cut them.

The grid makes one cell (a [`GridCell`](#gridcell)) for each place and span its items use, so its `Children` are cells.
Items with the same place and spans share a cell, each aligned within it by its own alignment and margin. A cell
clips its items, and it is removed once its last item is. The grid's `ForegroundColor`, when set, fills its cells.

### Grid properties

| Property | Type | Description |
| --- | --- | --- |
| `ColumnsCount` | `int` | Read-only. The number of column definitions. |
| `RowsCount` | `int` | Read-only. The number of row definitions. |
| `ShowLayout` | `bool` | Draws the grid's outline, a line at the end of every column and row, and fills each of them with a dim shade of `LayoutColor`. A debugging aid, off by default. |
| `LayoutColor` | `Color` | The colour of the lines `ShowLayout` draws; the fill is this colour with every channel divided by 5. Set it, the default is transparent. |

### Grid methods

| Method | Description |
| --- | --- |
| `Grid(string name = null)` | Creates a grid without definitions. The name is used by `GetElementByName`. |
| `AddColumnDefinition(int desiredSize)` | Adds a column of a fixed width in units (at least 1). |
| `AddColumnDefinition()` | Adds an auto column, as wide as the widest content of its cells. |
| `AddColumnDefinition(float proportion)` | Adds a proportional column, a share of the width left. Negative values count as 0. |
| `AddRowDefinition(int desiredSize)` | Adds a row of a fixed height in units (at least 1). |
| `AddRowDefinition()` | Adds an auto row, as tall as the tallest content of its cells. |
| `AddRowDefinition(float proportion)` | Adds a proportional row, a share of the height left. Negative values count as 0. |
| `AddItem(BaseElement item)` | Puts the item in the cell its `GridColumn`, `GridRow` and spans name, making the cell if needed. Ignored when the column or row doesn't exist. |
| `AddItemAt(BaseElement item, int index)` | Does nothing: a grid places items by column and row. Use `AddItem`. |
| `RemoveItem(BaseElement item)` | Takes the item out of its cell. It is detached, not disposed. |
| `RemoveItemAt(int index)` | Removes an item by its index in the items of all cells, cell by cell. |
| `RemoveItemsRangeAt(int index, int count)` | Removes `count` items from the index on, counted as in `RemoveItemAt`. |
| `ClearItems()` | Removes every item and the emptied cells. The items are detached, not disposed; the definitions stay. |
| `Clear()` | Removes every definition and every item. The items are detached, not disposed, so they can be added again. |
| `TryGetCell(int column, int row, int columnSpan = 1, int rowSpan = 1)` | Returns the cell at that place with those spans, or null when there is none (no item uses it) or the place is outside the grid. Spans are cut to the grid as `AddItem` cuts them. |
| `Draw()` | Draws the grid, with the `ShowLayout` lines under its items. The UI calls it; you don't. |

### GridCell

A cell the grid makes to hold the items of one place and span. You don't create cells; get one with `TryGetCell`.
A cell is aligned `Left` / `Top`, doesn't take the mouse, and clips its items. Its `GridColumn`, `GridRow`,
`GridColumnSpan` and `GridRowSpan` tell its place.

| Property | Type | Description |
| --- | --- | --- |
| `IsSpanCell` | `bool` | Read-only. Whether the cell spans more than one column or row. |
| `ContentWidth` | `int` | Read-only. The width the cell's items need; auto columns are sized by it. |
| `ContentHeight` | `int` | Read-only. The height the cell's items need; auto rows are sized by it. |
| `Items` | `IReadOnlyList<BaseElement>` | Read-only. The items in the cell. |

The grid has no style class; its properties are set in code.

## ScrollableContainer

Shows its items in a view of its own size and scrolls them when they are larger, with scroll bars, the mouse wheel or
code.

<figure class="shot">
  <img src="{{ '/assets/img/ui/layout-scrollable.png' | relative_url }}" width="394" height="202" alt="A dark scrollable container showing part of a long list of log lines">
  <figcaption>A container with a long log, scrolled to 40 %.</figcaption>
</figure>

```csharp
var log = new StackPanel("logLines") { Orientation = Orientation.Vertical };

for (var i = 1; i <= 30; i++)
    log.AddItem(new Label
    {
        Text = $"{i:00}  The torch flickers in the corridor, line {i} of the log",
        TextMargin = (6, 2)
    });

var scrollable = new ScrollableContainer("log")
{
    DesiredWidth = 360,
    DesiredHeight = 168,
    Margin = 16,
    BackgroundColor = new Color(26, 20, 15),
    ScrollBars = ScrollBars.Both,
    VerticalScrollingValue = 0.4f    // 0 is the top, 1 the bottom
};
scrollable.AddItem(log);

ui.AddElementToRoot(scrollable);
```

The items are measured as if there were no limit: an item without a `DesiredWidth` is as wide as its content, not as
wide as the view. Whatever lies outside the view is clipped. A container without a size fits its items; with a
`MaxWidth` or `MaxHeight` it stops growing there and shows the scroll bars it needs.

**Scroll values.** `HorizontalScrollingValue` and `VerticalScrollingValue` run from 0 (the left, the top) to 1 (the
right, the bottom), whatever the sizes; values outside are clamped. While the content fits the view it isn't shifted,
and the value is kept for when the content grows. When the view or the content changes size, the values are adjusted
so the same part of the content stays in view.

**Scroll bars.** `ScrollBars` says which bars may show; a bar shows only while the content is larger than the view
along it, at the right or the bottom edge, and the view shrinks by `ScrollBarsThickness`. `ScrollBarsThickness` is 0
by default, so set it, directly or in a style, whenever you show scroll bars. The bars are sliders styled by
`ScrollBarsStyle`. With `ScrollBars.None` the content can still be scrolled from code.

**Mouse wheel.** One notch of the wheel scrolls 60 units of content, the vertical wheel up and down, the horizontal
wheel sideways. Only a container that shows a scroll bar in that direction takes the wheel, and of nested ones only
the innermost hovered one does, so an inner list scrolls without moving the page around it.

The container's `Children` are its view and scroll bars; the item methods act on the items inside the view.

### ScrollableContainer properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`ScrollBars`</span> | `ScrollBars` | Which scroll bars may show: `None` (the default), `Vertical`, `Horizontal` or `Both`. |
| <span class="dp">`ScrollBarsThickness`</span> | `int` | The width of a vertical bar and the height of a horizontal one, in units. The default is 0. |
| <span class="dp">`ScrollBarsStyle`</span> | `SliderStyle` | The style of the scroll bars (see [sliders](/docs/ui-controls/#slider)). The vertical bar gets a copy with the colours of its two line halves swapped. |
| <span class="dp">`HorizontalScrollingValue`</span> | `float` | How far the content is scrolled sideways, from 0 (the left) to 1 (the right). |
| <span class="dp">`VerticalScrollingValue`</span> | `float` | How far the content is scrolled down, from 0 (the top) to 1 (the bottom). |
| `Items` | `IReadOnlyList<BaseElement>` | Read-only. The items that scroll: the elements you added. The container's `Children` are its view and scroll bars. A live view. |
| `ContentMargin` | `Margin` | Read-only. The current offset of the content in the view: `Left` and `Top` are 0 or negative while it is scrolled. |
| `ScrollAreaWidth` | `float` | Read-only. How far the content can scroll sideways, in units: its width less the view's width (0 or less while it fits). |
| `ScrollAreaHeight` | `float` | Read-only. How far the content can scroll down, in units: its height less the view's height (0 or less while it fits). |

### ScrollableContainer methods

| Method | Description |
| --- | --- |
| `ScrollableContainer(string name = null)` | Creates a scrollable container. The name is used by `GetElementByName`. |
| `AddItem(BaseElement item)` | Adds the item to the view. |
| `AddItemAt(BaseElement item, int index)` | Inserts the item at the index. |
| `AddItemsRange(IEnumerable<BaseElement> items)` | Adds the items at the end. |
| `AddItemsRangeAt(IEnumerable<BaseElement> items, int index)` | Inserts the items from the index on. |
| `RemoveItem(BaseElement item)` | Removes the item. It is detached, not disposed. |
| `RemoveItemAt(int index)` | Removes the item at the index. |
| `RemoveItemsRangeAt(int index, int count)` | Removes `count` items from the index on. |
| `ClearItems()` | Removes every item. |
| `PageUp()` | Scrolls up by one view height. Does nothing while the content fits. |
| `PageDown()` | Scrolls down by one view height. Does nothing while the content fits. |
| `PageLeft()` | Scrolls left by one view width. Does nothing while the content fits. |
| `PageRight()` | Scrolls right by one view width. Does nothing while the content fits. |
| `HorizontalPageIncrease()`, `HorizontalPageDecrease()` | Obsolete: use `PageRight` and `PageLeft`. |
| `VerticalPageIncrease()`, `VerticalPageDecrease()` | Obsolete: use `PageUp` and `PageDown`. The old names followed the vertical scroll bar's value, which grows upwards, so "increase" scrolled up. |

`ScrollBars`:

| Value | Meaning |
| --- | --- |
| `None` | No scroll bars and no wheel scrolling; scrolling from code still works. |
| `Vertical` | A vertical bar at the right while the content is taller than the view. |
| `Horizontal` | A horizontal bar at the bottom while the content is wider than the view. |
| `Both` | Each bar while it is needed. |

Style class: `ScrollableContainerStyle` (the five dependency properties above; its default is
`InheritState.FromChildren`, see [styles](/docs/ui-styles/)).

## Border

A frame around one `Content` element, drawn in a solid colour or from eight textures.

<figure class="shot">
  <img src="{{ '/assets/img/ui/layout-border.png' | relative_url }}" width="416" height="78" alt="A label in a thin golden frame, and a Section title label underlined by an orange rule">
  <figcaption>A frame on every side, and a border with only a bottom side.</figcaption>
</figure>

```csharp
var framed = new Border("framed")
{
    Thickness = 2,                                 // the same on every side
    // the content's inset, instead of the thickness
    Padding = 14,
    ForegroundColor = new Color(233, 194, 122),    // the frame
    BackgroundColor = new Color(40, 31, 23),       // behind the content
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16),
    Content = new Label { Text = "Framed content" }
};

var underlined = new Border("underlined")
{
    // left, top, right, bottom: a bottom rule only
    Thickness = (0, 0, 0, 3),
    Padding = (4, 4, 4, 8),
    ForegroundColor = new Color(242, 140, 40),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (260, 26),
    Content = new Label { Text = "Section title", FontSize = 20 }
};

ui.AddElementToRoot(framed);
ui.AddElementToRoot(underlined);
```

The frame is made of four corners and four sides, as thick as `Thickness` says per side; a side with a thickness of 0
isn't drawn, and a corner is drawn only where both of its sides are. The content sits inside the `Padding` when there
is one and inside the `Thickness` otherwise, so a padding smaller than the thickness lets the content overlap the
frame. A border without a size fits its content plus that inset.

Without textures the frame is drawn in `ForegroundColor`. `BackgroundColor` fills only the content area, not the frame.
With `TexturesPath` set (e.g. `"UITextures/Border/"`), the parts are drawn from the textures `LeftTop`, `RightTop`,
`LeftBottom`, `RightBottom` (the corners) and `Left`, `Right`, `Top`, `Bottom` (the sides) in that folder, each
stretched over its part.

A border has no items: the item methods do nothing on it. A replaced content you gave is detached, not disposed, and a
content that is disposed is cleared from `Content`.

### Border properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`Content`</span> | `BaseElement` | The element inside the frame. A style can't set it. |
| <span class="dp">`Thickness`</span> | `Margin` | The width of the frame per side (`Left`, `Top`, `Right`, `Bottom`), in units. |
| <span class="dp">`Padding`</span> | `Margin?` | The inset of the content from the border's edges, used instead of `Thickness`. Null (the default) insets the content by the thickness. |

### Border methods

| Method | Description |
| --- | --- |
| `Border(string name = null)` | Creates a border. The name is used by `GetElementByName`. |

### ContentContainer

The single-element holder that `Border` (and a few controls, such as the check box) keep their content in, and the base
class of `Separator`. It doesn't take the mouse and shows the mouse cursors of the element it belongs to.

| Property | Type | Description |
| --- | --- | --- |
| `Content` | `BaseElement` | Read-only. The element the container holds: its first item, or null. |
| `MouseCursorsSet` | `MouseCursorsSet` | Read-only. The cursors of the container's parent, so the container shows the cursors of its control. |

| Method | Description |
| --- | --- |
| `ContentContainer(string name = null)` | Creates a content container. The name is used by `GetElementByName`. |

Style class: `BorderStyle` (`Thickness` and `Padding`, see [styles](/docs/ui-styles/)). A window's frame is styled with
one too.

## Separator

An empty element to draw a dividing line or leave a gap: give it a size along one side, stretch it along the other,
and it fills itself with its `BackgroundColor`.

<figure class="shot">
  <img src="{{ '/assets/img/ui/layout-separator.png' | relative_url }}" width="254" height="137" alt="An inventory list divided by two thin horizontal lines, a golden one and a dark one">
  <figcaption>Two separators in a vertical stack panel.</figcaption>
</figure>

```csharp
var panel = new StackPanel
{
    Orientation = Orientation.Vertical,
    DesiredWidth = 220,
    Margin = (16, 16)
};

panel.AddItem(new Label { Text = "Inventory" });
panel.AddItem(new Separator
{
    DesiredHeight = 1,
    Margin = (0, 8),
    BackgroundColor = new Color(168, 131, 74)
});
panel.AddItem(new Label { Text = "Torch x 3", Margin = (0, 8) });
panel.AddItem(new Label { Text = "Rope x 1", Margin = (0, 4) });
panel.AddItem(new Separator
{
    DesiredHeight = 1,
    Margin = (0, 8),
    BackgroundColor = new Color(70, 56, 42)
});
panel.AddItem(new Label { Text = "Gold  120", Margin = (0, 8) });

ui.AddElementToRoot(panel);
```

A separator is a [`ContentContainer`](#contentcontainer) with nothing in it. It doesn't take the mouse
(`HitTest` is off).

### Separator methods

| Method | Description |
| --- | --- |
| `Separator(string name = null)` | Creates a separator. The name is used by `GetElementByName`. |

A separator has no style class of its own.

## Window

A frame with a title bar and a content area. The user moves it by its title bar, and it can be modal.

<figure class="shot">
  <img src="{{ '/assets/img/ui/layout-window.png' | relative_url }}" width="410" height="240" alt="A Hints window with a title bar, an x close button and a checked Show hints check box">
  <figcaption>A resizable window with the default title bar.</figcaption>
</figure>

```csharp
var body = new StackPanel { Orientation = Orientation.Vertical, Margin = (14, 12) };

body.AddItem(new Label { Text = "Drag the title bar to move the window," });
body.AddItem(new Label { Text = "pull its edges to resize it.", Margin = (0, 4) });
body.AddItem(new CheckBox
{
    Text = "Show hints",
    DesiredHeight = 22,
    Checked = true,
    Margin = (0, 14)
});

var window = new Window("hints")
{
    DesiredWidth = 360,
    DesiredHeight = 190,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (24, 24),
    IsResizable = true,
    Content = body
};

var titleBar = (DefaultWindowTitleBar)window.TitleBar;
titleBar.Title.Text = "Hints";
titleBar.CloseButton.Text = "x";

ui.AddElementToRoot(window);
window.Show();
```

The window is a border (styled by `BorderStyle`) around two rows: the title bar, as tall as it is, and the content
area, which takes the rest. A window without a size fits its content and title bar. Nothing inside a window is drawn
outside it.

**Moving.** Dragging the title bar with the left button moves the window by changing its `Margin`: the left and top
margins grow by the mouse movement and the right and bottom ones shrink by it, so a stretched window keeps its size and
a centred one follows the mouse. `IsResizable`, from the [base element](/docs/ui-base-element/), lets the user resize
it by its edges.

**Showing and hiding.** A window is visible when created. `Show()` and `Hide()` set its `Visibility` to `Visible` and
`Hidden`; the default title bar's close button calls `Hide()`. A window is drawn above its siblings and gets the mouse
before them, and of several shown windows the one shown last is on top.

**Modal windows.** With `IsModal` on, a shown window in the tree is drawn above the whole UI, over a shade of
everything below it (the shade's colour is `BaseElement.ModalWindowActiveShadeTint`, black at an alpha of 75 by
default), and only that window and what is inside it get the mouse. The elements it sits in don't clip it. Modal
windows stack: the one shown last is on top, and hiding it gives the mouse back to the one below. The
[pause menu on the UI page](/docs/ui/#a-pause-menu) is a complete modal window, closed by Escape.

### Window properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`BorderStyle`</span> | `BorderStyle` | The style of the window's frame: its `Thickness`, `Padding`, frame colour (`ForegroundColor`), content area colour (`BackgroundColor`) and `TexturesPath`. The window follows changes made to the style object later. |
| <span class="dp">`TitleBar`</span> | `BaseElement` | The element in the title row. The default is a [`DefaultWindowTitleBar`](#defaultwindowtitlebar); set your own element to replace it, and clear the value to get the default one back. A replaced title bar is detached, not disposed. A style can't set it. |
| <span class="dp">`Content`</span> | `BaseElement` | The element in the content area. A replaced content is detached, not disposed, and a disposed one is cleared. A style can't set it. |
| <span class="dp">`IsModal`</span> | `bool` | Makes the window modal: drawn above everything over a shade, and the only part of the UI that gets the mouse while shown. Off by default. |

### Window methods

| Method | Description |
| --- | --- |
| `Window(string name = null)` | Creates a window with the default title bar. The name is used by `GetElementByName`. |
| `Show()` | Makes the window visible. A hidden window shown this way goes on top of the other shown windows (of the modal ones when it is modal). |
| `Hide()` | Hides the window (`Visibility.Hidden`). |

A window has no items: the item methods do nothing on it.

### DefaultWindowTitleBar

The title bar every window starts with: a `Background` image filling the bar, a centred `Title` text and a
`CloseButton` at the right. In a window it is `DefaultSettings.DefaultWindowTitleThickness` tall (30 units by
default), and its close button is always 4 units smaller than that, square. The bar's colour comes from
`DefaultSettings.DefaultWindowTitleBarColor` (see [styles](/docs/ui-styles/)). Reach the parts through the window:

```csharp
var titleBar = (DefaultWindowTitleBar)window.TitleBar;
titleBar.Title.Text = "Inventory";
titleBar.Background.BackgroundColor = new Color(40, 31, 23);
titleBar.OnCloseButtonClickAction = () => window.Hide();
```

| Property | Type | Description |
| --- | --- | --- |
| `Title` | `RichTextBox` | Read-only. The title text, centred in the bar. Set its `Text` and text style properties. |
| `CloseButton` | `Button` | Read-only. The close button at the right of the bar. It shows no text until you set its `Text` or `Content`. |
| `Background` | `Image` | Read-only. The image that fills the bar and holds the title and the close button. Its `BackgroundColor` is the bar's colour. |
| `OnCloseButtonClickAction` | `Action` | What a click on the close button does. In a window's default title bar it is the window's `Hide`. |

| Method | Description |
| --- | --- |
| `DefaultWindowTitleBar(string name = null)` | Creates a title bar, for example to use in a window of your own. Its close button does nothing until `OnCloseButtonClickAction` is set. |

Style class: `WindowStyle` (`BorderStyle` and `IsModal`; its default `BorderStyle` has the `BackgroundColor`
`DefaultSettings.DefaultWindowBackgroundColor`, the `Thickness` `DefaultSettings.DefaultWindowBorderThickness` (2) and
the `ForegroundColor` `DefaultSettings.DefaultWindowBorderColor`, see [styles](/docs/ui-styles/)).

## TabControl

Not an element but a helper: it pairs tab elements with content elements and shows only the content of the open tab.
You place the tabs and the contents yourself, for example buttons in a stack panel and the pages in one grid cell.

<figure class="shot">
  <img src="{{ '/assets/img/ui/layout-tabcontrol.png' | relative_url }}" width="434" height="186" alt="Three tab buttons, General, Audio and Video, above a panel showing the text of the open tab">
  <figcaption>Three toggle buttons as tabs over one page area.</figcaption>
</figure>

```csharp
var tabRow = new StackPanel { Orientation = Orientation.Horizontal, Margin = (16, 16) };
var pages = new Grid
{
    DesiredWidth = 400,
    DesiredHeight = 110,
    Margin = (16, 58),
    BackgroundColor = new Color(40, 31, 23)
};

pages.AddColumnDefinition(1.0f);
pages.AddRowDefinition(1.0f);

var tabs = new TabControl();
var tabButtons = new List<Button>();

// only the open tab's page is shown; the toggle color marks the open tab
// (subscribed first: adding the first tab opens it)
tabs.OnTabOpened += (_, tab) =>
{
    foreach (var tabButton in tabButtons) tabButton.ToggledOn = tabButton == tab;
};

foreach (var (title, text) in new[]
{
    ("General", "Language, subtitles"),
    ("Audio", "Music and effects volume"),
    ("Video", "Resolution, full screen")
})
{
    var tabButton = new Button
    {
        Text = title,
        Type = ButtonType.Toggle,
        DesiredWidth = 110,
        DesiredHeight = 34,
        Margin = (tabButtons.Count == 0 ? 0 : 6, 0)
    };
    var page = new Label { Text = text, TextMargin = 14 };

    tabButtons.Add(tabButton);
    tabRow.AddItem(tabButton);
    pages.AddItem(page);
    tabs.AddTab(tabButton, page);
}

tabs.OpenTab(tabButtons[1]);

ui.AddElementToRoot(tabRow);
ui.AddElementToRoot(pages);
```

The first tab added opens at once. After that, a tab opens when it is pressed with the left button, or with
`OpenTab`. The contents of the other tabs are set to `Visibility.Hidden`, so they keep their space in the layout. The
tab control doesn't change how a tab looks: mark the open one in `OnTabOpened`, for example by setting `ToggledOn` on
toggle buttons. Subscribe before adding the first tab if you want its opening too.

Removing the open tab opens its neighbour (the next one when the first tab was removed, the previous one otherwise),
and a content no tab uses anymore is made visible again. A tab or content that is disposed leaves the control by
itself. `Dispose()` (from [`DisposableBase`](/docs/ui-base-element/)) stops the control listening to its tabs.

### TabControl properties

None of these are dependency properties.

| Property | Type | Description |
| --- | --- | --- |
| `CurrentTab` | `BaseElement` | Read-only. The open tab, or null when there is none. |
| `CurrentOpenedContent` | `BaseElement` | Read-only. The content of the open tab, the only one shown, or null. |

### TabControl events

| Event | Handler | Raised when |
| --- | --- | --- |
| `OnTabOpened` | `(TabControl sender, BaseElement tab)` | Another tab opens: pressed, opened with `OpenTab`, the first one added, or the neighbour of a removed open tab. `tab` is null when the last tab was removed. |

### TabControl methods

| Method | Description |
| --- | --- |
| `TabControl()` | Creates a tab control without tabs. |
| `AddTab(BaseElement tab, BaseElement content)` | Adds a tab and its content; the content is hidden unless this is the first tab. Adding a tab again replaces its content. Null arguments are ignored. |
| `RemoveTab(BaseElement tab)` | Removes the tab. When it was open, its neighbour opens. Its content is visible again. |
| `OpenTab(BaseElement tab)` | Opens the tab, showing its content and hiding the open one. Does nothing for an element that isn't a tab of this control. |

The tab control has no style class.
