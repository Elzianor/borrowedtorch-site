---
layout: docs
legend: [method]
title: "Randomness: random streams"
description: Integers, doubles and chances from an Rng, numbers in a range, how many numbers a call takes, picking, shuffling, and streams on several threads.
---

An <a class="ref" href="/docs/randomness-glossary/streams/rng/">`Rng`</a> is a stream of numbers: each call takes the next ones. It is a PCG32 generator, small (two 64-bit
numbers of state), fast, and of good statistical quality for games. The same seed gives the same stream on every
machine, unlike `System.Random`, whose seeded sequence isn't guaranteed from one .NET version to the next. Names are
colored by what they are: a <span class="kb kb-method">method</span>.

## Integers

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextuint">`NextUInt`</a> returns all 32 bits of the next number. <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextint">`NextInt`</a> returns an integer in a range
whose upper end is excluded, the way `for` loops and array indexes count: `NextInt(10)` is 0 to 9, and a die is
`NextInt(1, 7)`.

```csharp
var rng = new Rng(seed);

uint bits = rng.NextUInt();      // any of the 2^32 values
int index = rng.NextInt(10);     // 0 to 9
int roll = rng.NextInt(1, 7);    // a die: 1 to 6
int offset = rng.NextInt(-3, 4); // -3 to 3
```

Every value of the range is equally likely. `NextInt` uses Lemire's multiply and reject instead of `%`, so a range that
doesn't divide 2^32 evenly, which is almost every range, has no bias toward its low values. Any range of `int` works, up to
`NextInt(int.MinValue, int.MaxValue)`; an empty one throws `ArgumentOutOfRangeException`.

## Doubles and chances

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextdouble">`NextDouble`</a> returns a double from 0 to just under 1, with all 53 bits of its precision random.
<a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextbool">`NextBool`</a> is true with a probability: one time in two by default, never for 0 or less, always for 1 or
more.

```csharp
double t = rng.NextDouble();    // 0 to just under 1
bool heads = rng.NextBool();    // a coin flip
bool crit = rng.NextBool(0.15); // true 15 % of the time

// a number in a range: scale NextDouble yourself
var speed = 2.5 + rng.NextDouble() * (4.0 - 2.5); // 2.5 to just under 4
var angle = rng.NextDouble() * Math.Tau;           // a direction, in radians
```

There is no `NextFloat`: cast the scaled double, `(float)(min + rng.NextDouble() * (max - min))`. The cast can round a
value just under `max` up to `max` itself, so test with `<=` where it matters.

## How many numbers a call takes

A stream is a sequence, and every call moves along it. A number depends on every call made before it in the same stream:

| Call | Takes |
| --- | --- |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextuint">`NextUInt()`</a> | One 32-bit number. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextint">`NextInt`</a> | One, and once in a while one more: a draw that would bias the range is rejected and drawn again. The smaller the range, the rarer that is. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextdouble">`NextDouble()`</a>, <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextbool">`NextBool`</a> | Two. `NextBool` draws even for a probability of 0 or 1, so changing a chance changes only that outcome, never the numbers after it. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#pick">`Pick`</a> | What `NextInt` takes for the length of the list. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#shuffle">`Shuffle`</a> | What `NextInt` takes, once per element but the first. |

So a draw that happens only sometimes, such as `if (chest) rng.NextInt(...)`, shifts every number after it. That is
fine inside one system, but two systems sharing a stream would move each other's results: give each its own
[fork](/docs/randomness-forks/#why-fork).

## Picking

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#pick">`Pick`</a> returns an element of an array, a span or any `IReadOnlyList<T>`, each equally likely. A `List<T>`
is an `IReadOnlyList<T>`, and for the same seed every overload picks the same index.

```csharp
string[] names = ["Ash", "Ember", "Cinder", "Flint"];
var name = rng.Pick(names);

List<(int X, int Y)> rooms = FindRooms(map);
var bossRoom = rng.Pick(rooms);
```

An empty collection throws `ArgumentException`, and `null` throws `ArgumentNullException`: check for an empty list
when it can be empty.

For a pick with weights, scale one <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextdouble">`NextDouble`</a> by the sum of the weights and walk the table:

```csharp
(string Item, double Weight)[] table = [("Copper", 70), ("Silver", 25), ("Gold", 5)];

var total = 0.0;
foreach (var entry in table) total += entry.Weight;

var target = rng.NextDouble() * total;
var item = table[^1].Item;

foreach (var entry in table)
{
    if (target < entry.Weight)
    {
        item = entry.Item;
        break;
    }

    target -= entry.Weight;
}
```

## Shuffling

<a class="ref method" href="/docs/randomness-glossary/streams/rng/#shuffle">`Shuffle`</a> puts the elements of an array, a span or any `IList<T>` in a random order, in place, with a
Fisher–Yates shuffle: every order is equally likely. For the same seed, every overload gives the same order.

```csharp
var deck = Enumerable.Range(0, 52).ToArray();
rng.Shuffle(deck);

// several picks without repeats: shuffle, then take from the front
var spawns = new List<(int X, int Y)>(spawnPoints);
rng.Shuffle(spawns);
var firstWave = spawns.Take(5);
```

## Threads

An `Rng` isn't thread-safe. Two threads drawing from one would race on its state, and even behind a lock the order in
which they take numbers would change from run to run, and the world with it. Give each job its own fork instead, keyed
by what the job builds, not by the thread that runs it:

```csharp
var world = new Rng(worldSeed);
var chunkKey = StableHash.Of("chunk");

Parallel.For(0, chunkCount, i =>
{
    // the same stream for chunk i, whichever thread builds it and whenever
    var chunkRng = world.Fork(chunkKey, i);
    BuildChunk(i, chunkRng);
});
```

Forking only reads the parent's <a class="ref prop" href="/docs/randomness-glossary/streams/rng/#seed">`Seed`</a>, which never changes, so any number of threads can fork one parent
at once. The noise types are immutable and can be sampled from any thread.

### Rng number methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextuint">`NextUInt()`</a> | The next 32-bit number, any `uint` equally likely. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextint">`NextInt(int maxExclusive)`</a> | An integer from 0 to `maxExclusive - 1`, each equally likely. Throws `ArgumentOutOfRangeException` when `maxExclusive` is 0 or less. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextint">`NextInt(int minInclusive, int maxExclusive)`</a> | An integer from `minInclusive` to `maxExclusive - 1`, each equally likely. Throws `ArgumentOutOfRangeException` when `maxExclusive` isn't greater than `minInclusive`. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextdouble">`NextDouble()`</a> | A double from 0 to just under 1, with 53 random bits. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#nextbool">`NextBool(double probability = 0.5)`</a> | `true` with the probability: never for 0 or less, always for 1 or more. Throws `ArgumentOutOfRangeException` for `NaN`. |

### Rng pick and shuffle methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#pick">`Pick<T>(ReadOnlySpan<T> items)`</a> | An element of the span, each equally likely. Throws `ArgumentException` when it is empty. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#pick">`Pick<T>(T[] items)`</a> | The same, for an array. Throws `ArgumentNullException` for `null`. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#pick">`Pick<T>(IReadOnlyList<T> items)`</a> | The same, for a list. Throws `ArgumentNullException` for `null`. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#shuffle">`Shuffle<T>(Span<T> items)`</a> | Puts the elements in a random order, in place. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#shuffle">`Shuffle<T>(T[] items)`</a> | The same, for an array. Throws `ArgumentNullException` for `null`. |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#shuffle">`Shuffle<T>(IList<T> items)`</a> | The same, for a list, in the order the span overload gives. Throws `ArgumentNullException` for `null`. |
