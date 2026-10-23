---
layout: docs
legend: [prop, method]
title: "Glossary: Animation&lt;T&gt;"
description: "The members of Animation<T>, in alphabetical order."
---

An animation of properties of type `T`. It has the properties of [`BaseAnimation`](#baseanimation).

A class deriving from [`BaseAnimation`](/docs/ui-glossary/types/base-animation/). The [styles page](/docs/ui-styles/#animationt) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="runboundaryvalues"><span class="prop"><code>RunBoundaryValues</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="RunBoundaryValues in context on the styles page" aria-label="RunBoundaryValues in context on the styles page">➤</a></h3>

<a class="ref prop" href="/docs/ui-glossary/types/animation/#runboundaryvalues">`RunBoundaryValues<T>`</a> · Read-only. The values applied when the animation starts and when it completes, or `null`.

<h3 id="state"><span class="prop"><code>State</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="State in context on the styles page" aria-label="State in context on the styles page">➤</a></h3>

<a class="ref" href="/docs/ui-glossary/types/animation-state/">`AnimationState`</a> · Read-only. Where the animation is: not started, running, paused or completed.

## Methods

<h3 id="animation"><span class="method"><code>Animation()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="Animation() in context on the styles page" aria-label="Animation() in context on the styles page">➤</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/animation/#animation">Animation</a>(int durationMs, <a href="/docs/ui-glossary/types/animation-repeat-type/">AnimationRepeatType</a> repeatType = <a href="/docs/ui-glossary/types/animation-repeat-type/#none">AnimationRepeatType.None</a>, bool autoReverse = false, bool deleteOnComplete = true, <a href="/docs/ui-glossary/types/run-boundary-values/">RunBoundaryValues</a>&lt;T&gt; runBoundaryValues = null, uint repeatsNumber = 1)</code></span> · Creates an animation with a time line of `durationMs` milliseconds. `repeatsNumber` counts the runs of a `NumberOfTimes` animation. A duration of 0 or less completes at once with the end values.

<h3 id="adddependencyproperty"><span class="method"><code>AddDependencyProperty()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="AddDependencyProperty() in context on the styles page" aria-label="AddDependencyProperty() in context on the styles page">➤</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/animation/#adddependencyproperty">AddDependencyProperty</a>(<a href="/docs/ui-glossary/types/dependency-property/">DependencyProperty</a>&lt;T&gt; property)</code></span> · Adds a property the animation drives. One animation can drive several properties.

<h3 id="addframe"><span class="method"><code>AddFrame()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="AddFrame() in context on the styles page" aria-label="AddFrame() in context on the styles page">➤</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/animation/#addframe">AddFrame</a>(<a href="/docs/ui-glossary/types/base-animation-frame/">BaseAnimationFrame</a>&lt;T&gt; frame)</code></span> · Adds a smooth or discrete frame.

<h3 id="pause"><span class="method"><code>Pause()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="Pause() in context on the styles page" aria-label="Pause() in context on the styles page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/animation/#pause">`Pause()`</a> · Pauses a running animation; <a class="ref method" href="/docs/ui-glossary/types/animation/#start">`Start`</a> continues it.

<h3 id="reset"><span class="method"><code>Reset()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="Reset() in context on the styles page" aria-label="Reset() in context on the styles page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/animation/#reset">`Reset()`</a> · Puts the animation back to not started, at the start of its time line with its repeats restored. The properties keep their current values.

<h3 id="start"><span class="method"><code>Start()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="Start() in context on the styles page" aria-label="Start() in context on the styles page">➤</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/animation/#start">`Start()`</a> · Runs a not started or paused animation. On the first start it applies <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#startvalue">`RunBoundaryValues.StartValue`</a> and the values of the time line's start. Does nothing on a completed animation (call <a class="ref method" href="/docs/ui-glossary/types/animation/#reset">`Reset`</a> first) or on a `NumberOfTimes` animation with 0 repeats.
