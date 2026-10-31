---
layout: docs
legend: [prop, method, event]
title: "Glossary: Fabric"
description: "The members of Fabric, in alphabetical order."
---

A simulated sheet of cloth: it builds the grid of particles, keeps the pins and the damage, and drives the solver every frame. It draws nothing.

A sealed class, in the namespace `BorrowedTorch.FabricSimulator.Simulation`. It takes a <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/">`FabricEffect`</a>, which owns the GPU buffers and runs the steps, and a <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/">`FabricSettings`</a>, which it applies before every step. The sheet itself is built by <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, or by the first call that needs it. The [quick start guide](/docs/fabric-simulation/#a-first-sheet) shows it in context, with code. Most members upload to the GPU or read from it: call them from the thread that owns the graphics device.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="builtheight"><span class="prop"><code>BuiltHeight</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-size-properties" title="BuiltHeight in context on the sheet and step page" aria-label="BuiltHeight in context on the sheet and step page">→</a></h3>

`float` · Read-only. The sheet's height as built, in meters: <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#height">`Height`</a> less what the starting wave of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#seedripple">`SeedRipple`</a> takes up, a few percent at most. The wave's rows start at their rest length on its steepest rise, so wavy cloth is narrower rather than stretched. 0 until the sheet is built.

<h3 id="builtwidth"><span class="prop"><code>BuiltWidth</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-size-properties" title="BuiltWidth in context on the sheet and step page" aria-label="BuiltWidth in context on the sheet and step page">→</a></h3>

`float` · Read-only. The sheet's width as built, in meters: <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#width">`Width`</a> less what the starting wave takes up, as for <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#builtheight">`BuiltHeight`</a>. 0 until the sheet is built.

<h3 id="effect"><span class="prop"><code>Effect</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-build-members" title="Effect in context on the sheet and step page" aria-label="Effect in context on the sheet and step page">→</a></h3>

<a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/">`FabricEffect`</a> · Read-only. The solver driving this sheet, given to the constructor. A renderer reads its <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#particlebuffer">`ParticleBuffer`</a>, and its diagnostics are read from it.

<h3 id="hastears"><span class="prop"><code>HasTears</code></span> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabric-cut-members" title="HasTears in context on the cuts page" aria-label="HasTears in context on the cuts page">→</a></h3>

`bool` · Read-only. Whether the sheet has any damage: a thread severed by <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Cut`</a> or <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#tear">`Tear`</a>. Free to ask. `false` again after <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cleartears">`ClearTears`</a> and <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>.

<h3 id="height"><span class="prop"><code>Height</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-size-properties" title="Height in context on the sheet and step page" aria-label="Height in context on the sheet and step page">→</a></h3>

`float` · Read-only. The flat sheet's height, in meters, or its depth when it lies <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-orientation/#horizontal">`Horizontal`</a>: `(HeightInParticles - 1) × RestLength`. The range of a cut's v coordinate, from 0 at the first row to `Height` at the last. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#builtheight">`BuiltHeight`</a> is the as-built figure.

<h3 id="heightinparticles"><span class="prop"><code>HeightInParticles</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-size-properties" title="HeightInParticles in context on the sheet and step page" aria-label="HeightInParticles in context on the sheet and step page">→</a></h3>

`int` · Read-only. Points from the first row to the last, as built; until the sheet is built, the settings' <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#heightinparticles">`HeightInParticles`</a>. Bind this one, not the settings', to a shader's `FabricHeightInParticles`: the settings may run ahead of the next <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>.

<h3 id="isbuilt"><span class="prop"><code>IsBuilt</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-build-members" title="IsBuilt in context on the sheet and step page" aria-label="IsBuilt in context on the sheet and step page">→</a></h3>

`bool` · Read-only. Whether the sheet has been built, by <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a> or by a first call that needed it. Until it is, the size properties report the settings' figures.

<h3 id="orientation"><span class="prop"><code>Orientation</code></span> <a class="ctx" href="/docs/fabric-simulation-pins/#fabric-placement-properties" title="Orientation in context on the placement and pins page" aria-label="Orientation in context on the placement and pins page">→</a></h3>

<a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-orientation/">`FabricOrientation`</a> · The plane the sheet is built in: <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-orientation/#vertical">`Vertical`</a>, the default, spans X and Y; <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-orientation/#horizontal">`Horizontal`</a> spans X and Z. Read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>.

<h3 id="origin"><span class="prop"><code>Origin</code></span> <a class="ctx" href="/docs/fabric-simulation-pins/#fabric-placement-properties" title="Origin in context on the placement and pins page" aria-label="Origin in context on the placement and pins page">→</a></h3>

`Vector3` · The middle of the sheet in world space, on both axes and in either orientation, so a sheet resized stays where it was put. `(0, 3, 0)` by default. Read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, which throws `InvalidOperationException` for one that isn't finite. To move a sheet, set it and rebuild: the particles live in world space, so a world matrix in the shader would draw the cloth away from where it is simulated.

<h3 id="particlecount"><span class="prop"><code>ParticleCount</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-size-properties" title="ParticleCount in context on the sheet and step page" aria-label="ParticleCount in context on the sheet and step page">→</a></h3>

`int` · Read-only. Points in the sheet, `WidthInParticles × HeightInParticles`, as built; the settings' figure until then. The ids of a cut mesh's seam vertices start here.

<h3 id="pinmode"><span class="prop"><code>PinMode</code></span> <a class="ctx" href="/docs/fabric-simulation-pins/#fabric-pin-members" title="PinMode in context on the placement and pins page" aria-label="PinMode in context on the placement and pins page">→</a></h3>

<a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-pin-mode/">`FabricPinMode`</a> · A preset layout of pins, pinned along with <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinnedindices">`PinnedIndices`</a>. <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-pin-mode/#leftedge">`LeftEdge`</a> by default. Read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>; <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#setpinned">`SetPinned`</a> changes the pins of the live sheet.

<h3 id="pinnedindices"><span class="prop"><code>PinnedIndices</code></span> <a class="ctx" href="/docs/fabric-simulation-pins/#fabric-pin-members" title="PinnedIndices in context on the placement and pins page" aria-label="PinnedIndices in context on the placement and pins page">→</a></h3>

`ISet<int>` · Read-only; the set itself is yours to change. More points to pin, by <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex`</a>, on top of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinmode">`PinMode`</a>'s: with <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-pin-mode/#none">`FabricPinMode.None`</a>, a fully custom set. Any point may be pinned, inside ones included. Empty by default. Read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, which throws `ArgumentOutOfRangeException` for an index outside the grid.

<h3 id="restlength"><span class="prop"><code>RestLength</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-size-properties" title="RestLength in context on the sheet and step page" aria-label="RestLength in context on the sheet and step page">→</a></h3>

`float` · Read-only. The spacing between neighboring points, in meters, as built; the settings' <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a> until then. The live sheet keeps it until the next <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>: the pins' reach, the rest angles and the cuts are all measured in it. A cut's coordinates are multiples of it.

<h3 id="rotation"><span class="prop"><code>Rotation</code></span> <a class="ctx" href="/docs/fabric-simulation-pins/#fabric-placement-properties" title="Rotation in context on the placement and pins page" aria-label="Rotation in context on the placement and pins page">→</a></h3>

`Quaternion` · The sheet's starting attitude, about <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#origin">`Origin`</a>, so it turns in place. `Quaternion.Identity` by default. Gravity, the wind and the colliders stay in world space, so only the pins hold a tilt. Any angle is safe: a rotation keeps every rest length and fold angle. Read at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, which normalizes it, and throws `InvalidOperationException` for one that isn't finite or has no length.

<h3 id="settings"><span class="prop"><code>Settings</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-build-members" title="Settings in context on the sheet and step page" aria-label="Settings in context on the sheet and step page">→</a></h3>

<a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/">`FabricSettings`</a> · The tunables, applied before every step, so a change takes effect at the next one; the sheet's own, the grid, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#seedripple">`SeedRipple`</a>, only at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>. A fresh instance may be assigned at any time, which is how every setting goes back to its default; rebuild to take its sheet, unless its <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#autorebuild">`AutoRebuild`</a> is on. Throws `ArgumentNullException` for `null`.

<h3 id="trianglecount"><span class="prop"><code>TriangleCount</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabric-triangle-members" title="TriangleCount in context on the drawing page" aria-label="TriangleCount in context on the drawing page">→</a></h3>

`int` · Read-only. The triangles of <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createtriangleindices">`CreateTriangleIndices`</a>: two per square of the grid, less those torn away. Read it again after a cut, a tear or a mend. A cut mesh can hold more, so draw <a class="ref prop" href="/docs/fabric-simulation-glossary/cuts/fabric-cut-mesh/#trianglecount">`FabricCutMesh.TriangleCount`</a> when you draw one.

<h3 id="width"><span class="prop"><code>Width</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-size-properties" title="Width in context on the sheet and step page" aria-label="Width in context on the sheet and step page">→</a></h3>

`float` · Read-only. The flat sheet's width, in meters: `(WidthInParticles - 1) × RestLength`. The range of a cut's u coordinate, from 0 at the first column to `Width` at the last. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#builtwidth">`BuiltWidth`</a> is the as-built figure.

<h3 id="widthinparticles"><span class="prop"><code>WidthInParticles</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-size-properties" title="WidthInParticles in context on the sheet and step page" aria-label="WidthInParticles in context on the sheet and step page">→</a></h3>

`int` · Read-only. Points across, as built; until the sheet is built, the settings' <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#widthinparticles">`WidthInParticles`</a>. The grid width to bind to a shader's `FabricWidthInParticles`, and the row length of every flat index.

## Methods

<h3 id="fabric"><span class="method"><code>Fabric()</code></span> <a class="ctx" href="/docs/fabric-simulation/#fabric-constructor" title="Fabric() in context on the quick start guide" aria-label="Fabric() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#fabric">`Fabric(FabricEffect effect, FabricSettings settings)`</a> · A sheet driven by the solver given, with the settings given. Builds nothing: set the placement and the pins first, then <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, or let the first <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#update">`Update`</a> build it. Throws `ArgumentNullException` for a `null` argument.

| Parameter | Type | Description |
| --- | --- | --- |
| `effect` | <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/">`FabricEffect`</a> | The solver. Give each sheet its own: one effect holds one sheet. |
| `settings` | <a class="ref" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/">`FabricSettings`</a> | The tunables, kept by reference: changes made to the object later apply at the next step. |

<h3 id="capturesurface"><span class="method"><code>CaptureSurface()</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabric-picking-members" title="CaptureSurface() in context on the picking page" aria-label="CaptureSurface() in context on the picking page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#capturesurface">`CaptureSurface()`</a> · Returns <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-surface/">`FabricSurface`</a>: the sheet's current pose, frozen, to pick against with world-space rays, which tells what point of the weave lies under a point of the world once the cloth has crumpled. Picks against the cut mesh, lips and all, so what can be picked is what <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createcutmesh">`CreateCutMesh`</a> draws. A GPU readback, of the positions alone, or of the whole sheet when a strip one point wide needs its normals: capture one per gesture, not per ray. Good until the next <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>. Builds the sheet if nothing has. Throws `InvalidOperationException` when the effect holds another sheet, given to it through <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#setparticles">`SetParticles`</a>.

<h3 id="cleartears"><span class="method"><code>ClearTears()</code></span> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabric-cut-members" title="ClearTears() in context on the cuts page" aria-label="ClearTears() in context on the cuts page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cleartears">`ClearTears()`</a> · Mends every severed thread in place, keeping the drape, and forgets the cut strokes. Folds a tear had killed come back at the angles they had when they died, so lips that drifted apart pull together with a visible twitch. The pins' reach is measured again through the whole weave. Does nothing on whole cloth. Draw from fresh indices afterwards.

<h3 id="copytearstate"><span class="method"><code>CopyTearState()</code></span> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabric-cut-members" title="CopyTearState() in context on the cuts page" aria-label="CopyTearState() in context on the cuts page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#copytearstate">`CopyTearState()`</a> · Returns `uint[]`: a copy of the damage, one word of <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-tear-flags/">`FabricTearFlags`</a> per point, all zero on whole cloth. What <a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/#run">`PenetrationCheck.Run`</a> and <a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/#run">`CreaseCheck.Run`</a> take for a torn sheet, and enough to save the damage and replay it through <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#tear">`Tear`</a>, though damage replayed that way has no strokes, and its lips draw jagged.

<h3 id="createcutmesh"><span class="method"><code>CreateCutMesh()</code></span> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabric-cut-members" title="CreateCutMesh() in context on the cuts page" aria-label="CreateCutMesh() in context on the cuts page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createcutmesh">`CreateCutMesh()`</a> · Returns <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-cut-mesh/">`FabricCutMesh`</a>: the sheet's triangles with clean lips, the damaged squares clipped along the strokes that cut them, at whatever angle those ran. Indices from <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#particlecount">`ParticleCount`</a> up name its seam vertices, which a shader draws through <a class="ref method" href="/docs/fabric-simulation-glossary/hlsl/fabric-particle-buffer-fxh/#fabricevaluatevertex">`FabricEvaluateVertex`</a>. Drawing only: the simulation still tears whole threads, within about a cell of the drawn lip. It can hold more triangles than the whole sheet, so size buffers from it. Damage done by <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#tear">`Tear`</a> has no stroke and stays jagged. Built once per change of damage: the same instance comes back until the next cut, tear, mend or rebuild, and <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#capturesurface">`CaptureSurface`</a> picks against it, so treat it as read-only. Builds the sheet if nothing has.

<h3 id="createtriangleindices"><span class="method"><code>CreateTriangleIndices()</code></span> <a class="ctx" href="/docs/fabric-simulation-drawing/#fabric-triangle-members" title="CreateTriangleIndices() in context on the drawing page" aria-label="CreateTriangleIndices() in context on the drawing page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createtriangleindices">`CreateTriangleIndices()`</a> · Returns `int[]`: the sheet's triangle list, three indices per triangle, indexing the particles directly: two triangles per square of the grid, less those torn away, which leaves the lips of a cut jagged at the grid's scale. Needs a 32-bit index buffer, since 16 bits overflow past 65,536 particles. Upload it again after a cut, a mend or a rebuild; tears only remove triangles, so a buffer sized for whole cloth always fits. The same array comes back until the damage changes: treat it as read-only. Builds the sheet if nothing has.

<h3 id="cut"><span class="method"><code>Cut()</code></span> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabric-cut-members" title="Cut() in context on the cuts page" aria-label="Cut() in context on the cuts page">→</a></h3>

Every overload cuts the live sheet, without resetting the drape, and returns `int`: how many threads it severed. A severed thread stops pulling, the lips no longer share a normal and collide as ordinary cloth, and the pins' reach is measured again through what is left of the weave, so a piece cut free of every pin falls. A stroke running exactly along a line of points severs the threads on one side of it only, and never a thread it runs along. Each overload builds the sheet if nothing has.

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Cut(Vector2 start, Vector2 end)`</a> · Cuts along one straight stroke on the flat sheet, in meters: `(0, 0)` is the point <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex(0, 0)`</a>, u runs along <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#width">`Width`</a> and v along <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#height">`Height`</a>, so the stroke lands in the same place at any resolution. The stroke is clipped to two cells past the sheet's edge. Throws `ArgumentException` for a point that isn't finite.

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Cut(ReadOnlySpan<Vector2> stroke)`</a> · Cuts along a polyline, one stroke per pair of consecutive points, and measures the pins' reach once for the whole chain rather than once per stroke: a rip that wanders. Fewer than two points sever nothing. Every point is checked before anything is cut, so a point that isn't finite throws `ArgumentException` and leaves the sheet as it was.

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Cut(ReadOnlySpan<Ray> rays)`</a> · Cuts along a drag of world-space rays, unprojected through your own camera, so crumpled cloth is cut where the knife passed over it rather than where the flat sheet once lay. Each ray takes the nearest layer. Captures the pose itself, one GPU readback, then cuts as <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Cut(FabricStroke)`</a> does. Fewer than two rays sever nothing. For scissors through a pile, or any other rule, walk <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#capturesurface">`CaptureSurface`</a>'s layers yourself and pass the points to the `Vector2` overload.

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Cut(ReadOnlySpan<Ray> rays, FabricSurface surface)`</a> · The same, against a pose captured earlier, so a preview drawn from that surface cuts exactly where it was drawn: the sheet has moved on since, and the damage follows the pose. A <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-stroke/">`FabricStroke`</a> fed during the drag does the same without picking each ray twice. Throws `ArgumentNullException` for a `null` surface, and `ArgumentException` for one captured from another sheet, or from this one before its last <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>.

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Cut(FabricStroke stroke)`</a> · Cuts along a recorded drag. Samples on one layer join into a stroke, which breaks where it jumps across a fold onto cloth the knife never passed over. Where the knife left the cloth and came back across an open cut, the stroke carries on across it; and a stroke that left the cloth within reach of a cut or of the sheet's edge is carried to it, since the last sample can land up to a sample short: either way the piece between comes free. Any other miss ends the stroke. Throws `ArgumentNullException` for a `null` stroke, and `ArgumentException` for one over a surface from another sheet or from before the last rebuild.

| Parameter | Type | Description |
| --- | --- | --- |
| `start` | `Vector2` | Where the stroke starts on the flat sheet, in meters. |
| `end` | `Vector2` | Where it ends. |
| `stroke` | `ReadOnlySpan<Vector2>` | The polyline's points on the flat sheet, in meters, in order. |
| `rays` | `ReadOnlySpan<Ray>` | The drag, one world-space ray per sample, in order. The direction need not be of length 1. |
| `surface` | <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-surface/">`FabricSurface`</a> | The pose to pick the rays against, from this sheet's <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#capturesurface">`CaptureSurface`</a> since its last rebuild. |
| `stroke` (the last overload) | <a class="ref" href="/docs/fabric-simulation-glossary/cuts/fabric-stroke/">`FabricStroke`</a> | The drag, picked sample by sample as it was drawn. |

<h3 id="ispinned"><span class="method"><code>IsPinned()</code></span> <a class="ctx" href="/docs/fabric-simulation-pins/#fabric-pin-members" title="IsPinned() in context on the placement and pins page" aria-label="IsPinned() in context on the placement and pins page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#ispinned">`IsPinned(int index)`</a> · Returns `bool`: whether a point of the live sheet is pinned, as <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#setpinned">`SetPinned`</a>, <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a> or the last upload left it. Free, unless an <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#updateparticles">`UpdateParticles`</a> of your own has changed the sheet since: the first call after one reads the pins back from the GPU, once. Builds the sheet if nothing has. Throws `ArgumentOutOfRangeException` for an index outside the sheet, and `InvalidOperationException` when the effect holds another sheet.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The point, as <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex`</a> numbers it. |

<h3 id="particleindex"><span class="method"><code>ParticleIndex()</code></span> <a class="ctx" href="/docs/fabric-simulation-pins/#fabric-pin-members" title="ParticleIndex() in context on the placement and pins page" aria-label="ParticleIndex() in context on the placement and pins page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex(int column, int row)`</a> · Returns `int`: the flat index of a point, `row × WidthInParticles + column`, row by row up from a vertical sheet's bottom edge. What <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinnedindices">`PinnedIndices`</a>, <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#setpinned">`SetPinned`</a>, <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#tear">`Tear`</a> and the arrays of <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#readback">`ReadBack`</a> use. Range-checked, since a column and a row swapped still make a valid index almost every time: throws `ArgumentOutOfRangeException` for a column or a row outside the grid. Before the sheet is built, the grid is the settings'.

| Parameter | Type | Description |
| --- | --- | --- |
| `column` | `int` | From 0 at the first column to `WidthInParticles - 1`. |
| `row` | `int` | From 0 at the first row, the bottom edge of a vertical sheet, to `HeightInParticles - 1`, the top. |

<h3 id="rebuild"><span class="method"><code>Rebuild()</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-build-members" title="Rebuild() in context on the sheet and step page" aria-label="Rebuild() in context on the sheet and step page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild()`</a> · Builds the sheet afresh and uploads it: a flat grid with the starting ripple, every tear mended, the pins as <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinmode">`PinMode`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinnedindices">`PinnedIndices`</a> describe them, and the solver's clock and diagnostics started again. Reads the settings' grid, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#restlength">`RestLength`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#seedripple">`SeedRipple`</a>, and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#origin">`Origin`</a>, <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#orientation">`Orientation`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#rotation">`Rotation`</a>: until it runs, the live sheet keeps the ones it was built with. Optional the first time, since the first call that needs the sheet builds it; <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#autorebuild">`AutoRebuild`</a> calls it whenever one of them changes. Raises <a class="ref event" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuilt">`Rebuilt`</a>.

Everything is checked before the live sheet is touched, so a bad setting throws and leaves it running. Throws `InvalidOperationException` for a grid under 2 × 2 points, a spacing that isn't finite and positive, more points than <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#maxparticles">`FabricEffect.MaxParticles`</a>, a `SeedRipple`, `Origin` or `Rotation` that isn't finite, a rotation of no length, and a sheet too large for <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useaerodynamicpressure">`UseAerodynamicPressure`</a>; `ArgumentException` for any other setting that isn't a finite number, or a <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a> that isn't positive; and `ArgumentOutOfRangeException` for a pinned index outside the grid.

<h3 id="refreshanchors"><span class="method"><code>RefreshAnchors()</code></span> <a class="ctx" href="/docs/fabric-simulation-pins/#fabric-pin-members" title="RefreshAnchors() in context on the placement and pins page" aria-label="RefreshAnchors() in context on the placement and pins page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#refreshanchors">`RefreshAnchors()`</a> · Measures the pins' reach along the weave now, rather than before the next step, and uploads it: each point's nearest pin and its distance through the weave, a shortest path from every pin at once, on the CPU. The sheet does this by itself after a cut, a pin change, or a change of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useshearingconstraints">`UseShearingConstraints`</a>. Call it after changing which points are pinned through <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#updateparticles">`UpdateParticles`</a>: it reads the pins back once, and puts the sheet's measurements in place of the anchors you uploaded. Builds the sheet if nothing has.

<h3 id="setpinned"><span class="method"><code>SetPinned()</code></span> <a class="ctx" href="/docs/fabric-simulation-pins/#fabric-pin-members" title="SetPinned() in context on the placement and pins page" aria-label="SetPinned() in context on the placement and pins page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#setpinned">`SetPinned(int index, bool pinned)`</a> · Pins a point of the live sheet where it hangs now, or lets it go: with no kick either way, since a pin carries no motion. Takes effect at the next step, when the pins' reach is measured again, once for any number of calls, on the CPU and with no readback. Setting what a point already is does nothing. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinmode">`PinMode`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#pinnedindices">`PinnedIndices`</a> are left alone: they still describe the next <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>, which drops these changes. Builds the sheet if nothing has. Throws `ArgumentOutOfRangeException` for an index outside the sheet, and `InvalidOperationException` when the effect holds another sheet.

| Parameter | Type | Description |
| --- | --- | --- |
| `index` | `int` | The point, as <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex`</a> numbers it. |
| `pinned` | `bool` | `true` to pin it where it is, `false` to let it go. |

<h3 id="step"><span class="method"><code>Step()</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-stepping-methods" title="Step() in context on the sheet and step page" aria-label="Step() in context on the sheet and step page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#step">`Step()`</a> · Applies <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#settings">`Settings`</a>, then runs exactly one step of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#timestep">`TimeStep`</a>, whatever the clock says: for tests and tools that advance the cloth by hand. Builds or rebuilds the sheet first, as <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#update">`Update`</a> does. Leaves <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#interpolationfraction">`InterpolationFraction`</a> where it was. Throws what <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a> and <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#apply">`FabricEffect.Apply`</a> throw, before anything steps.

<h3 id="tear"><span class="method"><code>Tear()</code></span> <a class="ctx" href="/docs/fabric-simulation-cuts/#fabric-cut-members" title="Tear() in context on the cuts page" aria-label="Tear() in context on the cuts page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#tear">`Tear(int indexA, int indexB)`</a> · Severs the one thread joining two neighboring points, sideways, up and down or diagonal, with all of <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Cut`</a>'s effects but clean lips: it has no stroke, so <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createcutmesh">`CreateCutMesh`</a> leaves its hole jagged. A thread already torn is left as it is. Builds the sheet if nothing has. Throws `ArgumentOutOfRangeException` for an index outside the sheet, and `ArgumentException` for two points that share no thread: the same point, or two not of one square of the grid.

| Parameter | Type | Description |
| --- | --- | --- |
| `indexA` | `int` | One end of the thread, as <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex`</a> numbers it. |
| `indexB` | `int` | The other end: a neighbor of `indexA` across, up or down, or on a diagonal. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-stepping-methods" title="Update() in context on the sheet and step page" aria-label="Update() in context on the sheet and step page">→</a></h3>

<a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#update">`Update(float elapsedSeconds)`</a> · Once a frame. Builds the sheet first if nothing has, or rebuilds it when <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#autorebuild">`AutoRebuild`</a> is on and something it was built from has changed; measures the pins' reach again if a cut or a pin change asked for it; applies <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#settings">`Settings`</a>; then runs as many whole fixed steps as the time affords, up to <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#maxstepsperframe">`MaxStepsPerFrame`</a>, as <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#update">`FabricEffect.Update`</a> does. Throws what <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a> and <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#apply">`FabricEffect.Apply`</a> throw, before anything steps.

| Parameter | Type | Description |
| --- | --- | --- |
| `elapsedSeconds` | `float` | The frame's time, in seconds: `gameTime.ElapsedGameTime.TotalSeconds`. NaN and negative times count as none, and anything over 0.25 s as 0.25 s. |

## Events

<h3 id="rebuilt"><span class="event"><code>Rebuilt</code></span> <a class="ctx" href="/docs/fabric-simulation-sheet/#fabric-build-members" title="Rebuilt in context on the sheet and step page" aria-label="Rebuilt in context on the sheet and step page">→</a></h3>

`EventHandler` · Raised after every rebuild: called, done by first use, or done by <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#autorebuild">`AutoRebuild`</a>. The grid, the triangles and the pins may all have changed, so this is the place to size your buffers and upload <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createtriangleindices">`CreateTriangleIndices`</a> or <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#createcutmesh">`CreateCutMesh`</a>, and to drop surfaces and hits gathered from the sheet before. Raised even when applying the settings at the end of the rebuild fails: the live sheet has been replaced either way. The sender is the sheet, the arguments `EventArgs.Empty`.
