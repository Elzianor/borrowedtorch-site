---
layout: docs
title: "Ray tracing glossary: HLSL headers"
description: "The two HLSL headers of the ray tracing library, with their functions, names and structs, one page per header."
---

Each header has a page listing what a shader that includes it can use, in alphabetical order, each with its signature or value and what it does. The sidebar lists them under the header's name.

| Header | What it is |
| --- | --- |
| [`RayTraversal.fxh`](/docs/ray-tracing-glossary/hlsl/ray-traversal-fxh/) | The any-hit walk of the scene on the GPU, for compute and pixel shaders, and the buffers it reads. |
| [`GBuffer.fxh`](/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/) | Reading the G-buffer back: positions and normals at a pixel, and passes at a reduced resolution. |
