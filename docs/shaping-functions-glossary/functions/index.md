---
layout: docs
title: "Shaping functions glossary: functions"
description: "The 44 curves of the library by category, one page each with a picture and the formula."
---

Each function has a page with a picture of its curve, its formula, the values of its properties and its constructor, and its parameters if it has any. The sidebar lists them by category, in the order of the <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-catalog/">`ShapingFunctionCatalog`</a>.

## Back

The curves that overshoot by 10% before settling.

| Function | What it is |
| --- | --- |
| [`BackEaseIn`](/docs/shaping-functions-glossary/functions/back-ease-in/) | Pulls back below the start by 10%, then speeds up to the end. |
| [`BackEaseInOut`](/docs/shaping-functions-glossary/functions/back-ease-in-out/) | Pulls back 10% below the start, rushes through the middle and overshoots the end by 10% before settling. |
| [`BackEaseOut`](/docs/shaping-functions-glossary/functions/back-ease-out/) | Rushes past the end by 10%, then settles back onto it. |

## Bezier

Bézier curves shaped by their control points.

| Function | What it is |
| --- | --- |
| [`BezierCubic`](/docs/shaping-functions-glossary/functions/bezier-cubic/) | A cubic Bézier from (0, 0) to (1, 1) shaped by two control points: the curve of CSS's <code>cubic-bezier()</code>. |
| [`BezierQuadratic`](/docs/shaping-functions-glossary/functions/bezier-quadratic/) | A quadratic Bézier from (0, 0) to (1, 1) shaped by one control point. |

## Bounce

The curves that bounce like a dropped ball.

| Function | What it is |
| --- | --- |
| [`BounceEaseIn`](/docs/shaping-functions-glossary/functions/bounce-ease-in/) | Three growing hops off the start, then a fall to the end: BounceEaseOut played backwards. |
| [`BounceEaseInOut`](/docs/shaping-functions-glossary/functions/bounce-ease-in-out/) | Hops off the start, crosses the middle at full speed and bounces to rest on the end. |
| [`BounceEaseOut`](/docs/shaping-functions-glossary/functions/bounce-ease-out/) | Falls onto the end and bounces three times, each lower, like a dropped ball. |

## Circular

Curves made of quarter circles.

| Function | What it is |
| --- | --- |
| [`CircularDoubleSeat`](/docs/shaping-functions-glossary/functions/circular-double-seat/) | Two quarter circles that meet flat at (A, A): a rise, a pause, a rise. |
| [`CircularDoubleSigmoid`](/docs/shaping-functions-glossary/functions/circular-double-sigmoid/) | Two quarter circles that meet upright at (A, A): an S that stands vertical where they meet. |
| [`CircularEaseIn`](/docs/shaping-functions-glossary/functions/circular-ease-in/) | A quarter circle that starts flat and ends upright. |
| [`CircularEaseInOut`](/docs/shaping-functions-glossary/functions/circular-ease-in-out/) | Two quarter circles: flat at both ends and upright at the middle. |
| [`CircularEaseOut`](/docs/shaping-functions-glossary/functions/circular-ease-out/) | A quarter circle that starts upright and ends flat. |

## Elastic

The curves that wobble like a spring, overshooting by up to 37%.

| Function | What it is |
| --- | --- |
| [`ElasticEaseIn`](/docs/shaping-functions-glossary/functions/elastic-ease-in/) | Swings about the start, more each time, then snaps to the end: a spring winding up. |
| [`ElasticEaseInOut`](/docs/shaping-functions-glossary/functions/elastic-ease-in-out/) | Winds up about the start, snaps across the middle and wobbles to rest on the end. |
| [`ElasticEaseOut`](/docs/shaping-functions-glossary/functions/elastic-ease-out/) | Snaps past the end by 37% and wobbles to rest on it, like a released spring. |

## Elliptical

Curves made of quarter ellipses.

| Function | What it is |
| --- | --- |
| [`EllipticalDoubleSeat`](/docs/shaping-functions-glossary/functions/elliptical-double-seat/) | Two quarter ellipses that meet flat at (A, B): a seat at any height. |
| [`EllipticalDoubleSigmoid`](/docs/shaping-functions-glossary/functions/elliptical-double-sigmoid/) | Two quarter ellipses that meet upright at (A, B): an S that stands vertical at any point. |

## Exponential

The exponential eases, the exponential seat and the logistic sigmoid.

| Function | What it is |
| --- | --- |
| [`ExponentialDoubleSeat`](/docs/shaping-functions-glossary/functions/exponential-double-seat/) | Two power curves that meet at the middle: from a straight line at A = 0 to a plateau at 0.5 as A nears 1. |
| [`ExponentialEaseIn`](/docs/shaping-functions-glossary/functions/exponential-ease-in/) | Doubles every tenth of the way: almost still at first, then very fast. |
| [`ExponentialEaseInOut`](/docs/shaping-functions-glossary/functions/exponential-ease-in-out/) | Exponential in and out: almost still at both ends, very fast at the middle. |
| [`ExponentialEaseOut`](/docs/shaping-functions-glossary/functions/exponential-ease-out/) | Halves its distance to the end every tenth of the way: very fast at first, then almost still. |
| [`LogisticSigmoid`](/docs/shaping-functions-glossary/functions/logistic-sigmoid/) | The logistic S-curve, scaled to run from 0 to 1: from a straight line at A = 0 to a step at 0.5 as A nears 1. |

## Linear

The straight line.

| Function | What it is |
| --- | --- |
| [`Linear`](/docs/shaping-functions-glossary/functions/linear/) | The straight line: the output is the input. |

## Quadratic

The curves of degree 2.

| Function | What it is |
| --- | --- |
| [`QuadraticEaseIn`](/docs/shaping-functions-glossary/functions/quadratic-ease-in/) | x²: starts still and speeds up evenly. |
| [`QuadraticEaseInOut`](/docs/shaping-functions-glossary/functions/quadratic-ease-in-out/) | Quadratic in and out: speeds up evenly to the middle, then slows evenly to the end. |
| [`QuadraticEaseOut`](/docs/shaping-functions-glossary/functions/quadratic-ease-out/) | Starts at twice the speed of Linear and slows evenly to a stop. |
| [`QuadraticThroughAGivenPoint`](/docs/shaping-functions-glossary/functions/quadratic-through-a-given-point/) | The parabola through (0, 0), (A, B) and (1, 1), kept within 0 to 1. |

## Cubic

The curves of degree 3.

| Function | What it is |
| --- | --- |
| [`CubicDoubleSeat`](/docs/shaping-functions-glossary/functions/cubic-double-seat/) | Two cubics that meet flat at (A, B): a rise, a pause, a rise. |
| [`CubicEaseIn`](/docs/shaping-functions-glossary/functions/cubic-ease-in/) | x³: starts still and speeds up, more sharply than the quadratic. |
| [`CubicEaseInOut`](/docs/shaping-functions-glossary/functions/cubic-ease-in-out/) | Cubic in and out: slow at both ends, fast in the middle. |
| [`CubicEaseOut`](/docs/shaping-functions-glossary/functions/cubic-ease-out/) | Starts at three times the speed of Linear and slows to a stop, more sharply than the quadratic. |

## Quartic

The curves of degree 4.

| Function | What it is |
| --- | --- |
| [`QuarticEaseIn`](/docs/shaping-functions-glossary/functions/quartic-ease-in/) | x⁴: a long, slow start and a fast finish. |
| [`QuarticEaseInOut`](/docs/shaping-functions-glossary/functions/quartic-ease-in-out/) | Quartic in and out: long, slow ends and a quick middle. |
| [`QuarticEaseOut`](/docs/shaping-functions-glossary/functions/quartic-ease-out/) | A fast start and a long, slow stop. |

## Quintic

The curves of degree 5.

| Function | What it is |
| --- | --- |
| [`QuinticEaseIn`](/docs/shaping-functions-glossary/functions/quintic-ease-in/) | x⁵: the longest, slowest start of the polynomial eases. |
| [`QuinticEaseInOut`](/docs/shaping-functions-glossary/functions/quintic-ease-in-out/) | Quintic in and out: the longest, slowest ends of the polynomial in-outs. |
| [`QuinticEaseOut`](/docs/shaping-functions-glossary/functions/quintic-ease-out/) | The fastest start and the longest, slowest stop of the polynomial eases. |

## Hexic

The curve of degree 6: the Blinn-Wyvill cosine approximation.

| Function | What it is |
| --- | --- |
| [`BlinnWyvillCosineApproximation`](/docs/shaping-functions-glossary/functions/blinn-wyvill-cosine-approximation/) | A polynomial of degree 6 that follows SineEaseInOut to within 0.003, without a cosine. |

## NOrder

Polynomial curves whose degree is set by the order N.

| Function | What it is |
| --- | --- |
| [`DoubleOddPolynomialSeat`](/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/) | Two odd powers that meet flat at (A, B): the cubic seat with a longer, flatter pause as N grows. |
| [`DoublePolynomialSigmoid`](/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/) | Two powers of N that meet at the middle: the in-out of any degree. |

## Sine

The sine eases.

| Function | What it is |
| --- | --- |
| [`SineEaseIn`](/docs/shaping-functions-glossary/functions/sine-ease-in/) | A quarter of a cosine: the gentlest ease in. |
| [`SineEaseInOut`](/docs/shaping-functions-glossary/functions/sine-ease-in-out/) | Half a cosine wave: the gentlest ease in-out. |
| [`SineEaseOut`](/docs/shaping-functions-glossary/functions/sine-ease-out/) | A quarter of a sine: the gentlest ease out. |
