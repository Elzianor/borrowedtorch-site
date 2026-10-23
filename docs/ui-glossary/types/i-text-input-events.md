---
layout: docs
legend: [event]
title: "Glossary: ITextInputEvents"
description: "The members of ITextInputEvents, in alphabetical order."
---

The source of typed text and key presses, for a UI hosted outside a game window.

An interface. The [quick start guide](/docs/ui/#itextinputevents) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Events

<h3 id="onkeydown"><span class="event"><code>OnKeyDown</code></span> <a class="ctx" href="/docs/ui/#itextinputevents" title="OnKeyDown in context on the quick start guide" aria-label="OnKeyDown in context on the quick start guide">🠆</a></h3>

`EventHandler<InputKeyEventArgs>`: a pressed key, sent to the element that has the keyboard and then up to its parents until one handles it.

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | `object` | The source of the input: for <a class="ref" href="/docs/ui-glossary/types/game-window-text-input-events/">`GameWindowTextInputEvents`</a>, the game window it passes on. The UI doesn't use it. |
| `e` | `InputKeyEventArgs` | The pressed key (`Key`). |

<h3 id="ontextinput"><span class="event"><code>OnTextInput</code></span> <a class="ctx" href="/docs/ui/#itextinputevents" title="OnTextInput in context on the quick start guide" aria-label="OnTextInput in context on the quick start guide">🠆</a></h3>

`EventHandler<TextInputEventArgs>`: a typed character, sent to the element that has the keyboard.

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | `object` | The source of the input: for <a class="ref" href="/docs/ui-glossary/types/game-window-text-input-events/">`GameWindowTextInputEvents`</a>, the game window it passes on. The UI doesn't use it. |
| `e` | `TextInputEventArgs` | The typed character (`Character`) and the key that typed it (`Key`). |
