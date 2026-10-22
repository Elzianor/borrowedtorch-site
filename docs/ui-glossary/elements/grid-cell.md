---
layout: docs
title: "Glossary: GridCell"
description: "The properties, methods and events of GridCell, in alphabetical order."
---

A cell the grid makes to hold the items of one place and span. You don't create cells; get one with <a class="ref method" href="/docs/ui-glossary/elements/grid/#trygetcell">`TryGetCell`</a>. A cell is aligned `Left` / `Top`, doesn't take the mouse, and clips its items. Its <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridcolumn">`GridColumn`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridrow">`GridRow`</a>,

`GridCell` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [layout page](/docs/ui-layout/#gridcell) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="contentheight"><span class="prop"><code>ContentHeight</code></span> <a class="ctx" href="/docs/ui-layout/#gridcell" title="ContentHeight in context on the layout page" aria-label="ContentHeight in context on the layout page">→</a></h3>

`int` · Read-only. The height the cell's items need; auto rows are sized by it.

<h3 id="contentwidth"><span class="prop"><code>ContentWidth</code></span> <a class="ctx" href="/docs/ui-layout/#gridcell" title="ContentWidth in context on the layout page" aria-label="ContentWidth in context on the layout page">→</a></h3>

`int` · Read-only. The width the cell's items need; auto columns are sized by it.

<h3 id="isspancell"><span class="prop"><code>IsSpanCell</code></span> <a class="ctx" href="/docs/ui-layout/#gridcell" title="IsSpanCell in context on the layout page" aria-label="IsSpanCell in context on the layout page">→</a></h3>

`bool` · Read-only. Whether the cell spans more than one column or row.

<h3 id="items"><span class="prop"><code>Items</code></span> <a class="ctx" href="/docs/ui-layout/#gridcell" title="Items in context on the layout page" aria-label="Items in context on the layout page">→</a></h3>

`IReadOnlyList<BaseElement>` · Read-only. The items in the cell.
