---
layout: docs
title: UI
description: Set up BorrowedTorch.UI in a MonoGame game, lay elements out, and find your way around the UI pages.
---

BorrowedTorch.UI is the UI framework of Kindling, built for MonoGame. You build the UI from elements (labels, buttons,
lists, windows and more) arranged in a tree. Elements are laid out the way WPF lays them out, with margins,
alignments and sizes that are fixed, stretched or fitted to their content. Every property can be set in code, by a
style, or bound to a view model, and the whole tree is drawn with one `SpriteBatch`.

These pages cover the library from setup to every public type:

| Page | What it covers |
| --- | --- |
| [UI](/docs/ui/) (this page) | Installing, creating the UI in a game, display scaling, how sizes and alignment work, a complete pause menu |
| [Base element](/docs/ui-base-element/) | What every element has: size, appearance, items, mouse, keyboard, resizing, and writing your own element |
| [Layout elements](/docs/ui-layout/) | Stack panels, grids, scrolling, borders, separators, windows and tabs |
| [Controls](/docs/ui-controls/) | Buttons, check boxes, sliders, progress bars, tooltips and the colour picker |
| [Lists and menus](/docs/ui-lists/) | List boxes, combo boxes, tree views and context menus |
| [Text](/docs/ui-text/) | Labels, rich text boxes, text input and fonts |
| [Images and drawing](/docs/ui-images/) | Images, stencils, view ports for your own drawing, and drag and drop |
| [Styles, bindings and animation](/docs/ui-styles/) | Styles, mouse cursors, default settings, dependency properties, view model bindings and animations |

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
| Input | `BorrowedTorch.MonoInput` 2.0.1, installed with the UI |

The package also brings the default font (UbuntuMono) and the colour picker's pointer texture. They are copied to
`Content/Fonts` and `Content/Textures` next to your executable, so keep your `ContentManager.RootDirectory` set to
`Content`.

## Setting up the UI

Create the UI once the `GraphicsDevice` exists, give it the game window, and call `Update` and `Draw` every frame. The
UI takes care of the window by itself:

- **Text and keys.** Typed text and key presses come from the window's `TextInput` and `KeyDown` events.
- **Size.** At the start of every `Update`, the UI compares the back buffer with the size it saw last. When the window
  was resized, or the game changed the back buffer, it lays itself out over the new size.

Disposing the UI unsubscribes it from the window. One thing stays with your game:

- **Input.** The game polls the input. Call `KeyboardManager.Update()` and `MouseManager.Update()` from
  BorrowedTorch.MonoInput once per frame, before the UI's `Update`. The UI reads the same managers, so polling them a
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

The framework keeps its state in static fields, so only one `BorrowedTorchUI` exists at a time. Creating a second one
throws: dispose the first one before. Disposing the UI detaches the elements you added to the root but doesn't
dispose them, so dispose the ones that hold resources yourself.

Two cases need more than the window:

- **A UI drawn into a render target of its own size.** Set `FollowsBackBuffer` to `false` and give the size with
  `ApplyGameWindowSize`. With following on, a size you give stays until the back buffer changes.
- **A UI hosted outside a game window**, such as a WPF editor or a test. Pass your own `ITextInputEvents` instead of
  the window. `GameWindowTextInputEvents` is the adapter the window constructor uses, if you need one by hand.

### BorrowedTorchUI

| Member | Description |
| --- | --- |
| `BorrowedTorchUI(GraphicsDevice graphicsDevice, ContentManager contentManager, SpriteBatch spriteBatch, GameWindow window)` | Creates the UI over the back buffer's size, with the text and keys of the window. The sprite batch is the one the UI draws with; the content manager loads the colour picker's pointer and the textures named by `TexturesPath`. Disposing the UI unsubscribes from the window. |
| `BorrowedTorchUI(GraphicsDevice graphicsDevice, ContentManager contentManager, SpriteBatch spriteBatch, ITextInputEvents textInputEvents)` | The same, with the text and keys of a source of your own, for a UI hosted outside a game window. The UI doesn't dispose the source. |
| `RootElement` | Read-only. The element at the top of the tree, the size of the screen. See [the root element](/docs/ui-base-element/#the-root-element). |
| `AddElementToRoot(BaseElement element)` | Adds an element to the root. |
| `GetElementByName(string name)` | Finds an element anywhere in the tree by the name given to its constructor, `null` if there is none. |
| `GetElementByName<T>(string name)` | The same, `null` also when the element is not a `T`. |
| `Update(GameTime gameTime)` | Runs timers and animations, lays out what changed, and handles the mouse. Poll the input before it. |
| `Draw()` | Draws the whole tree with the sprite batch, beginning and ending it itself. |
| `FollowsBackBuffer` | Whether the UI takes the back buffer's size by itself, at the start of every `Update`. On by default. Turn it off for a UI drawn into a render target of its own size. Turned on again, it takes the back buffer's size at the next update. |
| `ApplyGameWindowSize(int width, int height)` | Lays the UI out over a screen size in device pixels. A size of 0, such as a minimised window's, is ignored. With `FollowsBackBuffer` on, the size stays until the back buffer changes. |
| `Scale` | How large one logical unit is on screen, see [display scaling](#display-scaling). Between `MinScale` (0.25) and `MaxScale` (8). |
| `DrawTransform` | Read-only. The matrix the UI draws with. Draw code that begins its own sprite batch inside the UI passes it to draw in logical units. |
| `ExceptionHandler` | Gets the exceptions thrown inside `Update`, `Draw` and the handling of text input. Without a handler they are rethrown. |
| `AddAnimation(BaseAnimation animation)` | Starts updating an animation, see [animations](/docs/ui-styles/#animations). |
| `RemoveAnimation(BaseAnimation animation)` | Stops updating an animation. It keeps its state, and adding it again continues it. |
| `SetDefaultMouseCursorsSet(MouseCursorsSet mouseCursorsSet)` | Sets the cursors every element uses unless it has its own, see [mouse cursors](/docs/ui-styles/#mouse-cursors). |
| `Dispose()` | Disposes the root and forgets the shared state, so a new UI can be created. |

### ITextInputEvents

The source of typed text and key presses, for a UI hosted outside a game window.

| Event | Description |
| --- | --- |
| `OnTextInput` | `EventHandler<TextInputEventArgs>`: a typed character, sent to the element that has the keyboard. |
| `OnKeyDown` | `EventHandler<InputKeyEventArgs>`: a pressed key, sent to the element that has the keyboard and then up to its parents until one handles it. |

### GameWindowTextInputEvents

An `ITextInputEvents` that forwards a MonoGame window's events. The window constructor of `BorrowedTorchUI` creates and
disposes one itself.

| Member | Description |
| --- | --- |
| `GameWindowTextInputEvents(GameWindow window)` | Subscribes to the window's `TextInput` and `KeyDown` events. |
| `Dispose()` | Unsubscribes from the window. |

## Your first elements

Every element has a constructor taking an optional name. Set its properties, subscribe to its events and add it to the
root (or to another element). The snippets on these pages call the UI `ui`; in the game above it is `_ui`.

<figure class="shot">
  <img src="{{ '/assets/img/ui/ui-first-elements.png' | relative_url }}" width="440" height="112" alt="A title label and a Play button">
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

- **A fixed size.** `DesiredWidth` and `DesiredHeight` above 0 fix it.
- **Stretched.** Without a size, an element whose `HorizontalAlignment` or `VerticalAlignment` is `Stretch` takes the
  space its parent gives it, less its margins. `Stretch` is the default alignment of most elements.
- **Fitted to its content.** Without a size and with any other alignment, the element is as large as its content.

`MinWidth`, `MinHeight`, `MaxWidth` and `MaxHeight` limit the result, with 0 meaning no limit.

In a parent that fits its content, such as a stack panel, an auto-sized grid row or a fitted window body, a stretched
child counts with the size of its own content, as in WPF. A label left at the default `Stretch` has its text's height
in a stack panel, and an unwrapped label widens a fitted panel to its line. Wrapping text is the exception along the
width: it takes the width the rest of the content decides and wraps there, instead of widening the parent to one long
line.

<figure class="shot">
  <img src="{{ '/assets/img/ui/ui-sizes.png' | relative_url }}" width="520" height="220" alt="Four identical framed areas, each with one label: a fixed size at the top left, one fitted to its text, one stretched across the width and one filling its area">
  <figcaption>The same label in four identical areas: fixed, fitted, stretched across, stretched both ways.</figcaption>
</figure>

```csharp
// one look for every label: centred text on a brown fill
Label Swatch(string text) => new()
{
    Text = text,
    TextMargin = (10, 6, 10, 6),
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
  <img src="{{ '/assets/img/ui/ui-alignment.png' | relative_url }}" width="520" height="200" alt="Six labels placed at the corners, the top centre and the middle of the screen">
  <figcaption>Elements aligned within the screen, each with a margin of 12.</figcaption>
</figure>

```csharp
Label Badge(string text, HorizontalAlignment horizontal, VerticalAlignment vertical) => new()
{
    Text = text,
    TextMargin = (10, 6, 10, 6),
    HorizontalAlignment = horizontal,
    VerticalAlignment = vertical,
    BackgroundColor = new Color(58, 44, 30),
    Margin = 12
};

ui.AddElementToRoot(Badge("Left, Top", HorizontalAlignment.Left, VerticalAlignment.Top));
ui.AddElementToRoot(Badge("Center, Top", HorizontalAlignment.Center, VerticalAlignment.Top));
ui.AddElementToRoot(Badge("Right, Top", HorizontalAlignment.Right, VerticalAlignment.Top));
ui.AddElementToRoot(Badge("Center, Center", HorizontalAlignment.Center, VerticalAlignment.Center));
ui.AddElementToRoot(Badge("Left, Bottom", HorizontalAlignment.Left, VerticalAlignment.Bottom));
ui.AddElementToRoot(Badge("Right, Bottom", HorizontalAlignment.Right, VerticalAlignment.Bottom));
```

### Margins

`Margin` keeps an element away from the edges of its slot. It converts from an int and from tuples:

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
final size (`ActualWidth`, `ActualHeight`) and position (`Location`, in screen units). The
[base element page](/docs/ui-base-element/#writing-your-own-element) explains the passes for custom elements.

## Display scaling

On a display scaled to 150 %, Windows stretches the window of a game that isn't DPI aware, and everything comes out
blurred. Declare the game per-monitor DPI aware before the window is created, then set `Scale` from the display's DPI.
The UI is then drawn at the display's full resolution, one and a half times larger.

```csharp
// Program.cs, before new MyGame(): DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2
SetProcessDpiAwarenessContext(new IntPtr(-4));

[DllImport("user32.dll")]
static extern bool SetProcessDpiAwarenessContext(IntPtr value);

// in LoadContent, after creating the UI: 144 DPI is 150 %
_ui.Scale = dpiOfTheWindowsMonitor / 96f;
```

The layout doesn't change with the scale. Sizes, margins, positions, font sizes and the mouse positions in events
all stay in logical units; only the drawing, the clipping and the reading of the mouse are scaled, and fonts are
rasterised for the scale. The screen size stays in device pixels, whether it is the back buffer's or one given to
`ApplyGameWindowSize`, and the root covers it in logical units: at 150 % a 1920 x 1200 back buffer is a 1280 x 800 layout. `Scale` can also carry an
in-game UI size setting, multiplied with the display's scale. The screenshots on these pages are rendered at a scale of
2.

To read the DPI, call `MonitorFromPoint` and `GetDpiForMonitor` (shcore.dll) for the middle of the window, and read it
again when the window moves to another monitor. The library's demo does this in its `DisplayScale` class.

Some limits come with scaling:

- A one-unit line covers one or two device pixels at scales like 125 %.
- Textures are resampled to the scale. Give sharper sources for crisp images.
- Custom mouse cursors made from textures are not scaled.
- A `FontSystem` given by hand keeps the resolution it was created with.
- Draw code that begins its own sprite batch inside the UI passes `DrawTransform`. A [view port](/docs/ui-images/#viewport)
  draws in device pixels.

## A pause menu

A modal window over the game, with three buttons in a stack panel. While it is open, the rest of the UI is shaded and
gets no mouse input, and Escape closes it.

<figure class="shot">
  <img src="{{ '/assets/img/ui/ui-pause-menu.png' | relative_url }}" width="520" height="300" alt="A modal Paused window with Resume, Settings and Quit to menu buttons over a shaded game screen">
  <figcaption>The pause menu over the game's own UI.</figcaption>
</figure>

```csharp
var menu = new StackPanel("pauseButtons")
{
    Orientation = Orientation.Vertical,
    HorizontalAlignment = HorizontalAlignment.Center,
    VerticalAlignment = VerticalAlignment.Center
};

var resume = new Button("resume") { Text = "Resume", DesiredWidth = 200, DesiredHeight = 36 };
var settings = new Button("settings") { Text = "Settings", DesiredWidth = 200, DesiredHeight = 36, Margin = (0, 10) };
var quit = new Button("quit") { Text = "Quit to menu", DesiredWidth = 200, DesiredHeight = 36, Margin = (0, 10) };

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
