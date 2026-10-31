---
layout: docs
title: "Fabric simulation glossary: HLSL"
description: "The HLSL the package copies into your content: the two headers a cloth shader includes and the solver's effect, one page per file."
---

Each file has a page listing what a shader that includes it can use, in alphabetical order, each with its signature or value and what it does. The sidebar lists them under the file's name. The package copies all three into your content at `Content/Effects/Fabric/` on every build.

| File | What it is |
| --- | --- |
| [`FabricParticle.fxh`](/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/) | The layout the solver and a renderer share: the particle, the grid's size, the texture coordinates and the packed normal. |
| [`FabricParticleBuffer.fxh`](/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/) | What a cloth shader includes: the particle buffer, a cut mesh's lip vertices, and drawing between steps. |
| [`FabricCompute.fx`](/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/) | The solver's effect: its technique and passes, the hooks a wrapping effect defines, and what a wind function reads. |
