---
layout: docs
title: "Glossary: CameraWaypointOrientationMode"
description: "The values of CameraWaypointOrientationMode."
---

How a waypoint decides the way the camera faces.

An enum, the type of <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#orientationmode">`CameraWaypoint.OrientationMode`</a>. The [camera paths page](/docs/camera-paths/#waypoints) shows it in context.

## Values

<h3 id="fixed"><code>Fixed</code> <a class="ctx" href="/docs/camera-paths/#camerawaypointorientationmode-values" title="Fixed in context on the camera paths page" aria-label="Fixed in context on the camera paths page">→</a></h3>

Faces the way of the waypoint's <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#orientation">`Orientation`</a>.

<h3 id="lookattarget"><code>LookAtTarget</code> <a class="ctx" href="/docs/camera-paths/#camerawaypointorientationmode-values" title="LookAtTarget in context on the camera paths page" aria-label="LookAtTarget in context on the camera paths page">→</a></h3>

Faces the waypoint's <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#lookattarget">`LookAtTarget`</a>, with no roll against the path's <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a>.

<h3 id="tangentfollow"><code>TangentFollow</code> <a class="ctx" href="/docs/camera-paths/#camerawaypointorientationmode-values" title="TangentFollow in context on the camera paths page" aria-label="TangentFollow in context on the camera paths page">→</a></h3>

Faces the way the path heads at the waypoint, with no roll against the path's <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a>.
