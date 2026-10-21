---
layout: docs
title: UI
description: Create UI elements, set them up and lay them out, style them, and respond to player input.
status: draft
---

## Overview

<p class="todo">What the UI system is for (menus, HUD, editor overlays?), how it is drawn, and how it fits into a scene.</p>

## Creating a UI element

<p class="todo">The smallest example: create one element and put it on screen. Say where UI elements live (a screen, a canvas, an entity?).</p>

```csharp
// TODO: create a button, give it text, and add it to the screen
```

### Creating elements in the editor

<p class="todo">The same thing in the editor, step by step, with a screenshot.</p>

## Setting up an element

### Position and size

<p class="todo">Coordinate space, units, and how size is set (fixed, relative, fit to content).</p>

### Anchors and pivots

<p class="todo">How elements stay in place when the window resizes.</p>

### Padding and margins

<p class="todo">Spacing inside and around an element.</p>

## Layout containers

<p class="todo">Containers that arrange their children (rows, columns, grids), and when to use each.</p>

```csharp
// TODO: a vertical list of three buttons with even spacing
```

## Styling

<p class="todo">Colours, fonts, textures and nine-slice backgrounds; whether styles can be shared between elements.</p>

## Handling input

### Clicks and hover

<p class="todo">Subscribing to events, and hover / pressed / disabled states.</p>

```csharp
// TODO: react to a button click
```

### Focus, keyboard and gamepad

<p class="todo">Focus order and navigating menus without a mouse.</p>

## Built-in elements

<p class="todo">A short table of the built-in elements (e.g. label, button, image, panel, slider), one line each on what it is for.</p>

## Custom elements

<p class="todo">How to make your own element type: what to inherit from, what to override, and how it draws.</p>

## Example: a pause menu

<p class="todo">A complete, copy-pasteable example that ties the article together.</p>

```csharp
// TODO: pause menu with Resume, Settings and Quit
```
