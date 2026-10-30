---
layout: docs
legend: [prop, method]
title: "Glossary: FrameRateCounter"
description: "The members of FrameRateCounter, in alphabetical order."
---

Measures the frame rate and the frame times of a game loop, called once per drawn frame: the frame rate over a window of frames, the last frame's time, and the longest frame of the window.

A sealed class. The [quick start guide](/docs/frame-rate-counter/#counting-frames) shows it in context, with code. It isn't thread-safe: call it from the thread that runs the loop, see [threads](/docs/frame-rate-counter-measuring/#threads).

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="framerate"><span class="prop"><code>FrameRate</code></span> <a class="ctx" href="/docs/frame-rate-counter-readings/#frameratecounter-reading-properties" title="FrameRate in context on the readings page" aria-label="FrameRate in context on the readings page">→</a></h3>

`int` · Read-only. Frames per second, rounded to the nearest whole number, a tie to the even one: the frames of the last window divided by its time, or 1 divided by the last frame's time if <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#updateeveryframe">`UpdateEveryFrame`</a> is `true`, where a frame of no time reads 0. 0 until the first window closes, and after <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#reset">`Reset`</a>.

<h3 id="frametime"><span class="prop"><code>FrameTime</code></span> <a class="ctx" href="/docs/frame-rate-counter-readings/#frameratecounter-reading-properties" title="FrameTime in context on the readings page" aria-label="FrameTime in context on the readings page">→</a></h3>

`float` · Read-only. The time of the last recorded frame, in seconds, set by every <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#update">`Update`</a> that records a frame, in either mode. 0 until a frame is recorded, and after <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#reset">`Reset`</a>.

<h3 id="refreshrateinseconds"><span class="prop"><code>RefreshRateInSeconds</code></span> <a class="ctx" href="/docs/frame-rate-counter-readings/#frameratecounter-setting-properties" title="RefreshRateInSeconds in context on the readings page" aria-label="RefreshRateInSeconds in context on the readings page">→</a></h3>

`float` · The length of the averaging window, in seconds: 0.5 by default. The frame that brings the window to this length or past it closes it. Zero, negative, NaN and infinite values are ignored, and the length stays as it was. A new length applies to the window in progress, which isn't discarded. Not used if <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#updateeveryframe">`UpdateEveryFrame`</a> is `true`; kept by <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#reset">`Reset`</a>.

<h3 id="updateeveryframe"><span class="prop"><code>UpdateEveryFrame</code></span> <a class="ctx" href="/docs/frame-rate-counter-readings/#frameratecounter-setting-properties" title="UpdateEveryFrame in context on the readings page" aria-label="UpdateEveryFrame in context on the readings page">→</a></h3>

`bool` · `false`, the default: <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#framerate">`FrameRate`</a> and <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#worstframetimeperrefresh">`WorstFrameTimePerRefresh`</a> come from a window of frames, recalculated when it closes. `true`: from every frame alone, recalculated every frame. A change discards the frames collected for the window in progress; the readings keep their values until the next recalculation. Setting the value it already has does nothing. Kept by <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#reset">`Reset`</a>.

<h3 id="worstframetimeperrefresh"><span class="prop"><code>WorstFrameTimePerRefresh</code></span> <a class="ctx" href="/docs/frame-rate-counter-readings/#frameratecounter-reading-properties" title="WorstFrameTimePerRefresh in context on the readings page" aria-label="WorstFrameTimePerRefresh in context on the readings page">→</a></h3>

`float` · Read-only. The longest frame of the last window, in seconds, or the last frame's time, the same as <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#frametime">`FrameTime`</a>, if <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#updateeveryframe">`UpdateEveryFrame`</a> is `true`. 0 until the first window closes, and after <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#reset">`Reset`</a>.

## Methods

<h3 id="frameratecounter"><span class="method"><code>FrameRateCounter()</code></span> <a class="ctx" href="/docs/frame-rate-counter/#frameratecounter-constructor" title="FrameRateCounter() in context on the quick start guide" aria-label="FrameRateCounter() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#frameratecounter">`FrameRateCounter()`</a> · A counter that averages over a window of 0.5 seconds, with every reading at 0 and the clock of <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#update">`Update()`</a> not started yet.

<h3 id="reset"><span class="method"><code>Reset()</code></span> <a class="ctx" href="/docs/frame-rate-counter-measuring/#frameratecounter-methods" title="Reset() in context on the measuring frames page" aria-label="Reset() in context on the measuring frames page">→</a></h3>

<a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#reset">`Reset()`</a> · Sets every reading back to 0, discards the frames collected for the window in progress, and stops the clock of <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#update">`Update()`</a>, so its next call only starts it again. <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#updateeveryframe">`UpdateEveryFrame`</a> and <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#refreshrateinseconds">`RefreshRateInSeconds`</a> keep their values.

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/frame-rate-counter-measuring/#frameratecounter-methods" title="Update() in context on the measuring frames page" aria-label="Update() in context on the measuring frames page">→</a></h3>

<a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#update">`Update()`</a> · Records one frame, the time since the previous call, measured with `Stopwatch.GetTimestamp`. The first call, and the first after <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#reset">`Reset`</a>, only starts the clock: it records no frame and returns `false`. Returns `true` when <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#framerate">`FrameRate`</a> and <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#worstframetimeperrefresh">`WorstFrameTimePerRefresh`</a> were recalculated by this call: when it closed a window, or for every recorded frame if <a class="ref prop" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#updateeveryframe">`UpdateEveryFrame`</a> is `true`.

<a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#update">`Update(double elapsedSeconds)`</a> · Records one frame that took the given time, and leaves the clock of <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#update">`Update()`</a> as it is. Returns `true` when the readings were recalculated by this call, as above.

| Parameter | Type | Description |
| --- | --- | --- |
| `elapsedSeconds` | `double` | The time since the previous frame, in seconds. Not checked: a zero is a frame of no time, and a negative value takes time away from the window. |
