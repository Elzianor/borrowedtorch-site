---
layout: docs
title: "Glossary: FabricPinMode"
description: "The values of FabricPinMode."
---

The points pinned when a sheet is built; everything else falls freely.

An enum, in the namespace `BorrowedTorch.FabricSimulator.Simulation`: the type of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinmode">`PinMode`</a>, read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, which pins these points and the ones in <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinnedindices">`PinnedIndices`</a> as well. The top means the last row, `HeightInParticles - 1`, in either orientation: the top of a vertical sheet, the +Z edge of a horizontal one, and whichever edge that row ends up at after a <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#rotation">`Rotation`</a>. Left is the first column. <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#setpinned">`SetPinned`</a> changes the pins of the live sheet. The [placement and pins page](/docs/fabric-simulation-pins/#fabricpinmode-values) shows it in context, with code.

## Values

<h3 id="none"><code>None</code> <a class="ctx" href="/docs/fabric-simulation-pins/#fabricpinmode-values" title="None in context on the placement and pins page" aria-label="None in context on the placement and pins page">→</a></h3>

0. Nothing pinned: the sheet simply drops. With <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinnedindices">`PinnedIndices`</a>, a fully custom set of pins.

<h3 id="topedge"><code>TopEdge</code> <a class="ctx" href="/docs/fabric-simulation-pins/#fabricpinmode-values" title="TopEdge in context on the placement and pins page" aria-label="TopEdge in context on the placement and pins page">→</a></h3>

1. The whole top row, like cloth tacked along a batten.

<h3 id="topcorners"><code>TopCorners</code> <a class="ctx" href="/docs/fabric-simulation-pins/#fabricpinmode-values" title="TopCorners in context on the placement and pins page" aria-label="TopCorners in context on the placement and pins page">→</a></h3>

2. The two ends of the top row, like washing on a line.

<h3 id="leftedge"><code>LeftEdge</code> <a class="ctx" href="/docs/fabric-simulation-pins/#fabricpinmode-values" title="LeftEdge in context on the placement and pins page" aria-label="LeftEdge in context on the placement and pins page">→</a></h3>

3. The whole first column, like a flag on its pole. The default of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinmode">`PinMode`</a>.

<h3 id="fourcorners"><code>FourCorners</code> <a class="ctx" href="/docs/fabric-simulation-pins/#fabricpinmode-values" title="FourCorners in context on the placement and pins page" aria-label="FourCorners in context on the placement and pins page">→</a></h3>

4. The two ends of the first row and of the top row, like a sheet stretched over a frame.
