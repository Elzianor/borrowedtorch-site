---
layout: docs
legend: [prop, method]
title: "Glossary: ExponentialEaseOut"
description: "The curve of ExponentialEaseOut and its constructor."
---

Halves its distance to the end every tenth of the way: very fast at first, then almost still.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`ShapingFunctionCategory.Exponential`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#sine-circular-and-exponential) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/exponential-ease-out.svg' | relative_url }}" width="244" height="252" alt="The curve of ExponentialEaseOut: halves its distance to the end every tenth of the way: very fast at first, then almost still.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#exponentialeaseout">`ShapingFunctionId.ExponentialEaseOut`</a>, number 21 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`ShapingFunctionCategory.Exponential`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Exponential EaseOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 1 − 2<sup>−10x</sup>, and exactly 1 at x = 1.

It is 0.97 at the middle. The formula is 0.999 at x = 1, so the curve steps from 0.999 to 1 just before the end. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="exponentialeaseout"><span class="method"><code>ExponentialEaseOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#sine-circular-and-exponential" title="ExponentialEaseOut() in context on the curves page" aria-label="ExponentialEaseOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/exponential-ease-out/#exponentialeaseout">`ExponentialEaseOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.ExponentialEaseOut`.
