---
layout: docs
legend: [prop, method]
title: "Glossary: MidiDeviceInfo"
description: "The members of MidiDeviceInfo, in alphabetical order."
---

A MIDI input device: the id to connect with, and the name to show.

A class, in the namespace `BorrowedTorch.MonoInput.Inputs.Midi`. <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#devices">`Devices`</a> lists them. The [MIDI page](/docs/monoinput-midi/#midideviceinfo-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="id"><span class="prop"><code>Id</code></span> <a class="ctx" href="/docs/monoinput-midi/#midideviceinfo-members" title="Id in context on the MIDI page" aria-label="Id in context on the MIDI page">→</a></h3>

`string` · Read-only. Windows' id for the device, to pass to <a class="ref method" href="/docs/monoinput-glossary/midi/midi-manager/#tryconnecttomididevice">`TryConnectToMidiDevice`</a>.

<h3 id="name"><span class="prop"><code>Name</code></span> <a class="ctx" href="/docs/monoinput-midi/#midideviceinfo-members" title="Name in context on the MIDI page" aria-label="Name in context on the MIDI page">→</a></h3>

`string` · Read-only. The name Windows gives the device, to show to the player.

## Methods

<h3 id="midideviceinfo"><span class="method"><code>MidiDeviceInfo()</code></span> <a class="ctx" href="/docs/monoinput-midi/#midideviceinfo-members" title="MidiDeviceInfo() in context on the MIDI page" aria-label="MidiDeviceInfo() in context on the MIDI page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/midi/midi-device-info/#midideviceinfo">`MidiDeviceInfo(string id, string name)`</a> · A device with the id and the name. The manager makes these from what Windows reports.

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | Windows' id for the device. |
| `name` | `string` | Its display name. |

<h3 id="tostring"><span class="method"><code>ToString()</code></span> <a class="ctx" href="/docs/monoinput-midi/#midideviceinfo-members" title="ToString() in context on the MIDI page" aria-label="ToString() in context on the MIDI page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/midi/midi-device-info/#tostring">`ToString()`</a> · The <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-device-info/#name">`Name`</a>, so a device shows by its name in a list or a log.
