---
layout: docs
title: Localization Helper
description: Keep a game's translations in order - its languages, the folders and files the texts are split into, the string IDs and every text - as plain JSON files the game reads without the app.
---

The Localization Helper is a Windows app that keeps a game's translations in order: the languages, the folders and
files the translated texts are split into, the string IDs, and the text of every ID in every language. What it writes
is a folder of plain JSON files, one set per language, so the game reads them without the app, and they can be edited,
diffed and merged like any other file.

It keeps the languages in step for you. Add, rename, move or remove a translation file or a string ID once, and every
language's copy follows; open a folder someone edited by hand, and whatever a language lacks is filled in. While you
translate, the reference language's text is shown above the one being written, and a mark on every language and string
ID shows what still lacks a text.

## Download and run

Download the latest release from the [Downloads](/downloads/#localization-helper) page, unzip it anywhere and run
`BorrowedTorch.LocalizationHelper.exe`. It is one self-contained file for 64-bit Windows: nothing has to be installed
first, .NET included, and nothing is installed by it either - deleting the folder removes it. Its first start takes a
moment longer, while it unpacks the libraries it draws with into `%TEMP%\.net`. Older versions are in the
[BorrowedTorch.Downloads releases](https://github.com/BorrowedTorchStudio/BorrowedTorch.Downloads/releases?q=localization-helper).

The exe is not code-signed, so the first time it runs, Windows SmartScreen may stop it with **Windows protected your
PC**. Choose **More info**, then **Run anyway**. Each release carries a `.sha256` file next to its zip; to check a
download is the file that was released, compare that with:

```shell
Get-FileHash BorrowedTorch.LocalizationHelper-<version>-win-x64.zip -Algorithm SHA256
```

## Starting a localization folder

1. Make an empty folder for the game's texts, `Localization` in the game's project, say. Pick it with **Select main
   localization folder** and answer **Yes** when the app offers to initialize it.
2. **Add language** for the language the game is written in first: it becomes the reference. Then add the others.
3. In **Files structure**, select **`<Root>`** and **Add entry**: a folder, `Menus`, with **Is folder** ticked. Select
   it and add a file, `main.json`. Every language folder gets both at once.
4. **Add string ID**, `menu_start`, with `main.json` as its **Location**. It is added, with an empty text, to that file
   in every language. The button is available once the files structure has a file.
5. Select the reference language and the ID and type its text, then select another language and translate it, with
   the reference text shown above.

The text is stored when the selection changes, when **Save all** is pressed and when the app is closed; everything else
is written the moment it is done.

## The localization folder

Everything the app writes lives in the main folder:

```
Localization/
  Languages.manifest        the languages: local name, English name, which one is the reference
  FilesStructure.manifest   the tree of folders and translation files
  StringIDs.manifest        the string IDs, and the file each one belongs to
  English/                  one folder per language, named after its English name,
    Menus/                  each holding the whole files structure
      main.json
  Ukrainian/
    Menus/
      main.json
```

A translation file is a JSON object from string ID to text, written indented:

```json
{
  "menu_start": "Почати гру",
  "menu_quit": ""
}
```

An empty text means "not translated yet". Every language's copy of a file holds every string ID of that file, so a
missing translation is an empty text rather than a missing key. A string ID is unique across the whole folder, not only
within its file.

The manifests are what the app works from; the game needs only the language folders.

## Languages

**Add language** asks for a **Local name** - the language's name in itself, `Українська`, for a language menu - and an
**English name**, `Ukrainian`, which also names its folder. The new language gets a copy of the whole files structure,
every text empty. **Edit language** renames it, folder included; **Remove language** deletes its folder with all its
texts.

One language is the **reference**: the one the others are translated from, whose text is shown above the editor. The
first language added becomes it; **Mark language as reference** makes the selected one the reference instead.

The mark next to a language shows whether every string ID has a text in it.

## The files structure

The tree under **`<Root>`** is the layout every language folder gets. Split the texts the way the game loads them: a
file per menu, per level or per character, so a scene loads the texts it shows and no others.

**Add entry** adds a folder or a file - tick **Is folder** for a folder - inside the selected folder, in every language
at once. Give a file the extension the game expects, `main.json`. **Edit entry** renames the selected entry and
**Remove entry** deletes it, with everything in it and the string IDs of its files, in every language. Drag an entry
onto a folder to move it there, with its content.

Selecting a folder or a file narrows the string ID list to what it holds; selecting `<Root>` shows them all.

## String IDs

**Add string ID** asks for the ID and its **Location** - the file it belongs to, the selected one to start with - and
adds it, with an empty text, to that file in every language. **Edit string ID** renames it or moves it to another file,
keeping its texts; **Remove string ID** removes it from every language.

**Find location in files structure** selects the file the selected ID belongs to. The mark next to a string ID shows
whether it has a text in the selected language, and every list has a search box that filters it as you type.

## Reading the texts in a game

A language is its folder, and its texts are the JSON objects of the files in it. Since string IDs are unique across the
folder, a language's files merge into one dictionary without one overriding another:

```csharp
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

public static class Localization
{
    // The texts of one language: every translation file in its folder, merged.
    public static Dictionary<string, string> LoadLanguage(string localizationFolder, string englishName)
    {
        var texts = new Dictionary<string, string>();
        var languageFolder = Path.Combine(localizationFolder, englishName);

        foreach (var file in Directory.EnumerateFiles(languageFolder, "*.json", SearchOption.AllDirectories))
        {
            var fileTexts = JsonSerializer.Deserialize<Dictionary<string, string>>(File.ReadAllText(file))!;

            foreach (var (id, text) in fileTexts)
                texts[id] = text;
        }

        return texts;
    }
}
```

An empty text is not translated yet, so fall back to the reference language's:

```csharp
var english = Localization.LoadLanguage("Localization", "English"); // the reference language
var ukrainian = Localization.LoadLanguage("Localization", "Ukrainian");

string Text(string id) => ukrainian.TryGetValue(id, out var text) && text != "" ? text : english[id];
```

To load only what a scene shows, read the one file instead: `Localization/Ukrainian/Menus/main.json` is the main
menu's texts. Copy the language folders next to the game when it builds, as files to copy to the output directory.

## What it does on disk

- **Every change is written at once**, to the manifests and to the files of every language. A file is written whole to
  a temporary file first and then put in place, so a crash cannot leave a half-written one behind.
- **Names are file names.** A language's English name and every folder and file name must be valid on Windows, and
  two names that differ only in letter case count as the same, as they do on disk.
- **A failed write is undone.** When a change cannot be written - a file open in another program, say - the bottom
  bar says why, in red, and the change is taken back, so the lists, the manifests and the files keep agreeing with
  each other.
- **Opening a folder repairs it.** Language folders, translation files and string IDs that a file lacks are created
  again, empty, and the bottom bar says how many. A string ID whose file is no longer in the files structure is
  dropped, with a warning naming it.
- **The manifests hold only what cannot be worked out.** Which texts are missing is read from the translation files
  each time, so the files can be edited outside the app - by a translator, or by a merge - and the app shows the result
  the next time the folder is opened.
