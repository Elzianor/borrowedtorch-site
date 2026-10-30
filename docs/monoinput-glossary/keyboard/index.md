---
layout: docs
title: "MonoInput glossary: keyboard"
description: "The keyboard manager and the status of a key, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each class under its name.

| Type | What it is |
| --- | --- |
| [`KeyboardManager`](/docs/monoinput-glossary/keyboard/keyboard-manager/) | Reads the keyboard at every update, or takes a state the game built, and answers for any key: its state, the modifiers, and every key being touched. |
| [`KeyStatus`](/docs/monoinput-glossary/keyboard/key-status/) | One key in <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a>: which key, and its state. |
