---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: ComboBox"
description: "The properties, methods and events of ComboBox, in alphabetical order."
---

A selection image, a toggle button and a drop-down list box: the closed combo box shows the selected row, the open one lists all rows to choose from.

`ComboBox` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#combobox) shows it in context, with code and screenshots.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/combo-box-style/">`ComboBoxStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="items"><span class="prop"><code>Items</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="Items in context on the lists and menus page" aria-label="Items in context on the lists and menus page">🠆</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a>&gt;</code> · Read-only. The rows of the drop-down list that have an element (see the list box's <a class="ref prop" href="/docs/ui-glossary/elements/combo-box/#items">`Items`</a>).

<h3 id="itemssource"><span class="dp"><code>ItemsSource</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="ItemsSource in context on the lists and menus page" aria-label="ItemsSource in context on the lists and menus page">🠆</a></h3>

`IEnumerable` · The objects to show, one row each. A <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is followed.

<h3 id="itemstemplate"><span class="prop"><code>ItemsTemplate</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="ItemsTemplate in context on the lists and menus page" aria-label="ItemsTemplate in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/i-items-template/">`IItemsTemplate`</a> · Makes the element of each <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> object; a label with the object's text when none is set.

<h3 id="listboxstyle"><span class="dp"><code>ListBoxStyle</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="ListBoxStyle in context on the lists and menus page" aria-label="ListBoxStyle in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> · The style of the drop-down list, for example its row colors.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="selectedindex"><span class="dp"><code>SelectedIndex</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="SelectedIndex in context on the lists and menus page" aria-label="SelectedIndex in context on the lists and menus page">🠆</a></h3>

`int` · The index of the selected row, `-1` when nothing is selected.

<h3 id="selecteditem"><span class="dp"><code>SelectedItem</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="SelectedItem in context on the lists and menus page" aria-label="SelectedItem in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/list-box-item/">`ListBoxItem`</a> · The selected row, `null` when nothing is selected. Setting it selects that row.

<h3 id="selectedsource"><span class="prop"><code>SelectedSource</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="SelectedSource in context on the lists and menus page" aria-label="SelectedSource in context on the lists and menus page">🠆</a></h3>

`object` · Read-only. The <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> object of the selected row, `null` without one.

<h3 id="selectionstyle"><span class="dp"><code>SelectionStyle</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="SelectionStyle in context on the lists and menus page" aria-label="SelectionStyle in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the image that shows the selected row. The image is only as large as the row's content, so a background color here lies just behind the chosen value; the combo box's own <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> colors the whole field.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/combo-box-style/">`ComboBoxStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="togglebuttonstyle"><span class="dp"><code>ToggleButtonStyle</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="ToggleButtonStyle in context on the lists and menus page" aria-label="ToggleButtonStyle in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a> · The style of the [button](/docs/ui-controls/#button) that opens and closes the list, for example its width and text.

## Methods

<h3 id="combobox"><span class="method"><code>ComboBox()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="ComboBox() in context on the lists and menus page" aria-label="ComboBox() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/combo-box/#combobox">`ComboBox(string name = null)`</a> · Creates a combo box. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a>, which <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a> finds it by. Default: `null`. |

<h3 id="additem"><span class="method"><code>AddItem()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="AddItem() in context on the lists and menus page" aria-label="AddItem() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Adds a row at the end of the list.

| Parameter | Type | Description |
| --- | --- | --- |
| `item` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element to add. |

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="AddItemAt() in context on the lists and menus page" aria-label="AddItemAt() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> · Inserts a row at the index.

| Parameter | Type | Description |
| --- | --- | --- |
| `item` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element to insert. |
| `index` | `int` | The position to insert it at: 0 for the first, the number of items for the end. |

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="AddItemsRange() in context on the lists and menus page" aria-label="AddItemsRange() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> · Adds a row per element at the end, in one batch.

| Parameter | Type | Description |
| --- | --- | --- |
| `items` | <code>IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt;</code> | The elements to add, in order. |

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="AddItemsRangeAt() in context on the lists and menus page" aria-label="AddItemsRangeAt() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> · Inserts a row per element at the index, in one batch.

| Parameter | Type | Description |
| --- | --- | --- |
| `items` | <code>IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt;</code> | The elements to insert, in order. |
| `index` | `int` | The position of the first one: 0 for the first, the number of items for the end. |

<h3 id="addtextitem"><span class="method"><code>AddTextItem()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="AddTextItem() in context on the lists and menus page" aria-label="AddTextItem() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/combo-box/#addtextitem">`AddTextItem(string text)`</a> · Adds a text row. Does nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> is set.

| Parameter | Type | Description |
| --- | --- | --- |
| `text` | `string` | The text of the row. |

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="ClearItems() in context on the lists and menus page" aria-label="ClearItems() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/combo-box/#clearitems">`ClearItems()`</a> · Removes every row.

<h3 id="deselect"><span class="method"><code>Deselect()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="Deselect() in context on the lists and menus page" aria-label="Deselect() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#deselect">Deselect</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Deselects the row of the item.

| Parameter | Type | Description |
| --- | --- | --- |
| `item` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element whose row is deselected. |

<h3 id="deselectat"><span class="method"><code>DeselectAt()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="DeselectAt() in context on the lists and menus page" aria-label="DeselectAt() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/combo-box/#deselectat">`DeselectAt(int index)`</a> · Deselects the row at the index.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The index of the row to deselect. |

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="RemoveItem() in context on the lists and menus page" aria-label="RemoveItem() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Removes the row of the item.

| Parameter | Type | Description |
| --- | --- | --- |
| `item` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element to take out. |

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="RemoveItemAt() in context on the lists and menus page" aria-label="RemoveItemAt() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/combo-box/#removeitemat">`RemoveItemAt(int index)`</a> · Removes the row at the index.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The index of the item to take out. |

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="RemoveItemsRangeAt() in context on the lists and menus page" aria-label="RemoveItemsRangeAt() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/combo-box/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> · Removes `count` rows from the index on.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The index of the first item to take out. |
| `count` | `int` | The number of items to take out. |

<h3 id="select"><span class="method"><code>Select()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="Select() in context on the lists and menus page" aria-label="Select() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/combo-box/#select">Select</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Selects the row of the item.

| Parameter | Type | Description |
| --- | --- | --- |
| `item` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element whose row is selected. |

<h3 id="selectat"><span class="method"><code>SelectAt()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="SelectAt() in context on the lists and menus page" aria-label="SelectAt() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/combo-box/#selectat">`SelectAt(int index)`</a> · Selects the row at the index.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The index of the row to select. |

<h3 id="selectnext"><span class="method"><code>SelectNext()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="SelectNext() in context on the lists and menus page" aria-label="SelectNext() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/combo-box/#selectnext">`SelectNext()`</a> · Selects the next row (separators passed over). Does nothing without a selection.

<h3 id="selectprevious"><span class="method"><code>SelectPrevious()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="SelectPrevious() in context on the lists and menus page" aria-label="SelectPrevious() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/combo-box/#selectprevious">`SelectPrevious()`</a> · Selects the previous row (separators passed over). Does nothing without a selection.

<h3 id="selectsource"><span class="method"><code>SelectSource()</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-methods" title="SelectSource() in context on the lists and menus page" aria-label="SelectSource() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/combo-box/#selectsource">`SelectSource(object source)`</a> · Selects the row of the <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> object. Nothing happens when there is none.

| Parameter | Type | Description |
| --- | --- | --- |
| `source` | `object` | The <a class="ref dp" href="/docs/ui-glossary/elements/combo-box/#itemssource">`ItemsSource`</a> object whose row is selected. |

## Events

<h3 id="onitemselect"><span class="event"><code>OnItemSelect</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-events" title="OnItemSelect in context on the lists and menus page" aria-label="OnItemSelect in context on the lists and menus page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/elements/list-box-item/">ListBoxItem</a> item)</code> · The selection changes, by the user or from code. The sender is the combo box, `item` a row of its drop-down list, `null` when nothing is selected any more.

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The list box, or the combo box whose drop-down list it is. |
| `item` | <a class="ref" href="/docs/ui-glossary/elements/list-box-item/">`ListBoxItem`</a> | The primary selected row, or `null` when nothing is selected any more. |
