---
layout: docs
title: "Glossary: TlasUpdateResult"
description: "The values of TlasUpdateResult."
---

What <a class="ref method" href="/docs/ray-tracing-glossary/scene/tlas/#endupdate">`Tlas.EndUpdate`</a> had to do to bring the tree in line with the instances just declared.

An enum, in the namespace `BorrowedTorch.RayTracing`. Nothing needs it: it is there to watch, a count of rebuilds in a profiler say. The [scene page](/docs/ray-tracing-scene/#what-an-update-does) shows it in context, with a picture.

## Values

<h3 id="unchanged"><code>Unchanged</code> <a class="ctx" href="/docs/ray-tracing-scene/#tlasupdateresult-values" title="Unchanged in context on the scene page" aria-label="Unchanged in context on the scene page">→</a></h3>

Nothing that affects the tree changed: every instance is where it was, with the same id, BLAS, matrix and BLAS version. <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#version">`Version`</a> didn't move; <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#flagsversion">`FlagsVersion`</a> did, if flags alone changed.

<h3 id="refitted"><code>Refitted</code> <a class="ctx" href="/docs/ray-tracing-scene/#tlasupdateresult-values" title="Refitted in context on the scene page" aria-label="Refitted in context on the scene page">→</a></h3>

The same instances, some of them moved: their boxes were recomputed, and the tree refitted over its old shape. <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#version">`Version`</a> moved.

<h3 id="rebuilt"><code>Rebuilt</code> <a class="ctx" href="/docs/ray-tracing-scene/#tlasupdateresult-values" title="Rebuilt in context on the scene page" aria-label="Rebuilt in context on the scene page">→</a></h3>

Instances were added, removed or reordered, or a refit had worn the tree too far, its root's area past twice or its cost past one and a half times the last build's: the tree was built afresh. <a class="ref prop" href="/docs/ray-tracing-glossary/scene/tlas/#version">`Version`</a> moved. The first update of a `Tlas` is always this.
