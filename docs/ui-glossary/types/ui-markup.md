---
layout: docs
legend: [method]
title: "Glossary: UiMarkup"
description: "The members of UiMarkup, in alphabetical order."
---

Builds the UI's elements from markup: an XML document whose root is `<Ui>`, with the UI's elements by type name, their properties as attributes and their items or content as child elements. It reads style dictionaries too, markups whose root is `<Styles>`. Load on the thread that updates the UI, once the UI exists: the elements are made as code would make them.

A static class of the BorrowedTorch.UI.Markup package (namespace `BorrowedTorch.UI.Markup`). The [markup page](/docs/ui-markup/#uimarkup) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Methods

<h3 id="isstyledictionary"><span class="method"><code>IsStyleDictionary()</code></span> <a class="ctx" href="/docs/ui-markup/#uimarkup" title="IsStyleDictionary() in context on the markup page" aria-label="IsStyleDictionary() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#isstyledictionary">`IsStyleDictionary(string markup)`</a> · Whether a markup's root is `<Styles>`, a style dictionary for <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstyles">`LoadStyles`</a>, rather than `<Ui>`, a UI for <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a>: for a tool that takes both. It reads up to the root only; a markup that isn't well formed that far is no dictionary. A `null` markup throws an `ArgumentNullException`.

| Parameter | Type | Description |
| --- | --- | --- |
| `markup` | `string` | The markup's XML text. |

<h3 id="load"><span class="method"><code>Load()</code></span> <a class="ctx" href="/docs/ui-markup/#uimarkup" title="Load() in context on the markup page" aria-label="Load() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load(string markup, MarkupContext context = null)`</a> · Returns the elements under `<Ui>` (an `IReadOnlyList<BaseElement>`), in the order they are written, not added anywhere yet: add them to the root (<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#addelementtoroot">`AddElementToRoot`</a>) or to an element of your own. A markup that can't be read throws a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a> telling the line and the column, and keeps none of what it made: every element made so far is disposed. A `null` markup throws an `ArgumentNullException`.

| Parameter | Type | Description |
| --- | --- | --- |
| `markup` | `string` | The markup's XML text. Its includes are found from the context's <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#basedirectory">`BaseDirectory`</a>. |
| `context` | <a class="ref" href="/docs/ui-glossary/types/markup-context/">`MarkupContext`</a> | The event handlers, the data context of the bindings, the style dictionaries, how files are read, and the types and converters of your own. `null` for a markup that needs none. |

<h3 id="loaddocument"><span class="method"><code>LoadDocument()</code></span> <a class="ctx" href="/docs/ui-markup/#uimarkup" title="LoadDocument() in context on the markup page" aria-label="LoadDocument() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocument">`LoadDocument(string markup, MarkupContext context = null)`</a> · <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a>, returning a <a class="ref" href="/docs/ui-glossary/types/markup-document/">`MarkupDocument`</a> that keeps every element the markup made: disposing it disposes them all, the items and contents of its panels included, which disposing a panel leaves alone (it only detaches them). For a UI that goes away as a whole, a screen left or a markup loaded again in its place.

| Parameter | Type | Description |
| --- | --- | --- |
| `markup` | `string` | The markup's XML text. |
| `context` | <a class="ref" href="/docs/ui-glossary/types/markup-context/">`MarkupContext`</a> | As for <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a>. |

<h3 id="loaddocumentfile"><span class="method"><code>LoadDocumentFile()</code></span> <a class="ctx" href="/docs/ui-markup/#uimarkup" title="LoadDocumentFile() in context on the markup page" aria-label="LoadDocumentFile() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocumentfile">`LoadDocumentFile(string path, MarkupContext context = null)`</a> · <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocument">`LoadDocument`</a> of the text of a file, read through the context's <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#readfile">`ReadFile`</a>; its includes are found from its directory. The errors of reading the file itself, such as a missing file, are thrown as they are.

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | The file, any path `File.ReadAllText` takes (or the context's `ReadFile`, given the full path). |
| `context` | <a class="ref" href="/docs/ui-glossary/types/markup-context/">`MarkupContext`</a> | As for <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a>. |

<h3 id="loadfile"><span class="method"><code>LoadFile()</code></span> <a class="ctx" href="/docs/ui-markup/#uimarkup" title="LoadFile() in context on the markup page" aria-label="LoadFile() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadfile">`LoadFile(string path, MarkupContext context = null)`</a> · <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a> of the text of a file, read through the context's <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#readfile">`ReadFile`</a> (`File.ReadAllText` without one); its includes are found from its directory. The errors of reading the file itself, such as a missing file, are thrown as they are.

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | The file, any path `File.ReadAllText` takes (or the context's `ReadFile`, given the full path). |
| `context` | <a class="ref" href="/docs/ui-glossary/types/markup-context/">`MarkupContext`</a> | As for <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`Load`</a>. |

<h3 id="loadstyles"><span class="method"><code>LoadStyles()</code></span> <a class="ctx" href="/docs/ui-markup/#uimarkup" title="LoadStyles() in context on the markup page" aria-label="LoadStyles() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstyles">`LoadStyles(string markup, MarkupContext context = null)`</a> · Reads a style dictionary, a markup whose root is `<Styles>` holding styles by their type names (`<ButtonStyle Key="danger" NormalColor="DarkRed" />`), and returns its <a class="ref" href="/docs/ui-glossary/types/style-dictionary/">`StyleDictionary`</a>: the styles with a key, named by markups, and the ones without, general styles. A style `BasedOn` another key starts as a copy of it. A dictionary that can't be read throws a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a>; a `null` markup throws an `ArgumentNullException`.

| Parameter | Type | Description |
| --- | --- | --- |
| `markup` | `string` | The dictionary's XML text. |
| `context` | <a class="ref" href="/docs/ui-glossary/types/markup-context/">`MarkupContext`</a> | The style types and converters of your own, and the keys of the dictionaries added before, which `BasedOn` can name. `null` for a dictionary that needs none. |

<h3 id="loadstylesfile"><span class="method"><code>LoadStylesFile()</code></span> <a class="ctx" href="/docs/ui-markup/#uimarkup" title="LoadStylesFile() in context on the markup page" aria-label="LoadStylesFile() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstylesfile">`LoadStylesFile(string path, MarkupContext context = null)`</a> · <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstyles">`LoadStyles`</a> of the text of a file, read through the context's <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#readfile">`ReadFile`</a>; its includes are found from its directory. The errors of reading the file itself are thrown as they are.

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | The file, any path `File.ReadAllText` takes (or the context's `ReadFile`, given the full path). |
| `context` | <a class="ref" href="/docs/ui-glossary/types/markup-context/">`MarkupContext`</a> | As for <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstyles">`LoadStyles`</a>. |

<h3 id="tryreadcolor"><span class="method"><code>TryReadColor()</code></span> <a class="ctx" href="/docs/ui-markup/#uimarkup" title="TryReadColor() in context on the markup page" aria-label="TryReadColor() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#tryreadcolor">`TryReadColor(string text, out Color color)`</a> · Reads a text as the markup reads a `Color` property's value, and returns whether it could: `#RRGGBB`, `#RRGGBBAA`, `r, g, b` or `r, g, b, a` (0 to 255), or the name of one of `Color`'s colors (`White`, `CornflowerBlue`), in any case. For a tool that shows what a markup says, such as an editor marking the colors in it.

| Parameter | Type | Description |
| --- | --- | --- |
| `text` | `string` | The text of an attribute. |
| `color` | `Color` | Out. The color read, when it could be read. |
