---
layout: docs
title: "Ray tracing glossary: the BVH"
description: "The tree builder both levels share and its node, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`Bvh`](/docs/ray-tracing-glossary/bvh/bvh/) | A tree over primitives given as boxes, with the helpers that walk it: the tree of every BLAS and of the scene. |
| [`BvhNode`](/docs/ray-tracing-glossary/bvh/bvh-node/) | One node: a box, and a leaf's primitives or an interior node's skip. |
