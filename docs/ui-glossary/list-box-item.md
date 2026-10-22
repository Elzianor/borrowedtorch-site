---
layout: docs
title: "Glossary: ListBoxItem"
description: The properties, methods and events of ListBoxItem, in alphabetical order.
---

A row of a list box. The list makes the rows for texts, elements and source objects; you can also make a `ListBoxItem` yourself and add it, to keep the row element. The list only detaches such a row when it is removed or scrolls out of view in `Fixed` mode, and never disposes it. In a `Fixed` mode list it is `ItemHeight` high and gets its own height back when it leaves the list. A row added with `IsSelected` set joins the selection.

`ListBoxItem` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#listboxitem) shows it in context, with code and screenshots.

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property, which a style, a binding or an animation can set.

## Properties

<h3 id="content"><span class="prop"><code>Content</code></span></h3>

`BaseElement` · Read-only. The element the row shows.

<h3 id="contentheight"><span class="prop"><code>ContentHeight</code></span></h3>

`int` · Read-only. The row's height, in units: its content's, or its own desired height (`ItemHeight` in a `Fixed` mode list).

<h3 id="contentwidth"><span class="prop"><code>ContentWidth</code></span></h3>

`int` · Read-only. The natural width of the content, in units (the row itself is stretched to the list's width).

<h3 id="index"><span class="prop"><code>Index</code></span></h3>

`int` · Read-only. The row's index in the list.

<h3 id="isselected"><span class="prop"><code>IsSelected</code></span></h3>

`bool` · Whether the row is selected. Setting it on a row in a list selects it as `SelectAt` does, or deselects it as `DeselectAt` does. A separator row is never selected.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The mouse cursors of the list the row is in.

<h3 id="source"><span class="prop"><code>Source</code></span></h3>

`object` · Read-only. The `ItemsSource` object the row shows, `null` for a row added as an element or text.
