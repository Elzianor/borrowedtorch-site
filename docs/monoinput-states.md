---
layout: docs
legend: [prop, method, event]
title: "MonoInput: button states"
description: The four states every key, button and note goes through, the five checks that read them, and how one frame moves them.
---

Every input MonoInput reports, a key, a mouse button, a pad button or a MIDI note, is in one of four states, and moves
at most one step each time its manager updates. The states are the same for every device, and so are the five checks
that read them. Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## The four states

<a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a> has four values. Two of them last for exactly one update:

<figure class="shot">
  <img src="{{ '/assets/img/monoinput/lifecycle.svg' | relative_url }}" width="640" height="230" alt="A key over nine updates. It is held at updates 2 to 4 and again at update 7. Its state reads Idle, Pressed, Down, Down, Up, Idle, Pressed, Up, Idle. Under it, five rows mark when each check is true: Idle at updates 1, 6 and 9; Pressed at 2 and 7; Down at 2, 3, 4 and 7; Up at 5 and 8; Active from 2 to 5 and at 7 and 8">
  <figcaption>A key held for three updates, then tapped for one. Pressed and Up last one update each, and the Down check is true from the first update the key is held.</figcaption>
</figure>

- **Idle** to **Pressed**: the input went down. `Pressed` is the update a press starts.
- **Pressed** to **Down**: still held at the next update. It stays `Down` for as long as it is held.
- **Pressed** or **Down** to **Up**: let go. `Up` is the update a press ends; an input held for one update only goes
  straight from `Pressed` to `Up`.
- **Up** to **Idle**: nothing at the next update. Or **Up** to **Pressed**, when it is held again by then: a fast
  second press skips `Idle`.

Since `Pressed` and `Up` last one update, code that reacts to them reacts once per press, however long the input is
held.

#### `ButtonStates`

| Value | Meaning |
| --- | --- |
| <a class="ref" href="/docs/monoinput-glossary/states/button-states/#idle">`Idle`</a> | Not touched. Every input starts here, and comes back one update after its release. |
| <a class="ref" href="/docs/monoinput-glossary/states/button-states/#pressed">`Pressed`</a> | Just went down: the first update the input is held. |
| <a class="ref" href="/docs/monoinput-glossary/states/button-states/#down">`Down`</a> | Still held, from the second update on. |
| <a class="ref" href="/docs/monoinput-glossary/states/button-states/#up">`Up`</a> | Just let go: the update after the last one it was held. |

## The five checks

Game code rarely compares states. It asks one of five questions, which every device answers the same way:

| Check | True when | Use it for |
| --- | --- | --- |
| Idle | The input isn't touched. | Waiting for nothing to be held, such as before a key-binding screen listens |
| Pressed | The first update of a press, only. | Things that happen once per press: jumping, firing, opening a menu |
| Down | Every update the input is held, the first one included. | Things that last: walking, aiming, charging a shot |
| Up | The update the input was let go, only. | The end of a press: releasing a charged shot, dropping what was dragged |
| Active | Anything but idle: pressed, held or just let go. | Highlighting a key on screen for as long as anything happens to it |

The Down check covers two states, `Pressed` and `Down`, as MonoGame's own `IsKeyDown` does: a key held for the first
time is already down. For only the updates after the first, compare the state, `State == ButtonStates.Down`.

### The checks on each device

| Check | Keyboard | Mouse and pad buttons | MIDI notes |
| --- | --- | --- | --- |
| Idle | <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeyidle">`IsKeyIdle(key)`</a> | <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#idle">`button.Idle`</a> | not in <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a> |
| Pressed | <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeypressed">`IsKeyPressed(key)`</a> | <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#pressed">`button.Pressed`</a> | `note.State == ButtonStates.Pressed` |
| Down | <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeydown">`IsKeyDown(key)`</a> | <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#down">`button.Down`</a> | `note.State is ButtonStates.Pressed or ButtonStates.Down` |
| Up | <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeyup">`IsKeyUp(key)`</a> | <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#up">`button.Up`</a> | `note.State == ButtonStates.Up` |
| Active | <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeyactive">`IsKeyActive(key)`</a> | <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#active">`button.Active`</a> | in <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a> |

The keyboard's checks are methods that take the key. Mouse and pad buttons are objects with the checks as properties.
MIDI notes come as a list of the notes that aren't idle, each with its state.

## Buttons that are always there

A mouse has five buttons and a pad fifteen, whatever happens, so each of them is one object for the whole run: a
<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-info/">`MouseButtonInfo`</a> or a <a class="ref" href="/docs/monoinput-glossary/gamepads/game-pad-button-info/">`GamePadButtonInfo`</a>, both derived from <a class="ref" href="/docs/monoinput-glossary/states/button-info/">`ButtonInfo`</a>. Its manager changes its state in
place at each update. A reference to a button stays good, and can stand for an action:

```csharp
// chosen once, in the settings
ButtonInfo fireButton = useMouse
    ? MouseManager.MouseStatus.LeftButton
    : GamePadManager.GamePadsStatus[(int)PlayerIndex.One].RightShoulder;

// read every frame, after the managers' updates
if (fireButton.Pressed) _player.Fire();
```

A pad that isn't connected keeps its buttons too, idle, so the reference works before the pad is plugged in.

### ButtonInfo properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#state">`State`</a> | <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a> | Read-only. Where the button is. `Idle` at first; it moves one step at each update of its manager. |
| <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#idle">`Idle`</a> | `bool` | Read-only. `Idle`: not touched. |
| <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#pressed">`Pressed`</a> | `bool` | Read-only. `Pressed`: true for the first update the button is held, only. |
| <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#down">`Down`</a> | `bool` | Read-only. Held: `Pressed` or `Down`, every update the button is held, the first one included. |
| <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#up">`Up`</a> | `bool` | Read-only. `Up`: true for the update the button was let go, only. |
| <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#active">`Active`</a> | `bool` | Read-only. Anything but `Idle`: pressed, held or just let go. |

## Inputs that come and go

A keyboard has over a hundred keys and MIDI 128 notes, but only a few are touched at a time. So the keyboard and MIDI
managers keep a list of the inputs that aren't idle: a status is added to it, `Pressed`, when its input goes down, goes
through `Down` and `Up`, and leaves the list at the update the input would be `Idle`. An input not in the list is idle.

Game code reads the lists through <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a> and <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a>, each an
<a class="ref" href="/docs/monoinput-glossary/states/active-inputs/">`ActiveInputs<TStatus>`</a>: a live, read-only view of the list, in the order the inputs were first pressed. Its items are a
<a class="ref" href="/docs/monoinput-glossary/keyboard/key-status/">`KeyStatus`</a> for a key and a <a class="ref" href="/docs/monoinput-glossary/midi/note-status/">`NoteStatus`</a> for a note, both derived from <a class="ref" href="/docs/monoinput-glossary/states/active-input-status/">`ActiveInputStatus<TId>`</a>, and each with its
<a class="ref prop" href="/docs/monoinput-glossary/states/active-input-status/#state">`State`</a>.

```csharp
foreach (var status in KeyboardManager.ActiveKeys)
{
    if (status.State == ButtonStates.Pressed) Log($"{status.Key} went down");
}
```

A few things follow from the list being live:

- **`foreach` doesn't allocate.** It takes the list's own struct enumerator, so walking the list every frame is free.
  LINQ goes through `IEnumerable<T>` and allocates.
- **Finish a loop before the next update.** `Update` adds and removes statuses, and like any list enumerator, one that
  sees the list change throws `InvalidOperationException`.
- **Keep the key, not the status.** A status is the same object from press to release, its state changing in place.
  Once it leaves the list it stays `Up` and is never updated again, and a new press of the same key gets a new status.

### ActiveInputs members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/states/active-inputs/#count">`Count`</a> | Read-only `int`. How many inputs are active: pressed, held or just let go. |
| <a class="ref method" href="/docs/monoinput-glossary/states/active-inputs/#getenumerator">`GetEnumerator()`</a> | Returns `LinkedList<TStatus>.Enumerator`, a struct, over the statuses in the order their inputs were first pressed. `foreach` calls it. |

### ActiveInputStatus members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/states/active-input-status/#state">`State`</a> | Read-only <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a>. `Pressed`, `Down` or `Up` while the status is in its list, never `Idle`. |
| <a class="ref method" href="/docs/monoinput-glossary/states/active-input-status/#activeinputstatus">`ActiveInputStatus(TId id)`</a> | For derived classes: a status for the input, `Pressed`. |

## What a frame does

1. **The game calls `Update`** on each manager it uses, at the top of its own `Update`.
2. **The manager reads the hardware.** The keyboard, mouse and gamepad managers ask MonoGame for its snapshot, or the
   keyboard and mouse managers take the one the game [handed them](/docs/monoinput/#feeding-your-own-state); the MIDI
   manager takes in what Windows queued since the update before.
3. **Every input moves one step** through the states above.
4. **Events are raised** for what changed, from inside `Update`, see [events](#events).
5. **The game reads the input**: the checks, the statuses, the lists.

The states then hold until the next `Update` of that manager, so `Draw` reads what `Update` read. Three cases follow
from that.

**A press between two updates.** The keyboard, the mouse and the pads are read by polling: a press that starts and
ends between two updates, shorter than a frame, is never seen. MIDI notes come as messages instead, and a note struck
and let go between two updates still reads `Pressed` for one update, then `Up`:

<figure class="shot">
  <img src="{{ '/assets/img/monoinput/short-presses.svg' | relative_url }}" width="640" height="200" alt="Five updates on a time line. A key is tapped between updates 2 and 3: its state reads Idle at all five, so the tap is never seen. A MIDI note is struck between updates 2 and 3: its state reads Idle, Idle, Pressed, Up, Idle">
  <figcaption>The same short press, polled and as messages. Polling sees only what is held at an update.</figcaption>
</figure>

**Two updates in a frame.** With a fixed time step, MonoGame calls `Update` twice before one `Draw` when it falls
behind, and each call is a step for the input. A press seen by the first call is `Down` by `Draw`, so check `Pressed`
and `Up` in `Update`.

**Updates skipped.** A manager that isn't updated holds every state as it was. A key that was `Pressed` stays
`Pressed` for every frame the keyboard isn't updated, so a screen that ignores the input should still update the
managers, and ignore what they say.

## Events

Some managers also raise events, for code that would rather be told than ask. They are raised from inside the
manager's `Update`, on the game thread:

### The events

| Event | Raised when |
| --- | --- |
| <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onbuttonsstateschanged">`MouseManager.OnButtonsStatesChanged`</a> | A mouse button changed state, at any step. Once per update, after all five buttons moved. |
| <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onpositionchanged">`MouseManager.OnPositionChanged`</a> | The pointer moved. |
| <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onwheeldeltachanged">`MouseManager.OnWheelDeltaChanged`</a> | The wheel turned. |
| <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onhorizontalwheeldeltachanged">`MouseManager.OnHorizontalWheelDeltaChanged`</a> | The horizontal wheel turned. |
| <a class="ref event" href="/docs/monoinput-glossary/gamepads/game-pad-manager/#onstatuschanged">`GamePadManager.OnStatusChanged`</a> | Anything about a pad changed: its connection, a button's state, a stick, a trigger. Once per pad per update. |
| <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceschanged">`MidiManager.OnDevicesChanged`</a> | A MIDI device appeared or was removed. |
| <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`MidiManager.OnDeviceSelected`</a> | The MIDI device notes come from was set, or cleared. |

The keyboard has no events: ask it. The button events are raised for every change of state, not only for presses: a
click held for a few frames raises <a class="ref event" href="/docs/monoinput-glossary/mouse/mouse-manager/#onbuttonsstateschanged">`OnButtonsStatesChanged`</a> four times, at `Pressed`, `Down`, `Up` and
`Idle`, so a handler checks the states it gets.

The events are static, so a handler stays subscribed for the whole run, and keeps its object alive. A screen or an
object that subscribes unsubscribes when it goes away.

## Threads

Every public member is for the game thread. The keyboard, the mouse and the pads are read on the thread that calls
their `Update`. MIDI messages and device changes arrive from Windows on threads of its own, but they only wait in a
queue there: <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update`</a> takes them in on the game thread, and raises the MIDI events there.
