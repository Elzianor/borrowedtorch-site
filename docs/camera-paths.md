---
layout: docs
legend: [prop, method]
title: "Camera: camera paths"
description: Waypoints and their orientation modes, building open and closed paths, the shape of the curve, sampling by distance, the nearest point, easing and holds at waypoints, and how accurate the travel is.
---

A <a class="ref" href="/docs/camera-glossary/paths/camera-path/">`CameraPath`</a> is a smooth curve through waypoints, with an orientation at every point of it. Give it a distance
along the curve and it tells you where that is, which way the curve heads there and which way to face. Equal
distances are equal lengths of curve, so a distance that grows at a steady rate moves at a steady speed. A waypoint
can also slow the travel to a halt, hold it there a while and speed it up again, and the path works out where that
puts a camera at any time of a run. The [animated camera](/docs/camera-playback/) plays a path; the path itself is
plain data, which you can also sample for a rail camera, a cutscene of your own or anything else that should glide
along a curve. Names are colored by what they are: a <span class="kb kb-prop">property</span> or a
<span class="kb kb-method">method</span>; values and fields keep the plain color.

## Waypoints

A <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/">`CameraWaypoint`</a> is a position and a way to face, one of three
<a class="ref" href="/docs/camera-glossary/types/camera-waypoint-orientation-mode/">`CameraWaypointOrientationMode`</a>s:

- **`Fixed`** faces the way its <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#orientation">`Orientation`</a> says: a shot framed by hand.
- **`LookAtTarget`** faces the point <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#lookattarget">`LookAtTarget`</a>, with no roll against the path's <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a>.
- **`TangentFollow`** faces the way the path heads at the waypoint, with no roll against <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a>: it looks down
  the track.

A factory makes each kind:

```csharp
var opening = CameraWaypoint.CreateFixed(new Vector3(0, 12, 45), Quaternion.Identity); // facing -Z
var circle = CameraWaypoint.CreateLookAtTarget(new Vector3(35, 10, 0), towerPosition);  // facing the tower
var descent = CameraWaypoint.CreateTangentFollow(new Vector3(0, 4, -35));               // facing along the path
var here = CameraWaypoint.CreateFixedFromCamera(camera); // where the camera is, facing where it faces
```

A waypoint is a small struct with public fields; the factories fill the ones its mode doesn't use with defaults. A
`Fixed` waypoint whose orientation is a zero quaternion, such as `default(CameraWaypoint)`, faces −Z. Three more
fields, <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#easein">`EaseIn`</a>, <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#easeout">`EaseOut`</a> and <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#holdsec">`HoldSec`</a>, decide how the camera travels through the waypoint
rather than where it faces, see [easing and holds](#easing-and-holds). The factories leave them off: no easing and no
hold.

Between two waypoints, the orientation turns from one waypoint's to the next, in proportion to the distance traveled
along the segment. So the modes mix freely: a fixed opening shot can turn smoothly toward a target at the next
waypoint. One consequence for `TangentFollow`: the camera faces along the curve exactly at the waypoints, and turns
evenly between them, so on a long bend it doesn't follow the curve point by point. Add waypoints along the bend for a
closer follow.

<figure class="shot">
  <img src="{{ '/assets/img/camera/path-orientation.svg' | relative_url }}" width="640" height="300" alt="A path seen from above, through five waypoints, with a small arrow at regular steps showing which way the camera faces: toward a tower at the two look-at waypoints, down the track at the two tangent-follow ones, and turning smoothly in between">
  <figcaption>A path from above, drawn from the library's own samples. The arrows are the facing at even steps of distance; the circles are the waypoints.</figcaption>
</figure>

### CameraWaypoint fields

| Field | Type | Description |
| --- | --- | --- |
| <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#position">`Position`</a> | `Vector3` | Where the waypoint is, in world coordinates. The curve passes through it. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#orientation">`Orientation`</a> | `Quaternion` | The facing of a `Fixed` waypoint. Normalized when used; a zero quaternion faces −Z. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#lookattarget">`LookAtTarget`</a> | `Vector3` | The point a `LookAtTarget` waypoint faces, in world coordinates. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#orientationmode">`OrientationMode`</a> | <a class="ref" href="/docs/camera-glossary/types/camera-waypoint-orientation-mode/">`CameraWaypointOrientationMode`</a> | How the waypoint's facing is decided: `Fixed`, `LookAtTarget` or `TangentFollow`. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#easein">`EaseIn`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction?`</a> | How the camera leaves the waypoint: the curve it travels the first half of the next segment by. An ease in starts it from rest. `null`, the default, travels it at cruise speed. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#easeout">`EaseOut`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction?`</a> | How the camera arrives at the waypoint: the curve it travels the second half of the segment before by. An ease out brings it to rest there. `null`, the default, travels it at cruise speed. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#holdsec">`HoldSec`</a> | `float` | The seconds the camera waits at the waypoint before it leaves. 0, the default, passes straight through. |

### CameraWaypoint factory methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-waypoint/#createfixed">`CreateFixed(Vector3 position, Quaternion orientation)`</a> | Static. A `Fixed` waypoint facing the way of the orientation. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-waypoint/#createlookattarget">`CreateLookAtTarget(Vector3 position, Vector3 lookAtTarget)`</a> | Static. A waypoint facing the target. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-waypoint/#createtangentfollow">`CreateTangentFollow(Vector3 position)`</a> | Static. A waypoint facing the way the path heads there. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-waypoint/#createfixedfromcamera">`CreateFixedFromCamera(Camera camera)`</a> | Static. A `Fixed` waypoint at the camera's position, with its orientation. Throws `ArgumentNullException` for `null`. |

### CameraWaypointOrientationMode values

| Value | Description |
| --- | --- |
| <a class="ref" href="/docs/camera-glossary/types/camera-waypoint-orientation-mode/#fixed">`Fixed`</a> | Faces the way of the waypoint's <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#orientation">`Orientation`</a>. |
| <a class="ref" href="/docs/camera-glossary/types/camera-waypoint-orientation-mode/#lookattarget">`LookAtTarget`</a> | Faces the waypoint's <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#lookattarget">`LookAtTarget`</a>, leveled against the path's <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a>. |
| <a class="ref" href="/docs/camera-glossary/types/camera-waypoint-orientation-mode/#tangentfollow">`TangentFollow`</a> | Faces the way the path heads at the waypoint, leveled against <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a>. |

## Building a path

Add the waypoints in the order the path visits them, and edit them through the path's methods:

```csharp
var path = new CameraPath();
path.AddWaypoint(opening);
path.AddWaypoint(circle);
path.AddWaypoint(descent);

// one more between the first two
path.InsertWaypoint(1, CameraWaypoint.CreateTangentFollow(new Vector3(25, 11, 30)));

// move the opening shot up a little; waypoints are structs, so change a copy
path.SetWaypoint(0, path.Waypoints[0] with { Position = new Vector3(0, 15, 45) });

path.RemoveWaypointAt(2);
path.ClearWaypoints();
```

<a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#waypoints">`Waypoints`</a> is a read-only view of them in order: read it, count it, loop over it, but change waypoints with the
methods, which also mark the path for [rebuilding](#rebuilding-and-accuracy). An index out of range throws
`ArgumentOutOfRangeException`.

### Open and closed paths

An open path starts at its first waypoint and ends at its last. Set <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#closed">`Closed`</a> and it also runs from the last
waypoint back to the first, as smoothly across that seam as anywhere else: a loop around a building, a patrol, an
attract mode.

```csharp
var orbit = new CameraPath { Closed = true };

for (var i = 0; i < 8; i++)
{
    var angle = MathHelper.TwoPi * i / 8;
    var position = new Vector3(MathF.Sin(angle) * 40, 15, MathF.Cos(angle) * 40);
    orbit.AddWaypoint(CameraWaypoint.CreateLookAtTarget(position, Vector3.Zero));
}
```

A loop needs at least three waypoints: with fewer, a closed path stays open. <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isclosed">`IsClosed`</a> says whether it really
loops, and <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#segmentcount">`SegmentCount`</a> how many segments it has: one per waypoint for a loop, one fewer for an open path.

<a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a> is the up that `LookAtTarget` and `TangentFollow` waypoints level their roll against: `Vector3.Up` by
default. Change it for a world whose up is another axis.

### CameraPath properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#waypoints">`Waypoints`</a> | `IReadOnlyList<CameraWaypoint>` | Read-only. The waypoints in path order. Edit them with the methods below. |
| <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#closed">`Closed`</a> | `bool` | Whether the path loops back to its first waypoint. Takes effect with three waypoints or more. Off by default. |
| <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isclosed">`IsClosed`</a> | `bool` | Read-only. Whether the path really loops: <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#closed">`Closed`</a> is set and it has at least three waypoints. |
| <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a> | `Vector3` | The up that `LookAtTarget` and `TangentFollow` waypoints level their roll against. `Vector3.Up` by default. |
| <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#segmentcount">`SegmentCount`</a> | `int` | Read-only. The number of segments between waypoints: one fewer than the waypoints for an open path, as many for a loop, 0 for fewer than two waypoints. |
| <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a> | `float` | Read-only. The length of the whole curve, in world units. |

### CameraPath editing methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#camerapath">`CameraPath(int samplesPerSegment = 32)`</a> | An empty path. `samplesPerSegment` sets how finely each segment is measured, see [accuracy](#rebuilding-and-accuracy). Throws `ArgumentOutOfRangeException` when it is less than 1. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#addwaypoint">`AddWaypoint(CameraWaypoint waypoint)`</a> | Adds a waypoint at the end. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#insertwaypoint">`InsertWaypoint(int index, CameraWaypoint waypoint)`</a> | Inserts a waypoint at the index; the ones from there on move up by one. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#setwaypoint">`SetWaypoint(int index, CameraWaypoint waypoint)`</a> | Replaces the waypoint at the index. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#removewaypointat">`RemoveWaypointAt(int index)`</a> | Removes the waypoint at the index. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#clearwaypoints">`ClearWaypoints()`</a> | Removes every waypoint. |

## The shape of the curve

The curve is a centripetal Catmull-Rom spline: it passes through every waypoint in order, and its direction changes
smoothly through each of them. The centripetal kind spaces its segments by the distances between the waypoints, so
waypoints placed unevenly, some close together and some far apart, still give a curve with no loops, kinks or
overshoots within a segment.

At the ends of an open path, the curve leaves the first waypoint heading roughly toward the second, and arrives at
the last coming from the one before it. Two waypoints give a straight line between them.

A curve through few waypoints can bulge more than you would like between two that are far apart. Add a waypoint where
the curve should pass rather than moving its neighbors: each waypoint shapes only four segments, the two that meet at
it and the next one beyond each of those.

## Sampling

A point of the path is a distance along it, in world units from its first waypoint, from 0 to <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a>.
<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#samplebypathdistance">`SampleByPathDistance`</a> returns everything about it as a <a class="ref" href="/docs/camera-glossary/paths/camera-path-point/">`CameraPathPoint`</a>:

```csharp
// something that travels the path at 5 units a second, and starts over at the end
if (path.Length > 0)
{
    _distance = (_distance + 5 * seconds) % path.Length;

    var point = path.SampleByPathDistance(_distance);
    marker.Position = point.Position;
    marker.Rotation = point.Orientation;
}
```

| What | Where |
| --- | --- |
| The position on the curve | <a class="ref" href="/docs/camera-glossary/paths/camera-path-point/#position">`point.Position`</a> |
| The direction the curve heads, a unit vector | <a class="ref" href="/docs/camera-glossary/paths/camera-path-point/#tangent">`point.Tangent`</a> |
| The orientation, between the two waypoints' | <a class="ref" href="/docs/camera-glossary/paths/camera-path-point/#orientation">`point.Orientation`</a> |
| The distance that was sampled, after clamping | <a class="ref" href="/docs/camera-glossary/paths/camera-path-point/#distanceunits">`point.DistanceUnits`</a> |

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#positionbypathdistance">`PositionByPathDistance`</a> returns the position alone and skips the rest, for when that is all you need. Both have a
normalized form, which takes a fraction of the path from 0 to 1 instead of a distance:
`path.SampleByPathDistanceNormalized(0.5f)` is the middle of the path, halfway along its length.

Distances are clamped to the path: below 0 is the start, beyond <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a> the end, on a closed path too. Wrap them
yourself, as with `%` above, to go round a loop. A path with one waypoint has no curve: every distance gives that
waypoint's position and orientation. An empty path gives the origin, facing −Z.

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#getwaypointorientation">`GetWaypointOrientation`</a> returns the orientation a waypoint resolves to, for a `LookAtTarget` or a `TangentFollow`
waypoint the one worked out from its target or the curve. It is the orientation the path has at that waypoint.

### CameraPath sampling methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#samplebypathdistance">`SampleByPathDistance(float pathDistance)`</a> | The position, direction and orientation at the distance along the path, clamped to 0 to <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a>. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#samplebypathdistancenormalized">`SampleByPathDistanceNormalized(float value)`</a> | The same at a fraction of the length, clamped to 0 to 1. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#positionbypathdistance">`PositionByPathDistance(float pathDistance)`</a> | The position alone at the distance, clamped to 0 to <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a>. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#positionbypathdistancenormalized">`PositionByPathDistanceNormalized(float value)`</a> | The position alone at a fraction of the length, clamped to 0 to 1. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#closestdistance">`ClosestDistance(Vector3 worldPosition)`</a> | The distance along the path of its point nearest the position. 0 for a path with fewer than two waypoints. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#getwaypointorientation">`GetWaypointOrientation(int index)`</a> | The orientation the waypoint resolves to. Throws `ArgumentOutOfRangeException` for an index out of range. |

### CameraPathPoint fields

| Field | Type | Description |
| --- | --- | --- |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-point/#position">`Position`</a> | `Vector3` | Read-only. The point on the curve, in world coordinates. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-point/#tangent">`Tangent`</a> | `Vector3` | Read-only. The direction the curve heads there, a unit vector. `Vector3.Forward` where it has none, as on a path of one waypoint. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-point/#orientation">`Orientation`</a> | `Quaternion` | Read-only. The orientation there, turned between the orientations of the waypoints on either side. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-point/#distanceunits">`DistanceUnits`</a> | `float` | Read-only. The distance along the path that was sampled, after clamping. |

## The nearest point

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#closestdistance">`ClosestDistance`</a> finds the point of the path nearest a position and returns its distance along the path. The
animated camera uses it to join a path where the camera is. A rail camera is another use: a path laid along a
corridor, the camera kept at the point of it nearest the player, looking at them.

```csharp
var d = rail.ClosestDistance(player.Position);

camera.Position = rail.PositionByPathDistance(d);
camera.LookAt(player.Position, Vector3.Up);
```

It scans every point the path measured itself at, then narrows the best one down between its neighbors. The scan
makes it reliable on a path that folds back on itself, where a search that only went downhill could settle on the
wrong side of a hairpin. It costs a pass over all those points, so call it when you need it, not many times a frame.
Where two parts of the path are equally near, either may be returned.

## Easing and holds

Where no waypoint says otherwise, a run along the path keeps one speed from end to end: the cruise speed. A waypoint
can change that around itself. Each segment is split at its middle, and each half belongs to the waypoint at its end
of the segment:

- <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#easeout">`EaseOut`</a> shapes the arrival: the half of the segment coming in. An ease out such as
  <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-out/">`QuadraticEaseOut`</a> brings the camera to rest at the waypoint.
- <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#easein">`EaseIn`</a> shapes the departure: the half of the segment going out. An ease in such as
  <a class="ref" href="/docs/shaping-functions-glossary/functions/quadratic-ease-in/">`QuadraticEaseIn`</a> starts it from rest.
- <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#holdsec">`HoldSec`</a> keeps the camera at the waypoint for that many seconds before it leaves.

<figure class="shot">
  <img src="{{ '/assets/img/camera/easing-and-holds.svg' | relative_url }}" width="640" height="232" alt="A graph of speed over the 16 seconds of a run through four waypoints: from rest the speed climbs in a straight ramp to the cruise speed of 10, stays there past waypoint 1, falls in a ramp to rest at waypoint 2, stays at zero through the 1.5-second hold, climbs again and falls back to rest at waypoint 3">
  <figcaption>The speed over one run of a straight path through four waypoints 30 units apart, at a cruise speed of 10 units a second, drawn from the library's own timing. Waypoint 0 eases in, waypoint 1 passes at cruise speed, waypoint 2 eases out, holds and eases in, and waypoint 3 eases out, all with quadratic curves.</figcaption>
</figure>

The curves are [shaping functions](/docs/shaping-functions/) from `BorrowedTorch.ShapingFunctions`, read as progress
over time: the input is the share of the half's time gone by, the output the share of its length covered. Any function
of that library will do, and so will a [custom one](/docs/shaping-functions-custom/). One instance can serve several
waypoints.

```csharp
using BorrowedTorch.ShapingFunctions;

// slow to a halt at the waypoint facing the tower, look at it for two seconds, then move on
path.SetWaypoint(1, path.Waypoints[1] with
{
    EaseOut = new QuadraticEaseOut(),
    HoldSec = 2,
    EaseIn = new QuadraticEaseIn()
});

// set off from rest, and come to rest at the end
var last = path.Waypoints.Count - 1;
path.SetWaypoint(0, path.Waypoints[0] with { EaseIn = new CubicEaseIn() });
path.SetWaypoint(last, path.Waypoints[last] with { EaseOut = new CubicEaseOut() });
```

### How long an eased half takes

An eased half takes as long as its curve needs to meet the cruise speed where it joins the rest of the run, so the
speed doesn't jump there; at the waypoint itself it is whatever the curves make it. The steeper the curve, the longer
its half takes. Against the time the same half takes at cruise speed, the ease in or
the ease out of each family takes about:

| Curves | Time of an eased half |
| --- | --- |
| Sine | 1.6 times the cruise time |
| Quadratic | 2 times |
| Cubic | 2.9 times |
| Quartic | 3.7 times |
| Back | 4.4 times |
| Quintic | 4.5 times |
| Exponential | 5.9 times |
| Circular | 6.2 times |
| Elastic | 8 times, the most any curve takes |

Give <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#easein">`EaseIn`</a> an ease in and <a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#easeout">`EaseOut`</a> an ease out. A curve that is slower than a straight line at the
end where it meets cruise speed, such as an ease in-out, a bounce or an ease out given to `EaseIn`, takes the cruise
time and meets cruise speed with a jump.

A curve that overshoots, such as a back or an elastic ease, carries the camera a little past the waypoint and back.
Sampling clamps distances to the path, so at the ends of an open path the camera stays put for that moment instead.

The path times the halves when it [rebuilds](#rebuilding-and-accuracy), so setting a waypoint retimes it. Changing
the parameters of a function a waypoint already holds doesn't: set the waypoint again after.

### Holds

A hold comes just before the camera leaves its waypoint: at the first waypoint, before the camera sets off, and at the
last waypoint of an open path, where there is nothing more to travel, before the run ends. A closed path holds at its
first waypoint once per lap, at the start of the lap.

Holds are plain seconds, which the cruise speed doesn't change. A negative or non-finite
<a class="ref" href="/docs/camera-glossary/paths/camera-waypoint/#holdsec">`HoldSec`</a> counts as 0.

### Timing a run

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#traveltime">`TravelTime`</a> gives the seconds of one run at a cruise speed, easing and holds included, and
<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#distanceattime">`DistanceAtTime`</a> where along the path a camera is some seconds into the run. Together they turn the
[sampling](#sampling) example into a run with the waypoints' easing and holds:

```csharp
// something that cruises the path at 5 units a second, eases and holds where its waypoints say,
// and starts over at the end
var run = path.TravelTime(5);

if (run > 0)
{
    _seconds = (_seconds + seconds) % run;

    var point = path.SampleByPathDistance(path.DistanceAtTime(_seconds, 5));
    marker.Position = point.Position;
    marker.Rotation = point.Orientation;
}
```

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#cruisespeed">`CruiseSpeed`</a> works the other way, from the length of a run to its cruise speed. The holds take their
seconds and the travel takes the rest, but never less than a tenth of the run: holds that alone would fill it make
the run that much longer. <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#timeatdistance">`TimeAtDistance`</a> turns a distance back into a time, to start a run partway
along. The animated camera uses all four, see [its easing and holds](/docs/camera-playback/#easing-and-holds).

### CameraPath timing methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#traveltime">`TravelTime(float cruiseSpeed)`</a> | The seconds of one run at the cruise speed, in units a second, easing and holds included; without either, <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a> over the speed. 0 for a path with no segment, infinity for a speed of 0 or less. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#cruisespeed">`CruiseSpeed(float durationSec)`</a> | The cruise speed at which one run takes the duration, the inverse of <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#traveltime">`TravelTime`</a>. Travel gets at least a tenth of the duration, whatever the holds. 0 for a duration of 0 or less, or a path of length 0. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#distanceattime">`DistanceAtTime(float seconds, float cruiseSpeed)`</a> | The distance along the path the seconds into a run at the cruise speed; without easing or holds, the speed times the seconds. 0 before the run and <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a> after it. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#timeatdistance">`TimeAtDistance(float pathDistance, float cruiseSpeed)`</a> | The seconds into a run at the cruise speed when the camera reaches the distance, clamped to the path: the inverse of <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#distanceattime">`DistanceAtTime`</a>. At a waypoint that holds, the time the camera arrives. |

## Rebuilding and accuracy

A path measures itself before it can be sampled: the length of each segment, a table from distance to the curve's
own parameter, the orientation of each waypoint and the timing of each half segment. Any edit marks it for measuring
again: a waypoint added,
inserted, set or removed, or a change to <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#closed">`Closed`</a> or <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a>. The next query does it, so the tables never
disagree with the waypoints and there is nothing to remember. Many edits in a row cost one rebuild, at the next query.

<a class="ref method" href="/docs/camera-glossary/paths/camera-path/#rebuild">`Rebuild`</a> does it at once, to pay the cost at a moment of your choosing, such as while a level loads, rather than
on the first frame of a cutscene. It is quick: about 11 µs for a path of eight waypoints at the default accuracy.

Travel along a path is constant-speed. With the default 32 samples per segment, a camera's speed stays within 0.15 %
of constant from frame to frame, even through a tight turn between two long segments; positions are within
2·10<sup>−4</sup> units of where exact arc length would put them, and <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a> is right to one part in 100 000.
The constructor's `samplesPerSegment` sets that accuracy: each doubling cuts the placement error more than tenfold,
until `float` rounding takes over at around 64. Higher values mostly cost rebuild time and memory.

### CameraPath rebuild method

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#rebuild">`Rebuild()`</a> | Measures the path now: its length, its distance table, its waypoint orientations, its timing and, when it is drawn, its geometry. Edits schedule it for the next query on their own. |
