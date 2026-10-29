---
layout: docs
legend: [prop, method]
title: "Glossary: BlinnWyvillCosineApproximation"
description: "The curve of BlinnWyvillCosineApproximation and its constructor."
---

A polynomial of degree 6 that follows SineEaseInOut to within 0.003, without a cosine.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#hexic">`ShapingFunctionCategory.Hexic`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#sine-circular-and-exponential) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/blinn-wyvill-cosine-approximation.svg' | relative_url }}" width="244" height="252" alt="The curve of BlinnWyvillCosineApproximation: a polynomial of degree 6 that follows SineEaseInOut to within 0.003, without a cosine.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#blinnwyvillcosineapproximation">`ShapingFunctionId.BlinnWyvillCosineApproximation`</a>, number 38 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#hexic">`ShapingFunctionCategory.Hexic`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Blinn-Wyvill Cosine Approximation"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `6` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is (4/9)x⁶ − (17/9)x⁴ + (22/9)x², Blinn and Wyvill's approximation of the raised cosine.

Flat at both ends and 0.5 at the middle, like SineEaseInOut, which it never strays from by more than 0.003. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="blinnwyvillcosineapproximation"><span class="method"><code>BlinnWyvillCosineApproximation()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#sine-circular-and-exponential" title="BlinnWyvillCosineApproximation() in context on the curves page" aria-label="BlinnWyvillCosineApproximation() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/blinn-wyvill-cosine-approximation/#blinnwyvillcosineapproximation">`BlinnWyvillCosineApproximation()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.BlinnWyvillCosineApproximation`.
