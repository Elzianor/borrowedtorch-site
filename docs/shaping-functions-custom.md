---
layout: docs
legend: [prop, method]
title: "Shaping functions: custom functions"
description: A curve of your own on BaseShapingFunction, with parameters if it needs them, used wherever a shaping function is taken, and saved under a name of your own.
---

When none of the 44 curves fits, write your own. A custom function derives from the same base as the library's, so it
goes wherever a shaping function goes: the audio fades and distance curves, a tween, a picker. Names are colored by
what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and
fields keep the plain color.

## A curve of your own

Derive from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a>, pass a name and, if the curve is a polynomial, its degree to the base
constructor, and override <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculatecore">`CalculateCore`</a>. The smoothstep curve, 3x² − 2x³:

```csharp
using BorrowedTorch.ShapingFunctions;

public sealed class SmoothStep : BaseShapingFunction
{
    public SmoothStep()
        : base("Smooth Step", 3)
    {
    }

    protected override float CalculateCore(float input)
    {
        return input * input * (3.0f - 2.0f * input);
    }
}
```

<a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> clamps the input to 0 to 1 and then calls `CalculateCore`, so the curve only ever
sees inputs from 0 to 1, or `NaN`. `CalculateOutput` isn't virtual: the clamp always happens.

A custom function's <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> is <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#custom">`ShapingFunctionId.Custom`</a> and its <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#custom">`ShapingFunctionCategory.Custom`</a>,
both −1. The other IDs are the library's: its own functions are built with a constructor only the library can call,
so every ID but `Custom` always names a function the factory can create.

Code built on shaping functions counts on [what every curve promises](/docs/shaping-functions/#what-every-curve-promises).
The library tests its own functions for it; a custom function should keep it too:

- **Exact ends.** Return exactly 0 for 0 and exactly 1 for 1, so animations land on their values. Smoothstep does:
  `0 * 0 * 3` is 0 and `1 * 1 * 1` is 1. Formulas that only reach 1 approximately can test for the ends and return
  them, as the library's exponential and elastic curves do.
- **Within 0 to 1**, unless the curve overshoots on purpose.
- **Pure.** Change nothing in `CalculateCore`, so the same input always gives the same output and several threads can
  evaluate one function at once.
- **`NaN` in, `NaN` out.** Arithmetic on `NaN` gives `NaN` by itself; a curve that branches on its input should keep
  it so.

### BaseShapingFunction protected members

| Member | Description |
| --- | --- |
| <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#baseshapingfunction">`BaseShapingFunction(string name, int? order = null)`</a> | The constructor of a custom function: its <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> and its <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a>, `null` when it isn't a polynomial. Its `Id` and `Category` are `Custom`. |
| <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculatecore">`CalculateCore(float input)`</a> | Abstract. The curve: the output for an input from 0 to 1, or `NaN`. |
| <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#clampparameter">`ClampParameter(float value, float min = 0, float max = 1)`</a> | Static. The value clamped to `min` to `max`, for a parameter's setter. Throws `ArgumentOutOfRangeException` for `NaN`. |
| <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parameterepsilon">`ParameterEpsilon`</a> | Constant. 0.00001, the margin that keeps a parameter off 0 and 1 where the curve would divide by 0. |

## Parameters of your own

To give a custom function parameters, implement the [parameter interfaces](/docs/shaping-functions-parameters/#parameter-interfaces)
and clamp the values in their setters with <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#clampparameter">`ClampParameter`</a>. Schlick's bias curve passes through
(0.5, A): an ease in below the diagonal, an ease out above it, and the straight line at A = 0.5.

```csharp
using BorrowedTorch.ShapingFunctions;

public sealed class Bias : BaseShapingFunction, IOneParameter
{
    // the straight line until A is set
    private float _a = 0.5f;

    public Bias()
        : base("Bias")
    {
    }

    public float A
    {
        get => _a;
        // the curve divides by A, and by 0 at the start when A is 1: keep A off both ends, as the library does
        set => _a = ClampParameter(value, ParameterEpsilon, 1.0f - ParameterEpsilon);
    }

    protected override float CalculateCore(float input)
    {
        return input / ((1.0f / A - 2.0f) * (1.0f - input) + 1.0f);
    }
}
```

The curve gives exactly 0 for 0, and exactly 1 for 1, where the bracket is 0. The rest follows from the interface:
<a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> is 1, <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametric">`Parametric`</a> is `true` and <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> is `false`, and code that
sets the parameters of the library's functions through `IOneParameter`, such as the
[curve picker](/docs/shaping-functions-catalog/#a-curve-picker), sets this one's too. For B to D implement
`ITwoParameters` to `IFourParameters`, which include the ones before them, and for an order implement `INOrder`.

The library starts its parameters at the bottom of their range. A custom function can start where it suits it best:
here at 0.5, the straight line.

## Using a custom function

A custom function goes wherever a <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> goes:

```csharp
fade.FadeInFunction = new SmoothStep();          // a fade of BorrowedTorch.Audio
distance.DistanceVolumeAttenuationFunction = new Bias { A = 0.2f };
```

The factory and the catalog know only the library's functions: <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> throws for
`Custom`, and <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-catalog/">`ShapingFunctionCatalog`</a> never lists it. To offer custom functions in a picker, add them to its list
yourself.

## Saving a custom function

Every custom function has the ID `Custom`, so the ID can't say which one to create again. Save a name of your own
instead, and keep a table from the names to the functions:

```csharp
using BorrowedTorch.ShapingFunctions;

public static class GameCurves
{
    // the game's own curves, under names that go into save files and never change
    private static readonly Dictionary<string, Func<BaseShapingFunction>> Custom = new()
    {
        ["SmoothStep"] = () => new SmoothStep(),
        ["Bias"] = () => new Bias()
    };

    // a saved curve: the number of a library ID, or Custom (-1) and the name of one of the game's own
    public static BaseShapingFunction Create(int id, string? customName)
    {
        if ((ShapingFunctionId)id != ShapingFunctionId.Custom)
            return ShapingFunctionFactory.Create((ShapingFunctionId)id);

        if (customName is not null && Custom.TryGetValue(customName, out var create))
            return create();

        throw new ArgumentException($"No custom curve is called {customName}.", nameof(customName));
    }
}
```

The parameters are saved and set again through the interfaces, the same way for both kinds, as the
[catalog page](/docs/shaping-functions-catalog/#saving-a-curve) does for the library's functions.
