---
layout: docs
title: "ECS glossary: world and entities"
description: "The world, its query callbacks, the entity handle and the interfaces of entities and systems, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`ECSWorld`](/docs/ecs-glossary/world/ecs-world/) | Creates and destroys entities, keeps one store per component type, and runs queries. |
| [`ECSWorld.QueryAction`](/docs/ecs-glossary/world/query-action/) | The callbacks of queries over one, two and three component types. |
| [`Entity`](/docs/ecs-glossary/world/entity/) | A handle to an entity: an id, and the generation the id had when the entity was created. |
| [`IEntity`](/docs/ecs-glossary/world/i-entity/) | What an entity handle is: comparable with another, by id and generation. |
| [`ISystem`](/docs/ecs-glossary/world/i-system/) | Marks a type as a system. |
