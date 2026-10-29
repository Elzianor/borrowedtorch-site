---
layout: docs
legend: [prop, method]
title: "Scene gizmo: quick start guide"
description: Set up BorrowedTorch.SceneGizmo in a game, turn the view to an axis with a click, and find your way around the scene gizmo pages.
---

BorrowedTorch.SceneGizmo is the orientation widget of Kindling's editor: the small X, Y and Z axes in the top-right
corner of the scene view that turn as the camera turns, so the world's axes can be read at a glance from any view. The
tip under the pointer lights up, and a click on a tip hands you its axis, to turn the camera and look along it. The
widget is drawn over the scene in a corner of its own, the same size in a window of any size, and needs nothing from
the game but the camera and the pointer.

These pages cover the library from setup to every public member:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/scene-gizmo/) (this page) | Installing, the widget in a game, the conventions, a scene view in an editor window |
| [Picking and snapping](/docs/scene-gizmo-picking/) | The order of a frame, hovering, which tip a click picks, turning the view to an axis, sharing the pointer with the scene, viewports |
| [Drawing](/docs/scene-gizmo-drawing/) | Drawing over the scene, the corner, what the widget draws and how it turns, the render states, the paint order, colors |
| [Glossary](/docs/scene-gizmo-glossary/) | The gizmo with its properties and methods in alphabetical order |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.SceneGizmo
```

| Requirement | Version |
| --- | --- |
| .NET | 10 (`net10.0-windows`) |
| Operating system | Windows |
| MonoGame | The compute fork, `MonoGame.Framework.Compute.WindowsDX.NoMemoryLeak` 3.8.3.1, installed with the package |
| Borrowed Torch packages | `BorrowedTorch.Camera` 1.5.2, whose <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> gives the gizmo the view to turn with, installed with the package |

The library works in MonoGame's own types: `Vector3`, `Point`, `Color` and `GraphicsDevice`. Its one public type,
<a class="ref" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/">`OrientationGizmo`</a>, is in the namespace `BorrowedTorch.SceneGizmo`: the widget, which draws the axes,
lights up the tip under the pointer and picks the axis of a click.

## Setting up the gizmo

Create an <a class="ref" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/">`OrientationGizmo`</a> when the game starts, with the graphics device. Every frame, the gizmo needs
three things from the game:

- **The camera.** The <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> the scene is drawn with. The gizmo reads only its <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#view">`View`</a>, which changes
  in the camera's <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a>, so update the camera first.
- **The pointer.** The mouse position in window pixels, as the mouse gives it.
- **Three calls.** <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#updatehover">`UpdateHover`</a> with the pointer, every frame; <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#trypickaxis">`TryPickAxis`</a> when the
  button goes down, which says whether the click was on a tip and gives its axis; and <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a>, after the
  scene.

What the game does with the axis is its own choice. The usual one is to look along it, with the clicked axis pointing
at you: a <a class="ref" href="/docs/camera-glossary/cameras/free-camera-controller/">`FreeCameraController`</a> turns there smoothly with <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#snapto">`SnapTo`</a>, given the opposite
direction.

```csharp
using BorrowedTorch.Cameras;
using BorrowedTorch.Cameras.Controllers;
using BorrowedTorch.SceneGizmo;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

public class MyGame : Game
{
    private readonly GraphicsDeviceManager _graphics;
    private Camera _camera;
    private FreeCameraController _free;
    private OrientationGizmo _gizmo;
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

        _free = new FreeCameraController();
        _camera.Controller = _free;

        _gizmo = new OrientationGizmo(GraphicsDevice);

        _previousMouse = Mouse.GetState();

        base.Initialize();
    }

    protected override void Update(GameTime gameTime)
    {
        var mouse = Mouse.GetState();
        var pressed = mouse.LeftButton == ButtonState.Pressed && _previousMouse.LeftButton == ButtonState.Released;

        // look around while the right button is held
        if (mouse.RightButton == ButtonState.Pressed)
            _free.Look(mouse.X - _previousMouse.X, mouse.Y - _previousMouse.Y);

        _camera.Update((float)gameTime.ElapsedGameTime.TotalSeconds);

        // the tip under the pointer lights up: every frame, wherever the pointer is
        _gizmo.UpdateHover(_camera, mouse.Position);

        // a click on a tip turns the view to look along its axis, the axis pointing at you
        if (pressed && _gizmo.TryPickAxis(_camera, mouse.Position, out var axis))
            _free.SnapTo(-axis);

        _previousMouse = mouse;

        base.Update(gameTime);
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.Black);

        // draw the scene here

        // last, over the scene
        _gizmo.Draw(_camera);

        base.Draw(gameTime);
    }

    protected override void UnloadContent()
    {
        _gizmo.Dispose();

        base.UnloadContent();
    }
}
```

The widget is in the top-right corner from the first frame: from a camera at (4, 3, 6), X points right and a little
down, Y up, and Z toward the bottom left. Move the pointer onto a tip and its arm lights up; click it, and the view
turns until that axis points straight at you and its tip sits in the middle of the widget. The turn covers 95% of the
way in 0.18 seconds by default, and looking around with the right button cancels it, see
[snapping to an axis](/docs/camera-controllers/#snapping-to-an-axis).

The gizmo keeps nothing of the camera between calls, so any camera can be passed at any time. It owns a `BasicEffect`,
though: dispose the gizmo with the graphics device.

### OrientationGizmo constructor and Dispose

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#orientationgizmo">`OrientationGizmo(GraphicsDevice graphicsDevice)`</a> | A widget in the default colors, drawing with the device. Creates the `BasicEffect` it draws with. Throws `ArgumentNullException` for a `null` device. |
| <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#dispose">`Dispose()`</a> | Disposes the gizmo's `BasicEffect`. Call it when the graphics device goes. A second call does nothing; <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a> after it throws `ObjectDisposedException`. |

The other members of the gizmo are on the pages of what they do: the pointer on the
[picking and snapping page](/docs/scene-gizmo-picking/#orientationgizmo-pointer-methods), and drawing and the colors on
the [drawing page](/docs/scene-gizmo-drawing/#orientationgizmo-drawing-method).

## Conventions

The gizmo uses MonoGame's right-handed frame: +X is right, +Y is up, and a camera looks down −Z. Its axes are colored
X red, Y green and Z blue, as the handles of [BorrowedTorch.TransformGizmo](/docs/transform-gizmo/) are. The positive
end of each axis is a full-length arm with a lettered knob at its tip; the negative end is shorter, darker and bare.

| Quantity | Unit |
| --- | --- |
| The pointer | Window pixels, from the top left corner, as the mouse gives them |
| A picked axis | A world axis as a signed unit vector: `Vector3.UnitX`, `-Vector3.UnitZ` and so on |
| The widget's size and place | Pixels: a square 110 pixels across, 12 pixels in from the top and right edges of the viewport |
| The pick distance | Pixels: 14 from the center of a tip |

## A scene view in an editor

The scene view of an editor is a part of its window, with panels around it. A scene view with the widget, as an editor
wants it: the widget sits in the corner of the view rather than of the window, the pointer turns into a hand over a
tip, a click on a tip turns the view to look along its axis, and a click on the axis already pointing at you turns
the view round to look from the other side.

```csharp
using BorrowedTorch.Cameras;
using BorrowedTorch.Cameras.Controllers;
using BorrowedTorch.SceneGizmo;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

public class SceneView : IDisposable
{
    private readonly GraphicsDevice _graphicsDevice;
    private readonly FreeCameraController _free = new();
    private readonly OrientationGizmo _gizmo;
    private MouseState _previousMouse;

    public SceneView(GraphicsDevice graphicsDevice, Viewport bounds)
    {
        _graphicsDevice = graphicsDevice;
        _gizmo = new OrientationGizmo(graphicsDevice);
        Bounds = bounds;

        Camera = new Camera(new Vector3(4, 3, 6), Vector3.Zero, Vector3.Up)
        {
            AspectRatio = bounds.AspectRatio
        };
        Camera.Controller = _free;
    }

    // where the view is in the window
    public Viewport Bounds { get; }

    public Camera Camera { get; }

    public void Update(float elapsedSeconds)
    {
        var mouse = Mouse.GetState();
        var pressed = mouse.LeftButton == ButtonState.Pressed && _previousMouse.LeftButton == ButtonState.Released;

        if (mouse.RightButton == ButtonState.Pressed)
            _free.Look(mouse.X - _previousMouse.X, mouse.Y - _previousMouse.Y);

        Camera.Update(elapsedSeconds);

        // the gizmo works in the device's current viewport: the view's, so it picks in the view's corner
        var windowViewport = _graphicsDevice.Viewport;
        _graphicsDevice.Viewport = Bounds;

        _gizmo.UpdateHover(Camera, mouse.Position);
        var onTip = _gizmo.TryPickAxis(Camera, mouse.Position, out var axis);

        _graphicsDevice.Viewport = windowViewport;

        Mouse.SetCursor(onTip ? MouseCursor.Hand : MouseCursor.Arrow);

        if (pressed && onTip)
        {
            // the axis already points at you: look from the other side
            var lookingAlong = Vector3.Dot(Camera.Forward, -axis) > 0.999f;
            _free.SnapTo(lookingAlong ? axis : -axis);
        }
        else if (pressed && Bounds.Bounds.Contains(mouse.Position))
        {
            // the scene's click: select what is under the pointer
        }

        _previousMouse = mouse;
    }

    public void Draw()
    {
        var windowViewport = _graphicsDevice.Viewport;
        _graphicsDevice.Viewport = Bounds;

        // draw the scene here, with Camera

        _gizmo.Draw(Camera); // in the view's corner, over the scene

        _graphicsDevice.Viewport = windowViewport;
    }

    public void Dispose()
    {
        _gizmo.Dispose();
    }
}
```

Create it in `Initialize` with the device and the view's rectangle in the window, call its `Update` from the game's
`Update` and its `Draw` from the game's `Draw`, and dispose it with the device. The gizmo places its square in the
device's current viewport, so the view sets its own viewport around all three calls, not only around
<a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#draw">`Draw`</a>: picked in the window's corner, the widget would answer clicks where it isn't drawn. The pointer
stays in window pixels.

The gizmo has no property that says whether the pointer is on a tip. <a class="ref method" href="/docs/scene-gizmo-glossary/gizmo/orientation-gizmo/#trypickaxis">`TryPickAxis`</a> changes nothing, so the
view calls it every frame, for the cursor, and uses the same answer for the click. A click inside the widget's square
that misses every tip is the scene's, like any other click in the view.

The turn round works because of which tip a click picks: once the view looks along an axis, both ends of it sit in the
middle of the widget, and the click picks the nearer one, the end pointing at you. The
[picking and snapping page](/docs/scene-gizmo-picking/#snapping-the-view) has the views of all six tips, and the
[viewports](/docs/scene-gizmo-picking/#viewports) of split screens.
