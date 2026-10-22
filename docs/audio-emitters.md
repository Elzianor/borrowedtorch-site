---
layout: docs
title: "Audio: emitters"
description: Cached and streaming emitters, clips and file formats, playing, looping, states and events.
---

An emitter is a sound source in the world: a position, a list of clips and a chain of effects. Every emitter belongs to
the manager that created it and has a name that is unique in it. Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Creating emitters

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryaddemitter">`TryAddEmitter`</a> creates an emitter under a name and gives it back. It returns `false` for an empty name or a name that
is taken. The new emitter plays its clips straight to the mix, with no effects, until you
[wire a chain](/docs/audio-effects/#wiring-a-chain).

```csharp
if (!audio.TryAddEmitter("door", AudioEmitterTypes.Cached, out var door))
    return; // the name is taken

door.Position = new Vector3(3, 0, -6);
door.TryAddAudio("Content/Audio/door-open.wav");
door.Play();

// later, from anywhere that knows the name
if (audio.TryGetEmitterByName("door", out var found)) found.Play();

// done with it: stops it and disposes its clips and effects
audio.TryRemoveEmitter("door");
```

<a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#emittersversion">`EmittersVersion`</a> changes whenever an emitter is added or removed, so code that keeps emitter references, such as an
ECS component, can tell when to look them up again.

## Cached and streaming

The type of an emitter decides where its samples come from:

- **Cached.** <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudio">`TryAddAudio`</a> decodes the whole clip at once, converts it to the mix format and keeps it in memory. Use it
  for short sounds that play often, such as footsteps, shots and UI clicks. Starting a cached clip costs nothing.
- **Streaming.** The clip stays on disk and is decoded while it plays. Use it for music and long ambiences.

Decoded clips go into one cache shared by the whole process and keyed by path, so every cached emitter, in any manager,
that adds the same file shares one copy and only the first one decodes it. Decoding happens on the thread that calls
<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudio">`TryAddAudio`</a>, so add long cached clips while loading, not in the middle of play. <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#clearaudiocache">`AudioManager.ClearAudioCache()`</a>
empties the cache: emitters keep the clips they already hold, and the next <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudio">`TryAddAudio`</a> of a file decodes it again.

## Clips

An emitter holds any number of clips. Each time it starts, from a stop, after it finished or at the start of a new loop,
it picks one of them at random, so a footstep emitter with five variations doesn't repeat one sound over and over.

```csharp
audio.TryAddEmitter("footsteps", AudioEmitterTypes.Cached, out var steps);

for (var i = 1; i <= 5; i++) steps.TryAddAudio($"Content/Audio/step-{i}.wav");

steps.Play(); // one of the five
```

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudio">`TryAddAudio`</a> returns `false`, without throwing, when the path is empty, the emitter already has the file, or the file
can't be opened or decoded. <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudio">`TryRemoveAudio`</a> takes a clip out; when it is the clip playing, the emitter picks another
one and goes on. <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#clearaudios">`ClearAudios`</a> stops the emitter and takes them all out.

Supported files:

| Format | What is read |
| --- | --- |
| WAV | 8, 16, 24 and 32-bit PCM, and 32-bit float |
| Ogg Vorbis | Any Vorbis stream |

Clips can be mono or stereo, at any sample rate: mono is spread to both channels and other rates are resampled to
48 kHz. A clip with more channels is refused by a cached emitter and plays as silence on a streaming one. The format
comes from the file's header, not its extension.

## Playing

<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a>, <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause`</a> and <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop`</a> control one emitter:

- **<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a>** starts a random clip from the beginning when the emitter is stopped or finished, and resumes it when it is
  paused. It also cuts short a [loop pause](#looping).
- **<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause`</a>** holds the clip where it is. The emitter keeps its place in the mix and sends silence.
- **<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop`</a>** ends the clip, forgets it and cancels a loop pause. The next <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> picks a clip again. A delay effect's
  echoes stop with it.

<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#playall">`PlayAll`</a>, <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#pauseall">`PauseAll`</a> and <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#stopall">`StopAll`</a> on the manager do the same for every emitter, and <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryplayemitter">`TryPlayEmitter`</a>,
<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#trypauseemitter">`TryPauseEmitter`</a> and <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#trystopemitter">`TryStopEmitter`</a> for one emitter by name.

All three do nothing while the emitter's [chain is broken](/docs/audio-effects/#a-broken-chain).

## States and events

<a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#state">`State`</a> tells where the emitter is:

```csharp
steps.OnStateChanged += emitter =>
{
    if (emitter.State == AudioEmitterPlayingStates.Finished)
        Console.WriteLine($"{emitter.Name} played {emitter.CurrentAudioPath}");
};
```

The audio thread notices the end of a clip, but the emitter only takes the new state in <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a>, on the
game thread. So <a class="ref event" href="/docs/audio-glossary/types/i-audio-emitter/#onstatechanged">`OnStateChanged`</a> is raised from <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`Update`</a>, and right after <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> the state still reads what it was until
the next update. Rewiring the effect chain changes the state at once, on the thread that rewires.

<a class="ref event" href="/docs/audio-glossary/types/i-audio-emitter/#oncurrentaudiochanged">`OnCurrentAudioChanged`</a> is raised whenever the emitter takes a clip or lets one go: on <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> from a stop, at every new
loop, on <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop`</a> and when the clip playing is removed. <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#currentaudiopath">`CurrentAudioPath`</a> then tells which clip it is, and is empty when
there is none. <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#timeduration">`TimeDuration`</a> and <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#timeposition">`TimePosition`</a> give the length of the current clip and how far it has played.

## Looping

A looped emitter starts a new random clip each time one ends. <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#looppauserangems">`LoopPauseRangeMs`</a> adds a silence between them: a random
length between its two ends, in milliseconds, drawn anew for every pause. `(0, 0)`, the default, starts the next clip
right away.

```csharp
audio.TryAddEmitter("owl", AudioEmitterTypes.Cached, out var owl);
owl.TryAddAudio("Content/Audio/owl-1.ogg");
owl.TryAddAudio("Content/Audio/owl-2.ogg");
owl.Position = new Vector3(-20, 8, -35);
owl.IsLooped = true;
owl.LoopPauseRangeMs = (4000, 12000); // a call every 4 to 12 seconds
owl.Play();
```

The end of a clip is handled in <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a>, so the next clip starts at the first update after the end, not
on the exact sample: loops are for ambiences and repeated sounds, not for seamless music loops. The pause is measured
by <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`Update`</a> too, so it runs on the game's clock: a paused game that stops calling <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`Update`</a> holds the pause as well.
During the pause the state is `Idle`.

## Position

<a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#position">`Position`</a> places the emitter in the world, in the same units as the listener, usually metres. Its effects follow it at
once. Without positional effects in its chain, the position changes nothing; the
[positional sound page](/docs/audio-positional/) adds distance, Doppler and direction.

### IAudioEmitter properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#name">`Name`</a> | `string` | Read-only. The name the emitter was created under, unique in its manager. |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#type">`Type`</a> | <a class="ref" href="/docs/audio-glossary/types/audio-emitter-types/">`AudioEmitterTypes`</a> | Read-only. `Cached` or `Streaming`. |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#state">`State`</a> | <a class="ref" href="/docs/audio-glossary/types/audio-emitter-playing-states/">`AudioEmitterPlayingStates`</a> | Read-only. Where the emitter is: idle, playing, paused, finished, or stopped by a broken chain. Refreshed by <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a>. |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#position">`Position`</a> | `Vector3` | The emitter's position in the world. Its positional effects follow it at once. |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#islooped">`IsLooped`</a> | `bool` | Whether a new random clip starts when one ends. Off by default. |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#looppauserangems">`LoopPauseRangeMs`</a> | `(int min, int max)` | The shortest and longest silence between loops, in milliseconds. Negative values are taken as 0, and the two ends are put in order. `(0, 0)` by default. |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#currentaudiopath">`CurrentAudioPath`</a> | `string` | Read-only. The path of the clip the emitter holds, empty when it holds none. |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#timeduration">`TimeDuration`</a> | `TimeSpan` | Read-only. The length of the current clip, zero without one. |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#timeposition">`TimePosition`</a> | `TimeSpan` | Read-only. How far the current clip has played. A [time position effect](/docs/audio-shaping/#time-position) can also set it. |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#effectloopsend">`EffectLoopSend`</a> | <a class="ref" href="/docs/audio-glossary/effects/emitter-send-effect/">`EmitterSendEffect`</a> | Read-only. Where the effect chain starts: the samples of the clip. See [effect chains](/docs/audio-effects/). |
| <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#effectloopreturn">`EffectLoopReturn`</a> | <a class="ref" href="/docs/audio-glossary/effects/emitter-return-effect/">`EmitterReturnEffect`</a> | Read-only. Where the effect chain ends: what goes to the mix. |

### IAudioEmitter events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/audio-glossary/types/i-audio-emitter/#onstatechanged">`OnStateChanged`</a> | <code>(<a href="/docs/audio-glossary/types/i-audio-emitter/">IAudioEmitter</a> sender)</code> | <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#state">`State`</a> changes. From <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a> on the game thread, or from the thread that rewires the chain. |
| <a class="ref event" href="/docs/audio-glossary/types/i-audio-emitter/#oncurrentaudiochanged">`OnCurrentAudioChanged`</a> | <code>(<a href="/docs/audio-glossary/types/i-audio-emitter/">IAudioEmitter</a> sender)</code> | The emitter takes a clip or lets one go: on play, at every loop, on stop, and when the clip playing is removed. |

### IAudioEmitter methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudio">`TryAddAudio(string path)`</a> | Adds a WAV or Ogg Vorbis clip. A cached emitter decodes it now. `false` for an empty path, a file the emitter has already, or one that can't be opened or decoded. |
| <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudio">`TryRemoveAudio(string path)`</a> | Takes a clip out and disposes it. When it is the clip playing, another random clip starts. `false` when the emitter doesn't have it. |
| <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#clearaudios">`ClearAudios()`</a> | Stops the emitter and takes every clip out. |
| <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play()`</a> | Starts a random clip when stopped or finished, resumes when paused. Cuts short a loop pause. |
| <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause()`</a> | Holds a playing clip where it is. |
| <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop()`</a> | Ends the clip and forgets it, cancels a loop pause and clears the echoes of delay effects. |
| <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#update">`Update(float elapsedSeconds)`</a> | Refreshes the state, runs the loop pause and measures Doppler speeds. <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a> calls it for every emitter; don't call it yourself as well. |
| <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#dispose">`Dispose()`</a> | Stops the emitter and disposes its clips and effects. Remove emitters through the manager instead, which disposes them. |

The effect methods of an emitter are on the [effect chains page](/docs/audio-effects/#iaudioemitter-effect-methods).

### AudioManager emitter properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#emittersversion">`EmittersVersion`</a> | `int` | Read-only. Changes whenever emitters are added, removed or cleared, so cached emitter references can be looked up again. |

### AudioManager emitter methods

| Method | Description |
| --- | --- |
| <span class="method"><code><a href="/docs/audio-glossary/types/audio-manager/#tryaddemitter">TryAddEmitter</a>(string name, <a href="/docs/audio-glossary/types/audio-emitter-types/">AudioEmitterTypes</a> type, out <a href="/docs/audio-glossary/types/i-audio-emitter/">IAudioEmitter</a> emitter)</code></span> | Creates an emitter under a name, starting from the current listener pose. `false` for an empty name or one that is taken. |
| <span class="method"><code><a href="/docs/audio-glossary/types/audio-manager/#trygetemitterbyname">TryGetEmitterByName</a>(string name, out <a href="/docs/audio-glossary/types/i-audio-emitter/">IAudioEmitter</a> emitter)</code></span> | Finds an emitter by its name. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryremoveemitter">`TryRemoveEmitter(string name)`</a> | Takes an emitter out of the mix and disposes it. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#clearemitters">`ClearEmitters()`</a> | Removes and disposes every emitter. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryaddaudiotoemitter">`TryAddAudioToEmitter(string emitterName, string pathToAudio)`</a> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudio">`TryAddAudio`</a> on the emitter of that name. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryremoveaudiofromemitter">`TryRemoveAudioFromEmitter(string emitterName, string pathToAudio)`</a> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryremoveaudio">`TryRemoveAudio`</a> on the emitter of that name. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryclearemitteraudios">`TryClearEmitterAudios(string emitterName)`</a> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#clearaudios">`ClearAudios`</a> on the emitter of that name. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryplayemitter">`TryPlayEmitter(string name)`</a> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> on the emitter of that name. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#trypauseemitter">`TryPauseEmitter(string name)`</a> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause`</a> on the emitter of that name. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#trystopemitter">`TryStopEmitter(string name)`</a> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop`</a> on the emitter of that name. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#playall">`PlayAll()`</a> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> on every emitter. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#pauseall">`PauseAll()`</a> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause`</a> on every emitter, for a pause menu. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#stopall">`StopAll()`</a> | <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop`</a> on every emitter. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#clearaudiocache">`ClearAudioCache()`</a> | Static. Empties the cache of decoded clips. Emitters keep the clips they hold; the next <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#tryaddaudio">`TryAddAudio`</a> of a file decodes it again. |

The `Try` methods by name return `false` when there is no emitter of that name. Otherwise they return what the
emitter's own `Try` method returns, or `true` for the methods that return nothing.

#### `AudioEmitterTypes`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/audio-glossary/types/audio-emitter-types/#cached">`Cached`</a> | Clips are decoded once into memory, shared by every cached emitter. For short, frequent sounds. |
| <a class="ref" href="/docs/audio-glossary/types/audio-emitter-types/#streaming">`Streaming`</a> | Clips are decoded from disk while they play. For music and long ambiences. |

#### `AudioEmitterPlayingStates`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/audio-glossary/types/audio-emitter-playing-states/#idle">`Idle`</a> | No clip is playing: the emitter is new or stopped, or waits in a loop pause. |
| <a class="ref" href="/docs/audio-glossary/types/audio-emitter-playing-states/#playing">`Playing`</a> | A clip is playing. |
| <a class="ref" href="/docs/audio-glossary/types/audio-emitter-playing-states/#paused">`Paused`</a> | A clip is held by <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause`</a>. |
| <a class="ref" href="/docs/audio-glossary/types/audio-emitter-playing-states/#finished">`Finished`</a> | A clip of an emitter that doesn't loop played to its end. <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> starts a new one. |
| <a class="ref" href="/docs/audio-glossary/types/audio-emitter-playing-states/#effectloopdisconnected">`EffectLoopDisconnected`</a> | The effect chain doesn't reach the return, so the emitter is stopped and ignores play, pause and stop. |

#### `PlayingStates`

The state of the current clip on the audio thread, from which <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a> works out <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#state">`State`</a>. It is public, in
the `BorrowedTorch.Audio.SampleProviders` namespace, but no public member returns it: read <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#state">`State`</a> instead.

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/audio-glossary/types/playing-states/#idle">`Idle`</a> | No clip is playing. |
| <a class="ref" href="/docs/audio-glossary/types/playing-states/#playing">`Playing`</a> | The clip is playing. |
| <a class="ref" href="/docs/audio-glossary/types/playing-states/#paused">`Paused`</a> | The clip is held. |
| <a class="ref" href="/docs/audio-glossary/types/playing-states/#eofreached">`EofReached`</a> | The clip has played to its end; the next update starts a loop or finishes the emitter. |
