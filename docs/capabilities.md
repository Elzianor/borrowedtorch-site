---
layout: docs
legend: [prop, method]
title: "Capabilities: quick start guide"
description: Set up BorrowedTorch.Capabilities in a game, list the machine's video cards and displays, build a settings screen from them, and find your way around the capabilities pages.
---

BorrowedTorch.Capabilities tells a game what the machine it runs on offers. It lists the video cards, with the one the
game draws with and the Windows setting that picks another, and the displays, with where each one is, its scale, its
refresh rate and every resolution it supports. That is what a game's settings screen offers the player, and what the
game reads as it starts: which display to open on, at which size. It reads Windows itself, through DXGI, user32 and the
registry, and needs nothing from MonoGame or any other engine.

These pages cover the library from setup to every public member:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/capabilities/) (this page) | Installing, reading the cards and displays, the conventions, a settings screen |
| [Video cards](/docs/capabilities-video-cards/) | The list and its order, the software renderer, what a card is and how much memory it has, the card a game draws with, the vendors |
| [Picking the video card](/docs/capabilities-gpu-preference/) | Windows' graphics preference, which card each one reaches, reading and setting it, starting the game again, the dotnet host, where Windows keeps it |
| [Displays](/docs/capabilities-displays/) | The list and its order, telling displays apart, their names, the desktop's coordinates, DPI and scale, the refresh rate, the card a display is on |
| [Resolutions and modes](/docs/capabilities-modes/) | Every mode a display supports, the resolutions and their refresh rates, a window or full screen at the player's choice |
| [Glossary](/docs/capabilities-glossary/) | Every type with its properties, methods and values in alphabetical order |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.Capabilities
```

| Requirement | Version |
| --- | --- |
| .NET | .NET 10, on Windows (`net10.0-windows`) |
| Operating system | Windows 10 or later. Which card each graphics preference reaches needs Windows 10 1803 or later |
| Dependencies | None |

The library calls Windows through source-generated imports and function pointers, with no runtime COM, so it works in
a trimmed or a native AOT game as well. Its types are in the namespace `BorrowedTorch.Capabilities`.

## Reading the machine

Two static classes do the reading: <a class="ref method" href="/docs/capabilities-glossary/video-cards/video-cards/#list">`VideoCards.List`</a> gives the cards and <a class="ref method" href="/docs/capabilities-glossary/displays/displays/#list">`Displays.List`</a> the displays.

```csharp
using BorrowedTorch.Capabilities;

foreach (var card in VideoCards.List())
    Console.WriteLine($"{card.Name}: {card.DedicatedVideoMemory / (1024 * 1024)} MB{(card.IsDefault ? ", drawn with" : "")}");

var display = Displays.List()[0];   // the primary display

Console.WriteLine($"{display.Name}: {display.CurrentMode}, {display.Scale:P0}");

foreach (var resolution in display.Resolutions)
    Console.WriteLine($"{resolution}: {string.Join(", ", display.RefreshRatesAt(resolution))} Hz");
```

On a laptop with one card of its own and a 165 Hz panel at 150 %, that prints:

```text
NVIDIA GeForce RTX 3060 Laptop GPU: 5994 MB, drawn with
Lenovo DisplayHDR: 2560 × 1600, 165 Hz, 32 bits, 150 %
2560 × 1600: 165, 120, 100, 75, 60, 48, 30 Hz
2560 × 1440: 165, 120, 100, 75, 60, 48, 30 Hz
1920 × 1200: 165, 120, 100, 75, 60, 48, 30 Hz
...
640 × 480: 165, 120, 100, 75, 60, 48, 30 Hz
```

Nothing is kept between calls: each list is read from Windows when it is asked for, so a card or a display plugged in,
or a setting changed, shows in the next one. Both can be called from any thread. The cards take under a millisecond
once DXGI is loaded; the displays some 20 milliseconds, as Windows lists every mode of each one. Read them when a
settings screen opens, not every frame.

| Class | Gives | Page |
| --- | --- | --- |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/video-cards/">`VideoCards`</a> | The video cards, as <a class="ref" href="/docs/capabilities-glossary/video-cards/video-card/">`VideoCard`</a> records | [Video cards](/docs/capabilities-video-cards/) |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preferences/">`GpuPreferences`</a> | The game's graphics preference, read and set | [Picking the video card](/docs/capabilities-gpu-preference/) |
| <a class="ref" href="/docs/capabilities-glossary/displays/displays/">`Displays`</a> | The displays, as <a class="ref" href="/docs/capabilities-glossary/displays/display/">`Display`</a> records, each with its modes | [Displays](/docs/capabilities-displays/) |

## Conventions

| Quantity | Unit |
| --- | --- |
| Memory | Bytes, as a `long`: divide by 1024 × 1024 for megabytes |
| Sizes and positions on the desktop | The displays' own pixels, whatever the game's DPI awareness: a 4K display at 150 % is 3840 wide, not 2560 |
| Desktop coordinates | The primary display's top left corner is 0, 0; a display left of it or above it has negative ones |
| DPI | Dots per inch Windows scales a display for: 96 at 100 %, 144 at 150 % |
| A refresh rate | Hertz: whole in a mode (59 for a 59.94 Hz mode, as Windows lists modes), exact in a display's current rate |
| A card's id while Windows runs | Its LUID, as one `long`: what Direct3D and DXGI name an adapter by, and what a display names its card by |

The records the lists are made of, <a class="ref" href="/docs/capabilities-glossary/video-cards/video-card/">`VideoCard`</a>, <a class="ref" href="/docs/capabilities-glossary/displays/display/">`Display`</a>, <a class="ref" href="/docs/capabilities-glossary/displays/display-mode/">`DisplayMode`</a>, <a class="ref" href="/docs/capabilities-glossary/displays/resolution/">`Resolution`</a> and
<a class="ref" href="/docs/capabilities-glossary/displays/pixel-rectangle/">`PixelRectangle`</a>, are compared by their values, and their properties can be set with `with` or an initializer, to
build one for a test of a game's own settings code.

## A settings screen

A settings screen's choices, as a game builds them: the display, its resolutions biggest first, the refresh rates at the
chosen one, and the video cards the player can switch to. It is plain code without a UI, to show what the lists give;
put the strings in a list box or a drop-down of your own.

```csharp
using BorrowedTorch.Capabilities;

public class DisplaySettings
{
    private IReadOnlyList<Display> _displays = [];

    public Display Display { get; private set; }
    public Resolution Resolution { get; private set; }
    public int RefreshRate { get; private set; }

    // read again each time the screen opens: a display plugged in since shows
    public void Open(string savedDisplay)
    {
        _displays = Displays.List();

        // the saved display if it is still there, the primary one if not
        Display = _displays.FirstOrDefault(display => display.DeviceName == savedDisplay) ?? _displays.FirstOrDefault();

        if (Display != null) PickResolution(Display.CurrentMode.Resolution);
    }

    public IEnumerable<string> DisplayNames =>
        _displays.Select((display, index) => $"{index + 1}. {display.Name}{(display.IsPrimary ? " (main)" : "")}");

    public void PickDisplay(int index)
    {
        Display = _displays[index];
        PickResolution(Display.CurrentMode.Resolution);
    }

    public IReadOnlyList<Resolution> Resolutions => Display?.Resolutions ?? [];

    public void PickResolution(Resolution resolution)
    {
        Resolution = resolution;

        // the fastest the display has at that size
        RefreshRate = Display.RefreshRatesAt(resolution).FirstOrDefault();
    }

    public IReadOnlyList<int> RefreshRates => Display?.RefreshRatesAt(Resolution) ?? [];

    public void PickRefreshRate(int refreshRate) => RefreshRate = refreshRate;
}
```

A display is saved by its <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#devicename">`DeviceName`</a>, `\\.\DISPLAY1`: the name of its place on the desktop, which stays while
the displays stay plugged in as they are. [Telling displays apart](/docs/capabilities-displays/#telling-displays-apart)
has more on it. Applying the choices to the game's window is on the
[resolutions and modes page](/docs/capabilities-modes/#a-window-at-the-players-choice).

The video card choice is a list of the cards a player can pick, each with the preference that picks it:

```csharp
var choices = VideoCards.List()
    .Where(card => card.ReachedBy != null)
    .Select(card => (card.Name, Preference: card.ReachedBy.Value, Current: card.IsDefault))
    .ToList();
```

Picking one sets the game's graphics preference, and takes a restart: see
[picking the video card](/docs/capabilities-gpu-preference/#starting-the-game-again). On a machine with one card the list
has one entry, already drawn with, and the setting has nothing to offer: hide it there.
