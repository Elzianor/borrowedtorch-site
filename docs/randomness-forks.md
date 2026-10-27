---
layout: docs
legend: [prop, method]
title: "Randomness: seeds and forks"
description: One stream per system from one world seed, fork keys and indexes, pre-hashed keys, seeds typed as text, stable hashes, and keys as part of the save format.
---

A world has one seed, and every system that draws numbers forks its own stream from it. This page covers how forks
are made, how to key them, and how to keep them stable as the game changes. Names are colored by what they are: a
<span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>.

## Why fork

One stream shared by every system ties them together. If the loot draws after the maze, a maze that takes one more
number moves every chest, and a new feature that draws a number breaks every saved world after it.
<a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Fork`</a> gives each system a stream of its own, made from the world's seed and a key alone.

<figure class="shot">
  <img src="{{ '/assets/img/randomness/fork-tree.svg' | relative_url }}" width="640" height="200" alt="A world generator forks four streams: the maze of floor 1, the maze of floor 2, the loot, and a seed for the caves noise; each fork comes straight from the world's seed">
  <figcaption>The forks of a world. Each is made from the world's seed and its key, not from the world's numbers.</figcaption>
</figure>

## Forking

`Fork(key)` returns a new <a class="ref" href="/docs/randomness-glossary/streams/rng/">`Rng`</a> whose seed is a hash of the parent's <a class="ref prop" href="/docs/randomness-glossary/streams/rng/#seed">`Seed`</a> and the key. Only those
two count:

- **The parent's draws don't matter.** Forking before or after the parent draws gives the same stream, and forking
  doesn't draw from the parent.
- **The same key gives the same stream.** Two forks with one key are two generators that start at the same number.
  They don't share state: drawing from one doesn't move the other.
- **Different keys give unrelated streams**, and so do different parents.

`Fork(key, index)` makes many streams from one key: one per floor, per level, per chunk or per character id. The
index can be negative, so coordinates work as they are. `Fork("maze", 0)` is not the same stream as `Fork("maze")`.

```csharp
var world = new Rng(worldSeed);

var a = world.Fork("maze");
world.NextUInt();               // the parent's draws don't matter:
var b = world.Fork("maze");     // b starts at the same number as a

var floor1 = world.Fork("maze", 1);
var floor2 = world.Fork("maze", 2);

// forks of forks make a path: world / dungeon / shops / floor
var dungeon = world.Fork("dungeon");
var shops = dungeon.Fork("shops", floor);
```

## Chunks and grids

A fork takes one index. For a grid of streams, such as one per chunk of an endless map, fork twice:

```csharp
var chunkRng = world.Fork("chunk", chunkX).Fork("chunk", chunkY);
```

Chunk (2, 5) and chunk (5, 2) get different streams. Each chunk's stream is the same whichever chunks were built
before it, so the player can walk the map in any order.

## Seeds from forks

The <a class="ref prop" href="/docs/randomness-glossary/streams/rng/#seed">`Seed`</a> of a fork seeds anything else that takes a `ulong`, the noise types first:

```csharp
var caves = new FractalNoise(world.Fork("caves").Seed);
var wind = new GradientNoise(world.Fork("wind").Seed);
```

`new Rng(fork.Seed)` is the fork again, from its first number. Store a fork's seed when something must be rebuilt
without its parent, such as a level shared on its own.

## Pre-hashed keys

`Fork(string)` hashes its key on every call, character by character. In a hot loop, hash the key once with
<a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#of">`StableHash.Of`</a> and pass the hash: `Fork(StableHash.Of(key), index)` is the same stream as
`Fork(key, index)`.

```csharp
private static readonly ulong ChunkKey = StableHash.Of("chunk");

for (var i = 0; i < chunkCount; i++)
{
    var chunkRng = world.Fork(ChunkKey, i); // the same stream as world.Fork("chunk", i)
    BuildChunk(i, chunkRng);
}
```

## Seeds typed as text

A seed the player types goes through <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#of">`StableHash.Of`</a>, which gives the same number for the same text on every
run and every machine. Never seed from `string.GetHashCode()`: it is randomized per process, so the same text would
make a different world each time the game starts.

```csharp
// "12345" is the number 12345; any other text is hashed
ulong worldSeed = ulong.TryParse(seedText, out var number) ? number : StableHash.Of(seedText.Trim());

var world = new Rng(worldSeed);
```

The hash counts every character and its case: `"Ember"`, `"ember"` and `"Ember "` are three worlds. Trim, or change
the case, before hashing if they should be one.

## Stable hashes

<a class="ref" href="/docs/randomness-glossary/streams/stable-hash/">`StableHash`</a> has the three hashes the forks are built from, for keys of your own:

- <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#of">`Of(text)`</a> hashes a string: FNV-1a 64 over its UTF-16 characters, then mixed.
- <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#combine">`Combine(a, b)`</a> hashes two numbers into one. The order counts: `Combine(a, b)` and
  `Combine(b, a)` differ.
- <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#mix">`Mix(z)`</a> spreads the bits of one number (the SplitMix64 finalizer): close inputs give far outputs, and
  no two inputs give the same output. `Mix(0)` is 0.

Forks are these hashes and nothing more. `Fork(key)` is `new Rng(StableHash.Combine(Seed, StableHash.Of(key)))`, and
`Fork(key, index)` combines that once more with the index, so an editor or a server that has the package can rebuild
any stream from the world seed and the keys alone.

```csharp
// an index wider than int: a stream per item, from its 64-bit id
var itemKey = StableHash.Combine(StableHash.Of("item"), (ulong)itemId);
var itemRng = world.Fork(itemKey);
```

## Keys are part of the save format

A saved world is its seed plus the code that builds it from that seed. The package never changes its numbers, so a
world changes only when that code does:

- **Keep the keys as constants**, in one place, where nobody renames them by accident. Renaming or retyping a key
  changes everything built from it, for every saved seed.
- **A new fork is safe.** Adding a system with its own key changes no other stream.
- **The draws within a stream are part of the format.** One more draw early in the maze stream changes the rest of
  that maze. Give a new feature its own fork instead of new draws in an old stream.
- **Noise settings are too.** A different frequency or octave count is a different landscape.

```csharp
public static class SeedKeys
{
    // never rename these: saved worlds are built from them
    public const string Maze = "maze";
    public const string Loot = "loot";
    public const string Caves = "caves";
}
```

### Rng fork methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Fork(string key)`</a> | A new generator seeded by the parent's <a class="ref prop" href="/docs/randomness-glossary/streams/rng/#seed">`Seed`</a> and the key. Doesn't draw from the parent. Throws `ArgumentNullException` for `null`. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Fork(string key, int index)`</a> | The same, with an index for many streams from one key. Throws `ArgumentNullException` for `null`. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Fork(ulong keyHash)`</a> | The same with a key hashed by <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#of">`StableHash.Of`</a>: `Fork(StableHash.Of(key))` equals `Fork(key)`. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Fork(ulong keyHash, int index)`</a> | The same with an index: `Fork(StableHash.Of(key), index)` equals `Fork(key, index)`. |

### StableHash methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#of">`Of(string text)`</a> | Static. A hash of the text that is the same on every run, platform and .NET version. Throws `ArgumentNullException` for `null`. |
| <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#combine">`Combine(ulong a, ulong b)`</a> | Static. A hash of the two numbers, in that order. |
| <a class="ref method" href="/docs/randomness-glossary/streams/stable-hash/#mix">`Mix(ulong z)`</a> | Static. The SplitMix64 finalizer: spreads the bits, and no two inputs give the same output. |
