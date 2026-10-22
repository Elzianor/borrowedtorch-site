---
layout: docs
title: "Glossary: SourceData"
description: "The members of SourceData, in alphabetical order."
---

The value of <a class="ref dp" href="/docs/ui-glossary/elements/image/#source">`Image.Source`</a>: a wrapper around a texture that you rarely write yourself, since a <a class="ref method" href="/docs/ui-glossary/types/source-data/#texture2d">`Texture2D`</a> or a content path converts to it. It doesn't own the texture. Two `SourceData` are equal when they wrap the same texture instance.

A class. The [images page](/docs/ui-images/#sourcedata) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="height"><span class="prop"><code>Height</code></span> <a class="ctx" href="/docs/ui-images/#sourcedata" title="Height in context on the images page" aria-label="Height in context on the images page">→</a></h3>

`int` · Read-only. The texture's height in pixels, `0` without a texture.

<h3 id="isempty"><span class="prop"><code>IsEmpty</code></span> <a class="ctx" href="/docs/ui-images/#sourcedata" title="IsEmpty in context on the images page" aria-label="IsEmpty in context on the images page">→</a></h3>

`bool` · Read-only. Whether there is nothing to draw: no texture, or a width or height of `0`.

<h3 id="width"><span class="prop"><code>Width</code></span> <a class="ctx" href="/docs/ui-images/#sourcedata" title="Width in context on the images page" aria-label="Width in context on the images page">→</a></h3>

`int` · Read-only. The texture's width in pixels, `0` without a texture.

## Methods

<h3 id="sourcedata"><span class="method"><code>SourceData()</code></span> <a class="ctx" href="/docs/ui-images/#sourcedata" title="SourceData() in context on the images page" aria-label="SourceData() in context on the images page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/source-data/#sourcedata">`SourceData(Texture2D texture)`</a> · Wraps the texture.

`implicit operator SourceData(Texture2D texture)` · Lets you assign a texture where a `SourceData` is expected.

`implicit operator SourceData(string path)` · Loads the content path as a <a class="ref method" href="/docs/ui-glossary/types/source-data/#texture2d">`Texture2D`</a> through the UI's `ContentManager` and wraps it.

<h3 id="section"><span class="method"><code>!=()</code></span> <a class="ctx" href="/docs/ui-images/#sourcedata" title="!=() in context on the images page" aria-label="!=() in context on the images page">→</a></h3>

`operator !=` · Compare a `SourceData` with another `SourceData`, a <a class="ref method" href="/docs/ui-glossary/types/source-data/#texture2d">`Texture2D`</a> or a content path, in either order, by texture instance. Comparing with a path loads that path through the `ContentManager`.

<h3 id="section-1"><span class="method"><code>==()</code></span> <a class="ctx" href="/docs/ui-images/#sourcedata" title="==() in context on the images page" aria-label="==() in context on the images page">→</a></h3>

`operator ==` · Compare a `SourceData` with another `SourceData`, a <a class="ref method" href="/docs/ui-glossary/types/source-data/#texture2d">`Texture2D`</a> or a content path, in either order, by texture instance. Comparing with a path loads that path through the `ContentManager`.

<h3 id="equals"><span class="method"><code>Equals()</code></span> <a class="ctx" href="/docs/ui-images/#sourcedata" title="Equals() in context on the images page" aria-label="Equals() in context on the images page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/source-data/#equals">`Equals(object obj)`</a> · Whether `obj` is a `SourceData` wrapping the same texture instance.

<h3 id="gethashcode"><span class="method"><code>GetHashCode()</code></span> <a class="ctx" href="/docs/ui-images/#sourcedata" title="GetHashCode() in context on the images page" aria-label="GetHashCode() in context on the images page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/source-data/#gethashcode">`GetHashCode()`</a> · The hash code of the wrapped texture, `0` without one.

<h3 id="texture2d"><span class="method"><code>Texture2D()</code></span> <a class="ctx" href="/docs/ui-images/#sourcedata" title="Texture2D() in context on the images page" aria-label="Texture2D() in context on the images page">→</a></h3>

`implicit operator Texture2D(SourceData data)` · Gives back the wrapped texture (`null` when it wraps none).
