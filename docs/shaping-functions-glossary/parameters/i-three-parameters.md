---
layout: docs
legend: [prop]
title: "Glossary: IThreeParameters"
description: "The property of IThreeParameters."
---

Adds the third parameter, C, to A and B.

An interface. It extends <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-two-parameters/">`ITwoParameters`</a>, so a function that has it has A and B too. No function of the library takes exactly three parameters: only <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-cubic/">`BezierCubic`</a> has it, through <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-four-parameters/">`IFourParameters`</a>. The [parameters page](/docs/shaping-functions-parameters/#parameter-interfaces) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>.

## Properties

<h3 id="c"><span class="prop"><code>C</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#parameter-interfaces" title="C in context on the parameters page" aria-label="C in context on the parameters page">→</a></h3>

`float` · Each function clamps it to its range when it is set: 0 to 1 for every function that has it. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had. At the bottom of its range by default.

## Functions that have it

| Function | What C is there |
| --- | --- |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-cubic/#c">`BezierCubic`</a> | The x of the second control point, the one the curve comes into (1, 1) from. |
