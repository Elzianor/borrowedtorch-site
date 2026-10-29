---
layout: docs
legend: [prop, dp, method, event]
title: "UI: quick start guide"
description: Set up BorrowedTorch.UI in a MonoGame game, lay elements out, and find your way around the UI pages.
---

BorrowedTorch.UI is the UI framework of Kindling, built for MonoGame. You build the UI from elements (labels, buttons,
lists, windows and more) arranged in a tree. Elements are laid out the way WPF lays them out, with margins,
alignments and sizes that are fixed, stretched or fitted to their content. Every property can be set in code, by a
style, or bound to a view model, and the whole tree is drawn with one `SpriteBatch`.

These pages cover the library from setup to every public type:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/ui/) (this page) | Installing, creating the UI in a game, display scaling, how sizes and alignment work, a complete pause menu |
| [Base element](/docs/ui-base-element/) | What every element has: size, appearance, items, mouse, keyboard, resizing, and writing your own element |
| [Layout elements](/docs/ui-layout/) | Stack panels, grids, scrolling, borders, separators, windows and tabs |
| [Controls](/docs/ui-controls/) | Buttons, check boxes, sliders, progress bars, tooltips and the color picker |
| [Lists and menus](/docs/ui-lists/) | List boxes, combo boxes, tree views and context menus |
| [Text](/docs/ui-text/) | Labels, rich text boxes, text input and fonts |
| [Images and drawing](/docs/ui-images/) | Images, stencils, view ports for your own drawing, and drag and drop |
| [Styles, bindings and animation](/docs/ui-styles/) | Styles, mouse cursors, default settings, dependency properties, view model bindings and animations |
| [Glossary](/docs/ui-glossary/) | Every element with its properties and methods in alphabetical order, one page per element |

Screenshots on these pages are real renders of the snippets next to them, drawn with the theme shown on the
[styles page](/docs/ui-styles/#the-theme-of-these-pages).

## Installing

Add the package to your MonoGame project:

```shell
dotnet add package BorrowedTorch.UI
```

| Requirement | Version |
| --- | --- |
| .NET | 10, Windows (`net10.0-windows10.0.19041.0`, the text boxes use the Windows clipboard) |
| MonoGame | 3.8.4 or later, DesktopGL or WindowsDX: your game references the platform package, the UI doesn't pick one for you |
| Input | [`BorrowedTorch.MonoInput`](/docs/monoinput/) 2.0.1, installed with the UI |

The package also brings the default font (UbuntuMono) and the color picker's pointer texture. They are copied to
`Content/Fonts` and `Content/Textures` next to your executable, so keep your `ContentManager.RootDirectory` set to
`Content`.

## Setting up the UI

Create the UI once the `GraphicsDevice` exists, give it the game window, and call `Update` and <a class="ref method" href="/docs/ui-glossary/elements/base-element/#draw">`Draw`</a> every frame. The
UI takes care of the window by itself:

- **Text and keys.** Typed text and key presses come from the window's `TextInput` and `KeyDown` events.
- **Size.** At the start of every `Update`, the UI compares the back buffer with the size it saw last. When the window
  was resized, or the game changed the back buffer, it lays itself out over the new size.

Disposing the UI unsubscribes it from the window. One thing stays with your game:

- **Input.** The game polls the input. Call `KeyboardManager.Update()` and `MouseManager.Update()` from
  [BorrowedTorch.MonoInput](/docs/monoinput/#updating-every-frame) once per frame, before the UI's `Update`. The UI reads the same managers, so polling them a
  second time in a frame would lose presses.

```csharp
using BorrowedTorch.MonoInput.Inputs.Keyboard;
using BorrowedTorch.MonoInput.Inputs.Mouse;
using BorrowedTorch.UI;
using BorrowedTorch.UI.Elements;

public class MyGame : Game
{
    private readonly GraphicsDeviceManager _graphics;
    private SpriteBatch _spriteBatch;
    private BorrowedTorchUI _ui;

    public MyGame()
    {
        _graphics = new GraphicsDeviceManager(this);
        Content.RootDirectory = "Content";
        IsMouseVisible = true;
        Window.AllowUserResizing = true;
    }

    protected override void LoadContent()
    {
        _spriteBatch = new SpriteBatch(GraphicsDevice);

        _ui = new BorrowedTorchUI(GraphicsDevice, Content, _spriteBatch, Window)
        {
            ExceptionHandler = e => Console.Error.WriteLine(e)
        };

        // build the UI here, see "Your first elements" below
    }

    protected override void Update(GameTime gameTime)
    {
        KeyboardManager.Update();
        MouseManager.Update();

        _ui.Update(gameTime);
        base.Update(gameTime);
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.Black);
        _ui.Draw();
        base.Draw(gameTime);
    }

    protected override void UnloadContent()
    {
        _ui.Dispose();
        _spriteBatch.Dispose();
    }
}
```

The framework keeps its state in static fields, so only one <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/">`BorrowedTorchUI`</a> exists at a time. Creating a second one
throws: dispose the first one before. Disposing the UI detaches the elements you added to the root but doesn't
dispose them, so dispose the ones that hold resources yourself.

Two cases need more than the window:

- **A UI drawn into a render target of its own size.** Set `FollowsBackBuffer` to `false` and give the size with
  `ApplyGameWindowSize`. With following on, a size you give stays until the back buffer changes.
- **A UI hosted outside a game window**, such as a WPF editor or a test. Pass your own <a class="ref" href="/docs/ui-glossary/types/i-text-input-events/">`ITextInputEvents`</a> instead of
  the window. <a class="ref" href="/docs/ui-glossary/types/game-window-text-input-events/">`GameWindowTextInputEvents`</a> is the adapter the window constructor uses, if you need one by hand.

### BorrowedTorchUI

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>.

| Member | Description |
| --- | --- |
| <span class="method">`BorrowedTorchUI(GraphicsDevice graphicsDevice, ContentManager contentManager, SpriteBatch spriteBatch, GameWindow window)`</span> | Creates the UI over the back buffer's size, with the text and keys of the window. The sprite batch is the one the UI draws with; the content manager loads the color picker's pointer and the textures named by <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#texturespath">`TexturesPath`</a>. Disposing the UI unsubscribes from the window. |
| <span class="method">`BorrowedTorchUI(GraphicsDevice graphicsDevice, ContentManager contentManager, SpriteBatch spriteBatch, ITextInputEvents textInputEvents)`</span> | The same, with the text and keys of a source of your own, for a UI hosted outside a game window. The UI doesn't dispose the source. |
| <span class="prop">`RootElement`</span> | Read-only. The element at the top of the tree, the size of the screen. See [the root element](/docs/ui-base-element/#the-root-element). |
| <span class="method">`AddElementToRoot(BaseElement element)`</span> | Adds an element to the root. |
| <span class="method">`GetElementByName(string name)`</span> | Finds an element anywhere in the tree by the name given to its constructor, `null` if there is none. |
| <span class="method">`GetElementByName<T>(string name)`</span> | The same, `null` also when the element is not a `T`. |
| <span class="method">`Update(GameTime gameTime)`</span> | Runs timers and animations, lays out what changed, and handles the mouse. Poll the input before it. |
| <span class="method">`Draw()`</span> | Draws the whole tree with the sprite batch, beginning and ending it itself. |
| <span class="prop">`FollowsBackBuffer`</span> | Whether the UI takes the back buffer's size by itself, at the start of every <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#update">`Update`</a>. On by default. Turn it off for a UI drawn into a render target of its own size. Turned on again, it takes the back buffer's size at the next update. |
| <span class="method">`ApplyGameWindowSize(int width, int height)`</span> | Lays the UI out over a screen size in device pixels. A size of 0, such as a minimized window's, is ignored. With <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#followsbackbuffer">`FollowsBackBuffer`</a> on, the size stays until the back buffer changes. |
| <span class="prop">`Scale`</span> | How large one logical unit is on screen, see [display scaling](#display-scaling). Between <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/#minscale">`MinScale`</a> (0.25) and <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/#maxscale">`MaxScale`</a> (8). |
| <span class="prop">`FollowsDisplayScale`</span> | Whether <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#scale">`Scale`</a> follows the display scale of the window's monitor, times <a class="ref prop" href="/docs/ui-glossary/types/borrowed-torch-ui/#displayscalefactor">`DisplayScaleFactor`</a>. Turned on, it sets the scale at once and then follows the window to other monitors. A scale set by hand stays until the DPI changes. Off by default. Needs the window constructor, otherwise turning it on throws. |
| <span class="prop">`DisplayScaleFactor`</span> | What the display scale is multiplied with while following: a UI size setting of the game. 1 by default, a positive number. Set while following, it applies at once. |
| <span class="prop">`DrawTransform`</span> | Read-only. The matrix the UI draws with. Draw code that begins its own sprite batch inside the UI passes it to draw in logical units. |
| <span class="prop">`ExceptionHandler`</span> | Gets the exceptions thrown inside <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#update">`Update`</a>, <a class="ref method" href="/docs/ui-glossary/types/borrowed-torch-ui/#draw">`Draw`</a> and the handling of text input. Without a handler they are rethrown. |
| <span class="method">`AddAnimation(BaseAnimation animation)`</span> | Starts updating an animation, see [animations](/docs/ui-styles/#animations). |
| <span class="method">`RemoveAnimation(BaseAnimation animation)`</span> | Stops updating an animation. It keeps its state, and adding it again continues it. |
| <span class="method">`SetDefaultMouseCursorsSet(MouseCursorsSet mouseCursorsSet)`</span> | Sets the cursors every element uses unless it has its own, see [mouse cursors](/docs/ui-styles/#mouse-cursors). |
| <span class="method">`Dispose()`</span> | Disposes the root and forgets the shared state, so a new UI can be created. |

### ITextInputEvents

The source of typed text and key presses, for a UI hosted outside a game window.

| Event | Description |
| --- | --- |
| <a class="ref event" href="/docs/ui-glossary/types/i-text-input-events/#ontextinput">`OnTextInput`</a> | `EventHandler<TextInputEventArgs>`: a typed character, sent to the element that has the keyboard. |
| <a class="ref event" href="/docs/ui-glossary/types/i-text-input-events/#onkeydown">`OnKeyDown`</a> | `EventHandler<InputKeyEventArgs>`: a pressed key, sent to the element that has the keyboard and then up to its parents until one handles it. |

### GameWindowTextInputEvents

An <a class="ref" href="/docs/ui-glossary/types/i-text-input-events/">`ITextInputEvents`</a> that forwards a MonoGame window's events. The window constructor of <a class="ref" href="/docs/ui-glossary/types/borrowed-torch-ui/">`BorrowedTorchUI`</a> creates and
disposes one itself.

| Member | Description |
| --- | --- |
| <span class="method">`GameWindowTextInputEvents(GameWindow window)`</span> | Subscribes to the window's `TextInput` and `KeyDown` events. |
| <span class="method">`Dispose()`</span> | Unsubscribes from the window. |

## Your first elements

Every element has a constructor taking an optional name. Set its properties, subscribe to its events and add it to the
root (or to another element). The snippets on these pages call the UI `ui`; in the game above it is `_ui`.

<figure class="shot">
  <img src="{{ '/assets/img/ui/ui-first-elements.png' | relative_url }}" width="201" height="115" alt="A title label and a Play button">
  <figcaption>A label and a button added to the root.</figcaption>
</figure>

```csharp
var title = new Label("title")
{
    Text = "Borrowed Torch",
    FontSize = 24,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (16, 16)
};

var play = new Button("play")
{
    Text = "Play",
    DesiredWidth = 140,
    DesiredHeight = 36,
    Margin = (16, 58)
};
play.OnClick += (sender, e) => Console.WriteLine("Play pressed");

ui.AddElementToRoot(title);
ui.AddElementToRoot(play);
```

## Sizes and alignment

An element's size along each side comes from three settings:

- **A fixed size.** <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredwidth">`DesiredWidth`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#desiredheight">`DesiredHeight`</a> above 0 fix it.
- **Stretched.** Without a size, an element whose <a class="ref" href="/docs/ui-glossary/types/horizontal-alignment/">`HorizontalAlignment`</a> or <a class="ref" href="/docs/ui-glossary/types/vertical-alignment/">`VerticalAlignment`</a> is `Stretch` takes the
  space its parent gives it, less its margins. `Stretch` is the default alignment of most elements.
- **Fitted to its content.** Without a size and with any other alignment, the element is as large as its content.

<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#minwidth">`MinWidth`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#minheight">`MinHeight`</a>, <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxwidth">`MaxWidth`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxheight">`MaxHeight`</a> limit the result, with 0 meaning no limit.

In a parent that fits its content, such as a stack panel, an auto-sized grid row or a fitted window body, a stretched
child counts with the size of its own content, as in WPF. A label left at the default `Stretch` has its text's height
in a stack panel, and an unwrapped label widens a fitted panel to its line. Wrapping text is the exception along the
width: it takes the width the rest of the content decides and wraps there, instead of widening the parent to one long
line. When nothing else gives a width, as for a label alone in a fitted panel, the text keeps its one line, as in WPF.
Give the parent a <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#maxwidth">`MaxWidth`</a> to make it wrap.

<figure class="shot">
  <img src="{{ '/assets/img/ui/ui-sizes.png' | relative_url }}" width="522" height="222" alt="Four identical framed areas, each with one label: a fixed size at the top left, one fitted to its text, one stretched across the width and one filling its area">
  <figcaption>The same label in four identical areas: fixed, fitted, stretched across, stretched both ways.</figcaption>
</figure>

```csharp
// one look for every label: centered text on a brown fill; no text margin,
// so a fitted label hugs its text
Label Swatch(string text) => new()
{
    Text = text,
    TextAlignment = TextAlignment.Center,
    VerticalTextAlignment = VerticalTextAlignment.Center,
    BackgroundColor = new Color(110, 82, 48)
};

// four identical framed areas of 240 x 90, each holding one label inside its frame
void Area(int left, int top, Label label) => ui.AddElementToRoot(new Border
{
    DesiredWidth = 240,
    DesiredHeight = 90,
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Margin = (left, top),
    Thickness = 1,
    ForegroundColor = new Color(90, 70, 48),
    BackgroundColor = new Color(30, 24, 18),
    Content = label
});

// a fixed size, at the top left of its area
var fixedSize = Swatch("120 x 40");
fixedSize.DesiredWidth = 120;
fixedSize.DesiredHeight = 40;
fixedSize.HorizontalAlignment = HorizontalAlignment.Left;
fixedSize.VerticalAlignment = VerticalAlignment.Top;
Area(12, 12, fixedSize);

// fitted to its text: no size, not stretched
var fitted = Swatch("Fits its text");
fitted.HorizontalAlignment = HorizontalAlignment.Left;
fitted.VerticalAlignment = VerticalAlignment.Top;
Area(268, 12, fitted);

// stretched across the width, as high as its text
var across = Swatch("Stretched across");
across.VerticalAlignment = VerticalAlignment.Top;
Area(12, 118, across);

// stretched both ways: no size and the default alignments
Area(268, 118, Swatch("Stretched both ways"));
```

The alignments place an element inside the space its parent gives it: `Left`, `Center`, `Right` or `Stretch`
horizontally, `Top`, `Center`, `Bottom` or `Stretch` vertically.

<figure class="shot">
  <img src="{{ '/assets/img/ui/ui-alignment.png' | relative_url }}" width="522" height="202" alt="Nine labels, one for each pair of Left, Center or Right with Top, Center or Bottom, placed at the corners, the middles of the edges and the middle of the screen">
  <figcaption>Elements aligned within the screen, each with a margin of 12.</figcaption>
</figure>

```csharp
Label Badge(string text, HorizontalAlignment horizontal, VerticalAlignment vertical) =>
    new()
    {
        Text = text,
        TextMargin = (10, 6, 10, 6),
        HorizontalAlignment = horizontal,
        VerticalAlignment = vertical,
        BackgroundColor = new Color(58, 44, 30),
        Margin = 12
    };

ui.AddElementToRoot(Badge("Left, Top",
    HorizontalAlignment.Left, VerticalAlignment.Top));
ui.AddElementToRoot(Badge("Center, Top",
    HorizontalAlignment.Center, VerticalAlignment.Top));
ui.AddElementToRoot(Badge("Right, Top",
    HorizontalAlignment.Right, VerticalAlignment.Top));
ui.AddElementToRoot(Badge("Left, Center",
    HorizontalAlignment.Left, VerticalAlignment.Center));
ui.AddElementToRoot(Badge("Center, Center",
    HorizontalAlignment.Center, VerticalAlignment.Center));
ui.AddElementToRoot(Badge("Right, Center",
    HorizontalAlignment.Right, VerticalAlignment.Center));
ui.AddElementToRoot(Badge("Left, Bottom",
    HorizontalAlignment.Left, VerticalAlignment.Bottom));
ui.AddElementToRoot(Badge("Center, Bottom",
    HorizontalAlignment.Center, VerticalAlignment.Bottom));
ui.AddElementToRoot(Badge("Right, Bottom",
    HorizontalAlignment.Right, VerticalAlignment.Bottom));
```

### Margins

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> keeps an element away from the edges of its slot. It converts from an int and from tuples:

```csharp
element.Margin = 5;                 // all sides
element.Margin = (10, 20);          // left, top
element.Margin = (10, 20, 30);      // left, top, right
element.Margin = (10, 20, 30, 40);  // left, top, right, bottom
```

A margin pushes the element away from the side it is aligned to. A parent that fits its content counts a child's
margin only on that side: the left and top margins for `Left` and `Top`, the right and bottom ones for `Right` and
`Bottom`, both for `Center`. So in a horizontal stack panel, put the gap between two items on the left margin of the
second one, not on the right margin of the first.

### Units

Sizes, margins, positions and font sizes are in logical units: one unit is one pixel at a display scale of 100 %. The
layout runs in two passes whenever something changed: measure finds every element's size, then arrange gives each its
final size (<a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualwidth">`ActualWidth`</a>, <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#actualheight">`ActualHeight`</a>) and position (<a class="ref prop" href="/docs/ui-glossary/elements/base-element/#location">`Location`</a>, in screen units). The
[base element page](/docs/ui-base-element/#writing-your-own-element) explains the passes for custom elements.

## Display scaling

On a display scaled to 150 %, Windows stretches the window of a game that isn't DPI aware, and everything comes out
blurred. Such a game is also told 96 DPI on every monitor. Declare the game per-monitor DPI aware before the window is
created, then let the UI follow the display scale of the window's monitor. The UI is then drawn at the display's full
resolution, one and a half times larger.

```csharp
// Program.cs, before the game creates its window
DisplayScale.DeclarePerMonitorAwareness();

using var game = new MyGame();
game.Run();

// in LoadContent, after creating the UI with the game window: 144 DPI is a scale of 1.5
_ui.FollowsDisplayScale = true;

// optional: a UI size setting of the game, multiplied with the display scale
_ui.DisplayScaleFactor = 1.25f;
```

`FollowsDisplayScale` sets `Scale` at once. Every 30 updates it reads the monitor's DPI again, and when the window moves
to a monitor with another scale, the UI takes that scale. The window keeps its pixels, and the UI fills them. A scale you
set by hand stays until the DPI changes. Following needs the constructor that takes the game window.

The layout doesn't change with the scale. Sizes, margins, positions, font sizes and the mouse positions in events
all stay in logical units; only the drawing, the clipping and the reading of the mouse are scaled, and fonts are
rasterized for the scale. The screen size stays in device pixels, whether it is the back buffer's or one given to
`ApplyGameWindowSize`, and the root covers it in logical units: at 150 % a 1920 x 1200 back buffer is a 1280 x 800
layout. The screenshots on these pages are rendered at a scale of 2.

### DisplayScale

Reads the Windows display scale of the monitor a window is on. Without the awareness call, Windows reports 96 DPI.

| Member | Description |
| --- | --- |
| <a class="ref" href="/docs/ui-glossary/types/display-scale/#defaultdpi">`DefaultDpi`</a> | 96, the DPI of a monitor at 100 %. |
| <span class="method">`DeclarePerMonitorAwareness()`</span> | Declares the process per-monitor DPI aware. Call it before the game creates its window. Returns `false` when Windows doesn't accept it: the awareness was declared already, by an application manifest or an earlier call, or Windows is older than Windows 10 1703. |
| <span class="method">`DpiOf(GameWindow window)`</span> | The DPI of the monitor under the middle of the window's client area. 96 when it can't be read. |
| <span class="method">`DpiOf(Rectangle screenBounds)`</span> | The same for a rectangle in screen coordinates, using the nearest monitor when none is under it. |
| <span class="method">`ScaleOf(GameWindow window)`</span> | The display scale as a UI scale: the DPI divided by 96, so 1.5 at 150 %. |

Some limits come with scaling:

- A one-unit line covers one or two device pixels at scales like 125 %.
- Textures are resampled to the scale. Give sharper sources for crisp images.
- Custom mouse cursors made from textures are not scaled.
- A <span class="prop">`FontSystem`</span> given by hand keeps the resolution it was created with.
- Draw code that begins its own sprite batch inside the UI passes `DrawTransform`. A [view port](/docs/ui-images/#viewport)
  draws in device pixels.

## A pause menu

A modal window over the game, with three buttons in a stack panel. While it is open, the rest of the UI is shaded and
gets no mouse input, and Escape closes it.

<figure class="shot">
  <img src="{{ '/assets/img/ui/ui-pause-menu.png' | relative_url }}" width="522" height="302" alt="A modal Paused window with Resume, Settings and Quit to menu buttons over a shaded game screen">
  <figcaption>The pause menu over the game's own UI.</figcaption>
</figure>

```csharp
var menu = new StackPanel("pauseButtons")
{
    Orientation = Orientation.Vertical,
    HorizontalAlignment = HorizontalAlignment.Center,
    VerticalAlignment = VerticalAlignment.Center
};

var resume = new Button("resume")
{
    Text = "Resume",
    DesiredWidth = 200,
    DesiredHeight = 36
};
var settings = new Button("settings")
{
    Text = "Settings",
    DesiredWidth = 200,
    DesiredHeight = 36,
    Margin = (0, 10)
};
var quit = new Button("quit")
{
    Text = "Quit to menu",
    DesiredWidth = 200,
    DesiredHeight = 36,
    Margin = (0, 10)
};

menu.AddItemsRange([resume, settings, quit]);

var pauseWindow = new Window("pause")
{
    DesiredWidth = 260,
    DesiredHeight = 210,
    HorizontalAlignment = HorizontalAlignment.Center,
    VerticalAlignment = VerticalAlignment.Center,
    IsModal = true,
    Content = menu
};
var titleBar = (DefaultWindowTitleBar)pauseWindow.TitleBar;
titleBar.Title.Text = "Paused";
titleBar.CloseButton.Text = "x";

resume.OnClick += (sender, e) => pauseWindow.Hide();
quit.OnClick += (sender, e) => Console.WriteLine("Back to the main menu");

// Escape closes the menu while anything in it has the keyboard
pauseWindow.OnKeyDown += (sender, e) =>
{
    if (e.Key != Keys.Escape) return;

    pauseWindow.Hide();
    e.Handled = true;
};

ui.AddElementToRoot(pauseWindow);
pauseWindow.Show();
```

The [layout elements page](/docs/ui-layout/#window) has more on windows, and the
[base element page](/docs/ui-base-element/#keyboard-and-focus) on how keys travel up to the window.
