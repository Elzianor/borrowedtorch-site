---
layout: docs
title: "Glossary: ISystem"
description: "What ISystem is and what it leaves to you."
---

Marks a type as a system: the behavior that queries the world and changes components.

An interface with no members, in the namespace `BorrowedTorch.ECS.Systems.Base`. It is empty on purpose: what a system's update looks like, what it is given and when it runs are up to the game, and <a class="ref" href="/docs/ecs-glossary/world/ecs-world/">`ECSWorld`</a> runs no systems. Give systems an interface of your own that extends it with the update they share, and call them from the game loop. The [systems and queries page](/docs/ecs-queries/#writing-a-system) shows it in context, with code, and [running systems in order](/docs/ecs-queries/#running-systems-in-order) the interface of your own.
