---
layout: docs
legend: [prop, method]
title: "Glossary: BaseShapingFunction"
description: "The members of BaseShapingFunction, in alphabetical order."
---

The base of every shaping function: a curve that takes an input from 0 to 1 and gives an output.

An abstract class. Every function of the library derives from it, and so does a [custom function](/docs/shaping-functions-custom/). The [catalog page](/docs/shaping-functions-catalog/#baseshapingfunction-properties) shows its properties in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="category"><span class="prop"><code>Category</code></span> <a class="ctx" href="/docs/shaping-functions-catalog/#baseshapingfunction-properties" title="Category in context on the catalog page" aria-label="Category in context on the catalog page">→</a></h3>

<a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/">`ShapingFunctionCategory`</a> · Read-only. The family the function belongs to: the category the catalog lists it under. <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#custom">`Custom`</a> for a custom function.

<h3 id="hasvariableorder"><span class="prop"><code>HasVariableOrder</code></span> <a class="ctx" href="/docs/shaping-functions-catalog/#baseshapingfunction-properties" title="HasVariableOrder in context on the catalog page" aria-label="HasVariableOrder in context on the catalog page">→</a></h3>

`bool` · Read-only. Whether the function has a settable order N: whether it implements <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-n-order/">`INOrder`</a>. `true` for <a class="ref" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/">`DoubleOddPolynomialSeat`</a> and <a class="ref" href="/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/">`DoublePolynomialSigmoid`</a>.

<h3 id="id"><span class="prop"><code>Id</code></span> <a class="ctx" href="/docs/shaping-functions-catalog/#baseshapingfunction-properties" title="Id in context on the catalog page" aria-label="Id in context on the catalog page">→</a></h3>

<a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/">`ShapingFunctionId`</a> · Read-only. Which function it is: <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a>`(fn.Id)` creates another of it, with its parameters at their defaults. <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#custom">`Custom`</a> for a custom function.

<h3 id="name"><span class="prop"><code>Name</code></span> <a class="ctx" href="/docs/shaping-functions-catalog/#baseshapingfunction-properties" title="Name in context on the catalog page" aria-label="Name in context on the catalog page">→</a></h3>

`string` · Read-only. A name to show, such as `"Cubic EaseInOut"`. Each function of the library has its own. Save the <a class="ref prop" href="#id">`Id`</a>, not the name.

<h3 id="order"><span class="prop"><code>Order</code></span> <a class="ctx" href="/docs/shaping-functions-catalog/#baseshapingfunction-properties" title="Order in context on the catalog page" aria-label="Order in context on the catalog page">→</a></h3>

`int?` · Read-only. The degree of the polynomials the curve is made of: 1 for Linear, 2 for the quadratics, Bounce and BezierQuadratic, 3 for the cubics, Back and BezierCubic, 4, 5 and 6 for the quartics, the quintics and Blinn-Wyvill. `null` for the curves that aren't polynomials, and for the NOrder functions, whose degree is set by N.

<h3 id="parametercount"><span class="prop"><code>ParameterCount</code></span> <a class="ctx" href="/docs/shaping-functions-catalog/#baseshapingfunction-properties" title="ParameterCount in context on the catalog page" aria-label="ParameterCount in context on the catalog page">→</a></h3>

`int` · Read-only. How many of the parameters A, B, C and D the function takes, 0 to 4, read from the [parameter interface](/docs/shaping-functions-glossary/parameters/) it implements. N isn't counted: see <a class="ref prop" href="#hasvariableorder">`HasVariableOrder`</a>.

<h3 id="parametric"><span class="prop"><code>Parametric</code></span> <a class="ctx" href="/docs/shaping-functions-catalog/#baseshapingfunction-properties" title="Parametric in context on the catalog page" aria-label="Parametric in context on the catalog page">→</a></h3>

`bool` · Read-only. Whether the function has any parameter, A to D or N: <a class="ref prop" href="#parametercount">`ParameterCount`</a> above 0 or <a class="ref prop" href="#hasvariableorder">`HasVariableOrder`</a>.

## Fields

<h3 id="parameterepsilon"><code>ParameterEpsilon</code> <a class="ctx" href="/docs/shaping-functions-custom/#baseshapingfunction-protected-members" title="ParameterEpsilon in context on the custom functions page" aria-label="ParameterEpsilon in context on the custom functions page">→</a></h3>

`float` · Protected constant. 0.00001: the margin that keeps a parameter away from 0 and 1 where its curve would divide by 0. Outside the Béziers, the library keeps A within 0.00001 to 0.99999 with it.

## Methods

<h3 id="baseshapingfunction"><span class="method"><code>BaseShapingFunction()</code></span> <a class="ctx" href="/docs/shaping-functions-custom/#baseshapingfunction-protected-members" title="BaseShapingFunction() in context on the custom functions page" aria-label="BaseShapingFunction() in context on the custom functions page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#baseshapingfunction">`BaseShapingFunction(string name, int? order = null)`</a> · Protected. The constructor of a custom function. Its <a class="ref prop" href="#id">`Id`</a> and <a class="ref prop" href="#category">`Category`</a> are `Custom`; the library's own functions use a constructor that only the library can call, so every other ID names a function of the library.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The <a class="ref prop" href="#name">`Name`</a> to show. |
| `order` | `int?` | The <a class="ref prop" href="#order">`Order`</a>: the degree of the curve's polynomials, or `null`, the default, when it has none. |

<h3 id="calculatecore"><span class="method"><code>CalculateCore()</code></span> <a class="ctx" href="/docs/shaping-functions-custom/#baseshapingfunction-protected-members" title="CalculateCore() in context on the custom functions page" aria-label="CalculateCore() in context on the custom functions page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculatecore">`CalculateCore(float input)`</a> · Protected, abstract. The curve itself, which every function overrides. Called by <a class="ref method" href="#calculateoutput">`CalculateOutput`</a> with the input already clamped to 0 to 1, or `NaN`. Returns the output.

| Parameter | Type | Description |
| --- | --- | --- |
| `input` | `float` | From 0 to 1, or `NaN`. |

<h3 id="calculateoutput"><span class="method"><code>CalculateOutput()</code></span> <a class="ctx" href="/docs/shaping-functions/#creating-and-evaluating" title="CalculateOutput() in context on the quick start page" aria-label="CalculateOutput() in context on the quick start page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput(float input)`</a> · The output of the curve for the input. Clamps the input to 0 to 1 first, so −0.5 gives the output of 0 and 2 that of 1; `NaN` gives `NaN`. The library's functions give exactly 0 for 0 and exactly 1 for 1, whatever their parameters. Changes nothing, so the same input always gives the same output.

| Parameter | Type | Description |
| --- | --- | --- |
| `input` | `float` | How far along, usually from 0 to 1. |

<h3 id="clampparameter"><span class="method"><code>ClampParameter()</code></span> <a class="ctx" href="/docs/shaping-functions-custom/#baseshapingfunction-protected-members" title="ClampParameter() in context on the custom functions page" aria-label="ClampParameter() in context on the custom functions page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#clampparameter">`ClampParameter(float value, float min = 0, float max = 1)`</a> · Protected, static. The value clamped to `min` to `max`, for a parameter's setter. Throws `ArgumentOutOfRangeException` for `NaN`, which would pass through a clamp and spoil every output after it.

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `float` | The value being set. |
| `min` | `float` | The lowest value, 0 by default. |
| `max` | `float` | The highest value, 1 by default. |
