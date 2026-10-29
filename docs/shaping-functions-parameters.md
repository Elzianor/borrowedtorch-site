---
layout: docs
legend: [prop, method]
title: "Shaping functions: parameters"
description: The functions that take parameters, the interfaces that set them, their ranges and defaults, and what each parameter does to its curve.
---

Twelve of the 44 functions take parameters that change their curve. A, B, C and D are numbers from 0 to 1 that most
often place a point the curve sits at or passes through; N is a whole number, the order of a polynomial. Most of these
functions come from Golan Levin's collection of shaping functions, and two are Bézier curves. Names are colored by what
they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>.

## Setting parameters

A function created by its class has its parameters as properties:

```csharp
var seat = new CubicDoubleSeat { A = 0.4f, B = 0.6f };

float y = seat.CalculateOutput(0.4f); // 0.6: the curve is flat at (A, B)
```

<a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> returns a <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a>, so code that doesn't know the class
reaches the parameters through the interfaces that hold them:

```csharp
BaseShapingFunction fn = ShapingFunctionFactory.Create(id);

if (fn is IOneParameter one) one.A = 0.4f;
if (fn is ITwoParameters two) two.B = 0.6f;
if (fn is INOrder order) order.N = 3;
```

The interfaces of A to D are nested: <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-two-parameters/">`ITwoParameters`</a> extends <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/">`IOneParameter`</a>, <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-three-parameters/">`IThreeParameters`</a>
extends `ITwoParameters`, and <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-four-parameters/">`IFourParameters`</a> extends `IThreeParameters`, so a function that has B has A, and
one that has D has all four. <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-n-order/">`INOrder`</a> stands apart: <a class="ref" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/">`DoubleOddPolynomialSeat`</a> has it with A and B,
<a class="ref" href="/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/">`DoublePolynomialSigmoid`</a> alone.

The curve follows a change at once: the next <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> uses the new values, so parameters can
be animated too. Each instance has its own parameters, and the factory creates a new instance every call, so two users
of one ID never change each other's curve.

### Parameter interfaces

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-one-parameter/#a">`IOneParameter.A`</a> | `float` | The first parameter. Every parametric function but `DoublePolynomialSigmoid` has it. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-two-parameters/#b">`ITwoParameters.B`</a> | `float` | The second. The Béziers, the elliptical curves, the cubic and odd polynomial seats, and the parabola through a point have it. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-three-parameters/#c">`IThreeParameters.C`</a> | `float` | The third. Only `BezierCubic` has it, through `IFourParameters`. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-four-parameters/#d">`IFourParameters.D`</a> | `float` | The fourth. Only `BezierCubic` has it. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/parameters/i-n-order/#n">`INOrder.N`</a> | `int` | The order. `DoubleOddPolynomialSeat` and `DoublePolynomialSigmoid` have it. |

A function says which it has through <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a>, <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> and <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametric">`Parametric`</a>,
see the [catalog page](/docs/shaping-functions-catalog/#what-a-function-says-about-itself).

## Ranges, defaults and NaN

A parameter is clamped to its range when it is set, without an exception: set A to 2 and it reads back 1. The ranges:

- **A to D: 0 to 1.** Every A but those of the two Béziers is kept within 0.00001 to 0.99999 instead, because those
  curves divide by A or by 1 − A. The margin is <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parameterepsilon">`ParameterEpsilon`</a>.
- **N: at least 1.** `DoubleOddPolynomialSeat` also keeps N at most 1,073,741,823, so its exponent, 2N + 1, fits in an
  `int`.

`NaN` would pass through a clamp and spoil every output after it, so setting A to D to `NaN` throws
`ArgumentOutOfRangeException` and the parameter keeps the value it had.

Parameters start at the bottom of their range: A at 0.00001, or 0 for the Béziers, B to D at 0 and N at 1. At their
defaults, the parametric functions are plain curves:

| Function | At its defaults |
| --- | --- |
| `BezierCubic`, `BezierQuadratic`, `DoublePolynomialSigmoid` | Linear |
| `ExponentialDoubleSeat`, `LogisticSigmoid` | Linear, to within 0.00001 |
| `CircularDoubleSeat`, `EllipticalDoubleSeat` | `CircularEaseIn`, to within 0.00001 |
| `CircularDoubleSigmoid`, `EllipticalDoubleSigmoid` | `CircularEaseOut`, to within 0.0003 |
| `CubicDoubleSeat`, `DoubleOddPolynomialSeat` | `CubicEaseIn`, to within 0.00001 |
| `QuadraticThroughAGivenPoint` | `QuadraticEaseIn`, to within 0.00001 |

Set the parameters before using one of these functions, and show a function with its parameters in a picker.

## Seats

A seat rises, levels out at a point and rises again: a movement with a pause in the middle, or a value that lingers
near one level. The seats differ in where they level out and how they start and end.

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/seats.svg' | relative_url }}" width="406" height="494" alt="Four panels of seat curves, each rising, flattening at a point and rising again: circular seats flat on the diagonal, elliptical and cubic seats flat at three different points, and exponential seats flattening around the middle">
  <figcaption>The four seats with one parameter set changing, dim to bright. The dots are where each curve is flat.</figcaption>
</figure>

### CircularDoubleSeat

Two quarter circles that meet at (A, A), where the curve is flat. It starts and ends upright. The seat is always on
the diagonal: for a seat at another height, use the elliptical or the cubic seat.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/circular-double-seat/#a">`A`</a> | `float` | Where the two arcs meet: the curve is flat at (A, A). 0.00001 to 0.99999; 0.00001 by default. |

### EllipticalDoubleSeat

Two quarter ellipses that meet flat at (A, B), so the seat can be anywhere. It starts and ends upright, like the
circular seat, which it is when B equals A.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/elliptical-double-seat/#a">`A`</a> | `float` | The x of the seat. 0.00001 to 0.99999; 0.00001 by default. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/elliptical-double-seat/#b">`B`</a> | `float` | The y of the seat. 0 to 1; 0 by default. |

### CubicDoubleSeat

Two cubics that meet flat at (A, B). Unlike the elliptical seat, it leaves (0, 0) and comes into (1, 1) at a finite
slope, 3B / A at the start and 3(1 − B) / (1 − A) at the end, so it reads as a softer pause.
`DoubleOddPolynomialSeat` widens the pause with its order, see [the order N](#the-order-n).

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/cubic-double-seat/#a">`A`</a> | `float` | The x of the seat. 0.00001 to 0.99999; 0.00001 by default. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/cubic-double-seat/#b">`B`</a> | `float` | The y of the seat. 0 to 1; 0 by default. |

### ExponentialDoubleSeat

Two power curves, (2x)<sup>1 − A</sup> / 2 and its mirror, that meet at the middle, (0.5, 0.5), with a slope of
1 − A. A sets how flat the middle is: 0 is the straight line, and as A nears 1 the curve becomes a plateau at 0.5 with
a jump at each end. It starts and ends upright for any A above 0.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/exponential-double-seat/#a">`A`</a> | `float` | How flat the middle is. 0.00001 to 0.99999; 0.00001 by default, a straight line. |

## Sigmoids

A sigmoid is an S: slow, fast, slow, like an ease in-out whose fast point or steepness can be chosen. The circular and
elliptical sigmoids are the seats turned on their side: they are flat at the ends and stand upright where their arcs
meet.

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/sigmoids.svg' | relative_url }}" width="618" height="238" alt="Three panels of S-shaped curves: circular sigmoids standing upright on the diagonal, elliptical sigmoids standing upright at three different points, and logistic sigmoids growing steeper around the middle">
  <figcaption>The three sigmoids with one parameter set changing, dim to bright. The dots are where each curve stands upright.</figcaption>
</figure>

### CircularDoubleSigmoid

Two quarter circles that meet upright at (A, A). It starts and ends flat.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/circular-double-sigmoid/#a">`A`</a> | `float` | Where the two arcs meet: the curve is upright at (A, A). 0.00001 to 0.99999; 0.00001 by default. |

### EllipticalDoubleSigmoid

Two quarter ellipses that meet upright at (A, B). It starts and ends flat, and is the circular sigmoid when B equals A.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/elliptical-double-sigmoid/#a">`A`</a> | `float` | The x of the upright point. 0.00001 to 0.99999; 0.00001 by default. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/elliptical-double-sigmoid/#b">`B`</a> | `float` | The y of the upright point. 0 to 1; 0 by default. |

### LogisticSigmoid

The logistic function, the S of population growth and of neural networks, scaled to run exactly from 0 to 1. It always
crosses the middle, (0.5, 0.5); A sets how steeply. At A = 0.5 it crosses at 1.08 times the speed of Linear, at 0.75
at 1.66 times and at 0.9 at 4.5 times, and as A nears 1 it becomes a step at 0.5. It is computed in double precision,
which keeps it smooth when A is small.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/logistic-sigmoid/#a">`A`</a> | `float` | How steep the S is: the logistic steepness is 1 / (1 − A) − 1. 0.00001 to 0.99999; 0.00001 by default, a straight line. |

## The order N

Two functions take an order N, the power of the polynomials their two halves are made of.

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/n-order.svg' | relative_url }}" width="406" height="238" alt="Two panels: odd polynomial seats whose flat part around the middle widens as N grows, and polynomial sigmoids from the straight line to a steep S">
  <figcaption>Higher orders are brighter. Left, the seat at (0.5, 0.5) with N = 1, 2 and 4; right, the sigmoid with N = 1, 2, 4 and 6.</figcaption>
</figure>

### DoubleOddPolynomialSeat

The cubic seat with any odd power: its halves are powers of 2N + 1, so N = 1 is <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-double-seat/">`CubicDoubleSeat`</a> exactly, and
each higher order widens the flat part around (A, B). A very high N turns the curve into a plateau at B, with a jump at
each end. Orders from 1 to about 20 are the useful ones.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/#a">`A`</a> | `float` | The x of the seat. 0.00001 to 0.99999; 0.00001 by default. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/#b">`B`</a> | `float` | The y of the seat. 0 to 1; 0 by default. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/#n">`N`</a> | `int` | The order: the halves are powers of 2N + 1. 1 to 1,073,741,823; 1 by default. |

### DoublePolynomialSigmoid

The ease in-out of any power: its halves are (2x)<sup>N</sup> / 2 and its mirror. N = 1 is <a class="ref" href="/docs/shaping-functions-glossary/functions/linear/">`Linear`</a>, and N = 2 to 5
are exactly <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in-out/">`QuadraticEaseInOut`</a> to <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-in-out/">`QuinticEaseInOut`</a>. Higher orders sharpen it toward a step at
0.5, and orders from 1 to about 10 are the useful ones.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/#n">`N`</a> | `int` | The order: the halves are powers of N. At least 1; 1 by default. |

## A parabola through a point

### QuadraticThroughAGivenPoint

The parabola through (0, 0), (A, B) and (1, 1). With the point below the diagonal it bends like an ease in, above it
like an ease out. Where the parabola would leave 0 to 1 on its way, the curve is held at 0 or at 1 instead, so it never
goes back: with A = 0.5 and B = 0.05 it stays at 0 until x = 0.44.

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/through-point.svg' | relative_url }}" width="224" height="268" alt="Four parabolas through points at x = 0.5: the lowest stays at 0 for a while before rising, the highest reaches 1 early and stays there">
  <figcaption>A = 0.5, with B = 0.05, 0.2, 0.8 and 0.95, dim to bright. The dots are the points (A, B).</figcaption>
</figure>

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/quadratic-through-a-given-point/#a">`A`</a> | `float` | The x of the point. 0.00001 to 0.99999; 0.00001 by default. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/quadratic-through-a-given-point/#b">`B`</a> | `float` | The y of the point. 0 to 1; 0 by default. |

## Bezier curves

The two Béziers run from (0, 0) to (1, 1) and are shaped by control points: the curve leaves (0, 0) heading for the
first control point and comes into (1, 1) from the direction of the last. For each input x, the output is the y of the
point of the curve whose x is x. All four parameters are 0 to 1 and 0 by default, which makes both Béziers straight
lines until they are set, and so does any set of control points on the diagonal.

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/bezier.svg' | relative_url }}" width="406" height="220" alt="Two panels: two quadratic Bézier curves, each pulled toward its control point, and the CSS ease and ease-in-out curves with the lines to their control points">
  <figcaption>Left, BezierQuadratic with the control points (0.2, 0.8) and (0.8, 0.2). Right, BezierCubic as CSS's <code>ease</code> and <code>ease-in-out</code>.</figcaption>
</figure>

### BezierQuadratic

One control point, (A, B).

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/bezier-quadratic/#a">`A`</a> | `float` | The x of the control point. 0 to 1; 0 by default. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/bezier-quadratic/#b">`B`</a> | `float` | The y of the control point. 0 to 1; 0 by default. |

### BezierCubic

Two control points, (A, B) and (C, D): the curve of CSS's `cubic-bezier(x1, y1, x2, y2)` and of the curve editors of
most animation tools, with the same four numbers in the same order.

```csharp
// CSS's ease: cubic-bezier(0.25, 0.1, 0.25, 1)
var ease = new BezierCubic { A = 0.25f, B = 0.1f, C = 0.25f, D = 1.0f };
```

| CSS | A | B | C | D |
| --- | --- | --- | --- | --- |
| `ease` | 0.25 | 0.1 | 0.25 | 1 |
| `ease-in` | 0.42 | 0 | 1 | 1 |
| `ease-out` | 0 | 0 | 0.58 | 1 |
| `ease-in-out` | 0.42 | 0 | 0.58 | 1 |

CSS lets the y of a control point go below 0 or above 1 for an overshoot; here B and D are clamped to 0 to 1 like the
others, so a Bézier never overshoots. For an overshoot, use [Back or Elastic](/docs/shaping-functions-curves/#back).
Keeping the x of both control points within 0 to 1 means every x has exactly one point on the curve, which the
function finds with Newton steps kept safe by bisection.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/bezier-cubic/#a">`A`</a> | `float` | The x of the first control point: CSS's x1. 0 to 1; 0 by default. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/bezier-cubic/#b">`B`</a> | `float` | The y of the first control point: CSS's y1. 0 to 1; 0 by default. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/bezier-cubic/#c">`C`</a> | `float` | The x of the second control point: CSS's x2. 0 to 1; 0 by default. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/functions/bezier-cubic/#d">`D`</a> | `float` | The y of the second control point: CSS's y2. 0 to 1; 0 by default. |
