---
layout: docs
legend: [prop, method, event]
title: "Glossary: IAudioEmitter"
description: "The members of IAudioEmitter, in alphabetical order."
---

A sound source in the world: a position, a list of clips and a chain of effects.

An interface. The [emitters page](/docs/audio-emitters/#iaudioemitter-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="currentaudiopath"><span class="prop"><code>CurrentAudioPath</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="CurrentAudioPath in context on the emitters page" aria-label="CurrentAudioPath in context on the emitters page">→</a></h3>

`string` · Read-only. The path of the clip the emitter holds, empty when it holds none.

<h3 id="effectloopreturn"><span class="prop"><code>EffectLoopReturn</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="EffectLoopReturn in context on the emitters page" aria-label="EffectLoopReturn in context on the emitters page">→</a></h3>

<a class="ref" href="/docs/audio-glossary/effects/emitter-return-effect/">`EmitterReturnEffect`</a> · Read-only. Where the effect chain ends: what goes to the mix.

<h3 id="effectloopsend"><span class="prop"><code>EffectLoopSend</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="EffectLoopSend in context on the emitters page" aria-label="EffectLoopSend in context on the emitters page">→</a></h3>

<a class="ref" href="/docs/audio-glossary/effects/emitter-send-effect/">`EmitterSendEffect`</a> · Read-only. Where the effect chain starts: the samples of the clip. See [effect chains](/docs/audio-effects/).

<h3 id="islooped"><span class="prop"><code>IsLooped</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="IsLooped in context on the emitters page" aria-label="IsLooped in context on the emitters page">→</a></h3>

`bool` · Whether a new random clip starts when one ends. Off by default.

<h3 id="looppauserangems"><span class="prop"><code>LoopPauseRangeMs</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="LoopPauseRangeMs in context on the emitters page" aria-label="LoopPauseRangeMs in context on the emitters page">→</a></h3>

`(int min, int max)` · The shortest and longest silence between loops, in milliseconds. Negative values are taken as 0, and the two ends are put in order. `(0, 0)` by default.

<h3 id="name"><span class="prop"><code>Name</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="Name in context on the emitters page" aria-label="Name in context on the emitters page">→</a></h3>

`string` · Read-only. The name the emitter was created under, unique in its manager.

<h3 id="position"><span class="prop"><code>Position</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="Position in context on the emitters page" aria-label="Position in context on the emitters page">→</a></h3>

`Vector3` · The emitter's position in the world. Its positional effects follow it at once.

<h3 id="state"><span class="prop"><code>State</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="State in context on the emitters page" aria-label="State in context on the emitters page">→</a></h3>

<a class="ref" href="/docs/audio-glossary/types/audio-emitter-playing-states/">`AudioEmitterPlayingStates`</a> · Read-only. Where the emitter is: idle, playing, paused, finished, or stopped by a broken chain. Refreshed by <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a>.

<h3 id="timeduration"><span class="prop"><code>TimeDuration</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="TimeDuration in context on the emitters page" aria-label="TimeDuration in context on the emitters page">→</a></h3>

`TimeSpan` · Read-only. The length of the current clip, zero without one.

<h3 id="timeposition"><span class="prop"><code>TimePosition</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="TimePosition in context on the emitters page" aria-label="TimePosition in context on the emitters page">→</a></h3>

`TimeSpan` · Read-only. How far the current clip has played. A [time position effect](/docs/audio-shaping/#time-position) can also set it.

<h3 id="type"><span class="prop"><code>Type</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-properties" title="Type in context on the emitters page" aria-label="Type in context on the emitters page">→</a></h3>

<a class="ref" href="/docs/audio-glossary/types/audio-emitter-types/">`AudioEmitterTypes`</a> · Read-only. `Cached` or `Streaming`.

## Methods

<h3 id="clearaudioeffects"><span class="method"><code>ClearAudioEffects()</code></span> <a class="ctx" href="/docs/audio-effects/#iaudioemitter-effect-methods" title="ClearAudioEffects() in context on the effect chains page" aria-label="ClearAudioEffects() in context on the effect chains page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#clearaudioeffects">`ClearAudioEffects()`</a> · Disposes every effect and connects the send straight to the return.

<h3 id="clearaudios"><span class="method"><code>ClearAudios()</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-methods" title="ClearAudios() in context on the emitters page" aria-label="ClearAudios() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#clearaudios">`ClearAudios()`</a> · Stops the emitter and takes every clip out.

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-methods" title="Dispose() in context on the emitters page" aria-label="Dispose() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#dispose">`Dispose()`</a> · Stops the emitter and disposes its clips and effects. Remove emitters through the manager instead, which disposes them.

<h3 id="pause"><span class="method"><code>Pause()</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-methods" title="Pause() in context on the emitters page" aria-label="Pause() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause()`</a> · Holds a playing clip where it is.

<h3 id="play"><span class="method"><code>Play()</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-methods" title="Play() in context on the emitters page" aria-label="Play() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play()`</a> · Starts a random clip when stopped or finished, resumes when paused. Cuts short a loop pause.

<h3 id="stop"><span class="method"><code>Stop()</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-methods" title="Stop() in context on the emitters page" aria-label="Stop() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop()`</a> · Ends the clip and forgets it, cancels a loop pause and clears the echoes of delay effects.

<h3 id="tryaddaudio"><span class="method"><code>TryAddAudio()</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-methods" title="TryAddAudio() in context on the emitters page" aria-label="TryAddAudio() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudio">`TryAddAudio(string path)`</a> · Adds a WAV or Ogg Vorbis clip. A cached emitter decodes it now. `false` for an empty path, a file the emitter has already, or one that can't be opened or decoded.

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | The WAV or Ogg Vorbis file to add. The emitter knows the clip by this path. |

<h3 id="tryaddaudioeffect"><span class="method"><code>TryAddAudioEffect()</code></span> <a class="ctx" href="/docs/audio-effects/#iaudioemitter-effect-methods" title="TryAddAudioEffect() in context on the effect chains page" aria-label="TryAddAudioEffect() in context on the effect chains page">→</a></h3>

<span class="method"><code><a href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudioeffect">TryAddAudioEffect</a>(<a href="/docs/audio-glossary/types/audio-effect-types/">AudioEffectTypes</a> type, out <a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> · Creates an effect of a type, not connected to anything. `false` for <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#effectloopsend">`EffectLoopSend`</a> and <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#effectloopreturn">`EffectLoopReturn`</a>, and for a second `Distance`, `Doppler`, `Spatial` or <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#timeposition">`TimePosition`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | <a class="ref" href="/docs/audio-glossary/types/audio-effect-types/">`AudioEffectTypes`</a> | The kind of effect to create. |
| `effect` | <code>out&nbsp;<a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a></code> | The new effect, or `null` when the method returns `false`. |

<h3 id="trygetaudioeffect"><span class="method"><code>TryGetAudioEffect()</code></span> <a class="ctx" href="/docs/audio-effects/#iaudioemitter-effect-methods" title="TryGetAudioEffect() in context on the effect chains page" aria-label="TryGetAudioEffect() in context on the effect chains page">→</a></h3>

<span class="method"><code><a href="/docs/audio-glossary/types/i-audio-emitter/#trygetaudioeffect">TryGetAudioEffect</a>(Guid effectId, out <a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> · Finds an effect of this emitter by its <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a>, the send and the return included.

| Parameter | Type | Description |
| --- | --- | --- |
| `effectId` | `Guid` | The <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a> of the effect. |
| `effect` | <code>out&nbsp;<a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a></code> | The effect, or `null` when the emitter has none with that `Id`. |

<h3 id="tryremoveaudio"><span class="method"><code>TryRemoveAudio()</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-methods" title="TryRemoveAudio() in context on the emitters page" aria-label="TryRemoveAudio() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudio">`TryRemoveAudio(string path)`</a> · Takes a clip out and disposes it. When it is the clip playing, another random clip starts. `false` when the emitter doesn't have it.

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | The path the clip was added with. |

<h3 id="tryremoveaudioeffect"><span class="method"><code>TryRemoveAudioEffect()</code></span> <a class="ctx" href="/docs/audio-effects/#iaudioemitter-effect-methods" title="TryRemoveAudioEffect() in context on the effect chains page" aria-label="TryRemoveAudioEffect() in context on the effect chains page">→</a></h3>

<span class="method"><code><a href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudioeffect">TryRemoveAudioEffect</a>(<a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> · Disconnects and disposes an effect of this emitter. An effect in the chain leaves it broken until you connect its neighbors.

| Parameter | Type | Description |
| --- | --- | --- |
| `effect` | <a class="ref" href="/docs/audio-glossary/effects/base-audio-effect/">`BaseAudioEffect`</a> | The effect to remove, one of this emitter's. |

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudioeffect">`TryRemoveAudioEffect(Guid effectId)`</a> · The same, for the effect with that <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `effectId` | `Guid` | The <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a> of the effect to remove. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-methods" title="Update() in context on the emitters page" aria-label="Update() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#update">`Update(float elapsedSeconds)`</a> · Refreshes the state, runs the loop pause and measures Doppler speeds. <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a> calls it for every emitter; don't call it yourself as well.

| Parameter | Type | Description |
| --- | --- | --- |
| `elapsedSeconds` | `float` | The time since the last call, in seconds, which times the loop pause and the Doppler speeds. |

## Events

<h3 id="oncurrentaudiochanged"><span class="event"><code>OnCurrentAudioChanged</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-events" title="OnCurrentAudioChanged in context on the emitters page" aria-label="OnCurrentAudioChanged in context on the emitters page">→</a></h3>

<code>(<a href="/docs/audio-glossary/types/i-audio-emitter/">IAudioEmitter</a> sender)</code> · The emitter takes a clip or lets one go: on play, at every loop, on stop, and when the clip playing is removed.

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/audio-glossary/types/i-audio-emitter/">`IAudioEmitter`</a> | The emitter that raised the event. |

<h3 id="onstatechanged"><span class="event"><code>OnStateChanged</code></span> <a class="ctx" href="/docs/audio-emitters/#iaudioemitter-events" title="OnStateChanged in context on the emitters page" aria-label="OnStateChanged in context on the emitters page">→</a></h3>

<code>(<a href="/docs/audio-glossary/types/i-audio-emitter/">IAudioEmitter</a> sender)</code> · <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#state">`State`</a> changes. From <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a> on the game thread, or from the thread that rewires the chain.

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/audio-glossary/types/i-audio-emitter/">`IAudioEmitter`</a> | The emitter that raised the event. |
