---
layout: docs
title: "MonoInput glossary: button states"
description: "The four states, the base of every button, and the lists of active keys and notes, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each class under its name. An enum's page lists its values.

| Type | What it is |
| --- | --- |
| [`ButtonStates`](/docs/monoinput-glossary/states/button-states/) | The four states every key, button and note goes through, one update at a time. |
| [`ButtonInfo`](/docs/monoinput-glossary/states/button-info/) | One button of a set that never changes, a mouse or a pad button: its state and the five checks that read it. |
| [`ActiveInputStatus<TId>`](/docs/monoinput-glossary/states/active-input-status/) | One input in a list of active inputs, a key or a note: its state while it is pressed, held or just let go. |
| [`ActiveInputs<TStatus>`](/docs/monoinput-glossary/states/active-inputs/) | A live, read-only view of a list of active inputs: what <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a> and <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a> are. |
