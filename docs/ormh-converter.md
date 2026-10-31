---
layout: docs
title: ORMH Converter
description: Pack the ambient occlusion, roughness, metallic and height maps of a PBR material into one ORMH texture, or an albedo with its opacity, in a window or from the command line.
---

The ORMH Converter is a small Windows app that packs the four single-channel maps of a PBR material into one RGBA
texture - **R** = ambient occlusion, **G** = roughness, **B** = metallic, **A** = height - and saves it as a PNG. It
also packs an **albedo with its opacity**: the colour in RGB, the opacity in A.

Packed, the four maps are one texture to load and sample instead of four. A content build can pack them by itself: the
[BorrowedTorch.ContentPipeline](https://www.nuget.org/packages/BorrowedTorch.ContentPipeline) extension builds an
`.ormh` descriptor straight into a texture. The converter is for when you want the packed PNG itself - for a texture
pack that ships its maps separately, to look at the result before a build, or for a project that keeps packed PNGs
rather than descriptors. Both pack with [BorrowedTorch.Ormh](https://www.nuget.org/packages/BorrowedTorch.Ormh) (see
[Packages](/kindling/packages/)), so a map packed here is byte for byte the map a content build makes from the same
sources.

## Download and run

Download the latest release from the [Downloads](/downloads/#ormh-converter) page, unzip it anywhere and run
`BorrowedTorch.OrmhConverter.exe`. It is one self-contained file for 64-bit Windows: nothing has to be installed first,
.NET included, and nothing is installed by it either - deleting the folder removes it. Older versions are in the
[BorrowedTorch.Downloads releases](https://github.com/BorrowedTorchStudio/BorrowedTorch.Downloads/releases?q=ormh-converter).

The exe is not code-signed, so the first time it runs, Windows SmartScreen may stop it with **Windows protected your
PC**. Choose **More info**, then **Run anyway**. Each release carries a `.sha256` file next to its zip; to check a
download is the file that was released, compare that with:

```shell
Get-FileHash BorrowedTorch.OrmhConverter-<version>-win-x64.zip -Algorithm SHA256
```

## Packing a material

1. Drop the material's maps - `Rock_AO.png`, `Rock_Roughness.png`, `Rock_Metallic.png`, `Rock_Height.png` - anywhere
   on the window. They are sorted into the four channel cards by name (see [Dropping files](#dropping-files)).
2. Check the cards. A channel the material has no map for keeps its constant: no occlusion, fully rough, not metallic,
   flat. A gloss or smoothness map lands on roughness already inverted.
3. Check **Output**: it lists the files it could not place, and says when a smaller map was stretched to the size of
   the largest.
4. **Save PNG…** suggests `Rock_ORMH.png` next to the sources.
5. In `Content.mgcb`, build the PNG with `PremultiplyAlpha=False` and `ColorKeyEnabled=False`, since its alpha is
   height, not transparency (see [What goes into the PNG](#what-goes-into-the-png)).

## The channels

| Card | Constant it starts at | Which means |
| --- | --- | --- |
| **R** · Ambient occlusion | 1 | no occlusion |
| **G** · Roughness | 1 | fully rough |
| **B** · Metallic | 0 | not metallic |
| **A** · Height | 1 | flat, at the top of the heightfield |

Each card is either an **Image** or a **Constant**:

- **Image**: browse for one, or drop it onto the card. **Read** picks which of the image's channels to take - R by
  default, which is right for a map saved as grey. **Invert** stores 255 minus the value, for a gloss or smoothness
  map read as roughness.
- **Constant**: one value from 0 to 1 over the whole map, set with the slider or typed in.

## Dropping files

Files dropped on the window are sorted into channels by name, ignoring case:

| The name contains | It goes to |
| --- | --- |
| `rough` | Roughness |
| `gloss`, `smooth` | Roughness, inverted |
| `metal` | Metallic |
| `height`, `disp`, `parallax` | Height |
| `occlusion`, or `ao` as a word or at the end | Ambient occlusion |

A file it cannot place - an albedo or a normal map, say - is listed under **Output**; drop it onto a card instead.
One image dropped onto a card goes to that card whatever its name. An `.ormh` descriptor dropped anywhere, or opened
with **Open .ormh…**, fills all four channels.

## Output and saving

The largest source sets the size of the map. A smaller one is stretched up to it the way a GPU magnifies it -
bilinear, wrapping at the edges - and **Output** says when that happens; a map of nothing but constants is a single
texel. The two previews show the packed RGB (occlusion, roughness, metallic) and its alpha (height) separately, since
alpha is not transparency here.

**Save PNG…** suggests a name from what the sources share - `Rock_AO.png` and `Rock_Roughness.png` give
`Rock_ORMH.png` - in the folder of the first one.

## Albedo + opacity

Choose **Albedo + opacity** under **Pack** at the top, for a material that reads its opacity from the albedo's alpha.
The window then has two cards; each mode keeps its own, so switching back and forth loses nothing.

| Card | Takes |
| --- | --- |
| **RGB** · Albedo | An image's red, green and blue, as they are. Always an image. |
| **A** · Opacity | Any channel of an image, optionally inverted, or a constant - starting at 1, solid. |

Dropped files are sorted by name, ignoring case:

| The name contains | It goes to |
| --- | --- |
| `opacity`, `alpha`, `mask`, `cutout` | Opacity |
| `transparen` | Opacity, inverted |
| `albedo`, `diff`, `colo`, or `col` as a word | Albedo |

An albedo that already carries its opacity in its own alpha can go on both cards, with **Read** set to **A** on the
opacity one. **Save PNG…** suggests `<shared name>_AlbedoOpacity.png`.

The alpha is opacity, straight - not premultiplied. Build the PNG with `PremultiplyAlpha=False`, or the colour is
darkened wherever the surface is see-through. Colour profiles are ignored here as for any map, so an albedo is packed
with the values it was saved with; the engine's shaders decode its sRGB themselves.

## Descriptors and the command line

An `.ormh` descriptor is a JSON file naming where each channel comes from, with paths relative to the descriptor. It
is the same file a content build packs with BorrowedTorch.ContentPipeline, so one descriptor serves both:

```jsonc
{
    "ao": "Rock_AO.png",
    "roughness": { "source": "Rock_Gloss.png", "invert": true },
    "metallic": 0,
    "height": { "source": "Rock_Height.png", "channel": "r" }
}
```

| Form | Meaning |
| --- | --- |
| `"Map.png"` | The image's red channel. |
| `{ "source": "Map.png", "channel": "g", "invert": true }` | Any of `r`, `g`, `b`, `a`; `invert` stores 255 minus it. |
| `0.5` | A constant from 0 to 1 over the whole map. |

All four channels are required. Comments and trailing commas are allowed. The full format is described in
[BorrowedTorch.Ormh](https://www.nuget.org/packages/BorrowedTorch.Ormh).

To pack descriptors in batches, give the exe a descriptor and the PNG to write:

```shell
BorrowedTorch.OrmhConverter <descriptor.ormh> <output.png>
```

It packs without opening a window, and prints what it did to the console it was started from.

| Exit code | Meaning |
| --- | --- |
| 0 | Packed. |
| 1 | The descriptor or one of its images could not be read; the message says which. |
| 2 | Wrong arguments; the usage line is printed. |

It is a Windows app, so neither cmd nor PowerShell waits for it on its own. In a script, wait for it - and get its
exit code - with `start /wait` in cmd, or `Start-Process -Wait -PassThru` in PowerShell:

```powershell
$converter = 'C:\Tools\OrmhConverter\BorrowedTorch.OrmhConverter.exe'   # wherever you unzipped it

# every descriptor under Materials, each packed to a PNG of the same name next to it
foreach ($descriptor in Get-ChildItem Materials -Filter *.ormh -Recurse) {
    $png = [IO.Path]::ChangeExtension($descriptor.FullName, '.png')
    $run = Start-Process $converter -ArgumentList "`"$($descriptor.FullName)`"", "`"$png`"" -Wait -PassThru
    if ($run.ExitCode -ne 0) { Write-Warning "$($descriptor.Name) failed with exit code $($run.ExitCode)" }
}
```

## What goes into the PNG

- **8-bit RGBA, straight alpha.** Alpha holds height, not transparency: build the PNG with premultiplied alpha and
  colour keying off - in `Content.mgcb`, `PremultiplyAlpha=False` and `ColorKeyEnabled=False` - or the other three
  channels get scaled by height.
- **Values exactly as read.** Colour profiles are ignored: these maps are data, not colours.
- **16-bit sources** - grey, RGB or RGBA - are narrowed to 8 bits by the same rule MonoGame's importer applies to
  16-bit RGB, so such a map packs here exactly as it would in a content build. 16-bit grey is one MonoGame 3.8.3
  cannot read at all, in a content build or anywhere else; packing it here first is the way around that.
- **Floating-point images** are not read; export the map as an 8- or 16-bit PNG.
- **Formats**: PNG, JPEG, BMP and TIFF.
