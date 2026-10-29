---
layout: docs
title: "Transform gizmo glossary: gizmo and targets"
description: "The gizmo, its targets and the helpers around them, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`TransformGizmo`](/docs/transform-gizmo-glossary/gizmo/transform-gizmo/) | The gizmo: draws the handles at a target's pivot, picks them and drags them. |
| [`ITransformGizmoTarget`](/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/) | What the gizmo is attached to: a pose it reads and writes, and the capabilities it offers. |
| [`GizmoBasis`](/docs/transform-gizmo-glossary/gizmo/gizmo-basis/) | The three axes of a frame in world space, skew and mirroring kept. |
| [`GizmoCapabilitiesExtensions`](/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/) | The rules that turn capabilities into a mode and a frame. |
| [`PainterOrderDepthSort`](/docs/transform-gizmo-glossary/gizmo/painter-order-depth-sort/) | Sorts items far to near, for overlays drawn with depth testing off. |
