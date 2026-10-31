---
layout: docs
legend: [prop]
title: "Glossary: FabricEffect.SpatialHashOverflow"
description: "The members of FabricEffect.SpatialHashOverflow, in alphabetical order."
---

What self-collision lost to full buckets of the spatial hash and full lists of partners: contacts the solver never saw.

A read-only record struct nested in <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/">`FabricEffect`</a>, compared by value, returned by <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplespatialhashoverflow">`SampleSpatialHashOverflow`</a>. Its constructor takes <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-spatial-hash-overflow/#droppedentriesperstep">`DroppedEntriesPerStep`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-spatial-hash-overflow/#peakoccupancy">`PeakOccupancy`</a>, in that order; the other two are set by initializer. All four read 0 while nothing is lost, the usual case: only a deep, crushed pile fills a bucket or a list. The [diagnostics page](/docs/fabric-simulation-diagnostics/#fabriceffectspatialhashoverflow-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="droppedcandidatesperstep"><span class="prop"><code>DroppedCandidatesPerStep</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#fabriceffectspatialhashoverflow-properties" title="DroppedCandidatesPerStep in context on the diagnostics page" aria-label="DroppedCandidatesPerStep in context on the diagnostics page">→</a></h3>

`float` · Init-only. Partners a full list left out, per step, over the steps since the last sample: contacts that step never solved. A point keeps at most <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#contactcandidatecapacity">`ContactCandidateCapacity`</a> partners a step.

<h3 id="droppedentriesperstep"><span class="prop"><code>DroppedEntriesPerStep</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#fabriceffectspatialhashoverflow-properties" title="DroppedEntriesPerStep in context on the diagnostics page" aria-label="DroppedEntriesPerStep in context on the diagnostics page">→</a></h3>

`float` · Read-only. Points the spatial hash couldn't file because their bucket was full, per step, over the steps since the last sample. Each one is a contact never seen for that step, by the solver or by anything that reads its buckets.

<h3 id="peakcandidates"><span class="prop"><code>PeakCandidates</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#fabriceffectspatialhashoverflow-properties" title="PeakCandidates in context on the diagnostics page" aria-label="PeakCandidates in context on the diagnostics page">→</a></h3>

`int` · Init-only. The longest list of partners any point wanted since the sheet was uploaded: what <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#contactcandidatecapacity">`ContactCandidateCapacity`</a> would need to be. 0 until a list overflows.

<h3 id="peakoccupancy"><span class="prop"><code>PeakOccupancy</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#fabriceffectspatialhashoverflow-properties" title="PeakOccupancy in context on the diagnostics page" aria-label="PeakOccupancy in context on the diagnostics page">→</a></h3>

`int` · Read-only. The deepest bucket since the sheet was uploaded: what <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#spatialhashmaxpercell">`SpatialHashMaxPerCell`</a> would need to be. 0 until a bucket overflows.
