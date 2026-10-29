---
layout: docs
legend: [prop, method]
title: "Shaping functions: quick start guide"
description: Set up BorrowedTorch.ShapingFunctions, give an animation a curve, and find your way around the shaping functions pages.
---

BorrowedTorch.ShapingFunctions is the curves of Kindling: 44 functions that take a number from 0 to 1 and give back a
number from 0 to 1, shaped. Time passes at a constant rate; a shaping function turns it into a movement that starts
gently, lands softly, overshoots, wobbles or bounces. Kindling's audio fades sounds in and out and dulls them with
distance along these curves, and the same curves move menus, doors, cameras and anything else that goes from one value
to another.

These pages cover the library from setup to every public type:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/shaping-functions/) (this page) | Installing, a first curve, animating a value, what every curve promises, a tween |
| [The curves](/docs/shaping-functions-curves/) | Ease in, ease out and ease in-out, every family with pictures, overshoot and bounce, choosing a curve |
| [Parameters](/docs/shaping-functions-parameters/) | The functions that take parameters, the interfaces that set them, their ranges and defaults, what each one does |
| [Catalog and IDs](/docs/shaping-functions-catalog/) | Creating a function from its ID, the categories, what a function says about itself, a curve picker, saving a curve |
| [Custom functions](/docs/shaping-functions-custom/) | A curve of your own, with parameters if it needs them, wherever a shaping function is taken |
| [Glossary](/docs/shaping-functions-glossary/) | Every function, type and interface with its members, one page each |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.ShapingFunctions
```

| Requirement | Version |
| --- | --- |
| .NET | 10 (`net10.0`) |
| Operating system | Any: the library is plain managed code |
| Borrowed Torch packages | `BorrowedTorch.Math` 0.2.2, installed with the package |

[BorrowedTorch.Audio](/docs/audio/) takes its fade shapes and distance curves from this package and installs it with
itself. Every public type is in the namespace `BorrowedTorch.ShapingFunctions`.

## A first curve

Create a function with <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-factory/">`ShapingFunctionFactory`</a> and give its <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> how far along
you are, from 0 to 1. It gives back how far along the movement should be:

```csharp
using BorrowedTorch.ShapingFunctions;

BaseShapingFunction ease = ShapingFunctionFactory.Create(ShapingFunctionId.CubicEaseInOut);

float a = ease.CalculateOutput(0.25f); // 0.0625: a quarter of the time, still slow
float b = ease.CalculateOutput(0.5f);  // 0.5: halfway, at full speed
float c = ease.CalculateOutput(1.0f);  // 1: exactly at the end
```

Every function is a class of its own that derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a>, so `new CubicEaseInOut()`
does the same. The factory is for code that picks the curve as it runs: from a setting, a save file or a
[picker](/docs/shaping-functions-catalog/#a-curve-picker). Each call creates a new instance.

The input is clamped to 0 to 1 before the curve sees it, so a timer that runs a little past its end is safe: anything
above 1 gives the output of 1, and anything below 0 that of 0.

### Creating and evaluating

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create(ShapingFunctionId id)`</a> | Static. A new instance of the function, with its parameters at their defaults. Throws `ArgumentOutOfRangeException` for `ShapingFunctionId.Custom` and for values the enum doesn't define. |
| <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput(float input)`</a> | The output of the curve for the input. Clamps the input to 0 to 1 first; `NaN` gives `NaN`. Changes nothing, so the same input always gives the same output. |

The IDs, the categories and the rest of what a function says about itself are on the
[catalog page](/docs/shaping-functions-catalog/).

## Animating a value

A shaping function knows nothing about time or about the values being animated: it shapes the fraction in between.
An animation takes three steps:

1. **How far along in time.** The time since the start over the duration: 0 at the start, 1 at the end.
2. **How far along the way.** The function shapes that fraction.
3. **The value.** A linear interpolation from the start value to the end value, by the shaped fraction.

```csharp
float t = elapsedSec / durationSec;      // 0 to 1, or a little past 1 on the last frame
float s = ease.CalculateOutput(t);       // shaped, and exactly 1 once t reaches 1
float x = startX + (endX - startX) * s;  // the value for this frame
```

Interpolate without clamping. Back and Elastic overshoot: their output leaves 0 to 1 on purpose, and an interpolation
that clamps its amount cuts the overshoot off. `startX + (endX - startX) * s` doesn't clamp, and neither do
`Vector2.Lerp` and MonoGame's `MathHelper.Lerp`. When the value itself has limits, such as an opacity or a volume,
clamp the value after the interpolation instead.

The same fraction can drive anything: a position, a scale, an angle, a color, a gain. To run an animation backwards,
run its time backwards, `ease.CalculateOutput(1 - t)`, and the value goes from the end back to the start along the same
curve.

## What every curve promises

The library holds each of its 44 functions to these, for any parameters, and tests them:

- **Exact ends.** Every curve gives exactly 0 for 0 and exactly 1 for 1, so an animation starts and lands exactly on
  its values.
- **Clamped input.** Inputs below 0 give the output of 0 and inputs above 1 that of 1. `NaN` gives `NaN`.
- **Within 0 to 1, but for Back and Elastic.** Every curve stays within 0 to 1 on its way, except Back, which
  overshoots by 10%, and Elastic, by up to 37%. See [the curves page](/docs/shaping-functions-curves/#back).
- **Forward only, but for Back, Elastic and Bounce.** Every other curve only ever rises. Those three go back on their
  way: Bounce without leaving 0 to 1.
- **Pure.** <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> changes nothing: the same input gives the same output every time.
  Several threads can evaluate one function at once, as long as none of them sets its parameters meanwhile.
- **True to the published formulas.** Each curve is checked against a double-precision version of its formula: the
  easing functions of [easings.net](https://easings.net/), Golan Levin's shaping functions, and the Bernstein form of
  the Bézier curves. The outputs are `float`.

A [custom function](/docs/shaping-functions-custom/) is held to none of these by the library; the custom functions page
says how to keep them.

## A tween

A tween moves a value from one point to another over a time, along a curve. This one is a small class that a menu,
an item or a camera can own; it uses the `Vector2` of `System.Numerics`, and MonoGame's works the same.

```csharp
using System.Numerics;
using BorrowedTorch.ShapingFunctions;

public sealed class Tween
{
    private readonly BaseShapingFunction _curve;
    private float _elapsedSec;

    public Tween(Vector2 from, Vector2 to, float durationSec, ShapingFunctionId curve)
    {
        From = from;
        To = to;
        DurationSec = durationSec;
        _curve = ShapingFunctionFactory.Create(curve);
    }

    public Vector2 From { get; }

    public Vector2 To { get; }

    public float DurationSec { get; }

    public bool IsFinished => _elapsedSec >= DurationSec;

    public Vector2 Value
    {
        get
        {
            // how far along in time: past 1 on the last frame, which CalculateOutput clamps
            var t = DurationSec > 0 ? _elapsedSec / DurationSec : 1;

            // Vector2.Lerp doesn't clamp, so Back and Elastic keep their overshoot
            return Vector2.Lerp(From, To, _curve.CalculateOutput(t));
        }
    }

    public void Update(float elapsedSec)
    {
        _elapsedSec += elapsedSec;
    }
}
```

A pause menu that drops into the middle of a 1280 × 720 screen when it opens, and leaves upward when it closes:

```csharp
public sealed class PauseMenu
{
    private static readonly Vector2 Hidden = new(640, -200); // above the screen
    private static readonly Vector2 Shown = new(640, 360);   // in the middle

    private Tween _slide = new(Hidden, Hidden, 0, ShapingFunctionId.Linear);

    public Vector2 Position => _slide.Value;

    public void Open()
    {
        // from wherever the menu is, so opening it while it leaves doesn't make it jump
        _slide = new Tween(Position, Shown, 0.35f, ShapingFunctionId.BackEaseOut);
    }

    public void Close()
    {
        _slide = new Tween(Position, Hidden, 0.25f, ShapingFunctionId.CubicEaseIn);
    }

    public void Update(float elapsedSec)
    {
        _slide.Update(elapsedSec);
    }
}
```

The menu arrives with <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-out/">`BackEaseOut`</a>: fast, then 10% of the way past its place, 56 pixels below the
middle, and back. It leaves with <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-in/">`CubicEaseIn`</a>, slowly at first and faster as it goes. Things that arrive
ease out and things that leave ease in, as the [curves page](/docs/shaping-functions-curves/#in-out-and-in-out) explains.

A function without parameters keeps nothing between calls, so the tweens could as well share one instance of each
curve. Give a tween a function of its own when you set its [parameters](/docs/shaping-functions-parameters/).
