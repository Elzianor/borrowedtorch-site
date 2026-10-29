---
layout: docs
legend: [prop, method]
title: "Glossary: ExponentialDoubleSeat"
description: "The curve of ExponentialDoubleSeat, its parameters and its constructor."
---

Two power curves that meet at the middle: from a straight line at A = 0 to a plateau at 0.5 as A nears 1.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`ShapingFunctionCategory.Exponential`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [parameters page](/docs/shaping-functions-parameters/#exponentialdoubleseat) shows it in context, with what its parameters do.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/exponential-double-seat.svg' | relative_url }}" width="244" height="288" alt="The curve of ExponentialDoubleSeat for several settings of its parameters">
  <figcaption>A = 0.25, 0.5, 0.75 and 0.9: the higher A, the flatter the middle.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#exponentialdoubleseat">`ShapingFunctionId.ExponentialDoubleSeat`</a>, number 18 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`ShapingFunctionCategory.Exponential`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Exponential Double Seat"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `1` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is (2x)<sup>1 − A</sup> / 2 up to x = 0.5, and 1 − (2 − 2x)<sup>1 − A</sup> / 2 after it.

It passes (0.5, 0.5) with a slope of 1 − A and starts and ends upright. With the default A of 0.00001 it is Linear to within 0.00001. It stays within 0 to 1 and never goes back.

## Properties

<h3 id="a"><span class="prop"><code>A</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#exponentialdoubleseat" title="A in context on the parameters page" aria-label="A in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/#a">`IOneParameter`</a>. How flat the middle is: the two halves are powers of 1 − A, so 0 is a straight line and values near 1 a plateau at 0.5. Clamped to 0.00001 to 0.99999 when set, so the curve never divides by 0; 0.00001 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

## Methods

<h3 id="exponentialdoubleseat"><span class="method"><code>ExponentialDoubleSeat()</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#exponentialdoubleseat" title="ExponentialDoubleSeat() in context on the parameters page" aria-label="ExponentialDoubleSeat() in context on the parameters page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/exponential-double-seat/#exponentialdoubleseat">`ExponentialDoubleSeat()`</a> · Creates the curve, with its parameters at their defaults. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.ExponentialDoubleSeat`.
