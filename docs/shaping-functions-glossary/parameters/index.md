---
layout: docs
title: "Shaping functions glossary: parameters"
description: "The interfaces that give a function its parameters A to D and its order N, one page each."
---

A function with parameters implements one of these interfaces, so code can set the parameters without knowing the function's class. A to D are `float`; N is an `int`.

| Type | What it is |
| --- | --- |
| [`IOneParameter`](/docs/shaping-functions-glossary/parameters/i-one-parameter/) | Gives a function its first parameter, A. |
| [`ITwoParameters`](/docs/shaping-functions-glossary/parameters/i-two-parameters/) | Adds the second parameter, B, to A. |
| [`IThreeParameters`](/docs/shaping-functions-glossary/parameters/i-three-parameters/) | Adds the third parameter, C, to A and B. |
| [`IFourParameters`](/docs/shaping-functions-glossary/parameters/i-four-parameters/) | Adds the fourth parameter, D, to A, B and C. |
| [`INOrder`](/docs/shaping-functions-glossary/parameters/i-n-order/) | Gives a function a settable integer order, N. |
