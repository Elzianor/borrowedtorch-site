---
layout: docs
legend: [prop, method]
title: "Camera: controllers"
description: Attaching and switching controllers, who owns the camera's pose, the free camera and its input, snapping to an axis, and writing a controller of your own.
---

A controller drives a camera: once per frame, from inside the camera's <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a>, it sets where the camera is
and which way it faces. The library has two, a free camera for flying under the player's input and an
[animated camera](/docs/camera-playback/) that plays a path, and you can write your own. Names are colored by what
they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields
keep the plain color.

## Attaching a controller

Assign the controller to the camera's <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#controller">`Controller`</a>, or call the controller's <a class="ref method" href="/docs/camera-glossary/cameras/base-camera-controller/#applyto">`ApplyTo`</a>: the two do the
same.

```csharp
camera.Controller = free; // fly
camera.Controller = tour; // play a path, from where the free camera left the camera
tour.ApplyTo(camera);     // the same as the line above
camera.Controller = null; // drive the camera yourself
```

A camera has one controller at most, and a controller drives one camera at a time. When you attach one:

1. **The camera's previous controller is detached.** It keeps its own settings and state, ready to be attached again.
2. **A controller attached to another camera leaves it.** That camera is left with no controller.
3. **The new controller takes over the camera's state, once.** A free camera adopts the camera's orientation, roll
   included; an animated camera finds the point of its path nearest the camera and eases onto it.

So switching between controllers never makes the camera jump: each one starts from where the other left it.
Assigning the controller that is already attached does nothing; to make it take over the camera's state again, set
`Controller` to `null` and back.

The camera calls its controller's `Update` at the start of its own <a class="ref method" href="/docs/camera-glossary/cameras/camera/#update">`Update`</a>, with the same seconds. Don't call
it yourself as well, or the controller moves twice in a frame.

### Who owns the pose

While a controller is attached, it sets the camera's pose in every update, and what you set by hand between two
updates may not last:

| Controller | Position | Orientation |
| --- | --- | --- |
| None | Yours. | Yours. |
| <a class="ref" href="/docs/camera-glossary/cameras/free-camera-controller/">`FreeCameraController`</a> | Moves on from the camera's position, so a position you set is kept: teleporting works. | Its own, written to the camera in every update: one you set, or a <a class="ref method" href="/docs/camera-glossary/cameras/camera/#lookat">`LookAt`</a>, is replaced. Attach the controller again to make it adopt yours. |
| <a class="ref" href="/docs/camera-glossary/cameras/animated-camera-controller/">`AnimatedCameraController`</a> | The path's, written in every update once the path has a waypoint. | The path's, in the same way. |

To turn a free camera toward something without detaching it, use <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#snapto">`SnapTo`</a>, see
[snapping to an axis](#snapping-to-an-axis). For an instant turn, look first and attach again:

```csharp
camera.Controller = null;
camera.LookAt(target, Vector3.Up);
camera.Controller = free; // adopts the new orientation
```

### Camera controller property

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#controller">`Controller`</a> | <a class="ref" href="/docs/camera-glossary/cameras/base-camera-controller/">`BaseCameraController?`</a> | The controller driving the camera, or `null`. Assigning one detaches the previous controller, takes the new one from any camera it drives, and lets it adopt this camera's state once. |

## The free camera

<a class="ref" href="/docs/camera-glossary/cameras/free-camera-controller/">`FreeCameraController`</a> flies with six degrees of freedom: it moves along and turns about the camera's own
axes. It holds its orientation as a quaternion, so yaw always turns about the camera's own up, pitch about its own
right and roll about its own forward. The controls match what is on screen however the camera is banked, and there is
no pitch limit: look up past the vertical and the world turns upside down, as in a space game or an editor's fly mode.
A camera that should keep the horizon level is [a controller of your own](#writing-a-controller).

Three methods take the input. Calls within a frame add up, and the next update uses them and starts again from zero,
so call them every frame the input is held:

- **<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#look">`Look`</a>** turns by mouse-style deltas: positive yaw looks right and positive pitch looks down, the
  directions in which the mouse's x and y grow. Each unit turns by <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#looksensitivity">`LookSensitivity`</a> radians: at the default
  0.0025, a mouse moved 100 pixels turns the view by 14°. A delta is already a distance, so it isn't scaled by the
  time.
- **<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#move">`Move`</a>** moves in the camera's own frame: x to the right, y up and −z forward, so `Vector3.Forward` moves
  ahead and `Vector3.Up` rises along the camera's up. The sum of a frame is capped at unit length and moves at
  <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#movespeedunitsec">`MoveSpeedUnitSec`</a>: a stick pushed halfway moves at half speed, and W and D held together move diagonally at
  full speed, not faster.
- **<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#roll">`Roll`</a>** rolls clockwise for a positive value and counterclockwise for a negative one, at
  <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#rollspeedradsec">`RollSpeedRadSec`</a> for 1: hold a key and pass 1 every frame.

Move and roll are rates, scaled by the seconds of the update. Look isn't: for a gamepad stick, scale the deflection by
the time yourself.

```csharp
var pad = GamePad.GetState(PlayerIndex.One);
var seconds = (float)gameTime.ElapsedGameTime.TotalSeconds;

// left stick to move: MonoGame's stick y is up, the camera's forward is -z
free.Move(new Vector3(pad.ThumbSticks.Left.X, 0, -pad.ThumbSticks.Left.Y));

// triggers to rise and sink, in the camera's frame
free.Move(new Vector3(0, pad.Triggers.Right - pad.Triggers.Left, 0));

// right stick to look, 2 radians a second at full deflection
var look = 2.0f * seconds / free.LookSensitivity;
free.Look(pad.ThumbSticks.Right.X * look, -pad.ThumbSticks.Right.Y * look);

// shoulders to roll
if (pad.IsButtonDown(Buttons.RightShoulder)) free.Roll(1);
if (pad.IsButtonDown(Buttons.LeftShoulder)) free.Roll(-1);
```

The settings can change at any time, for example a sprint key:

```csharp
free.MoveSpeedUnitSec = keyboard.IsKeyDown(Keys.LeftShift) ? 80 : 20;
```

For mouse look without holding a button, hide the cursor, read how far it moved from the center of the window, and
put it back:

```csharp
IsMouseVisible = false;

var center = new Point(Window.ClientBounds.Width / 2, Window.ClientBounds.Height / 2);
var mouse = Mouse.GetState();

free.Look(mouse.X - center.X, mouse.Y - center.Y);
Mouse.SetPosition(center.X, center.Y);
```

### FreeCameraController properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#movespeedunitsec">`MoveSpeedUnitSec`</a> | `float` | The speed of a full <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#move">`Move`</a>, in units per second. 20 by default. |
| <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#rollspeedradsec">`RollSpeedRadSec`</a> | `float` | The speed of a full <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#roll">`Roll`</a>, in radians per second. 2.5 by default. |
| <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#looksensitivity">`LookSensitivity`</a> | `float` | The turn of one unit of <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#look">`Look`</a>, in radians. 0.0025 by default. |
| <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#axissnapconvergencesec">`AxisSnapConvergenceSec`</a> | `float` | The seconds a <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#snapto">`SnapTo`</a> takes to cover 95 % of its turn. 0.18 by default. |

### FreeCameraController methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#freecameracontroller">`FreeCameraController()`</a> | A free camera with the default speeds and sensitivity. |
| <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#look">`Look(float deltaYaw, float deltaPitch)`</a> | Turns by mouse-style deltas times <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#looksensitivity">`LookSensitivity`</a>: positive yaw looks right, positive pitch looks down. Cancels a snap. |
| <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#move">`Move(Vector3 delta)`</a> | Moves in the camera's own frame, x right, y up, −z forward, at up to <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#movespeedunitsec">`MoveSpeedUnitSec`</a>: the frame's sum is capped at unit length. |
| <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#roll">`Roll(float direction)`</a> | Rolls clockwise for a positive value, counterclockwise for a negative one, at <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#rollspeedradsec">`RollSpeedRadSec`</a> per unit. Cancels a snap. |
| <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#snapto">`SnapTo(Vector3 forward)`</a> | Turns smoothly to face the direction, leveled against world up. |
| <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#update">`Update(float elapsedSeconds)`</a> | Applies the frame's input to the camera. The camera calls it. |

## Snapping to an axis

<a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#snapto">`SnapTo`</a> turns the free camera smoothly to face a direction, with its roll leveled against world +Y. It is made for
an orientation widget such as [BorrowedTorch.SceneGizmo](/docs/scene-gizmo-picking/#snapping-the-view): pass the
opposite of the axis the player clicked, so that the axis points at the viewer.

```csharp
free.SnapTo(-Vector3.UnitX); // look along -X, level
free.SnapTo(Vector3.Down);   // a top view, the top of the screen toward -Z
```

The turn slows down as it closes in: it covers 95 % of the way in <a class="ref prop" href="/docs/camera-glossary/cameras/free-camera-controller/#axissnapconvergencesec">`AxisSnapConvergenceSec`</a>, whatever the frame
rate, and settles on the exact orientation once it is within 0.0015 radians of it. A value of 0 or less snaps almost
at once. Any <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#look">`Look`</a> or <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#roll">`Roll`</a> input cancels the snap and takes over; <a class="ref method" href="/docs/camera-glossary/cameras/free-camera-controller/#move">`Move`</a> doesn't, so the player can
keep flying while the view turns. A direction of length zero is ignored.

## Writing a controller

Derive from <a class="ref" href="/docs/camera-glossary/cameras/base-camera-controller/">`BaseCameraController`</a> and override two methods:

- **<a class="ref method" href="/docs/camera-glossary/cameras/base-camera-controller/#update">`Update`</a>** moves the camera. <a class="ref prop" href="/docs/camera-glossary/cameras/base-camera-controller/#camera">`Camera`</a> is the camera being driven, or `null` while the controller is
  detached, so check it first.
- **<a class="ref method" href="/docs/camera-glossary/cameras/base-camera-controller/#syncfrom">`SyncFrom`</a>**, optional, runs once when the controller is attached, with <a class="ref prop" href="/docs/camera-glossary/cameras/base-camera-controller/#camera">`Camera`</a> already set, to take
  over the camera's state.

An orbit camera, for an editor or a third-person view: it circles a target, keeps the horizon level and never goes
over the top.

```csharp
using BorrowedTorch.Cameras.Controllers.Base;
using Microsoft.Xna.Framework;

public class OrbitCameraController : BaseCameraController
{
    private float _yaw;   // radians about +Y; 0 is on the +Z side of the target
    private float _pitch; // radians; positive is above the target, looking down

    public Vector3 Target { get; set; }
    public float Distance { get; set; } = 10;

    // positive yaw circles to the camera's right, positive pitch rises
    public void Orbit(float deltaYaw, float deltaPitch)
    {
        _yaw += deltaYaw;
        _pitch = MathHelper.Clamp(_pitch + deltaPitch, -1.5f, 1.5f); // short of straight up and down
    }

    // on attachment: the orbit that puts the camera where it already is
    protected override void SyncFrom()
    {
        if (Camera == null) return;

        var toCamera = Camera.Position - Target;
        Distance = MathF.Max(toCamera.Length(), 0.01f);
        _yaw = MathF.Atan2(toCamera.X, toCamera.Z);
        _pitch = MathF.Asin(MathHelper.Clamp(toCamera.Y / Distance, -1, 1));
    }

    public override void Update(float elapsedSeconds)
    {
        if (Camera == null) return;

        // no roll, so the horizon stays level
        var rotation = Quaternion.CreateFromYawPitchRoll(_yaw, -_pitch, 0);

        Camera.Orientation = rotation;
        Camera.Position = Target + Vector3.Transform(Vector3.Backward, rotation) * Distance;
    }
}
```

The camera ends up `Distance` behind its own forward from the target, so it always looks at the target. Attached in
place of a free camera, it picks up the orbit the camera is already on and turns it to face the target. The
protected constant <a class="ref" href="/docs/camera-glossary/cameras/base-camera-controller/#convergenceamount">`ConvergenceAmount`</a>, 0.95, is the share of the way that the free camera's snap covers in its
convergence time; with `MathUtils` from BorrowedTorch.Math, it gives a controller of your own the same frame-rate
independent easing.

### BaseCameraController members

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/camera-glossary/cameras/base-camera-controller/#camera">`Camera`</a> | Protected, read-only. The camera this controller drives, or `null` while it is detached. |
| <a class="ref" href="/docs/camera-glossary/cameras/base-camera-controller/#convergenceamount">`ConvergenceAmount`</a> | Protected constant. 0.95, the share of the way an easing covers in its convergence time. |
| <a class="ref method" href="/docs/camera-glossary/cameras/base-camera-controller/#applyto">`ApplyTo(Camera camera)`</a> | Attaches the controller to the camera, the same as assigning <a class="ref prop" href="/docs/camera-glossary/cameras/camera/#controller">`camera.Controller`</a>. Throws `ArgumentNullException` for `null`. |
| <a class="ref method" href="/docs/camera-glossary/cameras/base-camera-controller/#syncfrom">`SyncFrom()`</a> | Protected, virtual. Called once on attachment, with <a class="ref prop" href="/docs/camera-glossary/cameras/base-camera-controller/#camera">`Camera`</a> set, to take over the camera's state. Does nothing by default. |
| <a class="ref method" href="/docs/camera-glossary/cameras/base-camera-controller/#update">`Update(float elapsedSeconds)`</a> | Abstract. Moves the camera; the camera calls it at the start of its own update. |
