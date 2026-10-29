---
layout: docs
legend: [prop, method]
title: "Glossary: ActiveInputStatus&lt;TId&gt;"
description: "The members of ActiveInputStatus<TId>, in alphabetical order."
---

One input in a list of active inputs, a key or a note: its state while it is pressed, held or just let go.

An abstract class, in the namespace `BorrowedTorch.MonoInput.Inputs`, for a `TId` that names an input. <a class="ref" href="/docs/monoinput-glossary/keyboard/key-status/">`KeyStatus`</a>, with `Keys`, and <a class="ref" href="/docs/monoinput-glossary/midi/note-status/">`NoteStatus`</a>, with `int`, derive from it and give the id a name; the id itself is internal. A status is created `Pressed` when its input goes down, and stays the same object until the input is idle again and the status leaves its list. The [button states page](/docs/monoinput-states/#activeinputstatus-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="state"><span class="prop"><code>State</code></span> <a class="ctx" href="/docs/monoinput-states/#activeinputstatus-members" title="State in context on the button states page" aria-label="State in context on the button states page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/states/button-states/">`ButtonStates`</a> · Read-only. `Pressed`, `Down` or `Up` while the status is in its list, never `Idle`: an idle input has no status. A status out of its list stays `Up` and is no longer updated.

## Methods

<h3 id="activeinputstatus"><span class="method"><code>ActiveInputStatus()</code></span> <a class="ctx" href="/docs/monoinput-states/#activeinputstatus-members" title="ActiveInputStatus() in context on the button states page" aria-label="ActiveInputStatus() in context on the button states page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/states/active-input-status/#activeinputstatus">`ActiveInputStatus(TId id)`</a> · For derived classes: a status for the input, `Pressed`.

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `TId` | The input, such as a key or a note number. |
