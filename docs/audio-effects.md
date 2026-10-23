---
layout: docs
legend: [prop, method]
title: "Audio: effect chains"
description: Wiring effects between an emitter's send and return, bypassing and removing them, and the order of effects.
---

Every emitter runs its clip through a chain of effects before it reaches the mix. You add effects to the emitter, then
connect them in a line from its send to its return. Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## The send and the return

An emitter has two fixed ends. <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#effectloopsend">`EffectLoopSend`</a> gives the samples of the current clip, already in the mix format.
<a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#effectloopreturn">`EffectLoopReturn`</a> takes what the chain made of them and hands it to the mix. A new emitter has its send connected
straight to its return, so it plays its clips as they are.

<figure class="shot">
  <img src="{{ '/assets/img/audio/effect-chain.svg' | relative_url }}" width="640" height="150" alt="A clip feeds the emitter's send, then a distance, a reverb and a spatial effect in a line, then the return, which feeds the mix; the reverb also sends to the reverb bus">
  <figcaption>The chain of the campfire on the quick start page.</figcaption>
</figure>

Each effect has one <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#input">`Input`</a> and one <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#output">`Output`</a>, so a chain is always a single line: an effect can't feed two others, and
two effects can't feed one. The reverb effect is the one exception that reaches outside the line: it also sends part
of its sound to the shared [reverb bus](/docs/audio-mixing/#the-reverb-bus).

## Wiring a chain

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudioeffect">`TryAddAudioEffect`</a> creates an effect of a type and gives it back as a <a class="ref" href="/docs/audio-glossary/effects/base-audio-effect/">`BaseAudioEffect`</a>; cast it to its own class to
reach its settings. A new effect is not connected to anything. Connect it by setting <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#input">`Input`</a>, the effect it takes its
sound from:

```csharp
emitter.TryAddAudioEffect(AudioEffectTypes.Equalizer, out var eq);
emitter.TryAddAudioEffect(AudioEffectTypes.Volume, out var volume);

var equalizer = (ThreeBandEqualizerAudioEffect)eq;
equalizer.LowGainDb = 6;

// send -> eq -> volume -> return
eq.Input = emitter.EffectLoopSend;
volume.Input = eq;
emitter.EffectLoopReturn.Input = volume;
```

<a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#output">`Output`</a> is the same link seen from the other side: `a.Output = b` does what `b.Input = a` does. Connecting takes an
effect away from where it was: when `b` had another input, that input loses its output, and when `a` had another
output, that output loses its input.

The order of the three lines above doesn't matter for an emitter that isn't playing. For one that is, see below.

## A broken chain

While the line from the send doesn't reach the return, the emitter can't play. It stops, its <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#state">`State`</a> becomes
`EffectLoopDisconnected`, and <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a>, <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause`</a> and <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop`</a> do nothing until the line is whole again. Then the state goes
back to `Idle`.

Every step that leaves the line open counts, even for a moment. Rewiring a playing emitter one link at a time breaks the
line on the first link and stops the emitter, so wire the chain before playing, or call <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> again once it is whole:

```csharp
// insert a pitch effect between the send and the first effect, while playing
emitter.TryAddAudioEffect(AudioEffectTypes.Pitch, out var pitch);

var first = emitter.EffectLoopSend.Output;
pitch.Input = emitter.EffectLoopSend; // the line is open here: the emitter stops
first.Input = pitch;                  // whole again: Idle
emitter.Play();                       // a clip from the start
```

Rewiring is safe while the mix runs: the audio thread never sees a half-connected chain.

## Bypassing effects

<a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#isbypass">`IsBypass`</a> lets the sound through an effect unchanged, keeping the effect and its settings in the chain. Use it to
switch an effect off and on without rewiring:

```csharp
volume.IsBypass = true;  // as if the volume effect weren't there
volume.IsBypass = false; // back
```

Several effects also skip their work by themselves when their settings leave the sound unchanged: an equalizer band at
0 dB, a pitch of 1, a delay of 0 ms, and Doppler while nothing moves. Don't bypass the send or the return: a bypassed
send gives silence, and a bypassed return keeps playing through a pause.

## Removing effects

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudioeffect">`TryRemoveAudioEffect`</a> takes an effect out of the emitter and disposes it, found by itself or by its <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a>. An effect in
the chain leaves a gap, so connect its neighbors again:

```csharp
var before = volume.Input;
var after = volume.Output;

emitter.TryRemoveAudioEffect(volume); // the chain is broken here
after.Input = before;                 // whole again
```

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#clearaudioeffects">`ClearAudioEffects`</a> disposes every effect and connects the send straight to the return again. Each effect has an <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a>,
new for every effect and every run, which <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#trygetaudioeffect">`TryGetAudioEffect`</a> finds; it also finds the send and the return.

## Kinds of effects

Most effect types can be added any number of times, such as two equalizers in a row. The positional effects and the
time position effect read or steer the emitter as a whole, so an emitter has at most one of each, and
<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudioeffect">`TryAddAudioEffect`</a> returns `false` for a second one.

| Type | Class | One per emitter | Page |
| --- | --- | --- | --- |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#distance">`Distance`</a> | <a class="ref" href="/docs/audio-glossary/effects/distance-audio-effect/">`DistanceAudioEffect`</a> | Yes | [Positional sound](/docs/audio-positional/#distance) |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#doppler">`Doppler`</a> | <a class="ref" href="/docs/audio-glossary/effects/doppler-audio-effect/">`DopplerAudioEffect`</a> | Yes | [Positional sound](/docs/audio-positional/#doppler) |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#spatial">`Spatial`</a> | <a class="ref" href="/docs/audio-glossary/effects/spatial-audio-effect/">`SpatialAudioEffect`</a> | Yes | [Positional sound](/docs/audio-positional/#spatialization) |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#volume">`Volume`</a> | <a class="ref" href="/docs/audio-glossary/effects/volume-audio-effect/">`VolumeAudioEffect`</a> |  | [Volume, tone and time](/docs/audio-shaping/#volume) |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#equalizer">`Equalizer`</a> | <a class="ref" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/">`ThreeBandEqualizerAudioEffect`</a> |  | [Volume, tone and time](/docs/audio-shaping/#equalizer) |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#pitch">`Pitch`</a> | <a class="ref" href="/docs/audio-glossary/effects/pitch-audio-effect/">`PitchAudioEffect`</a> |  | [Volume, tone and time](/docs/audio-shaping/#pitch) |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#delay">`Delay`</a> | <a class="ref" href="/docs/audio-glossary/effects/delay-audio-effect/">`DelayAudioEffect`</a> |  | [Volume, tone and time](/docs/audio-shaping/#delay) |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#fadeinout">`FadeInOut`</a> | <a class="ref" href="/docs/audio-glossary/effects/fade-in-out-audio-effect/">`FadeInOutAudioEffect`</a> |  | [Volume, tone and time](/docs/audio-shaping/#fades) |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#timeposition">`TimePosition`</a> | <a class="ref" href="/docs/audio-glossary/effects/time-position-audio-effect/">`TimePositionAudioEffect`</a> | Yes | [Volume, tone and time](/docs/audio-shaping/#time-position) |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#reverb">`Reverb`</a> | <a class="ref" href="/docs/audio-glossary/effects/reverb-audio-effect/">`ReverbAudioEffect`</a> |  | [Mixing, reverb and output](/docs/audio-mixing/#the-reverb-bus) |

## The order of effects

The chain runs in the order you wire it, and the order changes the sound. A good default for a sound in the world:

```text
send -> fade -> equalizer -> pitch -> Doppler -> distance -> delay
     -> reverb -> spatial -> volume -> return
```

- **Spatial near the end.** The spatial effect turns the sound into what each ear hears. Effects after it treat both
  ears alike, which suits a volume, but an equalizer or a delay belongs before it.
- **Reverb before spatial.** The reverb bus then gets the sound before it is placed, and its tail comes from all around,
  as a room's does.
- **Distance before or after reverb.** After the distance effect, the reverb fades with the sound and keeps the same
  share of it at every distance. Before it, a far sound keeps its full reverb while the dry sound fades, which reads as
  further away, but a sound past its audible distance still sounds in the reverb.
- **Pitch and Doppler together.** Both shift the pitch with the same kind of processing; keep them next to each other.
- **Time position anywhere.** It reads and moves the clip itself, wherever it sits, as long as it is connected.

### BaseAudioEffect properties

<a class="ref" href="/docs/audio-glossary/effects/base-audio-effect/">`BaseAudioEffect`</a> is the base of every effect, the send and the return included.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a> | `Guid` | Read-only. Identifies the effect within its emitter. New for every effect and every run, and empty once the effect is disposed. |
| <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#type">`Type`</a> | <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/">`AudioEffectTypes`</a> | Read-only. What kind of effect it is. |
| <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#input">`Input`</a> | <a class="ref" href="/docs/audio-glossary/effects/base-audio-effect/">`BaseAudioEffect`</a> | The effect this one takes its sound from, `null` when none. Setting it connects the two and takes both away from their old links. |
| <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#output">`Output`</a> | <a class="ref" href="/docs/audio-glossary/effects/base-audio-effect/">`BaseAudioEffect`</a> | The effect this one gives its sound to, `null` when none. `a.Output = b` does what `b.Input = a` does. |
| <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#isbypass">`IsBypass`</a> | `bool` | Lets the sound through unchanged, keeping the effect in the chain. Off by default. |

### BaseAudioEffect methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/audio-glossary/effects/base-audio-effect/#dispose">`Dispose()`</a> | Disconnects the effect and frees it. Remove effects through their emitter instead, which disposes them. |

### EmitterSendEffect and EmitterReturnEffect

The two ends of every chain: <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#effectloopsend">`EffectLoopSend`</a> is an <a class="ref" href="/docs/audio-glossary/effects/emitter-send-effect/">`EmitterSendEffect`</a> and <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#effectloopreturn">`EffectLoopReturn`</a> an <a class="ref" href="/docs/audio-glossary/effects/emitter-return-effect/">`EmitterReturnEffect`</a>.
They have no members of their own beyond those of <a class="ref" href="/docs/audio-glossary/effects/base-audio-effect/">`BaseAudioEffect`</a>, and you can't create or remove them: they live and
die with their emitter. Leave the send's <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#input">`Input`</a> and the return's <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#output">`Output`</a> empty: an effect after the return would be
the end of the line instead of the return, and break the chain.

### IAudioEmitter effect methods

| Method | Description |
| --- | --- |
| <span class="method"><code><a href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudioeffect">TryAddAudioEffect</a>(<a href="/docs/audio-glossary/types/audio-effect-types/">AudioEffectTypes</a> type, out <a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> | Creates an effect of a type, not connected to anything. `false` for <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#effectloopsend">`EffectLoopSend`</a> and <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#effectloopreturn">`EffectLoopReturn`</a>, and for a second `Distance`, `Doppler`, `Spatial` or <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#timeposition">`TimePosition`</a>. |
| <span class="method"><code><a href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudioeffect">TryRemoveAudioEffect</a>(<a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> | Disconnects and disposes an effect of this emitter. An effect in the chain leaves it broken until you connect its neighbors. |
| <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudioeffect">`TryRemoveAudioEffect(Guid effectId)`</a> | The same, for the effect with that <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a>. |
| <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#clearaudioeffects">`ClearAudioEffects()`</a> | Disposes every effect and connects the send straight to the return. |
| <span class="method"><code><a href="/docs/audio-glossary/types/i-audio-emitter/#trygetaudioeffect">TryGetAudioEffect</a>(Guid effectId, out <a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> | Finds an effect of this emitter by its <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a>, the send and the return included. |

### AudioManager effect methods

| Method | Description |
| --- | --- |
| <span class="method"><code><a href="/docs/audio-glossary/types/audio-manager/#tryaddeffecttoemitter">TryAddEffectToEmitter</a>(string emitterName, <a href="/docs/audio-glossary/types/audio-effect-types/">AudioEffectTypes</a> type, out <a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudioeffect">`TryAddAudioEffect`</a> on the emitter of that name. |
| <span class="method"><code><a href="/docs/audio-glossary/types/audio-manager/#tryremoveeffectfromemitter">TryRemoveEffectFromEmitter</a>(string emitterName, <a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudioeffect">`TryRemoveAudioEffect`</a> on the emitter of that name. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryremoveeffectfromemitter">`TryRemoveEffectFromEmitter(string emitterName, Guid effectId)`</a> | The same, by the effect's <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a>. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryclearemittereffects">`TryClearEmitterEffects(string emitterName)`</a> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#clearaudioeffects">`ClearAudioEffects`</a> on the emitter of that name. |
| <span class="method"><code><a href="/docs/audio-glossary/types/audio-manager/#trygeteffectbyid">TryGetEffectById</a>(string emitterName, Guid effectId, out <a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#trygetaudioeffect">`TryGetAudioEffect`</a> on the emitter of that name. |

#### `AudioEffectTypes`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#effectloopsend">`EffectLoopSend`</a> | The start of a chain. Every emitter has one; it can't be added. |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#effectloopreturn">`EffectLoopReturn`</a> | The end of a chain. Every emitter has one; it can't be added. |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#distance">`Distance`</a> | Attenuation and low-pass by distance, see [distance](/docs/audio-positional/#distance). |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#doppler">`Doppler`</a> | Pitch shift by the speeds of the listener and the emitter, see [Doppler](/docs/audio-positional/#doppler). |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#equalizer">`Equalizer`</a> | A three-band equalizer, see [equalizer](/docs/audio-shaping/#equalizer). |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#fadeinout">`FadeInOut`</a> | Fades at the start and the end of each clip, see [fades](/docs/audio-shaping/#fades). |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#pitch">`Pitch`</a> | A pitch shift by a factor, see [pitch](/docs/audio-shaping/#pitch). |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#reverb">`Reverb`</a> | A send to the reverb bus, see [the reverb bus](/docs/audio-mixing/#the-reverb-bus). |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#delay">`Delay`</a> | An echo with feedback, see [delay](/docs/audio-shaping/#delay). |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#spatial">`Spatial`</a> | HRTF spatialization, see [spatialization](/docs/audio-positional/#spatialization). |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#timeposition">`TimePosition`</a> | Reading and setting the position in the clip, see [time position](/docs/audio-shaping/#time-position). |
| <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/#volume">`Volume`</a> | A gain, see [volume](/docs/audio-shaping/#volume). |
