---
layout: docs
title: "Glossary: GizmoAxis"
description: "The values of GizmoAxis."
---

A handle of the gizmo by its axis: one of the three axes, one of the three planes between them, the pivot, or none.

An enum, the parameter of <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#direction">`Direction`</a> and <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#planebasis">`PlaneBasis`</a>. The [targets page](/docs/transform-gizmo-targets/#basis-maths-for-tools-of-your-own) shows it in context.

## Values

<h3 id="none"><code>None</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmoaxis-values" title="None in context on the targets page" aria-label="None in context on the targets page">→</a></h3>

No handle. Its direction is `Vector3.Zero`.

<h3 id="x"><code>X</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmoaxis-values" title="X in context on the targets page" aria-label="X in context on the targets page">→</a></h3>

The X axis, and its arm, ring or scale box.

<h3 id="y"><code>Y</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmoaxis-values" title="Y in context on the targets page" aria-label="Y in context on the targets page">→</a></h3>

The Y axis, and its arm, ring or scale box.

<h3 id="z"><code>Z</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmoaxis-values" title="Z in context on the targets page" aria-label="Z in context on the targets page">→</a></h3>

The Z axis, and its arm, ring or scale box.

<h3 id="center"><code>Center</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmoaxis-values" title="Center in context on the targets page" aria-label="Center in context on the targets page">→</a></h3>

The pivot square, which in scale mode scales all three axes together. Its direction is `Vector3.Zero`.

<h3 id="xy"><code>XY</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmoaxis-values" title="XY in context on the targets page" aria-label="XY in context on the targets page">→</a></h3>

The plane square between the X and Y arms, in the color of Z, the axis it leaves out. It moves the target across the plane of X and Y, or scales X and Y together. Its direction is `Vector3.Zero`.

<h3 id="xz"><code>XZ</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmoaxis-values" title="XZ in context on the targets page" aria-label="XZ in context on the targets page">→</a></h3>

The plane square between the X and Z arms, in the color of Y, the axis it leaves out. It moves the target across the plane of X and Z, or scales X and Z together. Its direction is `Vector3.Zero`.

<h3 id="yz"><code>YZ</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmoaxis-values" title="YZ in context on the targets page" aria-label="YZ in context on the targets page">→</a></h3>

The plane square between the Y and Z arms, in the color of X, the axis it leaves out. It moves the target across the plane of Y and Z, or scales Y and Z together. Its direction is `Vector3.Zero`.
