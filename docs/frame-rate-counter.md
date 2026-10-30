---
layout: docs
legend: [prop, method]
title: "Frame rate counter: quick start guide"
description: Set up BorrowedTorch.FrameRateCounter in a game, show the frame rate and the worst frame on screen, and find your way around the frame rate counter pages.
---

BorrowedTorch.FrameRateCounter measures how fast a game draws. It is one small class, called once per drawn frame,
with a high-resolution clock of its own and three readings: the frame rate averaged over half a second, the time the
last frame took, and the longest frame of that half second. The last one is why it exists: a game can average 49
frames a second and still have stalled for a tenth of a second in between, and only the worst frame shows the stall.
It has no dependencies, and works in MonoGame or in any other game loop.

These pages cover the library from setup to every public member:

| Page | What it covers |
| --- | --- |
| [Quick start guide](/docs/frame-rate-counter/) (this page) | Installing, the counter in a game, the conventions, a stats overlay with keys |
| [Measuring frames](/docs/frame-rate-counter-measuring/) | What a frame is to the counter, calling it from Draw rather than Update, its own clock, the uncapped frame rate, other game loops, starting over, threads and cost |
| [The readings](/docs/frame-rate-counter-readings/) | The averaging window, the frame rate, the worst frame and the frame budget, showing the readings, per-frame mode, the window's length |
| [Glossary](/docs/frame-rate-counter-glossary/) | The counter with its properties and methods in alphabetical order |

## Installing

Add the package to your project:

```shell
dotnet add package BorrowedTorch.FrameRateCounter
```

| Requirement | Version |
| --- | --- |
| .NET | .NET Standard 2.0 and .NET 8 (`netstandard2.0`, `net8.0`): .NET 6 and later, .NET Framework 4.6.2 and later, and Mono |
| Operating system | Any: the library is plain managed code |
| Dependencies | None |

The library needs nothing from MonoGame, so it works in MonoGame 3.8.1 projects and later, in other engines and in a
loop of your own. Its one public type, <a class="ref" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/">`FrameRateCounter`</a>, is in the namespace `BorrowedTorch`.

## Counting frames

Create a <a class="ref" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/">`FrameRateCounter`</a> with the game, and call its <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#update">`Update`</a> once per drawn frame, from the game's
`Draw`. It returns `true` when the readings have been recalculated, twice a second by default: build the text to show
then, not every frame.

```csharp
using BorrowedTorch;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

public class MyGame : Game
{
    private readonly GraphicsDeviceManager _graphics;
    private readonly FrameRateCounter _fps = new();
    private SpriteBatch _spriteBatch;
    private SpriteFont _font;
    private string _fpsText = "FPS: 0";

    public MyGame()
    {
        _graphics = new GraphicsDeviceManager(this);
        Content.RootDirectory = "Content";
    }

    protected override void LoadContent()
    {
        _spriteBatch = new SpriteBatch(GraphicsDevice);
        _font = Content.Load<SpriteFont>("Font"); // any sprite font
    }

    protected override void Draw(GameTime gameTime)
    {
        // once per drawn frame: true twice a second, when the readings are new
        if (_fps.Update())
            _fpsText = $"FPS: {_fps.FrameRate}";

        GraphicsDevice.Clear(Color.Black);

        // draw the scene here

        _spriteBatch.Begin();
        _spriteBatch.DrawString(_font, _fpsText, new Vector2(10, 10), Color.White);
        _spriteBatch.End();

        base.Draw(gameTime);
    }
}
```

The text reads `FPS: 0` for the first half second, then the frame rate: 60 for a game that keeps up, as MonoGame's
defaults hold a game to 60 frames a second and to the monitor's refresh rate.
[The uncapped frame rate](/docs/frame-rate-counter-measuring/#the-uncapped-frame-rate) turns both limits off, to see
how fast the game can draw.

Call it from `Draw`, not from the game's `Update`: under MonoGame's fixed time step, `Update` can run several times for
one drawn frame, see [Draw, not Update](/docs/frame-rate-counter-measuring/#draw-not-update). The counter reads nothing
from `gameTime` either. <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#update">`Update()`</a> measures the time between its calls with a `Stopwatch` of its own, and its
first call only starts that clock.

### FrameRateCounter constructor

| Method | Description |
| --- | --- |
| <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#frameratecounter">`FrameRateCounter()`</a> | A counter that averages over half a second, with every reading at 0 and its clock not started yet. It holds nothing to dispose. |

The update methods are on the [measuring page](/docs/frame-rate-counter-measuring/#frameratecounter-methods), and the
readings and settings on [the readings page](/docs/frame-rate-counter-readings/#frameratecounter-reading-properties).

## Conventions

Times are in seconds, as `Stopwatch` and `TimeSpan.TotalSeconds` give them: multiply by 1000 for milliseconds.

| Quantity | Unit |
| --- | --- |
| The frame rate | Frames per second, a whole number, as an `int` |
| A frame time | Seconds, as a `float`: about 0.0167 for a frame at 60 frames a second |
| The averaging window | Seconds, as a `float`: 0.5 by default |
| A frame time passed in | Seconds, as a `double`: the time since the previous frame |

A frame, to the counter, is the time from one call to the next: the whole frame, the wait for the monitor included,
not only the time the game spends drawing it, see [what a frame is](/docs/frame-rate-counter-measuring/#what-a-frame-is).

## A stats overlay

A stats overlay, as a game wants it while it is being made: the frame rate, the last frame's time and the worst frame
of the half second, the worst in red when a frame ran half again as long as a frame at 60 frames a second. F3 shows or
hides it, F4 switches to readings from every frame alone, and F5 starts the measuring again.

```csharp
using BorrowedTorch;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

public class StatsOverlay
{
    // half again as long as a frame at 60 FPS: a hitch the player sees
    private const float HitchSeconds = 1.5f / 60;

    private readonly FrameRateCounter _fps = new();
    private readonly SpriteFont _font;
    private KeyboardState _previousKeys;
    private string _rateText;
    private string _timesText;
    private Color _timesColor;

    public StatsOverlay(SpriteFont font)
    {
        _font = font;
        ClearText();
    }

    public bool Visible { get; set; } = true;

    // from the game's Update
    public void HandleKeys(KeyboardState keys)
    {
        if (Pressed(keys, Keys.F3))
            Visible = !Visible;

        if (Pressed(keys, Keys.F4))
        {
            // every frame alone: at once, but jumpy
            _fps.UpdateEveryFrame = !_fps.UpdateEveryFrame;
            ClearText();
        }

        if (Pressed(keys, Keys.F5))
        {
            _fps.Reset();
            ClearText();
        }

        _previousKeys = keys;
    }

    // from the game's Draw, every frame, shown or not
    public void Draw(SpriteBatch spriteBatch)
    {
        if (_fps.Update())
        {
            _rateText = $"{_fps.FrameRate} FPS";
            _timesText =
                $"Frame: {_fps.FrameTime * 1000:F1} ms\n" +
                $"Worst: {_fps.WorstFrameTimePerRefresh * 1000:F1} ms";
            _timesColor = _fps.WorstFrameTimePerRefresh > HitchSeconds ? Color.OrangeRed : Color.White;
        }

        if (!Visible)
            return;

        spriteBatch.Begin();
        spriteBatch.DrawString(_font, _rateText, new Vector2(10, 10), Color.White);
        spriteBatch.DrawString(_font, _timesText, new Vector2(10, 10 + _font.LineSpacing), _timesColor);
        spriteBatch.End();
    }

    private bool Pressed(KeyboardState keys, Keys key) => keys.IsKeyDown(key) && _previousKeys.IsKeyUp(key);

    // until the next readings: the ones on screen are from before the change
    private void ClearText()
    {
        _rateText = "-- FPS";
        _timesText = "";
        _timesColor = Color.White;
    }
}
```

Create it in `LoadContent` with a sprite font, pass it the keyboard from the game's `Update`, and draw it last, over
everything else:

```csharp
protected override void LoadContent()
{
    _spriteBatch = new SpriteBatch(GraphicsDevice);
    _stats = new StatsOverlay(Content.Load<SpriteFont>("Font"));
}

protected override void Update(GameTime gameTime)
{
    _stats.HandleKeys(Keyboard.GetState());

    // update the game here

    base.Update(gameTime);
}

protected override void Draw(GameTime gameTime)
{
    GraphicsDevice.Clear(Color.Black);

    // draw the scene here

    _stats.Draw(_spriteBatch); // last, over everything

    base.Draw(gameTime);
}
```

The overlay counts every frame whether it is shown or not, so its numbers are current the moment F3 brings it back.
It builds its text only when <a class="ref method" href="/docs/frame-rate-counter-glossary/counter/frame-rate-counter/#update">`Update`</a> returns `true`: twice a second, or every frame once F4 has switched to
per-frame readings, when its two strings a frame become garbage for the collector, see
[per-frame mode](/docs/frame-rate-counter-readings/#per-frame-mode). The `Frame` line is the time of the frame that
brought the readings, one frame of the half second; the `Worst` line covers all of them.

The hitch threshold is a choice: 25 ms suits a game made for 60 frames a second. A game made for 30 or 144 sets its
own from its [frame budget](/docs/frame-rate-counter-readings/#the-frame-budget).
