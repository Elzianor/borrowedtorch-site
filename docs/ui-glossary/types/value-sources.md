---
layout: docs
title: "Glossary: ValueSources"
description: "The values of ValueSources."
---

An enum. The [styles page](/docs/ui-styles/#valuesources) shows it in context.

## Values

<h3 id="manualassign"><code>ManualAssign</code> <a class="ctx" href="/docs/ui-styles/#valuesources" title="ManualAssign in context on the styles page" aria-label="ManualAssign in context on the styles page">→</a></h3>

A value set in code (`element.Foo = ...` or `FooDP.SetValue`), by a binding or by an animation. Highest priority.

<h3 id="styleoverride"><code>StyleOverride</code> <a class="ctx" href="/docs/ui-styles/#valuesources" title="StyleOverride in context on the styles page" aria-label="StyleOverride in context on the styles page">→</a></h3>

A value from the element's <a class="ref" href="/docs/ui-glossary/types/value-sources/#styleoverride">`StyleOverride`</a>.

<h3 id="generalstyle"><code>GeneralStyle</code> <a class="ctx" href="/docs/ui-styles/#valuesources" title="GeneralStyle in context on the styles page" aria-label="GeneralStyle in context on the styles page">→</a></h3>

A value from the general style of the type, or from the framework defaults under it. Lowest priority.

<h3 id="none"><code>None</code> <a class="ctx" href="/docs/ui-styles/#valuesources" title="None in context on the styles page" aria-label="None in context on the styles page">→</a></h3>

No source has a value: the property reads its default. Returned by `ValueSource`; setting or clearing with it does nothing.
