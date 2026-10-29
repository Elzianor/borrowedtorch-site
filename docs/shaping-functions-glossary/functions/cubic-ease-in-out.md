---
layout: docs
legend: [prop, method]
title: "Glossary: CubicEaseInOut"
description: "The curve of CubicEaseInOut and its constructor."
---

Cubic in and out: slow at both ends, fast in the middle.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#cubic">`ShapingFunctionCategory.Cubic`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#polynomial-curves) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/cubic-ease-in-out.svg' | relative_url }}" width="244" height="252" alt="The curve of CubicEaseInOut: cubic in and out: slow at both ends, fast in the middle.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#cubiceaseinout">`ShapingFunctionId.CubicEaseInOut`</a>, number 30 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#cubic">`ShapingFunctionCategory.Cubic`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Cubic EaseInOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `3` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 4x³ for x below 0.5, and 1 − (2 − 2x)³ / 2 from 0.5.

It crosses the middle at three times the speed of Linear. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="cubiceaseinout"><span class="method"><code>CubicEaseInOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#polynomial-curves" title="CubicEaseInOut() in context on the curves page" aria-label="CubicEaseInOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/cubic-ease-in-out/#cubiceaseinout">`CubicEaseInOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.CubicEaseInOut`.
