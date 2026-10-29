---
layout: docs
legend: [prop, method]
title: "Glossary: DoublePolynomialSigmoid"
description: "The curve of DoublePolynomialSigmoid, its parameters and its constructor."
---

Two powers of N that meet at the middle: the in-out of any degree.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#norder">`ShapingFunctionCategory.NOrder`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [parameters page](/docs/shaping-functions-parameters/#doublepolynomialsigmoid) shows it in context, with what its parameters do.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/double-polynomial-sigmoid.svg' | relative_url }}" width="244" height="288" alt="The curve of DoublePolynomialSigmoid for several settings of its parameters">
  <figcaption>N = 1, 2, 4 and 6: N = 1 is the straight line, and higher N sharpens the S.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#doublepolynomialsigmoid">`ShapingFunctionId.DoublePolynomialSigmoid`</a>, number 40 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#norder">`ShapingFunctionCategory.NOrder`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Double Polynomial Sigmoid"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `true` |

For an input x from 0 to 1, the output is (2x)<sup>N</sup> / 2 up to x = 0.5, and 1 − (2 − 2x)<sup>N</sup> / 2 after it.

N = 1, its default, is Linear, and N = 2 to 5 are QuadraticEaseInOut to QuinticEaseInOut. Higher N sharpens it toward a step at 0.5. It stays within 0 to 1 and never goes back.

## Properties

<h3 id="n"><span class="prop"><code>N</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#doublepolynomialsigmoid" title="N in context on the parameters page" aria-label="N in context on the parameters page">→</a></h3>

`int` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-n-order/#n">`INOrder`</a>. The order: the two halves are powers of N. 1 gives Linear, and 2 to 5 the quadratic to quintic in-outs. Clamped to at least 1 when set; 1 by default. Useful from 1 to about 10.

## Methods

<h3 id="doublepolynomialsigmoid"><span class="method"><code>DoublePolynomialSigmoid()</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#doublepolynomialsigmoid" title="DoublePolynomialSigmoid() in context on the parameters page" aria-label="DoublePolynomialSigmoid() in context on the parameters page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/#doublepolynomialsigmoid">`DoublePolynomialSigmoid()`</a> · Creates the curve, with its parameters at their defaults. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.DoublePolynomialSigmoid`.
