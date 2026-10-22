---
layout: docs
legend: [prop]
title: "Glossary: DistanceAudioEffect"
description: "The properties of DistanceAudioEffect, in alphabetical order."
---

Lowers the volume and closes a low-pass filter as the emitter moves away from the listener.

`DistanceAudioEffect` derives from [`BaseAudioEffect`](/docs/audio-glossary/effects/base-audio-effect/) and has its members too. The [positional sound page](/docs/audio-positional/#distance) shows it in context, with code.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="demoemitterposition"><span class="prop"><code>DemoEmitterPosition</code></span> <a class="ctx" href="/docs/audio-positional/#distanceaudioeffect-properties" title="DemoEmitterPosition in context on the positional sound page" aria-label="DemoEmitterPosition in context on the positional sound page">→</a></h3>

`Vector3` · Where the sound is in demo mode, around a listener at the origin.

<h3 id="distancecutoffattenuationfunction"><span class="prop"><code>DistanceCutoffAttenuationFunction</code></span> <a class="ctx" href="/docs/audio-positional/#distanceaudioeffect-properties" title="DistanceCutoffAttenuationFunction in context on the positional sound page" aria-label="DistanceCutoffAttenuationFunction in context on the positional sound page">→</a></h3>

`BaseShapingFunction` · Turns how close the emitter is into the low-pass cutoff, from <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distanceminimumcutoffhz">`DistanceMinimumCutoffHz`</a> at 0 to <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distancemaximumcutoffhz">`DistanceMaximumCutoffHz`</a> at 1. `null` sets the default straight line.

<h3 id="distancemaximumcutoffhz"><span class="prop"><code>DistanceMaximumCutoffHz</code></span> <a class="ctx" href="/docs/audio-positional/#distanceaudioeffect-properties" title="DistanceMaximumCutoffHz in context on the positional sound page" aria-label="DistanceMaximumCutoffHz in context on the positional sound page">→</a></h3>

`float` · The cutoff at the listener, from 0 to 20 000 Hz. 20 000 Hz by default, which leaves a close sound open. Setting it below the minimum lowers the minimum too.

<h3 id="distanceminimumcutoffhz"><span class="prop"><code>DistanceMinimumCutoffHz</code></span> <a class="ctx" href="/docs/audio-positional/#distanceaudioeffect-properties" title="DistanceMinimumCutoffHz in context on the positional sound page" aria-label="DistanceMinimumCutoffHz in context on the positional sound page">→</a></h3>

`float` · The cutoff at the audible distance, from 0 to 20 000 Hz. 100 Hz by default. Setting it above the maximum raises the maximum too.

<h3 id="distancevolumeattenuationfunction"><span class="prop"><code>DistanceVolumeAttenuationFunction</code></span> <a class="ctx" href="/docs/audio-positional/#distanceaudioeffect-properties" title="DistanceVolumeAttenuationFunction in context on the positional sound page" aria-label="DistanceVolumeAttenuationFunction in context on the positional sound page">→</a></h3>

`BaseShapingFunction` · Turns how close the emitter is, 1 at the listener to 0 at the audible distance, into the gain. `null` sets the default straight line.

<h3 id="isdemomode"><span class="prop"><code>IsDemoMode</code></span> <a class="ctx" href="/docs/audio-positional/#distanceaudioeffect-properties" title="IsDemoMode in context on the positional sound page" aria-label="IsDemoMode in context on the positional sound page">→</a></h3>

`bool` · Measures the distance from <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#demoemitterposition">`DemoEmitterPosition`</a> to the origin instead of from the emitter to the listener. See [demo mode](#demo-mode).

<h3 id="loudnessdb"><span class="prop"><code>LoudnessDb</code></span> <a class="ctx" href="/docs/audio-positional/#distanceaudioeffect-properties" title="LoudnessDb in context on the positional sound page" aria-label="LoudnessDb in context on the positional sound page">→</a></h3>

`float` · The level of the sound one metre away, in dB. Sets <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#maxaudibledistancemeters">`MaxAudibleDistanceMeters`</a>. Negative values are taken as 0. 0 by default, so the sound is silent past one metre until you set it.

<h3 id="maxaudibledistancemeters"><span class="prop"><code>MaxAudibleDistanceMeters</code></span> <a class="ctx" href="/docs/audio-positional/#distanceaudioeffect-properties" title="MaxAudibleDistanceMeters in context on the positional sound page" aria-label="MaxAudibleDistanceMeters in context on the positional sound page">→</a></h3>

`float` · Read-only. How far the sound carries: where its level falls to <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#hearingminimumdb">`HearingMinimumDb`</a>, with the air absorption. Worked out when <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#loudnessdb">`LoudnessDb`</a> is set.
