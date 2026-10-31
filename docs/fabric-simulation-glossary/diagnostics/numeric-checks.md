---
layout: docs
legend: [method]
title: "Glossary: NumericChecks"
description: "The members of NumericChecks, in alphabetical order."
---

The finiteness guard for anything that reads positions back: a solver that has diverged fills the buffer with NaN, and a statistic that averages one in is worse than no statistic.

A static class, in the namespace `BorrowedTorch.FabricSimulator.Diagnostics`. The guard <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/">`PenetrationCheck`</a> and <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/">`CreaseCheck`</a> share, and the first thing to reach for in a check of your own over the array of <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#readback">`FabricEffect.ReadBack`</a>. The [diagnostics page](/docs/fabric-simulation-diagnostics/#numericchecks-methods) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Methods

<h3 id="isfinite"><span class="method"><code>IsFinite()</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#numericchecks-methods" title="IsFinite() in context on the diagnostics page" aria-label="IsFinite() in context on the diagnostics page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/numeric-checks/#isfinite">`IsFinite(in Vector3 v)`</a> · Static. Returns `bool`: `true` when `X`, `Y` and `Z` are all finite, neither NaN nor infinite.

| Parameter | Type | Description |
| --- | --- | --- |
| `v` | `in Vector3` | The vector to test, such as a particle's <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#position">`Position`</a>. |
