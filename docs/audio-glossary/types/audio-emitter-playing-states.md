---
layout: docs
title: "Glossary: AudioEmitterPlayingStates"
description: "The values of AudioEmitterPlayingStates."
---

Where an emitter is: idle, playing, paused, finished, or stopped by a broken chain.

An enum. The [emitters page](/docs/audio-emitters/#audioemitterplayingstates) shows it in context.

## Values

<h3 id="idle"><code>Idle</code> <a class="ctx" href="/docs/audio-emitters/#audioemitterplayingstates" title="Idle in context on the emitters page" aria-label="Idle in context on the emitters page">→</a></h3>

No clip is playing: the emitter is new or stopped, or waits in a loop pause.

<h3 id="playing"><code>Playing</code> <a class="ctx" href="/docs/audio-emitters/#audioemitterplayingstates" title="Playing in context on the emitters page" aria-label="Playing in context on the emitters page">→</a></h3>

A clip is playing.

<h3 id="paused"><code>Paused</code> <a class="ctx" href="/docs/audio-emitters/#audioemitterplayingstates" title="Paused in context on the emitters page" aria-label="Paused in context on the emitters page">→</a></h3>

A clip is held by <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause`</a>.

<h3 id="finished"><code>Finished</code> <a class="ctx" href="/docs/audio-emitters/#audioemitterplayingstates" title="Finished in context on the emitters page" aria-label="Finished in context on the emitters page">→</a></h3>

A clip of an emitter that doesn't loop played to its end. <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> starts a new one.

<h3 id="effectloopdisconnected"><code>EffectLoopDisconnected</code> <a class="ctx" href="/docs/audio-emitters/#audioemitterplayingstates" title="EffectLoopDisconnected in context on the emitters page" aria-label="EffectLoopDisconnected in context on the emitters page">→</a></h3>

The effect chain doesn't reach the return, so the emitter is stopped and ignores play, pause and stop.
