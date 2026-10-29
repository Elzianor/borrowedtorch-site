---
layout: docs
legend: [prop, method]
title: "Glossary: BackEaseInOut"
description: "The curve of BackEaseInOut and its constructor."
---

Pulls back 10% below the start, rushes through the middle and overshoots the end by 10% before settling.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#back">`ShapingFunctionCategory.Back`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#back) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/back-ease-in-out.svg' | relative_url }}" width="244" height="348" alt="The curve of BackEaseInOut: pulls back 10% below the start, rushes through the middle and overshoots the end by 10% before settling.">
  <figcaption>Input across, output up. The dashed line is Linear. The dots mark how far the curve overshoots.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#backeaseinout">`ShapingFunctionId.BackEaseInOut`</a>, number 1 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#back">`ShapingFunctionCategory.Back`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Back EaseInOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `3` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is (2x)²((c₂ + 1)·2x − c₂) / 2 for x below 0.5, and ((2x − 2)²((c₂ + 1)(2x − 2) + c₂) + 2) / 2 from 0.5, with c₂ = 1.70158 × 1.525.

It dips to −0.1 at x = 0.24, passes 0.5 at the middle and peaks at 1.1 at x = 0.76. Its constant is its own, so its halves are not BackEaseIn and BackEaseOut squeezed.

## Methods

<h3 id="backeaseinout"><span class="method"><code>BackEaseInOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#back" title="BackEaseInOut() in context on the curves page" aria-label="BackEaseInOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/back-ease-in-out/#backeaseinout">`BackEaseInOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.BackEaseInOut`.
