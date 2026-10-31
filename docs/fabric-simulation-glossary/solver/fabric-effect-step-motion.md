---
layout: docs
legend: [prop]
title: "Glossary: FabricEffect.StepMotion"
description: "The members of FabricEffect.StepMotion, in alphabetical order."
---

How close the sheet has come to outrunning its own collision tests: the furthest a point moved in one step, against the cloth's thickness.

A read-only record struct nested in <a class="ref" href="/docs/fabric-simulation-glossary/solver/fabric-effect/">`FabricEffect`</a>, compared by value, returned by <a class="ref method" href="/docs/fabric-simulation-glossary/solver/fabric-effect/#sampleworststepmotion">`SampleWorstStepMotion`</a>. Its constructor takes <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-step-motion/#peakratio">`PeakRatio`</a> and <a class="ref prop" href="/docs/fabric-simulation-glossary/solver/fabric-effect-step-motion/#fastparticlesteps">`FastParticleSteps`</a>, in that order. Contacts are tested where the points end a step, not along the path they took, so a point that moves further than the thickness in one step can pass through another layer with nothing able to see it, the solver or <a class="ref" href="/docs/fabric-simulation-glossary/diagnostics/penetration-check/">`PenetrationCheck`</a>. Measured only while <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#useselfcollision">`UseSelfCollision`</a> is on. The [diagnostics page](/docs/fabric-simulation-diagnostics/#fabriceffectstepmotion-properties) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>; values and fields keep the plain color.

## Properties

<h3 id="fastparticlesteps"><span class="prop"><code>FastParticleSteps</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#fabriceffectstepmotion-properties" title="FastParticleSteps in context on the diagnostics page" aria-label="FastParticleSteps in context on the diagnostics page">→</a></h3>

`long` · Read-only. How many particle-steps went past one thickness since the sheet was uploaded: one for each point, at each step, that moved further than <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#selfcollisionthickness">`SelfCollisionThickness`</a>.

<h3 id="peakratio"><span class="prop"><code>PeakRatio</code></span> <a class="ctx" href="/docs/fabric-simulation-diagnostics/#fabriceffectstepmotion-properties" title="PeakRatio in context on the diagnostics page" aria-label="PeakRatio in context on the diagnostics page">→</a></h3>

`float` · Read-only. The furthest single-step move since the sheet was uploaded, in thicknesses, to a thousandth. Above 1, a layer can cross another unseen. The thickness is a fraction of the spacing, so a finer grid lowers the bar while gravity leaves the speeds alone: check it at the resolution you ship. Raising <a class="ref prop" href="/docs/fabric-simulation-glossary/sheet/fabric-settings/#solverfrequencyhz">`SolverFrequencyHz`</a> is the cheap fix: doubling it roughly halves the figure. It keeps its value until the next <a class="ref method" href="/docs/fabric-simulation-glossary/sheet/fabric/#rebuild">`Rebuild`</a>.
