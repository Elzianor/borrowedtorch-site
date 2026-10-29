---
layout: docs
legend: [prop, method]
title: "Glossary: GizmoBasis"
description: "The members of GizmoBasis, in alphabetical order."
---

The directions of the gizmo's three axes in world space: the world's own for the global frame, a target's for the local one. Unit length, but not always perpendicular.

A read-only struct. The [targets page](/docs/transform-gizmo-targets/#the-axes-of-a-target) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="islefthanded"><span class="prop"><code>IsLeftHanded</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmobasis-members" title="IsLeftHanded in context on the targets page" aria-label="IsLeftHanded in context on the targets page">→</a></h3>

`bool` · Read-only. Whether the frame is mirrored: (X × Y) · Z is negative, as for an object with one or three negative scales. Two negative scales make a half turn, which is right-handed. The gizmo turns a rotate drag the other way on a mirrored target.

## Fields

<h3 id="world"><code>World</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmobasis-construction" title="World in context on the targets page" aria-label="World in context on the targets page">→</a></h3>

<a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/">`GizmoBasis`</a> · Static, read-only field. The world's axes, `Vector3.UnitX`, `Vector3.UnitY` and `Vector3.UnitZ`: the frame of the global modes.

<h3 id="x"><code>X</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmobasis-members" title="X in context on the targets page" aria-label="X in context on the targets page">→</a></h3>

`Vector3` · Read-only field. The +X axis, a unit vector in world space.

<h3 id="y"><code>Y</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmobasis-members" title="Y in context on the targets page" aria-label="Y in context on the targets page">→</a></h3>

`Vector3` · Read-only field. The +Y axis, a unit vector in world space.

<h3 id="z"><code>Z</code> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmobasis-members" title="Z in context on the targets page" aria-label="Z in context on the targets page">→</a></h3>

`Vector3` · Read-only field. The +Z axis, a unit vector in world space.

## Methods

<h3 id="gizmobasis"><span class="method"><code>GizmoBasis()</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmobasis-construction" title="GizmoBasis() in context on the targets page" aria-label="GizmoBasis() in context on the targets page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#gizmobasis">`GizmoBasis(Vector3 x, Vector3 y, Vector3 z)`</a> · A basis of the axes as given. They must be unit length already: for the rows of a world matrix, which carry the object's scale, use <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#fromobjectaxes">`FromObjectAxes`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `x` | `Vector3` | The +X axis, a unit vector. |
| `y` | `Vector3` | The +Y axis, a unit vector. |
| `z` | `Vector3` | The +Z axis, a unit vector. |

<h3 id="direction"><span class="method"><code>Direction()</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmobasis-members" title="Direction() in context on the targets page" aria-label="Direction() in context on the targets page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#direction">`Direction(GizmoAxis axis)`</a> · The direction of the axis: <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#x">`X`</a>, <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#y">`Y`</a> or <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#z">`Z`</a>, or `Vector3.Zero` for `None`, `Center` and the plane handles `XY`, `XZ` and `YZ`.

| Parameter | Type | Description |
| --- | --- | --- |
| `axis` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-axis/">`GizmoAxis`</a> | The axis to look up. |

<h3 id="fromobjectaxes"><span class="method"><code>FromObjectAxes()</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmobasis-construction" title="FromObjectAxes() in context on the targets page" aria-label="FromObjectAxes() in context on the targets page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#fromobjectaxes">`FromObjectAxes(Vector3 x, Vector3 y, Vector3 z)`</a> · Static. An object's own axes as they point in world space, from the rows of its world matrix: `Right`, `Up` and `Backward`. Each is normalized with its direction kept, so skew and mirroring stay; an axis of length zero becomes the matching world axis.

| Parameter | Type | Description |
| --- | --- | --- |
| `x` | `Vector3` | The object's +X in world space, of any length. |
| `y` | `Vector3` | Its +Y, of any length. |
| `z` | `Vector3` | Its +Z, of any length. |

<h3 id="orthonormalized"><span class="method"><code>Orthonormalized()</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmobasis-members" title="Orthonormalized() in context on the targets page" aria-label="Orthonormalized() in context on the targets page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#orthonormalized">`Orthonormalized()`</a> · A copy with perpendicular axes, the closest to this basis, and mirrored if it is. Gram–Schmidt from X: X stays, Y loses its part along X, and Z its parts along both. The same axes for a basis with no shear, an approximation for one with shear. A Y along X takes a perpendicular from Z, a Z in the X–Y plane completes the frame right-handed, and a basis collapsed onto one line comes back as <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#world">`World`</a>.

<h3 id="planebasis"><span class="method"><code>PlaneBasis()</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#gizmobasis-members" title="PlaneBasis() in context on the targets page" aria-label="PlaneBasis() in context on the targets page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#planebasis">`PlaneBasis(GizmoAxis axis, out Vector3 u, out Vector3 v)`</a> · Two perpendicular unit vectors spanning the plane square to the axis, with u × v along the axis, so turning from `u` toward `v` is a positive turn about it. Built from the axis alone, so square to it in a skewed basis too. Where `u` lies around the circle is arbitrary: use differences of angles. For `None`, `Center`, a plane handle or an axis of length zero, `Vector3.UnitX` and `Vector3.UnitY`.

| Parameter | Type | Description |
| --- | --- | --- |
| `axis` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-axis/">`GizmoAxis`</a> | The axis the plane is square to. |
| `u` | `out Vector3` | The first direction in the plane. |
| `v` | `out Vector3` | The second, a quarter turn from `u` about the axis. |
