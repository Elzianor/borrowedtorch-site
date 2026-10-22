---
layout: docs
title: "Glossary: ContextMenuItem"
description: The properties, methods and events of ContextMenuItem, in alphabetical order.
---

An item of a context menu: a check mark while it is checkable and checked, its content, and an arrow at the right end when it opens a sub-menu. The item is stretched over its row; the row takes the mouse and the item shows its state. Choosing it, with a click or the keyboard, raises its `OnClick` and the menu's `OnItemSelect`.

`ContextMenuItem` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#contextmenuitem) shows it in context, with code and screenshots.

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property, which a style, a binding or an animation can set.

## Properties

<h3 id="content"><span class="prop"><code>Content</code></span></h3>

`BaseElement` · Read-only. The element the item shows, given when it is made.

<h3 id="hassubitems"><span class="prop"><code>HasSubItems</code></span></h3>

`bool` · Read-only. Whether the item has a sub-menu with at least one item.

<h3 id="ischeckable"><span class="prop"><code>IsCheckable</code></span></h3>

`bool` · Whether choosing the item switches `IsChecked`. Setting it to `false` also clears `IsChecked`.

<h3 id="ischecked"><span class="prop"><code>IsChecked</code></span></h3>

`bool` · Whether the check mark of a checkable item is shown.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The mouse cursors of the row the item is in.

<h3 id="parentmenu"><span class="prop"><code>ParentMenu</code></span></h3>

`ContextMenu` · Read-only. The menu the item is in.

<h3 id="source"><span class="prop"><code>Source</code></span></h3>

`object` · Read-only. The `ItemsSource` object the item shows, `null` for an item added in code.

<h3 id="submenu"><span class="prop"><code>SubMenu</code></span></h3>

`ContextMenu` · The menu opened next to the item, on hover or click (see the menu's `SubMenusOpenType`). The arrow shows while it has items.
