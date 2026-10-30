---
layout: docs
legend: [prop, method, event]
title: "Glossary: MouseManager"
description: "The members of MouseManager, in alphabetical order."
---

Reads the mouse at every update, or takes a state the game built: its five buttons, the pointer and both wheels, with events for what changed.

A static class, in the namespace `BorrowedTorch.MonoInput.Inputs.Mouse`. It holds one <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-status/">`MouseStatus`</a> for the whole run. Its events are raised from inside its update methods, on the game thread. The [mouse page](/docs/monoinput-mouse/#mousemanager-methods) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="mousestatus"><span class="prop"><code>MouseStatus</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousemanager-properties" title="MouseStatus in context on the mouse page" aria-label="MouseStatus in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-status/">`MouseStatus`</a> · Static, read-only. The mouse as of the last update. The same object for the whole run, so a reference to it stays good.

## Methods

<h3 id="getbuttonsstates"><span class="method"><code>GetButtonsStates()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousemanager-methods" title="GetButtonsStates() in context on the mouse page" aria-label="GetButtonsStates() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#getbuttonsstates">`GetButtonsStates()`</a> · Static. Returns a new <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">`MouseButtonsStates`</a>: the states of the five buttons as they are now. Allocates.

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousemanager-methods" title="Update() in context on the mouse page" aria-label="Update() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#update">`Update()`</a> · Static. Reads the mouse once with `Mouse.GetState()` and updates the pointer, the wheels and the buttons, in that order, raising their events. Call it once per frame, before anything reads the mouse.

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#update">`Update(MouseState mouseState)`</a> · Static. The same, over a state the game built instead of the mouse: for a mouse that never reaches MonoGame's `Mouse`, such as an editor viewport's in a window of its own, and for replays and tests. Once per frame too, in place of `Update()`: the two move the same status.

| Parameter | Type | Description |
| --- | --- | --- |
| `mouseState` | `MouseState` | The mouse now: the position in the view's pixels from its top-left corner, the wheels as running totals, and the five buttons. |

<h3 id="updatebuttonsstates"><span class="method"><code>UpdateButtonsStates()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousemanager-methods" title="UpdateButtonsStates() in context on the mouse page" aria-label="UpdateButtonsStates() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#updatebuttonsstates">`UpdateButtonsStates()`</a> · Static. Reads the mouse and moves the five buttons one step, nothing else. Raises <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onbuttonsstateschanged">`OnButtonsStatesChanged`</a> when any of them changed.

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#updatebuttonsstates">`UpdateButtonsStates(MouseState mouseState)`</a> · Static. The same, with the buttons of the state passed instead of the mouse's.

| Parameter | Type | Description |
| --- | --- | --- |
| `mouseState` | `MouseState` | The mouse now. Only its five buttons are read. |

<h3 id="updatepositiondata"><span class="method"><code>UpdatePositionData()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousemanager-methods" title="UpdatePositionData() in context on the mouse page" aria-label="UpdatePositionData() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#updatepositiondata">`UpdatePositionData()`</a> · Static. Reads the mouse and updates <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#position">`Position`</a> and <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#positiondelta">`PositionDelta`</a>, nothing else. Raises <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onpositionchanged">`OnPositionChanged`</a> when the pointer moved.

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#updatepositiondata">`UpdatePositionData(MouseState mouseState)`</a> · Static. The same, with the position of the state passed instead of the mouse's.

| Parameter | Type | Description |
| --- | --- | --- |
| `mouseState` | `MouseState` | The mouse now. Only its position is read, in the view's pixels from its top-left corner. |

<h3 id="updatewheelsdata"><span class="method"><code>UpdateWheelsData()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousemanager-methods" title="UpdateWheelsData() in context on the mouse page" aria-label="UpdateWheelsData() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#updatewheelsdata">`UpdateWheelsData()`</a> · Static. Reads the mouse and updates the two wheels, nothing else. Raises the event of each wheel that turned.

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-manager/#updatewheelsdata">`UpdateWheelsData(MouseState mouseState)`</a> · Static. The same, with the wheel totals of the state passed instead of the mouse's.

| Parameter | Type | Description |
| --- | --- | --- |
| `mouseState` | `MouseState` | The mouse now. Only its two wheel totals are read, running totals as MonoGame keeps them: the deltas are worked out from them. |

## Events

<h3 id="onbuttonsstateschanged"><span class="event"><code>OnButtonsStatesChanged</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousemanager-events" title="OnButtonsStatesChanged in context on the mouse page" aria-label="OnButtonsStatesChanged in context on the mouse page">→</a></h3>

<code>(<a href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">MouseButtonsStates</a> mouseButtonsStates)</code> · Static. A button changed state at an update, at any step: `Idle` to `Pressed`, `Pressed` to `Down`, to `Up`, and back to `Idle`. Raised once per update, after all five buttons have moved.

| Parameter | Type | Description |
| --- | --- | --- |
| `mouseButtonsStates` | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-buttons-states/">`MouseButtonsStates`</a> | The five states after the update, a new snapshot each time. |

<h3 id="onhorizontalwheeldeltachanged"><span class="event"><code>OnHorizontalWheelDeltaChanged</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousemanager-events" title="OnHorizontalWheelDeltaChanged in context on the mouse page" aria-label="OnHorizontalWheelDeltaChanged in context on the mouse page">→</a></h3>

<code>(int delta)</code> · Static. The horizontal wheel turned since the last update. Raised at every update it turns, not only when the amount changes.

| Parameter | Type | Description |
| --- | --- | --- |
| `delta` | `int` | How far it turned: <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#horizontalwheeldelta">`HorizontalWheelDelta`</a>. |

<h3 id="onpositionchanged"><span class="event"><code>OnPositionChanged</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousemanager-events" title="OnPositionChanged in context on the mouse page" aria-label="OnPositionChanged in context on the mouse page">→</a></h3>

<code>(Point newPosition)</code> · Static. The pointer is somewhere new at an update, also at the first update unless it starts at (0, 0). Raised before the wheels and the buttons update, so the buttons still hold their states of the update before.

| Parameter | Type | Description |
| --- | --- | --- |
| `newPosition` | `Point` | The new <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#position">`Position`</a>, in window pixels. |

<h3 id="onwheeldeltachanged"><span class="event"><code>OnWheelDeltaChanged</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousemanager-events" title="OnWheelDeltaChanged in context on the mouse page" aria-label="OnWheelDeltaChanged in context on the mouse page">→</a></h3>

<code>(int delta)</code> · Static. The wheel turned since the last update. Raised at every update it turns, not only when the amount changes.

| Parameter | Type | Description |
| --- | --- | --- |
| `delta` | `int` | How far it turned: <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-status/#wheeldelta">`WheelDelta`</a>. |
