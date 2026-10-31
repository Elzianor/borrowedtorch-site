---
layout: docs
legend: [prop, method]
title: "Glossary: Display"
description: "The members of Display, in alphabetical order."
---

A display on the desktop: which one it is, where it is, how it is set and every mode it can be set to.

A sealed record, in the namespace `BorrowedTorch.Capabilities`, compared by its values, its lists by reference; its properties can be set with an initializer or `with`. <a class="ref method" href="/docs/capabilities-glossary/displays/displays/#list">`Displays.List`</a> makes them, read once: a display plugged in, moved or set otherwise shows in the next list. Sizes and positions are in the displays' own pixels. The [displays page](/docs/capabilities-displays/) and the [resolutions and modes page](/docs/capabilities-modes/) show it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields keep the plain color.

## Properties

<h3 id="bounds"><span class="prop"><code>Bounds</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-place-properties" title="Bounds in context on the displays page" aria-label="Bounds in context on the displays page">→</a></h3>

<a class="ref" href="/docs/capabilities-glossary/displays/pixel-rectangle/">`PixelRectangle`</a> · Where the display is on the desktop, and its size, in the displays' own pixels: the primary display's top left corner is 0, 0.

<h3 id="currentmode"><span class="prop"><code>CurrentMode</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-setting-properties" title="CurrentMode in context on the displays page" aria-label="CurrentMode in context on the displays page">→</a></h3>

<a class="ref" href="/docs/capabilities-glossary/displays/display-mode/">`DisplayMode`</a> · The mode the display is set to: its size, its refresh rate in whole hertz and its color depth. A display turned to portrait has its size as turned.

<h3 id="devicename"><span class="prop"><code>DeviceName</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-identity-properties" title="DeviceName in context on the displays page" aria-label="DeviceName in context on the displays page">→</a></h3>

`string` · The name Windows gives the display's place on the desktop, `\\.\DISPLAY1`: the text MonoGame's `GraphicsAdapter.DeviceName` and Windows Forms' `Screen.DeviceName` give, to tell displays apart by and to save the player's display by.

<h3 id="dpi"><span class="prop"><code>Dpi</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-scale-properties" title="Dpi in context on the displays page" aria-label="Dpi in context on the displays page">→</a></h3>

`int` · The DPI Windows scales the display's windows for: 96 at 100 %, 144 at 150 %. 96 where Windows doesn't tell it.

<h3 id="isbuiltin"><span class="prop"><code>IsBuiltIn</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-identity-properties" title="IsBuiltIn in context on the displays page" aria-label="IsBuiltIn in context on the displays page">→</a></h3>

`bool` · A panel built into the machine, a laptop's or a tablet's, rather than a monitor plugged in: one connected internally, or by embedded DisplayPort or UDI.

<h3 id="isprimary"><span class="prop"><code>IsPrimary</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-identity-properties" title="IsPrimary in context on the displays page" aria-label="IsPrimary in context on the displays page">→</a></h3>

`bool` · The main display (Settings' "Make this my main display"), the one whose top left corner is 0, 0.

<h3 id="modes"><span class="prop"><code>Modes</code></span> <a class="ctx" href="/docs/capabilities-modes/#display-mode-list-members" title="Modes in context on the resolutions and modes page" aria-label="Modes in context on the resolutions and modes page">→</a></h3>

`IReadOnlyList<DisplayMode>` · Every mode the display can be set to, the ones Windows offers for it, which its card and its monitor both take: each once, biggest first, then fastest, then deepest. Empty for a display made without them.

<h3 id="name"><span class="prop"><code>Name</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-identity-properties" title="Name in context on the displays page" aria-label="Name in context on the displays page">→</a></h3>

`string` · The monitor's own name, from what it tells the machine (`DELL U2720Q`); Windows' name for its driver where it tells none (`Generic PnP Monitor`), as many panels built into laptops don't; <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#devicename">`DeviceName`</a> where neither is known.

<h3 id="orientation"><span class="prop"><code>Orientation</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-setting-properties" title="Orientation in context on the displays page" aria-label="Orientation in context on the displays page">→</a></h3>

<a class="ref" href="/docs/capabilities-glossary/displays/display-orientation/">`DisplayOrientation`</a> · How the display is turned.

<h3 id="refreshrate"><span class="prop"><code>RefreshRate</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-setting-properties" title="RefreshRate in context on the displays page" aria-label="RefreshRate in context on the displays page">→</a></h3>

`double` · How many times a second the display is drawn now, in hertz: exactly where Windows' display configuration tells it (59.94 rather than the 59 of <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#currentmode">`CurrentMode`</a>), the current mode's whole number where it doesn't.

<h3 id="resolutions"><span class="prop"><code>Resolutions</code></span> <a class="ctx" href="/docs/capabilities-modes/#display-mode-list-members" title="Resolutions in context on the resolutions and modes page" aria-label="Resolutions in context on the resolutions and modes page">→</a></h3>

`IReadOnlyList<Resolution>` · Read-only. The sizes of <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#modes">`Modes`</a>, each once, biggest first: a game's resolution setting.

<h3 id="scale"><span class="prop"><code>Scale</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-scale-properties" title="Scale in context on the displays page" aria-label="Scale in context on the displays page">→</a></h3>

`float` · Read-only. Settings' scale of the display (System, Display, Scale), as a factor: <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#dpi">`Dpi`</a> / 96, 1.5 for 150 %.

<h3 id="videocardluid"><span class="prop"><code>VideoCardLuid</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-identity-properties" title="VideoCardLuid in context on the displays page" aria-label="VideoCardLuid in context on the displays page">→</a></h3>

`long` · The LUID of the video card the display is driven by (<a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#luid">`VideoCard.Luid`</a>), 0 where Windows doesn't say. On a laptop with two cards that is often the one built into the processor, whichever card draws the game.

<h3 id="workarea"><span class="prop"><code>WorkArea</code></span> <a class="ctx" href="/docs/capabilities-displays/#display-place-properties" title="WorkArea in context on the displays page" aria-label="WorkArea in context on the displays page">→</a></h3>

<a class="ref" href="/docs/capabilities-glossary/displays/pixel-rectangle/">`PixelRectangle`</a> · <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#bounds">`Bounds`</a> without the taskbar and the bars docked to the display's edges: where a window fits whole.

## Methods

<h3 id="refreshratesat"><span class="method"><code>RefreshRatesAt(Resolution)</code></span> <a class="ctx" href="/docs/capabilities-modes/#display-mode-list-members" title="RefreshRatesAt(Resolution) in context on the resolutions and modes page" aria-label="RefreshRatesAt(Resolution) in context on the resolutions and modes page">→</a></h3>

<a class="ref method" href="/docs/capabilities-glossary/displays/display/#refreshratesat">`RefreshRatesAt(Resolution resolution)`</a> · Returns the refresh rates the display has at a size, in whole hertz, each once, fastest first: empty for a size it has no mode of.

| Parameter | Type | Description |
| --- | --- | --- |
| `resolution` | <a class="ref" href="/docs/capabilities-glossary/displays/resolution/">`Resolution`</a> | The size: one of <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#resolutions">`Resolutions`</a>, or any other. |
