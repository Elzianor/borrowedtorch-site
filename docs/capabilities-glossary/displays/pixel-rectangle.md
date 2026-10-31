---
layout: docs
legend: [prop, method]
title: "Glossary: PixelRectangle"
description: "The members of PixelRectangle, in alphabetical order."
---

A rectangle of the desktop, in the displays' own pixels.

A readonly record struct, in the namespace `BorrowedTorch.Capabilities`, compared by its four values. The primary display's top left corner is 0, 0, and a display left of it or above it has negative coordinates. <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#bounds">`Display.Bounds`</a> and <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#workarea">`Display.WorkArea`</a> are rectangles of the desktop. The [displays page](/docs/capabilities-displays/#where-a-display-is) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="bottom"><span class="prop"><code>Bottom</code></span> <a class="ctx" href="/docs/capabilities-displays/#pixelrectangle-members" title="Bottom in context on the displays page" aria-label="Bottom in context on the displays page">→</a></h3>

`int` · Read-only. The row just below the rectangle: <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#y">`Y`</a> + <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#height">`Height`</a>.

<h3 id="height"><span class="prop"><code>Height</code></span> <a class="ctx" href="/docs/capabilities-displays/#pixelrectangle-members" title="Height in context on the displays page" aria-label="Height in context on the displays page">→</a></h3>

`int` · How many rows the rectangle spans.

<h3 id="right"><span class="prop"><code>Right</code></span> <a class="ctx" href="/docs/capabilities-displays/#pixelrectangle-members" title="Right in context on the displays page" aria-label="Right in context on the displays page">→</a></h3>

`int` · Read-only. The column just right of the rectangle: <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#x">`X`</a> + <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#width">`Width`</a>.

<h3 id="width"><span class="prop"><code>Width</code></span> <a class="ctx" href="/docs/capabilities-displays/#pixelrectangle-members" title="Width in context on the displays page" aria-label="Width in context on the displays page">→</a></h3>

`int` · How many columns the rectangle spans.

<h3 id="x"><span class="prop"><code>X</code></span> <a class="ctx" href="/docs/capabilities-displays/#pixelrectangle-members" title="X in context on the displays page" aria-label="X in context on the displays page">→</a></h3>

`int` · The rectangle's left column.

<h3 id="y"><span class="prop"><code>Y</code></span> <a class="ctx" href="/docs/capabilities-displays/#pixelrectangle-members" title="Y in context on the displays page" aria-label="Y in context on the displays page">→</a></h3>

`int` · The rectangle's top row.

## Methods

<h3 id="contains"><span class="method"><code>Contains()</code></span> <a class="ctx" href="/docs/capabilities-displays/#pixelrectangle-members" title="Contains() in context on the displays page" aria-label="Contains() in context on the displays page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/displays/pixel-rectangle/#contains">`Contains(int x, int y)`</a> · Returns whether a pixel is in the rectangle: from <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#x">`X`</a> and <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#y">`Y`</a> up to <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#right">`Right`</a> and <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#bottom">`Bottom`</a>, not including them.

| Parameter | Type | Description |
| --- | --- | --- |
| `x` | `int` | The pixel's column. |
| `y` | `int` | The pixel's row. |

<a class="ref method" href="/docs/capabilities-glossary/displays/pixel-rectangle/#contains">`Contains(PixelRectangle other)`</a> · Returns whether another rectangle lies wholly in this one; one with the same edges does.

| Parameter | Type | Description |
| --- | --- | --- |
| `other` | <a class="ref" href="/docs/capabilities-glossary/displays/pixel-rectangle/">`PixelRectangle`</a> | The other rectangle. |

<h3 id="pixelrectangle"><span class="method"><code>PixelRectangle(int, int, int, int)</code></span> <a class="ctx" href="/docs/capabilities-displays/#pixelrectangle-members" title="PixelRectangle(int, int, int, int) in context on the displays page" aria-label="PixelRectangle(int, int, int, int) in context on the displays page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/displays/pixel-rectangle/#pixelrectangle">`PixelRectangle(int X, int Y, int Width, int Height)`</a> · A rectangle at a place on the desktop, of a size.

| Parameter | Type | Description |
| --- | --- | --- |
| `X` | `int` | The left column. |
| `Y` | `int` | The top row. |
| `Width` | `int` | How many columns it spans. |
| `Height` | `int` | How many rows it spans. |
