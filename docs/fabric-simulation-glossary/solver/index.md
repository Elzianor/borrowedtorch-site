---
layout: docs
title: "Fabric simulation glossary: the solver"
description: "The solver, its three diagnostic records and the particle, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`FabricEffect`](/docs/fabric-simulation-glossary/solver/fabric-effect/) | The solver: owns the particle buffers, runs the fixed steps on the GPU, and samples the diagnostics. |
| [`FabricEffect.SpatialHashOverflow`](/docs/fabric-simulation-glossary/solver/fabric-effect-spatial-hash-overflow/) | What self-collision lost to full buckets and full lists of partners. |
| [`FabricEffect.StepMotion`](/docs/fabric-simulation-glossary/solver/fabric-effect-step-motion/) | The furthest a point moved in one step, against the cloth's thickness. |
| [`FabricEffect.CoincidentContacts`](/docs/fabric-simulation-glossary/solver/fabric-effect-coincident-contacts/) | Contacts between points at the same spot, pushed apart along a guessed axis. |
| [`FabricParticle`](/docs/fabric-simulation-glossary/solver/fabric-particle/) | One point of the sheet as the solver stores it: positions, normals, its pin and its folds' rest angles. |
