---
layout: docs
title: "Glossary: CollectionChangeType"
description: "The values of CollectionChangeType."
---

Passed to `OnSourceCollectionChanged`.

An enum. The [styles page](/docs/ui-styles/#collectionchangetype) shows it in context.

## Values

<h3 id="initialize"><code>Initialize</code> <a class="ctx" href="/docs/ui-styles/#collectionchangetype" title="Initialize in context on the styles page" aria-label="Initialize in context on the styles page">➤</a></h3>

The whole source is taken again. Used by the list box when it rebuilds its rows; `OnSourceCollectionChanged` doesn't raise it.

<h3 id="add"><code>Add</code> <a class="ctx" href="/docs/ui-styles/#collectionchangetype" title="Add in context on the styles page" aria-label="Add in context on the styles page">➤</a></h3>

Items were added.

<h3 id="remove"><code>Remove</code> <a class="ctx" href="/docs/ui-styles/#collectionchangetype" title="Remove in context on the styles page" aria-label="Remove in context on the styles page">➤</a></h3>

Items were removed.
