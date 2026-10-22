---
layout: docs
title: "Glossary: Grid"
description: The properties, methods and events of Grid, in alphabetical order.
---

Lays its items out in columns and rows. Each column and row is fixed, fitted to its content, or a share of the space left.

`Grid` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [layout page](/docs/ui-layout/#grid) shows it in context, with code and screenshots.

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property, which a style, a binding or an animation can set.

## Properties

<h3 id="columnscount"><span class="prop"><code>ColumnsCount</code></span></h3>

`int` · Read-only. The number of column definitions. ([in context](/docs/ui-layout/#grid-properties))

<h3 id="layoutcolor"><span class="prop"><code>LayoutColor</code></span></h3>

`Color` · The colour of the lines `ShowLayout` draws; the fill is this colour with every channel divided by 5. Set it, the default is transparent. ([in context](/docs/ui-layout/#grid-properties))

<h3 id="rowscount"><span class="prop"><code>RowsCount</code></span></h3>

`int` · Read-only. The number of row definitions. ([in context](/docs/ui-layout/#grid-properties))

<h3 id="showlayout"><span class="prop"><code>ShowLayout</code></span></h3>

`bool` · Draws the grid's outline, a line at the end of every column and row, and fills each of them with a dim shade of `LayoutColor`. A debugging aid, off by default. ([in context](/docs/ui-layout/#grid-properties))

## Methods

<h3 id="addcolumndefinition"><span class="method"><code>AddColumnDefinition()</code></span></h3>

`AddColumnDefinition(int desiredSize)` · Adds a column of a fixed width in units (at least 1).

`AddColumnDefinition()` · Adds an auto column, as wide as the widest content of its cells.

`AddColumnDefinition(float proportion)` · Adds a proportional column, a share of the width left. Negative values count as 0.

<h3 id="additem"><span class="method"><code>AddItem()</code></span></h3>

`AddItem(BaseElement item)` · Puts the item in the cell its `GridColumn`, `GridRow` and spans name, making the cell if needed. Ignored when the column or row doesn't exist.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span></h3>

`AddItemAt(BaseElement item, int index)` · Does nothing: a grid places items by column and row. Use `AddItem`.

<h3 id="addrowdefinition"><span class="method"><code>AddRowDefinition()</code></span></h3>

`AddRowDefinition(int desiredSize)` · Adds a row of a fixed height in units (at least 1).

`AddRowDefinition()` · Adds an auto row, as tall as the tallest content of its cells.

`AddRowDefinition(float proportion)` · Adds a proportional row, a share of the height left. Negative values count as 0.

<h3 id="clear"><span class="method"><code>Clear()</code></span></h3>

`Clear()` · Removes every definition and every item. The items are detached, not disposed, so they can be added again.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span></h3>

`ClearItems()` · Removes every item and the emptied cells. The items are detached, not disposed; the definitions stay.

<h3 id="draw"><span class="method"><code>Draw()</code></span></h3>

`Draw()` · Draws the grid, with the `ShowLayout` lines under its items. The UI calls it; you don't.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span></h3>

`RemoveItem(BaseElement item)` · Takes the item out of its cell. It is detached, not disposed.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span></h3>

`RemoveItemAt(int index)` · Removes an item by its index in the items of all cells, cell by cell.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span></h3>

`RemoveItemsRangeAt(int index, int count)` · Removes `count` items from the index on, counted as in `RemoveItemAt`.

<h3 id="trygetcell"><span class="method"><code>TryGetCell()</code></span></h3>

`TryGetCell(int column, int row, int columnSpan = 1, int rowSpan = 1)` · Returns the cell at that place with those spans, or null when there is none (no item uses it) or the place is outside the grid. Spans are cut to the grid as `AddItem` cuts them.
