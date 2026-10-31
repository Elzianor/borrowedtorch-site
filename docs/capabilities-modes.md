---
layout: docs
legend: [prop, method]
title: "Capabilities: resolutions and modes"
description: Every mode a display supports, its resolutions and their refresh rates, and a window, a borderless window or full screen at the player's choice.
---

A display can be set to a list of modes, each a size, a refresh rate and a color depth. A game's resolution setting
offers the sizes, and its refresh rate setting the rates the display has at the size chosen. Names are colored by what
they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>; values and fields
keep the plain color.

## The modes

<a class="ref prop" href="/docs/capabilities-glossary/displays/display/#modes">`Modes`</a> lists every mode the display can be set to, as <a class="ref" href="/docs/capabilities-glossary/displays/display-mode/">`DisplayMode`</a> records: the modes Windows offers for it,
the ones its card and its monitor both take. They come biggest first, then fastest, then deepest:

```csharp
foreach (var mode in display.Modes)
    Console.WriteLine(mode);   // "2560 × 1600, 165 Hz, 32 bits", "2560 × 1600, 120 Hz, 32 bits", ...
```

Each mode is in the list once. Windows lists a smaller mode once for each way it can be shown on the panel, stretched
or centered, which is the same mode to a game. A mode's refresh rate is a whole number of hertz, as Windows lists
modes: a 59.94 Hz mode says 59, and a 60 Hz one 60. The rate the display runs at now, to the fraction, is
<a class="ref prop" href="/docs/capabilities-glossary/displays/display/#refreshrate">`RefreshRate`</a>, see [how a display is set](/docs/capabilities-displays/#how-a-display-is-set).

Nearly every mode Windows lists today is 32 bits a pixel; a game can leave the depth out of what it shows.

### DisplayMode members

| Member | Type | Description |
| --- | --- | --- |
| <a class="ref method" href="/docs/capabilities-glossary/displays/display-mode/#displaymode">`DisplayMode(int Width, int Height, int RefreshRate, int BitsPerPixel)`</a> | | A mode. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display-mode/#width">`Width`</a>, <a class="ref prop" href="/docs/capabilities-glossary/displays/display-mode/#height">`Height`</a> | `int` | The mode's size, in pixels. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display-mode/#refreshrate">`RefreshRate`</a> | `int` | How many times a second the display is drawn, in whole hertz. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display-mode/#bitsperpixel">`BitsPerPixel`</a> | `int` | The color depth, in bits a pixel. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display-mode/#resolution">`Resolution`</a> | <a class="ref" href="/docs/capabilities-glossary/displays/resolution/">`Resolution`</a> | Read-only. The mode's size. |
| <a class="ref method" href="/docs/capabilities-glossary/displays/display-mode/#tostring">`ToString()`</a> | `string` | `2560 × 1600, 165 Hz, 32 bits`. |

## Resolutions and refresh rates

<a class="ref prop" href="/docs/capabilities-glossary/displays/display/#resolutions">`Resolutions`</a> gives the sizes of the modes, each once, biggest first: a resolution setting's list. <a class="ref method" href="/docs/capabilities-glossary/displays/display/#refreshratesat">`RefreshRatesAt`</a>
gives the refresh rates the display has at one of them, fastest first:

```csharp
foreach (var resolution in display.Resolutions)
    Console.WriteLine($"{resolution}: {string.Join(", ", display.RefreshRatesAt(resolution))} Hz");

// 2560 × 1600: 165, 120, 100, 75, 60, 48, 30 Hz
// 2560 × 1440: 165, 120, 100, 75, 60, 48, 30 Hz
// ...
```

A size the display has no mode of has no rates: an empty list. A <a class="ref" href="/docs/capabilities-glossary/displays/resolution/">`Resolution`</a> is compared by its width and height,
so one saved in the game's settings finds its entry again:

```csharp
var saved = new Resolution(settings.Width, settings.Height);
var resolution = display.Resolutions.Contains(saved) ? saved : display.CurrentMode.Resolution;
```

<a class="ref prop" href="/docs/capabilities-glossary/displays/resolution/#aspectratio">`AspectRatio`</a> is the width over the height, 1.78 for 16:9 and 1.6 for 16:10, to group the sizes or to offer only
those of the display's own shape:

```csharp
var native = display.Bounds.Width / (float)display.Bounds.Height;
var sameShape = display.Resolutions.Where(resolution => MathF.Abs(resolution.AspectRatio - native) < 0.01f);
```

### Display mode list members

| Member | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#modes">`Modes`</a> | `IReadOnlyList<DisplayMode>` | Every mode the display can be set to, biggest first, then fastest, then deepest. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#resolutions">`Resolutions`</a> | `IReadOnlyList<Resolution>` | Read-only. The sizes of the modes, each once, biggest first. |
| <a class="ref method" href="/docs/capabilities-glossary/displays/display/#refreshratesat">`RefreshRatesAt(Resolution resolution)`</a> | `IReadOnlyList<int>` | The refresh rates the display has at a size, fastest first; empty for a size it has no mode of. |

### Resolution members

| Member | Type | Description |
| --- | --- | --- |
| <a class="ref method" href="/docs/capabilities-glossary/displays/resolution/#resolution">`Resolution(int Width, int Height)`</a> | | A size. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/resolution/#width">`Width`</a>, <a class="ref prop" href="/docs/capabilities-glossary/displays/resolution/#height">`Height`</a> | `int` | The size, in pixels. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/resolution/#aspectratio">`AspectRatio`</a> | `float` | Read-only. Width over height; 0 for a height of 0. |
| <a class="ref method" href="/docs/capabilities-glossary/displays/resolution/#tostring">`ToString()`</a> | `string` | `1920 × 1080`. |

## A window at the player's choice

MonoGame applies the choices through its `GraphicsDeviceManager` and the game's window. A borderless window covers the
display the player picked at its full size, and is the choice that switches between displays and apps without a
blink:

```csharp
private void ShowBorderless(Display display)
{
    Window.IsBorderless = true;
    Window.Position = new Point(display.Bounds.X, display.Bounds.Y);

    _graphics.IsFullScreen = false;
    _graphics.PreferredBackBufferWidth = display.Bounds.Width;
    _graphics.PreferredBackBufferHeight = display.Bounds.Height;
    _graphics.ApplyChanges();
}
```

A window at a chosen size goes in the middle of the display's work area, clear of the taskbar:

```csharp
private void ShowWindowed(Display display, Resolution resolution)
{
    var area = display.WorkArea;

    _graphics.IsFullScreen = false;
    _graphics.PreferredBackBufferWidth = Math.Min(resolution.Width, area.Width);
    _graphics.PreferredBackBufferHeight = Math.Min(resolution.Height, area.Height);
    _graphics.ApplyChanges();

    Window.IsBorderless = false;
    Window.Position = new Point(area.X + (area.Width - _graphics.PreferredBackBufferWidth) / 2,
        area.Y + (area.Height - _graphics.PreferredBackBufferHeight) / 2);
}
```

The window's frame and title bar come on top of the size given, so a window the size of the work area runs past it by
its frame: offer the sizes smaller than the work area. The positions are the displays' own pixels, right for a game
that is per-monitor DPI aware, see [where a display is](/docs/capabilities-displays/#where-a-display-is).

Full screen at another resolution than the display's sets the display to that mode while the game is in front:

```csharp
private void ShowFullScreen(Display display, Resolution resolution)
{
    Window.Position = new Point(display.Bounds.X, display.Bounds.Y);   // on the player's display

    _graphics.HardwareModeSwitch = true;
    _graphics.IsFullScreen = true;
    _graphics.PreferredBackBufferWidth = resolution.Width;
    _graphics.PreferredBackBufferHeight = resolution.Height;
    _graphics.ApplyChanges();
}
```

MonoGame's `GraphicsDeviceManager` has no setting for the refresh rate: the rate a player picks is for a renderer
that sets it when it switches the mode, or for the game's own pace, its `TargetElapsedTime` under a fixed time step.
