---
layout: docs
legend: [prop, method]
title: "ECS: storage and performance"
description: The sparse sets behind the world, how removal keeps them packed, what each call costs, memory, threads, and a store of your own.
---

The world keeps one store per component type, a <a class="ref" href="/docs/ecs-glossary/components/component-store/">`ComponentStore<T>`</a>, created by the first add of its type.
Each is a sparse set: its components packed into one array with no holes, and a second array that finds any
entity's component in one step. This page is how that works and what it costs; nothing on it is needed to use the
world. Names are colored by what they are: a <span class="kb kb-prop">property</span> or a
<span class="kb kb-method">method</span>; values and fields keep the plain color.

## Sparse sets

A store holds three arrays:

- **The components**, packed from index 0 with no holes: what a query walks.
- **The entities**, at the same indexes: the entity at index 2 owns the component at index 2.
- **The sparse array**, indexed by entity id: where that entity's component sits in the packed arrays, or −1 when
  it has none.

<figure class="shot">
  <img src="{{ '/assets/img/ecs/sparse-set.svg' | relative_url }}" width="640" height="250" alt="A store of Health components. The sparse array, indexed by entity id 0 to 7, holds -1 for ids 0, 2, 4 and 7, and the indexes 1, 0, 3 and 2 for ids 1, 3, 5 and 6. Arrows lead from those four slots to the packed arrays, where the entities 3, 1, 6 and 5 sit at indexes 0 to 3 above their Health components">
  <figcaption>A store of <code>Health</code>. Ids 1, 3, 5 and 6 have one; the sparse array finds each in a step, and the packed arrays hold them with no gaps.</figcaption>
</figure>

So adding, getting, asking and removing each take one step whatever the store holds: the sparse array gives the
index, and the packed arrays are read or written there. An add appends to the end of the packed arrays; adding a
component an entity already has overwrites it where it is.

A store keys on the entity's id alone and knows nothing of generations. The world checks that a handle is alive
before it asks a store anything, see [handles that outlive their entity](/docs/ecs-entities/#handles-that-outlive-their-entity).

## Removing

A removal keeps the packed arrays without holes: the store's last component moves into the place of the removed one,
its entity with it, and the sparse array is pointed at its new index.

<figure class="shot">
  <img src="{{ '/assets/img/ecs/swap-remove.svg' | relative_url }}" width="640" height="190" alt="Removing entity 1's Health from the packed arrays Entity 3, 1, 6, 5. The last pair, entity 5 and its Health, moves into index 1, where entity 1's was, leaving Entity 3, 5, 6 in three slots">
  <figcaption>Removing entity 1's <code>Health</code>: entity 5's moves into its place, and the store is one shorter.</figcaption>
</figure>

That is why the [order of entities](/docs/ecs-queries/#the-order-of-entities) in a query changes, why a reference
lasts only [until the next add or remove](/docs/ecs-components/#how-long-a-reference-lasts) of its type, and why a
query must not [reshape the stores it walks](/docs/ecs-queries/#changing-the-world-during-a-query). A removed class
component's slot is cleared, so the store doesn't keep the object alive.

## Finding a store

The typed calls, `AddComponent<T>`, `GetComponent<T>`, `HasComponent<T>`, `RemoveComponent<T>` and the queries,
find their store through a number the library gives each component type the first time it is used: an array index,
with no `Type` to hash. Only the [type-erased calls](/docs/ecs-type-erased/) look a store up in a dictionary keyed
on `Type`, which is why they cost a few nanoseconds more.

Asking about, or querying, a type no entity has ever had creates no store. Only an add does.

## Queries

A query over one type is a straight loop over the store's packed components. A query over two or three types walks
the store with the fewest components, and looks each of its entities up in the other stores, one sparse lookup per
store. The lookup gives the index into that store's components, so handing over the reference costs nothing more.

So a query costs what its rarest type costs. A query over `Position` and `Boss` in a world of 10,000 positions and 3
bosses visits 3 entities, whichever of the two comes first in the type arguments.

## Memory

| What | Size |
| --- | --- |
| A store's packed arrays | One component and one `Entity` per component in the store, in arrays that double when they fill up, from 16. |
| A store's sparse array | One `int` per id, up to the highest id that ever had a component of the type. It grows to fit that id, at least doubling, from 16. |
| The world's entity arrays | A generation and an alive flag per id, up to the highest id handed out. They double as they grow, from 64. |

No array ever shrinks. Ids stay as low as the most entities alive at once, since freed ids are taken again first,
but a store's sparse array covers every id up to the highest that ever had its type: a rare component on a world
of 100,000 entities may still cost 100,000 `int`s, 400 KB. Once the arrays have grown to what the game needs, the
world allocates nothing more.

## What it costs

Measured with the library's BenchmarkDotNet benchmarks, on a Ryzen 7 5800H under .NET 10, in a world of 100,000
entities with ten component types, at entities picked at random. Expect the same order of size on other hardware, not
the same numbers. The typed calls allocate nothing.

| Operation | Cost |
| --- | --- |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#isentityalive">`IsEntityAlive`</a> | About 1.4 ns |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#hascomponent">`HasComponent<T>`</a> | About 2.6 ns, or 5 ns for a type with no store |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent<T>`</a> | About 4.5 ns for a struct, 8 ns for a class |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent(entity, Type)`</a> | About 13 ns, and a 24-byte box |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent<T>`</a> then <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#removecomponent">`RemoveComponent<T>`</a> | About 9.5 ns for the pair; 23 ns and a box by `Type` |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#destroyentity">`DestroyEntity`</a> then <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#createentity">`CreateEntity`</a>, no components | About 35 ns |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#destroyentity">`DestroyEntity`</a> then <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#createentity">`CreateEntity`</a> and ten adds | About 180 ns |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#query">`Query<T1>`</a>, per entity visited | Under 2 ns |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#query">`Query<T1, T2>`</a>, per entity visited | About 2.5 ns |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#query">`Query<T1, T2, T3>`</a>, per entity visited | About 4 ns |

A destroy costs a little for every component type in the world, entity's or not: it asks each store to remove the
entity.

## Threads

A world isn't thread-safe, not even for reads alone. Give each thread a world of its own, or let one thread at a
time use it, behind a lock. A query can't be split across threads either: hand the work a query collects to other
threads, and apply what comes back on the world's thread.

## A store of your own

A <a class="ref" href="/docs/ecs-glossary/components/component-store/">`ComponentStore<T>`</a> works on its own, too: a packed map from entities to values, outside any world. A
system can keep its private data in one, keyed by the entities it works on, where no other system sees it:

```csharp
using BorrowedTorch.ECS;
using BorrowedTorch.ECS.Components.Base;
using BorrowedTorch.ECS.Components.Store;
using BorrowedTorch.ECS.Entities;

// what the pathfinding system keeps for each entity it moves: nobody else's business
public struct Route : IComponent
{
    public Position[] Waypoints;
    public int Next;
}

public sealed class PathfindingSystem
{
    private readonly ECSWorld _world;
    private readonly ComponentStore<Route> _routes = new();

    public PathfindingSystem(ECSWorld world)
    {
        _world = world;
    }

    public void Send(Entity entity, Position[] waypoints)
    {
        _routes.Set(entity, new Route { Waypoints = waypoints, Next = 0 });
    }

    public void Update()
    {
        var routes = _routes.Components;
        var entities = _routes.Entities;

        for (var i = 0; i < routes.Length; i++)
        {
            ref var route = ref routes[i];

            if (!_world.HasComponent<Position>(entities[i])) continue;

            ref var position = ref _world.GetComponent<Position>(entities[i]);
            position = route.Waypoints[route.Next];
            route.Next = Math.Min(route.Next + 1, route.Waypoints.Length - 1);
        }
    }

    // the store keys on the id alone: forget an entity before its id can come back
    public void Forget(Entity entity)
    {
        _routes.Remove(entity);
    }
}
```

<a class="ref prop" href="/docs/ecs-glossary/components/component-store/#components">`Components`</a> and <a class="ref prop" href="/docs/ecs-glossary/components/component-store/#entities">`Entities`</a> are the packed arrays as spans, index for index, and the
loop over them is what a query does. Unlike the world, the store doesn't check generations: it answers for any
handle with the id. So remove an entity's entry when the entity is destroyed, before a new entity can take its id,
and keep removals out of a loop over the spans.

### ComponentStore members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/ecs-glossary/components/component-store/#count">`Count`</a> | `int`, read-only. How many entities have a component in the store. |
| <a class="ref prop" href="/docs/ecs-glossary/components/component-store/#components">`Components`</a> | `Span<T>`, read-only. The packed components; `Components[i]` belongs to `Entities[i]`. Any add or remove may move them: don't keep the span across one. |
| <a class="ref prop" href="/docs/ecs-glossary/components/component-store/#entities">`Entities`</a> | `ReadOnlySpan<Entity>`, read-only. The entity owning each component, index for index. |
| <a class="ref prop" href="/docs/ecs-glossary/components/component-store/#componenttype">`ComponentType`</a> | `Type`, read-only. Always `typeof(T)`. |
| <a class="ref method" href="/docs/ecs-glossary/components/component-store/#componentstore">`ComponentStore()`</a> | An empty store. |
| <a class="ref method" href="/docs/ecs-glossary/components/component-store/#set">`Set(Entity entity, in T component)`</a> | Adds the entity's component, or overwrites the one it has. Throws `ArgumentOutOfRangeException` for a negative id, such as `Entity.Invalid`'s. |
| <a class="ref method" href="/docs/ecs-glossary/components/component-store/#get">`Get(Entity entity)`</a> | A reference to the entity's component. Throws `KeyNotFoundException` when it has none. |
| <a class="ref method" href="/docs/ecs-glossary/components/component-store/#has">`Has(Entity entity)`</a> | Whether an entity with the id has a component here. |
| <a class="ref method" href="/docs/ecs-glossary/components/component-store/#indexof">`IndexOf(Entity entity)`</a> | Where the entity's component sits in `Components`, or −1. |
| <a class="ref method" href="/docs/ecs-glossary/components/component-store/#remove">`Remove(Entity entity)`</a> | Removes the entity's component, moving the last one into its place. Does nothing when it has none. |

None of them checks generations: they answer for any handle with the entity's id.

### IComponentStore members

<a class="ref" href="/docs/ecs-glossary/components/i-component-store/">`IComponentStore`</a> is the face every store shows to code that doesn't know its `T`: the world's
type-erased calls go through it.

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/ecs-glossary/components/i-component-store/#count">`Count`</a> | `int`, read-only. How many entities have a component in the store. |
| <a class="ref prop" href="/docs/ecs-glossary/components/i-component-store/#componenttype">`ComponentType`</a> | `Type`, read-only. The type of the components the store holds. |
| <a class="ref method" href="/docs/ecs-glossary/components/i-component-store/#has">`Has(Entity e)`</a> | Whether an entity with the id has a component here. |
| <a class="ref method" href="/docs/ecs-glossary/components/i-component-store/#getboxed">`GetBoxed(Entity e)`</a> | The entity's component as an `object`. Throws `KeyNotFoundException` when it has none. |
| <a class="ref method" href="/docs/ecs-glossary/components/i-component-store/#setboxed">`SetBoxed(Entity e, object component)`</a> | Adds or overwrites the entity's component from an `object` of the store's type. Throws `ArgumentException` for anything else, `null` included. |
| <a class="ref method" href="/docs/ecs-glossary/components/i-component-store/#remove">`Remove(Entity e)`</a> | Removes the entity's component, if it has one. |
