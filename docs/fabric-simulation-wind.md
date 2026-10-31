---
layout: docs
legend: [prop]
title: "Fabric simulation: wind and air"
description: The wind as the air's velocity, gusts computed every frame, wind that varies across the sheet as an HLSL function of position, drag, and aerodynamic pressure for sails and parachutes.
---

The cloth moves through air, and the air pushes back: that is drag, and it is all the wind is. The air has a velocity,
the wind, and every point of the sheet feels the drag of moving through it at a different velocity. Still air slows a
falling sheet; moving air pushes a hanging one. Names are colored by what they are: a
<span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Wind is a velocity

<a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#wind">`Wind`</a> is the air's velocity, in meters per second, in world space: not a force. Drag acts on each point's
motion relative to the air, so a sheet that blows out to match the wind feels none, and one that swings back into it
feels more. A force would keep pushing however fast the cloth moved, and a sheet in a steady force accelerates; a
sheet in a steady wind settles, streaming out the way the air goes.

```csharp
_settings.Wind = new Vector3(0.0f, 0.0f, -1.2f);   // a breeze of 1.2 m/s, away from the camera
```

Drag grows with the square of the relative speed, so a little wind goes a long way: at the default weight, 2.5 m/s
already streams a sheet out flat. A heavier cloth, a higher <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#arealdensity">`ArealDensity`</a>, takes more wind to move.

## Gusts

The wind is read every frame, so gusts are the wind set every frame. Any formula will do; a few sines at unrelated
rates never quite repeat:

```csharp
// Update, before _fabric.Update
var t = (float)gameTime.TotalGameTime.TotalSeconds;
var gust = new Vector3(MathF.Sin(t * 1.9f) * MathF.Cos(t * 1.1f), 0.0f, MathF.Sin(t * 2.3f) * MathF.Cos(t * 0.9f));

_settings.Wind = new Vector3(0.0f, 0.0f, -1.2f) + gust * 0.5f;
```

Every step of a frame blows with that frame's wind. The whole sheet feels the same air at any one moment, and the
ripples across it come from the cloth itself, as each part of it turns towards the flow or away. For a clock that
follows the cloth rather than the frame, use <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#time">`FabricEffect.Time`</a>, the simulated seconds, which fall behind the frame's
clock when the solver drops a backlog, as the cloth does.

## Wind that varies across the sheet

A gust front rolling across a flag, eddies, a helicopter's downwash: air that differs from place to place is a function
of position, and it has to run where the points are, on the GPU, for every point, at its position, every step. So it
is written in HLSL, in an effect of yours that wraps the solver:

```hlsl
// Content/Effects/ClothSolver.fx: the package's solver, with a wind of our own
float3 GustBands(float3 position);   // declared before the solver, defined after it
#define FABRIC_WIND_AT GustBands
#include "Fabric/FabricCompute.fx"

float GustStrength;   // a uniform of our own

// bands of stronger wind drifting across the sheet, scaled by Wind, so still air stays still
float3 GustBands(float3 position)
{
    float band = saturate(sin(position.x * 1.5 - FabricTime * 2.5));

    return Wind * (1.0 + GustStrength * band * band);
}
```

Add it to your `Content.mgcb` like any effect, and load the solver from it instead of the default:

```csharp
_solver = new FabricEffect(GraphicsDevice, Content, "Effects/ClothSolver");
_solver.Shader.Parameters["GustStrength"].SetValue(0.5f);
```

The function is declared before the `#include` and defined after it, where the solver's <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#wind">`Wind`</a>, whatever you set
this frame, and <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#fabrictime">`FabricTime`</a>, the simulated seconds, are declared. Anything else it needs, declare as a uniform of
your own and set it through <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#shader">`FabricEffect.Shader`</a>: the sheet's own copy of the effect, not the one `Content.Load`
returns, which no sheet runs. An answer that isn't finite falls back to `Wind`, since one NaN would spread through the
whole sheet within a few steps.

The function is compiled with your content, so changing it means building again, and each formula is a solver of its
own. Without <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#fabric_wind_at">`FABRIC_WIND_AT`</a>, nothing is called, and the solver compiles as it always does.

### FabricCompute.fx names

| Name | Description |
| --- | --- |
| <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#fabric_wind_at">`FABRIC_WIND_AT`</a> | Defined before the `#include` as the name of a `float3 f(float3 position)` of yours: the air's velocity at a point. |
| <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#wind">`Wind`</a> | `float3`: the settings' `Wind`, as uploaded this frame. |
| <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#fabrictime">`FabricTime`</a> | `float`: simulated seconds, set every step. |

### FabricEffect shader property

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#shader">`Shader`</a> | Read-only `Effect`. The sheet's own copy of the compiled solver, disposed with it: where the uniforms of an effect that wraps the solver are set. Not for drawing. |

## Drag

Each point stands for a patch of cloth, `RestLength²` of it, and the air drags on that patch as it does on a flat
plate: `½ × AirDensity × DragCoefficient × area × speed²`, against the point's motion relative to the air. Only the
part of the patch that faces the flow counts: a patch edge-on to it catches nothing, and face-on catches everything,
which is what makes cloth flutter. The patch faces the way the solver's normal does. Drag can at most stop a point in a
step, never send it back the other way.

A sheet dropped in still air falls with its drag: a light sheet drifts down, a heavy one drops. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#dragcoefficient">`DragCoefficient`</a>
scales the drag, with 1.2 about right for a flat sheet, and <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#airdensity">`AirDensity`</a> is the air's own, 1.225 kg/m³ at sea
level. 0 for either is a vacuum: no drag, and no wind.

## Aerodynamic pressure

Drag on each patch alone can't dome a falling sheet: the air under its middle has further to escape than the air under
its rim, so the middle meets more of it, but a patch only knows its own motion. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useaerodynamicpressure">`UseAerodynamicPressure`</a> adds
that coupling, as the air a moving sheet drags along: broad motions of the sheet, the whole of it falling, drag far
more air than small ones, ripples and wrinkles. So sails and parachutes billow rather than only flutter.

The solver splits the sheet's motion across its face into bands, from the whole sheet down to single points, and slows
each by the air it drags: the broader the band, the more air. It only ever slows the cloth, so it can't make it
unstable however much air there is. <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#addedmasscoefficient">`AddedMassCoefficient`</a> scales the air: 1, the default, is the physical
amount, and 0 none.

It costs a few passes a step, about one and a third over the sheet, and supports sheets of up to 4,096 points along
their longer side: a build, and an upload of the settings, throw `InvalidOperationException` for a longer one. And it
doesn't see holes: the air treats a torn sheet as whole, so a badly torn parachute still catches more air than it
should.

### FabricSettings air properties

| Property | Description |
| --- | --- |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#wind">`Wind`</a> | `Vector3`. The air's velocity, in meters per second, in world space. Still air by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#dragcoefficient">`DragCoefficient`</a> | `float`. How hard the air resists the sheet. 1.2 by default, about right for a flat sheet; below 0 counts as 0. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#airdensity">`AirDensity`</a> | `float`. Kilograms per cubic meter. 1.225 by default, air at sea level; 0 is a vacuum, and below 0 counts as 0. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useaerodynamicpressure">`UseAerodynamicPressure`</a> | `bool`. Couples the whole sheet through the air it pushes, so sails and parachutes billow. `false` by default. |
| <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#addedmasscoefficient">`AddedMassCoefficient`</a> | `float`. With aerodynamic pressure on, how much of the air dragged along counts: 0 none, 1 physical. 1 by default; below 0 counts as 0. |
