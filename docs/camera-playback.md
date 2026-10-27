---
layout: docs
legend: [prop, method]
title: "Camera: path playback"
description: The animated camera that plays a path at constant speed, what it does at the ends of a path, seeking, easing onto the path, and recording and saving waypoints.
---

<a class="ref" href="/docs/camera-glossary/cameras/animated-camera-controller/">`AnimatedCameraController`</a> moves its camera along a [camera path](/docs/camera-paths/) at a constant speed:
fly-throughs, cutscenes, attract modes and the tours of an editor. It plays, pauses and seeks like a media player,
and eases the camera onto the path from wherever it was. Names are colored by what they are: a
<span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the
plain color.

## Playing a path

A new controller has an empty path of its own. Add waypoints to it, attach the controller and play:

```csharp
var tour = new AnimatedCameraController { DurationSec = 12 };

tour.Path.AddWaypoint(CameraWaypoint.CreateLookAtTarget(new Vector3(-30, 8, 30), castle));
tour.Path.AddWaypoint(CameraWaypoint.CreateLookAtTarget(new Vector3(30, 14, 30), castle));
tour.Path.AddWaypoint(CameraWaypoint.CreateTangentFollow(new Vector3(35, 5, -20)));

camera.Controller = tour;
tour.Play();
```

<a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#path">`Path`</a> can also be assigned a path you built elsewhere, which one controller or several can share. It is never
`null`: assigning `null` throws `ArgumentNullException`.

<a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#durationsec">`DurationSec`</a> is the time of one run from end to end, 8 seconds by default, so the speed is the path's
<a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a> over it: the same duration makes a longer path faster. For a speed of your choosing, set the duration from
the length:

```csharp
tour.DurationSec = tour.Path.Length / 6; // 6 units a second
```

A new controller is paused. <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#play">`Play`</a> starts it and <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#pause">`Pause`</a> holds it, and <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#isplaying">`IsPlaying`</a> says which it
is doing. Paused, the controller still keeps the camera at its point of the path. With no waypoints, it leaves the
camera where it is; with a duration of 0 or less, or a path of length 0, it doesn't move along the path.

### AnimatedCameraController properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#path">`Path`</a> | <a class="ref" href="/docs/camera-glossary/paths/camera-path/">`CameraPath`</a> | The path to follow. An empty path of its own by default. Throws `ArgumentNullException` for `null`. |
| <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#durationsec">`DurationSec`</a> | `float` | The seconds of one run from end to end. 8 by default. |
| <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#openpathanimationmode">`OpenPathAnimationMode`</a> | <a class="ref" href="/docs/camera-glossary/types/camera-animation-mode/">`CameraAnimationMode`</a> | What an open path does at its ends: `Stop`, `Loop` or `PingPong`. `Stop` by default. A closed path always goes round. |
| <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#entryblenddurationsec">`EntryBlendDurationSec`</a> | `float` | The seconds the camera takes to ease onto the path when the controller is attached; 0 or less jumps. 2 by default. |
| <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#snaptonearestonentry">`SnapToNearestOnEntry`</a> | `bool` | Whether attaching starts from the point of the path nearest the camera, rather than from <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#pathdistance">`PathDistance`</a>. On by default. |
| <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#isplaying">`IsPlaying`</a> | `bool` | Read-only. Whether the camera is moving along the path. |
| <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#pathdistance">`PathDistance`</a> | `float` | Read-only. Where the camera is, as a distance along the path in world units. Set it with <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#seek">`Seek`</a>. |

## The ends of a path

<a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#openpathanimationmode">`OpenPathAnimationMode`</a> decides what the camera does when it reaches the end of an open path, as a
<a class="ref" href="/docs/camera-glossary/types/camera-animation-mode/">`CameraAnimationMode`</a>:

<figure class="shot">
  <img src="{{ '/assets/img/camera/animation-modes.svg' | relative_url }}" width="640" height="190" alt="Three paths from a start to an end: Stop runs once and halts at the end; Loop runs to the end and jumps back to the start; PingPong runs to the end, turns around and comes back">
  <figcaption>The three modes on an open path. A closed path has no ends: it always goes round.</figcaption>
</figure>

- **`Stop`**, the default, runs once and stops at the end: <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#isplaying">`IsPlaying`</a> turns `false`. <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#play">`Play`</a> at the end starts
  over from the beginning.
- **`Loop`** jumps from the end back to the start and goes on. On an open path that is a cut from the last waypoint to
  the first; for a smooth loop, close the path instead.
- **`PingPong`** turns around at each end and travels back, forever.

A [closed path](/docs/camera-paths/#open-and-closed-paths) has no ends: the camera goes round it whatever the mode.

The controller raises no event at the end. Watch <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#isplaying">`IsPlaying`</a> to tell when a `Stop` cutscene is over:

```csharp
if (_inCutscene && !_cutscene.IsPlaying)
{
    _inCutscene = false;
    camera.Controller = _free; // hand the camera back to the player
}
```

### CameraAnimationMode values

| Value | Description |
| --- | --- |
| <a class="ref" href="/docs/camera-glossary/types/camera-animation-mode/#stop">`Stop`</a> | Runs once and stops at the end; playing again starts over. |
| <a class="ref" href="/docs/camera-glossary/types/camera-animation-mode/#loop">`Loop`</a> | Jumps from the end back to the start and goes on. |
| <a class="ref" href="/docs/camera-glossary/types/camera-animation-mode/#pingpong">`PingPong`</a> | Turns around at each end. |

## Seeking

<a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#pathdistance">`PathDistance`</a> is where the camera is on the path, in world units from its start. <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#seek">`Seek`</a> moves it to a
distance and <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#seeknormalized">`SeekNormalized`</a> to a fraction of the length, both clamped to the path. Seeking works playing or
paused, and the camera gets there at its next update. A timeline scrubber in an editor:

```csharp
// scrub is 0 to 1, from a slider under the view
tour.Pause();
tour.SeekNormalized(scrub);
```

On the way back of a ping-pong, the camera keeps going back after a seek.

## Easing onto the path

Attaching the controller takes the camera over from wherever it is, in two steps:

- **Where to start.** With <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#snaptonearestonentry">`SnapToNearestOnEntry`</a>, on by default, the controller starts from the point of the
  path [nearest the camera](/docs/camera-paths/#the-nearest-point). Off, it starts from its <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#pathdistance">`PathDistance`</a>: 0
  for a new controller, or where it was paused, or where a seek put it.
- **How to get there.** Over <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#entryblenddurationsec">`EntryBlendDurationSec`</a>, 2 seconds by default, the camera eases from its pose
  to the path's, starting and ending gently. A playing path keeps moving meanwhile, so the camera merges into it
  rather than catching up with a point left behind. A blend of 0 jumps onto the path at once.

Build the path before attaching the controller: the nearest point is found at attachment. To cut into a cutscene on
its first frame, with no easing:

```csharp
_cutscene.SnapToNearestOnEntry = false;
_cutscene.EntryBlendDurationSec = 0;
_cutscene.Seek(0);

camera.Controller = _cutscene;
_cutscene.Play();
_inCutscene = true;
```

### AnimatedCameraController methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#animatedcameracontroller">`AnimatedCameraController()`</a> | A paused controller with an empty path, an 8-second duration, the `Stop` mode, a 2-second entry blend and snapping to the nearest point on. |
| <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#play">`Play()`</a> | Starts moving along the path. At the end of a stopped open path, starts over from the beginning. |
| <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#pause">`Pause()`</a> | Holds the camera where it is on the path. |
| <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#seek">`Seek(float pathDistance)`</a> | Moves to a distance along the path, clamped to 0 to its <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#length">`Length`</a>. |
| <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#seeknormalized">`SeekNormalized(float value)`</a> | Moves to a fraction of the path's length, clamped to 0 to 1. |
| <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#addwaypoint">`AddWaypoint(Camera camera, CameraWaypointOrientationMode mode = Fixed, Vector3? lookAt = null)`</a> | Adds a waypoint at the end of the path, at the camera's position. Throws `ArgumentNullException` for `null`. |
| <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#update">`Update(float elapsedSeconds)`</a> | Moves along the path and sets the camera's pose. The camera calls it. |

## Recording waypoints

<a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#addwaypoint">`AddWaypoint`</a> builds a path from a camera: it adds a waypoint at the camera's position, usually one the player
or a designer is flying with a free camera. The controller doesn't need to be attached to that camera.

```csharp
tour.AddWaypoint(camera);                                                    // facing where the camera faces
tour.AddWaypoint(camera, CameraWaypointOrientationMode.LookAtTarget, castle); // facing the castle
tour.AddWaypoint(camera, CameraWaypointOrientationMode.TangentFollow);       // facing along the path
```

A `LookAtTarget` waypoint with no `lookAt` faces the origin.

### Saving a path

Waypoints are plain data. Save each one's fields, and the path's <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#closed">`Closed`</a> and <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#worldup">`WorldUp`</a>, to build the same
path again. MonoGame's vectors and quaternions keep their numbers in fields, so tell `System.Text.Json` to include
fields:

```csharp
using System.Text.Json;

var options = new JsonSerializerOptions { IncludeFields = true, WriteIndented = true };

// save
File.WriteAllText("tour.json", JsonSerializer.Serialize(tour.Path.Waypoints, options));

// load
var path = new CameraPath();
foreach (var waypoint in JsonSerializer.Deserialize<CameraWaypoint[]>(File.ReadAllText("tour.json"), options))
    path.AddWaypoint(waypoint);

tour.Path = path;
```
