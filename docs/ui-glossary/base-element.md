---
layout: docs
title: "Glossary: base element"
description: The properties, methods and events of BaseElement, in alphabetical order.
---

`BaseElement` is the abstract base of every element: buttons, labels, panels, windows and your own elements. Everything on this page applies to all of them.

The [base element page](/docs/ui-base-element/) explains them in context, with code and screenshots.

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property, which a style, a binding or an animation can set.

## Properties

<h3 id="actualheight"><span class="prop"><code>ActualHeight</code></span></h3>

`int` · Read-only. The height the last layout gave the element, within its size limits. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="actualsizerectanglecolor"><span class="prop"><code>ActualSizeRectangleColor</code></span></h3>

`Color` · The colour of the bounds outline, `Green` by default. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="actualwidth"><span class="prop"><code>ActualWidth</code></span></h3>

`int` · Read-only. The width the last layout gave the element, within its size limits. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="backgroundcolor"><span class="dp"><code>BackgroundColor</code></span></h3>

`Color` · The colour the element's background is filled with. `Transparent` (the default) fills nothing. ([in context](/docs/ui-base-element/#appearance-properties))

<h3 id="bottom"><span class="prop"><code>Bottom</code></span></h3>

`int` · Read-only. `Top + ActualHeight`. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="bounds"><span class="prop"><code>Bounds</code></span></h3>

`Rectangle` · Read-only. `Location` and the actual size as one rectangle. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="children"><span class="prop"><code>Children</code></span></h3>

`IReadOnlyList<BaseElement>` · Read-only. The element's children: its items and the parts it made itself. ([in context](/docs/ui-base-element/#items-and-content-properties))

<h3 id="contextmenu"><span class="prop"><code>ContextMenu</code></span></h3>

`ContextMenu` · Opened at the mouse by a right click on the element, or on an element inside it without a menu of its own. See [ContextMenu](/docs/ui-lists/#contextmenu). ([in context](/docs/ui-base-element/#tooltips-and-context-menus))

<h3 id="cropoutsideofparentborder"><span class="dp"><code>CropOutsideOfParentBorder</code></span></h3>

`bool` · Clips the element to its parent's bounds. Without it the element may overflow its parent but is still clipped by whatever clips the parent (a scroll view, a window's content area). On by default for every element with a style. ([in context](/docs/ui-base-element/#appearance-properties))

<h3 id="customeffect"><span class="dp"><code>CustomEffect</code></span></h3>

`Effect` · A shader the element draws its background (or texture, an image's picture) with. Setting it sets it on the children as well, and a child added later takes it. An effect with a `ModulationColor` parameter gets the draw colour there. ([in context](/docs/ui-base-element/#appearance-properties))

<h3 id="defaultmousecursorsset"><span class="prop"><code>DefaultMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element without a more specific set: an arrow on hover, a hand over an element that can be dragged, a "no" cursor over a denied drop, and the sizing arrows over resize areas. `BorrowedTorchUI.SetDefaultMouseCursorsSet` sets it too. ([in context](/docs/ui-base-element/#baseelement-cursor-properties))

<h3 id="desiredheight"><span class="dp"><code>DesiredHeight</code></span></h3>

`int` · The height in units. 0 (the default) fits the content, or stretches over the slot when `VerticalAlignment` is `Stretch`. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="desiredwidth"><span class="dp"><code>DesiredWidth</code></span></h3>

`int` · The width in units. 0 (the default) fits the content, or stretches over the slot when `HorizontalAlignment` is `Stretch`. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="disabled"><span class="dp"><code>Disabled</code></span></h3>

`bool` · Stops the element and its subtree from showing states, raising mouse events and taking the keyboard, and draws them darker. ([in context](/docs/ui-base-element/#mouse-and-states-properties))

<h3 id="doubleclickintervalms"><span class="dp"><code>DoubleClickIntervalMs</code></span></h3>

`int` · The longest time in milliseconds between two left presses that make a double click. 300 by default; negative values are taken as 0. ([in context](/docs/ui-base-element/#click-timing))

<h3 id="draganddroprepresentation"><span class="prop"><code>DragAndDropRepresentation</code></span></h3>

`DragAndDropRepresentation` · What is drawn under the mouse while the element is the dragged one. Detached, not disposed, with the element. ([in context](/docs/ui-base-element/#drag-and-drop-properties))

<h3 id="dragtarget"><span class="prop"><code>DragTarget</code></span></h3>

`BaseElement` · The element that is dragged; the element itself by default. ([in context](/docs/ui-base-element/#drag-and-drop-properties))

<h3 id="dragtype"><span class="dp"><code>DragType</code></span></h3>

`DragType` · Whether a press on the element drags something: nothing (the default), the element itself, or a drag and drop. ([in context](/docs/ui-base-element/#drag-and-drop-properties))

<h3 id="dropallowedtint"><span class="prop"><code>DropAllowedTint</code></span></h3>

`Color` · Static. The tint of a drop target that takes the dragged element, `(0, 100, 0, 10)` by default. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="dropdeniedtint"><span class="prop"><code>DropDeniedTint</code></span></h3>

`Color` · Static. The tint of a drop target that denies it, `(100, 0, 0, 10)` by default. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="foregroundcolor"><span class="dp"><code>ForegroundColor</code></span></h3>

`Color` · The colour of what the element draws over its background, such as a label's text. An element drawn from textures tints them with it when it is not `Transparent`. ([in context](/docs/ui-base-element/#appearance-properties))

<h3 id="gridcolumn"><span class="dp"><code>GridColumn</code></span></h3>

`int` · The column the element starts in, from 0. ([in context](/docs/ui-base-element/#grid-placement))

<h3 id="gridcolumnspan"><span class="dp"><code>GridColumnSpan</code></span></h3>

`int` · How many columns the element covers; values below 1 are taken as 1. ([in context](/docs/ui-base-element/#grid-placement))

<h3 id="gridrow"><span class="dp"><code>GridRow</code></span></h3>

`int` · The row the element starts in, from 0. ([in context](/docs/ui-base-element/#grid-placement))

<h3 id="gridrowspan"><span class="dp"><code>GridRowSpan</code></span></h3>

`int` · How many rows the element covers; values below 1 are taken as 1. ([in context](/docs/ui-base-element/#grid-placement))

<h3 id="hitrectanglecolor"><span class="prop"><code>HitRectangleColor</code></span></h3>

`Color` · The colour of the hit rectangle outline, `White` by default. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="hittest"><span class="dp"><code>HitTest</code></span></h3>

`bool` · Whether the element itself takes the mouse. On by default for every element with a style; off for an element deriving from `BaseElement` directly. ([in context](/docs/ui-base-element/#mouse-and-states-properties))

<h3 id="horizontalalignment"><span class="dp"><code>HorizontalAlignment</code></span></h3>

`HorizontalAlignment` · Where the element sits in its slot horizontally, and whether it stretches over it. The default is `Stretch`. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="hovertint"><span class="prop"><code>HoverTint</code></span></h3>

`Color` · Static. The tint of a hovered element, `(0, 10, 60, 10)` by default. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="id"><span class="prop"><code>Id</code></span></h3>

`Guid` · Read-only field. A unique id made when the element is created. ([in context](/docs/ui-base-element/#items-and-content-properties))

<h3 id="inheritstate"><span class="dp"><code>InheritState</code></span></h3>

`InheritState` · Which states the element shows besides its own: its parent's, its children's, both or none (the default). ([in context](/docs/ui-base-element/#mouse-and-states-properties))

<h3 id="isdisposed"><span class="prop"><code>IsDisposed</code></span></h3>

`bool` · Read-only. True once `Dispose()` was called. ([in context](/docs/ui-base-element/#disposablebase))

<h3 id="isdropallowedpredicate"><span class="prop"><code>IsDropAllowedPredicate</code></span></h3>

`IfDropAllowed` · Decides whether a dragged element can be dropped here: `bool (BaseElement draggedElement)`. Without one every drop is denied. ([in context](/docs/ui-base-element/#drag-and-drop-properties))

<h3 id="isfocused"><span class="prop"><code>IsFocused</code></span></h3>

`bool` · Read-only. True while the element has the keyboard. ([in context](/docs/ui-base-element/#keyboard-and-focus-properties))

<h3 id="isresizable"><span class="dp"><code>IsResizable</code></span></h3>

`bool` · Lets the user resize the element by dragging its edges and corners. ([in context](/docs/ui-base-element/#resizing))

<h3 id="left"><span class="prop"><code>Left</code></span></h3>

`int` · Read-only. `Location.X`. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="location"><span class="prop"><code>Location</code></span></h3>

`Point` · Read-only. The top left corner of the element on the screen. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="margin"><span class="dp"><code>Margin</code></span></h3>

`Margin` · The space between the element and the edges of its slot. Which sides count is described above. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="maxheight"><span class="dp"><code>MaxHeight</code></span></h3>

`int` · The largest height the layout (and a resize) gives the element. 0 is no limit. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="maxwidth"><span class="dp"><code>MaxWidth</code></span></h3>

`int` · The largest width the layout (and a resize) gives the element. 0 is no limit. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="measuredcontentheight"><span class="prop"><code>MeasuredContentHeight</code></span></h3>

`int` · Read-only. The height the content needed at the last measure. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="measuredcontentwidth"><span class="prop"><code>MeasuredContentWidth</code></span></h3>

`int` · Read-only. The width the content needed at the last measure, whatever width the element was given. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="measuredheight"><span class="prop"><code>MeasuredHeight</code></span></h3>

`int` · Read-only. The height the last measure found. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="measuredwidth"><span class="prop"><code>MeasuredWidth</code></span></h3>

`int` · Read-only. The width the last measure found: fixed, stretched over the slot or fitted to the content. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="minheight"><span class="dp"><code>MinHeight</code></span></h3>

`int` · The smallest height the layout (and a resize) gives the element. 0 is no limit. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="minwidth"><span class="dp"><code>MinWidth</code></span></h3>

`int` · The smallest width the layout (and a resize) gives the element. 0 is no limit. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="modalwindowactiveshadetint"><span class="prop"><code>ModalWindowActiveShadeTint</code></span></h3>

`Color` · Static. The shade drawn over everything below the top modal window, `(0, 0, 0, 75)` by default. Always drawn, not a debug setting. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows. On an element without a style: its control's cursors when it is a part of one, otherwise `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#baseelement-cursor-properties))

<h3 id="name"><span class="prop"><code>Name</code></span></h3>

`string` · Read-only. The name given to the constructor, used by `GetElementByName`. ([in context](/docs/ui-base-element/#items-and-content-properties))

<h3 id="parent"><span class="prop"><code>Parent</code></span></h3>

`BaseElement` · Read-only. The element this one is in, null when it is not in one. ([in context](/docs/ui-base-element/#items-and-content-properties))

<h3 id="postdrawaction"><span class="prop"><code>PostDrawAction</code></span></h3>

`Action` · Runs after the element and its subtree are drawn, for example to restore what `PreDrawAction` changed. ([in context](/docs/ui-base-element/#appearance-properties))

<h3 id="predrawaction"><span class="prop"><code>PreDrawAction</code></span></h3>

`Action` · Runs before the element and its subtree are drawn, for example to change the sprite batch state. ([in context](/docs/ui-base-element/#appearance-properties))

<h3 id="pressedtint"><span class="prop"><code>PressedTint</code></span></h3>

`Color` · Static. The tint of a pressed element, `(128, 128, 0, 10)` by default. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="repeatclicks"><span class="dp"><code>RepeatClicks</code></span></h3>

`bool` · Raises `OnClick` on the press and repeatedly while the left button is held, instead of once on release. Off by default. ([in context](/docs/ui-base-element/#click-timing))

<h3 id="resizeareahalfwidth"><span class="dp"><code>ResizeAreaHalfWidth</code></span></h3>

`int` · How far the resize areas reach to each side of the edges, in units. 3 by default (`DefaultSettings.DefaultResizeAreaHalfWidth`); negative values are taken as 0. ([in context](/docs/ui-base-element/#resizing))

<h3 id="resizecontourcolor"><span class="dp"><code>ResizeContourColor</code></span></h3>

`Color` · The colour of the contour. `(50, 50, 50, 190)` by default (`DefaultSettings.DefaultResizeContourColor`); it fades and darkens with the element. ([in context](/docs/ui-base-element/#resizing))

<h3 id="resizewithelementcontour"><span class="dp"><code>ResizeWithElementContour</code></span></h3>

`bool` · Shows a contour while dragging and resizes the element once on release, instead of resizing it as the mouse moves. ([in context](/docs/ui-base-element/#resizing))

<h3 id="right"><span class="prop"><code>Right</code></span></h3>

`int` · Read-only. `Left + ActualWidth`. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="showactualsizerectangle"><span class="prop"><code>ShowActualSizeRectangle</code></span></h3>

`bool` · Outlines the element's `Bounds`, without clipping. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="showactualsizerectanglediagonals"><span class="prop"><code>ShowActualSizeRectangleDiagonals</code></span></h3>

`bool` · Adds the diagonals to the bounds outline. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="showhitrectangle"><span class="prop"><code>ShowHitRectangle</code></span></h3>

`bool` · Outlines the element's hit rectangle: its bounds as clipped by its parents. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="showhitrectanglediagonals"><span class="prop"><code>ShowHitRectangleDiagonals</code></span></h3>

`bool` · Adds the diagonals to the hit rectangle outline. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="showstatetint"><span class="prop"><code>ShowStateTint</code></span></h3>

`bool` · Static. Draws the state tints below over the elements. Off by default. ([in context](/docs/ui-base-element/#debug-helpers))

<h3 id="statedata"><span class="prop"><code>StateData</code></span></h3>

`ElementStateData` · Read-only. The state the element shows now and where it comes from. ([in context](/docs/ui-base-element/#mouse-and-states-properties))

<h3 id="texturespath"><span class="dp"><code>TexturesPath</code></span></h3>

`string` · A content folder with the element's textures, for example `UITextures/Button/`. A missing trailing path separator is added. ([in context](/docs/ui-base-element/#appearance-properties))

<h3 id="texturespresent"><span class="prop"><code>TexturesPresent</code></span></h3>

`bool` · Read-only. True when `TexturesPath` is set. ([in context](/docs/ui-base-element/#appearance-properties))

<h3 id="timebeforerepeatstartsms"><span class="dp"><code>TimeBeforeRepeatStartsMs</code></span></h3>

`int` · Milliseconds from the press to the first repeated click. 1000 by default; negative values are taken as 0. ([in context](/docs/ui-base-element/#click-timing))

<h3 id="timebetweenrepeatsms"><span class="dp"><code>TimeBetweenRepeatsMs</code></span></h3>

`int` · Milliseconds between the repeated clicks after the first one. 300 by default; negative values are taken as 0. ([in context](/docs/ui-base-element/#click-timing))

<h3 id="tooltip"><span class="prop"><code>ToolTip</code></span></h3>

`ToolTip` · Shown while the element is hovered, after the tooltip's delay. See [ToolTip](/docs/ui-controls/#tooltip). ([in context](/docs/ui-base-element/#tooltips-and-context-menus))

<h3 id="top"><span class="prop"><code>Top</code></span></h3>

`int` · Read-only. `Location.Y`. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="transparency"><span class="dp"><code>Transparency</code></span></h3>

`float` · From 0 (opaque, the default) to 1 (invisible); values outside are clamped. Applies to the element and its subtree, combined with the parents' transparency. ([in context](/docs/ui-base-element/#appearance-properties))

<h3 id="verticalalignment"><span class="dp"><code>VerticalAlignment</code></span></h3>

`VerticalAlignment` · Where the element sits in its slot vertically, and whether it stretches over it. The default is `Stretch`. ([in context](/docs/ui-base-element/#size-and-position-properties))

<h3 id="visibility"><span class="dp"><code>Visibility</code></span></h3>

`Visibility` · Whether the element is shown, hidden in its space or collapsed. The default is `Visible`. A hidden element loses the keyboard focus and any mouse state. ([in context](/docs/ui-base-element/#appearance-properties))

## Methods

<h3 id="acceptsitems"><span class="method"><code>AcceptsItems()</code></span></h3>

`AcceptsItems` · Protected virtual property, `true` by default. Return false and the item methods do nothing on the element.

<h3 id="actualheightchangedhandleroverride"><span class="method"><code>ActualHeightChangedHandlerOverride()</code></span></h3>

`ActualHeightChangedHandlerOverride(int height)` · The layout gave the element another height.

<h3 id="actualwidthchangedhandleroverride"><span class="method"><code>ActualWidthChangedHandlerOverride()</code></span></h3>

`ActualWidthChangedHandlerOverride(int width)` · The layout gave the element another width.

<h3 id="addchild"><span class="method"><code>AddChild()</code></span></h3>

`AddChild(BaseElement child, bool isSole = false, int insertIndex = -1, bool isVisualComponent = true)` · Protected. Adds a child; by default an own part, which the item methods leave alone and which is disposed when it is removed. `isSole` removes the other items first.

<h3 id="additem"><span class="method"><code>AddItem()</code></span></h3>

`AddItem(BaseElement item)` · Adds the item after the other children.

<h3 id="additemat"><span class="method"><code>AddItemAt()</code></span></h3>

`AddItemAt(BaseElement item, int index)` · Inserts the item at the index in `Children`. An index below 0 or above the count is ignored.

<h3 id="additemsrange"><span class="method"><code>AddItemsRange()</code></span></h3>

`AddItemsRange(IEnumerable<BaseElement> items)` · Adds the items in order after the other children.

<h3 id="additemsrangeat"><span class="method"><code>AddItemsRangeAt()</code></span></h3>

`AddItemsRangeAt(IEnumerable<BaseElement> items, int index)` · Inserts the items in order from the index; a null item takes no place.

<h3 id="applygeneralstyle"><span class="method"><code>ApplyGeneralStyle()</code></span></h3>

`ApplyGeneralStyle()` · Protected, of `GenericStyleAndMouseCursorsData<TStyle>`. Applies the general style over the framework defaults.

<h3 id="applystyle"><span class="method"><code>ApplyStyle()</code></span></h3>

`ApplyStyle(BaseStyle style, ValueSources valueSource)` · Protected. Applies the style's assigned properties to the element as the given value source.

<h3 id="applystyleoverride"><span class="method"><code>ApplyStyleOverride()</code></span></h3>

`ApplyStyleOverride()` · Protected, of `GenericStyleAndMouseCursorsData<TStyle>`. Applies the style override again.

<h3 id="arrange"><span class="method"><code>Arrange()</code></span></h3>

`Arrange(Rectangle slot)` · Gives the element its size and position in the slot: a stretched element takes the slot less its margins, the others keep their measured size and are placed by their margins and alignment.

<h3 id="arrangeat"><span class="method"><code>ArrangeAt()</code></span></h3>

`ArrangeAt(Point position)` · Places the element at a position its container chose, at its measured size; its margins and alignment are not applied.

`ArrangeAt(Rectangle bounds)` · Places the element at a position and size its container chose.

<h3 id="arrangecontent"><span class="method"><code>ArrangeContent()</code></span></h3>

`ArrangeContent()` · Protected virtual. Arranges the children inside `Bounds`, as described above.

<h3 id="clearitems"><span class="method"><code>ClearItems()</code></span></h3>

`ClearItems()` · Takes every item out without disposing them; the element's own parts stay.

<h3 id="clickhandleroverride"><span class="method"><code>ClickHandlerOverride()</code></span></h3>

`ClickHandlerOverride(BaseElement sender, MouseClickEventArgs e)` · Before `OnClick`.

<h3 id="cursorspropertychangedhandler"><span class="method"><code>CursorsPropertyChangedHandler()</code></span></h3>

`CursorsPropertyChangedHandler()` · Protected. Shows the element's current cursors again, after its cursor set changed.

<h3 id="detachchild"><span class="method"><code>DetachChild()</code></span></h3>

`DetachChild(BaseElement child)` · Protected. Takes a child out without disposing it, to add it again later.

<h3 id="detachchildren"><span class="method"><code>DetachChildren()</code></span></h3>

`DetachChildren()` · Protected. Takes every child out without disposing them.

`DetachChildren(Predicate<BaseElement> match)` · Protected. Takes the matching children out without disposing them.

<h3 id="dispose"><span class="method"><code>Dispose()</code></span></h3>

`Dispose()` · Marks the object disposed and runs `DisposeHandler` once; later calls do nothing.

<h3 id="disposehandler"><span class="method"><code>DisposeHandler()</code></span></h3>

`DisposeHandler()` · Protected override. The element's dispose (see [items and content](#items-and-content)); call the base when you override it.

<h3 id="doubleclickhandleroverride"><span class="method"><code>DoubleClickHandlerOverride()</code></span></h3>

`DoubleClickHandlerOverride(BaseElement sender, MouseClickEventArgs e)` · Before `OnDoubleClick`.

<h3 id="doubleclickintervalmspropertychangedhandleroverride"><span class="method"><code>DoubleClickIntervalMsPropertyChangedHandlerOverride()</code></span></h3>

`DoubleClickIntervalMsPropertyChangedHandlerOverride(int value)` · `DoubleClickIntervalMs` changed (after it was passed to the parts).

<h3 id="draw"><span class="method"><code>Draw()</code></span></h3>

`Draw()` · Draws the element, its children and the popups above them. The UI calls it on the root every frame, you don't call it yourself.

<h3 id="focus"><span class="method"><code>Focus()</code></span></h3>

`Focus()` · Gives the element the keyboard. Returns false when it can't take it: it is not in the tree, hidden or disabled.

<h3 id="foregroundcolorpropertychangedhandleroverride"><span class="method"><code>ForegroundColorPropertyChangedHandlerOverride()</code></span></h3>

`ForegroundColorPropertyChangedHandlerOverride(Color value)` · `ForegroundColor` changed.

<h3 id="genericstyleandmousecursorsdata"><span class="method"><code>GenericStyleAndMouseCursorsData()</code></span></h3>

`GenericStyleAndMouseCursorsData(string name = null)` · Protected. The same, for an element with a style.

<h3 id="getelementbyname"><span class="method"><code>GetElementByName()</code></span></h3>

`GetElementByName(string name)` · Finds an element by name below this one (its children first, then deeper, popups such as its tooltip included). Null when there is none.

<h3 id="gotfocushandleroverride"><span class="method"><code>GotFocusHandlerOverride()</code></span></h3>

`GotFocusHandlerOverride()` · The element got the keyboard.

<h3 id="hittestpropertychangedhandleroverride"><span class="method"><code>HitTestPropertyChangedHandlerOverride()</code></span></h3>

`HitTestPropertyChangedHandlerOverride(bool value)` · `HitTest` changed.

<h3 id="inheritstatepropertychangedhandleroverride"><span class="method"><code>InheritStatePropertyChangedHandlerOverride()</code></span></h3>

`InheritStatePropertyChangedHandlerOverride(InheritState value)` · `InheritState` changed.

<h3 id="invalidatearrange"><span class="method"><code>InvalidateArrange()</code></span></h3>

`InvalidateArrange()` · Asks for the element's children to be placed again; its size stays.

<h3 id="invalidatemeasure"><span class="method"><code>InvalidateMeasure()</code></span></h3>

`InvalidateMeasure()` · Asks for a new measure and arrange of the element: a setting of its own changed its size or its content's.

<h3 id="keydownhandleroverride"><span class="method"><code>KeyDownHandlerOverride()</code></span></h3>

`KeyDownHandlerOverride(KeyDownEventArgs e)` · A key reached the element, before `OnKeyDown`; set `e.Handled` for a key the element uses.

<h3 id="loadtextures"><span class="method"><code>LoadTextures()</code></span></h3>

`LoadTextures()` · Protected virtual. Called when `TexturesPath` changes; load the element's textures from the folder here and call the base.

<h3 id="locationchangedhandleroverride"><span class="method"><code>LocationChangedHandlerOverride()</code></span></h3>

`LocationChangedHandlerOverride(Point location)` · The element moved.

<h3 id="lostfocushandleroverride"><span class="method"><code>LostFocusHandlerOverride()</code></span></h3>

`LostFocusHandlerOverride()` · The element lost the keyboard. Focusing another element here (the next field of a form) works.

<h3 id="measure"><span class="method"><code>Measure()</code></span></h3>

`Measure(int slotWidth, int slotHeight)` · Measures the element for the slot its parent gives it (`-1`: a size the parent does not know yet): a stretched element takes the slot less its margins, a fixed one its desired size, the others fit their content.

<h3 id="measureat"><span class="method"><code>MeasureAt()</code></span></h3>

`MeasureAt(int width, int height)` · Measures the element at a size its container chose for it; along a side given as `-1` it has its own size (fixed, or fitted to its content).

<h3 id="measurecontent"><span class="method"><code>MeasureContent()</code></span></h3>

`MeasureContent(int width, int height)` · Protected virtual, returns `Point`. Measures the children and returns the content size, as described above.

<h3 id="mouseenterhandleroverride"><span class="method"><code>MouseEnterHandlerOverride()</code></span></h3>

`MouseEnterHandlerOverride()` · Before `OnMouseEnter`.

<h3 id="mouseleavehandleroverride"><span class="method"><code>MouseLeaveHandlerOverride()</code></span></h3>

`MouseLeaveHandlerOverride()` · Before `OnMouseLeave`.

<h3 id="removechild"><span class="method"><code>RemoveChild()</code></span></h3>

`RemoveChild(BaseElement child)` · Protected. Takes a child out: an own part is disposed, an item only detached.

<h3 id="removechildat"><span class="method"><code>RemoveChildAt()</code></span></h3>

`RemoveChildAt(int index)` · Protected. The same, by index in `Children`.

<h3 id="removeitem"><span class="method"><code>RemoveItem()</code></span></h3>

`RemoveItem(BaseElement item)` · Takes the item out without disposing it. Does nothing for a part of the element.

<h3 id="removeitemat"><span class="method"><code>RemoveItemAt()</code></span></h3>

`RemoveItemAt(int index)` · Takes the item at the index out without disposing it.

<h3 id="removeitemsrangeat"><span class="method"><code>RemoveItemsRangeAt()</code></span></h3>

`RemoveItemsRangeAt(int index, int count)` · Takes `count` items out from the index on (fewer when the children end first), without disposing them.

<h3 id="statechangedhandleroverride"><span class="method"><code>StateChangedHandlerOverride()</code></span></h3>

`StateChangedHandlerOverride(BaseElement sender, ElementStateData stateData)` · The shown state changed, before `OnStateChanged`.

<h3 id="style"><span class="method"><code>Style()</code></span></h3>

`Style` · Protected property of `GenericStyleAndMouseCursorsData<TStyle>`: the style override, or the general style.

<h3 id="textinputhandleroverride"><span class="method"><code>TextInputHandlerOverride()</code></span></h3>

`TextInputHandlerOverride(TextInputEventArgs e)` · Typed text reached the focused element.

<h3 id="timebeforerepeatstartsmspropertychangedhandleroverride"><span class="method"><code>TimeBeforeRepeatStartsMsPropertyChangedHandlerOverride()</code></span></h3>

`TimeBeforeRepeatStartsMsPropertyChangedHandlerOverride(int value)` · `TimeBeforeRepeatStartsMs` changed (after it was passed to the parts).

<h3 id="timebetweenrepeatsmspropertychangedhandleroverride"><span class="method"><code>TimeBetweenRepeatsMsPropertyChangedHandlerOverride()</code></span></h3>

`TimeBetweenRepeatsMsPropertyChangedHandlerOverride(int value)` · `TimeBetweenRepeatsMs` changed (after it was passed to the parts).

<h3 id="unsubscribeself"><span class="method"><code>UnsubscribeSelf()</code></span></h3>

`UnsubscribeSelf()` · Protected virtual. Called on dispose: release the element's subscriptions to other objects here.

<h3 id="visibilitychangedhandleroverride"><span class="method"><code>VisibilityChangedHandlerOverride()</code></span></h3>

`VisibilityChangedHandlerOverride(Visibility visibility)` · `Visibility` changed; called before the children hear of it.

<h3 id="visibilitypropertychangedhandleroverride"><span class="method"><code>VisibilityPropertyChangedHandlerOverride()</code></span></h3>

`VisibilityPropertyChangedHandlerOverride(Visibility value)` · `Visibility` changed; called after the children heard of it.

## Events

<h3 id="onclick"><span class="event"><code>OnClick</code></span></h3>

`(BaseElement sender, MouseClickEventArgs e)` · A mouse button pressed on the element is released over it (with `RepeatClicks`: on the press and while it is held). ([in context](/docs/ui-base-element/#mouse-and-states-events))

<h3 id="ondisposed"><span class="event"><code>OnDisposed</code></span></h3>

`(BaseElement sender)` · The element was disposed. Raised once, at the end of `Dispose()`; the handlers are let go afterwards. ([in context](/docs/ui-base-element/#items-and-content-events))

<h3 id="ondoubleclick"><span class="event"><code>OnDoubleClick</code></span></h3>

`(BaseElement sender, MouseClickEventArgs e)` · The left button is pressed a second time within `DoubleClickIntervalMs`. Not raised by an element with `RepeatClicks`. ([in context](/docs/ui-base-element/#mouse-and-states-events))

<h3 id="ondraganddropstart"><span class="event"><code>OnDragAndDropStart</code></span></h3>

`(BaseElement draggedElement)` · A drag and drop of this element (as the `DragTarget`) starts; the argument is the element whose `DragType` started it. ([in context](/docs/ui-base-element/#drag-and-drop-properties))

<h3 id="ondrop"><span class="event"><code>OnDrop</code></span></h3>

`(BaseElement draggedElement, BaseElement dragAndDropDestination)` · A dragged element is released over this element and its predicate allowed it. ([in context](/docs/ui-base-element/#drag-and-drop-properties))

<h3 id="ondropdenied"><span class="event"><code>OnDropDenied</code></span></h3>

`(BaseElement draggedElement, BaseElement dragAndDropDestination)` · A dragged element is released over this element and the drop is denied. ([in context](/docs/ui-base-element/#drag-and-drop-properties))

<h3 id="onkeydown"><span class="event"><code>OnKeyDown</code></span></h3>

`(BaseElement sender, KeyDownEventArgs e)` · A key is pressed while the element, or an element inside it that left the key unhandled, has the keyboard. ([in context](/docs/ui-base-element/#keyboard-and-focus-events))

<h3 id="onmouseenter"><span class="event"><code>OnMouseEnter</code></span></h3>

`(BaseElement sender)` · The element starts taking the mouse. ([in context](/docs/ui-base-element/#mouse-and-states-events))

<h3 id="onmouseleave"><span class="event"><code>OnMouseLeave</code></span></h3>

`(BaseElement sender)` · The element stops taking the mouse: the mouse left, moved onto a child that takes it, or the element got disabled or hidden. ([in context](/docs/ui-base-element/#mouse-and-states-events))

<h3 id="onstatechanged"><span class="event"><code>OnStateChanged</code></span></h3>

`(BaseElement sender, ElementStateData e)` · The state the element shows changes, its own or one it takes. Raised again for every change of the mouse buttons while the element is pressed. ([in context](/docs/ui-base-element/#mouse-and-states-events))
