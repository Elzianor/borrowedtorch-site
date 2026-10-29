---
layout: docs
legend: [prop, method]
title: "Glossary: BezierQuadratic"
description: "The curve of BezierQuadratic, its parameters and its constructor."
---

A quadratic Bézier from (0, 0) to (1, 1) shaped by one control point.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bezier">`ShapingFunctionCategory.Bezier`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [parameters page](/docs/shaping-functions-parameters/#bezierquadratic) shows it in context, with what its parameters do.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/bezier-quadratic.svg' | relative_url }}" width="244" height="270" alt="The curve of BezierQuadratic for several settings of its parameters">
  <figcaption>The control points (0.2, 0.8) and (0.8, 0.2). The curve leaves (0, 0) toward its control point and comes into (1, 1) from it.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#bezierquadratic">`ShapingFunctionId.BezierQuadratic`</a>, number 4 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bezier">`ShapingFunctionCategory.Bezier`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Bezier Quadratic"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `2` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `2` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is the y of the point of the quadratic Bézier from (0, 0) to (1, 1), with control point (A, B), whose x is x: t from x = (1 − 2A)t² + 2At, then y = (1 − 2B)t² + 2Bt. The first step is solved in closed form, without cancellation.

With A and B at 0, their default, it is a straight line. The curve leaves (0, 0) toward the control point and comes into (1, 1) from it. It stays within 0 to 1 and never goes back.

## Properties

<h3 id="a"><span class="prop"><code>A</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#bezierquadratic" title="A in context on the parameters page" aria-label="A in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/#a">`IOneParameter`</a>. The x of the control point. Clamped to 0 to 1 when set; 0 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

<h3 id="b"><span class="prop"><code>B</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#bezierquadratic" title="B in context on the parameters page" aria-label="B in context on the parameters page">→</a></h3>

`float` · From <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-two-parameters/#b">`ITwoParameters`</a>. The y of the control point. Clamped to 0 to 1 when set; 0 by default. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had.

## Methods

<h3 id="bezierquadratic"><span class="method"><code>BezierQuadratic()</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#bezierquadratic" title="BezierQuadratic() in context on the parameters page" aria-label="BezierQuadratic() in context on the parameters page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/bezier-quadratic/#bezierquadratic">`BezierQuadratic()`</a> · Creates the curve, with its parameters at their defaults. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.BezierQuadratic`.
