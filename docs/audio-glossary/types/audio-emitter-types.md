---
layout: docs
title: "Glossary: AudioEmitterTypes"
description: "The values of AudioEmitterTypes."
---

Whether an emitter's clips are cached in memory or streamed from disk.

An enum. The [emitters page](/docs/audio-emitters/#audioemittertypes) shows it in context.

## Values

<h3 id="cached"><code>Cached</code> <a class="ctx" href="/docs/audio-emitters/#audioemittertypes" title="Cached in context on the emitters page" aria-label="Cached in context on the emitters page">→</a></h3>

Clips are decoded once into memory, shared by every cached emitter. For short, frequent sounds.

<h3 id="streaming"><code>Streaming</code> <a class="ctx" href="/docs/audio-emitters/#audioemittertypes" title="Streaming in context on the emitters page" aria-label="Streaming in context on the emitters page">→</a></h3>

Clips are decoded from disk while they play. For music and long ambiences.
