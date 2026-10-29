---
layout: docs
legend: [prop]
title: "Glossary: ITwoParameters"
description: "The property of ITwoParameters."
---

Adds the second parameter, B, to A.

An interface. It extends <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/">`IOneParameter`</a>, so a function that has it has A too. The [parameters page](/docs/shaping-functions-parameters/#parameter-interfaces) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>.

## Properties

<h3 id="b"><span class="prop"><code>B</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#parameter-interfaces" title="B in context on the parameters page" aria-label="B in context on the parameters page">→</a></h3>

`float` · Each function clamps it to its range when it is set: 0 to 1 for every function that has it. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had. At the bottom of its range by default.

## Functions that have it

| Function | What B is there |
| --- | --- |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-cubic/#b">`BezierCubic`</a> | The y of the first control point. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-quadratic/#b">`BezierQuadratic`</a> | The y of the control point. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/elliptical-double-seat/#b">`EllipticalDoubleSeat`</a> | The y of that point: the curve is flat at (A, B). |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/elliptical-double-sigmoid/#b">`EllipticalDoubleSigmoid`</a> | The y of that point: the curve is upright at (A, B). |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-through-a-given-point/#b">`QuadraticThroughAGivenPoint`</a> | The y of that point. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-double-seat/#b">`CubicDoubleSeat`</a> | The y of that point: the curve is flat at (A, B). |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/#b">`DoubleOddPolynomialSeat`</a> | The y of that point: the curve is flat at (A, B). |
