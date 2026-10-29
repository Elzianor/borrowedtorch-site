---
layout: docs
legend: [prop, method]
title: "Glossary: CircularDoubleSeat"
description: "The curve of CircularDoubleSeat, its parameters and its constructor."
---

Two quarter circles that meet flat at (A, A): a rise, a pause, a rise.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`ShapingFunctionCategory.Circular`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [parameters page](/docs/shaping-functions-parameters/#circulardoubleseat) shows it in context, with what its parameters do.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/circular-double-seat.svg' | relative_url }}" width="244" height="270" alt="The curve of CircularDoubleSeat for several settings of its parameters">
  <figcaption>A = 0.25, 0.5 and 0.75. Each curve is flat at its dot, the point (A, A).</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#circulardoubleseat">`ShapingFunctionId.CircularDoubleSeat`</a>, number 8 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`ShapingFunctionCategory.Circular`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Circular Double Seat"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `1` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is √(A² − (x − A)²) up to x = A, and 1 − √((1 − A)² − (x − A)²) after it.

It starts and ends upright and is flat at (A, A). With the default A of 0.00001 it is CircularEaseIn to within 0.00001, so set A before using it. It stays within 0 to 1 and never goes back.

## Properties

<h3 id="a"><span class="prop"><code>A</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#circulardoubleseat" title="A in context on the parameters page" aria-label="A in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/#a">`IOneParameter`</a>. Where the two arcs meet: the curve is flat at the point (A, A). Clamped to 0.00001 to 0.99999 when set, so the curve never divides by 0; 0.00001 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

## Methods

<h3 id="circulardoubleseat"><span class="method"><code>CircularDoubleSeat()</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#circulardoubleseat" title="CircularDoubleSeat() in context on the parameters page" aria-label="CircularDoubleSeat() in context on the parameters page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/circular-double-seat/#circulardoubleseat">`CircularDoubleSeat()`</a> · Creates the curve, with its parameters at their defaults. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.CircularDoubleSeat`.
