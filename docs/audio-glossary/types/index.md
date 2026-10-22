---
layout: docs
legend: [method, event]
title: "Audio glossary: types"
description: "Every other type of the audio library: classes, interfaces, enums and delegates, one page per type."
---

Every public type of the audio library that isn't an effect has a page with its members: the values of an enum, the properties, methods and events of a class or an interface, the signature of a delegate.

## Classes

| Type | What it is |
| --- | --- |
| [`AudioManager`](/docs/audio-glossary/types/audio-manager/) | Owns the output device, the mix, the reverb bus and every emitter. |
| [`MmNotificationClient`](/docs/audio-glossary/types/mm-notification-client/) | Forwards the Windows notifications about output devices to callbacks; the manager follows the default device with one. |

## Interfaces

| Type | What it is |
| --- | --- |
| [`IAudioEmitter`](/docs/audio-glossary/types/i-audio-emitter/) | A sound source in the world: a position, a list of clips and a chain of effects. |

## Enums

| Type | What it is |
| --- | --- |
| [`AudioEffectTypes`](/docs/audio-glossary/types/audio-effect-types/) | The kinds of effects, given to <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudioeffect">`IAudioEmitter.TryAddAudioEffect`</a>. |
| [`AudioEmitterPlayingStates`](/docs/audio-glossary/types/audio-emitter-playing-states/) | Where an emitter is: idle, playing, paused, finished, or stopped by a broken chain. |
| [`AudioEmitterTypes`](/docs/audio-glossary/types/audio-emitter-types/) | Whether an emitter's clips are cached in memory or streamed from disk. |
| [`FadingStates`](/docs/audio-glossary/types/fading-states/) | Which part of a fade a clip is in. |
| [`PlayingStates`](/docs/audio-glossary/types/playing-states/) | The state of a clip on the audio thread. No public member returns it. |

## Delegates

| Type | What it is |
| --- | --- |
| [`AudioManager.MmDeviceChanged`](/docs/audio-glossary/types/audio-manager-mm-device-changed/) | The handler of <a class="ref event" href="/docs/audio-glossary/types/audio-manager/#onmmdevicechanged">`AudioManager.OnMmDeviceChanged`</a>. |
| [`IAudioEmitter.CurrentAudioChanged`](/docs/audio-glossary/types/i-audio-emitter-current-audio-changed/) | The handler of <a class="ref event" href="/docs/audio-glossary/types/i-audio-emitter/#oncurrentaudiochanged">`IAudioEmitter.OnCurrentAudioChanged`</a>. |
| [`IAudioEmitter.StateChanged`](/docs/audio-glossary/types/i-audio-emitter-state-changed/) | The handler of <a class="ref event" href="/docs/audio-glossary/types/i-audio-emitter/#onstatechanged">`IAudioEmitter.OnStateChanged`</a>. |
