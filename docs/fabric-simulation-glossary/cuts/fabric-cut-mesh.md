---
layout: docs
legend: [prop]
title: "Glossary: FabricCutMesh"
description: "The members of FabricCutMesh, in alphabetical order."
---

A cut sheet's triangles with clean lips: the triangles a cut damaged, clipped along the strokes that cut them at whatever angle those ran, so a straight cut draws as a straight line rather than a staircase.

A sealed class with no public constructor: <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createcutmesh">`Fabric.CreateCutMesh`</a> makes one, once per change of damage, and hands back the same instance until the next cut, tear, mend or rebuild. <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#capturesurface">`Fabric.CaptureSurface`</a> picks against that instance too, so treat its arrays as read-only. Indices below <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#particlecount">`ParticleCount`</a> are particles; the rest name lip vertices, <a class="ref prop" href="/docs/fabric-simulation-glossary/cuts/fabric-cut-mesh/#seamvertices">`SeamVertices`</a>, which a vertex shader evaluates with <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricevaluatevertex">`FabricEvaluateVertex`</a>. Drawing only: the simulation underneath still tears whole threads, within about a cell of the drawn lip. The [cuts page](/docs/fabric-simulation-cuts/#fabriccutmesh-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="indices"><span class="prop"><code>Indices</code></span> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabriccutmesh-properties" title="Indices in context on the cuts page" aria-label="Indices in context on the cuts page">→</a></h3>

`int[]` · Read-only. Three indices per triangle, wound as <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createtriangleindices">`CreateTriangleIndices`</a> winds them. An index below the particle count is a particle of the buffer; an index `i` at or above it is the seam vertex `SeamVertices[i - ParticleCount]`. Upload it to a 32-bit index buffer. On a sheet with no cut strokes, whole or damaged only through <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#tear">`Tear`</a>, it is the very list `CreateTriangleIndices` returns. A piece whose particles no longer hang together through the surviving weave, or that holds fewer than two particles, is left out rather than stretched across separated cloth.

<h3 id="seamvertices"><span class="prop"><code>SeamVertices</code></span> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabriccutmesh-properties" title="SeamVertices in context on the cuts page" aria-label="SeamVertices in context on the cuts page">→</a></h3>

<code><a href="/docs/fabric-simulation-glossary/cuts/fabric-seam-vertex/">FabricSeamVertex</a>[]</code> · Read-only. The lip vertices, each a flat-sheet point blended from particles on its own side of the cut, so the lips part as the rip opens. Upload them to a structured buffer bound to <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricseamvertices">`FabricSeamVertices`</a>. Empty on an uncut sheet; keep the buffer at least one element long all the same, since the shader declares it and a real resource has to sit behind the binding. The placeholder vertex buffer has to cover every id the indices name, `ParticleCount + SeamVertices.Length`.

<h3 id="trianglecount"><span class="prop"><code>TriangleCount</code></span> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabriccutmesh-properties" title="TriangleCount in context on the cuts page" aria-label="TriangleCount in context on the cuts page">→</a></h3>

`int` · Read-only. The triangles in <a class="ref prop" href="/docs/fabric-simulation-glossary/cuts/fabric-cut-mesh/#indices">`Indices`</a>, a third of its length: the count to draw. It can exceed <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#trianglecount">`Fabric.TriangleCount`</a>, and even the whole sheet's two per square, since a clipped square yields more, smaller triangles: size the index buffer from this mesh, not from the sheet.
