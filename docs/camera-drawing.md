---
layout: docs
legend: [prop, method]
title: "Camera: drawing a path"
description: The geometry a camera path hands you to draw it, fixed and adaptive lines, orientation frames, a line renderer, and geometry in buffers of your own.
---

A camera path can hand you what it takes to draw it: a line along the curve, the positions of its waypoints and
small frames that show which way the camera faces. It is plain data, with no drawing code and no graphics device, so
you draw it with your own line renderer, in an editor's overlay or a debug view. Names are colored by what they are:
a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the
plain color.

## Turning it on

Set <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isvisualized">`IsVisualized`</a> once, then read <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#visualgeometrybuffers">`VisualGeometryBuffers`</a> each frame you draw:

```csharp
path.IsVisualized = true;

// in Draw
var geometry = path.VisualGeometryBuffers;
```

Reading the property is what keeps the geometry current: it builds it again then if the path or its
<a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#visualoptions">`VisualOptions`</a> changed since the last read, and otherwise costs nothing. So read it through the property every
frame rather than keeping the instance: the instance stays the same, but its lists are only brought up to date when
the path is read. Turning
<a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isvisualized">`IsVisualized`</a> off empties the buffers and stops building them.

### CameraPath drawing properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isvisualized">`IsVisualized`</a> | `bool` | Whether the path keeps its drawing geometry current. Turning it off empties the buffers. Off by default. |
| <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#visualgeometrybuffers">`VisualGeometryBuffers`</a> | <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/">`CameraPathGeometryBuffers`</a> | Read-only. The geometry to draw, built again on this read when the path or the options changed. Empty while <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isvisualized">`IsVisualized`</a> is off. |
| <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#visualoptions">`VisualOptions`</a> | <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/">`CameraPathVisualOptions`</a> | How the geometry is built. <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`CameraPathVisualOptions.Default`</a> to start with. A struct: assign a changed copy. |

## The geometry

A <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/">`CameraPathGeometryBuffers`</a> holds four lists, all in world coordinates:

| List | What it holds | How to draw it |
| --- | --- | --- |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#polyline">`Polyline`</a> | Points along the curve, in order, from the start to the end. On a closed path the last point is the first one again. | A line through the points, each to the next. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#waypoints">`Waypoints`</a> | The position of each waypoint. | A marker at each. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#gizmos">`Gizmos`</a> | Orientation frames at even steps of distance: <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#gizmocount">`GizmoCount`</a> of them. On an open path the first is at the start and the last at the end; on a closed one they go evenly round. | Three short lines from each, along its axes. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#waypointgizmos">`WaypointGizmos`</a> | One orientation frame at each waypoint, with the orientation it resolves to. | The same, to show and edit each waypoint's facing. |

A frame is a <a class="ref" href="/docs/camera-glossary/paths/camera-path-gizmo/">`CameraPathGizmo`</a>: a <a class="ref" href="/docs/camera-glossary/paths/camera-path-gizmo/#position">`Position`</a> and the camera's <a class="ref" href="/docs/camera-glossary/paths/camera-path-gizmo/#right">`Right`</a>, <a class="ref" href="/docs/camera-glossary/paths/camera-path-gizmo/#up">`Up`</a> and <a class="ref" href="/docs/camera-glossary/paths/camera-path-gizmo/#forward">`Forward`</a> there, as
unit vectors in world space.

A path with one waypoint has no line, but its waypoint, one frame and one waypoint frame, so the facing shows while
you place the first waypoint. An empty path has nothing.

### CameraPathGizmo fields

| Field | Type | Description |
| --- | --- | --- |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-gizmo/#position">`Position`</a> | `Vector3` | Read-only. Where the frame is, in world coordinates. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-gizmo/#right">`Right`</a> | `Vector3` | Read-only. The camera's right there, its local +X. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-gizmo/#up">`Up`</a> | `Vector3` | Read-only. The camera's up there, its local +Y. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-gizmo/#forward">`Forward`</a> | `Vector3` | Read-only. The way the camera faces there, its local −Z. |

## Options

<a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/">`CameraPathVisualOptions`</a> is a struct. Change it by assigning a changed copy, which also marks the geometry for
building again:

```csharp
path.VisualOptions = path.VisualOptions with { GizmoCount = 24 };
```

The line along the curve is built one of two ways:

- **Fixed**, the default: <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#polylinesamples">`PolylineSamples`</a> segments of equal length along the curve, 128 by default, so 129
  points whatever the path's shape. The count is known in advance, which suits a vertex buffer of a fixed size.
- **Adaptive**, with <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#isadaptive">`IsAdaptive`</a>: the line is split wherever the curve strays from it by more than
  <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#chordtolerance">`ChordTolerance`</a>, 0.05 units by default. Straight runs get a few points and tight bends many, so a path
  looks as smooth up close as from afar. <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#maxsubdivisiondepth">`MaxSubdivisionDepth`</a>, 12 by default, caps how many times a piece is
  halved.

```csharp
path.VisualOptions = path.VisualOptions with { IsAdaptive = true, ChordTolerance = 0.02f };
```

<figure class="shot">
  <img src="{{ '/assets/img/camera/polyline-modes.svg' | relative_url }}" width="640" height="250" alt="The same S-shaped path drawn twice from above with its points marked, 33 on each: on the left the points are spaced evenly along it, on the right they bunch up in the bends and thin out on the straight runs">
  <figcaption>The same path with 33 points each, from the library's own geometry: a fixed line of 32 segments on the left, an adaptive line with a tolerance of 0.25 units on the right. The adaptive line spends its points where the curve bends.</figcaption>
</figure>

Start from <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`CameraPathVisualOptions.Default`</a>, or from the path's current options as above: a
`new CameraPathVisualOptions()` is all zeros, which gives no frames and a line of two points.

### CameraPathVisualOptions fields

| Field | Type | Description |
| --- | --- | --- |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#isadaptive">`IsAdaptive`</a> | `bool` | Whether the line is split where the curve bends, rather than into equal segments. Off in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a>. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#polylinesamples">`PolylineSamples`</a> | `int` | The number of equal segments of a fixed line; less than 1 counts as 1. 128 in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a>. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#chordtolerance">`ChordTolerance`</a> | `float` | How far, in world units, the curve may stray from an adaptive line before it is split, at least 10<sup>−5</sup>. 0.05 in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a>. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#maxsubdivisiondepth">`MaxSubdivisionDepth`</a> | `int` | How many times a piece of an adaptive line may be halved. 12 in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a>. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/#gizmocount">`GizmoCount`</a> | `int` | The number of orientation frames along the path; 0 or less gives none. 12 in <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a>. |

### CameraPathVisualOptions property

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/camera-glossary/paths/camera-path-visual-options/#default">`Default`</a> | <a class="ref" href="/docs/camera-glossary/paths/camera-path-visual-options/">`CameraPathVisualOptions`</a> | Static, read-only. The default options: a fixed line of 128 segments and 12 frames. |

## A line renderer

A small renderer for the geometry, with MonoGame's `BasicEffect`. It draws the curve, a cross on each waypoint and
the frames, with the camera's right in red, its up in green and its forward in blue.

```csharp
using BorrowedTorch.Cameras;
using BorrowedTorch.Cameras.Animation;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

public class PathRenderer
{
    private readonly BasicEffect _effect;
    private readonly List<VertexPositionColor> _lines = [];
    private VertexPositionColor[] _vertices = [];
    private Vector3 _offset;

    public PathRenderer(GraphicsDevice device)
    {
        _effect = new BasicEffect(device) { VertexColorEnabled = true };
    }

    public void Draw(CameraPath path, Camera camera)
    {
        var geometry = path.VisualGeometryBuffers; // built again here if the path changed

        // the vertices relative to the camera's offset, like every other object
        _offset = camera.Offset;
        _lines.Clear();

        for (var i = 1; i < geometry.Polyline.Count; i++)
            AddLine(geometry.Polyline[i - 1], geometry.Polyline[i], Color.Gold);

        foreach (var p in geometry.Waypoints)
        {
            AddLine(p - Vector3.UnitX * 0.3f, p + Vector3.UnitX * 0.3f, Color.White);
            AddLine(p - Vector3.UnitY * 0.3f, p + Vector3.UnitY * 0.3f, Color.White);
            AddLine(p - Vector3.UnitZ * 0.3f, p + Vector3.UnitZ * 0.3f, Color.White);
        }

        foreach (var g in geometry.Gizmos)
        {
            AddLine(g.Position, g.Position + g.Right * 0.5f, Color.Red);
            AddLine(g.Position, g.Position + g.Up * 0.5f, Color.Lime);
            AddLine(g.Position, g.Position + g.Forward, Color.Blue);
        }

        if (_lines.Count == 0) return;

        if (_vertices.Length < _lines.Count) _vertices = new VertexPositionColor[_lines.Count * 2];
        _lines.CopyTo(_vertices);

        _effect.World = Matrix.Identity;
        _effect.View = camera.View;
        _effect.Projection = camera.Projection;

        foreach (var pass in _effect.CurrentTechnique.Passes)
        {
            pass.Apply();
            _effect.GraphicsDevice.DrawUserPrimitives(PrimitiveType.LineList, _vertices, 0, _lines.Count / 2);
        }
    }

    private void AddLine(Vector3 from, Vector3 to, Color color)
    {
        _lines.Add(new VertexPositionColor(from - _offset, color));
        _lines.Add(new VertexPositionColor(to - _offset, color));
    }
}
```

Call its `Draw` from the game's `Draw`, after the camera's update. It subtracts the
[offset](/docs/camera-picking/#drawing-relative-to-the-offset) from each vertex on the CPU, rather than putting it in
the world matrix, so lines far from the origin stay as steady as the rest of the scene.

## Buffers of your own

<a class="ref method" href="/docs/camera-glossary/paths/camera-path-visualizer/#build">`CameraPathVisualizer.Build`</a> fills buffers of your own with a path's geometry, with any options, whether the path
has <a class="ref prop" href="/docs/camera-glossary/paths/camera-path/#isvisualized">`IsVisualized`</a> on or not. A path that is visualized calls it itself; call it directly to draw one path two
ways, say a fine line in the editor's main view and a coarse one in a minimap:

```csharp
var minimap = new CameraPathGeometryBuffers();

CameraPathVisualizer.Build(path, minimap,
    CameraPathVisualOptions.Default with { PolylineSamples = 24, GizmoCount = 0 });
```

It empties the buffers before it fills them, and builds them at once, on every call: call it again after the path
changes.

### CameraPathGeometryBuffers members

| Member | Type | Description |
| --- | --- | --- |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#polyline">`Polyline`</a> | `List<Vector3>` | Read-only field. Points along the curve, in order. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#waypoints">`Waypoints`</a> | `List<Vector3>` | Read-only field. The position of each waypoint. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#gizmos">`Gizmos`</a> | `List<CameraPathGizmo>` | Read-only field. Orientation frames at even steps of distance. |
| <a class="ref" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#waypointgizmos">`WaypointGizmos`</a> | `List<CameraPathGizmo>` | Read-only field. An orientation frame at each waypoint. |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path-geometry-buffers/#clear">`Clear()`</a> | | Empties the four lists. |

### CameraPathVisualizer methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/camera-glossary/paths/camera-path-visualizer/#build">`Build(CameraPath path, CameraPathGeometryBuffers buffers, in CameraPathVisualOptions options)`</a> | Static. Empties the buffers and fills them with the path's geometry, built with the options. Throws `ArgumentNullException` for a `null` path or buffers. |
