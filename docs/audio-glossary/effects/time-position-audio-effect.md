---
layout: docs
legend: [prop]
title: "Glossary: TimePositionAudioEffect"
description: "The properties of TimePositionAudioEffect, in alphabetical order."
---

Reads and moves the playing position of the current clip.

`TimePositionAudioEffect` derives from [`BaseAudioEffect`](/docs/audio-glossary/effects/base-audio-effect/) and has its members too. The [volume, tone and time page](/docs/audio-shaping/#time-position) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="timeposition"><span class="prop"><code>TimePosition</code></span> <a class="ctx" href="/docs/audio-shaping/#timepositionaudioeffect-properties" title="TimePosition in context on the volume, tone and time page" aria-label="TimePosition in context on the volume, tone and time page">→</a></h3>

`TimeSpan` · How far the current clip has played. Setting it moves the clip there, within its length. Reads zero and ignores sets while the effect isn't connected on both sides, or the emitter holds no clip.
