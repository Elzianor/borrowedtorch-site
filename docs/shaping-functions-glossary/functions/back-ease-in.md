---
layout: docs
legend: [prop, method]
title: "Glossary: BackEaseIn"
description: "The curve of BackEaseIn and its constructor."
---

Pulls back below the start by 10%, then speeds up to the end.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#back">`ShapingFunctionCategory.Back`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#back) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/back-ease-in.svg' | relative_url }}" width="244" height="302" alt="The curve of BackEaseIn: pulls back below the start by 10%, then speeds up to the end.">
  <figcaption>Input across, output up. The dashed line is Linear. The dots mark how far the curve overshoots.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#backeasein">`ShapingFunctionId.BackEaseIn`</a>, number 0 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#back">`ShapingFunctionCategory.Back`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Back EaseIn"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `3` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is c₃x³ − c₁x², with c₁ = 1.70158 and c₃ = c₁ + 1.

It dips to −0.1 at x = 0.42, is back at 0 at x = 0.63 and ends at full speed. It is BackEaseOut played backwards.

## Methods

<h3 id="backeasein"><span class="method"><code>BackEaseIn()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#back" title="BackEaseIn() in context on the curves page" aria-label="BackEaseIn() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/back-ease-in/#backeasein">`BackEaseIn()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.BackEaseIn`.
