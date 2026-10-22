---
layout: docs
legend: [prop, method, dp]
title: "Glossary: DefaultWindowTitleBar"
description: "The properties, methods and events of DefaultWindowTitleBar, in alphabetical order."
---

The title bar every window starts with: a <a class="ref prop" href="/docs/ui-glossary/elements/default-window-title-bar/#background">`Background`</a> image filling the bar, a centred <a class="ref prop" href="/docs/ui-glossary/elements/default-window-title-bar/#title">`Title`</a> text and a

`DefaultWindowTitleBar` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [layout page](/docs/ui-layout/#defaultwindowtitlebar) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="background"><span class="prop"><code>Background</code></span> <a class="ctx" href="/docs/ui-layout/#defaultwindowtitlebar" title="Background in context on the layout page" aria-label="Background in context on the layout page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/image/">`Image`</a> · Read-only. The image that fills the bar and holds the title and the close button. Its <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> is the bar's colour.

<h3 id="closebutton"><span class="prop"><code>CloseButton</code></span> <a class="ctx" href="/docs/ui-layout/#defaultwindowtitlebar" title="CloseButton in context on the layout page" aria-label="CloseButton in context on the layout page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/button/">`Button`</a> · Read-only. The close button at the right of the bar. It shows no text until you set its <span class="dp">`Text`</span> or `Content`.

<h3 id="onclosebuttonclickaction"><span class="prop"><code>OnCloseButtonClickAction</code></span> <a class="ctx" href="/docs/ui-layout/#defaultwindowtitlebar" title="OnCloseButtonClickAction in context on the layout page" aria-label="OnCloseButtonClickAction in context on the layout page">→</a></h3>

`Action` · What a click on the close button does. In a window's default title bar it is the window's <a class="ref method" href="/docs/ui-glossary/elements/window/#hide">`Hide`</a>.

<h3 id="title"><span class="prop"><code>Title</code></span> <a class="ctx" href="/docs/ui-layout/#defaultwindowtitlebar" title="Title in context on the layout page" aria-label="Title in context on the layout page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a> · Read-only. The title text, centred in the bar. Set its <span class="dp">`Text`</span> and text style properties.

## Methods

<h3 id="defaultwindowtitlebar"><span class="method"><code>DefaultWindowTitleBar()</code></span> <a class="ctx" href="/docs/ui-layout/#defaultwindowtitlebar" title="DefaultWindowTitleBar() in context on the layout page" aria-label="DefaultWindowTitleBar() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/default-window-title-bar/#defaultwindowtitlebar">`DefaultWindowTitleBar(string name = null)`</a> · Creates a title bar, for example to use in a window of your own. Its close button does nothing until <a class="ref prop" href="/docs/ui-glossary/elements/default-window-title-bar/#onclosebuttonclickaction">`OnCloseButtonClickAction`</a> is set.
