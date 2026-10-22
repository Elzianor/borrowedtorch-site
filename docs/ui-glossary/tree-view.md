---
layout: docs
title: "Glossary: TreeView"
description: The properties, methods and events of TreeView, in alphabetical order.
---

A tree of `TreeViewItem`s shown as the rows of a list box. Branches open and close, and any item can be selected, a branch as well as a leaf. It is filled from data or built in code.

`TreeView` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#treeview) shows it in context, with code and screenshots.

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property, which a style, a binding or an animation can set.

## Properties

<h3 id="childrenselector"><span class="prop"><code>ChildrenSelector</code></span></h3>

`Func<object, IEnumerable>` · Gives the children of an object of the `ItemsSource`, `null` or empty for a leaf. A children collection that is a `BindableCollection<T>` is followed. ([in context](/docs/ui-lists/#treeview-properties))

<h3 id="expandediconcolor"><span class="dp"><code>ExpandedIconColor</code></span></h3>

`Color` · The colour of the icon of an expanded branch, when the tree view has no textures. By default `(90, 90, 100)`. ([in context](/docs/ui-lists/#treeview-properties))

<h3 id="expandiconstyle"><span class="dp"><code>ExpandIconStyle</code></span></h3>

`ImageStyle` · The style of the expand icon of the items, for example its size and margin. By default an 8 by 8 block, centred, with a margin of 4 before and 6 after it. ([in context](/docs/ui-lists/#treeview-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`TreeViewStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="itemssource"><span class="dp"><code>ItemsSource</code></span></h3>

`IEnumerable` · The top-level objects of the tree. A `BindableCollection<T>` is followed. ([in context](/docs/ui-lists/#treeview-properties))

<h3 id="itemstemplate"><span class="prop"><code>ItemsTemplate</code></span></h3>

`IItemsTemplate` · Makes the element of each object; a label with the object's text when none is set. ([in context](/docs/ui-lists/#treeview-properties))

<h3 id="leaves"><span class="prop"><code>Leaves</code></span></h3>

`IReadOnlyList<TreeViewItem>` · Read-only. The top-level items. ([in context](/docs/ui-lists/#treeview-properties))

<h3 id="listboxstyle"><span class="dp"><code>ListBoxStyle</code></span></h3>

`ListBoxStyle` · The style of the list the items are shown in, for example its row colours and scroll bars. ([in context](/docs/ui-lists/#treeview-properties))

<h3 id="minimizediconcolor"><span class="dp"><code>MinimizedIconColor</code></span></h3>

`Color` · The colour of the icon of a collapsed branch, when the tree view has no textures. By default `(150, 150, 160)`. ([in context](/docs/ui-lists/#treeview-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="selecteditem"><span class="dp"><code>SelectedItem</code></span></h3>

`TreeViewItem` · The selected item, `null` when nothing is selected. Only an item of this tree can be set; the branches above it are expanded. ([in context](/docs/ui-lists/#treeview-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`TreeViewStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="subitemsshift"><span class="dp"><code>SubItemsShift</code></span></h3>

`Margin` · How far each level is indented (`Left`) and the space above every row but the first (`Top`), in units. ([in context](/docs/ui-lists/#treeview-properties))

## Methods

<h3 id="additem"><span class="method"><code>AddItem()</code></span></h3>

`AddItem(BaseElement item)` · Adds a top-level item; an element that is not a `TreeViewItem` is put in one. Does nothing while an `ItemsSource` is set.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span></h3>

`AddItemAt(BaseElement item, int index)` · Inserts a top-level item at the index.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span></h3>

`AddItemsRange(IEnumerable<BaseElement> items)` · Adds top-level items at the end, listed in one go.

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span></h3>

`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)` · Inserts top-level items at the index, listed in one go.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span></h3>

`ClearItems()` · Removes every item.

<h3 id="collapseall"><span class="method"><code>CollapseAll()</code></span></h3>

`CollapseAll()` · Collapses every branch.

<h3 id="expandall"><span class="method"><code>ExpandAll()</code></span></h3>

`ExpandAll()` · Expands every branch, making the items of the whole data.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span></h3>

`RemoveItem(BaseElement item)` · Removes the item (or the item made around the element) from wherever it is in the tree, with its branch.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span></h3>

`RemoveItemAt(int index)` · Removes the top-level item at the index.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span></h3>

`RemoveItemsRangeAt(int index, int count)` · Removes `count` top-level items from the index on.

<h3 id="selectsource"><span class="method"><code>SelectSource()</code></span></h3>

`SelectSource(object source)` · Selects the item of the `ItemsSource` object, also one in a branch that was not expanded yet. Nothing happens when there is none.

## Events

<h3 id="onitemselect"><span class="event"><code>OnItemSelect</code></span></h3>

`(BaseElement sender, TreeViewItem item)` · The selected item changes, by the user or from code. `item` is `null` when nothing is selected any more. ([in context](/docs/ui-lists/#treeview-events))
