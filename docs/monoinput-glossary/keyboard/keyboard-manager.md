---
layout: docs
legend: [prop, method]
title: "Glossary: KeyboardManager"
description: "The members of KeyboardManager, in alphabetical order."
---

Reads the keyboard at every update and answers for any key: its state, the modifiers, and every key being touched.

A static class, in the namespace `BorrowedTorch.MonoInput.Inputs.Keyboard`. It has no events: game code asks it. Until the first <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#update">`Update`</a> every key is idle. The [keyboard page](/docs/monoinput-keyboard/#keyboardmanager-checks) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="activekeys"><span class="prop"><code>ActiveKeys</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keyboardmanager-active-keys" title="ActiveKeys in context on the keyboard page" aria-label="ActiveKeys in context on the keyboard page">→</a></h3>

<code><a href="/docs/monoinput-glossary/states/active-inputs/">ActiveInputs</a>&lt;<a href="/docs/monoinput-glossary/keyboard/key-status/">KeyStatus</a>&gt;</code> · Static, read-only. Every key that isn't idle, in the order they were first pressed: a live view, the same object for the whole run.

<h3 id="isaltdown"><span class="prop"><code>IsAltDown</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keyboardmanager-modifier-properties" title="IsAltDown in context on the keyboard page" aria-label="IsAltDown in context on the keyboard page">→</a></h3>

`bool` · Static, read-only. Left or right Alt is held: <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeydown">`IsKeyDown`</a> of either. False from the update Alt is let go.

<h3 id="isctrldown"><span class="prop"><code>IsCtrlDown</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keyboardmanager-modifier-properties" title="IsCtrlDown in context on the keyboard page" aria-label="IsCtrlDown in context on the keyboard page">→</a></h3>

`bool` · Static, read-only. Left or right Control is held: <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeydown">`IsKeyDown`</a> of either. False from the update Control is let go, so Ctrl+S can't fire when S goes down just as Control comes up.

<h3 id="isshiftdown"><span class="prop"><code>IsShiftDown</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keyboardmanager-modifier-properties" title="IsShiftDown in context on the keyboard page" aria-label="IsShiftDown in context on the keyboard page">→</a></h3>

`bool` · Static, read-only. Left or right Shift is held: <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeydown">`IsKeyDown`</a> of either. False from the update Shift is let go.

## Methods

<h3 id="iskeyactive"><span class="method"><code>IsKeyActive()</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keyboardmanager-checks" title="IsKeyActive() in context on the keyboard page" aria-label="IsKeyActive() in context on the keyboard page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeyactive">`IsKeyActive(Keys key)`</a> · Static. The key is pressed, held or just let go: it is in <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `Keys` | The key, as MonoGame names it. |

<h3 id="iskeydown"><span class="method"><code>IsKeyDown()</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keyboardmanager-checks" title="IsKeyDown() in context on the keyboard page" aria-label="IsKeyDown() in context on the keyboard page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeydown">`IsKeyDown(Keys key)`</a> · Static. The key is held: `Pressed` or `Down`, the update it went down included, as with MonoGame's `KeyboardState.IsKeyDown`.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `Keys` | The key, as MonoGame names it. |

<h3 id="iskeyidle"><span class="method"><code>IsKeyIdle()</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keyboardmanager-checks" title="IsKeyIdle() in context on the keyboard page" aria-label="IsKeyIdle() in context on the keyboard page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeyidle">`IsKeyIdle(Keys key)`</a> · Static. The key isn't touched: it isn't in <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `Keys` | The key, as MonoGame names it. |

<h3 id="iskeypressed"><span class="method"><code>IsKeyPressed()</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keyboardmanager-checks" title="IsKeyPressed() in context on the keyboard page" aria-label="IsKeyPressed() in context on the keyboard page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeypressed">`IsKeyPressed(Keys key)`</a> · Static. The key went down at the last update: true for that update only.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `Keys` | The key, as MonoGame names it. |

<h3 id="iskeyup"><span class="method"><code>IsKeyUp()</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keyboardmanager-checks" title="IsKeyUp() in context on the keyboard page" aria-label="IsKeyUp() in context on the keyboard page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeyup">`IsKeyUp(Keys key)`</a> · Static. The key was let go at the last update: true for that update only. Not the same as MonoGame's `KeyboardState.IsKeyUp`, which is true for every key not held.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `Keys` | The key, as MonoGame names it. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keyboardmanager-update-method" title="Update() in context on the keyboard page" aria-label="Update() in context on the keyboard page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#update">`Update()`</a> · Static. Reads the keyboard with `Keyboard.GetState()` and moves every key one step. Call it once per frame, before anything checks a key: a second call in the same frame moves the keys again, so a key just pressed reads `Down`. Doesn't allocate once its buffer fits the keys held.
