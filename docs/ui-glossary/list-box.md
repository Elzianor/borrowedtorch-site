---
layout: docs
title: "Glossary: ListBox"
description: The properties, methods and events of ListBox, in alphabetical order.
---

A scrollable list of rows with single or multiple selection. A row can be a text, any element, or an object of an `ItemsSource`, and long lists can be virtualized so only the rows in view have elements.

`ListBox` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#listbox) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="alternativeitemcolor"><span class="dp"><code>AlternativeItemColor</code></span></h3>

`Color` · The background of the odd unselected rows while `UseDualColors` is set. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="contentheight"><span class="prop"><code>ContentHeight</code></span></h3>

`int` · Read-only. The height of all the shown rows together, in units (`Count` times `ItemHeight` in `Fixed` mode). ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="contentwidth"><span class="prop"><code>ContentWidth</code></span></h3>

`int` · Read-only. The width of the widest row content, in units (in `Fixed` mode the widest seen since the rows were cleared). ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="count"><span class="prop"><code>Count</code></span></h3>

`int` · Read-only. The number of rows, in every virtualization mode. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`ListBoxStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="hoveritemcolor"><span class="dp"><code>HoverItemColor</code></span></h3>

`Color?` · The background of the row under the mouse. When `null` the row keeps its normal or selected colour. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="itemheight"><span class="dp"><code>ItemHeight</code></span></h3>

`int` · The height of every row in `Fixed` mode, in units. `Fixed` mode has no effect while it is 0 or less. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="items"><span class="prop"><code>Items</code></span></h3>

`IReadOnlyList<ListBoxItem>` · Read-only. The rows that have an element, in order: every row in `None` mode, the rows around the view and the primary selected row in `Fixed` mode. A live view, don't keep it across changes. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="itemssource"><span class="dp"><code>ItemsSource</code></span></h3>

`IEnumerable` · The objects to show, one row each. A `BindableCollection<T>` is followed. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="itemstemplate"><span class="prop"><code>ItemsTemplate</code></span></h3>

`IItemsTemplate` · Makes the element of each `ItemsSource` object; a label with the object's text when none is set. Changing it builds the rows again. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="normalitemcolor"><span class="dp"><code>NormalItemColor</code></span></h3>

`Color` · The background of an unselected row (of the even rows with `UseDualColors`). ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="presseditemcolor"><span class="dp"><code>PressedItemColor</code></span></h3>

`Color?` · The background of a row while the left button is pressed on it. When `null` it doesn't change. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="rowsperpage"><span class="prop"><code>RowsPerPage</code></span></h3>

`int` · Read-only. The number of rows that fit the view, at least one: the view's height divided by `ItemHeight` in `Fixed` mode, by the average row height otherwise. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="scrollablecontainerstyle"><span class="dp"><code>ScrollableContainerStyle</code></span></h3>

`ScrollableContainerStyle` · The style of the [scrollable container](/docs/ui-layout/#scrollablecontainer) around the rows, for example its scroll bars and their thickness. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="selectedindex"><span class="dp"><code>SelectedIndex</code></span></h3>

`int` · The index of the primary selected row, `-1` when nothing is selected. Setting it selects that row (the value is clamped to the rows); a negative value clears the selection. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="selectedindices"><span class="prop"><code>SelectedIndices</code></span></h3>

`IReadOnlyList<int>` · Read-only. The indices of all selected rows, with an element or not. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="selecteditem"><span class="dp"><code>SelectedItem</code></span></h3>

`ListBoxItem` · The primary selected row, `null` when nothing is selected. Setting it selects that row; `null` clears the selection. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="selecteditemcolor"><span class="dp"><code>SelectedItemColor</code></span></h3>

`Color?` · The background of a selected row. When `null` a selected row keeps the colour it had. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="selecteditems"><span class="prop"><code>SelectedItems</code></span></h3>

`IReadOnlyList<ListBoxItem>` · Read-only. The selected rows that have an element (see `Items`). ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="selectedsources"><span class="prop"><code>SelectedSources</code></span></h3>

`IReadOnlyList<object>` · Read-only. The source objects of all selected rows, `null` for rows added as elements or text. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="selectionmode"><span class="dp"><code>SelectionMode</code></span></h3>

`ListBoxSelectionMode` · Whether one row or several rows can be selected. `Single` by default. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`ListBoxStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="usedualcolors"><span class="dp"><code>UseDualColors</code></span></h3>

`bool` · Alternates the background of unselected rows: `NormalItemColor` for even indices, `AlternativeItemColor` for odd ones. ([in context](/docs/ui-lists/#listbox-properties))

<h3 id="virtualizationmode"><span class="dp"><code>VirtualizationMode</code></span></h3>

`ListBoxVirtualizationMode` · Whether every row has an element (`None`, the default) or only the rows around the view (`Fixed`). ([in context](/docs/ui-lists/#listbox-properties))

## Methods

<h3 id="additem"><span class="method"><code>AddItem()</code></span></h3>

`AddItem(BaseElement item)` · Adds a row at the end. A `ListBoxItem` is the row itself, any other element is shown in a row the list makes.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span></h3>

`AddItemAt(BaseElement item, int index)` · Inserts a row at the index (0 to `Count`); another index is ignored.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span></h3>

`AddItemsRange(IEnumerable<BaseElement> items)` · Adds a row per element at the end, in one batch (the rows are indexed and laid out once).

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span></h3>

`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)` · Inserts a row per element at the index, in one batch.

<h3 id="addtextitem"><span class="method"><code>AddTextItem()</code></span></h3>

`AddTextItem(string text)` · Adds a text row. Does nothing while an `ItemsSource` is set.

<h3 id="addtextitems"><span class="method"><code>AddTextItems()</code></span></h3>

`AddTextItems(IEnumerable<string> texts)` · Adds a text row per string, in one batch. Does nothing while an `ItemsSource` is set.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span></h3>

`ClearItems()` · Removes every row.

<h3 id="deselect"><span class="method"><code>Deselect()</code></span></h3>

`Deselect(BaseElement item)` · Deselects the row of the item, as `DeselectAt` does.

<h3 id="deselectall"><span class="method"><code>DeselectAll()</code></span></h3>

`DeselectAll()` · Deselects every row.

<h3 id="deselectat"><span class="method"><code>DeselectAt()</code></span></h3>

`DeselectAt(int index)` · Deselects the row at the index. If it was the primary row, the first row that is still selected becomes the primary one.

<h3 id="moveselection"><span class="method"><code>MoveSelection()</code></span></h3>

`MoveSelection(int delta)` · Moves the selection by `delta` rows (clamped to the list, separators and collapsed rows passed over) and scrolls it into view. With no selection it selects the first row (`delta` above 0) or the last.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span></h3>

`RemoveItem(BaseElement item)` · Removes the row of the item (the row itself or the element shown in it).

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span></h3>

`RemoveItemAt(int index)` · Removes the row at the index.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span></h3>

`RemoveItemsRangeAt(int index, int count)` · Removes `count` rows from the index on (as many as there are).

<h3 id="scrollintoview"><span class="method"><code>ScrollIntoView()</code></span></h3>

`ScrollIntoView(int index)` · Scrolls the list so the row at the index is entirely in view. Needs the list laid out; nothing happens for a row that is in view already.

<h3 id="select"><span class="method"><code>Select()</code></span></h3>

`Select(BaseElement item)` · Selects the row of the item (the row itself or the element shown in it), as `SelectAt` does.

<h3 id="selectall"><span class="method"><code>SelectAll()</code></span></h3>

`SelectAll()` · Selects every row except separators; the last one becomes the primary row. In `Single` mode it selects the first selectable row, and only when nothing is selected.

<h3 id="selectat"><span class="method"><code>SelectAt()</code></span></h3>

`SelectAt(int index)` · Makes the row at the index the selected row; the other rows are deselected, also in `Multiple` mode. An index out of range is ignored.

<h3 id="selectnext"><span class="method"><code>SelectNext()</code></span></h3>

`SelectNext()` · Selects the next row (separators and collapsed rows passed over) and scrolls it into view. Does nothing without a selection.

<h3 id="selectprevious"><span class="method"><code>SelectPrevious()</code></span></h3>

`SelectPrevious()` · Selects the previous row (separators and collapsed rows passed over) and scrolls it into view. Does nothing without a selection.

<h3 id="selectsource"><span class="method"><code>SelectSource()</code></span></h3>

`SelectSource(object source)` · Selects the row whose `Source` is the object. Nothing happens when there is none.

## Events

<h3 id="onitemselect"><span class="event"><code>OnItemSelect</code></span></h3>

`(BaseElement sender, ListBoxItem item)` · The primary selection is set, by the user or from code. `item` is `null` when nothing is selected any more. ([in context](/docs/ui-lists/#listbox-events))

<h3 id="onitemsselect"><span class="event"><code>OnItemsSelect</code></span></h3>

`(BaseElement sender, IReadOnlyList<ListBoxItem> items)` · The set of selected rows changes. `items` is `SelectedItems`, the selected rows that have an element. ([in context](/docs/ui-lists/#listbox-events))
