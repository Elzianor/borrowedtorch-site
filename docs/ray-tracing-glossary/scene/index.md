---
layout: docs
title: "Ray tracing glossary: meshes and the scene"
description: "The mesh interface, the BLAS, the TLAS and its instances, the update result, the flags and the hit, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`ITriangleMesh`](/docs/ray-tracing-glossary/scene/i-triangle-mesh/) | Your mesh as the library reads it: a triangle count and three positions per triangle. |
| [`MeshBlas`](/docs/ray-tracing-glossary/scene/mesh-blas/) | A tree over one mesh's triangles, in the mesh's own space, shared by every instance of it. |
| [`Tlas`](/docs/ray-tracing-glossary/scene/tlas/) | The scene: a tree over instances, declared every frame, with the CPU queries. |
| [`TlasInstance`](/docs/ray-tracing-glossary/scene/tlas-instance/) | One instance as the scene keeps it: its id, its BLAS, its matrix and its flags. |
| [`TlasUpdateResult`](/docs/ray-tracing-glossary/scene/tlas-update-result/) | What an update did to the tree: nothing, a refit or a rebuild. |
| [`RayTracingFlags`](/docs/ray-tracing-glossary/scene/ray-tracing-flags/) | Flags: the queries an instance takes part in, and a query's mask. |
| [`RayHit`](/docs/ray-tracing-glossary/scene/ray-hit/) | What a closest hit found: the distance, the instance, the triangle and where in it. |
