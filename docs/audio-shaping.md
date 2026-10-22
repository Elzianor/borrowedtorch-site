---
layout: docs
title: "Audio: volume, tone and time"
description: The volume, three-band equaliser, pitch, delay, fade and time position effects.
---

These effects change a sound without caring where it is: how loud it is, its tone, its pitch, its echoes, how it starts
and ends, and where in the clip it plays. Any number of each can sit in a chain, except the time position effect, of
which an emitter has one. Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

Every setting can change while the sound plays. The audio thread picks the new value up at the start of its next block
of samples, a few milliseconds later.

## Volume

The volume effect multiplies the sound by <a class="ref prop" href="/docs/audio-glossary/effects/volume-audio-effect/#volume">`Volume`</a>, a plain gain: 1 leaves it as it is, 0.5 halves it. The value stays
within <a class="ref prop" href="/docs/audio-glossary/effects/volume-audio-effect/#volumerange">`VolumeRange`</a>, from 0 to 1 by default; widen the range to make a sound louder than its clip.

```csharp
emitter.TryAddAudioEffect(AudioEffectTypes.Volume, out var effect);

var volume = (VolumeAudioEffect)effect;
volume.VolumeRange = (0, 2); // allow boosting up to twice the clip's level
volume.Volume = 1.5f;
```

For the volume of everything at once, use the manager's [master volume](/docs/audio-mixing/#master-volume).

### VolumeAudioEffect properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/volume-audio-effect/#volume">`Volume`</a> | `float` | The gain, kept within <a class="ref prop" href="/docs/audio-glossary/effects/volume-audio-effect/#volumerange">`VolumeRange`</a>. 1 by default. |
| <a class="ref prop" href="/docs/audio-glossary/effects/volume-audio-effect/#volumerange">`VolumeRange`</a> | `(float min, float max)` | The lowest and highest <a class="ref prop" href="/docs/audio-glossary/effects/volume-audio-effect/#volume">`Volume`</a>. Negative ends are taken as 0, and the two ends are put in order. Setting it brings <a class="ref prop" href="/docs/audio-glossary/effects/volume-audio-effect/#volume">`Volume`</a> into the new range. `(0, 1)` by default. |

## Equaliser

The equaliser has three bands: a low shelf, a peak in the middle and a high shelf. Each band boosts or cuts by its gain
in dB, and a band at 0 dB, the default, is switched off and costs nothing.

```csharp
emitter.TryAddAudioEffect(AudioEffectTypes.Equalizer, out var effect);

// a voice heard through a wall: no lows, no highs, a honky middle
var eq = (ThreeBandEqualizerAudioEffect)effect;
eq.LowGainDb = -18;
eq.LowFreqHz = 300;
eq.MidGainDb = 6;
eq.MidFreqHz = 1200;
eq.MidQ = 1.5f;
eq.HighGainDb = -18;
eq.HighFreqHz = 3000;
```

- **Low shelf.** Boosts or cuts everything below <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowfreqhz">`LowFreqHz`</a>. <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowslope">`LowSlope`</a> sets how steep the step is.
- **Middle peak.** Boosts or cuts around <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midfreqhz">`MidFreqHz`</a>. <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midq">`MidQ`</a> sets how narrow: about 0.5 to 1 is a broad, natural
  change, up to 5 a narrow, pronounced one.
- **High shelf.** Boosts or cuts everything above <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highfreqhz">`HighFreqHz`</a>. <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highslope">`HighSlope`</a> sets how steep the step is.

Every setting is kept within its limits, which the class gives as static properties for sliders in a settings screen:

| Setting | Limits | Default |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowgaindb">`LowGainDb`</a>, <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midgaindb">`MidGainDb`</a>, <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highgaindb">`HighGainDb`</a> | <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#mingaindb">`MinGainDb`</a> to <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxgaindb">`MaxGainDb`</a>: −24 to 24 dB | 0 dB, off |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowfreqhz">`LowFreqHz`</a> | <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#minlowfreqhz">`MinLowFreqHz`</a> to <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxlowfreqhz">`MaxLowFreqHz`</a>: 20 to 400 Hz | 200 Hz |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midfreqhz">`MidFreqHz`</a> | <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#minmidfreqhz">`MinMidFreqHz`</a> to <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxmidfreqhz">`MaxMidFreqHz`</a>: 200 to 5 000 Hz | 1 000 Hz |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highfreqhz">`HighFreqHz`</a> | <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#minhighfreqhz">`MinHighFreqHz`</a> to <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxhighfreqhz">`MaxHighFreqHz`</a>: 1 000 to 20 000 Hz | 6 000 Hz |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowslope">`LowSlope`</a>, <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highslope">`HighSlope`</a> | <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#minslope">`MinSlope`</a> to <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxslope">`MaxSlope`</a>: 0.1 to 2 | 0.707 |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midq">`MidQ`</a> | <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#minq">`MinQ`</a> to <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxq">`MaxQ`</a>: 0.3 to 5 | 1 |

Changes don't click: the filters keep their state while their settings move, so a band can follow a slider or an
animation.

### ThreeBandEqualizerAudioEffect properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowgaindb">`LowGainDb`</a> | `float` | The boost or cut of the low shelf, in dB. 0 switches the band off. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowfreqhz">`LowFreqHz`</a> | `float` | Where the low shelf starts. 200 Hz by default. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowslope">`LowSlope`</a> | `float` | How steep the low shelf's step is. 0.707 by default. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midgaindb">`MidGainDb`</a> | `float` | The boost or cut of the middle peak, in dB. 0 switches the band off. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midfreqhz">`MidFreqHz`</a> | `float` | The centre of the middle peak. 1 000 Hz by default. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midq">`MidQ`</a> | `float` | How narrow the middle peak is; higher is narrower. 1 by default. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highgaindb">`HighGainDb`</a> | `float` | The boost or cut of the high shelf, in dB. 0 switches the band off. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highfreqhz">`HighFreqHz`</a> | `float` | Where the high shelf starts. 6 000 Hz by default. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highslope">`HighSlope`</a> | `float` | How steep the high shelf's step is. 0.707 by default. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#mingaindb">`MinGainDb`</a> | `float` | Static. −24 dB, the lowest band gain. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxgaindb">`MaxGainDb`</a> | `float` | Static. 24 dB, the highest band gain. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#minlowfreqhz">`MinLowFreqHz`</a> | `float` | Static. 20 Hz, the lowest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowfreqhz">`LowFreqHz`</a>. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxlowfreqhz">`MaxLowFreqHz`</a> | `float` | Static. 400 Hz, the highest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowfreqhz">`LowFreqHz`</a>. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#minmidfreqhz">`MinMidFreqHz`</a> | `float` | Static. 200 Hz, the lowest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midfreqhz">`MidFreqHz`</a>. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxmidfreqhz">`MaxMidFreqHz`</a> | `float` | Static. 5 000 Hz, the highest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midfreqhz">`MidFreqHz`</a>. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#minhighfreqhz">`MinHighFreqHz`</a> | `float` | Static. 1 000 Hz, the lowest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highfreqhz">`HighFreqHz`</a>. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxhighfreqhz">`MaxHighFreqHz`</a> | `float` | Static. 20 000 Hz, the highest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highfreqhz">`HighFreqHz`</a>. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#minslope">`MinSlope`</a> | `float` | Static. 0.1, the gentlest shelf slope. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxslope">`MaxSlope`</a> | `float` | Static. 2, the steepest shelf slope. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#minq">`MinQ`</a> | `float` | Static. 0.3, the broadest middle peak. |
| <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#maxq">`MaxQ`</a> | `float` | Static. 5, the narrowest middle peak. |

## Pitch

The pitch effect raises or lowers the pitch by a factor without changing how long the sound lasts: 2 is an octave up,
0.5 an octave down. Small random factors give repeated sounds some variety:

```csharp
emitter.TryAddAudioEffect(AudioEffectTypes.Pitch, out var effect);

var pitch = (PitchAudioEffect)effect;
pitch.Pitch = 0.95f + Random.Shared.NextSingle() * 0.1f; // ±5 %
```

The shift works on short slices of the sound in the frequency domain, which smears sharp attacks a little, more so the
further the factor is from 1. At 1, the effect does nothing and costs nothing.

### PitchAudioEffect properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/pitch-audio-effect/#pitch">`Pitch`</a> | `float` | The pitch factor, from 0.0625 (four octaves down) to 16 (four octaves up). 1 by default, which leaves the sound as it is. |

## Delay

The delay effect adds an echo: the sound again, <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#delayms">`DelayMs`</a> later. <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#feedback">`Feedback`</a> sends part of each echo back in, for more
echoes that fade one after another, and <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#mix">`Mix`</a> sets how much of the output is echo.

```csharp
emitter.TryAddAudioEffect(AudioEffectTypes.Delay, out var effect);

// a canyon: a strong echo every 400 ms, fading out
var delay = (DelayAudioEffect)effect;
delay.DelayMs = 400;
delay.Feedback = 0.45f;
delay.Mix = 0.35f;
```

All three start at 0, so a new delay effect lets the sound through unchanged until you set <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#delayms">`DelayMs`</a> and <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#mix">`Mix`</a>. A
delay of 0 ms switches the effect off. The echoes go on after the clip ends, until they fade out, even when the emitter already reads `Finished`;
<a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop`</a> cuts them.

### DelayAudioEffect properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#delayms">`DelayMs`</a> | `float` | The time between the sound and its echo, from 0 to <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#maxdelayms">`MaxDelayMs`</a>. 0 by default, which switches the effect off. |
| <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#feedback">`Feedback`</a> | `float` | How much of each echo comes back as the next one, from 0 to 1. 0 by default: a single echo. |
| <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#mix">`Mix`</a> | `float` | How much of the output is echo, from 0 (none) to 1 (only echo). 0 by default. |
| <a class="ref prop" href="/docs/audio-glossary/effects/delay-audio-effect/#maxdelayms">`MaxDelayMs`</a> | `float` | Static. 3 000 ms, the longest delay. |

## Fades

The fade effect fades each clip in over its first <a class="ref prop" href="/docs/audio-glossary/effects/fade-in-out-audio-effect/#fadeindurationms">`FadeInDurationMs`</a> and out over its last <a class="ref prop" href="/docs/audio-glossary/effects/fade-in-out-audio-effect/#fadeoutdurationms">`FadeOutDurationMs`</a>. It
follows the clip's position, so it fades every clip of the emitter, at every loop, and a clip that starts or jumps into
the middle of a fade takes the gain of that point.

```csharp
emitter.TryAddAudioEffect(AudioEffectTypes.FadeInOut, out var effect);

var fade = (FadeInOutAudioEffect)effect;
fade.FadeInDurationMs = 2000;
fade.FadeOutDurationMs = 3000;
fade.FadeInFunction = ShapingFunctionFactory.Create(ShapingFunctionId.SineEaseInOut);
fade.FadeOutFunction = ShapingFunctionFactory.Create(ShapingFunctionId.SineEaseInOut);
```

Each fade takes at most half of the clip, so a short clip fades in and straight out again. Both durations are 0 by
default: no fade. The shape of a fade is a shaping function from `BorrowedTorch.ShapingFunctions`, a straight line by
default: it gets how far the fade has come, from 0 to 1, and gives the gain. The fade out runs the same shape backwards.

A fade belongs to the clip, not to <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#pause">`Pause`</a> or <a class="ref method" href="/docs/audio-glossary/types/i-audio-emitter/#stop">`Stop`</a>, which act at once. To fade a sound out on demand, move a volume
effect's `Volume` down over a few frames, then stop it.

<a class="ref prop" href="/docs/audio-glossary/effects/fade-in-out-audio-effect/#fadingstate">`FadingState`</a> tells which part of a fade the clip is in. Its type, <a class="ref" href="/docs/audio-glossary/types/fading-states/">`FadingStates`</a>, is in the
`BorrowedTorch.Audio.SampleProviders` namespace.

### FadeInOutAudioEffect properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/fade-in-out-audio-effect/#fadeindurationms">`FadeInDurationMs`</a> | `float` | How long each clip fades in from its start, at most half the clip. Negative values are taken as 0. 0 by default: no fade in. |
| <a class="ref prop" href="/docs/audio-glossary/effects/fade-in-out-audio-effect/#fadeoutdurationms">`FadeOutDurationMs`</a> | `float` | How long each clip fades out before its end, at most half the clip. Negative values are taken as 0. 0 by default: no fade out. |
| <a class="ref prop" href="/docs/audio-glossary/effects/fade-in-out-audio-effect/#fadeinfunction">`FadeInFunction`</a> | `BaseShapingFunction` | Turns how far the fade in has come, 0 to 1, into the gain. `null` sets the default straight line. |
| <a class="ref prop" href="/docs/audio-glossary/effects/fade-in-out-audio-effect/#fadeoutfunction">`FadeOutFunction`</a> | `BaseShapingFunction` | The same for the fade out, which runs it from 1 back to 0. `null` sets the default straight line. |
| <a class="ref prop" href="/docs/audio-glossary/effects/fade-in-out-audio-effect/#fadingstate">`FadingState`</a> | <a class="ref" href="/docs/audio-glossary/types/fading-states/">`FadingStates`</a> | Read-only. Whether the last block of sound was fading in, fading out, or neither. |

#### `FadingStates`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/audio-glossary/types/fading-states/#none">`None`</a> | The clip plays at full level. |
| <a class="ref" href="/docs/audio-glossary/types/fading-states/#fadingin">`FadingIn`</a> | The clip is in its fade in. |
| <a class="ref" href="/docs/audio-glossary/types/fading-states/#fadingout">`FadingOut`</a> | The clip is in its fade out. |

## Time position

The time position effect reads and moves the playing position of the current clip, for a music player's progress bar
or to start an ambience somewhere in the middle. It works only while it is connected in the chain, with both an input
and an output; anywhere in the chain will do.

```csharp
emitter.TryAddAudioEffect(AudioEffectTypes.TimePosition, out var effect);

var time = (TimePositionAudioEffect)effect;
time.Input = emitter.EffectLoopSend;
emitter.EffectLoopReturn.Input = time;

emitter.Play();
time.TimePosition = TimeSpan.FromSeconds(30); // jump in
```

The jump happens at the start of the next block of samples. A position past the end of the clip takes it to its end.
<a class="ref prop" href="/docs/audio-glossary/types/i-audio-emitter/#timeposition">`IAudioEmitter.TimePosition`</a> reads the same position without the effect.

### TimePositionAudioEffect properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/audio-glossary/effects/time-position-audio-effect/#timeposition">`TimePosition`</a> | `TimeSpan` | How far the current clip has played. Setting it moves the clip there, within its length. Reads zero and ignores sets while the effect isn't connected on both sides, or the emitter holds no clip. |
