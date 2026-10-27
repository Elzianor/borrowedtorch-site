---
layout: docs
title: "Glossary: CameraAnimationMode"
description: "The values of CameraAnimationMode."
---

What an animated camera does at the ends of an open path.

An enum, the type of <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#openpathanimationmode">`OpenPathAnimationMode`</a>. The [path playback page](/docs/camera-playback/#the-ends-of-a-path) shows it in context.

## Values

<h3 id="stop"><code>Stop</code> <a class="ctx" href="/docs/camera-playback/#cameraanimationmode-values" title="Stop in context on the path playback page" aria-label="Stop in context on the path playback page">→</a></h3>

Runs once and stops at the end: <a class="ref prop" href="/docs/camera-glossary/cameras/animated-camera-controller/#isplaying">`IsPlaying`</a> turns `false`, and <a class="ref method" href="/docs/camera-glossary/cameras/animated-camera-controller/#play">`Play`</a> there starts over. The default.

<h3 id="loop"><code>Loop</code> <a class="ctx" href="/docs/camera-playback/#cameraanimationmode-values" title="Loop in context on the path playback page" aria-label="Loop in context on the path playback page">→</a></h3>

Jumps from the end back to the start and goes on: a cut, on an open path.

<h3 id="pingpong"><code>PingPong</code> <a class="ctx" href="/docs/camera-playback/#cameraanimationmode-values" title="PingPong in context on the path playback page" aria-label="PingPong in context on the path playback page">→</a></h3>

Turns around at each end and travels back.
