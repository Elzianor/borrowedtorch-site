---
layout: docs
legend: [method]
title: "ECS: systems and queries"
description: Writing a system, queries over one to three component types, a fourth type, the order of entities, what can change during a query, and running systems in order.
---

A system is the behavior of the game: a class that asks the world for the entities with the components it works on,
and changes those components, every frame. Asking is a query. The world has queries over one, two and three
component types, and each calls back once per entity that has all of them, with references to its components. Names
are colored by what they are: a <span class="kb kb-method">method</span>.

## Writing a system

A system is any class you mark with <a class="ref" href="/docs/ecs-glossary/world/i-system/">`ISystem`</a>. The interface has no members: what a system's update looks
like, what it is given and when it runs are up to you. Give it the world, and its query callback, made once:

```csharp
public sealed class MovementSystem : ISystem
{
    private readonly ECSWorld _world;
    private readonly ECSWorld.QueryAction<Position, Velocity> _move;
    private float _deltaTime;

    public MovementSystem(ECSWorld world)
    {
        _world = world;
        _move = Move;
    }

    public void Update(float deltaTime)
    {
        _deltaTime = deltaTime;
        _world.Query(_move);
    }

    private void Move(Entity entity, ref Position position, ref Velocity velocity)
    {
        position.X += velocity.X * _deltaTime;
        position.Y += velocity.Y * _deltaTime;
    }
}
```

The callback is a <a class="ref" href="/docs/ecs-glossary/world/query-action/">`QueryAction`</a> kept in a field. Passing `Move` straight to `Query` would make a new
delegate on every call, and so would a lambda that uses the system's fields: one allocation per system per frame.
What the callback needs besides the components, such as the frame time, goes into fields before the query.

## Queries

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#query">`Query`</a> takes one, two or three component types, and calls back once for every entity that has all of
them. The callback gets the entity first, then a reference to each component in the order of the type arguments:

| Query | Callback |
| --- | --- |
| `Query<T1>` | `(Entity entity, ref T1 c1)` |
| `Query<T1, T2>` | `(Entity entity, ref T1 c1, ref T2 c2)` |
| `Query<T1, T2, T3>` | `(Entity entity, ref T1 c1, ref T2 c2, ref T3 c3)` |

Changes made through the references go straight into the stores. An entity that lacks one of the types is skipped,
and a type that no entity has ever had makes the query return at once.

A one-off query can take a lambda. A lambda that captures nothing, neither locals nor the class it is in, is made
once by the compiler and costs nothing to pass again:

```csharp
world.Query((Entity entity, ref Health health) =>
{
    if (health.Value > health.Max) health.Value = health.Max;
});
```

A query over two or three types walks the store with the fewest components and looks each of its entities up in the
others, so it costs what the rarest of its types costs: a query over `Position` and `Boss` visits the bosses, not
every entity with a position. See [queries](/docs/ecs-storage/#queries) on the storage page.

## A fourth type, or one to leave out

For a fourth type, query three and look the fourth up in the callback. Put the rarest types in the query, since it
walks the smallest of their stores. The same test leaves out the entities with a type, such as a
[tag](/docs/ecs-components/#tags):

```csharp
private void Move(Entity entity, ref Position position, ref Velocity velocity)
{
    if (_world.HasComponent<Frozen>(entity)) return; // only entities without a Frozen

    if (_world.HasComponent<Drag>(entity))           // a fourth type, where there is one
    {
        var drag = _world.GetComponent<Drag>(entity);
        var keep = MathF.Max(0, 1 - drag.PerSecond * _deltaTime);
        velocity.X *= keep;
        velocity.Y *= keep;
    }

    position.X += velocity.X * _deltaTime;
    position.Y += velocity.Y * _deltaTime;
}
```

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#hascomponent">`HasComponent`</a> and <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent`</a> each cost one lookup, a few nanoseconds; take the component
with `ref` to change it.

## The order of entities

A query visits entities in no particular order: the order of the store it walks. Removing a component moves the
store's last one into its place, so the order changes as components come and go, and two runs of a game that remove
in a different order visit in a different order. Don't rely on it. Where order matters, such as drawing back to
front, collect the entities in the query and sort them after it.

## Changing the world during a query

A query walks the stores' arrays as they are. Changing the values of components is what queries are for, but
reshaping a store the query is walking breaks the walk: a removal fills the hole with the store's last component,
which the query then skips, and an add may move the store to a bigger array, after which the references the query
hands out write into the old one.

| During a query | Allowed |
| --- | --- |
| Change components through the references | Fine. |
| Read or change other components with <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent`</a> and <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#hascomponent">`HasComponent`</a> | Fine, for any entity and any type. |
| Add or remove components of types the query isn't over | Fine. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#createentity">`CreateEntity`</a> | Fine: a new entity has no components. |
| Add or remove components of a type the query is over, on any entity | Wait until the query returns. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#destroyentity">`DestroyEntity`</a> | Wait until the query returns: destroying removes every component of the entity. |

Collect what has to change in a list, and apply it after the query. Keep the list in a field and clear it after use,
so the system doesn't allocate a new one every frame:

```csharp
public sealed class DeathSystem : ISystem
{
    private readonly ECSWorld _world;
    private readonly ECSWorld.QueryAction<Health> _check;
    private readonly List<Entity> _dying = new();

    public DeathSystem(ECSWorld world)
    {
        _world = world;
        _check = Check;
    }

    public void Update(float deltaTime)
    {
        _world.Query(_check);

        // after the query: the stores are free to change now
        foreach (var entity in _dying)
        {
            _world.RemoveComponent<Health>(entity);
            _world.AddComponent(entity, new Corpse { SecondsLeft = 30 });
        }

        _dying.Clear();
    }

    private void Check(Entity entity, ref Health health)
    {
        if (health.Value <= 0) _dying.Add(entity);
    }
}
```

Adding the `Corpse` inside the query would be fine, since the query isn't over `Corpse`; doing both after it keeps
the change in one place.

## Running systems in order

The world runs no systems. Call them from the game loop, in the order the frame needs: input before movement,
movement before collisions, the camera after what it follows. The plainest way is one call after another, as in the
[field of sparks](/docs/ecs/#a-field-of-sparks). For a list of systems, give them an interface of your own with the
update they share:

```csharp
public interface IUpdateSystem : ISystem
{
    void Update(float deltaTime);
}

var systems = new List<IUpdateSystem>
{
    new InputSystem(world),
    new MovementSystem(world),
    new DeathSystem(world),
};

// every frame
foreach (var system in systems) system.Update(deltaTime);
```

Systems that draw usually want something else, such as a `SpriteBatch`; give them an interface of their own and a
second list, run from the game's `Draw`.

### ECSWorld query methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#query">`Query<T1>(QueryAction<T1> action)`</a> | Calls the action for every entity that has a `T1`, with a reference to the component. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#query">`Query<T1, T2>(QueryAction<T1, T2> action)`</a> | Calls the action for every entity that has both types. Walks the smaller store and looks each entity up in the other. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#query">`Query<T1, T2, T3>(QueryAction<T1, T2, T3> action)`</a> | Calls the action for every entity that has all three types. Walks the smallest store and looks each entity up in the other two. |

Each type is any type that implements <a class="ref" href="/docs/ecs-glossary/components/i-component/">`IComponent`</a>. A query over a type no entity has ever had returns
without calling the action.

### ECSWorld.QueryAction delegates

| Delegate | Description |
| --- | --- |
| <a class="ref" href="/docs/ecs-glossary/world/query-action/">`QueryAction<T1>(Entity e, ref T1 c1)`</a> | The callback of a query over one type: the entity and a reference to its component. |
| <a class="ref" href="/docs/ecs-glossary/world/query-action/">`QueryAction<T1, T2>(Entity e, ref T1 c1, ref T2 c2)`</a> | The callback of a query over two types: the entity and a reference to each component. |
| <a class="ref" href="/docs/ecs-glossary/world/query-action/">`QueryAction<T1, T2, T3>(Entity e, ref T1 c1, ref T2 c2, ref T3 c3)`</a> | The callback of a query over three types: the entity and a reference to each component. |

The delegates are nested in <a class="ref" href="/docs/ecs-glossary/world/ecs-world/">`ECSWorld`</a>: write `ECSWorld.QueryAction<Position, Velocity>`.
