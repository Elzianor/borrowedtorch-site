---
layout: docs
legend: [prop, method]
title: "Glossary: SineEaseOut"
description: "The curve of SineEaseOut and its constructor."
---

A quarter of a sine: the gentlest ease out.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#sine">`ShapingFunctionCategory.Sine`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#sine-circular-and-exponential) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/sine-ease-out.svg' | relative_url }}" width="244" height="252" alt="The curve of SineEaseOut: a quarter of a sine: the gentlest ease out.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#sineeaseout">`ShapingFunctionId.SineEaseOut`</a>, number 43 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#sine">`ShapingFunctionCategory.Sine`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Sine EaseOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is sin(πx / 2).

It leaves at 1.57 times the speed of Linear and is 0.71 at the middle. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="sineeaseout"><span class="method"><code>SineEaseOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#sine-circular-and-exponential" title="SineEaseOut() in context on the curves page" aria-label="SineEaseOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/sine-ease-out/#sineeaseout">`SineEaseOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.SineEaseOut`.
