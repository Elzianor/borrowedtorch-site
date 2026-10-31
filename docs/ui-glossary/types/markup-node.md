---
layout: docs
legend: [prop]
title: "Glossary: MarkupNode"
description: "The members of MarkupNode, in alphabetical order."
---

An element of a markup as it is written (see <a class="ref prop" href="/docs/ui-glossary/types/markup-document/#nodes">`MarkupDocument.Nodes`</a>): the element it made, where it is written, and the elements written in it. An `<Include>` is a node as well, holding the elements of the UI it includes. For a tool showing a markup's elements, and finding the place one is written at.

A sealed class of the BorrowedTorch.UI.Markup package (namespace `BorrowedTorch.UI.Markup`). Its `ToString()` is the type name and the element's name, or `Include` and the source. The [markup page](/docs/ui-markup/#markupnode) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="children"><span class="prop"><code>Children</code></span> <a class="ctx" href="/docs/ui-markup/#markupnode" title="Children in context on the markup page" aria-label="Children in context on the markup page">🠆</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/ui-glossary/types/markup-node/">MarkupNode</a>&gt;</code> · Read-only. The elements written in it, in the order they are written: its items or its content, the elements given to its properties, an include's elements.

<h3 id="column"><span class="prop"><code>Column</code></span> <a class="ctx" href="/docs/ui-markup/#markupnode" title="Column in context on the markup page" aria-label="Column in context on the markup page">🠆</a></h3>

`int` · Read-only. The column of its start tag's name in its file, from 1.

<h3 id="element"><span class="prop"><code>Element</code></span> <a class="ctx" href="/docs/ui-markup/#markupnode" title="Element in context on the markup page" aria-label="Element in context on the markup page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Read-only. The element made, `null` for an include.

<h3 id="file"><span class="prop"><code>File</code></span> <a class="ctx" href="/docs/ui-markup/#markupnode" title="File in context on the markup page" aria-label="File in context on the markup page">🠆</a></h3>

`string` · Read-only. The file it is written in, by its full path: the file loaded or an included one; `null` for a markup given as text.

<h3 id="line"><span class="prop"><code>Line</code></span> <a class="ctx" href="/docs/ui-markup/#markupnode" title="Line in context on the markup page" aria-label="Line in context on the markup page">🠆</a></h3>

`int` · Read-only. The line of its start tag in its file, from 1.

<h3 id="parent"><span class="prop"><code>Parent</code></span> <a class="ctx" href="/docs/ui-markup/#markupnode" title="Parent in context on the markup page" aria-label="Parent in context on the markup page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/markup-node/">`MarkupNode`</a> · Read-only. The node it is written in, `null` for one under the root.

<h3 id="position"><span class="prop"><code>Position</code></span> <a class="ctx" href="/docs/ui-markup/#markupnode" title="Position in context on the markup page" aria-label="Position in context on the markup page">🠆</a></h3>

`string` · Read-only. Where it is in the markup: the indexes of the XML elements from the root down to it, from 0, through the includes (`1/0/2`). Property elements and `<Ui.Styles>` are counted. The node at the same position in the markup loaded again after an edit elsewhere in it is the same element; <a class="ref method" href="/docs/ui-glossary/types/markup-document/#nodeat">`NodeAt`</a> finds it.

<h3 id="property"><span class="prop"><code>Property</code></span> <a class="ctx" href="/docs/ui-markup/#markupnode" title="Property in context on the markup page" aria-label="Property in context on the markup page">🠆</a></h3>

`string` · Read-only. The property a property element gives the element to (`ToolTip` for one in `<Button.ToolTip>`), `null` for an item, a content or an element under the root.

<h3 id="source"><span class="prop"><code>Source</code></span> <a class="ctx" href="/docs/ui-markup/#markupnode" title="Source in context on the markup page" aria-label="Source in context on the markup page">🠆</a></h3>

`string` · Read-only. An include's `Source` as written, `null` for an element.

<h3 id="typename"><span class="prop"><code>TypeName</code></span> <a class="ctx" href="/docs/ui-markup/#markupnode" title="TypeName in context on the markup page" aria-label="TypeName in context on the markup page">🠆</a></h3>

`string` · Read-only. The type name as written (`Button`), or `Include`.
