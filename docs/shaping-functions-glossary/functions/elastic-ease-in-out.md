---
layout: docs
legend: [prop, method]
title: "Glossary: ElasticEaseInOut"
description: "The curve of ElasticEaseInOut and its constructor."
---

Winds up about the start, snaps across the middle and wobbles to rest on the end.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elastic">`ShapingFunctionCategory.Elastic`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#elastic) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/elastic-ease-in-out.svg' | relative_url }}" width="244" height="355" alt="The curve of ElasticEaseInOut: winds up about the start, snaps across the middle and wobbles to rest on the end.">
  <figcaption>Input across, output up. The dashed line is Linear. The dots mark how far the curve overshoots.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#elasticeaseinout">`ShapingFunctionId.ElasticEaseInOut`</a>, number 14 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elastic">`ShapingFunctionCategory.Elastic`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Elastic EaseInOut"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is −2<sup>20x − 10</sup> sin((20x − 11.125)·2π/4.5) / 2 for x below 0.5, and 2<sup>10 − 20x</sup> sin((20x − 11.125)·2π/4.5) / 2 + 1 from 0.5, and exactly 0 and 1 at the ends.

It dips to −0.12 at x = 0.40 and overshoots to 1.12 at x = 0.60, with smaller swings before and after. Its period is its own, so its halves are not ElasticEaseIn and ElasticEaseOut squeezed.

## Methods

<h3 id="elasticeaseinout"><span class="method"><code>ElasticEaseInOut()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#elastic" title="ElasticEaseInOut() in context on the curves page" aria-label="ElasticEaseInOut() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/elastic-ease-in-out/#elasticeaseinout">`ElasticEaseInOut()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.ElasticEaseInOut`.
