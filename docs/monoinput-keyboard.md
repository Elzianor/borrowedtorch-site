---
layout: docs
legend: [prop, method]
title: "MonoInput: keyboard"
description: Checking a key by its state, Ctrl, Shift and Alt, shortcuts, every key held at once, a key-binding screen, and typed text.
---

<a class="ref" href="/docs/monoinput-glossary/keyboard/keyboard-manager/">`KeyboardManager`</a> reads the keyboard at every update and answers for any key. It knows keys by the `Keys` value
MonoGame names them with, and has no events: game code asks it. Names are colored by what they are: a <span class="kb kb-prop">plain property</span> or a <span class="kb kb-method">method</span>.

## Checking a key

Five methods ask about one key, one per [check](/docs/monoinput-states/#the-five-checks):

```csharp
if (KeyboardManager.IsKeyPressed(Keys.Space)) Jump();     // once, at the press
if (KeyboardManager.IsKeyDown(Keys.Right)) MoveRight();   // every frame the key is held
if (KeyboardManager.IsKeyUp(Keys.E)) ThrowCharged();      // once, at the release
```

The checks read the state the last <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#update">`Update`</a> left, so every check in a frame agrees, wherever it is
made. Until the first update, every key is idle.

<a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeyup">`IsKeyUp`</a> is not MonoGame's `KeyboardState.IsKeyUp`. MonoGame's is true for every key that isn't
held; this one is true only at the update the key was let go. For "not held", use `!IsKeyDown(key)`.

A check looks the key up in the [list of keys being touched](#every-key-held), which holds a few keys at a time, so
checks are cheap and don't allocate.

### KeyboardManager checks

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeyidle">`IsKeyIdle(Keys key)`</a> | Static. The key isn't touched: it isn't in <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a>. |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeypressed">`IsKeyPressed(Keys key)`</a> | Static. The key went down at the last update: true for that update only. |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeydown">`IsKeyDown(Keys key)`</a> | Static. The key is held: `Pressed` or `Down`, the update it went down included, as with MonoGame's `KeyboardState.IsKeyDown`. |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeyup">`IsKeyUp(Keys key)`</a> | Static. The key was let go at the last update: true for that update only. |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeyactive">`IsKeyActive(Keys key)`</a> | Static. The key is pressed, held or just let go: it is in <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a>. |

## Modifiers and shortcuts

<a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#isctrldown">`IsCtrlDown`</a>, <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#isshiftdown">`IsShiftDown`</a> and <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#isaltdown">`IsAltDown`</a> take the left and
the right key as one. Check the modifier with them and the key with <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeypressed">`IsKeyPressed`</a>, so the shortcut
fires once:

```csharp
if (KeyboardManager.IsCtrlDown && KeyboardManager.IsKeyPressed(Keys.S)) Save();

if (KeyboardManager.IsCtrlDown && KeyboardManager.IsKeyPressed(Keys.Z))
{
    if (KeyboardManager.IsShiftDown) Redo();
    else Undo();
}

// S alone, not as part of Ctrl+S
if (KeyboardManager.IsKeyPressed(Keys.S) && !KeyboardManager.IsCtrlDown) MoveBack();
```

The three are Down checks, so they turn false at the update the modifier is let go. Were they Active checks, true at
the release too, Ctrl+S could fire when S goes down at the very update Ctrl comes up.

For one side only, check its key: `KeyboardManager.IsKeyDown(Keys.LeftShift)`.

### KeyboardManager modifier properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#isctrldown">`IsCtrlDown`</a> | `bool` | Static, read-only. Left or right Control is held. False from the update it is let go. |
| <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#isshiftdown">`IsShiftDown`</a> | `bool` | Static, read-only. Left or right Shift is held. False from the update it is let go. |
| <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#isaltdown">`IsAltDown`</a> | `bool` | Static, read-only. Left or right Alt is held. False from the update it is let go. |

## Every key held

<a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a> lists every key that isn't idle: pressed, held or just let go, in the order they were
first pressed. Each item is a <a class="ref" href="/docs/monoinput-glossary/keyboard/key-status/">`KeyStatus`</a> with the <a class="ref prop" href="/docs/monoinput-glossary/keyboard/key-status/#key">`Key`</a> and its <a class="ref prop" href="/docs/monoinput-glossary/states/active-input-status/#state">`State`</a>:

```csharp
// the keys on screen, for a tutorial or a debug overlay
var y = 10;
foreach (var status in KeyboardManager.ActiveKeys)
{
    var color = status.State == ButtonStates.Up ? Color.Gray : Color.White;
    _spriteBatch.DrawString(_font, status.Key.ToString(), new Vector2(10, y), color);
    y += 20;
}
```

The list is a live view, the same object for the whole run, and `foreach` over it doesn't allocate. Don't hold on to a
status: once its key is idle it leaves the list, stays `Up` and is never updated again. The
[button states page](/docs/monoinput-states/#inputs-that-come-and-go) has more on the lists.

How many keys a keyboard reports at once is up to the keyboard: many can't report some combinations of three or more
keys, and the ones they leave out are simply not held, as far as the game can tell.

### KeyboardManager active keys

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a> | <code><a href="/docs/monoinput-glossary/states/active-inputs/">ActiveInputs</a>&lt;<a href="/docs/monoinput-glossary/keyboard/key-status/">KeyStatus</a>&gt;</code> | Static, read-only. Every key that isn't idle, in the order they were first pressed: a live view, the same object for the whole run. |

### KeyStatus members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/keyboard/key-status/#key">`Key`</a> | Read-only `Keys`. The key, as MonoGame names it. |
| <a class="ref prop" href="/docs/monoinput-glossary/states/active-input-status/#state">`State`</a> | Read-only <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a>, from <a class="ref" href="/docs/monoinput-glossary/states/active-input-status/">`ActiveInputStatus<TId>`</a>. `Pressed`, `Down` or `Up`. |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/key-status/#keystatus">`KeyStatus(Keys key)`</a> | A status for the key, `Pressed`. The keyboard manager makes its own; one you create is never updated. |

## A key-binding screen

To let the player choose a key, wait for the next key pressed:

```csharp
// in Update, while the screen waits for the key of "Jump"
foreach (var status in KeyboardManager.ActiveKeys)
{
    if (status.State != ButtonStates.Pressed) continue;

    if (status.Key != Keys.Escape) _bindings.Jump = status.Key; // Escape cancels
    _waitingForKey = false;
    break;
}

// in the game, the key chosen
if (KeyboardManager.IsKeyPressed(_bindings.Jump)) _player.Jump();
```

Start waiting at the frame after the one that opened the screen. In that frame, the key that opened it, such as Enter,
is `Pressed` too, and would be taken as the answer.

For actions with several bindings each, rebinding with conflicts and modifier keys, the `BorrowedTorch.InputBinder`
package builds on this; see the [packages](/kindling/packages/).

## Typed text

<a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a> reports keys, not characters. It doesn't know the keyboard layout, Shift for capitals,
dead keys, or the repeat of a key held down. For a text box, take the characters from MonoGame's `Window.TextInput`
event, which gives them as they were typed, and keep MonoInput for the keys that act, such as Enter to confirm and
Escape to cancel. [BorrowedTorch.UI](/docs/ui/)'s text boxes work that way.

## Updating

<a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#update">`Update`</a> reads the keyboard with `Keyboard.GetState()` and moves every key one step: a key that went
down is added `Pressed`, a held one becomes `Down`, a released one `Up`, and an `Up` one leaves the list. Call it once
per frame, at the top of the game's `Update`. It keeps a buffer for the keys held, so it doesn't allocate once the
buffer fits them.

### KeyboardManager update method

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#update">`Update()`</a> | Static. Reads the keyboard and moves every key one step. Call it once per frame, before anything checks a key: a second call in the same frame moves the keys again, so a key just pressed reads `Down`. |
