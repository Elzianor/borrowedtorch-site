---
layout: docs
legend: [method]
title: "Glossary: CreaseCheck"
description: "The members of CreaseCheck, in alphabetical order."
---

How folded the sheet is, against how folded it rests: cloth held bent by something pressing on it rests flat, while creased cloth rests bent, because the plasticity model has set its folds.

A static class, in the namespace `BorrowedTorch.FabricSimulator.Diagnostics`. It measures every fold with the solver's own fold arithmetic, from the array of <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#readback">`FabricEffect.ReadBack`</a> alone: the live angle from the positions, the rest angle from <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#restangles">`RestAngles`</a>. A fold of 0° is flat and one of 180° folded back onto itself. It allocates: a debugging tool, not frame work. The [diagnostics page](/docs/fabric-simulation-diagnostics/#creasecheck-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Fields

<h3 id="sharpfolddegrees"><code>SharpFoldDegrees</code> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#creasecheck-members" title="SharpFoldDegrees in context on the diagnostics page" aria-label="SharpFoldDegrees in context on the diagnostics page">→</a></h3>

`float` · Constant, 25. How far from flat a fold must rest, in degrees, to count as a crease in <a class="ref prop" href="/docs/fabric-simulation-glossary/diagnostics/crease-check-result/#creasededges">`Result.CreasedEdges`</a>.

## Methods

<h3 id="run"><span class="method"><code>Run()</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#creasecheck-members" title="Run() in context on the diagnostics page" aria-label="Run() in context on the diagnostics page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/#run">`Run(FabricParticle[] particles, int width, int height, uint[] tearState = null)`</a> · Static. Returns <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/crease-check-result/">`CreaseCheck.Result`</a>: the live and rest folds over every fold of the sheet, three per point where the grid has room for them, across, down and diagonal. Folds a rip has killed span its gap and are skipped, as the solver skips them, and so are folds with a corner that isn't finite. Returns all zeros for an empty array or a sheet with no folds. Throws `ArgumentNullException` for a `null` array, and `ArgumentException` when `width` × `height` isn't the array's length, or when the tear state's length isn't.

| Parameter | Type | Description |
| --- | --- | --- |
| `particles` | <code><a href="/docs/fabric-simulation-glossary/solver/fabric-particle/">FabricParticle</a>[]</code> | The array from `FabricEffect.ReadBack`: fetch it once for every check you run. |
| `width` | `int` | The grid width the sheet was built with, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#widthinparticles">`Fabric.WidthInParticles`</a>. |
| `height` | `int` | The grid height it was built with, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#heightinparticles">`Fabric.HeightInParticles`</a>. |
| `tearState` | `uint[]` | <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#copytearstate">`Fabric.CopyTearState`</a> on a torn sheet, so the dead folds are left out; `null`, the default, for a sheet never torn. |
