---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: TreeView"
description: "The properties, methods and events of TreeView, in alphabetical order."
---

A tree of <a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a>s shown as the rows of a list box. Branches open and close, and any item can be selected, a branch as well as a leaf. It is filled from data or built in code.

`TreeView` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#treeview) shows it in context, with code and screenshots.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="childrenselector"><span class="prop"><code>ChildrenSelector</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="ChildrenSelector in context on the lists and menus page" aria-label="ChildrenSelector in context on the lists and menus page">🠆</a></h3>

`Func<object, IEnumerable>` · Gives the children of an object of the <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a>, `null` or empty for a leaf. A children collection that is a <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is followed.

<h3 id="expandediconcolor"><span class="dp"><code>ExpandedIconColor</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="ExpandedIconColor in context on the lists and menus page" aria-label="ExpandedIconColor in context on the lists and menus page">🠆</a></h3>

`Color` · The color of the icon of an expanded branch, when the tree view has no textures. By default `(90, 90, 100)`.

<h3 id="expandiconstyle"><span class="dp"><code>ExpandIconStyle</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="ExpandIconStyle in context on the lists and menus page" aria-label="ExpandIconStyle in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the expand icon of the items, for example its size and margin. By default an 8 by 8 block, centred, with a margin of 4 before and 6 after it.

<h3 id="foldediconcolor"><span class="dp"><code>FoldedIconColor</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="FoldedIconColor in context on the lists and menus page" aria-label="FoldedIconColor in context on the lists and menus page">🠆</a></h3>

`Color` · The color of the icon of a collapsed branch, when the tree view has no textures. By default `(150, 150, 160)`.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/tree-view-style/">`TreeViewStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="itemssource"><span class="dp"><code>ItemsSource</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="ItemsSource in context on the lists and menus page" aria-label="ItemsSource in context on the lists and menus page">🠆</a></h3>

`IEnumerable` · The top-level objects of the tree. A <code><a href="/docs/ui-glossary/types/bindable-collection/">BindableCollection</a>&lt;T&gt;</code> is followed.

<h3 id="itemstemplate"><span class="prop"><code>ItemsTemplate</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="ItemsTemplate in context on the lists and menus page" aria-label="ItemsTemplate in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/i-items-template/">`IItemsTemplate`</a> · Makes the element of each object; a label with the object's text when none is set.

<h3 id="leaves"><span class="prop"><code>Leaves</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="Leaves in context on the lists and menus page" aria-label="Leaves in context on the lists and menus page">🠆</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/tree-view-item/">TreeViewItem</a>&gt;</code> · Read-only. The top-level items.

<h3 id="listboxstyle"><span class="dp"><code>ListBoxStyle</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="ListBoxStyle in context on the lists and menus page" aria-label="ListBoxStyle in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> · The style of the list the items are shown in, for example its row colors and scroll bars.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="selecteditem"><span class="dp"><code>SelectedItem</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="SelectedItem in context on the lists and menus page" aria-label="SelectedItem in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a> · The selected item, `null` when nothing is selected. Only an item of this tree can be set; the branches above it are expanded.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/tree-view-style/">`TreeViewStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="subitemsshift"><span class="dp"><code>SubItemsShift</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="SubItemsShift in context on the lists and menus page" aria-label="SubItemsShift in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · How far each level is indented (`Left`) and the space above every row but the first (`Top`), in units.

## Methods

<h3 id="treeview"><span class="method"><code>TreeView()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="TreeView() in context on the lists and menus page" aria-label="TreeView() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view/#treeview">`TreeView(string name = null)`</a> · Creates a tree view. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

<h3 id="additem"><span class="method"><code>AddItem()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="AddItem() in context on the lists and menus page" aria-label="AddItem() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Adds a top-level item; an element that is not a <a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a> is put in one. Does nothing while an <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a> is set.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="AddItemAt() in context on the lists and menus page" aria-label="AddItemAt() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> · Inserts a top-level item at the index.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="AddItemsRange() in context on the lists and menus page" aria-label="AddItemsRange() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> · Adds top-level items at the end, listed in one go.

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="AddItemsRangeAt() in context on the lists and menus page" aria-label="AddItemsRangeAt() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> · Inserts top-level items at the index, listed in one go.

<h3 id="addtextitem"><span class="method"><code>AddTextItem()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="AddTextItem() in context on the lists and menus page" aria-label="AddTextItem() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view/#addtextitem">`AddTextItem(string text)`</a> · Adds a top-level item showing the text in a label and returns it, to nest items in it. The tree view made it, so it is disposed when it is removed. Does nothing and returns `null` while an <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a> is set.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="ClearItems() in context on the lists and menus page" aria-label="ClearItems() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view/#clearitems">`ClearItems()`</a> · Removes every item.

<h3 id="collapseall"><span class="method"><code>CollapseAll()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="CollapseAll() in context on the lists and menus page" aria-label="CollapseAll() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view/#collapseall">`CollapseAll()`</a> · Collapses every branch.

<h3 id="expandall"><span class="method"><code>ExpandAll()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="ExpandAll() in context on the lists and menus page" aria-label="ExpandAll() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view/#expandall">`ExpandAll()`</a> · Expands every branch, making the items of the whole data.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="RemoveItem() in context on the lists and menus page" aria-label="RemoveItem() in context on the lists and menus page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Removes the item (or the item made around the element) from wherever it is in the tree, with its branch.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="RemoveItemAt() in context on the lists and menus page" aria-label="RemoveItemAt() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view/#removeitemat">`RemoveItemAt(int index)`</a> · Removes the top-level item at the index.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="RemoveItemsRangeAt() in context on the lists and menus page" aria-label="RemoveItemsRangeAt() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> · Removes `count` top-level items from the index on.

<h3 id="selectsource"><span class="method"><code>SelectSource()</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-methods" title="SelectSource() in context on the lists and menus page" aria-label="SelectSource() in context on the lists and menus page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view/#selectsource">`SelectSource(object source)`</a> · Selects the item of the <a class="ref dp" href="/docs/ui-glossary/elements/tree-view/#itemssource">`ItemsSource`</a> object, also one in a branch that was not expanded yet. Nothing happens when there is none.

## Events

<h3 id="onitemselect"><span class="event"><code>OnItemSelect</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-events" title="OnItemSelect in context on the lists and menus page" aria-label="OnItemSelect in context on the lists and menus page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/elements/tree-view-item/">TreeViewItem</a> item)</code> · The selected item changes, by the user or from code. `item` is `null` when nothing is selected any more.
