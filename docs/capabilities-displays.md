---
layout: docs
legend: [prop, method]
title: "Capabilities: displays"
description: The displays on the desktop and their order, telling them apart, their names, the desktop's coordinates, DPI and scale, the refresh rate, how a display is turned and the card it is on.
---

<a class="ref method" href="/docs/capabilities-glossary/displays/displays/#list">`Displays.List`</a> gives the displays on the desktop, each as a <a class="ref" href="/docs/capabilities-glossary/displays/display/">`Display`</a>: which one it is, where it is, how it is
set, and every mode it can be set to, which the [resolutions and modes page](/docs/capabilities-modes/) covers. Names
are colored by what they are: a <span class="kb kb-prop">property</span> or a <span class="kb kb-method">method</span>;
values and fields keep the plain color.

## The list

```csharp
IReadOnlyList<Display> displays = Displays.List();
```

The primary display comes first, then the others from left to right, and top to bottom where two are one above the
other. Displays set to show the same picture (Settings' "Duplicate these displays") are one display, as they are one
place on the desktop to Windows.

Each call reads the displays again and keeps nothing, so a display plugged in, moved in Settings or set to another
resolution shows in the next list. The list is empty where nothing is on a desktop: a service, or a machine with no
display attached. A game whose window is open always has its display in it.

### Displays methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/capabilities-glossary/displays/displays/#list">`List()`</a> | The displays on the desktop, the primary one first, the others from left to right and top to bottom. Duplicated displays are one. Empty where nothing is on a desktop. |

## Telling displays apart

<a class="ref prop" href="/docs/capabilities-glossary/displays/display/#devicename">`DeviceName`</a> is the name Windows gives a display's place on the desktop, `\\.\DISPLAY1`, `\\.\DISPLAY2`. It is the
name the other parts of a game know the display by: MonoGame's `GraphicsAdapter.DeviceName` and Windows Forms'
`Screen.DeviceName` give the same text. A game saves the player's display by it, and finds it again in the next list:

```csharp
var display = Displays.List().FirstOrDefault(candidate => candidate.DeviceName == settings.Display)
              ?? Displays.List()[0];   // gone: the primary display
```

The name stays while the displays stay plugged in as they are; a display plugged into another port, or a new one,
can take another number. The number is no order: `\\.\DISPLAY2` can be left of `\\.\DISPLAY1`.

<a class="ref prop" href="/docs/capabilities-glossary/displays/display/#name">`Name`</a> is the name to show the player: the monitor's own, from what it tells the machine (`DELL U2720Q`,
`Lenovo DisplayHDR`). A monitor that tells no name, as many panels built into laptops don't, has Windows' name for its
driver, often `Generic PnP Monitor`, and a display Windows can tell nothing about has its <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#devicename">`DeviceName`</a>. Two
monitors of the same model have the same name: number them, as Settings does.

| Property | What it tells |
| --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#isprimary">`IsPrimary`</a> | The main display (Settings' "Make this my main display"), the one whose top left corner is 0, 0 |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#isbuiltin">`IsBuiltIn`</a> | A panel built into the machine, a laptop's or a tablet's, rather than a monitor plugged in |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#videocardluid">`VideoCardLuid`</a> | The <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#luid">`Luid`</a> of the video card the display is driven by; 0 where Windows doesn't say |

The card a display is on isn't always the card the game draws with. On a laptop with two cards, the built-in panel is
often driven by the card in the processor while the game draws on the card of its own, which hands each picture over:

```csharp
var cards = VideoCards.List();
var shownOn = cards.FirstOrDefault(card => card.Luid == display.VideoCardLuid);
```

### Display identity properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#devicename">`DeviceName`</a> | `string` | The name of the display's place on the desktop, `\\.\DISPLAY1`. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#name">`Name`</a> | `string` | The monitor's own name, Windows' name for its driver where it tells none, or <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#devicename">`DeviceName`</a>. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#isprimary">`IsPrimary`</a> | `bool` | The main display. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#isbuiltin">`IsBuiltIn`</a> | `bool` | A panel built into the machine. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#videocardluid">`VideoCardLuid`</a> | `long` | The LUID of the video card the display is driven by, 0 where Windows doesn't say. |

## Where a display is

All the displays make one desktop. <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#bounds">`Bounds`</a> is where a display is on it and how big, as a
<a class="ref" href="/docs/capabilities-glossary/displays/pixel-rectangle/">`PixelRectangle`</a>; <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#workarea">`WorkArea`</a> is the part the taskbar and other bars docked to its edges leave, where a window
fits whole:

<figure class="shot">
  <img src="{{ '/assets/img/capabilities/desktop.svg' | relative_url }}" width="640" height="250" alt="Two displays side by side on one desktop: on the left a 1920 by 1080 display whose bounds start at -1920, 0; on the right the primary display, 2560 by 1600, whose bounds start at 0, 0 and whose work area ends 72 pixels above its bottom edge, where the taskbar is">
  <figcaption>The desktop of two displays, the primary one on the right: the display left of it has negative coordinates, and the taskbar takes the bottom of the primary display's bounds out of its work area.</figcaption>
</figure>

The desktop's origin is the primary display's top left corner: a display left of it or above it has negative
coordinates. <a class="ref" href="/docs/capabilities-glossary/displays/pixel-rectangle/">`PixelRectangle`</a> has the <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#right">`Right`</a> and <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#bottom">`Bottom`</a> just past it, and <a class="ref method" href="/docs/capabilities-glossary/displays/pixel-rectangle/#contains">`Contains`</a> for a point or another
rectangle, to find the display a window or the mouse is on:

```csharp
var underMouse = Displays.List().FirstOrDefault(display => display.Bounds.Contains(mouseX, mouseY));
```

The coordinates are the displays' own pixels, read as a per-monitor DPI aware program reads them, whatever the game's
own awareness: a 4K display at 150 % is 3840 wide, not the 2560 Windows tells a program that isn't aware. A game that
places its window by them should be per-monitor DPI aware too, declared in its app manifest, or Windows scales the
window and its position.

### Display place properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#bounds">`Bounds`</a> | <a class="ref" href="/docs/capabilities-glossary/displays/pixel-rectangle/">`PixelRectangle`</a> | Where the display is on the desktop, and its size. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#workarea">`WorkArea`</a> | <a class="ref" href="/docs/capabilities-glossary/displays/pixel-rectangle/">`PixelRectangle`</a> | <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#bounds">`Bounds`</a> without the taskbar and the bars docked to the display's edges. |

### PixelRectangle members

| Member | Type | Description |
| --- | --- | --- |
| <a class="ref method" href="/docs/capabilities-glossary/displays/pixel-rectangle/#pixelrectangle">`PixelRectangle(int X, int Y, int Width, int Height)`</a> | | A rectangle of the desktop. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#x">`X`</a>, <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#y">`Y`</a> | `int` | The left column and the top row. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#width">`Width`</a>, <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#height">`Height`</a> | `int` | How many columns and rows it spans. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#right">`Right`</a>, <a class="ref prop" href="/docs/capabilities-glossary/displays/pixel-rectangle/#bottom">`Bottom`</a> | `int` | Read-only. The column just right of it and the row just below it. |
| <a class="ref method" href="/docs/capabilities-glossary/displays/pixel-rectangle/#contains">`Contains(int x, int y)`</a> | `bool` | Whether a pixel is in the rectangle. |
| <a class="ref method" href="/docs/capabilities-glossary/displays/pixel-rectangle/#contains">`Contains(PixelRectangle other)`</a> | `bool` | Whether another rectangle lies wholly in it. |

## DPI and scale

<a class="ref prop" href="/docs/capabilities-glossary/displays/display/#dpi">`Dpi`</a> is the DPI Windows scales the display's windows for, and <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#scale">`Scale`</a> the same as Settings' scale (System,
Display, Scale), a factor:

| Settings' scale | <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#dpi">`Dpi`</a> | <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#scale">`Scale`</a> |
| --- | --- | --- |
| 100 % | 96 | 1.0 |
| 125 % | 120 | 1.25 |
| 150 % | 144 | 1.5 |
| 200 % | 192 | 2.0 |

A game draws its world at the display's pixels either way; the scale is for its UI, which the player has asked to be
that much bigger on that display. A UI laid out for 1920 × 1080 at 100 % fits a 3840 × 2160 display at 200 % at twice
its size:

```csharp
ui.Scale = display.Scale;
```

### Display scale properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#dpi">`Dpi`</a> | `int` | The DPI Windows scales the display's windows for: 96 at 100 %. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#scale">`Scale`</a> | `float` | Read-only. Settings' scale of the display as a factor: <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#dpi">`Dpi`</a> / 96. |

## How a display is set

| Property | What it is |
| --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#currentmode">`CurrentMode`</a> | The mode the display is set to: its size, its refresh rate in whole hertz and its color depth |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#refreshrate">`RefreshRate`</a> | How many times a second it is drawn now, exactly: `59.94` where the mode says 59, `165.004` where it says 165 |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#orientation">`Orientation`</a> | How it is turned, a <a class="ref" href="/docs/capabilities-glossary/displays/display-orientation/">`DisplayOrientation`</a> |

<a class="ref prop" href="/docs/capabilities-glossary/displays/display/#refreshrate">`RefreshRate`</a> is the rate Windows sends the monitor, from its display configuration, as a fraction worked out:
the one to time a game to. A game with a fixed time step can run its updates at the display's rate:

```csharp
TargetElapsedTime = TimeSpan.FromSeconds(1.0 / display.RefreshRate);
```

Where Windows doesn't tell it, <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#refreshrate">`RefreshRate`</a> is the current mode's whole number of hertz.

A display turned to portrait has its size as turned: a 1920 × 1080 monitor stood on its side has <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#bounds">`Bounds`</a> 1080 wide
and 1920 high, and a current mode of 1080 × 1920.

### DisplayOrientation values

| Value | Number | Settings says |
| --- | --- | --- |
| <a class="ref" href="/docs/capabilities-glossary/displays/display-orientation/#landscape">`Landscape`</a> | 0 | Landscape: as the display stands |
| <a class="ref" href="/docs/capabilities-glossary/displays/display-orientation/#portrait">`Portrait`</a> | 1 | Portrait: turned a quarter |
| <a class="ref" href="/docs/capabilities-glossary/displays/display-orientation/#landscapeflipped">`LandscapeFlipped`</a> | 2 | Landscape (flipped): upside down |
| <a class="ref" href="/docs/capabilities-glossary/displays/display-orientation/#portraitflipped">`PortraitFlipped`</a> | 3 | Portrait (flipped): turned a quarter the other way |

### Display setting properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#currentmode">`CurrentMode`</a> | <a class="ref" href="/docs/capabilities-glossary/displays/display-mode/">`DisplayMode`</a> | The mode the display is set to. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#refreshrate">`RefreshRate`</a> | `double` | How many times a second the display is drawn now, exactly where Windows can tell, in hertz. |
| <a class="ref prop" href="/docs/capabilities-glossary/displays/display/#orientation">`Orientation`</a> | <a class="ref" href="/docs/capabilities-glossary/displays/display-orientation/">`DisplayOrientation`</a> | How the display is turned. |
