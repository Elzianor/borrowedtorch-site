---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: base element"
description: "The properties, methods and events of BaseElement, in alphabetical order."
---

`BaseElement` is the abstract base of every element: buttons, labels, panels, windows and your own elements. Everything on this page applies to all of them.

The [base element page](/docs/ui-base-element/) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="actualheight"><span class="prop"><code>ActualHeight</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="ActualHeight in context on the base element page" aria-label="ActualHeight in context on the base element page">🠆</a></h3>

`int` · Read-only. The height the last layout gave the element, within its size limits.

<h3 id="actualsizerectanglecolor"><span class="prop"><code>ActualSizeRectangleColor</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="ActualSizeRectangleColor in context on the base element page" aria-label="ActualSizeRectangleColor in context on the base element page">🠆</a></h3>

`Color` · The colour of the bounds outline, `Green` by default.

<h3 id="actualwidth"><span class="prop"><code>ActualWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="ActualWidth in context on the base element page" aria-label="ActualWidth in context on the base element page">🠆</a></h3>

`int` · Read-only. The width the last layout gave the element, within its size limits.

<h3 id="backgroundcolor"><span class="dp"><code>BackgroundColor</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="BackgroundColor in context on the base element page" aria-label="BackgroundColor in context on the base element page">🠆</a></h3>

`Color` · The colour the element's background is filled with. `Transparent` (the default) fills nothing.

<h3 id="bottom"><span class="prop"><code>Bottom</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="Bottom in context on the base element page" aria-label="Bottom in context on the base element page">🠆</a></h3>

`int` · Read-only. `Top + ActualHeight`.

<h3 id="bounds"><span class="prop"><code>Bounds</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="Bounds in context on the base element page" aria-label="Bounds in context on the base element page">🠆</a></h3>

`Rectangle` · Read-only. <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#location">`Location`</a> and the actual size as one rectangle.

<h3 id="children"><span class="prop"><code>Children</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-properties" title="Children in context on the base element page" aria-label="Children in context on the base element page">🠆</a></h3>

<code>IReadOnlyList&lt;<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a>&gt;</code> · Read-only. The element's children: its items and the parts it made itself.

<h3 id="contextmenu"><span class="prop"><code>ContextMenu</code></span> <a class="ctx" href="/docs/ui-base-element/#tooltips-and-context-menus" title="ContextMenu in context on the base element page" aria-label="ContextMenu in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/context-menu/">`ContextMenu`</a> · Opened at the mouse by a right click on the element, or on an element inside it without a menu of its own. See [ContextMenu](/docs/ui-lists/#contextmenu).

<h3 id="cropoutsideofparentborder"><span class="dp"><code>CropOutsideOfParentBorder</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="CropOutsideOfParentBorder in context on the base element page" aria-label="CropOutsideOfParentBorder in context on the base element page">🠆</a></h3>

`bool` · Clips the element to its parent's bounds. Without it the element may overflow its parent but is still clipped by whatever clips the parent (a scroll view, a window's content area). On by default for every element with a style.

<h3 id="customeffect"><span class="dp"><code>CustomEffect</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="CustomEffect in context on the base element page" aria-label="CustomEffect in context on the base element page">🠆</a></h3>

`Effect` · A shader the element draws its background (or texture, an image's picture) with. Setting it sets it on the children as well, and a child added later takes it. An effect with a `ModulationColor` parameter gets the draw colour there.

<h3 id="defaultmousecursorsset"><span class="prop"><code>DefaultMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#baseelement-cursor-properties" title="DefaultMouseCursorsSet in context on the base element page" aria-label="DefaultMouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element without a more specific set: an arrow on hover, a hand over an element that can be dragged, a "no" cursor over a denied drop, and the sizing arrows over resize areas. <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#setdefaultmousecursorsset">`BorrowedTorchUI.SetDefaultMouseCursorsSet`</a> sets it too.

<h3 id="desiredheight"><span class="dp"><code>DesiredHeight</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="DesiredHeight in context on the base element page" aria-label="DesiredHeight in context on the base element page">🠆</a></h3>

`int` · The height in units. 0 (the default) fits the content, or stretches over the slot when <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#verticalalignment">`VerticalAlignment`</a> is `Stretch`.

<h3 id="desiredwidth"><span class="dp"><code>DesiredWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="DesiredWidth in context on the base element page" aria-label="DesiredWidth in context on the base element page">🠆</a></h3>

`int` · The width in units. 0 (the default) fits the content, or stretches over the slot when <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#horizontalalignment">`HorizontalAlignment`</a> is `Stretch`.

<h3 id="disabled"><span class="dp"><code>Disabled</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-properties" title="Disabled in context on the base element page" aria-label="Disabled in context on the base element page">🠆</a></h3>

`bool` · Stops the element and its subtree from showing states, raising mouse events and taking the keyboard, and draws them darker.

<h3 id="doubleclickintervalms"><span class="dp"><code>DoubleClickIntervalMs</code></span> <a class="ctx" href="/docs/ui-base-element/#click-timing" title="DoubleClickIntervalMs in context on the base element page" aria-label="DoubleClickIntervalMs in context on the base element page">🠆</a></h3>

`int` · The longest time in milliseconds between two left presses that make a double click. 300 by default; negative values are taken as 0.

<h3 id="draganddroprepresentation"><span class="prop"><code>DragAndDropRepresentation</code></span> <a class="ctx" href="/docs/ui-base-element/#drag-and-drop-properties" title="DragAndDropRepresentation in context on the base element page" aria-label="DragAndDropRepresentation in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/drag-and-drop-representation/">`DragAndDropRepresentation`</a> · What is drawn under the mouse while the element is the dragged one. Detached, not disposed, with the element.

<h3 id="dragtarget"><span class="prop"><code>DragTarget</code></span> <a class="ctx" href="/docs/ui-base-element/#drag-and-drop-properties" title="DragTarget in context on the base element page" aria-label="DragTarget in context on the base element page">🠆</a></h3>

`BaseElement` · The element that is dragged; the element itself by default.

<h3 id="dragtype"><span class="dp"><code>DragType</code></span> <a class="ctx" href="/docs/ui-base-element/#drag-and-drop-properties" title="DragType in context on the base element page" aria-label="DragType in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/drag-type/">`DragType`</a> · Whether a press on the element drags something: nothing (the default), the element itself, or a drag and drop.

<h3 id="dropallowedtint"><span class="prop"><code>DropAllowedTint</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="DropAllowedTint in context on the base element page" aria-label="DropAllowedTint in context on the base element page">🠆</a></h3>

`Color` · Static. The tint of a drop target that takes the dragged element, `(0, 100, 0, 10)` by default.

<h3 id="dropdeniedtint"><span class="prop"><code>DropDeniedTint</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="DropDeniedTint in context on the base element page" aria-label="DropDeniedTint in context on the base element page">🠆</a></h3>

`Color` · Static. The tint of a drop target that denies it, `(100, 0, 0, 10)` by default.

<h3 id="foregroundcolor"><span class="dp"><code>ForegroundColor</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="ForegroundColor in context on the base element page" aria-label="ForegroundColor in context on the base element page">🠆</a></h3>

`Color` · The colour of what the element draws over its background, such as a label's text. An element drawn from textures tints them with it when it is not `Transparent`.

<h3 id="gridcolumn"><span class="dp"><code>GridColumn</code></span> <a class="ctx" href="/docs/ui-base-element/#grid-placement" title="GridColumn in context on the base element page" aria-label="GridColumn in context on the base element page">🠆</a></h3>

`int` · The column the element starts in, from 0.

<h3 id="gridcolumnspan"><span class="dp"><code>GridColumnSpan</code></span> <a class="ctx" href="/docs/ui-base-element/#grid-placement" title="GridColumnSpan in context on the base element page" aria-label="GridColumnSpan in context on the base element page">🠆</a></h3>

`int` · How many columns the element covers; values below 1 are taken as 1.

<h3 id="gridrow"><span class="dp"><code>GridRow</code></span> <a class="ctx" href="/docs/ui-base-element/#grid-placement" title="GridRow in context on the base element page" aria-label="GridRow in context on the base element page">🠆</a></h3>

`int` · The row the element starts in, from 0.

<h3 id="gridrowspan"><span class="dp"><code>GridRowSpan</code></span> <a class="ctx" href="/docs/ui-base-element/#grid-placement" title="GridRowSpan in context on the base element page" aria-label="GridRowSpan in context on the base element page">🠆</a></h3>

`int` · How many rows the element covers; values below 1 are taken as 1.

<h3 id="hitrectanglecolor"><span class="prop"><code>HitRectangleColor</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="HitRectangleColor in context on the base element page" aria-label="HitRectangleColor in context on the base element page">🠆</a></h3>

`Color` · The colour of the hit rectangle outline, `White` by default.

<h3 id="hittest"><span class="dp"><code>HitTest</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-properties" title="HitTest in context on the base element page" aria-label="HitTest in context on the base element page">🠆</a></h3>

`bool` · Whether the element itself takes the mouse. On by default for every element with a style; off for an element deriving from `BaseElement` directly.

<h3 id="horizontalalignment"><span class="dp"><code>HorizontalAlignment</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="HorizontalAlignment in context on the base element page" aria-label="HorizontalAlignment in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/horizontal-alignment/">`HorizontalAlignment`</a> · Where the element sits in its slot horizontally, and whether it stretches over it. The default is `Stretch`.

<h3 id="hovertint"><span class="prop"><code>HoverTint</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="HoverTint in context on the base element page" aria-label="HoverTint in context on the base element page">🠆</a></h3>

`Color` · Static. The tint of a hovered element, `(0, 10, 60, 10)` by default.

<h3 id="inheritstate"><span class="dp"><code>InheritState</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-properties" title="InheritState in context on the base element page" aria-label="InheritState in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/inherit-state/">`InheritState`</a> · Which states the element shows besides its own: its parent's, its children's, both or none (the default).

<h3 id="isdisposed"><span class="prop"><code>IsDisposed</code></span> <a class="ctx" href="/docs/ui-base-element/#disposablebase" title="IsDisposed in context on the base element page" aria-label="IsDisposed in context on the base element page">🠆</a></h3>

`bool` · Read-only. True once <a class="ref method" href="/docs/ui-glossary/types/disposable-base/#dispose">`Dispose()`</a> was called.

<h3 id="isdropallowedpredicate"><span class="prop"><code>IsDropAllowedPredicate</code></span> <a class="ctx" href="/docs/ui-base-element/#drag-and-drop-properties" title="IsDropAllowedPredicate in context on the base element page" aria-label="IsDropAllowedPredicate in context on the base element page">🠆</a></h3>

`IfDropAllowed` · Decides whether a dragged element can be dropped here: <code>bool (<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> draggedElement)</code>. Without one every drop is denied.

<h3 id="isfocused"><span class="prop"><code>IsFocused</code></span> <a class="ctx" href="/docs/ui-base-element/#keyboard-and-focus-properties" title="IsFocused in context on the base element page" aria-label="IsFocused in context on the base element page">🠆</a></h3>

`bool` · Read-only. True while the element has the keyboard.

<h3 id="isresizable"><span class="dp"><code>IsResizable</code></span> <a class="ctx" href="/docs/ui-base-element/#resizing" title="IsResizable in context on the base element page" aria-label="IsResizable in context on the base element page">🠆</a></h3>

`bool` · Lets the user resize the element by dragging its edges and corners.

<h3 id="left"><span class="prop"><code>Left</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="Left in context on the base element page" aria-label="Left in context on the base element page">🠆</a></h3>

`int` · Read-only. `Location.X`.

<h3 id="location"><span class="prop"><code>Location</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="Location in context on the base element page" aria-label="Location in context on the base element page">🠆</a></h3>

`Point` · Read-only. The top left corner of the element on the screen.

<h3 id="margin"><span class="dp"><code>Margin</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="Margin in context on the base element page" aria-label="Margin in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The space between the element and the edges of its slot. Which sides count is described above.

<h3 id="maxheight"><span class="dp"><code>MaxHeight</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MaxHeight in context on the base element page" aria-label="MaxHeight in context on the base element page">🠆</a></h3>

`int` · The largest height the layout (and a resize) gives the element. 0 is no limit.

<h3 id="maxwidth"><span class="dp"><code>MaxWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MaxWidth in context on the base element page" aria-label="MaxWidth in context on the base element page">🠆</a></h3>

`int` · The largest width the layout (and a resize) gives the element. 0 is no limit.

<h3 id="measuredcontentheight"><span class="prop"><code>MeasuredContentHeight</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MeasuredContentHeight in context on the base element page" aria-label="MeasuredContentHeight in context on the base element page">🠆</a></h3>

`int` · Read-only. The height the content needed at the last measure.

<h3 id="measuredcontentwidth"><span class="prop"><code>MeasuredContentWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MeasuredContentWidth in context on the base element page" aria-label="MeasuredContentWidth in context on the base element page">🠆</a></h3>

`int` · Read-only. The width the content needed at the last measure, whatever width the element was given.

<h3 id="measuredheight"><span class="prop"><code>MeasuredHeight</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MeasuredHeight in context on the base element page" aria-label="MeasuredHeight in context on the base element page">🠆</a></h3>

`int` · Read-only. The height the last measure found.

<h3 id="measuredwidth"><span class="prop"><code>MeasuredWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MeasuredWidth in context on the base element page" aria-label="MeasuredWidth in context on the base element page">🠆</a></h3>

`int` · Read-only. The width the last measure found: fixed, stretched over the slot or fitted to the content.

<h3 id="minheight"><span class="dp"><code>MinHeight</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MinHeight in context on the base element page" aria-label="MinHeight in context on the base element page">🠆</a></h3>

`int` · The smallest height the layout (and a resize) gives the element. 0 is no limit.

<h3 id="minwidth"><span class="dp"><code>MinWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="MinWidth in context on the base element page" aria-label="MinWidth in context on the base element page">🠆</a></h3>

`int` · The smallest width the layout (and a resize) gives the element. 0 is no limit.

<h3 id="modalwindowactiveshadetint"><span class="prop"><code>ModalWindowActiveShadeTint</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="ModalWindowActiveShadeTint in context on the base element page" aria-label="ModalWindowActiveShadeTint in context on the base element page">🠆</a></h3>

`Color` · Static. The shade drawn over everything below the top modal window, `(0, 0, 0, 75)` by default. Always drawn, not a debug setting.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#baseelement-cursor-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows. On an element without a style: its control's cursors when it is a part of one, otherwise <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="name"><span class="prop"><code>Name</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-properties" title="Name in context on the base element page" aria-label="Name in context on the base element page">🠆</a></h3>

`string` · Read-only. The name given to the constructor, used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

<h3 id="parent"><span class="prop"><code>Parent</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-properties" title="Parent in context on the base element page" aria-label="Parent in context on the base element page">🠆</a></h3>

`BaseElement` · Read-only. The element this one is in, null when it is not in one.

<h3 id="postdrawaction"><span class="prop"><code>PostDrawAction</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="PostDrawAction in context on the base element page" aria-label="PostDrawAction in context on the base element page">🠆</a></h3>

`Action` · Runs after the element and its subtree are drawn, for example to restore what <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#predrawaction">`PreDrawAction`</a> changed.

<h3 id="predrawaction"><span class="prop"><code>PreDrawAction</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="PreDrawAction in context on the base element page" aria-label="PreDrawAction in context on the base element page">🠆</a></h3>

`Action` · Runs before the element and its subtree are drawn, for example to change the sprite batch state.

<h3 id="pressedtint"><span class="prop"><code>PressedTint</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="PressedTint in context on the base element page" aria-label="PressedTint in context on the base element page">🠆</a></h3>

`Color` · Static. The tint of a pressed element, `(128, 128, 0, 10)` by default.

<h3 id="repeatclicks"><span class="dp"><code>RepeatClicks</code></span> <a class="ctx" href="/docs/ui-base-element/#click-timing" title="RepeatClicks in context on the base element page" aria-label="RepeatClicks in context on the base element page">🠆</a></h3>

`bool` · Raises `OnClick` on the press and repeatedly while the left button is held, instead of once on release. Off by default.

<h3 id="resizeareahalfwidth"><span class="dp"><code>ResizeAreaHalfWidth</code></span> <a class="ctx" href="/docs/ui-base-element/#resizing" title="ResizeAreaHalfWidth in context on the base element page" aria-label="ResizeAreaHalfWidth in context on the base element page">🠆</a></h3>

`int` · How far the resize areas reach to each side of the edges, in units. 3 by default (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultresizeareahalfwidth">`DefaultSettings.DefaultResizeAreaHalfWidth`</a>); negative values are taken as 0.

<h3 id="resizecontourcolor"><span class="dp"><code>ResizeContourColor</code></span> <a class="ctx" href="/docs/ui-base-element/#resizing" title="ResizeContourColor in context on the base element page" aria-label="ResizeContourColor in context on the base element page">🠆</a></h3>

`Color` · The colour of the contour. `(50, 50, 50, 190)` by default (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultresizecontourcolor">`DefaultSettings.DefaultResizeContourColor`</a>); it fades and darkens with the element.

<h3 id="resizewithelementcontour"><span class="dp"><code>ResizeWithElementContour</code></span> <a class="ctx" href="/docs/ui-base-element/#resizing" title="ResizeWithElementContour in context on the base element page" aria-label="ResizeWithElementContour in context on the base element page">🠆</a></h3>

`bool` · Shows a contour while dragging and resizes the element once on release, instead of resizing it as the mouse moves.

<h3 id="right"><span class="prop"><code>Right</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="Right in context on the base element page" aria-label="Right in context on the base element page">🠆</a></h3>

`int` · Read-only. `Left + ActualWidth`.

<h3 id="showactualsizerectangle"><span class="prop"><code>ShowActualSizeRectangle</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="ShowActualSizeRectangle in context on the base element page" aria-label="ShowActualSizeRectangle in context on the base element page">🠆</a></h3>

`bool` · Outlines the element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#bounds">`Bounds`</a>, without clipping.

<h3 id="showactualsizerectanglediagonals"><span class="prop"><code>ShowActualSizeRectangleDiagonals</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="ShowActualSizeRectangleDiagonals in context on the base element page" aria-label="ShowActualSizeRectangleDiagonals in context on the base element page">🠆</a></h3>

`bool` · Adds the diagonals to the bounds outline.

<h3 id="showhitrectangle"><span class="prop"><code>ShowHitRectangle</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="ShowHitRectangle in context on the base element page" aria-label="ShowHitRectangle in context on the base element page">🠆</a></h3>

`bool` · Outlines the element's hit rectangle: its bounds as clipped by its parents.

<h3 id="showhitrectanglediagonals"><span class="prop"><code>ShowHitRectangleDiagonals</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="ShowHitRectangleDiagonals in context on the base element page" aria-label="ShowHitRectangleDiagonals in context on the base element page">🠆</a></h3>

`bool` · Adds the diagonals to the hit rectangle outline.

<h3 id="showstatetint"><span class="prop"><code>ShowStateTint</code></span> <a class="ctx" href="/docs/ui-base-element/#debug-helpers" title="ShowStateTint in context on the base element page" aria-label="ShowStateTint in context on the base element page">🠆</a></h3>

`bool` · Static. Draws the state tints below over the elements. Off by default.

<h3 id="statedata"><span class="prop"><code>StateData</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-properties" title="StateData in context on the base element page" aria-label="StateData in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/element-state-data/">`ElementStateData`</a> · Read-only. The state the element shows now and where it comes from.

<h3 id="texturespath"><span class="dp"><code>TexturesPath</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="TexturesPath in context on the base element page" aria-label="TexturesPath in context on the base element page">🠆</a></h3>

`string` · A content folder with the element's textures, for example <code>UITextures/<a href="/docs/ui-glossary/elements/button/">Button</a>/</code>. A missing trailing path separator is added.

<h3 id="texturespresent"><span class="prop"><code>TexturesPresent</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="TexturesPresent in context on the base element page" aria-label="TexturesPresent in context on the base element page">🠆</a></h3>

`bool` · Read-only. True when <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> is set.

<h3 id="timebeforerepeatstartsms"><span class="dp"><code>TimeBeforeRepeatStartsMs</code></span> <a class="ctx" href="/docs/ui-base-element/#click-timing" title="TimeBeforeRepeatStartsMs in context on the base element page" aria-label="TimeBeforeRepeatStartsMs in context on the base element page">🠆</a></h3>

`int` · Milliseconds from the press to the first repeated click. 1000 by default; negative values are taken as 0.

<h3 id="timebetweenrepeatsms"><span class="dp"><code>TimeBetweenRepeatsMs</code></span> <a class="ctx" href="/docs/ui-base-element/#click-timing" title="TimeBetweenRepeatsMs in context on the base element page" aria-label="TimeBetweenRepeatsMs in context on the base element page">🠆</a></h3>

`int` · Milliseconds between the repeated clicks after the first one. 300 by default; negative values are taken as 0.

<h3 id="tooltip"><span class="prop"><code>ToolTip</code></span> <a class="ctx" href="/docs/ui-base-element/#tooltips-and-context-menus" title="ToolTip in context on the base element page" aria-label="ToolTip in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/tool-tip/">`ToolTip`</a> · Shown while the element is hovered, after the tooltip's delay. See [ToolTip](/docs/ui-controls/#tooltip).

<h3 id="top"><span class="prop"><code>Top</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="Top in context on the base element page" aria-label="Top in context on the base element page">🠆</a></h3>

`int` · Read-only. `Location.Y`.

<h3 id="transparency"><span class="dp"><code>Transparency</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="Transparency in context on the base element page" aria-label="Transparency in context on the base element page">🠆</a></h3>

`float` · From 0 (opaque, the default) to 1 (invisible); values outside are clamped. Applies to the element and its subtree, combined with the parents' transparency.

<h3 id="verticalalignment"><span class="dp"><code>VerticalAlignment</code></span> <a class="ctx" href="/docs/ui-base-element/#size-and-position-properties" title="VerticalAlignment in context on the base element page" aria-label="VerticalAlignment in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/vertical-alignment/">`VerticalAlignment`</a> · Where the element sits in its slot vertically, and whether it stretches over it. The default is `Stretch`.

<h3 id="visibility"><span class="dp"><code>Visibility</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-properties" title="Visibility in context on the base element page" aria-label="Visibility in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/visibility/">`Visibility`</a> · Whether the element is shown, hidden in its space or collapsed. The default is `Visible`. A hidden element loses the keyboard focus and any mouse state.

## Fields

<h3 id="id"><code>Id</code> <a class="ctx" href="/docs/ui-base-element/#items-and-content-properties" title="Id in context on the base element page" aria-label="Id in context on the base element page">🠆</a></h3>

`Guid` · Read-only field. A unique id made when the element is created.

## Methods

<h3 id="acceptsitems"><span class="method"><code>AcceptsItems()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="AcceptsItems() in context on the base element page" aria-label="AcceptsItems() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#acceptsitems">`AcceptsItems`</a> · Protected virtual property, `true` by default. Return false and the item methods do nothing on the element.

<h3 id="actualheightchangedhandleroverride"><span class="method"><code>ActualHeightChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="ActualHeightChangedHandlerOverride() in context on the base element page" aria-label="ActualHeightChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#actualheightchangedhandleroverride">`ActualHeightChangedHandlerOverride(int height)`</a> · The layout gave the element another height.

<h3 id="actualwidthchangedhandleroverride"><span class="method"><code>ActualWidthChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="ActualWidthChangedHandlerOverride() in context on the base element page" aria-label="ActualWidthChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#actualwidthchangedhandleroverride">`ActualWidthChangedHandlerOverride(int width)`</a> · The layout gave the element another width.

<h3 id="addchild"><span class="method"><code>AddChild()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="AddChild() in context on the base element page" aria-label="AddChild() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#addchild">`AddChild(BaseElement child, bool isSole = false, int insertIndex = -1, bool isVisualComponent = true)`</a> · Protected. Adds a child; by default an own part, which the item methods leave alone and which is disposed when it is removed. `isSole` removes the other items first.

<h3 id="additem"><span class="method"><code>AddItem()</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-methods" title="AddItem() in context on the base element page" aria-label="AddItem() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#additem">`AddItem(BaseElement item)`</a> · Adds the item after the other children.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-methods" title="AddItemAt() in context on the base element page" aria-label="AddItemAt() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#additemat">`AddItemAt(BaseElement item, int index)`</a> · Inserts the item at the index in `Children`. An index below 0 or above the count is ignored.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-methods" title="AddItemsRange() in context on the base element page" aria-label="AddItemsRange() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#additemsrange">`AddItemsRange(IEnumerable<BaseElement> items)`</a> · Adds the items in order after the other children.

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-methods" title="AddItemsRangeAt() in context on the base element page" aria-label="AddItemsRangeAt() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#additemsrangeat">`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)`</a> · Inserts the items in order from the index; a null item takes no place.

<h3 id="applygeneralstyle"><span class="method"><code>ApplyGeneralStyle()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="ApplyGeneralStyle() in context on the base element page" aria-label="ApplyGeneralStyle() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#applygeneralstyle">`ApplyGeneralStyle()`</a> · Protected, of <a class="ref method" href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">`GenericStyleAndMouseCursorsData<TStyle>`</a>. Applies the general style over the framework defaults.

<h3 id="applystyle"><span class="method"><code>ApplyStyle()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="ApplyStyle() in context on the base element page" aria-label="ApplyStyle() in context on the base element page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#applystyle">ApplyStyle</a>(<a href="/docs/ui-glossary/types/base-style/">BaseStyle</a> style, <a href="/docs/ui-glossary/types/value-sources/">ValueSources</a> valueSource)</code></span> · Protected. Applies the style's assigned properties to the element as the given value source.

<h3 id="applystyleoverride"><span class="method"><code>ApplyStyleOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="ApplyStyleOverride() in context on the base element page" aria-label="ApplyStyleOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#applystyleoverride">`ApplyStyleOverride()`</a> · Protected, of <a class="ref method" href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">`GenericStyleAndMouseCursorsData<TStyle>`</a>. Applies the style override again.

<h3 id="arrange"><span class="method"><code>Arrange()</code></span> <a class="ctx" href="/docs/ui-base-element/#layout-methods" title="Arrange() in context on the base element page" aria-label="Arrange() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrange">`Arrange(Rectangle slot)`</a> · Gives the element its size and position in the slot: a stretched element takes the slot less its margins, the others keep their measured size and are placed by their margins and alignment.

<h3 id="arrangeat"><span class="method"><code>ArrangeAt()</code></span> <a class="ctx" href="/docs/ui-base-element/#layout-methods" title="ArrangeAt() in context on the base element page" aria-label="ArrangeAt() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangeat">`ArrangeAt(Point position)`</a> · Places the element at a position its container chose, at its measured size; its margins and alignment are not applied.

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangeat">`ArrangeAt(Rectangle bounds)`</a> · Places the element at a position and size its container chose.

<h3 id="arrangecontent"><span class="method"><code>ArrangeContent()</code></span> <a class="ctx" href="/docs/ui-base-element/#layout-methods" title="ArrangeContent() in context on the base element page" aria-label="ArrangeContent() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#arrangecontent">`ArrangeContent()`</a> · Protected virtual. Arranges the children inside <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#bounds">`Bounds`</a>, as described above.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-methods" title="ClearItems() in context on the base element page" aria-label="ClearItems() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#clearitems">`ClearItems()`</a> · Takes every item out without disposing them; the element's own parts stay.

<h3 id="clickhandleroverride"><span class="method"><code>ClickHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="ClickHandlerOverride() in context on the base element page" aria-label="ClickHandlerOverride() in context on the base element page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#clickhandleroverride">ClickHandlerOverride</a>(BaseElement sender, <a href="/docs/ui-glossary/types/mouse-click-event-args/">MouseClickEventArgs</a> e)</code></span> · Before `OnClick`.

<h3 id="cursorspropertychangedhandler"><span class="method"><code>CursorsPropertyChangedHandler()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="CursorsPropertyChangedHandler() in context on the base element page" aria-label="CursorsPropertyChangedHandler() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#cursorspropertychangedhandler">`CursorsPropertyChangedHandler()`</a> · Protected. Shows the element's current cursors again, after its cursor set changed.

<h3 id="detachchild"><span class="method"><code>DetachChild()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="DetachChild() in context on the base element page" aria-label="DetachChild() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#detachchild">`DetachChild(BaseElement child)`</a> · Protected. Takes a child out without disposing it, to add it again later.

<h3 id="detachchildren"><span class="method"><code>DetachChildren()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="DetachChildren() in context on the base element page" aria-label="DetachChildren() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#detachchildren">`DetachChildren()`</a> · Protected. Takes every child out without disposing them.

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#detachchildren">`DetachChildren(Predicate<BaseElement> match)`</a> · Protected. Takes the matching children out without disposing them.

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/ui-base-element/#disposablebase" title="Dispose() in context on the base element page" aria-label="Dispose() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#dispose">`Dispose()`</a> · Marks the object disposed and runs <a class="ref method" href="/docs/ui-glossary/types/disposable-base/#disposehandler">`DisposeHandler`</a> once; later calls do nothing.

<h3 id="disposehandler"><span class="method"><code>DisposeHandler()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="DisposeHandler() in context on the base element page" aria-label="DisposeHandler() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#disposehandler">`DisposeHandler()`</a> · Protected override. The element's dispose (see [items and content](#items-and-content)); call the base when you override it.

<h3 id="doubleclickhandleroverride"><span class="method"><code>DoubleClickHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="DoubleClickHandlerOverride() in context on the base element page" aria-label="DoubleClickHandlerOverride() in context on the base element page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#doubleclickhandleroverride">DoubleClickHandlerOverride</a>(BaseElement sender, <a href="/docs/ui-glossary/types/mouse-click-event-args/">MouseClickEventArgs</a> e)</code></span> · Before <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondoubleclick">`OnDoubleClick`</a>.

<h3 id="doubleclickintervalmspropertychangedhandleroverride"><span class="method"><code>DoubleClickIntervalMsPropertyChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="DoubleClickIntervalMsPropertyChangedHandlerOverride() in context on the base element page" aria-label="DoubleClickIntervalMsPropertyChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalmspropertychangedhandleroverride">`DoubleClickIntervalMsPropertyChangedHandlerOverride(int value)`</a> · <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalms">`DoubleClickIntervalMs`</a> changed (after it was passed to the parts).

<h3 id="draw"><span class="method"><code>Draw()</code></span> <a class="ctx" href="/docs/ui-base-element/#appearance-methods" title="Draw() in context on the base element page" aria-label="Draw() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#draw">`Draw()`</a> · Draws the element, its children and the popups above them. The UI calls it on the root every frame, you don't call it yourself.

<h3 id="focus"><span class="method"><code>Focus()</code></span> <a class="ctx" href="/docs/ui-base-element/#keyboard-and-focus-methods" title="Focus() in context on the base element page" aria-label="Focus() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#focus">`Focus()`</a> · Gives the element the keyboard. Returns false when it can't take it: it is not in the tree, hidden or disabled.

<h3 id="foregroundcolorpropertychangedhandleroverride"><span class="method"><code>ForegroundColorPropertyChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="ForegroundColorPropertyChangedHandlerOverride() in context on the base element page" aria-label="ForegroundColorPropertyChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#foregroundcolorpropertychangedhandleroverride">`ForegroundColorPropertyChangedHandlerOverride(Color value)`</a> · <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a> changed.

<h3 id="genericstyleandmousecursorsdata"><span class="method"><code>GenericStyleAndMouseCursorsData()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="GenericStyleAndMouseCursorsData() in context on the base element page" aria-label="GenericStyleAndMouseCursorsData() in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/generic-style-and-mouse-cursors-data/">`GenericStyleAndMouseCursorsData(string name = null)`</a> · Protected. The same, for an element with a style.

<h3 id="getelementbyname"><span class="method"><code>GetElementByName()</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-methods" title="GetElementByName() in context on the base element page" aria-label="GetElementByName() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName(string name)`</a> · Finds an element by name below this one (its children first, then deeper, popups such as its tooltip included). Null when there is none.

<h3 id="gotfocushandleroverride"><span class="method"><code>GotFocusHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="GotFocusHandlerOverride() in context on the base element page" aria-label="GotFocusHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#gotfocushandleroverride">`GotFocusHandlerOverride()`</a> · The element got the keyboard.

<h3 id="hittestpropertychangedhandleroverride"><span class="method"><code>HitTestPropertyChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="HitTestPropertyChangedHandlerOverride() in context on the base element page" aria-label="HitTestPropertyChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#hittestpropertychangedhandleroverride">`HitTestPropertyChangedHandlerOverride(bool value)`</a> · <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#hittest">`HitTest`</a> changed.

<h3 id="inheritstatepropertychangedhandleroverride"><span class="method"><code>InheritStatePropertyChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="InheritStatePropertyChangedHandlerOverride() in context on the base element page" aria-label="InheritStatePropertyChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#inheritstatepropertychangedhandleroverride">InheritStatePropertyChangedHandlerOverride</a>(<a href="/docs/ui-glossary/types/inherit-state/">InheritState</a> value)</code></span> · <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#inheritstate">`InheritState`</a> changed.

<h3 id="invalidatearrange"><span class="method"><code>InvalidateArrange()</code></span> <a class="ctx" href="/docs/ui-base-element/#layout-methods" title="InvalidateArrange() in context on the base element page" aria-label="InvalidateArrange() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#invalidatearrange">`InvalidateArrange()`</a> · Asks for the element's children to be placed again; its size stays.

<h3 id="invalidatemeasure"><span class="method"><code>InvalidateMeasure()</code></span> <a class="ctx" href="/docs/ui-base-element/#layout-methods" title="InvalidateMeasure() in context on the base element page" aria-label="InvalidateMeasure() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#invalidatemeasure">`InvalidateMeasure()`</a> · Asks for a new measure and arrange of the element: a setting of its own changed its size or its content's.

<h3 id="keydownhandleroverride"><span class="method"><code>KeyDownHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="KeyDownHandlerOverride() in context on the base element page" aria-label="KeyDownHandlerOverride() in context on the base element page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#keydownhandleroverride">KeyDownHandlerOverride</a>(<a href="/docs/ui-glossary/types/key-down-event-args/">KeyDownEventArgs</a> e)</code></span> · A key reached the element, before <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onkeydown">`OnKeyDown`</a>; set `e.Handled` for a key the element uses.

<h3 id="loadtextures"><span class="method"><code>LoadTextures()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="LoadTextures() in context on the base element page" aria-label="LoadTextures() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#loadtextures">`LoadTextures()`</a> · Protected virtual. Called when <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> changes; load the element's textures from the folder here and call the base.

<h3 id="locationchangedhandleroverride"><span class="method"><code>LocationChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="LocationChangedHandlerOverride() in context on the base element page" aria-label="LocationChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#locationchangedhandleroverride">`LocationChangedHandlerOverride(Point location)`</a> · The element moved.

<h3 id="lostfocushandleroverride"><span class="method"><code>LostFocusHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="LostFocusHandlerOverride() in context on the base element page" aria-label="LostFocusHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#lostfocushandleroverride">`LostFocusHandlerOverride()`</a> · The element lost the keyboard. Focusing another element here (the next field of a form) works.

<h3 id="measure"><span class="method"><code>Measure()</code></span> <a class="ctx" href="/docs/ui-base-element/#layout-methods" title="Measure() in context on the base element page" aria-label="Measure() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#measure">`Measure(int slotWidth, int slotHeight)`</a> · Measures the element for the slot its parent gives it (`-1`: a size the parent does not know yet): a stretched element takes the slot less its margins, a fixed one its desired size, the others fit their content.

<h3 id="measureat"><span class="method"><code>MeasureAt()</code></span> <a class="ctx" href="/docs/ui-base-element/#layout-methods" title="MeasureAt() in context on the base element page" aria-label="MeasureAt() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#measureat">`MeasureAt(int width, int height)`</a> · Measures the element at a size its container chose for it; along a side given as `-1` it has its own size (fixed, or fitted to its content).

<h3 id="measurecontent"><span class="method"><code>MeasureContent()</code></span> <a class="ctx" href="/docs/ui-base-element/#layout-methods" title="MeasureContent() in context on the base element page" aria-label="MeasureContent() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#measurecontent">`MeasureContent(int width, int height)`</a> · Protected virtual, returns `Point`. Measures the children and returns the content size, as described above.

<h3 id="mouseenterhandleroverride"><span class="method"><code>MouseEnterHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="MouseEnterHandlerOverride() in context on the base element page" aria-label="MouseEnterHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#mouseenterhandleroverride">`MouseEnterHandlerOverride()`</a> · Before <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseenter">`OnMouseEnter`</a>.

<h3 id="mouseleavehandleroverride"><span class="method"><code>MouseLeaveHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="MouseLeaveHandlerOverride() in context on the base element page" aria-label="MouseLeaveHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#mouseleavehandleroverride">`MouseLeaveHandlerOverride()`</a> · Before <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onmouseleave">`OnMouseLeave`</a>.

<h3 id="removechild"><span class="method"><code>RemoveChild()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="RemoveChild() in context on the base element page" aria-label="RemoveChild() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#removechild">`RemoveChild(BaseElement child)`</a> · Protected. Takes a child out: an own part is disposed, an item only detached.

<h3 id="removechildat"><span class="method"><code>RemoveChildAt()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="RemoveChildAt() in context on the base element page" aria-label="RemoveChildAt() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#removechildat">`RemoveChildAt(int index)`</a> · Protected. The same, by index in `Children`.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-methods" title="RemoveItem() in context on the base element page" aria-label="RemoveItem() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#removeitem">`RemoveItem(BaseElement item)`</a> · Takes the item out without disposing it. Does nothing for a part of the element.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-methods" title="RemoveItemAt() in context on the base element page" aria-label="RemoveItemAt() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#removeitemat">`RemoveItemAt(int index)`</a> · Takes the item at the index out without disposing it.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-methods" title="RemoveItemsRangeAt() in context on the base element page" aria-label="RemoveItemsRangeAt() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#removeitemsrangeat">`RemoveItemsRangeAt(int index, int count)`</a> · Takes `count` items out from the index on (fewer when the children end first), without disposing them.

<h3 id="statechangedhandleroverride"><span class="method"><code>StateChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="StateChangedHandlerOverride() in context on the base element page" aria-label="StateChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#statechangedhandleroverride">StateChangedHandlerOverride</a>(BaseElement sender, <a href="/docs/ui-glossary/types/element-state-data/">ElementStateData</a> stateData)</code></span> · The shown state changed, before <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onstatechanged">`OnStateChanged`</a>.

<h3 id="style"><span class="method"><code>Style()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="Style() in context on the base element page" aria-label="Style() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#style">`Style`</a> · Protected property of <a class="ref method" href="/docs/ui-glossary/elements/base-element/#genericstyleandmousecursorsdata">`GenericStyleAndMouseCursorsData<TStyle>`</a>: the style override, or the general style.

<h3 id="textinputhandleroverride"><span class="method"><code>TextInputHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="TextInputHandlerOverride() in context on the base element page" aria-label="TextInputHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#textinputhandleroverride">`TextInputHandlerOverride(TextInputEventArgs e)`</a> · Typed text reached the focused element.

<h3 id="timebeforerepeatstartsmspropertychangedhandleroverride"><span class="method"><code>TimeBeforeRepeatStartsMsPropertyChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="TimeBeforeRepeatStartsMsPropertyChangedHandlerOverride() in context on the base element page" aria-label="TimeBeforeRepeatStartsMsPropertyChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#timebeforerepeatstartsmspropertychangedhandleroverride">`TimeBeforeRepeatStartsMsPropertyChangedHandlerOverride(int value)`</a> · <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebeforerepeatstartsms">`TimeBeforeRepeatStartsMs`</a> changed (after it was passed to the parts).

<h3 id="timebetweenrepeatsmspropertychangedhandleroverride"><span class="method"><code>TimeBetweenRepeatsMsPropertyChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="TimeBetweenRepeatsMsPropertyChangedHandlerOverride() in context on the base element page" aria-label="TimeBetweenRepeatsMsPropertyChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#timebetweenrepeatsmspropertychangedhandleroverride">`TimeBetweenRepeatsMsPropertyChangedHandlerOverride(int value)`</a> · <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebetweenrepeatsms">`TimeBetweenRepeatsMs`</a> changed (after it was passed to the parts).

<h3 id="unsubscribeself"><span class="method"><code>UnsubscribeSelf()</code></span> <a class="ctx" href="/docs/ui-base-element/#members-for-derived-elements" title="UnsubscribeSelf() in context on the base element page" aria-label="UnsubscribeSelf() in context on the base element page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/base-element/#unsubscribeself">`UnsubscribeSelf()`</a> · Protected virtual. Called on dispose: release the element's subscriptions to other objects here.

<h3 id="visibilitychangedhandleroverride"><span class="method"><code>VisibilityChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="VisibilityChangedHandlerOverride() in context on the base element page" aria-label="VisibilityChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#visibilitychangedhandleroverride">VisibilityChangedHandlerOverride</a>(<a href="/docs/ui-glossary/types/visibility/">Visibility</a> visibility)</code></span> · <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#visibility">`Visibility`</a> changed; called before the children hear of it.

<h3 id="visibilitypropertychangedhandleroverride"><span class="method"><code>VisibilityPropertyChangedHandlerOverride()</code></span> <a class="ctx" href="/docs/ui-base-element/#handler-overrides" title="VisibilityPropertyChangedHandlerOverride() in context on the base element page" aria-label="VisibilityPropertyChangedHandlerOverride() in context on the base element page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/elements/base-element/#visibilitypropertychangedhandleroverride">VisibilityPropertyChangedHandlerOverride</a>(<a href="/docs/ui-glossary/types/visibility/">Visibility</a> value)</code></span> · <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#visibility">`Visibility`</a> changed; called after the children heard of it.

## Events

<h3 id="onclick"><span class="event"><code>OnClick</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-events" title="OnClick in context on the base element page" aria-label="OnClick in context on the base element page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/mouse-click-event-args/">MouseClickEventArgs</a> e)</code> · A mouse button pressed on the element is released over it (with <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#repeatclicks">`RepeatClicks`</a>: on the press and while it is held).

<h3 id="ondisposed"><span class="event"><code>OnDisposed</code></span> <a class="ctx" href="/docs/ui-base-element/#items-and-content-events" title="OnDisposed in context on the base element page" aria-label="OnDisposed in context on the base element page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender)</code> · The element was disposed. Raised once, at the end of <a class="ref method" href="/docs/ui-glossary/elements/base-element/#dispose">`Dispose()`</a>; the handlers are let go afterwards.

<h3 id="ondoubleclick"><span class="event"><code>OnDoubleClick</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-events" title="OnDoubleClick in context on the base element page" aria-label="OnDoubleClick in context on the base element page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/mouse-click-event-args/">MouseClickEventArgs</a> e)</code> · The left button is pressed a second time within <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalms">`DoubleClickIntervalMs`</a>. Not raised by an element with <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#repeatclicks">`RepeatClicks`</a>.

<h3 id="ondraganddropstart"><span class="event"><code>OnDragAndDropStart</code></span> <a class="ctx" href="/docs/ui-base-element/#drag-and-drop-properties" title="OnDragAndDropStart in context on the base element page" aria-label="OnDragAndDropStart in context on the base element page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> draggedElement)</code> · A drag and drop of this element (as the <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#dragtarget">`DragTarget`</a>) starts; the argument is the element whose <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#dragtype">`DragType`</a> started it.

<h3 id="ondrop"><span class="event"><code>OnDrop</code></span> <a class="ctx" href="/docs/ui-base-element/#drag-and-drop-properties" title="OnDrop in context on the base element page" aria-label="OnDrop in context on the base element page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> draggedElement, <a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> dragAndDropDestination)</code> · A dragged element is released over this element and its predicate allowed it.

<h3 id="ondropdenied"><span class="event"><code>OnDropDenied</code></span> <a class="ctx" href="/docs/ui-base-element/#drag-and-drop-properties" title="OnDropDenied in context on the base element page" aria-label="OnDropDenied in context on the base element page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> draggedElement, <a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> dragAndDropDestination)</code> · A dragged element is released over this element and the drop is denied.

<h3 id="onkeydown"><span class="event"><code>OnKeyDown</code></span> <a class="ctx" href="/docs/ui-base-element/#keyboard-and-focus-events" title="OnKeyDown in context on the base element page" aria-label="OnKeyDown in context on the base element page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/key-down-event-args/">KeyDownEventArgs</a> e)</code> · A key is pressed while the element, or an element inside it that left the key unhandled, has the keyboard.

<h3 id="onmouseenter"><span class="event"><code>OnMouseEnter</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-events" title="OnMouseEnter in context on the base element page" aria-label="OnMouseEnter in context on the base element page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender)</code> · The element starts taking the mouse.

<h3 id="onmouseleave"><span class="event"><code>OnMouseLeave</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-events" title="OnMouseLeave in context on the base element page" aria-label="OnMouseLeave in context on the base element page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender)</code> · The element stops taking the mouse: the mouse left, moved onto a child that takes it, or the element got disabled or hidden.

<h3 id="onstatechanged"><span class="event"><code>OnStateChanged</code></span> <a class="ctx" href="/docs/ui-base-element/#mouse-and-states-events" title="OnStateChanged in context on the base element page" aria-label="OnStateChanged in context on the base element page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, <a href="/docs/ui-glossary/types/element-state-data/">ElementStateData</a> e)</code> · The state the element shows changes, its own or one it takes. Raised again for every change of the mouse buttons while the element is pressed.
