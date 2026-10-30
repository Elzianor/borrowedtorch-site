---
layout: docs
legend: [prop, dp, method]
title: "Glossary: BorrowedTorchUI"
description: "The members of BorrowedTorchUI, in alphabetical order."
---

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

A class. The [quick start guide](/docs/ui/#borrowedtorchui) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="displayscalefactor"><span class="prop"><code>DisplayScaleFactor</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="DisplayScaleFactor in context on the quick start guide" aria-label="DisplayScaleFactor in context on the quick start guide">🠆</a></h3>

`float` · What the display scale is multiplied with while following: a UI size setting of the game. 1 by default, a positive number. Set while following, it applies at once.

<h3 id="drawtransform"><span class="prop"><code>DrawTransform</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="DrawTransform in context on the quick start guide" aria-label="DrawTransform in context on the quick start guide">🠆</a></h3>

`Matrix` · Read-only. The matrix the UI draws with. Draw code that begins its own sprite batch inside the UI passes it to draw in logical units.

<h3 id="elementundermouse"><span class="prop"><code>ElementUnderMouse</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="ElementUnderMouse in context on the quick start guide" aria-label="ElementUnderMouse in context on the quick start guide">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Read-only. <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#elementat">`ElementAt`</a> where the mouse is. See [finding the element at a point](/docs/ui/#finding-the-element-at-a-point).

<h3 id="exceptionhandler"><span class="prop"><code>ExceptionHandler</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="ExceptionHandler in context on the quick start guide" aria-label="ExceptionHandler in context on the quick start guide">🠆</a></h3>

`Action<Exception>` · Gets the exceptions thrown inside <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#update">`Update`</a>, <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#draw">`Draw`</a> and the handling of text input. Without a handler they are rethrown.

<h3 id="focusedelement"><span class="prop"><code>FocusedElement</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="FocusedElement in context on the quick start guide" aria-label="FocusedElement in context on the quick start guide">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Read-only. The element that has the keyboard, `null` when none has it. See [keyboard and focus](/docs/ui-base-element/#keyboard-and-focus).

<h3 id="followsbackbuffer"><span class="prop"><code>FollowsBackBuffer</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="FollowsBackBuffer in context on the quick start guide" aria-label="FollowsBackBuffer in context on the quick start guide">🠆</a></h3>

`bool` · Whether the UI takes the back buffer's size by itself, at the start of every <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#update">`Update`</a>. On by default. Turn it off for a UI drawn into a render target of its own size. Turned on again, it takes the back buffer's size at the next update.

<h3 id="followsdisplayscale"><span class="prop"><code>FollowsDisplayScale</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="FollowsDisplayScale in context on the quick start guide" aria-label="FollowsDisplayScale in context on the quick start guide">🠆</a></h3>

`bool` · Whether <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#scale">`Scale`</a> follows the display scale of the window's monitor, times <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#displayscalefactor">`DisplayScaleFactor`</a>. Turned on, it sets the scale at once and then follows the window to other monitors. A scale set by hand stays until the DPI changes. Off by default. Needs the window constructor, otherwise turning it on throws.

<h3 id="haskeyboard"><span class="prop"><code>HasKeyboard</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="HasKeyboard in context on the quick start guide" aria-label="HasKeyboard in context on the quick start guide">🠆</a></h3>

`bool` · Read-only. Whether an element has the keyboard (see <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#focusedelement">`FocusedElement`</a>). A game leaves the keys to the UI while it is true, so typing in a text box doesn't also move the player.

<h3 id="hasmouse"><span class="prop"><code>HasMouse</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="HasMouse in context on the quick start guide" aria-label="HasMouse in context on the quick start guide">🠆</a></h3>

`bool` · Read-only. Whether the UI has the mouse: it is over an element that takes the mouse (the root doesn't count), the buttons pressed on an element are still held, or a modal window is shown. A game acts on the mouse itself only while it is false, so a click on a button doesn't also pick what is behind it. Worked out from the last update's layout, so read it after <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#update">`Update`</a>. See [sharing the mouse and keys](/docs/ui/#sharing-the-mouse-and-keys-with-the-game).

<h3 id="rootelement"><span class="prop"><code>RootElement</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="RootElement in context on the quick start guide" aria-label="RootElement in context on the quick start guide">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/root-element/">`RootElement`</a> · Read-only. The element at the top of the tree, the size of the screen. See [the root element](/docs/ui-base-element/#the-root-element).

<h3 id="scale"><span class="prop"><code>Scale</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="Scale in context on the quick start guide" aria-label="Scale in context on the quick start guide">🠆</a></h3>

`float` · How large one logical unit is on screen, see [display scaling](/docs/ui/#display-scaling). Between <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/#minscale">`MinScale`</a> (0.25) and <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/#maxscale">`MaxScale`</a> (8).

## Fields

<h3 id="maxscale"><code>MaxScale</code></h3>

`float`

<h3 id="minscale"><code>MinScale</code></h3>

`float`

## Methods

<h3 id="borrowedtorchui"><span class="method"><code>BorrowedTorchUI()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="BorrowedTorchUI() in context on the quick start guide" aria-label="BorrowedTorchUI() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#borrowedtorchui">`BorrowedTorchUI(GraphicsDevice graphicsDevice, ContentManager contentManager, SpriteBatch spriteBatch, GameWindow window)`</a> · Creates the UI over the back buffer's size, with the text and keys of the window. The sprite batch is the one the UI draws with; the content manager loads the textures named by <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a>. Disposing the UI unsubscribes from the window.

| Parameter | Type | Description |
| --- | --- | --- |
| `graphicsDevice` | `GraphicsDevice` | The game's graphics device, which the UI draws with. |
| `contentManager` | `ContentManager` | The content manager the UI loads pictures with: the <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> textures and <a class="ref" href="/docs/ui-glossary/types/source-data/">`SourceData`</a> paths. |
| `spriteBatch` | `SpriteBatch` | The sprite batch the UI draws with. |
| `window` | `GameWindow` | The game window: the UI takes typed text and keys from it, and reads the display scale of its monitor for <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#followsdisplayscale">`FollowsDisplayScale`</a>. |

<span class="method"><code><a href="/docs/ui-glossary/types/borrowed-torch-ui/#borrowedtorchui">BorrowedTorchUI</a>(GraphicsDevice graphicsDevice, ContentManager contentManager, SpriteBatch spriteBatch, <a href="/docs/ui-glossary/types/i-text-input-events/">ITextInputEvents</a> textInputEvents)</code></span> · The same, with the text and keys of a source of your own, for a UI hosted outside a game window. The UI doesn't dispose the source.

| Parameter | Type | Description |
| --- | --- | --- |
| `graphicsDevice` | `GraphicsDevice` | The game's graphics device, which the UI draws with. |
| `contentManager` | `ContentManager` | The content manager the UI loads pictures with: the <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a> textures and <a class="ref" href="/docs/ui-glossary/types/source-data/">`SourceData`</a> paths. |
| `spriteBatch` | `SpriteBatch` | The sprite batch the UI draws with. |
| `textInputEvents` | <a class="ref" href="/docs/ui-glossary/types/i-text-input-events/">`ITextInputEvents`</a> | The source of typed text and keys, such as a <a class="ref" href="/docs/ui-glossary/types/game-window-text-input-events/">`GameWindowTextInputEvents`</a>. The UI doesn't dispose it. |

<h3 id="addanimation"><span class="method"><code>AddAnimation()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="AddAnimation() in context on the quick start guide" aria-label="AddAnimation() in context on the quick start guide">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/borrowed-torch-ui/#addanimation">AddAnimation</a>(<a href="/docs/ui-glossary/types/base-animation/">BaseAnimation</a> animation)</code></span> · Starts updating an animation, see [animations](/docs/ui-styles/#animations).

| Parameter | Type | Description |
| --- | --- | --- |
| `animation` | <a class="ref" href="/docs/ui-glossary/types/base-animation/">`BaseAnimation`</a> | The animation to update with the UI; it plays once it is started. |

<h3 id="addelementtoroot"><span class="method"><code>AddElementToRoot()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="AddElementToRoot() in context on the quick start guide" aria-label="AddElementToRoot() in context on the quick start guide">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/borrowed-torch-ui/#addelementtoroot">AddElementToRoot</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> element)</code></span> · Adds an element to the root.

| Parameter | Type | Description |
| --- | --- | --- |
| `element` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element to add to the root. |

<h3 id="applygamewindowsize"><span class="method"><code>ApplyGameWindowSize()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="ApplyGameWindowSize() in context on the quick start guide" aria-label="ApplyGameWindowSize() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#applygamewindowsize">`ApplyGameWindowSize(int width, int height)`</a> · Lays the UI out over a screen size in device pixels. A size of 0, such as a minimized window's, is ignored. With <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#followsbackbuffer">`FollowsBackBuffer`</a> on, the size stays until the back buffer changes.

| Parameter | Type | Description |
| --- | --- | --- |
| `width` | `int` | The screen width, in device pixels. |
| `height` | `int` | The screen height, in device pixels. |

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="Dispose() in context on the quick start guide" aria-label="Dispose() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#dispose">`Dispose()`</a> · Disposes the root and forgets the shared state, so a new UI can be created.

<h3 id="draw"><span class="method"><code>Draw()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="Draw() in context on the quick start guide" aria-label="Draw() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#draw">`Draw()`</a> · Draws the whole tree with the sprite batch, beginning and ending it itself.

<h3 id="elementat"><span class="method"><code>ElementAt()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="ElementAt() in context on the quick start guide" aria-label="ElementAt() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#elementat">`ElementAt(Point position)`</a> · The element the mouse would be over at the position, by the rules the UI hovers by: the open context menu and drop-down first, then the tree from the top down (windows above their siblings, children by <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#zindex">`ZIndex`</a>); only visible elements that take the mouse and aren't cropped away; while a modal window is shown, only its elements and the root around it. The root where nothing else takes the mouse, `null` outside of the screen. Nothing is hovered by it. It can be a control's part, such as a list's row or a slider's thumb: walk up the <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#parent">`Parent`</a>s to the element you want. See [finding the element at a point](/docs/ui/#finding-the-element-at-a-point).

| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `Point` | The position, in logical units (see <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#scale">`Scale`</a>). |

<h3 id="getelementbyname"><span class="method"><code>GetElementByName()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="GetElementByName() in context on the quick start guide" aria-label="GetElementByName() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#getelementbyname">`GetElementByName(string name)`</a> · Finds an element anywhere in the tree by the name given to its constructor, `null` if there is none.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a> to look for. |

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#getelementbyname">`GetElementByName<T>(string name)`</a> · The same, `null` also when the element is not a `T`.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a> to look for. |

<h3 id="removeanimation"><span class="method"><code>RemoveAnimation()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="RemoveAnimation() in context on the quick start guide" aria-label="RemoveAnimation() in context on the quick start guide">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/borrowed-torch-ui/#removeanimation">RemoveAnimation</a>(<a href="/docs/ui-glossary/types/base-animation/">BaseAnimation</a> animation)</code></span> · Stops updating an animation. It keeps its state, and adding it again continues it.

| Parameter | Type | Description |
| --- | --- | --- |
| `animation` | <a class="ref" href="/docs/ui-glossary/types/base-animation/">`BaseAnimation`</a> | The animation to stop updating. |

<h3 id="setdefaultmousecursorsset"><span class="method"><code>SetDefaultMouseCursorsSet()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="SetDefaultMouseCursorsSet() in context on the quick start guide" aria-label="SetDefaultMouseCursorsSet() in context on the quick start guide">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/borrowed-torch-ui/#setdefaultmousecursorsset">SetDefaultMouseCursorsSet</a>(<a href="/docs/ui-glossary/types/mouse-cursors-set/">MouseCursorsSet</a> mouseCursorsSet)</code></span> · Sets the cursors every element uses unless it has its own, see [mouse cursors](/docs/ui-styles/#mouse-cursors).

| Parameter | Type | Description |
| --- | --- | --- |
| `mouseCursorsSet` | <a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> | The cursors every element uses unless it has its own. |

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="Update() in context on the quick start guide" aria-label="Update() in context on the quick start guide">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#update">`Update(GameTime gameTime)`</a> · Runs timers and animations, lays out what changed, and handles the mouse. Poll the input before it.

| Parameter | Type | Description |
| --- | --- | --- |
| `gameTime` | `GameTime` | The game's time, from `Game.Update`. |
