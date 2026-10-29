---
layout: docs
legend: [prop, method]
title: "Glossary: DoubleOddPolynomialSeat"
description: "The curve of DoubleOddPolynomialSeat, its parameters and its constructor."
---

Two odd powers that meet flat at (A, B): the cubic seat with a longer, flatter pause as N grows.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#norder">`ShapingFunctionCategory.NOrder`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [parameters page](/docs/shaping-functions-parameters/#doubleoddpolynomialseat) shows it in context, with what its parameters do.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/double-odd-polynomial-seat.svg' | relative_url }}" width="244" height="270" alt="The curve of DoubleOddPolynomialSeat for several settings of its parameters">
  <figcaption>A = 0.5 and B = 0.5, with N = 1, 2 and 4: the higher N, the wider the flat part.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#doubleoddpolynomialseat">`ShapingFunctionId.DoubleOddPolynomialSeat`</a>, number 39 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#norder">`ShapingFunctionCategory.NOrder`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Double Odd Polynomial Seat"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `2` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `true` |

For an input x from 0 to 1, the output is B − B(1 − x / A)<sup>2N + 1</sup> up to x = A, and B + (1 − B)((x − A) / (1 − A))<sup>2N + 1</sup> after it.

With N = 1, its default, it is CubicDoubleSeat; each higher N widens the flat part around (A, B), and a very high N turns the curve into a plateau at B. With its defaults it is CubicEaseIn to within 0.00001, so set A and B before using it. It stays within 0 to 1 and never goes back.

## Properties

<h3 id="a"><span class="prop"><code>A</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#doubleoddpolynomialseat" title="A in context on the parameters page" aria-label="A in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/#a">`IOneParameter`</a>. The x of the point where the two halves meet, flat. Clamped to 0.00001 to 0.99999 when set, so the curve never divides by 0; 0.00001 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

<h3 id="b"><span class="prop"><code>B</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#doubleoddpolynomialseat" title="B in context on the parameters page" aria-label="B in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-two-parameters/#b">`ITwoParameters`</a>. The y of that point: the curve is flat at (A, B). Clamped to 0 to 1 when set; 0 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

<h3 id="n"><span class="prop"><code>N</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#doubleoddpolynomialseat" title="N in context on the parameters page" aria-label="N in context on the parameters page">→</a></h3>

`int` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-n-order/#n">`INOrder`</a>. The order: the two halves are powers of 2N + 1, so 1 gives the cubic seat and each higher order a longer, flatter seat. Clamped to 1 to 1,073,741,823 when set, the most for which 2N + 1 fits in an <code>int</code>; 1 by default. Useful from 1 to about 20.

## Methods

<h3 id="doubleoddpolynomialseat"><span class="method"><code>DoubleOddPolynomialSeat()</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#doubleoddpolynomialseat" title="DoubleOddPolynomialSeat() in context on the parameters page" aria-label="DoubleOddPolynomialSeat() in context on the parameters page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/#doubleoddpolynomialseat">`DoubleOddPolynomialSeat()`</a> · Creates the curve, with its parameters at their defaults. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.DoubleOddPolynomialSeat`.
