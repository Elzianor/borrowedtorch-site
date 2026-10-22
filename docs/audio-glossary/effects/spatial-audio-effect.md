---
layout: docs
title: "Glossary: SpatialAudioEffect"
description: "The properties of SpatialAudioEffect, in alphabetical order."
---

Makes the sound come from the emitter's direction around the listener, with an HRTF.

`SpatialAudioEffect` derives from [`BaseAudioEffect`](/docs/audio-glossary/effects/base-audio-effect/) and has its members too. The [positional sound page](/docs/audio-positional/#spatialisation) shows it in context, with code.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="audiospread"><span class="prop"><code>AudioSpread</code></span> <a class="ctx" href="/docs/audio-positional/#spatialaudioeffect-properties" title="AudioSpread in context on the positional sound page" aria-label="AudioSpread in context on the positional sound page">→</a></h3>

`float` · How wide the source is, from 0, a point, to 1, heard alike from everywhere. 0 by default.

<h3 id="demoemitterposition"><span class="prop"><code>DemoEmitterPosition</code></span> <a class="ctx" href="/docs/audio-positional/#spatialaudioeffect-properties" title="DemoEmitterPosition in context on the positional sound page" aria-label="DemoEmitterPosition in context on the positional sound page">→</a></h3>

`Vector3` · Where the sound is in demo mode.

<h3 id="isdemomode"><span class="prop"><code>IsDemoMode</code></span> <a class="ctx" href="/docs/audio-positional/#spatialaudioeffect-properties" title="IsDemoMode in context on the positional sound page" aria-label="IsDemoMode in context on the positional sound page">→</a></h3>

`bool` · Places the sound at <a class="ref prop" href="/docs/audio-glossary/effects/spatial-audio-effect/#demoemitterposition">`DemoEmitterPosition`</a> around a listener at the origin facing −Z, with +Y up and +X right. See [demo mode](#demo-mode).
