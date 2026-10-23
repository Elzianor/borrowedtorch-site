---
layout: docs
legend: [prop, dp, method]
title: "Glossary: Window"
description: "The properties, methods and events of Window, in alphabetical order."
---

A frame with a title bar and a content area. The user moves it by its title bar, and it can be modal.

`Window` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [layout page](/docs/ui-layout/#window) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="borderstyle"><span class="dp"><code>BorderStyle</code></span> <a class="ctx" href="/docs/ui-layout/#window-properties" title="BorderStyle in context on the layout page" aria-label="BorderStyle in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a> · The style of the window's frame: its <a class="ref dp" href="/docs/ui-glossary/elements/border/#thickness">`Thickness`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/border/#padding">`Padding`</a>, frame colour (<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a>), content area colour (<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a>) and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a>. The window follows changes made to the style object later.

<h3 id="content"><span class="dp"><code>Content</code></span> <a class="ctx" href="/docs/ui-layout/#window-properties" title="Content in context on the layout page" aria-label="Content in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · The element in the content area. A replaced content is detached, not disposed, and a disposed one is cleared. A style can't set it.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/window-style/">`WindowStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="ismodal"><span class="dp"><code>IsModal</code></span> <a class="ctx" href="/docs/ui-layout/#window-properties" title="IsModal in context on the layout page" aria-label="IsModal in context on the layout page">🠆</a></h3>

`bool` · Makes the window modal: drawn above everything over a shade, and the only part of the UI that gets the mouse while shown. Off by default.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/window-style/">`WindowStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="titlebar"><span class="dp"><code>TitleBar</code></span> <a class="ctx" href="/docs/ui-layout/#window-properties" title="TitleBar in context on the layout page" aria-label="TitleBar in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · The element in the title row. The default is a [`DefaultWindowTitleBar`](#defaultwindowtitlebar); set your own element to replace it, and clear the value to get the default one back. A replaced title bar is detached, not disposed. A style can't set it.

## Methods

<h3 id="window"><span class="method"><code>Window()</code></span> <a class="ctx" href="/docs/ui-layout/#window-methods" title="Window() in context on the layout page" aria-label="Window() in context on the layout page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/window/#window">`Window(string name = null)`</a> · Creates a window with the default title bar. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

<h3 id="hide"><span class="method"><code>Hide()</code></span> <a class="ctx" href="/docs/ui-layout/#window-methods" title="Hide() in context on the layout page" aria-label="Hide() in context on the layout page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/window/#hide">`Hide()`</a> · Hides the window (<a class="ref" href="/docs/ui-glossary/types/visibility/#hidden">`Visibility.Hidden`</a>).

<h3 id="show"><span class="method"><code>Show()</code></span> <a class="ctx" href="/docs/ui-layout/#window-methods" title="Show() in context on the layout page" aria-label="Show() in context on the layout page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/window/#show">`Show()`</a> · Makes the window visible. A hidden window shown this way goes on top of the other shown windows (of the modal ones when it is modal).
