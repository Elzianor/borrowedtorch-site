---
layout: docs
legend: [prop, method]
title: "Glossary: MouseStatus"
description: "The members of MouseStatus, in alphabetical order."
---

The mouse as of the last update: five buttons, the pointer and how far it moved, two wheels and how far they turned.

A class, in the namespace `BorrowedTorch.MonoInput.Inputs.Mouse`. Read the one <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-manager/#mousestatus">`MouseStatus`</a> holds: only the manager updates a status. The [mouse page](/docs/monoinput-mouse/#mousestatus-button-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="horizontalwheelcumulativevalue"><span class="prop"><code>HorizontalWheelCumulativeValue</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-wheel-properties" title="HorizontalWheelCumulativeValue in context on the mouse page" aria-label="HorizontalWheelCumulativeValue in context on the mouse page">→</a></h3>

`int` · Read-only. The horizontal wheel's running total, as MonoGame keeps it in `HorizontalScrollWheelValue`.

<h3 id="horizontalwheeldelta"><span class="prop"><code>HorizontalWheelDelta</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-wheel-properties" title="HorizontalWheelDelta in context on the mouse page" aria-label="HorizontalWheelDelta in context on the mouse page">→</a></h3>

`int` · Read-only. How far the horizontal wheel turned since the update before, positive to the right. Zero at the first update.

<h3 id="isanybuttonactive"><span class="prop"><code>IsAnyButtonActive</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-button-properties" title="IsAnyButtonActive in context on the mouse page" aria-label="IsAnyButtonActive in context on the mouse page">→</a></h3>

`bool` · Read-only. Any of the five buttons is pressed, held or just let go.

<h3 id="isanybuttondown"><span class="prop"><code>IsAnyButtonDown</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-button-properties" title="IsAnyButtonDown in context on the mouse page" aria-label="IsAnyButtonDown in context on the mouse page">→</a></h3>

`bool` · Read-only. Any of the five buttons is held: `Pressed` or `Down`.

<h3 id="isanybuttonpressed"><span class="prop"><code>IsAnyButtonPressed</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-button-properties" title="IsAnyButtonPressed in context on the mouse page" aria-label="IsAnyButtonPressed in context on the mouse page">→</a></h3>

`bool` · Read-only. Any of the five buttons went down at the last update.

<h3 id="isanybuttonup"><span class="prop"><code>IsAnyButtonUp</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-button-properties" title="IsAnyButtonUp in context on the mouse page" aria-label="IsAnyButtonUp in context on the mouse page">→</a></h3>

`bool` · Read-only. Any of the five buttons was let go at the last update.

<h3 id="leftbutton"><span class="prop"><code>LeftButton</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-button-properties" title="LeftButton in context on the mouse page" aria-label="LeftButton in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> · Read-only. The left button. The same object for the whole run.

<h3 id="middlebutton"><span class="prop"><code>MiddleButton</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-button-properties" title="MiddleButton in context on the mouse page" aria-label="MiddleButton in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> · Read-only. The middle button, usually a press on the wheel. The same object for the whole run.

<h3 id="position"><span class="prop"><code>Position</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-pointer-properties" title="Position in context on the mouse page" aria-label="Position in context on the mouse page">→</a></h3>

`Point` · Read-only. Where the pointer is, in pixels from the top-left corner of the window's client area. Outside the window it can be negative or larger than the window.

<h3 id="positiondelta"><span class="prop"><code>PositionDelta</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-pointer-properties" title="PositionDelta in context on the mouse page" aria-label="PositionDelta in context on the mouse page">→</a></h3>

`Point` · Read-only. How far the pointer moved since the update before, in pixels. Zero at the first update.

<h3 id="rightbutton"><span class="prop"><code>RightButton</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-button-properties" title="RightButton in context on the mouse page" aria-label="RightButton in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> · Read-only. The right button. The same object for the whole run.

<h3 id="wheelcumulativevalue"><span class="prop"><code>WheelCumulativeValue</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-wheel-properties" title="WheelCumulativeValue in context on the mouse page" aria-label="WheelCumulativeValue in context on the mouse page">→</a></h3>

`int` · Read-only. The wheel's running total, as MonoGame keeps it in `ScrollWheelValue`: 0 when the game starts, 120 more for each notch away from you on most mice.

<h3 id="wheeldelta"><span class="prop"><code>WheelDelta</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-wheel-properties" title="WheelDelta in context on the mouse page" aria-label="WheelDelta in context on the mouse page">→</a></h3>

`int` · Read-only. How far the wheel turned since the update before: positive away from you, 120 a notch on most mice. Zero at the first update.

<h3 id="xbutton1"><span class="prop"><code>XButton1</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-button-properties" title="XButton1 in context on the mouse page" aria-label="XButton1 in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> · Read-only. The first side button, back on most mice. The same object for the whole run.

<h3 id="xbutton2"><span class="prop"><code>XButton2</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-button-properties" title="XButton2 in context on the mouse page" aria-label="XButton2 in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> · Read-only. The second side button, forward on most mice. The same object for the whole run.

## Methods

<h3 id="mousestatus"><span class="method"><code>MouseStatus()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousestatus-button-properties" title="MouseStatus() in context on the mouse page" aria-label="MouseStatus() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-status/#mousestatus">`MouseStatus()`</a> · A status of your own, idle and at zero. Nothing ever updates it: read <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-manager/#mousestatus">`MouseStatus`</a> instead.
