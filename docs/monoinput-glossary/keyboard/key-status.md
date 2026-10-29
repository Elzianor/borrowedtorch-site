---
layout: docs
legend: [prop, method]
title: "Glossary: KeyStatus"
description: "The members of KeyStatus, in alphabetical order."
---

One key in <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a>: which key, and its state.

A class, in the namespace `BorrowedTorch.MonoInput.Inputs.Keyboard`. `KeyStatus` derives from [`ActiveInputStatus<Keys>`](/docs/monoinput-glossary/states/active-input-status/) and has its member too: <a class="ref prop" href="/docs/monoinput-glossary/states/active-input-status/#state">`State`</a>. The [keyboard page](/docs/monoinput-keyboard/#keystatus-members) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="key"><span class="prop"><code>Key</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keystatus-members" title="Key in context on the keyboard page" aria-label="Key in context on the keyboard page">→</a></h3>

`Keys` · Read-only. The key, as MonoGame names it.

## Methods

<h3 id="keystatus"><span class="method"><code>KeyStatus()</code></span> <a class="ctx" href="/docs/monoinput-keyboard/#keystatus-members" title="KeyStatus() in context on the keyboard page" aria-label="KeyStatus() in context on the keyboard page">→</a></h3>

<a class="ref method" href="/docs/monoinput-glossary/keyboard/key-status/#keystatus">`KeyStatus(Keys key)`</a> · A status for the key, `Pressed`. The keyboard manager makes its own; one you create is never updated.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `Keys` | The key, as MonoGame names it. |
