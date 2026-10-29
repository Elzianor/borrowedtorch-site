---
layout: docs
legend: [prop, method]
title: "Glossary: ElasticEaseIn"
description: "The curve of ElasticEaseIn and its constructor."
---

Swings about the start, more each time, then snaps to the end: a spring winding up.

A class in the category <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elastic">`ShapingFunctionCategory.Elastic`</a>. It derives from <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> and has its members too: <a class="ref method" href="/docs/shaping-functions-glossary/types/base-shaping-function/#calculateoutput">`CalculateOutput`</a> gives the curve. The [curves page](/docs/shaping-functions-curves/#elastic) shows it in context, with the rest of its family.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## The curve

<figure class="shot">
  <img src="{{ '/assets/img/shaping-functions/functions/elastic-ease-in.svg' | relative_url }}" width="244" height="357" alt="The curve of ElasticEaseIn: swings about the start, more each time, then snaps to the end: a spring winding up.">
  <figcaption>Input across, output up. The dashed line is Linear. The dots mark how far the curve overshoots.</figcaption>
</figure>

| Property | Value |
| --- | --- |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#id">`Id`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#elasticeasein">`ShapingFunctionId.ElasticEaseIn`</a>, number 13 |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#category">`Category`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#elastic">`ShapingFunctionCategory.Elastic`</a> |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#name">`Name`</a> | `"Elastic EaseIn"` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#order">`Order`</a> | `null` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#parametercount">`ParameterCount`</a> | `0` |
| <a class="ref prop" href="/docs/shaping-functions-glossary/types/base-shaping-function/#hasvariableorder">`HasVariableOrder`</a> | `false` |

For an input x from 0 to 1, the output is −2<sup>10x − 10</sup> sin((10x − 10.75)·2π/3), and exactly 0 at x = 0 and 1 at x = 1.

Each swing is nearly three times the last, down to −0.37 at x = 0.87, and the curve snaps up to 1 from there. It is ElasticEaseOut played backwards.

## Methods

<h3 id="elasticeasein"><span class="method"><code>ElasticEaseIn()</code></span> <a class="ctx" href="/docs/shaping-functions-curves/#elastic" title="ElasticEaseIn() in context on the curves page" aria-label="ElasticEaseIn() in context on the curves page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/functions/elastic-ease-in/#elasticeasein">`ElasticEaseIn()`</a> · Creates the curve. <a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`ShapingFunctionFactory.Create`</a> creates the same from `ShapingFunctionId.ElasticEaseIn`.
