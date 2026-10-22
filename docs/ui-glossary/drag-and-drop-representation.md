---
layout: docs
title: "Glossary: DragAndDropRepresentation"
description: The properties, methods and events of DragAndDropRepresentation, in alphabetical order.
---

The image that follows the mouse during a drag and drop. It is an [`Image`](#image), so it shows its own `Source` at its own size, unless `UseTargetAppearance` makes it a picture of the dragged element. Set it on the element that is dragged (the `DragTarget`) through `DragAndDropRepresentation`; `Transparency` makes it see-through.

`DragAndDropRepresentation` derives from [`Image`](/docs/ui-glossary/image/) and has its members too. The [images page](/docs/ui-images/#draganddroprepresentation) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="usetargetappearance"><span class="prop"><code>UseTargetAppearance</code></span> <a class="ctx" href="/docs/ui-images/#draganddroprepresentation-properties" title="UseTargetAppearance in context on the images page" aria-label="UseTargetAppearance in context on the images page">→</a></h3>

`bool` · Whether each drag takes a picture of the dragged element, at the start of the drag, and shows it at the element's size instead of `Source`. The representation owns that picture and disposes it.
