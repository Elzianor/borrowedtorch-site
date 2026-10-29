---
layout: docs
title: "Ray tracing: glossary"
description: "Every type and HLSL header of the ray tracing library with its members, one page each."
---

The glossary has a page for everything the ray tracing library provides, in four parts:

- [Meshes and the scene](/docs/ray-tracing-glossary/scene/): the mesh interface, the tree over a mesh, the scene's tree and its instances, the result of an update, the flags and the hit. In the sidebar each type opens to its members.
- [The GPU and the G-buffer](/docs/ray-tracing-glossary/gpu/): the scene's copy on the GPU, the G-buffer, and the records of instances and triangles the GPU reads. In the sidebar each type opens to its members.
- [HLSL headers](/docs/ray-tracing-glossary/hlsl/): `RayTraversal.fxh` and `GBuffer.fxh`, with their functions, names and structs. In the sidebar each header opens to them.
- [The BVH](/docs/ray-tracing-glossary/bvh/): the tree both levels are built on, and its node. In the sidebar each type opens to its members.
