---
layout: docs
title: "Glossary: ContentContainer"
description: "The properties, methods and events of ContentContainer, in alphabetical order."
---

The single-element holder that <a class="ref" href="/docs/ui-glossary/elements/border/">`Border`</a> (and a few controls, such as the check box) keep their content in, and the base class of <a class="ref" href="/docs/ui-glossary/elements/separator/">`Separator`</a>. It doesn't take the mouse and shows the mouse cursors of the element it belongs to.

`ContentContainer` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [layout page](/docs/ui-layout/#contentcontainer) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="content"><span class="prop"><code>Content</code></span> <a class="ctx" href="/docs/ui-layout/#contentcontainer" title="Content in context on the layout page" aria-label="Content in context on the layout page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Read-only. The element the container holds: its first item, or null.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-layout/#contentcontainer" title="MouseCursorsSet in context on the layout page" aria-label="MouseCursorsSet in context on the layout page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors of the container's parent, so the container shows the cursors of its control.

## Methods

<h3 id="contentcontainer"><span class="method"><code>ContentContainer()</code></span> <a class="ctx" href="/docs/ui-layout/#contentcontainer" title="ContentContainer() in context on the layout page" aria-label="ContentContainer() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/content-container/#contentcontainer">`ContentContainer(string name = null)`</a> · Creates a content container. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.
