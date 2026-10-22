---
layout: docs
title: "Glossary: ViewPort"
description: The properties, methods and events of ViewPort, in alphabetical order.
---

Reserves a rectangle in the layout and runs your own drawing code inside it, for a 3D scene, a minimap or any other render embedded in the UI.

`ViewPort` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [images page](/docs/ui-images/#viewport) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="devicebounds"><span class="prop"><code>DeviceBounds</code></span></h3>

`Rectangle` · Read-only. The view port's bounds in device pixels, the rectangle `GraphicsDevice.Viewport` is set to. ([in context](/docs/ui-images/#viewport-properties))

<h3 id="drawinstructions"><span class="prop"><code>DrawInstructions</code></span></h3>

`Action` · Your drawing code, run every frame inside the view port as described above. ([in context](/docs/ui-images/#viewport-properties))

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Static. The cursors of every element of this style type; null (the default) falls back to `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span></h3>

`ViewPortStyle` · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="maxdepth"><span class="dp"><code>MaxDepth</code></span></h3>

`float` · The maximum depth of the viewport's depth range. Defaults to `DefaultSettings.DefaultMaxDepth` (`1`). ([in context](/docs/ui-images/#viewport-properties))

<h3 id="mindepth"><span class="dp"><code>MinDepth</code></span></h3>

`float` · The minimum depth of the viewport's depth range. Defaults to `DefaultSettings.DefaultMinDepth` (`0`). ([in context](/docs/ui-images/#viewport-properties))

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else `DefaultMouseCursorsSet`. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span></h3>

`MouseCursorsSet` · The cursors of this element only, passed on to its parts that have none of their own. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span></h3>

`ViewPortStyle` · A style for this element only, applied over the general style. Setting it to null takes its values back out. ([in context](/docs/ui-base-element/#genericstyleandmousecursorsdata-properties))

<h3 id="visiblerectangle"><span class="prop"><code>VisibleRectangle</code></span></h3>

`Rectangle` · Read-only. The part of the view port that is on screen, in logical units like the element's bounds: smaller than the view port where a parent crops it. The scissor rectangle is set to its device pixels. ([in context](/docs/ui-images/#viewport-properties))

## Methods

<h3 id="draw"><span class="method"><code>Draw()</code></span></h3>

`Draw()` · Draws the element, its children and the popups above them. The UI calls it on the root every frame, you don't call it yourself.
