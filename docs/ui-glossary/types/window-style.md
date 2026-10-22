---
layout: docs
title: "Glossary: WindowStyle"
description: "The members of WindowStyle, in alphabetical order."
---

The style class of [`Window`](/docs/ui-layout/#window): the properties a style can set on it. Part style <a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a>. Leaves out <a class="ref dp" href="/docs/ui-glossary/elements/window/#titlebar">`TitleBar`</a> and `Content`. Framework defaults: a border `DefaultWindowBorderThickness` thick, filled with `DefaultWindowBackgroundColor`, in `DefaultWindowBorderColor`.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="borderstyle"><span class="prop"><code>BorderStyle</code></span> <a class="ctx" href="/docs/ui-layout/#window-properties" title="BorderStyle in context on the layout page" aria-label="BorderStyle in context on the layout page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a> · The style of the window's frame: its <a class="ref dp" href="/docs/ui-glossary/elements/border/#thickness">`Thickness`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/border/#padding">`Padding`</a>, frame colour (<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a>), content area colour (<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a>) and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a>. The window follows changes made to the style object later.

<h3 id="ismodal"><span class="prop"><code>IsModal</code></span> <a class="ctx" href="/docs/ui-layout/#window-properties" title="IsModal in context on the layout page" aria-label="IsModal in context on the layout page">→</a></h3>

`bool` · Makes the window modal: drawn above everything over a shade, and the only part of the UI that gets the mouse while shown. Off by default.

## Methods

<h3 id="windowstyle"><span class="method"><code>WindowStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/window-style/#windowstyle">`WindowStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/window-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.
