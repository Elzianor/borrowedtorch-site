---
layout: docs
legend: [prop, method, event]
title: "Glossary: MidiManager"
description: "The members of MidiManager, in alphabetical order."
---

Finds MIDI input devices, connects to one, and tracks the notes held on it, bringing what Windows reports to the game thread.

A static class, in the namespace `BorrowedTorch.MonoInput.Inputs.Midi`. It starts watching for devices the first time your code touches it, and wants <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a> when the game ends. What Windows reports on its own threads waits in a queue until <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update`</a>, so its events are raised on the game thread. The [MIDI page](/docs/monoinput-midi/#midimanager-methods) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="activenotes"><span class="prop"><code>ActiveNotes</code></span> <a class="ctx" href="/docs/monoinput-midi/#midimanager-properties" title="ActiveNotes in context on the MIDI page" aria-label="ActiveNotes in context on the MIDI page">→</a></h3>

<code><a href="/docs/monoinput-glossary/states/active-inputs/">ActiveInputs</a>&lt;<a href="/docs/monoinput-glossary/midi/note-status/">NoteStatus</a>&gt;</code> · Static, read-only. Every note that isn't idle, in the order they were first pressed: a live view, the same object for the whole run. Empty after <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a>.

<h3 id="devices"><span class="prop"><code>Devices</code></span> <a class="ctx" href="/docs/monoinput-midi/#midimanager-properties" title="Devices in context on the MIDI page" aria-label="Devices in context on the MIDI page">→</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/monoinput-glossary/midi/midi-device-info/">MidiDeviceInfo</a>&gt;</code> · Static, read-only. The MIDI input devices Windows knows of, as of the last <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update`</a>: empty until the first updates after the manager starts. A new list each time the devices change, so a list you hold doesn't change under you; reading it doesn't allocate.

<h3 id="disposed"><span class="prop"><code>Disposed</code></span> <a class="ctx" href="/docs/monoinput-midi/#midimanager-properties" title="Disposed in context on the MIDI page" aria-label="Disposed in context on the MIDI page">→</a></h3>

`bool` · Static, read-only. <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a> has run: the manager does nothing more, for the rest of the process.

<h3 id="selecteddevice"><span class="prop"><code>SelectedDevice</code></span> <a class="ctx" href="/docs/monoinput-midi/#midimanager-properties" title="SelectedDevice in context on the MIDI page" aria-label="SelectedDevice in context on the MIDI page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/midi/midi-device-info/">`MidiDeviceInfo`</a> · Static, read-only. The device notes come from, or `null`. Set when <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a> is raised: after a connection, when the device is removed, and by <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a>.

## Methods

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/monoinput-midi/#midimanager-methods" title="Dispose() in context on the MIDI page" aria-label="Dispose() in context on the MIDI page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose()`</a> · Static. Shuts MIDI down: sets <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#selecteddevice">`SelectedDevice`</a> to `null` and raises <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a> one last time, removes every handler of both events, empties <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a> without an `Up` update, closes the device and stops watching for devices. Later calls do nothing, and the manager can't be started again.

<h3 id="tryconnecttomididevice"><span class="method"><code>TryConnectToMidiDevice()</code></span> <a class="ctx" href="/docs/monoinput-midi/#midimanager-methods" title="TryConnectToMidiDevice() in context on the MIDI page" aria-label="TryConnectToMidiDevice() in context on the MIDI page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#tryconnecttomididevice">`TryConnectToMidiDevice(string deviceId)`</a> · Static. Returns a `Task`. Closes the device connected before, at once, then opens this one in the background. The outcome comes at a later <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update`</a>, through <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a>: the device, or `null` when it couldn't be opened. The task ends before that, so don't read <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#selecteddevice">`SelectedDevice`</a> right after awaiting it. Only the latest call reports. Doesn't throw for a device that can't be opened, and does nothing after <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `deviceId` | `string` | The <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-device-info/#id">`Id`</a> of one of <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#devices">`Devices`</a>. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/monoinput-midi/#midimanager-methods" title="Update() in context on the MIDI page" aria-label="Update() in context on the MIDI page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update()`</a> · Static. Takes in what Windows reported since the update before: device changes first, raising <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceschanged">`OnDevicesChanged`</a>, then connection outcomes, raising <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a>, then notes in the order they came; then moves every note one step. Call it once per frame. Does nothing after <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a>.

## Events

<h3 id="ondeviceschanged"><span class="event"><code>OnDevicesChanged</code></span> <a class="ctx" href="/docs/monoinput-midi/#midimanager-events" title="OnDevicesChanged in context on the MIDI page" aria-label="OnDevicesChanged in context on the MIDI page">→</a></h3>

<code>Action</code> · Static. <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#devices">`Devices`</a> changed: a device appeared or was removed. Raised from <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update`</a>; when the selected device was removed, <a class="ref event" href="/docs/monoinput-glossary/midi/midi-manager/#ondeviceselected">`OnDeviceSelected`</a> comes first.

<h3 id="ondeviceselected"><span class="event"><code>OnDeviceSelected</code></span> <a class="ctx" href="/docs/monoinput-midi/#midimanager-events" title="OnDeviceSelected in context on the MIDI page" aria-label="OnDeviceSelected in context on the MIDI page">→</a></h3>

<code>Action&lt;<a href="/docs/monoinput-glossary/midi/midi-device-info/">MidiDeviceInfo</a>&gt;</code> · Static. <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#selecteddevice">`SelectedDevice`</a> was set, and the handler gets it: the device after a connection, `null` when the connection failed, when the device was removed, and in <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a>. Raised from <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#update">`Update`</a>, or from <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#dispose">`Dispose`</a>.
