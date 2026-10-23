---
layout: docs
legend: [prop, dp, method]
title: "Glossary: IItemsTemplate"
description: "The members of IItemsTemplate, in alphabetical order."
---

A list's <span class="prop">`ItemsTemplate`</span>. A virtualized [`ListBox`](/docs/ui-lists/#listbox) (<a class="ref dp" href="/docs/ui-glossary/elements/list-box/#virtualizationmode">`VirtualizationMode`</a> `Fixed`) reuses the rows that scroll out of view: a template that can show another source object in an element it made overrides <a class="ref method" href="/docs/ui-glossary/types/i-items-template/#updateitemelement">`UpdateItemElement`</a>, otherwise a reused row gets a new element, as without virtualization.

An interface. The [styles page](/docs/ui-styles/#iitemstemplate) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Methods

<h3 id="generateitemelement"><span class="method"><code>GenerateItemElement()</code></span> <a class="ctx" href="/docs/ui-styles/#iitemstemplate" title="GenerateItemElement() in context on the styles page" aria-label="GenerateItemElement() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/i-items-template/#generateitemelement">`GenerateItemElement(object data)`</a> · Returns a new element that shows the source object.

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | `object` | The source object the element shows. |

<h3 id="updateitemelement"><span class="method"><code>UpdateItemElement()</code></span> <a class="ctx" href="/docs/ui-styles/#iitemstemplate" title="UpdateItemElement() in context on the styles page" aria-label="UpdateItemElement() in context on the styles page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/i-items-template/#updateitemelement">UpdateItemElement</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> element, object data)</code></span> · Returns the element that shows `data` in a row whose element, made by this template, showed another source object: `element` updated, or a new one, which replaces it (the list disposes the replaced one). By default it returns <a class="ref method" href="/docs/ui-glossary/types/i-items-template/#generateitemelement">`GenerateItemElement(data)`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element this template made for the row, showing another source object. |
| `data` | `object` | The source object the row shows now. |
