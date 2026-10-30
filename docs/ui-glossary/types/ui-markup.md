---
layout: docs
legend: [method]
title: "Glossary: UiMarkup"
description: "The members of UiMarkup, in alphabetical order."
---

Builds the UI's elements from markup: an XML document whose root is `<Ui>`, with the UI's elements by type name, their properties as attributes and their items or content as child elements. Load on the thread that updates the UI, once the UI exists: the elements are made as code would make them.

A static class of the BorrowedTorch.UI.Markup package (namespace `BorrowedTorch.UI.Markup`). The [markup page](/docs/ui-markup/#uimarkup) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Methods

<h3 id="load"><span class="method"><code>Load()</code></span> <a class="ctx" href="/docs/ui-markup/#uimarkup" title="Load() in context on the markup page" aria-label="Load() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load(string markup, MarkupContext context = null)`</a> · Returns the elements under `<Ui>` (an `IReadOnlyList<BaseElement>`), in the order they are written, not added anywhere yet: add them to the root (<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#addelementtoroot">`AddElementToRoot`</a>) or to an element of your own. A markup that can't be read throws a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a> telling the line and the column, and keeps none of what it made: every element made so far is disposed. A `null` markup throws an `ArgumentNullException`.

| Parameter | Type | Description |
| --- | --- | --- |
| `markup` | `string` | The markup's XML text. |
| `context` | <a class="ref" href="/docs/ui-glossary/types/markup-context/">`MarkupContext`</a> | The event handlers, the data context of the bindings, and the types and converters of your own. `null` for a markup that needs none. |

<h3 id="loadfile"><span class="method"><code>LoadFile()</code></span> <a class="ctx" href="/docs/ui-markup/#uimarkup" title="LoadFile() in context on the markup page" aria-label="LoadFile() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadfile">`LoadFile(string path, MarkupContext context = null)`</a> · <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a> of the text of a file. The errors of the file itself, such as a missing file, are thrown as `File.ReadAllText` throws them.

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | The file, any path `File.ReadAllText` takes. |
| `context` | <a class="ref" href="/docs/ui-glossary/types/markup-context/">`MarkupContext`</a> | As for <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a>. |
