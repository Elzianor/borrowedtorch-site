---
layout: docs
legend: [prop, method]
title: "Fabric simulation: placement and pins"
description: Where the sheet hangs, in which plane and at what angle, the starting ripple, pin presets and pins of your own, pinning and letting go on the live sheet, long-range attachments, and moving pins.
---

A sheet is laid out flat when it is built, in a plane and at an angle you choose, around a point you choose. From
there gravity takes over, and what holds the sheet up, or holds it at an angle, is its pins: points that never move.
Where it hangs and what holds it are the `Fabric`'s, read at every build. Names are colored by what they are: a
<span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the
plain color.

## Placement

<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#origin">`Origin`</a> is the middle of the sheet, on both axes, in either orientation, so where a sheet hangs doesn't depend
on its size: change the resolution or the spacing and it stays where you put it. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#orientation">`Orientation`</a> picks its plane:
`Vertical` spans X and Y, like a curtain, and `Horizontal` spans X and Z, like a tablecloth. Its columns run along
+X either way, and its rows up +Y or along +Z.

A sheet is `(points − 1) × RestLength` along each side, so a 96 × 64 sheet at 6 cm, upright, with `Origin` at
`(0, 3, 0)`, spans x −2.85 to 2.85 and y 1.11 to 4.89. To place a sheet by its top edge instead, add half its
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#height">`Height`</a>, which the settings' figures give before the build:

```csharp
// the top edge at y = 4.5, wherever the grid's size puts the bottom
var height = (_settings.HeightInParticles - 1) * _settings.RestLength;

_fabric.Origin = new Vector3(0.0f, 4.5f - height * 0.5f, 0.0f);
```

<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#rotation">`Rotation`</a> then turns the sheet to any angle, about `Origin`, so it turns in place:

```csharp
_fabric.Rotation = Quaternion.CreateFromYawPitchRoll(yaw, pitch, roll);
_fabric.Rebuild();
```

That is the angle it starts at, nothing more. Gravity, the wind and the colliders stay in world space, so a tilted sheet
still falls down Y and still lands on the ground. What holds a tilt is the pins, which turn with the rest of the sheet
and then never move. Any angle is safe: a turn keeps every distance and every fold angle, so the thread lengths, the
pins' reach and the folds' rest angles measured from the sheet as built all still hold, and the first step has
nothing to put right. The texture coordinates follow the grid, so neither the orientation nor the rotation changes
them. The rotation is normalized at the build, and one of no length, or not finite, throws.

### Fabric placement properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#origin">`Origin`</a> | `Vector3`. The sheet's middle, in world space. `(0, 3, 0)` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#orientation">`Orientation`</a> | <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-orientation/">`FabricOrientation`</a>. The plane the sheet is built in, `Vertical` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#rotation">`Rotation`</a> | `Quaternion`. The angle it starts at, about `Origin`. `Quaternion.Identity` by default. |

All three are read at a build: change them, then call <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, or let <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#autorebuild">`AutoRebuild`</a> do it. The sheet
can't be moved without starting over: to carry cloth along, move its pins, see [moving pins](#moving-pins).

### FabricOrientation values

| Value | Description |
| --- | --- |
| <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-orientation/#vertical">`Vertical`</a> | Spans X and Y, like a curtain or a flag: rows up +Y, facing +Z. |
| <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-orientation/#horizontal">`Horizontal`</a> | Spans X and Z, like a tablecloth: rows along +Z, facing −Y. |

## The starting ripple

A sheet laid out perfectly flat has no reason to buckle one way rather than the other, and a flat sheet dropped flat
would stay flat as it fell. So a build lays it out with a gentle wave across its plane, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#seedripple">`SeedRipple`</a> of the
spacing high: 0.05 by default, raised for a sheet dropped flat, at most <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#maxseedripple">`MaxSeedRipple`</a>, 0.5. A wave of
the same shape at any resolution, since it is measured in the spacing.

The wave costs no stretch. The points are laid out closer in the plane, so the threads that climb the wave's steepest
part are exactly their length, and the flatter ones start a little short, which cloth allows: a thread doesn't push
back until it is folded shorter than <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#compressionslack">`CompressionSlack`</a> of its length. A wavy sheet is narrower, not stretched,
by a few percent at most: <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#builtwidth">`BuiltWidth`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#builtheight">`BuiltHeight`</a> give the size it was laid out at, and `Width` and
`Height` the flat sheet's, which cuts are measured on. The folds rest at the wave's angles, so a hanging sheet keeps a
little of the wave until something bends it.

## Pin presets

<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinmode">`PinMode`</a> names a layout of pins, `LeftEdge` unless you set another. The top is the last row, `HeightInParticles − 1`,
in either orientation: the top of an upright sheet, the +Z edge of one lying flat, and wherever that row ends up after
a rotation.

### FabricPinMode values

| Value | Description |
| --- | --- |
| <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-pin-mode/#none">`None`</a> | Nothing pinned: the sheet drops. |
| <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-pin-mode/#topedge">`TopEdge`</a> | The whole top row, like cloth tacked along a batten. |
| <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-pin-mode/#topcorners">`TopCorners`</a> | The two top corners, like washing on a line. |
| <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-pin-mode/#leftedge">`LeftEdge`</a> | The whole first column, like a flag on its pole. The default. |
| <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-pin-mode/#fourcorners">`FourCorners`</a> | All four corners, like a sheet stretched over a frame. |

## Custom pins

The pins are the preset's and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinnedindices">`PinnedIndices`</a>'s together: a set of grid indices you fill. With `None` as the
preset, the set is all of them:

```csharp
_fabric.PinMode = FabricPinMode.None;
_fabric.PinnedIndices.Add(_fabric.ParticleIndex(column: 0, row: 47));
_fabric.PinnedIndices.Add(_fabric.ParticleIndex(column: 32, row: 24));   // a point inside the sheet is fine
_fabric.Rebuild();
```

Any point can be pinned, inside the sheet as well as on its edge. <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex`</a> works the index out,
`row * WidthInParticles + column`, and checks it: swapped, a column and a row still make a valid index almost every
time, and pin the wrong point. Before the first build it counts in the settings' grid. A build throws
`ArgumentOutOfRangeException` for an index in the set that is outside the grid.

### Fabric pin members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinmode">`PinMode`</a> | <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-pin-mode/">`FabricPinMode`</a>. The preset, read at a build. `LeftEdge` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinnedindices">`PinnedIndices`</a> | Read-only `ISet<int>`, a set you fill: more points to pin at a build, by index. |
| <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex(int column, int row)`</a> | Returns `int`: the index of the point at that column and row. Throws `ArgumentOutOfRangeException` outside the grid. |
| <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#setpinned">`SetPinned(int index, bool pinned)`</a> | Pins a point of the live sheet where it is, or lets it go, with no kick. Takes effect at the next step. |
| <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#ispinned">`IsPinned(int index)`</a> | Returns `bool`: whether a point of the live sheet is pinned now. |
| <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#refreshanchors">`RefreshAnchors()`</a> | Measures the pins' reach along the weave again now, rather than before the next step. |

## Pins on the live sheet

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#setpinned">`SetPinned`</a> pins a point where it hangs now, or lets one go, and <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#ispinned">`IsPinned`</a> reads it back. Nothing jumps:
a pin carries no motion, so a point pinned mid-swing stops there, and one let go falls from where it is, at rest. The
preset and the set still describe the next build, which puts the pins back as they say.

```csharp
// let the top edge go, all but its corners: it drops from where it hangs
var top = _fabric.HeightInParticles - 1;

for (var column = 1; column < _fabric.WidthInParticles - 1; column++)
    _fabric.SetPinned(_fabric.ParticleIndex(column, top), false);
```

A change takes effect at the next step, when the pins' reach is measured again, once for however many points changed.
That runs on the CPU over the weave, with nothing read back from the GPU, so a pin change is an event, not work for
every frame. The one case that reads back is a sheet whose records you have uploaded yourself since, see
[moving pins](#moving-pins). Both throw `ArgumentOutOfRangeException` for
an index outside the sheet.

## Long-range attachments

Threads pull a point towards its neighbors, a few rounds a step, and a wide, heavy sheet hanging from its top settles
a little stretched, like rubber, since every thread between the pins and the hem gives a little and the rounds never
quite catch up. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#uselongrangeattachments">`UseLongRangeAttachments`</a>, on by default, ties every point to its nearest pin along the weave:
a point is never let further from that pin, in a straight line, than the shortest path to it through the threads. A
cloth that hangs straight sits right at that reach; one that stretches meets it, and stops.

The reach is measured once per change of pins or damage, from wherever the pins are, as a shortest path through the
threads that are whole: with shearing on, the diagonals count, at √2 of the spacing. Each point keeps the index of its
pin and the length of that path, <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#anchorindex">`AnchorIndex`</a> and <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#maxanchordistance">`MaxAnchorDistance`</a> in its record. A point no pin
reaches, a piece cut free of every pin, isn't held at all, and falls. With nothing pinned the attachments do nothing,
and cost nothing.

### FabricSettings attachment property

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#uselongrangeattachments">`UseLongRangeAttachments`</a> | `bool`. Holds every point within reach of its pin along the weave, so a big, heavy sheet doesn't stretch like rubber. `true` by default. |

## Moving pins

A point keeps the index of its pin, not the pin's position, and the length behind it is a length through the weave, not
through space: so a pin can move as far as you like, and the attachments follow it with nothing to measure again. What
moves a pin is the record itself. Read the sheet back, move the pins, and upload it:

```csharp
// a host carrying a banner along: the top row's pins move with the pole
var particles = _solver.ReadBack();
var top = _fabric.HeightInParticles - 1;

for (var column = 0; column < _fabric.WidthInParticles; column++)
{
    // only the position: a pin carries no motion, and the solver sets its previous position to match
    particles[_fabric.ParticleIndex(column, top)].Position += offset;
}

_solver.UpdateParticles(particles);
```

<a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#readback">`ReadBack`</a> waits for the GPU to catch up, which is a stall every time, and each upload needs a fresh readback: an
older array would put the whole sheet back where it was. So pins that move every frame cost a stall every frame, which
a few small sheets afford and a large one doesn't.

Moving pins needs nothing else. Changing which points are pinned is another matter, since the reach is measured from
them. <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#setpinned">`SetPinned`</a> measures it again by itself. A change made through <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#updateparticles">`UpdateParticles`</a>, by a record's
<a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#ispinned">`IsPinned`</a>, isn't measured until you call <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#refreshanchors">`RefreshAnchors`</a>, which reads the pins back from the GPU
once and measures the reach from them; until then the records keep the reach you uploaded. The `Fabric`'s next
`SetPinned` or `IsPinned` after such an upload reads the pins back too, once.
