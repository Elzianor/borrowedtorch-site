---
layout: docs
legend: [prop]
title: "Glossary: DopplerAudioEffect"
description: "The properties of DopplerAudioEffect, in alphabetical order."
---

Bends the pitch by the speeds of the listener and the emitter along the line between them.

`DopplerAudioEffect` derives from [`BaseAudioEffect`](/docs/audio-glossary/effects/base-audio-effect/) and has its members too. The [positional sound page](/docs/audio-positional/#doppler) shows it in context, with code.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="demoemitterposition"><span class="prop"><code>DemoEmitterPosition</code></span> <a class="ctx" href="/docs/audio-positional/#doppleraudioeffect-properties" title="DemoEmitterPosition in context on the positional sound page" aria-label="DemoEmitterPosition in context on the positional sound page">→</a></h3>

`Vector3` · Where the sound is in demo mode. Move it between updates to hear the effect.

<h3 id="isdemomode"><span class="prop"><code>IsDemoMode</code></span> <a class="ctx" href="/docs/audio-positional/#doppleraudioeffect-properties" title="IsDemoMode in context on the positional sound page" aria-label="IsDemoMode in context on the positional sound page">→</a></h3>

`bool` · Measures the emitter's speed from the moves of <a class="ref prop" href="/docs/audio-glossary/effects/doppler-audio-effect/#demoemitterposition">`DemoEmitterPosition`</a>, around a listener standing still at the origin. See [demo mode](#demo-mode).
