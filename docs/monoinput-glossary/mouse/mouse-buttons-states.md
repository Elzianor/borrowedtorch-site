---
layout: docs
legend: [prop, method]
title: "Glossary: MouseButtonsStates"
description: "The members of MouseButtonsStates, in alphabetical order."
---

The states of the five mouse buttons at one moment, compared with `==`: what <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onbuttonsstateschanged">`OnButtonsStatesChanged`</a> hands its handlers.

A class, in the namespace `BorrowedTorch.MonoInput.Inputs.Mouse`. A snapshot copies the states of the buttons of <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-manager/#mousestatus">`MouseStatus`</a> when it is created and never changes after. The [mouse page](/docs/monoinput-mouse/#mousebuttonsstates-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="leftbuttonstate"><span class="prop"><code>LeftButtonState</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttonsstates-members" title="LeftButtonState in context on the mouse page" aria-label="LeftButtonState in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a> · Read-only. The state of the left button when the snapshot was taken.

<h3 id="middlebuttonstate"><span class="prop"><code>MiddleButtonState</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttonsstates-members" title="MiddleButtonState in context on the mouse page" aria-label="MiddleButtonState in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a> · Read-only. The state of the middle button when the snapshot was taken.

<h3 id="rightbuttonstate"><span class="prop"><code>RightButtonState</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttonsstates-members" title="RightButtonState in context on the mouse page" aria-label="RightButtonState in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a> · Read-only. The state of the right button when the snapshot was taken.

<h3 id="xbutton1state"><span class="prop"><code>XButton1State</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttonsstates-members" title="XButton1State in context on the mouse page" aria-label="XButton1State in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a> · Read-only. The state of the first side button when the snapshot was taken.

<h3 id="xbutton2state"><span class="prop"><code>XButton2State</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttonsstates-members" title="XButton2State in context on the mouse page" aria-label="XButton2State in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a> · Read-only. The state of the second side button when the snapshot was taken.

## Methods

<h3 id="mousebuttonsstates"><span class="method"><code>MouseButtonsStates()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttonsstates-members" title="MouseButtonsStates() in context on the mouse page" aria-label="MouseButtonsStates() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#mousebuttonsstates">`MouseButtonsStates()`</a> · A snapshot of the five buttons of <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-manager/#mousestatus">`MouseStatus`</a> as they are now, the same as <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#getbuttonsstates">`GetButtonsStates`</a>.

<h3 id="equality-operators"><span class="method"><code>==()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttonsstates-members" title="==() in context on the mouse page" aria-label="==() in context on the mouse page">→</a></h3>

<code>operator ==(<a href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">MouseButtonsStates</a> first, <a href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">MouseButtonsStates</a> second)</code> · True when the five states are equal, or when both are `null`. `!=` is its opposite, and <a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#equals">`Equals`</a> compares the same way.

| Parameter | Type | Description |
| --- | --- | --- |
| `first` | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">`MouseButtonsStates`</a> | The first snapshot. |
| `second` | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">`MouseButtonsStates`</a> | The second snapshot. |

<h3 id="equals"><span class="method"><code>Equals()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttonsstates-members" title="Equals() in context on the mouse page" aria-label="Equals() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#equals">`Equals(object obj)`</a> · True for a `MouseButtonsStates` with the same five states.

| Parameter | Type | Description |
| --- | --- | --- |
| `obj` | `object` | The object to compare with. |

<h3 id="gethashcode"><span class="method"><code>GetHashCode()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttonsstates-members" title="GetHashCode() in context on the mouse page" aria-label="GetHashCode() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#gethashcode">`GetHashCode()`</a> · A hash of the five states, the same for equal snapshots.

<h3 id="tostring"><span class="method"><code>ToString()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttonsstates-members" title="ToString() in context on the mouse page" aria-label="ToString() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/#tostring">`ToString()`</a> · The five states, such as `L: Pressed M: Idle R: Idle X1: Idle X2: Idle`.
