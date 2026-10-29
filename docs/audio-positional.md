---
layout: docs
legend: [prop, method]
title: "Audio: positional sound"
description: Distance attenuation and air absorption, Doppler, HRTF spatialization, HRTF data sets and demo mode.
---

Three effects place a sound in the world: the distance effect makes it quieter and duller the further it is, the
Doppler effect bends its pitch while it moves, and the spatial effect makes it come from its direction. Each one
reads the emitter's <a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#position">`Position`</a> and the [listener](/docs/audio/#the-listener), and follows them when they change. An
emitter has at most one of each. Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

Positions are in meters: the speed of sound, air absorption and the distances in HRTF data sets all assume it.

## Distance

The distance effect lowers the volume and closes a low-pass filter as the emitter moves away from the listener, until
the sound is gone at its audible distance. Set how loud the sound is, and the effect works out how far it carries:

```csharp
emitter.TryAddAudioEffect(AudioEffectTypes.Distance, out var effect);

var distance = (DistanceAudioEffect)effect;
distance.LoudnessDb = 40;                       // carries about 95 m
Console.WriteLine(distance.MaxAudibleDistanceMeters);
```

<a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#loudnessdb">`LoudnessDb`</a> is the level of the sound one meter away. The audible distance is where that level, falling by 6 dB for
every doubling of distance and by the air absorption for every meter, reaches the hearing threshold. With the default
environment:

| `LoudnessDb` | Audible up to | For example |
| --- | --- | --- |
| 20 | 10 m | A whisper, a ticking clock |
| 30 | 31 m | A campfire, footsteps |
| 40 | 95 m | Voices, a door |
| 50 | 271 m | A shout, an engine |
| 60 | 677 m | A bell, an explosion far off |

<a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#loudnessdb">`LoudnessDb`</a> is 0 by default, which makes the sound fall silent within a meter, so always set it.

Between the listener and the audible distance, two curves shape the sound. Both take how close the emitter is, from 1
at the listener to 0 at the audible distance, and give a value from 0 to 1:

- **Volume.** <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distancevolumeattenuationfunction">`DistanceVolumeAttenuationFunction`</a> gives the gain. The default straight line halves the volume halfway
  out.
- **Brightness.** <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distancecutoffattenuationfunction">`DistanceCutoffAttenuationFunction`</a> moves the low-pass cutoff between <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distancemaximumcutoffhz">`DistanceMaximumCutoffHz`</a> at the
  listener and <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distanceminimumcutoffhz">`DistanceMinimumCutoffHz`</a> at the audible distance: 20 000 Hz and 100 Hz by default, so a far sound is
  muffled.

The curves are [shaping functions](/docs/shaping-functions/) from `BorrowedTorch.ShapingFunctions`. A curve that falls faster near the listener
sounds closer to real life than the straight line:

```csharp
using BorrowedTorch.ShapingFunctions;

// quiet soon, then a long faint tail
distance.DistanceVolumeAttenuationFunction =
    ShapingFunctionFactory.Create(ShapingFunctionId.QuadraticEaseIn);

// stays bright longer, then dulls near the edge
distance.DistanceCutoffAttenuationFunction =
    ShapingFunctionFactory.Create(ShapingFunctionId.SineEaseOut);
distance.DistanceMinimumCutoffHz = 400;
```

### The environment

Two static settings of <a class="ref" href="/docs/audio-glossary/types/audio-manager/">`AudioManager`</a>, shared by every manager, describe the air and the ears:

- **<a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#hearingminimumdb">`HearingMinimumDb`</a>.** The level below which nothing is heard, 0 dB by default. Raise it for a noisy place where
  quiet sounds get lost sooner.
- **<a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#airsoundabsorptioncoefficient">`AirSoundAbsorptionCoefficient`</a>.** How much the air takes away, in dB per meter, 0.005 by default. Raise it for fog
  or a thick forest.

A distance effect works out its audible distance when its <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#loudnessdb">`LoudnessDb`</a> is set, so change the environment before you set
the loudness of your sounds, or set it again afterwards.

### DistanceAudioEffect properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#loudnessdb">`LoudnessDb`</a> | `float` | The level of the sound one meter away, in dB. Sets <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#maxaudibledistancemeters">`MaxAudibleDistanceMeters`</a>. Negative values are taken as 0. 0 by default, so the sound is silent past one meter until you set it. |
| <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#maxaudibledistancemeters">`MaxAudibleDistanceMeters`</a> | `float` | Read-only. How far the sound carries: where its level falls to <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#hearingminimumdb">`HearingMinimumDb`</a>, with the air absorption. Worked out when <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#loudnessdb">`LoudnessDb`</a> is set. |
| <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distancevolumeattenuationfunction">`DistanceVolumeAttenuationFunction`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> | Turns how close the emitter is, 1 at the listener to 0 at the audible distance, into the gain. `null` sets the default straight line. |
| <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distancecutoffattenuationfunction">`DistanceCutoffAttenuationFunction`</a> | <a class="ref" href="/docs/shaping-functions-glossary/types/base-shaping-function/">`BaseShapingFunction`</a> | Turns how close the emitter is into the low-pass cutoff, from <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distanceminimumcutoffhz">`DistanceMinimumCutoffHz`</a> at 0 to <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distancemaximumcutoffhz">`DistanceMaximumCutoffHz`</a> at 1. `null` sets the default straight line. |
| <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distanceminimumcutoffhz">`DistanceMinimumCutoffHz`</a> | `float` | The cutoff at the audible distance, from 0 to 20 000 Hz. 100 Hz by default. Setting it above the maximum raises the maximum too. |
| <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#distancemaximumcutoffhz">`DistanceMaximumCutoffHz`</a> | `float` | The cutoff at the listener, from 0 to 20 000 Hz. 20 000 Hz by default, which leaves a close sound open. Setting it below the minimum lowers the minimum too. |
| <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#isdemomode">`IsDemoMode`</a> | `bool` | Measures the distance from <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#demoemitterposition">`DemoEmitterPosition`</a> to the origin instead of from the emitter to the listener. See [demo mode](#demo-mode). |
| <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#demoemitterposition">`DemoEmitterPosition`</a> | `Vector3` | Where the sound is in demo mode, around a listener at the origin. |

## Doppler

The Doppler effect raises the pitch of a sound that comes closer and lowers that of one that moves away, as a passing
car does. It needs nothing but to be in the chain:

```csharp
emitter.TryAddAudioEffect(AudioEffectTypes.Doppler, out var doppler);
```

It measures the speeds of the listener and the emitter from how far they moved between two <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a> calls,
so it needs the real frame time in <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`Update`</a>. Only the speed along the line between them counts, and both speeds are
held below 90 % of the speed of sound, 343 m/s. While neither moves along that line, the effect leaves the sound
untouched and costs nothing.

A jump, such as a teleport or a respawn, reads as a very fast move and bends the pitch for one frame.

### DopplerAudioEffect properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/doppler-audio-effect/#isdemomode">`IsDemoMode`</a> | `bool` | Measures the emitter's speed from the moves of <a class="ref prop" href="/docs/audio-glossary/effects/doppler-audio-effect/#demoemitterposition">`DemoEmitterPosition`</a>, around a listener standing still at the origin. See [demo mode](#demo-mode). |
| <a class="ref prop" href="/docs/audio-glossary/effects/doppler-audio-effect/#demoemitterposition">`DemoEmitterPosition`</a> | `Vector3` | Where the sound is in demo mode. Move it between updates to hear the effect. |

## Spatialization

The spatial effect makes a sound come from its direction, in front or behind, left or right, above or below, as
headphones would carry it from a real source. It uses an HRTF, a head-related transfer function: for each direction, a
pair of short filters, one per ear, measured on a real or modeled head. The effect finds the emitter's direction in
the listener's frame, blends the filters of the nearest measured directions, and filters the sound for each ear with
the right delay between them.

```csharp
emitter.TryAddAudioEffect(AudioEffectTypes.Spatial, out var effect);

var spatial = (SpatialAudioEffect)effect;
spatial.AudioSpread = 0.3f; // a large source, such as a waterfall
```

The sound is mixed down to mono first, so a stereo clip loses its own stereo image: give positional sounds in mono.
<a class="ref prop" href="/docs/audio-glossary/effects/spatial-audio-effect/#audiospread">`AudioSpread`</a> widens the source, from a point at 0, the default, to a sound heard alike from everywhere at 1. An
emitter exactly at the listener's position passes through unchanged.

HRTF is made for headphones. On speakers it still places sounds left and right, but front, back and height are less
clear.

## HRTF data sets

The filters come from an HRTF data set in OpenAL Soft's `.mhr` format, version `MinPHR03`, as written by OpenAL Soft's
`makemhr`. The package embeds a default set, which the manager loads unless you give it another one:

```csharp
// at creation
var audio = new AudioManager("Content/Audio/hrtf/my-head.mhr");

// or later, for every spatial effect at once
if (!audio.TryLoadMhrFile("Content/Audio/hrtf/other-head.mhr"))
    Console.WriteLine("Not an MHR data set: spatial effects pass sound through");
```

A data set is resampled to 48 kHz when it loads. When the path is `null` or the file can't be opened, the manager loads
the embedded set and <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#mhrfilepath">`MhrFilePath`</a> is `null`. When the file is there but isn't a valid data set, <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryloadmhrfile">`TryLoadMhrFile`</a>
returns `false` and no set is loaded at all: <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#ishrtfdataloaded">`IsHrtfDataLoaded`</a> is `false`, and spatial effects pass sound through
unchanged until a set loads. For a data set measured at several distances, each emitter uses the measurement that fits
its own distance.

### AudioManager HRTF and environment properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#ishrtfdataloaded">`IsHrtfDataLoaded`</a> | `bool` | Read-only. Whether an HRTF data set is loaded. Without one, spatial effects pass sound through. |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#mhrfilepath">`MhrFilePath`</a> | `string` | Read-only. The file the loaded data set came from, `null` when it is the embedded set or none is loaded. |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#hearingminimumdb">`HearingMinimumDb`</a> | `float` | Static. The level below which nothing is heard, in dB. 0 by default. Distance effects use it when their `LoudnessDb` is set. |
| <a class="ref prop" href="/docs/audio-glossary/types/audio-manager/#airsoundabsorptioncoefficient">`AirSoundAbsorptionCoefficient`</a> | `float` | Static. How much the air absorbs, in dB per meter. 0.005 by default. Distance effects use it when their `LoudnessDb` is set. |

### AudioManager HRTF methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/audio-glossary/types/audio-manager/#tryloadmhrfile">`TryLoadMhrFile(string path)`</a> | Loads an HRTF data set for every spatial effect: the file at the path, or the embedded set when the path is `null` or can't be opened. `false` when the file isn't a valid data set; no set is loaded then. |

### SpatialAudioEffect properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/spatial-audio-effect/#audiospread">`AudioSpread`</a> | `float` | How wide the source is, from 0, a point, to 1, heard alike from everywhere. 0 by default. |
| <a class="ref prop" href="/docs/audio-glossary/effects/spatial-audio-effect/#isdemomode">`IsDemoMode`</a> | `bool` | Places the sound at <a class="ref prop" href="/docs/audio-glossary/effects/spatial-audio-effect/#demoemitterposition">`DemoEmitterPosition`</a> around a listener at the origin facing −Z, with +Y up and +X right. See [demo mode](#demo-mode). |
| <a class="ref prop" href="/docs/audio-glossary/effects/spatial-audio-effect/#demoemitterposition">`DemoEmitterPosition`</a> | `Vector3` | Where the sound is in demo mode. |

## Demo mode

The distance, Doppler and spatial effects each have a demo mode that ignores the game: the listener stands at the
origin facing −Z, with +Y up and +X right, and the sound is at the effect's <a class="ref prop" href="/docs/audio-glossary/effects/distance-audio-effect/#demoemitterposition">`DemoEmitterPosition`</a>. Use it to preview a
sound in an editor, such as moving it around a head with a slider, without a scene or a camera.

```csharp
var distance = (DistanceAudioEffect)distanceEffect;
var doppler = (DopplerAudioEffect)dopplerEffect;
var spatial = (SpatialAudioEffect)spatialEffect;

distance.IsDemoMode = true;
doppler.IsDemoMode = true;
spatial.IsDemoMode = true;

// two meters to the right and a little ahead, for all three
var position = new Vector3(2, 0, -0.5f);
distance.DemoEmitterPosition = position;
doppler.DemoEmitterPosition = position;
spatial.DemoEmitterPosition = position;
```

Each effect has its own switch and its own position, so set them together. The Doppler effect still needs
<a class="ref method" href="/docs/audio-glossary/types/audio-manager/#update">`AudioManager.Update`</a> to measure the moves of its demo position.
