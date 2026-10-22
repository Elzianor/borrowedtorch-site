---
layout: docs
title: "Audio glossary: effects"
description: "Every audio effect with its properties and methods, one page per effect."
---

Each effect has a page listing its own properties and methods in alphabetical order, each with its type or signature and what it does. An effect also has every member of the base effect, so start with [the base effect](/docs/audio-glossary/effects/base-audio-effect/), which every effect derives from. The sidebar lists the members of each effect under its name.

| Effect | What it is |
| --- | --- |
| [Base effect](/docs/audio-glossary/effects/base-audio-effect/) | <a class="ref" href="/docs/audio-glossary/effects/base-audio-effect/">`BaseAudioEffect`</a> is the abstract base of every effect, the send and the return of a chain included. |
| [`DelayAudioEffect`](/docs/audio-glossary/effects/delay-audio-effect/) | An echo: the sound again after a delay, with feedback for more echoes. |
| [`DistanceAudioEffect`](/docs/audio-glossary/effects/distance-audio-effect/) | Lowers the volume and closes a low-pass filter as the emitter moves away from the listener. |
| [`DopplerAudioEffect`](/docs/audio-glossary/effects/doppler-audio-effect/) | Bends the pitch by the speeds of the listener and the emitter along the line between them. |
| [`EmitterReturnEffect`](/docs/audio-glossary/effects/emitter-return-effect/) | The end of every emitter's chain: what reaches it goes to the mix. |
| [`EmitterSendEffect`](/docs/audio-glossary/effects/emitter-send-effect/) | The start of every emitter's chain: the samples of the current clip. |
| [`FadeInOutAudioEffect`](/docs/audio-glossary/effects/fade-in-out-audio-effect/) | Fades each clip in at its start and out before its end. |
| [`PitchAudioEffect`](/docs/audio-glossary/effects/pitch-audio-effect/) | Raises or lowers the pitch by a factor, without changing how long the sound lasts. |
| [`ReverbAudioEffect`](/docs/audio-glossary/effects/reverb-audio-effect/) | Sends part of the sound to the shared reverb bus. |
| [`SpatialAudioEffect`](/docs/audio-glossary/effects/spatial-audio-effect/) | Makes the sound come from the emitter's direction around the listener, with an HRTF. |
| [`ThreeBandEqualizerAudioEffect`](/docs/audio-glossary/effects/three-band-equalizer-audio-effect/) | A three-band equaliser: a low shelf, a middle peak and a high shelf. |
| [`TimePositionAudioEffect`](/docs/audio-glossary/effects/time-position-audio-effect/) | Reads and moves the playing position of the current clip. |
| [`VolumeAudioEffect`](/docs/audio-glossary/effects/volume-audio-effect/) | Multiplies the sound by a gain kept within a range. |
