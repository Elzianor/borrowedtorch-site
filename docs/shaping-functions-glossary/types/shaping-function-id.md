---
layout: docs
title: "Glossary: ShapingFunctionId"
description: "The values of ShapingFunctionId."
---

Names a function of the library, for <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a>.

An enum with explicit numbers, safe to save: a number never changes and is never used again for another function. The values are in the order the enum declares them, which groups them by category. The [catalog page](/docs/shaping-functions-catalog/#categories-and-their-functions) shows it in context.

## Values

<h3 id="custom"><code>Custom</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Custom in context on the catalog page" aria-label="Custom in context on the catalog page">→</a></h3>

`-1` · Shared by every [custom function](/docs/shaping-functions-custom/), so it names none: <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> throws for it.

<h3 id="backeasein"><code>BackEaseIn</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="BackEaseIn in context on the catalog page" aria-label="BackEaseIn in context on the catalog page">→</a></h3>

`0` · <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-in/">`BackEaseIn`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#back">`Back`</a>. Pulls back below the start by 10%, then speeds up to the end.

<h3 id="backeaseinout"><code>BackEaseInOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="BackEaseInOut in context on the catalog page" aria-label="BackEaseInOut in context on the catalog page">→</a></h3>

`1` · <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-in-out/">`BackEaseInOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#back">`Back`</a>. Pulls back 10% below the start, rushes through the middle and overshoots the end by 10% before settling.

<h3 id="backeaseout"><code>BackEaseOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="BackEaseOut in context on the catalog page" aria-label="BackEaseOut in context on the catalog page">→</a></h3>

`2` · <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-out/">`BackEaseOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#back">`Back`</a>. Rushes past the end by 10%, then settles back onto it.

<h3 id="beziercubic"><code>BezierCubic</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="BezierCubic in context on the catalog page" aria-label="BezierCubic in context on the catalog page">→</a></h3>

`3` · <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-cubic/">`BezierCubic`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bezier">`Bezier`</a>. A cubic Bézier from (0, 0) to (1, 1) shaped by two control points: the curve of CSS's <code>cubic-bezier()</code>.

<h3 id="bezierquadratic"><code>BezierQuadratic</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="BezierQuadratic in context on the catalog page" aria-label="BezierQuadratic in context on the catalog page">→</a></h3>

`4` · <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-quadratic/">`BezierQuadratic`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bezier">`Bezier`</a>. A quadratic Bézier from (0, 0) to (1, 1) shaped by one control point.

<h3 id="bounceeasein"><code>BounceEaseIn</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="BounceEaseIn in context on the catalog page" aria-label="BounceEaseIn in context on the catalog page">→</a></h3>

`5` · <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-in/">`BounceEaseIn`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bounce">`Bounce`</a>. Three growing hops off the start, then a fall to the end: BounceEaseOut played backwards.

<h3 id="bounceeaseinout"><code>BounceEaseInOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="BounceEaseInOut in context on the catalog page" aria-label="BounceEaseInOut in context on the catalog page">→</a></h3>

`6` · <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-in-out/">`BounceEaseInOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bounce">`Bounce`</a>. Hops off the start, crosses the middle at full speed and bounces to rest on the end.

<h3 id="bounceeaseout"><code>BounceEaseOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="BounceEaseOut in context on the catalog page" aria-label="BounceEaseOut in context on the catalog page">→</a></h3>

`7` · <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-out/">`BounceEaseOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bounce">`Bounce`</a>. Falls onto the end and bounces three times, each lower, like a dropped ball.

<h3 id="circulardoubleseat"><code>CircularDoubleSeat</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="CircularDoubleSeat in context on the catalog page" aria-label="CircularDoubleSeat in context on the catalog page">→</a></h3>

`8` · <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-double-seat/">`CircularDoubleSeat`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`Circular`</a>. Two quarter circles that meet flat at (A, A): a rise, a pause, a rise.

<h3 id="circulardoublesigmoid"><code>CircularDoubleSigmoid</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="CircularDoubleSigmoid in context on the catalog page" aria-label="CircularDoubleSigmoid in context on the catalog page">→</a></h3>

`9` · <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-double-sigmoid/">`CircularDoubleSigmoid`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`Circular`</a>. Two quarter circles that meet upright at (A, A): an S that stands vertical where they meet.

<h3 id="circulareasein"><code>CircularEaseIn</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="CircularEaseIn in context on the catalog page" aria-label="CircularEaseIn in context on the catalog page">→</a></h3>

`10` · <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-ease-in/">`CircularEaseIn`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`Circular`</a>. A quarter circle that starts flat and ends upright.

<h3 id="circulareaseinout"><code>CircularEaseInOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="CircularEaseInOut in context on the catalog page" aria-label="CircularEaseInOut in context on the catalog page">→</a></h3>

`11` · <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-ease-in-out/">`CircularEaseInOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`Circular`</a>. Two quarter circles: flat at both ends and upright at the middle.

<h3 id="circulareaseout"><code>CircularEaseOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="CircularEaseOut in context on the catalog page" aria-label="CircularEaseOut in context on the catalog page">→</a></h3>

`12` · <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-ease-out/">`CircularEaseOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`Circular`</a>. A quarter circle that starts upright and ends flat.

<h3 id="elasticeasein"><code>ElasticEaseIn</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="ElasticEaseIn in context on the catalog page" aria-label="ElasticEaseIn in context on the catalog page">→</a></h3>

`13` · <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-in/">`ElasticEaseIn`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elastic">`Elastic`</a>. Swings about the start, more each time, then snaps to the end: a spring winding up.

<h3 id="elasticeaseinout"><code>ElasticEaseInOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="ElasticEaseInOut in context on the catalog page" aria-label="ElasticEaseInOut in context on the catalog page">→</a></h3>

`14` · <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-in-out/">`ElasticEaseInOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elastic">`Elastic`</a>. Winds up about the start, snaps across the middle and wobbles to rest on the end.

<h3 id="elasticeaseout"><code>ElasticEaseOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="ElasticEaseOut in context on the catalog page" aria-label="ElasticEaseOut in context on the catalog page">→</a></h3>

`15` · <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-out/">`ElasticEaseOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elastic">`Elastic`</a>. Snaps past the end by 37% and wobbles to rest on it, like a released spring.

<h3 id="ellipticaldoubleseat"><code>EllipticalDoubleSeat</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="EllipticalDoubleSeat in context on the catalog page" aria-label="EllipticalDoubleSeat in context on the catalog page">→</a></h3>

`16` · <a class="ref" href="/docs/shaping-functions-glossary/functions/elliptical-double-seat/">`EllipticalDoubleSeat`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elliptical">`Elliptical`</a>. Two quarter ellipses that meet flat at (A, B): a seat at any height.

<h3 id="ellipticaldoublesigmoid"><code>EllipticalDoubleSigmoid</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="EllipticalDoubleSigmoid in context on the catalog page" aria-label="EllipticalDoubleSigmoid in context on the catalog page">→</a></h3>

`17` · <a class="ref" href="/docs/shaping-functions-glossary/functions/elliptical-double-sigmoid/">`EllipticalDoubleSigmoid`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elliptical">`Elliptical`</a>. Two quarter ellipses that meet upright at (A, B): an S that stands vertical at any point.

<h3 id="exponentialdoubleseat"><code>ExponentialDoubleSeat</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="ExponentialDoubleSeat in context on the catalog page" aria-label="ExponentialDoubleSeat in context on the catalog page">→</a></h3>

`18` · <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-double-seat/">`ExponentialDoubleSeat`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`Exponential`</a>. Two power curves that meet at the middle: from a straight line at A = 0 to a plateau at 0.5 as A nears 1.

<h3 id="exponentialeasein"><code>ExponentialEaseIn</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="ExponentialEaseIn in context on the catalog page" aria-label="ExponentialEaseIn in context on the catalog page">→</a></h3>

`19` · <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-in/">`ExponentialEaseIn`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`Exponential`</a>. Doubles every tenth of the way: almost still at first, then very fast.

<h3 id="exponentialeaseinout"><code>ExponentialEaseInOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="ExponentialEaseInOut in context on the catalog page" aria-label="ExponentialEaseInOut in context on the catalog page">→</a></h3>

`20` · <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-in-out/">`ExponentialEaseInOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`Exponential`</a>. Exponential in and out: almost still at both ends, very fast at the middle.

<h3 id="exponentialeaseout"><code>ExponentialEaseOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="ExponentialEaseOut in context on the catalog page" aria-label="ExponentialEaseOut in context on the catalog page">→</a></h3>

`21` · <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-out/">`ExponentialEaseOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`Exponential`</a>. Halves its distance to the end every tenth of the way: very fast at first, then almost still.

<h3 id="logisticsigmoid"><code>LogisticSigmoid</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="LogisticSigmoid in context on the catalog page" aria-label="LogisticSigmoid in context on the catalog page">→</a></h3>

`22` · <a class="ref" href="/docs/shaping-functions-glossary/functions/logistic-sigmoid/">`LogisticSigmoid`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`Exponential`</a>. The logistic S-curve, scaled to run from 0 to 1: from a straight line at A = 0 to a step at 0.5 as A nears 1.

<h3 id="linear"><code>Linear</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="Linear in context on the catalog page" aria-label="Linear in context on the catalog page">→</a></h3>

`23` · <a class="ref" href="/docs/shaping-functions-glossary/functions/linear/">`Linear`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#linear">`Linear`</a>. The straight line: the output is the input.

<h3 id="quadraticeasein"><code>QuadraticEaseIn</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="QuadraticEaseIn in context on the catalog page" aria-label="QuadraticEaseIn in context on the catalog page">→</a></h3>

`24` · <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in/">`QuadraticEaseIn`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quadratic">`Quadratic`</a>. x²: starts still and speeds up evenly.

<h3 id="quadraticeaseinout"><code>QuadraticEaseInOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="QuadraticEaseInOut in context on the catalog page" aria-label="QuadraticEaseInOut in context on the catalog page">→</a></h3>

`25` · <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in-out/">`QuadraticEaseInOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quadratic">`Quadratic`</a>. Quadratic in and out: speeds up evenly to the middle, then slows evenly to the end.

<h3 id="quadraticeaseout"><code>QuadraticEaseOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="QuadraticEaseOut in context on the catalog page" aria-label="QuadraticEaseOut in context on the catalog page">→</a></h3>

`26` · <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-out/">`QuadraticEaseOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quadratic">`Quadratic`</a>. Starts at twice the speed of Linear and slows evenly to a stop.

<h3 id="quadraticthroughagivenpoint"><code>QuadraticThroughAGivenPoint</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="QuadraticThroughAGivenPoint in context on the catalog page" aria-label="QuadraticThroughAGivenPoint in context on the catalog page">→</a></h3>

`27` · <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-through-a-given-point/">`QuadraticThroughAGivenPoint`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quadratic">`Quadratic`</a>. The parabola through (0, 0), (A, B) and (1, 1), kept within 0 to 1.

<h3 id="cubicdoubleseat"><code>CubicDoubleSeat</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="CubicDoubleSeat in context on the catalog page" aria-label="CubicDoubleSeat in context on the catalog page">→</a></h3>

`28` · <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-double-seat/">`CubicDoubleSeat`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#cubic">`Cubic`</a>. Two cubics that meet flat at (A, B): a rise, a pause, a rise.

<h3 id="cubiceasein"><code>CubicEaseIn</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="CubicEaseIn in context on the catalog page" aria-label="CubicEaseIn in context on the catalog page">→</a></h3>

`29` · <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-in/">`CubicEaseIn`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#cubic">`Cubic`</a>. x³: starts still and speeds up, more sharply than the quadratic.

<h3 id="cubiceaseinout"><code>CubicEaseInOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="CubicEaseInOut in context on the catalog page" aria-label="CubicEaseInOut in context on the catalog page">→</a></h3>

`30` · <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-in-out/">`CubicEaseInOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#cubic">`Cubic`</a>. Cubic in and out: slow at both ends, fast in the middle.

<h3 id="cubiceaseout"><code>CubicEaseOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="CubicEaseOut in context on the catalog page" aria-label="CubicEaseOut in context on the catalog page">→</a></h3>

`31` · <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-out/">`CubicEaseOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#cubic">`Cubic`</a>. Starts at three times the speed of Linear and slows to a stop, more sharply than the quadratic.

<h3 id="quarticeasein"><code>QuarticEaseIn</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="QuarticEaseIn in context on the catalog page" aria-label="QuarticEaseIn in context on the catalog page">→</a></h3>

`32` · <a class="ref" href="/docs/shaping-functions-glossary/functions/quartic-ease-in/">`QuarticEaseIn`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quartic">`Quartic`</a>. x⁴: a long, slow start and a fast finish.

<h3 id="quarticeaseinout"><code>QuarticEaseInOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="QuarticEaseInOut in context on the catalog page" aria-label="QuarticEaseInOut in context on the catalog page">→</a></h3>

`33` · <a class="ref" href="/docs/shaping-functions-glossary/functions/quartic-ease-in-out/">`QuarticEaseInOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quartic">`Quartic`</a>. Quartic in and out: long, slow ends and a quick middle.

<h3 id="quarticeaseout"><code>QuarticEaseOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="QuarticEaseOut in context on the catalog page" aria-label="QuarticEaseOut in context on the catalog page">→</a></h3>

`34` · <a class="ref" href="/docs/shaping-functions-glossary/functions/quartic-ease-out/">`QuarticEaseOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quartic">`Quartic`</a>. A fast start and a long, slow stop.

<h3 id="quinticeasein"><code>QuinticEaseIn</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="QuinticEaseIn in context on the catalog page" aria-label="QuinticEaseIn in context on the catalog page">→</a></h3>

`35` · <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-in/">`QuinticEaseIn`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quintic">`Quintic`</a>. x⁵: the longest, slowest start of the polynomial eases.

<h3 id="quinticeaseinout"><code>QuinticEaseInOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="QuinticEaseInOut in context on the catalog page" aria-label="QuinticEaseInOut in context on the catalog page">→</a></h3>

`36` · <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-in-out/">`QuinticEaseInOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quintic">`Quintic`</a>. Quintic in and out: the longest, slowest ends of the polynomial in-outs.

<h3 id="quinticeaseout"><code>QuinticEaseOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="QuinticEaseOut in context on the catalog page" aria-label="QuinticEaseOut in context on the catalog page">→</a></h3>

`37` · <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-out/">`QuinticEaseOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quintic">`Quintic`</a>. The fastest start and the longest, slowest stop of the polynomial eases.

<h3 id="blinnwyvillcosineapproximation"><code>BlinnWyvillCosineApproximation</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="BlinnWyvillCosineApproximation in context on the catalog page" aria-label="BlinnWyvillCosineApproximation in context on the catalog page">→</a></h3>

`38` · <a class="ref" href="/docs/shaping-functions-glossary/functions/blinn-wyvill-cosine-approximation/">`BlinnWyvillCosineApproximation`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#hexic">`Hexic`</a>. A polynomial of degree 6 that follows SineEaseInOut to within 0.003, without a cosine.

<h3 id="doubleoddpolynomialseat"><code>DoubleOddPolynomialSeat</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="DoubleOddPolynomialSeat in context on the catalog page" aria-label="DoubleOddPolynomialSeat in context on the catalog page">→</a></h3>

`39` · <a class="ref" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/">`DoubleOddPolynomialSeat`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#norder">`NOrder`</a>. Two odd powers that meet flat at (A, B): the cubic seat with a longer, flatter pause as N grows.

<h3 id="doublepolynomialsigmoid"><code>DoublePolynomialSigmoid</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="DoublePolynomialSigmoid in context on the catalog page" aria-label="DoublePolynomialSigmoid in context on the catalog page">→</a></h3>

`40` · <a class="ref" href="/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/">`DoublePolynomialSigmoid`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#norder">`NOrder`</a>. Two powers of N that meet at the middle: the in-out of any degree.

<h3 id="sineeasein"><code>SineEaseIn</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="SineEaseIn in context on the catalog page" aria-label="SineEaseIn in context on the catalog page">→</a></h3>

`41` · <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-in/">`SineEaseIn`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#sine">`Sine`</a>. A quarter of a cosine: the gentlest ease in.

<h3 id="sineeaseinout"><code>SineEaseInOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="SineEaseInOut in context on the catalog page" aria-label="SineEaseInOut in context on the catalog page">→</a></h3>

`42` · <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-in-out/">`SineEaseInOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#sine">`Sine`</a>. Half a cosine wave: the gentlest ease in-out.

<h3 id="sineeaseout"><code>SineEaseOut</code> <a class="ctx" href="/docs/shaping-functions-catalog/#categories-and-their-functions" title="SineEaseOut in context on the catalog page" aria-label="SineEaseOut in context on the catalog page">→</a></h3>

`43` · <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-out/">`SineEaseOut`</a>, in <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#sine">`Sine`</a>. A quarter of a sine: the gentlest ease out.
