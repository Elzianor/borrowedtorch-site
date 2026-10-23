---
layout: docs
legend: [prop]
title: "Glossary: BaseAnimation"
description: "The members of BaseAnimation, in alphabetical order."
---

The abstract base of animations, the type `AddAnimation` takes. Its properties are set by the constructor.

An abstract class. The [styles page](/docs/ui-styles/#baseanimation) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="autoreverse"><span class="prop"><code>AutoReverse</code></span> <a class="ctx" href="/docs/ui-styles/#baseanimation" title="AutoReverse in context on the styles page" aria-label="AutoReverse in context on the styles page">➤</a></h3>

`bool` · Read-only. Whether a run goes forth and back along the time line.

<h3 id="deleteoncomplete"><span class="prop"><code>DeleteOnComplete</code></span> <a class="ctx" href="/docs/ui-styles/#baseanimation" title="DeleteOnComplete in context on the styles page" aria-label="DeleteOnComplete in context on the styles page">➤</a></h3>

`bool` · Read-only. Whether the UI removes the animation when it completes.

<h3 id="durationms"><span class="prop"><code>DurationMs</code></span> <a class="ctx" href="/docs/ui-styles/#baseanimation" title="DurationMs in context on the styles page" aria-label="DurationMs in context on the styles page">➤</a></h3>

`int` · Read-only. The length of the time line in milliseconds.

<h3 id="repeatsnumber"><span class="prop"><code>RepeatsNumber</code></span> <a class="ctx" href="/docs/ui-styles/#baseanimation" title="RepeatsNumber in context on the styles page" aria-label="RepeatsNumber in context on the styles page">➤</a></h3>

`uint` · Read-only. The number of runs of a `NumberOfTimes` animation.

<h3 id="repeattype"><span class="prop"><code>RepeatType</code></span> <a class="ctx" href="/docs/ui-styles/#baseanimation" title="RepeatType in context on the styles page" aria-label="RepeatType in context on the styles page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/animation-repeat-type/">`AnimationRepeatType`</a> · Read-only. How the runs repeat.

<h3 id="state"><span class="prop"><code>State</code></span> <a class="ctx" href="/docs/ui-styles/#baseanimation" title="State in context on the styles page" aria-label="State in context on the styles page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/animation-state/">`AnimationState`</a> · Read-only. The state of the animation.
