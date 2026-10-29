---
layout: docs
legend: [prop, method]
title: "Glossary: Tlas"
description: "The members of Tlas, in alphabetical order."
---

The scene as rays see it: a bounding volume hierarchy over instances, each a <a class="ref" href="/docs/ray-tracing-glossary/scene/mesh-blas/">`MeshBlas`</a> placed by a world matrix under an id of yours. The top level of the two, and the CPU queries.

A sealed class. It is declared anew at every update, and works out on its own whether that means nothing, a refit or a rebuild. The [scene page](/docs/ray-tracing-scene/) shows it in context, with code. It isn't thread-safe: see [threads](/docs/ray-tracing-scene/#threads).

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="bvh"><span class="prop"><code>Bvh</code></span> <a class="ctx" href="/docs/ray-tracing-scene/#tlas-version-properties" title="Bvh in context on the scene page" aria-label="Bvh in context on the scene page">→</a></h3>

<a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh/">`Bvh`</a> · Read-only. The tree over the instances' boxes in the scene, one instance a leaf. Refitted or rebuilt by <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#endupdate">`EndUpdate`</a>.

<h3 id="flagsversion"><span class="prop"><code>FlagsVersion</code></span> <a class="ctx" href="/docs/ray-tracing-scene/#tlas-version-properties" title="FlagsVersion in context on the scene page" aria-label="FlagsVersion in context on the scene page">→</a></h3>

`int` · Read-only. Moves when an update changed an instance's flags and nothing else about it, the one change that leaves the tree, and so <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#version">`Version`</a>, alone. Flags that changed along with anything else ride on `Version`'s move, so a mirror of the instances watches both.

<h3 id="instancecount"><span class="prop"><code>InstanceCount</code></span> <a class="ctx" href="/docs/ray-tracing-scene/#tlas-instance-properties" title="InstanceCount in context on the scene page" aria-label="InstanceCount in context on the scene page">→</a></h3>

`int` · Read-only. How many instances have been declared since <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#beginupdate">`BeginUpdate`</a>: after <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#endupdate">`EndUpdate`</a>, the scene's. The `Add` calls of the update, less the ones ignored.

<h3 id="instances"><span class="prop"><code>Instances</code></span> <a class="ctx" href="/docs/ray-tracing-scene/#tlas-instance-properties" title="Instances in context on the scene page" aria-label="Instances in context on the scene page">→</a></h3>

<code>ReadOnlySpan&lt;<a href="/docs/ray-tracing-glossary/scene/tlas-instance/">TlasInstance</a>&gt;</code> · Read-only. The instances, in the order they were declared. <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-hit/#instanceindex">`InstanceIndex`</a> is a place in it. It reads the `Tlas`'s own array: read it between an `EndUpdate` and the next `BeginUpdate`, and don't keep it across an update.

<h3 id="version"><span class="prop"><code>Version</code></span> <a class="ctx" href="/docs/ray-tracing-scene/#tlas-version-properties" title="Version in context on the scene page" aria-label="Version in context on the scene page">→</a></h3>

`int` · Read-only. Moves whenever the tree does: at every refit and every rebuild, the first `EndUpdate` included. A <a class="ref" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/">`GpuAccelerationStructure`</a> sends the scene again when it has moved.

## Methods

<h3 id="tlas"><span class="method"><code>Tlas()</code></span> <a class="ctx" href="/docs/ray-tracing/#tlas-constructor" title="Tlas() in context on the quick start guide" aria-label="Tlas() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#tlas">`Tlas()`</a> · An empty scene: no instances and an empty tree. Its first <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#endupdate">`EndUpdate`</a> builds the tree, even with nothing declared.

<h3 id="add"><span class="method"><code>Add()</code></span> <a class="ctx" href="/docs/ray-tracing-scene/#tlas-update-methods" title="Add() in context on the scene page" aria-label="Add() in context on the scene page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#add">`Add(ulong instanceId, MeshBlas? blas, in Matrix world, RayTracingFlags flags = RayTracingFlags.Default)`</a> · Declares one instance for this update. It is compared with what the same place held in the last update: the same id and BLAS with the same matrix and BLAS <a class="ref prop" href="/docs/ray-tracing-glossary/scene/mesh-blas/#version">`Version`</a> cost a few comparisons, and anything else is worked out afresh. A `null` BLAS is ignored. A matrix that squashes the mesh flat is traced through a stand-in a ten-thousandth of its longest axis thick, see <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas-instance/#isflat">`IsFlat`</a>; one that collapses it to a line or a point, holds an infinity or a NaN, or puts its box beyond float's range is ignored. Declare the instances in the same order every update: another order is still right, but rebuilds the tree.

| Parameter | Type | Description |
| --- | --- | --- |
| `instanceId` | `ulong` | Your id for the object, handed back in <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-hit/#instanceid">`InstanceId`</a>. Only ever compared. |
| `blas` | <a class="ref" href="/docs/ray-tracing-glossary/scene/mesh-blas/">`MeshBlas?`</a> | Its geometry, in its own space. `null` declares nothing. |
| `world` | `Matrix` | Its world matrix, in MonoGame's row-vector convention. |
| `flags` | <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-tracing-flags/">`RayTracingFlags`</a> | The queries it takes part in. Default: <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-tracing-flags/#default">`Default`</a>, all of them. |

<h3 id="beginupdate"><span class="method"><code>BeginUpdate()</code></span> <a class="ctx" href="/docs/ray-tracing-scene/#tlas-update-methods" title="BeginUpdate() in context on the scene page" aria-label="BeginUpdate() in context on the scene page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#beginupdate">`BeginUpdate()`</a> · Starts an update: no instances until they are added. The last update's stay where they are, to compare the new ones with.

<h3 id="endupdate"><span class="method"><code>EndUpdate()</code></span> <a class="ctx" href="/docs/ray-tracing-scene/#tlas-update-methods" title="EndUpdate() in context on the scene page" aria-label="EndUpdate() in context on the scene page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#endupdate">`EndUpdate()`</a> · Returns <a class="ref" href="/docs/ray-tracing-glossary/scene/tlas-update-result/">`TlasUpdateResult`</a>: brings the tree in line with the instances declared since <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#beginupdate">`BeginUpdate`</a>, doing the least that does. It rebuilds the tree when instances were added, removed or reordered. Otherwise it refits the tree when an instance's box moved, and rebuilds it after all when the refit took the root's area past twice, or the tree's <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#areacost">`AreaCost`</a> past one and a half times, the last build's. Moves <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#version">`Version`</a> when the tree moved, and <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#flagsversion">`FlagsVersion`</a> when flags alone changed.

<h3 id="intersect"><span class="method"><code>Intersect()</code></span> <a class="ctx" href="/docs/ray-tracing-queries/#tlas-closest-hit" title="Intersect() in context on the CPU queries page" aria-label="Intersect() in context on the CPU queries page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#intersect">`Intersect(in Ray ray, float maxDistance, out RayHit hit, RayTracingFlags mask = RayTracingFlags.None)`</a> · Whether the ray hits an instance with every flag in `mask` closer than `maxDistance`, and the nearest such hit. The ray is in world space and its direction need not be of length 1: the hit's distance is in its parameter, which it keeps through each instance's inverse matrix. Opens the nearer child of each node first, and takes an infinite `maxDistance` as it is. Doesn't allocate.

| Parameter | Type | Description |
| --- | --- | --- |
| `ray` | `Ray` | The ray, in world space. |
| `maxDistance` | `float` | Hits at or beyond this ray parameter are left out. `float.MaxValue` for no limit. |
| `hit` | `out` <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-hit/">`RayHit`</a> | The nearest hit, or <a class="ref method" href="/docs/ray-tracing-glossary/scene/ray-hit/#none">`RayHit.None(maxDistance)`</a> when there is none. |
| `mask` | <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-tracing-flags/">`RayTracingFlags`</a> | Only instances with every flag in it are seen. Default: `None`, every instance. |

<h3 id="intersectany"><span class="method"><code>IntersectAny()</code></span> <a class="ctx" href="/docs/ray-tracing-queries/#tlas-any-hit" title="IntersectAny() in context on the CPU queries page" aria-label="IntersectAny() in context on the CPU queries page">→</a></h3>

<a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#intersectany">`IntersectAny(in Ray ray, float maxDistance, RayTracingFlags mask = RayTracingFlags.None)`</a> · Whether anything with every flag in `mask` blocks the ray closer than `maxDistance`. Stops at the first hit, in no order, and walks with no stack: the walk `RtTraceAny` is a port of. Takes an infinite `maxDistance` as `float.MaxValue`, as the GPU does. Doesn't allocate.

| Parameter | Type | Description |
| --- | --- | --- |
| `ray` | `Ray` | The ray, in world space, starting off the surface it leaves. |
| `maxDistance` | `float` | Hits at or beyond this ray parameter don't count: the distance to a lamp, say. |
| `mask` | <a class="ref" href="/docs/ray-tracing-glossary/scene/ray-tracing-flags/">`RayTracingFlags`</a> | Only instances with every flag in it block the ray. Default: `None`, every instance. |
