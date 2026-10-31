---
layout: docs
legend: [prop]
title: "Glossary: FabricEffect.CoincidentContacts"
description: "The members of FabricEffect.CoincidentContacts, in alphabetical order."
---

Contacts between points that sat at the same spot with no history to tell them apart, which the solver pushed apart along an axis picked from their indices: a guess that can swap two layers.

A read-only record struct nested in <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/">`FabricEffect`</a>, compared by value, returned by <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#samplecoincidentcontacts">`SampleCoincidentContacts`</a>. Its constructor takes <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-coincident-contacts/#perstep">`PerStep`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-coincident-contacts/#total">`Total`</a>, in that order. Both read 0 unless the solver is compiled with <a class="ref" href="/docs/fabric-simulation-glossary/hlsl/fabric-compute-fx/#fabric_count_coincident">`FABRIC_COUNT_COINCIDENT`</a> defined, since the count costs an atomic in the innermost contact loop. Only cloth crushed hard gets there. The [diagnostics page](/docs/fabric-simulation-diagnostics/#fabriceffectcoincidentcontacts-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="perstep"><span class="prop"><code>PerStep</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#fabriceffectcoincidentcontacts-properties" title="PerStep in context on the diagnostics page" aria-label="PerStep in context on the diagnostics page">→</a></h3>

`float` · Read-only. Such contacts per step, over the steps since the last call.

<h3 id="total"><span class="prop"><code>Total</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#fabriceffectcoincidentcontacts-properties" title="Total in context on the diagnostics page" aria-label="Total in context on the diagnostics page">→</a></h3>

`long` · Read-only. Such contacts since the sheet was uploaded.
