---
layout: docs
legend: [prop]
title: "Glossary: FabricSettings"
description: "The members of FabricSettings, in alphabetical order."
---

Every tunable of the solver and of the sheet it builds.

A sealed class of properties, in the namespace `BorrowedTorch.FabricSimulator.Simulation`: `new FabricSettings()` gives every setting its default, except the grid and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a>, which are 0 and every setup must set. A plain object you change in place: <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#update">`Update`</a> and <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#step">`Step`</a> apply it before every step, so a change takes effect at the next one. The sheet's own settings, the grid, `RestLength` and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#seedripple">`SeedRipple`</a>, are read only by <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, see <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#autorebuild">`AutoRebuild`</a>. Where the sheet hangs and what holds it are <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric/">`Fabric`</a>'s own. A setting that isn't a finite number throws `ArgumentException` at the next upload, naming it, rather than reaching the GPU, where one NaN spreads through the whole sheet within a few steps. The [settings page](/docs/fabric-simulation-settings/#fabricsettings-solver-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="addedmasscoefficient"><span class="prop"><code>AddedMassCoefficient</code></span> <a class="ctx" href="/docs/fabric-simulation-wind/#fabricsettings-air-properties" title="AddedMassCoefficient in context on the wind page" aria-label="AddedMassCoefficient in context on the wind page">→</a></h3>

`float` · With <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useaerodynamicpressure">`UseAerodynamicPressure`</a> only: how much of the air the sheet drags along counts as extra mass, 0 none and 1 the physical amount. 1 by default; below 0 counts as 0. It can only calm the cloth: the pressure model divides by the mass it adds rather than adding a force.

<h3 id="airdensity"><span class="prop"><code>AirDensity</code></span> <a class="ctx" href="/docs/fabric-simulation-wind/#fabricsettings-air-properties" title="AirDensity in context on the wind page" aria-label="AirDensity in context on the wind page">→</a></h3>

`float` · The air's density, in kilograms per cubic meter. 1.225 by default, air at sea level; 0 is a vacuum, with no drag at all, and below 0 counts as 0.

<h3 id="arealdensity"><span class="prop"><code>ArealDensity</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-mass-properties" title="ArealDensity in context on the settings page" aria-label="ArealDensity in context on the settings page">→</a></h3>

`float` · The cloth's weight, in kilograms per square meter. 0.2 by default; light cotton is about 0.15, canvas 0.5, upholstery 1. Each point carries the patch of cloth it stands for, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#particlemass">`ParticleMass`</a>, so a sheet behaves the same at any resolution. Values under 10<sup>−7</sup> count as 10<sup>−7</sup>.

<h3 id="autorebuild"><span class="prop"><code>AutoRebuild</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-sheet-properties" title="AutoRebuild in context on the settings page" aria-label="AutoRebuild in context on the settings page">→</a></h3>

`bool` · Whether the sheet rebuilds by itself, at the next <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#update">`Update`</a> or <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#step">`Step`</a>, whenever something only <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a> reads has changed: the grid, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a> or <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#seedripple">`SeedRipple`</a>, or the sheet's <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#origin">`Origin`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#orientation">`Orientation`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#rotation">`Rotation`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinmode">`PinMode`</a> or <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinnedindices">`PinnedIndices`</a>. Exact comparisons, and a `SeedRipple` as it is clamped. `false` by default. A rebuild starts over, a fresh sheet with every tear mended and every <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#setpinned">`SetPinned`</a> change dropped, so it suits a setup being edited, from a tuning panel say, not an `Origin` moved every frame. Handle <a class="ref event" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuilt">`Rebuilt`</a> to resize your buffers.

<h3 id="bendingiterations"><span class="prop"><code>BendingIterations</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-bending-properties" title="BendingIterations in context on the settings page" aria-label="BendingIterations in context on the settings page">→</a></h3>

`int` · How many of the <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#relaxationiterations">`RelaxationIterations`</a> rounds also solve folds, spread evenly over them. <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#everyround">`EveryRound`</a>, the default, or any count from `RelaxationIterations` up, means every round; below 0 counts as `EveryRound`. Each round that solves folds adds a pass that solves every fold once. With <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#contactiterations">`ContactIterations`</a>, the knob to turn first on a large sheet, which wants 1 or 2.

<h3 id="bendingplasticrate"><span class="prop"><code>BendingPlasticRate</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-bending-properties" title="BendingPlasticRate in context on the settings page" aria-label="BendingPlasticRate in context on the settings page">→</a></h3>

`float` · How fast a fold bent past <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingplasticyielddegrees">`BendingPlasticYieldDegrees`</a> sets as a crease: the share of the way its rest angle moves towards the fold. A fraction per 1/120 s, that is per step at the default <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a>, rescaled to any other step rate so the cloth behaves the same. 0 by default, a fold that always springs back; 0.01 to 0.1 for cloth that remembers its folds. Clamped to 0 to 1.

<h3 id="bendingplasticyielddegrees"><span class="prop"><code>BendingPlasticYieldDegrees</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-bending-properties" title="BendingPlasticYieldDegrees in context on the settings page" aria-label="BendingPlasticYieldDegrees in context on the settings page">→</a></h3>

`float` · How far a fold must pass its rest shape, in degrees, before it starts to set as a crease at <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingplasticrate">`BendingPlasticRate`</a>. 30 by default. Clamped to 0 to 180.

<h3 id="bendingstiffness"><span class="prop"><code>BendingStiffness</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-bending-properties" title="BendingStiffness in context on the settings page" aria-label="BendingStiffness in context on the settings page">→</a></h3>

`float` · How hard folds are resisted. Keep it well under <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#stiffness">`Stiffness`</a>: real cloth folds far more easily than it stretches, and a stiff fold turns it to cardboard. 0.5 by default. Clamped to 0 to 1.

<h3 id="colliderfriction"><span class="prop"><code>ColliderFriction</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-collider-properties" title="ColliderFriction in context on the collisions page" aria-label="ColliderFriction in context on the collisions page">→</a></h3>

`float` · The grip of the sphere and the ground: 0 slides freely, 1 sticks. A fraction per 1/120 s, that is per step at the default <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a>, rescaled to any other step rate so the cloth behaves the same. Read as it is, unscaled, it is also the coefficient of static friction that holds resting cloth on a slope or against a breeze, see <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useresthold">`UseRestHold`</a>: 0.35 holds about 28°, at any step rate. 0.35 by default. Clamped to 0 to 1.

<h3 id="compressionslack"><span class="prop"><code>CompressionSlack</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-solver-properties" title="CompressionSlack in context on the settings page" aria-label="CompressionSlack in context on the settings page">→</a></h3>

`float` · How short a thread may fold, as a fraction of its rest length, before it pushes back: between that and its rest length it is free, as cloth crumples easily. Lower crumples tighter. With self-collision on, keep it at least <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#minimumcompressionslackforcontacts">`MinimumCompressionSlackForContacts`</a>, or crushed threads hold layers closer than the cloth is thick and a pile never settles. 0.375 by default, that minimum at the default thickness. Clamped to 0 to 1.

<h3 id="contactiterations"><span class="prop"><code>ContactIterations</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-self-collision-properties" title="ContactIterations in context on the collisions page" aria-label="ContactIterations in context on the collisions page">→</a></h3>

`int` · How many of the <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#relaxationiterations">`RelaxationIterations`</a> rounds also solve self-collision, spread evenly over them. <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#everyround">`EveryRound`</a>, or any count from `RelaxationIterations` up, means every round; below 0 counts as `EveryRound`. 4 by default. The partners are found once a step, so each extra round only tests them again, but on a large sheet it is still the first knob to turn down: large grids want 1 or 2.

<h3 id="damping"><span class="prop"><code>Damping</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-solver-properties" title="Damping in context on the settings page" aria-label="Damping in context on the settings page">→</a></h3>

`float` · The share of the cloth's motion damped away. A fraction per 1/120 s, that is per step at the default <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a>, rescaled to any other step rate so the cloth behaves the same. 0.02 by default; 0.01 to 0.05 suits cloth. Clamped to 0 to 1.

<h3 id="dragcoefficient"><span class="prop"><code>DragCoefficient</code></span> <a class="ctx" href="/docs/fabric-simulation-wind/#fabricsettings-air-properties" title="DragCoefficient in context on the wind page" aria-label="DragCoefficient in context on the wind page">→</a></h3>

`float` · How hard the air resists the sheet: scales the drag on each point's patch of cloth, against its motion relative to <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#wind">`Wind`</a>. 1.2 by default, about right for a flat sheet; 0 is no drag, and below 0 counts as 0.

<h3 id="gravity"><span class="prop"><code>Gravity</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-mass-properties" title="Gravity in context on the settings page" aria-label="Gravity in context on the settings page">→</a></h3>

`Vector3` · The acceleration of gravity, in meters per second squared, in world space. `(0, -9.81, 0)` by default. The ground collider stays level, at <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#groundcolliderheight">`GroundColliderHeight`</a>, whichever way it points.

<h3 id="groundcolliderheight"><span class="prop"><code>GroundColliderHeight</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-collider-properties" title="GroundColliderHeight in context on the collisions page" aria-label="GroundColliderHeight in context on the collisions page">→</a></h3>

`float` · The ground's height: the world Y of a level plane, whichever way <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#gravity">`Gravity`</a> points. 0 by default.

<h3 id="heightinparticles"><span class="prop"><code>HeightInParticles</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-sheet-properties" title="HeightInParticles in context on the settings page" aria-label="HeightInParticles in context on the settings page">→</a></h3>

`int` · Points from the first row to the last: along the height of a vertical sheet, the depth of one lying down. 0 by default: always set it, to at least 2. Read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, which throws `InvalidOperationException` for less than 2; <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#heightinparticles">`HeightInParticles`</a> reports the sheet as built.

<h3 id="maxstepsperframe"><span class="prop"><code>MaxStepsPerFrame</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-solver-properties" title="MaxStepsPerFrame in context on the settings page" aria-label="MaxStepsPerFrame in context on the settings page">→</a></h3>

`int` · The most steps one frame may run to catch up. The backlog beyond is dropped, and <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#issaturated">`IsSaturated`</a> says so, so one slow frame can't snowball into slower ones. 4 by default; below 1 counts as 1.

<h3 id="minimumcompressionslackforcontacts"><span class="prop"><code>MinimumCompressionSlackForContacts</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-self-collision-properties" title="MinimumCompressionSlackForContacts in context on the collisions page" aria-label="MinimumCompressionSlackForContacts in context on the collisions page">→</a></h3>

`float` · Read-only. The lowest <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#compressionslack">`CompressionSlack`</a> that doesn't fight self-collision: half of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthicknessratio">`SelfCollisionThicknessRatio`</a>, at least 0.05 of it, so 0.375 at the default. Below it, two crushed threads hold points two apart closer than the cloth is thick, and a pile re-fights the same contacts every round instead of settling.

<h3 id="particlemass"><span class="prop"><code>ParticleMass</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-mass-properties" title="ParticleMass in context on the settings page" aria-label="ParticleMass in context on the settings page">→</a></h3>

`float` · Read-only. The mass one point carries, in kilograms: <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#arealdensity">`ArealDensity`</a> × <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a>², the patch of cloth it stands for, at least 10<sup>−7</sup>. From these settings' `RestLength`, which the live sheet takes only at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>.

<h3 id="relaxationiterations"><span class="prop"><code>RelaxationIterations</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-solver-properties" title="RelaxationIterations in context on the settings page" aria-label="RelaxationIterations in context on the settings page">→</a></h3>

`int` · The rounds of constraint solving per step: more rounds, less stretch, and proportionally more work. 10 by default; 8 to 14 suits cloth. Unlike <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingiterations">`BendingIterations`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#contactiterations">`ContactIterations`</a>, 0 means none: no threads are solved, though one round still runs, so the colliders and the pins' reach hold. Below 0 counts as 0.

<h3 id="restdrivefraction"><span class="prop"><code>RestDriveFraction</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-rest-properties" title="RestDriveFraction in context on the collisions page" aria-label="RestDriveFraction in context on the collisions page">→</a></h3>

`float` · Keeps gently falling points awake: a slow point moving along the force on it faster than this fraction of what one step's push adds is falling, not resting, and without this it would freeze in mid-air. 0.5 by default, half a step's push; near 1 keeps nothing awake. Clamped to 0 to 1.

<h3 id="restholddelay"><span class="prop"><code>RestHoldDelay</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-rest-properties" title="RestHoldDelay in context on the collisions page" aria-label="RestHoldDelay in context on the collisions page">→</a></h3>

`float` · How long a supported point must rest, in seconds, before <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useresthold">`UseRestHold`</a> holds it. 0.05 by default. Rounded to whole steps, at least 2, so a bounce's apex is never held, and at most 8,191; below 0 counts as 0, and so as 2 steps.

<h3 id="restholdwakefraction"><span class="prop"><code>RestHoldWakeFraction</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-rest-properties" title="RestHoldWakeFraction in context on the collisions page" aria-label="RestHoldWakeFraction in context on the collisions page">→</a></h3>

`float` · What it takes to move a held point. A pull, by a thread or a contact, frees it when it moves the point further in one step than this fraction of the rest distance at 120 Hz, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restspeedthreshold">`RestSpeedThreshold`</a> ÷ 120: a wake distance of 0.25 mm at the defaults. A push, from the wind or down a slope past static friction, is ignored up to the same fraction of `RestSpeedThreshold` per 1/120 s: 3.6 m/s² at the defaults. Both hold at any step rate. Lower wakes sooner; higher lets more push go unanswered, and a collider sinks that far into held cloth before it yields. 0.5 by default. Clamped to 0 to 1.

<h3 id="restlength"><span class="prop"><code>RestLength</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-sheet-properties" title="RestLength in context on the settings page" aria-label="RestLength in context on the settings page">→</a></h3>

`float` · The spacing between neighboring points, in meters. 0 by default: always set it; 0.03 to 0.06 is typical. Read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, which throws `InvalidOperationException` for a spacing that isn't finite and positive: the pins' reach, the rest angles and the cuts are all measured in it, so the live sheet keeps the spacing it was built with, which <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#restlength">`RestLength`</a> reports. A <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/">`FabricEffect`</a> driven without a <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric/">`Fabric`</a> takes it at every <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#apply">`Apply`</a>.

<h3 id="restspeedthreshold"><span class="prop"><code>RestSpeedThreshold</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-rest-properties" title="RestSpeedThreshold in context on the collisions page" aria-label="RestSpeedThreshold in context on the collisions page">→</a></h3>

`float` · The rest deadband, in meters per second: below this speed a point's carried motion is discarded as solver noise. Unless it persists on a point touching nothing: motion whose average over the last 1/15 s is over a quarter of this is a slow swing, not noise, and is kept, while a point touching something is stopped, as friction would stop it. Higher settles sooner, but ignores gentler nudges. 0.06 by default; below 0 counts as 0. Needs <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#userestthreshold">`UseRestThreshold`</a>.

<h3 id="seedripple"><span class="prop"><code>SeedRipple</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-sheet-properties" title="SeedRipple in context on the settings page" aria-label="SeedRipple in context on the settings page">→</a></h3>

`float` · A starting waviness, as a fraction of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a>: it breaks the tie over which way a flat sheet buckles. Raise it for a sheet dropped flat. 0.05 by default. Clamped to 0 to <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#maxseedripple">`MaxSeedRipple`</a>. The spacing in the sheet's plane shrinks to pay for the wave's steepest rise, so wavy cloth is narrower, not stretched: <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#builtwidth">`BuiltWidth`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#builtheight">`BuiltHeight`</a> give its size. Read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, which throws `InvalidOperationException` for one that isn't finite.

<h3 id="selfcollisionfriction"><span class="prop"><code>SelfCollisionFriction</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-self-collision-properties" title="SelfCollisionFriction in context on the collisions page" aria-label="SelfCollisionFriction in context on the collisions page">→</a></h3>

`float` · The grip between layers of cloth that touch, apart from <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#colliderfriction">`ColliderFriction`</a>. A fraction per 1/120 s, that is per step at the default <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a>, rescaled to any other step rate so the cloth behaves the same. 0 lets heaps spread flatter than real cloth. Read as it is, unscaled, it is also the coefficient of static friction that holds resting cloth on cloth, see <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useresthold">`UseRestHold`</a>. 0.35 by default. Clamped to 0 to 1.

<h3 id="selfcollisionstiffness"><span class="prop"><code>SelfCollisionStiffness</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-self-collision-properties" title="SelfCollisionStiffness in context on the collisions page" aria-label="SelfCollisionStiffness in context on the collisions page">→</a></h3>

`float` · The share of an overlap between two layers pushed apart per round. Lower helps a deep pile settle. 1 by default. Clamped to 0 to 1.

<h3 id="selfcollisionthickness"><span class="prop"><code>SelfCollisionThickness</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-self-collision-properties" title="SelfCollisionThickness in context on the collisions page" aria-label="SelfCollisionThickness in context on the collisions page">→</a></h3>

`float` · Read-only. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthicknessratio">`SelfCollisionThicknessRatio`</a> in meters: the ratio, at least 0.05, × <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a>. From these settings' `RestLength`, which can run ahead of the built sheet until the next <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>: the solver uses the spacing the sheet was built with, and so should <a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/#run">`Run`</a>.

<h3 id="selfcollisionthicknessratio"><span class="prop"><code>SelfCollisionThicknessRatio</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-self-collision-properties" title="SelfCollisionThicknessRatio in context on the collisions page" aria-label="SelfCollisionThicknessRatio in context on the collisions page">→</a></h3>

`float` · The cloth's thickness, as a fraction of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a>: how close two layers may get. 0.75 by default; 0.05 to 0.9, and below 0.05 counts as 0.05. Heaps want about 0.85, and past 0.9 the sheet inflates itself. Raising it raises <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#minimumcompressionslackforcontacts">`MinimumCompressionSlackForContacts`</a>: raise <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#compressionslack">`CompressionSlack`</a> with it, to half of it.

<h3 id="shearingrestlength"><span class="prop"><code>ShearingRestLength</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-solver-properties" title="ShearingRestLength in context on the settings page" aria-label="ShearingRestLength in context on the settings page">→</a></h3>

`float` · Read-only. The diagonal spacing, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a> × √2: the rest length of the shearing threads.

<h3 id="solverfrequencyhz"><span class="prop"><code>SolverFrequencyHz</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-solver-properties" title="SolverFrequencyHz in context on the settings page" aria-label="SolverFrequencyHz in context on the settings page">→</a></h3>

`float` · Steps per second. Fixed, so the cloth behaves the same at any frame rate: higher is steadier and costlier. The rates per 1/120 s, and the motion carried from step to step, are rescaled to it, so changing it, even on a running sheet, changes the cost and the stability, not how the cloth moves. 120 by default; 120 to 240 is typical. The step it takes is held to 0.0001 to 0.25 s, see <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#timestep">`TimeStep`</a>. Throws `ArgumentException` at the next upload for one that isn't finite and positive.

<h3 id="spherecollidercenter"><span class="prop"><code>SphereColliderCenter</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-collider-properties" title="SphereColliderCenter in context on the collisions page" aria-label="SphereColliderCenter in context on the collisions page">→</a></h3>

`Vector3` · The sphere's center, in world space. `(0, 0, 0)` by default. Set it every frame to move the sphere: it is uploaded with the other settings.

<h3 id="spherecolliderradius"><span class="prop"><code>SphereColliderRadius</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-collider-properties" title="SphereColliderRadius in context on the collisions page" aria-label="SphereColliderRadius in context on the collisions page">→</a></h3>

`float` · The sphere's radius, in meters. 1 by default; below 0 counts as 0.

<h3 id="stiffness"><span class="prop"><code>Stiffness</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-solver-properties" title="Stiffness in context on the settings page" aria-label="Stiffness in context on the settings page">→</a></h3>

`float` · The share of a thread's stretch removed per round: 1 is crisp, lower is springy. 0.9 by default; 0.8 to 1 suits cloth. Clamped to 0 to 1.

<h3 id="timestep"><span class="prop"><code>TimeStep</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-solver-properties" title="TimeStep in context on the settings page" aria-label="TimeStep in context on the settings page">→</a></h3>

`float` · Read-only. The step the solver takes, in seconds: 1 ÷ <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a>, held to 0.0001 to 0.25 s, so the frequency is in effect held to 4 to 10,000 Hz.

<h3 id="useaerodynamicpressure"><span class="prop"><code>UseAerodynamicPressure</code></span> <a class="ctx" href="/docs/fabric-simulation-wind/#fabricsettings-air-properties" title="UseAerodynamicPressure in context on the wind page" aria-label="UseAerodynamicPressure in context on the wind page">→</a></h3>

`bool` · Couples the whole sheet through the air it pushes, so sails and parachutes billow rather than only flutter: air under the middle of a sheet has further to escape than air at its rim, which drag on each point alone can't see. Added mass, split into ever-coarser bands, see <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#addedmasscoefficient">`AddedMassCoefficient`</a>. Costs a few passes a step. `false` by default. Supports sheets up to 4,096 points along their longer side: <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a> and <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#apply">`Apply`</a> throw `InvalidOperationException` beyond that. The pressure doesn't see holes: a torn sail catches as much air as a whole one.

<h3 id="usebendingconstraints"><span class="prop"><code>UseBendingConstraints</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-bending-properties" title="UseBendingConstraints in context on the settings page" aria-label="UseBendingConstraints in context on the settings page">→</a></h3>

`bool` · Whether folding is resisted, not only stretching: each fold between two triangles keeps to its rest angle, softly, at <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingstiffness">`BendingStiffness`</a>. Off, the cloth folds freely at every thread. `true` by default.

<h3 id="usegroundcollider"><span class="prop"><code>UseGroundCollider</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-collider-properties" title="UseGroundCollider in context on the collisions page" aria-label="UseGroundCollider in context on the collisions page">→</a></h3>

`bool` · A level floor, at <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#groundcolliderheight">`GroundColliderHeight`</a>, for the cloth to land and pile on. `true` by default.

<h3 id="uselongrangeattachments"><span class="prop"><code>UseLongRangeAttachments</code></span> <a class="ctx" href="/docs/fabric-simulation-pins/#fabricsettings-attachment-property" title="UseLongRangeAttachments in context on the placement and pins page" aria-label="UseLongRangeAttachments in context on the placement and pins page">→</a></h3>

`bool` · Holds every point within reach of its pin, measured along the weave, so a large, heavily loaded sheet doesn't stretch like rubber below its pins: the relaxation rounds alone pass a pin's hold down the sheet one thread at a time. No effect when nothing is pinned. `true` by default.

<h3 id="useresthold"><span class="prop"><code>UseRestHold</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-rest-properties" title="UseRestHold in context on the collisions page" aria-label="UseRestHold in context on the collisions page">→</a></h3>

`bool` · Holds settled cloth exactly still, as friction does: without it, a pile creeps and twitches forever. A point that has rested for <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restholddelay">`RestHoldDelay`</a> and is supported, touching the ground, the sphere or other cloth, or joined by a thread to a held point, is held: it ignores a push under <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restholdwakefraction">`RestHoldWakeFraction`</a>, and a move that small at the end of a step snaps back to where the step began. A resting point that something carries gets no push into its carrier, and static friction, the carrier's friction setting read as a coefficient, holds what lies within its cone; what is left past that drives the point, which then slides rather than creeps. A hanging sheet touches nothing and is never held. Needs <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#userestthreshold">`UseRestThreshold`</a>. `true` by default. <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#sampleheldfraction">`SampleHeldFraction`</a> says how much of the sheet is held.

<h3 id="userestthreshold"><span class="prop"><code>UseRestThreshold</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-rest-properties" title="UseRestThreshold in context on the collisions page" aria-label="UseRestThreshold in context on the collisions page">→</a></h3>

`bool` · The rest deadband: lets nearly still cloth settle instead of jittering on solver noise, which Verlet integration would otherwise carry on as motion. See <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restspeedthreshold">`RestSpeedThreshold`</a>. `true` by default. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useresthold">`UseRestHold`</a> needs it.

<h3 id="useselfcollision"><span class="prop"><code>UseSelfCollision</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-self-collision-properties" title="UseSelfCollision in context on the collisions page" aria-label="UseSelfCollision in context on the collisions page">→</a></h3>

`bool` · Stops the cloth passing through itself: the points are filed in a spatial hash every step, each gathers its partners once, and the contact rounds push apart the ones closer than <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthickness">`SelfCollisionThickness`</a>. The most expensive option. `true` by default.

<h3 id="useshearingconstraints"><span class="prop"><code>UseShearingConstraints</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-solver-properties" title="UseShearingConstraints in context on the settings page" aria-label="UseShearingConstraints in context on the settings page">→</a></h3>

`bool` · Diagonal threads across every square, so the weave can't shear out of square. `true` by default. The pins' reach is measured through them too, so a change is followed by measuring it again before the next step.

<h3 id="usespherecollider"><span class="prop"><code>UseSphereCollider</code></span> <a class="ctx" href="/docs/fabric-simulation-collisions/#fabricsettings-collider-properties" title="UseSphereCollider in context on the collisions page" aria-label="UseSphereCollider in context on the collisions page">→</a></h3>

`bool` · A sphere the cloth can't pass through, at <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#spherecollidercenter">`SphereColliderCenter`</a> with <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#spherecolliderradius">`SphereColliderRadius`</a>. `false` by default.

<h3 id="widthinparticles"><span class="prop"><code>WidthInParticles</code></span> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-sheet-properties" title="WidthInParticles in context on the settings page" aria-label="WidthInParticles in context on the settings page">→</a></h3>

`int` · Points across. 0 by default: always set it, to at least 2. Read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, which throws `InvalidOperationException` for less than 2; <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#widthinparticles">`WidthInParticles`</a> reports the sheet as built.

<h3 id="wind"><span class="prop"><code>Wind</code></span> <a class="ctx" href="/docs/fabric-simulation-wind/#fabricsettings-air-properties" title="Wind in context on the wind page" aria-label="Wind in context on the wind page">→</a></h3>

`Vector3` · The air's velocity, in meters per second, in world space: not a force, since drag acts on the cloth's motion relative to it. Still air, `(0, 0, 0)`, by default. Uploaded at every update, so set it every frame for gusts, from any formula you like. The same over the whole sheet, unless a <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#fabric_wind_at">`FABRIC_WIND_AT`</a> wind function varies it in space, where it is in scope as `Wind`.

## Fields

<h3 id="everyround"><code>EveryRound</code> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-bending-properties" title="EveryRound in context on the settings page" aria-label="EveryRound in context on the settings page">→</a></h3>

`int` · Constant, 0. What <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingiterations">`BendingIterations`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#contactiterations">`ContactIterations`</a> take to mean every round of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#relaxationiterations">`RelaxationIterations`</a>; for `RelaxationIterations` itself, 0 means none. Named so a line of code says which it means.

<h3 id="maxseedripple"><code>MaxSeedRipple</code> <a class="ctx" href="/docs/fabric-simulation-settings/#fabricsettings-sheet-properties" title="MaxSeedRipple in context on the settings page" aria-label="MaxSeedRipple in context on the settings page">→</a></h3>

`float` · Constant, 0.5. The largest <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#seedripple">`SeedRipple`</a>. At this much wave the flatter rows start up to 6 % short of their rest length, which costs nothing: threads only resist shortening past <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#compressionslack">`CompressionSlack`</a>.
