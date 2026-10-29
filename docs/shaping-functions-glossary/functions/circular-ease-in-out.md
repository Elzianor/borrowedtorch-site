---
layout: docs
legend: [prop, method]
title: "Glossary: CircularEaseInOut"
description: "The curve of CircularEaseInOut and its constructor."
---

Two quarter circles: flat at both ends and upright at the middle.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`ShapingFunctionCategory.Circular`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#sine-circular-and-exponential) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/circular-ease-in-out.svg' | relative_url }}" width="244" height="252" alt="The curve of CircularEaseInOut: two quarter circles: flat at both ends and upright at the middle.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#circulareaseinout">`ShapingFunctionId.CircularEaseInOut`</a>, number 11 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`ShapingFunctionCategory.Circular`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Circular EaseInOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is (1 − √(1 − (2x)²)) / 2 for x below 0.5, and (1 + √(1 − (2 − 2x)²)) / 2 from 0.5.

It passes the middle straight up, at (0.5, 0.5). It stays within 0 to 1 and never goes back.

## Methods

<h3 id="circulareaseinout"><span class="method"><code>CircularEaseInOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#sine-circular-and-exponential" title="CircularEaseInOut() in context on the curves page" aria-label="CircularEaseInOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/circular-ease-in-out/#circulareaseinout">`CircularEaseInOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.CircularEaseInOut`.
