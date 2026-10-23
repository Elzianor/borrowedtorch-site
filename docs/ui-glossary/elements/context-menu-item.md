---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: ContextMenuItem"
description: "The properties, methods and events of ContextMenuItem, in alphabetical order."
---

An item of a context menu: a check mark while it is checkable and checked, its content, and an arrow at the right end when it opens a sub-menu. The item is stretched over its row; the row takes the mouse and the item shows its state. Choosing it, with a click or the keyboard, raises its `OnClick` and the menu's <span class="event">`OnItemSelect`</span>.

`ContextMenuItem` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [lists and menus page](/docs/ui-lists/#contextmenuitem) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="content"><span class="prop"><code>Content</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenuitem" title="Content in context on the lists and menus page" aria-label="Content in context on the lists and menus page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Read-only. The element the item shows, given when it is made.

<h3 id="hassubitems"><span class="prop"><code>HasSubItems</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenuitem" title="HasSubItems in context on the lists and menus page" aria-label="HasSubItems in context on the lists and menus page">➤</a></h3>

`bool` · Read-only. Whether the item has a sub-menu with at least one item.

<h3 id="ischeckable"><span class="prop"><code>IsCheckable</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenuitem" title="IsCheckable in context on the lists and menus page" aria-label="IsCheckable in context on the lists and menus page">➤</a></h3>

`bool` · Whether choosing the item switches <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#ischecked">`IsChecked`</a>. Setting it to `false` also clears <a class="ref prop" href="/docs/ui-glossary/elements/context-menu-item/#ischecked">`IsChecked`</a>.

<h3 id="ischecked"><span class="prop"><code>IsChecked</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenuitem" title="IsChecked in context on the lists and menus page" aria-label="IsChecked in context on the lists and menus page">➤</a></h3>

`bool` · Whether the check mark of a checkable item is shown.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenuitem" title="MouseCursorsSet in context on the lists and menus page" aria-label="MouseCursorsSet in context on the lists and menus page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The mouse cursors of the row the item is in.

<h3 id="parentmenu"><span class="prop"><code>ParentMenu</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenuitem" title="ParentMenu in context on the lists and menus page" aria-label="ParentMenu in context on the lists and menus page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/context-menu/">`ContextMenu`</a> · Read-only. The menu the item is in.

<h3 id="source"><span class="prop"><code>Source</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenuitem" title="Source in context on the lists and menus page" aria-label="Source in context on the lists and menus page">➤</a></h3>

`object` · Read-only. The <span class="dp">`ItemsSource`</span> object the item shows, `null` for an item added in code.

<h3 id="submenu"><span class="prop"><code>SubMenu</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenuitem" title="SubMenu in context on the lists and menus page" aria-label="SubMenu in context on the lists and menus page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/context-menu/">`ContextMenu`</a> · The menu opened next to the item, on hover or click (see the menu's <a class="ref dp" href="/docs/ui-glossary/elements/context-menu/#submenusopentype">`SubMenusOpenType`</a>). The arrow shows while it has items.

## Methods

<h3 id="contextmenuitem"><span class="method"><code>ContextMenuItem()</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenuitem" title="ContextMenuItem() in context on the lists and menus page" aria-label="ContextMenuItem() in context on the lists and menus page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/context-menu-item/#contextmenuitem">`ContextMenuItem(string text, string name = null)`</a> · Creates an item showing the text in a label.

<span class="method"><code><a href="/docs/ui-glossary/elements/context-menu-item/#contextmenuitem">ContextMenuItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> content, string name = null)</code></span> · Creates an item showing any element.
