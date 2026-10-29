---
layout: docs
legend: [prop, method]
title: "Glossary: BackEaseOut"
description: "The curve of BackEaseOut and its constructor."
---

Rushes past the end by 10%, then settles back onto it.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#back">`ShapingFunctionCategory.Back`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#back) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/back-ease-out.svg' | relative_url }}" width="244" height="298" alt="The curve of BackEaseOut: rushes past the end by 10%, then settles back onto it.">
  <figcaption>Input across, output up. The dashed line is Linear. The dots mark how far the curve overshoots.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#backeaseout">`ShapingFunctionId.BackEaseOut`</a>, number 2 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#back">`ShapingFunctionCategory.Back`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Back EaseOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `3` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 1 + c₃(x − 1)³ + c₁(x − 1)², with c₁ = 1.70158 and c₃ = c₁ + 1.

It leaves at full speed, passes 1 at x = 0.37, peaks at 1.1 at x = 0.58 and settles back to 1.

## Methods

<h3 id="backeaseout"><span class="method"><code>BackEaseOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#back" title="BackEaseOut() in context on the curves page" aria-label="BackEaseOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/back-ease-out/#backeaseout">`BackEaseOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.BackEaseOut`.
