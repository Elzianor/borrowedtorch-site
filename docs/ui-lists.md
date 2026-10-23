---
layout: docs
legend: [prop, dp, method, event]
title: "UI: lists and menus"
description: List boxes, combo boxes, tree views and context menus, with selection, data sources, virtualization and keyboard control.
---

Every element here has all the properties, events and methods of [`BaseElement`](/docs/ui-base-element/), which the
tables below don't repeat. Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>: `Foo` is backed by
`FooDP`, which a style, a binding or an animation can set (see [styles, bindings and animation](/docs/ui-styles/)).
Screenshots use the theme from [styles](/docs/ui-styles/#the-theme-of-these-pages).

The keyboard reaches these elements from the game window you give <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/">`BorrowedTorchUI`</a> (see the [quick start guide](/docs/ui/)):
a key goes to the element that has the keyboard first, then to the elements around it until one uses it.

## ListBox

A scrollable list of rows with single or multiple selection. A row can be a text, any element, or an object of an
<a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a>, and long lists can be virtualized so only the rows in view have elements.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-listbox-single.png' | relative_url }}" width="254" height="210" alt="A list of text rows with Desert selected, a separator line and a check box row, with a vertical scroll bar">
  <figcaption>A single selection list with a separator and a check box row.</figcaption>
</figure>

```csharp
var levels = new ListBox("levels")
{
    DesiredWidth = 220,
    DesiredHeight = 176,
    Margin = 16,
    ScrollableContainerStyle = new ScrollableContainerStyle
    {
        ScrollBars = ScrollBars.Vertical,
        ScrollBarsThickness = 10
    }
};

levels.AddTextItems(["Forest", "Desert", "Mountains", "Swamp"]);
levels.AddItem(new Separator
{
    DesiredHeight = 1,
    BackgroundColor = new Color(168, 131, 74)
});
levels.AddItem(new CheckBox
{
    Text = "Any element as a row",
    DesiredHeight = 22,
    Margin = (6, 3)
});
levels.AddTextItems(["Caves", "Ruins"]);
levels.SelectAt(1);
levels.OnItemSelect += (sender, item) => Console.WriteLine($"Level {item?.Index}");

ui.AddElementToRoot(levels);
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-listbox-multiple.png' | relative_url }}" width="254" height="210" alt="A list of five rows with Fire, Ice and Shadow selected">
  <figcaption>A multiple selection list: three rows of five selected.</figcaption>
</figure>

```csharp
// several rows at once: Shift and Ctrl clicks, SelectAll, DeselectAt
var tags = new ListBox("tags")
{
    SelectionMode = ListBoxSelectionMode.Multiple,
    DesiredWidth = 220,
    DesiredHeight = 176,
    Margin = 16
};

tags.AddTextItems(["Fire", "Ice", "Poison", "Lightning", "Shadow"]);
tags.SelectAll();
tags.DeselectAt(2);
tags.DeselectAt(3);

ui.AddElementToRoot(tags);
```

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#addtextitem">`AddTextItem`</a> adds a text row (a [`Label`](/docs/ui-text/#label) is made for it when the row gets an element), and
<a class="ref method" href="/docs/ui-glossary/elements/list-box/#addtextitems">`AddTextItems`</a> adds many in one batch. <a class="ref method" href="/docs/ui-glossary/elements/list-box/#additem">`AddItem`</a> takes any element: a <a class="ref" href="/docs/ui-glossary/elements/list-box-item/">`ListBoxItem`</a> you made is used as the row
itself, any other element is shown in a row the list makes around it. A [`Separator`](/docs/ui-layout/#separator) row
can't be selected and the keyboard passes over it. The rows are stretched to the width of the list. Removing a row
detaches the elements you added (they are not disposed); the rows and contents the list made are disposed. An element
of yours that is disposed while in the list takes its row with it.

Rows are drawn in <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#normalitemcolor">`NormalItemColor`</a>, or alternately in <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#normalitemcolor">`NormalItemColor`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#alternativeitemcolor">`AlternativeItemColor`</a> with
<a class="ref dp" href="/docs/ui-glossary/elements/list-box/#usedualcolors">`UseDualColors`</a>, and change to <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#hoveritemcolor">`HoverItemColor`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#presseditemcolor">`PressedItemColor`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selecteditemcolor">`SelectedItemColor`</a> when those are set. A
press on the list (a row or a scroll bar) gives it the keyboard. Setting <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a> to `false` stops the rows and the
scroll bars from taking the mouse as well.

### Selection

The selection has a primary row: <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selecteditem">`SelectedItem`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selectedindex">`SelectedIndex`</a> point at it, and <a class="ref event" href="/docs/ui-glossary/elements/list-box/#onitemselect">`OnItemSelect`</a> reports it. In
`Single` mode it is the only selected row. In `Multiple` mode other rows can be selected with it:

- a click selects only the clicked row;
- Ctrl + click adds the row to the selection (it becomes the primary row) or removes a selected row;
- Shift + click selects the range from the primary row to the clicked row, the primary row stays where it was.

The same keys work with the keyboard (Ctrl + Down adds the next row, Shift + Down extends the range). A selection made
in code (<a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectat">`SelectAt`</a>, <a class="ref method" href="/docs/ui-glossary/elements/list-box/#select">`Select`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selectedindex">`SelectedIndex`</a>, <a class="ref method" href="/docs/ui-glossary/elements/list-box/#moveselection">`MoveSelection`</a>) replaces the selection whatever keys are held;
<a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectall">`SelectAll`</a> and <a class="ref method" href="/docs/ui-glossary/elements/list-box/#deselectat">`DeselectAt`</a> change it row by row. <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selectedindices">`SelectedIndices`</a> and <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selectedsources">`SelectedSources`</a> list every selected row,
<a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selecteditems">`SelectedItems`</a> only the selected rows that have an element.

### Items from data

Set <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a> to a collection to get a row per object, with an element made by <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#itemstemplate">`ItemsTemplate`</a> (a label with the
object's text when none is set). A [`BindableCollection<T>`](/docs/ui-styles/#bindings) is followed: objects added
to or removed from it add or remove their rows. Each row's `Source` is its object, and <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectsource">`SelectSource(object)`</a> selects
the row of an object. When the rows are built again (another collection or template) the objects that are still there
stay selected. With an <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selecteditem">`SelectedItem`</a> can be bound to a property that holds the selected object rather
than the row. <a class="ref method" href="/docs/ui-glossary/elements/list-box/#addtextitem">`AddTextItem`</a> and <a class="ref method" href="/docs/ui-glossary/elements/list-box/#addtextitems">`AddTextItems`</a> do nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a> is set. See
[bindings](/docs/ui-styles/#bindings) for templates and binding the selection.

### Virtualization

With <code>VirtualizationMode = <a href="/docs/ui-glossary/types/list-box-virtualization-mode/#fixed">ListBoxVirtualizationMode.Fixed</a></code> and an <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> above 0, every row is <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a>
units high and only the rows in view, three rows above and below them, and the primary selected row get elements.
The rows are kept as light records, so lists of hundreds of thousands of rows fill quickly. Row elements that scroll
out of view are reused for the rows that come in: a template that implements <a class="ref" href="/docs/ui-glossary/types/i-recycling-items-template/">`IRecyclingItemsTemplate`</a> (the default
text template does) updates the content it made, other contents are made again. Elements you added with <a class="ref method" href="/docs/ui-glossary/elements/list-box/#additem">`AddItem`</a> are
detached while out of view and attached again when they come back, never disposed.

In `Fixed` mode <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#items">`Items`</a>, <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selecteditems">`SelectedItems`</a> and the rows passed to <a class="ref event" href="/docs/ui-glossary/elements/list-box/#onitemsselect">`OnItemsSelect`</a> only cover the rows that have an
element. <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#count">`Count`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selectedindex">`SelectedIndex`</a>, <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selectedindices">`SelectedIndices`</a>, <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selectedsources">`SelectedSources`</a> and <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectsource">`SelectSource`</a> work on every row, and
<a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selecteditem">`SelectedItem`</a> is always a live element because the primary row keeps its element. Collapsed rows still take their
<a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a>, and the width of the content grows with the widest row seen so far.

```csharp
var log = new ListBox("log")
{
    DesiredWidth = 400,
    DesiredHeight = 300,
    VirtualizationMode = ListBoxVirtualizationMode.Fixed,
    ItemHeight = 22
};
log.AddTextItems(Enumerable.Range(0, 200_000).Select(i => $"Line {i}"));
log.SelectAt(199_999);
```

### Scrolling and keyboard

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#scrollintoview">`ScrollIntoView(index)`</a> scrolls a laid out list just enough to show the whole row. <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectnext">`SelectNext`</a>, <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectprevious">`SelectPrevious`</a> and
<a class="ref method" href="/docs/ui-glossary/elements/list-box/#moveselection">`MoveSelection(delta)`</a> select a row and scroll it into view; they pass over separators and collapsed rows.
<a class="ref prop" href="/docs/ui-glossary/elements/list-box/#rowsperpage">`RowsPerPage`</a> is the number of rows that fit the view.

A list that has the keyboard (it was pressed, or given <a class="ref method" href="/docs/ui-glossary/elements/base-element/#focus">`Focus()`</a>) reacts to these keys:

| Key | Effect |
| --- | --- |
| Up, Down | Selects the previous or next row. With no selection, Down selects the first row and Up the last. |
| Page Up, Page Down | Moves the selection by <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#rowsperpage">`RowsPerPage`</a> rows. |
| Home, End | Selects the first or last row. |

Ctrl and Shift held with these keys work as with clicks in `Multiple` mode.

### ListBox properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selectionmode">`SelectionMode`</a> | <a class="ref" href="/docs/ui-glossary/types/list-box-selection-mode/">`ListBoxSelectionMode`</a> | Whether one row or several rows can be selected. `Single` by default. |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selecteditem">`SelectedItem`</a> | <a class="ref" href="/docs/ui-glossary/elements/list-box-item/">`ListBoxItem`</a> | The primary selected row, `null` when nothing is selected. Setting it selects that row; `null` clears the selection. |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selectedindex">`SelectedIndex`</a> | `int` | The index of the primary selected row, `-1` when nothing is selected. Setting it selects that row (the value is clamped to the rows); a negative value clears the selection. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selecteditems">`SelectedItems`</a> | <code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a>&gt;</code> | Read-only. The selected rows that have an element (see <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#items">`Items`</a>). |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selectedindices">`SelectedIndices`</a> | `IReadOnlyList<int>` | Read-only. The indices of all selected rows, with an element or not. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selectedsources">`SelectedSources`</a> | `IReadOnlyList<object>` | Read-only. The source objects of all selected rows, `null` for rows added as elements or text. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#count">`Count`</a> | `int` | Read-only. The number of rows, in every virtualization mode. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#items">`Items`</a> | <code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a>&gt;</code> | Read-only. The rows that have an element, in order: every row in `None` mode, the rows around the view and the primary selected row in `Fixed` mode. A live view, don't keep it across changes. |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a> | `IEnumerable` | The objects to show, one row each. A <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is followed. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#itemstemplate">`ItemsTemplate`</a> | <a class="ref" href="/docs/ui-glossary/types/i-items-template/">`IItemsTemplate`</a> | Makes the element of each <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a> object; a label with the object's text when none is set. Changing it builds the rows again. |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#usedualcolors">`UseDualColors`</a> | `bool` | Alternates the background of unselected rows: <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#normalitemcolor">`NormalItemColor`</a> for even indices, <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#alternativeitemcolor">`AlternativeItemColor`</a> for odd ones. |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#normalitemcolor">`NormalItemColor`</a> | `Color` | The background of an unselected row (of the even rows with <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#usedualcolors">`UseDualColors`</a>). |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#alternativeitemcolor">`AlternativeItemColor`</a> | `Color` | The background of the odd unselected rows while <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#usedualcolors">`UseDualColors`</a> is set. |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#hoveritemcolor">`HoverItemColor`</a> | `Color?` | The background of the row under the mouse. When `null` the row keeps its normal or selected colour. |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#presseditemcolor">`PressedItemColor`</a> | `Color?` | The background of a row while the left button is pressed on it. When `null` it doesn't change. |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#selecteditemcolor">`SelectedItemColor`</a> | `Color?` | The background of a selected row. When `null` a selected row keeps the colour it had. |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#scrollablecontainerstyle">`ScrollableContainerStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a> | The style of the [scrollable container](/docs/ui-layout/#scrollablecontainer) around the rows, for example its scroll bars and their thickness. |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#virtualizationmode">`VirtualizationMode`</a> | <a class="ref" href="/docs/ui-glossary/types/list-box-virtualization-mode/">`ListBoxVirtualizationMode`</a> | Whether every row has an element (`None`, the default) or only the rows around the view (`Fixed`). |
| <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> | `int` | The height of every row in `Fixed` mode, in units. `Fixed` mode has no effect while it is 0 or less. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#rowsperpage">`RowsPerPage`</a> | `int` | Read-only. The number of rows that fit the view, at least one: the view's height divided by <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> in `Fixed` mode, by the average row height otherwise. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#contentwidth">`ContentWidth`</a> | `int` | Read-only. The width of the widest row content, in units (in `Fixed` mode the widest seen since the rows were cleared). |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#contentheight">`ContentHeight`</a> | `int` | Read-only. The height of all the shown rows together, in units (<a class="ref prop" href="/docs/ui-glossary/elements/list-box/#count">`Count`</a> times <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> in `Fixed` mode). |

### ListBox events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/list-box/#onitemselect">`OnItemSelect`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a> item)</code> | The primary selection is set, by the user or from code. `item` is `null` when nothing is selected any more. |
| <a class="ref event" href="/docs/ui-glossary/elements/list-box/#onitemsselect">`OnItemsSelect`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a>&gt; items)</code> | The set of selected rows changes. `items` is <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selecteditems">`SelectedItems`</a>, the selected rows that have an element. |

### ListBox methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#listbox">`ListBox(string name = null)`</a> | Creates a list box. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Adds a row at the end. A <a class="ref" href="/docs/ui-glossary/elements/list-box-item/">`ListBoxItem`</a> is the row itself, any other element is shown in a row the list makes. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> | Inserts a row at the index (0 to <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#count">`Count`</a>); another index is ignored. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> | Adds a row per element at the end, in one batch (the rows are indexed and laid out once). |
| <span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> | Inserts a row per element at the index, in one batch. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#addtextitem">`AddTextItem(string text)`</a> | Adds a text row. Does nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a> is set. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#addtextitems">`AddTextItems(IEnumerable<string> texts)`</a> | Adds a text row per string, in one batch. Does nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a> is set. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Removes the row of the item (the row itself or the element shown in it). |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#removeitemat">`RemoveItemAt(int index)`</a> | Removes the row at the index. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> | Removes `count` rows from the index on (as many as there are). |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#clearitems">`ClearItems()`</a> | Removes every row. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#select">Select</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Selects the row of the item (the row itself or the element shown in it), as <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectat">`SelectAt`</a> does. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#deselect">Deselect</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Deselects the row of the item, as <a class="ref method" href="/docs/ui-glossary/elements/list-box/#deselectat">`DeselectAt`</a> does. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectat">`SelectAt(int index)`</a> | Makes the row at the index the selected row; the other rows are deselected, also in `Multiple` mode. An index out of range is ignored. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#deselectat">`DeselectAt(int index)`</a> | Deselects the row at the index. If it was the primary row, the first row that is still selected becomes the primary one. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectsource">`SelectSource(object source)`</a> | Selects the row whose `Source` is the object. Nothing happens when there is none. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectall">`SelectAll()`</a> | Selects every row except separators; the last one becomes the primary row. In `Single` mode it selects the first selectable row, and only when nothing is selected. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#deselectall">`DeselectAll()`</a> | Deselects every row. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectprevious">`SelectPrevious()`</a> | Selects the previous row (separators and collapsed rows passed over) and scrolls it into view. Does nothing without a selection. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectnext">`SelectNext()`</a> | Selects the next row (separators and collapsed rows passed over) and scrolls it into view. Does nothing without a selection. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#moveselection">`MoveSelection(int delta)`</a> | Moves the selection by `delta` rows (clamped to the list, separators and collapsed rows passed over) and scrolls it into view. With no selection it selects the first row (`delta` above 0) or the last. |
| <a class="ref method" href="/docs/ui-glossary/elements/list-box/#scrollintoview">`ScrollIntoView(int index)`</a> | Scrolls the list so the row at the index is entirely in view. Needs the list laid out; nothing happens for a row that is in view already. |

#### `ListBoxSelectionMode`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/list-box-selection-mode/#single">`Single`</a> | One row at most is selected. |
| <a class="ref" href="/docs/ui-glossary/types/list-box-selection-mode/#multiple">`Multiple`</a> | Several rows can be selected, with Ctrl and Shift clicks or from code. |

#### `ListBoxVirtualizationMode`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/list-box-virtualization-mode/#none">`None`</a> | Every row has its own element. |
| <a class="ref" href="/docs/ui-glossary/types/list-box-virtualization-mode/#fixed">`Fixed`</a> | Every row is <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> high and only the rows in view, plus a small buffer, have elements, reused while scrolling. |

Style class: <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> (the same properties except <span class="dp">`SelectedItem`</span>, <span class="dp">`SelectedIndex`</span> and <span class="dp">`ItemsSource`</span>, see
[styles](/docs/ui-styles/)).

### ListBoxItem

A row of a list box. The list makes the rows for texts, elements and source objects; you can also make a
`ListBoxItem` yourself and add it, to keep the row element. The list only detaches such a row when it is removed or
scrolls out of view in `Fixed` mode, and never disposes it. In a `Fixed` mode list it is <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> high and gets
its own height back when it leaves the list. A row added with <a class="ref prop" href="/docs/ui-glossary/elements/list-box-item/#isselected">`IsSelected`</a> set joins the selection.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box-item/#isselected">`IsSelected`</a> | `bool` | Whether the row is selected. Setting it on a row in a list selects it as <span class="method">`SelectAt`</span> does, or deselects it as <span class="method">`DeselectAt`</span> does. A separator row is never selected. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box-item/#index">`Index`</a> | `int` | Read-only. The row's index in the list. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box-item/#source">`Source`</a> | `object` | Read-only. The <span class="dp">`ItemsSource`</span> object the row shows, `null` for a row added as an element or text. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box-item/#content">`Content`</a> | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | Read-only. The element the row shows. |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box-item/#contentwidth">`ContentWidth`</a> | `int` | Read-only. The natural width of the content, in units (the row itself is stretched to the list's width). |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box-item/#contentheight">`ContentHeight`</a> | `int` | Read-only. The row's height, in units: its content's, or its own desired height (<a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> in a `Fixed` mode list). |
| <a class="ref prop" href="/docs/ui-glossary/elements/list-box-item/#mousecursorsset">`MouseCursorsSet`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | Read-only. The mouse cursors of the list the row is in. |

| Method | Description |
| --- | --- |
| <span class="method"><code><a href="/docs/ui-glossary/elements/list-box-item/#listboxitem">ListBoxItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> content, <a href="/docs/ui-glossary/elements/list-box/">ListBox</a> parentListBox, string name = null)</code></span> | Creates a row showing the content. `parentListBox` gives the row its colours until it is in a list; from then on the list it is in counts. |

## ComboBox

A selection image, a toggle button and a drop-down list box: the closed combo box shows the selected row, the open
one lists all rows to choose from.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-combobox.png' | relative_url }}" width="254" height="168" alt="A combo box showing 1920 x 1080 next to an orange v button, with its drop-down list open below it listing four resolutions">
  <figcaption>An open combo box with the third row selected.</figcaption>
</figure>

```csharp
var resolution = new ComboBox("resolution")
{
    DesiredWidth = 220,
    DesiredHeight = 30,
    ToggleButtonStyle = new ButtonStyle { DesiredWidth = 30, Text = "v" },
    Margin = (16, 16)
};

resolution.AddTextItem("1280 x 720");
resolution.AddTextItem("1600 x 900");
resolution.AddTextItem("1920 x 1080");
resolution.AddTextItem("2560 x 1440");
resolution.SelectAt(2);
resolution.OnItemSelect += (sender, item) =>
    Console.WriteLine($"Resolution {item?.Index}");

ui.AddElementToRoot(resolution);
```

Rows are added and selected as in a [`ListBox`](#listbox) in `Single` mode: <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#addtextitem">`AddTextItem`</a>, <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#additem">`AddItem`</a>, or
<a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> with an <a class="ref prop" href="/docs/ui-glossary/elements/combo-box/#itemstemplate">`ItemsTemplate`</a>. `SelectedItemDP`, `SelectedIndexDP` and `ItemsSourceDP` are the drop-down
list's own properties, so a binding to them works as on a list box.

The selection image is a picture of the selected row's content, drawn at its natural size at the left of the combo
box and centred vertically. It keeps the side margins the content has in its row (5 units for a text row), so the
chosen value lines up with the rows of the list. It is a texture, so it is not made without a graphics device (for
example in tests).

A press on the combo box, on its selection image or on its toggle button, opens or closes the list. The list opens
below the combo box, at least as wide as it. When it doesn't fit below, it opens on the side with more room, and its
height is limited to that room. A left or right press anywhere outside the combo box and its list closes it, and so
does removing the combo box from the tree.

The open list has the keyboard. Up, Down, Page Up, Page Down, Home and End move the selection and keep the list open;
Enter or Escape closes it. A click on a row selects it and closes the list (also a click on the row that is selected
already). A selection made in code closes an open list as well.

### ComboBox properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/combo-box/#items">`Items`</a> | <code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a>&gt;</code> | Read-only. The rows of the drop-down list that have an element (see the list box's <a class="ref prop" href="/docs/ui-glossary/elements/combo-box/#items">`Items`</a>). |
| <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> | `IEnumerable` | The objects to show, one row each. A <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is followed. |
| <a class="ref prop" href="/docs/ui-glossary/elements/combo-box/#itemstemplate">`ItemsTemplate`</a> | <a class="ref" href="/docs/ui-glossary/types/i-items-template/">`IItemsTemplate`</a> | Makes the element of each <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> object; a label with the object's text when none is set. |
| <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#selecteditem">`SelectedItem`</a> | <a class="ref" href="/docs/ui-glossary/elements/list-box-item/">`ListBoxItem`</a> | The selected row, `null` when nothing is selected. Setting it selects that row. |
| <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#selectedindex">`SelectedIndex`</a> | `int` | The index of the selected row, `-1` when nothing is selected. |
| <a class="ref prop" href="/docs/ui-glossary/elements/combo-box/#selectedsource">`SelectedSource`</a> | `object` | Read-only. The <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> object of the selected row, `null` without one. |
| <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#selectionstyle">`SelectionStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> | The style of the image that shows the selected row. The image is only as large as the row's content, so a background colour here lies just behind the chosen value; the combo box's own <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> colours the whole field. |
| <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#togglebuttonstyle">`ToggleButtonStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a> | The style of the [button](/docs/ui-controls/#button) that opens and closes the list, for example its width and text. |
| <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#listboxstyle">`ListBoxStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> | The style of the drop-down list, for example its row colours. |

### ComboBox events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/combo-box/#onitemselect">`OnItemSelect`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a> item)</code> | The selection changes, by the user or from code. The sender is the combo box, `item` a row of its drop-down list, `null` when nothing is selected any more. |

### ComboBox methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#combobox">`ComboBox(string name = null)`</a> | Creates a combo box. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Adds a row at the end of the list. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> | Inserts a row at the index. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> | Adds a row per element at the end, in one batch. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> | Inserts a row per element at the index, in one batch. |
| <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#addtextitem">`AddTextItem(string text)`</a> | Adds a text row. Does nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> is set. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Removes the row of the item. |
| <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#removeitemat">`RemoveItemAt(int index)`</a> | Removes the row at the index. |
| <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> | Removes `count` rows from the index on. |
| <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#clearitems">`ClearItems()`</a> | Removes every row. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#select">Select</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Selects the row of the item. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#deselect">Deselect</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Deselects the row of the item. |
| <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#selectat">`SelectAt(int index)`</a> | Selects the row at the index. |
| <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#deselectat">`DeselectAt(int index)`</a> | Deselects the row at the index. |
| <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#selectsource">`SelectSource(object source)`</a> | Selects the row of the <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> object. Nothing happens when there is none. |
| <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#selectprevious">`SelectPrevious()`</a> | Selects the previous row (separators passed over). Does nothing without a selection. |
| <a class="ref method" href="/docs/ui-glossary/elements/combo-box/#selectnext">`SelectNext()`</a> | Selects the next row (separators passed over). Does nothing without a selection. |

Style class: <a class="ref" href="/docs/ui-glossary/types/combo-box-style/">`ComboBoxStyle`</a> (<a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#selectionstyle">`SelectionStyle`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#togglebuttonstyle">`ToggleButtonStyle`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#listboxstyle">`ListBoxStyle`</a>, see
[styles](/docs/ui-styles/)).

## TreeView

A tree of <a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a>s shown as the rows of a list box. Branches open and close, and any item can be selected, a
branch as well as a leaf. It is filled from data or built in code.

The data in the example below is a folder with its sub-folders:

```csharp
// the data of a tree: a folder with its sub-folders
public sealed class Folder(string name, params Folder[] children)
{
    public BindableCollection<Folder> Children { get; } = [.. children];

    public override string ToString() => name;
}
```

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-treeview.png' | relative_url }}" width="294" height="222" alt="A tree view with Chapter one expanded to Forest and Desert, Desert expanded to Oasis and Dunes with Oasis selected, and Chapter two and Chapter three collapsed; arrows mark the branches, pointing down when expanded and right when collapsed">
  <figcaption>A tree filled from folders with a leaf selected: the branches above it expanded, the others collapsed.</figcaption>
</figure>

```csharp
var levels = new BindableCollection<Folder>
{
    new("Chapter one",
        new Folder("Forest"),
        new Folder("Desert", new Folder("Oasis"), new Folder("Dunes"))),
    new("Chapter two", new Folder("Caves")),
    new("Chapter three", new Folder("Ruins"))
};

var tree = new TreeView("levels")
{
    DesiredWidth = 260,
    DesiredHeight = 188,
    Margin = 16,
    SubItemsShift = (18, 0),
    // the expand icons: MinimizedIcon and ExpandedIcon, pictures in this content folder
    TexturesPath = "UITextures/TreeView/",
    ChildrenSelector = folder => ((Folder)folder).Children,
    ItemsSource = levels
};
tree.OnItemSelect += (sender, item) => Console.WriteLine($"Open {item?.Source}");

ui.AddElementToRoot(tree);

// selecting a row expands the branches above it, the others stay collapsed
tree.SelectSource(levels[0].Children[1].Children[0]);
```

**From data.** <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a> holds the top-level objects, <a class="ref prop" href="/docs/ui-glossary/elements/tree-view/#childrenselector">`ChildrenSelector`</a> gives the children of an object (`null`
or empty for a leaf), and <a class="ref prop" href="/docs/ui-glossary/elements/tree-view/#itemstemplate">`ItemsTemplate`</a> makes each object's element (a label with the object's text when none is
set). Each item's `Source` is its object. Only the first level is made at first: an item of an object starts
collapsed and makes the items of its children the first time it is expanded (<a class="ref prop" href="/docs/ui-glossary/elements/tree-view-item/#hasleaves">`HasLeaves`</a> tells that it has some
before that). An <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a> or a children collection that is a [`BindableCollection<T>`](/docs/ui-styles/#bindings)
is followed: objects added to or removed from it add or remove their items. An object that appears again below
itself (a cycle in the data) shows no children there. Setting another <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a>, <a class="ref prop" href="/docs/ui-glossary/elements/tree-view/#childrenselector">`ChildrenSelector`</a> or
<a class="ref prop" href="/docs/ui-glossary/elements/tree-view/#itemstemplate">`ItemsTemplate`</a> makes the items again, keeping the expanded branches and the selected object. While an <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a>
is set, items are not added or removed in code.

**In code.** Without an <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a>, <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#additem">`AddItem`</a> adds any element as a top-level item (in a <a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a> made around
it), and you nest items by adding to a <a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a>. An item expands when it gets its first leaf.

```csharp
var chapter = new TreeViewItem(tree, new Label { Text = "Chapter one" }, Margin.Zero);
chapter.AddItem(new Label { Text = "Forest" });
tree.AddItem(chapter);
```

**Selecting and expanding.** A click on a row selects its item and opens or closes its branch. <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#selecteditem">`SelectedItem`</a> selects
an item of this tree and expands the branches above it; <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#selectsource">`SelectSource(object)`</a> also finds an object in a branch that
was not expanded yet. With an <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#selecteditem">`SelectedItem`</a> can be bound to a property that holds the selected object.
An item that is removed (or is in a removed branch) is deselected. <a class="ref prop" href="/docs/ui-glossary/elements/tree-view-item/#isexpanded">`IsExpanded`</a> of an item, <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#expandall">`ExpandAll()`</a> and
<a class="ref method" href="/docs/ui-glossary/elements/tree-view/#collapseall">`CollapseAll()`</a> open and close branches; <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#expandall">`ExpandAll()`</a> makes the items of the whole data.

**Keyboard.** A pressed tree view has the keyboard. Up, Down, Page Up, Page Down, Home and End move the selection as in
a [list box](#scrolling-and-keyboard), passing over the rows of closed branches. Right expands the selected branch, or
selects its first leaf when it is expanded already. Left collapses the selected branch, or selects the item above it
when it is collapsed.

**Icons and indentation.** An item with leaves shows an expand icon before its content. Without <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> the
icon is a block of <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#minimizediconcolor">`MinimizedIconColor`</a> (collapsed) or <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#expandediconcolor">`ExpandedIconColor`</a> (expanded), sized and placed by
<a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#expandiconstyle">`ExpandIconStyle`</a>; with <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> it is the `MinimizedIcon` or `ExpandedIcon` texture from that folder,
any picture you like. By default the icon is an 8 by 8 block centred before the content, light grey when
collapsed and darker when expanded. The screenshot's tree gives it two pictures through <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a>, an arrow
pointing right and one pointing down, at the theme's 10 by 10.
<a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#subitemsshift">`SubItemsShift`</a> indents every level. The tree view's list never uses virtualization.

### TreeView properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a> | `IEnumerable` | The top-level objects of the tree. A <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is followed. |
| <a class="ref prop" href="/docs/ui-glossary/elements/tree-view/#childrenselector">`ChildrenSelector`</a> | `Func<object, IEnumerable>` | Gives the children of an object of the <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a>, `null` or empty for a leaf. A children collection that is a <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is followed. |
| <a class="ref prop" href="/docs/ui-glossary/elements/tree-view/#itemstemplate">`ItemsTemplate`</a> | <a class="ref" href="/docs/ui-glossary/types/i-items-template/">`IItemsTemplate`</a> | Makes the element of each object; a label with the object's text when none is set. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#selecteditem">`SelectedItem`</a> | <a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a> | The selected item, `null` when nothing is selected. Only an item of this tree can be set; the branches above it are expanded. |
| <a class="ref prop" href="/docs/ui-glossary/elements/tree-view/#leaves">`Leaves`</a> | <code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/tree-view-item/">TreeViewItem</a>&gt;</code> | Read-only. The top-level items. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#listboxstyle">`ListBoxStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> | The style of the list the items are shown in, for example its row colours and scroll bars. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#expandiconstyle">`ExpandIconStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> | The style of the expand icon of the items, for example its size and margin. By default an 8 by 8 block, centred, with a margin of 4 before and 6 after it. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#minimizediconcolor">`MinimizedIconColor`</a> | `Color` | The colour of the icon of a collapsed branch, when the tree view has no textures. By default `(150, 150, 160)`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#expandediconcolor">`ExpandedIconColor`</a> | `Color` | The colour of the icon of an expanded branch, when the tree view has no textures. By default `(90, 90, 100)`. |
| <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#subitemsshift">`SubItemsShift`</a> | <a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> | How far each level is indented (`Left`) and the space above every row but the first (`Top`), in units. |

### TreeView events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/tree-view/#onitemselect">`OnItemSelect`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/elements/tree-view-item/">TreeViewItem</a> item)</code> | The selected item changes, by the user or from code. `item` is `null` when nothing is selected any more. |

### TreeView methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#treeview">`TreeView(string name = null)`</a> | Creates a tree view. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Adds a top-level item; an element that is not a <a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a> is put in one. Does nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a> is set. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> | Inserts a top-level item at the index. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> | Adds top-level items at the end, listed in one go. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> | Inserts top-level items at the index, listed in one go. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Removes the item (or the item made around the element) from wherever it is in the tree, with its branch. |
| <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#removeitemat">`RemoveItemAt(int index)`</a> | Removes the top-level item at the index. |
| <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> | Removes `count` top-level items from the index on. |
| <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#clearitems">`ClearItems()`</a> | Removes every item. |
| <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#expandall">`ExpandAll()`</a> | Expands every branch, making the items of the whole data. |
| <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#collapseall">`CollapseAll()`</a> | Collapses every branch. |
| <a class="ref method" href="/docs/ui-glossary/elements/tree-view/#selectsource">`SelectSource(object source)`</a> | Selects the item of the <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a> object, also one in a branch that was not expanded yet. Nothing happens when there is none. |

Items the tree view made (around your elements, or for source objects) are disposed when they are removed; your own
<a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a>s are let go with their branches and can be added again.

Style class: <a class="ref" href="/docs/ui-glossary/types/tree-view-style/">`TreeViewStyle`</a> (the same properties except <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#selecteditem">`SelectedItem`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a>, see
[styles](/docs/ui-styles/)).

### TreeViewItem

An item of a tree view: an expand icon and its content, with leaves below it. Items added in code can be made with
the constructor; the items of source objects are made by the tree view. When an item is added to another item, it
gets its place in the tree: its <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a> and its indentation are set by the item it joins.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/tree-view-item/#isexpanded">`IsExpanded`</a> | `bool` | Whether the leaves are shown (while the items above are expanded too). An item without leaves is never expanded. An item of a source object makes the items of its children the first time it is expanded. |
| <a class="ref prop" href="/docs/ui-glossary/elements/tree-view-item/#leaves">`Leaves`</a> | <code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/tree-view-item/">TreeViewItem</a>&gt;</code> | Read-only. The items one level below. Empty for an item of a source object until it is first expanded. |
| <a class="ref prop" href="/docs/ui-glossary/elements/tree-view-item/#hasleaves">`HasLeaves`</a> | `bool` | Read-only. Whether the item has leaves, also an item of a source object whose children were not made into items yet. |
| <a class="ref prop" href="/docs/ui-glossary/elements/tree-view-item/#source">`Source`</a> | `object` | Read-only. The <span class="dp">`ItemsSource`</span> object the item shows, `null` for an item added in code. |
| <a class="ref prop" href="/docs/ui-glossary/elements/tree-view-item/#mousecursorsset">`MouseCursorsSet`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | Read-only. The mouse cursors of the row the item is shown in. |

| Method | Description |
| --- | --- |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#treeviewitem">TreeViewItem</a>(<a href="/docs/ui-glossary/elements/tree-view/">TreeView</a> parentTreeView, <a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> content, <a href="/docs/ui-glossary/types/margin/">Margin</a> shift, string name = null)</code></span> | Creates an item of the tree view showing the content. `shift` is its indentation until it is added to the tree, which sets its own. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Adds a leaf; an element that is not a `TreeViewItem` is put in one. Does nothing for an item of a source object. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> | Inserts a leaf at the index. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> | Adds leaves at the end, listed in one go. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> | Inserts leaves at the index, listed in one go. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Removes the item (or the item made around the element) from anywhere in this item's branch. |
| <a class="ref method" href="/docs/ui-glossary/elements/tree-view-item/#removeitemat">`RemoveItemAt(int index)`</a> | Removes the leaf at the index, with its branch. |
| <a class="ref method" href="/docs/ui-glossary/elements/tree-view-item/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> | Removes `count` leaves from the index on. |
| <a class="ref method" href="/docs/ui-glossary/elements/tree-view-item/#clearitems">`ClearItems()`</a> | Removes every leaf. |

## ContextMenu

A menu that opens at the mouse on a right click, drawn above everything. Its items are <a class="ref" href="/docs/ui-glossary/elements/context-menu-item/">`ContextMenuItem`</a>s,
separators, or the objects of an <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#itemssource">`ItemsSource`</a>; an item can be checkable and can open a sub-menu.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-contextmenu.png' | relative_url }}" width="224" height="195" alt="A label reading Right click here with a menu open below it: Copy, Rename, a separator, a checked Show grid item and a highlighted Sort item whose sub-menu shows By name and By date">
  <figcaption>A context menu with a separator, a checked item and an open sub-menu.</figcaption>
</figure>

```csharp
var sortMenu = new ContextMenu("sort");
sortMenu.AddItem(new ContextMenuItem("By name"));
sortMenu.AddItem(new ContextMenuItem("By date"));

var copy = new ContextMenuItem("Copy");
copy.OnClick += (sender, e) => Console.WriteLine("Copy");

var sort = new ContextMenuItem("Sort") { SubMenu = sortMenu };

// the arrow of an item with a sub-menu: a picture instead of the default block
var menu = new ContextMenu("listMenu")
{
    ExpandIconStyle = new ImageStyle
    {
        Source = Content.Load<Texture2D>("UITextures/ContextMenu/SubMenu"),
        DesiredWidth = 8,
        DesiredHeight = 8,
        Margin = (12, 0, 6, 0),
        VerticalAlignment = VerticalAlignment.Center
    }
};
menu.AddItem(copy);
menu.AddItem(new ContextMenuItem("Rename"));
menu.AddItem(new Separator
{
    DesiredHeight = 1,
    Margin = (4, 3),
    BackgroundColor = new Color(168, 131, 74)
});
menu.AddItem(new ContextMenuItem("Show grid") { IsCheckable = true, IsChecked = true });
menu.AddItem(sort);
menu.OnItemSelect += (sender, item) => Console.WriteLine($"Chosen {item}");

// a right click on the element opens its menu at the mouse
var files = new Label("files")
{
    Text = "Right click here",
    TextMargin = (10, 8, 10, 8),
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    BackgroundColor = new Color(40, 31, 23),
    HitTest = true,
    Margin = (16, 16),
    ContextMenu = menu
};

ui.AddElementToRoot(files);
```

**Opening.** Set the menu as an element's `ContextMenu`. A right click released over the element, or over an element
inside it that has no menu of its own, opens the menu at the mouse. The element must take the mouse (<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a>), which
is why the label above sets it. <a class="ref method" href="/docs/ui-glossary/elements/context-menu/#open">`Open(point)`</a> opens the menu at a point of the screen from code. The menu is placed by
<a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#placement">`Placement`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#marginfrommousecursor">`MarginFromMouseCursor`</a> and kept on the screen; a menu taller than the screen scrolls.

**Keyboard.** The open menu takes the keyboard, and every key while it is open:

| Key | Effect |
| --- | --- |
| Up, Down, Page Up, Page Down, Home, End | Move the selection over the items, passing over separators. |
| Enter, Space | Choose the selected item. |
| Right | Opens the sub-menu of the selected item and selects its first item. |
| Left | Closes the sub-menu the keys are in. |
| Escape | Closes the sub-menu the keys are in, or the menu itself. |

The keys go to the deepest open sub-menu that has a selected item. Moving the mouse over an item selects it too.

**Choosing.** Clicking an item or pressing Enter on it chooses it: a checkable item switches <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#ischecked">`IsChecked`</a>, the whole menu
closes and the element that had the keyboard before gets it back, then the item's `OnClick` and the menu's
<a class="ref event" href="/docs/ui-glossary/elements/context-menu/#onitemselect">`OnItemSelect`</a> are raised. An item that opens a sub-menu is not chosen, it opens its sub-menu. A disabled item can't be
chosen. A press somewhere else, another element taking the keyboard, or the menu's element being hidden or removed
also closes the menu.

**Sub-menus.** Set an item's <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#submenu">`SubMenu`</a> to another `ContextMenu`. It opens to the right of the menu, level with its
item, or to the left when there is no room on the right. With <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#submenusopentype">`SubMenusOpenType`</a> set to `OnHover` (the default) it
opens when the mouse is over its item; with `OnClick` a click on the item opens or closes it. A sub-menu is opened
by its item only, not by <a class="ref method" href="/docs/ui-glossary/elements/context-menu/#open">`Open`</a>.

**From data.** <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#itemssource">`ItemsSource`</a> gives an item per object, with content made by <a class="ref prop" href="/docs/ui-glossary/elements/context-menu/#itemstemplate">`ItemsTemplate`</a> (a label with the
object's text when none is set); a [`BindableCollection<T>`](/docs/ui-styles/#bindings) is followed. While an
<a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#itemssource">`ItemsSource`</a> is set, items are not added or removed in code.

An element added with <a class="ref method" href="/docs/ui-glossary/elements/context-menu/#additem">`AddItem`</a> that is neither a <a class="ref" href="/docs/ui-glossary/elements/context-menu-item/">`ContextMenuItem`</a> nor a <a class="ref" href="/docs/ui-glossary/elements/separator/">`Separator`</a> is put in an item the menu
makes; such items are disposed when they are removed, your own items are only let go (with their sub-menus).

### ContextMenu properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu/#items">`Items`</a> | <code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt;</code> | Read-only. The items and separators of the menu, in order. |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu/#isopen">`IsOpen`</a> | `bool` | Read-only. Whether the menu is open. |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu/#parentitem">`ParentItem`</a> | <a class="ref" href="/docs/ui-glossary/elements/context-menu-item/">`ContextMenuItem`</a> | Read-only. The item whose sub-menu this menu is, `null` for the menu of an element. |
| <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#itemssource">`ItemsSource`</a> | `IEnumerable` | The objects to show, one item each. A <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is followed. |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu/#itemstemplate">`ItemsTemplate`</a> | <a class="ref" href="/docs/ui-glossary/types/i-items-template/">`IItemsTemplate`</a> | Makes the content of the item of each <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#itemssource">`ItemsSource`</a> object; a label with the object's text when none is set. |
| <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#placement">`Placement`</a> | <a class="ref" href="/docs/ui-glossary/types/context-menu-placement/">`ContextMenuPlacement`</a> | On which side of the point the menu opens. `BottomRight` by default. |
| <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#marginfrommousecursor">`MarginFromMouseCursor`</a> | <a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> | An offset added to the point the menu opens at: `Left` to the x, `Top` to the y, in units. |
| <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#submenusopentype">`SubMenusOpenType`</a> | <a class="ref" href="/docs/ui-glossary/types/context-menu-sub-menus-open-type/">`ContextMenuSubMenusOpenType`</a> | Whether the sub-menus of this menu's items open on hover (`OnHover`, the default) or on click. |
| <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#borderstyle">`BorderStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a> | The style of the [border](/docs/ui-layout/#border) around the items. By default a white background with a 1 unit dark grey border. |
| <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#listboxstyle">`ListBoxStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> | The style of the list of the items. By default transparent rows, highlighted in light blue under the mouse and when selected. |
| <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#checkiconstyle">`CheckIconStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> | The style of the check mark of a checked item. By default an 8 by 8 unit dark grey square. |
| <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#expandiconstyle">`ExpandIconStyle`</a> | <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> | The style of the arrow of an item with a sub-menu. By default a 6 by 8 unit dark grey block at the right end; with a `Source` it is that picture, as in the screenshot. |

### ContextMenu events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/ui-glossary/elements/context-menu/#onitemselect">`OnItemSelect`</a> | <code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/elements/context-menu-item/">ContextMenuItem</a> item)</code> | An item of the menu or of one of its sub-menus is chosen. It is raised by the menu of the element; the sender is the menu the item is in. |

### ContextMenu methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/context-menu/#contextmenu">`ContextMenu(string name = null)`</a> | Creates a closed menu. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>. |
| <a class="ref method" href="/docs/ui-glossary/elements/context-menu/#open">`Open(Point position)`</a> | Opens the menu at a point of the screen, placed by <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#placement">`Placement`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#marginfrommousecursor">`MarginFromMouseCursor`</a> and kept on the screen. Only a menu in the element tree that can take the keyboard opens; a sub-menu doesn't. |
| <a class="ref method" href="/docs/ui-glossary/elements/context-menu/#close">`Close()`</a> | Closes the menu with its open sub-menus, and gives the keyboard back to the element that had it before. On a sub-menu it closes only that sub-menu. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/context-menu/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Adds an item at the end. A <a class="ref" href="/docs/ui-glossary/elements/context-menu-item/">`ContextMenuItem`</a> or <a class="ref" href="/docs/ui-glossary/elements/separator/">`Separator`</a> is added as is, another element is put in an item. Does nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#itemssource">`ItemsSource`</a> is set. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/context-menu/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> | Inserts an item at the index. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/context-menu/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> | Adds items at the end. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/context-menu/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> | Inserts items at the index. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/context-menu/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> | Removes the item, or the item made around the element. |
| <a class="ref method" href="/docs/ui-glossary/elements/context-menu/#removeitemat">`RemoveItemAt(int index)`</a> | Removes the item at the index. |
| <a class="ref method" href="/docs/ui-glossary/elements/context-menu/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> | Removes `count` items from the index on. |
| <a class="ref method" href="/docs/ui-glossary/elements/context-menu/#clearitems">`ClearItems()`</a> | Removes every item. |

#### `ContextMenuPlacement`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/context-menu-placement/#topleft">`TopLeft`</a> | The menu opens above the point and to its left. |
| <a class="ref" href="/docs/ui-glossary/types/context-menu-placement/#topright">`TopRight`</a> | The menu opens above the point and to its right. |
| <a class="ref" href="/docs/ui-glossary/types/context-menu-placement/#bottomleft">`BottomLeft`</a> | The menu opens below the point and to its left. |
| <a class="ref" href="/docs/ui-glossary/types/context-menu-placement/#bottomright">`BottomRight`</a> | The menu opens below the point and to its right (its top left corner at the point). |

#### `ContextMenuSubMenusOpenType`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/context-menu-sub-menus-open-type/#onhover">`OnHover`</a> | A sub-menu opens when the mouse is over its item. |
| <a class="ref" href="/docs/ui-glossary/types/context-menu-sub-menus-open-type/#onclick">`OnClick`</a> | A click on the item opens or closes its sub-menu. |

Style class: <a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a> (the same properties except <span class="dp">`ItemsSource`</span>, see [styles](/docs/ui-styles/)).

### ContextMenuItem

An item of a context menu: a check mark while it is checkable and checked, its content, and an arrow at the right
end when it opens a sub-menu. The item is stretched over its row; the row takes the mouse and the item shows its
state. Choosing it, with a click or the keyboard, raises its `OnClick` and the menu's <span class="event">`OnItemSelect`</span>.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#content">`Content`</a> | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | Read-only. The element the item shows, given when it is made. |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#ischeckable">`IsCheckable`</a> | `bool` | Whether choosing the item switches <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#ischecked">`IsChecked`</a>. Setting it to `false` also clears <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#ischecked">`IsChecked`</a>. |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#ischecked">`IsChecked`</a> | `bool` | Whether the check mark of a checkable item is shown. |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#submenu">`SubMenu`</a> | <a class="ref" href="/docs/ui-glossary/elements/context-menu/">`ContextMenu`</a> | The menu opened next to the item, on hover or click (see the menu's <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#submenusopentype">`SubMenusOpenType`</a>). The arrow shows while it has items. |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#hassubitems">`HasSubItems`</a> | `bool` | Read-only. Whether the item has a sub-menu with at least one item. |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#parentmenu">`ParentMenu`</a> | <a class="ref" href="/docs/ui-glossary/elements/context-menu/">`ContextMenu`</a> | Read-only. The menu the item is in. |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#source">`Source`</a> | `object` | Read-only. The <span class="dp">`ItemsSource`</span> object the item shows, `null` for an item added in code. |
| <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#mousecursorsset">`MouseCursorsSet`</a> | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | Read-only. The mouse cursors of the row the item is in. |

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ui-glossary/elements/context-menu-item/#contextmenuitem">`ContextMenuItem(string text, string name = null)`</a> | Creates an item showing the text in a label. |
| <span class="method"><code><a href="/docs/ui-glossary/elements/context-menu-item/#contextmenuitem">ContextMenuItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> content, string name = null)</code></span> | Creates an item showing any element. |
