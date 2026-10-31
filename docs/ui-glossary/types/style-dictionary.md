---
layout: docs
legend: [prop, method]
title: "Glossary: StyleDictionary"
description: "The members of StyleDictionary, in alphabetical order."
---

The styles of a style dictionary, read by <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstyles">`LoadStyles`</a> from a markup whose root is `<Styles>`: the ones with a key, which markups name (`Style="danger"`, `TextStyle="{Style title}"`) once the dictionary is added to their context with <a class="ref method" href="/docs/ui-glossary/types/markup-context/#addstyles">`AddStyles`</a>, and the ones without, a general style for every element of their type once applied with <a class="ref method" href="/docs/ui-glossary/types/style-dictionary/#applygeneralstyles">`ApplyGeneralStyles`</a>.

A sealed class of the BorrowedTorch.UI.Markup package (namespace `BorrowedTorch.UI.Markup`). The [markup page](/docs/ui-markup/#styledictionary) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="general"><span class="prop"><code>General</code></span> <a class="ctx" href="/docs/ui-markup/#styledictionary" title="General in context on the markup page" aria-label="General in context on the markup page">🠆</a></h3>

`IReadOnlyDictionary<Type, BaseStyle>` · Read-only. The styles without a key, by their style types, one each.

<h3 id="keyed"><span class="prop"><code>Keyed</code></span> <a class="ctx" href="/docs/ui-markup/#styledictionary" title="Keyed in context on the markup page" aria-label="Keyed in context on the markup page">🠆</a></h3>

`IReadOnlyDictionary<string, BaseStyle>` · Read-only. The styles with a key, by their keys.

## Methods

<h3 id="applygeneralstyles"><span class="method"><code>ApplyGeneralStyles()</code></span> <a class="ctx" href="/docs/ui-markup/#styledictionary" title="ApplyGeneralStyles() in context on the markup page" aria-label="ApplyGeneralStyles() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/style-dictionary/#applygeneralstyles">`ApplyGeneralStyles()`</a> · Makes each style without a key the general style of its type (`Button.GeneralStyle` for a `ButtonStyle`), which every element of the type takes under its own values. Returns an `IDisposable`: disposing it puts back the general styles there were before, where they are still the dictionary's (a general style set since stays).

<h3 id="get"><span class="method"><code>Get()</code></span> <a class="ctx" href="/docs/ui-markup/#styledictionary" title="Get() in context on the markup page" aria-label="Get() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/style-dictionary/#get">`Get<T>(string key)`</a> · The style with the key, as its type `T` (a `BaseStyle`). Changing it reaches every element naming it. A key that isn't there throws a `KeyNotFoundException`, a style of another type an `InvalidCastException`.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | The style's `Key` in the dictionary. |
