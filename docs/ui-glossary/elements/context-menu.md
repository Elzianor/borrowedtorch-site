---
layout: docs
legend: [prop, method, event, dp]
title: "Glossary: ContextMenu"
description: "The properties, methods and events of ContextMenu, in alphabetical order."
---

A menu that opens at the mouse on a right click, drawn above everything. Its items are <a class="ref" href="/docs/ui-glossary/elements/context-menu-item/">`ContextMenuItem`</a>s, separators, or the objects of an <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#itemssource">`ItemsSource`</a>; an item can be checkable and can open a sub-menu.

`ContextMenu` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#contextmenu) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="borderstyle"><span class="dp"><code>BorderStyle</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="BorderStyle in context on the lists and menus page" aria-label="BorderStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a> · The style of the [border](/docs/ui-layout/#border) around the items. By default a white background with a 1 unit dark grey border.

<h3 id="checkiconstyle"><span class="dp"><code>CheckIconStyle</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="CheckIconStyle in context on the lists and menus page" aria-label="CheckIconStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the check mark of a checked item. By default an 8 by 8 unit dark grey square.

<h3 id="expandiconstyle"><span class="dp"><code>ExpandIconStyle</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="ExpandIconStyle in context on the lists and menus page" aria-label="ExpandIconStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the arrow of an item with a sub-menu. By default a 6 by 8 unit dark grey block at the right end.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="isopen"><span class="prop"><code>IsOpen</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="IsOpen in context on the lists and menus page" aria-label="IsOpen in context on the lists and menus page">→</a></h3>

`bool` · Read-only. Whether the menu is open.

<h3 id="items"><span class="prop"><code>Items</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="Items in context on the lists and menus page" aria-label="Items in context on the lists and menus page">→</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt;</code> · Read-only. The items and separators of the menu, in order.

<h3 id="itemssource"><span class="dp"><code>ItemsSource</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="ItemsSource in context on the lists and menus page" aria-label="ItemsSource in context on the lists and menus page">→</a></h3>

`IEnumerable` · The objects to show, one item each. A <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is followed.

<h3 id="itemstemplate"><span class="prop"><code>ItemsTemplate</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="ItemsTemplate in context on the lists and menus page" aria-label="ItemsTemplate in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/i-items-template/">`IItemsTemplate`</a> · Makes the content of the item of each <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#itemssource">`ItemsSource`</a> object; a label with the object's text when none is set.

<h3 id="listboxstyle"><span class="dp"><code>ListBoxStyle</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="ListBoxStyle in context on the lists and menus page" aria-label="ListBoxStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> · The style of the list of the items. By default transparent rows, highlighted in light blue under the mouse and when selected.

<h3 id="marginfrommousecursor"><span class="dp"><code>MarginFromMouseCursor</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="MarginFromMouseCursor in context on the lists and menus page" aria-label="MarginFromMouseCursor in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · An offset added to the point the menu opens at: `Left` to the x, `Top` to the y, in units.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="parentitem"><span class="prop"><code>ParentItem</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="ParentItem in context on the lists and menus page" aria-label="ParentItem in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/context-menu-item/">`ContextMenuItem`</a> · Read-only. The item whose sub-menu this menu is, `null` for the menu of an element.

<h3 id="placement"><span class="dp"><code>Placement</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="Placement in context on the lists and menus page" aria-label="Placement in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/context-menu-placement/">`ContextMenuPlacement`</a> · On which side of the point the menu opens. `BottomRight` by default.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="submenusopentype"><span class="dp"><code>SubMenusOpenType</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="SubMenusOpenType in context on the lists and menus page" aria-label="SubMenusOpenType in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/context-menu-sub-menus-open-type/">`ContextMenuSubMenusOpenType`</a> · Whether the sub-menus of this menu's items open on hover (`OnHover`, the default) or on click.

## Methods

<h3 id="contextmenu"><span class="method"><code>ContextMenu()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="ContextMenu() in context on the lists and menus page" aria-label="ContextMenu() in context on the lists and menus page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/context-menu/#contextmenu">`ContextMenu(string name = null)`</a> · Creates a closed menu. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

<h3 id="additem"><span class="method"><code>AddItem()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="AddItem() in context on the lists and menus page" aria-label="AddItem() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/context-menu/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Adds an item at the end. A <a class="ref" href="/docs/ui-glossary/elements/context-menu-item/">`ContextMenuItem`</a> or <a class="ref" href="/docs/ui-glossary/elements/separator/">`Separator`</a> is added as is, another element is put in an item. Does nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#itemssource">`ItemsSource`</a> is set.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="AddItemAt() in context on the lists and menus page" aria-label="AddItemAt() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/context-menu/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> · Inserts an item at the index.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="AddItemsRange() in context on the lists and menus page" aria-label="AddItemsRange() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/context-menu/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> · Adds items at the end.

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="AddItemsRangeAt() in context on the lists and menus page" aria-label="AddItemsRangeAt() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/context-menu/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> · Inserts items at the index.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="ClearItems() in context on the lists and menus page" aria-label="ClearItems() in context on the lists and menus page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/context-menu/#clearitems">`ClearItems()`</a> · Removes every item.

<h3 id="close"><span class="method"><code>Close()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="Close() in context on the lists and menus page" aria-label="Close() in context on the lists and menus page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/context-menu/#close">`Close()`</a> · Closes the menu with its open sub-menus, and gives the keyboard back to the element that had it before. On a sub-menu it closes only that sub-menu.

<h3 id="open"><span class="method"><code>Open()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="Open() in context on the lists and menus page" aria-label="Open() in context on the lists and menus page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/context-menu/#open">`Open(Point position)`</a> · Opens the menu at a point of the screen, placed by <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#placement">`Placement`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#marginfrommousecursor">`MarginFromMouseCursor`</a> and kept on the screen. Only a menu in the element tree that can take the keyboard opens; a sub-menu doesn't.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="RemoveItem() in context on the lists and menus page" aria-label="RemoveItem() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/context-menu/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Removes the item, or the item made around the element.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="RemoveItemAt() in context on the lists and menus page" aria-label="RemoveItemAt() in context on the lists and menus page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/context-menu/#removeitemat">`RemoveItemAt(int index)`</a> · Removes the item at the index.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-methods" title="RemoveItemsRangeAt() in context on the lists and menus page" aria-label="RemoveItemsRangeAt() in context on the lists and menus page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/context-menu/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> · Removes `count` items from the index on.

## Events

<h3 id="onitemselect"><span class="event"><code>OnItemSelect</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-events" title="OnItemSelect in context on the lists and menus page" aria-label="OnItemSelect in context on the lists and menus page">→</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/elements/context-menu-item/">ContextMenuItem</a> item)</code> · An item of the menu or of one of its sub-menus is chosen. It is raised by the menu of the element; the sender is the menu the item is in.
