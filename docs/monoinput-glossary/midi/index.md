---
layout: docs
title: "MonoInput glossary: MIDI"
description: "The MIDI manager, a MIDI device and the status of a note, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each class under its name.

| Type | What it is |
| --- | --- |
| [`MidiManager`](/docs/monoinput-glossary/midi/midi-manager/) | Finds MIDI input devices, connects to one, and tracks the notes held on it, bringing what Windows reports to the game thread. |
| [`MidiDeviceInfo`](/docs/monoinput-glossary/midi/midi-device-info/) | A MIDI input device: the id to connect with, and the name to show. |
| [`NoteStatus`](/docs/monoinput-glossary/midi/note-status/) | One note in <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a>: which note, and its state. |
