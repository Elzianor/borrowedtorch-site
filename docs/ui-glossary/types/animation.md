---
layout: docs
legend: [prop, method]
title: "Glossary: Animation&lt;T&gt;"
description: "The members of Animation<T>, in alphabetical order."
---

An animation of properties of type `T`. It has the properties of [`BaseAnimation`](/docs/ui-styles/#baseanimation).

A class deriving from [`BaseAnimation`](/docs/ui-glossary/types/base-animation/). The [styles page](/docs/ui-styles/#animationt) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="runboundaryvalues"><span class="prop"><code>RunBoundaryValues</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="RunBoundaryValues in context on the styles page" aria-label="RunBoundaryValues in context on the styles page">🠆</a></h3>

<a class="ref prop" href="/docs/ui-glossary/types/animation/#runboundaryvalues">`RunBoundaryValues<T>`</a> · Read-only. The values applied when the animation starts and when it completes, or `null`.

<h3 id="state"><span class="prop"><code>State</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="State in context on the styles page" aria-label="State in context on the styles page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/animation-state/">`AnimationState`</a> · Read-only. Where the animation is: not started, running, paused or completed.

## Methods

<h3 id="animation"><span class="method"><code>Animation()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="Animation() in context on the styles page" aria-label="Animation() in context on the styles page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/animation/#animation">Animation</a>(int durationMs, <a href="/docs/ui-glossary/types/animation-repeat-type/">AnimationRepeatType</a> repeatType = <a href="/docs/ui-glossary/types/animation-repeat-type/#none">AnimationRepeatType.None</a>, bool autoReverse = false, bool deleteOnComplete = true, <a href="/docs/ui-glossary/types/run-boundary-values/">RunBoundaryValues</a>&lt;T&gt; runBoundaryValues = null, uint repeatsNumber = 1)</code></span> · Creates an animation with a time line of `durationMs` milliseconds. `repeatsNumber` counts the runs of a `NumberOfTimes` animation. A duration of 0 or less completes at once with the end values.

| Parameter | Type | Description |
| --- | --- | --- |
| `durationMs` | `int` | The length of the time line, in milliseconds. 0 or less completes the animation at once with its end values. |
| `repeatType` | <a class="ref" href="/docs/ui-glossary/types/animation-repeat-type/">`AnimationRepeatType`</a> | How many runs the animation plays: one (`None`), `repeatsNumber` (`NumberOfTimes`), or until it is paused or removed (`Infinite`). Default: <a class="ref" href="/docs/ui-glossary/types/animation-repeat-type/#none">`AnimationRepeatType.None`</a>. |
| `autoReverse` | `bool` | Whether a run goes back along the time line after reaching its end. Default: `false`. |
| `deleteOnComplete` | `bool` | Whether the UI removes the animation when it completes. Default: `true`. |
| `runBoundaryValues` | <a class="ref prop" href="/docs/ui-glossary/types/animation/#runboundaryvalues">`RunBoundaryValues<T>`</a> | The values set on the properties when the animation first starts and when it completes, or `null` for none. Default: `null`. |
| `repeatsNumber` | `uint` | The number of runs of a `NumberOfTimes` animation. Default: `1`. |

<h3 id="adddependencyproperty"><span class="method"><code>AddDependencyProperty()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="AddDependencyProperty() in context on the styles page" aria-label="AddDependencyProperty() in context on the styles page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/animation/#adddependencyproperty">AddDependencyProperty</a>(<a href="/docs/ui-glossary/types/dependency-property/">DependencyProperty</a>&lt;T&gt; property)</code></span> · Adds a property the animation drives. One animation can drive several properties.

| Parameter | Type | Description |
| --- | --- | --- |
| `property` | <code><a href="/docs/ui-glossary/types/dependency-property/">DependencyProperty</a>&lt;T&gt;</code> | The property to drive: an element's `FooDP`, such as `banner.MarginDP`. |

<h3 id="addframe"><span class="method"><code>AddFrame()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="AddFrame() in context on the styles page" aria-label="AddFrame() in context on the styles page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/animation/#addframe">AddFrame</a>(<a href="/docs/ui-glossary/types/base-animation-frame/">BaseAnimationFrame</a>&lt;T&gt; frame)</code></span> · Adds a smooth or discrete frame.

| Parameter | Type | Description |
| --- | --- | --- |
| `frame` | <code><a href="/docs/ui-glossary/types/base-animation-frame/">BaseAnimationFrame</a>&lt;T&gt;</code> | The frame to add: a <code><a href="/docs/ui-glossary/types/smooth-animation-frame/">SmoothAnimationFrame</a>&lt;T&gt;</code> or a <code><a href="/docs/ui-glossary/types/discrete-animation-frame/">DiscreteAnimationFrame</a>&lt;T&gt;</code>. |

<h3 id="addtarget"><span class="method"><code>AddTarget()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="AddTarget() in context on the styles page" aria-label="AddTarget() in context on the styles page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/animation/#addtarget">AddTarget</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> owner, Action&lt;T&gt; set)</code></span> · Adds a target set through a setter: anything a value can be given to, a property that is no dependency property included. `set` gets each value, as a dependency property would. Once every target of the animation belongs to a disposed element, the UI lets go of the animation, as it does for dependency properties. Throws an `ArgumentNullException` when `set` is `null`. See [setter targets](/docs/ui-styles/#setter-targets).

| Parameter | Type | Description |
| --- | --- | --- |
| `owner` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element the value belongs to, whose disposal tells that the target is gone. `null` for a value that belongs to no element: such a target never counts as disposed. |
| `set` | `Action<T>` | The setter, given each value of the animation, such as `value => angle = value`. |

<h3 id="pause"><span class="method"><code>Pause()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="Pause() in context on the styles page" aria-label="Pause() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/animation/#pause">`Pause()`</a> · Pauses a running animation; <a class="ref method" href="/docs/ui-glossary/types/animation/#start">`Start`</a> continues it.

<h3 id="reset"><span class="method"><code>Reset()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="Reset() in context on the styles page" aria-label="Reset() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/animation/#reset">`Reset()`</a> · Puts the animation back to not started, at the start of its time line with its repeats restored. The properties keep their current values, and the animation stays among the UI's animations.

<h3 id="seek"><span class="method"><code>Seek()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="Seek() in context on the styles page" aria-label="Seek() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/animation/#seek">`Seek(int positionMs)`</a> · Puts the time line at a moment and gives the targets the values the animation has there, as a run going forward shows them, whatever they showed before: of the smooth frames, in the order they start, each one the moment is past gives its end value and the one it is in its value there (the first one's start value before them all); of the discrete frames, the latest one at or before the moment. <a class="ref prop" href="/docs/ui-glossary/types/animation/#runboundaryvalues">`RunBoundaryValues`</a> are not applied. A running animation goes on from there, forward; one that isn't running (not started, paused or completed) is paused there, and <a class="ref method" href="/docs/ui-glossary/types/animation/#start">`Start`</a> goes on from it. For a tool that shows a moment of the animation; <a class="ref prop" href="/docs/ui-glossary/types/base-animation/#positionms">`PositionMs`</a> reads where it is. See [starting, stopping and seeking](/docs/ui-styles/#starting-stopping-and-seeking).

| Parameter | Type | Description |
| --- | --- | --- |
| `positionMs` | `int` | The moment, in milliseconds from the start of the time line. Kept between 0 and <a class="ref prop" href="/docs/ui-glossary/types/base-animation/#durationms">`DurationMs`</a>. |

<h3 id="start"><span class="method"><code>Start()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="Start() in context on the styles page" aria-label="Start() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/animation/#start">`Start()`</a> · Runs a not started or paused animation and adds it to the UI's animations if it isn't there, so <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#addanimation">`AddAnimation`</a> isn't needed first. Started from not started (the first time, or after <a class="ref method" href="/docs/ui-glossary/types/animation/#stop">`Stop`</a> or <a class="ref method" href="/docs/ui-glossary/types/animation/#reset">`Reset`</a>), it applies <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#startvalue">`RunBoundaryValues.StartValue`</a>, then the values of the time line's start, so a frame that applies at 0 ms replaces `StartValue` at once. Does nothing on a completed animation (call <a class="ref method" href="/docs/ui-glossary/types/animation/#reset">`Reset`</a> first) or on a `NumberOfTimes` animation with 0 repeats.

<h3 id="stop"><span class="method"><code>Stop()</code></span> <a class="ctx" href="/docs/ui-styles/#animationt" title="Stop() in context on the styles page" aria-label="Stop() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/animation/#stop">`Stop()`</a> · Takes the animation out of the UI's animations and puts it back to not started, at the start of its time line; the values it set stay. <a class="ref method" href="/docs/ui-glossary/types/animation/#start">`Start`</a> runs it again from the beginning. The counterpart of `Start`, for an animation you are done with before its elements are.
