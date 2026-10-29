---
layout: docs
legend: [prop]
title: "Glossary: BvhNode"
description: "The members of BvhNode, in alphabetical order."
---

One node of a <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh/">`Bvh`</a>: a box, and either a leaf's primitives or an interior node's skip.

A struct of public fields, 32 bytes with no padding, sent to the GPU byte for byte as `GpuBvhNode`. A leaf and an interior node share the layout, told apart by the sign of `PrimitiveCount`. The [BVH page](/docs/ray-tracing-bvh/#the-node-layout) shows it in context, with a picture.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="isleaf"><span class="prop"><code>IsLeaf</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvhnode-members" title="IsLeaf in context on the BVH page" aria-label="IsLeaf in context on the BVH page">→</a></h3>

`bool` · Read-only. <a class="ref" href="/docs/ray-tracing-glossary/bvh/bvh-node/#primitivecount">`PrimitiveCount`</a> is above 0. The GPU asks only this of the count.

<h3 id="splitaxis"><span class="prop"><code>SplitAxis</code></span> <a class="ctx" href="/docs/ray-tracing-bvh/#bvhnode-members" title="SplitAxis in context on the BVH page" aria-label="SplitAxis in context on the BVH page">→</a></h3>

`int` · Read-only. An interior node's split axis, 0, 1 or 2 for X, Y or Z: its left child holds the primitives on the low side of the plane. <a class="ref method" href="/docs/ray-tracing-glossary/bvh/bvh/#visitrightfirst">`Bvh.VisitRightFirst`</a> reads it. Meaningless for a leaf.

## Fields

<h3 id="max"><code>Max</code> <a class="ctx" href="/docs/ray-tracing-bvh/#bvhnode-members" title="Max in context on the BVH page" aria-label="Max in context on the BVH page">→</a></h3>

`Vector3` · The high corner of the node's box.

<h3 id="min"><code>Min</code> <a class="ctx" href="/docs/ray-tracing-bvh/#bvhnode-members" title="Min in context on the BVH page" aria-label="Min in context on the BVH page">→</a></h3>

`Vector3` · The low corner of the node's box.

<h3 id="primitivecount"><code>PrimitiveCount</code> <a class="ctx" href="/docs/ray-tracing-bvh/#bvhnode-members" title="PrimitiveCount in context on the BVH page" aria-label="PrimitiveCount in context on the BVH page">→</a></h3>

`int` · Above 0, a leaf with that many primitives. Below 0, an interior node, which keeps its split axis here as −(axis + 1): −1, −2 or −3.

<h3 id="skiporfirst"><code>SkipOrFirst</code> <a class="ctx" href="/docs/ray-tracing-bvh/#bvhnode-members" title="SkipOrFirst in context on the BVH page" aria-label="SkipOrFirst in context on the BVH page">→</a></h3>

`int` · A leaf's first entry in <a class="ref prop" href="/docs/ray-tracing-glossary/bvh/bvh/#primitiveindices">`PrimitiveIndices`</a>; an interior node's skip, the first node after its subtree, where a walk goes on when it misses the box. On the GPU it is absolute: a BLAS leaf's first triangle in the `Triangles` buffer, a skip a node in `BlasNodes`.
