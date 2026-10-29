---
layout: docs
legend: [prop, method]
title: "Glossary: MouseButtonInfo"
description: "The members of MouseButtonInfo, in alphabetical order."
---

One mouse button: which one, and its state.

A class, in the namespace `BorrowedTorch.MonoInput.Inputs.Mouse`. `MouseButtonInfo` derives from [`ButtonInfo`](/docs/monoinput-glossary/states/button-info/) and has its members too: the state and the five checks. <a class="ref prop" href="/docs/monoinput-glossary/mouse/mouse-manager/#mousestatus">`MouseStatus`</a> holds the five. The [mouse page](/docs/monoinput-mouse/#mousebuttoninfo-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="type"><span class="prop"><code>Type</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttoninfo-members" title="Type in context on the mouse page" aria-label="Type in context on the mouse page">→</a></h3>

<a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-types/">`MouseButtonTypes`</a> · Read-only. Which button it is.

## Methods

<h3 id="mousebuttoninfo"><span class="method"><code>MouseButtonInfo()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttoninfo-members" title="MouseButtonInfo() in context on the mouse page" aria-label="MouseButtonInfo() in context on the mouse page">→</a></h3>

<span class="method"><code><a href="/docs/monoinput-glossary/mouse/mouse-button-info/#mousebuttoninfo">MouseButtonInfo</a>(<a href="/docs/monoinput-glossary/mouse/mouse-button-types/">MouseButtonTypes</a> type)</code></span> · A button of the type, `Idle`. The mouse status makes its own five; one you create is never updated.

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | <a class="ref" href="/docs/monoinput-glossary/mouse/mouse-button-types/">`MouseButtonTypes`</a> | Which button it is. |

<h3 id="tostring"><span class="method"><code>ToString()</code></span> <a class="ctx" href="/docs/monoinput-mouse/#mousebuttoninfo-members" title="ToString() in context on the mouse page" aria-label="ToString() in context on the mouse page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/mouse/mouse-button-info/#tostring">`ToString()`</a> · The type and the state, such as `Left | Pressed`.
