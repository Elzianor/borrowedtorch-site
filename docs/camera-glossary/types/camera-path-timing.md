---
layout: docs
title: "Glossary: CameraPathTiming"
description: "The values of CameraPathTiming."
---

What sets how long an animated camera's run along its path takes.

An enum, the type of <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#timing">`Timing`</a>. The [path playback page](/docs/camera-playback/#duration-or-speed) shows it in context.

## Values

<h3 id="duration"><code>Duration</code> <a class="ctx" href="/docs/camera-playback/#camerapathtiming-values" title="Duration in context on the path playback page" aria-label="Duration in context on the path playback page">→</a></h3>

A run takes <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#durationsec">`DurationSec`</a>, easing and holds included; the cruise speed follows from it, the path's <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#cruisespeed">`CruiseSpeed`</a>. A path edited mid-run keeps the run's length and changes speed. The default.

<h3 id="speed"><code>Speed</code> <a class="ctx" href="/docs/camera-playback/#camerapathtiming-values" title="Speed in context on the path playback page" aria-label="Speed in context on the path playback page">→</a></h3>

The camera cruises at <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#speedunitspersec">`SpeedUnitsPerSec`</a>, and a run takes as long as that comes to, the path's <a class="ref method" href="/docs/camera-glossary/paths/camera-path/#traveltime">`TravelTime`</a>. A path edited mid-run keeps the speed and changes the run's length.
