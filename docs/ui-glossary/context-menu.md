---
layout: docs
title: "Glossary: ContextMenu"
description: The properties, methods and events of ContextMenu, in alphabetical order.
---

A menu that opens at the mouse on a right click, drawn above everything. Its items are `ContextMenuItem`s, separators, or the objects of an `ItemsSource`; an item can be checkable and can open a sub-menu.

`ContextMenu` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#contextmenu) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="borderstyle"><span class="dp"><code>BorderStyle</code></span></h3>

`BorderStyle` · The style of the [border](/docs/ui-layout/#border) around the items. By default a white background with a 1 unit dark grey border. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="checkiconstyle"><span class="dp"><code>CheckIconStyle</code></span></h3>

`ImageStyle` · The style of the check mark of a checked item. By default an 8 by 8 unit dark grey square. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="expandiconstyle"><span class="dp"><code>ExpandIconStyle</code></span></h3>

`ImageStyle` · The style of the arrow of an item with a sub-menu. By default a 6 by 8 unit dark grey block at the right end. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`ContextMenuStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="isopen"><span class="prop"><code>IsOpen</code></span></h3>

`bool` · Read-only. Whether the menu is open. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="items"><span class="prop"><code>Items</code></span></h3>

`IReadOnlyList<BaseElement>` · Read-only. The items and separators of the menu, in order. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="itemssource"><span class="dp"><code>ItemsSource</code></span></h3>

`IEnumerable` · The objects to show, one item each. A `BindableCollection<T>` is followed. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="itemstemplate"><span class="prop"><code>ItemsTemplate</code></span></h3>

`IItemsTemplate` · Makes the content of the item of each `ItemsSource` object; a label with the object's text when none is set. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="listboxstyle"><span class="dp"><code>ListBoxStyle</code></span></h3>

`ListBoxStyle` · The style of the list of the items. By default transparent rows, highlighted in light blue under the mouse and when selected. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="marginfrommousecursor"><span class="dp"><code>MarginFromMouseCursor</code></span></h3>

`Margin` · An offset added to the point the menu opens at: `Left` to the x, `Top` to the y, in units. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="parentitem"><span class="prop"><code>ParentItem</code></span></h3>

`ContextMenuItem` · Read-only. The item whose sub-menu this menu is, `null` for the menu of an element. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="placement"><span class="dp"><code>Placement</code></span></h3>

`ContextMenuPlacement` · On which side of the point the menu opens. `BottomRight` by default. ([in context](/docs/ui-lists/#contextmenu-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`ContextMenuStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="submenusopentype"><span class="dp"><code>SubMenusOpenType</code></span></h3>

`ContextMenuSubMenusOpenType` · Whether the sub-menus of this menu's items open on hover (`OnHover`, the default) or on click. ([in context](/docs/ui-lists/#contextmenu-properties))

## Methods

<h3 id="additem"><span class="method"><code>AddItem()</code></span></h3>

`AddItem(BaseElement item)` · Adds an item at the end. A `ContextMenuItem` or `Separator` is added as is, another element is put in an item. Does nothing while an `ItemsSource` is set.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span></h3>

`AddItemAt(BaseElement item, int index)` · Inserts an item at the index.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span></h3>

`AddItemsRange(IEnumerable<BaseElement> items)` · Adds items at the end.

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span></h3>

`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)` · Inserts items at the index.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span></h3>

`ClearItems()` · Removes every item.

<h3 id="close"><span class="method"><code>Close()</code></span></h3>

`Close()` · Closes the menu with its open sub-menus, and gives the keyboard back to the element that had it before. On a sub-menu it closes only that sub-menu.

<h3 id="open"><span class="method"><code>Open()</code></span></h3>

`Open(Point position)` · Opens the menu at a point of the screen, placed by `Placement` and `MarginFromMouseCursor` and kept on the screen. Only a menu in the element tree that can take the keyboard opens; a sub-menu doesn't.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span></h3>

`RemoveItem(BaseElement item)` · Removes the item, or the item made around the element.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span></h3>

`RemoveItemAt(int index)` · Removes the item at the index.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span></h3>

`RemoveItemsRangeAt(int index, int count)` · Removes `count` items from the index on.

## Events

<h3 id="onitemselect"><span class="event"><code>OnItemSelect</code></span></h3>

`(BaseElement sender, ContextMenuItem item)` · An item of the menu or of one of its sub-menus is chosen. It is raised by the menu of the element; the sender is the menu the item is in. ([in context](/docs/ui-lists/#contextmenu-events))
