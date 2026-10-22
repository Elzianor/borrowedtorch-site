---
layout: docs
legend: [prop, dp, method]
title: "Glossary: BorrowedTorchUI"
description: "The members of BorrowedTorchUI, in alphabetical order."
---

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

A class. The [quick start guide](/docs/ui/#borrowedtorchui) shows it in context.

Names are coloured by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain colour.

## Properties

<h3 id="displayscalefactor"><span class="prop"><code>DisplayScaleFactor</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="DisplayScaleFactor in context on the quick start guide" aria-label="DisplayScaleFactor in context on the quick start guide">→</a></h3>

`float` · What the display scale is multiplied with while following: a UI size setting of the game. 1 by default, a positive number. Set while following, it applies at once.

<h3 id="drawtransform"><span class="prop"><code>DrawTransform</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="DrawTransform in context on the quick start guide" aria-label="DrawTransform in context on the quick start guide">→</a></h3>

`Matrix` · Read-only. The matrix the UI draws with. Draw code that begins its own sprite batch inside the UI passes it to draw in logical units.

<h3 id="exceptionhandler"><span class="prop"><code>ExceptionHandler</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="ExceptionHandler in context on the quick start guide" aria-label="ExceptionHandler in context on the quick start guide">→</a></h3>

`Action<Exception>` · Gets the exceptions thrown inside <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#update">`Update`</a>, <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#draw">`Draw`</a> and the handling of text input. Without a handler they are rethrown.

<h3 id="followsbackbuffer"><span class="prop"><code>FollowsBackBuffer</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="FollowsBackBuffer in context on the quick start guide" aria-label="FollowsBackBuffer in context on the quick start guide">→</a></h3>

`bool` · Whether the UI takes the back buffer's size by itself, at the start of every <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#update">`Update`</a>. On by default. Turn it off for a UI drawn into a render target of its own size. Turned on again, it takes the back buffer's size at the next update.

<h3 id="followsdisplayscale"><span class="prop"><code>FollowsDisplayScale</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="FollowsDisplayScale in context on the quick start guide" aria-label="FollowsDisplayScale in context on the quick start guide">→</a></h3>

`bool` · Whether <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#scale">`Scale`</a> follows the display scale of the window's monitor, times <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#displayscalefactor">`DisplayScaleFactor`</a>. Turned on, it sets the scale at once and then follows the window to other monitors. A scale set by hand stays until the DPI changes. Off by default. Needs the window constructor, otherwise turning it on throws.

<h3 id="rootelement"><span class="prop"><code>RootElement</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="RootElement in context on the quick start guide" aria-label="RootElement in context on the quick start guide">→</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/root-element/">`RootElement`</a> · Read-only. The element at the top of the tree, the size of the screen. See [the root element](/docs/ui-base-element/#the-root-element).

<h3 id="scale"><span class="prop"><code>Scale</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="Scale in context on the quick start guide" aria-label="Scale in context on the quick start guide">→</a></h3>

`float` · How large one logical unit is on screen, see [display scaling](#display-scaling). Between <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/#minscale">`MinScale`</a> (0.25) and <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/#maxscale">`MaxScale`</a> (8).

## Fields

<h3 id="maxscale"><code>MaxScale</code></h3>

`float`

<h3 id="minscale"><code>MinScale</code></h3>

`float`

## Methods

<h3 id="borrowedtorchui"><span class="method"><code>BorrowedTorchUI()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="BorrowedTorchUI() in context on the quick start guide" aria-label="BorrowedTorchUI() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#borrowedtorchui">`BorrowedTorchUI(GraphicsDevice graphicsDevice, ContentManager contentManager, SpriteBatch spriteBatch, GameWindow window)`</a> · Creates the UI over the back buffer's size, with the text and keys of the window. The sprite batch is the one the UI draws with; the content manager loads the colour picker's pointer and the textures named by <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a>. Disposing the UI unsubscribes from the window.

<span class="method"><code><a href="/docs/ui-glossary/types/borrowed-torch-ui/#borrowedtorchui">BorrowedTorchUI</a>(GraphicsDevice graphicsDevice, ContentManager contentManager, SpriteBatch spriteBatch, <a href="/docs/ui-glossary/types/i-text-input-events/">ITextInputEvents</a> textInputEvents)</code></span> · The same, with the text and keys of a source of your own, for a UI hosted outside a game window. The UI doesn't dispose the source.

<h3 id="addanimation"><span class="method"><code>AddAnimation()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="AddAnimation() in context on the quick start guide" aria-label="AddAnimation() in context on the quick start guide">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/borrowed-torch-ui/#addanimation">AddAnimation</a>(<a href="/docs/ui-glossary/types/base-animation/">BaseAnimation</a> animation)</code></span> · Starts updating an animation, see [animations](/docs/ui-styles/#animations).

<h3 id="addelementtoroot"><span class="method"><code>AddElementToRoot()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="AddElementToRoot() in context on the quick start guide" aria-label="AddElementToRoot() in context on the quick start guide">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/borrowed-torch-ui/#addelementtoroot">AddElementToRoot</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> element)</code></span> · Adds an element to the root.

<h3 id="applygamewindowsize"><span class="method"><code>ApplyGameWindowSize()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="ApplyGameWindowSize() in context on the quick start guide" aria-label="ApplyGameWindowSize() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#applygamewindowsize">`ApplyGameWindowSize(int width, int height)`</a> · Lays the UI out over a screen size in device pixels. A size of 0, such as a minimised window's, is ignored. With <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#followsbackbuffer">`FollowsBackBuffer`</a> on, the size stays until the back buffer changes.

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="Dispose() in context on the quick start guide" aria-label="Dispose() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#dispose">`Dispose()`</a> · Disposes the root and forgets the shared state, so a new UI can be created.

<h3 id="draw"><span class="method"><code>Draw()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="Draw() in context on the quick start guide" aria-label="Draw() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#draw">`Draw()`</a> · Draws the whole tree with the sprite batch, beginning and ending it itself.

<h3 id="getelementbyname"><span class="method"><code>GetElementByName()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="GetElementByName() in context on the quick start guide" aria-label="GetElementByName() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#getelementbyname">`GetElementByName(string name)`</a> · Finds an element anywhere in the tree by the name given to its constructor, `null` if there is none.

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#getelementbyname">`GetElementByName<T>(string name)`</a> · The same, `null` also when the element is not a `T`.

<h3 id="removeanimation"><span class="method"><code>RemoveAnimation()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="RemoveAnimation() in context on the quick start guide" aria-label="RemoveAnimation() in context on the quick start guide">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/borrowed-torch-ui/#removeanimation">RemoveAnimation</a>(<a href="/docs/ui-glossary/types/base-animation/">BaseAnimation</a> animation)</code></span> · Stops updating an animation. It keeps its state, and adding it again continues it.

<h3 id="setdefaultmousecursorsset"><span class="method"><code>SetDefaultMouseCursorsSet()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="SetDefaultMouseCursorsSet() in context on the quick start guide" aria-label="SetDefaultMouseCursorsSet() in context on the quick start guide">→</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/borrowed-torch-ui/#setdefaultmousecursorsset">SetDefaultMouseCursorsSet</a>(<a href="/docs/ui-glossary/types/mouse-cursors-set/">MouseCursorsSet</a> mouseCursorsSet)</code></span> · Sets the cursors every element uses unless it has its own, see [mouse cursors](/docs/ui-styles/#mouse-cursors).

<h3 id="update"><span class="method"><code>Update()</code></span> <a class="ctx" href="/docs/ui/#borrowedtorchui" title="Update() in context on the quick start guide" aria-label="Update() in context on the quick start guide">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#update">`Update(GameTime gameTime)`</a> · Runs timers and animations, lays out what changed, and handles the mouse. Poll the input before it.
