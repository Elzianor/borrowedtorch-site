---
layout: docs
title: "Glossary: TabControl.TabOpened"
description: "The signature of TabControl.TabOpened and the events it handles."
---

A delegate: the handler type of an event.

Signature: <code>void TabOpened(<a href="/docs/ui-glossary/types/tab-control/">TabControl</a> sender, <a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> tab)</code>

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/ui-glossary/types/tab-control/">`TabControl`</a> | The tab control. |
| `tab` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The tab that opened, or `null` when the last tab was removed. |

Handles [`TabControl.OnTabOpened`](/docs/ui-glossary/types/tab-control/#ontabopened).
