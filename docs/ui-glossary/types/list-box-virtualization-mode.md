---
layout: docs
legend: [dp]
title: "Glossary: ListBoxVirtualizationMode"
description: "The values of ListBoxVirtualizationMode."
---

An enum. The [lists and menus page](/docs/ui-lists/#listboxvirtualizationmode) shows it in context.

## Values

<h3 id="none"><code>None</code> <a class="ctx" href="/docs/ui-lists/#listboxvirtualizationmode" title="None in context on the lists and menus page" aria-label="None in context on the lists and menus page">➤</a></h3>

Every row has its own element.

<h3 id="fixed"><code>Fixed</code> <a class="ctx" href="/docs/ui-lists/#listboxvirtualizationmode" title="Fixed in context on the lists and menus page" aria-label="Fixed in context on the lists and menus page">➤</a></h3>

Every row is <a class="ref dp" href="/docs/ui-glossary/elements/list-box/#itemheight">`ItemHeight`</a> high and only the rows in view, plus a small buffer, have elements, reused while scrolling.
