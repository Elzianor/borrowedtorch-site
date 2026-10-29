---
layout: docs
legend: [prop, method]
title: "Glossary: ExponentialEaseIn"
description: "The curve of ExponentialEaseIn and its constructor."
---

Doubles every tenth of the way: almost still at first, then very fast.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`ShapingFunctionCategory.Exponential`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#sine-circular-and-exponential) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/exponential-ease-in.svg' | relative_url }}" width="244" height="252" alt="The curve of ExponentialEaseIn: doubles every tenth of the way: almost still at first, then very fast.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#exponentialeasein">`ShapingFunctionId.ExponentialEaseIn`</a>, number 19 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`ShapingFunctionCategory.Exponential`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Exponential EaseIn"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 2<sup>10x − 10</sup>, and exactly 0 at x = 0.

It is 0.03 at the middle. The formula is 0.001 at x = 0, so the curve steps from 0 to 0.001 just after the start. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="exponentialeasein"><span class="method"><code>ExponentialEaseIn()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#sine-circular-and-exponential" title="ExponentialEaseIn() in context on the curves page" aria-label="ExponentialEaseIn() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/exponential-ease-in/#exponentialeasein">`ExponentialEaseIn()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.ExponentialEaseIn`.
