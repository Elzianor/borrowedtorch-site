---
layout: docs
legend: [prop, method]
title: "Glossary: CircularEaseOut"
description: "The curve of CircularEaseOut and its constructor."
---

A quarter circle that starts upright and ends flat.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`ShapingFunctionCategory.Circular`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#sine-circular-and-exponential) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/circular-ease-out.svg' | relative_url }}" width="244" height="252" alt="The curve of CircularEaseOut: a quarter circle that starts upright and ends flat.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#circulareaseout">`ShapingFunctionId.CircularEaseOut`</a>, number 12 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`ShapingFunctionCategory.Circular`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Circular EaseOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is √(1 − (1 − x)²).

It leaves straight up, is 0.87 at the middle and comes to rest flat. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="circulareaseout"><span class="method"><code>CircularEaseOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#sine-circular-and-exponential" title="CircularEaseOut() in context on the curves page" aria-label="CircularEaseOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/circular-ease-out/#circulareaseout">`CircularEaseOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.CircularEaseOut`.
