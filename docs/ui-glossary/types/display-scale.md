---
layout: docs
legend: [method]
title: "Glossary: DisplayScale"
description: "The members of DisplayScale, in alphabetical order."
---

Reads the Windows display scale of the monitor a window is on. Without the awareness call, Windows reports 96 DPI.

A static class. The [quick start guide](/docs/ui/#displayscale) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Fields

<h3 id="defaultdpi"><code>DefaultDpi</code> <a class="ctx" href="/docs/ui/#displayscale" title="DefaultDpi in context on the quick start guide" aria-label="DefaultDpi in context on the quick start guide">🠆</a></h3>

`int` · Static. 96, the DPI of a monitor at 100 %.

## Methods

<h3 id="declarepermonitorawareness"><span class="method"><code>DeclarePerMonitorAwareness()</code></span> <a class="ctx" href="/docs/ui/#displayscale" title="DeclarePerMonitorAwareness() in context on the quick start guide" aria-label="DeclarePerMonitorAwareness() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/display-scale/#declarepermonitorawareness">`DeclarePerMonitorAwareness()`</a> · Static. Declares the process per-monitor DPI aware. Call it before the game creates its window. Returns `false` when Windows doesn't accept it: the awareness was declared already, by an application manifest or an earlier call, or Windows is older than Windows 10 1703.

<h3 id="dpiof"><span class="method"><code>DpiOf()</code></span> <a class="ctx" href="/docs/ui/#displayscale" title="DpiOf() in context on the quick start guide" aria-label="DpiOf() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/display-scale/#dpiof">`DpiOf(GameWindow window)`</a> · Static. The DPI of the monitor under the middle of the window's client area. 96 when it can't be read.

<a class="ref method" href="/docs/ui-glossary/types/display-scale/#dpiof">`DpiOf(Rectangle screenBounds)`</a> · Static. The same for a rectangle in screen coordinates, using the nearest monitor when none is under it.

<h3 id="scaleof"><span class="method"><code>ScaleOf()</code></span> <a class="ctx" href="/docs/ui/#displayscale" title="ScaleOf() in context on the quick start guide" aria-label="ScaleOf() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/display-scale/#scaleof">`ScaleOf(GameWindow window)`</a> · Static. The display scale as a UI scale: the DPI divided by 96, so 1.5 at 150 %.
