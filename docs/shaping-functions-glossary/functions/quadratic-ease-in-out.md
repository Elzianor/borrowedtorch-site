---
layout: docs
legend: [prop, method]
title: "Glossary: QuadraticEaseInOut"
description: "The curve of QuadraticEaseInOut and its constructor."
---

Quadratic in and out: speeds up evenly to the middle, then slows evenly to the end.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quadratic">`ShapingFunctionCategory.Quadratic`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#polynomial-curves) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/quadratic-ease-in-out.svg' | relative_url }}" width="244" height="252" alt="The curve of QuadraticEaseInOut: quadratic in and out: speeds up evenly to the middle, then slows evenly to the end.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#quadraticeaseinout">`ShapingFunctionId.QuadraticEaseInOut`</a>, number 25 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quadratic">`ShapingFunctionCategory.Quadratic`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Quadratic EaseInOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `2` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 2x² for x below 0.5, and 1 − (2 − 2x)² / 2 from 0.5.

It crosses the middle at twice the speed of Linear, the gentlest of the polynomial in-outs. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="quadraticeaseinout"><span class="method"><code>QuadraticEaseInOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#polynomial-curves" title="QuadraticEaseInOut() in context on the curves page" aria-label="QuadraticEaseInOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in-out/#quadraticeaseinout">`QuadraticEaseInOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.QuadraticEaseInOut`.
