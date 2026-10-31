---
layout: docs
legend: [method]
title: "Glossary: VideoCards"
description: "The members of VideoCards, in alphabetical order."
---

The video cards of the machine, as DirectX knows them.

A static class, in the namespace `BorrowedTorch.Capabilities`. The [video cards page](/docs/capabilities-video-cards/) shows it in context, with code. It can be called from any thread, and keeps nothing between calls.

Names are colored by what they are: a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Methods

<h3 id="list"><span class="method"><code>List(bool)</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocards-methods" title="List(bool) in context on the video cards page" aria-label="List(bool) in context on the video cards page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/video-cards/video-cards/#list">`List(bool includeSoftware = false)`</a> · Static. Returns the cards in DXGI's order, the order `IDXGIFactory1::EnumAdapters1` gives them, the default card (<a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#isdefault">`VideoCard.IsDefault`</a>) first, each marked with the graphics preferences that reach it. DXGI is read again on every call. The Microsoft Basic Render Driver, which draws Direct3D on the processor, only with `includeSoftware`: on a machine with no working card it is the only adapter and the default one, and the list without it is empty. Empty too where DXGI can't be asked.

| Parameter | Type | Description |
| --- | --- | --- |
| `includeSoftware` | `bool` | Whether to list the Microsoft Basic Render Driver too. `false` by default. |
