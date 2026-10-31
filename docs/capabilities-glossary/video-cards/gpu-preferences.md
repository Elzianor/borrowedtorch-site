---
layout: docs
legend: [prop, method]
title: "Glossary: GpuPreferences"
description: "The members of GpuPreferences, in alphabetical order."
---

The per-app graphics preference of Windows, read and set as Settings does it: for the current user, kept by the app's exe.

A static class, in the namespace `BorrowedTorch.Capabilities`. The preference picks the video card Windows makes an app's Direct3D devices on when the app names none, so a game whose renderer names none picks its card by setting its own, and draws with it from its next start. <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#reachedby">`VideoCard.ReachedBy`</a> tells which preference reaches a card. The [picking the video card page](/docs/capabilities-gpu-preference/) shows it in context, with code.

Windows keeps the preferences in `HKEY_CURRENT_USER\Software\Microsoft\DirectX\UserGpuPreferences`, as a text value named by the exe's full path holding `GpuPreference=2;` among whatever else Windows keeps for the app (`AppStatus=0;`), which the methods leave as it is. Windows 11's "specific GPU" choice isn't read or written.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="cansetforcurrentprocess"><span class="prop"><code>CanSetForCurrentProcess</code></span> <a class="ctx" href="/docs/capabilities-gpu-preference/#gpupreferences-properties" title="CanSetForCurrentProcess in context on the picking the video card page" aria-label="CanSetForCurrentProcess in context on the picking the video card page">→</a></h3>

`bool` · Static, read-only. Whether a preference can be set for the current process, the exe it runs (`Environment.ProcessPath`): `false` for an app started as `dotnet App.dll`, whose process is dotnet's own and whose preference would hold for every app started that way, and for a process with no exe path.

## Methods

<h3 id="get"><span class="method"><code>Get(string)</code></span> <a class="ctx" href="/docs/capabilities-gpu-preference/#gpupreferences-methods" title="Get(string) in context on the picking the video card page" aria-label="Get(string) in context on the picking the video card page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#get">`Get(string executablePath = null)`</a> · Static. Returns the preference set for an exe, the current process's when no path is given; null when none is set, which works as <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#windowsdecides">`GpuPreference.WindowsDecides`</a>, and for a setting whose preference isn't one of the three. A relative path is made full from the current directory.

| Parameter | Type | Description |
| --- | --- | --- |
| `executablePath` | `string` | The exe's path, or null for the current process's exe. |

<h3 id="remove"><span class="method"><code>Remove(string)</code></span> <a class="ctx" href="/docs/capabilities-gpu-preference/#gpupreferences-methods" title="Remove(string) in context on the picking the video card page" aria-label="Remove(string) in context on the picking the video card page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#remove">`Remove(string executablePath = null)`</a> · Static. Takes the preference set for an exe away, the current process's when no path is given, as if none had ever been set: the `GpuPreference` pair is taken out of the value, and the value is deleted when nothing else is left in it. Returns `false` when no preference was set. Throws as <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#set">`Set`</a> does.

| Parameter | Type | Description |
| --- | --- | --- |
| `executablePath` | `string` | The exe's path, or null for the current process's exe. |

<h3 id="set"><span class="method"><code>Set(GpuPreference, string)</code></span> <a class="ctx" href="/docs/capabilities-gpu-preference/#gpupreferences-methods" title="Set(GpuPreference, string) in context on the picking the video card page" aria-label="Set(GpuPreference, string) in context on the picking the video card page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#set">`Set(GpuPreference preference, string executablePath = null)`</a> · Static. Sets the preference for an exe, the current process's when no path is given: `GpuPreference=n;` is written last in the value, in place of any it had, and the rest is kept. It shows from the app's next start. Throws an `ArgumentOutOfRangeException` for a preference that isn't one of the three; an `InvalidOperationException` without a path when <a class="ref prop" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#cansetforcurrentprocess">`CanSetForCurrentProcess`</a> is `false`; and what the registry throws when it can't be written: an `UnauthorizedAccessException`, a `SecurityException` or an `IOException`.

| Parameter | Type | Description |
| --- | --- | --- |
| `preference` | <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/">`GpuPreference`</a> | The preference to set. |
| `executablePath` | `string` | The exe's path, or null for the current process's exe. |
