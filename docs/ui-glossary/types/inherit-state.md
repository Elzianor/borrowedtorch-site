---
layout: docs
title: "Glossary: InheritState"
description: "The values of InheritState."
---

A set of flags: the values combine.

An enum. The [base element page](/docs/ui-base-element/#inheritstate) shows it in context.

## Values

<h3 id="none"><code>None</code> <a class="ctx" href="/docs/ui-base-element/#inheritstate" title="None in context on the base element page" aria-label="None in context on the base element page">🠆</a></h3>

Shows its own state only.

<h3 id="fromparent"><code>FromParent</code> <a class="ctx" href="/docs/ui-base-element/#inheritstate" title="FromParent in context on the base element page" aria-label="FromParent in context on the base element page">🠆</a></h3>

Also shows its parent's state (its own and what the parent took from above).

<h3 id="fromchildren"><code>FromChildren</code> <a class="ctx" href="/docs/ui-base-element/#inheritstate" title="FromChildren in context on the base element page" aria-label="FromChildren in context on the base element page">🠆</a></h3>

Also shows the highest state of its children.

<h3 id="both"><code>Both</code> <a class="ctx" href="/docs/ui-base-element/#inheritstate" title="Both in context on the base element page" aria-label="Both in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromparent">`FromParent`</a> and <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`FromChildren`</a>.
