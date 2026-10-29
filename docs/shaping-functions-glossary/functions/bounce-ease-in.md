---
layout: docs
legend: [prop, method]
title: "Glossary: BounceEaseIn"
description: "The curve of BounceEaseIn and its constructor."
---

Three growing hops off the start, then a fall to the end: BounceEaseOut played backwards.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bounce">`ShapingFunctionCategory.Bounce`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#bounce) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/bounce-ease-in.svg' | relative_url }}" width="244" height="252" alt="The curve of BounceEaseIn: three growing hops off the start, then a fall to the end: BounceEaseOut played backwards.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#bounceeasein">`ShapingFunctionId.BounceEaseIn`</a>, number 5 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#bounce">`ShapingFunctionCategory.Bounce`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Bounce EaseIn"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `2` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 1 − BounceEaseOut(1 − x).

It hops to 0.016, 0.0625 and 0.25, touching 0 again at x = 0.09, 0.27 and 0.64, then rises to 1 and ends at full speed. It stays within 0 to 1 but goes back down between the hops.

## Methods

<h3 id="bounceeasein"><span class="method"><code>BounceEaseIn()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#bounce" title="BounceEaseIn() in context on the curves page" aria-label="BounceEaseIn() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/bounce-ease-in/#bounceeasein">`BounceEaseIn()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.BounceEaseIn`.
