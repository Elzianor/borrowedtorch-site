---
layout: docs
legend: [prop, method]
title: "Glossary: ActiveInputs&lt;TStatus&gt;"
description: "The members of ActiveInputs<TStatus>, in alphabetical order."
---

A live, read-only view of a list of active inputs: what <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a> and <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a> are.

A sealed class, in the namespace `BorrowedTorch.MonoInput.Inputs`, that implements `IReadOnlyCollection<TStatus>`. It has no public constructor: the keyboard and MIDI managers create one each, for the whole run. It shows the list as it is now, and its manager's `Update` adds, moves and removes the statuses in it. The [button states page](/docs/monoinput-states/#activeinputs-members) shows it in context, with code.

A `foreach` over it takes the list's own struct enumerator and doesn't allocate. LINQ, and any other code that goes through `IEnumerable<TStatus>`, boxes that enumerator and allocates.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="count"><span class="prop"><code>Count</code></span> <a class="ctx" href="/docs/monoinput-states/#activeinputs-members" title="Count in context on the button states page" aria-label="Count in context on the button states page">→</a></h3>

`int` · Read-only. How many inputs are active: pressed, held or just let go.

## Methods

<h3 id="getenumerator"><span class="method"><code>GetEnumerator()</code></span> <a class="ctx" href="/docs/monoinput-states/#activeinputs-members" title="GetEnumerator() in context on the button states page" aria-label="GetEnumerator() in context on the button states page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/states/active-inputs/#getenumerator">`GetEnumerator()`</a> · Returns `LinkedList<TStatus>.Enumerator`, a struct, over the statuses in the order their inputs were first pressed. `foreach` calls it. Like any list enumerator, it throws `InvalidOperationException` when its manager's `Update` runs in the middle of the loop.
