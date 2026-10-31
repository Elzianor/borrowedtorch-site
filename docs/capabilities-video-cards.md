---
layout: docs
legend: [prop, method]
title: "Capabilities: video cards"
description: The video cards as DirectX knows them, their order, the software renderer, what a card is and how much memory it has, the card a game draws with, and the vendors.
---

<a class="ref method" href="/docs/capabilities-glossary/video-cards/video-cards/#list">`VideoCards.List`</a> gives the machine's video cards as DirectX knows them, each as a <a class="ref" href="/docs/capabilities-glossary/video-cards/video-card/">`VideoCard`</a>: what it is,
how much memory it has, and which card Windows makes a game's Direct3D device on. Names are colored by what they are: a
<span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the
plain color.

## The list

```csharp
IReadOnlyList<VideoCard> cards = VideoCards.List();
```

The cards come in DXGI's order, the order `IDXGIFactory1::EnumAdapters1` gives them, which starts with the default card:
the one a device made without naming a card is made on, see [the card a game draws with](#the-card-a-game-draws-with). A
laptop with a card built into the processor and one of its own lists both, a desktop with one card lists one.

Each call reads DXGI again and keeps nothing, so a card plugged in or out (an external one, or a card the driver has
just come back to) shows in the next list. A list where DirectX can't be asked at all, a process with no access to the
graphics stack, is empty. Two lists of the same cards are equal: a <a class="ref" href="/docs/capabilities-glossary/video-cards/video-card/">`VideoCard`</a> is a record, compared by its values.

### The software renderer

Windows always has one adapter that isn't a card: the Microsoft Basic Render Driver, which draws Direct3D on the
processor (WARP). The list leaves it out, as a game has nothing to offer the player in it; ask for it to see it:

```csharp
var all = VideoCards.List(includeSoftware: true);
var software = all.First(card => card.IsSoftware);   // "Microsoft Basic Render Driver"
```

On a machine with no working card, a virtual machine or a build server, it is the only adapter and the default one,
and `VideoCards.List()` is empty. A game that checks before it starts tells the player there:

```csharp
if (VideoCards.List().Count == 0)
    ShowMessage("No video card was found: the game would draw on the processor, slowly. Check the card's driver.");
```

### VideoCards methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/capabilities-glossary/video-cards/video-cards/#list">`List(bool includeSoftware = false)`</a> | The cards in DXGI's order, the default one first, each marked with the graphics preferences that reach it. The Microsoft Basic Render Driver only with `includeSoftware`. Empty where DirectX can't be asked. |

## What a card is

A card has the name its driver gives it and the PCI ids it goes by:

| Property | Example | What it tells |
| --- | --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#name">`Name`</a> | `NVIDIA GeForce RTX 3060 Laptop GPU` | The name to show the player |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendor">`Vendor`</a> | <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/">`GpuVendor`</a>`.Nvidia` | Who made it, read from the vendor id |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendorid">`VendorId`</a> | `0x10DE` | The PCI id of its maker |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#deviceid">`DeviceId`</a> | `0x2560` | The PCI id of its model, among its maker's |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#subsystemid">`SubSystemId`</a> | `0x3A8017AA` | The board the chip is on: the board's id and its maker's together |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#revision">`Revision`</a> | `161` | The chip's revision |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#luid">`Luid`</a> | `61767` | The id Windows knows the adapter by until it restarts |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#issoftware">`IsSoftware`</a> | `false` | The Basic Render Driver: no card at all |

The vendor and device ids are what a game keys a workaround on, for one maker's drivers or one model, and what a crash
report should carry with the name. The <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#luid">`Luid`</a> is the card's id while Windows runs: it changes when the machine
restarts, so it is for matching a card with what DXGI and Direct3D report now (a display's
<a class="ref prop" href="/docs/capabilities-glossary/displays/display/#videocardluid">`VideoCardLuid`</a>, the adapter of a device), not for saving in a settings file. Save a card by its name and ids.

### The vendors

<a class="ref method" href="/docs/capabilities-glossary/video-cards/video-card/#vendorof">`VideoCard.VendorOf`</a> reads a vendor id as a <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/">`GpuVendor`</a>, the way <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendor">`Vendor`</a> is set:

```csharp
if (card.Vendor == GpuVendor.Intel && card.DedicatedVideoMemory == 0)
    settings.Shadows = ShadowQuality.Low;   // a card built into the processor, sharing the machine's memory
```

### GpuVendor values

| Value | Vendor ids | Who |
| --- | --- | --- |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/#unknown">`Unknown`</a> | Any other | A maker the list doesn't know: <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendorid">`VendorId`</a> tells it |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/#nvidia">`Nvidia`</a> | `0x10DE` | NVIDIA |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/#amd">`Amd`</a> | `0x1002` | AMD, and ATI before it |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/#intel">`Intel`</a> | `0x8086` | Intel |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/#microsoft">`Microsoft`</a> | `0x1414` | The Basic Render Driver, and the cards of virtual machines |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/#qualcomm">`Qualcomm`</a> | `0x5143`, `0x4D4F4351` | Qualcomm's Adreno, on Windows on Arm machines (the second id is "QCOM" in letters) |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/#arm">`Arm`</a> | `0x13B5` | Arm's Mali |

### VideoCard identity properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#name">`Name`</a> | `string` | The name the driver gives the card. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendor">`Vendor`</a> | <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/">`GpuVendor`</a> | Who made the card, from <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendorid">`VendorId`</a>. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendorid">`VendorId`</a> | `int` | The PCI id of the card's maker. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#deviceid">`DeviceId`</a> | `int` | The PCI id of the card's model. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#subsystemid">`SubSystemId`</a> | `int` | The id of the board the chip is on. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#revision">`Revision`</a> | `int` | The chip's revision. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#luid">`Luid`</a> | `long` | The id Windows knows the card by until it restarts. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#issoftware">`IsSoftware`</a> | `bool` | The Microsoft Basic Render Driver, Direct3D drawn on the processor. |

### VideoCard methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/capabilities-glossary/video-cards/video-card/#vendorof">`VendorOf(int vendorId)`</a> | Static. The <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/">`GpuVendor`</a> a PCI vendor id stands for, <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-vendor/#unknown">`Unknown`</a> for one it doesn't know. |

## Memory

A card has memory of its own, and can use the machine's:

| Property | What it is |
| --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#dedicatedvideomemory">`DedicatedVideoMemory`</a> | The card's own memory. Little or none for a card built into the processor |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#dedicatedsystemmemory">`DedicatedSystemMemory`</a> | The machine's memory set aside for the card alone when the machine starts |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#sharedsystemmemory">`SharedSystemMemory`</a> | The machine's memory the card can use besides, shared with everything else: about half of it, on most machines |

All three are in bytes. The card's own memory is the one that decides how big the textures can be: a card of its own
with 4 GB plays at high texture quality where one with 2 GB doesn't, and a card built into the processor draws from the
shared memory, slower and taken from the game's. A first guess at a quality setting reads it:

```csharp
var card = VideoCards.List().FirstOrDefault(card => card.IsDefault);
var gigabytes = card == null ? 0 : card.DedicatedVideoMemory / (1024.0 * 1024 * 1024);

var textures = gigabytes switch
{
    >= 6 => TextureQuality.Ultra,
    >= 4 => TextureQuality.High,
    >= 2 => TextureQuality.Medium,
    _ => TextureQuality.Low
};
```

The numbers are what the driver reports, and are a guess at what the game can use, no more: the desktop and other apps
use the card's memory too.

### VideoCard memory properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#dedicatedvideomemory">`DedicatedVideoMemory`</a> | `long` | The card's own memory, in bytes. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#dedicatedsystemmemory">`DedicatedSystemMemory`</a> | `long` | The machine's memory set aside for the card alone at start, in bytes. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#sharedsystemmemory">`SharedSystemMemory`</a> | `long` | The machine's memory the card can use besides, shared with everything else, in bytes. |

## The card a game draws with

A Direct3D device is made on a card. A renderer can name the card it wants when it makes its device, or name none, and
then Windows makes it on the default card: the first in DXGI's order, which already follows the game's graphics
preference. <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#isdefault">`IsDefault`</a> marks that card, for the process that reads the list:

```csharp
var drawnWith = VideoCards.List().FirstOrDefault(card => card.IsDefault);
```

For a game whose renderer names no card, that is the card it draws with. The MonoGame WindowsDX the BorrowedTorch editor
runs on is one: it makes its device on the default card, whatever `GraphicsAdapter` it is handed. A renderer that names
a card knows which. Any game can ask its device: the adapter of its DXGI device has a LUID, the
<a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#luid">`Luid`</a> of the card in the list. That is the sure way while the game runs, as a list read after the game's
preference has changed may already mark the card the next start goes to, see
[starting the game again](/docs/capabilities-gpu-preference/#starting-the-game-again).

The other three properties tell which card each graphics preference has Windows pick, and which preference picks a
given card:

| Property | What it tells |
| --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#ispreferredforpowersaving">`IsPreferredForPowerSaving`</a> | Windows picks this card for a game whose preference is power saving |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#ispreferredforhighperformance">`IsPreferredForHighPerformance`</a> | Windows picks this card for a game whose preference is high performance |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#reachedby">`ReachedBy`</a> | The preference to set for the game to draw with this card: high performance where both pick it, null where neither does |

They are how a game offers a choice of card: see [picking the video card](/docs/capabilities-gpu-preference/).

### VideoCard preference properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#isdefault">`IsDefault`</a> | `bool` | The card a Direct3D device made without naming one is made on, in this process. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#ispreferredforpowersaving">`IsPreferredForPowerSaving`</a> | `bool` | The card Windows makes a game's devices on when its graphics preference is power saving. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#ispreferredforhighperformance">`IsPreferredForHighPerformance`</a> | `bool` | The card Windows makes a game's devices on when its graphics preference is high performance. |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#reachedby">`ReachedBy`</a> | <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/">`GpuPreference?`</a> | Read-only. The preference that has Windows pick this card: high performance where both do, null where neither does. |
