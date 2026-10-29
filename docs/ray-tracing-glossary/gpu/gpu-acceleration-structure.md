---
layout: docs
legend: [prop, method]
title: "Glossary: GpuAccelerationStructure"
description: "The members of GpuAccelerationStructure, in alphabetical order."
---

The scene on the GPU: a <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas/">`Tlas`</a> and every <a class="ref" href="/docs/ray-tracing-glossary/scene/mesh-blas/">`MeshBlas`</a> it uses, in the four structured buffers <a class="ref" href="/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/">`RayTraversal.fxh`</a> walks.

A sealed class that implements `IDisposable`. Its buffers come in two halves: the geometry, sent when a mesh is first used or refitted, and the scene, sent when the tree or the flags change. A frame with no changes sends nothing. The [GPU page](/docs/ray-tracing-gpu/#the-gpu-copy) shows it in context, with code. Upload from the thread that owns the device.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="blasnodes"><span class="prop"><code>BlasNodes</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-properties" title="BlasNodes in context on the GPU page" aria-label="BlasNodes in context on the GPU page">→</a></h3>

`StructuredBuffer?` · Read-only. Every BLAS's nodes, one after the other, as <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/">`BvhNode`</a>s with their indexes made absolute: a leaf's first triangle indexes <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#triangles">`Triangles`</a>, an interior node's skip this buffer. Made with room to spare, and `null` until the first upload of a scene with something in it.

<h3 id="instances"><span class="prop"><code>Instances</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-properties" title="Instances in context on the GPU page" aria-label="Instances in context on the GPU page">→</a></h3>

`StructuredBuffer?` · Read-only. One <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/">`GpuInstance`</a> per instance, in the order of the scene tree's leaves. `null` until the first upload of a scene with something in it.

<h3 id="isdisposed"><span class="prop"><code>IsDisposed</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-lifetime" title="IsDisposed in context on the GPU page" aria-label="IsDisposed in context on the GPU page">→</a></h3>

`bool` · Read-only. <a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#dispose">`Dispose`</a> has been called.

<h3 id="isready"><span class="prop"><code>IsReady</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-properties" title="IsReady in context on the GPU page" aria-label="IsReady in context on the GPU page">→</a></h3>

`bool` · Read-only. There is a scene on the GPU to trace against: an upload has made the buffers, and the scene isn't empty. Gate every traced pass on it.

<h3 id="tlasnodecount"><span class="prop"><code>TlasNodeCount</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-properties" title="TlasNodeCount in context on the GPU page" aria-label="TlasNodeCount in context on the GPU page">→</a></h3>

`int` · Read-only. How many nodes the scene's tree has, which is where the shader's walk stops. 0 before the first upload and for an empty scene.

<h3 id="tlasnodes"><span class="prop"><code>TlasNodes</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-properties" title="TlasNodes in context on the GPU page" aria-label="TlasNodes in context on the GPU page">→</a></h3>

`StructuredBuffer?` · Read-only. The scene's tree, its <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/">`BvhNode`</a>s copied as they are. `null` until the first upload of a scene with something in it.

<h3 id="triangles"><span class="prop"><code>Triangles</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-properties" title="Triangles in context on the GPU page" aria-label="Triangles in context on the GPU page">→</a></h3>

`StructuredBuffer?` · Read-only. Every BLAS's triangles, as <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-triangle/">`GpuTriangle`</a>s in their tree's order, one BLAS after the other. Made with room to spare, and `null` until the first upload of a scene with something in it.

<h3 id="version"><span class="prop"><code>Version</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-properties" title="Version in context on the GPU page" aria-label="Version in context on the GPU page">→</a></h3>

`int` · Read-only. Moves whenever what the buffers describe changes: an upload that sent either half, or the scene emptying. A pass that keeps its result while nothing it reads has changed compares it with the version it last traced against.

## Methods

<h3 id="gpuaccelerationstructure"><span class="method"><code>GpuAccelerationStructure()</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-upload" title="GpuAccelerationStructure() in context on the GPU page" aria-label="GpuAccelerationStructure() in context on the GPU page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#gpuaccelerationstructure">`GpuAccelerationStructure(GraphicsDevice graphicsDevice)`</a> · An empty copy on the device: no buffers until the first upload. The first use of the class checks that <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/">`BvhNode`</a>, <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-instance/">`GpuInstance`</a> and <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-triangle/">`GpuTriangle`</a> have the sizes `RayTraversal.fxh` reads them at, 32, 64 and 36 bytes, and fails with an `InvalidOperationException`, wrapped in a `TypeInitializationException`, when they don't: a bug in the library, not in your code.

| Parameter | Type | Description |
| --- | --- | --- |
| `graphicsDevice` | `GraphicsDevice` | The device the buffers are made on: the compute fork's, with the HiDef profile. |

<h3 id="bind"><span class="method"><code>Bind()</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-bind-method" title="Bind() in context on the GPU page" aria-label="Bind() in context on the GPU page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#bind">`Bind(Effect effect)`</a> · Sets `TlasNodes`, `Instances`, `BlasNodes`, `Triangles` and `TlasNodeCount` on an effect that includes `RayTraversal.fxh`, under the names it declares them by. A parameter the effect doesn't have, one the compiler stripped say, is skipped. Bind before every dispatch or draw: the node count changes with the scene, and an upload may replace a buffer.

| Parameter | Type | Description |
| --- | --- | --- |
| `effect` | `Effect` | The effect that traces. |

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-lifetime" title="Dispose() in context on the GPU page" aria-label="Dispose() in context on the GPU page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#dispose">`Dispose()`</a> · Frees the four buffers. A second call does nothing.

<h3 id="upload"><span class="method"><code>Upload()</code></span> <a class="ctx" href="/docs/ray-tracing-gpu/#gpuaccelerationstructure-upload" title="Upload() in context on the GPU page" aria-label="Upload() in context on the GPU page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#upload">`Upload(Tlas tlas)`</a> · Brings the buffers in line with the scene. A BLAS they don't hold goes after the others; when there is no room for it, everything is laid out afresh in bigger buffers, and the BLASes no instance uses any more are dropped. A BLAS refitted since it was sent is sent again in place. The scene half is sent when the tree's <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#version">`Version`</a> or <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#flagsversion">`FlagsVersion`</a> has moved, or the geometry has. A frame with no change sends nothing, and an empty scene sends nothing and turns <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#isready">`IsReady`</a> false. Call it after the scene's <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#endupdate">`EndUpdate`</a>, on the device's thread.

| Parameter | Type | Description |
| --- | --- | --- |
| `tlas` | <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas/">`Tlas`</a> | The scene, as of its last `EndUpdate`. |
