---
layout: docs
legend: [prop, method]
title: "Glossary: MarkupDocument"
description: "The members of MarkupDocument, in alphabetical order."
---

What a markup made, returned by <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocument">`LoadDocument`</a> and <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocumentfile">`LoadDocumentFile`</a>: the elements under `<Ui>`, and every element made for them, which <a class="ref method" href="/docs/ui-glossary/types/markup-document/#dispose">`Dispose`</a> disposes. For a UI that goes away as a whole, a screen left or a markup loaded again in its place.

A sealed class of the BorrowedTorch.UI.Markup package (namespace `BorrowedTorch.UI.Markup`), `IDisposable`. The [markup page](/docs/ui-markup/#markupdocument) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="elements"><span class="prop"><code>Elements</code></span> <a class="ctx" href="/docs/ui-markup/#markupdocument" title="Elements in context on the markup page" aria-label="Elements in context on the markup page">🠆</a></h3>

`IReadOnlyList<BaseElement>` · Read-only. The elements under `<Ui>`, in the order they are written, not added anywhere yet: add them to the root (<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#addelementtoroot">`AddElementToRoot`</a>) or to an element of your own.

## Methods

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/ui-markup/#markupdocument" title="Dispose() in context on the markup page" aria-label="Dispose() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-document/#dispose">`Dispose()`</a> · Disposes every element the markup made, the items and contents of its panels included, which disposing a panel leaves alone (it only detaches them). A disposed element leaves its parent, the root as well. Elements added to them since are only detached, as a panel's own items are.
