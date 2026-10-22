---
layout: docs
title: "Glossary: ContextMenuStyle"
description: "The members of ContextMenuStyle, in alphabetical order."
---

The style class of [`ContextMenu`](/docs/ui-lists/#contextmenu): the properties a style can set on it. Part styles <a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a>, <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a>, <a class="ref prop" href="/docs/ui-glossary/types/context-menu-style/#checkiconstyle">`CheckIconStyle`</a> and <a class="ref prop" href="/docs/ui-glossary/types/context-menu-style/#expandiconstyle">`ExpandIconStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>). Leaves out <span class="dp">`ItemsSource`</span>. Framework defaults: aligned left and top, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a> off, <a class="ref prop" href="/docs/ui-glossary/types/context-menu-style/#placement">`Placement`</a> `BottomRight`. A border 1 unit thick in the context menu colours of <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a>; a transparent list without dual colours whose hover and selected rows use `DefaultContextMenuHighlightColor`; an 8 by 8 check icon and a 6 by 8 expand icon in `DefaultContextMenuIconColor`.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="borderstyle"><span class="prop"><code>BorderStyle</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="BorderStyle in context on the lists and menus page" aria-label="BorderStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a> · The style of the [border](/docs/ui-layout/#border) around the items. By default a white background with a 1 unit dark grey border.

<h3 id="checkiconstyle"><span class="prop"><code>CheckIconStyle</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="CheckIconStyle in context on the lists and menus page" aria-label="CheckIconStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the check mark of a checked item. By default an 8 by 8 unit dark grey square.

<h3 id="expandiconstyle"><span class="prop"><code>ExpandIconStyle</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="ExpandIconStyle in context on the lists and menus page" aria-label="ExpandIconStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the arrow of an item with a sub-menu. By default a 6 by 8 unit dark grey block at the right end.

<h3 id="listboxstyle"><span class="prop"><code>ListBoxStyle</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="ListBoxStyle in context on the lists and menus page" aria-label="ListBoxStyle in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> · The style of the list of the items. By default transparent rows, highlighted in light blue under the mouse and when selected.

<h3 id="marginfrommousecursor"><span class="prop"><code>MarginFromMouseCursor</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="MarginFromMouseCursor in context on the lists and menus page" aria-label="MarginFromMouseCursor in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · An offset added to the point the menu opens at: `Left` to the x, `Top` to the y, in units.

<h3 id="placement"><span class="prop"><code>Placement</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="Placement in context on the lists and menus page" aria-label="Placement in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/context-menu-placement/">`ContextMenuPlacement`</a> · On which side of the point the menu opens. `BottomRight` by default.

<h3 id="submenusopentype"><span class="prop"><code>SubMenusOpenType</code></span> <a class="ctx" href="/docs/ui-lists/#contextmenu-properties" title="SubMenusOpenType in context on the lists and menus page" aria-label="SubMenusOpenType in context on the lists and menus page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/context-menu-sub-menus-open-type/">`ContextMenuSubMenusOpenType`</a> · Whether the sub-menus of this menu's items open on hover (`OnHover`, the default) or on click.

## Methods

<h3 id="contextmenustyle"><span class="method"><code>ContextMenuStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/context-menu-style/#contextmenustyle">`ContextMenuStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/context-menu-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
