---
layout: docs
legend: [prop, method]
title: "Glossary: Entity"
description: "The members of Entity, in alphabetical order."
---

A handle to an entity: an id, and the generation the id had when the entity was created. The entity is nothing more than this handle; its components are in the world's stores, filed under the id.

A read-only struct that implements <a class="ref" href="/docs/ecs-glossary/world/i-entity/">`IEntity`</a>. The [entities page](/docs/ecs-entities/) shows it in context, with code. Whether a handle is alive only the world can tell: <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#isentityalive">`ECSWorld.IsEntityAlive`</a>.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="isvalid"><span class="prop"><code>IsValid</code></span> <a class="ctx" href="/docs/ecs-entities/#entity-members" title="IsValid in context on the entities page" aria-label="IsValid in context on the entities page">→</a></h3>

`bool` · Read-only. `false` for a negative id, such as <a class="ref" href="/docs/ecs-glossary/world/entity/#invalid">`Invalid`</a>'s, and `true` for any other. `true` doesn't mean alive: a valid handle may belong to an entity destroyed long ago.

## Fields

<h3 id="generation"><code>Generation</code> <a class="ctx" href="/docs/ecs-entities/#entity-members" title="Generation in context on the entities page" aria-label="Generation in context on the entities page">→</a></h3>

`int` · Read-only field. The generation the id had when the entity was created. Each destroy of an entity with the id moves the id's generation on by one, so a handle with an older one is no longer alive.

<h3 id="id"><code>Id</code> <a class="ctx" href="/docs/ecs-entities/#entity-members" title="Id in context on the entities page" aria-label="Id in context on the entities page">→</a></h3>

`int` · Read-only field. Where the entity's components are filed in the stores. Ids start at 0 and are reused after a destroy, the most recently freed first.

<h3 id="invalid"><code>Invalid</code> <a class="ctx" href="/docs/ecs-entities/#entity-members" title="Invalid in context on the entities page" aria-label="Invalid in context on the entities page">→</a></h3>

<a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> · Static, read-only field. A handle that never refers to an entity, id −1 at generation 0, for fields and return values that mean "no entity". Use it rather than `default(Entity)`, which is the world's first entity once there is one; see [no entity](/docs/ecs-entities/#no-entity).

## Methods

<h3 id="entity"><span class="method"><code>Entity()</code></span> <a class="ctx" href="/docs/ecs-entities/#entity-members" title="Entity() in context on the entities page" aria-label="Entity() in context on the entities page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/entity/#entity">`Entity(int id, int generation)`</a> · A handle made of the two numbers. The world hands out handles from <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#createentity">`CreateEntity`</a>; a handle made by hand is alive only if it equals one the world handed out and hasn't destroyed since.

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `int` | The id. |
| `generation` | `int` | The generation of the id. |

<h3 id="equality-operators"><span class="method"><code>==()</code></span> <a class="ctx" href="/docs/ecs-entities/#entity-members" title="==() in context on the entities page" aria-label="==() in context on the entities page">→</a></h3>

`operator ==(Entity left, Entity right)` · True when the ids and the generations are equal. `!=` is its opposite, and <a class="ref method" href="/docs/ecs-glossary/world/entity/#equals">`Equals`</a> compares the same way.

| Parameter | Type | Description |
| --- | --- | --- |
| `left` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The first handle. |
| `right` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The second handle. |

<h3 id="equals"><span class="method"><code>Equals()</code></span> <a class="ctx" href="/docs/ecs-entities/#entity-members" title="Equals() in context on the entities page" aria-label="Equals() in context on the entities page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/entity/#equals">`Equals(Entity other)`</a> · True when both the id and the generation are equal: a handle to a destroyed entity doesn't equal the handle of the entity that got its id. From <a class="ref" href="/docs/ecs-glossary/world/i-entity/">`IEntity`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `other` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The handle to compare with. |

<a class="ref method" href="/docs/ecs-glossary/world/entity/#equals">`Equals(object obj)`</a> · The same, for an `obj` that is an `Entity`; `false` for anything else.

| Parameter | Type | Description |
| --- | --- | --- |
| `obj` | `object` | The object to compare with. |

<h3 id="gethashcode"><span class="method"><code>GetHashCode()</code></span> <a class="ctx" href="/docs/ecs-entities/#entity-members" title="GetHashCode() in context on the entities page" aria-label="GetHashCode() in context on the entities page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/entity/#gethashcode">`GetHashCode()`</a> · A hash of the id and the generation, so a handle works as a key of a `Dictionary` or in a `HashSet`.

<h3 id="tostring"><span class="method"><code>ToString()</code></span> <a class="ctx" href="/docs/ecs-entities/#entity-members" title="ToString() in context on the entities page" aria-label="ToString() in context on the entities page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/world/entity/#tostring">`ToString()`</a> · The id and the generation as text: `Entity(3:gen.1)`, and `Entity(-1:gen.0)` for <a class="ref" href="/docs/ecs-glossary/world/entity/#invalid">`Invalid`</a>.
