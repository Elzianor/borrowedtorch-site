---
layout: docs
legend: [prop]
title: "Glossary: FractalSettings"
description: "The properties of FractalSettings, in alphabetical order."
---

The frequency, octaves, lacunarity and gain of a <a class="ref" href="/docs/randomness-glossary/noise/fractal-noise/">`FractalNoise`</a>.

A sealed record: plain data that can sit in a settings file, equal to any other settings with the same values, and changed with `with`, as in `FractalSettings.Default with { Octaves = 6 }`. The [noise page](/docs/randomness-noise/#settings) shows it in context, with pictures.

Names are colored by what they are: a <span class="kb kb-prop">property</span>.

## Properties

<h3 id="default"><span class="prop"><code>Default</code></span> <a class="ctx" href="/docs/randomness-noise/#fractalsettings-properties" title="Default in context on the noise page" aria-label="Default in context on the noise page">→</a></h3>

<a class="ref" href="/docs/randomness-glossary/noise/fractal-settings/">`FractalSettings`</a> · Static. The settings at their defaults, one shared instance: a frequency of 1/32, four octaves, a lacunarity of 2 and a gain of 0.5. `new FractalSettings()` is equal to it.

<h3 id="frequency"><span class="prop"><code>Frequency</code></span> <a class="ctx" href="/docs/randomness-noise/#fractalsettings-properties" title="Frequency in context on the noise page" aria-label="Frequency in context on the noise page">→</a></h3>

`double` · Init-only. The cells per world unit of the first octave, which sets the size of the large shapes: 1/32 gives features about 32 units across. `1.0 / 32` by default. Must be a finite number above 0.

<h3 id="gain"><span class="prop"><code>Gain</code></span> <a class="ctx" href="/docs/randomness-noise/#fractalsettings-properties" title="Gain in context on the noise page" aria-label="Gain in context on the noise page">→</a></h3>

`double` · Init-only. The amplitude of each octave over that of the one before, also called persistence. Lower is smoother, higher is rougher. 0.5 by default. Must be a finite number above 0.

<h3 id="lacunarity"><span class="prop"><code>Lacunarity</code></span> <a class="ctx" href="/docs/randomness-noise/#fractalsettings-properties" title="Lacunarity in context on the noise page" aria-label="Lacunarity in context on the noise page">→</a></h3>

`double` · Init-only. The frequency of each octave over that of the one before: 2 doubles it each time. 2 by default. Must be a finite number above 0.

<h3 id="octaves"><span class="prop"><code>Octaves</code></span> <a class="ctx" href="/docs/randomness-noise/#fractalsettings-properties" title="Octaves in context on the noise page" aria-label="Octaves in context on the noise page">→</a></h3>

`int` · Init-only. The number of octaves, 1 to <a class="ref" href="/docs/randomness-glossary/noise/fractal-noise/#maxoctaves">`FractalNoise.MaxOctaves`</a>. Each adds finer detail and costs one more sample. 4 by default.
