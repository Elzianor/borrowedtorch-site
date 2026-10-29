---
layout: docs
legend: [prop, method]
title: "Glossary: Linear"
description: "The curve of Linear and its constructor."
---

The straight line: the output is the input.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#linear">`ShapingFunctionCategory.Linear`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#polynomial-curves) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/linear.svg' | relative_url }}" width="244" height="252" alt="The curve of Linear: the straight line: the output is the input.">
  <figcaption>Input across, output up.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#linear">`ShapingFunctionId.Linear`</a>, number 23 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#linear">`ShapingFunctionCategory.Linear`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Linear"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `1` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is x.

Constant speed from start to end: what every other curve is drawn against. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="linear"><span class="method"><code>Linear()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#polynomial-curves" title="Linear() in context on the curves page" aria-label="Linear() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/linear/#linear">`Linear()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.Linear`.
