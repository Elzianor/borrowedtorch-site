---
layout: docs
title: "Glossary: IRecyclingItemsTemplate"
description: "The members of IRecyclingItemsTemplate, in alphabetical order."
---

An <a class="ref" href="/docs/ui-glossary/types/i-items-template/">`IItemsTemplate`</a> whose elements can be re-bound to another source object. A virtualized [`ListBox`](/docs/ui-lists/#listbox) (<a class="ref dp" href="/docs/ui-glossary/elements/list-box/#virtualizationmode">`VirtualizationMode`</a> `Fixed`) then reuses the row elements that scroll out of view instead of generating new ones.

An interface. The [styles page](/docs/ui-styles/#irecyclingitemstemplate) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Methods

<h3 id="updateitemelement"><span class="method"><code>UpdateItemElement()</code></span> <a class="ctx" href="/docs/ui-styles/#irecyclingitemstemplate" title="UpdateItemElement() in context on the styles page" aria-label="UpdateItemElement() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/i-recycling-items-template/#updateitemelement">`UpdateItemElement(BaseElement element, object data)`</a> · Shows `data` in an element that `GenerateItemElement` of this template made earlier.
