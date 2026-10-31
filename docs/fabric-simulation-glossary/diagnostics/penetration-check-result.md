---
layout: docs
legend: [prop]
title: "Glossary: PenetrationCheck.Result"
description: "The members of PenetrationCheck.Result, in alphabetical order."
---

What one run of <a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/#run">`PenetrationCheck.Run`</a> measured: the pairs touching, the pairs gone through, and the deepest overlap.

A read-only record struct nested in <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/">`PenetrationCheck`</a>, compared by value, with a constructor that takes `Contacts`, `Penetrations` and `WorstOverlapRatio` in that order. All zeros when nothing touches. The [diagnostics page](/docs/fabric-simulation-diagnostics/#penetrationcheckresult-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="contacts"><span class="prop"><code>Contacts</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#penetrationcheckresult-properties" title="Contacts in context on the diagnostics page" aria-label="Contacts in context on the diagnostics page">→</a></h3>

`int` · Read-only. Pairs closer than the thickness, deep or not. Cloth lying on itself has plenty: layers at rest sit right at the thickness.

<h3 id="penetrations"><span class="prop"><code>Penetrations</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#penetrationcheckresult-properties" title="Penetrations in context on the diagnostics page" aria-label="Penetrations in context on the diagnostics page">→</a></h3>

`int` · Read-only. Pairs overlapping by more than <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/#deepoverlapratio">`DeepOverlapRatio`</a> of the thickness: one layer gone through another, which is what "the cloth passes through itself" means. The figure to watch.

<h3 id="worstoverlapratio"><span class="prop"><code>WorstOverlapRatio</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#penetrationcheckresult-properties" title="WorstOverlapRatio in context on the diagnostics page" aria-label="WorstOverlapRatio in context on the diagnostics page">→</a></h3>

`float` · Read-only. The deepest overlap, as a fraction of the thickness: 0 when nothing touches, 1 for two points at the same place.
