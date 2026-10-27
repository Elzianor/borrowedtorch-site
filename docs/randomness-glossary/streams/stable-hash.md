---
layout: docs
legend: [method]
title: "Glossary: StableHash"
description: "The methods of StableHash, in alphabetical order."
---

Hashes that are the same on every run, platform and .NET version, unlike `string.GetHashCode()`, which is randomized per process.

A static class. The [seeds and forks page](/docs/randomness-forks/#stable-hashes) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>.

## Methods

<h3 id="combine"><span class="method"><code>Combine()</code></span> <a class="ctx" href="/docs/randomness-forks/#stablehash-methods" title="Combine() in context on the seeds and forks page" aria-label="Combine() in context on the seeds and forks page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#combine">`Combine(ulong a, ulong b)`</a> · Static. A hash of the two numbers, in that order: `Combine(a, b)` and `Combine(b, a)` differ. <a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Rng.Fork`</a> combines the parent's seed with the key, then with the index.

| Parameter | Type | Description |
| --- | --- | --- |
| `a` | `ulong` | The first number, such as a seed. |
| `b` | `ulong` | The second number, such as a key's hash or an index. |

<h3 id="mix"><span class="method"><code>Mix()</code></span> <a class="ctx" href="/docs/randomness-forks/#stablehash-methods" title="Mix() in context on the seeds and forks page" aria-label="Mix() in context on the seeds and forks page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#mix">`Mix(ulong z)`</a> · Static. The SplitMix64 finalizer: spreads the bits of the number, so close inputs give far outputs, and no two inputs give the same output. `Mix(0)` is 0.

| Parameter | Type | Description |
| --- | --- | --- |
| `z` | `ulong` | The number to mix. |

<h3 id="of"><span class="method"><code>Of()</code></span> <a class="ctx" href="/docs/randomness-forks/#stablehash-methods" title="Of() in context on the seeds and forks page" aria-label="Of() in context on the seeds and forks page">→</a></h3>

<a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#of">`Of(string text)`</a> · Static. A hash of the text: FNV-1a 64 over its UTF-16 characters, then <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#mix">`Mix`</a>. Every character and its case count. Throws `ArgumentNullException` for `null`.

| Parameter | Type | Description |
| --- | --- | --- |
| `text` | `string` | The text to hash, such as a fork key or a seed the player typed. |
