---
layout: docs
legend: [prop]
title: "Glossary: CameraPathVisualOptions"
description: "The members of CameraPathVisualOptions, in alphabetical order."
---

How the geometry of a camera path is built: a fixed or an adaptive line, and how many orientation frames.

A struct of plain fields: change one with `with`, as in `path.VisualOptions with { GizmoCount = 24 }`. The [drawing a path page](/docs/camera-drawing/#options) shows it in context, with a picture.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="default"><span class="prop"><code>Default</code></span> <a class="ctx" href="/docs/camera-drawing/#camerapathvisualoptions-property" title="Default in context on the drawing a path page" aria-label="Default in context on the drawing a path page">→</a></h3>

<a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/">`CameraPathVisualOptions`</a> · Static, read-only. The default options, a new copy on each read: a fixed line of 128 segments, a chord tolerance of 0.05, a depth of 12 and 12 frames. `new CameraPathVisualOptions()` is all zeros instead.

## Fields

<h3 id="chordtolerance"><code>ChordTolerance</code> <a class="ctx" href="/docs/camera-drawing/#camerapathvisualoptions-fields" title="ChordTolerance in context on the drawing a path page" aria-label="ChordTolerance in context on the drawing a path page">→</a></h3>

`float` · How far, in world units, the curve may stray from an adaptive line before the line is split; at least 10<sup>−5</sup>. 0.05 in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a>.

<h3 id="gizmocount"><code>GizmoCount</code> <a class="ctx" href="/docs/camera-drawing/#camerapathvisualoptions-fields" title="GizmoCount in context on the drawing a path page" aria-label="GizmoCount in context on the drawing a path page">→</a></h3>

`int` · The number of orientation frames along the path; 0 or less gives none. 12 in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a>.

<h3 id="isadaptive"><code>IsAdaptive</code> <a class="ctx" href="/docs/camera-drawing/#camerapathvisualoptions-fields" title="IsAdaptive in context on the drawing a path page" aria-label="IsAdaptive in context on the drawing a path page">→</a></h3>

`bool` · Whether the line is split where the curve bends, rather than into equal segments. `false` in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a>.

<h3 id="maxsubdivisiondepth"><code>MaxSubdivisionDepth</code> <a class="ctx" href="/docs/camera-drawing/#camerapathvisualoptions-fields" title="MaxSubdivisionDepth in context on the drawing a path page" aria-label="MaxSubdivisionDepth in context on the drawing a path page">→</a></h3>

`int` · How many times a piece of an adaptive line may be halved, starting from two pieces per segment. 12 in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a>.

<h3 id="polylinesamples"><code>PolylineSamples</code> <a class="ctx" href="/docs/camera-drawing/#camerapathvisualoptions-fields" title="PolylineSamples in context on the drawing a path page" aria-label="PolylineSamples in context on the drawing a path page">→</a></h3>

`int` · The number of equal segments of a fixed line, so one more point; less than 1 counts as 1. 128 in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a>.
