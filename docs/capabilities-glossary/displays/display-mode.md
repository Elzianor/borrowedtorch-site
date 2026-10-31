---
layout: docs
legend: [prop, method]
title: "Glossary: DisplayMode"
description: "The members of DisplayMode, in alphabetical order."
---

A mode a display can be set to: its size in pixels, its refresh rate in whole hertz and its color depth.

A readonly record struct, in the namespace `BorrowedTorch.Capabilities`, compared by its four values. <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#modes">`Display.Modes`</a> and <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#currentmode">`Display.CurrentMode`</a> give them. The [resolutions and modes page](/docs/capabilities-modes/) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="bitsperpixel"><span class="prop"><code>BitsPerPixel</code></span> <a class="ctx" href="/docs/capabilities-modes/#displaymode-members" title="BitsPerPixel in context on the resolutions and modes page" aria-label="BitsPerPixel in context on the resolutions and modes page">→</a></h3>

`int` · The color depth, in bits a pixel: 32 for nearly every mode Windows lists today.

<h3 id="height"><span class="prop"><code>Height</code></span> <a class="ctx" href="/docs/capabilities-modes/#displaymode-members" title="Height in context on the resolutions and modes page" aria-label="Height in context on the resolutions and modes page">→</a></h3>

`int` · The mode's height, in pixels.

<h3 id="refreshrate"><span class="prop"><code>RefreshRate</code></span> <a class="ctx" href="/docs/capabilities-modes/#displaymode-members" title="RefreshRate in context on the resolutions and modes page" aria-label="RefreshRate in context on the resolutions and modes page">→</a></h3>

`int` · How many times a second the display is drawn, in whole hertz, as Windows lists modes: 59 for a 59.94 Hz mode.

<h3 id="resolution"><span class="prop"><code>Resolution</code></span> <a class="ctx" href="/docs/capabilities-modes/#displaymode-members" title="Resolution in context on the resolutions and modes page" aria-label="Resolution in context on the resolutions and modes page">→</a></h3>

<a class="ref" href="/docs/capabilities-glossary/displays/resolution/">`Resolution`</a> · Read-only. The mode's size.

<h3 id="width"><span class="prop"><code>Width</code></span> <a class="ctx" href="/docs/capabilities-modes/#displaymode-members" title="Width in context on the resolutions and modes page" aria-label="Width in context on the resolutions and modes page">→</a></h3>

`int` · The mode's width, in pixels.

## Methods

<h3 id="displaymode"><span class="method"><code>DisplayMode(int, int, int, int)</code></span> <a class="ctx" href="/docs/capabilities-modes/#displaymode-members" title="DisplayMode(int, int, int, int) in context on the resolutions and modes page" aria-label="DisplayMode(int, int, int, int) in context on the resolutions and modes page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/displays/display-mode/#displaymode">`DisplayMode(int Width, int Height, int RefreshRate, int BitsPerPixel)`</a> · A mode of the given size, refresh rate and color depth.

| Parameter | Type | Description |
| --- | --- | --- |
| `Width` | `int` | The width, in pixels. |
| `Height` | `int` | The height, in pixels. |
| `RefreshRate` | `int` | The refresh rate, in whole hertz. |
| `BitsPerPixel` | `int` | The color depth, in bits a pixel. |

<h3 id="tostring"><span class="method"><code>ToString()</code></span> <a class="ctx" href="/docs/capabilities-modes/#displaymode-members" title="ToString() in context on the resolutions and modes page" aria-label="ToString() in context on the resolutions and modes page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/displays/display-mode/#tostring">`ToString()`</a> · Returns the mode as a player reads it: `2560 × 1600, 165 Hz, 32 bits`.
