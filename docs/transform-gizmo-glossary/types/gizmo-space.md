---
layout: docs
title: "Glossary: GizmoSpace"
description: "The values of GizmoSpace."
---

The frame the gizmo's move and rotate handles work in.

An enum, the type of <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a> and of what <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#resolvespace">`ResolveSpace`</a> returns. The [modes and frames page](/docs/transform-gizmo-modes/#frames) shows it in context.

## Values

<h3 id="global"><code>Global</code> <a class="ctx" href="/docs/transform-gizmo-modes/#gizmospace-values" title="Global in context on the modes and frames page" aria-label="Global in context on the modes and frames page">→</a></h3>

The world's axes. The default.

<h3 id="local"><code>Local</code> <a class="ctx" href="/docs/transform-gizmo-modes/#gizmospace-values" title="Local in context on the modes and frames page" aria-label="Local in context on the modes and frames page">→</a></h3>

The target's own axes, from <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldaxes">`WorldAxes`</a>. Scale always works in it.
