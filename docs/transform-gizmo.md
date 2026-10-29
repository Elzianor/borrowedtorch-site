---
layout: docs
legend: [prop, method, event]
title: "Transform gizmo: quick start guide"
description: Set up BorrowedTorch.TransformGizmo in a game, move, turn and scale a selected object with the pointer, and find your way around the transform gizmo pages.
---

BorrowedTorch.TransformGizmo is the move, rotate and scale handle of Kindling's editor. It draws three arms with a
square between each pair, to move or to scale, or three rings to turn, at the pivot of whatever is selected, the same
size on screen however near or far that is, picks the handle under the pointer and drags it. It works on anything that
exposes its pose through one small interface, so one gizmo serves meshes, lights and markers alike, and each of them
says which modes it offers and whether it moves and turns along the world's axes or its own.

These pages cover the library from setup to every public type:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/transform-gizmo/) (this page) | Installing, a gizmo in a game, the conventions, a small editor with modes, cancelling and undo |
| [Targets](/docs/transform-gizmo-targets/) | The target interface, what the gizmo reads and writes, objects with and without parents, lights and markers, the axes of a target |
| [Capabilities](/docs/transform-gizmo-capabilities/) | The flags that choose the modes and frames of each target, why scale is always local, the rules, a mode toolbar |
| [Modes and frames](/docs/transform-gizmo-modes/) | Translate, rotate and scale, switching modes, the world's and the target's axes, what each drag does, skewed and mirrored objects |
| [Picking and dragging](/docs/transform-gizmo-dragging/) | The order of a frame, hovering, starting, ending and cancelling a drag, the dead zone, undo, viewports |
| [Drawing](/docs/transform-gizmo-drawing/) | The render states, the size on screen, the paint order, colors, painter's order for overlays of your own |
| [Glossary](/docs/transform-gizmo-glossary/) | Every public type with its properties, fields, methods and events in alphabetical order, one page per type |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.TransformGizmo
```

| Requirement | Version |
| --- | --- |
| .NET | 10 (`net10.0-windows`) |
| Operating system | Windows |
| MonoGame | The compute fork, `MonoGame.Framework.Compute.WindowsDX.NoMemoryLeak` 3.8.3.1, installed with the package |
| Borrowed Torch packages | `BorrowedTorch.Camera` 1.5.2, whose <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> gives the gizmo the view, the pointer ray and the floating origin, installed with the package |

The library works in MonoGame's own types: `Vector3`, `Quaternion`, `Point`, `Ray`, `Color` and `GraphicsDevice`.
Its types are all in one namespace, `BorrowedTorch.TransformGizmos`:

| Type | What it is |
| --- | --- |
| <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/">`TransformGizmo`</a> | The gizmo: draws the handles, picks them and drags them |
| <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/">`ITransformGizmoTarget`</a> | What the gizmo is attached to; implement it over your own objects |
| <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/">`GizmoBasis`</a> | The three axes of a target as they point in the world |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a> | Flags: the modes and frames a target offers |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-mode/">`GizmoMode`</a>, <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-space/">`GizmoSpace`</a> and <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-axis/">`GizmoAxis`</a> | The enums of modes, frames and handles |
| <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-capabilities-extensions/">`GizmoCapabilitiesExtensions`</a> | The rules behind the flags, for a toolbar to ask |
| <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/painter-order-depth-sort/">`PainterOrderDepthSort`</a> | A small sort for drawing overlapping overlays far to near |

## Setting up the gizmo

Create a <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/">`TransformGizmo`</a> when the game starts, with the graphics device. Every frame, the gizmo needs three
things from the game:

- **A target.** An <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/">`ITransformGizmoTarget`</a> for the selected object, or `null` when nothing is selected. The
  [targets page](/docs/transform-gizmo-targets/) shows how to write one; below, a prop with a position, a rotation and
  a scale.
- **The camera and the pointer.** The <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> the scene is drawn with, the pointer in window pixels, and the ray
  through it from <a class="ref method" href="/docs/camera-glossary/cameras/camera/#screenpointtoray">`ScreenPointToRay`</a>.
- **Three calls.** <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a> with the pointer, before the scene's own picking;
  <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a> when the button goes down, which says whether the click was the gizmo's; and
  <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw`</a>, after the scene.

```csharp
using BorrowedTorch.Cameras;
using BorrowedTorch.TransformGizmos;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

// an object of the scene: a pose, and the world matrix it makes
public class Prop
{
    public Vector3 Position;
    public Quaternion Rotation = Quaternion.Identity;
    public Vector3 Scale = Vector3.One;

    public Matrix World => Matrix.CreateScale(Scale)
                           * Matrix.CreateFromQuaternion(Rotation)
                           * Matrix.CreateTranslation(Position);
}

// what the gizmo sees of a prop
public class PropTarget(Prop prop) : ITransformGizmoTarget
{
    public GizmoCapabilities Capabilities => GizmoCapabilities.All;

    public Vector3 WorldPosition
    {
        get => prop.Position;
        set => prop.Position = value;
    }

    // the prop's own axes in the world: Right, Up and Backward are +X, +Y and +Z of a MonoGame matrix
    public GizmoBasis WorldAxes
    {
        get
        {
            var world = prop.World;
            return GizmoBasis.FromObjectAxes(world.Right, world.Up, world.Backward);
        }
    }

    public Quaternion LocalRotation
    {
        get => prop.Rotation;
        set => prop.Rotation = value;
    }

    public Vector3 LocalScale
    {
        get => prop.Scale;
        set => prop.Scale = value;
    }
}

public class MyGame : Game
{
    private readonly GraphicsDeviceManager _graphics;
    private readonly Prop _crate = new() { Position = new Vector3(0, 0.5f, 0) };
    private Camera _camera;
    private TransformGizmo _gizmo;
    private PropTarget _selected; // null while nothing is selected
    private MouseState _previousMouse;

    public MyGame()
    {
        _graphics = new GraphicsDeviceManager(this);
        Content.RootDirectory = "Content";
        IsMouseVisible = true;
    }

    protected override void Initialize()
    {
        _camera = new Camera(new Vector3(4, 3, 6), Vector3.Zero, Vector3.Up)
        {
            AspectRatio = GraphicsDevice.Viewport.AspectRatio
        };

        _gizmo = new TransformGizmo(GraphicsDevice);

        base.Initialize();
    }

    protected override void Update(GameTime gameTime)
    {
        _camera.Update((float)gameTime.ElapsedGameTime.TotalSeconds);

        var mouse = Mouse.GetState();
        var pixel = new Point(mouse.X, mouse.Y);
        var ray = _camera.ScreenPointToRay(pixel.ToVector2(), GraphicsDevice.Viewport);
        var down = mouse.LeftButton == ButtonState.Pressed;

        // the hover highlight, or the drag in progress: before the scene's own picking
        _gizmo.Update(_camera, _selected, pixel, down, ray);

        // a click on a handle is the gizmo's; any other click selects
        if (down && _previousMouse.LeftButton == ButtonState.Released &&
            !_gizmo.TryBeginDrag(_camera, _selected, pixel, ray))
        {
            var onCrate = ray.Intersects(new BoundingSphere(_crate.Position, 1)) != null;
            _selected = onCrate ? new PropTarget(_crate) : null;
        }

        _previousMouse = mouse;

        base.Update(gameTime);
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.Black);

        // draw the scene here: the crate with _crate.World, relative to _camera.Offset

        // last, over everything
        _gizmo.Draw(_camera, _selected);

        base.Draw(gameTime);
    }

    protected override void UnloadContent()
    {
        _gizmo.Dispose();

        base.UnloadContent();
    }
}
```

Nothing shows until something is selected. Click the crate and the move arms appear at its center; drag one and the
crate slides along that axis, staying under the pointer, or drag a square between two arms and it slides across
their plane. A click that misses every handle goes to the scene, here to
select or deselect the crate, so the gizmo never swallows a click it has no use for. The
[modes page](/docs/transform-gizmo-modes/#choosing-a-mode) switches to rotate and scale.

The gizmo keeps no reference to its target between calls, so a target is cheap: this one is made when the crate is
selected. It owns a `BasicEffect`, though: dispose the gizmo with the graphics device.

### TransformGizmo constructor and Dispose

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#transformgizmo">`TransformGizmo(GraphicsDevice graphicsDevice)`</a> | A gizmo in `Translate` mode with the `Global` frame, drawing with the device. Creates the `BasicEffect` it draws with. Throws `ArgumentNullException` for a `null` device. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#dispose">`Dispose()`</a> | Disposes the gizmo's `BasicEffect`. Call it when the graphics device goes. |

The other members of the gizmo are on the pages of what they do: the modes and the frames on the
[modes and frames page](/docs/transform-gizmo-modes/#transformgizmo-mode-members), the pointer, the drag and its event
on the [picking and dragging page](/docs/transform-gizmo-dragging/#transformgizmo-pointer-methods), and drawing and the
colors on the [drawing page](/docs/transform-gizmo-drawing/#transformgizmo-drawing-method).

## Conventions

The gizmo uses MonoGame's right-handed frame: +X is right, +Y is up, and a camera looks down −Z. Its handles are
colored by axis, X red, Y green and Z blue, with a light gray square at the pivot. A square between two arms takes
the color of the axis it leaves out: the blue one, between X and Y, moves without touching Z.

| Quantity | Unit |
| --- | --- |
| Positions | World coordinates, as the target and the camera give them; the gizmo rebases what it draws itself |
| The pointer | Window pixels, from the top left corner, as the mouse gives them |
| Rotations | Quaternions; `a * b` applies `b` first, then `a` |
| Scale | A factor per axis, as `Matrix.CreateScale` takes it |
| Distances on screen | Pixels: the pick distance and the dead zone of a drag |

A target's axes are a <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/">`GizmoBasis`</a>: three unit vectors that need not be perpendicular, see
[the axes of a target](/docs/transform-gizmo-targets/#the-axes-of-a-target).

## A small editor

A selection with the gizmo on it, as an editor wants it: 1, 2 and 3 choose move, rotate and scale, Tab steps through
the modes the selection offers, X swaps the world's axes for the selection's own, Escape cancels a drag and puts the
object back, and Ctrl+Z undoes the last drag.

```csharp
using BorrowedTorch.Cameras;
using BorrowedTorch.TransformGizmos;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

// a target's pose, to put back
public readonly record struct Pose(Vector3 Position, Quaternion Rotation, Vector3 Scale)
{
    public static Pose Of(ITransformGizmoTarget target)
    {
        return new Pose(target.WorldPosition, target.LocalRotation, target.LocalScale);
    }

    public void ApplyTo(ITransformGizmoTarget target)
    {
        target.WorldPosition = Position;
        target.LocalRotation = Rotation;
        target.LocalScale = Scale;
    }
}

public class GizmoEditor
{
    private readonly TransformGizmo _gizmo;
    private readonly Func<Ray, ITransformGizmoTarget> _pickScene; // the target under a ray, or null
    private readonly Stack<(ITransformGizmoTarget Target, Pose Before)> _undo = new();
    private Pose _grabbed; // the pose when the drag began
    private bool _moved;   // whether the drag has written a pose
    private KeyboardState _previousKeys;
    private MouseState _previousMouse;

    public GizmoEditor(TransformGizmo gizmo, Func<Ray, ITransformGizmoTarget> pickScene)
    {
        _gizmo = gizmo;
        _pickScene = pickScene;
        _gizmo.TransformMutated += _ => _moved = true;
    }

    public ITransformGizmoTarget Selected { get; private set; }

    public void Update(Camera camera, Viewport viewport)
    {
        var keys = Keyboard.GetState();
        var mouse = Mouse.GetState();
        var pixel = new Point(mouse.X, mouse.Y);
        var ray = camera.ScreenPointToRay(pixel.ToVector2(), viewport);
        var down = mouse.LeftButton == ButtonState.Pressed;

        // Escape: the drag stops, and the object goes back to where it was grabbed
        if (_gizmo.IsDragging && WasPressed(keys, Keys.Escape))
        {
            _gizmo.EndDrag();
            _grabbed.ApplyTo(Selected);
        }

        var wasDragging = _gizmo.IsDragging;
        _gizmo.Update(camera, Selected, pixel, down, ray);

        // the drag ended with the button: one undo step for all of it, if it moved anything
        if (wasDragging && !_gizmo.IsDragging && _moved)
            _undo.Push((Selected, _grabbed));

        if (down && _previousMouse.LeftButton == ButtonState.Released)
        {
            if (_gizmo.TryBeginDrag(camera, Selected, pixel, ray))
            {
                _grabbed = Pose.Of(Selected);
                _moved = false;
            }
            else
            {
                Selected = _pickScene(ray);
            }
        }

        if (WasPressed(keys, Keys.D1)) _gizmo.Mode = GizmoMode.Translate;
        if (WasPressed(keys, Keys.D2)) _gizmo.Mode = GizmoMode.Rotate;
        if (WasPressed(keys, Keys.D3)) _gizmo.Mode = GizmoMode.Scale;
        if (WasPressed(keys, Keys.Tab)) _gizmo.CycleMode(Selected);
        if (WasPressed(keys, Keys.X)) _gizmo.ToggleSpace();

        if (keys.IsKeyDown(Keys.LeftControl) && WasPressed(keys, Keys.Z) &&
            !_gizmo.IsDragging && _undo.TryPop(out var step))
            step.Before.ApplyTo(step.Target);

        _previousKeys = keys;
        _previousMouse = mouse;
    }

    public void Draw(Camera camera)
    {
        _gizmo.Draw(camera, Selected);
    }

    private bool WasPressed(KeyboardState keys, Keys key)
    {
        return keys.IsKeyDown(key) && _previousKeys.IsKeyUp(key);
    }
}
```

Create it in `Initialize` with the game's gizmo and the scene's own picking, call its `Update` from the game's
`Update` after the camera's, and its `Draw` last in the game's `Draw`.

An undo step is a whole drag, not each frame of it. A drag writes the pose every frame, and raises
<a class="ref event" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#transformmutated">`TransformMutated`</a> with it, so the editor only notes that something moved and pushes the step when
the button comes up. A click on a handle that never moves the pointer past the
[dead zone](/docs/transform-gizmo-dragging/#starting-a-drag) writes nothing and pushes nothing. The keys that change
the mode or the frame do nothing while a drag runs: the drag keeps the mode and the frame it was grabbed in.

The [picking and dragging page](/docs/transform-gizmo-dragging/#ending-and-cancelling) has more on cancelling and
undo, and the [capabilities page](/docs/transform-gizmo-capabilities/#a-mode-toolbar) a toolbar that shows only the
modes the selection offers.
