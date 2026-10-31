---
layout: docs
legend: [prop]
title: "Fabric simulation: settings"
description: The settings read every frame and the ones read at a build, rates stated per 1/120 s, the solver, bending and creases, mass and gravity, the sheet's own settings, what costs the most, and going back to the defaults.
---

Every tunable of a sheet is a property of its <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/">`FabricSettings`</a>, a plain object you change in place: no
method to call, nothing to apply by hand. Their defaults make a light cloth that hangs, folds, piles and settles. This page has the solver's own settings; the air's are on the [wind page](/docs/fabric-simulation-wind/), and the
colliders', self-collision's and rest's on the [collisions page](/docs/fabric-simulation-collisions/). Names are
colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Two lifetimes

Most settings are read every frame. <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#update">`Fabric.Update`</a> uploads them all before it steps, so a setting changed while the
cloth runs is in force from the next step: a gust, a stiffer weave, a sphere that moves. A few describe the sheet itself,
and are read only when it is built:

| Read | Settings |
| --- | --- |
| At a build | The settings' <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#widthinparticles">`WidthInParticles`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#heightinparticles">`HeightInParticles`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#seedripple">`SeedRipple`</a>; the `Fabric`'s <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#origin">`Origin`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#orientation">`Orientation`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#rotation">`Rotation`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinmode">`PinMode`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinnedindices">`PinnedIndices`</a> |
| Every frame | Everything else |

A setting read at a build waits for the next <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, or for <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#autorebuild">`AutoRebuild`</a>; until then the live sheet
keeps the one it was built with. The spacing most of all: the threads, the pins' reach, the folds and the cuts are all
measured in it, and the solver keeps the spacing of the sheet as built, whatever `RestLength` says since. The settings'
figures worked out from `RestLength`, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#particlemass">`ParticleMass`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthickness">`SelfCollisionThickness`</a>, follow the settings, not the
sheet, until it is built again.

A `Fabric` can be handed another `FabricSettings` at any time, through <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#settings">`Settings`</a>: its settings read every frame
are in force from the next step, and the rest wait for a build, as above. Every setting is checked as it is uploaded,
and a value that isn't a finite number throws `ArgumentException`, naming the setting, before anything reaches the
GPU: one NaN would spread through the whole sheet within a few steps, and stay. Values outside a setting's range are
held to it, as each one's entry says.

## Rates per 1/120 s

Four settings are fractions taken away per step: <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#damping">`Damping`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#colliderfriction">`ColliderFriction`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionfriction">`SelfCollisionFriction`</a> and
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingplasticrate">`BendingPlasticRate`</a>. Each is stated per 1/120 s, a step at the default rate, and the solver rescales it to the
step it takes, so that the same share goes per second: a rate `r` becomes `1 − (1 − r)^(120 × step)` a step. The motion
each point carries from one step to the next is rescaled the same way when the rate changes.

So <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a> changes the cost and the stability, not how the cloth moves. Raise it, even while the
cloth runs, and every step is shorter, every round has less to correct, and fast motion is caught that a longer step
would let one layer through another, at the price of more steps a second. The two frictions are also read as they
are, unscaled, as the static friction that holds resting cloth on a slope, see [rest](/docs/fabric-simulation-collisions/#rest).

## The solver

A step moves every point by what it carries and what pushes it, then relaxes the threads in rounds: in each, every
thread asks its two points to move towards its length, and every point moves by the average of what its threads ask.
More rounds leave the cloth less stretched, in proportion to the work. Each thread corrects <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#stiffness">`Stiffness`</a> of its
stretch a round: 1 is crisp, and lower is springy.

A thread folded shorter than its length is free down to <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#compressionslack">`CompressionSlack`</a> of it, and only then pushes back. That
is how cloth crumples: easily, without buckling like a stiff sheet. Lower crumples tighter, but keep it at least
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#minimumcompressionslackforcontacts">`MinimumCompressionSlackForContacts`</a> while self-collision is on, see [thickness and slack](/docs/fabric-simulation-collisions/#thickness-and-slack).

The weave has threads along the grid, between neighbors across and up, and, with <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useshearingconstraints">`UseShearingConstraints`</a>,
across both diagonals of every square, so the weave can't shear out of square. A sheet without them folds and drapes
like a net.

<figure class="shot">
  <img src="{{ '/assets/img/fabric-simulation/weave.svg' | relative_url }}" width="640" height="250" alt="Left, a point of the weave and its threads: four along the grid to its neighbors, and diagonals across the squares. It owns four of them, the thread to its right, the thread up, the diagonal to its upper right and the other diagonal of that square. Right, the three folds the same point owns: the fold across the thread to its right, the fold across the thread up, and the fold across the square's diagonal, each a hinge between two triangles">
  <figcaption>The weave around one point. Left, its threads, with the four it owns in gold. Right, its three folds, each a hinge between two triangles: across, down and diagonal.</figcaption>
</figure>

### FabricSettings solver properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a> | `float`. Steps a second, whatever the frame rate. 120 by default; 120 to 240 is typical. Held to 4 to 10,000 by `TimeStep`. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#timestep">`TimeStep`</a> | `float`, read-only. Seconds a step, `1 / SolverFrequencyHz`, held to 0.0001 to 0.25. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#relaxationiterations">`RelaxationIterations`</a> | `int`. Rounds a step: more is less stretch, for proportionally more work. 10 by default; 8 to 14 is typical. 0 solves no threads, though one round still runs for the colliders and the pins' reach. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#maxstepsperframe">`MaxStepsPerFrame`</a> | `int`. Steps a frame may run to catch up; the backlog past that is dropped. 4 by default, at least 1. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#stiffness">`Stiffness`</a> | `float`. The share of a thread's stretch taken away a round, 0 to 1. 0.9 by default; 0.8 to 1 for cloth. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#compressionslack">`CompressionSlack`</a> | `float`. How short a thread folds, as a share of its length, before it pushes back, 0 to 1. 0.375 by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#damping">`Damping`</a> | `float`. The share of the motion taken away per 1/120 s, 0 to 1. 0.02 by default; 0.01 to 0.05 for cloth. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useshearingconstraints">`UseShearingConstraints`</a> | `bool`. Threads across both diagonals of every square, so the weave can't shear. `true` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#shearingrestlength">`ShearingRestLength`</a> | `float`, read-only. A diagonal's length, `RestLength × √2`. |

## Bending and creases

Threads keep the cloth from stretching; folds keep it from folding up like paper. Every pair of triangles that share an
edge is a fold, a hinge with a rest angle, and with <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#usebendingconstraints">`UseBendingConstraints`</a> each one is pulled back towards that
angle, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingstiffness">`BendingStiffness`</a> of the way a round. Keep it well under `Stiffness`: real cloth folds far more easily than
it stretches, and stiff folds make cardboard of it. Each point owns three folds, across, down and diagonal, and sits
in twelve; a round that solves bending first solves every fold once, in a pass of its own, and every point then
gathers its share of the twelve.

A fold's rest angle starts as the sheet was built, flat but for the starting ripple. With <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingplasticrate">`BendingPlasticRate`</a> above
0, a fold bent further than <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingplasticyielddegrees">`BendingPlasticYieldDegrees`</a> from its rest angle yields: its rest angle follows the
fold at that rate, and it sets as a crease. So creases stay: cloth that lay crumpled under a weight keeps its creases
once the weight is gone, and cloth folded and hung up hangs folded. The default rate of 0 always springs back.
<a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/">`CreaseCheck`</a> measures how creased a sheet has become, see [creases](/docs/fabric-simulation-diagnostics/#creases).

```csharp
// linen that remembers how it was folded
_settings.BendingPlasticRate = 0.05f;
_settings.BendingPlasticYieldDegrees = 20.0f;
```

### FabricSettings bending properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#usebendingconstraints">`UseBendingConstraints`</a> | `bool`. Resistance to folding, not only to stretching. `true` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingstiffness">`BendingStiffness`</a> | `float`. How hard folds are pulled back to their rest angles, 0 to 1. 0.5 by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingplasticyielddegrees">`BendingPlasticYieldDegrees`</a> | `float`. Degrees a fold must pass its rest angle before it starts to set as a crease, 0 to 180. 30 by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingplasticrate">`BendingPlasticRate`</a> | `float`. How fast a yielding fold sets, per 1/120 s, 0 to 1. 0 by default, which always springs back; 0.01 to 0.1 for cloth that remembers its folds. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingiterations">`BendingIterations`</a> | `int`. How many of the rounds also solve bending, spread evenly. `EveryRound` by default. |
| <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#everyround">`EveryRound`</a> | Constant, 0: as `BendingIterations` or `ContactIterations`, every round. |

## Mass and gravity

The cloth's weight is given per area, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#arealdensity">`ArealDensity`</a>, not per point: each point carries the patch of cloth around
it, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#particlemass">`ParticleMass`</a>, `ArealDensity × RestLength²`. So a sheet weighs the same, and catches the wind the same, at
any resolution: refine the grid and every point gets lighter. Weight matters against the air: a light sheet billows,
a heavy one hangs. Gravity is the same for any weight.

<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#gravity">`Gravity`</a> is an acceleration in world space. It can point any way, but the ground stays level whichever way it
points: it is a plane at a height of Y, see [colliders](/docs/fabric-simulation-collisions/#colliders).

### FabricSettings mass properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#gravity">`Gravity`</a> | `Vector3`. Meters per second squared, in world space. `(0, −9.81, 0)` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#arealdensity">`ArealDensity`</a> | `float`. Kilograms per square meter. 0.2 by default; light cotton 0.15, canvas 0.5, upholstery 1. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#particlemass">`ParticleMass`</a> | `float`, read-only. The mass a point carries, `ArealDensity × RestLength²`, in kilograms. |

## The sheet's own settings

The grid and its spacing have no defaults worth having: <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#widthinparticles">`WidthInParticles`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#heightinparticles">`HeightInParticles`</a> and
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a> all start at 0, which a build refuses, so every setup gives its own. The spacing is the cloth's
finest detail, since a fold bends at the points: a sheet that must crease finely wants a small spacing, and pays for it
in points. Typical spacings are 3 to 6 cm.

### FabricSettings sheet properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#widthinparticles">`WidthInParticles`</a> | `int`. Points across, at least 2. 0 by default: always set it. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#heightinparticles">`HeightInParticles`</a> | `int`. Points up, or deep lying flat, at least 2. 0 by default: always set it. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a> | `float`. The spacing between neighbors, in meters. 0 by default: always set it; 0.03 to 0.06 is typical. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#seedripple">`SeedRipple`</a> | `float`. The starting wave's height, as a share of the spacing. 0.05 by default, held to 0 to `MaxSeedRipple`. See [the starting ripple](/docs/fabric-simulation-pins/#the-starting-ripple). |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#autorebuild">`AutoRebuild`</a> | `bool`. Rebuilds the sheet at the next `Update` or `Step` whenever something a build reads has changed. `false` by default. |
| <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#maxseedripple">`MaxSeedRipple`</a> | Constant, 0.5: the highest starting wave. |

## Cost

A step's cost is its passes, each over the whole sheet: one integration, a pass per round, and the extra passes of
bending and self-collision. On a small sheet none of it matters. On a large one, two settings decide the frame time:

- **<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#contactiterations">`ContactIterations`</a>** caps how many of the rounds also solve self-collision, 4 of the 10 by default.
  Each point's partners are found once a step, and every round that solves contacts tests them again. It is the
  first knob to turn down: large grids want 1 or 2.
- **<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingiterations">`BendingIterations`</a>** caps how many of the rounds also solve bending, every round by default, each adding a
  pass. Large sheets want 1 or 2.

Both spread the rounds they get evenly across the step, and both mean every round at <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#everyround">`EveryRound`</a>, 0, or at any
count from `RelaxationIterations` up. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#relaxationiterations">`RelaxationIterations`</a> is unlike them: 0 there means no threads.
<a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#dispatchesperstep">`DispatchesPerStep`</a> counts the passes a step takes, and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a> how many steps a second
run them: halving it halves the cost, and a frame rate higher than the step rate costs nothing more, since most
frames then run no step. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useaerodynamicpressure">`UseAerodynamicPressure`</a> adds a few passes, which together cost about one and a third
passes over the sheet.

```csharp
// a large sheet: fewer contact and fold rounds, the rest as they were
_settings.ContactIterations = 2;
_settings.BendingIterations = 2;
```

## Back to the defaults

To put every setting back to its default, give the `Fabric` a fresh `FabricSettings` and build again. That is the way
between presets, since a setting one preset changes and the next doesn't would otherwise carry over. Set the grid on
the new instance too: it starts at 0, like any other.

```csharp
_fabric.Settings = new FabricSettings
{
    WidthInParticles = 96,
    HeightInParticles = 64,
    RestLength = 0.06f
};

_fabric.Rebuild();
```
