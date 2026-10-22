---
layout: docs
legend: [prop, method, dp]
title: "Glossary: ToolTip"
description: "The properties, methods and events of ToolTip, in alphabetical order."
---

A small popup that appears next to the mouse cursor while it rests over an element. You attach it through the element's `ToolTip` property (see the [base element](/docs/ui-base-element/)), not by adding it to the tree.

`ToolTip` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [controls page](/docs/ui-controls/#tooltip) shows it in context, with code and screenshots.

Names are coloured by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="content"><span class="dp"><code>Content</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="Content in context on the controls page" aria-label="Content in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Any element shown in the tooltip instead of a text.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/tool-tip-style/">`ToolTipStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="marginfrommousecursor"><span class="dp"><code>MarginFromMouseCursor</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="MarginFromMouseCursor in context on the controls page" aria-label="MarginFromMouseCursor in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · The shift from the cursor, in units: `Left` is added to the x position and `Top` to the y position, whatever the placement (use negative values to move a `TopLeft` tooltip away from the cursor). The other sides are not used.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="placement"><span class="dp"><code>Placement</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="Placement in context on the controls page" aria-label="Placement in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/tool-tip-placement/">`ToolTipPlacement`</a> · Which side of the cursor the tooltip appears on. `TopLeft` is the default.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/tool-tip-style/">`ToolTipStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="text"><span class="dp"><code>Text</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="Text in context on the controls page" aria-label="Text in context on the controls page">→</a></h3>

`string` · Creates a centred <a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a> content showing this text, styled by <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#textstyle">`TextStyle`</a>.

<h3 id="textstyle"><span class="dp"><code>TextStyle</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="TextStyle in context on the controls page" aria-label="TextStyle in context on the controls page">→</a></h3>

<a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a> · The style of the text content made from <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#text">`Text`</a>.

<h3 id="timebeforeshowms"><span class="dp"><code>TimeBeforeShowMs</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-properties" title="TimeBeforeShowMs in context on the controls page" aria-label="TimeBeforeShowMs in context on the controls page">→</a></h3>

`int` · How long the mouse rests on the element before the tooltip appears, in milliseconds. 0 shows it at once.

## Methods

<h3 id="tooltip"><span class="method"><code>ToolTip()</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-methods" title="ToolTip() in context on the controls page" aria-label="ToolTip() in context on the controls page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tool-tip/#tooltip">`ToolTip(string name = null)`</a> · Creates a tooltip. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

<h3 id="show"><span class="method"><code>Show()</code></span> <a class="ctx" href="/docs/ui-controls/#tooltip-methods" title="Show() in context on the controls page" aria-label="Show() in context on the controls page">→</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/tool-tip/#show">`Show()`</a> · Places the tooltip at the mouse cursor and shows it after the next layout pass. The element it is attached to calls this; it does nothing for a tooltip not attached to an element.
