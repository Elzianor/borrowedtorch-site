---
layout: docs
title: "Fabric simulation: glossary"
description: "Every type and HLSL file of the fabric simulation library with its members, one page each."
---

The glossary has a page for everything the fabric simulation library provides, in five parts:

- [The sheet](/docs/fabric-simulation-glossary/sheet/): the sheet itself, its settings, and the two enums that lay it out and pin it. In the sidebar each type opens to its members.
- [The solver](/docs/fabric-simulation-glossary/solver/): the solver that owns the GPU buffers and steps the sheet, the three records its diagnostics return, and the particle record. In the sidebar each type opens to its members.
- [Cuts and picking](/docs/fabric-simulation-glossary/cuts/): the tear bits, the cut mesh and its lip vertices, and the captured pose a ray picks against, its hits and the knife's stroke. In the sidebar each type opens to its members.
- [Diagnostics](/docs/fabric-simulation-glossary/diagnostics/): the penetration and crease checks run over a sheet read back, their results, and the finiteness guard. In the sidebar each type opens to its members.
- [HLSL](/docs/fabric-simulation-glossary/hlsl/): `FabricParticle.fxh`, `FabricParticleBuffer.fxh` and `FabricCompute.fx`, with their functions, names and structs. In the sidebar each file opens to them.
