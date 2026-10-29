---
layout: docs
title: "Input binder glossary: actions"
description: "The three actions, their base and their shapes, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each class under its name. An enum's page lists its values.

| Type | What it is |
| --- | --- |
| [`BaseAction`](/docs/input-binder-glossary/actions/base-action/) | The base of the three actions: a name, a description and a representation. |
| [`ButtonAction`](/docs/input-binder-glossary/actions/button-action/) | An action driven by a button: its callback gets the <a class="ref" href="/docs/input-binder-glossary/inputs/button-state/">`ButtonState`</a> and the player. |
| [`OneAxisAction`](/docs/input-binder-glossary/actions/one-axis-action/) | An action driven by a single axis: its callback gets the `float` value and the player. |
| [`TwoAxesAction`](/docs/input-binder-glossary/actions/two-axes-action/) | An action driven by a pair of axes: its callback gets the `Vector2` value of `System.Numerics` and the player. |
| [`InputType`](/docs/input-binder-glossary/actions/input-type/) | The three shapes, button, one axis and two axes, that an input and its action share. |
