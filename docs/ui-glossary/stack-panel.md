---
layout: docs
title: "Glossary: StackPanel"
description: The properties, methods and events of StackPanel, in alphabetical order.
---

Puts its items one after another, in a column or in a row, and fits their size.

`StackPanel` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [layout page](/docs/ui-layout/#stackpanel) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">→</a></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">→</a></h3>

`StackPanelStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="items"><span class="prop"><code>Items</code></span> <a class="ctx" href="/docs/ui-layout/#stackpanel-properties" title="Items in context on the layout page" aria-label="Items in context on the layout page">→</a></h3>

`IReadOnlyList<BaseElement>` · Read-only. The items in the order they are stacked: the elements you added, not the panel's wrappers. A live view, nothing is copied.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">→</a></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">→</a></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="orientation"><span class="dp"><code>Orientation</code></span> <a class="ctx" href="/docs/ui-layout/#stackpanel-properties" title="Orientation in context on the layout page" aria-label="Orientation in context on the layout page">→</a></h3>

`Orientation` · `Vertical` stacks the items top to bottom, `Horizontal` left to right. The default is `Horizontal`.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">→</a></h3>

`StackPanelStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out.

## Methods

<h3 id="additem"><span class="method"><code>AddItem()</code></span> <a class="ctx" href="/docs/ui-layout/#stackpanel-methods" title="AddItem() in context on the layout page" aria-label="AddItem() in context on the layout page">→</a></h3>

`AddItem(BaseElement item)` · Adds the item at the end. A null item is ignored.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span> <a class="ctx" href="/docs/ui-layout/#stackpanel-methods" title="AddItemAt() in context on the layout page" aria-label="AddItemAt() in context on the layout page">→</a></h3>

`AddItemAt(BaseElement item, int index)` · Inserts the item at the index (0 to the item count).

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span> <a class="ctx" href="/docs/ui-layout/#stackpanel-methods" title="ClearItems() in context on the layout page" aria-label="ClearItems() in context on the layout page">→</a></h3>

`ClearItems()` · Removes every item. The items are detached, not disposed.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span> <a class="ctx" href="/docs/ui-layout/#stackpanel-methods" title="RemoveItem() in context on the layout page" aria-label="RemoveItem() in context on the layout page">→</a></h3>

`RemoveItem(BaseElement item)` · Removes the item. It is detached, not disposed.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span> <a class="ctx" href="/docs/ui-layout/#stackpanel-methods" title="RemoveItemAt() in context on the layout page" aria-label="RemoveItemAt() in context on the layout page">→</a></h3>

`RemoveItemAt(int index)` · Removes the item at the index. It is detached, not disposed.
