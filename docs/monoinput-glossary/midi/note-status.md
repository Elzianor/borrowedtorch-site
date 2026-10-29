---
layout: docs
legend: [prop, method]
title: "Glossary: NoteStatus"
description: "The members of NoteStatus, in alphabetical order."
---

One note in <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a>: which note, and its state.

A class, in the namespace `BorrowedTorch.MonoInput.Inputs.Midi`. `NoteStatus` derives from [`ActiveInputStatus<int>`](/docs/monoinput-glossary/states/active-input-status/) and has its member too: <a class="ref prop" href="/docs/monoinput-glossary/states/active-input-status/#state">`State`</a>. The [MIDI page](/docs/monoinput-midi/#notestatus-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="note"><span class="prop"><code>Note</code></span> <a class="ctx" href="/docs/monoinput-midi/#notestatus-members" title="Note in context on the MIDI page" aria-label="Note in context on the MIDI page">→</a></h3>

`int` · Read-only. The MIDI note number, from 0 to 127: 60 is middle C, and each step is a semitone.

## Methods

<h3 id="notestatus"><span class="method"><code>NoteStatus()</code></span> <a class="ctx" href="/docs/monoinput-midi/#notestatus-members" title="NoteStatus() in context on the MIDI page" aria-label="NoteStatus() in context on the MIDI page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/midi/note-status/#notestatus">`NoteStatus(int note)`</a> · A status for the note, `Pressed`. The MIDI manager makes its own; one you create is never updated.

| Parameter | Type | Description |
| --- | --- | --- |
| `note` | `int` | The MIDI note number. |
