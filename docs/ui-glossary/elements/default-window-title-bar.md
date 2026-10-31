---
layout: docs
legend: [prop, dp, method]
title: "Glossary: DefaultWindowTitleBar"
description: "The properties, methods and events of DefaultWindowTitleBar, in alphabetical order."
---

The title bar every window starts with: a <a class="ref prop" href="/docs/ui-glossary/elements/default-window-title-bar/#background">`Background`</a> image filling the bar, a centered <a class="ref prop" href="/docs/ui-glossary/elements/default-window-title-bar/#title">`Title`</a> text and a <a class="ref prop" href="/docs/ui-glossary/elements/default-window-title-bar/#closebutton">`CloseButton`</a> at the right. In a window it is <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultwindowtitlethickness">`DefaultSettings.DefaultWindowTitleThickness`</a> tall (30 units by default), and its close button is always 4 units smaller than that, square. The bar's color comes from <a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultwindowtitlebarcolor">`DefaultSettings.DefaultWindowTitleBarColor`</a> (see [styles](/docs/ui-styles/)). Reach the parts through the window:

`DefaultWindowTitleBar` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [layout page](/docs/ui-layout/#defaultwindowtitlebar) shows it in context, with code and screenshots.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="background"><span class="prop"><code>Background</code></span> <a class="ctx" href="/docs/ui-layout/#defaultwindowtitlebar" title="Background in context on the layout page" aria-label="Background in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/image/">`Image`</a> · Read-only. The image that fills the bar and holds the title and the close button. Its <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> is the bar's color.

<h3 id="closebutton"><span class="prop"><code>CloseButton</code></span> <a class="ctx" href="/docs/ui-layout/#defaultwindowtitlebar" title="CloseButton in context on the layout page" aria-label="CloseButton in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/button/">`Button`</a> · Read-only. The close button at the right of the bar. It shows no text until you set its <span class="dp">`Text`</span> or `Content`. It is flat until the mouse is over it: its <a class="ref prop" href="/docs/ui-glossary/elements/button/#styleoverride">`StyleOverride`</a> gives it a transparent <a class="ref dp" href="/docs/ui-glossary/elements/button/#normalcolor">`NormalColor`</a>, so the button colors show only under the mouse and while it is pressed. Set its <a class="ref dp" href="/docs/ui-glossary/elements/button/#normalcolor">`NormalColor`</a> to light it all the time.

<h3 id="onclosebuttonclickaction"><span class="prop"><code>OnCloseButtonClickAction</code></span> <a class="ctx" href="/docs/ui-layout/#defaultwindowtitlebar" title="OnCloseButtonClickAction in context on the layout page" aria-label="OnCloseButtonClickAction in context on the layout page">🠆</a></h3>

`Action` · What a click on the close button does. In a window's default title bar it is the window's <a class="ref method" href="/docs/ui-glossary/elements/window/#hide">`Hide`</a>.

<h3 id="title"><span class="prop"><code>Title</code></span> <a class="ctx" href="/docs/ui-layout/#defaultwindowtitlebar" title="Title in context on the layout page" aria-label="Title in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/label/">`Label`</a> · Read-only. The title text, centered in the bar. Set its <span class="dp">`Text`</span> and text style properties.

## Methods

<h3 id="defaultwindowtitlebar"><span class="method"><code>DefaultWindowTitleBar()</code></span> <a class="ctx" href="/docs/ui-layout/#defaultwindowtitlebar" title="DefaultWindowTitleBar() in context on the layout page" aria-label="DefaultWindowTitleBar() in context on the layout page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/default-window-title-bar/#defaultwindowtitlebar">`DefaultWindowTitleBar(string name = null)`</a> · Creates a title bar, for example to use in a window of your own. Its close button does nothing until <a class="ref prop" href="/docs/ui-glossary/elements/default-window-title-bar/#onclosebuttonclickaction">`OnCloseButtonClickAction`</a> is set.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a>, which <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a> finds it by. Default: `null`. |
