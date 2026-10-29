---
layout: docs
legend: [prop, method]
title: "Glossary: QuadraticThroughAGivenPoint"
description: "The curve of QuadraticThroughAGivenPoint, its parameters and its constructor."
---

The parabola through (0, 0), (A, B) and (1, 1), kept within 0 to 1.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quadratic">`ShapingFunctionCategory.Quadratic`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [parameters page](/docs/shaping-functions-parameters/#quadraticthroughagivenpoint) shows it in context, with what its parameters do.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/quadratic-through-a-given-point.svg' | relative_url }}" width="244" height="288" alt="The curve of QuadraticThroughAGivenPoint for several settings of its parameters">
  <figcaption>A = 0.5, with B = 0.05, 0.2, 0.8 and 0.95. The parabolas of 0.05 and 0.95 would leave 0 to 1, and are held at 0 and at 1 instead.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#quadraticthroughagivenpoint">`ShapingFunctionId.QuadraticThroughAGivenPoint`</a>, number 27 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quadratic">`ShapingFunctionCategory.Quadratic`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Quadratic Through A Given Point"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `2` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `2` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is x − k·x(1 − x), with k = (A − B) / (A(1 − A)), clamped to 0 to 1.

Where the parabola would leave 0 to 1, the clamp holds it at 0 or 1: with A = 0.5 and B = 0.05 it stays at 0 until x = 0.44. With its defaults, A = 0.00001 and B = 0, it is QuadraticEaseIn to within 0.00001. It stays within 0 to 1 and never goes back.

## Properties

<h3 id="a"><span class="prop"><code>A</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#quadraticthroughagivenpoint" title="A in context on the parameters page" aria-label="A in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/#a">`IOneParameter`</a>. The x of the point the parabola passes through. Clamped to 0.00001 to 0.99999 when set, so the curve never divides by 0; 0.00001 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

<h3 id="b"><span class="prop"><code>B</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#quadraticthroughagivenpoint" title="B in context on the parameters page" aria-label="B in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-two-parameters/#b">`ITwoParameters`</a>. The y of that point. Clamped to 0 to 1 when set; 0 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

## Methods

<h3 id="quadraticthroughagivenpoint"><span class="method"><code>QuadraticThroughAGivenPoint()</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#quadraticthroughagivenpoint" title="QuadraticThroughAGivenPoint() in context on the parameters page" aria-label="QuadraticThroughAGivenPoint() in context on the parameters page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/quadratic-through-a-given-point/#quadraticthroughagivenpoint">`QuadraticThroughAGivenPoint()`</a> · Creates the curve, with its parameters at their defaults. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.QuadraticThroughAGivenPoint`.
