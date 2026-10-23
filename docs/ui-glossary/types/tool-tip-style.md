---
layout: docs
legend: [prop, dp, method]
title: "Glossary: ToolTipStyle"
description: "The members of ToolTipStyle, in alphabetical order."
---

The style class of [`ToolTip`](/docs/ui-controls/#tooltip): the properties a style can set on it. Part style <a class="ref prop" href="/docs/ui-glossary/types/tool-tip-style/#textstyle">`TextStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a>). Leaves out `Content`. Framework defaults: aligned left and top, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#hittest">`HitTest`</a> off, <a class="ref prop" href="/docs/ui-glossary/types/tool-tip-style/#timebeforeshowms">`TimeBeforeShowMs`</a> `DefaultTimeBeforeShowToolTipMs`.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="marginfrommousecursor"><span class="prop"><code>MarginFromMouseCursor</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="MarginFromMouseCursor in context on the controls page" aria-label="MarginFromMouseCursor in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The shift from the cursor, in units: `Left` is added to the x position and `Top` to the y position, whatever the placement (use negative values to move a `TopLeft` tooltip away from the cursor). The other sides are not used.

<h3 id="placement"><span class="prop"><code>Placement</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="Placement in context on the controls page" aria-label="Placement in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/tool-tip-placement/">`ToolTipPlacement`</a> · Which side of the cursor the tooltip appears on. `TopLeft` is the default.

<h3 id="text"><span class="prop"><code>Text</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="Text in context on the controls page" aria-label="Text in context on the controls page">🠆</a></h3>

`string` · Creates a centred <a class="ref" href="/docs/ui-glossary/elements/label/">`Label`</a> content showing this text, styled by <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#textstyle">`TextStyle`</a>.

<h3 id="textstyle"><span class="prop"><code>TextStyle</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="TextStyle in context on the controls page" aria-label="TextStyle in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> · The style of the text content made from <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#text">`Text`</a>.

<h3 id="timebeforeshowms"><span class="prop"><code>TimeBeforeShowMs</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="TimeBeforeShowMs in context on the controls page" aria-label="TimeBeforeShowMs in context on the controls page">🠆</a></h3>

`int` · How long the mouse rests on the element before the tooltip appears, in milliseconds. 0 shows it at once.

## Methods

<h3 id="tooltipstyle"><span class="method"><code>ToolTipStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/tool-tip-style/#tooltipstyle">`ToolTipStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/tool-tip-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.

| Parameter | Type | Description |
| --- | --- | --- |
| `propertyName` | `string` | The name of a property of the style; `nameof` keeps it right. |
