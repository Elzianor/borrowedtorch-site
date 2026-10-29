---
layout: docs
legend: [prop, method]
title: "Glossary: ElasticEaseOut"
description: "The curve of ElasticEaseOut and its constructor."
---

Snaps past the end by 37% and wobbles to rest on it, like a released spring.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elastic">`ShapingFunctionCategory.Elastic`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#elastic) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/elastic-ease-out.svg' | relative_url }}" width="244" height="353" alt="The curve of ElasticEaseOut: snaps past the end by 37% and wobbles to rest on it, like a released spring.">
  <figcaption>Input across, output up. The dashed line is Linear. The dots mark how far the curve overshoots.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#elasticeaseout">`ShapingFunctionId.ElasticEaseOut`</a>, number 15 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elastic">`ShapingFunctionCategory.Elastic`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Elastic EaseOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is 2<sup>−10x</sup> sin((10x − 0.75)·2π/3) + 1, and exactly 0 at x = 0 and 1 at x = 1.

It overshoots to 1.37 at x = 0.13, swings back to 0.87 at x = 0.28 and to 1.05 at x = 0.43, and each swing after is about a third of the last.

## Methods

<h3 id="elasticeaseout"><span class="method"><code>ElasticEaseOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#elastic" title="ElasticEaseOut() in context on the curves page" aria-label="ElasticEaseOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/elastic-ease-out/#elasticeaseout">`ElasticEaseOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.ElasticEaseOut`.
