---
layout: docs
title: "Glossary: SmoothAnimationFrame&lt;T&gt;"
description: "The members of SmoothAnimationFrame<T>, in alphabetical order."
---

Goes from <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#from">`From`</a> to <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#to">`To`</a> between <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#startatms">`StartAtMs`</a> and `StartAtMs + DurationMs` of the time line, and goes back the same way when the time line reverses. Before its start it sets nothing. A shaping function bends the progress: pass any `BaseShapingFunction` from the `BorrowedTorch.ShapingFunctions` package, such as `new CubicEaseOut()`, or create one with `ShapingFunctionFactory.Create(ShapingFunctionId.CubicEaseInOut)`.

A class deriving from [`BaseAnimationFrame<T>`](/docs/ui-glossary/types/base-animation-frame/). The [styles page](/docs/ui-styles/#smoothanimationframet) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="durationms"><span class="prop"><code>DurationMs</code></span> <a class="ctx" href="/docs/ui-styles/#smoothanimationframet" title="DurationMs in context on the styles page" aria-label="DurationMs in context on the styles page">→</a></h3>

`int` · Read-only. The length of the frame in milliseconds.

<h3 id="from"><span class="prop"><code>From</code></span> <a class="ctx" href="/docs/ui-styles/#smoothanimationframet" title="From in context on the styles page" aria-label="From in context on the styles page">→</a></h3>

`T` · Read-only. The value at the start of the frame.

<h3 id="shapingfunction"><span class="prop"><code>ShapingFunction</code></span> <a class="ctx" href="/docs/ui-styles/#smoothanimationframet" title="ShapingFunction in context on the styles page" aria-label="ShapingFunction in context on the styles page">→</a></h3>

`BaseShapingFunction` · Read-only. The function that maps the frame's progress (0 to 1) to the share of the way from <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#from">`From`</a> to <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#to">`To`</a>. `Linear` when none is given.

<h3 id="startatms"><span class="prop"><code>StartAtMs</code></span> <a class="ctx" href="/docs/ui-styles/#smoothanimationframet" title="StartAtMs in context on the styles page" aria-label="StartAtMs in context on the styles page">→</a></h3>

`int` · Read-only. Where the frame starts on the time line, in milliseconds.

<h3 id="to"><span class="prop"><code>To</code></span> <a class="ctx" href="/docs/ui-styles/#smoothanimationframet" title="To in context on the styles page" aria-label="To in context on the styles page">→</a></h3>

`T` · Read-only. The value at the end of the frame.

## Methods

<h3 id="smoothanimationframe"><span class="method"><code>SmoothAnimationFrame()</code></span> <a class="ctx" href="/docs/ui-styles/#smoothanimationframet" title="SmoothAnimationFrame() in context on the styles page" aria-label="SmoothAnimationFrame() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/smooth-animation-frame/#smoothanimationframe">`SmoothAnimationFrame(T from, T to, int durationMs, int startAtMs = 0, BaseShapingFunction shapingFunction = null)`</a> · Creates the frame.
