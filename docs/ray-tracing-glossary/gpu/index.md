---
layout: docs
title: "Ray tracing glossary: the GPU and the G-buffer"
description: "The scene's copy on the GPU, the G-buffer, and the instance and triangle records the GPU reads, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`GpuAccelerationStructure`](/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/) | The scene on the GPU, in four structured buffers, sending only what changed. |
| [`GBuffer`](/docs/ray-tracing-glossary/gpu/g-buffer/) | The depth and the normal of the nearest surface at every pixel, which a traced pass starts from. |
| [`GpuInstance`](/docs/ray-tracing-glossary/gpu/gpu-instance/) | One instance as the GPU reads it: its inverse matrix, where its BLAS is, and its flags. |
| [`GpuTriangle`](/docs/ray-tracing-glossary/gpu/gpu-triangle/) | One triangle as the walks test it: a corner and the two edges from it. |
