---
layout: docs
legend: [prop, method]
title: "Shaping functions: catalog and IDs"
description: Creating a function from its ID, the categories, what a function says about itself, a curve picker, and saving a curve with its parameters.
---

Code that knows its curve writes `new CubicEaseOut()`. Code that lets a designer, a setting or a save file choose the
curve works with IDs: every function of the library has a <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/">`ShapingFunctionId`</a>, belongs to a
<a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/">`ShapingFunctionCategory`</a>, can be created from its ID and listed by the catalog, and is saved as a number that
never changes. Names are colored by what they are: a <span class="kb kb-prop">property</span> or a
<span class="kb kb-method">method</span>.

## Creating a function by ID

<a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> turns an ID into a function:

```csharp
ShapingFunctionId id = settings.FadeCurve; // ShapingFunctionId.SineEaseInOut, say

BaseShapingFunction fade = ShapingFunctionFactory.Create(id);
```

Each call creates a new instance with its parameters at their defaults, so setting the parameters of one never
changes another. The factory knows only the library's own functions: it throws `ArgumentOutOfRangeException` for
`ShapingFunctionId.Custom`, the ID every [custom function](/docs/shaping-functions-custom/) shares, and for a number the
enum doesn't define, such as one read from a damaged file. Check an ID that comes from outside the game before creating
its function:

```csharp
var known = Enum.IsDefined(id) && id != ShapingFunctionId.Custom;

BaseShapingFunction fade = ShapingFunctionFactory.Create(known ? id : ShapingFunctionId.Linear);
```

### ShapingFunctionFactory method

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`Create(ShapingFunctionId id)`</a> | Static. A new instance of the function, with its parameters at their defaults. Throws `ArgumentOutOfRangeException` for `Custom` and for values the enum doesn't define. |

## Categories

Each function belongs to one of 15 categories, its family: Back, Bezier, Bounce and so on. <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-catalog/">`ShapingFunctionCatalog`</a>
lists the categories and the functions in each, for a picker or a menu:

```csharp
foreach (ShapingFunctionCategory category in ShapingFunctionCatalog.GetCategories())
{
    Console.WriteLine(category);

    foreach (ShapingFunctionId id in ShapingFunctionCatalog.GetFunctions(category))
        Console.WriteLine($"    {id}");
}
```

The categories and the functions come in the order the enums declare them, the same on every run and in every version,
so a list built from the catalog doesn't reshuffle. List the functions with the catalog rather than with
`Enum.GetValues<ShapingFunctionId>()`: the enum also holds `Custom`, which the factory rejects.

### ShapingFunctionCatalog methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-catalog/#getcategories">`GetCategories()`</a> | Static. Every category that has functions, as an `IReadOnlyCollection<ShapingFunctionCategory>`, in declaration order. `Custom` isn't among them. |
| <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-catalog/#getfunctions">`GetFunctions(ShapingFunctionCategory category)`</a> | Static. The IDs of the category's functions, as an `IReadOnlyList<ShapingFunctionId>`, in declaration order. Throws `ArgumentOutOfRangeException` for `Custom` and for values the enum doesn't define. |

### Categories and their functions

Every category and every ID has an explicit number. A number never changes, and one that is retired is never used
again, so the numbers are safe to save.

| Category | Number | Functions, with their numbers |
| --- | --- | --- |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#back">`Back`</a> | 0 | <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-in/">`BackEaseIn`</a> 0, <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-in-out/">`BackEaseInOut`</a> 1, <a class="ref" href="/docs/shaping-functions-glossary/functions/back-ease-out/">`BackEaseOut`</a> 2 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bezier">`Bezier`</a> | 1 | <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-cubic/">`BezierCubic`</a> 3, <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-quadratic/">`BezierQuadratic`</a> 4 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bounce">`Bounce`</a> | 2 | <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-in/">`BounceEaseIn`</a> 5, <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-in-out/">`BounceEaseInOut`</a> 6, <a class="ref" href="/docs/shaping-functions-glossary/functions/bounce-ease-out/">`BounceEaseOut`</a> 7 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#circular">`Circular`</a> | 3 | <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-double-seat/">`CircularDoubleSeat`</a> 8, <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-double-sigmoid/">`CircularDoubleSigmoid`</a> 9, <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-ease-in/">`CircularEaseIn`</a> 10, <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-ease-in-out/">`CircularEaseInOut`</a> 11, <a class="ref" href="/docs/shaping-functions-glossary/functions/circular-ease-out/">`CircularEaseOut`</a> 12 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elastic">`Elastic`</a> | 4 | <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-in/">`ElasticEaseIn`</a> 13, <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-in-out/">`ElasticEaseInOut`</a> 14, <a class="ref" href="/docs/shaping-functions-glossary/functions/elastic-ease-out/">`ElasticEaseOut`</a> 15 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elliptical">`Elliptical`</a> | 5 | <a class="ref" href="/docs/shaping-functions-glossary/functions/elliptical-double-seat/">`EllipticalDoubleSeat`</a> 16, <a class="ref" href="/docs/shaping-functions-glossary/functions/elliptical-double-sigmoid/">`EllipticalDoubleSigmoid`</a> 17 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#exponential">`Exponential`</a> | 6 | <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-double-seat/">`ExponentialDoubleSeat`</a> 18, <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-in/">`ExponentialEaseIn`</a> 19, <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-in-out/">`ExponentialEaseInOut`</a> 20, <a class="ref" href="/docs/shaping-functions-glossary/functions/exponential-ease-out/">`ExponentialEaseOut`</a> 21, <a class="ref" href="/docs/shaping-functions-glossary/functions/logistic-sigmoid/">`LogisticSigmoid`</a> 22 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#linear">`Linear`</a> | 7 | <a class="ref" href="/docs/shaping-functions-glossary/functions/linear/">`Linear`</a> 23 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quadratic">`Quadratic`</a> | 8 | <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in/">`QuadraticEaseIn`</a> 24, <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in-out/">`QuadraticEaseInOut`</a> 25, <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-out/">`QuadraticEaseOut`</a> 26, <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-through-a-given-point/">`QuadraticThroughAGivenPoint`</a> 27 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#cubic">`Cubic`</a> | 9 | <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-double-seat/">`CubicDoubleSeat`</a> 28, <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-in/">`CubicEaseIn`</a> 29, <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-in-out/">`CubicEaseInOut`</a> 30, <a class="ref" href="/docs/shaping-functions-glossary/functions/cubic-ease-out/">`CubicEaseOut`</a> 31 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quartic">`Quartic`</a> | 10 | <a class="ref" href="/docs/shaping-functions-glossary/functions/quartic-ease-in/">`QuarticEaseIn`</a> 32, <a class="ref" href="/docs/shaping-functions-glossary/functions/quartic-ease-in-out/">`QuarticEaseInOut`</a> 33, <a class="ref" href="/docs/shaping-functions-glossary/functions/quartic-ease-out/">`QuarticEaseOut`</a> 34 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quintic">`Quintic`</a> | 11 | <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-in/">`QuinticEaseIn`</a> 35, <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-in-out/">`QuinticEaseInOut`</a> 36, <a class="ref" href="/docs/shaping-functions-glossary/functions/quintic-ease-out/">`QuinticEaseOut`</a> 37 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#hexic">`Hexic`</a> | 12 | <a class="ref" href="/docs/shaping-functions-glossary/functions/blinn-wyvill-cosine-approximation/">`BlinnWyvillCosineApproximation`</a> 38 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#norder">`NOrder`</a> | 13 | <a class="ref" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/">`DoubleOddPolynomialSeat`</a> 39, <a class="ref" href="/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/">`DoublePolynomialSigmoid`</a> 40 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#sine">`Sine`</a> | 14 | <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-in/">`SineEaseIn`</a> 41, <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-in-out/">`SineEaseInOut`</a> 42, <a class="ref" href="/docs/shaping-functions-glossary/functions/sine-ease-out/">`SineEaseOut`</a> 43 |
| <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#custom">`Custom`</a> | −1 | Every [custom function](/docs/shaping-functions-custom/), each with the ID <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#custom">`Custom`</a>, −1. The catalog lists neither. |

## What a function says about itself

A function created from an ID is a <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a>, which says what it is without a cast:

```csharp
BaseShapingFunction fn = ShapingFunctionFactory.Create(ShapingFunctionId.CubicEaseInOut);

ShapingFunctionId fnId = fn.Id;                 // CubicEaseInOut: the ID it was created from
ShapingFunctionCategory category = fn.Category; // Cubic: the catalog's category for it
string name = fn.Name;                          // "Cubic EaseInOut": a name to show
int? order = fn.Order;                          // 3: the degree of its polynomials, null for none
bool parametric = fn.Parametric;                // false: it has none of A to D and no N
int parameterCount = fn.ParameterCount;         // 0: how many of A to D it takes, 0 to 4
bool hasOrder = fn.HasVariableOrder;            // false: whether it has an order N
```

Show <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> to people, and save <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a>: only the numbers are promised never to change.

### BaseShapingFunction properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/">`ShapingFunctionCategory`</a> | Read-only. The family the function belongs to, the category the catalog lists it under. `Custom` for a custom function. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `bool` | Read-only. Whether the function has a settable order N, through <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-n-order/">`INOrder`</a>. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/">`ShapingFunctionId`</a> | Read-only. Which function it is; the factory creates another of it from this. `Custom` for a custom function. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `string` | Read-only. A name to show, such as `"Cubic EaseInOut"`. Each function of the library has its own. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `int?` | Read-only. The degree of the polynomials the curve is made of, from 1 for Linear to 6 for Blinn-Wyvill. `null` for curves that aren't polynomials and for the two NOrder functions. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `int` | Read-only. How many of A, B, C and D the function takes, 0 to 4. |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametric">`Parametric`</a> | `bool` | Read-only. Whether the function has any parameter, A to D or N. |

## A curve picker

An editor's curve picker lists the categories and their functions, shows sliders for the parameters of the one chosen,
and draws its curve. The UI is the editor's own; this class is what it needs from the library:

```csharp
using System.Numerics;
using BorrowedTorch.ShapingFunctions;

public sealed class CurvePicker
{
    public BaseShapingFunction Selected { get; private set; } = new Linear();

    // the rows of the list: each category, then its functions under their names
    public IEnumerable<(ShapingFunctionCategory Category, ShapingFunctionId Id, string Name)> Rows()
    {
        foreach (var category in ShapingFunctionCatalog.GetCategories())
        foreach (var id in ShapingFunctionCatalog.GetFunctions(category))
            yield return (category, id, ShapingFunctionFactory.Create(id).Name);
    }

    public void Select(ShapingFunctionId id)
    {
        Selected = ShapingFunctionFactory.Create(id);
    }

    // the sliders to show: "AB" for a function with A and B
    public string Sliders => "ABCD"[..Selected.ParameterCount];

    public bool ShowsOrder => Selected.HasVariableOrder;

    // sets a parameter and gives back its value as kept, for the slider to show
    public float SetParameter(char name, float value)
    {
        switch (name)
        {
            case 'A' when Selected is IOneParameter p:
                p.A = value;
                return p.A;
            case 'B' when Selected is ITwoParameters p:
                p.B = value;
                return p.B;
            case 'C' when Selected is IThreeParameters p:
                p.C = value;
                return p.C;
            case 'D' when Selected is IFourParameters p:
                p.D = value;
                return p.D;
            default:
                throw new ArgumentOutOfRangeException(nameof(name));
        }
    }

    public int SetOrder(int n)
    {
        var order = (INOrder)Selected;
        order.N = n;
        return order.N;
    }

    // the curve to draw: input across, output up
    public Vector2[] Preview(int segments = 100)
    {
        var points = new Vector2[segments + 1];

        for (var i = 0; i <= segments; i++)
        {
            var x = i / (float)segments;
            points[i] = new Vector2(x, Selected.CalculateOutput(x));
        }

        return points;
    }
}
```

`SetParameter` returns the value the function kept, because the function clamps it: a slider dragged to 0 for the A of
a seat shows 0.00001. Give the preview room above 1 and below 0: the elastic curves reach from −0.37 to 1.37, so a
graph from −0.4 to 1.4 holds every curve of the library.

## Saving a curve

A saved curve is its ID and its parameters. This record holds them, reads them from a function and creates the
function again, and serializes as it is with `System.Text.Json`:

```csharp
using BorrowedTorch.ShapingFunctions;

public sealed record CurveSettings(int Id, float A = 0, float B = 0, float C = 0, float D = 0, int N = 1)
{
    public static CurveSettings From(BaseShapingFunction fn)
    {
        if (fn.Id == ShapingFunctionId.Custom)
            throw new ArgumentException("A custom function has no ID to save.", nameof(fn));

        return new CurveSettings((int)fn.Id,
            fn is IOneParameter a ? a.A : 0,
            fn is ITwoParameters b ? b.B : 0,
            fn is IThreeParameters c ? c.C : 0,
            fn is IFourParameters d ? d.D : 0,
            fn is INOrder n ? n.N : 1);
    }

    public BaseShapingFunction Create()
    {
        var fn = ShapingFunctionFactory.Create((ShapingFunctionId)Id);

        if (fn is IOneParameter a) a.A = A;
        if (fn is ITwoParameters b) b.B = B;
        if (fn is IThreeParameters c) c.C = C;
        if (fn is IFourParameters d) d.D = D;
        if (fn is INOrder n) n.N = N;

        return fn;
    }
}
```

The ID is saved as its number, which never changes; the name of an enum member isn't promised to. A file edited by
hand can't break a curve, since the parameters are clamped when they are set, but an ID the enum doesn't define makes
<a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`Create`</a> throw: check it as [above](#creating-a-function-by-id) when the file comes from elsewhere.

A custom function shares the ID `Custom` with every other custom function, so its ID can't say which one it was. The
[custom functions page](/docs/shaping-functions-custom/#saving-a-custom-function) saves them under names of their own.
