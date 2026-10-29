---
layout: docs
legend: [method]
title: "Glossary: PainterOrderDepthSort"
description: "The members of PainterOrderDepthSort, in alphabetical order."
---

Sorts items far to near by their depth, to paint overlapping overlays with depth testing off.

A static class. The [drawing page](/docs/transform-gizmo-drawing/#painters-order-for-overlays-of-your-own) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Methods

<h3 id="fartonear"><span class="method"><code>FarToNear()</code></span> <a class="ctx" href="/docs/transform-gizmo-drawing/#painterorderdepthsort-methods" title="FarToNear() in context on the drawing page" aria-label="FarToNear() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/painter-order-depth-sort/#fartonear">`FarToNear(ReadOnlySpan<float> depths, Span<int> order)`</a> · Static. Fills `order` with the indices from 0 to its length − 1, sorted by depth from the largest, the farthest, to the smallest. Stable: items of equal depth keep their order. An insertion sort that allocates nothing and leaves `depths` as they are, quick for the tens to hundreds of items of an overlay.

| Parameter | Type | Description |
| --- | --- | --- |
| `depths` | `ReadOnlySpan<float>` | One depth per item, larger farther, such as the distance along the camera's forward. At least as long as `order`. |
| `order` | `Span<int>` | Filled with the indices in paint order. Its length is the number of items sorted. |
