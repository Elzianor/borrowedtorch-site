---
layout: docs
title: "Glossary: GpuVendor"
description: "The values of GpuVendor."
---

Who made a video card, read from its PCI vendor id.

An enum, in the namespace `BorrowedTorch.Capabilities`. <a class="ref method" href="/docs/capabilities-glossary/video-cards/video-card/#vendorof">`VideoCard.VendorOf`</a> reads a vendor id as one, the way <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendor">`VideoCard.Vendor`</a> is set. The [video cards page](/docs/capabilities-video-cards/#the-vendors) shows it in context.

## Values

<h3 id="unknown"><code>Unknown</code> <a class="ctx" href="/docs/capabilities-video-cards/#gpuvendor-values" title="Unknown in context on the video cards page" aria-label="Unknown in context on the video cards page">→</a></h3>

`0` · A vendor id the list doesn't know: <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#vendorid">`VideoCard.VendorId`</a> tells it.

<h3 id="nvidia"><code>Nvidia</code> <a class="ctx" href="/docs/capabilities-video-cards/#gpuvendor-values" title="Nvidia in context on the video cards page" aria-label="Nvidia in context on the video cards page">→</a></h3>

`1` · NVIDIA, vendor id `0x10DE`.

<h3 id="amd"><code>Amd</code> <a class="ctx" href="/docs/capabilities-video-cards/#gpuvendor-values" title="Amd in context on the video cards page" aria-label="Amd in context on the video cards page">→</a></h3>

`2` · AMD, and ATI before it, vendor id `0x1002`.

<h3 id="intel"><code>Intel</code> <a class="ctx" href="/docs/capabilities-video-cards/#gpuvendor-values" title="Intel in context on the video cards page" aria-label="Intel in context on the video cards page">→</a></h3>

`3` · Intel, vendor id `0x8086`.

<h3 id="microsoft"><code>Microsoft</code> <a class="ctx" href="/docs/capabilities-video-cards/#gpuvendor-values" title="Microsoft in context on the video cards page" aria-label="Microsoft in context on the video cards page">→</a></h3>

`4` · Microsoft, vendor id `0x1414`: the Basic Render Driver, which draws on the processor, and the cards of virtual machines.

<h3 id="qualcomm"><code>Qualcomm</code> <a class="ctx" href="/docs/capabilities-video-cards/#gpuvendor-values" title="Qualcomm in context on the video cards page" aria-label="Qualcomm in context on the video cards page">→</a></h3>

`5` · Qualcomm's Adreno, vendor id `0x5143`, or `0x4D4F4351` ("QCOM" in letters) on some machines.

<h3 id="arm"><code>Arm</code> <a class="ctx" href="/docs/capabilities-video-cards/#gpuvendor-values" title="Arm in context on the video cards page" aria-label="Arm in context on the video cards page">→</a></h3>

`6` · Arm's Mali, vendor id `0x13B5`.
