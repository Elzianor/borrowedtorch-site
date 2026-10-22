---
layout: docs
title: "Glossary: TreeViewItem"
description: The properties, methods and events of TreeViewItem, in alphabetical order.
---

An item of a tree view: an expand icon and its content, with leaves below it. Items added in code can be made with the constructor; the items of source objects are made by the tree view. When an item is added to another item, it gets its place in the tree: its `Name` and its indentation are set by the item it joins.

`TreeViewItem` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#treeviewitem) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="hasleaves"><span class="prop"><code>HasLeaves</code></span></h3>

`bool` · Read-only. Whether the item has leaves, also an item of a source object whose children were not made into items yet.

<h3 id="isexpanded"><span class="prop"><code>IsExpanded</code></span></h3>

`bool` · Whether the leaves are shown (while the items above are expanded too). An item without leaves is never expanded. An item of a source object makes the items of its children the first time it is expanded.

<h3 id="leaves"><span class="prop"><code>Leaves</code></span></h3>

`IReadOnlyList<TreeViewItem>` · Read-only. The items one level below. Empty for an item of a source object until it is first expanded.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The mouse cursors of the row the item is shown in.

<h3 id="source"><span class="prop"><code>Source</code></span></h3>

`object` · Read-only. The `ItemsSource` object the item shows, `null` for an item added in code.

## Methods

<h3 id="additem"><span class="method"><code>AddItem()</code></span></h3>

`AddItem(BaseElement item)` · Adds a leaf; an element that is not a `TreeViewItem` is put in one. Does nothing for an item of a source object.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span></h3>

`AddItemAt(BaseElement item, int index)` · Inserts a leaf at the index.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span></h3>

`AddItemsRange(IEnumerable<BaseElement> items)` · Adds leaves at the end, listed in one go.

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span></h3>

`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)` · Inserts leaves at the index, listed in one go.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span></h3>

`ClearItems()` · Removes every leaf.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span></h3>

`RemoveItem(BaseElement item)` · Removes the item (or the item made around the element) from anywhere in this item's branch.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span></h3>

`RemoveItemAt(int index)` · Removes the leaf at the index, with its branch.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span></h3>

`RemoveItemsRangeAt(int index, int count)` · Removes `count` leaves from the index on.
