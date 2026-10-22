---
layout: docs
title: "Glossary: MouseCursorsSet"
description: "The members of MouseCursorsSet, in alphabetical order."
---

The cursors an element shows. It is disposable: disposing it disposes its <a class="ref" href="/docs/ui-glossary/types/drag-and-drop-cursors/">`DragAndDropCursors`</a>, <a class="ref" href="/docs/ui-glossary/types/resize-cursors/">`ResizeCursors`</a> and

A class deriving from [`DisposableBase`](/docs/ui-glossary/types/disposable-base/). The [styles page](/docs/ui-styles/#mousecursorsset) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="draganddropcursors"><span class="prop"><code>DragAndDropCursors</code></span> <a class="ctx" href="/docs/ui-styles/#mousecursorsset" title="DragAndDropCursors in context on the styles page" aria-label="DragAndDropCursors in context on the styles page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/drag-and-drop-cursors/">`DragAndDropCursors`</a> · The cursors of a draggable element and of drop targets.

<h3 id="hovercursor"><span class="prop"><code>HoverCursor</code></span> <a class="ctx" href="/docs/ui-styles/#mousecursorsset" title="HoverCursor in context on the styles page" aria-label="HoverCursor in context on the styles page">→</a></h3>

`MouseCursor` · The cursor while the mouse is over the element.

<h3 id="pressedcursor"><span class="prop"><code>PressedCursor</code></span> <a class="ctx" href="/docs/ui-styles/#mousecursorsset" title="PressedCursor in context on the styles page" aria-label="PressedCursor in context on the styles page">→</a></h3>

`MouseCursor` · The cursor while the left button is held on the element.

<h3 id="resizecursors"><span class="prop"><code>ResizeCursors</code></span> <a class="ctx" href="/docs/ui-styles/#mousecursorsset" title="ResizeCursors in context on the styles page" aria-label="ResizeCursors in context on the styles page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/resize-cursors/">`ResizeCursors`</a> · The cursors on the edges and corners of a resizable element.

<h3 id="richtextcursors"><span class="prop"><code>RichTextCursors</code></span> <a class="ctx" href="/docs/ui-styles/#mousecursorsset" title="RichTextCursors in context on the styles page" aria-label="RichTextCursors in context on the styles page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-cursors/">`RichTextCursors`</a> · The cursors over the text of a rich text box.

## Methods

<h3 id="mousecursorsset"><span class="method"><code>MouseCursorsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#mousecursorsset" title="MouseCursorsSet() in context on the styles page" aria-label="MouseCursorsSet() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/mouse-cursors-set/#mousecursorsset">`MouseCursorsSet()`</a> · Creates an empty set.

<h3 id="clone"><span class="method"><code>Clone()</code></span> <a class="ctx" href="/docs/ui-styles/#mousecursorsset" title="Clone() in context on the styles page" aria-label="Clone() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/mouse-cursors-set/#clone">`Clone()`</a> · Returns a copy (as `object`), with copies of the three nested sets; the `MouseCursor` objects are shared. Returns `null` for a disposed set.
