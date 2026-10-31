---
layout: docs
title: "Glossary: FabricSeamVertex"
description: "The fields of FabricSeamVertex, in alphabetical order."
---

A lip vertex of a cut mesh: a point of the flat sheet that the vertex shader blends from particles on its own side of the cut, so the lips part as the rip opens.

A struct of public fields, 32 bytes, laid out field for field as <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricseamvertex">`FabricSeamVertex`</a> in `FabricParticleBuffer.fxh`; read from <a class="ref prop" href="/docs/fabric-simulation-glossary/cuts/fabric-cut-mesh/#seamvertices">`FabricCutMesh.SeamVertices`</a>, which the library fills. Upload them as they are, to a `StructuredBuffer` made with `typeof(FabricSeamVertex)`. The [cuts page](/docs/fabric-simulation-cuts/#fabricseamvertex-fields) shows it in context, with code.

One layout holds two kinds of blend:

- **Three carriers**, the usual case. The weights are the point's barycentric weights of particles A, B and C on the flat sheet. They sum to 1 but often leave the range 0 to 1, since the carriers needn't surround the lip: exact for cloth that moves rigidly, close for cloth that bends smoothly.
- **Two carriers**, marked by <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-seam-vertex/#indexc">`IndexC`</a> equal to <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-seam-vertex/#indexa">`IndexA`</a>, which a three-carrier blend never has. It skins cloth whose reachable particles all lie on one line, such as the single row left between two cuts about a cell apart. The flat point is `A + t (B - A) + s CCW(B - A)`, where `CCW(x, y) = (-y, x)`, stored as `WeightA = 1 - t`, `WeightB = t` and `WeightC = s`. The shader blends A and B by their weights and adds `WeightC` times `cross(normal, positionB - positionA)`, which turns `B - A` across the cloth the way `CCW` turns it on the flat sheet.

## Fields

<h3 id="indexa"><code>IndexA</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabricseamvertex-fields" title="IndexA in context on the cuts page" aria-label="IndexA in context on the cuts page">→</a></h3>

`uint` · The first carrier particle, by <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex`</a>. Its normal is what the shader falls back to when the blended normal cancels out.

<h3 id="indexb"><code>IndexB</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabricseamvertex-fields" title="IndexB in context on the cuts page" aria-label="IndexB in context on the cuts page">→</a></h3>

`uint` · The second carrier particle.

<h3 id="indexc"><code>IndexC</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabricseamvertex-fields" title="IndexC in context on the cuts page" aria-label="IndexC in context on the cuts page">→</a></h3>

`uint` · The third carrier particle, or <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-seam-vertex/#indexa">`IndexA`</a> again for a two-carrier blend.

<h3 id="sizeinbytes"><code>SizeInBytes</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabricseamvertex-fields" title="SizeInBytes in context on the cuts page" aria-label="SizeInBytes in context on the cuts page">→</a></h3>

`int` · Constant, 32. The size of one record, which must equal the stride the shader declares.

<h3 id="texcoord"><code>TexCoord</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabricseamvertex-fields" title="TexCoord in context on the cuts page" aria-label="TexCoord in context on the cuts page">→</a></h3>

`Vector2` · The vertex's texture coordinate, in the convention of <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabrictexturecoordinates">`FabricTextureCoordinates`</a>. Stored rather than worked out, since a seam vertex has no place in the grid to work it out from.

<h3 id="weighta"><code>WeightA</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabricseamvertex-fields" title="WeightA in context on the cuts page" aria-label="WeightA in context on the cuts page">→</a></h3>

`float` · A's share: its barycentric weight, or `1 - t` with two carriers.

<h3 id="weightb"><code>WeightB</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabricseamvertex-fields" title="WeightB in context on the cuts page" aria-label="WeightB in context on the cuts page">→</a></h3>

`float` · B's share: its barycentric weight, or `t` with two carriers.

<h3 id="weightc"><code>WeightC</code> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabricseamvertex-fields" title="WeightC in context on the cuts page" aria-label="WeightC in context on the cuts page">→</a></h3>

`float` · C's barycentric weight, or with two carriers `s`, the offset across the line of the two, in multiples of the gap between them.
