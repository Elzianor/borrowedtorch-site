---
layout: docs
title: "Glossary: ECSWorld.QueryAction"
description: "The signatures of ECSWorld.QueryAction and the queries they are the callbacks of."
---

A delegate nested in <a class="ref" href="/docs/ecs-glossary/world/ecs-world/">`ECSWorld`</a>, in three forms, one per number of component types: the callback of a query, called once for each entity that has all of the query's types. The [systems and queries page](/docs/ecs-queries/#queries) shows it in context, with code.

Each type argument is a component type, and each component comes by reference: a change made through it goes straight into the store. The references are valid for the call; don't keep them.

## One type

Signature: <code>void QueryAction&lt;T1&gt;(<a href="/docs/ecs-glossary/world/entity/">Entity</a> e, ref T1 c1)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `e` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity that has the component. |
| `c1` | `ref T1` | The entity's `T1`. |

The callback of [`Query<T1>`](/docs/ecs-glossary/world/ecs-world/#query).

## Two types

Signature: <code>void QueryAction&lt;T1, T2&gt;(<a href="/docs/ecs-glossary/world/entity/">Entity</a> e, ref T1 c1, ref T2 c2)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `e` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity that has both components. |
| `c1` | `ref T1` | The entity's `T1`. |
| `c2` | `ref T2` | The entity's `T2`. |

The callback of [`Query<T1, T2>`](/docs/ecs-glossary/world/ecs-world/#query).

## Three types

Signature: <code>void QueryAction&lt;T1, T2, T3&gt;(<a href="/docs/ecs-glossary/world/entity/">Entity</a> e, ref T1 c1, ref T2 c2, ref T3 c3)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `e` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> | The entity that has the three components. |
| `c1` | `ref T1` | The entity's `T1`. |
| `c2` | `ref T2` | The entity's `T2`. |
| `c3` | `ref T3` | The entity's `T3`. |

The callback of [`Query<T1, T2, T3>`](/docs/ecs-glossary/world/ecs-world/#query).
