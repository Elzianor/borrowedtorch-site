---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: ListBox"
description: "The properties, methods and events of ListBox, in alphabetical order."
---

A scrollable list of rows with single or multiple selection. A row can be a text, any element, or an object of an

`ListBox` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#listbox) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="alternativeitemcolor"><span class="dp"><code>AlternativeItemColor</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="AlternativeItemColor in context on the lists and menus page" aria-label="AlternativeItemColor in context on the lists and menus page">➤</a></h3>

`Color` · The background of the odd unselected rows while <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#usedualcolors">`UseDualColors`</a> is set.

<h3 id="contentheight"><span class="prop"><code>ContentHeight</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="ContentHeight in context on the lists and menus page" aria-label="ContentHeight in context on the lists and menus page">➤</a></h3>

`int` · Read-only. The height of all the shown rows together, in units (<a class="ref prop" href="/docs/ui-glossary/elements/list-box/#count">`Count`</a> times <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> in `Fixed` mode).

<h3 id="contentwidth"><span class="prop"><code>ContentWidth</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="ContentWidth in context on the lists and menus page" aria-label="ContentWidth in context on the lists and menus page">➤</a></h3>

`int` · Read-only. The width of the widest row content, in units (in `Fixed` mode the widest seen since the rows were cleared).

<h3 id="count"><span class="prop"><code>Count</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="Count in context on the lists and menus page" aria-label="Count in context on the lists and menus page">➤</a></h3>

`int` · Read-only. The number of rows, in every virtualization mode.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="hoveritemcolor"><span class="dp"><code>HoverItemColor</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="HoverItemColor in context on the lists and menus page" aria-label="HoverItemColor in context on the lists and menus page">➤</a></h3>

`Color?` · The background of the row under the mouse. When `null` the row keeps its normal or selected colour.

<h3 id="itemheight"><span class="dp"><code>ItemHeight</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="ItemHeight in context on the lists and menus page" aria-label="ItemHeight in context on the lists and menus page">➤</a></h3>

`int` · The height of every row in `Fixed` mode, in units. `Fixed` mode has no effect while it is 0 or less.

<h3 id="items"><span class="prop"><code>Items</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="Items in context on the lists and menus page" aria-label="Items in context on the lists and menus page">➤</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a>&gt;</code> · Read-only. The rows that have an element, in order: every row in `None` mode, the rows around the view and the primary selected row in `Fixed` mode. A live view, don't keep it across changes.

<h3 id="itemssource"><span class="dp"><code>ItemsSource</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="ItemsSource in context on the lists and menus page" aria-label="ItemsSource in context on the lists and menus page">➤</a></h3>

`IEnumerable` · The objects to show, one row each. A <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is followed.

<h3 id="itemstemplate"><span class="prop"><code>ItemsTemplate</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="ItemsTemplate in context on the lists and menus page" aria-label="ItemsTemplate in context on the lists and menus page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/i-items-template/">`IItemsTemplate`</a> · Makes the element of each <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a> object; a label with the object's text when none is set. Changing it builds the rows again.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="normalitemcolor"><span class="dp"><code>NormalItemColor</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="NormalItemColor in context on the lists and menus page" aria-label="NormalItemColor in context on the lists and menus page">➤</a></h3>

`Color` · The background of an unselected row (of the even rows with <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#usedualcolors">`UseDualColors`</a>).

<h3 id="presseditemcolor"><span class="dp"><code>PressedItemColor</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="PressedItemColor in context on the lists and menus page" aria-label="PressedItemColor in context on the lists and menus page">➤</a></h3>

`Color?` · The background of a row while the left button is pressed on it. When `null` it doesn't change.

<h3 id="rowsperpage"><span class="prop"><code>RowsPerPage</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="RowsPerPage in context on the lists and menus page" aria-label="RowsPerPage in context on the lists and menus page">➤</a></h3>

`int` · Read-only. The number of rows that fit the view, at least one: the view's height divided by <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> in `Fixed` mode, by the average row height otherwise.

<h3 id="scrollablecontainerstyle"><span class="dp"><code>ScrollableContainerStyle</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="ScrollableContainerStyle in context on the lists and menus page" aria-label="ScrollableContainerStyle in context on the lists and menus page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a> · The style of the [scrollable container](/docs/ui-layout/#scrollablecontainer) around the rows, for example its scroll bars and their thickness.

<h3 id="selectedindex"><span class="dp"><code>SelectedIndex</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="SelectedIndex in context on the lists and menus page" aria-label="SelectedIndex in context on the lists and menus page">➤</a></h3>

`int` · The index of the primary selected row, `-1` when nothing is selected. Setting it selects that row (the value is clamped to the rows); a negative value clears the selection.

<h3 id="selectedindices"><span class="prop"><code>SelectedIndices</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="SelectedIndices in context on the lists and menus page" aria-label="SelectedIndices in context on the lists and menus page">➤</a></h3>

`IReadOnlyList<int>` · Read-only. The indices of all selected rows, with an element or not.

<h3 id="selecteditem"><span class="dp"><code>SelectedItem</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="SelectedItem in context on the lists and menus page" aria-label="SelectedItem in context on the lists and menus page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/list-box-item/">`ListBoxItem`</a> · The primary selected row, `null` when nothing is selected. Setting it selects that row; `null` clears the selection.

<h3 id="selecteditemcolor"><span class="dp"><code>SelectedItemColor</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="SelectedItemColor in context on the lists and menus page" aria-label="SelectedItemColor in context on the lists and menus page">➤</a></h3>

`Color?` · The background of a selected row. When `null` a selected row keeps the colour it had.

<h3 id="selecteditems"><span class="prop"><code>SelectedItems</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="SelectedItems in context on the lists and menus page" aria-label="SelectedItems in context on the lists and menus page">➤</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a>&gt;</code> · Read-only. The selected rows that have an element (see <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#items">`Items`</a>).

<h3 id="selectedsources"><span class="prop"><code>SelectedSources</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="SelectedSources in context on the lists and menus page" aria-label="SelectedSources in context on the lists and menus page">➤</a></h3>

`IReadOnlyList<object>` · Read-only. The source objects of all selected rows, `null` for rows added as elements or text.

<h3 id="selectionmode"><span class="dp"><code>SelectionMode</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="SelectionMode in context on the lists and menus page" aria-label="SelectionMode in context on the lists and menus page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-selection-mode/">`ListBoxSelectionMode`</a> · Whether one row or several rows can be selected. `Single` by default.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="usedualcolors"><span class="dp"><code>UseDualColors</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="UseDualColors in context on the lists and menus page" aria-label="UseDualColors in context on the lists and menus page">➤</a></h3>

`bool` · Alternates the background of unselected rows: <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#normalitemcolor">`NormalItemColor`</a> for even indices, <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#alternativeitemcolor">`AlternativeItemColor`</a> for odd ones.

<h3 id="virtualizationmode"><span class="dp"><code>VirtualizationMode</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="VirtualizationMode in context on the lists and menus page" aria-label="VirtualizationMode in context on the lists and menus page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-virtualization-mode/">`ListBoxVirtualizationMode`</a> · Whether every row has an element (`None`, the default) or only the rows around the view (`Fixed`).

## Methods

<h3 id="listbox"><span class="method"><code>ListBox()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="ListBox() in context on the lists and menus page" aria-label="ListBox() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#listbox">`ListBox(string name = null)`</a> · Creates a list box. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

<h3 id="additem"><span class="method"><code>AddItem()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="AddItem() in context on the lists and menus page" aria-label="AddItem() in context on the lists and menus page">➤</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Adds a row at the end. A <a class="ref" href="/docs/ui-glossary/elements/list-box-item/">`ListBoxItem`</a> is the row itself, any other element is shown in a row the list makes.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="AddItemAt() in context on the lists and menus page" aria-label="AddItemAt() in context on the lists and menus page">➤</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> · Inserts a row at the index (0 to <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#count">`Count`</a>); another index is ignored.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="AddItemsRange() in context on the lists and menus page" aria-label="AddItemsRange() in context on the lists and menus page">➤</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> · Adds a row per element at the end, in one batch (the rows are indexed and laid out once).

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="AddItemsRangeAt() in context on the lists and menus page" aria-label="AddItemsRangeAt() in context on the lists and menus page">➤</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> · Inserts a row per element at the index, in one batch.

<h3 id="addtextitem"><span class="method"><code>AddTextItem()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="AddTextItem() in context on the lists and menus page" aria-label="AddTextItem() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#addtextitem">`AddTextItem(string text)`</a> · Adds a text row. Does nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a> is set.

<h3 id="addtextitems"><span class="method"><code>AddTextItems()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="AddTextItems() in context on the lists and menus page" aria-label="AddTextItems() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#addtextitems">`AddTextItems(IEnumerable<string> texts)`</a> · Adds a text row per string, in one batch. Does nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemssource">`ItemsSource`</a> is set.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="ClearItems() in context on the lists and menus page" aria-label="ClearItems() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#clearitems">`ClearItems()`</a> · Removes every row.

<h3 id="deselect"><span class="method"><code>Deselect()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="Deselect() in context on the lists and menus page" aria-label="Deselect() in context on the lists and menus page">➤</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#deselect">Deselect</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Deselects the row of the item, as <a class="ref method" href="/docs/ui-glossary/elements/list-box/#deselectat">`DeselectAt`</a> does.

<h3 id="deselectall"><span class="method"><code>DeselectAll()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="DeselectAll() in context on the lists and menus page" aria-label="DeselectAll() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#deselectall">`DeselectAll()`</a> · Deselects every row.

<h3 id="deselectat"><span class="method"><code>DeselectAt()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="DeselectAt() in context on the lists and menus page" aria-label="DeselectAt() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#deselectat">`DeselectAt(int index)`</a> · Deselects the row at the index. If it was the primary row, the first row that is still selected becomes the primary one.

<h3 id="moveselection"><span class="method"><code>MoveSelection()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="MoveSelection() in context on the lists and menus page" aria-label="MoveSelection() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#moveselection">`MoveSelection(int delta)`</a> · Moves the selection by `delta` rows (clamped to the list, separators and collapsed rows passed over) and scrolls it into view. With no selection it selects the first row (`delta` above 0) or the last.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="RemoveItem() in context on the lists and menus page" aria-label="RemoveItem() in context on the lists and menus page">➤</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Removes the row of the item (the row itself or the element shown in it).

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="RemoveItemAt() in context on the lists and menus page" aria-label="RemoveItemAt() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#removeitemat">`RemoveItemAt(int index)`</a> · Removes the row at the index.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="RemoveItemsRangeAt() in context on the lists and menus page" aria-label="RemoveItemsRangeAt() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> · Removes `count` rows from the index on (as many as there are).

<h3 id="scrollintoview"><span class="method"><code>ScrollIntoView()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="ScrollIntoView() in context on the lists and menus page" aria-label="ScrollIntoView() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#scrollintoview">`ScrollIntoView(int index)`</a> · Scrolls the list so the row at the index is entirely in view. Needs the list laid out; nothing happens for a row that is in view already.

<h3 id="select"><span class="method"><code>Select()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="Select() in context on the lists and menus page" aria-label="Select() in context on the lists and menus page">➤</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/list-box/#select">Select</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Selects the row of the item (the row itself or the element shown in it), as <a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectat">`SelectAt`</a> does.

<h3 id="selectall"><span class="method"><code>SelectAll()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="SelectAll() in context on the lists and menus page" aria-label="SelectAll() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectall">`SelectAll()`</a> · Selects every row except separators; the last one becomes the primary row. In `Single` mode it selects the first selectable row, and only when nothing is selected.

<h3 id="selectat"><span class="method"><code>SelectAt()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="SelectAt() in context on the lists and menus page" aria-label="SelectAt() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectat">`SelectAt(int index)`</a> · Makes the row at the index the selected row; the other rows are deselected, also in `Multiple` mode. An index out of range is ignored.

<h3 id="selectnext"><span class="method"><code>SelectNext()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="SelectNext() in context on the lists and menus page" aria-label="SelectNext() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectnext">`SelectNext()`</a> · Selects the next row (separators and collapsed rows passed over) and scrolls it into view. Does nothing without a selection.

<h3 id="selectprevious"><span class="method"><code>SelectPrevious()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="SelectPrevious() in context on the lists and menus page" aria-label="SelectPrevious() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectprevious">`SelectPrevious()`</a> · Selects the previous row (separators and collapsed rows passed over) and scrolls it into view. Does nothing without a selection.

<h3 id="selectsource"><span class="method"><code>SelectSource()</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-methods" title="SelectSource() in context on the lists and menus page" aria-label="SelectSource() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/list-box/#selectsource">`SelectSource(object source)`</a> · Selects the row whose `Source` is the object. Nothing happens when there is none.

## Events

<h3 id="onitemselect"><span class="event"><code>OnItemSelect</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-events" title="OnItemSelect in context on the lists and menus page" aria-label="OnItemSelect in context on the lists and menus page">➤</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a> item)</code> · The primary selection is set, by the user or from code. `item` is `null` when nothing is selected any more.

<h3 id="onitemsselect"><span class="event"><code>OnItemsSelect</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-events" title="OnItemsSelect in context on the lists and menus page" aria-label="OnItemsSelect in context on the lists and menus page">➤</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a>&gt; items)</code> · The set of selected rows changes. `items` is <a class="ref prop" href="/docs/ui-glossary/elements/list-box/#selecteditems">`SelectedItems`</a>, the selected rows that have an element.
