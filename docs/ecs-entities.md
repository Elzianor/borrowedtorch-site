---
layout: docs
legend: [prop, method]
title: "ECS: entities"
description: Creating and destroying entities, ids and generations, handles that outlive their entity, "no entity", entities that point at entities, and handles in save files.
---

An entity is a handle: an <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a>, a struct of two `int`s, an id and a generation. It holds no data. Its
components are in the world's stores, filed under its id, and the generation tells this entity apart from the ones
that had the id before it. Names are colored by what they are: a <span class="kb kb-prop">property</span> or a
<span class="kb kb-method">method</span>; values and fields keep the plain color.

## Creating and destroying

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#createentity">`CreateEntity`</a> returns a new entity with no components. <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#destroyentity">`DestroyEntity`</a> removes every
component it has, ends every handle to it and frees its id for a later entity.

```csharp
var world = new ECSWorld();

var goblin = world.CreateEntity();    // Entity(0:gen.0)
world.AddComponent(goblin, new Health { Value = 30 });

world.DestroyEntity(goblin);          // its Health goes with it, and id 0 is free again
world.DestroyEntity(goblin);          // does nothing: it is gone already

var bat = world.CreateEntity();       // Entity(0:gen.1): id 0 again, under a new generation

world.IsEntityAlive(goblin);          // false
world.IsEntityAlive(bat);             // true
world.HasComponent<Health>(bat);      // false: nothing of the goblin carries over
```

An entity is alive from `CreateEntity` until `DestroyEntity`, and only the very handle `CreateEntity` returned
refers to it. Destroying an entity that isn't alive does nothing, so a second destroy, or one through an old handle,
is harmless.

## Ids and generations

Ids are small numbers, from 0 up, and they index the arrays of the stores. A destroyed entity's id goes back to the
world, and the next `CreateEntity` takes it again, the most recently freed id first; only when none is free does the
world count up to a new one. So the ids of a world stay as low as the most entities it ever held at once.

Each id has a generation, 0 when the id is first handed out and one more each time an entity holding it is
destroyed. A handle carries the generation its id had when the entity was created, and it is alive only while the
two still match:

<figure class="shot">
  <img src="{{ '/assets/img/ecs/generations.svg' | relative_url }}" width="640" height="210" alt="A timeline of id 3: a goblin is created as Entity(3:gen.0) and destroyed, which makes the id's generation 1; a bat then gets Entity(3:gen.1). A handle to the goblin kept from before is still Entity(3:gen.0), which no longer matches, so it is not alive and never reaches the bat's components">
  <figcaption>One id, two entities. The old handle keeps its generation, 0, while the id has moved on to 1.</figcaption>
</figure>

That is what makes it safe to keep handles. Without the generation, a handle to the goblin would read the bat's
components once the bat had taken its id.

## Handles that outlive their entity

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#isentityalive">`IsEntityAlive`</a> says whether a handle still refers to an entity. Every other call of the world checks it
too, before it touches a store, so a stale handle never reaches the components of whatever entity owns its id now:

| Call on a handle that isn't alive | Result |
| --- | --- |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#hascomponent">`HasComponent`</a> | `false` |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent`</a> | Throws `KeyNotFoundException`. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent`</a> | Throws `InvalidOperationException`. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#removecomponent">`RemoveComponent`</a>, <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#destroyentity">`DestroyEntity`</a> | Do nothing. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponenttypes">`GetComponentTypes`</a> | An empty list. |

A handle the world never handed out isn't alive either, whatever id and generation it is made of: the world keeps a
flag for each id that says whether an entity holds it right now, and checks the flag with the generation.

## No entity

Use <a class="ref" href="/docs/ecs-glossary/world/entity/#invalid">`Entity.Invalid`</a> for "no entity", in a field that may point at nothing or a method that may find
nothing. Its id is −1, so it is never alive in any world.

`default(Entity)` can't stand in for it. It is id 0 at generation 0: not alive in an empty world, but exactly the
handle the world's first entity gets. From then on, an `Entity` field that was never set points at that entity:

```csharp
var world = new ECSWorld();
Entity target = default;          // meant as "no target yet"

world.IsEntityAlive(target);      // false, for now
var first = world.CreateEntity(); // Entity(0:gen.0)
world.IsEntityAlive(target);      // true: target is the first entity
```

So set `Entity` fields to `Entity.Invalid` when they are made, and give a component with a handle in it a
[declared default](/docs/ecs-type-erased/#adding-without-a-value) that does the same.

<a class="ref prop" href="/docs/ecs-glossary/world/entity/#isvalid">`IsValid`</a> is `false` only for a negative id, such as `Entity.Invalid`'s. It doesn't mean alive: a valid handle may
belong to an entity destroyed long ago, and only the world can tell.

## Entities that point at entities

A handle can be kept anywhere: in a component that points at a target or a parent, in a list, as a dictionary key.
Before following one, ask the world whether it is still alive. Here an arrow keeps the handle of what it flies at:

```csharp
// a handle to another entity, kept in a component
public struct Target : IComponent
{
    public Entity Value;

    // a Target added by type starts at "no entity", not at the world's first entity
    public static readonly Target Default = new() { Value = Entity.Invalid };
}

public sealed class HomingSystem : ISystem
{
    private const float Speed = 3;

    private readonly ECSWorld _world;
    private readonly ECSWorld.QueryAction<Position, Velocity, Target> _steer;

    public HomingSystem(ECSWorld world)
    {
        _world = world;
        _steer = Steer;
    }

    public void Update()
    {
        _world.Query(_steer);
    }

    private void Steer(Entity entity, ref Position position, ref Velocity velocity, ref Target target)
    {
        // false for a target destroyed since it was chosen, and for Entity.Invalid
        if (!_world.HasComponent<Position>(target.Value))
        {
            target.Value = Entity.Invalid;
            velocity = default;
            return;
        }

        var goal = _world.GetComponent<Position>(target.Value); // a copy: reading is all it takes
        var dx = goal.X - position.X;
        var dy = goal.Y - position.Y;
        var distance = MathF.Sqrt(dx * dx + dy * dy);

        if (distance < 0.01f) return;

        velocity.X = dx / distance * Speed;
        velocity.Y = dy / distance * Speed;
    }
}
```

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#hascomponent">`HasComponent`</a> answers both questions at once: whether the target is alive, and whether it has a
position to fly at. Reading another entity's components inside a query is fine; adding or removing them may not be,
see [changing the world during a query](/docs/ecs-queries/#changing-the-world-during-a-query).

## Handles in save files

A handle means something only to the world that handed it out. A world built from a save file creates its entities
anew, with ids and generations of its own, so a saved handle can't be used as it is. Save an entity's id as the name
it goes by in the file, and when loading, create every entity first, then turn each saved id into the new handle:

```csharp
// one new entity per saved id, all made before any component is read
var entities = new Dictionary<int, Entity>();
foreach (var saved in save.Entities) entities[saved.Id] = world.CreateEntity();

// then a saved handle is read back through its id
Entity Resolve(int savedId) => entities.TryGetValue(savedId, out var entity) ? entity : Entity.Invalid;
```

The id is enough within one save: no two living entities share one. A saved target that pointed at an entity that
wasn't saved resolves to `Entity.Invalid`. The [type-erased access page](/docs/ecs-type-erased/#saving-and-loading-a-world)
has a whole save and load.

## Comparing and printing handles

Two handles are equal when their ids and their generations are: `==`, `!=` and
<a class="ref method" href="/docs/ecs-glossary/world/entity/#equals">`Equals`</a> all compare both, and <a class="ref method" href="/docs/ecs-glossary/world/entity/#gethashcode">`GetHashCode`</a> hashes both, so an `Entity` works as a
key of a `Dictionary` or in a `HashSet`. A handle of a destroyed entity and the handle of the entity that got its
id are not equal. <a class="ref method" href="/docs/ecs-glossary/world/entity/#tostring">`ToString`</a> gives `Entity(3:gen.1)`, the id then the generation.

### ECSWorld entity methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#createentity">`CreateEntity()`</a> | A new entity with no components. Takes the most recently freed id when there is one, under that id's new generation, or else the next new id. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#destroyentity">`DestroyEntity(Entity entity)`</a> | Removes every component of the entity, ends every handle to it and frees its id. Does nothing for an entity that isn't alive. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#isentityalive">`IsEntityAlive(Entity entity)`</a> | Whether the handle refers to a live entity: one this world created and hasn't destroyed since. `false` for a handle the world never handed out. |

### Entity members

| Member | Description |
| --- | --- |
| <a class="ref" href="/docs/ecs-glossary/world/entity/#id">`Id`</a> | `int`, read-only field. Where the entity's components are filed in the stores. |
| <a class="ref" href="/docs/ecs-glossary/world/entity/#generation">`Generation`</a> | `int`, read-only field. The generation the id had when the entity was created. |
| <a class="ref" href="/docs/ecs-glossary/world/entity/#invalid">`Invalid`</a> | Static, read-only field. A handle that never refers to an entity: id −1, generation 0. |
| <a class="ref prop" href="/docs/ecs-glossary/world/entity/#isvalid">`IsValid`</a> | `bool`, read-only. `false` for a negative id such as `Invalid`'s. `true` doesn't mean alive. |
| <a class="ref method" href="/docs/ecs-glossary/world/entity/#entity">`Entity(int id, int generation)`</a> | A handle made of the two numbers. It is alive only if the world handed out exactly that handle. |
| <a class="ref method" href="/docs/ecs-glossary/world/entity/#equality-operators">`==`</a>, `!=`, <a class="ref method" href="/docs/ecs-glossary/world/entity/#equals">`Equals`</a> | Equal when both the id and the generation are. |
| <a class="ref method" href="/docs/ecs-glossary/world/entity/#gethashcode">`GetHashCode()`</a> | A hash of the id and the generation. |
| <a class="ref method" href="/docs/ecs-glossary/world/entity/#tostring">`ToString()`</a> | `Entity(id:gen.generation)`, such as `Entity(3:gen.1)`. |
