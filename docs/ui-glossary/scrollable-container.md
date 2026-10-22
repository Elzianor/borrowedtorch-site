---
layout: docs
title: "Glossary: ScrollableContainer"
description: The properties, methods and events of ScrollableContainer, in alphabetical order.
---

Shows its items in a view of its own size and scrolls them when they are larger, with scroll bars, the mouse wheel or code.

`ScrollableContainer` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [layout page](/docs/ui-layout/#scrollablecontainer) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="contentmargin"><span class="prop"><code>ContentMargin</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="ContentMargin in context on the layout page" aria-label="ContentMargin in context on the layout page">→</a></h3>

`Margin` · Read-only. The current offset of the content in the view: `Left` and `Top` are 0 or negative while it is scrolled.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">→</a></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">→</a></h3>

`ScrollableContainerStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="horizontalscrollingvalue"><span class="dp"><code>HorizontalScrollingValue</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="HorizontalScrollingValue in context on the layout page" aria-label="HorizontalScrollingValue in context on the layout page">→</a></h3>

`float` · How far the content is scrolled sideways, from 0 (the left) to 1 (the right).

<h3 id="items"><span class="prop"><code>Items</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="Items in context on the layout page" aria-label="Items in context on the layout page">→</a></h3>

`IReadOnlyList<BaseElement>` · Read-only. The items that scroll: the elements you added. The container's `Children` are its view and scroll bars. A live view.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">→</a></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">→</a></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="scrollareaheight"><span class="prop"><code>ScrollAreaHeight</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="ScrollAreaHeight in context on the layout page" aria-label="ScrollAreaHeight in context on the layout page">→</a></h3>

`float` · Read-only. How far the content can scroll down, in units: its height less the view's height (0 or less while it fits).

<h3 id="scrollareawidth"><span class="prop"><code>ScrollAreaWidth</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="ScrollAreaWidth in context on the layout page" aria-label="ScrollAreaWidth in context on the layout page">→</a></h3>

`float` · Read-only. How far the content can scroll sideways, in units: its width less the view's width (0 or less while it fits).

<h3 id="scrollbars"><span class="dp"><code>ScrollBars</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="ScrollBars in context on the layout page" aria-label="ScrollBars in context on the layout page">→</a></h3>

`ScrollBars` · Which scroll bars may show: `None` (the default), `Vertical`, `Horizontal` or `Both`.

<h3 id="scrollbarsstyle"><span class="dp"><code>ScrollBarsStyle</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="ScrollBarsStyle in context on the layout page" aria-label="ScrollBarsStyle in context on the layout page">→</a></h3>

`SliderStyle` · The style of the scroll bars (see [sliders](/docs/ui-controls/#slider)). The vertical bar gets a copy with the colours of its two line halves swapped.

<h3 id="scrollbarsthickness"><span class="dp"><code>ScrollBarsThickness</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="ScrollBarsThickness in context on the layout page" aria-label="ScrollBarsThickness in context on the layout page">→</a></h3>

`int` · The width of a vertical bar and the height of a horizontal one, in units. The default is 0.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">→</a></h3>

`ScrollableContainerStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="verticalscrollingvalue"><span class="dp"><code>VerticalScrollingValue</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-properties" title="VerticalScrollingValue in context on the layout page" aria-label="VerticalScrollingValue in context on the layout page">→</a></h3>

`float` · How far the content is scrolled down, from 0 (the top) to 1 (the bottom).

## Methods

<h3 id="additem"><span class="method"><code>AddItem()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="AddItem() in context on the layout page" aria-label="AddItem() in context on the layout page">→</a></h3>

`AddItem(BaseElement item)` · Adds the item to the view.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="AddItemAt() in context on the layout page" aria-label="AddItemAt() in context on the layout page">→</a></h3>

`AddItemAt(BaseElement item, int index)` · Inserts the item at the index.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="AddItemsRange() in context on the layout page" aria-label="AddItemsRange() in context on the layout page">→</a></h3>

`AddItemsRange(IEnumerable<BaseElement> items)` · Adds the items at the end.

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="AddItemsRangeAt() in context on the layout page" aria-label="AddItemsRangeAt() in context on the layout page">→</a></h3>

`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)` · Inserts the items from the index on.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="ClearItems() in context on the layout page" aria-label="ClearItems() in context on the layout page">→</a></h3>

`ClearItems()` · Removes every item.

<h3 id="horizontalpagedecrease"><span class="method"><code>HorizontalPageDecrease()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="HorizontalPageDecrease() in context on the layout page" aria-label="HorizontalPageDecrease() in context on the layout page">→</a></h3>

`HorizontalPageDecrease()` · Obsolete: use `PageRight` and `PageLeft`.

<h3 id="horizontalpageincrease"><span class="method"><code>HorizontalPageIncrease()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="HorizontalPageIncrease() in context on the layout page" aria-label="HorizontalPageIncrease() in context on the layout page">→</a></h3>

`HorizontalPageIncrease()` · Obsolete: use `PageRight` and `PageLeft`.

<h3 id="pagedown"><span class="method"><code>PageDown()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="PageDown() in context on the layout page" aria-label="PageDown() in context on the layout page">→</a></h3>

`PageDown()` · Scrolls down by one view height. Does nothing while the content fits.

<h3 id="pageleft"><span class="method"><code>PageLeft()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="PageLeft() in context on the layout page" aria-label="PageLeft() in context on the layout page">→</a></h3>

`PageLeft()` · Scrolls left by one view width. Does nothing while the content fits.

<h3 id="pageright"><span class="method"><code>PageRight()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="PageRight() in context on the layout page" aria-label="PageRight() in context on the layout page">→</a></h3>

`PageRight()` · Scrolls right by one view width. Does nothing while the content fits.

<h3 id="pageup"><span class="method"><code>PageUp()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="PageUp() in context on the layout page" aria-label="PageUp() in context on the layout page">→</a></h3>

`PageUp()` · Scrolls up by one view height. Does nothing while the content fits.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="RemoveItem() in context on the layout page" aria-label="RemoveItem() in context on the layout page">→</a></h3>

`RemoveItem(BaseElement item)` · Removes the item. It is detached, not disposed.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="RemoveItemAt() in context on the layout page" aria-label="RemoveItemAt() in context on the layout page">→</a></h3>

`RemoveItemAt(int index)` · Removes the item at the index.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="RemoveItemsRangeAt() in context on the layout page" aria-label="RemoveItemsRangeAt() in context on the layout page">→</a></h3>

`RemoveItemsRangeAt(int index, int count)` · Removes `count` items from the index on.

<h3 id="verticalpagedecrease"><span class="method"><code>VerticalPageDecrease()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="VerticalPageDecrease() in context on the layout page" aria-label="VerticalPageDecrease() in context on the layout page">→</a></h3>

`VerticalPageDecrease()` · Obsolete: use `PageUp` and `PageDown`. The old names followed the vertical scroll bar's value, which grows upwards, so "increase" scrolled up.

<h3 id="verticalpageincrease"><span class="method"><code>VerticalPageIncrease()</code></span> <a class="ctx" href="/docs/ui-layout/#scrollablecontainer-methods" title="VerticalPageIncrease() in context on the layout page" aria-label="VerticalPageIncrease() in context on the layout page">→</a></h3>

`VerticalPageIncrease()` · Obsolete: use `PageUp` and `PageDown`. The old names followed the vertical scroll bar's value, which grows upwards, so "increase" scrolled up.
