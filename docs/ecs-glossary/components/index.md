---
layout: docs
title: "ECS glossary: components and stores"
description: "The component interface, the stores behind each component type and the declared defaults, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`IComponent`](/docs/ecs-glossary/components/i-component/) | Marks a type as a component. |
| [`ComponentStore<T>`](/docs/ecs-glossary/components/component-store/) | Every component of one type, packed as a sparse set. |
| [`IComponentStore`](/docs/ecs-glossary/components/i-component-store/) | The face of a store for code that doesn't know its component type. |
| [`ComponentDefaults`](/docs/ecs-glossary/components/component-defaults/) | The starting value of a component added by type without one. |
