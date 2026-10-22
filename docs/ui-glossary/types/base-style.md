---
layout: docs
title: "Glossary: BaseStyle"
description: "The members of BaseStyle, in alphabetical order."
---

The abstract base of every style class. It has one property for each dependency property of [`BaseElement`](/docs/ui-base-element/) (<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#desiredwidth">`DesiredWidth`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#desiredheight">`DesiredHeight`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#minwidth">`MinWidth`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#minheight">`MinHeight`</a>,

An abstract class. The [styles page](/docs/ui-styles/#basestyle) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="backgroundcolor"><span class="prop"><code>BackgroundColor</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="BackgroundColor in context on the base element page" aria-label="BackgroundColor in context on the base element page">→</a></h3>

`Color` · The colour the element's background is filled with. `Transparent` (the default) fills nothing.

<h3 id="cropoutsideofparentborder"><span class="prop"><code>CropOutsideOfParentBorder</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="CropOutsideOfParentBorder in context on the base element page" aria-label="CropOutsideOfParentBorder in context on the base element page">→</a></h3>

`bool` · Clips the element to its parent's bounds. Without it the element may overflow its parent but is still clipped by whatever clips the parent (a scroll view, a window's content area). On by default for every element with a style.

<h3 id="customeffect"><span class="prop"><code>CustomEffect</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="CustomEffect in context on the base element page" aria-label="CustomEffect in context on the base element page">→</a></h3>

`Effect` · A shader the element draws its background (or texture, an image's picture) with. Setting it sets it on the children as well, and a child added later takes it. An effect with a `ModulationColor` parameter gets the draw colour there.

<h3 id="desiredheight"><span class="prop"><code>DesiredHeight</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="DesiredHeight in context on the base element page" aria-label="DesiredHeight in context on the base element page">→</a></h3>

`int` · The height in units. 0 (the default) fits the content, or stretches over the slot when <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#verticalalignment">`VerticalAlignment`</a> is `Stretch`.

<h3 id="desiredwidth"><span class="prop"><code>DesiredWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="DesiredWidth in context on the base element page" aria-label="DesiredWidth in context on the base element page">→</a></h3>

`int` · The width in units. 0 (the default) fits the content, or stretches over the slot when <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#horizontalalignment">`HorizontalAlignment`</a> is `Stretch`.

<h3 id="disabled"><span class="prop"><code>Disabled</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-properties" title="Disabled in context on the base element page" aria-label="Disabled in context on the base element page">→</a></h3>

`bool` · Stops the element and its subtree from showing states, raising mouse events and taking the keyboard, and draws them darker.

<h3 id="doubleclickintervalms"><span class="prop"><code>DoubleClickIntervalMs</code></span> <a class="ctx" href="/docs/ui-base-element/#click-timing" title="DoubleClickIntervalMs in context on the base element page" aria-label="DoubleClickIntervalMs in context on the base element page">→</a></h3>

`int` · The longest time in milliseconds between two left presses that make a double click. 300 by default; negative values are taken as 0.

<h3 id="dragtype"><span class="prop"><code>DragType</code></span> <a class="ctx" href="/docs/ui-base-element/#drag-and-drop-properties" title="DragType in context on the base element page" aria-label="DragType in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/drag-type/">`DragType`</a> · Whether a press on the element drags something: nothing (the default), the element itself, or a drag and drop.

<h3 id="foregroundcolor"><span class="prop"><code>ForegroundColor</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="ForegroundColor in context on the base element page" aria-label="ForegroundColor in context on the base element page">→</a></h3>

`Color` · The colour of what the element draws over its background, such as a label's text. An element drawn from textures tints them with it when it is not `Transparent`.

<h3 id="gridcolumn"><span class="prop"><code>GridColumn</code></span> <a class="ctx" href="/docs/ui-base-element/#grid-placement" title="GridColumn in context on the base element page" aria-label="GridColumn in context on the base element page">→</a></h3>

`int` · The column the element starts in, from 0.

<h3 id="gridcolumnspan"><span class="prop"><code>GridColumnSpan</code></span> <a class="ctx" href="/docs/ui-base-element/#grid-placement" title="GridColumnSpan in context on the base element page" aria-label="GridColumnSpan in context on the base element page">→</a></h3>

`int` · How many columns the element covers; values below 1 are taken as 1.

<h3 id="gridrow"><span class="prop"><code>GridRow</code></span> <a class="ctx" href="/docs/ui-base-element/#grid-placement" title="GridRow in context on the base element page" aria-label="GridRow in context on the base element page">→</a></h3>

`int` · The row the element starts in, from 0.

<h3 id="gridrowspan"><span class="prop"><code>GridRowSpan</code></span> <a class="ctx" href="/docs/ui-base-element/#grid-placement" title="GridRowSpan in context on the base element page" aria-label="GridRowSpan in context on the base element page">→</a></h3>

`int` · How many rows the element covers; values below 1 are taken as 1.

<h3 id="hittest"><span class="prop"><code>HitTest</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-properties" title="HitTest in context on the base element page" aria-label="HitTest in context on the base element page">→</a></h3>

`bool` · Whether the element itself takes the mouse. On by default for every element with a style; off for an element deriving from <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> directly.

<h3 id="horizontalalignment"><span class="prop"><code>HorizontalAlignment</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="HorizontalAlignment in context on the base element page" aria-label="HorizontalAlignment in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/horizontal-alignment/">`HorizontalAlignment`</a> · Where the element sits in its slot horizontally, and whether it stretches over it. The default is `Stretch`.

<h3 id="inheritstate"><span class="prop"><code>InheritState</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-properties" title="InheritState in context on the base element page" aria-label="InheritState in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/inherit-state/">`InheritState`</a> · Which states the element shows besides its own: its parent's, its children's, both or none (the default).

<h3 id="isresizable"><span class="prop"><code>IsResizable</code></span> <a class="ctx" href="/docs/ui-base-element/#resizing" title="IsResizable in context on the base element page" aria-label="IsResizable in context on the base element page">→</a></h3>

`bool` · Lets the user resize the element by dragging its edges and corners.

<h3 id="margin"><span class="prop"><code>Margin</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="Margin in context on the base element page" aria-label="Margin in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The space between the element and the edges of its slot. Which sides count is described above.

<h3 id="maxheight"><span class="prop"><code>MaxHeight</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MaxHeight in context on the base element page" aria-label="MaxHeight in context on the base element page">→</a></h3>

`int` · The largest height the layout (and a resize) gives the element. 0 is no limit.

<h3 id="maxwidth"><span class="prop"><code>MaxWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MaxWidth in context on the base element page" aria-label="MaxWidth in context on the base element page">→</a></h3>

`int` · The largest width the layout (and a resize) gives the element. 0 is no limit.

<h3 id="minheight"><span class="prop"><code>MinHeight</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MinHeight in context on the base element page" aria-label="MinHeight in context on the base element page">→</a></h3>

`int` · The smallest height the layout (and a resize) gives the element. 0 is no limit.

<h3 id="minwidth"><span class="prop"><code>MinWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MinWidth in context on the base element page" aria-label="MinWidth in context on the base element page">→</a></h3>

`int` · The smallest width the layout (and a resize) gives the element. 0 is no limit.

<h3 id="repeatclicks"><span class="prop"><code>RepeatClicks</code></span> <a class="ctx" href="/docs/ui-base-element/#click-timing" title="RepeatClicks in context on the base element page" aria-label="RepeatClicks in context on the base element page">→</a></h3>

`bool` · Raises `OnClick` on the press and repeatedly while the left button is held, instead of once on release. Off by default.

<h3 id="resizeareahalfwidth"><span class="prop"><code>ResizeAreaHalfWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#resizing" title="ResizeAreaHalfWidth in context on the base element page" aria-label="ResizeAreaHalfWidth in context on the base element page">→</a></h3>

`int` · How far the resize areas reach to each side of the edges, in units. 3 by default (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultresizeareahalfwidth">`DefaultSettings.DefaultResizeAreaHalfWidth`</a>); negative values are taken as 0.

<h3 id="resizecontourcolor"><span class="prop"><code>ResizeContourColor</code></span> <a class="ctx" href="/docs/ui-base-element/#resizing" title="ResizeContourColor in context on the base element page" aria-label="ResizeContourColor in context on the base element page">→</a></h3>

`Color` · The colour of the contour. `(50, 50, 50, 190)` by default (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultresizecontourcolor">`DefaultSettings.DefaultResizeContourColor`</a>); it fades and darkens with the element.

<h3 id="resizewithelementcontour"><span class="prop"><code>ResizeWithElementContour</code></span> <a class="ctx" href="/docs/ui-base-element/#resizing" title="ResizeWithElementContour in context on the base element page" aria-label="ResizeWithElementContour in context on the base element page">→</a></h3>

`bool` · Shows a contour while dragging and resizes the element once on release, instead of resizing it as the mouse moves.

<h3 id="texturespath"><span class="prop"><code>TexturesPath</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="TexturesPath in context on the base element page" aria-label="TexturesPath in context on the base element page">→</a></h3>

`string` · A content folder with the element's textures, for example <code>UITextures/<a href="/docs/ui-glossary/elements/button/">Button</a>/</code>. A missing trailing path separator is added.

<h3 id="timebeforerepeatstartsms"><span class="prop"><code>TimeBeforeRepeatStartsMs</code></span> <a class="ctx" href="/docs/ui-base-element/#click-timing" title="TimeBeforeRepeatStartsMs in context on the base element page" aria-label="TimeBeforeRepeatStartsMs in context on the base element page">→</a></h3>

`int` · Milliseconds from the press to the first repeated click. 1000 by default; negative values are taken as 0.

<h3 id="timebetweenrepeatsms"><span class="prop"><code>TimeBetweenRepeatsMs</code></span> <a class="ctx" href="/docs/ui-base-element/#click-timing" title="TimeBetweenRepeatsMs in context on the base element page" aria-label="TimeBetweenRepeatsMs in context on the base element page">→</a></h3>

`int` · Milliseconds between the repeated clicks after the first one. 300 by default; negative values are taken as 0.

<h3 id="transparency"><span class="prop"><code>Transparency</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="Transparency in context on the base element page" aria-label="Transparency in context on the base element page">→</a></h3>

`float` · From 0 (opaque, the default) to 1 (invisible); values outside are clamped. Applies to the element and its subtree, combined with the parents' transparency.

<h3 id="verticalalignment"><span class="prop"><code>VerticalAlignment</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="VerticalAlignment in context on the base element page" aria-label="VerticalAlignment in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/vertical-alignment/">`VerticalAlignment`</a> · Where the element sits in its slot vertically, and whether it stretches over it. The default is `Stretch`.

<h3 id="visibility"><span class="prop"><code>Visibility</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="Visibility in context on the base element page" aria-label="Visibility in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/visibility/">`Visibility`</a> · Whether the element is shown, hidden in its space or collapsed. The default is `Visible`. A hidden element loses the keyboard focus and any mouse state.

## Methods

<h3 id="clone"><span class="method"><code>Clone()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="Clone() in context on the styles page" aria-label="Clone() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/base-style/#clone">`Clone()`</a> · Returns a copy (as `object`) with the same properties assigned. Part styles in it are copied too.

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/base-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.

<h3 id="unset"><span class="method"><code>Unset()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="Unset() in context on the styles page" aria-label="Unset() in context on the styles page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/base-style/#unset">`Unset(string propertyName)`</a> · Takes the property back out of the style: the style stops applying it, it reads its type's default again, and the elements using the style update.
