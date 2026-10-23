---
layout: docs
legend: [prop, method]
title: "Glossary: RichTextCursors"
description: "The members of RichTextCursors, in alphabetical order."
---

The cursors over the text of a [`RichTextBox`](/docs/ui-text/#richtextbox). They replace the hover and pressed cursors of the box's set. Disposable like <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a>.

A class deriving from [`DisposableBase`](/docs/ui-glossary/types/disposable-base/). The [styles page](/docs/ui-styles/#richtextcursors) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="linkcursor"><span class="prop"><code>LinkCursor</code></span> <a class="ctx" href="/docs/ui-styles/#richtextcursors" title="LinkCursor in context on the styles page" aria-label="LinkCursor in context on the styles page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Its hover and pressed cursors are shown over a link in a box that is not editable.

<h3 id="writecursor"><span class="prop"><code>WriteCursor</code></span> <a class="ctx" href="/docs/ui-styles/#richtextcursors" title="WriteCursor in context on the styles page" aria-label="WriteCursor in context on the styles page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Its hover and pressed cursors are shown over the text of an editable (`ReadWrite`) box.

## Methods

<h3 id="richtextcursors"><span class="method"><code>RichTextCursors()</code></span> <a class="ctx" href="/docs/ui-styles/#richtextcursors" title="RichTextCursors() in context on the styles page" aria-label="RichTextCursors() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/rich-text-cursors/#richtextcursors">`RichTextCursors()`</a> · Creates an empty set.

<h3 id="clone"><span class="method"><code>Clone()</code></span> <a class="ctx" href="/docs/ui-styles/#richtextcursors" title="Clone() in context on the styles page" aria-label="Clone() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/rich-text-cursors/#clone">`Clone()`</a> · Returns a copy (as `object`) that shares the two sets, or `null` when disposed.
