---
layout: docs
legend: [prop]
title: "Glossary: IOneParameter"
description: "The property of IOneParameter."
---

Gives a function its first parameter, A.

An interface: the root of the parameter interfaces. Every function with parameters A to D has it. The [parameters page](/docs/shaping-functions-parameters/#parameter-interfaces) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>.

## Properties

<h3 id="a"><span class="prop"><code>A</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#parameter-interfaces" title="A in context on the parameters page" aria-label="A in context on the parameters page">→</a></h3>

`float` · Each function clamps it to its range when it is set: 0 to 1 for the two Béziers, and 0.00001 to 0.99999 for every other function, whose curve divides by A or by 1 − A. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had. At the bottom of its range by default.

## Functions that have it

| Function | What A is there |
| --- | --- |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-cubic/#a">`BezierCubic`</a> | The x of the first control point, the one the curve leaves (0, 0) toward. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-quadratic/#a">`BezierQuadratic`</a> | The x of the control point. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-double-seat/#a">`CircularDoubleSeat`</a> | Where the two arcs meet: the curve is flat at the point (A, A). |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-double-sigmoid/#a">`CircularDoubleSigmoid`</a> | Where the two arcs meet: the curve is upright at the point (A, A). |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/elliptical-double-seat/#a">`EllipticalDoubleSeat`</a> | The x of the point where the two arcs meet, flat. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/elliptical-double-sigmoid/#a">`EllipticalDoubleSigmoid`</a> | The x of the point where the two arcs meet, upright. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-double-seat/#a">`ExponentialDoubleSeat`</a> | How flat the middle is: the two halves are powers of 1 − A, so 0 is a straight line and values near 1 a plateau at 0.5. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/logistic-sigmoid/#a">`LogisticSigmoid`</a> | How steep the S is: the steepness is 1 / (1 − A) − 1, so 0 is a straight line and values near 1 a step at 0.5. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-through-a-given-point/#a">`QuadraticThroughAGivenPoint`</a> | The x of the point the parabola passes through. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-double-seat/#a">`CubicDoubleSeat`</a> | The x of the point where the two cubics meet, flat. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/#a">`DoubleOddPolynomialSeat`</a> | The x of the point where the two halves meet, flat. |
