---
layout: docs
legend: [prop, event]
title: "Glossary: GenericMouseCursorsData&lt;T&gt;"
description: "The members of GenericMouseCursorsData<T>, in alphabetical order."
---

The static holder of the general mouse cursors set of one element type, keyed by its style class `T`.

A static class. The [styles page](/docs/ui-styles/#genericmousecursorsdatat) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-styles/#genericmousecursorsdatat" title="GeneralMouseCursorsSet in context on the styles page" aria-label="GeneralMouseCursorsSet in context on the styles page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The set of every element of the type that has none of its own. `null` at start, which means the default set.

## Events

<h3 id="ongeneralmousecursorssetchanged"><span class="event"><code>OnGeneralMouseCursorsSetChanged</code></span> <a class="ctx" href="/docs/ui-styles/#genericmousecursorsdatat" title="OnGeneralMouseCursorsSetChanged in context on the styles page" aria-label="OnGeneralMouseCursorsSetChanged in context on the styles page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/types/mouse-cursors-set/">MouseCursorsSet</a> prevMouseCursorsSet)</code> · Static. <a class="ref prop" href="/docs/ui-glossary/types/generic-mouse-cursors-data/#generalmousecursorsset">`GeneralMouseCursorsSet`</a> is replaced; the handler gets the previous set. Not raised when a property of the set changes.
