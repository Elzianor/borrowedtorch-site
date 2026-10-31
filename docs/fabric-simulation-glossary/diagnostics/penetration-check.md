---
layout: docs
legend: [method]
title: "Glossary: PenetrationCheck"
description: "The members of PenetrationCheck, in alphabetical order."
---

Counts the pairs of points closer together than the cloth is thick: how badly the sheet passes through itself, which a screenshot can't tell you.

A static class, in the namespace `BorrowedTorch.FabricSimulator.Diagnostics`. It works from the array of <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#readback">`FabricEffect.ReadBack`</a> alone, through a spatial hash of its own: unbounded and exact-keyed, deliberately not the solver's, so a pair the solver dropped from a full bucket, and so never tested, is still caught here. Where the two disagree, this one is right. It allocates freely: a debugging tool, not frame work. The [diagnostics page](/docs/fabric-simulation-diagnostics/#penetrationcheck-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Fields

<h3 id="deepoverlapratio"><code>DeepOverlapRatio</code> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#penetrationcheck-members" title="DeepOverlapRatio in context on the diagnostics page" aria-label="DeepOverlapRatio in context on the diagnostics page">→</a></h3>

`float` · Constant, 0.25. The overlap, as a fraction of the thickness, past which a pair counts as one layer through another, in <a class="ref prop" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check-result/#penetrations">`Result.Penetrations`</a>. Layers resting on each other sit right at the thickness, so only a deep overlap means a layer went through.

## Methods

<h3 id="run"><span class="method"><code>Run()</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#penetrationcheck-members" title="Run() in context on the diagnostics page" aria-label="Run() in context on the diagnostics page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/#run">`Run(FabricParticle[] particles, int width, float thickness, uint[] tearState = null)`</a> · Static. Returns <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check-result/">`PenetrationCheck.Result`</a>: every pair of points closer than `thickness`, each pair once. Weave neighbors, the eight points around each one that a thread joins it to, are left out, since their threads hold them that close; across a torn thread they are lips of a rip, which the solver pushes apart like any contact, and are checked. Points that aren't finite are skipped. Returns all zeros for an empty array, or for a thickness that isn't positive and finite. Throws `ArgumentNullException` for a `null` array, and `ArgumentException` when `width` is below 1 or doesn't divide the array into rows, or when the tear state's length isn't the array's.

| Parameter | Type | Description |
| --- | --- | --- |
| `particles` | <code><a href="/docs/fabric-simulation-glossary/solver/fabric-particle/">FabricParticle</a>[]</code> | The array from `FabricEffect.ReadBack`: fetch it once for every check you run. |
| `width` | `int` | The grid width the sheet was built with, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#widthinparticles">`Fabric.WidthInParticles`</a>. |
| `thickness` | `float` | The thickness the solver runs with, in meters: <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthicknessratio">`SelfCollisionThicknessRatio`</a>, at least 0.05, times <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#restlength">`Fabric.RestLength`</a>, the spacing as built. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthickness">`FabricSettings.SelfCollisionThickness`</a> uses the settings' spacing instead, which can run ahead of the sheet until the next <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>. |
| `tearState` | `uint[]` | <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#copytearstate">`Fabric.CopyTearState`</a> on a torn sheet, so the lips of a rip count as touching cloth; `null`, the default, for a sheet never torn. |
