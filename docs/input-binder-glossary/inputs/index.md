---
layout: docs
title: "Input binder glossary: inputs"
description: "The three inputs, their base, the factories, and the sources, states and modifiers, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each class under its name. An enum's page lists its values.

| Type | What it is |
| --- | --- |
| [`BaseInput`](/docs/input-binder-glossary/inputs/base-input/) | The base of the three inputs: the source, the player number, and equality by identity. |
| [`ButtonInput`](/docs/input-binder-glossary/inputs/button-input/) | A key, a mouse, pad or MIDI button: its id, a key's modifier, and its state this frame. |
| [`OneAxisInput`](/docs/input-binder-glossary/inputs/one-axis-input/) | A single axis, such as a trigger or a wheel: its id and its `float` value this frame. |
| [`TwoAxesInput`](/docs/input-binder-glossary/inputs/two-axes-input/) | A pair of axes, such as a stick: its id and its `Vector2` value this frame. |
| [`InputFactory`](/docs/input-binder-glossary/inputs/input-factory/) | Makes a key, a mouse, pad or MIDI button, or an axis, in a call. |
| [`InputSource`](/docs/input-binder-glossary/inputs/input-source/) | The four kinds of device: keyboard, mouse, gamepad and MIDI. |
| [`ButtonState`](/docs/input-binder-glossary/inputs/button-state/) | The four states of a button: none, pressed, down and up. |
| [`ButtonModifier`](/docs/input-binder-glossary/inputs/button-modifier/) | The modifier of a key binding: none, Shift, Ctrl or Alt. |
