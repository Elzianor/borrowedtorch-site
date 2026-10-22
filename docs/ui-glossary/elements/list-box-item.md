---
layout: docs
title: "Glossary: ListBoxItem"
description: "The properties, methods and events of ListBoxItem, in alphabetical order."
---

A row of a list box. The list makes the rows for texts, elements and source objects; you can also make a `ListBoxItem` yourself and add it, to keep the row element. The list only detaches such a row when it is removed or scrolls out of view in `Fixed` mode, and never disposes it. In a `Fixed` mode list it is <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> high and gets its own height back when it leaves the list. A row added with <a class="ref prop" href="/docs/ui-glossary/elements/list-box-item/#isselected">`IsSelected`</a> set joins the selection.

`ListBoxItem` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#listboxitem) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="content"><span class="prop"><code>Content</code></span> <a class="ctx" href="/docs/ui-lists/#listboxitem" title="Content in context on the lists and menus page" aria-label="Content in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Read-only. The element the row shows.

<h3 id="contentheight"><span class="prop"><code>ContentHeight</code></span> <a class="ctx" href="/docs/ui-lists/#listboxitem" title="ContentHeight in context on the lists and menus page" aria-label="ContentHeight in context on the lists and menus page">→</a></h3>

`int` · Read-only. The row's height, in units: its content's, or its own desired height (<a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> in a `Fixed` mode list).

<h3 id="contentwidth"><span class="prop"><code>ContentWidth</code></span> <a class="ctx" href="/docs/ui-lists/#listboxitem" title="ContentWidth in context on the lists and menus page" aria-label="ContentWidth in context on the lists and menus page">→</a></h3>

`int` · Read-only. The natural width of the content, in units (the row itself is stretched to the list's width).

<h3 id="index"><span class="prop"><code>Index</code></span> <a class="ctx" href="/docs/ui-lists/#listboxitem" title="Index in context on the lists and menus page" aria-label="Index in context on the lists and menus page">→</a></h3>

`int` · Read-only. The row's index in the list.

<h3 id="isselected"><span class="prop"><code>IsSelected</code></span> <a class="ctx" href="/docs/ui-lists/#listboxitem" title="IsSelected in context on the lists and menus page" aria-label="IsSelected in context on the lists and menus page">→</a></h3>

`bool` · Whether the row is selected. Setting it on a row in a list selects it as <span class="method">`SelectAt`</span> does, or deselects it as <span class="method">`DeselectAt`</span> does. A separator row is never selected.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-lists/#listboxitem" title="MouseCursorsSet in context on the lists and menus page" aria-label="MouseCursorsSet in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The mouse cursors of the list the row is in.

<h3 id="source"><span class="prop"><code>Source</code></span> <a class="ctx" href="/docs/ui-lists/#listboxitem" title="Source in context on the lists and menus page" aria-label="Source in context on the lists and menus page">→</a></h3>

`object` · Read-only. The <span class="dp">`ItemsSource`</span> object the row shows, `null` for a row added as an element or text.

## Methods

<h3 id="listboxitem"><span class="method"><code>ListBoxItem()</code></span> <a class="ctx" href="/docs/ui-lists/#listboxitem" title="ListBoxItem() in context on the lists and menus page" aria-label="ListBoxItem() in context on the lists and menus page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/list-box-item/#listboxitem">ListBoxItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> content, <a href="/docs/ui-glossary/elements/list-box/">ListBox</a> parentListBox, string name = null)</code></span> · Creates a row showing the content. `parentListBox` gives the row its colours until it is in a list; from then on the list it is in counts.
