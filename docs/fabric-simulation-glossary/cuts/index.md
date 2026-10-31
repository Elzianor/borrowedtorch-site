---
layout: docs
title: "Fabric simulation glossary: cuts and picking"
description: "The tear bits, the cut mesh and its lip vertices, and the captured pose, its hits and the knife's stroke, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`FabricTearFlags`](/docs/fabric-simulation-glossary/cuts/fabric-tear-flags/) | The damage of one point: which threads it owns are torn, and which folds it owns have died. |
| [`FabricCutMesh`](/docs/fabric-simulation-glossary/cuts/fabric-cut-mesh/) | A cut sheet's triangles with clean lips, clipped along the strokes that cut them. |
| [`FabricSeamVertex`](/docs/fabric-simulation-glossary/cuts/fabric-seam-vertex/) | A lip vertex of a cut mesh, blended from particles on its own side of the cut. |
| [`FabricSurface`](/docs/fabric-simulation-glossary/cuts/fabric-surface/) | One pose of the sheet to pick against with a world-space ray, every layer it crosses. |
| [`FabricSurfaceHit`](/docs/fabric-simulation-glossary/cuts/fabric-surface-hit/) | Where a ray meets the sheet: on the flat cloth, in the world, and how far along the ray. |
| [`FabricStroke`](/docs/fabric-simulation-glossary/cuts/fabric-stroke/) | A knife's drag, recorded against one captured pose and cut from on release. |
