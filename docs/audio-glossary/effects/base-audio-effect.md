---
layout: docs
legend: [prop, method]
title: "Glossary: base effect"
description: "The properties and methods of BaseAudioEffect, in alphabetical order."
---

<a class="ref" href="/docs/audio-glossary/effects/base-audio-effect/">`BaseAudioEffect`</a> is the abstract base of every effect, the send and the return of a chain included.

Everything on this page applies to every effect. The [effect chains page](/docs/audio-effects/#wiring-a-chain) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Properties

<h3 id="id"><span class="prop"><code>Id</code></span> <a class="ctx" href="/docs/audio-effects/#baseaudioeffect-properties" title="Id in context on the effect chains page" aria-label="Id in context on the effect chains page">→</a></h3>

`Guid` · Read-only. Identifies the effect within its emitter. New for every effect and every run, and empty once the effect is disposed.

<h3 id="input"><span class="prop"><code>Input</code></span> <a class="ctx" href="/docs/audio-effects/#baseaudioeffect-properties" title="Input in context on the effect chains page" aria-label="Input in context on the effect chains page">→</a></h3>

<a class="ref" href="/docs/audio-glossary/effects/base-audio-effect/">`BaseAudioEffect`</a> · The effect this one takes its sound from, `null` when none. Setting it connects the two and takes both away from their old links.

<h3 id="isbypass"><span class="prop"><code>IsBypass</code></span> <a class="ctx" href="/docs/audio-effects/#baseaudioeffect-properties" title="IsBypass in context on the effect chains page" aria-label="IsBypass in context on the effect chains page">→</a></h3>

`bool` · Lets the sound through unchanged, keeping the effect in the chain. Off by default.

<h3 id="output"><span class="prop"><code>Output</code></span> <a class="ctx" href="/docs/audio-effects/#baseaudioeffect-properties" title="Output in context on the effect chains page" aria-label="Output in context on the effect chains page">→</a></h3>

<a class="ref" href="/docs/audio-glossary/effects/base-audio-effect/">`BaseAudioEffect`</a> · The effect this one gives its sound to, `null` when none. `a.Output = b` does what `b.Input = a` does.

<h3 id="type"><span class="prop"><code>Type</code></span> <a class="ctx" href="/docs/audio-effects/#baseaudioeffect-properties" title="Type in context on the effect chains page" aria-label="Type in context on the effect chains page">→</a></h3>

<a class="ref" href="/docs/audio-glossary/types/audio-effect-types/">`AudioEffectTypes`</a> · Read-only. What kind of effect it is.

## Methods

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/audio-effects/#baseaudioeffect-methods" title="Dispose() in context on the effect chains page" aria-label="Dispose() in context on the effect chains page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/effects/base-audio-effect/#dispose">`Dispose()`</a> · Disconnects the effect and frees it. Remove effects through their emitter instead, which disposes them.
