---
layout: docs
title: "Glossary: FabricTearFlags"
description: "The values of FabricTearFlags."
---

The damage of one point of the weave: which of the threads it owns are torn, and which of the folds it owns have lost a thread.

A set of flags: the values combine. An enum over `uint`, in the namespace `BorrowedTorch.FabricSimulator.Simulation`: the bits of each word of <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#copytearstate">`Fabric.CopyTearState`</a>, one word per point, in <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex`</a> order. Each thread has one owner, so its two ends agree on whether it is torn: a point owns the threads to its right and above it, and both diagonals of the square to its upper right. <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#updatetearstate">`FabricEffect.UpdateTearState`</a> expands the words into the mask the solver reads. The [cuts page](/docs/fabric-simulation-cuts/#fabrictearflags-values) shows it in context, with code.

The three dead-fold bits are <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric/">`Fabric`</a>'s to keep: it works them out again from the torn bits after every cut, tear and mend. To replay saved damage, call <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#tear">`Fabric.Tear`</a> once for each torn bit set, and leave the dead folds to it; damage replayed that way has no strokes, so <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createcutmesh">`CreateCutMesh`</a> draws its lips jagged. A host that uploads a tear state of its own through `UpdateTearState` sets the dead-fold bits as `Fabric` does.

## Values

<h3 id="none"><code>None</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabrictearflags-values" title="None in context on the cuts page" aria-label="None in context on the cuts page">→</a></h3>

0. Every thread the point owns is whole, and so is every fold it owns. What every word reads on a sheet with no damage.

<h3 id="tornright"><code>TornRight</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabrictearflags-values" title="TornRight in context on the cuts page" aria-label="TornRight in context on the cuts page">→</a></h3>

1. The thread to the point at `(column + 1, row)` is torn.

<h3 id="tornup"><code>TornUp</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabrictearflags-values" title="TornUp in context on the cuts page" aria-label="TornUp in context on the cuts page">→</a></h3>

2. The thread to the point at `(column, row + 1)` is torn.

<h3 id="tornuprightdiagonal"><code>TornUpRightDiagonal</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabrictearflags-values" title="TornUpRightDiagonal in context on the cuts page" aria-label="TornUpRightDiagonal in context on the cuts page">→</a></h3>

4. The diagonal to the point at `(column + 1, row + 1)` is torn.

<h3 id="tornupleftdiagonal"><code>TornUpLeftDiagonal</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabrictearflags-values" title="TornUpLeftDiagonal in context on the cuts page" aria-label="TornUpLeftDiagonal in context on the cuts page">→</a></h3>

8. The other diagonal of the square to the point's upper right, from `(column + 1, row)` to `(column, row + 1)`, is torn. The point owns it without being one of its ends.

<h3 id="deadfoldacross"><code>DeadFoldAcross</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabrictearflags-values" title="DeadFoldAcross in context on the cuts page" aria-label="DeadFoldAcross in context on the cuts page">→</a></h3>

16. The across fold the point owns, hinged on its thread to the right, has lost a thread: its hinge, or an outer thread of one of the two triangles it joins. Its bending is no longer solved. Worked out from the torn bits, so the solver checks one bit per fold rather than five threads.

<h3 id="deadfolddown"><code>DeadFoldDown</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabrictearflags-values" title="DeadFoldDown in context on the cuts page" aria-label="DeadFoldDown in context on the cuts page">→</a></h3>

32. The down fold the point owns, hinged on its thread upward, has lost a thread.

<h3 id="deadfolddiagonal"><code>DeadFoldDiagonal</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabrictearflags-values" title="DeadFoldDiagonal in context on the cuts page" aria-label="DeadFoldDiagonal in context on the cuts page">→</a></h3>

64. The diagonal fold the point owns, hinged on the diagonal of <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-tear-flags/#tornupleftdiagonal">`TornUpLeftDiagonal`</a>, has lost a thread.
