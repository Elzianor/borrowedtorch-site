---
layout: docs
legend: [prop, method, event]
title: "MonoInput: MIDI"
description: Finding MIDI devices, connecting to one, reading the notes held, notes shorter than a frame, unplugging and switching devices, and shutting MIDI down.
---

<a class="ref" href="/docs/monoinput-glossary/midi/midi-manager/">`MidiManager`</a> finds the MIDI input devices plugged into the computer, such as keyboards, pads and controllers,
connects to one, and lists the notes held on it, each with its state like any key or button. Windows reports devices
and notes on threads of its own; the manager keeps them in a queue until its `Update`, so game code sees them on the
game thread. Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

## Finding devices

The manager starts watching Windows for MIDI input devices the first time your code touches it, and
<a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#devices">`Devices`</a> fills in as Windows reports them, during <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update`</a>. So the list is still empty
while the game initializes: rather than reading it once, react to <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceschanged">`OnDevicesChanged`</a>, raised from
`Update` each time a device appears or is removed.

```csharp
MidiManager.OnDevicesChanged += () =>
{
    _deviceList.Items.Clear();
    foreach (var device in MidiManager.Devices) _deviceList.Items.Add(device);
};
```

Each device is a <a class="ref" href="/docs/monoinput-glossary/midi/midi-device-info/">`MidiDeviceInfo`</a>: <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-device-info/#id">`Id`</a> to connect with, and <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-device-info/#name">`Name`</a> to show,
which is also what `ToString()` gives. <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#devices">`Devices`</a> is a new list each time the devices change, so a list
held from before doesn't change under you, and reading it doesn't allocate. Its order means nothing.

### MidiDeviceInfo members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-device-info/#id">`Id`</a> | Read-only `string`. Windows' id for the device, to pass to <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#tryconnecttomididevice">`TryConnectToMidiDevice`</a>. |
| <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-device-info/#name">`Name`</a> | Read-only `string`. The name Windows gives the device, to show to the player. |
| <a class="ref method" href="/docs/monoinput-glossary/midi/midi-device-info/#tostring">`ToString()`</a> | The name, so a device shows by its name in a list or a log. |
| <a class="ref method" href="/docs/monoinput-glossary/midi/midi-device-info/#midideviceinfo">`MidiDeviceInfo(string id, string name)`</a> | A device with the id and the name. The manager makes these from what Windows reports. |

## Connecting

The manager takes notes from one device at a time. <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#tryconnecttomididevice">`TryConnectToMidiDevice`</a> connects to the device with
an id: it closes the device connected before at once, then opens the new one in the background. The outcome comes at a
later <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update`</a>, through <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a>: the device, now in
<a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#selecteddevice">`SelectedDevice`</a>, or `null` when it couldn't be opened.

```csharp
// connect to the first device that shows up
MidiManager.OnDevicesChanged += () =>
{
    if (MidiManager.SelectedDevice == null && MidiManager.Devices.Count > 0)
        _ = MidiManager.TryConnectToMidiDevice(MidiManager.Devices[0].Id);
};

MidiManager.OnDeviceSelected += device =>
    _status.Text = device == null ? "No MIDI device" : $"Playing from {device.Name}";
```

The method returns a `Task`, but there's no need to wait for it: drop it with `_ =`, as above. It ends once the device
is opened, before the outcome reaches the game thread, so <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#selecteddevice">`SelectedDevice`</a> right after an `await` still
reads the device before. Read the outcome in <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a>.

Calling it again before an earlier call is done is fine: only the latest call reports, so a player clicking through a
list of devices ends up on the last one clicked. A device that can't be opened throws no exception: the outcome is
just `null`.

## Notes

<a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a> lists every note that isn't idle, in the order they were first pressed. Each is a
<a class="ref" href="/docs/monoinput-glossary/midi/note-status/">`NoteStatus`</a> with its <a class="ref prop" href="/docs/monoinput-glossary/midi/note-status/#note">`Note`</a>, the MIDI note number from 0 to 127, where 60 is middle C and each step a
semitone, and its <a class="ref prop" href="/docs/monoinput-glossary/states/active-input-status/#state">`State`</a>:

```csharp
// after MidiManager.Update()
foreach (var note in MidiManager.ActiveNotes)
{
    if (note.State == ButtonStates.Pressed) _synth.Start(note.Note);
    else if (note.State == ButtonStates.Up) _synth.Stop(note.Note);
}
```

The list works as the keyboard's does: a live view, `foreach` doesn't allocate, and a status leaves the list once its
note is idle, see [inputs that come and go](/docs/monoinput-states/#inputs-that-come-and-go). An idle note isn't in it,
so "is note 60 held?" is a walk through the few notes that are.

Only note-on and note-off messages are read, and a note-on with a velocity of 0 counts as a note-off, as MIDI has it.
The velocity, the channel, the sustain pedal, pitch bend and the other controllers are not: a note is held or it isn't,
and the same note on two channels is one note.

### NoteStatus members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/midi/note-status/#note">`Note`</a> | Read-only `int`. The MIDI note number, from 0 to 127: 60 is middle C. |
| <a class="ref prop" href="/docs/monoinput-glossary/states/active-input-status/#state">`State`</a> | Read-only <a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a>, from <a class="ref" href="/docs/monoinput-glossary/states/active-input-status/">`ActiveInputStatus<TId>`</a>. `Pressed`, `Down` or `Up`. |
| <a class="ref method" href="/docs/monoinput-glossary/midi/note-status/#notestatus">`NoteStatus(int note)`</a> | A status for the note, `Pressed`. The MIDI manager makes its own; one you create is never updated. |

## Notes shorter than a frame

Unlike keys, notes arrive as messages, and the manager keeps the press of every note-on it gets. A note struck and let
go between two updates, as on a drum pad, still reads `Pressed` at the next update and `Up` at the one after, where a
key tapped as fast would be missed; the [button states page](/docs/monoinput-states/#what-a-frame-does) has a picture.
A note struck again between two updates, while it is still held from before, reads `Pressed` again.

## Unplugging and switching

When the selected device is unplugged, the manager closes it, sets <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#selecteddevice">`SelectedDevice`</a> to `null` and
raises <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a> with `null`, then <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceschanged">`OnDevicesChanged`</a>. Its held notes will never
get their note-off, so the manager lets them go: they read `Up` at that update, as the buttons of a disconnected pad do.

Switching to another device does the same to the notes of the device before, at the next update. To reconnect when
a device comes back, remember its id and look for it when the devices change:

```csharp
MidiManager.OnDeviceSelected += device =>
{
    if (device != null) _lastDeviceId = device.Id;
};

MidiManager.OnDevicesChanged += () =>
{
    if (MidiManager.SelectedDevice != null) return;

    foreach (var device in MidiManager.Devices)
        if (device.Id == _lastDeviceId) _ = MidiManager.TryConnectToMidiDevice(device.Id);
};
```

## Shutting down

Call <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a> once, when the game ends. It raises <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a> with `null` one last
time, removes every handler of both events, empties <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a> at once, without an `Up` update,
closes the device and stops watching for devices. <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#disposed">`Disposed`</a> is then `true`, and every later call does
nothing: the manager is static, so MIDI can't start again in the same run.

```csharp
protected override void UnloadContent()
{
    MidiManager.Dispose();
    base.UnloadContent();
}
```

A game that never touches the manager never starts it, and has nothing to dispose.

## Threads

Windows reports device changes and MIDI messages on threads of its own. The manager only queues them there, and
<a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update`</a> takes them in on the game thread, in this order: device changes, raising
<a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceschanged">`OnDevicesChanged`</a>; connection outcomes, raising <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a>; then the notes, in the
order they came. Then it moves every note one step. Every handler runs on the game thread, and every member is for
the game thread, <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#tryconnecttomididevice">`TryConnectToMidiDevice`</a> included.

A note played while the game isn't updating the manager, during a loading screen, waits in the queue, and arrives at
the next update.

### MidiManager properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#devices">`Devices`</a> | <code>IReadOnlyList&lt;<a href="/docs/monoinput-glossary/midi/midi-device-info/">MidiDeviceInfo</a>&gt;</code> | Static, read-only. The MIDI input devices Windows knows of, as of the last update. A new list each time they change. |
| <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#selecteddevice">`SelectedDevice`</a> | <a class="ref" href="/docs/monoinput-glossary/midi/midi-device-info/">`MidiDeviceInfo`</a> | Static, read-only. The device notes come from, or `null`. |
| <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a> | <code><a href="/docs/monoinput-glossary/states/active-inputs/">ActiveInputs</a>&lt;<a href="/docs/monoinput-glossary/midi/note-status/">NoteStatus</a>&gt;</code> | Static, read-only. Every note that isn't idle, in the order they were first pressed: a live view. |
| <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#disposed">`Disposed`</a> | `bool` | Static, read-only. <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a> has run: the manager does nothing more. |

### MidiManager methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#tryconnecttomididevice">`TryConnectToMidiDevice(string deviceId)`</a> | Static. Closes the device before, opens this one in the background, and reports through <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a> at a later update. Returns a `Task`. |
| <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update()`</a> | Static. Takes in what Windows reported since the update before, raising the events, then moves every note one step. Call it once per frame. |
| <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose()`</a> | Static. Shuts MIDI down for the rest of the run. |

### MidiManager events

| Event | Handler | Raised when |
| --- | --- | --- |
| <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceschanged">`OnDevicesChanged`</a> | `Action` | Static. A device appeared or was removed. From <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update`</a>. |
| <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a> | <code>Action&lt;<a href="/docs/monoinput-glossary/midi/midi-device-info/">MidiDeviceInfo</a>&gt;</code> | Static. <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#selecteddevice">`SelectedDevice`</a> was set: the device after a connection, or `null` after a failed one, a removal, or <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a>. |
