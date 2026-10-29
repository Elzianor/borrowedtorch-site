---
layout: docs
title: "Shaping functions glossary: types"
description: "The base class of the functions, the factory, the catalog and the two enums, one page per type."
---

The types around the functions: the class they all derive from, how to create them, how to list them, and the IDs and categories that name them.

## Classes

| Type | What it is |
| --- | --- |
| [`BaseShapingFunction`](/docs/shaping-functions-glossary/types/base-shaping-function/) | The base of every function: the curve, and what the function says about itself. |
| [`ShapingFunctionCatalog`](/docs/shaping-functions-glossary/types/shaping-function-catalog/) | Lists the categories and the functions in each, for a picker. |
| [`ShapingFunctionFactory`](/docs/shaping-functions-glossary/types/shaping-function-factory/) | Creates a function from its ID. |

## Enums

| Type | What it is |
| --- | --- |
| [`ShapingFunctionCategory`](/docs/shaping-functions-glossary/types/shaping-function-category/) | The family of a function: Back, Bezier, Bounce and so on. Safe to save. |
| [`ShapingFunctionId`](/docs/shaping-functions-glossary/types/shaping-function-id/) | Names each function of the library. Safe to save. |
