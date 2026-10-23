---
layout: docs
legend: [prop, method, event]
title: "Glossary: TabControl"
description: "The members of TabControl, in alphabetical order."
---

Not an element but a helper: it pairs tab elements with content elements and shows only the content of the open tab. You place the tabs and the contents yourself, for example buttons in a stack panel and the pages in one grid cell.

A class deriving from [`DisposableBase`](/docs/ui-glossary/types/disposable-base/). The [layout page](/docs/ui-layout/#tabcontrol) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="currentopenedcontent"><span class="prop"><code>CurrentOpenedContent</code></span> <a class="ctx" href="/docs/ui-layout/#tabcontrol-properties" title="CurrentOpenedContent in context on the layout page" aria-label="CurrentOpenedContent in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Read-only. The content of the open tab, the only one shown, or null.

<h3 id="currenttab"><span class="prop"><code>CurrentTab</code></span> <a class="ctx" href="/docs/ui-layout/#tabcontrol-properties" title="CurrentTab in context on the layout page" aria-label="CurrentTab in context on the layout page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Read-only. The open tab, or null when there is none.

## Methods

<h3 id="tabcontrol"><span class="method"><code>TabControl()</code></span> <a class="ctx" href="/docs/ui-layout/#tabcontrol-methods" title="TabControl() in context on the layout page" aria-label="TabControl() in context on the layout page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/tab-control/#tabcontrol">`TabControl()`</a> · Creates a tab control without tabs.

<h3 id="addtab"><span class="method"><code>AddTab()</code></span> <a class="ctx" href="/docs/ui-layout/#tabcontrol-methods" title="AddTab() in context on the layout page" aria-label="AddTab() in context on the layout page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/tab-control/#addtab">AddTab</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> tab, <a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> content)</code></span> · Adds a tab and its content; the content is hidden unless this is the first tab. Adding a tab again replaces its content. Null arguments are ignored.

| Parameter | Type | Description |
| --- | --- | --- |
| `tab` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element pressed to open the tab, such as a button. |
| `content` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element shown while the tab is open. |

<h3 id="opentab"><span class="method"><code>OpenTab()</code></span> <a class="ctx" href="/docs/ui-layout/#tabcontrol-methods" title="OpenTab() in context on the layout page" aria-label="OpenTab() in context on the layout page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/tab-control/#opentab">OpenTab</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> tab)</code></span> · Opens the tab, showing its content and hiding the open one. Does nothing for an element that isn't a tab of this control.

| Parameter | Type | Description |
| --- | --- | --- |
| `tab` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The tab to open, an element added with <a class="ref method" href="/docs/ui-glossary/types/tab-control/#addtab">`AddTab`</a>. |

<h3 id="removetab"><span class="method"><code>RemoveTab()</code></span> <a class="ctx" href="/docs/ui-layout/#tabcontrol-methods" title="RemoveTab() in context on the layout page" aria-label="RemoveTab() in context on the layout page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/tab-control/#removetab">RemoveTab</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> tab)</code></span> · Removes the tab. When it was open, its neighbour opens. Its content is visible again.

| Parameter | Type | Description |
| --- | --- | --- |
| `tab` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The tab to remove. |

## Events

<h3 id="ontabopened"><span class="event"><code>OnTabOpened</code></span> <a class="ctx" href="/docs/ui-layout/#tabcontrol-events" title="OnTabOpened in context on the layout page" aria-label="OnTabOpened in context on the layout page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/types/tab-control/">TabControl</a> sender, <a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> tab)</code> · Another tab opens: pressed, opened with <a class="ref method" href="/docs/ui-glossary/types/tab-control/#opentab">`OpenTab`</a>, the first one added, or the neighbour of a removed open tab. `tab` is null when the last tab was removed.
