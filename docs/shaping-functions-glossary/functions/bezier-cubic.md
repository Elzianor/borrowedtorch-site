---
layout: docs
legend: [prop, method]
title: "Glossary: BezierCubic"
description: "The curve of BezierCubic, its parameters and its constructor."
---

A cubic Bézier from (0, 0) to (1, 1) shaped by two control points: the curve of CSS's <code>cubic-bezier()</code>.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bezier">`ShapingFunctionCategory.Bezier`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [parameters page](/docs/shaping-functions-parameters/#beziercubic) shows it in context, with what its parameters do.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/bezier-cubic.svg' | relative_url }}" width="244" height="270" alt="The curve of BezierCubic for several settings of its parameters">
  <figcaption>CSS's <code>ease</code>, (0.25, 0.1, 0.25, 1), and <code>ease-in-out</code>, (0.42, 0, 0.58, 1), with their control points.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#beziercubic">`ShapingFunctionId.BezierCubic`</a>, number 3 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bezier">`ShapingFunctionCategory.Bezier`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Bezier Cubic"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `3` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `4` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is the y of the point of the cubic Bézier from (0, 0) to (1, 1), with control points (A, B) and (C, D), whose x is x. The curve is found at x with Newton steps kept safe by bisection.

With all four parameters at 0, their default, it is a straight line. A, B, C and D are the four numbers of CSS's <code>cubic-bezier()</code>: (0.25, 0.1, 0.25, 1) is CSS's <code>ease</code>. It stays within 0 to 1 and never goes back.

## Properties

<h3 id="a"><span class="prop"><code>A</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#beziercubic" title="A in context on the parameters page" aria-label="A in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/#a">`IOneParameter`</a>. The x of the first control point, the one the curve leaves (0, 0) toward. Clamped to 0 to 1 when set; 0 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

<h3 id="b"><span class="prop"><code>B</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#beziercubic" title="B in context on the parameters page" aria-label="B in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-two-parameters/#b">`ITwoParameters`</a>. The y of the first control point. Clamped to 0 to 1 when set; 0 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

<h3 id="c"><span class="prop"><code>C</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#beziercubic" title="C in context on the parameters page" aria-label="C in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-three-parameters/#c">`IThreeParameters`</a>. The x of the second control point, the one the curve comes into (1, 1) from. Clamped to 0 to 1 when set; 0 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

<h3 id="d"><span class="prop"><code>D</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#beziercubic" title="D in context on the parameters page" aria-label="D in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-four-parameters/#d">`IFourParameters`</a>. The y of the second control point. Clamped to 0 to 1 when set; 0 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

## Methods

<h3 id="beziercubic"><span class="method"><code>BezierCubic()</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#beziercubic" title="BezierCubic() in context on the parameters page" aria-label="BezierCubic() in context on the parameters page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/bezier-cubic/#beziercubic">`BezierCubic()`</a> · Creates the curve, with its parameters at their defaults. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.BezierCubic`.
