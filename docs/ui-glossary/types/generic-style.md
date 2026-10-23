---
layout: docs
legend: [prop, event]
title: "Glossary: GenericStyle&lt;T&gt;"
description: "The members of GenericStyle<T>, in alphabetical order."
---

The static holder of the general style of one style type, where `T` is the style class. <a class="ref prop" href="/docs/ui-glossary/elements/button/#generalstyle">`Button.GeneralStyle`</a> reads and writes <code><a href="/docs/ui-glossary/types/generic-style/">GenericStyle</a>&lt;<a href="/docs/ui-glossary/types/button-style/">ButtonStyle</a>&gt;.GeneralStyle</code>. It also keeps the framework defaults of the type, built the first time the type is used from the class's defaults (internal, not reachable from your code).

A static class. The [styles page](/docs/ui-styles/#genericstylet) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-styles/#genericstylet" title="GeneralStyle in context on the styles page" aria-label="GeneralStyle in context on the styles page">🠆</a></h3>

`T` · Static. The style every element of the type takes, over the framework defaults. Starts as a copy of the defaults; `null` leaves only the defaults.

## Events

<h3 id="ongeneralstylechanged"><span class="event"><code>OnGeneralStyleChanged</code></span> <a class="ctx" href="/docs/ui-styles/#genericstylet" title="OnGeneralStyleChanged in context on the styles page" aria-label="OnGeneralStyleChanged in context on the styles page">🠆</a></h3>

`(T prevStyle)` · Static. <a class="ref prop" href="/docs/ui-glossary/types/generic-style/#generalstyle">`GeneralStyle`</a> is replaced by another style; the handler gets the previous one. Not raised when a property of the style changes.
