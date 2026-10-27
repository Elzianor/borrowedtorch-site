---
layout: docs
legend: [prop, method]
title: "Glossary: FractalNoise"
description: "The members of FractalNoise, in alphabetical order."
---

Several octaves of gradient noise, each finer and fainter than the one before, summed to a value from −1 to 1 (fractal Brownian motion).

A sealed class, immutable and thread-safe. The [noise page](/docs/randomness-noise/#fractal-noise) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="seed"><span class="prop"><code>Seed</code></span> <a class="ctx" href="/docs/randomness-noise/#fractalnoise-properties" title="Seed in context on the noise page" aria-label="Seed in context on the noise page">→</a></h3>

`ulong` · Read-only. The seed the noise was created with. Octave `i` is a <a class="ref" href="/docs/randomness-glossary/noise/gradient-noise/">`GradientNoise`</a> seeded with `StableHash.Combine(Seed, i)`, shifted by a fraction of a cell.

<h3 id="settings"><span class="prop"><code>Settings</code></span> <a class="ctx" href="/docs/randomness-noise/#fractalnoise-properties" title="Settings in context on the noise page" aria-label="Settings in context on the noise page">→</a></h3>

<a class="ref" href="/docs/randomness-glossary/noise/fractal-settings/">`FractalSettings`</a> · Read-only. The settings the noise was created with.

## Fields

<h3 id="maxoctaves"><code>MaxOctaves</code> <a class="ctx" href="/docs/randomness-noise/#fractalnoise-properties" title="MaxOctaves in context on the noise page" aria-label="MaxOctaves in context on the noise page">→</a></h3>

`int` · Constant. 16, the most octaves a noise can have.

## Methods

<h3 id="fractalnoise"><span class="method"><code>FractalNoise()</code></span> <a class="ctx" href="/docs/randomness-noise/#fractalnoise-methods" title="FractalNoise() in context on the noise page" aria-label="FractalNoise() in context on the noise page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/noise/fractal-noise/#fractalnoise">`FractalNoise(ulong seed)`</a> · Creates the noise of the seed with <a class="ref prop" href="/docs/randomness-glossary/noise/fractal-settings/#default">`FractalSettings.Default`</a>: four octaves, features about 32 units across.

| Parameter | Type | Description |
| --- | --- | --- |
| `seed` | `ulong` | Any value. Different seeds give unrelated fields. |

<span class="method"><code><a href="/docs/randomness-glossary/noise/fractal-noise/#fractalnoise">FractalNoise</a>(ulong seed, <a href="/docs/randomness-glossary/noise/fractal-settings/">FractalSettings</a> settings)</code></span> · Creates the noise of the seed with those settings. Throws `ArgumentNullException` for `null` settings, and `ArgumentOutOfRangeException` for a frequency, lacunarity or gain that isn't a finite number above 0, or for octaves outside 1 to <a class="ref" href="/docs/randomness-glossary/noise/fractal-noise/#maxoctaves">`MaxOctaves`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `seed` | `ulong` | Any value. Different seeds give unrelated fields. |
| `settings` | <a class="ref" href="/docs/randomness-glossary/noise/fractal-settings/">`FractalSettings`</a> | The frequency, octaves, lacunarity and gain. |

<h3 id="sample"><span class="method"><code>Sample()</code></span> <a class="ctx" href="/docs/randomness-noise/#fractalnoise-methods" title="Sample() in context on the noise page" aria-label="Sample() in context on the noise page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/noise/fractal-noise/#sample">`Sample(double x, double y)`</a> · The noise at the point, from −1 to 1; most values are much closer to 0, see [the range in practice](/docs/randomness-noise/#the-range-in-practice). The same point gives the same value on every machine. Throws `ArgumentOutOfRangeException` for a coordinate that is `NaN` or infinite, or that the highest octave would sample beyond <a class="ref" href="/docs/randomness-glossary/noise/gradient-noise/#maxcoordinate">`GradientNoise.MaxCoordinate`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `x` | `double` | The x coordinate, in world units. |
| `y` | `double` | The y coordinate, in world units. |
