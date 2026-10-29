---
layout: docs
title: "Glossary: TlasInstance"
description: "The fields of TlasInstance, in alphabetical order."
---

One instance of the scene as the `Tlas` keeps it: which geometry, where, under which id, and what rays may do with it.

A struct of public fields, read from <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#instances">`Tlas.Instances`</a>, which the `Tlas` fills: declare instances with <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#add">`Tlas.Add`</a> rather than making these. Its twin on the GPU, <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/">`GpuInstance`</a>, holds where its BLAS is in the shared buffers rather than the BLAS itself. The [scene page](/docs/ray-tracing-scene/#the-instances) shows it in context, with code.

## Fields

<h3 id="blas"><code>Blas</code> <a class="ctx" href="/docs/ray-tracing-scene/#tlasinstance-fields" title="Blas in context on the scene page" aria-label="Blas in context on the scene page">→</a></h3>

<a class="ref" href="/docs/ray-tracing-glossary/scene/mesh-blas/">`MeshBlas`</a> · The instance's geometry. Its <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#geometry">`Geometry`</a> is the mesh a hit's triangle is in.

<h3 id="flags"><code>Flags</code> <a class="ctx" href="/docs/ray-tracing-scene/#tlasinstance-fields" title="Flags in context on the scene page" aria-label="Flags in context on the scene page">→</a></h3>

<a class="ref" href="/docs/ray-tracing-glossary/scene/ray-tracing-flags/">`RayTracingFlags`</a> · The queries it takes part in, as declared.

<h3 id="instanceid"><code>InstanceId</code> <a class="ctx" href="/docs/ray-tracing-scene/#tlasinstance-fields" title="InstanceId in context on the scene page" aria-label="InstanceId in context on the scene page">→</a></h3>

`ulong` · The id it was declared with, which a hit hands back.

<h3 id="isflat"><code>IsFlat</code> <a class="ctx" href="/docs/ray-tracing-scene/#tlasinstance-fields" title="IsFlat in context on the scene page" aria-label="IsFlat in context on the scene page">→</a></h3>

`bool` · <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas-instance/#world">`World`</a> squashes the mesh flat, a scale of 0 on one axis say, and has no inverse. The instance is traced through a stand-in that gives the mesh back a sliver of depth along the plane's normal: a ten-thousandth of the matrix's longest axis. See [flat and broken transforms](/docs/ray-tracing-scene/#flat-and-broken-transforms).

<h3 id="world"><code>World</code> <a class="ctx" href="/docs/ray-tracing-scene/#tlasinstance-fields" title="World in context on the scene page" aria-label="World in context on the scene page">→</a></h3>

`Matrix` · Its world matrix, as declared, flat or not. A point in the mesh's space, such as a hit's, goes into the world through it.

<h3 id="worldinverse"><code>WorldInverse</code> <a class="ctx" href="/docs/ray-tracing-scene/#tlasinstance-fields" title="WorldInverse in context on the scene page" aria-label="WorldInverse in context on the scene page">→</a></h3>

`Matrix` · The inverse a ray is taken into the mesh's space with, worked out when the matrix changes rather than at every ray: of <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas-instance/#world">`World`</a>, or for a flat instance of its stand-in. Its transpose takes a normal from the mesh's space into the world.
