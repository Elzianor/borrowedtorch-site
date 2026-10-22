---
layout: docs
legend: [prop, method]
title: "Glossary: Margin"
description: "The members of Margin, in alphabetical order."
---

A small read-only struct with one value per side. It converts implicitly from an `int` and from tuples, so you rarely write <code>new <a href="/docs/ui-glossary/types/margin/">Margin</a>(...)</code>:

A struct. The [base element page](/docs/ui-base-element/#margin) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="zero"><span class="prop"><code>Zero</code></span> <a class="ctx" href="/docs/ui-base-element/#margin" title="Zero in context on the base element page" aria-label="Zero in context on the base element page">→</a></h3>

`Margin` · Static, read-only. A margin of 0 on every side.

## Fields

<h3 id="bottom"><code>Bottom</code> <a class="ctx" href="/docs/ui-base-element/#margin" title="Bottom in context on the base element page" aria-label="Bottom in context on the base element page">→</a></h3>

`int` · Read-only field. The bottom margin.

<h3 id="left"><code>Left</code> <a class="ctx" href="/docs/ui-base-element/#margin" title="Left in context on the base element page" aria-label="Left in context on the base element page">→</a></h3>

`int` · Read-only field. The left margin.

<h3 id="right"><code>Right</code> <a class="ctx" href="/docs/ui-base-element/#margin" title="Right in context on the base element page" aria-label="Right in context on the base element page">→</a></h3>

`int` · Read-only field. The right margin.

<h3 id="top"><code>Top</code> <a class="ctx" href="/docs/ui-base-element/#margin" title="Top in context on the base element page" aria-label="Top in context on the base element page">→</a></h3>

`int` · Read-only field. The top margin.

## Methods

<h3 id="margin"><span class="method"><code>Margin()</code></span> <a class="ctx" href="/docs/ui-base-element/#margin" title="Margin() in context on the base element page" aria-label="Margin() in context on the base element page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/margin/#margin">`Margin()`</a> · A margin of 0 on every side.

<a class="ref method" href="/docs/ui-glossary/types/margin/#margin">`Margin(int all)`</a> · The same margin on every side.

<a class="ref method" href="/docs/ui-glossary/types/margin/#margin">`Margin(int left = 0, int top = 0, int right = 0, int bottom = 0)`</a> · A margin per side; the sides left out are 0.

`implicit operator Margin(int all)` · `element.Margin = 5` sets 5 on every side.

`implicit operator Margin((int left, int top) tuple)` · Left and top; right and bottom are 0.

`implicit operator Margin((int left, int top, int right) tuple)` · Left, top and right; bottom is 0.

`implicit operator Margin((int left, int top, int right, int bottom) tuple)` · All four sides.

<h3 id="section"><span class="method"><code>+()</code></span> <a class="ctx" href="/docs/ui-base-element/#margin" title="+() in context on the base element page" aria-label="+() in context on the base element page">→</a></h3>

`operator +(Margin margin1, Margin margin2)` · Adds the margins side by side.

<h3 id="section-1"><span class="method"><code>-()</code></span> <a class="ctx" href="/docs/ui-base-element/#margin" title="-() in context on the base element page" aria-label="-() in context on the base element page">→</a></h3>

`operator -(Margin margin)` · The margin with every side negated.

`operator -(Margin margin1, Margin margin2)` · Subtracts the second margin from the first, side by side.

<h3 id="section-1-1"><span class="method"><code>==()</code></span> <a class="ctx" href="/docs/ui-base-element/#margin" title="==() in context on the base element page" aria-label="==() in context on the base element page">→</a></h3>

`operator ==(Margin margin1, Margin margin2)` · True when all four sides are equal. `!=` is the opposite.

<h3 id="equals"><span class="method"><code>Equals()</code></span> <a class="ctx" href="/docs/ui-base-element/#margin" title="Equals() in context on the base element page" aria-label="Equals() in context on the base element page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/margin/#equals">`Equals(Margin other)`</a> · True when all four sides are equal (<a class="ref method" href="/docs/ui-glossary/types/margin/#equals">`Equals(object)`</a> as well, for another `Margin`).

<h3 id="gethashcode"><span class="method"><code>GetHashCode()</code></span> <a class="ctx" href="/docs/ui-base-element/#margin" title="GetHashCode() in context on the base element page" aria-label="GetHashCode() in context on the base element page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/margin/#gethashcode">`GetHashCode()`</a> · A hash of the four sides.

<h3 id="tostring"><span class="method"><code>ToString()</code></span> <a class="ctx" href="/docs/ui-base-element/#margin" title="ToString() in context on the base element page" aria-label="ToString() in context on the base element page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/margin/#tostring">`ToString()`</a> · The sides as text, for example `L: 10 R: 30 T: 20 B: 40`.
