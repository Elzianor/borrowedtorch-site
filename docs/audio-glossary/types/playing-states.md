---
layout: docs
title: "Glossary: PlayingStates"
description: "The values of PlayingStates."
---

The state of a clip on the audio thread. No public member returns it.

An enum. The [emitters page](/docs/audio-emitters/#playingstates) shows it in context.

## Values

<h3 id="idle"><code>Idle</code> <a class="ctx" href="/docs/audio-emitters/#playingstates" title="Idle in context on the emitters page" aria-label="Idle in context on the emitters page">→</a></h3>

No clip is playing.

<h3 id="playing"><code>Playing</code> <a class="ctx" href="/docs/audio-emitters/#playingstates" title="Playing in context on the emitters page" aria-label="Playing in context on the emitters page">→</a></h3>

The clip is playing.

<h3 id="paused"><code>Paused</code> <a class="ctx" href="/docs/audio-emitters/#playingstates" title="Paused in context on the emitters page" aria-label="Paused in context on the emitters page">→</a></h3>

The clip is held.

<h3 id="eofreached"><code>EofReached</code> <a class="ctx" href="/docs/audio-emitters/#playingstates" title="EofReached in context on the emitters page" aria-label="EofReached in context on the emitters page">→</a></h3>

The clip has played to its end; the next update starts a loop or finishes the emitter.
