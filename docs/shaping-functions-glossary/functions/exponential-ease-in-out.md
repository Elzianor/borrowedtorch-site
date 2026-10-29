---
layout: docs
legend: [prop, method]
title: "Glossary: ExponentialEaseInOut"
description: "The curve of ExponentialEaseInOut and its constructor."
---

Exponential in and out: almost still at both ends, very fast at the middle.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`ShapingFunctionCategory.Exponential`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#sine-circular-and-exponential) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/exponential-ease-in-out.svg' | relative_url }}" width="244" height="252" alt="The curve of ExponentialEaseInOut: exponential in and out: almost still at both ends, very fast at the middle.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#exponentialeaseinout">`ShapingFunctionId.ExponentialEaseInOut`</a>, number 20 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`ShapingFunctionCategory.Exponential`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Exponential EaseInOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 2<sup>20x − 10</sup> / 2 for x below 0.5, and (2 − 2<sup>10 − 20x</sup>) / 2 from 0.5, and exactly 0 and 1 at the ends.

It steps by 0.0005 just after the start and just before the end, where the formula misses 0 and 1. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="exponentialeaseinout"><span class="method"><code>ExponentialEaseInOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#sine-circular-and-exponential" title="ExponentialEaseInOut() in context on the curves page" aria-label="ExponentialEaseInOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/exponential-ease-in-out/#exponentialeaseinout">`ExponentialEaseInOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.ExponentialEaseInOut`.
