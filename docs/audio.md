---
layout: docs
title: "Audio: quick start guide"
description: Set up BorrowedTorch.Audio in a game, place the listener and a first sound, and find your way around the audio pages.
---

BorrowedTorch.Audio is the audio engine of Kindling. You place emitters in the world, give each one some clips and a
chain of effects, and the manager mixes them for one listener. Distance, air absorption, Doppler and HRTF make a sound
come from where its emitter is, and a shared reverb bus puts it in a room. The mix runs on its own thread and goes out
through WASAPI; the game only moves the listener and the emitters.

These pages cover the library from setup to every public type:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/audio/) (this page) | Installing, creating the manager in a game, the listener, a complete campfire scene |
| [Emitters](/docs/audio-emitters/) | Cached and streaming emitters, clips and file formats, playing, looping, states and events |
| [Effect chains](/docs/audio-effects/) | Wiring effects between an emitter's send and return, bypassing and removing them, the order of effects |
| [Positional sound](/docs/audio-positional/) | Distance attenuation and air absorption, Doppler, HRTF spatialisation and HRTF data sets |
| [Volume, tone and time](/docs/audio-shaping/) | Volume, the three-band equaliser, pitch, delay, fades and seeking |
| [Mixing, reverb and output](/docs/audio-mixing/) | The signal path, the master volume, the reverb bus, the output device and threading |
| [Glossary](/docs/audio-glossary/) | Every public type with its properties, methods and events in alphabetical order, one page per type |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.Audio
```

| Requirement | Version |
| --- | --- |
| .NET | 10 (`net10.0`) |
| Operating system | Windows: the output goes through WASAPI |
| Audio libraries | NAudio 3.3.0 and NVorbis 0.10.5, installed with the package |
| Borrowed Torch packages | `BorrowedTorch.ShapingFunctions` 1.6.1 for attenuation curves and fade shapes, and `BorrowedTorch.Math` 0.2.2, installed with the package |

The package also carries a default HRTF data set inside the assembly, so spatial sound works without any extra files.

## Setting up the audio

Create one <a class="ref" href="/docs/audio-glossary/types/audio-manager/">`AudioManager`</a> when the game starts and dispose it when the game ends. The constructor opens the default
output device and starts the mix right away, in 32-bit float stereo at 48 kHz. Every frame, the manager needs two
things from the game:

- **The listener.** <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#setlistenerdata">`SetListenerData`</a> takes the position of the ears and the directions they face, usually the
  camera's.
- **The time.** <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`Update`</a> takes the seconds since the last frame. It refreshes the emitters' states, runs their loop
  pauses, measures the speeds Doppler needs, and picks a new output device after a device change.

```csharp
using BorrowedTorch.Audio;
using BorrowedTorch.Audio.Emitters.Base;

public class MyGame : Game
{
    private readonly GraphicsDeviceManager _graphics;
    private AudioManager _audio;

    public MyGame()
    {
        _graphics = new GraphicsDeviceManager(this);
        Content.RootDirectory = "Content";
    }

    protected override void Initialize()
    {
        // the embedded HRTF data set, full master volume
        _audio = new AudioManager();

        // the listener before any sound plays, see "The listener" below
        _audio.SetListenerData(_camera.Position, _camera.Forward, _camera.Up, _camera.Right);

        // create the emitters here, see "A campfire" below

        base.Initialize();
    }

    protected override void Update(GameTime gameTime)
    {
        // move the camera first, then hand its pose to the audio
        _audio.SetListenerData(_camera.Position, _camera.Forward, _camera.Up, _camera.Right);
        _audio.Update((float)gameTime.ElapsedGameTime.TotalSeconds);

        base.Update(gameTime);
    }

    protected override void UnloadContent()
    {
        _audio.Dispose();
    }
}
```

`_camera` stands for your own camera. The audio takes `System.Numerics.Vector3`, so a camera with MonoGame vectors
converts them before the call.

Call the manager from the game thread. Disposing it stops the output, then disposes every emitter with its clips and
effects. Decoded clips stay in a cache shared by the whole process until you clear it, see
[cached emitters](/docs/audio-emitters/#cached-and-streaming).

Two constructor arguments change the defaults:

- **An HRTF data set of your own.** Pass the path of an `.mhr` file. A path that can't be read falls back to the
  embedded set. The [positional sound page](/docs/audio-positional/#hrtf-data-sets) explains the format.
- **A starting master volume.** Between 0 and 1, see [master volume](/docs/audio-mixing/#master-volume).

### AudioManager properties

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#isinitialized">`IsInitialized`</a> | `bool` | Read-only. Whether an output device is open and playing the mix. `false` while the manager picks a new device, and when no device could be opened. |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#waveformat">`WaveFormat`</a> | `WaveFormat` | Read-only. The format of the mix: 32-bit float, two channels, 48 kHz. Every clip is converted to it. |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#listenerposition">`ListenerPosition`</a> | `Vector3` | The position of the listener in the world. Setting one listener property at a time updates every emitter each time, so prefer <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#setlistenerdata">`SetListenerData`</a>. |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#listenerforward">`ListenerForward`</a> | `Vector3` | The direction the listener faces, normalised. |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#listenerup">`ListenerUp`</a> | `Vector3` | The listener's up direction, normalised. |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#listenerright">`ListenerRight`</a> | `Vector3` | The listener's right direction, normalised. |

### AudioManager methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#audiomanager">`AudioManager(string mhrFilePath = null, float initialMasterVolume = 1.0f)`</a> | Creates the mix, opens the default output device and loads an HRTF data set: the file at the path, or the embedded set when the path is `null` or can't be read. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#setlistenerdata">`SetListenerData(Vector3 position, Vector3 forward, Vector3 up, Vector3 right)`</a> | Sets the whole listener pose at once, so each spatial effect works out its new direction once instead of once per vector. Call it every frame the listener moves. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`Update(float elapsedSeconds)`</a> | Advances every emitter: refreshes its `State`, runs its loop pause and measures its Doppler speeds. Also picks a new output device after a device change. Call it once per frame. |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#dispose">`Dispose()`</a> | Stops the output and disposes every emitter. Later calls do nothing. |

The other members of the manager are on the pages of what they control: emitters on the
[emitters page](/docs/audio-emitters/#audiomanager-emitter-methods), effects on the
[effect chains page](/docs/audio-effects/#audiomanager-effect-methods), HRTF data and the environment on the
[positional sound page](/docs/audio-positional/#audiomanager-hrtf-and-environment-properties), and the volume, the reverb
bus and the output device on the [mixing page](/docs/audio-mixing/#audiomanager-mix-properties).

## The listener

The listener is the pair of ears every sound is mixed for. Distance and Doppler use its position; spatial effects also
use its forward, up and right directions to tell left from right and front from back. Give all three directions
normalised and at right angles to each other. The library doesn't assume a handedness: whatever your world's
convention, `right` is where the listener's right ear points.

Until you set it, the listener sits at the origin with no directions, so set it once before the first sound plays, as
`Initialize` does above. An emitter created later starts from the current listener pose.

## A campfire

A looping campfire, fading with distance, with a little room reverb, heard from where it is. For a listener at the
origin facing −Z, as in MonoGame, it burns four metres ahead and two to the left.

```csharp
using System.Numerics;
using BorrowedTorch.Audio.EffectWrappers;
using BorrowedTorch.Audio.EffectWrappers.Base;

// a cached emitter: the clip is decoded once, here
audio.TryAddEmitter("campfire", AudioEmitterTypes.Cached, out var fire);
fire.TryAddAudio("Content/Audio/campfire.ogg");
fire.IsLooped = true;
fire.Position = new Vector3(-2, 0, -4);

// effects start unconnected: add them first
fire.TryAddAudioEffect(AudioEffectTypes.Distance, out var distance);
fire.TryAddAudioEffect(AudioEffectTypes.Reverb, out var reverb);
fire.TryAddAudioEffect(AudioEffectTypes.Spatial, out var spatial);

((DistanceAudioEffect)distance).LoudnessDb = 30; // fades out over about 31 m
((ReverbAudioEffect)reverb).ReverbSend = 0.3f;

// then wire them: send -> distance -> reverb -> spatial -> return
distance.Input = fire.EffectLoopSend;
reverb.Input = distance;
spatial.Input = reverb;
fire.EffectLoopReturn.Input = spatial;

// a small stone room for the reverb bus
audio.ReverbBusRoomSize = 1.2f; // seconds for the tail to fade by 60 dB
audio.ReverbBusCutoffHz = 5000;
audio.ReverbBusWet = 0.2f;

fire.Play();
```

The snippets on these pages call the manager `audio`; in the game above it is `_audio`. <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#play">`Play`</a> starts the clip on the
audio thread at once. The emitter's <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#state">`State`</a> reads `Playing` from the next <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`Update`</a>.

The [effect chains page](/docs/audio-effects/#wiring-a-chain) has more on wiring, and the
[positional sound page](/docs/audio-positional/#distance) on how loudness turns into distance.
