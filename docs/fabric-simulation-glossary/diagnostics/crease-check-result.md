---
layout: docs
legend: [prop]
title: "Glossary: CreaseCheck.Result"
description: "The members of CreaseCheck.Result, in alphabetical order."
---

What one run of <a class="ref method" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/#run">`CreaseCheck.Run`</a> measured: how folded the sheet is now, how folded it rests, and how many of its folds have set as creases.

A read-only record struct nested in <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/">`CreaseCheck`</a>, compared by value, with a constructor that takes `MeanFoldDegrees`, `MeanRestFoldDegrees`, `CreasedEdges` and `FoldAtCreasesDegrees` in that order. Angles are in degrees from flat, as sizes: a fold either way counts the same. Comparing the two means separates a sheet folded because something presses on it, folded now but resting flat, from one folded because it wants to be. The [diagnostics page](/docs/fabric-simulation-diagnostics/#creasecheckresult-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="creasededges"><span class="prop"><code>CreasedEdges</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#creasecheckresult-properties" title="CreasedEdges in context on the diagnostics page" aria-label="CreasedEdges in context on the diagnostics page">→</a></h3>

`int` · Read-only. Folds whose rest angle has set more than <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/crease-check/#sharpfolddegrees">`SharpFoldDegrees`</a> from flat. Stays 0 while <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#bendingplasticrate">`BendingPlasticRate`</a> is 0, since nothing then sets.

<h3 id="foldatcreasesdegrees"><span class="prop"><code>FoldAtCreasesDegrees</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#creasecheckresult-properties" title="FoldAtCreasesDegrees in context on the diagnostics page" aria-label="FoldAtCreasesDegrees in context on the diagnostics page">→</a></h3>

`float` · Read-only. How folded the creases are now, averaged over the <a class="ref prop" href="/docs/fabric-simulation-glossary/diagnostics/crease-check-result/#creasededges">`CreasedEdges`</a> alone; 0 when there are none. The two means below are diluted by every flat fold of the sheet, this one isn't.

<h3 id="meanfolddegrees"><span class="prop"><code>MeanFoldDegrees</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#creasecheckresult-properties" title="MeanFoldDegrees in context on the diagnostics page" aria-label="MeanFoldDegrees in context on the diagnostics page">→</a></h3>

`float` · Read-only. How folded the sheet is now, averaged over every fold measured.

<h3 id="meanrestfolddegrees"><span class="prop"><code>MeanRestFoldDegrees</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#creasecheckresult-properties" title="MeanRestFoldDegrees in context on the diagnostics page" aria-label="MeanRestFoldDegrees in context on the diagnostics page">→</a></h3>

`float` · Read-only. How folded the sheet rests, averaged over the same folds: how creased it is. Starts small but not at 0, from the starting ripple of <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#seedripple">`SeedRipple`</a>, which the rest angles are taken from.
