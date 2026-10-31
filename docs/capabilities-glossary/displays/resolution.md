---
layout: docs
legend: [prop, method]
title: "Glossary: Resolution"
description: "The members of Resolution, in alphabetical order."
---

A display's size in pixels, for a game's resolution setting.

A readonly record struct, in the namespace `BorrowedTorch.Capabilities`, compared by its width and height. <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#resolutions">`Display.Resolutions`</a> and <a class="ref prop" href="/docs/capabilities-glossary/displays/display-mode/#resolution">`DisplayMode.Resolution`</a> give them. The [resolutions and modes page](/docs/capabilities-modes/#resolutions-and-refresh-rates) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="aspectratio"><span class="prop"><code>AspectRatio</code></span> <a class="ctx" href="/docs/capabilities-modes/#resolution-members" title="AspectRatio in context on the resolutions and modes page" aria-label="AspectRatio in context on the resolutions and modes page">→</a></h3>

`float` · Read-only. The width over the height: 1.78 for 16:9, 1.6 for 16:10. 0 for a height of 0.

<h3 id="height"><span class="prop"><code>Height</code></span> <a class="ctx" href="/docs/capabilities-modes/#resolution-members" title="Height in context on the resolutions and modes page" aria-label="Height in context on the resolutions and modes page">→</a></h3>

`int` · The height, in pixels.

<h3 id="width"><span class="prop"><code>Width</code></span> <a class="ctx" href="/docs/capabilities-modes/#resolution-members" title="Width in context on the resolutions and modes page" aria-label="Width in context on the resolutions and modes page">→</a></h3>

`int` · The width, in pixels.

## Methods

<h3 id="resolution"><span class="method"><code>Resolution(int, int)</code></span> <a class="ctx" href="/docs/capabilities-modes/#resolution-members" title="Resolution(int, int) in context on the resolutions and modes page" aria-label="Resolution(int, int) in context on the resolutions and modes page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/displays/resolution/#resolution">`Resolution(int Width, int Height)`</a> · A size.

| Parameter | Type | Description |
| --- | --- | --- |
| `Width` | `int` | The width, in pixels. |
| `Height` | `int` | The height, in pixels. |

<h3 id="tostring"><span class="method"><code>ToString()</code></span> <a class="ctx" href="/docs/capabilities-modes/#resolution-members" title="ToString() in context on the resolutions and modes page" aria-label="ToString() in context on the resolutions and modes page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/displays/resolution/#tostring">`ToString()`</a> · Returns the size as a player reads it: `1920 × 1080`.
