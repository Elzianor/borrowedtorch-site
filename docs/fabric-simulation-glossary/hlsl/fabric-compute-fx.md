---
layout: docs
title: "Glossary: FabricCompute.fx"
description: "The technique, hooks, uniforms and defines of FabricCompute.fx, in alphabetical order."
---

The solver as a host sees it: the effect <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/">`FabricEffect`</a> loads and dispatches, the two names an effect of your own defines to change it, and the names a wind function of yours can read.

An HLSL effect, copied by the package into your content at `Content/Effects/Fabric/FabricCompute.fx` on every build with the header that holds its body, `FabricSimulation.fxh`, and built by the package's own response file, `Content/BorrowedTorch.FabricSimulator.mgcb`, into `Content/Effects/Fabric/FabricCompute.xnb`: <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#defaulteffectpath">`FabricEffect.DefaultEffectPath`</a> for a `ContentManager` rooted at `Content`. Every build refreshes the copies, so an edit made in place is lost at the next one. To change the solver, wrap it rather than edit it: an `.fx` of your own in `Content/Effects` that defines what it needs, includes `"Fabric/FabricCompute.fx"`, adds anything after, and is built by your own `Content.mgcb`; load it by its path, as the third argument of the `FabricEffect` constructor. Without anything defined, the solver compiles exactly as shipped. The [wind page](/docs/fabric-simulation-wind/#fabriccomputefx-names) shows it in context, with code.

## Defines

<h3 id="contactcandidatecapacity"><code>ContactCandidateCapacity</code> <a class="ctx" href="/docs/fabric-simulation-wind/#fabriccomputefx-names" title="ContactCandidateCapacity in context on the wind page" aria-label="ContactCandidateCapacity in context on the wind page">→</a></h3>

`32` · The self-collision partners a particle keeps per step, gathered once a step and tested in every round that solves contacts; in `FabricSimulation.fxh`. Must equal <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#contactcandidatecapacity">`FabricEffect.ContactCandidateCapacity`</a>: the `FabricEffect` constructor reads it from the copy in your content and throws `InvalidOperationException` when it differs. A pile crushed hard enough to want more loses partners for that step, which <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplespatialhashoverflow">`SampleSpatialHashOverflow`</a> reports.

<h3 id="fabric_count_coincident"><code>FABRIC_COUNT_COINCIDENT</code> <a class="ctx" href="/docs/fabric-simulation-wind/#fabriccomputefx-names" title="FABRIC_COUNT_COINCIDENT in context on the wind page" aria-label="FABRIC_COUNT_COINCIDENT in context on the wind page">→</a></h3>

Not defined by the package. Define it, to anything, before the include in an effect of your own, and the solver counts the contacts between particles it finds at the same point with no history to tell them apart, which it pushes apart along an axis picked from their indices, a guess that can swap two layers. <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplecoincidentcontacts">`FabricEffect.SampleCoincidentContacts`</a> reads the count, and reads zero without it. Off by default because the count costs an atomic in the innermost contact loop.

```hlsl
#define FABRIC_COUNT_COINCIDENT
#include "Fabric/FabricCompute.fx"
```

<h3 id="fabric_wind_at"><code>FABRIC_WIND_AT</code> <a class="ctx" href="/docs/fabric-simulation-wind/#fabriccomputefx-names" title="FABRIC_WIND_AT in context on the wind page" aria-label="FABRIC_WIND_AT in context on the wind page">→</a></h3>

Not defined by the package. The name of a wind function of yours, `float3 f(float3 position)`: air that varies across the sheet. The solver calls it every step for every particle that isn't pinned, at the particle's world position as the step begins, and takes the answer as the air's velocity there, in meters per second, where it would otherwise take <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#wind">`Wind`</a>. Declare the function before the include, define the name, include the solver, then define the function after it, where `Wind` and <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#fabrictime">`FabricTime`</a> are in scope. An answer that isn't finite falls back to `Wind`, since one NaN would spread through the whole sheet within a few steps. The function's own uniforms are set through <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#shader">`FabricEffect.Shader`</a>, the sheet's own copy of the effect, not the instance `Content.Load` returns. Each formula is a solver of its own, compiled with your content, so changing one is a content rebuild.

```hlsl
// Content/Effects/ClothSolver.fx
float3 GustBands(float3 position);   // declared before the solver, defined after it
#define FABRIC_WIND_AT GustBands
#include "Fabric/FabricCompute.fx"

float GustStrength;                  // set through FabricEffect.Shader

float3 GustBands(float3 position)
{
    float band = saturate(sin(position.x * 1.5 - FabricTime * 2.5));

    return Wind * (1.0 + GustStrength * band * band);
}
```

<h3 id="groupsize"><code>GroupSize</code> <a class="ctx" href="/docs/fabric-simulation-wind/#fabriccomputefx-names" title="GroupSize in context on the wind page" aria-label="GroupSize in context on the wind page">→</a></h3>

`256` · Threads per group of every kernel, one per particle; in `FabricSimulation.fxh`. Must equal <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#computegroupsize">`FabricEffect.ComputeGroupSize`</a>, or each dispatch covers only part of the sheet: the `FabricEffect` constructor reads it from the copy in your content and throws `InvalidOperationException` when it differs.

## Uniforms

<h3 id="fabrictime"><code>FabricTime</code> <a class="ctx" href="/docs/fabric-simulation-wind/#fabriccomputefx-names" title="FabricTime in context on the wind page" aria-label="FabricTime in context on the wind page">→</a></h3>

`float` · Simulated seconds since the sheet was uploaded, set before every step: <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#time">`FabricEffect.Time`</a>. A clock for a wind function, which follows the cloth rather than the frame when the solver falls behind.

<h3 id="wind"><code>Wind</code> <a class="ctx" href="/docs/fabric-simulation-wind/#fabriccomputefx-names" title="Wind in context on the wind page" aria-label="Wind in context on the wind page">→</a></h3>

`float3` · The air's velocity, in meters per second, from <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#wind">`FabricSettings.Wind`</a>, uploaded with the other settings at every <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#apply">`Apply`</a>, so at every <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#update">`Fabric.Update`</a>. Not a force: drag acts on the cloth's motion relative to it. The whole sheet feels it unless a <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#fabric_wind_at">`FABRIC_WIND_AT`</a> function answers instead, which can read it, to scale its own air by what the host set this frame, so still air stays still.

## Technique

<h3 id="fabrictechnique"><code>FabricTechnique</code> <a class="ctx" href="/docs/fabric-simulation-wind/#fabriccomputefx-names" title="FabricTechnique in context on the wind page" aria-label="FabricTechnique in context on the wind page">→</a></h3>

`technique` · The solver's eight compute passes, `cs_5_0`, which <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#step">`FabricEffect.Step`</a> dispatches by name, one thread per particle, in this order:

- `IntegratePass`: pins, normals, plasticity, forces and the Verlet step.
- `ReducePressurePass` and `ApplyPressurePass`, with <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useaerodynamicpressure">`UseAerodynamicPressure`</a> on: the reduce once per level of the pressure pyramid, then the apply.
- `ClearSpatialHashPass`, `BuildSpatialHashPass` and `GatherCandidatesPass`, with <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useselfcollision">`UseSelfCollision`</a> on: the hash rebuilt, then each particle's contact partners gathered once for the step.
- Then the constraint rounds, `ConstraintsPass` once per round, each round that solves bending preceded by `BendPass`, which solves every fold once for the round to gather.

A wrapping effect keeps the technique and every pass: the `FabricEffect` constructor throws `InvalidOperationException` when the effect it loads has no `FabricTechnique`, or lacks one of the passes, as an effect compiled from another release's solver may.
