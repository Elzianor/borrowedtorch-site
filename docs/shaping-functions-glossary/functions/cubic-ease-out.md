---
layout: docs
legend: [prop, method]
title: "Glossary: CubicEaseOut"
description: "The curve of CubicEaseOut and its constructor."
---

Starts at three times the speed of Linear and slows to a stop, more sharply than the quadratic.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#cubic">`ShapingFunctionCategory.Cubic`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#polynomial-curves) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/cubic-ease-out.svg' | relative_url }}" width="244" height="252" alt="The curve of CubicEaseOut: starts at three times the speed of Linear and slows to a stop, more sharply than the quadratic.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#cubiceaseout">`ShapingFunctionId.CubicEaseOut`</a>, number 31 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#cubic">`ShapingFunctionCategory.Cubic`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Cubic EaseOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `3` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 1 − (1 − x)³.

It is 0.875 at the middle. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="cubiceaseout"><span class="method"><code>CubicEaseOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#polynomial-curves" title="CubicEaseOut() in context on the curves page" aria-label="CubicEaseOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/cubic-ease-out/#cubiceaseout">`CubicEaseOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.CubicEaseOut`.
