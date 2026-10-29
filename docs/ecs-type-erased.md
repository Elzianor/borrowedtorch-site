---
layout: docs
legend: [method]
title: "ECS: type-erased access"
description: Components by Type for inspectors, editors and save files, boxed copies, declared defaults, and saving and loading a world.
---

Some code knows a component's type only at run time: an inspector that shows whatever an entity has, an editor's
"Add component" menu, a save file, a bridge to a scripting language. For it, the world has a twin of each component
method that takes the type as a `Type` and the component as an `object`. The typed and the type-erased calls share
the same stores, so a component added one way is seen by the other. Names are colored by what they are: a
<span class="kb kb-method">method</span>.

## Listing an entity's components

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponenttypes">`GetComponentTypes`</a> returns the type of every component an entity has, in no particular order, and an
empty list for an entity that isn't alive. It asks every store, so it costs one lookup per component type in the
world, and it builds a new list on every call: it is meant for tools, not for every frame.

```csharp
foreach (var type in world.GetComponentTypes(player))
{
    var value = world.GetComponent(player, type); // boxed: a copy, for a struct

    Console.WriteLine(type.Name);

    foreach (var field in type.GetFields(BindingFlags.Public | BindingFlags.Instance))
        Console.WriteLine($"  {field.Name} = {field.GetValue(value)}");
}
```

## Reading and writing by type

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent(Entity, Type)`</a> returns the component as an `object`. For a struct component that is a boxed
copy: changing it changes the copy, and the store sees the change only once the copy is handed back to
<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent(Entity, Type, object)`</a>, which overwrites the component the entity has:

```csharp
var type = typeof(Health);                   // as an inspector has it: from the list above
var boxed = world.GetComponent(player, type);

type.GetField("Value").SetValue(boxed, 50);  // changes the boxed copy
world.AddComponent(player, type, boxed);     // and this writes it to the store
```

For a class component, the `object` is the component itself, the very object in the store: changes to it are seen
at once, and handing it back changes nothing.

The type-erased calls throw where the typed ones do, and also for a type they can't use:

| Call | Throws |
| --- | --- |
| Any of them, with a `null` type | `ArgumentNullException` |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent`</a> with a type that doesn't implement <a class="ref" href="/docs/ecs-glossary/components/i-component/">`IComponent`</a>, or a component that isn't of the type | `ArgumentException` |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent`</a> without a component, for a type that declares no default and isn't a struct | `ArgumentException` |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent`</a> on an entity that isn't alive | `InvalidOperationException` |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent`</a> when the entity isn't alive or has no component of the type | `KeyNotFoundException` |

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#hascomponent">`HasComponent`</a> is `false` and <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#removecomponent">`RemoveComponent`</a> does nothing for a type no entity has, even one that isn't a
component at all.

## Adding without a value

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent(entity, type)`</a> with no component adds the type's declared default: a public static field or
property named `Default` or `Identity` whose type is the component's own, `Default` first. A struct that declares
neither starts zeroed; a class that declares neither can't be added without a value.

Declare a default wherever zero is the wrong start, such as a scale of zero, a transparent color, or a handle that
would point at the world's first entity:

```csharp
public struct Scale : IComponent
{
    public float X;
    public float Y;

    // a zeroed Scale would shrink the entity to nothing
    public static Scale Identity => new() { X = 1, Y = 1 };
}

world.AddComponent(rock, typeof(Scale));    // Scale.Identity: 1, 1
world.AddComponent(rock, typeof(Position)); // declares no default: zeroed
```

<a class="ref method" href="/docs/ecs-glossary/components/component-defaults/#create">`ComponentDefaults.Create`</a> gives the same starting value without adding it, for a preview or a form that
fills it in first:

```csharp
var preview = (Scale)ComponentDefaults.Create(typeof(Scale)); // the start AddComponent would use
```

A static property is read again on every add, so a `Default` property can return a fresh object for a class
component. A static field is the same object every time: for a class, every entity added that way would share it.

## Saving and loading a world

The type-erased calls are all a save file needs. A save, in JSON with `System.Text.Json`: every saved entity as the
list of its components, each under a name of its type:

```csharp
using System.Text.Json;
using BorrowedTorch.ECS;
using BorrowedTorch.ECS.Entities;

public sealed record SavedComponent(string Type, JsonElement Value);

public sealed record SavedEntity(List<SavedComponent> Components);

public static class WorldSaver
{
    // the component types a save holds, under names that stay the same when the code moves
    private static readonly Dictionary<string, Type> TypesByName = new()
    {
        ["position"] = typeof(Position),
        ["health"] = typeof(Health),
        ["scale"] = typeof(Scale),
    };

    private static readonly Dictionary<Type, string> NamesByType =
        TypesByName.ToDictionary(pair => pair.Value, pair => pair.Key);

    private static readonly JsonSerializerOptions Options = new() { IncludeFields = true };

    public static List<SavedEntity> Save(ECSWorld world, IEnumerable<Entity> entities)
    {
        var saved = new List<SavedEntity>();

        foreach (var entity in entities)
        {
            var components = new List<SavedComponent>();

            foreach (var type in world.GetComponentTypes(entity))
            {
                if (!NamesByType.TryGetValue(type, out var name)) continue; // not saved, such as a cache

                var value = world.GetComponent(entity, type);
                components.Add(new SavedComponent(name, JsonSerializer.SerializeToElement(value, type, Options)));
            }

            saved.Add(new SavedEntity(components));
        }

        return saved;
    }

    public static List<Entity> Load(ECSWorld world, List<SavedEntity> saved)
    {
        var entities = new List<Entity>();

        foreach (var savedEntity in saved)
        {
            var entity = world.CreateEntity();

            foreach (var component in savedEntity.Components)
            {
                var type = TypesByName[component.Type];
                world.AddComponent(entity, type, component.Value.Deserialize(type, Options));
            }

            entities.Add(entity);
        }

        return entities;
    }
}
```

`IncludeFields` lets the serializer see the public fields components are made of. The names in the table, rather
than the types' own names, are part of the save format: a component type can be renamed or moved to another
namespace, and old saves still load. A type left out of the table isn't saved, which suits what the game rebuilds on
its own, such as caches.

The world can't list its entities, so the save takes the ones to save. Keep them in a list as the game creates them,
or give every saved entity a tag and collect them with a query over it. Components that hold handles to other
entities need one more step: see [handles in save files](/docs/ecs-entities/#handles-in-save-files).

### ECSWorld type-erased methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent(Entity entity, Type componentType, object component = null)`</a> | Adds the component, or overwrites the one the entity has. Without a component, adds the type's declared default. Throws `ArgumentNullException` for a `null` type, `InvalidOperationException` when the entity isn't alive, and `ArgumentException` for a type that doesn't implement `IComponent`, a component of another type, or no component for a type with no default that isn't a struct. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent(Entity entity, Type componentType)`</a> | The component as an `object`: a boxed copy for a struct, the object itself for a class. Throws `ArgumentNullException` for a `null` type, and `KeyNotFoundException` when the entity isn't alive or has no component of the type. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponenttypes">`GetComponentTypes(Entity entity)`</a> | The type of every component the entity has, in no particular order, as a new list. Empty for an entity that isn't alive. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#hascomponent">`HasComponent(Entity entity, Type componentType)`</a> | Whether the entity is alive and has a component of the type. Throws `ArgumentNullException` for a `null` type. |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#removecomponent">`RemoveComponent(Entity entity, Type componentType)`</a> | Removes the entity's component of the type. Does nothing when the entity isn't alive or has none. Throws `ArgumentNullException` for a `null` type. |

### ComponentDefaults method

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ecs-glossary/components/component-defaults/#create">`Create(Type componentType)`</a> | Static. The type's declared default, boxed: its public static `Default` or `Identity` of its own type, `Default` first. A zeroed value for a struct that declares neither, and `null` for a class. Throws `ArgumentNullException` for `null`, and `ArgumentException` for a type that doesn't implement `IComponent`. |
