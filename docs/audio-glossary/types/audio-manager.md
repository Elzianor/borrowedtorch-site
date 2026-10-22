---
layout: docs
title: "Glossary: AudioManager"
description: "The members of AudioManager, in alphabetical order."
---

Owns the output device, the mix, the reverb bus and every emitter.

A class. The [quick start guide](/docs/audio/#audiomanager-properties) shows it in context, with code.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="airsoundabsorptioncoefficient"><span class="prop"><code>AirSoundAbsorptionCoefficient</code></span> <a class="ctx" href="/docs/audio-positional/#audiomanager-hrtf-and-environment-properties" title="AirSoundAbsorptionCoefficient in context on the positional sound page" aria-label="AirSoundAbsorptionCoefficient in context on the positional sound page">→</a></h3>

`float` · Static. How much the air absorbs, in dB per metre. 0.005 by default. Distance effects use it when their `LoudnessDb` is set.

<h3 id="emittersversion"><span class="prop"><code>EmittersVersion</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-properties" title="EmittersVersion in context on the emitters page" aria-label="EmittersVersion in context on the emitters page">→</a></h3>

`int` · Read-only. Changes whenever emitters are added, removed or cleared, so cached emitter references can be looked up again.

<h3 id="hearingminimumdb"><span class="prop"><code>HearingMinimumDb</code></span> <a class="ctx" href="/docs/audio-positional/#audiomanager-hrtf-and-environment-properties" title="HearingMinimumDb in context on the positional sound page" aria-label="HearingMinimumDb in context on the positional sound page">→</a></h3>

`float` · Static. The level below which nothing is heard, in dB. 0 by default. Distance effects use it when their `LoudnessDb` is set.

<h3 id="ishrtfdataloaded"><span class="prop"><code>IsHrtfDataLoaded</code></span> <a class="ctx" href="/docs/audio-positional/#audiomanager-hrtf-and-environment-properties" title="IsHrtfDataLoaded in context on the positional sound page" aria-label="IsHrtfDataLoaded in context on the positional sound page">→</a></h3>

`bool` · Read-only. Whether an HRTF data set is loaded. Without one, spatial effects pass sound through.

<h3 id="isinitialized"><span class="prop"><code>IsInitialized</code></span> <a class="ctx" href="/docs/audio/#audiomanager-properties" title="IsInitialized in context on the quick start guide" aria-label="IsInitialized in context on the quick start guide">→</a></h3>

`bool` · Read-only. Whether an output device is open and playing the mix. `false` while the manager picks a new device, and when no device could be opened.

<h3 id="listenerforward"><span class="prop"><code>ListenerForward</code></span> <a class="ctx" href="/docs/audio/#audiomanager-properties" title="ListenerForward in context on the quick start guide" aria-label="ListenerForward in context on the quick start guide">→</a></h3>

`Vector3` · The direction the listener faces, normalised.

<h3 id="listenerposition"><span class="prop"><code>ListenerPosition</code></span> <a class="ctx" href="/docs/audio/#audiomanager-properties" title="ListenerPosition in context on the quick start guide" aria-label="ListenerPosition in context on the quick start guide">→</a></h3>

`Vector3` · The position of the listener in the world. Setting one listener property at a time updates every emitter each time, so prefer <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#setlistenerdata">`SetListenerData`</a>.

<h3 id="listenerright"><span class="prop"><code>ListenerRight</code></span> <a class="ctx" href="/docs/audio/#audiomanager-properties" title="ListenerRight in context on the quick start guide" aria-label="ListenerRight in context on the quick start guide">→</a></h3>

`Vector3` · The listener's right direction, normalised.

<h3 id="listenerup"><span class="prop"><code>ListenerUp</code></span> <a class="ctx" href="/docs/audio/#audiomanager-properties" title="ListenerUp in context on the quick start guide" aria-label="ListenerUp in context on the quick start guide">→</a></h3>

`Vector3` · The listener's up direction, normalised.

<h3 id="mastervolume"><span class="prop"><code>MasterVolume</code></span> <a class="ctx" href="/docs/audio-mixing/#audiomanager-mix-properties" title="MasterVolume in context on the mixing page" aria-label="MasterVolume in context on the mixing page">→</a></h3>

`float` · The gain of the whole mix, from 0 to 1. Set by the constructor, 1 by default.

<h3 id="mhrfilepath"><span class="prop"><code>MhrFilePath</code></span> <a class="ctx" href="/docs/audio-positional/#audiomanager-hrtf-and-environment-properties" title="MhrFilePath in context on the positional sound page" aria-label="MhrFilePath in context on the positional sound page">→</a></h3>

`string` · Read-only. The file the loaded data set came from, `null` when it is the embedded set or none is loaded.

<h3 id="mmdevicename"><span class="prop"><code>MmDeviceName</code></span> <a class="ctx" href="/docs/audio-mixing/#audiomanager-mix-properties" title="MmDeviceName in context on the mixing page" aria-label="MmDeviceName in context on the mixing page">→</a></h3>

`string` · Read-only. The name of the output device, as Windows shows it. `null` while there is none.

<h3 id="reverbbuscutoffhz"><span class="prop"><code>ReverbBusCutoffHz</code></span> <a class="ctx" href="/docs/audio-mixing/#audiomanager-mix-properties" title="ReverbBusCutoffHz in context on the mixing page" aria-label="ReverbBusCutoffHz in context on the mixing page">→</a></h3>

`float` · How bright the reverb tail is, from 20 to 20 000 Hz. Reads 0 until set.

<h3 id="reverbbusroomsize"><span class="prop"><code>ReverbBusRoomSize</code></span> <a class="ctx" href="/docs/audio-mixing/#audiomanager-mix-properties" title="ReverbBusRoomSize in context on the mixing page" aria-label="ReverbBusRoomSize in context on the mixing page">→</a></h3>

`float` · The reverb time of the bus: seconds for the tail to fade by 60 dB, from 0.05 to 6. Reads 0 until set.

<h3 id="reverbbuswet"><span class="prop"><code>ReverbBusWet</code></span> <a class="ctx" href="/docs/audio-mixing/#audiomanager-mix-properties" title="ReverbBusWet in context on the mixing page" aria-label="ReverbBusWet in context on the mixing page">→</a></h3>

`float` · How much of the final mix is reverb, from 0 to 1; the rest is the dry mix. 0 by default.

<h3 id="waveformat"><span class="prop"><code>WaveFormat</code></span> <a class="ctx" href="/docs/audio/#audiomanager-properties" title="WaveFormat in context on the quick start guide" aria-label="WaveFormat in context on the quick start guide">→</a></h3>

`WaveFormat` · Read-only. The format of the mix: 32-bit float, two channels, 48 kHz. Every clip is converted to it.

## Methods

<h3 id="audiomanager"><span class="method"><code>AudioManager()</code></span> <a class="ctx" href="/docs/audio/#audiomanager-methods" title="AudioManager() in context on the quick start guide" aria-label="AudioManager() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#audiomanager">`AudioManager(string mhrFilePath = null, float initialMasterVolume = 1.0f)`</a> · Creates the mix, opens the default output device and loads an HRTF data set: the file at the path, or the embedded set when the path is `null` or can't be read.

<h3 id="clearaudiocache"><span class="method"><code>ClearAudioCache()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="ClearAudioCache() in context on the emitters page" aria-label="ClearAudioCache() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#clearaudiocache">`ClearAudioCache()`</a> · Static. Empties the cache of decoded clips. Emitters keep the clips they hold; the next <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudio">`TryAddAudio`</a> of a file decodes it again.

<h3 id="clearemitters"><span class="method"><code>ClearEmitters()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="ClearEmitters() in context on the emitters page" aria-label="ClearEmitters() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#clearemitters">`ClearEmitters()`</a> · Removes and disposes every emitter.

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/audio/#audiomanager-methods" title="Dispose() in context on the quick start guide" aria-label="Dispose() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#dispose">`Dispose()`</a> · Stops the output and disposes every emitter. Later calls do nothing.

<h3 id="pauseall"><span class="method"><code>PauseAll()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="PauseAll() in context on the emitters page" aria-label="PauseAll() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#pauseall">`PauseAll()`</a> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause`</a> on every emitter, for a pause menu.

<h3 id="playall"><span class="method"><code>PlayAll()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="PlayAll() in context on the emitters page" aria-label="PlayAll() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#playall">`PlayAll()`</a> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> on every emitter.

<h3 id="setlistenerdata"><span class="method"><code>SetListenerData()</code></span> <a class="ctx" href="/docs/audio/#audiomanager-methods" title="SetListenerData() in context on the quick start guide" aria-label="SetListenerData() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#setlistenerdata">`SetListenerData(Vector3 position, Vector3 forward, Vector3 up, Vector3 right)`</a> · Sets the whole listener pose at once, so each spatial effect works out its new direction once instead of once per vector. Call it every frame the listener moves.

<h3 id="stopall"><span class="method"><code>StopAll()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="StopAll() in context on the emitters page" aria-label="StopAll() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#stopall">`StopAll()`</a> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop`</a> on every emitter.

<h3 id="tryaddaudiotoemitter"><span class="method"><code>TryAddAudioToEmitter()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="TryAddAudioToEmitter() in context on the emitters page" aria-label="TryAddAudioToEmitter() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryaddaudiotoemitter">`TryAddAudioToEmitter(string emitterName, string pathToAudio)`</a> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudio">`TryAddAudio`</a> on the emitter of that name.

<h3 id="tryaddeffecttoemitter"><span class="method"><code>TryAddEffectToEmitter()</code></span> <a class="ctx" href="/docs/audio-effects/#audiomanager-effect-methods" title="TryAddEffectToEmitter() in context on the effect chains page" aria-label="TryAddEffectToEmitter() in context on the effect chains page">→</a></h3>

<span class="method"><code><a href="/docs/audio-glossary/types/audio-manager/#tryaddeffecttoemitter">TryAddEffectToEmitter</a>(string emitterName, <a href="/docs/audio-glossary/types/audio-effect-types/">AudioEffectTypes</a> type, out <a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudioeffect">`TryAddAudioEffect`</a> on the emitter of that name.

<h3 id="tryaddemitter"><span class="method"><code>TryAddEmitter()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="TryAddEmitter() in context on the emitters page" aria-label="TryAddEmitter() in context on the emitters page">→</a></h3>

<span class="method"><code><a href="/docs/audio-glossary/types/audio-manager/#tryaddemitter">TryAddEmitter</a>(string name, <a href="/docs/audio-glossary/types/audio-emitter-types/">AudioEmitterTypes</a> type, out <a href="/docs/audio-glossary/types/i-audio-emitter/">IAudioEmitter</a> emitter)</code></span> · Creates an emitter under a name, starting from the current listener pose. `false` for an empty name or one that is taken.

<h3 id="tryclearemitteraudios"><span class="method"><code>TryClearEmitterAudios()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="TryClearEmitterAudios() in context on the emitters page" aria-label="TryClearEmitterAudios() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryclearemitteraudios">`TryClearEmitterAudios(string emitterName)`</a> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#clearaudios">`ClearAudios`</a> on the emitter of that name.

<h3 id="tryclearemittereffects"><span class="method"><code>TryClearEmitterEffects()</code></span> <a class="ctx" href="/docs/audio-effects/#audiomanager-effect-methods" title="TryClearEmitterEffects() in context on the effect chains page" aria-label="TryClearEmitterEffects() in context on the effect chains page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryclearemittereffects">`TryClearEmitterEffects(string emitterName)`</a> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#clearaudioeffects">`ClearAudioEffects`</a> on the emitter of that name.

<h3 id="trygeteffectbyid"><span class="method"><code>TryGetEffectById()</code></span> <a class="ctx" href="/docs/audio-effects/#audiomanager-effect-methods" title="TryGetEffectById() in context on the effect chains page" aria-label="TryGetEffectById() in context on the effect chains page">→</a></h3>

<span class="method"><code><a href="/docs/audio-glossary/types/audio-manager/#trygeteffectbyid">TryGetEffectById</a>(string emitterName, Guid effectId, out <a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#trygetaudioeffect">`TryGetAudioEffect`</a> on the emitter of that name.

<h3 id="trygetemitterbyname"><span class="method"><code>TryGetEmitterByName()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="TryGetEmitterByName() in context on the emitters page" aria-label="TryGetEmitterByName() in context on the emitters page">→</a></h3>

<span class="method"><code><a href="/docs/audio-glossary/types/audio-manager/#trygetemitterbyname">TryGetEmitterByName</a>(string name, out <a href="/docs/audio-glossary/types/i-audio-emitter/">IAudioEmitter</a> emitter)</code></span> · Finds an emitter by its name.

<h3 id="tryloadmhrfile"><span class="method"><code>TryLoadMhrFile()</code></span> <a class="ctx" href="/docs/audio-positional/#audiomanager-hrtf-methods" title="TryLoadMhrFile() in context on the positional sound page" aria-label="TryLoadMhrFile() in context on the positional sound page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryloadmhrfile">`TryLoadMhrFile(string path)`</a> · Loads an HRTF data set for every spatial effect: the file at the path, or the embedded set when the path is `null` or can't be opened. `false` when the file isn't a valid data set; no set is loaded then.

<h3 id="trypauseemitter"><span class="method"><code>TryPauseEmitter()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="TryPauseEmitter() in context on the emitters page" aria-label="TryPauseEmitter() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#trypauseemitter">`TryPauseEmitter(string name)`</a> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause`</a> on the emitter of that name.

<h3 id="tryplayemitter"><span class="method"><code>TryPlayEmitter()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="TryPlayEmitter() in context on the emitters page" aria-label="TryPlayEmitter() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryplayemitter">`TryPlayEmitter(string name)`</a> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> on the emitter of that name.

<h3 id="tryremoveaudiofromemitter"><span class="method"><code>TryRemoveAudioFromEmitter()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="TryRemoveAudioFromEmitter() in context on the emitters page" aria-label="TryRemoveAudioFromEmitter() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryremoveaudiofromemitter">`TryRemoveAudioFromEmitter(string emitterName, string pathToAudio)`</a> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudio">`TryRemoveAudio`</a> on the emitter of that name.

<h3 id="tryremoveeffectfromemitter"><span class="method"><code>TryRemoveEffectFromEmitter()</code></span> <a class="ctx" href="/docs/audio-effects/#audiomanager-effect-methods" title="TryRemoveEffectFromEmitter() in context on the effect chains page" aria-label="TryRemoveEffectFromEmitter() in context on the effect chains page">→</a></h3>

<span class="method"><code><a href="/docs/audio-glossary/types/audio-manager/#tryremoveeffectfromemitter">TryRemoveEffectFromEmitter</a>(string emitterName, <a href="/docs/audio-glossary/effects/base-audio-effect/">BaseAudioEffect</a> effect)</code></span> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudioeffect">`TryRemoveAudioEffect`</a> on the emitter of that name.

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryremoveeffectfromemitter">`TryRemoveEffectFromEmitter(string emitterName, Guid effectId)`</a> · The same, by the effect's <a class="ref prop" href="/docs/audio-glossary/effects/base-audio-effect/#id">`Id`</a>.

<h3 id="tryremoveemitter"><span class="method"><code>TryRemoveEmitter()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="TryRemoveEmitter() in context on the emitters page" aria-label="TryRemoveEmitter() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryremoveemitter">`TryRemoveEmitter(string name)`</a> · Takes an emitter out of the mix and disposes it.

<h3 id="trystopemitter"><span class="method"><code>TryStopEmitter()</code></span> <a class="ctx" href="/docs/audio-emitters/#audiomanager-emitter-methods" title="TryStopEmitter() in context on the emitters page" aria-label="TryStopEmitter() in context on the emitters page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#trystopemitter">`TryStopEmitter(string name)`</a> · <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop`</a> on the emitter of that name.

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/audio/#audiomanager-methods" title="Update() in context on the quick start guide" aria-label="Update() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`Update(float elapsedSeconds)`</a> · Advances every emitter: refreshes its `State`, runs its loop pause and measures its Doppler speeds. Also picks a new output device after a device change. Call it once per frame.

## Events

<h3 id="onmmdevicechanged"><span class="event"><code>OnMmDeviceChanged</code></span> <a class="ctx" href="/docs/audio-mixing/#audiomanager-events" title="OnMmDeviceChanged in context on the mixing page" aria-label="OnMmDeviceChanged in context on the mixing page">→</a></h3>

`()` · The manager has picked the output device again after a change, whether or not it found one. Raised on a thread-pool thread, or through the synchronisation context of the thread that called <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`Update`</a> when it has one, as in a WinForms or WPF tool.
