---
layout: docs
legend: [method]
title: "Glossary: FabricParticleBuffer.fxh"
description: "The functions, names and structs of FabricParticleBuffer.fxh, in alphabetical order."
---

The read side of the solver, for a shader that draws the cloth: the particle buffer, the lip vertices of a cut mesh, and the functions that turn a vertex id into a position, a normal and a texture coordinate, at the latest step or between two.

An HLSL header, copied by the package into your content at `Content/Effects/Fabric/FabricParticleBuffer.fxh` on every build, and refreshed every build too, so an edit made to it in place is lost at the next one. A shader of yours in `Content/Effects` includes it with `#include "Fabric/FabricParticleBuffer.fxh"`, a path relative to the including `.fx`, as MGCB resolves includes. It includes <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/">`FabricParticle.fxh`</a>, so the particle struct, the grid sizes and the texture coordinates come with it, and you declare nothing yourself. What a shader doesn't use compiles away. The [drawing page](/docs/fabric-simulation-drawing/#fabricparticlebufferfxh-names) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Functions

<h3 id="fabricevaluatevertex"><span class="method"><code>FabricEvaluateVertex()</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlebufferfxh-names" title="FabricEvaluateVertex() in context on the drawing page" aria-label="FabricEvaluateVertex() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricevaluatevertex">`void FabricEvaluateVertex(uint vertexId, float fraction, out float3 position, out float3 normal, out float2 texCoord)`</a> · Any vertex id of a cut mesh or of the plain triangle list, at a fraction of the way from the previous step's pose to the latest. An id below the particle count, <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricwidthinparticles">`FabricWidthInParticles`</a> × <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricheightinparticles">`FabricHeightInParticles`</a>, is a particle: its position as <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricinterpolatedposition">`FabricInterpolatedPosition`</a> gives it, its normal as <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricinterpolatednormal">`FabricInterpolatedNormal`</a> does, its texture coordinate from <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabrictexturecoordinates">`FabricTextureCoordinates`</a>. An id at or above it is the lip vertex `FabricSeamVertices[vertexId - count]`, blended from its carrier particles, each taken at the same fraction: three by their weights, or two by their weights plus an offset across the cloth along `cross(normal, positionB - positionA)`, see <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-seam-vertex/">`FabricSeamVertex`</a>. Its normal is the carriers' normals blended by the same weights, or the first carrier's when they cancel out, and its texture coordinate is stored. One vertex shader draws both kinds of mesh alike.

<a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricevaluatevertex">`void FabricEvaluateVertex(uint vertexId, out float3 position, out float3 normal, out float2 texCoord)`</a> · The latest step exactly: the overload above at a fraction of 1.

| Parameter | Type | Description |
| --- | --- | --- |
| `vertexId` | `uint` | The vertex's `SV_VertexID`: an index of <a class="ref prop" href="/docs/fabric-simulation-glossary/cuts/fabric-cut-mesh/#indices">`FabricCutMesh.Indices`</a> or of <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createtriangleindices">`CreateTriangleIndices`</a>' list. |
| `fraction` | `float` | <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#interpolationfraction">`FabricEffect.InterpolationFraction`</a>, bound every frame to a uniform of your own: 0 the previous step's pose, 1 the latest. |
| `position` | `out float3` | The vertex in world space: draw it with no world matrix. |
| `normal` | `out float3` | The solver's normal, of length 1, facing one way only: flip it toward the camera in the pixel shader. |
| `texCoord` | `out float2` | Its texture coordinate. |

<h3 id="fabricinterpolatednormal"><span class="method"><code>FabricInterpolatedNormal()</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlebufferfxh-names" title="FabricInterpolatedNormal() in context on the drawing page" aria-label="FabricInterpolatedNormal() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricinterpolatednormal">`float3 FabricInterpolatedNormal(FabricParticle p, float fraction)`</a> · The particle's normal, the given fraction of the way from the pose the latest step began in, <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#previousnormal">`PreviousNormal`</a> unpacked, to the one it ended in, <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#normal">`Normal`</a>, made length 1 again: shading turns as smoothly as the cloth moves. Exactly `Normal` at a fraction of 1 or more, and when the two are opposite and blend through zero. Pins' normals blend too, since they turn with the cloth around them.

| Parameter | Type | Description |
| --- | --- | --- |
| `p` | <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricparticle">`FabricParticle`</a> | A record fetched from <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricparticles">`FabricParticles`</a>. |
| `fraction` | `float` | 0 the previous step's pose, 1 the latest. |

<h3 id="fabricinterpolatedposition"><span class="method"><code>FabricInterpolatedPosition()</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlebufferfxh-names" title="FabricInterpolatedPosition() in context on the drawing page" aria-label="FabricInterpolatedPosition() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricinterpolatedposition">`float3 FabricInterpolatedPosition(FabricParticle p, float fraction)`</a> · The particle's position, the given fraction of the way from <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#prevposition">`PrevPosition`</a> to <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-particle/#position">`Position`</a>: for a renderer that fetches particles itself rather than through <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricevaluatevertex">`FabricEvaluateVertex`</a>. Exactly `Position` at a fraction of 1 or more. A pin is always drawn at `Position`, where it is: a host that moves one between steps moves it at once.

| Parameter | Type | Description |
| --- | --- | --- |
| `p` | <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricparticle">`FabricParticle`</a> | A record fetched from `FabricParticles`. |
| `fraction` | `float` | 0 the previous step's pose, 1 the latest. |

## Buffers

<h3 id="fabricparticles"><code>FabricParticles</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlebufferfxh-names" title="FabricParticles in context on the drawing page" aria-label="FabricParticles in context on the drawing page">→</a></h3>

<code>StructuredBuffer&lt;<a href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-fxh/#fabricparticle">FabricParticle</a>&gt;</code> · The sheet's particles, indexed by vertex id. Bind <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#particlebuffer">`FabricEffect.ParticleBuffer`</a> to it on your effect every frame: the solver keeps two record buffers and swaps them as it steps, and <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#setparticles">`SetParticles`</a> replaces them. Read-only on purpose: the solver binds the same memory for writing, and a resource bound for reading and writing at once silently binds nothing. The solver's own effect declares no `FabricParticles`, so the parameter is `null` there.

<h3 id="fabricseamvertices"><code>FabricSeamVertices</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlebufferfxh-names" title="FabricSeamVertices in context on the drawing page" aria-label="FabricSeamVertices in context on the drawing page">→</a></h3>

<code>StructuredBuffer&lt;<a href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricseamvertex">FabricSeamVertex</a>&gt;</code> · The lip vertices of the cut mesh being drawn, <a class="ref prop" href="/docs/fabric-simulation-glossary/cuts/fabric-cut-mesh/#seamvertices">`FabricCutMesh.SeamVertices`</a> uploaded to a structured buffer of your own. Bind it every frame when a shader evaluates vertices with `FabricEvaluateVertex`, and keep it at least one element long on whole cloth too: the shader declares it, so a real resource has to sit behind the binding. Unused by a shader that fetches only particles, and compiled away there.

## Structs

<h3 id="fabricseamvertex"><code>FabricSeamVertex</code> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabricparticlebufferfxh-names" title="FabricSeamVertex in context on the drawing page" aria-label="FabricSeamVertex in context on the drawing page">→</a></h3>

`uint IndexA; uint IndexB; uint IndexC; float WeightA; float WeightB; float WeightC; float2 TexCoord;` · The twin of <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-seam-vertex/">`FabricSeamVertex`</a>, 32 bytes: three carrier particles and their weights, or two and an offset when `IndexC` equals `IndexA`, and the texture coordinate.
