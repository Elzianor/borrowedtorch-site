---
layout: docs
title: "Glossary: FadeInOutAudioEffect"
description: "The properties of FadeInOutAudioEffect, in alphabetical order."
---

Fades each clip in at its start and out before its end.

`FadeInOutAudioEffect` derives from [`BaseAudioEffect`](/docs/audio-glossary/effects/base-audio-effect/) and has its members too. The [volume, tone and time page](/docs/audio-shaping/#fades) shows it in context, with code.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="fadeindurationms"><span class="prop"><code>FadeInDurationMs</code></span> <a class="ctx" href="/docs/audio-shaping/#fadeinoutaudioeffect-properties" title="FadeInDurationMs in context on the volume, tone and time page" aria-label="FadeInDurationMs in context on the volume, tone and time page">→</a></h3>

`float` · How long each clip fades in from its start, at most half the clip. Negative values are taken as 0. 0 by default: no fade in.

<h3 id="fadeinfunction"><span class="prop"><code>FadeInFunction</code></span> <a class="ctx" href="/docs/audio-shaping/#fadeinoutaudioeffect-properties" title="FadeInFunction in context on the volume, tone and time page" aria-label="FadeInFunction in context on the volume, tone and time page">→</a></h3>

`BaseShapingFunction` · Turns how far the fade in has come, 0 to 1, into the gain. `null` sets the default straight line.

<h3 id="fadeoutdurationms"><span class="prop"><code>FadeOutDurationMs</code></span> <a class="ctx" href="/docs/audio-shaping/#fadeinoutaudioeffect-properties" title="FadeOutDurationMs in context on the volume, tone and time page" aria-label="FadeOutDurationMs in context on the volume, tone and time page">→</a></h3>

`float` · How long each clip fades out before its end, at most half the clip. Negative values are taken as 0. 0 by default: no fade out.

<h3 id="fadeoutfunction"><span class="prop"><code>FadeOutFunction</code></span> <a class="ctx" href="/docs/audio-shaping/#fadeinoutaudioeffect-properties" title="FadeOutFunction in context on the volume, tone and time page" aria-label="FadeOutFunction in context on the volume, tone and time page">→</a></h3>

`BaseShapingFunction` · The same for the fade out, which runs it from 1 back to 0. `null` sets the default straight line.

<h3 id="fadingstate"><span class="prop"><code>FadingState</code></span> <a class="ctx" href="/docs/audio-shaping/#fadeinoutaudioeffect-properties" title="FadingState in context on the volume, tone and time page" aria-label="FadingState in context on the volume, tone and time page">→</a></h3>

<a class="ref" href="/docs/audio-glossary/types/fading-states/">`FadingStates`</a> · Read-only. Whether the last block of sound was fading in, fading out, or neither.
