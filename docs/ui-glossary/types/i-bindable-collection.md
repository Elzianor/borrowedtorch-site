---
layout: docs
legend: [event]
title: "Glossary: IBindableCollection"
description: "The members of IBindableCollection, in alphabetical order."
---

An `IEnumerable` that reports its changes. Implement it for a collection of your own to use it as a bound items source.

An interface. The [styles page](/docs/ui-styles/#ibindablecollection) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Events

<h3 id="oncollectionchanged"><span class="event"><code>OnCollectionChanged</code></span> <a class="ctx" href="/docs/ui-styles/#ibindablecollection" title="OnCollectionChanged in context on the styles page" aria-label="OnCollectionChanged in context on the styles page">→</a></h3>

`(bool isItemsAdded, int startIndex, int count)` · Items were added (`true`) or removed (`false`), `count` of them from `startIndex`.
