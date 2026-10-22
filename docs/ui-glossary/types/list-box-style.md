---
layout: docs
legend: [prop, method, dp]
title: "Glossary: ListBoxStyle"
description: "The members of ListBoxStyle, in alphabetical order."
---

The style class of [`ListBox`](/docs/ui-lists/#listbox): the properties a style can set on it. Part style <a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a>. Leaves out <span class="dp">`SelectedItem`</span>, <span class="dp">`SelectedIndex`</span> and <span class="dp">`ItemsSource`</span>. Framework defaults: <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="alternativeitemcolor"><span class="prop"><code>AlternativeItemColor</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="AlternativeItemColor in context on the lists and menus page" aria-label="AlternativeItemColor in context on the lists and menus page">→</a></h3>

`Color` · The background of the odd unselected rows while <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#usedualcolors">`UseDualColors`</a> is set.

<h3 id="hoveritemcolor"><span class="prop"><code>HoverItemColor</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="HoverItemColor in context on the lists and menus page" aria-label="HoverItemColor in context on the lists and menus page">→</a></h3>

`Color?` · The background of the row under the mouse. When `null` the row keeps its normal or selected colour.

<h3 id="itemheight"><span class="prop"><code>ItemHeight</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="ItemHeight in context on the lists and menus page" aria-label="ItemHeight in context on the lists and menus page">→</a></h3>

`int` · The height of every row in `Fixed` mode, in units. `Fixed` mode has no effect while it is 0 or less.

<h3 id="normalitemcolor"><span class="prop"><code>NormalItemColor</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="NormalItemColor in context on the lists and menus page" aria-label="NormalItemColor in context on the lists and menus page">→</a></h3>

`Color` · The background of an unselected row (of the even rows with <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#usedualcolors">`UseDualColors`</a>).

<h3 id="presseditemcolor"><span class="prop"><code>PressedItemColor</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="PressedItemColor in context on the lists and menus page" aria-label="PressedItemColor in context on the lists and menus page">→</a></h3>

`Color?` · The background of a row while the left button is pressed on it. When `null` it doesn't change.

<h3 id="scrollablecontainerstyle"><span class="prop"><code>ScrollableContainerStyle</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="ScrollableContainerStyle in context on the lists and menus page" aria-label="ScrollableContainerStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a> · The style of the [scrollable container](/docs/ui-layout/#scrollablecontainer) around the rows, for example its scroll bars and their thickness.

<h3 id="selecteditemcolor"><span class="prop"><code>SelectedItemColor</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="SelectedItemColor in context on the lists and menus page" aria-label="SelectedItemColor in context on the lists and menus page">→</a></h3>

`Color?` · The background of a selected row. When `null` a selected row keeps the colour it had.

<h3 id="selectionmode"><span class="prop"><code>SelectionMode</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="SelectionMode in context on the lists and menus page" aria-label="SelectionMode in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-selection-mode/">`ListBoxSelectionMode`</a> · Whether one row or several rows can be selected. `Single` by default.

<h3 id="usedualcolors"><span class="prop"><code>UseDualColors</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="UseDualColors in context on the lists and menus page" aria-label="UseDualColors in context on the lists and menus page">→</a></h3>

`bool` · Alternates the background of unselected rows: <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#normalitemcolor">`NormalItemColor`</a> for even indices, <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#alternativeitemcolor">`AlternativeItemColor`</a> for odd ones.

<h3 id="virtualizationmode"><span class="prop"><code>VirtualizationMode</code></span> <a class="ctx" href="/docs/ui-lists/#listbox-properties" title="VirtualizationMode in context on the lists and menus page" aria-label="VirtualizationMode in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-virtualization-mode/">`ListBoxVirtualizationMode`</a> · Whether every row has an element (`None`, the default) or only the rows around the view (`Fixed`).

## Methods

<h3 id="listboxstyle"><span class="method"><code>ListBoxStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/list-box-style/#listboxstyle">`ListBoxStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/list-box-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
