---
layout: docs
legend: [prop, method]
title: "Glossary: IComponentStore"
description: "The members of IComponentStore, in alphabetical order."
---

The face of a <a class="ref" href="/docs/ecs-glossary/components/component-store/">`ComponentStore<T>`</a> for code that doesn't know its `T`: the stores of different component types in one collection, and calls that know a component's type only at run time.

An interface, in the namespace `BorrowedTorch.ECS.Components.Base`. The world keeps its stores as `IComponentStore`, and its [type-erased calls](/docs/ecs-type-erased/) go through it. The [storage and performance page](/docs/ecs-storage/#icomponentstore-members) shows it in context. Like the store, it keys on the entity's id alone, without generations.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="componenttype"><span class="prop"><code>ComponentType</code></span> <a class="ctx" href="/docs/ecs-storage/#icomponentstore-members" title="ComponentType in context on the storage and performance page" aria-label="ComponentType in context on the storage and performance page">→</a></h3>

`Type` · Read-only. The type of the components the store holds.

<h3 id="count"><span class="prop"><code>Count</code></span> <a class="ctx" href="/docs/ecs-storage/#icomponentstore-members" title="Count in context on the storage and performance page" aria-label="Count in context on the storage and performance page">→</a></h3>

`int` · Read-only. How many entities have a component in the store.

## Methods

<h3 id="getboxed"><span class="method"><code>GetBoxed()</code></span> <a class="ctx" href="/docs/ecs-storage/#icomponentstore-members" title="GetBoxed() in context on the storage and performance page" aria-label="GetBoxed() in context on the storage and performance page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/i-component-store/#getboxed">`GetBoxed(Entity e)`</a> · The entity's component as an `object`: a boxed copy for a struct, the object itself for a class. Throws `KeyNotFoundException` when the entity has none.

| Parameter | Type | Description |
| --- | --- | --- |
| `e` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity whose component to get. |

<h3 id="has"><span class="method"><code>Has()</code></span> <a class="ctx" href="/docs/ecs-storage/#icomponentstore-members" title="Has() in context on the storage and performance page" aria-label="Has() in context on the storage and performance page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/i-component-store/#has">`Has(Entity e)`</a> · Whether an entity with the id has a component here. Generations aren't checked.

| Parameter | Type | Description |
| --- | --- | --- |
| `e` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity to ask about. |

<h3 id="remove"><span class="method"><code>Remove()</code></span> <a class="ctx" href="/docs/ecs-storage/#icomponentstore-members" title="Remove() in context on the storage and performance page" aria-label="Remove() in context on the storage and performance page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/i-component-store/#remove">`Remove(Entity e)`</a> · Removes the component of the entity with the id, if there is one.

| Parameter | Type | Description |
| --- | --- | --- |
| `e` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity whose component to remove. |

<h3 id="setboxed"><span class="method"><code>SetBoxed()</code></span> <a class="ctx" href="/docs/ecs-storage/#icomponentstore-members" title="SetBoxed() in context on the storage and performance page" aria-label="SetBoxed() in context on the storage and performance page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/i-component-store/#setboxed">`SetBoxed(Entity e, object component)`</a> · Adds or overwrites the entity's component from an `object` of <a class="ref prop" href="/docs/ecs-glossary/components/i-component-store/#componenttype">`ComponentType`</a>. Throws `ArgumentException` for an object of any other type, `null` included, and `ArgumentOutOfRangeException` for a negative id.

| Parameter | Type | Description |
| --- | --- | --- |
| `e` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity whose component to set. |
| `component` | `object` | The component, of the store's type. |
