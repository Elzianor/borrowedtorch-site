---
layout: docs
legend: [prop, method]
title: "Randomness: noise"
description: Gradient and fractal noise, their settings, the range their values really use, thresholds, and the coordinates they accept.
---

Noise gives a smooth value for every point of a plane: close points have close values, far points unrelated ones.
Terrain heights, caves, biomes, ore veins and wind all start from it. Both noise types here are pure functions of their
seed and the point, with no state, no table and no period, so any region of an endless world can be sampled in any
order, from any thread, and gives the same values every time and on every machine. Names are colored by what they
are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep
the plain color.

## Gradient noise

<a class="ref" href="/docs/randomness-glossary/noise/gradient-noise/">`GradientNoise`</a> is one layer of Perlin-style gradient noise. The plane is cut into square cells 1 unit wide,
each corner of a cell gets a direction hashed from the seed and the corner, and <a class="ref method" href="/docs/randomness-glossary/noise/gradient-noise/#sample">`Sample`</a> blends the four
corners of its cell smoothly. The values go from −1 to 1, and are 0 at every integer point. Scale the coordinates to
choose how large the features are:

```csharp
var wind = new GradientNoise(world.Fork("wind").Seed);

double v = wind.Sample(x / 25.0, y / 25.0); // cells 25 units wide
```

<figure class="shot">
  <img src="{{ '/assets/img/randomness/noise-gradient.png' | relative_url }}" width="200" height="200" alt="Soft light and dark blobs, all of about one size">
  <figcaption>One layer, cells 25 pixels wide. Black is −0.6 or less, the lightest gold 0.6 or more.</figcaption>
</figure>

One layer alone looks soft and regular, blobs of about one size. For most terrain, use fractal noise.

`GradientNoise` is a small read-only struct, cheap to copy and to keep in a field. `default(GradientNoise)` is the same
noise as `new GradientNoise(0)`.

### GradientNoise properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/randomness-glossary/noise/gradient-noise/#seed">`Seed`</a> | `ulong` | Read-only. The seed the noise was created with. |
| <a class="ref" href="/docs/randomness-glossary/noise/gradient-noise/#maxcoordinate">`MaxCoordinate`</a> | `double` | Constant. 2^40, the largest `x` and `y`, either sign, that <a class="ref method" href="/docs/randomness-glossary/noise/gradient-noise/#sample">`Sample`</a> takes. |

### GradientNoise methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/randomness-glossary/noise/gradient-noise/#gradientnoise">`GradientNoise(ulong seed)`</a> | Creates the noise of the seed. Any value works, and different seeds give unrelated fields. |
| <a class="ref method" href="/docs/randomness-glossary/noise/gradient-noise/#sample">`Sample(double x, double y)`</a> | The noise at the point, from −1 to 1. 0 at integer points. Throws `ArgumentOutOfRangeException` for a coordinate that is `NaN`, infinite or beyond <a class="ref" href="/docs/randomness-glossary/noise/gradient-noise/#maxcoordinate">`MaxCoordinate`</a>. |

## Fractal noise

<a class="ref" href="/docs/randomness-glossary/noise/fractal-noise/">`FractalNoise`</a> adds up several layers of gradient noise, called octaves, each finer and fainter than the one
before (fractal Brownian motion, or fBm). The first octave sets the large shapes and the others add detail to them. The
sum is scaled to stay from −1 to 1.

```csharp
// FractalSettings.Default: four octaves, features about 32 units across
var height = new FractalNoise(world.Fork("height").Seed);

double h = height.Sample(x, y); // x and y in world units
```

<figure class="shot">
  <img src="{{ '/assets/img/randomness/noise-octaves.png' | relative_url }}" width="836" height="200" alt="Four squares of the same noise: the first soft and blobby, each next one with the same large shapes and finer, rougher detail">
  <figcaption>1, 2, 4 and 6 octaves of one seed, at a frequency of 1/64. More octaves keep the large shapes and add finer detail.</figcaption>
</figure>

Each octave has its own seed and is shifted by a fraction of a cell, so the octaves never share their integer points:
there is no grid of zeros, as there would be with one noise stacked on itself at doubled frequencies. A sample costs one
gradient sample per octave.

`FractalNoise` is immutable and thread-safe: build it once, when the world is made, and sample it from anywhere.

### FractalNoise properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/randomness-glossary/noise/fractal-noise/#seed">`Seed`</a> | `ulong` | Read-only. The seed the noise was created with. Octave `i` is seeded with `StableHash.Combine(Seed, i)`. |
| <a class="ref prop" href="/docs/randomness-glossary/noise/fractal-noise/#settings">`Settings`</a> | <a class="ref" href="/docs/randomness-glossary/noise/fractal-settings/">`FractalSettings`</a> | Read-only. The settings the noise was created with. |
| <a class="ref" href="/docs/randomness-glossary/noise/fractal-noise/#maxoctaves">`MaxOctaves`</a> | `int` | Constant. 16, the most octaves a noise can have. |

### FractalNoise methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/randomness-glossary/noise/fractal-noise/#fractalnoise">`FractalNoise(ulong seed)`</a> | Creates the noise of the seed with <a class="ref prop" href="/docs/randomness-glossary/noise/fractal-settings/#default">`FractalSettings.Default`</a>. |
| <span class="method"><code><a href="/docs/randomness-glossary/noise/fractal-noise/#fractalnoise">FractalNoise</a>(ulong seed, <a href="/docs/randomness-glossary/noise/fractal-settings/">FractalSettings</a> settings)</code></span> | Creates the noise of the seed with those settings. Throws `ArgumentNullException` for `null` settings, and `ArgumentOutOfRangeException` for settings out of range, see [settings](#settings). |
| <a class="ref method" href="/docs/randomness-glossary/noise/fractal-noise/#sample">`Sample(double x, double y)`</a> | The noise at the point in world units, from −1 to 1. Throws `ArgumentOutOfRangeException` for a coordinate that is `NaN` or infinite, or that the highest octave would sample beyond <a class="ref" href="/docs/randomness-glossary/noise/gradient-noise/#maxcoordinate">`GradientNoise.MaxCoordinate`</a>. |

## Settings

<a class="ref" href="/docs/randomness-glossary/noise/fractal-settings/">`FractalSettings`</a> holds the four numbers that shape a fractal noise. It is a record of plain data, so it can sit
in a settings file next to the world seed, and two settings with the same values are equal. Change it with `with`:

```csharp
var settings = FractalSettings.Default with { Frequency = 1.0 / 100, Octaves = 6, Gain = 0.45 };
var mountains = new FractalNoise(world.Fork("mountains").Seed, settings);
```

- **Frequency** sets the size of the large shapes: the cells per world unit of the first octave. 1/32 gives
  features about 32 units across; a higher frequency gives smaller ones.
- **Octaves** sets how much detail there is. Each octave adds a finer layer and costs one more sample.
- **Lacunarity** sets how much finer each octave is than the one before: 2 doubles the frequency each time.
- **Gain** sets how much fainter each octave is than the one before, also called persistence: 0.5 halves it each
  time. Lower is smoother, higher is rougher.

<figure class="shot">
  <img src="{{ '/assets/img/randomness/noise-frequency.png' | relative_url }}" width="624" height="200" alt="Three squares of noise with the same detail, its shapes smaller from left to right">
  <figcaption>A frequency of 1/100, 1/50 and 1/25, with five octaves.</figcaption>
</figure>

<figure class="shot">
  <img src="{{ '/assets/img/randomness/noise-gain.png' | relative_url }}" width="624" height="200" alt="Three squares of noise with the same large shapes, smooth on the left and grainy on the right">
  <figcaption>A gain of 0.3, 0.5 and 0.7, with six octaves at a frequency of 1/64.</figcaption>
</figure>

The <a class="ref" href="/docs/randomness-glossary/noise/fractal-noise/">`FractalNoise`</a> constructor checks the settings, and throws `ArgumentOutOfRangeException` for a frequency,
lacunarity or gain that isn't a finite number above 0, or for octaves outside 1 to <a class="ref" href="/docs/randomness-glossary/noise/fractal-noise/#maxoctaves">`MaxOctaves`</a>.

### FractalSettings properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/randomness-glossary/noise/fractal-settings/#default">`Default`</a> | <a class="ref" href="/docs/randomness-glossary/noise/fractal-settings/">`FractalSettings`</a> | Static. The settings below at their defaults, one shared instance. |
| <a class="ref prop" href="/docs/randomness-glossary/noise/fractal-settings/#frequency">`Frequency`</a> | `double` | Init-only. The cells per world unit of the first octave. `1.0 / 32` by default: features about 32 units across. |
| <a class="ref prop" href="/docs/randomness-glossary/noise/fractal-settings/#octaves">`Octaves`</a> | `int` | Init-only. The number of octaves, 1 to <a class="ref" href="/docs/randomness-glossary/noise/fractal-noise/#maxoctaves">`MaxOctaves`</a>. 4 by default. |
| <a class="ref prop" href="/docs/randomness-glossary/noise/fractal-settings/#lacunarity">`Lacunarity`</a> | `double` | Init-only. The frequency of each octave over that of the one before. 2 by default. |
| <a class="ref prop" href="/docs/randomness-glossary/noise/fractal-settings/#gain">`Gain`</a> | `double` | Init-only. The amplitude of each octave over that of the one before. 0.5 by default. |

## The range in practice

Both noise types return values from −1 to 1, but they rarely come near the ends. Over 200 000 random points:

| Noise | Half of the values within | 90 % within | 98 % within |
| --- | --- | --- | --- |
| `GradientNoise` | ±0.22 | ±0.51 | ±0.66 |
| `FractalNoise`, 4 octaves (the default) | ±0.13 | ±0.31 | ±0.42 |
| `FractalNoise`, 6 octaves | ±0.12 | ±0.30 | ±0.40 |

More octaves narrow the range, because independent layers partly cancel out. The values average about 0, so a test
against 0 opens about half of the plane. Choose thresholds from the table: with the default settings, a test
against 0.8 is almost never true. Where something needs the whole range, such as a color ramp, stretch the values,
for example with `Math.Clamp(v / 0.45, -1, 1)`.

## Thresholds

A threshold turns noise into shapes. Caves are open where the noise is above a value: with the default frequency and
five octaves, above 0.05 opens about 40 % of the cells, in winding pockets. Lower the threshold for more open space,
raise it for less.

```csharp
var caves = new FractalNoise(world.Fork("caves").Seed, FractalSettings.Default with { Octaves = 5 });

for (var y = 0; y < height; y++)
for (var x = 0; x < width; x++)
    map[x, y] = caves.Sample(x, y) > 0.05 ? Tile.Floor : Tile.Rock;
```

<figure class="shot">
  <img src="{{ '/assets/img/randomness/noise-caves.png' | relative_url }}" width="412" height="200" alt="On the left, noise over a square of cells; on the right, the same square with the cells above 0.05 in gold and the rest dark">
  <figcaption>The caves noise over 100 × 100 cells, and the cells above 0.05 as open floor.</figcaption>
</figure>

Several bands of one noise give several kinds of ground, and a second noise with its own fork adds a second axis, such
as moisture next to height:

```csharp
var height = new FractalNoise(world.Fork("height").Seed);
var moisture = new FractalNoise(world.Fork("moisture").Seed);

var h = height.Sample(x, y);
var m = moisture.Sample(x, y);

var biome = h < -0.15 ? Biome.Water
          : h > 0.25 ? Biome.Mountain
          : m > 0.1 ? Biome.Forest
          : Biome.Grass;
```

## Coordinates

<a class="ref method" href="/docs/randomness-glossary/noise/gradient-noise/#sample">`GradientNoise.Sample`</a> takes any coordinates up to <a class="ref" href="/docs/randomness-glossary/noise/gradient-noise/#maxcoordinate">`MaxCoordinate`</a>, 2^40 or about
1.1 × 10^12, either sign. Beyond it, a double keeps too few digits after the point for smooth noise, so `Sample` throws
`ArgumentOutOfRangeException` instead of returning blocky values; it throws for `NaN` and infinities too.

<a class="ref method" href="/docs/randomness-glossary/noise/fractal-noise/#sample">`FractalNoise.Sample`</a> multiplies the coordinates by each octave's frequency, so the limit applies to the
highest octave. With the default settings that octave has a frequency of 1/4, and world coordinates can go to about
4.4 × 10^12. Both limits are far beyond any game world, and integer cell coordinates work as they are.

The noise has no period: it never repeats, however far you go. Noise built on a permutation table repeats every 256
cells; this one hashes every cell from the seed instead.
