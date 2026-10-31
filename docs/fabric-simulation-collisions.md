---
layout: docs
legend: [prop]
title: "Fabric simulation: collisions and rest"
description: The sphere and the ground and their friction, self-collision and the cloth's thickness, the pairing of thickness and slack, the spatial hash behind it, and how settled cloth comes to rest and stays exactly still.
---

The cloth meets three things: a sphere, a level ground, and itself. Your scene's meshes aren't colliders. Where it
lands it comes to rest, and stays there, which is harder than it sounds: a solver that answers every push a little
approximately keeps settled cloth twitching forever unless it is told when to stop. Names are colored by what they
are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Colliders

<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#usegroundcollider">`UseGroundCollider`</a>, on by default, is a floor for the cloth to land and pile on: a level plane at
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#groundcolliderheight">`GroundColliderHeight`</a> of world Y, whichever way gravity points. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#usespherecollider">`UseSphereCollider`</a>, off by default, is a sphere the
cloth can't pass through, at <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#spherecollidercenter">`SphereColliderCenter`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#spherecolliderradius">`SphereColliderRadius`</a> wide. Both are read every frame, so the
sphere can move: a ball that rolls under a sheet lifts it.

```csharp
// a tablecloth dropped over a ball
_fabric.Orientation = FabricOrientation.Horizontal;
_fabric.PinMode = FabricPinMode.None;
_fabric.Origin = new Vector3(0.0f, 2.5f, 0.0f);

_settings.UseSphereCollider = true;
_settings.SphereColliderCenter = new Vector3(0.0f, 1.0f, 0.0f);
_settings.SphereColliderRadius = 1.0f;
_settings.SeedRipple = 0.3f;   // dropped flat, it needs a reason to buckle one way
```

Every round, a point inside a collider is put back on its surface, and its motion along the surface is slowed by
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#colliderfriction">`ColliderFriction`</a>, a share per 1/120 s: 0 slides freely, 1 sticks. The colliders keep the points out, not the
triangles between them, so a sphere much smaller than the spacing can slip through the weave.

### FabricSettings collider properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#usespherecollider">`UseSphereCollider`</a> | `bool`. A sphere the cloth can't pass through. `false` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#spherecollidercenter">`SphereColliderCenter`</a> | `Vector3`. The sphere's center, in world space. `(0, 0, 0)` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#spherecolliderradius">`SphereColliderRadius`</a> | `float`. Its radius, in meters. 1 by default; below 0 counts as 0. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#usegroundcollider">`UseGroundCollider`</a> | `bool`. A level floor. `true` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#groundcolliderheight">`GroundColliderHeight`</a> | `float`. The floor's world Y. 0 by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#colliderfriction">`ColliderFriction`</a> | `float`. The grip of the sphere and the floor, per 1/120 s, 0 to 1. Unscaled, it also sets the static friction that holds resting cloth on them, of coefficient `f / (1 − f)`. 0.35 by default. |

## Self-collision

With <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useselfcollision">`UseSelfCollision`</a>, on by default, the cloth can't pass through itself: two points closer than the cloth is
thick are pushed apart, unless they are neighbors in the weave, whose distance the threads keep. The thickness is
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthicknessratio">`SelfCollisionThicknessRatio`</a> of the spacing, 0.75 by default, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthickness">`SelfCollisionThickness`</a> in meters. A heap wants
about 0.85, and past 0.9 the sheet holds its own points apart so firmly that it inflates. Each round that solves
contacts pushes <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionstiffness">`SelfCollisionStiffness`</a> of every overlap apart, 1 by default; lower helps a deep pile settle.
Touching layers slide on each other with <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionfriction">`SelfCollisionFriction`</a>, separate from the colliders' friction; at 0,
heaps spread flatter than real cloth.

It is the most expensive feature, and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#contactiterations">`ContactIterations`</a> is its knob: how many of the rounds also solve
contacts, 4 of the 10 by default, spread evenly. The lips of a cut are no longer neighbors, so they collide like any
other cloth, rather than being skipped.

### FabricSettings self-collision properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useselfcollision">`UseSelfCollision`</a> | `bool`. Stops the cloth passing through itself. `true` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthicknessratio">`SelfCollisionThicknessRatio`</a> | `float`. The cloth's thickness as a share of the spacing, 0.05 to 0.9. 0.75 by default; below 0.05 counts as 0.05. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionstiffness">`SelfCollisionStiffness`</a> | `float`. The share of an overlap pushed apart a round, 0 to 1. 1 by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionfriction">`SelfCollisionFriction`</a> | `float`. The grip between touching layers, per 1/120 s, 0 to 1. Unscaled, it also sets the static friction that holds cloth resting on cloth, of coefficient `f / (1 − f)`. 0.35 by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#contactiterations">`ContactIterations`</a> | `int`. How many of the rounds also solve contacts. 4 by default; large grids want 1 or 2. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthickness">`SelfCollisionThickness`</a> | `float`, read-only. The thickness in meters, `SelfCollisionThicknessRatio × RestLength`. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#minimumcompressionslackforcontacts">`MinimumCompressionSlackForContacts`</a> | `float`, read-only. The lowest `CompressionSlack` that doesn't fight self-collision: half the thickness ratio. |

## Thickness and slack

Two settings must agree. A thread folds freely down to <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#compressionslack">`CompressionSlack`</a> of its length, and self-collision keeps
points the thickness apart. With the slack below half the thickness ratio, crushed threads let points two apart in
the weave come closer than self-collision allows: the threads hold them there, the contacts push them out, and a pile
fights the same contacts every round instead of settling.

So `CompressionSlack` ships at 0.375, which is <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#minimumcompressionslackforcontacts">`MinimumCompressionSlackForContacts`</a> at the default thickness of 0.75.
Raise the slack with the thickness, to half of it, and lower it only for cloth that never lies on itself, which may
then crumple tighter:

```csharp
// cloth for heaps: thicker, and the slack to match
_settings.SelfCollisionThicknessRatio = 0.85f;
_settings.CompressionSlack = _settings.MinimumCompressionSlackForContacts;   // 0.425
```

## The spatial hash

Testing every pair of points would cost the square of the sheet. Instead, every step, the solver files each point in a
spatial hash, in cells half again as wide as the thickness, and gathers each point's partners from the cells around
it, once: every point within one and a half thicknesses. Every round that solves contacts then tests only those
partners, and the margin covers what the points move within a step.

Both have room for 32: a cell files at most <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#spatialhashmaxpercell">`SpatialHashMaxPerCell`</a> points, and a point keeps at most
<a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#contactcandidatecapacity">`ContactCandidateCapacity`</a> partners. Only a pile crushed hard fills either, and what doesn't fit is a contact
that step never sees, with no trace in the positions. <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplespatialhashoverflow">`SampleSpatialHashOverflow`</a> reports it, see
[what self-collision lost](/docs/fabric-simulation-diagnostics/#what-self-collision-lost).

Contacts are tested where points end up, not along the way they came. A point that moves further than the thickness in
one step can cross a layer with nothing to see it, which fast cloth on a fine grid does first, since the thickness
shrinks with the spacing and the speeds don't. <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#sampleworststepmotion">`SampleWorstStepMotion`</a> measures how close the sheet has come,
and a higher <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a> is the cheap cure, see [outrunning the contacts](/docs/fabric-simulation-diagnostics/#outrunning-the-contacts).

### FabricEffect self-collision constants

| Constant | Description |
| --- | --- |
| <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#spatialhashmaxpercell">`SpatialHashMaxPerCell`</a> | `uint`, 32: points a cell of the hash files. A crushed pile wants about 30. |
| <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#contactcandidatecapacity">`ContactCandidateCapacity`</a> | `int`, 32: partners a point keeps a step. Must match the solver's, which the constructor checks. |

## Rest

A step moves each point by the motion it carried from the last step, and whatever the rounds left a little wrong is in
that motion, and comes back as momentum: a settled sheet would twitch forever on the solver's own noise. With
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#userestthreshold">`UseRestThreshold`</a>, on by default, motion slower than <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restspeedthreshold">`RestSpeedThreshold`</a>, 6 cm/s by default, is thrown
away as noise. Two kinds of slow motion are kept:

- **A point still being pushed** keeps moving: a slow point moving the way the force on it pushes is falling, not
  resting, and would otherwise freeze in mid-air. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restdrivefraction">`RestDriveFraction`</a> is how much of a step's push counts as
  pushing: 0.5 by default, and near 1 keeps nothing moving.
- **A slow swing** of a point touching nothing is kept too. Noise is as likely one way as the other, and averages
  away over a few steps; a sheet settling to a new lean as a gust dies doesn't. So motion whose average over the last
  1/15 s is above a quarter of the threshold is kept. A point touching something is stopped all the same, as friction
  stops slow sliding.

A higher threshold settles sooner, and ignores gentler nudges.

## Holding settled cloth still

That isn't enough for a pile. Every resting point still gets gravity's push each step and a push back, as good as
approximate, from what it rests on, and what is left over creeps: a heap spreads flat over a minute and never stops.
<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useresthold">`UseRestHold`</a>, on by default with the threshold, adds what friction adds.

A point that has rested for <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restholddelay">`RestHoldDelay`</a>, 0.05 s by default and never fewer than two steps, and is supported is
held. Supported is touching the floor, the sphere or other cloth, or joined by a thread to a held point. A held point
still takes part in every round, with every force, but:

- **A push it can ignore isn't applied.** A resting point gets no push into what carries it, which keeps a settling
  pile from sinking into itself. Of the rest of the push, down a slope or from the wind, static friction holds what
  lies within its cone. The friction setting `f` is <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#colliderfriction">`ColliderFriction`</a> on a collider and
  <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionfriction">`SelfCollisionFriction`</a> on cloth, and the cone's coefficient is `f / (1 − f)`: the push along the carrier
  it holds is that many times the push into it. So 0.35 holds a slope of about 28°, 0.5 one of 45°, and 1 any slope;
  0 holds nothing. What is left under <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restholdwakefraction">`RestHoldWakeFraction`</a> of the
  rest threshold per 1/120 s, 3.6 m/s² at the defaults, is ignored too.
- **A small net move snaps back.** At the end of the step, a move within its wake was noise, and the point goes back
  to where the step began. The wake is `RestHoldWakeFraction` of the distance the rest threshold covers in 1/120 s,
  0.25 mm at the defaults. Anything more was a pull, by a thread or a contact, and the point is free.

A larger push frees a held point if it moves it, though braced by its neighbors it stays held, and drives a point
that isn't held, which then slides under the kinetic friction rather than creeping on by one push a step. Pushes are
accelerations and pulls distances, each stated at 120 steps a second, so none of this changes with the step rate.
Neighbors treat a held point as they treat any other, never as a pin: full corrections against a frozen point would
overshoot, and wake the pile. A hanging sheet touches nothing and is never held, so it swings and settles as it
would without.

What it costs: cloth lying on something ignores pushes under 3.6 m/s², a breeze under about 1 m/s, and a collider
sinks 0.25 mm into held cloth before it yields, at any step rate. Past about 300 steps a second, a step's own leftover
reaches those distances and the hold errs towards holding: a sheet draped over a ball that slides off it in five
seconds at 60 to 240 steps a second stays put at 480. <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#sampleheldfraction">`SampleHeldFraction`</a> says how much of the sheet is held,
and a pile at rest reads 1, see [rest and hold](/docs/fabric-simulation-diagnostics/#rest-and-hold).

### FabricSettings rest properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#userestthreshold">`UseRestThreshold`</a> | `bool`. Lets nearly still cloth settle instead of twitching on the solver's noise. `true` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restspeedthreshold">`RestSpeedThreshold`</a> | `float`. Below this speed, in meters per second, carried motion is noise, but for the two kinds kept. 0.06 by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restdrivefraction">`RestDriveFraction`</a> | `float`. How much of a step's push keeps a slow point moving, 0 to 1. 0.5 by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useresthold">`UseRestHold`</a> | `bool`. Holds settled, supported cloth exactly still, as friction does. Needs `UseRestThreshold`. `true` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restholddelay">`RestHoldDelay`</a> | `float`. Seconds a supported point must rest before it is held: at least two steps, at most 8,191. 0.05 by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restholdwakefraction">`RestHoldWakeFraction`</a> | `float`. How far a held point must be pulled in a step to come free, and how hard a push it ignores, both as a share of the rest threshold at 120 steps a second, 0 to 1. 0.5 by default. |
