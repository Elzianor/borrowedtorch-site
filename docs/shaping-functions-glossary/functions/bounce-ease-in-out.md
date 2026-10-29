---
layout: docs
legend: [prop, method]
title: "Glossary: BounceEaseInOut"
description: "The curve of BounceEaseInOut and its constructor."
---

Hops off the start, crosses the middle at full speed and bounces to rest on the end.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bounce">`ShapingFunctionCategory.Bounce`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#bounce) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/bounce-ease-in-out.svg' | relative_url }}" width="244" height="252" alt="The curve of BounceEaseInOut: hops off the start, crosses the middle at full speed and bounces to rest on the end.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#bounceeaseinout">`ShapingFunctionId.BounceEaseInOut`</a>, number 6 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bounce">`ShapingFunctionCategory.Bounce`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Bounce EaseInOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `2` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is (1 − BounceEaseOut(1 − 2x)) / 2 for x below 0.5, and (1 + BounceEaseOut(2x − 1)) / 2 from 0.5.

Its first half is BounceEaseIn and its second half BounceEaseOut, each run at double speed and half height: the highest hop reaches 0.125 and the deepest dip 0.875. It stays within 0 to 1 but goes back between the bounces.

## Methods

<h3 id="bounceeaseinout"><span class="method"><code>BounceEaseInOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#bounce" title="BounceEaseInOut() in context on the curves page" aria-label="BounceEaseInOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/bounce-ease-in-out/#bounceeaseinout">`BounceEaseInOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.BounceEaseInOut`.
