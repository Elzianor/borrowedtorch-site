---
layout: docs
legend: [prop, method]
title: "Randomness: quick start guide"
description: Set up BorrowedTorch.Randomness, give a world one seed and each system its own stream, and find your way around the randomness pages.
---

BorrowedTorch.Randomness gives the procedural generation of Kindling numbers it can rebuild. A world starts from one
seed. Each system forks its own stream from it, so the maze, the loot and the caves never shift each other, and noise
gives smooth values over an endless plane. The same seed gives the same numbers on every platform, every .NET version
and every version of the package, so a saved seed always rebuilds the same world.

These pages cover the library from setup to every public type:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/randomness/) (this page) | Installing, a world seed, what stays the same from version to version, a complete dungeon floor |
| [Random streams](/docs/randomness-streams/) | Integers, doubles and chances, how many numbers a call takes, picking, shuffling and threads |
| [Seeds and forks](/docs/randomness-forks/) | One stream per system, fork keys and indexes, pre-hashed keys, seeds typed as text, stable hashes and the save format |
| [Noise](/docs/randomness-noise/) | Gradient and fractal noise, their settings, the range their values really use, thresholds and coordinates |
| [Glossary](/docs/randomness-glossary/) | Every public type with its properties and methods in alphabetical order, one page per type |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.Randomness
```

| Requirement | Version |
| --- | --- |
| .NET | 8 or later (`net8.0`), tested on .NET 8 and 10 |
| Operating system | Any: the library is plain managed code |
| Dependencies | None |

`BorrowedTorch.Architecture` builds its seeded mazes on this package and installs it with itself.

## A world seed

Create one <a class="ref" href="/docs/randomness-glossary/streams/rng/">`Rng`</a> from the world seed when a world is made or loaded, and fork a stream from it for every
system that draws numbers. A fork is a new generator whose seed comes from its parent's seed and a key, so it is the
same stream every time, however many numbers the other systems take.

```csharp
using BorrowedTorch.Randomness;

var world = new Rng(worldSeed);

var mazeRng = world.Fork("maze", floor); // one stream per system, and per floor
var lootRng = world.Fork("loot");        // draws here never shift the maze

int roll = lootRng.NextInt(1, 7);        // a die: 1 to 6, the upper end excluded
bool trap = mazeRng.NextBool(0.1);       // true one time in ten
```

The world seed is any `ulong`: one the player typed, one read from the save file, or a new one for a new game, such as
`(ulong)Random.Shared.NextInt64()`. Save it with the game; it is all it takes to build the world again. A seed typed as
text goes through a [stable hash](/docs/randomness-forks/#seeds-typed-as-text) first.

An `Rng` isn't thread-safe: give each thread or job its own fork, see [threads](/docs/randomness-streams/#threads).

### Rng properties

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/randomness-glossary/streams/rng/#seed">`Seed`</a> | `ulong` | Read-only. The seed the generator was created with. Its forks derive their seeds from it, and `new Rng(rng.Seed)` starts the same stream again from its first number. |

### Rng constructor

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/randomness-glossary/streams/rng/#rng">`Rng(ulong seed)`</a> | Creates a PCG32 generator for the seed. Any value works, 0 included, and different seeds give unrelated streams. |

The numbers are on the [random streams page](/docs/randomness-streams/#rng-number-methods), and the forks on the
[seeds and forks page](/docs/randomness-forks/#rng-fork-methods).

## What stays the same

The point of a seed is that it means the same world tomorrow. The package promises it:

- **Output is frozen.** No release changes what an existing method returns for a seed, how <a class="ref method" href="/docs/randomness-glossary/streams/rng/#fork">`Fork`</a> derives
  its seeds included. A new algorithm comes as a new type. Tests of known values guard every method, on .NET 8 and 10.
- **Noise is bit-identical everywhere.** It uses only IEEE add, subtract, multiply and floor: no `Math.Sin`, no
  `Math.Pow` and no permutation tables, so every machine computes the same bits.
- **Forks depend only on the parent's seed and the key**, not on how many numbers the parent has drawn, so systems
  stay independent of each other's call order.

`System.Random` makes none of these promises: its seeded sequence isn't guaranteed from one .NET version to the next,
and `string.GetHashCode()` changes with every run of the game.

What the package can't freeze is your own code. Fork keys, the order of the draws within one stream and the settings
of a noise are part of your save format: renaming `"maze"` changes every maze of every saved seed. The
[seeds and forks page](/docs/randomness-forks/#keys-are-part-of-the-save-format) has the rules.

## Not for security

`Rng` is predictable by design. Never use it for anything adversarial: anti-cheat, multiplayer authority, tokens or
keys. Use `System.Security.Cryptography.RandomNumberGenerator` for those.

## A dungeon floor

A cave floor of a dungeon, as a grid of characters: noise carves the caves, the layout stream picks the entrance and
the loot stream places the chests. Floor 3 of a seed is the same cave with the same chests on every machine.

```csharp
using BorrowedTorch.Randomness;

public static class DungeonFloor
{
    // '#' rock, '.' floor, '<' the entrance, '$' a chest, '*' a rare chest
    public static char[,] Build(ulong worldSeed, int floor, int width, int height)
    {
        var world = new Rng(worldSeed);
        var layoutRng = world.Fork("layout", floor);
        var lootRng = world.Fork("loot", floor);

        // a noise of its own for each floor, seeded from a fork
        var caves = new FractalNoise(world.Fork("caves", floor).Seed,
            FractalSettings.Default with { Octaves = 5 });

        var map = new char[width, height];
        var open = new List<(int X, int Y)>();

        for (var y = 0; y < height; y++)
        for (var x = 0; x < width; x++)
        {
            // about 40 % of the cells are above 0.05
            var isOpen = caves.Sample(x, y) > 0.05;
            map[x, y] = isOpen ? '.' : '#';
            if (isOpen) open.Add((x, y));
        }

        if (open.Count == 0) return map; // Pick throws on an empty list

        var entrance = layoutRng.Pick(open);
        map[entrance.X, entrance.Y] = '<';

        // shuffle the open cells and put the chests on the first few
        lootRng.Shuffle(open);
        var chests = Math.Min(lootRng.NextInt(2, 6), open.Count);

        for (var i = 0; i < chests; i++)
        {
            var (x, y) = open[i];
            if (map[x, y] == '<') continue;
            map[x, y] = lootRng.NextBool(0.1) ? '*' : '$';
        }

        return map;
    }
}
```

The three streams don't know about each other. Add monsters tomorrow with `world.Fork("monsters", floor)` and the
caves, the entrance and the chests stay where they were. Draw one more number from `lootRng` before the chests, and
only the chests move.

The [seeds and forks page](/docs/randomness-forks/#forking) has more on forking, and the
[noise page](/docs/randomness-noise/#thresholds) on choosing a threshold like 0.05.
