---
layout: docs
legend: [prop, method]
title: "Glossary: EllipticalDoubleSigmoid"
description: "The curve of EllipticalDoubleSigmoid, its parameters and its constructor."
---

Two quarter ellipses that meet upright at (A, B): an S that stands vertical at any point.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elliptical">`ShapingFunctionCategory.Elliptical`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [parameters page](/docs/shaping-functions-parameters/#ellipticaldoublesigmoid) shows it in context, with what its parameters do.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/elliptical-double-sigmoid.svg' | relative_url }}" width="244" height="288" alt="The curve of EllipticalDoubleSigmoid for several settings of its parameters">
  <figcaption>(A, B) = (0.3, 0.7), (0.5, 0.5) and (0.7, 0.3). Each curve stands upright at its dot.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#ellipticaldoublesigmoid">`ShapingFunctionId.EllipticalDoubleSigmoid`</a>, number 17 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elliptical">`ShapingFunctionCategory.Elliptical`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Elliptical Double Sigmoid"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `2` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is B(1 − √(A² − x²) / A) up to x = A, and B + (1 − B)·√((1 − A)² − (x − 1)²) / (1 − A) after it.

It starts and ends flat and is upright at (A, B). With B equal to A it is CircularDoubleSigmoid. With its defaults, A = 0.00001 and B = 0, it is CircularEaseOut to within 0.0003, so set A and B before using it. It stays within 0 to 1 and never goes back.

## Properties

<h3 id="a"><span class="prop"><code>A</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#ellipticaldoublesigmoid" title="A in context on the parameters page" aria-label="A in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/#a">`IOneParameter`</a>. The x of the point where the two arcs meet, upright. Clamped to 0.00001 to 0.99999 when set, so the curve never divides by 0; 0.00001 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

<h3 id="b"><span class="prop"><code>B</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#ellipticaldoublesigmoid" title="B in context on the parameters page" aria-label="B in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-two-parameters/#b">`ITwoParameters`</a>. The y of that point: the curve is upright at (A, B). Clamped to 0 to 1 when set; 0 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

## Methods

<h3 id="ellipticaldoublesigmoid"><span class="method"><code>EllipticalDoubleSigmoid()</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#ellipticaldoublesigmoid" title="EllipticalDoubleSigmoid() in context on the parameters page" aria-label="EllipticalDoubleSigmoid() in context on the parameters page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/elliptical-double-sigmoid/#ellipticaldoublesigmoid">`EllipticalDoubleSigmoid()`</a> · Creates the curve, with its parameters at their defaults. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.EllipticalDoubleSigmoid`.
