---
layout: docs
title: "Glossary: FabricOrientation"
description: "The values of FabricOrientation."
---

The plane a sheet is built in.

An enum, in the namespace `BorrowedTorch.FabricSimulator.Simulation`: the type of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#orientation">`Orientation`</a>, read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>. Either way the sheet is centered on <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#origin">`Origin`</a> and then turned by <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#rotation">`Rotation`</a>, and the texture coordinates follow the grid, not the plane. The [placement and pins page](/docs/fabric-simulation-pins/#fabric-placement-properties) shows it in context, with code.

## Values

<h3 id="vertical"><code>Vertical</code> <a class="ctx" href="/docs/fabric-simulation-pins/#fabricorientation-values" title="Vertical in context on the placement and pins page" aria-label="Vertical in context on the placement and pins page">→</a></h3>

0. Spans X and Y, like a curtain or a flag: the columns run along +X and the rows up +Y, so row 0 is the bottom edge. Built facing +Z. The default of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#orientation">`Orientation`</a>.

<h3 id="horizontal"><code>Horizontal</code> <a class="ctx" href="/docs/fabric-simulation-pins/#fabricorientation-values" title="Horizontal in context on the placement and pins page" aria-label="Horizontal in context on the placement and pins page">→</a></h3>

1. Spans X and Z, like a tablecloth: the columns run along +X and the rows along +Z, so the top row, the one <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-pin-mode/#topedge">`TopEdge`</a> pins, is the +Z edge. Built facing −Y, the grid's x crossed with its y: the solver's normal points down until the cloth turns, which a shader that flips the normal towards the camera doesn't mind.
