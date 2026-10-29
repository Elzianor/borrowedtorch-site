---
layout: docs
legend: [prop, method]
title: "Glossary: LogisticSigmoid"
description: "The curve of LogisticSigmoid, its parameters and its constructor."
---

The logistic S-curve, scaled to run from 0 to 1: from a straight line at A = 0 to a step at 0.5 as A nears 1.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`ShapingFunctionCategory.Exponential`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [parameters page](/docs/shaping-functions-parameters/#logisticsigmoid) shows it in context, with what its parameters do.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/logistic-sigmoid.svg' | relative_url }}" width="244" height="270" alt="The curve of LogisticSigmoid for several settings of its parameters">
  <figcaption>A = 0.5, 0.75 and 0.9: the higher A, the steeper the S.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#logisticsigmoid">`ShapingFunctionId.LogisticSigmoid`</a>, number 22 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`ShapingFunctionCategory.Exponential`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Logistic Sigmoid"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `1` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 1 / (1 + e<sup>−2k(x − 0.5)</sup>) with k = 1 / (1 − A) − 1, then shifted and scaled so it is exactly 0 at x = 0 and 1 at x = 1. It is computed in double precision, which keeps it smooth for small A.

It passes (0.5, 0.5), steepest there. With the default A of 0.00001 it is Linear to within 0.000001. It stays within 0 to 1 and never goes back.

## Properties

<h3 id="a"><span class="prop"><code>A</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#logisticsigmoid" title="A in context on the parameters page" aria-label="A in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/#a">`IOneParameter`</a>. How steep the S is: the steepness is 1 / (1 − A) − 1, so 0 is a straight line and values near 1 a step at 0.5. Clamped to 0.00001 to 0.99999 when set, so the curve never divides by 0; 0.00001 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

## Methods

<h3 id="logisticsigmoid"><span class="method"><code>LogisticSigmoid()</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#logisticsigmoid" title="LogisticSigmoid() in context on the parameters page" aria-label="LogisticSigmoid() in context on the parameters page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/logistic-sigmoid/#logisticsigmoid">`LogisticSigmoid()`</a> · Creates the curve, with its parameters at their defaults. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.LogisticSigmoid`.
