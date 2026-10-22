---
layout: docs
legend: [prop, method, dp]
title: "Glossary: Grid"
description: "The properties, methods and events of Grid, in alphabetical order."
---

Lays its items out in columns and rows. Each column and row is fixed, fitted to its content, or a share of the space left.

`Grid` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [layout page](/docs/ui-layout/#grid) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="columnscount"><span class="prop"><code>ColumnsCount</code></span> <a class="ctx" href="/docs/ui-layout/#grid-properties" title="ColumnsCount in context on the layout page" aria-label="ColumnsCount in context on the layout page">→</a></h3>

`int` · Read-only. The number of column definitions.

<h3 id="layoutcolor"><span class="prop"><code>LayoutColor</code></span> <a class="ctx" href="/docs/ui-layout/#grid-properties" title="LayoutColor in context on the layout page" aria-label="LayoutColor in context on the layout page">→</a></h3>

`Color` · The colour of the lines <a class="ref prop" href="/docs/ui-glossary/elements/grid/#showlayout">`ShowLayout`</a> draws; the fill is this colour with every channel divided by 5. Set it, the default is transparent.

<h3 id="rowscount"><span class="prop"><code>RowsCount</code></span> <a class="ctx" href="/docs/ui-layout/#grid-properties" title="RowsCount in context on the layout page" aria-label="RowsCount in context on the layout page">→</a></h3>

`int` · Read-only. The number of row definitions.

<h3 id="showlayout"><span class="prop"><code>ShowLayout</code></span> <a class="ctx" href="/docs/ui-layout/#grid-properties" title="ShowLayout in context on the layout page" aria-label="ShowLayout in context on the layout page">→</a></h3>

`bool` · Draws the grid's outline, a line at the end of every column and row, and fills each of them with a dim shade of <a class="ref prop" href="/docs/ui-glossary/elements/grid/#layoutcolor">`LayoutColor`</a>. A debugging aid, off by default.

## Methods

<h3 id="grid"><span class="method"><code>Grid()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="Grid() in context on the layout page" aria-label="Grid() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/grid/#grid">`Grid(string name = null)`</a> · Creates a grid without definitions. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

<h3 id="addcolumndefinition"><span class="method"><code>AddColumnDefinition()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="AddColumnDefinition() in context on the layout page" aria-label="AddColumnDefinition() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/grid/#addcolumndefinition">`AddColumnDefinition(int desiredSize)`</a> · Adds a column of a fixed width in units (at least 1).

<a class="ref method" href="/docs/ui-glossary/elements/grid/#addcolumndefinition">`AddColumnDefinition()`</a> · Adds an auto column, as wide as the widest content of its cells.

<a class="ref method" href="/docs/ui-glossary/elements/grid/#addcolumndefinition">`AddColumnDefinition(float proportion)`</a> · Adds a proportional column, a share of the width left. Negative values count as 0.

<h3 id="additem"><span class="method"><code>AddItem()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="AddItem() in context on the layout page" aria-label="AddItem() in context on the layout page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/grid/#additem">AddItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Puts the item in the cell its <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridcolumn">`GridColumn`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#gridrow">`GridRow`</a> and spans name, making the cell if needed. Ignored when the column or row doesn't exist.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="AddItemAt() in context on the layout page" aria-label="AddItemAt() in context on the layout page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/grid/#additemat">AddItemAt</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item, int index)</code></span> · Does nothing: a grid places items by column and row. Use <a class="ref method" href="/docs/ui-glossary/elements/grid/#additem">`AddItem`</a>.

<h3 id="addrowdefinition"><span class="method"><code>AddRowDefinition()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="AddRowDefinition() in context on the layout page" aria-label="AddRowDefinition() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/grid/#addrowdefinition">`AddRowDefinition(int desiredSize)`</a> · Adds a row of a fixed height in units (at least 1).

<a class="ref method" href="/docs/ui-glossary/elements/grid/#addrowdefinition">`AddRowDefinition()`</a> · Adds an auto row, as tall as the tallest content of its cells.

<a class="ref method" href="/docs/ui-glossary/elements/grid/#addrowdefinition">`AddRowDefinition(float proportion)`</a> · Adds a proportional row, a share of the height left. Negative values count as 0.

<h3 id="clear"><span class="method"><code>Clear()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="Clear() in context on the layout page" aria-label="Clear() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/grid/#clear">`Clear()`</a> · Removes every definition and every item. The items are detached, not disposed, so they can be added again.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="ClearItems() in context on the layout page" aria-label="ClearItems() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/grid/#clearitems">`ClearItems()`</a> · Removes every item and the emptied cells. The items are detached, not disposed; the definitions stay.

<h3 id="draw"><span class="method"><code>Draw()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="Draw() in context on the layout page" aria-label="Draw() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/grid/#draw">`Draw()`</a> · Draws the grid, with the <a class="ref prop" href="/docs/ui-glossary/elements/grid/#showlayout">`ShowLayout`</a> lines under its items. The UI calls it; you don't.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="RemoveItem() in context on the layout page" aria-label="RemoveItem() in context on the layout page">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/grid/#removeitem">RemoveItem</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> item)</code></span> · Takes the item out of its cell. It is detached, not disposed.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="RemoveItemAt() in context on the layout page" aria-label="RemoveItemAt() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/grid/#removeitemat">`RemoveItemAt(int index)`</a> · Removes an item by its index in the items of all cells, cell by cell.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="RemoveItemsRangeAt() in context on the layout page" aria-label="RemoveItemsRangeAt() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/grid/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> · Removes `count` items from the index on, counted as in <a class="ref method" href="/docs/ui-glossary/elements/grid/#removeitemat">`RemoveItemAt`</a>.

<h3 id="trygetcell"><span class="method"><code>TryGetCell()</code></span> <a class="ctx" href="/docs/ui-layout/#grid-methods" title="TryGetCell() in context on the layout page" aria-label="TryGetCell() in context on the layout page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/grid/#trygetcell">`TryGetCell(int column, int row, int columnSpan = 1, int rowSpan = 1)`</a> · Returns the cell at that place with those spans, or null when there is none (no item uses it) or the place is outside the grid. Spans are cut to the grid as <a class="ref method" href="/docs/ui-glossary/elements/grid/#additem">`AddItem`</a> cuts them.
