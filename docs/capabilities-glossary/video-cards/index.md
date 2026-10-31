---
layout: docs
title: "Capabilities glossary: video cards"
description: "The video cards, their vendors, and the graphics preference that picks one, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does, and each enum its values. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`VideoCards`](/docs/capabilities-glossary/video-cards/video-cards/) | The video cards of the machine, as DirectX knows them. |
| [`VideoCard`](/docs/capabilities-glossary/video-cards/video-card/) | A video card as DirectX knows it: what it is, how much memory it has, and which card Windows makes an app's Direct3D devices on, now and for each graphics preference. |
| [`GpuVendor`](/docs/capabilities-glossary/video-cards/gpu-vendor/) | Who made a video card, read from its PCI vendor id. |
| [`GpuPreferences`](/docs/capabilities-glossary/video-cards/gpu-preferences/) | The per-app graphics preference of Windows, read and set as Settings does it: for the current user, kept by the app's exe. |
| [`GpuPreference`](/docs/capabilities-glossary/video-cards/gpu-preference/) | Windows' graphics preference for an app, the one Settings keeps under System, Display, Graphics: which video card Windows makes the app's Direct3D devices on when the app names none. |
