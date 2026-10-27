---
layout: docs
legend: [prop, method]
title: "Glossary: CameraPath"
description: "The members of CameraPath, in alphabetical order."
---

A smooth curve through waypoints, measured so that equal distances along it are equal lengths of curve, with an orientation at every point.

A sealed class. The [camera paths page](/docs/camera-paths/) shows it in context, with code, and the [drawing a path page](/docs/camera-drawing/) how to draw it.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="closed"><span class="prop"><code>Closed</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-properties" title="Closed in context on the camera paths page" aria-label="Closed in context on the camera paths page">→</a></h3>

`bool` · Whether the path loops from its last waypoint back to its first. Takes effect with three waypoints or more, see <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isclosed">`IsClosed`</a>. Off by default. Changing it marks the path for rebuilding.

<h3 id="isclosed"><span class="prop"><code>IsClosed</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-properties" title="IsClosed in context on the camera paths page" aria-label="IsClosed in context on the camera paths page">→</a></h3>

`bool` · Read-only. Whether the path really loops: <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#closed">`Closed`</a> is set and it has at least three waypoints.

<h3 id="isvisualized"><span class="prop"><code>IsVisualized</code></span> <a class="ctx" href="/docs/camera-drawing/#camerapath-drawing-properties" title="IsVisualized in context on the drawing a path page" aria-label="IsVisualized in context on the drawing a path page">→</a></h3>

`bool` · Whether the path keeps <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#visualgeometrybuffers">`VisualGeometryBuffers`</a> current. Turning it on builds the geometry; turning it off empties it. Off by default.

<h3 id="length"><span class="prop"><code>Length</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-properties" title="Length in context on the camera paths page" aria-label="Length in context on the camera paths page">→</a></h3>

`float` · Read-only. The length of the whole curve, in world units; 0 with fewer than two waypoints. Reading it rebuilds the path if it changed.

<h3 id="segmentcount"><span class="prop"><code>SegmentCount</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-properties" title="SegmentCount in context on the camera paths page" aria-label="SegmentCount in context on the camera paths page">→</a></h3>

`int` · Read-only. The number of segments: one fewer than the waypoints for an open path, as many for a loop, 0 for fewer than two waypoints.

<h3 id="visualgeometrybuffers"><span class="prop"><code>VisualGeometryBuffers</code></span> <a class="ctx" href="/docs/camera-drawing/#camerapath-drawing-properties" title="VisualGeometryBuffers in context on the drawing a path page" aria-label="VisualGeometryBuffers in context on the drawing a path page">→</a></h3>

<a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/">`CameraPathGeometryBuffers`</a> · Read-only. The geometry to draw the path, built again on this read when the path or <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#visualoptions">`VisualOptions`</a> changed. Empty while <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isvisualized">`IsVisualized`</a> is off. Always the same instance.

<h3 id="visualoptions"><span class="prop"><code>VisualOptions</code></span> <a class="ctx" href="/docs/camera-drawing/#camerapath-drawing-properties" title="VisualOptions in context on the drawing a path page" aria-label="VisualOptions in context on the drawing a path page">→</a></h3>

<a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/">`CameraPathVisualOptions`</a> · How the geometry is built. <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a> by default. A struct: assign a changed copy, which marks the geometry for building again.

<h3 id="waypoints"><span class="prop"><code>Waypoints</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-properties" title="Waypoints in context on the camera paths page" aria-label="Waypoints in context on the camera paths page">→</a></h3>

`IReadOnlyList<CameraWaypoint>` · Read-only. The waypoints in path order, as a read-only view. Edit them with <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#addwaypoint">`AddWaypoint`</a>, <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#insertwaypoint">`InsertWaypoint`</a>, <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#setwaypoint">`SetWaypoint`</a>, <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#removewaypointat">`RemoveWaypointAt`</a> and <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#clearwaypoints">`ClearWaypoints`</a>.

<h3 id="worldup"><span class="prop"><code>WorldUp</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-properties" title="WorldUp in context on the camera paths page" aria-label="WorldUp in context on the camera paths page">→</a></h3>

`Vector3` · The up that `LookAtTarget` and `TangentFollow` waypoints level their roll against. `Vector3.Up` by default. Changing it marks the path for rebuilding.

## Methods

<h3 id="camerapath"><span class="method"><code>CameraPath()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-editing-methods" title="CameraPath() in context on the camera paths page" aria-label="CameraPath() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#camerapath">`CameraPath(int samplesPerSegment = 32)`</a> · An empty path. Throws `ArgumentOutOfRangeException` when `samplesPerSegment` is less than 1.

| Parameter | Type | Description |
| --- | --- | --- |
| `samplesPerSegment` | `int` | How finely each segment is measured. Default: 32, which keeps the speed within 0.15 % of constant; each doubling cuts the placement error more than tenfold, up to around 64. |

<h3 id="addwaypoint"><span class="method"><code>AddWaypoint()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-editing-methods" title="AddWaypoint() in context on the camera paths page" aria-label="AddWaypoint() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#addwaypoint">`AddWaypoint(CameraWaypoint waypoint)`</a> · Adds a waypoint at the end and marks the path for rebuilding.

| Parameter | Type | Description |
| --- | --- | --- |
| `waypoint` | <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/">`CameraWaypoint`</a> | The waypoint to add. |

<h3 id="clearwaypoints"><span class="method"><code>ClearWaypoints()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-editing-methods" title="ClearWaypoints() in context on the camera paths page" aria-label="ClearWaypoints() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#clearwaypoints">`ClearWaypoints()`</a> · Removes every waypoint and marks the path for rebuilding.

<h3 id="closestdistance"><span class="method"><code>ClosestDistance()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-sampling-methods" title="ClosestDistance() in context on the camera paths page" aria-label="ClosestDistance() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#closestdistance">`ClosestDistance(Vector3 worldPosition)`</a> · The distance along the path of its point nearest the position: a scan of every point the path is measured at, then a refinement between the best one's neighbors. 0 for a path with fewer than two waypoints.

| Parameter | Type | Description |
| --- | --- | --- |
| `worldPosition` | `Vector3` | The position, in world coordinates. |

<h3 id="getwaypointorientation"><span class="method"><code>GetWaypointOrientation()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-sampling-methods" title="GetWaypointOrientation() in context on the camera paths page" aria-label="GetWaypointOrientation() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#getwaypointorientation">`GetWaypointOrientation(int index)`</a> · The orientation the waypoint resolves to, the one the path has there: its own for `Fixed`, worked out from its target or the curve for `LookAtTarget` and `TangentFollow`. Works for a lone waypoint too. Throws `ArgumentOutOfRangeException` for an index out of range.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The waypoint's index in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#waypoints">`Waypoints`</a>. |

<h3 id="insertwaypoint"><span class="method"><code>InsertWaypoint()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-editing-methods" title="InsertWaypoint() in context on the camera paths page" aria-label="InsertWaypoint() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#insertwaypoint">`InsertWaypoint(int index, CameraWaypoint waypoint)`</a> · Inserts a waypoint at the index and marks the path for rebuilding; the waypoints from there on move up by one. Throws `ArgumentOutOfRangeException` for an index below 0 or above the count.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | Where the new waypoint goes. The count adds it at the end. |
| `waypoint` | <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/">`CameraWaypoint`</a> | The waypoint to insert. |

<h3 id="positionbypathdistance"><span class="method"><code>PositionByPathDistance()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-sampling-methods" title="PositionByPathDistance() in context on the camera paths page" aria-label="PositionByPathDistance() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#positionbypathdistance">`PositionByPathDistance(float pathDistance)`</a> · The position alone at the distance along the path, clamped to 0 to <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a>: the origin for an empty path, the waypoint for a lone one.

| Parameter | Type | Description |
| --- | --- | --- |
| `pathDistance` | `float` | In world units from the first waypoint. |

<h3 id="positionbypathdistancenormalized"><span class="method"><code>PositionByPathDistanceNormalized()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-sampling-methods" title="PositionByPathDistanceNormalized() in context on the camera paths page" aria-label="PositionByPathDistanceNormalized() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#positionbypathdistancenormalized">`PositionByPathDistanceNormalized(float value)`</a> · The position alone at a fraction of the path's length.

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `float` | 0 for the start, 1 for the end; clamped to 0 to 1. |

<h3 id="rebuild"><span class="method"><code>Rebuild()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-rebuild-method" title="Rebuild() in context on the camera paths page" aria-label="Rebuild() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#rebuild">`Rebuild()`</a> · Measures the path now: its length, its distance table, its waypoint orientations and, while <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isvisualized">`IsVisualized`</a> is on, its geometry. Edits schedule it for the next query on their own; call it to pay the cost at a moment of your choosing.

<h3 id="removewaypointat"><span class="method"><code>RemoveWaypointAt()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-editing-methods" title="RemoveWaypointAt() in context on the camera paths page" aria-label="RemoveWaypointAt() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#removewaypointat">`RemoveWaypointAt(int index)`</a> · Removes the waypoint at the index and marks the path for rebuilding. Throws `ArgumentOutOfRangeException` for an index out of range.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The waypoint's index in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#waypoints">`Waypoints`</a>. |

<h3 id="samplebypathdistance"><span class="method"><code>SampleByPathDistance()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-sampling-methods" title="SampleByPathDistance() in context on the camera paths page" aria-label="SampleByPathDistance() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#samplebypathdistance">`SampleByPathDistance(float pathDistance)`</a> · A <a class="ref" href="/docs/camera-glossary/paths/camera-path-point/">`CameraPathPoint`</a>: the position, direction and orientation at the distance along the path, clamped to 0 to <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a>, on a closed path too. A lone waypoint gives its own position and orientation; an empty path, the origin facing −Z.

| Parameter | Type | Description |
| --- | --- | --- |
| `pathDistance` | `float` | In world units from the first waypoint. |

<h3 id="samplebypathdistancenormalized"><span class="method"><code>SampleByPathDistanceNormalized()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-sampling-methods" title="SampleByPathDistanceNormalized() in context on the camera paths page" aria-label="SampleByPathDistanceNormalized() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#samplebypathdistancenormalized">`SampleByPathDistanceNormalized(float value)`</a> · The same at a fraction of the path's length.

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `float` | 0 for the start, 1 for the end; clamped to 0 to 1. |

<h3 id="setwaypoint"><span class="method"><code>SetWaypoint()</code></span> <a class="ctx" href="/docs/camera-paths/#camerapath-editing-methods" title="SetWaypoint() in context on the camera paths page" aria-label="SetWaypoint() in context on the camera paths page">→</a></h3>

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#setwaypoint">`SetWaypoint(int index, CameraWaypoint waypoint)`</a> · Replaces the waypoint at the index and marks the path for rebuilding. Throws `ArgumentOutOfRangeException` for an index out of range.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The waypoint's index in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#waypoints">`Waypoints`</a>. |
| `waypoint` | <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/">`CameraWaypoint`</a> | The waypoint to put there. |
