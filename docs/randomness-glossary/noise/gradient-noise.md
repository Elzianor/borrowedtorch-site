---
layout: docs
legend: [prop, method]
title: "Glossary: GradientNoise"
description: "The members of GradientNoise, in alphabetical order."
---

One layer of Perlin-style gradient noise from −1 to 1, on cells 1 unit wide, with no state, no table and no period.

A read-only struct: `default(GradientNoise)` is the noise of seed 0. The [noise page](/docs/randomness-noise/#gradient-noise) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="seed"><span class="prop"><code>Seed</code></span> <a class="ctx" href="/docs/randomness-noise/#gradientnoise-properties" title="Seed in context on the noise page" aria-label="Seed in context on the noise page">→</a></h3>

`ulong` · Read-only. The seed the noise was created with.

## Fields

<h3 id="maxcoordinate"><code>MaxCoordinate</code> <a class="ctx" href="/docs/randomness-noise/#gradientnoise-properties" title="MaxCoordinate in context on the noise page" aria-label="MaxCoordinate in context on the noise page">→</a></h3>

`double` · Constant. 2^40, about 1.1 × 10^12: the largest `x` and `y`, either sign, that <a class="ref method" href="/docs/randomness-glossary/noise/gradient-noise/#sample">`Sample`</a> takes. Beyond it a double keeps too few digits after the point for smooth noise.

## Methods

<h3 id="gradientnoise"><span class="method"><code>GradientNoise()</code></span> <a class="ctx" href="/docs/randomness-noise/#gradientnoise-methods" title="GradientNoise() in context on the noise page" aria-label="GradientNoise() in context on the noise page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/noise/gradient-noise/#gradientnoise">`GradientNoise(ulong seed)`</a> · Creates the noise of the seed.

| Parameter | Type | Description |
| --- | --- | --- |
| `seed` | `ulong` | Any value. Different seeds give unrelated fields. |

<h3 id="sample"><span class="method"><code>Sample()</code></span> <a class="ctx" href="/docs/randomness-noise/#gradientnoise-methods" title="Sample() in context on the noise page" aria-label="Sample() in context on the noise page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/noise/gradient-noise/#sample">`Sample(double x, double y)`</a> · The noise at the point, from −1 to 1. 0 at every integer point. The same point gives the same value on every machine. Throws `ArgumentOutOfRangeException` for a coordinate that is `NaN`, infinite or beyond <a class="ref" href="/docs/randomness-glossary/noise/gradient-noise/#maxcoordinate">`MaxCoordinate`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `x` | `double` | The x coordinate, in cells: divide world units by the size of the features you want. |
| `y` | `double` | The y coordinate, in cells. |
