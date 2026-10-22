---
layout: docs
title: "Glossary: ComboBox"
description: The properties, methods and events of ComboBox, in alphabetical order.
---

A selection image, a toggle button and a drop-down list box: the closed combo box shows the selected row, the open one lists all rows to choose from.

`ComboBox` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#combobox) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`ComboBoxStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="items"><span class="prop"><code>Items</code></span></h3>

`IReadOnlyList<ListBoxItem>` · Read-only. The rows of the drop-down list that have an element (see the list box's `Items`). ([in context](/docs/ui-lists/#combobox-properties))

<h3 id="itemssource"><span class="dp"><code>ItemsSource</code></span></h3>

`IEnumerable` · The objects to show, one row each. A `BindableCollection<T>` is followed. ([in context](/docs/ui-lists/#combobox-properties))

<h3 id="itemstemplate"><span class="prop"><code>ItemsTemplate</code></span></h3>

`IItemsTemplate` · Makes the element of each `ItemsSource` object; a label with the object's text when none is set. ([in context](/docs/ui-lists/#combobox-properties))

<h3 id="listboxstyle"><span class="dp"><code>ListBoxStyle</code></span></h3>

`ListBoxStyle` · The style of the drop-down list, for example its row colours. ([in context](/docs/ui-lists/#combobox-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="selectedindex"><span class="dp"><code>SelectedIndex</code></span></h3>

`int` · The index of the selected row, `-1` when nothing is selected. ([in context](/docs/ui-lists/#combobox-properties))

<h3 id="selecteditem"><span class="dp"><code>SelectedItem</code></span></h3>

`ListBoxItem` · The selected row, `null` when nothing is selected. Setting it selects that row. ([in context](/docs/ui-lists/#combobox-properties))

<h3 id="selectedsource"><span class="prop"><code>SelectedSource</code></span></h3>

`object` · Read-only. The `ItemsSource` object of the selected row, `null` without one. ([in context](/docs/ui-lists/#combobox-properties))

<h3 id="selectionstyle"><span class="dp"><code>SelectionStyle</code></span></h3>

`ImageStyle` · The style of the image that shows the selected row. ([in context](/docs/ui-lists/#combobox-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`ComboBoxStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="togglebuttonstyle"><span class="dp"><code>ToggleButtonStyle</code></span></h3>

`ButtonStyle` · The style of the [button](/docs/ui-controls/#button) that opens and closes the list, for example its width and text. ([in context](/docs/ui-lists/#combobox-properties))

## Methods

<h3 id="additem"><span class="method"><code>AddItem()</code></span></h3>

`AddItem(BaseElement item)` · Adds a row at the end of the list.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span></h3>

`AddItemAt(BaseElement item, int index)` · Inserts a row at the index.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span></h3>

`AddItemsRange(IEnumerable<BaseElement> items)` · Adds a row per element at the end, in one batch.

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span></h3>

`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)` · Inserts a row per element at the index, in one batch.

<h3 id="addtextitem"><span class="method"><code>AddTextItem()</code></span></h3>

`AddTextItem(string text)` · Adds a text row. Does nothing while an `ItemsSource` is set.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span></h3>

`ClearItems()` · Removes every row.

<h3 id="deselect"><span class="method"><code>Deselect()</code></span></h3>

`Deselect(BaseElement item)` · Deselects the row of the item.

<h3 id="deselectat"><span class="method"><code>DeselectAt()</code></span></h3>

`DeselectAt(int index)` · Deselects the row at the index.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span></h3>

`RemoveItem(BaseElement item)` · Removes the row of the item.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span></h3>

`RemoveItemAt(int index)` · Removes the row at the index.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span></h3>

`RemoveItemsRangeAt(int index, int count)` · Removes `count` rows from the index on.

<h3 id="select"><span class="method"><code>Select()</code></span></h3>

`Select(BaseElement item)` · Selects the row of the item.

<h3 id="selectat"><span class="method"><code>SelectAt()</code></span></h3>

`SelectAt(int index)` · Selects the row at the index.

<h3 id="selectnext"><span class="method"><code>SelectNext()</code></span></h3>

`SelectNext()` · Selects the next row (separators passed over). Does nothing without a selection.

<h3 id="selectprevious"><span class="method"><code>SelectPrevious()</code></span></h3>

`SelectPrevious()` · Selects the previous row (separators passed over). Does nothing without a selection.

<h3 id="selectsource"><span class="method"><code>SelectSource()</code></span></h3>

`SelectSource(object source)` · Selects the row of the `ItemsSource` object. Nothing happens when there is none.

## Events

<h3 id="onitemselect"><span class="event"><code>OnItemSelect</code></span></h3>

`(BaseElement sender, ListBoxItem item)` · The selection changes, by the user or from code. The sender is the combo box, `item` a row of its drop-down list, `null` when nothing is selected any more. ([in context](/docs/ui-lists/#combobox-events))
