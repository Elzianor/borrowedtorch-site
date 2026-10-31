---
layout: docs
legend: [prop, method]
title: "Glossary: VideoCard"
description: "The members of VideoCard, in alphabetical order."
---

A video card as DirectX knows it: what it is, how much memory it has, and which card Windows makes an app's Direct3D devices on, now and for each graphics preference.

A sealed record, in the namespace `BorrowedTorch.Capabilities`, compared by its values; its properties can be set with an initializer or `with`. <a class="ref method" href="/docs/capabilities-glossary/video-cards/video-cards/#list">`VideoCards.List`</a> makes them, read once: a card plugged in or out, or a preference changed, shows in the next list. The [video cards page](/docs/capabilities-video-cards/) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="dedicatedsystemmemory"><span class="prop"><code>DedicatedSystemMemory</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-memory-properties" title="DedicatedSystemMemory in context on the video cards page" aria-label="DedicatedSystemMemory in context on the video cards page">→</a></h3>

`long` · The machine's memory set aside for the card alone when the machine starts, in bytes.

<h3 id="dedicatedvideomemory"><span class="prop"><code>DedicatedVideoMemory</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-memory-properties" title="DedicatedVideoMemory in context on the video cards page" aria-label="DedicatedVideoMemory in context on the video cards page">→</a></h3>

`long` · The card's own memory, in bytes: none, or little, for a card built into the processor, which draws in the machine's memory (<a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#sharedsystemmemory">`SharedSystemMemory`</a>).

<h3 id="deviceid"><span class="prop"><code>DeviceId</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-identity-properties" title="DeviceId in context on the video cards page" aria-label="DeviceId in context on the video cards page">→</a></h3>

`int` · The PCI id of the card's model, among its maker's: `0x2560` for a GeForce RTX 3060 Laptop GPU.

<h3 id="isdefault"><span class="prop"><code>IsDefault</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-preference-properties" title="IsDefault in context on the video cards page" aria-label="IsDefault in context on the video cards page">→</a></h3>

`bool` · The card a Direct3D device made without naming one is made on, in the process that read the list: the first DXGI lists, which already follows the app's graphics preference. The MonoGame WindowsDX the BorrowedTorch editor runs on makes its device that way, whatever `GraphicsAdapter` it is handed. A list read after the app's preference has changed may already mark the card its next start goes to.

<h3 id="ispreferredforhighperformance"><span class="prop"><code>IsPreferredForHighPerformance</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-preference-properties" title="IsPreferredForHighPerformance in context on the video cards page" aria-label="IsPreferredForHighPerformance in context on the video cards page">→</a></h3>

`bool` · The card Windows makes an app's devices on when the app's graphics preference is <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#highperformance">`GpuPreference.HighPerformance`</a>: the first DXGI 1.6 ranks for it. `false` for every card on Windows 10 before 1803.

<h3 id="ispreferredforpowersaving"><span class="prop"><code>IsPreferredForPowerSaving</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-preference-properties" title="IsPreferredForPowerSaving in context on the video cards page" aria-label="IsPreferredForPowerSaving in context on the video cards page">→</a></h3>

`bool` · The card Windows makes an app's devices on when the app's graphics preference is <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#powersaving">`GpuPreference.PowerSaving`</a>: the first DXGI 1.6 ranks for it. `false` for every card on Windows 10 before 1803.

<h3 id="issoftware"><span class="prop"><code>IsSoftware</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-identity-properties" title="IsSoftware in context on the video cards page" aria-label="IsSoftware in context on the video cards page">→</a></h3>

`bool` · The Microsoft Basic Render Driver: no card at all, Direct3D drawn on the processor (WARP). Listed only when asked for, see <a class="ref method" href="/docs/capabilities-glossary/video-cards/video-cards/#list">`VideoCards.List`</a>.

<h3 id="luid"><span class="prop"><code>Luid</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-identity-properties" title="Luid in context on the video cards page" aria-label="Luid in context on the video cards page">→</a></h3>

`long` · The id Windows knows the card by until it restarts, its LUID, as one number: what Direct3D and DXGI name the adapter by, and what a display names its card by (<a class="ref prop" href="/docs/capabilities-glossary/displays/display/#videocardluid">`Display.VideoCardLuid`</a>). It changes when the machine restarts: save a card by its name and ids.

<h3 id="name"><span class="prop"><code>Name</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-identity-properties" title="Name in context on the video cards page" aria-label="Name in context on the video cards page">→</a></h3>

`string` · The name the driver gives the card: `NVIDIA GeForce RTX 3060 Laptop GPU`.

<h3 id="reachedby"><span class="prop"><code>ReachedBy</code></span> <a class="ctx" href="/docs/capabilities-gpu-preference/#which-card-each-preference-reaches" title="ReachedBy in context on the picking the video card page" aria-label="ReachedBy in context on the picking the video card page">→</a></h3>

<a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/">`GpuPreference?`</a> · Read-only. The graphics preference that has Windows make an app's devices on this card, to set with <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#set">`GpuPreferences.Set`</a> for a game to draw with it from its next start: <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#highperformance">`GpuPreference.HighPerformance`</a> where both preferences pick it (a machine with one card), <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#powersaving">`GpuPreference.PowerSaving`</a> where only power saving does, null where neither does (a third card, or any card on Windows 10 before 1803). A card no preference reaches is drawn with only by a renderer that names it.

<h3 id="revision"><span class="prop"><code>Revision</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-identity-properties" title="Revision in context on the video cards page" aria-label="Revision in context on the video cards page">→</a></h3>

`int` · The chip's revision.

<h3 id="sharedsystemmemory"><span class="prop"><code>SharedSystemMemory</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-memory-properties" title="SharedSystemMemory in context on the video cards page" aria-label="SharedSystemMemory in context on the video cards page">→</a></h3>

`long` · The machine's memory the card can use besides, shared with everything else, in bytes.

<h3 id="subsystemid"><span class="prop"><code>SubSystemId</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-identity-properties" title="SubSystemId in context on the video cards page" aria-label="SubSystemId in context on the video cards page">→</a></h3>

`int` · The id of the board the chip is on: the board's id and its maker's together.

<h3 id="vendor"><span class="prop"><code>Vendor</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-identity-properties" title="Vendor in context on the video cards page" aria-label="Vendor in context on the video cards page">→</a></h3>

<a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/">`GpuVendor`</a> · Who made the card, read from <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendorid">`VendorId`</a> by <a class="ref method" href="/docs/capabilities-glossary/video-cards/video-card/#vendorof">`VendorOf`</a>.

<h3 id="vendorid"><span class="prop"><code>VendorId</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-identity-properties" title="VendorId in context on the video cards page" aria-label="VendorId in context on the video cards page">→</a></h3>

`int` · The PCI id of the card's maker: `0x10DE` for NVIDIA.

## Methods

<h3 id="vendorof"><span class="method"><code>VendorOf(int)</code></span> <a class="ctx" href="/docs/capabilities-video-cards/#videocard-methods" title="VendorOf(int) in context on the video cards page" aria-label="VendorOf(int) in context on the video cards page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/video-cards/video-card/#vendorof">`VendorOf(int vendorId)`</a> · Static. Returns the maker a PCI vendor id stands for: <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/#unknown">`GpuVendor.Unknown`</a> for an id the list doesn't know.

| Parameter | Type | Description |
| --- | --- | --- |
| `vendorId` | `int` | A PCI vendor id, as <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendorid">`VendorId`</a> gives it. |
