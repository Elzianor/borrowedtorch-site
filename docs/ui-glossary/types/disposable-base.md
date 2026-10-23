---
layout: docs
legend: [prop, method]
title: "Glossary: DisposableBase"
description: "The members of DisposableBase, in alphabetical order."
---

The base class of <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a>, with the dispose pattern every element uses.

An abstract class. The [base element page](/docs/ui-base-element/#disposablebase) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="isdisposed"><span class="prop"><code>IsDisposed</code></span> <a class="ctx" href="/docs/ui-base-element/#disposablebase" title="IsDisposed in context on the base element page" aria-label="IsDisposed in context on the base element page">🠆</a></h3>

`bool` · Read-only. True once <a class="ref method" href="/docs/ui-glossary/types/disposable-base/#dispose">`Dispose()`</a> was called.

## Methods

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/ui-base-element/#disposablebase" title="Dispose() in context on the base element page" aria-label="Dispose() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/disposable-base/#dispose">`Dispose()`</a> · Marks the object disposed and runs <a class="ref method" href="/docs/ui-glossary/types/disposable-base/#disposehandler">`DisposeHandler`</a> once; later calls do nothing.

<h3 id="disposehandler"><span class="method"><code>DisposeHandler()</code></span> <a class="ctx" href="/docs/ui-base-element/#disposablebase" title="DisposeHandler() in context on the base element page" aria-label="DisposeHandler() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/disposable-base/#disposehandler">`DisposeHandler()`</a> · Protected, abstract. The clean-up of the derived class; <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> implements it as described above.
