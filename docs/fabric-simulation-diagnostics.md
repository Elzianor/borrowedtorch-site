---
layout: docs
legend: [prop, method]
title: "Fabric simulation: diagnostics"
description: Reading the sheet back once for every check, how much of it rests and how much is held, how close it comes to outrunning its contacts, what self-collision lost, penetration and creases measured on the CPU, and checks of your own.
---

A screenshot shows cloth that looks wrong; it doesn't say why. The solver counts what it does on the GPU as it steps,
and the `BorrowedTorch.FabricSimulator.Diagnostics` namespace measures a sheet read back to the CPU: how far it passes
through itself, how creased it is. They are for tuning and testing, not for every frame. Names are colored by what
they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields
keep the plain color.

## Reading the sheet back

<a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#readback">`ReadBack`</a> copies the particles to the CPU, waiting for the GPU to catch up: a full stall. Take one array and run
everything you need over it, rather than reading the sheet back once per question:

```csharp
using BorrowedTorch.FabricSimulator.Diagnostics;

// a few times a second, from a debug key or a test, never every frame
var particles = _solver.ReadBack();
var tears = _fabric.CopyTearState();

// the thickness the solver runs with: the ratio times the spacing the sheet was built with
var thickness = MathF.Max(_settings.SelfCollisionThicknessRatio, 0.05f) * _fabric.RestLength;

var penetration = PenetrationCheck.Run(particles, _fabric.WidthInParticles, thickness, tears);
var creases = CreaseCheck.Run(particles, _fabric.WidthInParticles, _fabric.HeightInParticles, tears);
```

The array is laid out row by row, as the sheet is: <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex`</a> finds a point in it. The grid sizes to
pass are the `Fabric`'s, as built.

## Rest and hold

The solver counts, every step, how many points rest and how many are held. Two methods turn those counts into
fractions of the unpinned cloth, averaged over the steps since their last call, so a settled sheet reads 1 however it
is pinned:

- <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplerestingfraction">`SampleRestingFraction`</a> is the share inside the rest deadband, its carried motion thrown away as noise. That
  isn't the same as still: the threads and the contacts may go on moving a point that rests.
- <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#sampleheldfraction">`SampleHeldFraction`</a> is the stricter figure, the share held exactly still. A pile at rest reads 1, and without
  <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useresthold">`UseRestHold`</a> it always reads 0. See [holding settled cloth still](/docs/fabric-simulation-collisions/#holding-settled-cloth-still).

Both read the solver's counters back from the GPU, a stall, so sample them a few times a second, as a window title or
an overlay would. Every sampling method reads the same counters, fetched at most once a step: sampled together, they
cost one stall, not one each.

```csharp
_titleCooldown -= elapsed;

if (_titleCooldown <= 0.0f)
{
    _titleCooldown = 0.25f;
    Window.Title = $"held {_solver.SampleHeldFraction():P0}, at rest {_solver.SampleRestingFraction():P0}";
}
```

### FabricEffect sampling methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplerestingfraction">`SampleRestingFraction()`</a> | Returns `float`: the share of the unpinned cloth at rest since the last call, 0 to 1. |
| <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#sampleheldfraction">`SampleHeldFraction()`</a> | Returns `float`: the share of the unpinned cloth held exactly still since the last call, 0 to 1. |
| <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#sampleworststepmotion">`SampleWorstStepMotion()`</a> | Returns <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect-step-motion/">`FabricEffect.StepMotion`</a>: the furthest a point has moved in a step since the build, in thicknesses. |
| <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplespatialhashoverflow">`SampleSpatialHashOverflow()`</a> | Returns <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect-spatial-hash-overflow/">`FabricEffect.SpatialHashOverflow`</a>: what the neighbor search dropped since the last call. |
| <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplecoincidentcontacts">`SampleCoincidentContacts()`</a> | Returns <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect-coincident-contacts/">`FabricEffect.CoincidentContacts`</a>: contacts between points at one spot with nothing to tell them apart. |

## Outrunning the contacts

Contacts are tested where points end up, not along the way they came, so a point that moves further than the
cloth's thickness in one step can cross a layer with nothing able to see it: neither the solver nor
`PenetrationCheck`. <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#sampleworststepmotion">`SampleWorstStepMotion`</a> says how close the sheet has come. <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-step-motion/#peakratio">`PeakRatio`</a> is the furthest
move in one step, in thicknesses: past 1, layers can pass through each other unseen. <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-step-motion/#fastparticlesteps">`FastParticleSteps`</a> counts
the moves past 1.

The margin is the grid's, not the solver's. The thickness is a share of the spacing, so a finer sheet lowers the bar
while gravity leaves the speeds as they were: check it at the resolution you ship. If it reads above 1, a higher
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a> is the cheap cure, and doubling it roughly halves the figure. It is measured only while
self-collision is on, and the peak keeps its value until the next build.

### FabricEffect.StepMotion properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-step-motion/#peakratio">`PeakRatio`</a> | `float`. The furthest single-step move since the build, in thicknesses. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-step-motion/#fastparticlesteps">`FastParticleSteps`</a> | `long`. How many moves of a point in a step went past one thickness, since the build. |

## What self-collision lost

The neighbor search has room for 32 points in a cell of the hash and 32 partners a point, see
[the spatial hash](/docs/fabric-simulation-collisions/#the-spatial-hash). What doesn't fit is a contact that step never
sees, and it leaves no trace in the positions, so no check of yours on the array can find it afterwards.
<a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplespatialhashoverflow">`SampleSpatialHashOverflow`</a> counts it. It tells cloth that passes through itself because a contact was answered too
weakly from cloth that does because the contact was never seen.

### FabricEffect.SpatialHashOverflow properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-spatial-hash-overflow/#droppedentriesperstep">`DroppedEntriesPerStep`</a> | `float`. Points a full cell couldn't file, per step since the last call. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-spatial-hash-overflow/#peakoccupancy">`PeakOccupancy`</a> | `int`. The fullest cell seen since the build: what `SpatialHashMaxPerCell` would need to be. 0 until a cell overflows. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-spatial-hash-overflow/#droppedcandidatesperstep">`DroppedCandidatesPerStep`</a> | `float`. Partners a full list left out, per step since the last call. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-spatial-hash-overflow/#peakcandidates">`PeakCandidates`</a> | `int`. The longest list of partners wanted since the build: what `ContactCandidateCapacity` would need to be. 0 until a list overflows. |

## Coincident contacts

Two points at the very same spot are pushed apart the way they came, from where each was when the step began. When
that was the same spot too, there is nothing to tell them apart, and the solver pushes them apart along an axis picked
from their indices: a guess, which can swap two layers. Only cloth crushed hard gets there.
<a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplecoincidentcontacts">`SampleCoincidentContacts`</a> counts those contacts, but only in a solver compiled with
<a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#fabric_count_coincident">`FABRIC_COUNT_COINCIDENT`</a> defined, since counting costs an atomic in the solver's innermost loop. Otherwise it reads
0.

### FabricEffect.CoincidentContacts properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-coincident-contacts/#perstep">`PerStep`</a> | `float`. Such contacts a step, since the last call. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-coincident-contacts/#total">`Total`</a> | `long`. Such contacts since the sheet was uploaded. |

## Penetration

<a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/#run">`PenetrationCheck.Run`</a> says what "the cloth isn't passing through itself" means in numbers. It counts the pairs of
points closer than the cloth is thick, leaving out neighbors in the weave, and, of those, the pairs overlapping by
more than a quarter of the thickness, <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/#deepoverlapratio">`DeepOverlapRatio`</a>. Layers resting on each other sit right at the
thickness, so only a deep overlap means one layer went through another.

It doesn't use the solver's spatial hash. It builds its own, with no limit to a cell, because a check that shares
what it checks agrees with it by construction: a pair the solver dropped to a full cell is a pair the solver never
tested, and a check reading the same cells wouldn't test it either. Where the two disagree, the check is right.

Pass it the thickness the solver runs with: <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthicknessratio">`SelfCollisionThicknessRatio`</a>, at least 0.05, times the `Fabric`'s
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#restlength">`RestLength`</a>, the spacing as built. The settings' <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthickness">`SelfCollisionThickness`</a> uses their own `RestLength`, which may
have run ahead of the sheet.

### PenetrationCheck members

| Member | Description |
| --- | --- |
| <a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/#run">`Run(FabricParticle[] particles, int width, float thickness, uint[] tearState = null)`</a> | Static. Returns <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check-result/">`PenetrationCheck.Result`</a>: the pairs closer than the thickness, and how deep. |
| <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/#deepoverlapratio">`DeepOverlapRatio`</a> | Constant, 0.25: the overlap, as a share of the thickness, that counts as one layer through another. |

### PenetrationCheck.Result properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check-result/#contacts">`Contacts`</a> | `int`. Pairs closer than the thickness. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check-result/#penetrations">`Penetrations`</a> | `int`. Pairs overlapping by more than `DeepOverlapRatio`. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check-result/#worstoverlapratio">`WorstOverlapRatio`</a> | `float`. The deepest overlap as a share of the thickness: 0 when nothing touches, 1 for points at one spot. |

## Creases

<a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/#run">`CreaseCheck.Run`</a> compares how folded the sheet is with how folded it rests: every fold's angle now against the
rest angle creasing has given it. That tells a sheet folded because something presses on it, which rests flat, from a
sheet folded because it has set that way, which rests bent. A fold resting more than <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/#sharpfolddegrees">`SharpFoldDegrees`</a>, 25°,
from flat is a crease. See [bending and creases](/docs/fabric-simulation-settings/#bending-and-creases).

### CreaseCheck members

| Member | Description |
| --- | --- |
| <a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/#run">`Run(FabricParticle[] particles, int width, int height, uint[] tearState = null)`</a> | Static. Returns <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/crease-check-result/">`CreaseCheck.Result`</a>: how folded the sheet is, how folded it rests, and its creases. |
| <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/#sharpfolddegrees">`SharpFoldDegrees`</a> | Constant, 25: how far from flat, in degrees, a fold must rest to count as a crease. |

### CreaseCheck.Result properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/diagnostics/crease-check-result/#meanfolddegrees">`MeanFoldDegrees`</a> | `float`. How folded the sheet is now, in degrees from flat, averaged over every fold. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/diagnostics/crease-check-result/#meanrestfolddegrees">`MeanRestFoldDegrees`</a> | `float`. How folded it rests, averaged the same way: how creased it is. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/diagnostics/crease-check-result/#creasededges">`CreasedEdges`</a> | `int`. Folds that rest past `SharpFoldDegrees`. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/diagnostics/crease-check-result/#foldatcreasesdegrees">`FoldAtCreasesDegrees`</a> | `float`. How folded those creases are now; the averages above are thinned out by the flat cloth. |

## On a torn sheet

On a torn sheet, pass both checks the array from <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#copytearstate">`CopyTearState`</a> too. Points on either side of a cut are no
longer neighbors in the weave, and the solver pushes them apart like any contact, so `PenetrationCheck` counts them
as touching cloth rather than leaving them out. The folds a cut has killed span its gap, and the solver skips them, so
`CreaseCheck` doesn't measure them. With `null`, the default, both take the sheet as whole.

## Checks of your own

A solver that has diverged fills the buffer with NaN, and a statistic that took one in is worse than none. Test every
position you read back before you count it: <a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/numeric-checks/#isfinite">`NumericChecks.IsFinite`</a> is the guard both checks share, and the
first thing to reach for in a check of your own. Both checks work from the array alone and allocate as they please:
they are tools, not frame work.

```csharp
// the lowest point of the sheet, ignoring any that diverged
var lowest = float.MaxValue;

foreach (var p in particles)
    if (NumericChecks.IsFinite(p.Position))
        lowest = MathF.Min(lowest, p.Position.Y);
```

### NumericChecks methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/numeric-checks/#isfinite">`IsFinite(in Vector3 v)`</a> | Static. Returns `bool`: whether X, Y and Z are all finite. |
