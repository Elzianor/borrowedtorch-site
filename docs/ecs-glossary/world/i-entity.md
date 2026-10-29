---
layout: docs
title: "Glossary: IEntity"
description: "What IEntity is and the type that implements it."
---

What an entity handle is: comparable with another <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a>, equal when both the id and the generation are.

An interface that extends `IEquatable<Entity>`, in the namespace `BorrowedTorch.ECS.Entities.Base`. It adds no members of its own: its one member is `IEquatable<Entity>`'s <a class="ref method" href="/docs/ecs-glossary/world/entity/#equals">`Equals(Entity other)`</a>. <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> implements it, and the library takes and returns `Entity` itself everywhere, never `IEntity`, so code rarely names it. The [entities page](/docs/ecs-entities/#comparing-and-printing-handles) shows how handles compare.
