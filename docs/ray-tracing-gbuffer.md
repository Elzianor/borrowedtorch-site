---
layout: docs
legend: [prop, method]
title: "Ray tracing: the G-buffer"
description: The G-buffer's two targets, filling them with a prepass of your own, what to draw into them, telling this frame's surfaces from old ones, and reading positions and normals back in a shader.
---

A traced pass over the screen starts from the surface seen at each pixel: where it is, and which way it faces. A
<a class="ref" href="/docs/ray-tracing-glossary/gpu/g-buffer/">`GBuffer`</a> holds both, in two screen-sized targets your prepass draws into, and <a class="ref" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/">`GBuffer.fxh`</a> turns them back
into a position and a normal in a shader. Names are colored by what they are: a <span class="kb kb-prop">property</span>
or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## What it holds

- <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#depth">`Depth`</a>, a 32-bit float a pixel: the nearest surface's distance in front of the camera along its view
  direction, `-PositionVS.z` in view space. 0 where nothing was drawn, a distance no surface can be at. It has a depth
  buffer of its own, for the prepass's depth test.
- <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#normal">`Normal`</a>, 8 bits a channel: that surface's normal in view space, packed from −1..1 into 0..1 as
  `normal * 0.5 + 0.5`.

A linear distance rather than the depth buffer's own value, which bunches its precision up near the camera, so a
point rebuilt from it is as precise far away as near. Both targets are `null` until the first
<a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize`</a>, which makes them.

### GBuffer targets

| Member | Description |
| --- | --- |
| <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#gbuffer">`GBuffer(GraphicsDevice graphicsDevice)`</a> | A G-buffer on the device, with no targets until the first <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize`</a>. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#depth">`Depth`</a> | Read-only `RenderTarget2D?`. The linear view-space distance, `SurfaceFormat.Single`, 0 where nothing was drawn, with a 24-bit depth buffer. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#normal">`Normal`</a> | Read-only `RenderTarget2D?`. The view-space normal packed into 0..1, `SurfaceFormat.Color`. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#width">`Width`</a>, <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#height">`Height`</a> | Read-only `int`s. The size of the targets. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#isready">`IsReady`</a> | Read-only `bool`. The targets exist. Says nothing of what is in them. |

## Filling it

Every frame, before anything traces: size the targets, bind them, draw the opaque meshes with your prepass effect,
and unbind them.

```csharp
var gBuffer = new GBuffer(GraphicsDevice);

// every frame, before the traced passes
gBuffer.Resize(width, height);   // nothing to do unless the size changed
gBuffer.BindAndClear();          // both targets, the distance cleared to 0: "nothing here"

GraphicsDevice.BlendState = BlendState.Opaque;
GraphicsDevice.DepthStencilState = DepthStencilState.Default;
// ... draw the opaque meshes with the prepass effect below ...

gBuffer.Unbind();                // back to the back buffer: this frame's surfaces are in
```

- <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize`</a> makes the targets, or new ones at a new size, and does nothing when the size is the one they
  have: hand it the viewport's size every frame. New targets hold nothing, so the G-buffer isn't
  [current](#current-or-not) until the next prepass.
- <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#bindandclear">`BindAndClear`</a> binds both targets and clears them. It throws `InvalidOperationException` before the first
  `Resize`: with no targets bound, the clear would wipe the back buffer.
- <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#unbind">`Unbind`</a> binds the back buffer again. If your game draws into a render target of its own, set it again
  after.

### GBuffer prepass methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#resize">`Resize(int width, int height)`</a> | Makes the targets at this size, at least 1 × 1, unless they already are. New targets aren't current. |
| <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#bindandclear">`BindAndClear()`</a> | Binds both targets and clears them: the distance and the normal to 0, the depth buffer to 1. Throws `InvalidOperationException` before the first `Resize`. |
| <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#unbind">`Unbind()`</a> | Binds the back buffer. What was drawn since `BindAndClear` is this frame's G-buffer: it is current, and <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#contentversion">`ContentVersion`</a> moves. |

## The prepass effect

The prepass is yours: it draws your meshes, with your vertex formats and your skinning. Its pixel shader writes the
two values in the encoding `GBuffer.fxh` undoes. A prepass for meshes with a position and a normal:

```hlsl
float4x4 World;
float4x4 View;
float4x4 Projection;

struct VSInput
{
    float4 Position : POSITION0;
    float3 Normal   : NORMAL0;
};

struct VSOutput
{
    float4 Position   : SV_Position;
    float3 PositionVS : TEXCOORD0;
    float3 NormalVS   : TEXCOORD1;
};

struct PSOutput
{
    float  Depth  : SV_Target0;   // GBuffer.Depth: -PositionVS.z
    float4 Normal : SV_Target1;   // GBuffer.Normal: the view-space normal * 0.5 + 0.5
};

VSOutput VS(VSInput input)
{
    float4x4 worldView = mul(World, View);
    float4 positionVS = mul(input.Position, worldView);

    VSOutput output;
    output.Position   = mul(positionVS, Projection);
    output.PositionVS = positionVS.xyz;
    output.NormalVS   = mul(input.Normal, (float3x3) worldView); // a non-uniform scale needs the inverse transpose
    return output;
}

PSOutput PS(VSOutput input)
{
    PSOutput output;
    output.Depth  = -input.PositionVS.z;
    output.Normal = float4(normalize(input.NormalVS) * 0.5 + 0.5, 1.0);
    return output;
}

technique Prepass
{
    pass P0
    {
        VertexShader = compile vs_5_0 VS();
        PixelShader  = compile ps_5_0 PS();
    }
}
```

Draw with it between `BindAndClear` and `Unbind`, with the camera the frame is drawn with:

```csharp
prepass.Parameters["View"].SetValue(view);
prepass.Parameters["Projection"].SetValue(projection);

foreach (var obj in opaqueObjects)
{
    prepass.Parameters["World"].SetValue(obj.World);
    prepass.CurrentTechnique.Passes[0].Apply();
    obj.Draw(GraphicsDevice);
}
```

A surface drawn from both sides, with `CullMode.None`, shows its back face from behind, with a normal pointing away
from the camera. Turn it toward the camera in the pixel shader, with a `bool isFrontFace : SV_IsFrontFace` input:
`normal = isFrontFace ? normal : -normal`.

## What to draw

The G-buffer has to be what the frame shows: the nearest surface at every pixel once shading is done. So:

- **Opaque, depth-writing surfaces only.** A pane of glass in the G-buffer would have the wall seen through it shaded
  with the shadow traced from the glass. Leave blended surfaces out.
- **The cull mode each is shaded with.** A face culled in the forward pass but drawn in the prepass is in the
  G-buffer, but not on screen.
- **Cut-outs cut the same way.** A leaf whose texture's alpha cuts it out, with `clip` in the forward pass, needs the
  same `clip` in the prepass, or the traced results have a square leaf.
- **The same camera.** The same view and projection the frame is drawn with, or the points rebuilt from it are not the
  ones on screen.

## Current or not

<a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#iscurrent">`IsCurrent`</a> says the targets hold this frame's surfaces. Gate every traced pass on it, not on
<a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#isready">`IsReady`</a>: a G-buffer left from an earlier frame, read through this frame's camera, puts every shadow where the
geometry used to be.

- **Drawn.** <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#unbind">`Unbind`</a> after the prepass makes it current.
- **Unchanged.** When nothing on screen has moved since the last prepass, neither the camera nor anything drawn, skip
  the prepass and call <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#confirmcurrent">`ConfirmCurrent`</a>: what the targets hold is this frame's.
- **Not drawn.** When the prepass can't run, its effect missing or failed to load, call <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#invalidate">`Invalidate`</a>: the
  traced passes skip the frame rather than read old surfaces.
- **Resized.** A new size isn't current until the next prepass.

<a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#contentversion">`ContentVersion`</a> moves at every real redraw, and not at a `ConfirmCurrent`. With the GPU copy's
<a class="ref prop" href="/docs/ray-tracing-glossary/gpu/gpu-acceleration-structure/#version">`Version`</a>, it tells a pass whether anything it reads has changed:

```csharp
if (prepass == null)
    gBuffer.Invalidate();
else if (cameraMoved || sceneMoved)
    DrawPrepass();                  // BindAndClear, the meshes, Unbind
else
    gBuffer.ConfirmCurrent();

// trace the shadows again only when the surfaces, the scene or the light have changed
var stale = gBuffer.ContentVersion != _tracedContent || acceleration.Version != _tracedScene || lightMoved;

if (gBuffer.IsCurrent && acceleration.IsReady && stale)
{
    TraceShadows();

    _tracedContent = gBuffer.ContentVersion;
    _tracedScene = acceleration.Version;
}
```

### GBuffer state

| Member | Description |
| --- | --- |
| <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#iscurrent">`IsCurrent`</a> | Read-only `bool`. The targets hold this frame's surfaces. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#contentversion">`ContentVersion`</a> | Read-only `int`. Moves at every `Unbind` that ends a prepass. |
| <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#confirmcurrent">`ConfirmCurrent()`</a> | The targets already hold this frame's surfaces, and weren't redrawn: current again, if there are targets. |
| <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#invalidate">`Invalidate()`</a> | This frame's surfaces couldn't be drawn: not current. |

## Reading it back

<a class="ref" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/">`GBuffer.fxh`</a> undoes the encoding, in one place for every pass that reads it, so a shadow pass, an
occlusion pass and a temporal resolve can't drift apart on where a surface is:

```hlsl
#include "Lib/GBuffer.fxh"

float  depth    = DepthMap[pixel];      // 0: nothing drawn here
float3 position = GBufferWorldPosition(pixel, ScreenSize, depth, InverseProjection, InverseView);
float3 normal   = GBufferWorldNormal(NormalMap[pixel], InverseView);
```

The position is rebuilt along the line from the eye through the pixel's centre: the point on it whose distance in
front of the camera is the one stored.

<figure class="shot">
  <img src="{{ '/assets/img/ray-tracing/reconstruction.svg' | relative_url }}" width="640" height="220" alt="A side view of the camera. A line from the eye through a pixel's centre on the near plane reaches the surface. The stored depth is the surface's distance along the camera's forward axis, not along the line: the line is scaled so its forward part is 1, then multiplied by the depth">
  <figcaption>Rebuilding a point. The stored depth is measured along the camera's forward axis, so the point lies on the pixel's line where its forward distance is the depth.</figcaption>
</figure>

- **Read a pixel, don't sample.** `DepthMap[pixel]` reads the pixel as it is. A filtered depth, the average of a near
  and a far surface at an edge, is a point on neither.
- **Matrices.** `InverseProjection` and `InverseView` are the inverses of the ones the prepass drew with, and
  `ScreenSize` is the G-buffer's own size: `(width, height, 1 / width, 1 / height)`.
- **Normals come back normalized.** Eight bits a channel doesn't keep a vector's length exactly.

### GBuffer.fxh functions

| Function | Description |
| --- | --- |
| <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferviewposition">`float3 GBufferViewPosition(int2 pixel, float4 gBufferSize, float depth, float4x4 inverseProjection)`</a> | The view-space point at a pixel, from its stored depth. Perspective projections only. |
| <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferworldposition">`float3 GBufferWorldPosition(int2 pixel, float4 gBufferSize, float depth, float4x4 inverseProjection, float4x4 inverseView)`</a> | The same point, taken through `inverseView`. |
| <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferviewnormal">`float3 GBufferViewNormal(float4 packed)`</a> | The view-space normal, unpacked and normalized. |
| <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferworldnormal">`float3 GBufferWorldNormal(float4 packed, float4x4 inverseView)`</a> | The same normal, taken through `inverseView`. |
| <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferpixelof">`int2 GBufferPixelOf(uint2 pixel, int pixelScale)`</a> | The G-buffer pixel a pass at a reduced resolution reads for a pixel of its own. |
| <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#reducedgridposition">`float2 ReducedGridPosition(float2 fullResolution, int pixelScale)`</a> | Where a full-resolution position falls on the reduced grid, in its texels. |

## Reduced resolution

A pass traced at half or a quarter of the resolution, `pixelScale` 2 or 4, costs a quarter or a sixteenth of the rays.
Each of its pixels reads one pixel of the G-buffer, the top-left of the block it covers, never an average of the
block: an average across an edge is a surface that isn't there. <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferpixelof">`GBufferPixelOf`</a> says which:

```hlsl
int PixelScale = 2; // the pass at half the G-buffer's resolution

// in the kernel, one thread per pixel of the pass
int2   source   = GBufferPixelOf(id.xy, PixelScale);
float  depth    = DepthMap[source];
float3 position = GBufferWorldPosition(source, ScreenSize, depth, InverseProjection, InverseView);
```

`ScreenSize` stays the G-buffer's size: the point is rebuilt at the G-buffer pixel it was read from. To read the result
back at full resolution, <a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#reducedgridposition">`ReducedGridPosition`</a> maps a full-resolution position onto the reduced grid, with
the whole numbers on the pixels the pass traced, so everything agrees on which pixel that was:

```hlsl
// in the forward pass: SV_Position.xy is the pixel's centre, which is what the function takes
float2 grid    = ReducedGridPosition(input.Position.xy, PixelScale);
int2   nearest = int2(floor(grid + 0.5));
float  shadow  = ShadowMask[nearest].r; // or a bilinear blend of four, weighted by frac(grid)
```

## Perspective only

<a class="ref method" href="/docs/ray-tracing-glossary/hlsl/g-buffer-fxh/#gbufferviewposition">`GBufferViewPosition`</a> finds the surface along the line from the eye through the pixel, which is how a
perspective camera sees. An orthographic camera looks along parallel lines, and its point is rebuilt otherwise, in a
function of your own:

```hlsl
// an orthographic camera: the pixel's view-space x and y don't depend on the depth
float3 OrthographicViewPosition(int2 pixel, float4 gBufferSize, float depth, float4x4 inverseProjection)
{
    float2 uv  = (pixel + 0.5) * gBufferSize.zw;
    float2 ndc = float2(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);

    float3 onNearPlane = mul(float4(ndc, 0.0, 1.0), inverseProjection).xyz;

    return float3(onNearPlane.xy, -depth);
}
```

## Lifetime

The G-buffer owns its targets: <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#dispose">`Dispose`</a> it with the device's other resources. After it, there are no
targets, and it isn't current.

### GBuffer lifetime

| Member | Description |
| --- | --- |
| <a class="ref method" href="/docs/ray-tracing-glossary/gpu/g-buffer/#dispose">`Dispose()`</a> | Frees both targets. A second call does nothing. |
| <a class="ref prop" href="/docs/ray-tracing-glossary/gpu/g-buffer/#isdisposed">`IsDisposed`</a> | Read-only `bool`. `Dispose` has been called. |
