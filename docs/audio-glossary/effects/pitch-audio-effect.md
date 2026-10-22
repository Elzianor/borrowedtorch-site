---
layout: docs
title: "Glossary: PitchAudioEffect"
description: "The properties of PitchAudioEffect, in alphabetical order."
---

Raises or lowers the pitch by a factor, without changing how long the sound lasts.

`PitchAudioEffect` derives from [`BaseAudioEffect`](/docs/audio-glossary/effects/base-audio-effect/) and has its members too. The [volume, tone and time page](/docs/audio-shaping/#pitch) shows it in context, with code.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="pitch"><span class="prop"><code>Pitch</code></span> <a class="ctx" href="/docs/audio-shaping/#pitchaudioeffect-properties" title="Pitch in context on the volume, tone and time page" aria-label="Pitch in context on the volume, tone and time page">→</a></h3>

`float` · The pitch factor, from 0.0625 (four octaves down) to 16 (four octaves up). 1 by default, which leaves the sound as it is.
