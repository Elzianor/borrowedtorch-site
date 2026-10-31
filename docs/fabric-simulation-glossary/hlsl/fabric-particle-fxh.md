---
layout: docs
legend: [method]
title: "Glossary: FabricParticle.fxh"
description: "The functions, names and structs of FabricParticle.fxh, in alphabetical order."
---

The layout the solver and a renderer share: one particle, the grid's size, the texture coordinates and the packed normal. No buffers, since the solver and a renderer bind different ones.

An HLSL header, copied by the package into your content at `Content/Effects/Fabric/FabricParticle.fxh` on every build, and refreshed every build too, so an edit made to it in place is lost at the next one. A shader that draws the cloth includes <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/">`FabricParticleBuffer.fxh`</a>, which includes this one and adds the buffer to read; include this one directly only for the struct without the binding, as the solver does. The [drawing page](/docs/fabric-simulation-drawing/#fabricparticlefxh-names) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Functions

<h3 id="fabricoctahedronwrap"><span class="method"><code>FabricOctahedronWrap()</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlefxh-names" title="FabricOctahedronWrap() in context on the drawing page" aria-label="FabricOctahedronWrap() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricoctahedronwrap">`float2 FabricOctahedronWrap(float2 v)`</a> · Folds a point of the octahedron's lower half out over the square's corners, `(1 - abs(v.yx))` with the signs of `v`: the step <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricpacknormal">`FabricPackNormal`</a> and <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricunpacknormal">`FabricUnpackNormal`</a> share for normals that face away from +Z. A helper of the two.

| Parameter | Type | Description |
| --- | --- | --- |
| `v` | `float2` | The normal's X and Y, after dividing it by the sum of its components' sizes. |

<h3 id="fabricpacknormal"><span class="method"><code>FabricPackNormal()</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlefxh-names" title="FabricPackNormal() in context on the drawing page" aria-label="FabricPackNormal() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricpacknormal">`uint FabricPackNormal(float3 normal)`</a> · A direction in four bytes, as <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#previousnormal">`PreviousNormal`</a> holds it: folded onto an octahedron, then 16 bits a side, X in the low half and Y in the high, which is finer than a hundredth of a degree. The solver packs with it; <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#packnormal">`FabricParticle.PackNormal`</a> is its twin in C#, bit for bit.

| Parameter | Type | Description |
| --- | --- | --- |
| `normal` | `float3` | The direction; it needn't be of length 1. |

<h3 id="fabrictexturecoordinates"><span class="method"><code>FabricTextureCoordinates()</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlefxh-names" title="FabricTextureCoordinates() in context on the drawing page" aria-label="FabricTextureCoordinates() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabrictexturecoordinates">`float2 FabricTextureCoordinates(uint vertexId)`</a> · A particle's texture coordinate, from its place in the grid: U from 0 at column 0 to 1 at the last column, V flipped, from 1 at row 0 to 0 at the top row, so row 0, the free edge of a hanging sheet, is the bottom of the texture. Index-space, so neither <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#orientation">`Orientation`</a> nor <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#rotation">`Rotation`</a> changes it, and a stretched or folded sheet keeps its texture where it was woven. Reads <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricwidthinparticles">`FabricWidthInParticles`</a> and <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricheightinparticles">`FabricHeightInParticles`</a>, so bind them. For particles only: a cut mesh's lip vertex carries its own, in <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-seam-vertex/#texcoord">`FabricSeamVertex.TexCoord`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `vertexId` | `uint` | The particle's index, row by row from row 0: what `SV_VertexID` is when the plain triangle list is drawn. |

<h3 id="fabricunpacknormal"><span class="method"><code>FabricUnpackNormal()</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlefxh-names" title="FabricUnpackNormal() in context on the drawing page" aria-label="FabricUnpackNormal() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricunpacknormal">`float3 FabricUnpackNormal(uint packed)`</a> · The direction <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricpacknormal">`FabricPackNormal`</a> packed, of length 1. <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricinterpolatednormal">`FabricInterpolatedNormal`</a> reads <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#previousnormal">`PreviousNormal`</a> with it; <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#unpacknormal">`FabricParticle.UnpackNormal`</a> is its twin in C#.

| Parameter | Type | Description |
| --- | --- | --- |
| `packed` | `uint` | Four bytes from `FabricPackNormal`. |

## Defines

<h3 id="fabricshadercontractversion"><code>FabricShaderContractVersion</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlefxh-names" title="FabricShaderContractVersion in context on the drawing page" aria-label="FabricShaderContractVersion in context on the drawing page">→</a></h3>

`3` · The version of the contract between the headers and the assembly, which must equal <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#shadercontractversion">`FabricParticle.ShaderContractVersion`</a>. It moves for any change of shape, a field added, removed, reordered or resized, a grid name renamed or the texture coordinates laid out differently, and for any new input the solver needs from the assembly, which a mismatched pair would silently miss; a byte count can't catch a reorder, as both sides still measure 64 bytes. The <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#fabriceffect">`FabricEffect`</a> constructor reads it from the copy in your content and throws `InvalidOperationException` when it differs, or is missing, since a header without it is older than the contract. Best effort: it walks up from the executable looking for `Content/Effects/Fabric/`, and a deployment that kept only the compiled shader has nothing to compare and isn't failed for it.

## Uniforms

<h3 id="fabricheightinparticles"><code>FabricHeightInParticles</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlefxh-names" title="FabricHeightInParticles in context on the drawing page" aria-label="FabricHeightInParticles in context on the drawing page">→</a></h3>

`uint` · The grid's rows. On your own effect, set it every frame from <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#heightinparticles">`Fabric.HeightInParticles`</a>, the sheet as built, which the settings may run ahead of. The solver's copy is set by <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#setparticles">`SetParticles`</a>; never set it on the solver's effect, which would break the solve.

<h3 id="fabricwidthinparticles"><code>FabricWidthInParticles</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlefxh-names" title="FabricWidthInParticles in context on the drawing page" aria-label="FabricWidthInParticles in context on the drawing page">→</a></h3>

`uint` · The grid's columns, the points across. Set it every frame from <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#widthinparticles">`Fabric.WidthInParticles`</a>, as above. A vertex id's column and row are worked out from it, and with the height the particle count that tells <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricevaluatevertex">`FabricEvaluateVertex`</a> a particle from a lip vertex.

## Structs

<h3 id="fabricparticle"><code>FabricParticle</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlefxh-names" title="FabricParticle in context on the drawing page" aria-label="FabricParticle in context on the drawing page">→</a></h3>

`float3 PrevPosition; float3 Position; float3 Normal; uint AnchorIndex; float MaxAnchorDistance; float3 RestAngles; uint IsPinned; uint PreviousNormal;` · The twin of <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/">`FabricParticle`</a>, field for field, 64 bytes. Lean, since every pass streams the whole grid: the velocity is the gap from `PrevPosition` to `Position`, and the texture coordinates follow from the index. A renderer reads `Position` and `Normal`, and to draw between steps `PrevPosition`, `PreviousNormal` and `IsPinned` as well.
