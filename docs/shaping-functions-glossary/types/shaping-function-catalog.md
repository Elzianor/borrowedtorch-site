---
layout: docs
legend: [method]
title: "Glossary: ShapingFunctionCatalog"
description: "The methods of ShapingFunctionCatalog, in alphabetical order."
---

Lists the categories and the functions of the library, for a picker.

A static class. The [catalog page](/docs/shaping-functions-catalog/#shapingfunctioncatalog-methods) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>.

## Methods

<h3 id="getcategories"><span class="method"><code>GetCategories()</code></span> <a class="ctx" href="/docs/shaping-functions-catalog/#shapingfunctioncatalog-methods" title="GetCategories() in context on the catalog page" aria-label="GetCategories() in context on the catalog page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-catalog/#getcategories">`GetCategories()`</a> · Static. Every category that has functions, as an `IReadOnlyCollection<ShapingFunctionCategory>`, in the order the enum declares them: Back, Bezier, Bounce and so on to Sine. <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#custom">`Custom`</a> isn't among them. The same collection every call.

<h3 id="getfunctions"><span class="method"><code>GetFunctions()</code></span> <a class="ctx" href="/docs/shaping-functions-catalog/#shapingfunctioncatalog-methods" title="GetFunctions() in context on the catalog page" aria-label="GetFunctions() in context on the catalog page">→</a></h3>

<a class="ref method" href="/docs/shaping-functions-glossary/types/shaping-function-catalog/#getfunctions">`GetFunctions(ShapingFunctionCategory category)`</a> · Static. The IDs of the category's functions, as an `IReadOnlyList<ShapingFunctionId>`, in the order the enum declares them. Throws `ArgumentOutOfRangeException` for <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/#custom">`Custom`</a> and for a value the enum doesn't define.

| Parameter | Type | Description |
| --- | --- | --- |
| `category` | <a class="ref" href="/docs/shaping-functions-glossary/types/shaping-function-category/">`ShapingFunctionCategory`</a> | One of the categories <a class="ref method" href="#getcategories">`GetCategories`</a> lists. |
