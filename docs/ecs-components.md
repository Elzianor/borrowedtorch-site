---
layout: docs
legend: [method]
title: "ECS: components"
description: Defining components, structs or classes, adding them, reading and writing them in place, how long a reference lasts, removing them, and tags.
---

A component is a piece of plain data attached to an entity: a position, a velocity, a health. An entity has at most
one component of each type, and its components together are all there is to it. The behavior that reads and writes
them belongs in [systems](/docs/ecs-queries/). Names are colored by what they are: a
<span class="kb kb-method">method</span>.

## Defining a component

A component is any type that implements <a class="ref" href="/docs/ecs-glossary/components/i-component/">`IComponent`</a>. The interface has no members: it only marks the type, so
that the world takes it and nothing else. Make components small structs of public fields:

```csharp
using BorrowedTorch.ECS.Components.Base;

public struct Health : IComponent
{
    public int Value;
    public int Max;
}
```

Keep them data only. A method that works out something from the fields is fine; behavior that reaches into other
components or other entities goes into a system.

### Structs or classes

Structs are the right shape for most components. A store keeps its components packed side by side in one array, so
a query walks them in order through memory, and hands each over by reference, without copying it.

Classes work too. The store then keeps references to objects scattered on the heap, which a query walks more slowly,
and every component is an allocation. A class is the better choice for a component that is big, that holds a
collection, or that other code keeps a reference to:

```csharp
// a class component: the store keeps a reference to the object
public sealed class Inventory : IComponent
{
    public List<string> Items { get; } = new();
}

world.AddComponent(player, new Inventory());
world.GetComponent<Inventory>(player).Items.Add("Torch"); // the object itself: no ref needed
```

### The name IComponent

`IComponent` shares its name with `System.ComponentModel.IComponent`, and WPF and WinForms projects import that
namespace by default. Where a file sees both, settle it with an alias:

```csharp
global using IComponent = BorrowedTorch.ECS.Components.Base.IComponent;
```

## Adding

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent`</a> copies the component into its type's store. An entity has at most one component of each
type, so adding one it already has overwrites it:

```csharp
world.AddComponent(player, new Health { Value = 100, Max = 100 });
world.AddComponent(player, new Health { Value = 80, Max = 100 }); // overwrites: one Health per entity
```

The first add of a type creates that type's store. Adding to an entity that isn't alive throws
`InvalidOperationException`, see [handles that outlive their entity](/docs/ecs-entities/#handles-that-outlive-their-entity).

## Reading and writing in place

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent`</a> returns a reference into the store. Take it with `ref` to change the component where it
is stored; without `ref`, the struct is copied, and the change goes to the copy:

```csharp
var copy = world.GetComponent<Health>(player);           // a copy: the store never sees the change
copy.Value -= 25;

ref var health = ref world.GetComponent<Health>(player); // a reference into the store
health.Value -= 25;
```

A copy is fine for reading. `GetComponent` throws `KeyNotFoundException` when the entity has no component of the
type, or isn't alive; where that can happen, ask <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#hascomponent">`HasComponent`</a> first:

```csharp
if (world.HasComponent<Health>(player))
{
    ref var health = ref world.GetComponent<Health>(player);
    health.Value = Math.Min(health.Value + 10, health.Max);
}
```

## How long a reference lasts

A reference from `GetComponent`, like one a query hands over, points into the store's array. It is valid until the
next add or remove of that component type, on any entity, and until any entity with that type is destroyed. An add
may outgrow the array, and the store moves its components to a bigger one; a remove moves the store's last component
into the hole it leaves. Either way, a reference taken before may now write into memory the store no longer reads:

```csharp
ref var health = ref world.GetComponent<Health>(player);

var minion = world.CreateEntity();
world.AddComponent(minion, new Health { Value = 10, Max = 10 }); // may move every Health

health.Value -= 25; // may write into the store's old array: lost
```

Use a reference on the spot, and take it again after any of those calls. Adds and removes of other component types
leave it alone.

## Removing

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#removecomponent">`RemoveComponent`</a> takes a component off an entity. It does nothing when the entity has none of that type,
or isn't alive, so there is no need to ask first. <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#destroyentity">`DestroyEntity`</a> removes all of an entity's components at
once.

```csharp
world.RemoveComponent<Health>(player);
world.RemoveComponent<Health>(player); // nothing to remove: does nothing
```

A removed class component is let go of by its store at once, so the object can be collected as soon as nothing
else holds it.

## Tags

A component with no fields is a tag: the only thing it says is whether an entity has it. Tags mark entities for
systems to pick out or to leave alone:

```csharp
// a tag: no data, only whether an entity has it
public struct Frozen : IComponent
{
}

world.AddComponent(goblin, new Frozen());
world.HasComponent<Frozen>(goblin); // true
```

A query over a tag type visits the tagged entities. To leave tagged entities out of a query over other types, test
for the tag in the callback, see [a fourth type, or one to leave out](/docs/ecs-queries/#a-fourth-type-or-one-to-leave-out).

### ECSWorld component methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent<T>(Entity entity, in T component)`</a> | Copies the component into its type's store, or overwrites the one the entity has. The first add of a type creates the store. Throws `InvalidOperationException` when the entity isn't alive. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent<T>(Entity e)`</a> | A reference to the entity's component, to read and write in place. Valid until the next add or remove of a `T` on any entity. Throws `KeyNotFoundException` when the entity isn't alive or has no `T`. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#hascomponent">`HasComponent<T>(Entity e)`</a> | Whether the entity is alive and has a `T`. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#removecomponent">`RemoveComponent<T>(Entity e)`</a> | Removes the entity's `T`. Does nothing when the entity isn't alive or has none. |

`T` is any type that implements <a class="ref" href="/docs/ecs-glossary/components/i-component/">`IComponent`</a>. Each method has a twin that takes the component type as a
`Type`, for code that knows it only at run time: see the [type-erased access page](/docs/ecs-type-erased/).
