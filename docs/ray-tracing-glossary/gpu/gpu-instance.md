---
layout: docs
legend: [method]
title: "Glossary: GpuInstance"
description: "The members of GpuInstance, in alphabetical order."
---

One instance as the GPU reads it: its inverse matrix, where its BLAS is in the shared node buffer, and its flags.

A struct of public fields, 64 bytes, sent to the GPU byte for byte: `GpuInstance` in <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/">`RayTraversal.fxh`</a> declares the same eight fields in the same order. The <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/">`GpuAccelerationStructure`</a> makes one per instance from its <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas-instance/">`TlasInstance`</a>; you don't need to make these. The [BVH page](/docs/ray-tracing-bvh/#the-gpu-layouts) shows it in context.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Fields

<h3 id="blasnodeend"><code>BlasNodeEnd</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gpuinstance-members" title="BlasNodeEnd in context on the BVH page" aria-label="BlasNodeEnd in context on the BVH page">→</a></h3>

`int` · One past the BLAS's last node in the shared node buffer: where the walk of the instance's BLAS stops, which has no stack to run out of.

<h3 id="blasnodeoffset"><code>BlasNodeOffset</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gpuinstance-members" title="BlasNodeOffset in context on the BVH page" aria-label="BlasNodeOffset in context on the BVH page">→</a></h3>

`int` · The BLAS's root in the shared node buffer, as an absolute index.

<h3 id="flags"><code>Flags</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gpuinstance-members" title="Flags in context on the BVH page" aria-label="Flags in context on the BVH page">→</a></h3>

`int` · The instance's <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-tracing-flags/">`RayTracingFlags`</a>, as an `int`: HLSL has no enums.

<h3 id="pad"><code>Pad</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gpuinstance-members" title="Pad in context on the BVH page" aria-label="Pad in context on the BVH page">→</a></h3>

`int` · Padding, 0, which makes the struct four whole 16-byte rows.

<h3 id="worldinversew"><code>WorldInverseW</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gpuinstance-members" title="WorldInverseW in context on the BVH page" aria-label="WorldInverseW in context on the BVH page">→</a></h3>

`Vector3` · The fourth row of the inverse matrix: where the world's origin lands in the mesh's space.

<h3 id="worldinversex"><code>WorldInverseX</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gpuinstance-members" title="WorldInverseX in context on the BVH page" aria-label="WorldInverseX in context on the BVH page">→</a></h3>

`Vector3` · The first row of the inverse matrix: where the world's X axis lands in the mesh's space. A world point `p` lands at `p.X * WorldInverseX + p.Y * WorldInverseY + p.Z * WorldInverseZ + WorldInverseW`, and a direction the same without the last term, as `Vector3.Transform` and `Vector3.TransformNormal` would take them.

<h3 id="worldinversey"><code>WorldInverseY</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gpuinstance-members" title="WorldInverseY in context on the BVH page" aria-label="WorldInverseY in context on the BVH page">→</a></h3>

`Vector3` · The second row of the inverse matrix: where the world's Y axis lands in the mesh's space.

<h3 id="worldinversez"><code>WorldInverseZ</code> <a class="ctx" href="/docs/ray-tracing-bvh/#gpuinstance-members" title="WorldInverseZ in context on the BVH page" aria-label="WorldInverseZ in context on the BVH page">→</a></h3>

`Vector3` · The third row of the inverse matrix: where the world's Z axis lands in the mesh's space.

## Methods

<h3 id="gpuinstance"><span class="method"><code>GpuInstance()</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#gpuinstance-members" title="GpuInstance() in context on the BVH page" aria-label="GpuInstance() in context on the BVH page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-instance/#gpuinstance">`GpuInstance(in Matrix worldInverse, int blasNodeOffset, int blasNodeEnd, RayTracingFlags flags)`</a> · The record of an instance: the inverse matrix's four rows, its fourth column left out, which an affine inverse doesn't need.

| Parameter | Type | Description |
| --- | --- | --- |
| `worldInverse` | `Matrix` | The instance's <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas-instance/#worldinverse">`WorldInverse`</a>. |
| `blasNodeOffset` | `int` | Its BLAS's root in the shared node buffer. |
| `blasNodeEnd` | `int` | One past its BLAS's last node. |
| `flags` | <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-tracing-flags/">`RayTracingFlags`</a> | Its flags. |
