---
layout: docs
legend: [prop, method]
title: "Glossary: MarkupContext"
description: "The members of MarkupContext, in alphabetical order."
---

What a markup reaches besides the UI's own types: the object whose methods handle the events it names, the object its bindings read, the style dictionaries its keys name, where it finds and how it reads the files it includes, element and style types of your own, and converters for the property types it can't read from text by itself.

A sealed class of the BorrowedTorch.UI.Markup package (namespace `BorrowedTorch.UI.Markup`). The [markup page](/docs/ui-markup/#markupcontext) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="basedirectory"><span class="prop"><code>BaseDirectory</code></span> <a class="ctx" href="/docs/ui-markup/#markupcontext" title="BaseDirectory in context on the markup page" aria-label="BaseDirectory in context on the markup page">🠆</a></h3>

`string` · The directory a markup given as text finds the files it includes from (`<Include Source="..." />`). A markup loaded from a file finds them from the file's own directory, an included one from its own. Without one, from the current directory. See [including other files](/docs/ui-markup/#including-other-files).

<h3 id="datacontext"><span class="prop"><code>DataContext</code></span> <a class="ctx" href="/docs/ui-markup/#markupcontext" title="DataContext in context on the markup page" aria-label="DataContext in context on the markup page">🠆</a></h3>

`object` · The object `{Binding Name}` binds to, usually a <a class="ref" href="/docs/ui-glossary/types/bindable/">`Bindable`</a> view model whose changes the elements follow. A markup with a binding and no data context throws a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a>. See [bindings](/docs/ui-markup/#bindings).

<h3 id="handlers"><span class="prop"><code>Handlers</code></span> <a class="ctx" href="/docs/ui-markup/#markupcontext" title="Handlers in context on the markup page" aria-label="Handlers in context on the markup page">🠆</a></h3>

`object` · The object whose methods the events name: `OnClick="StartGame"` subscribes its `StartGame` method, public or not, taking the event's parameters or none. See [events](/docs/ui-markup/#events).

<h3 id="missinghandler"><span class="prop"><code>MissingHandler</code></span> <a class="ctx" href="/docs/ui-markup/#markupcontext" title="MissingHandler in context on the markup page" aria-label="MissingHandler in context on the markup page">🠆</a></h3>

`Action<object, string, string>` · Called in place of a handler the markup names and <a class="ref prop" href="/docs/ui-glossary/types/markup-context/#handlers">`Handlers`</a> doesn't have (or with no handlers at all), whenever its event is raised: with the object raising it (the element), the event's name and the handler's name. Set, a missing handler is no error, so a tool can show a markup's events without the game's code; a handler that is there but takes other parameters still is one. See [events](/docs/ui-markup/#events).

<h3 id="readfile"><span class="prop"><code>ReadFile</code></span> <a class="ctx" href="/docs/ui-markup/#markupcontext" title="ReadFile in context on the markup page" aria-label="ReadFile in context on the markup page">🠆</a></h3>

`Func<string, string>` · Reads a markup file, given its full path: the one loaded from its file (<a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadfile">`LoadFile`</a>, <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loaddocumentfile">`LoadDocumentFile`</a>, <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstylesfile">`LoadStylesFile`</a>) and the ones included. `File.ReadAllText` without one; a game whose files are elsewhere, such as in a content package, gives its own, and a tool may follow what is read with it.

## Methods

<h3 id="markupcontext"><span class="method"><code>MarkupContext()</code></span> <a class="ctx" href="/docs/ui-markup/#markupcontext" title="MarkupContext() in context on the markup page" aria-label="MarkupContext() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-context/#markupcontext">`MarkupContext()`</a> · Creates a context without handlers, data context, styles, types or converters.

<h3 id="addconverter"><span class="method"><code>AddConverter()</code></span> <a class="ctx" href="/docs/ui-markup/#markupcontext" title="AddConverter() in context on the markup page" aria-label="AddConverter() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-context/#addconverter">`AddConverter<T>(Func<string, T> convert)`</a> · Reads the values of type `T` (and `T?`) from text, in place of the markup's own way for that type. The markup reads text, numbers, enums, `Color`, `Margin`, `Point`, `Vector2` and the types that convert from a string by itself. An exception the converter throws becomes the inner exception of a <a class="ref" href="/docs/ui-glossary/types/markup-exception/">`MarkupException`</a>. Returns this context, so the calls chain. A `null` converter throws an `ArgumentNullException`.

| Parameter | Type | Description |
| --- | --- | --- |
| `convert` | `Func<string, T>` | Turns the text of an attribute (or of a property element) into a value. |

<h3 id="addstyles"><span class="method"><code>AddStyles()</code></span> <a class="ctx" href="/docs/ui-markup/#markupcontext" title="AddStyles() in context on the markup page" aria-label="AddStyles() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-context/#addstyles">`AddStyles(StyleDictionary styles)`</a> · Makes the keyed styles of a style dictionary usable by their keys: `Style="danger"` gives an element the style as its `StyleOverride`, `TextStyle="{Style title}"` gives it to a style property. A key in more than one dictionary names the style of the one added last, and a UI's own `<Ui.Styles>` comes before them all. The dictionary's general styles are applied apart, with <a class="ref method" href="/docs/ui-glossary/types/style-dictionary/#applygeneralstyles">`ApplyGeneralStyles`</a>. Returns this context, so the calls chain. A `null` dictionary throws an `ArgumentNullException`.

| Parameter | Type | Description |
| --- | --- | --- |
| `styles` | <a class="ref" href="/docs/ui-glossary/types/style-dictionary/">`StyleDictionary`</a> | A dictionary read by <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstyles">`LoadStyles`</a> or <a class="ref method" href="/docs/ui-glossary/types/ui-markup/#loadstylesfile">`LoadStylesFile`</a>. |

<h3 id="addtype"><span class="method"><code>AddType()</code></span> <a class="ctx" href="/docs/ui-markup/#markupcontext" title="AddType() in context on the markup page" aria-label="AddType() in context on the markup page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/markup-context/#addtype">`AddType<T>()`</a> · Makes a type of your own usable by its name: an element (it needs a constructor taking its name), or a style or any other object a property element gives (it needs a constructor without parameters). It takes the place of a type of the UI with the same name. Returns this context, so the calls chain.
