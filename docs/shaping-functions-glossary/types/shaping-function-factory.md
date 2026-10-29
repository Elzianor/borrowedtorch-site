---
layout: docs
legend: [method]
title: "Glossary: ShapingFunctionFactory"
description: "The method of ShapingFunctionFactory."
---

Creates a function from its ID.

A static class. The [catalog page](/docs/shaping-functions-catalog/#shapingfunctionfactory-method) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>.

## Methods

<h3 id="create"><span class="method"><code>Create()</code></span> <a class="ctx" href="/docs/shaping-functions-catalog/#shapingfunctionfactory-method" title="Create() in context on the catalog page" aria-label="Create() in context on the catalog page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-factory/#create">`Create(ShapingFunctionId id)`</a> · Static. A new instance of the function, as a <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a>, with its parameters at their defaults. A new object every call, so setting the parameters of one never changes another. Throws `ArgumentOutOfRangeException` for <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/#custom">`Custom`</a> and for a value the enum doesn't define.

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-id/">`ShapingFunctionId`</a> | The function to create. |
