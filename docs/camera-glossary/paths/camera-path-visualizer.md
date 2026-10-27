---
layout: docs
legend: [method]
title: "Glossary: CameraPathVisualizer"
description: "The methods of CameraPathVisualizer, in alphabetical order."
---

Builds the geometry to draw a camera path into buffers: plain data for your own line renderer.

A static class. The [drawing a path page](/docs/camera-drawing/#buffers-of-your-own) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Methods

<h3 id="build"><span class="method"><code>Build()</code></span> <a class="ctx" href="/docs/camera-drawing/#camerapathvisualizer-methods" title="Build() in context on the drawing a path page" aria-label="Build() in context on the drawing a path page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path-visualizer/#build">`Build(CameraPath path, CameraPathGeometryBuffers buffers, in CameraPathVisualOptions options)`</a> · Static. Empties the buffers and fills them with the path's geometry, built at once with the options. A path with <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isvisualized">`IsVisualized`</a> on calls it itself. Throws `ArgumentNullException` for a `null` path or buffers.

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | <a class="ref" href="/docs/camera-glossary/paths/camera-path/">`CameraPath`</a> | The path to draw. Rebuilt first if it changed. |
| `buffers` | <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/">`CameraPathGeometryBuffers`</a> | The lists to fill. |
| `options` | <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/">`CameraPathVisualOptions`</a> | How to build the line and how many frames. |
