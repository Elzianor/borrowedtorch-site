---
layout: docs
legend: [prop]
title: "Glossary: ITransformGizmoTarget"
description: "The members of ITransformGizmoTarget, in alphabetical order."
---

Whatever the gizmo is attached to: a mesh, a light, a marker. The gizmo reads the pose from it and, while a handle is dragged, writes back the part that handle edits.

An interface. The [targets page](/docs/transform-gizmo-targets/#the-target-interface) shows it in context, with code. Implement it over your own objects.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="capabilities"><span class="prop"><code>Capabilities</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#itransformgizmotarget-properties" title="Capabilities in context on the targets page" aria-label="Capabilities in context on the targets page">→</a></h3>

<a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a> · Read-only. The modes, and for move and rotate the frames, the gizmo offers for this target. `None` hides the gizmo. Read while no drag runs: a drag keeps the value it began with.

<h3 id="localrotation"><span class="prop"><code>LocalRotation</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#itransformgizmotarget-properties" title="LocalRotation in context on the targets page" aria-label="LocalRotation in context on the targets page">→</a></h3>

`Quaternion` · The rotation relative to the parent. Read when a rotate drag begins, and set by it: the drag composes its turn onto the value read, in the target's own frame.

<h3 id="localscale"><span class="prop"><code>LocalScale</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#itransformgizmotarget-properties" title="LocalScale in context on the targets page" aria-label="LocalScale in context on the targets page">→</a></h3>

`Vector3` · The scale along the target's own axes. Read when a scale drag begins, and set by it. The gizmo never reads or sets it for a target that doesn't offer scale.

<h3 id="worldaxes"><span class="prop"><code>WorldAxes</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#itransformgizmotarget-properties" title="WorldAxes in context on the targets page" aria-label="WorldAxes in context on the targets page">→</a></h3>

<a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/">`GizmoBasis`</a> · Read-only. The target's own axes as they point in the world, made with <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#fromobjectaxes">`FromObjectAxes`</a> from its world matrix. The local handles lie along them; a scaled, skewed or mirrored frame is fine.

<h3 id="worldposition"><span class="prop"><code>WorldPosition</code></span> <a class="ctx" href="/docs/transform-gizmo-targets/#itransformgizmotarget-properties" title="WorldPosition in context on the targets page" aria-label="WorldPosition in context on the targets page">→</a></h3>

`Vector3` · The pivot, in world coordinates: where the gizmo is drawn, and what a move drag sets. Carry a new value through the parents into the target's own position.
