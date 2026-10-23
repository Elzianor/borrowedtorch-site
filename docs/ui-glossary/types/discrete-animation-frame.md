---
layout: docs
legend: [prop, method]
title: "Glossary: DiscreteAnimationFrame&lt;T&gt;"
description: "The members of DiscreteAnimationFrame<T>, in alphabetical order."
---

Sets <a class="ref prop" href="/docs/ui-glossary/types/discrete-animation-frame/#value">`Value`</a> when the time line reaches <a class="ref prop" href="/docs/ui-glossary/types/discrete-animation-frame/#applyatms">`ApplyAtMs`</a>. The discrete frames of an animation form one track: the value in effect is the one of the latest frame at or before the time line's position, going forth and back alike. Of frames at the same time, the one added last wins.

A class deriving from [`BaseAnimationFrame<T>`](/docs/ui-glossary/types/base-animation-frame/). The [styles page](/docs/ui-styles/#discreteanimationframet) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="applyatms"><span class="prop"><code>ApplyAtMs</code></span> <a class="ctx" href="/docs/ui-styles/#discreteanimationframet" title="ApplyAtMs in context on the styles page" aria-label="ApplyAtMs in context on the styles page">🠆</a></h3>

`int` · Read-only. The point of the time line where it is set, in milliseconds.

<h3 id="value"><span class="prop"><code>Value</code></span> <a class="ctx" href="/docs/ui-styles/#discreteanimationframet" title="Value in context on the styles page" aria-label="Value in context on the styles page">🠆</a></h3>

`T` · Read-only. The value the frame sets.

## Methods

<h3 id="discreteanimationframe"><span class="method"><code>DiscreteAnimationFrame()</code></span> <a class="ctx" href="/docs/ui-styles/#discreteanimationframet" title="DiscreteAnimationFrame() in context on the styles page" aria-label="DiscreteAnimationFrame() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/discrete-animation-frame/#discreteanimationframe">`DiscreteAnimationFrame(T value, int applyAtMs)`</a> · Creates the frame.

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `T` | The value set on the properties. |
| `applyAtMs` | `int` | The point of the time line where the value is set, in milliseconds. It stays until the next frame's. |
