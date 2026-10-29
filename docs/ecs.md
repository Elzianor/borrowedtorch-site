---
layout: docs
legend: [method]
title: "ECS: quick start guide"
description: Set up BorrowedTorch.ECS, build a first world of entities, components and a system, and find your way around the ECS pages.
---

BorrowedTorch.ECS is the entity component system of Kindling. An entity is a handle and nothing more. Its data sits
in components, plain structs kept packed side by side, one store per component type. Systems ask the world for the
entities that have the components they work on, and change those components in place, through references. The
library stores components and answers queries: the game loop around it stays yours. It has no dependencies and knows
nothing of MonoGame, so it sits next to it, or next to any other framework.

These pages cover the library from setup to every public type:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/ecs/) (this page) | Installing, the parts and their namespaces, a first world, what the library leaves to you, a field of sparks in MonoGame |
| [Entities](/docs/ecs-entities/) | Creating and destroying, ids and generations, handles that outlive their entity, "no entity", entities that point at entities, handles in save files |
| [Components](/docs/ecs-components/) | Defining components, structs or classes, adding, reading and writing in place, how long a reference lasts, removing, tags |
| [Systems and queries](/docs/ecs-queries/) | Writing a system, queries over one to three types, a fourth type, the order of entities, changing the world during a query, running systems in order |
| [Type-erased access](/docs/ecs-type-erased/) | Components by `Type` for inspectors, editors and save files, boxed copies, declared defaults, saving and loading a world |
| [Storage and performance](/docs/ecs-storage/) | The sparse sets behind the world, removal, what each call costs, memory, threads, a store of your own |
| [Glossary](/docs/ecs-glossary/) | Every public type with its members in alphabetical order, one page per type |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.ECS
```

| Requirement | Version |
| --- | --- |
| .NET | 8 or later (`net8.0`) |
| Operating system | Any: the library is plain managed code |
| Dependencies | None |

## The parts

Four ideas make up the library, and a world holds them together:

- **Entities.** An <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> is an id and a generation, two `int`s. It names a thing in the game and
  holds nothing itself. See [entities](/docs/ecs-entities/).
- **Components.** Plain data attached to an entity, at most one of each type: a position, a velocity, a health. A
  component is any type marked with <a class="ref" href="/docs/ecs-glossary/components/i-component/">`IComponent`</a>, usually a small struct. See
  [components](/docs/ecs-components/).
- **Systems.** The behavior: a class that queries the world for the entities with the components it works on, every
  frame. <a class="ref" href="/docs/ecs-glossary/world/i-system/">`ISystem`</a> marks one; when and in what order systems run is up to you. See
  [systems and queries](/docs/ecs-queries/).
- **The world.** An <a class="ref" href="/docs/ecs-glossary/world/ecs-world/">`ECSWorld`</a> creates and destroys entities, keeps one store per component type and runs
  the queries. Systems talk only to the world.

| Namespace | Types |
| --- | --- |
| `BorrowedTorch.ECS` | <a class="ref" href="/docs/ecs-glossary/world/ecs-world/">`ECSWorld`</a>, with its <a class="ref" href="/docs/ecs-glossary/world/query-action/">`QueryAction`</a> delegates |
| `BorrowedTorch.ECS.Entities` | <a class="ref" href="/docs/ecs-glossary/world/entity/">`Entity`</a> |
| `BorrowedTorch.ECS.Entities.Base` | <a class="ref" href="/docs/ecs-glossary/world/i-entity/">`IEntity`</a> |
| `BorrowedTorch.ECS.Components.Base` | <a class="ref" href="/docs/ecs-glossary/components/i-component/">`IComponent`</a>, <a class="ref" href="/docs/ecs-glossary/components/i-component-store/">`IComponentStore`</a> |
| `BorrowedTorch.ECS.Components.Store` | <a class="ref" href="/docs/ecs-glossary/components/component-store/">`ComponentStore<T>`</a>, <a class="ref" href="/docs/ecs-glossary/components/component-defaults/">`ComponentDefaults`</a> |
| `BorrowedTorch.ECS.Systems.Base` | <a class="ref" href="/docs/ecs-glossary/world/i-system/">`ISystem`</a> |

## A first world

Two components and a system that moves every entity that has both:

```csharp
using BorrowedTorch.ECS;
using BorrowedTorch.ECS.Components.Base;
using BorrowedTorch.ECS.Entities;
using BorrowedTorch.ECS.Systems.Base;

// components: plain data
public struct Position : IComponent
{
    public float X;
    public float Y;
}

public struct Velocity : IComponent
{
    public float X;
    public float Y;
}

// a system: asks the world for the entities it works on
public sealed class MovementSystem : ISystem
{
    private readonly ECSWorld _world;
    private readonly ECSWorld.QueryAction<Position, Velocity> _move;
    private float _deltaTime;

    public MovementSystem(ECSWorld world)
    {
        _world = world;
        _move = Move; // the callback, made once rather than on every update
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

Then a world with two entities in it, and the system run every frame:

```csharp
var world = new ECSWorld();

var player = world.CreateEntity();
world.AddComponent(player, new Position { X = 0, Y = 0 });
world.AddComponent(player, new Velocity { X = 2, Y = 0 });

var rock = world.CreateEntity();
world.AddComponent(rock, new Position { X = 5, Y = 3 }); // no Velocity: the system leaves it be

var movement = new MovementSystem(world);

// every frame, from your game loop
movement.Update(deltaTime);

ref var position = ref world.GetComponent<Position>(player); // 1, 0 after half a second
```

The query calls `Move` once for every entity that has both a `Position` and a `Velocity`, the player but not the
rock, with references to its two components: `Move` changes them where they are stored, nothing is copied back. The
callback is kept in a field, because a method or a lambda that uses the system's fields becomes a new delegate each
time it is passed to <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#query">`Query`</a>, and systems run every frame. The
[systems and queries page](/docs/ecs-queries/) has the rest.

### ECSWorld constructor

Names are colored by what they are: a <span class="kb kb-method">method</span>.

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ecs-glossary/world/ecs-world/#ecsworld">`ECSWorld()`</a> | An empty world: no entities and no stores. The store of a component type is created by the first add of that type. |

The other methods of the world are on the pages of what they do: entities on the
[entities page](/docs/ecs-entities/#ecsworld-entity-methods), components on the
[components page](/docs/ecs-components/#ecsworld-component-methods), queries on the
[systems and queries page](/docs/ecs-queries/#ecsworld-query-methods), and components by `Type` on the
[type-erased access page](/docs/ecs-type-erased/#ecsworld-type-erased-methods).

## What it leaves to you

The library stores components and answers queries. The rest is the game's:

- **Running systems.** <a class="ref" href="/docs/ecs-glossary/world/i-system/">`ISystem`</a> has no members, and the world runs nothing. Call your systems from the
  game loop, in the order you need; see [running systems in order](/docs/ecs-queries/#running-systems-in-order).
- **Changes and events.** Nothing tracks which components changed, and nothing is raised when an entity or a
  component comes or goes.
- **Saving.** There is no serializer, but the [type-erased calls](/docs/ecs-type-erased/) give one everything it
  needs, see [saving and loading a world](/docs/ecs-type-erased/#saving-and-loading-a-world).
- **Threads.** A world isn't thread-safe; see [threads](/docs/ecs-storage/#threads).
- **A list of entities.** The world can't list its entities, only the ones with a component, through a query. Keep
  the handles you need.

## A field of sparks

A complete MonoGame game: each click throws 40 sparks that fall, fade and go out. Every spark is an entity with four
components, and three systems move them, age them and draw them.

```csharp
using BorrowedTorch.ECS;
using BorrowedTorch.ECS.Components.Base;
using BorrowedTorch.ECS.Entities;
using BorrowedTorch.ECS.Systems.Base;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

public struct Position : IComponent
{
    public Vector2 Value;
}

public struct Velocity : IComponent
{
    public Vector2 Value;
}

public struct Lifetime : IComponent
{
    public float Remaining;
    public float Total;
}

public struct Tint : IComponent
{
    public Color Value;
}

public sealed class MovementSystem : ISystem
{
    private static readonly Vector2 Gravity = new(0, 400); // pixels per second², down the screen

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
        velocity.Value += Gravity * _deltaTime;
        position.Value += velocity.Value * _deltaTime;
    }
}

public sealed class AgingSystem : ISystem
{
    private readonly ECSWorld _world;
    private readonly ECSWorld.QueryAction<Lifetime> _age;
    private readonly List<Entity> _burnedOut = new();
    private float _deltaTime;

    public AgingSystem(ECSWorld world)
    {
        _world = world;
        _age = Age;
    }

    public void Update(float deltaTime)
    {
        _deltaTime = deltaTime;
        _world.Query(_age);

        // destroyed after the query: destroying them inside it would reshape the store it walks
        foreach (var entity in _burnedOut) _world.DestroyEntity(entity);
        _burnedOut.Clear();
    }

    private void Age(Entity entity, ref Lifetime lifetime)
    {
        lifetime.Remaining -= _deltaTime;
        if (lifetime.Remaining <= 0) _burnedOut.Add(entity);
    }
}

public sealed class SparkRenderer : ISystem
{
    private readonly ECSWorld _world;
    private readonly ECSWorld.QueryAction<Position, Lifetime, Tint> _drawSpark;
    private SpriteBatch _batch;
    private Texture2D _pixel;

    public SparkRenderer(ECSWorld world)
    {
        _world = world;
        _drawSpark = DrawSpark;
    }

    public void Draw(SpriteBatch batch, Texture2D pixel)
    {
        _batch = batch;
        _pixel = pixel;

        batch.Begin(blendState: BlendState.Additive);
        _world.Query(_drawSpark);
        batch.End();
    }

    private void DrawSpark(Entity entity, ref Position position, ref Lifetime lifetime, ref Tint tint)
    {
        var fade = lifetime.Remaining / lifetime.Total; // 1 when lit, 0 when burned out
        _batch.Draw(_pixel, position.Value, null, tint.Value * fade, 0f, new Vector2(0.5f), 4f, SpriteEffects.None, 0f);
    }
}

public class SparksGame : Game
{
    private readonly GraphicsDeviceManager _graphics;
    private readonly ECSWorld _world = new();
    private MovementSystem _movement;
    private AgingSystem _aging;
    private SparkRenderer _renderer;
    private SpriteBatch _batch;
    private Texture2D _pixel;
    private MouseState _previousMouse;

    public SparksGame()
    {
        _graphics = new GraphicsDeviceManager(this);
        IsMouseVisible = true;
    }

    protected override void Initialize()
    {
        _movement = new MovementSystem(_world);
        _aging = new AgingSystem(_world);
        _renderer = new SparkRenderer(_world);

        base.Initialize();
    }

    protected override void LoadContent()
    {
        _batch = new SpriteBatch(GraphicsDevice);
        _pixel = new Texture2D(GraphicsDevice, 1, 1);
        _pixel.SetData(new[] { Color.White });
    }

    protected override void Update(GameTime gameTime)
    {
        var mouse = Mouse.GetState();

        if (mouse.LeftButton == ButtonState.Pressed && _previousMouse.LeftButton == ButtonState.Released)
            Burst(mouse.Position.ToVector2());

        _previousMouse = mouse;

        var deltaTime = (float)gameTime.ElapsedGameTime.TotalSeconds;
        _movement.Update(deltaTime); // move every spark,
        _aging.Update(deltaTime);    // then age them and put out the ones that burned out

        base.Update(gameTime);
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.Black);
        _renderer.Draw(_batch, _pixel);

        base.Draw(gameTime);
    }

    protected override void UnloadContent()
    {
        _pixel.Dispose();
        _batch.Dispose();
    }

    // 40 sparks flying out of a point, each an entity with four components
    private void Burst(Vector2 at)
    {
        for (var i = 0; i < 40; i++)
        {
            var angle = Random.Shared.NextSingle() * MathHelper.TwoPi;
            var speed = 80 + Random.Shared.NextSingle() * 220;
            var life = 0.6f + Random.Shared.NextSingle() * 0.8f;

            var spark = _world.CreateEntity();
            _world.AddComponent(spark, new Position { Value = at });
            _world.AddComponent(spark, new Velocity { Value = new Vector2(MathF.Cos(angle), MathF.Sin(angle)) * speed });
            _world.AddComponent(spark, new Lifetime { Remaining = life, Total = life });
            _world.AddComponent(spark, new Tint { Value = Color.Lerp(Color.OrangeRed, Color.Gold, Random.Shared.NextSingle()) });
        }
    }
}
```

The systems never hear of each other: the movement works on whatever has a position and a velocity, the aging on
whatever has a lifetime, and the renderer on what has all three of a position, a lifetime and a tint. A spark that
burns out is destroyed after the aging query, never inside it: destroying an entity removes its components, which
would reshape the store the query is walking. The [systems and queries page](/docs/ecs-queries/#changing-the-world-during-a-query)
has what can change during a query and what has to wait.

Ids of burned-out sparks are reused by the next burst, under a new generation each, so a handle kept to an old spark
never reaches a new one, see [ids and generations](/docs/ecs-entities/#ids-and-generations). After a few clicks the
stores have grown to hold the most sparks alive at once, and from then on the world allocates nothing.
