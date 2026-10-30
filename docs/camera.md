---
layout: docs
legend: [prop, method]
title: "Camera: quick start guide"
description: Set up BorrowedTorch.Camera in a game, fly a free camera, play a tour back along a path, and find your way around the camera pages.
---

BorrowedTorch.Camera is the camera of Kindling. A camera holds a position and an orientation, builds the view and
projection matrices for your effects, turns a mouse click into a ray, and keeps a floating origin so a world can
stretch far from its center without jitter. Controllers drive it: a free camera that flies under the player's input,
and an animated camera that plays a smooth path through waypoints at a steady speed, slowing to a halt and holding
wherever a waypoint asks it to. A path also hands you the lines to draw it in an editor.

These pages cover the library from setup to every public type:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/camera/) (this page) | Installing, a camera in a game, the conventions, a fly-through that records a tour and plays it back |
| [Pose and projection](/docs/camera-pose/) | Position and orientation, looking at a point, the field of view and the clip planes, the matrices and when they change |
| [Picking and large worlds](/docs/camera-picking/) | Rays through the mouse, the floating origin, drawing and culling relative to it |
| [Controllers](/docs/camera-controllers/) | Attaching and switching controllers, the free camera, snapping to an axis, a controller of your own |
| [Camera paths](/docs/camera-paths/) | Waypoints and their orientation modes, open and closed paths, sampling by distance, the nearest point, easing and holds, accuracy |
| [Path playback](/docs/camera-playback/) | The animated camera: duration and speed, easing and holds in a run, the ends of a path, seeking, easing onto the path, recording and saving waypoints |
| [Drawing a path](/docs/camera-drawing/) | The geometry of a path, fixed and adaptive lines, orientation frames, a line renderer |
| [Glossary](/docs/camera-glossary/) | Every public type with its properties, fields and methods in alphabetical order, one page per type |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.Camera
```

| Requirement | Version |
| --- | --- |
| .NET | 10 (`net10.0-windows`) |
| Operating system | Windows |
| MonoGame | The compute fork, `MonoGame.Framework.Compute.WindowsDX.NoMemoryLeak` 3.8.3.1, installed with the package |
| Borrowed Torch packages | [`BorrowedTorch.ShapingFunctions`](/docs/shaping-functions/) 1.6.1 for the easing curves of waypoints, and `BorrowedTorch.Math` 0.2.2 for the look rotations and the damping of axis snaps, installed with the package |

The library works in MonoGame's own types: `Vector3`, `Quaternion`, `Matrix`, `Ray` and `Viewport`. Its types are in
four namespaces:

| Namespace | Types |
| --- | --- |
| `BorrowedTorch.Cameras` | <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> |
| `BorrowedTorch.Cameras.Controllers` | <a class="ref" href="/docs/camera-glossary/cameras/free-camera-controller/">`FreeCameraController`</a> and <a class="ref" href="/docs/camera-glossary/cameras/animated-camera-controller/">`AnimatedCameraController`</a> |
| `BorrowedTorch.Cameras.Controllers.Base` | <a class="ref" href="/docs/camera-glossary/cameras/base-camera-controller/">`BaseCameraController`</a>, for controllers of your own |
| `BorrowedTorch.Cameras.Animation` | <a class="ref" href="/docs/camera-glossary/paths/camera-path/">`CameraPath`</a>, the waypoints, the samples, the enums and the drawing types |

The curves a waypoint eases by come from `BorrowedTorch.ShapingFunctions`, see
[easing and holds](/docs/camera-paths/#easing-and-holds).

## Setting up the camera

Create a <a class="ref" href="/docs/camera-glossary/cameras/camera/">`Camera`</a> when the game starts, give it the aspect ratio of the viewport and attach a controller.
Every frame, the camera needs three things from the game:

- **Input for the controller.** A free camera turns and moves by what you tell it, see
  [the free camera](/docs/camera-controllers/#the-free-camera).
- **The time.** <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a> takes the seconds since the last frame. It runs the controller, then rebuilds the
  matrices that changed.
- **World matrices relative to its offset.** Build each object's world matrix from its position minus <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#offset">`Offset`</a>,
  and hand the camera's <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#view">`View`</a> and <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#projection">`Projection`</a> to the effect.

```csharp
using BorrowedTorch.Cameras;
using BorrowedTorch.Cameras.Controllers;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

public class MyGame : Game
{
    private readonly GraphicsDeviceManager _graphics;
    private readonly Vector3 _cratePosition = new(0, 0.5f, 0);
    private Camera _camera;
    private FreeCameraController _free;
    private BasicEffect _effect;
    private MouseState _previousMouse;

    public MyGame()
    {
        _graphics = new GraphicsDeviceManager(this);
        Content.RootDirectory = "Content";
    }

    protected override void Initialize()
    {
        // 5 units up and 20 back, looking at the origin
        _camera = new Camera(new Vector3(0, 5, 20), Vector3.Zero, Vector3.Up)
        {
            AspectRatio = GraphicsDevice.Viewport.AspectRatio,
            FieldOfViewDegrees = 60,
            FarPlane = 5000
        };

        _free = new FreeCameraController();
        _camera.Controller = _free;

        _previousMouse = Mouse.GetState();

        base.Initialize();
    }

    protected override void LoadContent()
    {
        _effect = new BasicEffect(GraphicsDevice);
    }

    protected override void Update(GameTime gameTime)
    {
        var keyboard = Keyboard.GetState();
        var mouse = Mouse.GetState();

        // look around while the right button is held
        if (mouse.RightButton == ButtonState.Pressed)
            _free.Look(mouse.X - _previousMouse.X, mouse.Y - _previousMouse.Y);

        // moves are in the camera's own frame: Vector3.Forward is straight ahead
        if (keyboard.IsKeyDown(Keys.W)) _free.Move(Vector3.Forward);
        if (keyboard.IsKeyDown(Keys.S)) _free.Move(Vector3.Backward);
        if (keyboard.IsKeyDown(Keys.A)) _free.Move(Vector3.Left);
        if (keyboard.IsKeyDown(Keys.D)) _free.Move(Vector3.Right);

        _previousMouse = mouse;

        // runs the controller, then rebuilds the matrices that changed
        _camera.Update((float)gameTime.ElapsedGameTime.TotalSeconds);

        base.Update(gameTime);
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.Black);

        _effect.View = _camera.View;
        _effect.Projection = _camera.Projection;

        // relative to the camera's offset, see "The floating origin"
        _effect.World = Matrix.CreateTranslation(_cratePosition - _camera.Offset);

        // draw the crate with _effect here

        base.Draw(gameTime);
    }
}
```

The camera works out of the box: its constructor builds both matrices, with a 45° field of view, a 4:3 aspect ratio
and clip planes at 0.1 and 1000 units. Settings changed after it, as in the object initializer above, show in the
matrices from the next <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a>, so call it once per frame before anything draws. The
[pose and projection page](/docs/camera-pose/#projection) has the settings, and what to do when the window is resized.

Build the world matrices in `Draw`, after the update, and not once at load: the offset moves with the camera, see
[the floating origin](/docs/camera-picking/#the-floating-origin).

### Camera constructors

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/camera-glossary/cameras/camera/#camera">`Camera()`</a> | A camera at the origin looking down −Z, with a 45° field of view, a 4:3 aspect ratio and clip planes at 0.1 and 1000. Its matrices are ready at once. |
| <a class="ref method" href="/docs/camera-glossary/cameras/camera/#camera">`Camera(Vector3 position, Vector3 target, Vector3 up)`</a> | The same settings, at `position`, turned to face `target` with `up` as the roll reference. A `target` at `position` leaves it looking down −Z. |

### Camera update

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update(float elapsedSeconds)`</a> | Runs the controller, if there is one, with the seconds since the last frame, then moves the floating origin and rebuilds the view and the projection where they changed. Throws `InvalidOperationException` when <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#nearplane">`NearPlane`</a> isn't less than <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#farplane">`FarPlane`</a>. |

The other members of the camera are on the pages of what they do: the pose and the projection on the
[pose and projection page](/docs/camera-pose/#camera-pose-properties), picking and the offset on the
[picking and large worlds page](/docs/camera-picking/#camera-picking-methods), and the controller on the
[controllers page](/docs/camera-controllers/#camera-controller-property).

## Conventions

The camera uses MonoGame's right-handed frame: +X is right, +Y is up, and the camera looks down −Z, so
`Vector3.Forward` is `(0, 0, −1)`. <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#orientation">`Orientation`</a> turns the camera's own axes into world axes:
<a class="ref prop" href="/docs/camera-glossary/cameras/camera/#forward">`camera.Forward`</a> is `Vector3.Transform(Vector3.Forward, camera.Orientation)`, and the same goes for <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#right">`Right`</a> and <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#up">`Up`</a>.

| Quantity | Unit |
| --- | --- |
| Positions, distances and path lengths | World units, whatever your game makes them |
| Speeds | World units per second |
| The field of view | Degrees, vertical |
| Turns | Radians: the roll speed per second, the look sensitivity per unit of input |
| Times | Seconds |

The audio listener takes the same pose: hand the camera's <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#position">`Position`</a>, <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#forward">`Forward`</a>, <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#up">`Up`</a> and <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#right">`Right`</a> to
[`SetListenerData`](/docs/audio/#the-listener), converted to `System.Numerics.Vector3`.

## A fly-through and a tour

A free camera that records a tour as it flies: Space drops a waypoint where the camera is, facing where it faces, and
Enter plays the waypoints back as a smooth path that goes back and forth. Tab hands the camera back to the player,
from wherever the tour has taken it.

```csharp
using BorrowedTorch.Cameras;
using BorrowedTorch.Cameras.Animation;
using BorrowedTorch.Cameras.Controllers;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

public class TourRecorder
{
    private readonly Camera _camera;
    private readonly FreeCameraController _free = new();
    private readonly AnimatedCameraController _tour = new()
    {
        DurationSec = 20, // one way, end to end
        OpenPathAnimationMode = CameraAnimationMode.PingPong
    };
    private KeyboardState _previousKeys;
    private MouseState _previousMouse;

    public TourRecorder(Camera camera)
    {
        _camera = camera;
        _camera.Controller = _free;
        _previousMouse = Mouse.GetState();
    }

    public void Update(float elapsedSeconds)
    {
        var keys = Keyboard.GetState();
        var mouse = Mouse.GetState();

        if (_camera.Controller == _free)
        {
            if (mouse.RightButton == ButtonState.Pressed)
                _free.Look(mouse.X - _previousMouse.X, mouse.Y - _previousMouse.Y);

            if (keys.IsKeyDown(Keys.W)) _free.Move(Vector3.Forward);
            if (keys.IsKeyDown(Keys.S)) _free.Move(Vector3.Backward);
            if (keys.IsKeyDown(Keys.A)) _free.Move(Vector3.Left);
            if (keys.IsKeyDown(Keys.D)) _free.Move(Vector3.Right);

            // a waypoint where the camera is, facing where it faces
            if (WasPressed(keys, Keys.Space)) _tour.AddWaypoint(_camera);

            // the tour starts from the point of the path nearest the camera,
            // and eases onto it over two seconds
            if (WasPressed(keys, Keys.Enter) && _tour.Path.Waypoints.Count >= 2)
            {
                _camera.Controller = _tour;
                _tour.Play();
            }
        }
        else if (WasPressed(keys, Keys.Tab))
        {
            // back to flying, from where the tour left the camera
            _tour.Pause();
            _camera.Controller = _free;
        }

        _previousKeys = keys;
        _previousMouse = mouse;

        _camera.Update(elapsedSeconds);
    }

    private bool WasPressed(KeyboardState keys, Keys key)
    {
        return keys.IsKeyDown(key) && _previousKeys.IsKeyUp(key);
    }
}
```

Create it in `Initialize` with the game's camera, and call its `Update` from the game's `Update` in place of the
camera's. Each controller takes over the camera from where the other left it: the free camera keeps the tour's
orientation, and the tour eases in from the free camera's pose, so no switch makes a jump.

The [controllers page](/docs/camera-controllers/#attaching-a-controller) has more on switching, and the
[path playback page](/docs/camera-playback/#the-ends-of-a-path) on what a tour does at its ends.
