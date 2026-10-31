---
layout: docs
legend: [method]
title: "Glossary: FabricParticle"
description: "The members of FabricParticle, in alphabetical order."
---

One point of the sheet as the solver stores it, 64 bytes. Lean, because every pass streams the whole grid: nothing that follows from the rest, such as the velocity or the texture coordinates, is stored.

A struct of public fields, in the namespace `BorrowedTorch.FabricSimulator.Simulation`, laid out in sequence and mirrored field for field by <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricparticle">`FabricParticle`</a> on the GPU. <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#readback">`ReadBack`</a> returns them and <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#setparticles">`SetParticles`</a> and <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#updateparticles">`UpdateParticles`</a> take them, in flat index order; a shader reads them from <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricparticles">`FabricParticles`</a>. The [drawing page](/docs/fabric-simulation-drawing/#fabricparticle-fields) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Fields

<h3 id="anchorindex"><code>AnchorIndex</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-fields" title="AnchorIndex in context on the drawing page" aria-label="AnchorIndex in context on the drawing page">→</a></h3>

`uint` · The pin this point hangs from, as a flat index rather than a position, so a pin that moves is followed. Read only when <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#maxanchordistance">`MaxAnchorDistance`</a> is positive. With `MaxAnchorDistance` and <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#ispinned">`IsPinned`</a>, what an upload, <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#setparticles">`SetParticles`</a> or <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#updateparticles">`UpdateParticles`</a>, takes as the pins; the solver writes its own pins back into all three at every step, so a readback shows the pins in force as of the last step, and a <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#setpinned">`SetPinned`</a> or a cut reaches the record at the next one.

<h3 id="ispinned"><code>IsPinned</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-fields" title="IsPinned in context on the drawing page" aria-label="IsPinned in context on the drawing page">→</a></h3>

`uint` · Not 0 when the point is pinned: it never moves unless an upload moves it, and the cloth hangs from it. A `uint` rather than a `bool`, because HLSL's `bool` is four bytes. <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricinterpolatedposition">`FabricInterpolatedPosition`</a> draws a pin where it is, not between steps.

<h3 id="maxanchordistance"><code>MaxAnchorDistance</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-fields" title="MaxAnchorDistance in context on the drawing page" aria-label="MaxAnchorDistance in context on the drawing page">→</a></h3>

`float` · The furthest this point may get from its pin, <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#anchorindex">`AnchorIndex`</a>, in meters, measured along the weave: the shortest path through the threads, which holds however the pins move. Only pinning other points changes it. 0 for a pin, and negative when no pin reaches the point, through a cut or because nothing is pinned. See <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#uselongrangeattachments">`UseLongRangeAttachments`</a>.

<h3 id="normal"><code>Normal</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-fields" title="Normal in context on the drawing page" aria-label="Normal in context on the drawing page">→</a></h3>

`Vector3` · The facing of the pose the latest step ended in, of length 1, computed on the GPU at every step; the flat sheet's facing as built, until the first step. It points one way only, so a shader drawing both sides flips it towards the camera. Shade with it rather than with each triangle's own, or the shading disagrees with the physics along every crease.

<h3 id="position"><code>Position</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-fields" title="Position in context on the drawing page" aria-label="Position in context on the drawing page">→</a></h3>

`Vector3` · Where the point is, as of the latest step, in world space: draw it with no world matrix.

<h3 id="previousnormal"><code>PreviousNormal</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-fields" title="PreviousNormal in context on the drawing page" aria-label="PreviousNormal in context on the drawing page">→</a></h3>

`uint` · The facing of the pose the latest step began in, packed into four bytes by <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#packnormal">`PackNormal`</a>: with <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#normal">`Normal`</a>, what a renderer blends between to draw between two steps, as it blends <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#prevposition">`PrevPosition`</a> and <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#position">`Position`</a>. <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricinterpolatednormal">`FabricInterpolatedNormal`</a> does it.

<h3 id="prevposition"><code>PrevPosition</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-fields" title="PrevPosition in context on the drawing page" aria-label="PrevPosition in context on the drawing page">→</a></h3>

`Vector3` · Where the point was a step before: the velocity, which isn't stored, is the gap to <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#position">`Position`</a> over one step. A point uploaded with the two apart starts with that motion; keep them equal for a point at rest. A renderer drawing between steps blends from here to `Position`.

<h3 id="restangles"><code>RestAngles</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-fields" title="RestAngles in context on the drawing page" aria-label="RestAngles in context on the drawing page">→</a></h3>

`Vector3` · The rest angles of the three folds this point owns, in radians: X the fold across, Y the fold down, Z the diagonal one. π is flat, and the sign says which way the fold closes. Set from the built shape; plasticity rewrites them, which is how creases stay, see <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingplasticrate">`BendingPlasticRate`</a>. <a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/#run">`Run`</a> reads them.

<h3 id="shadercontractversion"><code>ShaderContractVersion</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-constants-and-methods" title="ShaderContractVersion in context on the drawing page" aria-label="ShaderContractVersion in context on the drawing page">→</a></h3>

`int` · Constant, 3. Must equal `FabricShaderContractVersion` in <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/">`FabricParticle.fxh`</a>: the <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/">`FabricEffect`</a> constructor checks it, when it can find the header, and throws `InvalidOperationException` if they differ. Moved on for any change of shape, a field added, removed, reordered or resized, a grid parameter renamed or the texture coordinates laid out differently, and for any new input the solver takes from the assembly: a byte count can't see two fields swapped.

<h3 id="sizeinbytes"><code>SizeInBytes</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-constants-and-methods" title="SizeInBytes in context on the drawing page" aria-label="SizeInBytes in context on the drawing page">→</a></h3>

`int` · Constant, 64. The size of one record, which must equal the GPU's stride: <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#setparticles">`SetParticles`</a> checks what the struct marshals to against it.

## Methods

<h3 id="packnormal"><span class="method"><code>PackNormal()</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-constants-and-methods" title="PackNormal() in context on the drawing page" aria-label="PackNormal() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#packnormal">`PackNormal(Vector3 normal)`</a> · Static. Returns `uint`: a direction in four bytes, as <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#previousnormal">`PreviousNormal`</a> holds it: folded onto an octahedron, then 16 bits a side, finer than a hundredth of a degree. Any length will do; a zero vector packs as +Z. Mirrors <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricpacknormal">`FabricPackNormal`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `normal` | `Vector3` | The direction to pack. |

<h3 id="unpacknormal"><span class="method"><code>UnpackNormal()</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticle-constants-and-methods" title="UnpackNormal() in context on the drawing page" aria-label="UnpackNormal() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#unpacknormal">`UnpackNormal(uint packed)`</a> · Static. Returns `Vector3`: the direction <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#packnormal">`PackNormal`</a> packed, of length 1. Mirrors <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricunpacknormal">`FabricUnpackNormal`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `packed` | `uint` | A packed direction, such as <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#previousnormal">`PreviousNormal`</a>. |
