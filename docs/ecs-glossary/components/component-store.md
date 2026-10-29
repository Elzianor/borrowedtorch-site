---
layout: docs
legend: [prop, method]
title: "Glossary: ComponentStore&lt;T&gt;"
description: "The members of ComponentStore<T>, in alphabetical order."
---

Every component of one type, as a sparse set: the components packed into one array with no holes, the entity owning each at the same index of a second array, and a sparse array indexed by entity id that points into both. Adding, getting, asking and removing each take one step.

A sealed class, for any `T` that implements <a class="ref" href="/docs/ecs-glossary/components/i-component/">`IComponent`</a>; it implements <a class="ref" href="/docs/ecs-glossary/components/i-component-store/">`IComponentStore`</a>, whose `GetBoxed` and `SetBoxed` are reached through that interface. The world keeps one per component type and doesn't hand them out; a store of your own works outside any world. The [storage and performance page](/docs/ecs-storage/#a-store-of-your-own) shows it in context, with code.

A store keys on <a class="ref" href="/docs/ecs-glossary/world/entity/#id">`Entity.Id`</a> alone and knows nothing of generations: every member answers for any handle with the id, alive or not.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="componenttype"><span class="prop"><code>ComponentType</code></span> <a class="ctx" href="/docs/ecs-storage/#componentstore-members" title="ComponentType in context on the storage and performance page" aria-label="ComponentType in context on the storage and performance page">→</a></h3>

`Type` · Read-only. Always `typeof(T)`. From <a class="ref" href="/docs/ecs-glossary/components/i-component-store/">`IComponentStore`</a>.

<h3 id="components"><span class="prop"><code>Components</code></span> <a class="ctx" href="/docs/ecs-storage/#componentstore-members" title="Components in context on the storage and performance page" aria-label="Components in context on the storage and performance page">→</a></h3>

`Span<T>` · Read-only. The packed components, <a class="ref prop" href="/docs/ecs-glossary/components/component-store/#count">`Count`</a> of them: `Components[i]` belongs to `Entities[i]`. A view of the store's array, not a copy, so changes through it go into the store. Any add or remove may move the components: don't keep the span across one.

<h3 id="count"><span class="prop"><code>Count</code></span> <a class="ctx" href="/docs/ecs-storage/#componentstore-members" title="Count in context on the storage and performance page" aria-label="Count in context on the storage and performance page">→</a></h3>

`int` · Read-only. How many entities have a component in the store.

<h3 id="entities"><span class="prop"><code>Entities</code></span> <a class="ctx" href="/docs/ecs-storage/#componentstore-members" title="Entities in context on the storage and performance page" aria-label="Entities in context on the storage and performance page">→</a></h3>

`ReadOnlySpan<Entity>` · Read-only. The entity owning each of <a class="ref prop" href="/docs/ecs-glossary/components/component-store/#components">`Components`</a>, index for index: the handle the entity's component was first set with.

## Methods

<h3 id="componentstore"><span class="method"><code>ComponentStore()</code></span> <a class="ctx" href="/docs/ecs-storage/#componentstore-members" title="ComponentStore() in context on the storage and performance page" aria-label="ComponentStore() in context on the storage and performance page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/component-store/#componentstore">`ComponentStore()`</a> · An empty store, with room for 16 components and ids up to 15 before it grows.

<h3 id="get"><span class="method"><code>Get()</code></span> <a class="ctx" href="/docs/ecs-storage/#componentstore-members" title="Get() in context on the storage and performance page" aria-label="Get() in context on the storage and performance page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/component-store/#get">`Get(Entity entity)`</a> · Returns `ref T`: a reference to the entity's component, to read and write in place. Valid until the next add or remove. Throws `KeyNotFoundException` when the entity has none.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity whose component to get. |

<h3 id="has"><span class="method"><code>Has()</code></span> <a class="ctx" href="/docs/ecs-storage/#componentstore-members" title="Has() in context on the storage and performance page" aria-label="Has() in context on the storage and performance page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/component-store/#has">`Has(Entity entity)`</a> · Whether an entity with the id has a component here. `false` for a negative id.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity to ask about. |

<h3 id="indexof"><span class="method"><code>IndexOf()</code></span> <a class="ctx" href="/docs/ecs-storage/#componentstore-members" title="IndexOf() in context on the storage and performance page" aria-label="IndexOf() in context on the storage and performance page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/component-store/#indexof">`IndexOf(Entity entity)`</a> · Where the entity's component sits in <a class="ref prop" href="/docs/ecs-glossary/components/component-store/#components">`Components`</a>, and the entity in <a class="ref prop" href="/docs/ecs-glossary/components/component-store/#entities">`Entities`</a>, or −1 when it has none. One sparse lookup, which is all <a class="ref method" href="/docs/ecs-glossary/components/component-store/#has">`Has`</a> and <a class="ref method" href="/docs/ecs-glossary/components/component-store/#get">`Get`</a> cost too: code that needs both the answer and the component looks up once and indexes the span. The world's queries do.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity to look up. |

<h3 id="remove"><span class="method"><code>Remove()</code></span> <a class="ctx" href="/docs/ecs-storage/#componentstore-members" title="Remove() in context on the storage and performance page" aria-label="Remove() in context on the storage and performance page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/component-store/#remove">`Remove(Entity entity)`</a> · Removes the entity's component, moving the last component, and its entity, into its place: the order of the packed arrays changes. Clears the freed slot when `T` holds references, so the store doesn't keep a removed object alive. Does nothing when the entity has none. From <a class="ref" href="/docs/ecs-glossary/components/i-component-store/">`IComponentStore`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity whose component to remove. |

<h3 id="set"><span class="method"><code>Set()</code></span> <a class="ctx" href="/docs/ecs-storage/#componentstore-members" title="Set() in context on the storage and performance page" aria-label="Set() in context on the storage and performance page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/component-store/#set">`Set(Entity entity, in T component)`</a> · Adds the entity's component at the end of the packed arrays, or overwrites the one it has where it is. The arrays double when they fill up, and the sparse array grows to fit the id. Throws `ArgumentOutOfRangeException` for a negative id, such as <a class="ref" href="/docs/ecs-glossary/world/entity/#invalid">`Entity.Invalid`</a>'s, or one too large for an array.

| Parameter | Type | Description |
| --- | --- | --- |
| `entity` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity whose component to set. |
| `component` | `T` | The component, copied into the store. |
