---
layout: docs
title: "Glossary: BindableCollection&lt;T&gt;"
description: "The members of BindableCollection<T>, in alphabetical order."
---

A list that raises <a class="ref event" href="/docs/ui-glossary/types/bindable-collection/#oncollectionchanged">`OnCollectionChanged`</a> for every change, so a bound <a class="ref" href="/docs/ui-glossary/elements/list-box/">`ListBox`</a>, <a class="ref" href="/docs/ui-glossary/elements/combo-box/">`ComboBox`</a>, <a class="ref" href="/docs/ui-glossary/elements/tree-view/">`TreeView`</a> or

A class. The [styles page](/docs/ui-styles/#bindablecollectiont) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="count"><span class="prop"><code>Count</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="Count in context on the styles page" aria-label="Count in context on the styles page">→</a></h3>

`int` · Read-only. The number of items.

<h3 id="isreadonly"><span class="prop"><code>IsReadOnly</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="IsReadOnly in context on the styles page" aria-label="IsReadOnly in context on the styles page">→</a></h3>

`bool` · Read-only. Always `false`.

<h3 id="item"><span class="prop"><code>Item</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="Item in context on the styles page" aria-label="Item in context on the styles page">→</a></h3>

`T` · The item at the index. Setting it is reported as the old item removed and the new one added at that index.

## Methods

<h3 id="bindablecollection"><span class="method"><code>BindableCollection()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="BindableCollection() in context on the styles page" aria-label="BindableCollection() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#bindablecollection">`BindableCollection()`</a> · Creates an empty collection.

<h3 id="add"><span class="method"><code>Add()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="Add() in context on the styles page" aria-label="Add() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#add">`Add(T item)`</a> · Adds the item at the end.

<h3 id="addrange"><span class="method"><code>AddRange()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="AddRange() in context on the styles page" aria-label="AddRange() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#addrange">`AddRange(IEnumerable<T> collection)`</a> · Adds the items at the end, reported as one change. Does nothing for `null` or an empty collection.

<h3 id="clear"><span class="method"><code>Clear()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="Clear() in context on the styles page" aria-label="Clear() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#clear">`Clear()`</a> · Removes every item, reported as one change.

<h3 id="contains"><span class="method"><code>Contains()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="Contains() in context on the styles page" aria-label="Contains() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#contains">`Contains(T item)`</a> · Whether the item is in the collection.

<h3 id="copyto"><span class="method"><code>CopyTo()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="CopyTo() in context on the styles page" aria-label="CopyTo() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#copyto">`CopyTo(T[] array, int arrayIndex)`</a> · Copies the items into the array from the index.

<h3 id="getenumerator"><span class="method"><code>GetEnumerator()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="GetEnumerator() in context on the styles page" aria-label="GetEnumerator() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#getenumerator">`GetEnumerator()`</a> · Enumerates the items.

<h3 id="insert"><span class="method"><code>Insert()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="Insert() in context on the styles page" aria-label="Insert() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#insert">`Insert(int index, T item)`</a> · Inserts the item at the index. An index outside `0..Count` is ignored.

<h3 id="insertrange"><span class="method"><code>InsertRange()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="InsertRange() in context on the styles page" aria-label="InsertRange() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#insertrange">`InsertRange(int index, IEnumerable<T> collection)`</a> · Inserts the items at the index, reported as one change. An index outside `0..Count` is ignored.

<h3 id="remove"><span class="method"><code>Remove()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="Remove() in context on the styles page" aria-label="Remove() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#remove">`Remove(T item)`</a> · Removes the first occurrence of the item. Returns `false` when it is not in the collection.

<h3 id="removeat"><span class="method"><code>RemoveAt()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="RemoveAt() in context on the styles page" aria-label="RemoveAt() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#removeat">`RemoveAt(int index)`</a> · Removes the item at the index. An index out of range is ignored.

<h3 id="removerange"><span class="method"><code>RemoveRange()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="RemoveRange() in context on the styles page" aria-label="RemoveRange() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#removerange">`RemoveRange(int index, int count)`</a> · Removes up to `count` items from the index, reported as one change.

<h3 id="trygetelementat"><span class="method"><code>TryGetElementAt()</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="TryGetElementAt() in context on the styles page" aria-label="TryGetElementAt() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/bindable-collection/#trygetelementat">`TryGetElementAt(int index)`</a> · Returns the item at the index, or `default` when the index is out of range.

## Events

<h3 id="oncollectionchanged"><span class="event"><code>OnCollectionChanged</code></span> <a class="ctx" href="/docs/ui-styles/#bindablecollectiont" title="OnCollectionChanged in context on the styles page" aria-label="OnCollectionChanged in context on the styles page">→</a></h3>

`(bool isItemsAdded, int startIndex, int count)` · Items are added (`isItemsAdded` is `true`) or removed, starting at `startIndex`.
