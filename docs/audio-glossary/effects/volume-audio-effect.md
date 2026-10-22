---
layout: docs
legend: [prop]
title: "Glossary: VolumeAudioEffect"
description: "The properties of VolumeAudioEffect, in alphabetical order."
---

Multiplies the sound by a gain kept within a range.

`VolumeAudioEffect` derives from [`BaseAudioEffect`](/docs/audio-glossary/effects/base-audio-effect/) and has its members too. The [volume, tone and time page](/docs/audio-shaping/#volume) shows it in context, with code.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="volume"><span class="prop"><code>Volume</code></span> <a class="ctx" href="/docs/audio-shaping/#volumeaudioeffect-properties" title="Volume in context on the volume, tone and time page" aria-label="Volume in context on the volume, tone and time page">→</a></h3>

`float` · The gain, kept within <a class="ref prop" href="/docs/audio-glossary/effects/volume-audio-effect/#volumerange">`VolumeRange`</a>. 1 by default.

<h3 id="volumerange"><span class="prop"><code>VolumeRange</code></span> <a class="ctx" href="/docs/audio-shaping/#volumeaudioeffect-properties" title="VolumeRange in context on the volume, tone and time page" aria-label="VolumeRange in context on the volume, tone and time page">→</a></h3>

`(float min, float max)` · The lowest and highest <a class="ref prop" href="/docs/audio-glossary/effects/volume-audio-effect/#volume">`Volume`</a>. Negative ends are taken as 0, and the two ends are put in order. Setting it brings <a class="ref prop" href="/docs/audio-glossary/effects/volume-audio-effect/#volume">`Volume`</a> into the new range. `(0, 1)` by default.
