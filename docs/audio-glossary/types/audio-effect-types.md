---
layout: docs
title: "Glossary: AudioEffectTypes"
description: "The values of AudioEffectTypes."
---

The kinds of effects, given to <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudioeffect">`IAudioEmitter.TryAddAudioEffect`</a>.

An enum. The [effect chains page](/docs/audio-effects/#audioeffecttypes) shows it in context.

## Values

<h3 id="effectloopsend"><code>EffectLoopSend</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="EffectLoopSend in context on the effect chains page" aria-label="EffectLoopSend in context on the effect chains page">→</a></h3>

The start of a chain. Every emitter has one; it can't be added.

<h3 id="effectloopreturn"><code>EffectLoopReturn</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="EffectLoopReturn in context on the effect chains page" aria-label="EffectLoopReturn in context on the effect chains page">→</a></h3>

The end of a chain. Every emitter has one; it can't be added.

<h3 id="distance"><code>Distance</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="Distance in context on the effect chains page" aria-label="Distance in context on the effect chains page">→</a></h3>

Attenuation and low-pass by distance, see [distance](/docs/audio-positional/#distance).

<h3 id="doppler"><code>Doppler</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="Doppler in context on the effect chains page" aria-label="Doppler in context on the effect chains page">→</a></h3>

Pitch shift by the speeds of the listener and the emitter, see [Doppler](/docs/audio-positional/#doppler).

<h3 id="equalizer"><code>Equalizer</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="Equalizer in context on the effect chains page" aria-label="Equalizer in context on the effect chains page">→</a></h3>

A three-band equaliser, see [equaliser](/docs/audio-shaping/#equaliser).

<h3 id="fadeinout"><code>FadeInOut</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="FadeInOut in context on the effect chains page" aria-label="FadeInOut in context on the effect chains page">→</a></h3>

Fades at the start and the end of each clip, see [fades](/docs/audio-shaping/#fades).

<h3 id="pitch"><code>Pitch</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="Pitch in context on the effect chains page" aria-label="Pitch in context on the effect chains page">→</a></h3>

A pitch shift by a factor, see [pitch](/docs/audio-shaping/#pitch).

<h3 id="reverb"><code>Reverb</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="Reverb in context on the effect chains page" aria-label="Reverb in context on the effect chains page">→</a></h3>

A send to the reverb bus, see [the reverb bus](/docs/audio-mixing/#the-reverb-bus).

<h3 id="delay"><code>Delay</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="Delay in context on the effect chains page" aria-label="Delay in context on the effect chains page">→</a></h3>

An echo with feedback, see [delay](/docs/audio-shaping/#delay).

<h3 id="spatial"><code>Spatial</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="Spatial in context on the effect chains page" aria-label="Spatial in context on the effect chains page">→</a></h3>

HRTF spatialisation, see [spatialisation](/docs/audio-positional/#spatialisation).

<h3 id="timeposition"><code>TimePosition</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="TimePosition in context on the effect chains page" aria-label="TimePosition in context on the effect chains page">→</a></h3>

Reading and setting the position in the clip, see [time position](/docs/audio-shaping/#time-position).

<h3 id="volume"><code>Volume</code> <a class="ctx" href="/docs/audio-effects/#audioeffecttypes" title="Volume in context on the effect chains page" aria-label="Volume in context on the effect chains page">→</a></h3>

A gain, see [volume](/docs/audio-shaping/#volume).
