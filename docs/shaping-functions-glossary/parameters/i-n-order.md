---
layout: docs
legend: [prop]
title: "Glossary: INOrder"
description: "The property of INOrder."
---

Gives a function a settable integer order, N.

An interface, apart from the others: a function can have it with or without A to D. The [parameters page](/docs/shaping-functions-parameters/#parameter-interfaces) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>.

## Properties

<h3 id="n"><span class="prop"><code>N</code></span> <a class="ctx" href="/docs/shaping-functions-parameters/#parameter-interfaces" title="N in context on the parameters page" aria-label="N in context on the parameters page">→</a></h3>

`int` · The order. Each function clamps it to at least 1 when it is set, and works best from 1 to about 10 or 20. 1 by default.

## Functions that have it

| Function | What N is there |
| --- | --- |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/double-odd-polynomial-seat/#n">`DoubleOddPolynomialSeat`</a> | The order: the two halves are powers of 2N + 1, so 1 gives the cubic seat and each higher order a longer, flatter seat. |
| <a class="ref" href="/docs/shaping-functions-glossary/functions/double-polynomial-sigmoid/#n">`DoublePolynomialSigmoid`</a> | The order: the two halves are powers of N. 1 gives Linear, and 2 to 5 the quadratic to quintic in-outs. |
