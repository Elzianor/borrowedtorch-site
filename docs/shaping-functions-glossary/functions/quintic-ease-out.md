---
layout: docs
legend: [prop, method]
title: "Glossary: QuinticEaseOut"
description: "The curve of QuinticEaseOut and its constructor."
---

The fastest start and the longest, slowest stop of the polynomial eases.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quintic">`ShapingFunctionCategory.Quintic`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#polynomial-curves) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/quintic-ease-out.svg' | relative_url }}" width="244" height="252" alt="The curve of QuinticEaseOut: the fastest start and the longest, slowest stop of the polynomial eases.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#quinticeaseout">`ShapingFunctionId.QuinticEaseOut`</a>, number 37 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quintic">`ShapingFunctionCategory.Quintic`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Quintic EaseOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `5` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 1 − (1 − x)⁵.

It is 0.97 at the middle. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="quinticeaseout"><span class="method"><code>QuinticEaseOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#polynomial-curves" title="QuinticEaseOut() in context on the curves page" aria-label="QuinticEaseOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/quintic-ease-out/#quinticeaseout">`QuinticEaseOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.QuinticEaseOut`.
