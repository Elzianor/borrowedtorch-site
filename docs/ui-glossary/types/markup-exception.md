---
layout: docs
legend: [prop, method]
title: "Glossary: MarkupException"
description: "The members of MarkupException, in alphabetical order."
---

A markup that can't be read: what is wrong, and where (the line and the column, counted from 1 as text editors count them). <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#load">`UiMarkup.Load`</a> throws it after disposing every element it made.

A sealed class of the BorrowedTorch.UI.Markup package (namespace `BorrowedTorch.UI.Markup`), deriving from `Exception`. The [markup page](/docs/ui-markup/#markupexception) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="column"><span class="prop"><code>Column</code></span> <a class="ctx" href="/docs/ui-markup/#markupexception" title="Column in context on the markup page" aria-label="Column in context on the markup page">🠆</a></h3>

`int` · Read-only. The column of the mistake, from 1; 0 when the place isn't known.

<h3 id="innerexception"><span class="prop"><code>InnerException</code></span> <a class="ctx" href="/docs/ui-markup/#markupexception" title="InnerException in context on the markup page" aria-label="InnerException in context on the markup page">🠆</a></h3>

`Exception` · Read-only, from `Exception`. The exception behind the mistake: the XML reader's for XML that isn't well formed, or the one a constructor, a setter or a converter threw. `null` when there is none.

<h3 id="line"><span class="prop"><code>Line</code></span> <a class="ctx" href="/docs/ui-markup/#markupexception" title="Line in context on the markup page" aria-label="Line in context on the markup page">🠆</a></h3>

`int` · Read-only. The line of the mistake, from 1; 0 when the place isn't known.

<h3 id="message"><span class="prop"><code>Message</code></span> <a class="ctx" href="/docs/ui-markup/#markupexception" title="Message in context on the markup page" aria-label="Message in context on the markup page">🠆</a></h3>

`string` · Read-only, from `Exception`. The place and the reason: `Line 4, column 17: Button has no property Txt to set`.

<h3 id="reason"><span class="prop"><code>Reason</code></span> <a class="ctx" href="/docs/ui-markup/#markupexception" title="Reason in context on the markup page" aria-label="Reason in context on the markup page">🠆</a></h3>

`string` · Read-only. What is wrong, without the place.

## Methods

<h3 id="markupexception"><span class="method"><code>MarkupException()</code></span> <a class="ctx" href="/docs/ui-markup/#markupexception" title="MarkupException() in context on the markup page" aria-label="MarkupException() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-exception/#markupexception">`MarkupException(string reason, int line, int column, Exception innerException = null)`</a> · Creates the exception, its <a class="ref prop" href="/docs/ui-glossary/types/markup-exception/#message">`Message`</a> made of the place and the reason.

| Parameter | Type | Description |
| --- | --- | --- |
| `reason` | `string` | What is wrong, without the place. |
| `line` | `int` | The line, from 1. |
| `column` | `int` | The column, from 1. |
| `innerException` | `Exception` | The exception behind the mistake, `null` when there is none. |
