---
layout: docs
title: "Glossary: GizmoCapabilities"
description: "The values of GizmoCapabilities."
---

What the gizmo may do to a target: the modes it offers and, for move and rotate, the frames.

A set of flags: the values combine.

An enum, the type of <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#capabilities">`Capabilities`</a>. The [capabilities page](/docs/transform-gizmo-capabilities/#the-flags) shows it in context.

## Values

<h3 id="none"><code>None</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="None in context on the capabilities page" aria-label="None in context on the capabilities page">→</a></h3>

Nothing: the gizmo hides for the target, and clicks go to the scene.

<h3 id="translateglobal"><code>TranslateGlobal</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="TranslateGlobal in context on the capabilities page" aria-label="TranslateGlobal in context on the capabilities page">→</a></h3>

The move arms along the world's axes.

<h3 id="translatelocal"><code>TranslateLocal</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="TranslateLocal in context on the capabilities page" aria-label="TranslateLocal in context on the capabilities page">→</a></h3>

The move arms along the target's own axes.

<h3 id="rotateglobal"><code>RotateGlobal</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="RotateGlobal in context on the capabilities page" aria-label="RotateGlobal in context on the capabilities page">→</a></h3>

The rings about the world's axes.

<h3 id="rotatelocal"><code>RotateLocal</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="RotateLocal in context on the capabilities page" aria-label="RotateLocal in context on the capabilities page">→</a></h3>

The rings about the target's own axes.

<h3 id="scaleaxes"><code>ScaleAxes</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="ScaleAxes in context on the capabilities page" aria-label="ScaleAxes in context on the capabilities page">→</a></h3>

The three scale arms, each scaling one of the target's own axes.

<h3 id="scaleuniform"><code>ScaleUniform</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="ScaleUniform in context on the capabilities page" aria-label="ScaleUniform in context on the capabilities page">→</a></h3>

The center square, scaling all three axes together.

<h3 id="translate"><code>Translate</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="Translate in context on the capabilities page" aria-label="Translate in context on the capabilities page">→</a></h3>

<a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#translateglobal">`TranslateGlobal`</a> and <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#translatelocal">`TranslateLocal`</a>: move in either frame.

<h3 id="rotate"><code>Rotate</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="Rotate in context on the capabilities page" aria-label="Rotate in context on the capabilities page">→</a></h3>

<a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#rotateglobal">`RotateGlobal`</a> and <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#rotatelocal">`RotateLocal`</a>: turn in either frame.

<h3 id="scale"><code>Scale</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="Scale in context on the capabilities page" aria-label="Scale in context on the capabilities page">→</a></h3>

<a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scaleaxes">`ScaleAxes`</a> and <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/#scaleuniform">`ScaleUniform`</a>: every scale handle.

<h3 id="all"><code>All</code> <a class="ctx" href="/docs/transform-gizmo-capabilities/#gizmocapabilities-values" title="All in context on the capabilities page" aria-label="All in context on the capabilities page">→</a></h3>

Every mode, in every frame, with every handle.
