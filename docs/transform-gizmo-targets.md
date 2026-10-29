---
layout: docs
legend: [prop, method]
title: "Transform gizmo: targets"
description: The target interface, what the gizmo reads and writes and when, targets for objects with and without parents, lights and markers, and the axes of a target.
---

The gizmo owns no pose of its own. It reads one from a target and, while a handle is dragged, writes part of it back.
A target is a small adapter over one of your objects, an <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/">`ITransformGizmoTarget`</a> with five properties, so the
gizmo works with whatever your scene is made of. Names are colored by what they are: a
<span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the
plain color.

## The target interface

| Property | Read | Written |
| --- | --- | --- |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#capabilities">`Capabilities`</a> | While no drag runs, by <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#update">`Update`</a>, <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#trybegindrag">`TryBeginDrag`</a> and <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/transform-gizmo/#draw">`Draw`</a> | Never |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldposition">`WorldPosition`</a> | To draw and pick the gizmo there, and when a drag begins | By a move drag |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldaxes">`WorldAxes`</a> | To draw and pick the local handles, and when a drag begins | Never |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#localrotation">`LocalRotation`</a> | When a rotate drag begins | By a rotate drag |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#localscale">`LocalScale`</a> | When a scale drag begins | By a scale drag |

A drag writes only what its handle edits: a move drag sets <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldposition">`WorldPosition`</a> and nothing else.
The gizmo never offers a mode the target's [capabilities](/docs/transform-gizmo-capabilities/) leave out, so a
target can ignore the setter of what it doesn't offer: a light with nothing to scale can return `Vector3.One` and
drop any new scale.

The gizmo keeps no reference to a target between calls; it works on the one it is given each time. Make a target when
the selection changes, keep one with each object, or make one each frame: all three work. During a drag, keep passing
the target the drag began on, see [during a drag](/docs/transform-gizmo-dragging/#during-a-drag).

### ITransformGizmoTarget properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#capabilities">`Capabilities`</a> | <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-capabilities/">`GizmoCapabilities`</a> | Read-only. The modes, and for move and rotate the frames, the gizmo offers for this target. `None` hides the gizmo. |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldposition">`WorldPosition`</a> | `Vector3` | The pivot, in world coordinates: where the gizmo is drawn, and what a move drag sets. |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldaxes">`WorldAxes`</a> | <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/">`GizmoBasis`</a> | Read-only. The target's own axes as they point in the world, from <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#fromobjectaxes">`FromObjectAxes`</a>. The local handles lie along them. |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#localrotation">`LocalRotation`</a> | `Quaternion` | The rotation relative to the parent: what a rotate drag composes its turn onto, and sets. |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#localscale">`LocalScale`</a> | `Vector3` | The scale along the target's own axes: what a scale drag multiplies, and sets. |

## A plain object

An object with no parent keeps its pose in world space, so the target hands it straight over. The `PropTarget` of the
[quick start guide](/docs/transform-gizmo/#setting-up-the-gizmo):

```csharp
public class PropTarget(Prop prop) : ITransformGizmoTarget
{
    public GizmoCapabilities Capabilities => GizmoCapabilities.All;

    public Vector3 WorldPosition
    {
        get => prop.Position;
        set => prop.Position = value;
    }

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
```

The axes come from the world matrix, whose `Right`, `Up` and `Backward` rows are the object's +X, +Y and +Z as they
point in the world. They carry the object's scale, which <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#fromobjectaxes">`FromObjectAxes`</a> takes off, so the arms are
the same length however the object is scaled. Take them from the matrix rather than from the rotation alone: the
matrix also tells a mirrored object apart, see [skewed and mirrored objects](/docs/transform-gizmo-modes/#skewed-and-mirrored-objects).

The gizmo stands at <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldposition">`WorldPosition`</a>, and a turn or a scale changes the rotation and the
scale, which the object's own matrix applies about its origin. So give the origin as the pivot, the translation of the
world matrix, and the object turns about the point the gizmo stands on. A model with its origin at its feet turns
about its feet.

## An object with a parent

In a hierarchy, the pose is relative to the parent, and the gizmo splits the work: a move arrives in world space, a
turn and a scale in the object's own.

```csharp
public class Node
{
    public Node Parent;
    public Vector3 LocalPosition;
    public Quaternion LocalRotation = Quaternion.Identity;
    public Vector3 LocalScale = Vector3.One;

    public Matrix World
    {
        get
        {
            var local = Matrix.CreateScale(LocalScale)
                        * Matrix.CreateFromQuaternion(LocalRotation)
                        * Matrix.CreateTranslation(LocalPosition);

            return Parent == null ? local : local * Parent.World;
        }
    }
}

public class NodeTarget(Node node) : ITransformGizmoTarget
{
    public GizmoCapabilities Capabilities => GizmoCapabilities.All;

    // a move arrives as a world position: carried into the parent's space
    public Vector3 WorldPosition
    {
        get => node.World.Translation;
        set => node.LocalPosition = node.Parent == null
            ? value
            : Vector3.Transform(value, Matrix.Invert(node.Parent.World));
    }

    public GizmoBasis WorldAxes
    {
        get
        {
            var world = node.World;
            return GizmoBasis.FromObjectAxes(world.Right, world.Up, world.Backward);
        }
    }

    // a turn and a scale stay in the node's own space
    public Quaternion LocalRotation
    {
        get => node.LocalRotation;
        set => node.LocalRotation = value;
    }

    public Vector3 LocalScale
    {
        get => node.LocalScale;
        set => node.LocalScale = value;
    }
}
```

A position carries through any chain of parents exactly: the inverse of the parent's world matrix takes a world
position home, however the parents are turned or scaled. A rotation and a scale don't. Under a parent scaled more
along one axis than the others, a turned child's world matrix is sheared, and a world rotation or scale taken out of it
and pushed back through the parent wouldn't come back as the same pose. So the gizmo works out a rotate or a scale drag
in the object's own frame and hands it over as <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#localrotation">`LocalRotation`</a> and
<a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#localscale">`LocalScale`</a>, to be stored as they are.

A rotate drag about one of the world's axes still turns the object about that world axis: the gizmo carries the axis
into the object's frame before it composes the turn, so the parents make no difference.

## Lights and markers

A target needs no mesh. A spot light has a position and a direction and nothing to scale; a point light only a
position:

```csharp
public class SpotLightTarget(SpotLight light) : ITransformGizmoTarget
{
    public GizmoCapabilities Capabilities => GizmoCapabilities.Translate | GizmoCapabilities.Rotate;

    public Vector3 WorldPosition
    {
        get => light.Position;
        set => light.Position = value;
    }

    public GizmoBasis WorldAxes
    {
        get
        {
            var rotation = Matrix.CreateFromQuaternion(light.Orientation);
            return GizmoBasis.FromObjectAxes(rotation.Right, rotation.Up, rotation.Backward);
        }
    }

    public Quaternion LocalRotation
    {
        get => light.Orientation;
        set => light.Orientation = value;
    }

    // never set: scale isn't offered
    public Vector3 LocalScale
    {
        get => Vector3.One;
        set { }
    }
}

public class PointLightTarget(PointLight light) : ITransformGizmoTarget
{
    public GizmoCapabilities Capabilities => GizmoCapabilities.Translate;

    public Vector3 WorldPosition
    {
        get => light.Position;
        set => light.Position = value;
    }

    // no orientation of its own: the local arms are the world's
    public GizmoBasis WorldAxes => GizmoBasis.World;

    public Quaternion LocalRotation
    {
        get => Quaternion.Identity;
        set { }
    }

    public Vector3 LocalScale
    {
        get => Vector3.One;
        set { }
    }
}
```

A target can also stand for part of an object. The waypoints of a [camera path](/docs/camera-paths/#waypoints) are
values in a list, and a target over one of them writes the whole waypoint back:

```csharp
public class WaypointTarget(CameraPath path, int index) : ITransformGizmoTarget
{
    public GizmoCapabilities Capabilities => GizmoCapabilities.TranslateGlobal;

    public Vector3 WorldPosition
    {
        get => path.Waypoints[index].Position;
        set => path.SetWaypoint(index, path.Waypoints[index] with { Position = value });
    }

    public GizmoBasis WorldAxes => GizmoBasis.World;

    public Quaternion LocalRotation
    {
        get => Quaternion.Identity;
        set { }
    }

    public Vector3 LocalScale
    {
        get => Vector3.One;
        set { }
    }
}
```

## The axes of a target

<a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldaxes">`WorldAxes`</a> is a <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/">`GizmoBasis`</a>: three unit vectors, the target's +X, +Y and +Z as they
point in the world. The local handles lie along them. Build it with <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#fromobjectaxes">`FromObjectAxes`</a>, from the rows of
the world matrix:

- **Normalized, nothing more.** Each axis keeps its direction exactly, so the arms lie along the object's own edges,
  even where its parents have skewed them out of square.
- **Mirroring kept.** A negative scale turns its axis around, and the basis keeps it that way;
  <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#islefthanded">`IsLeftHanded`</a> reports it.
- **A zero axis replaced.** An object scaled to nothing along an axis has no direction there, and the matching world
  axis takes its place.

The constructor takes the axes as they are given, so they must be unit length already: raw matrix rows carry the
object's scale. <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#world">`World`</a> is the world's own frame, the one the global modes use, and a fine
<a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/i-transform-gizmo-target/#worldaxes">`WorldAxes`</a> for a target with no orientation.

### GizmoBasis construction

| Member | Description |
| --- | --- |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#fromobjectaxes">`FromObjectAxes(Vector3 x, Vector3 y, Vector3 z)`</a> | Static. An object's own axes as they point in the world, from the rows of its world matrix: each normalized with its direction kept; an axis of length zero becomes the matching world axis. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#gizmobasis">`GizmoBasis(Vector3 x, Vector3 y, Vector3 z)`</a> | A basis of the axes as given, which must be unit length. |
| <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#world">`World`</a> | Static, read-only field. The world's axes, `Vector3.UnitX`, `Vector3.UnitY` and `Vector3.UnitZ`. |

## Basis maths for tools of your own

<a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/">`GizmoBasis`</a> also has the maths the gizmo does with it, for tools of your own that work in the same frames: a
snap to a target's axis, say, or a handle the gizmo doesn't have.

- **<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#direction">`Direction`</a>** looks an axis up by <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-axis/">`GizmoAxis`</a>: X, Y or Z, or `Vector3.Zero` for `None` and
  `Center`.
- **<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#planebasis">`PlaneBasis`</a>** gives two perpendicular unit vectors, `u` and `v`, spanning the plane square to an
  axis, with u × v along the axis, so turning from `u` toward `v` is a positive turn about it. A rotate ring lies in
  that plane. It is built from the axis alone, not from the other two, which a skewed frame doesn't keep square to it.
  Where `u` lies around the circle is arbitrary, so use differences of angles.
- **<a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#orthonormalized">`Orthonormalized`</a>** squares a frame up: the closest frame with perpendicular axes, mirrored if the
  original is. X stays, Y loses its part along X, and Z its parts along both. A frame with no shear comes back as it
  was; for a sheared one, which no rotation describes, it is the best stand-in.
- **<a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#islefthanded">`IsLeftHanded`</a>** says whether the frame is mirrored: (X × Y) · Z is negative, as for an object with
  one or three negative scales. Two negative scales make a half turn, which is right-handed.

The angle of a point around a target's Y axis, measured as a rotate ring measures it:

```csharp
target.WorldAxes.PlaneBasis(GizmoAxis.Y, out var u, out var v);

var offset = point - target.WorldPosition;
var angle = MathF.Atan2(Vector3.Dot(offset, v), Vector3.Dot(offset, u));
```

### GizmoBasis members

| Member | Description |
| --- | --- |
| <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#x">`X`</a>, <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#y">`Y`</a> and <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#z">`Z`</a> | Read-only fields. The three axes, as unit vectors in world space. |
| <a class="ref prop" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#islefthanded">`IsLeftHanded`</a> | Read-only. Whether the frame is mirrored: (X × Y) · Z is negative. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#direction">`Direction(GizmoAxis axis)`</a> | The axis's direction, or `Vector3.Zero` for `None` and `Center`. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#planebasis">`PlaneBasis(GizmoAxis axis, out Vector3 u, out Vector3 v)`</a> | Two perpendicular unit vectors spanning the plane square to the axis, with u × v along it. `Vector3.UnitX` and `Vector3.UnitY` for an axis with no direction. |
| <a class="ref method" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#orthonormalized">`Orthonormalized()`</a> | The closest frame with perpendicular axes, mirrored if this one is. A frame collapsed onto one line comes back as <a class="ref" href="/docs/transform-gizmo-glossary/gizmo/gizmo-basis/#world">`World`</a>. |

### GizmoAxis values

| Value | Description |
| --- | --- |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-axis/#none">`None`</a> | No handle. Its direction is `Vector3.Zero`. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-axis/#x">`X`</a>, <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-axis/#y">`Y`</a> and <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-axis/#z">`Z`</a> | An axis, and its arm, ring or scale box. |
| <a class="ref" href="/docs/transform-gizmo-glossary/types/gizmo-axis/#center">`Center`</a> | The pivot square, the handle of uniform scale. Its direction is `Vector3.Zero`. |
