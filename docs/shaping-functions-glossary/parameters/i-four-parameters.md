---
layout: docs
legend: [prop]
title: "Glossary: IFourParameters"
description: "The property of IFourParameters."
---

Adds the fourth parameter, D, to A, B and C.

An interface. It extends <a class="ref" href="/docs/shaping-functions-glossary/parameters/i-three-parameters/">`IThreeParameters`</a>, so a function that has it has A, B and C too. The [parameters page](/docs/shaping-functions-parameters/#parameter-interfaces) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>.

## Properties

<h3 id="d"><span class="prop"><code>D</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#parameter-interfaces" title="D in context on the parameters page" aria-label="D in context on the parameters page">→</a></h3>

`float` · Each function clamps it to its range when it is set: 0 to 1 for every function that has it. Throws `ArgumentOutOfRangeException` for `NaN` and keeps the value it had. At the bottom of its range by default.

## Functions that have it

| Function | What D is there |
| --- | --- |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/bezier-cubic/#d">`BezierCubic`</a> | The y of the second control point. |
