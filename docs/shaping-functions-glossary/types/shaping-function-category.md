---
layout: docs
title: "Glossary: ShapingFunctionCategory"
description: "The values of ShapingFunctionCategory."
---

The family a function belongs to: the groups the catalog lists the functions in.

An enum with explicit numbers, safe to save: a number never changes and is never used again for another category. The [catalog page](/docs/shaping-functions-catalog/#categories-and-their-functions) shows it in context.

## Values

<h3 id="custom"><code>Custom</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Custom in context on the catalog page" aria-label="Custom in context on the catalog page">→</a></h3>

`-1` · The category of every [custom function](/docs/shaping-functions-custom/). The catalog never lists it, and <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-catalog/#getfunctions">`ShapingFunctionCatalog.GetFunctions`</a> throws for it.

<h3 id="back"><code>Back</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Back in context on the catalog page" aria-label="Back in context on the catalog page">→</a></h3>

`0` · The curves that overshoot by 10% before settling. <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-in/">`BackEaseIn`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-in-out/">`BackEaseInOut`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-out/">`BackEaseOut`</a>.

<h3 id="bezier"><code>Bezier</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Bezier in context on the catalog page" aria-label="Bezier in context on the catalog page">→</a></h3>

`1` · Bézier curves shaped by their control points. <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-cubic/">`BezierCubic`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-quadratic/">`BezierQuadratic`</a>.

<h3 id="bounce"><code>Bounce</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Bounce in context on the catalog page" aria-label="Bounce in context on the catalog page">→</a></h3>

`2` · The curves that bounce like a dropped ball. <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-in/">`BounceEaseIn`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-in-out/">`BounceEaseInOut`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-out/">`BounceEaseOut`</a>.

<h3 id="circular"><code>Circular</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Circular in context on the catalog page" aria-label="Circular in context on the catalog page">→</a></h3>

`3` · Curves made of quarter circles. <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-double-seat/">`CircularDoubleSeat`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-double-sigmoid/">`CircularDoubleSigmoid`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-ease-in/">`CircularEaseIn`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-ease-in-out/">`CircularEaseInOut`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-ease-out/">`CircularEaseOut`</a>.

<h3 id="elastic"><code>Elastic</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Elastic in context on the catalog page" aria-label="Elastic in context on the catalog page">→</a></h3>

`4` · The curves that wobble like a spring, overshooting by up to 37%. <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-in/">`ElasticEaseIn`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-in-out/">`ElasticEaseInOut`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-out/">`ElasticEaseOut`</a>.

<h3 id="elliptical"><code>Elliptical</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Elliptical in context on the catalog page" aria-label="Elliptical in context on the catalog page">→</a></h3>

`5` · Curves made of quarter ellipses. <a class="ref" href="/docs/shaping-functions-glossary/functions/elliptical-double-seat/">`EllipticalDoubleSeat`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/elliptical-double-sigmoid/">`EllipticalDoubleSigmoid`</a>.

<h3 id="exponential"><code>Exponential</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Exponential in context on the catalog page" aria-label="Exponential in context on the catalog page">→</a></h3>

`6` · The exponential eases, the exponential seat and the logistic sigmoid. <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-double-seat/">`ExponentialDoubleSeat`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-in/">`ExponentialEaseIn`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-in-out/">`ExponentialEaseInOut`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-out/">`ExponentialEaseOut`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/logistic-sigmoid/">`LogisticSigmoid`</a>.

<h3 id="linear"><code>Linear</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Linear in context on the catalog page" aria-label="Linear in context on the catalog page">→</a></h3>

`7` · The straight line. <a class="ref" href="/docs/shaping-functions-glossary/functions/linear/">`Linear`</a>.

<h3 id="quadratic"><code>Quadratic</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Quadratic in context on the catalog page" aria-label="Quadratic in context on the catalog page">→</a></h3>

`8` · The curves of degree 2. <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in/">`QuadraticEaseIn`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in-out/">`QuadraticEaseInOut`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-out/">`QuadraticEaseOut`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-through-a-given-point/">`QuadraticThroughAGivenPoint`</a>.

<h3 id="cubic"><code>Cubic</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Cubic in context on the catalog page" aria-label="Cubic in context on the catalog page">→</a></h3>

`9` · The curves of degree 3. <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-double-seat/">`CubicDoubleSeat`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-in/">`CubicEaseIn`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-in-out/">`CubicEaseInOut`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-out/">`CubicEaseOut`</a>.

<h3 id="quartic"><code>Quartic</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Quartic in context on the catalog page" aria-label="Quartic in context on the catalog page">→</a></h3>

`10` · The curves of degree 4. <a class="ref" href="/docs/shaping-functions-glossary/functions/quartic-ease-in/">`QuarticEaseIn`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/quartic-ease-in-out/">`QuarticEaseInOut`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/quartic-ease-out/">`QuarticEaseOut`</a>.

<h3 id="quintic"><code>Quintic</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Quintic in context on the catalog page" aria-label="Quintic in context on the catalog page">→</a></h3>

`11` · The curves of degree 5. <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-in/">`QuinticEaseIn`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-in-out/">`QuinticEaseInOut`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-out/">`QuinticEaseOut`</a>.

<h3 id="hexic"><code>Hexic</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Hexic in context on the catalog page" aria-label="Hexic in context on the catalog page">→</a></h3>

`12` · The curve of degree 6: the Blinn-Wyvill cosine approximation. <a class="ref" href="/docs/shaping-functions-glossary/functions/blinn-wyvill-cosine-approximation/">`BlinnWyvillCosineApproximation`</a>.

<h3 id="norder"><code>NOrder</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="NOrder in context on the catalog page" aria-label="NOrder in context on the catalog page">→</a></h3>

`13` · Polynomial curves whose degree is set by the order N. <a class="ref" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/">`DoubleOddPolynomialSeat`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/">`DoublePolynomialSigmoid`</a>.

<h3 id="sine"><code>Sine</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Sine in context on the catalog page" aria-label="Sine in context on the catalog page">→</a></h3>

`14` · The sine eases. <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-in/">`SineEaseIn`</a>, <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-in-out/">`SineEaseInOut`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-out/">`SineEaseOut`</a>.
