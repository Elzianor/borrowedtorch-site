---
layout: docs
title: "Glossary: DefaultWindowTitleBar"
description: The properties, methods and events of DefaultWindowTitleBar, in alphabetical order.
---

The title bar every window starts with: a `Background` image filling the bar, a centred `Title` text and a `CloseButton` at the right. In a window it is `DefaultSettings.DefaultWindowTitleThickness` tall (30 units by default), and its close button is always 4 units smaller than that, square. The bar's colour comes from `DefaultSettings.DefaultWindowTitleBarColor` (see [styles](/docs/ui-styles/)). Reach the parts through the window:

`DefaultWindowTitleBar` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [layout page](/docs/ui-layout/#defaultwindowtitlebar) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="background"><span class="prop"><code>Background</code></span></h3>

`Image` · Read-only. The image that fills the bar and holds the title and the close button. Its `BackgroundColor` is the bar's colour.

<h3 id="closebutton"><span class="prop"><code>CloseButton</code></span></h3>

`Button` · Read-only. The close button at the right of the bar. It shows no text until you set its `Text` or `Content`.

<h3 id="onclosebuttonclickaction"><span class="prop"><code>OnCloseButtonClickAction</code></span></h3>

`Action` · What a click on the close button does. In a window's default title bar it is the window's `Hide`.

<h3 id="title"><span class="prop"><code>Title</code></span></h3>

`RichTextBox` · Read-only. The title text, centred in the bar. Set its `Text` and text style properties.
