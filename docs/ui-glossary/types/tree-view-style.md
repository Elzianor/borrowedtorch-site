---
layout: docs
title: "Glossary: TreeViewStyle"
description: "The members of TreeViewStyle, in alphabetical order."
---

The style class of [`TreeView`](/docs/ui-lists/#treeview): the properties a style can set on it. Part styles <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> and <a class="ref prop" href="/docs/ui-glossary/types/tree-view-style/#expandiconstyle">`ExpandIconStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>). Leaves out <span class="dp">`SelectedItem`</span> and <span class="dp">`ItemsSource`</span>. Framework defaults: an <a class="ref prop" href="/docs/ui-glossary/types/tree-view-style/#expandiconstyle">`ExpandIconStyle`</a> of an 8 by 8 block, centred, <a class="ref prop" href="/docs/ui-glossary/types/tree-view-style/#minimizediconcolor">`MinimizedIconColor`</a> (150, 150, 160), <a class="ref prop" href="/docs/ui-glossary/types/tree-view-style/#expandediconcolor">`ExpandedIconColor`</a> (90, 90, 100).

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="expandediconcolor"><span class="prop"><code>ExpandedIconColor</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="ExpandedIconColor in context on the lists and menus page" aria-label="ExpandedIconColor in context on the lists and menus page">→</a></h3>

`Color` · The colour of the icon of an expanded branch, when the tree view has no textures. By default `(90, 90, 100)`.

<h3 id="expandiconstyle"><span class="prop"><code>ExpandIconStyle</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="ExpandIconStyle in context on the lists and menus page" aria-label="ExpandIconStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the expand icon of the items, for example its size and margin. By default an 8 by 8 block, centred, with a margin of 4 before and 6 after it.

<h3 id="listboxstyle"><span class="prop"><code>ListBoxStyle</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="ListBoxStyle in context on the lists and menus page" aria-label="ListBoxStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> · The style of the list the items are shown in, for example its row colours and scroll bars.

<h3 id="minimizediconcolor"><span class="prop"><code>MinimizedIconColor</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="MinimizedIconColor in context on the lists and menus page" aria-label="MinimizedIconColor in context on the lists and menus page">→</a></h3>

`Color` · The colour of the icon of a collapsed branch, when the tree view has no textures. By default `(150, 150, 160)`.

<h3 id="subitemsshift"><span class="prop"><code>SubItemsShift</code></span> <a class="ctx" href="/docs/ui-lists/#treeview-properties" title="SubItemsShift in context on the lists and menus page" aria-label="SubItemsShift in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · How far each level is indented (`Left`) and the space above every row but the first (`Top`), in units.

## Methods

<h3 id="treeviewstyle"><span class="method"><code>TreeViewStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/tree-view-style/#treeviewstyle">`TreeViewStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/tree-view-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
