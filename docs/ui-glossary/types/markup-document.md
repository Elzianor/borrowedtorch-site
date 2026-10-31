---
layout: docs
legend: [prop, method]
title: "Glossary: MarkupDocument"
description: "The members of MarkupDocument, in alphabetical order."
---

What a markup made, returned by <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocument">`LoadDocument`</a> and <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocumentfile">`LoadDocumentFile`</a>: the elements under `<Ui>`, every element made for them, which <a class="ref method" href="/docs/ui-glossary/types/markup-document/#dispose">`Dispose`</a> disposes, and the markup's elements as written, with where each one is. For a UI that goes away as a whole, a screen left or a markup loaded again in its place, and for a tool that shows a markup's elements.

A sealed class of the BorrowedTorch.UI.Markup package (namespace `BorrowedTorch.UI.Markup`), `IDisposable`. The [markup page](/docs/ui-markup/#markupdocument) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="elements"><span class="prop"><code>Elements</code></span> <a class="ctx" href="/docs/ui-markup/#markupdocument" title="Elements in context on the markup page" aria-label="Elements in context on the markup page">🠆</a></h3>

`IReadOnlyList<BaseElement>` · Read-only. The elements under `<Ui>`, in the order they are written, not added anywhere yet: add them to the root (<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#addelementtoroot">`AddElementToRoot`</a>) or to an element of your own.

<h3 id="nodes"><span class="prop"><code>Nodes</code></span> <a class="ctx" href="/docs/ui-markup/#markupdocument" title="Nodes in context on the markup page" aria-label="Nodes in context on the markup page">🠆</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/ui-glossary/types/markup-node/">MarkupNode</a>&gt;</code> · Read-only. The markup's elements as written, in a tree of <a class="ref" href="/docs/ui-glossary/types/markup-node/">`MarkupNode`</a>s: the ones under `<Ui>`, with the elements written in them, an include holding the elements of its UI. See [the elements as written](/docs/ui-markup/#the-elements-as-written).

## Methods

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/ui-markup/#markupdocument" title="Dispose() in context on the markup page" aria-label="Dispose() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-document/#dispose">`Dispose()`</a> · Disposes every element the markup made, the items and contents of its panels included, which disposing a panel leaves alone (it only detaches them). A disposed element leaves its parent, the root as well. Elements added to them since are only detached, as a panel's own items are.

<h3 id="nodeat"><span class="method"><code>NodeAt()</code></span> <a class="ctx" href="/docs/ui-markup/#markupdocument" title="NodeAt() in context on the markup page" aria-label="NodeAt() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-document/#nodeat">`NodeAt(string position)`</a> · The node at a position, `null` where there is none (or for a `null` position). The same position in the markup loaded again after an edit elsewhere in it is the same element, so a tool keeps its selection across reloads.

| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `string` | A node's <a class="ref prop" href="/docs/ui-glossary/types/markup-node/#position">`Position`</a>: `1/0/2`. |

<h3 id="nodeof"><span class="method"><code>NodeOf()</code></span> <a class="ctx" href="/docs/ui-markup/#markupdocument" title="NodeOf() in context on the markup page" aria-label="NodeOf() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-document/#nodeof">`NodeOf(BaseElement element)`</a> · The node of an element the markup has, `null` for one it doesn't (or for `null`). A part a control made for itself, such as a slider's thumb, has none: walk up its <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#parent">`Parent`</a>s to the element written.

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | An element, for example the one clicked in a tool's view. |
