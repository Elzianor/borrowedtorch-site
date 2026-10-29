---
layout: docs
legend: [method]
title: "Glossary: GizmoCapabilitiesExtensions"
description: "The members of GizmoCapabilitiesExtensions, in alphabetical order."
---

The rules that turn a target's capabilities into the mode and the frame the gizmo uses, as extension methods of <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a>.

A static class. The [capabilities page](/docs/transform-gizmo-capabilities/#the-rules) shows it in context, with code. The rules need no graphics device, so a toolbar or an inspector can ask them.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Methods

<h3 id="allows"><span class="method"><code>Allows()</code></span> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilitiesextensions-methods" title="Allows() in context on the capabilities page" aria-label="Allows() in context on the capabilities page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#allows">`Allows(this GizmoCapabilities capabilities, GizmoMode mode)`</a> · Whether the mode is offered at all, in either frame or with either scale handle.

| Parameter | Type | Description |
| --- | --- | --- |
| `capabilities` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a> | The target's flags. |
| `mode` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/">`GizmoMode`</a> | The mode to ask about. |

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#allows">`Allows(this GizmoCapabilities capabilities, GizmoMode mode, GizmoSpace space)`</a> · Whether the mode is offered in the frame. Scale is offered only in `Local`.

| Parameter | Type | Description |
| --- | --- | --- |
| `capabilities` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a> | The target's flags. |
| `mode` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/">`GizmoMode`</a> | The mode to ask about. |
| `space` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-space/">`GizmoSpace`</a> | The frame to ask about. |

<h3 id="nextmode"><span class="method"><code>NextMode()</code></span> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilitiesextensions-methods" title="NextMode() in context on the capabilities page" aria-label="NextMode() in context on the capabilities page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#nextmode">`NextMode(this GizmoCapabilities capabilities, GizmoMode current)`</a> · The next offered mode after `current`, in translate, rotate, scale order, wrapping round. A lone mode comes back as itself; with nothing offered, `current` comes back.

| Parameter | Type | Description |
| --- | --- | --- |
| `capabilities` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a> | The target's flags. |
| `current` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/">`GizmoMode`</a> | The mode to step on from. |

<h3 id="resolvespace"><span class="method"><code>ResolveSpace()</code></span> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilitiesextensions-methods" title="ResolveSpace() in context on the capabilities page" aria-label="ResolveSpace() in context on the capabilities page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#resolvespace">`ResolveSpace(this GizmoCapabilities capabilities, GizmoMode mode, GizmoSpace preferred)`</a> · The frame the mode works in: `preferred` when the mode is offered there, otherwise the other frame when it is offered there. `Local` for scale whatever is preferred; `preferred` for a mode offered in neither frame.

| Parameter | Type | Description |
| --- | --- | --- |
| `capabilities` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a> | The target's flags. |
| `mode` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/">`GizmoMode`</a> | The mode to settle the frame of. |
| `preferred` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-space/">`GizmoSpace`</a> | The frame asked for, as <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#space">`Space`</a>. |

<h3 id="tryclampmode"><span class="method"><code>TryClampMode()</code></span> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilitiesextensions-methods" title="TryClampMode() in context on the capabilities page" aria-label="TryClampMode() in context on the capabilities page">→</a></h3>

<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/#tryclampmode">`TryClampMode(this GizmoCapabilities capabilities, GizmoMode current, out GizmoMode mode)`</a> · Keeps a mode on one the target offers: `true` with `current` when it is offered, else `true` with the first offered mode in translate, rotate, scale order. `false`, with `mode` set to `current`, when nothing is offered.

| Parameter | Type | Description |
| --- | --- | --- |
| `capabilities` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a> | The target's flags. |
| `current` | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/">`GizmoMode`</a> | The mode in use. |
| `mode` | `out GizmoMode` | The mode to use. |
