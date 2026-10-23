---
layout: docs
legend: [method, event]
title: "Glossary: GameWindowTextInputEvents"
description: "The members of GameWindowTextInputEvents, in alphabetical order."
---

An <a class="ref" href="/docs/ui-glossary/types/i-text-input-events/">`ITextInputEvents`</a> that forwards a MonoGame window's events. The window constructor of <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/">`BorrowedTorchUI`</a> creates and disposes one itself.

A class. The [quick start guide](/docs/ui/#gamewindowtextinputevents) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Methods

<h3 id="gamewindowtextinputevents"><span class="method"><code>GameWindowTextInputEvents()</code></span> <a class="ctx" href="/docs/ui/#gamewindowtextinputevents" title="GameWindowTextInputEvents() in context on the quick start guide" aria-label="GameWindowTextInputEvents() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/game-window-text-input-events/#gamewindowtextinputevents">`GameWindowTextInputEvents(GameWindow window)`</a> · Subscribes to the window's `TextInput` and `KeyDown` events.

| Parameter | Type | Description |
| --- | --- | --- |
| `window` | `GameWindow` | The window whose `TextInput` and `KeyDown` events are followed. |

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/ui/#gamewindowtextinputevents" title="Dispose() in context on the quick start guide" aria-label="Dispose() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/game-window-text-input-events/#dispose">`Dispose()`</a> · Unsubscribes from the window.

## Events

<h3 id="onkeydown"><span class="event"><code>OnKeyDown</code></span></h3>

`EventHandler<InputKeyEventArgs>`

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | `object` | The game window, passed on from its `KeyDown` event. |
| `e` | `InputKeyEventArgs` | The pressed key (`Key`), from the window's `KeyDown` event. |

<h3 id="ontextinput"><span class="event"><code>OnTextInput</code></span></h3>

`EventHandler<TextInputEventArgs>`

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | `object` | The game window, passed on from its `TextInput` event. |
| `e` | `TextInputEventArgs` | The typed character (`Character`) and the key that typed it (`Key`), from the window's `TextInput` event. |
