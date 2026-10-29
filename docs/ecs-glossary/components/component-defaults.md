---
layout: docs
legend: [method]
title: "Glossary: ComponentDefaults"
description: "The method of ComponentDefaults."
---

The starting value of a component added by type without one, by <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#addcomponent">`ECSWorld.AddComponent(entity, type)`</a>.

A static class, in the namespace `BorrowedTorch.ECS.Components.Store`. A component type declares its default as a public static field or property named `Default` or `Identity` whose type is the component's own, `Default` first; a member of another type with one of those names is ignored. The [type-erased access page](/docs/ecs-type-erased/#adding-without-a-value) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-method">method</span>.

## Methods

<h3 id="create"><span class="method"><code>Create()</code></span> <a class="ctx" href="/docs/ecs-type-erased/#componentdefaults-method" title="Create() in context on the type-erased access page" aria-label="Create() in context on the type-erased access page">→</a></h3>

<a class="ref method" href="/docs/ecs-glossary/components/component-defaults/#create">`Create(Type componentType)`</a> · Static. The type's declared default, boxed; for a struct that declares none, a zeroed value, and for a class that declares none, `null`. A property is read on every call, a field gives the same object every time. Throws `ArgumentNullException` for `null`, and `ArgumentException` for a type that doesn't implement <a class="ref" href="/docs/ecs-glossary/components/i-component/">`IComponent`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `componentType` | `Type` | The component's type. |
