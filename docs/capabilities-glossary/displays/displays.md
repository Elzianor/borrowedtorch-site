---
layout: docs
legend: [method]
title: "Glossary: Displays"
description: "The members of Displays, in alphabetical order."
---

The displays on the desktop.

A static class, in the namespace `BorrowedTorch.Capabilities`. The [displays page](/docs/capabilities-displays/) shows it in context, with code. It can be called from any thread, and keeps nothing between calls.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Methods

<h3 id="list"><span class="method"><code>List()</code></span> <a class="ctx" href="/docs/capabilities-displays/#displays-methods" title="List() in context on the displays page" aria-label="List() in context on the displays page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/displays/displays/#list">`List()`</a> · Static. Returns the displays on the desktop, the primary one first, then the others by their left edge, then by their top edge. Displays set to show the same picture are one. Read as a per-monitor DPI aware thread reads them, whatever the awareness of the calling thread, which is put back after: sizes, positions and DPI are the displays' own. Empty where nothing is on a desktop: a service, or a machine with no display attached.
