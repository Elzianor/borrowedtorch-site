---
layout: docs
title: "Glossary: ThreeBandEqualizerAudioEffect"
description: "The properties of ThreeBandEqualizerAudioEffect, in alphabetical order."
---

A three-band equaliser: a low shelf, a middle peak and a high shelf.

`ThreeBandEqualizerAudioEffect` derives from [`BaseAudioEffect`](/docs/audio-glossary/effects/base-audio-effect/) and has its members too. The [volume, tone and time page](/docs/audio-shaping/#equaliser) shows it in context, with code.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="highfreqhz"><span class="prop"><code>HighFreqHz</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="HighFreqHz in context on the volume, tone and time page" aria-label="HighFreqHz in context on the volume, tone and time page">→</a></h3>

`float` · Where the high shelf starts. 6 000 Hz by default.

<h3 id="highgaindb"><span class="prop"><code>HighGainDb</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="HighGainDb in context on the volume, tone and time page" aria-label="HighGainDb in context on the volume, tone and time page">→</a></h3>

`float` · The boost or cut of the high shelf, in dB. 0 switches the band off.

<h3 id="highslope"><span class="prop"><code>HighSlope</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="HighSlope in context on the volume, tone and time page" aria-label="HighSlope in context on the volume, tone and time page">→</a></h3>

`float` · How steep the high shelf's step is. 0.707 by default.

<h3 id="lowfreqhz"><span class="prop"><code>LowFreqHz</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="LowFreqHz in context on the volume, tone and time page" aria-label="LowFreqHz in context on the volume, tone and time page">→</a></h3>

`float` · Where the low shelf starts. 200 Hz by default.

<h3 id="lowgaindb"><span class="prop"><code>LowGainDb</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="LowGainDb in context on the volume, tone and time page" aria-label="LowGainDb in context on the volume, tone and time page">→</a></h3>

`float` · The boost or cut of the low shelf, in dB. 0 switches the band off.

<h3 id="lowslope"><span class="prop"><code>LowSlope</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="LowSlope in context on the volume, tone and time page" aria-label="LowSlope in context on the volume, tone and time page">→</a></h3>

`float` · How steep the low shelf's step is. 0.707 by default.

<h3 id="maxgaindb"><span class="prop"><code>MaxGainDb</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MaxGainDb in context on the volume, tone and time page" aria-label="MaxGainDb in context on the volume, tone and time page">→</a></h3>

`float` · Static. 24 dB, the highest band gain.

<h3 id="maxhighfreqhz"><span class="prop"><code>MaxHighFreqHz</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MaxHighFreqHz in context on the volume, tone and time page" aria-label="MaxHighFreqHz in context on the volume, tone and time page">→</a></h3>

`float` · Static. 20 000 Hz, the highest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highfreqhz">`HighFreqHz`</a>.

<h3 id="maxlowfreqhz"><span class="prop"><code>MaxLowFreqHz</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MaxLowFreqHz in context on the volume, tone and time page" aria-label="MaxLowFreqHz in context on the volume, tone and time page">→</a></h3>

`float` · Static. 400 Hz, the highest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowfreqhz">`LowFreqHz`</a>.

<h3 id="maxmidfreqhz"><span class="prop"><code>MaxMidFreqHz</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MaxMidFreqHz in context on the volume, tone and time page" aria-label="MaxMidFreqHz in context on the volume, tone and time page">→</a></h3>

`float` · Static. 5 000 Hz, the highest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midfreqhz">`MidFreqHz`</a>.

<h3 id="maxq"><span class="prop"><code>MaxQ</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MaxQ in context on the volume, tone and time page" aria-label="MaxQ in context on the volume, tone and time page">→</a></h3>

`float` · Static. 5, the narrowest middle peak.

<h3 id="maxslope"><span class="prop"><code>MaxSlope</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MaxSlope in context on the volume, tone and time page" aria-label="MaxSlope in context on the volume, tone and time page">→</a></h3>

`float` · Static. 2, the steepest shelf slope.

<h3 id="midfreqhz"><span class="prop"><code>MidFreqHz</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MidFreqHz in context on the volume, tone and time page" aria-label="MidFreqHz in context on the volume, tone and time page">→</a></h3>

`float` · The centre of the middle peak. 1 000 Hz by default.

<h3 id="midgaindb"><span class="prop"><code>MidGainDb</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MidGainDb in context on the volume, tone and time page" aria-label="MidGainDb in context on the volume, tone and time page">→</a></h3>

`float` · The boost or cut of the middle peak, in dB. 0 switches the band off.

<h3 id="midq"><span class="prop"><code>MidQ</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MidQ in context on the volume, tone and time page" aria-label="MidQ in context on the volume, tone and time page">→</a></h3>

`float` · How narrow the middle peak is; higher is narrower. 1 by default.

<h3 id="mingaindb"><span class="prop"><code>MinGainDb</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MinGainDb in context on the volume, tone and time page" aria-label="MinGainDb in context on the volume, tone and time page">→</a></h3>

`float` · Static. −24 dB, the lowest band gain.

<h3 id="minhighfreqhz"><span class="prop"><code>MinHighFreqHz</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MinHighFreqHz in context on the volume, tone and time page" aria-label="MinHighFreqHz in context on the volume, tone and time page">→</a></h3>

`float` · Static. 1 000 Hz, the lowest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#highfreqhz">`HighFreqHz`</a>.

<h3 id="minlowfreqhz"><span class="prop"><code>MinLowFreqHz</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MinLowFreqHz in context on the volume, tone and time page" aria-label="MinLowFreqHz in context on the volume, tone and time page">→</a></h3>

`float` · Static. 20 Hz, the lowest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#lowfreqhz">`LowFreqHz`</a>.

<h3 id="minmidfreqhz"><span class="prop"><code>MinMidFreqHz</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MinMidFreqHz in context on the volume, tone and time page" aria-label="MinMidFreqHz in context on the volume, tone and time page">→</a></h3>

`float` · Static. 200 Hz, the lowest <a class="ref prop" href="/docs/audio-glossary/effects/three-band-equalizer-audio-effect/#midfreqhz">`MidFreqHz`</a>.

<h3 id="minq"><span class="prop"><code>MinQ</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MinQ in context on the volume, tone and time page" aria-label="MinQ in context on the volume, tone and time page">→</a></h3>

`float` · Static. 0.3, the broadest middle peak.

<h3 id="minslope"><span class="prop"><code>MinSlope</code></span> <a class="ctx" href="/docs/audio-shaping/#threebandequalizeraudioeffect-properties" title="MinSlope in context on the volume, tone and time page" aria-label="MinSlope in context on the volume, tone and time page">→</a></h3>

`float` · Static. 0.1, the gentlest shelf slope.
