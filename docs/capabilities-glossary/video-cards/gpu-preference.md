---
layout: docs
title: "Glossary: GpuPreference"
description: "The values of GpuPreference."
---

Windows' graphics preference for an app, the one Settings keeps under System, Display, Graphics: which video card Windows makes the app's Direct3D devices on when the app names none.

An enum, in the namespace `BorrowedTorch.Capabilities`, numbered as Windows numbers it, in the setting (`GpuPreference=2;`) and in DXGI (`DXGI_GPU_PREFERENCE`). <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#get">`GpuPreferences.Get`</a> returns one, <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#set">`GpuPreferences.Set`</a> takes one, and <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#reachedby">`VideoCard.ReachedBy`</a> tells the one that reaches a card. The [picking the video card page](/docs/capabilities-gpu-preference/#gpupreference-values) shows it in context.

## Values

<h3 id="windowsdecides"><code>WindowsDecides</code> <a class="ctx" href="/docs/capabilities-gpu-preference/#gpupreference-values" title="WindowsDecides in context on the picking the video card page" aria-label="WindowsDecides in context on the picking the video card page">→</a></h3>

`0` · "Let Windows decide": usually the power saving card, unless the card's driver has the app down for another. What an app with no preference set gets.

<h3 id="powersaving"><code>PowerSaving</code> <a class="ctx" href="/docs/capabilities-gpu-preference/#gpupreference-values" title="PowerSaving in context on the picking the video card page" aria-label="PowerSaving in context on the picking the video card page">→</a></h3>

`1` · "Power saving": the card built into the processor, where there is one.

<h3 id="highperformance"><code>HighPerformance</code> <a class="ctx" href="/docs/capabilities-gpu-preference/#gpupreference-values" title="HighPerformance in context on the picking the video card page" aria-label="HighPerformance in context on the picking the video card page">→</a></h3>

`2` · "High performance": a card of its own, an external one first, where there is one.
