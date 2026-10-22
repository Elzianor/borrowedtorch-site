---
layout: docs
title: "UI: lists and menus"
description: List boxes, combo boxes, tree views and context menus, with selection, data sources, virtualization and keyboard control.
---

Every element here has all the properties, events and methods of [`BaseElement`](/docs/ui-base-element/), which the
tables below don't repeat. Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>: `Foo` is backed by
`FooDP`, which a style, a binding or an animation can set (see [styles, bindings and animation](/docs/ui-styles/)).
Screenshots use the theme from [styles](/docs/ui-styles/#the-theme-of-these-pages).

The keyboard reaches these elements from the game window you give `BorrowedTorchUI` (see the [quick start guide](/docs/ui/)):
a key goes to the element that has the keyboard first, then to the elements around it until one uses it.

## ListBox

A scrollable list of rows with single or multiple selection. A row can be a text, any element, or an object of an
`ItemsSource`, and long lists can be virtualized so only the rows in view have elements.

<figure class="shot">
  <img src="{{ '/assets/img/ui/controls-listbox.png' | relative_url }}" width="506" height="210" alt="Two lists: on the left text rows with Desert selected, a separator line and a check box row, with a vertical scroll bar; on the right five rows with Fire, Poison and Shadow selected">
  <figcaption>A single selection list with a separator and a check box row, and a multiple selection list.</figcaption>
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

// several rows at once: Shift and Ctrl clicks, SelectAll, DeselectAt
var tags = new ListBox("tags")
{
    SelectionMode = ListBoxSelectionMode.Multiple,
    DesiredWidth = 220,
    DesiredHeight = 176,
    Margin = (268, 16)
};

tags.AddTextItems(["Fire", "Ice", "Poison", "Lightning", "Shadow"]);
tags.SelectAll();
tags.DeselectAt(1);
tags.DeselectAt(3);

ui.AddElementToRoot(levels);
ui.AddElementToRoot(tags);
```

`AddTextItem` adds a text row (a [`Label`](/docs/ui-text/#label) is made for it when the row gets an element), and
`AddTextItems` adds many in one batch. `AddItem` takes any element: a `ListBoxItem` you made is used as the row
itself, any other element is shown in a row the list makes around it. A [`Separator`](/docs/ui-layout/#separator) row
can't be selected and the keyboard passes over it. The rows are stretched to the width of the list. Removing a row
detaches the elements you added (they are not disposed); the rows and contents the list made are disposed. An element
of yours that is disposed while in the list takes its row with it.

Rows are drawn in `NormalItemColor`, or alternately in `NormalItemColor` and `AlternativeItemColor` with
`UseDualColors`, and change to `HoverItemColor`, `PressedItemColor` and `SelectedItemColor` when those are set. A
press on the list (a row or a scroll bar) gives it the keyboard. Setting `HitTest` to `false` stops the rows and the
scroll bars from taking the mouse as well.

### Selection

The selection has a primary row: `SelectedItem` and `SelectedIndex` point at it, and `OnItemSelect` reports it. In
`Single` mode it is the only selected row. In `Multiple` mode other rows can be selected with it:

- a click selects only the clicked row;
- Ctrl + click adds the row to the selection (it becomes the primary row) or removes a selected row;
- Shift + click selects the range from the primary row to the clicked row, the primary row stays where it was.

The same keys work with the keyboard (Ctrl + Down adds the next row, Shift + Down extends the range). A selection made
in code (`SelectAt`, `Select`, `SelectedIndex`, `MoveSelection`) replaces the selection whatever keys are held;
`SelectAll` and `DeselectAt` change it row by row. `SelectedIndices` and `SelectedSources` list every selected row,
`SelectedItems` only the selected rows that have an element.

### Items from data

Set `ItemsSource` to a collection to get a row per object, with an element made by `ItemsTemplate` (a label with the
object's text when none is set). A [`BindableCollection<T>`](/docs/ui-styles/#bindings) is followed: objects added
to or removed from it add or remove their rows. Each row's `Source` is its object, and `SelectSource(object)` selects
the row of an object. When the rows are built again (another collection or template) the objects that are still there
stay selected. With an `ItemsSource`, `SelectedItem` can be bound to a property that holds the selected object rather
than the row. `AddTextItem` and `AddTextItems` do nothing while an `ItemsSource` is set. See
[bindings](/docs/ui-styles/#bindings) for templates and binding the selection.

### Virtualization

With `VirtualizationMode = ListBoxVirtualizationMode.Fixed` and an `ItemHeight` above 0, every row is `ItemHeight`
units high and only the rows in view, three rows above and below them, and the primary selected row get elements.
The rows are kept as light records, so lists of hundreds of thousands of rows fill quickly. Row elements that scroll
out of view are reused for the rows that come in: a template that implements `IRecyclingItemsTemplate` (the default
text template does) updates the content it made, other contents are made again. Elements you added with `AddItem` are
detached while out of view and attached again when they come back, never disposed.

In `Fixed` mode `Items`, `SelectedItems` and the rows passed to `OnItemsSelect` only cover the rows that have an
element. `Count`, `SelectedIndex`, `SelectedIndices`, `SelectedSources` and `SelectSource` work on every row, and
`SelectedItem` is always a live element because the primary row keeps its element. Collapsed rows still take their
`ItemHeight`, and the width of the content grows with the widest row seen so far.

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

`ScrollIntoView(index)` scrolls a laid out list just enough to show the whole row. `SelectNext`, `SelectPrevious` and
`MoveSelection(delta)` select a row and scroll it into view; they pass over separators and collapsed rows.
`RowsPerPage` is the number of rows that fit the view.

A list that has the keyboard (it was pressed, or given `Focus()`) reacts to these keys:

| Key | Effect |
| --- | --- |
| Up, Down | Selects the previous or next row. With no selection, Down selects the first row and Up the last. |
| Page Up, Page Down | Moves the selection by `RowsPerPage` rows. |
| Home, End | Selects the first or last row. |

Ctrl and Shift held with these keys work as with clicks in `Multiple` mode.

### ListBox properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`SelectionMode`</span> | `ListBoxSelectionMode` | Whether one row or several rows can be selected. `Single` by default. |
| <span class="dp">`SelectedItem`</span> | `ListBoxItem` | The primary selected row, `null` when nothing is selected. Setting it selects that row; `null` clears the selection. |
| <span class="dp">`SelectedIndex`</span> | `int` | The index of the primary selected row, `-1` when nothing is selected. Setting it selects that row (the value is clamped to the rows); a negative value clears the selection. |
| <span class="prop">`SelectedItems`</span> | `IReadOnlyList<ListBoxItem>` | Read-only. The selected rows that have an element (see `Items`). |
| <span class="prop">`SelectedIndices`</span> | `IReadOnlyList<int>` | Read-only. The indices of all selected rows, with an element or not. |
| <span class="prop">`SelectedSources`</span> | `IReadOnlyList<object>` | Read-only. The source objects of all selected rows, `null` for rows added as elements or text. |
| <span class="prop">`Count`</span> | `int` | Read-only. The number of rows, in every virtualization mode. |
| <span class="prop">`Items`</span> | `IReadOnlyList<ListBoxItem>` | Read-only. The rows that have an element, in order: every row in `None` mode, the rows around the view and the primary selected row in `Fixed` mode. A live view, don't keep it across changes. |
| <span class="dp">`ItemsSource`</span> | `IEnumerable` | The objects to show, one row each. A `BindableCollection<T>` is followed. |
| <span class="prop">`ItemsTemplate`</span> | `IItemsTemplate` | Makes the element of each `ItemsSource` object; a label with the object's text when none is set. Changing it builds the rows again. |
| <span class="dp">`UseDualColors`</span> | `bool` | Alternates the background of unselected rows: `NormalItemColor` for even indices, `AlternativeItemColor` for odd ones. |
| <span class="dp">`NormalItemColor`</span> | `Color` | The background of an unselected row (of the even rows with `UseDualColors`). |
| <span class="dp">`AlternativeItemColor`</span> | `Color` | The background of the odd unselected rows while `UseDualColors` is set. |
| <span class="dp">`HoverItemColor`</span> | `Color?` | The background of the row under the mouse. When `null` the row keeps its normal or selected colour. |
| <span class="dp">`PressedItemColor`</span> | `Color?` | The background of a row while the left button is pressed on it. When `null` it doesn't change. |
| <span class="dp">`SelectedItemColor`</span> | `Color?` | The background of a selected row. When `null` a selected row keeps the colour it had. |
| <span class="dp">`ScrollableContainerStyle`</span> | `ScrollableContainerStyle` | The style of the [scrollable container](/docs/ui-layout/#scrollablecontainer) around the rows, for example its scroll bars and their thickness. |
| <span class="dp">`VirtualizationMode`</span> | `ListBoxVirtualizationMode` | Whether every row has an element (`None`, the default) or only the rows around the view (`Fixed`). |
| <span class="dp">`ItemHeight`</span> | `int` | The height of every row in `Fixed` mode, in units. `Fixed` mode has no effect while it is 0 or less. |
| <span class="prop">`RowsPerPage`</span> | `int` | Read-only. The number of rows that fit the view, at least one: the view's height divided by `ItemHeight` in `Fixed` mode, by the average row height otherwise. |
| <span class="prop">`ContentWidth`</span> | `int` | Read-only. The width of the widest row content, in units (in `Fixed` mode the widest seen since the rows were cleared). |
| <span class="prop">`ContentHeight`</span> | `int` | Read-only. The height of all the shown rows together, in units (`Count` times `ItemHeight` in `Fixed` mode). |

### ListBox events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnItemSelect`</span> | `(BaseElement sender, ListBoxItem item)` | The primary selection is set, by the user or from code. `item` is `null` when nothing is selected any more. |
| <span class="event">`OnItemsSelect`</span> | `(BaseElement sender, IReadOnlyList<ListBoxItem> items)` | The set of selected rows changes. `items` is `SelectedItems`, the selected rows that have an element. |

### ListBox methods

| Method | Description |
| --- | --- |
| <span class="method">`ListBox(string name = null)`</span> | Creates a list box. The name is used by `GetElementByName`. |
| <span class="method">`AddItem(BaseElement item)`</span> | Adds a row at the end. A `ListBoxItem` is the row itself, any other element is shown in a row the list makes. |
| <span class="method">`AddItemAt(BaseElement item, int index)`</span> | Inserts a row at the index (0 to `Count`); another index is ignored. |
| <span class="method">`AddItemsRange(IEnumerable<BaseElement> items)`</span> | Adds a row per element at the end, in one batch (the rows are indexed and laid out once). |
| <span class="method">`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)`</span> | Inserts a row per element at the index, in one batch. |
| <span class="method">`AddTextItem(string text)`</span> | Adds a text row. Does nothing while an `ItemsSource` is set. |
| <span class="method">`AddTextItems(IEnumerable<string> texts)`</span> | Adds a text row per string, in one batch. Does nothing while an `ItemsSource` is set. |
| <span class="method">`RemoveItem(BaseElement item)`</span> | Removes the row of the item (the row itself or the element shown in it). |
| <span class="method">`RemoveItemAt(int index)`</span> | Removes the row at the index. |
| <span class="method">`RemoveItemsRangeAt(int index, int count)`</span> | Removes `count` rows from the index on (as many as there are). |
| <span class="method">`ClearItems()`</span> | Removes every row. |
| <span class="method">`Select(BaseElement item)`</span> | Selects the row of the item (the row itself or the element shown in it), as `SelectAt` does. |
| <span class="method">`Deselect(BaseElement item)`</span> | Deselects the row of the item, as `DeselectAt` does. |
| <span class="method">`SelectAt(int index)`</span> | Makes the row at the index the selected row; the other rows are deselected, also in `Multiple` mode. An index out of range is ignored. |
| <span class="method">`DeselectAt(int index)`</span> | Deselects the row at the index. If it was the primary row, the first row that is still selected becomes the primary one. |
| <span class="method">`SelectSource(object source)`</span> | Selects the row whose `Source` is the object. Nothing happens when there is none. |
| <span class="method">`SelectAll()`</span> | Selects every row except separators; the last one becomes the primary row. In `Single` mode it selects the first selectable row, and only when nothing is selected. |
| <span class="method">`DeselectAll()`</span> | Deselects every row. |
| <span class="method">`SelectPrevious()`</span> | Selects the previous row (separators and collapsed rows passed over) and scrolls it into view. Does nothing without a selection. |
| <span class="method">`SelectNext()`</span> | Selects the next row (separators and collapsed rows passed over) and scrolls it into view. Does nothing without a selection. |
| <span class="method">`MoveSelection(int delta)`</span> | Moves the selection by `delta` rows (clamped to the list, separators and collapsed rows passed over) and scrolls it into view. With no selection it selects the first row (`delta` above 0) or the last. |
| <span class="method">`ScrollIntoView(int index)`</span> | Scrolls the list so the row at the index is entirely in view. Needs the list laid out; nothing happens for a row that is in view already. |

#### `ListBoxSelectionMode`

| Value | Meaning |
| --- | --- |
| `Single` | One row at most is selected. |
| `Multiple` | Several rows can be selected, with Ctrl and Shift clicks or from code. |

#### `ListBoxVirtualizationMode`

| Value | Meaning |
| --- | --- |
| `None` | Every row has its own element. |
| `Fixed` | Every row is `ItemHeight` high and only the rows in view, plus a small buffer, have elements, reused while scrolling. |

Style class: `ListBoxStyle` (the same properties except `SelectedItem`, `SelectedIndex` and `ItemsSource`, see
[styles](/docs/ui-styles/)).

### ListBoxItem

A row of a list box. The list makes the rows for texts, elements and source objects; you can also make a
`ListBoxItem` yourself and add it, to keep the row element. The list only detaches such a row when it is removed or
scrolls out of view in `Fixed` mode, and never disposes it. In a `Fixed` mode list it is `ItemHeight` high and gets
its own height back when it leaves the list. A row added with `IsSelected` set joins the selection.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`IsSelected`</span> | `bool` | Whether the row is selected. Setting it on a row in a list selects it as `SelectAt` does, or deselects it as `DeselectAt` does. A separator row is never selected. |
| <span class="prop">`Index`</span> | `int` | Read-only. The row's index in the list. |
| <span class="prop">`Source`</span> | `object` | Read-only. The `ItemsSource` object the row shows, `null` for a row added as an element or text. |
| <span class="prop">`Content`</span> | `BaseElement` | Read-only. The element the row shows. |
| <span class="prop">`ContentWidth`</span> | `int` | Read-only. The natural width of the content, in units (the row itself is stretched to the list's width). |
| <span class="prop">`ContentHeight`</span> | `int` | Read-only. The row's height, in units: its content's, or its own desired height (`ItemHeight` in a `Fixed` mode list). |
| <span class="prop">`MouseCursorsSet`</span> | `MouseCursorsSet` | Read-only. The mouse cursors of the list the row is in. |

| Method | Description |
| --- | --- |
| <span class="method">`ListBoxItem(BaseElement content, ListBox parentListBox, string name = null)`</span> | Creates a row showing the content. `parentListBox` gives the row its colours until it is in a list; from then on the list it is in counts. |

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

Rows are added and selected as in a [`ListBox`](#listbox) in `Single` mode: `AddTextItem`, `AddItem`, or
`ItemsSource` with an `ItemsTemplate`. `SelectedItemDP`, `SelectedIndexDP` and `ItemsSourceDP` are the drop-down
list's own properties, so a binding to them works as on a list box.

The selection image is a picture of the selected row's content, drawn at its natural size at the left of the combo
box and centred vertically. It is a texture, so it is not made without a graphics device (for example in tests).

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
| <span class="prop">`Items`</span> | `IReadOnlyList<ListBoxItem>` | Read-only. The rows of the drop-down list that have an element (see the list box's `Items`). |
| <span class="dp">`ItemsSource`</span> | `IEnumerable` | The objects to show, one row each. A `BindableCollection<T>` is followed. |
| <span class="prop">`ItemsTemplate`</span> | `IItemsTemplate` | Makes the element of each `ItemsSource` object; a label with the object's text when none is set. |
| <span class="dp">`SelectedItem`</span> | `ListBoxItem` | The selected row, `null` when nothing is selected. Setting it selects that row. |
| <span class="dp">`SelectedIndex`</span> | `int` | The index of the selected row, `-1` when nothing is selected. |
| <span class="prop">`SelectedSource`</span> | `object` | Read-only. The `ItemsSource` object of the selected row, `null` without one. |
| <span class="dp">`SelectionStyle`</span> | `ImageStyle` | The style of the image that shows the selected row. |
| <span class="dp">`ToggleButtonStyle`</span> | `ButtonStyle` | The style of the [button](/docs/ui-controls/#button) that opens and closes the list, for example its width and text. |
| <span class="dp">`ListBoxStyle`</span> | `ListBoxStyle` | The style of the drop-down list, for example its row colours. |

### ComboBox events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnItemSelect`</span> | `(BaseElement sender, ListBoxItem item)` | The selection changes, by the user or from code. The sender is the combo box, `item` a row of its drop-down list, `null` when nothing is selected any more. |

### ComboBox methods

| Method | Description |
| --- | --- |
| <span class="method">`ComboBox(string name = null)`</span> | Creates a combo box. The name is used by `GetElementByName`. |
| <span class="method">`AddItem(BaseElement item)`</span> | Adds a row at the end of the list. |
| <span class="method">`AddItemAt(BaseElement item, int index)`</span> | Inserts a row at the index. |
| <span class="method">`AddItemsRange(IEnumerable<BaseElement> items)`</span> | Adds a row per element at the end, in one batch. |
| <span class="method">`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)`</span> | Inserts a row per element at the index, in one batch. |
| <span class="method">`AddTextItem(string text)`</span> | Adds a text row. Does nothing while an `ItemsSource` is set. |
| <span class="method">`RemoveItem(BaseElement item)`</span> | Removes the row of the item. |
| <span class="method">`RemoveItemAt(int index)`</span> | Removes the row at the index. |
| <span class="method">`RemoveItemsRangeAt(int index, int count)`</span> | Removes `count` rows from the index on. |
| <span class="method">`ClearItems()`</span> | Removes every row. |
| <span class="method">`Select(BaseElement item)`</span> | Selects the row of the item. |
| <span class="method">`Deselect(BaseElement item)`</span> | Deselects the row of the item. |
| <span class="method">`SelectAt(int index)`</span> | Selects the row at the index. |
| <span class="method">`DeselectAt(int index)`</span> | Deselects the row at the index. |
| <span class="method">`SelectSource(object source)`</span> | Selects the row of the `ItemsSource` object. Nothing happens when there is none. |
| <span class="method">`SelectPrevious()`</span> | Selects the previous row (separators passed over). Does nothing without a selection. |
| <span class="method">`SelectNext()`</span> | Selects the next row (separators passed over). Does nothing without a selection. |

Style class: `ComboBoxStyle` (`SelectionStyle`, `ToggleButtonStyle` and `ListBoxStyle`, see
[styles](/docs/ui-styles/)).

## TreeView

A tree of `TreeViewItem`s shown as the rows of a list box. Branches open and close, and any item can be selected, a
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
  <img src="{{ '/assets/img/ui/controls-treeview.png' | relative_url }}" width="294" height="222" alt="A tree view with Chapter one expanded to Forest and Desert, Desert expanded to Oasis and Dunes with Oasis selected, and Chapter two expanded to Caves; square icons mark the branches">
  <figcaption>A tree filled from folders, fully expanded, with a leaf selected.</figcaption>
</figure>

```csharp
var levels = new BindableCollection<Folder>
{
    new("Chapter one",
        new Folder("Forest"),
        new Folder("Desert", new Folder("Oasis"), new Folder("Dunes"))),
    new("Chapter two", new Folder("Caves"))
};

var tree = new TreeView("levels")
{
    DesiredWidth = 260,
    DesiredHeight = 188,
    Margin = 16,
    SubItemsShift = (18, 0),
    ChildrenSelector = folder => ((Folder)folder).Children,
    ItemsSource = levels
};
tree.OnItemSelect += (sender, item) => Console.WriteLine($"Open {item?.Source}");

ui.AddElementToRoot(tree);

tree.ExpandAll();
tree.SelectSource(levels[0].Children[1].Children[0]);
```

**From data.** `ItemsSource` holds the top-level objects, `ChildrenSelector` gives the children of an object (`null`
or empty for a leaf), and `ItemsTemplate` makes each object's element (a label with the object's text when none is
set). Each item's `Source` is its object. Only the first level is made at first: an item of an object starts
collapsed and makes the items of its children the first time it is expanded (`HasLeaves` tells that it has some
before that). An `ItemsSource` or a children collection that is a [`BindableCollection<T>`](/docs/ui-styles/#bindings)
is followed: objects added to or removed from it add or remove their items. An object that appears again below
itself (a cycle in the data) shows no children there. Setting another `ItemsSource`, `ChildrenSelector` or
`ItemsTemplate` makes the items again, keeping the expanded branches and the selected object. While an `ItemsSource`
is set, items are not added or removed in code.

**In code.** Without an `ItemsSource`, `AddItem` adds any element as a top-level item (in a `TreeViewItem` made around
it), and you nest items by adding to a `TreeViewItem`. An item expands when it gets its first leaf.

```csharp
var chapter = new TreeViewItem(tree, new Label { Text = "Chapter one" }, Margin.Zero);
chapter.AddItem(new Label { Text = "Forest" });
tree.AddItem(chapter);
```

**Selecting and expanding.** A click on a row selects its item and opens or closes its branch. `SelectedItem` selects
an item of this tree and expands the branches above it; `SelectSource(object)` also finds an object in a branch that
was not expanded yet. With an `ItemsSource`, `SelectedItem` can be bound to a property that holds the selected object.
An item that is removed (or is in a removed branch) is deselected. `IsExpanded` of an item, `ExpandAll()` and
`CollapseAll()` open and close branches; `ExpandAll()` makes the items of the whole data.

**Keyboard.** A pressed tree view has the keyboard. Up, Down, Page Up, Page Down, Home and End move the selection as in
a [list box](#scrolling-and-keyboard), passing over the rows of closed branches. Right expands the selected branch, or
selects its first leaf when it is expanded already. Left collapses the selected branch, or selects the item above it
when it is collapsed.

**Icons and indentation.** An item with leaves shows an expand icon before its content. Without `TexturesPath` the
icon is a block of `MinimizedIconColor` (collapsed) or `ExpandedIconColor` (expanded), sized and placed by
`ExpandIconStyle`; with `TexturesPath` it is the `MinimizedIcon` or `ExpandedIcon` texture from that folder.
By default the icon is an 8 by 8 block centred before the content, light grey when collapsed and darker when
expanded. The screenshot's theme uses a 10 by 10 icon in its own colours.
`SubItemsShift` indents every level. The tree view's list never uses virtualization.

### TreeView properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="dp">`ItemsSource`</span> | `IEnumerable` | The top-level objects of the tree. A `BindableCollection<T>` is followed. |
| <span class="prop">`ChildrenSelector`</span> | `Func<object, IEnumerable>` | Gives the children of an object of the `ItemsSource`, `null` or empty for a leaf. A children collection that is a `BindableCollection<T>` is followed. |
| <span class="prop">`ItemsTemplate`</span> | `IItemsTemplate` | Makes the element of each object; a label with the object's text when none is set. |
| <span class="dp">`SelectedItem`</span> | `TreeViewItem` | The selected item, `null` when nothing is selected. Only an item of this tree can be set; the branches above it are expanded. |
| <span class="prop">`Leaves`</span> | `IReadOnlyList<TreeViewItem>` | Read-only. The top-level items. |
| <span class="dp">`ListBoxStyle`</span> | `ListBoxStyle` | The style of the list the items are shown in, for example its row colours and scroll bars. |
| <span class="dp">`ExpandIconStyle`</span> | `ImageStyle` | The style of the expand icon of the items, for example its size and margin. By default an 8 by 8 block, centred, with a margin of 4 before and 6 after it. |
| <span class="dp">`MinimizedIconColor`</span> | `Color` | The colour of the icon of a collapsed branch, when the tree view has no textures. By default `(150, 150, 160)`. |
| <span class="dp">`ExpandedIconColor`</span> | `Color` | The colour of the icon of an expanded branch, when the tree view has no textures. By default `(90, 90, 100)`. |
| <span class="dp">`SubItemsShift`</span> | `Margin` | How far each level is indented (`Left`) and the space above every row but the first (`Top`), in units. |

### TreeView events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnItemSelect`</span> | `(BaseElement sender, TreeViewItem item)` | The selected item changes, by the user or from code. `item` is `null` when nothing is selected any more. |

### TreeView methods

| Method | Description |
| --- | --- |
| <span class="method">`TreeView(string name = null)`</span> | Creates a tree view. The name is used by `GetElementByName`. |
| <span class="method">`AddItem(BaseElement item)`</span> | Adds a top-level item; an element that is not a `TreeViewItem` is put in one. Does nothing while an `ItemsSource` is set. |
| <span class="method">`AddItemAt(BaseElement item, int index)`</span> | Inserts a top-level item at the index. |
| <span class="method">`AddItemsRange(IEnumerable<BaseElement> items)`</span> | Adds top-level items at the end, listed in one go. |
| <span class="method">`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)`</span> | Inserts top-level items at the index, listed in one go. |
| <span class="method">`RemoveItem(BaseElement item)`</span> | Removes the item (or the item made around the element) from wherever it is in the tree, with its branch. |
| <span class="method">`RemoveItemAt(int index)`</span> | Removes the top-level item at the index. |
| <span class="method">`RemoveItemsRangeAt(int index, int count)`</span> | Removes `count` top-level items from the index on. |
| <span class="method">`ClearItems()`</span> | Removes every item. |
| <span class="method">`ExpandAll()`</span> | Expands every branch, making the items of the whole data. |
| <span class="method">`CollapseAll()`</span> | Collapses every branch. |
| <span class="method">`SelectSource(object source)`</span> | Selects the item of the `ItemsSource` object, also one in a branch that was not expanded yet. Nothing happens when there is none. |

Items the tree view made (around your elements, or for source objects) are disposed when they are removed; your own
`TreeViewItem`s are let go with their branches and can be added again.

Style class: `TreeViewStyle` (the same properties except `SelectedItem` and `ItemsSource`, see
[styles](/docs/ui-styles/)).

### TreeViewItem

An item of a tree view: an expand icon and its content, with leaves below it. Items added in code can be made with
the constructor; the items of source objects are made by the tree view. When an item is added to another item, it
gets its place in the tree: its `Name` and its indentation are set by the item it joins.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`IsExpanded`</span> | `bool` | Whether the leaves are shown (while the items above are expanded too). An item without leaves is never expanded. An item of a source object makes the items of its children the first time it is expanded. |
| <span class="prop">`Leaves`</span> | `IReadOnlyList<TreeViewItem>` | Read-only. The items one level below. Empty for an item of a source object until it is first expanded. |
| <span class="prop">`HasLeaves`</span> | `bool` | Read-only. Whether the item has leaves, also an item of a source object whose children were not made into items yet. |
| <span class="prop">`Source`</span> | `object` | Read-only. The `ItemsSource` object the item shows, `null` for an item added in code. |
| <span class="prop">`MouseCursorsSet`</span> | `MouseCursorsSet` | Read-only. The mouse cursors of the row the item is shown in. |

| Method | Description |
| --- | --- |
| <span class="method">`TreeViewItem(TreeView parentTreeView, BaseElement content, Margin shift, string name = null)`</span> | Creates an item of the tree view showing the content. `shift` is its indentation until it is added to the tree, which sets its own. |
| <span class="method">`AddItem(BaseElement item)`</span> | Adds a leaf; an element that is not a `TreeViewItem` is put in one. Does nothing for an item of a source object. |
| <span class="method">`AddItemAt(BaseElement item, int index)`</span> | Inserts a leaf at the index. |
| <span class="method">`AddItemsRange(IEnumerable<BaseElement> items)`</span> | Adds leaves at the end, listed in one go. |
| <span class="method">`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)`</span> | Inserts leaves at the index, listed in one go. |
| <span class="method">`RemoveItem(BaseElement item)`</span> | Removes the item (or the item made around the element) from anywhere in this item's branch. |
| <span class="method">`RemoveItemAt(int index)`</span> | Removes the leaf at the index, with its branch. |
| <span class="method">`RemoveItemsRangeAt(int index, int count)`</span> | Removes `count` leaves from the index on. |
| <span class="method">`ClearItems()`</span> | Removes every leaf. |

## ContextMenu

A menu that opens at the mouse on a right click, drawn above everything. Its items are `ContextMenuItem`s,
separators, or the objects of an `ItemsSource`; an item can be checkable and can open a sub-menu.

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

var menu = new ContextMenu("listMenu");
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
inside it that has no menu of its own, opens the menu at the mouse. The element must take the mouse (`HitTest`), which
is why the label above sets it. `Open(point)` opens the menu at a point of the screen from code. The menu is placed by
`Placement` and `MarginFromMouseCursor` and kept on the screen; a menu taller than the screen scrolls.

**Keyboard.** The open menu takes the keyboard, and every key while it is open:

| Key | Effect |
| --- | --- |
| Up, Down, Page Up, Page Down, Home, End | Move the selection over the items, passing over separators. |
| Enter, Space | Choose the selected item. |
| Right | Opens the sub-menu of the selected item and selects its first item. |
| Left | Closes the sub-menu the keys are in. |
| Escape | Closes the sub-menu the keys are in, or the menu itself. |

The keys go to the deepest open sub-menu that has a selected item. Moving the mouse over an item selects it too.

**Choosing.** Clicking an item or pressing Enter on it chooses it: a checkable item switches `IsChecked`, the whole menu
closes and the element that had the keyboard before gets it back, then the item's `OnClick` and the menu's
`OnItemSelect` are raised. An item that opens a sub-menu is not chosen, it opens its sub-menu. A disabled item can't be
chosen. A press somewhere else, another element taking the keyboard, or the menu's element being hidden or removed
also closes the menu.

**Sub-menus.** Set an item's `SubMenu` to another `ContextMenu`. It opens to the right of the menu, level with its
item, or to the left when there is no room on the right. With `SubMenusOpenType` set to `OnHover` (the default) it
opens when the mouse is over its item; with `OnClick` a click on the item opens or closes it. A sub-menu is opened
by its item only, not by `Open`.

**From data.** `ItemsSource` gives an item per object, with content made by `ItemsTemplate` (a label with the
object's text when none is set); a [`BindableCollection<T>`](/docs/ui-styles/#bindings) is followed. While an
`ItemsSource` is set, items are not added or removed in code.

An element added with `AddItem` that is neither a `ContextMenuItem` nor a `Separator` is put in an item the menu
makes; such items are disposed when they are removed, your own items are only let go (with their sub-menus).

### ContextMenu properties

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`Items`</span> | `IReadOnlyList<BaseElement>` | Read-only. The items and separators of the menu, in order. |
| <span class="prop">`IsOpen`</span> | `bool` | Read-only. Whether the menu is open. |
| <span class="prop">`ParentItem`</span> | `ContextMenuItem` | Read-only. The item whose sub-menu this menu is, `null` for the menu of an element. |
| <span class="dp">`ItemsSource`</span> | `IEnumerable` | The objects to show, one item each. A `BindableCollection<T>` is followed. |
| <span class="prop">`ItemsTemplate`</span> | `IItemsTemplate` | Makes the content of the item of each `ItemsSource` object; a label with the object's text when none is set. |
| <span class="dp">`Placement`</span> | `ContextMenuPlacement` | On which side of the point the menu opens. `BottomRight` by default. |
| <span class="dp">`MarginFromMouseCursor`</span> | `Margin` | An offset added to the point the menu opens at: `Left` to the x, `Top` to the y, in units. |
| <span class="dp">`SubMenusOpenType`</span> | `ContextMenuSubMenusOpenType` | Whether the sub-menus of this menu's items open on hover (`OnHover`, the default) or on click. |
| <span class="dp">`BorderStyle`</span> | `BorderStyle` | The style of the [border](/docs/ui-layout/#border) around the items. By default a white background with a 1 unit dark grey border. |
| <span class="dp">`ListBoxStyle`</span> | `ListBoxStyle` | The style of the list of the items. By default transparent rows, highlighted in light blue under the mouse and when selected. |
| <span class="dp">`CheckIconStyle`</span> | `ImageStyle` | The style of the check mark of a checked item. By default an 8 by 8 unit dark grey square. |
| <span class="dp">`ExpandIconStyle`</span> | `ImageStyle` | The style of the arrow of an item with a sub-menu. By default a 6 by 8 unit dark grey block at the right end. |

### ContextMenu events

| Event | Handler | Raised when |
| --- | --- | --- |
| <span class="event">`OnItemSelect`</span> | `(BaseElement sender, ContextMenuItem item)` | An item of the menu or of one of its sub-menus is chosen. It is raised by the menu of the element; the sender is the menu the item is in. |

### ContextMenu methods

| Method | Description |
| --- | --- |
| <span class="method">`ContextMenu(string name = null)`</span> | Creates a closed menu. The name is used by `GetElementByName`. |
| <span class="method">`Open(Point position)`</span> | Opens the menu at a point of the screen, placed by `Placement` and `MarginFromMouseCursor` and kept on the screen. Only a menu in the element tree that can take the keyboard opens; a sub-menu doesn't. |
| <span class="method">`Close()`</span> | Closes the menu with its open sub-menus, and gives the keyboard back to the element that had it before. On a sub-menu it closes only that sub-menu. |
| <span class="method">`AddItem(BaseElement item)`</span> | Adds an item at the end. A `ContextMenuItem` or `Separator` is added as is, another element is put in an item. Does nothing while an `ItemsSource` is set. |
| <span class="method">`AddItemAt(BaseElement item, int index)`</span> | Inserts an item at the index. |
| <span class="method">`AddItemsRange(IEnumerable<BaseElement> items)`</span> | Adds items at the end. |
| <span class="method">`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)`</span> | Inserts items at the index. |
| <span class="method">`RemoveItem(BaseElement item)`</span> | Removes the item, or the item made around the element. |
| <span class="method">`RemoveItemAt(int index)`</span> | Removes the item at the index. |
| <span class="method">`RemoveItemsRangeAt(int index, int count)`</span> | Removes `count` items from the index on. |
| <span class="method">`ClearItems()`</span> | Removes every item. |

#### `ContextMenuPlacement`

| Value | Meaning |
| --- | --- |
| `TopLeft` | The menu opens above the point and to its left. |
| `TopRight` | The menu opens above the point and to its right. |
| `BottomLeft` | The menu opens below the point and to its left. |
| `BottomRight` | The menu opens below the point and to its right (its top left corner at the point). |

#### `ContextMenuSubMenusOpenType`

| Value | Meaning |
| --- | --- |
| `OnHover` | A sub-menu opens when the mouse is over its item. |
| `OnClick` | A click on the item opens or closes its sub-menu. |

Style class: `ContextMenuStyle` (the same properties except `ItemsSource`, see [styles](/docs/ui-styles/)).

### ContextMenuItem

An item of a context menu: a check mark while it is checkable and checked, its content, and an arrow at the right
end when it opens a sub-menu. The item is stretched over its row; the row takes the mouse and the item shows its
state. Choosing it, with a click or the keyboard, raises its `OnClick` and the menu's `OnItemSelect`.

| Property | Type | Description |
| --- | --- | --- |
| <span class="prop">`Content`</span> | `BaseElement` | Read-only. The element the item shows, given when it is made. |
| <span class="prop">`IsCheckable`</span> | `bool` | Whether choosing the item switches `IsChecked`. Setting it to `false` also clears `IsChecked`. |
| <span class="prop">`IsChecked`</span> | `bool` | Whether the check mark of a checkable item is shown. |
| <span class="prop">`SubMenu`</span> | `ContextMenu` | The menu opened next to the item, on hover or click (see the menu's `SubMenusOpenType`). The arrow shows while it has items. |
| <span class="prop">`HasSubItems`</span> | `bool` | Read-only. Whether the item has a sub-menu with at least one item. |
| <span class="prop">`ParentMenu`</span> | `ContextMenu` | Read-only. The menu the item is in. |
| <span class="prop">`Source`</span> | `object` | Read-only. The `ItemsSource` object the item shows, `null` for an item added in code. |
| <span class="prop">`MouseCursorsSet`</span> | `MouseCursorsSet` | Read-only. The mouse cursors of the row the item is in. |

| Method | Description |
| --- | --- |
| <span class="method">`ContextMenuItem(string text, string name = null)`</span> | Creates an item showing the text in a label. |
| <span class="method">`ContextMenuItem(BaseElement content, string name = null)`</span> | Creates an item showing any element. |
