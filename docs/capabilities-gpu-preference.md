---
layout: docs
legend: [prop, method]
title: "Capabilities: picking the video card"
description: Windows' graphics preference, which card each one reaches, reading and setting it for a game, starting the game again on the new card, the dotnet host, and where Windows keeps it.
---

A game on a machine with two cards, most often a laptop with a card built into the processor and one of its own, can
let the player choose which one it draws with. <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preferences/">`GpuPreferences`</a> does it the way Windows' own Settings does: by the
game's graphics preference. Names are colored by what they are: a <span class="kb kb-prop">property</span> or a
<span class="kb kb-method">method</span>; values and fields keep the plain color.

## The graphics preference

Windows keeps a graphics preference for each app, set in Settings under System, Display, Graphics. It picks the card
Windows makes the app's Direct3D devices on when the app names none:

| Settings says | <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/">`GpuPreference`</a> | The card |
| --- | --- | --- |
| Let Windows decide | <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#windowsdecides">`WindowsDecides`</a> | Usually the power saving one, unless the card's driver has the app down for another |
| Power saving | <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#powersaving">`PowerSaving`</a> | The card built into the processor, where there is one |
| High performance | <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#highperformance">`HighPerformance`</a> | A card of its own, an external one first, where there is one |

A renderer that names a card when it makes its device doesn't need the preference: it can offer every card and make its
device on the one picked. Many renderers name none. The MonoGame WindowsDX the BorrowedTorch editor runs on makes its
device on Windows' default card, whatever `GraphicsAdapter` it is handed, and so does any renderer that calls
`D3D11CreateDevice` without an adapter. For those, the preference is the one way to pick the card, and the game sets its
own, as the player would in Settings.

### GpuPreference values

| Value | Number | Description |
| --- | --- | --- |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#windowsdecides">`WindowsDecides`</a> | 0 | "Let Windows decide". |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#powersaving">`PowerSaving`</a> | 1 | "Power saving": the card built into the processor, where there is one. |
| <a class="ref" href="/docs/capabilities-glossary/video-cards/gpu-preference/#highperformance">`HighPerformance`</a> | 2 | "High performance": a card of its own, an external one first, where there is one. |

The numbers are Windows' own, in the setting and in DXGI's `DXGI_GPU_PREFERENCE`.

## Which card each preference reaches

The list of cards tells which card each preference picks: <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#ispreferredforpowersaving">`IsPreferredForPowerSaving`</a> and
<a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#ispreferredforhighperformance">`IsPreferredForHighPerformance`</a> mark them, read from DXGI 1.6's `EnumAdapterByGpuPreference`. <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#reachedby">`ReachedBy`</a> turns them
round, into the preference to set for a card:

| Machine | Power saving picks | High performance picks | <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#reachedby">`ReachedBy`</a> |
| --- | --- | --- | --- |
| One card | It | It | `HighPerformance` |
| A card in the processor and one of its own | The processor's | The card of its own | `PowerSaving` and `HighPerformance` |
| Two cards of their own, or three cards | One of them | One of them, perhaps the same | null for each card neither picks |

A card that no preference reaches is drawn with only by a renderer that names it. Windows 11 can point an app's
preference at such a card, its "specific GPU" choice for machines with more than one card of their own; that choice
isn't read or written by the library. On Windows 10 before 1803, which has no DXGI 1.6, no preference is known to reach
any card, and <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#reachedby">`ReachedBy`</a> is null for every one.

## Reading and setting it

<a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#get">`Get`</a>, <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#set">`Set`</a> and <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#remove">`Remove`</a> read, set and take away the preference of the game that calls them, for the
current user:

```csharp
GpuPreference? preference = GpuPreferences.Get();   // null: none set, which works as WindowsDecides

GpuPreferences.Set(GpuPreference.HighPerformance);

GpuPreferences.Remove();   // as if none had ever been set
```

The preference is kept for an exe, by its full path: the game's own is the exe its process runs,
`Environment.ProcessPath`. Each method takes another exe's path instead, for a launcher that sets the preference of the
game it starts; a relative path is made full from the current directory:

```csharp
GpuPreferences.Set(GpuPreference.HighPerformance, @"C:\Games\MyGame\MyGame.exe");
```

<a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#set">`Set`</a> and <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#remove">`Remove`</a> keep whatever else Windows keeps for the exe in the same setting. <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#remove">`Remove`</a> returns `false` when
no preference was set. Both throw what the registry throws when it can't be written: an
`UnauthorizedAccessException`, a `SecurityException` or an `IOException`, rare for the user's own settings.

### The dotnet host

A game started as `dotnet MyGame.dll` runs in dotnet's own process, `dotnet.exe`, and a preference set for it would
hold for every app started that way. <a class="ref prop" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#cansetforcurrentprocess">`CanSetForCurrentProcess`</a> is `false` then, and <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#set">`Set`</a> and
<a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#remove">`Remove`</a> without a path throw an `InvalidOperationException`. A game published or built as an exe, as .NET builds an
app by default, and started from it, can set its own:

```csharp
if (!GpuPreferences.CanSetForCurrentProcess)
    HideVideoCardSetting();   // run through dotnet: the setting would be every app's
```

### GpuPreferences properties

| Property | Type | Description |
| --- | --- | --- |
| <a class="ref prop" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#cansetforcurrentprocess">`CanSetForCurrentProcess`</a> | `bool` | Static, read-only. Whether a preference can be set for the current process: not for an app run by the dotnet host. |

### GpuPreferences methods

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#get">`Get(string executablePath = null)`</a> | Static. The preference set for an exe, the current process's without a path; null when none is set. |
| <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#set">`Set(GpuPreference preference, string executablePath = null)`</a> | Static. Sets the preference for an exe, the current process's without a path, keeping what else Windows keeps for it. It shows from the app's next start. |
| <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#remove">`Remove(string executablePath = null)`</a> | Static. Takes the preference away, keeping what else Windows keeps; `false` when none was set. |

## Starting the game again

A device stays on the card it was made on, and so does everything made on it: every texture, buffer and shader. A new
preference shows when the game makes its device again, at its next start, so a game that sets it offers to start
again. The new process is best started once the old one has shut down, so the two never hold the card at once; with
MonoGame that is after `Run` returns, in `Program.cs`:

```csharp
using System.Diagnostics;

using var game = new MyGame();

game.Run();

// set by the settings screen, after GpuPreferences.Set, when the player chose to restart now
if (game.RestartRequested)
    Process.Start(Environment.ProcessPath, args);
```

The settings screen sets the preference the picked card is reached by, and asks:

```csharp
public void PickVideoCard(VideoCard card)
{
    if (card.IsDefault ||
        card.ReachedBy is not { } preference ||
        !GpuPreferences.CanSetForCurrentProcess)
        return;

    GpuPreferences.Set(preference);

    if (Confirm($"The game draws with {card.Name} from its next start. Restart now?"))
    {
        RestartRequested = true;
        Exit();
    }
}
```

Until the game has started again, its device stays on the card it was made on, while <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#get">`Get`</a> already gives the new
preference. A list read in between may already mark the new card <a class="ref prop" href="/docs/capabilities-glossary/video-cards/video-card/#isdefault">`IsDefault`</a>, as a device made then would go on it,
so a game that shows the card it draws with reads the list once as it starts, or asks its device, see
[the card a game draws with](/docs/capabilities-video-cards/#the-card-a-game-draws-with).

## Where Windows keeps it

The preferences are kept in the current user's registry, in
`HKEY_CURRENT_USER\Software\Microsoft\DirectX\UserGpuPreferences`, one text value per app named by its exe's full path:

```text
C:\Games\MyGame\MyGame.exe    REG_SZ    AppStatus=0;GpuPreference=2;
```

The value holds `name=value;` pairs, the preference among whatever else Windows keeps for the app. <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#set">`Set`</a> writes
`GpuPreference=n;` last, in place of any it had, and leaves the other pairs as they are; <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#remove">`Remove`</a> takes the pair away, and
the value with it when nothing else is left. <a class="ref method" href="/docs/capabilities-glossary/video-cards/gpu-preferences/#get">`Get`</a> reads a number it doesn't know as no preference. Settings shows a game
whose preference the library has set in its list, and the player can change it there too.
