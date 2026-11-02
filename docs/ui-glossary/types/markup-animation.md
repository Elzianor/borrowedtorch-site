---
layout: docs
legend: [prop, method]
title: "Glossary: MarkupAnimation"
description: "The members of MarkupAnimation, in alphabetical order."
---

An animation a markup declares in `<Ui.Animations>` (see <a class="ref prop" href="/docs/ui-glossary/types/markup-document/#animations">`MarkupDocument.Animations`</a>): a property of one of its elements taken from a value to another over a time, or through several, one `<Step>` after another. It starts as the markup is loaded, when an element raises an event, or by <a class="ref method" href="/docs/ui-glossary/types/markup-animation/#start">`Start`</a>, and stops on an element's event or by <a class="ref method" href="/docs/ui-glossary/types/markup-animation/#stop">`Stop`</a>. Starting it stops the markup's other animations of the same property of the same element, so one started as the mouse enters an element and one as it leaves take turns. One without a `From` starts from the value the property has as it starts.

A sealed class of the BorrowedTorch.UI.Markup package (namespace `BorrowedTorch.UI.Markup`). The [markup page](/docs/ui-markup/#markupanimation) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="animation"><span class="prop"><code>Animation</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="Animation in context on the markup page" aria-label="Animation in context on the markup page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/base-animation/">`BaseAnimation`</a> · Read-only. The BorrowedTorch.UI animation of its last start, an <code><a href="/docs/ui-glossary/types/animation/">Animation</a>&lt;T&gt;</code> of the property's type made anew at each start; `null` before its first start or <a class="ref method" href="/docs/ui-glossary/types/markup-animation/#seek">`Seek`</a>.

<h3 id="durationms"><span class="prop"><code>DurationMs</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="DurationMs in context on the markup page" aria-label="DurationMs in context on the markup page">🠆</a></h3>

`int` · Read-only. Its whole time line, in milliseconds: its `Delay`, and its steps' delays and durations (its own `Duration` for one without steps). One run, without its repeats and the way back of an auto reversing one.

<h3 id="easingnames"><span class="prop"><code>EasingNames</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="EasingNames in context on the markup page" aria-label="EasingNames in context on the markup page">🠆</a></h3>

`IReadOnlyList<string>` · Static, read-only. The names an `Easing` takes, in any case: the class names of the shaping functions of BorrowedTorch.ShapingFunctions made by a constructor without parameters (`Linear`, `CubicEaseOut`), sorted. For a tool offering them.

<h3 id="isrunning"><span class="prop"><code>IsRunning</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="IsRunning in context on the markup page" aria-label="IsRunning in context on the markup page">🠆</a></h3>

`bool` · Read-only. Whether it runs now: started, and neither completed nor stopped.

<h3 id="key"><span class="prop"><code>Key</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="Key in context on the markup page" aria-label="Key in context on the markup page">🠆</a></h3>

`string` · Read-only. The key the markup gives it, the include's name before it for one of an included UI (`left.pulse`); `null` for none. <a class="ref method" href="/docs/ui-glossary/types/markup-document/#findanimation">`FindAnimation`</a> finds it by it.

<h3 id="positionms"><span class="prop"><code>PositionMs</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="PositionMs in context on the markup page" aria-label="PositionMs in context on the markup page">🠆</a></h3>

`int` · Read-only. Where its time line is now, in milliseconds from its start: 0 before it first starts or is put somewhere with <a class="ref method" href="/docs/ui-glossary/types/markup-animation/#seek">`Seek`</a>, and after it stops.

<h3 id="property"><span class="prop"><code>Property</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="Property in context on the markup page" aria-label="Property in context on the markup page">🠆</a></h3>

`string` · Read-only. The name of the property it animates (`DesiredWidth`).

<h3 id="starton"><span class="prop"><code>StartOn</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="StartOn in context on the markup page" aria-label="StartOn in context on the markup page">🠆</a></h3>

`string` · Read-only. What starts it, as the markup has it: `Load`, an element's event (`play.OnMouseEnter`), or a list of them (`Load, play.OnClick`); `null` for none, an animation only code starts.

<h3 id="stopon"><span class="prop"><code>StopOn</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="StopOn in context on the markup page" aria-label="StopOn in context on the markup page">🠆</a></h3>

`string` · Read-only. The elements' events that stop it, as the markup has them (`play.OnMouseLeave`, or a list of them); `null` for none.

<h3 id="target"><span class="prop"><code>Target</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="Target in context on the markup page" aria-label="Target in context on the markup page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Read-only. The element whose property it animates.

## Methods

<h3 id="seek"><span class="method"><code>Seek()</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="Seek() in context on the markup page" aria-label="Seek() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-animation/#seek">`Seek(int positionMs)`</a> · Shows a moment of it: the property given the value it has at the position, the markup's other animations of the same property of the same element stopped first. A running one goes on from there; one not running stays there, until <a class="ref method" href="/docs/ui-glossary/types/markup-animation/#start">`Start`</a> runs it from its beginning. Before its first start or seek, one without a `From` is shown from the value the property has now. For a tool scrubbing through it.

| Parameter | Type | Description |
| --- | --- | --- |
| `positionMs` | `int` | The moment, in milliseconds from its start, kept within 0 and <a class="ref prop" href="/docs/ui-glossary/types/markup-animation/#durationms">`DurationMs`</a>. |

<h3 id="start"><span class="method"><code>Start()</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="Start() in context on the markup page" aria-label="Start() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-animation/#start">`Start()`</a> · Runs it from its beginning, again when it ran before, the markup's other animations of the same property of the same element stopped first. One without a `From` starts from the value the property has now.

<h3 id="stop"><span class="method"><code>Stop()</code></span> <a class="ctx" href="/docs/ui-markup/#markupanimation" title="Stop() in context on the markup page" aria-label="Stop() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-animation/#stop">`Stop()`</a> · Stops it where it is: the property keeps the value it set last. The next <a class="ref method" href="/docs/ui-glossary/types/markup-animation/#start">`Start`</a> runs it from its beginning.
