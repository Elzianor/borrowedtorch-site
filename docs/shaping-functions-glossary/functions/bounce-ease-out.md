---
layout: docs
legend: [prop, method]
title: "Glossary: BounceEaseOut"
description: "The curve of BounceEaseOut and its constructor."
---

Falls onto the end and bounces three times, each lower, like a dropped ball.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bounce">`ShapingFunctionCategory.Bounce`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#bounce) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/bounce-ease-out.svg' | relative_url }}" width="244" height="252" alt="The curve of BounceEaseOut: falls onto the end and bounces three times, each lower, like a dropped ball.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#bounceeaseout">`ShapingFunctionId.BounceEaseOut`</a>, number 7 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bounce">`ShapingFunctionCategory.Bounce`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Bounce EaseOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `2` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is four parabolas of the form 7.5625(x − c)² + h: the fall, 7.5625x², up to x = 1/2.75, then bounces that peak at h = 0.75, 0.9375 and 0.984375, with the joins at x = 1/2.75, 2/2.75 and 2.5/2.75.

It reaches 1 at x = 0.36, falls back to 0.75, 0.9375 and 0.984, touching 1 again at x = 0.73 and 0.91, and lands at x = 1. It stays within 0 to 1 but goes back between the bounces.

## Methods

<h3 id="bounceeaseout"><span class="method"><code>BounceEaseOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#bounce" title="BounceEaseOut() in context on the curves page" aria-label="BounceEaseOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/bounce-ease-out/#bounceeaseout">`BounceEaseOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.BounceEaseOut`.
