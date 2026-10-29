---
layout: docs
title: "Glossary: IComponent"
description: "What IComponent is and what a component should be."
---

Marks a type as a component: plain data attached to an entity, at most one of each type per entity.

An interface with no members, in the namespace `BorrowedTorch.ECS.Components.Base`. Every component method of <a class="ref" href="/docs/ecs-glossary/world/ecs-world/">`ECSWorld`</a> takes only types that implement it, and so does <a class="ref" href="/docs/ecs-glossary/components/component-store/">`ComponentStore<T>`</a>. Make components small structs of public fields: the stores keep them packed, and queries hand them over by reference. Classes work too, kept as references to objects on the heap. The [components page](/docs/ecs-components/#defining-a-component) shows it in context, with code.

The name is also that of `System.ComponentModel.IComponent`, which WPF and WinForms projects import by default. Where a file sees both, settle it with an alias, see [the name IComponent](/docs/ecs-components/#the-name-icomponent).
