---
layout: docs
title: "Camera glossary: paths"
description: "The camera path, its waypoints and samples, and the types that draw it, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`CameraPath`](/docs/camera-glossary/paths/camera-path/) | A smooth curve through waypoints, sampled by distance and timed with its waypoints' easing and holds. |
| [`CameraPathGeometryBuffers`](/docs/camera-glossary/paths/camera-path-geometry-buffers/) | The lists of points and frames that draw a path. |
| [`CameraPathGizmo`](/docs/camera-glossary/paths/camera-path-gizmo/) | An orientation frame: a position and three axes. |
| [`CameraPathPoint`](/docs/camera-glossary/paths/camera-path-point/) | A sampled point: position, direction, orientation and distance. |
| [`CameraPathVisualizer`](/docs/camera-glossary/paths/camera-path-visualizer/) | Builds a path's drawing geometry into buffers of your own. |
| [`CameraPathVisualOptions`](/docs/camera-glossary/paths/camera-path-visual-options/) | Options for the geometry: a fixed or adaptive line, and the frame count. |
| [`CameraWaypoint`](/docs/camera-glossary/paths/camera-waypoint/) | A position on a path, the way the camera faces there, and how it eases and holds there. |
