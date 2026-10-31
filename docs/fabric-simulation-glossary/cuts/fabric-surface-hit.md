---
layout: docs
legend: [prop]
title: "Glossary: FabricSurfaceHit"
description: "The members of FabricSurfaceHit, in alphabetical order."
---

Where a ray meets the sheet: the point in the flat-sheet coordinates <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#cut">`Fabric.Cut`</a> takes, where that point is in the world, and how far along the ray.

A read-only record struct, compared by value, with a constructor that takes the three properties in order. Filled by <a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-surface/#raycast">`FabricSurface.Raycast`</a>, <a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-surface/#tryraycast">`TryRaycast`</a> and <a class="ref method" href="/docs/fabric-simulation-glossary/cuts/fabric-stroke/#add">`FabricStroke.Add`</a>. The [picking page](/docs/fabric-simulation-picking/#fabricsurfacehit-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="cloth"><span class="prop"><code>Cloth</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricsurfacehit-properties" title="Cloth in context on the picking page" aria-label="Cloth in context on the picking page">→</a></h3>

`Vector2` · Read-only. The point on the flat, unfolded sheet, in meters: `(0, 0)` is the point at <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#particleindex">`ParticleIndex(0, 0)`</a>, `X` runs along <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#width">`Width`</a> and `Y` along <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric/#height">`Height`</a>. Blended from the hit triangle's corners by where the ray crossed it, so it lies where the cloth was, however crumpled. What `Cut(ReadOnlySpan<Vector2>)` takes, and what to collect for a cut of your own.

<h3 id="distance"><span class="prop"><code>Distance</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricsurfacehit-properties" title="Distance in context on the picking page" aria-label="Distance in context on the picking page">→</a></h3>

`float` · Read-only. How far along the ray, in meters from its origin, whatever the length of the ray's direction: the surface measures along the direction made unit length, so a ray straight from `Viewport.Unproject` measures in meters too. 0 or more. Layers are told apart by it, nearest first.

<h3 id="world"><span class="prop"><code>World</code></span> <a class="ctx" href="/docs/fabric-simulation-picking/#fabricsurfacehit-properties" title="World in context on the picking page" aria-label="World in context on the picking page">→</a></h3>

`Vector3` · Read-only. The point in world space, on the ray, where the cloth stood in the captured pose: what a preview of the cut draws through.
