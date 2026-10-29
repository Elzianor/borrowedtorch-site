---
layout: docs
legend: [prop, method]
title: "Glossary: QuinticEaseIn"
description: "The curve of QuinticEaseIn and its constructor."
---

x⁵: the longest, slowest start of the polynomial eases.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quintic">`ShapingFunctionCategory.Quintic`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#polynomial-curves) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/quintic-ease-in.svg' | relative_url }}" width="244" height="252" alt="The curve of QuinticEaseIn: x⁵: the longest, slowest start of the polynomial eases.">
  <figcaption>Input across, output up. The dashed line is Linear.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#quinticeasein">`ShapingFunctionId.QuinticEaseIn`</a>, number 35 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#quintic">`ShapingFunctionCategory.Quintic`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Quintic EaseIn"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `5` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is x⁵.

It is 0.03 at the middle and ends at five times the speed of Linear. It stays within 0 to 1 and never goes back.

## Methods

<h3 id="quinticeasein"><span class="method"><code>QuinticEaseIn()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#polynomial-curves" title="QuinticEaseIn() in context on the curves page" aria-label="QuinticEaseIn() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/quintic-ease-in/#quinticeasein">`QuinticEaseIn()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.QuinticEaseIn`.
