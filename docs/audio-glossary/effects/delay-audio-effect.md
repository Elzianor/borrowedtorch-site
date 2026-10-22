---
layout: docs
title: "Glossary: DelayAudioEffect"
description: "The properties of DelayAudioEffect, in alphabetical order."
---

An echo: the sound again after a delay, with feedback for more echoes.

`DelayAudioEffect` derives from [`BaseAudioEffect`](/docs/audio-glossary/effects/base-audio-effect/) and has its members too. The [volume, tone and time page](/docs/audio-shaping/#delay) shows it in context, with code.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="delayms"><span class="prop"><code>DelayMs</code></span> <a class="ctx" href="/docs/audio-shaping/#delayaudioeffect-properties" title="DelayMs in context on the volume, tone and time page" aria-label="DelayMs in context on the volume, tone and time page">→</a></h3>

`float` · The time between the sound and its echo, from 0 to <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#maxdelayms">`MaxDelayMs`</a>. 0 by default, which switches the effect off.

<h3 id="feedback"><span class="prop"><code>Feedback</code></span> <a class="ctx" href="/docs/audio-shaping/#delayaudioeffect-properties" title="Feedback in context on the volume, tone and time page" aria-label="Feedback in context on the volume, tone and time page">→</a></h3>

`float` · How much of each echo comes back as the next one, from 0 to 1. 0 by default: a single echo.

<h3 id="maxdelayms"><span class="prop"><code>MaxDelayMs</code></span> <a class="ctx" href="/docs/audio-shaping/#delayaudioeffect-properties" title="MaxDelayMs in context on the volume, tone and time page" aria-label="MaxDelayMs in context on the volume, tone and time page">→</a></h3>

`float` · Static. 3 000 ms, the longest delay.

<h3 id="mix"><span class="prop"><code>Mix</code></span> <a class="ctx" href="/docs/audio-shaping/#delayaudioeffect-properties" title="Mix in context on the volume, tone and time page" aria-label="Mix in context on the volume, tone and time page">→</a></h3>

`float` · How much of the output is echo, from 0 (none) to 1 (only echo). 0 by default.
