---
layout: docs
legend: [method]
title: "Glossary: ECSWorld"
description: "The methods of ECSWorld, in alphabetical order."
---

The entry point of the ECS: creates and destroys entities, keeps one store per component type, and runs queries. Systems talk only to the world.

A sealed class. The [quick start guide](/docs/ecs/#a-first-world) shows it in context, with code. It isn't thread-safe: see [threads](/docs/ecs-storage/#threads). The callbacks of its queries are its nested [`QueryAction`](/docs/ecs-glossary/world/query-action/) delegates.

Names are colored by what they are: a <span class="kb kb-method">method</span>.

## Methods

<h3 id="ecsworld"><span class="method"><code>ECSWorld()</code></span> <a class="ctx" href="/docs/ecs/#ecsworld-constructor" title="ECSWorld() in context on the quick start guide" aria-label="ECSWorld() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#ecsworld">`ECSWorld()`</a> · Creates an empty world: no entities and no stores. The store of a component type is created by the first add of that type.

<h3 id="addcomponent"><span class="method"><code>AddComponent()</code></span> <a class="ctx" href="/docs/ecs-components/#ecsworld-component-methods" title="AddComponent() in context on the components page" aria-label="AddComponent() in context on the components page">→</a></h3>

<span class="method"><code><a href="/docs/ecs-glossary/world/ecs-world/#addcomponent">AddComponent</a>&lt;T&gt;(<a href="/docs/ecs-glossary/world/entity/">Entity</a> entity, in T component)</code></span> · Copies the component into its type's store, or overwrites the one the entity has: an entity has at most one component of each type. The first add of a type creates its store. Throws `InvalidOperationException` when the entity isn't alive.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity to add to. Must be alive. |
| `component` | `T` | The component. `T` is any type that implements <a class="ref" href="/docs/ecs-glossary/components/i-component/">`IComponent`</a>. |

<span class="method"><code><a href="/docs/ecs-glossary/world/ecs-world/#addcomponent">AddComponent</a>(<a href="/docs/ecs-glossary/world/entity/">Entity</a> entity, Type componentType, object component = null)</code></span> · The same, for a type known only at run time. Without a component, adds the type's declared default (see <a class="ref" href="/docs/ecs-glossary/components/component-defaults/">`ComponentDefaults`</a>). Throws `ArgumentNullException` for a `null` type, `InvalidOperationException` when the entity isn't alive, and `ArgumentException` for a type that doesn't implement `IComponent`, a component that isn't of the type, or no component for a type that declares no default and isn't a struct. A rejected add creates no store.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity to add to. Must be alive. |
| `componentType` | `Type` | The component's type. Must implement <a class="ref" href="/docs/ecs-glossary/components/i-component/">`IComponent`</a>. |
| `component` | `object` | The component, of that type, or `null` for the type's declared default. Default: `null`. |

<h3 id="createentity"><span class="method"><code>CreateEntity()</code></span> <a class="ctx" href="/docs/ecs-entities/#ecsworld-entity-methods" title="CreateEntity() in context on the entities page" aria-label="CreateEntity() in context on the entities page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#createentity">`CreateEntity()`</a> · A new entity with no components, as an <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> handle. Takes the most recently freed id when there is one, under that id's new generation, so handles to the entity that had it stay dead; otherwise the next new id, from 0 up.

<h3 id="destroyentity"><span class="method"><code>DestroyEntity()</code></span> <a class="ctx" href="/docs/ecs-entities/#ecsworld-entity-methods" title="DestroyEntity() in context on the entities page" aria-label="DestroyEntity() in context on the entities page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#destroyentity">`DestroyEntity(Entity entity)`</a> · Removes every component of the entity, moves its id's generation on, so every handle to it stops being alive, and frees the id for a later entity. Does nothing for an entity that isn't alive. Not to be called during a query, see [changing the world during a query](/docs/ecs-queries/#changing-the-world-during-a-query).

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity to destroy. |

<h3 id="getcomponent"><span class="method"><code>GetComponent()</code></span> <a class="ctx" href="/docs/ecs-components/#ecsworld-component-methods" title="GetComponent() in context on the components page" aria-label="GetComponent() in context on the components page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponent">`GetComponent<T>(Entity e)`</a> · Returns `ref T`: a reference to the entity's component, to read and write in place. It stays valid until the next add or remove of a `T` on any entity, see [how long a reference lasts](/docs/ecs-components/#how-long-a-reference-lasts). Throws `KeyNotFoundException` when the entity isn't alive or has no `T`.

| Parameter | Type | Description |
| --- | --- | --- |
| `e` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity whose component to get. |

<span class="method"><code><a href="/docs/ecs-glossary/world/ecs-world/#getcomponent">GetComponent</a>(<a href="/docs/ecs-glossary/world/entity/">Entity</a> entity, Type componentType)</code></span> · The same, for a type known only at run time: the component as an `object`. For a struct that is a boxed copy, and changes to it reach the store only when it is handed back to <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`AddComponent`</a>; for a class it is the object in the store. Throws `ArgumentNullException` for a `null` type, and `KeyNotFoundException` when the entity isn't alive or has no component of the type.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity whose component to get. |
| `componentType` | `Type` | The component's type. |

<h3 id="getcomponenttypes"><span class="method"><code>GetComponentTypes()</code></span> <a class="ctx" href="/docs/ecs-type-erased/#ecsworld-type-erased-methods" title="GetComponentTypes() in context on the type-erased access page" aria-label="GetComponentTypes() in context on the type-erased access page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#getcomponenttypes">`GetComponentTypes(Entity entity)`</a> · Returns `IReadOnlyList<Type>`: the type of every component the entity has, in no particular order, as a new list. Empty for an entity that isn't alive. Asks every store of the world.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity whose component types to list. |

<h3 id="hascomponent"><span class="method"><code>HasComponent()</code></span> <a class="ctx" href="/docs/ecs-components/#ecsworld-component-methods" title="HasComponent() in context on the components page" aria-label="HasComponent() in context on the components page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#hascomponent">`HasComponent<T>(Entity e)`</a> · Whether the entity is alive and has a `T`. Asking about a type no entity has ever had creates no store.

| Parameter | Type | Description |
| --- | --- | --- |
| `e` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity to ask about. |

<span class="method"><code><a href="/docs/ecs-glossary/world/ecs-world/#hascomponent">HasComponent</a>(<a href="/docs/ecs-glossary/world/entity/">Entity</a> entity, Type componentType)</code></span> · The same, for a type known only at run time. Throws `ArgumentNullException` for a `null` type.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity to ask about. |
| `componentType` | `Type` | The component's type. |

<h3 id="isentityalive"><span class="method"><code>IsEntityAlive()</code></span> <a class="ctx" href="/docs/ecs-entities/#ecsworld-entity-methods" title="IsEntityAlive() in context on the entities page" aria-label="IsEntityAlive() in context on the entities page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#isentityalive">`IsEntityAlive(Entity entity)`</a> · Whether the handle refers to a live entity: one this world created and hasn't destroyed since. `false` for a handle the world never handed out, whatever its id and generation, `default(Entity)` included until the first entity is created.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The handle to check. |

<h3 id="query"><span class="method"><code>Query()</code></span> <a class="ctx" href="/docs/ecs-queries/#ecsworld-query-methods" title="Query() in context on the systems and queries page" aria-label="Query() in context on the systems and queries page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#query">`Query<T1>(QueryAction<T1> action)`</a> · Calls the action for every entity that has a `T1`, with a reference to the component to change it in place. Entities come in the order of the store. Returns at once for a type no entity has ever had.

| Parameter | Type | Description |
| --- | --- | --- |
| `action` | <a class="ref" href="/docs/ecs-glossary/world/query-action/">`QueryAction<T1>`</a> | Called once per entity. Keep it in a field rather than making it on every call. |

<span class="method"><code><a href="/docs/ecs-glossary/world/ecs-world/#query">Query</a>&lt;T1, T2&gt;(<a href="/docs/ecs-glossary/world/query-action/">QueryAction</a>&lt;T1, T2&gt; action)</code></span> · Calls the action for every entity that has both types. Walks the smaller of the two stores and looks each of its entities up in the other.

| Parameter | Type | Description |
| --- | --- | --- |
| `action` | <a class="ref" href="/docs/ecs-glossary/world/query-action/">`QueryAction<T1, T2>`</a> | Called once per entity, with references to both components. |

<span class="method"><code><a href="/docs/ecs-glossary/world/ecs-world/#query">Query</a>&lt;T1, T2, T3&gt;(<a href="/docs/ecs-glossary/world/query-action/">QueryAction</a>&lt;T1, T2, T3&gt; action)</code></span> · Calls the action for every entity that has all three types. Walks the smallest of the three stores and looks each of its entities up in the other two.

| Parameter | Type | Description |
| --- | --- | --- |
| `action` | <a class="ref" href="/docs/ecs-glossary/world/query-action/">`QueryAction<T1, T2, T3>`</a> | Called once per entity, with references to the three components. |

Inside the action, change components through the references, but don't add or remove components of the queried types or destroy entities: see [changing the world during a query](/docs/ecs-queries/#changing-the-world-during-a-query).

<h3 id="removecomponent"><span class="method"><code>RemoveComponent()</code></span> <a class="ctx" href="/docs/ecs-components/#ecsworld-component-methods" title="RemoveComponent() in context on the components page" aria-label="RemoveComponent() in context on the components page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#removecomponent">`RemoveComponent<T>(Entity e)`</a> · Removes the entity's `T`, moving the store's last component into its place. Does nothing when the entity isn't alive or has none.

| Parameter | Type | Description |
| --- | --- | --- |
| `e` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity to remove from. |

<span class="method"><code><a href="/docs/ecs-glossary/world/ecs-world/#removecomponent">RemoveComponent</a>(<a href="/docs/ecs-glossary/world/entity/">Entity</a> entity, Type componentType)</code></span> · The same, for a type known only at run time. Throws `ArgumentNullException` for a `null` type.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity to remove from. |
| `componentType` | `Type` | The component's type. |
