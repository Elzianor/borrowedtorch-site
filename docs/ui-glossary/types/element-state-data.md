---
layout: docs
title: "Glossary: ElementStateData"
description: "The members of ElementStateData, in alphabetical order."
---

The state an element shows, passed to <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onstatechanged">`OnStateChanged`</a>. The UI shares one immutable instance per state and source.

A class. The [base element page](/docs/ui-base-element/#elementstatedata) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="mousebuttonsstates"><span class="prop"><code>MouseButtonsStates</code></span> <a class="ctx" href="/docs/ui-base-element/#elementstatedata" title="MouseButtonsStates in context on the base element page" aria-label="MouseButtonsStates in context on the base element page">→</a></h3>

<a class="ref prop" href="/docs/ui-glossary/types/element-state-data/#mousebuttonsstates">`MouseButtonsStates`</a> · Read-only. The current states of the mouse buttons (read when you read it, not stored with the state).

<h3 id="source"><span class="prop"><code>Source</code></span> <a class="ctx" href="/docs/ui-base-element/#elementstatedata" title="Source in context on the base element page" aria-label="Source in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/state-source/">`StateSource`</a> · Read-only. Where the state comes from.

<h3 id="state"><span class="prop"><code>State</code></span> <a class="ctx" href="/docs/ui-base-element/#elementstatedata" title="State in context on the base element page" aria-label="State in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/element-state/">`ElementState`</a> · Read-only. The state shown.

## Fields

<h3 id="normalown"><code>NormalOwn</code> <a class="ctx" href="/docs/ui-base-element/#elementstatedata" title="NormalOwn in context on the base element page" aria-label="NormalOwn in context on the base element page">→</a></h3>

`ElementStateData` · Static, read-only field. The `Normal` / `Own` state every element starts with.

## Methods

<h3 id="elementstatedata"><span class="method"><code>ElementStateData()</code></span> <a class="ctx" href="/docs/ui-base-element/#elementstatedata" title="ElementStateData() in context on the base element page" aria-label="ElementStateData() in context on the base element page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/element-state-data/#elementstatedata">`ElementStateData(ElementState state, StateSource source)`</a> · Creates a state, for example to compare with <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#statedata">`StateData`</a>.

<h3 id="section"><span class="method"><code>==()</code></span> <a class="ctx" href="/docs/ui-base-element/#elementstatedata" title="==() in context on the base element page" aria-label="==() in context on the base element page">→</a></h3>

`operator ==(ElementStateData state1, ElementStateData state2)` · True when the state and the source are equal. `!=` and `Equals` compare the same way.

<h3 id="gethashcode"><span class="method"><code>GetHashCode()</code></span> <a class="ctx" href="/docs/ui-base-element/#elementstatedata" title="GetHashCode() in context on the base element page" aria-label="GetHashCode() in context on the base element page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/element-state-data/#gethashcode">`GetHashCode()`</a> · A hash of the state and the source.

<h3 id="tostring"><span class="method"><code>ToString()</code></span> <a class="ctx" href="/docs/ui-base-element/#elementstatedata" title="ToString() in context on the base element page" aria-label="ToString() in context on the base element page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/element-state-data/#tostring">`ToString()`</a> · The state and the source as text, separated by a vertical bar.
