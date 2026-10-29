---
layout: docs
legend: [prop, method]
title: "Shaping functions: the curves"
description: Ease in, ease out and ease in-out, every family of curves with pictures, the curves that overshoot and bounce, and which to choose.
---

Every curve of the library starts at 0 and ends at 1; what differs is the way between. The pictures on this page put
the input across and the output up, both from 0 to 1, with <a class="ref" href="/docs/shaping-functions-glossary/functions/linear/">`Linear`</a> as a dashed diagonal. Above the diagonal a
curve is ahead of a constant speed, below it behind, and the steeper the curve, the faster the movement. Every picture
is drawn from the library's own outputs.

## In, out and in-out

Most families come in threes:

- **Ease in** starts slowly and speeds up: still at the start, fast at the end.
- **Ease out** starts fast and slows down: fast at the start, still at the end.
- **Ease in-out** does both: still at both ends, fastest in the middle.

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/ease-in-out.svg' | relative_url }}" width="618" height="202" alt="Three curves: the cubic ease in bends below the diagonal, the ease out above it, and the ease in-out crosses it in the middle as an S">
  <figcaption>The three cubic eases. The dashed line is Linear.</figcaption>
</figure>

The three are one shape used three ways. An ease out is its ease in played backwards, `out(x) = 1 − in(1 − x)`, and
the first half of an ease in-out is the ease in at double speed and half height, the second half the ease out. Every
ease in-out is symmetric about its middle: it passes 0.5 at 0.5, and is as far below 0.5 a little before the middle as
it is above it a little after. Back and Elastic have constants of their own for their in-outs, which are symmetric too
but aren't made of their eases in and out.

The names say where the easing is, not where the speed is. A rule that works for most movements:

- What **arrives**, such as a panel sliding in or a camera coming to rest, eases out: it comes in fast and settles.
- What **leaves**, such as a panel sliding out, eases in: it gathers speed as it goes.
- What moves **from one rest to another** by itself, such as a door or a camera between two views, eases in and out.

## Polynomial curves

<a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in/">`QuadraticEaseIn`</a> is x², <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-in/">`CubicEaseIn`</a> x³, <a class="ref" href="/docs/shaping-functions-glossary/functions/quartic-ease-in/">`QuarticEaseIn`</a> x⁴ and <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-in/">`QuinticEaseIn`</a> x⁵, and
<a class="ref" href="/docs/shaping-functions-glossary/functions/linear/">`Linear`</a> is x itself. The higher the power, the longer the slow part and the sharper the fast part: an ease
in of power N ends at N times the speed of Linear, and an ease in-out of power N crosses the middle at N times that
speed.

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/polynomials.svg' | relative_url }}" width="618" height="238" alt="The quadratic, cubic, quartic and quintic eases in, out and in-out: the higher the power, the further each curve bends from the diagonal">
  <figcaption>Powers 2 to 5, dim to bright. The dashed line is Linear, power 1.</figcaption>
</figure>

| Power | Ease in | Ease out | Ease in-out | Ease in at the middle |
| --- | --- | --- | --- | --- |
| 1 | [`Linear`](/docs/shaping-functions-glossary/functions/linear/) | | | 0.5 |
| 2 | [`QuadraticEaseIn`](/docs/shaping-functions-glossary/functions/quadratic-ease-in/) | [`QuadraticEaseOut`](/docs/shaping-functions-glossary/functions/quadratic-ease-out/) | [`QuadraticEaseInOut`](/docs/shaping-functions-glossary/functions/quadratic-ease-in-out/) | 0.25 |
| 3 | [`CubicEaseIn`](/docs/shaping-functions-glossary/functions/cubic-ease-in/) | [`CubicEaseOut`](/docs/shaping-functions-glossary/functions/cubic-ease-out/) | [`CubicEaseInOut`](/docs/shaping-functions-glossary/functions/cubic-ease-in-out/) | 0.125 |
| 4 | [`QuarticEaseIn`](/docs/shaping-functions-glossary/functions/quartic-ease-in/) | [`QuarticEaseOut`](/docs/shaping-functions-glossary/functions/quartic-ease-out/) | [`QuarticEaseInOut`](/docs/shaping-functions-glossary/functions/quartic-ease-in-out/) | 0.0625 |
| 5 | [`QuinticEaseIn`](/docs/shaping-functions-glossary/functions/quintic-ease-in/) | [`QuinticEaseOut`](/docs/shaping-functions-glossary/functions/quintic-ease-out/) | [`QuinticEaseInOut`](/docs/shaping-functions-glossary/functions/quintic-ease-in-out/) | 0.031 |

Quadratic speeds up evenly, like something falling; cubic is the usual choice for interface movement; quartic and
quintic hold still longer and move more abruptly. <a class="ref" href="/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/">`DoublePolynomialSigmoid`</a> is the ease in-out of any power,
set by its order N, see [the order N](/docs/shaping-functions-parameters/#the-order-n).

A function's <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> is the degree of the polynomials its curve is made of: 1 for Linear, 2 to 5 for these
families, and 6 for the Blinn-Wyvill curve below. Back, Bounce and the Béziers have an order too, and the curves that
aren't polynomials have none.

## Sine, circular and exponential

Three more families of eases, from the gentlest to the most abrupt:

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/smooth.svg' | relative_url }}" width="618" height="238" alt="The sine, circular and exponential eases in, out and in-out: the sine curves stay closest to the diagonal and the exponential ones bend furthest from it">
  <figcaption>The sine, circular and exponential eases. The dashed line is Linear.</figcaption>
</figure>

- **Sine** follows a quarter of a cosine wave: <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-in/">`SineEaseIn`</a> is 0.29 at the middle, closer to Linear than
  any other ease in. It suits movements that should barely feel eased: a slow pan, a light that breathes, a fade.
- **Circular** curves are quarter circles. <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-ease-in/">`CircularEaseIn`</a> starts like half a quadratic and steepens to
  vertical at the end, covering nearly half its way in the last tenth of the time; the in-out passes its middle
  straight up, a snap.
- **Exponential** curves double every tenth of the way: <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-in/">`ExponentialEaseIn`</a> is only 0.03 at the middle, and
  covers 90% of its way in the last third of the time. Its formula is 0.001 rather than 0 at the start, so the curve steps from
  exactly 0 to 0.001 just after it, and <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-out/">`ExponentialEaseOut`</a> steps from 0.999 to exactly 1 just before
  the end. The steps can't be seen, but a test such as `output > 0` is true almost at once.

<a class="ref" href="/docs/shaping-functions-glossary/functions/blinn-wyvill-cosine-approximation/">`BlinnWyvillCosineApproximation`</a>, the one function of the `Hexic` category, is a polynomial of degree 6
that stays within 0.003 of <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-in-out/">`SineEaseInOut`</a> without computing a cosine.

## Back

The back curves overshoot by 10%. <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-in/">`BackEaseIn`</a> first pulls back below the start, as a hand draws back
before a throw. <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-out/">`BackEaseOut`</a> passes the end and comes back to it, and <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-in-out/">`BackEaseInOut`</a> does both.

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/back.svg' | relative_url }}" width="618" height="274" alt="The back eases: the ease in dips below 0 before rising, the ease out rises above 1 before settling, and the in-out does both">
  <figcaption>The back eases leave 0 to 1 by a tenth: down to −0.1 and up to 1.1.</figcaption>
</figure>

A small overshoot makes a movement feel springy and weighty: a button that pops up, a panel that drops into place, an
icon that grows in. The output leaves 0 to 1, so the value leaves its range: a panel moving 300 pixels passes its
place by 30, and an opacity eased with Back reaches 1.1. Interpolate without clamping, and clamp values that have
limits.

## Elastic

The elastic curves wobble like a spring. <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-out/">`ElasticEaseOut`</a> snaps past the end by 37%, swings back to
0.87, then to 1.05, each swing about a third of the last, and settles. <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-in/">`ElasticEaseIn`</a> is the same played
backwards: a spring winding up. <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-in-out/">`ElasticEaseInOut`</a> winds up, snaps across and wobbles to rest, with swings of 12%.

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/elastic.svg' | relative_url }}" width="618" height="356" alt="The elastic eases: the ease in swings about 0 with growing swings before shooting to 1, the ease out shoots past 1 and swings to rest, and the in-out does both with smaller swings">
  <figcaption>The elastic eases. The ease in and out reach 37% beyond 0 to 1, the in-out 12%.</figcaption>
</figure>

An overshoot of a third is a lot: a scale goes to 1.37 times its size, and a position far past its place. Elastic suits
short, playful movements, such as a hit reaction or a jelly-like pickup, better than long ones.

## Bounce

The bounce curves never leave 0 to 1 but fall back on the way, like a ball dropped onto the floor.
<a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-out/">`BounceEaseOut`</a> reaches the end at 36% of the time, falls back to 0.75, 0.9375 and 0.984 between ever shorter
bounces, and rests on the end at 1. <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-in/">`BounceEaseIn`</a> is the same played backwards, with growing hops off the
start, and <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-in-out/">`BounceEaseInOut`</a> both.

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/bounce.svg' | relative_url }}" width="618" height="202" alt="The bounce eases: the ease in hops three times off 0 before rising to 1, the ease out reaches 1 and bounces three times below it, and the in-out does both">
  <figcaption>The bounce eases. Every bounce stays within 0 to 1.</figcaption>
</figure>

Because a bounce never passes 1, a thing that lands with <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-out/">`BounceEaseOut`</a> never sinks through the floor it lands
on, and the curve keeps an opacity or a volume within its range.

## The parametric curves

Twelve functions take parameters that change their shape. Most come from Golan Levin's collection of shaping
functions; the parameters A to D usually place a point the curve sits at or passes through.

| Shape | Functions |
| --- | --- |
| Seats: a rise, a pause, a rise | [`CircularDoubleSeat`](/docs/shaping-functions-glossary/functions/circular-double-seat/), [`EllipticalDoubleSeat`](/docs/shaping-functions-glossary/functions/elliptical-double-seat/), [`CubicDoubleSeat`](/docs/shaping-functions-glossary/functions/cubic-double-seat/), [`DoubleOddPolynomialSeat`](/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/), [`ExponentialDoubleSeat`](/docs/shaping-functions-glossary/functions/exponential-double-seat/) |
| Sigmoids: an S of a chosen steepness or middle | [`CircularDoubleSigmoid`](/docs/shaping-functions-glossary/functions/circular-double-sigmoid/), [`EllipticalDoubleSigmoid`](/docs/shaping-functions-glossary/functions/elliptical-double-sigmoid/), [`LogisticSigmoid`](/docs/shaping-functions-glossary/functions/logistic-sigmoid/), [`DoublePolynomialSigmoid`](/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/) |
| A parabola through a chosen point | [`QuadraticThroughAGivenPoint`](/docs/shaping-functions-glossary/functions/quadratic-through-a-given-point/) |
| Bézier curves, as in CSS and animation editors | [`BezierQuadratic`](/docs/shaping-functions-glossary/functions/bezier-quadratic/), [`BezierCubic`](/docs/shaping-functions-glossary/functions/bezier-cubic/) |

Their parameters start at the bottom of their range, which makes most of them a plain curve, Linear or one of the eases,
until they are set. The [parameters page](/docs/shaping-functions-parameters/) shows each with pictures.

## Choosing a curve

| For | Try | Why |
| --- | --- | --- |
| A panel, a menu or a message sliding in | `CubicEaseOut`, `QuarticEaseOut` | A fast arrival and a soft stop |
| The same sliding out | `CubicEaseIn` | It gathers speed as it leaves |
| A camera moving between two views | `SineEaseInOut`, `CubicEaseInOut` | No jolt at either end |
| A slow pan, a breathing light, a fade | `SineEaseInOut`, `SineEaseOut` | Eased, but barely |
| A button or an icon that pops | `BackEaseOut` | A 10% overshoot reads as springy |
| Something dropped onto the floor | `BounceEaseOut` | Bounces without sinking below the floor |
| A wobble, a spring, a hit reaction | `ElasticEaseOut` | A big overshoot that dies away |
| A movement with a pause in the middle | `CubicDoubleSeat`, `EllipticalDoubleSeat` | The pause can sit at any point |
| A curve copied from CSS or an animation tool | `BezierCubic` | The same four numbers as `cubic-bezier()` |
| A constant speed: a conveyor, a progress bar | `Linear` | No easing at all |

A sound that fades with distance is a curve too: the [positional sound page](/docs/audio-positional/#distance) of the
audio docs shapes it with these functions.
