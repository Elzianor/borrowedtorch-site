---
layout: docs
legend: [prop, method]
title: "Glossary: Rng"
description: "The members of Rng, in alphabetical order."
---

A seeded PCG32 generator: a stream of numbers that is the same for a seed on every platform and .NET version.

A sealed class. The [random streams page](/docs/randomness-streams/) shows it in context, with code. It isn't thread-safe: give each thread its own [fork](/docs/randomness-forks/#forking).

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="seed"><span class="prop"><code>Seed</code></span> <a class="ctx" href="/docs/randomness/#rng-properties" title="Seed in context on the quick start guide" aria-label="Seed in context on the quick start guide">→</a></h3>

`ulong` · Read-only. The seed the generator was created with. Its forks derive their seeds from it, and `new Rng(rng.Seed)` starts the same stream again from its first number.

## Methods

<h3 id="rng"><span class="method"><code>Rng()</code></span> <a class="ctx" href="/docs/randomness/#rng-constructor" title="Rng() in context on the quick start guide" aria-label="Rng() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#rng">`Rng(ulong seed)`</a> · Creates a PCG32 generator for the seed.

| Parameter | Type | Description |
| --- | --- | --- |
| `seed` | `ulong` | Any value, 0 included. Different seeds give unrelated streams. |

<h3 id="fork"><span class="method"><code>Fork()</code></span> <a class="ctx" href="/docs/randomness-forks/#rng-fork-methods" title="Fork() in context on the seeds and forks page" aria-label="Fork() in context on the seeds and forks page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Fork(string key)`</a> · Returns a new generator seeded by this one's <a class="ref prop" href="/docs/randomness-glossary/streams/rng/#seed">`Seed`</a> and the key. It doesn't draw from this generator, and this generator's draws don't change it: the same key always gives the same stream. Throws `ArgumentNullException` for `null`.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Names the stream, such as `"maze"`. Part of your save format: renaming it changes the stream. |

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Fork(string key, int index)`</a> · The same, with an index for many streams from one key. `Fork("maze", 0)` differs from `Fork("maze")`. Throws `ArgumentNullException` for `null`.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Names the streams, such as `"maze"`. |
| `index` | `int` | Which stream of the key, such as a floor or a chunk coordinate. Negative values work. |

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Fork(ulong keyHash)`</a> · The same as `Fork(string)` with a key already hashed: `Fork(StableHash.Of(key))` equals `Fork(key)`. Hash the key once outside hot loops.

| Parameter | Type | Description |
| --- | --- | --- |
| `keyHash` | `ulong` | The key hashed by <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#of">`StableHash.Of`</a>, or any number of your own. |

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Fork(ulong keyHash, int index)`</a> · The same as `Fork(string, int)` with a key already hashed: `Fork(StableHash.Of(key), index)` equals `Fork(key, index)`.

| Parameter | Type | Description |
| --- | --- | --- |
| `keyHash` | `ulong` | The key hashed by <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#of">`StableHash.Of`</a>, or any number of your own. |
| `index` | `int` | Which stream of the key. Negative values work. |

<h3 id="nextbool"><span class="method"><code>NextBool()</code></span> <a class="ctx" href="/docs/randomness-streams/#rng-number-methods" title="NextBool() in context on the random streams page" aria-label="NextBool() in context on the random streams page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextbool">`NextBool(double probability = 0.5)`</a> · `true` with the probability: never for 0 or less, always for 1 or more. Takes two numbers of the stream whatever the probability. Throws `ArgumentOutOfRangeException` for `NaN`.

| Parameter | Type | Description |
| --- | --- | --- |
| `probability` | `double` | The chance of `true`, from 0 to 1. Default: `0.5`. |

<h3 id="nextdouble"><span class="method"><code>NextDouble()</code></span> <a class="ctx" href="/docs/randomness-streams/#rng-number-methods" title="NextDouble() in context on the random streams page" aria-label="NextDouble() in context on the random streams page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextdouble">`NextDouble()`</a> · A double from 0 to just under 1, with 53 random bits. Takes two numbers of the stream.

<h3 id="nextint"><span class="method"><code>NextInt()</code></span> <a class="ctx" href="/docs/randomness-streams/#rng-number-methods" title="NextInt() in context on the random streams page" aria-label="NextInt() in context on the random streams page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextint">`NextInt(int maxExclusive)`</a> · An integer from 0 to `maxExclusive - 1`, each equally likely (Lemire's multiply and reject, without the bias of `%`). Throws `ArgumentOutOfRangeException` when `maxExclusive` is 0 or less.

| Parameter | Type | Description |
| --- | --- | --- |
| `maxExclusive` | `int` | One more than the largest value. |

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextint">`NextInt(int minInclusive, int maxExclusive)`</a> · An integer from `minInclusive` to `maxExclusive - 1`, each equally likely. Any range of `int` works. Throws `ArgumentOutOfRangeException` when `maxExclusive` isn't greater than `minInclusive`.

| Parameter | Type | Description |
| --- | --- | --- |
| `minInclusive` | `int` | The smallest value. |
| `maxExclusive` | `int` | One more than the largest value. |

<h3 id="nextuint"><span class="method"><code>NextUInt()</code></span> <a class="ctx" href="/docs/randomness-streams/#rng-number-methods" title="NextUInt() in context on the random streams page" aria-label="NextUInt() in context on the random streams page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextuint">`NextUInt()`</a> · The next 32-bit number of the stream, any `uint` equally likely.

<h3 id="pick"><span class="method"><code>Pick()</code></span> <a class="ctx" href="/docs/randomness-streams/#rng-pick-and-shuffle-methods" title="Pick() in context on the random streams page" aria-label="Pick() in context on the random streams page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#pick">`Pick<T>(ReadOnlySpan<T> items)`</a> · An element of the span, each equally likely. Throws `ArgumentException` when it is empty.

| Parameter | Type | Description |
| --- | --- | --- |
| `items` | `ReadOnlySpan<T>` | The elements to pick from. |

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#pick">`Pick<T>(T[] items)`</a> · The same, for an array; picks the same index as the span overload. Throws `ArgumentNullException` for `null` and `ArgumentException` when it is empty.

| Parameter | Type | Description |
| --- | --- | --- |
| `items` | `T[]` | The elements to pick from. |

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#pick">`Pick<T>(IReadOnlyList<T> items)`</a> · The same, for a list such as a `List<T>`; picks the same index as the span overload. Throws `ArgumentNullException` for `null` and `ArgumentException` when it is empty.

| Parameter | Type | Description |
| --- | --- | --- |
| `items` | `IReadOnlyList<T>` | The elements to pick from. |

<h3 id="shuffle"><span class="method"><code>Shuffle()</code></span> <a class="ctx" href="/docs/randomness-streams/#rng-pick-and-shuffle-methods" title="Shuffle() in context on the random streams page" aria-label="Shuffle() in context on the random streams page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#shuffle">`Shuffle<T>(Span<T> items)`</a> · Puts the elements in a random order, in place, with a Fisher–Yates shuffle: every order is equally likely.

| Parameter | Type | Description |
| --- | --- | --- |
| `items` | `Span<T>` | The elements to shuffle. |

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#shuffle">`Shuffle<T>(T[] items)`</a> · The same, for an array, in the same order as the span overload. Throws `ArgumentNullException` for `null`.

| Parameter | Type | Description |
| --- | --- | --- |
| `items` | `T[]` | The elements to shuffle. |

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#shuffle">`Shuffle<T>(IList<T> items)`</a> · The same, for a list, in the same order as the span overload. Throws `ArgumentNullException` for `null`.

| Parameter | Type | Description |
| --- | --- | --- |
| `items` | `IList<T>` | The elements to shuffle. |
