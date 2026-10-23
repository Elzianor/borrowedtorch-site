---
layout: docs
legend: [prop]
title: "Glossary: ReverbAudioEffect"
description: "The properties of ReverbAudioEffect, in alphabetical order."
---

Sends part of the sound to the shared reverb bus.

`ReverbAudioEffect` derives from [`BaseAudioEffect`](/docs/audio-glossary/effects/base-audio-effect/) and has its members too. The [mixing page](/docs/audio-mixing/#the-reverb-bus) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="reverbsend"><span class="prop"><code>ReverbSend</code></span> <a class="ctx" href="/docs/audio-mixing/#reverbaudioeffect-properties" title="ReverbSend in context on the mixing page" aria-label="ReverbSend in context on the mixing page">→</a></h3>

`float` · How much of the sound goes to the reverb bus, from 0 to 1. The rest goes on down the chain. 0 by default.
