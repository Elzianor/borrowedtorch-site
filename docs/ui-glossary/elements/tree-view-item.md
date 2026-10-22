---
layout: docs
title: "Glossary: TreeViewItem"
description: "The properties, methods and events of TreeViewItem, in alphabetical order."
---

An item of a tree view: an expand icon and its content, with leaves below it. Items added in code can be made with the constructor; the items of source objects are made by the tree view. When an item is added to another item, it gets its place in the tree: its <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a> and its indentation are set by the item it joins.

`TreeViewItem` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#treeviewitem) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="hasleaves"><span class="prop"><code>HasLeaves</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="HasLeaves in context on the lists and menus page" aria-label="HasLeaves in context on the lists and menus page">→</a></h3>

`bool` · Read-only. Whether the item has leaves, also an item of a source object whose children were not made into items yet.

<h3 id="isexpanded"><span class="prop"><code>IsExpanded</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="IsExpanded in context on the lists and menus page" aria-label="IsExpanded in context on the lists and menus page">→</a></h3>

`bool` · Whether the leaves are shown (while the items above are expanded too). An item without leaves is never expanded. An item of a source object makes the items of its children the first time it is expanded.

<h3 id="leaves"><span class="prop"><code>Leaves</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="Leaves in context on the lists and menus page" aria-label="Leaves in context on the lists and menus page">→</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/tree-view-item/">TreeViewItem</a>&gt;</code> · Read-only. The items one level below. Empty for an item of a source object until it is first expanded.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="MouseCursorsSet in context on the lists and menus page" aria-label="MouseCursorsSet in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The mouse cursors of the row the item is shown in.

<h3 id="source"><span class="prop"><code>Source</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="Source in context on the lists and menus page" aria-label="Source in context on the lists and menus page">→</a></h3>

`object` · Read-only. The <span class="dp">`ItemsSource`</span> object the item shows, `null` for an item added in code.

## Methods

<h3 id="treeviewitem"><span class="method"><code>TreeViewItem()</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="TreeViewItem() in context on the lists and menus page" aria-label="TreeViewItem() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#treeviewitem">TreeViewItem</a>(<a href="/docs/ui-glossary/elements/tree-view/">TreeView</a> parentTreeView, <a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> content, <a href="/docs/ui-glossary/types/margin/">Margin</a> shift, string name = null)</code></span> · Creates an item of the tree view showing the content. `shift` is its indentation until it is added to the tree, which sets its own.

<h3 id="additem"><span class="method"><code>AddItem()</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="AddItem() in context on the lists and menus page" aria-label="AddItem() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Adds a leaf; an element that is not a `TreeViewItem` is put in one. Does nothing for an item of a source object.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="AddItemAt() in context on the lists and menus page" aria-label="AddItemAt() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> · Inserts a leaf at the index.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="AddItemsRange() in context on the lists and menus page" aria-label="AddItemsRange() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#additemsrange">AddItemsRange</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items)</code></span> · Adds leaves at the end, listed in one go.

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="AddItemsRangeAt() in context on the lists and menus page" aria-label="AddItemsRangeAt() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#additemsrangeat">AddItemsRangeAt</a>(IEnumerable&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt; items, int index)</code></span> · Inserts leaves at the index, listed in one go.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="ClearItems() in context on the lists and menus page" aria-label="ClearItems() in context on the lists and menus page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view-item/#clearitems">`ClearItems()`</a> · Removes every leaf.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="RemoveItem() in context on the lists and menus page" aria-label="RemoveItem() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/tree-view-item/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Removes the item (or the item made around the element) from anywhere in this item's branch.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="RemoveItemAt() in context on the lists and menus page" aria-label="RemoveItemAt() in context on the lists and menus page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view-item/#removeitemat">`RemoveItemAt(int index)`</a> · Removes the leaf at the index, with its branch.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-lists/#treeviewitem" title="RemoveItemsRangeAt() in context on the lists and menus page" aria-label="RemoveItemsRangeAt() in context on the lists and menus page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tree-view-item/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> · Removes `count` leaves from the index on.
