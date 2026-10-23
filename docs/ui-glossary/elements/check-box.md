---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: CheckBox"
description: "The properties, methods and events of CheckBox, in alphabetical order."
---

A box with a text or any element beside it. It works as a check box that turns on and off, or as a radio button that is one choice of a group.

`CheckBox` derives from [`BaseElement`](/docs/ui-glossary/elements/base-element/) and has its members too. The [controls page](/docs/ui-controls/#checkbox) shows it in context, with code and screenshots.

Names are colored by what they are: a <span class="kb kb-prop">plain property</span>, a <span class="kb kb-method">method</span>, an <span class="kb kb-event">event</span> or a <span class="kb kb-dp">dependency property</span>, which a style, a binding or an animation can set.

## Properties

<h3 id="checked"><span class="dp"><code>Checked</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="Checked in context on the controls page" aria-label="Checked in context on the controls page">🠆</a></h3>

`bool` · Whether the box is checked. Setting it raises <a class="ref event" href="/docs/ui-glossary/elements/check-box/#oncheckedunchecked">`OnCheckedUnchecked`</a>, and checking a radio button unchecks the others of its group.

<h3 id="checkedsolidcolor"><span class="dp"><code>CheckedSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="CheckedSolidColor in context on the controls page" aria-label="CheckedSolidColor in context on the controls page">🠆</a></h3>

`Color` · The color of the box while it is checked, without textures.

<h3 id="content"><span class="dp"><code>Content</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="Content in context on the controls page" aria-label="Content in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> · Any element shown beside the box instead of a text. A content you give is detached, not disposed, when it is replaced.

<h3 id="direction"><span class="dp"><code>Direction</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="Direction in context on the controls page" aria-label="Direction in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/check-box-direction/">`CheckBoxDirection`</a> · Which side of the content the box is on: `Left` (the default) or `Right`.

<h3 id="generalmousecursorsset"><span class="prop"><code>GeneralMouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralMouseCursorsSet in context on the base element page" aria-label="GeneralMouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Static. The cursors of every element of this style type; null (the default) falls back to <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="generalstyle"><span class="prop"><code>GeneralStyle</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="GeneralStyle in context on the base element page" aria-label="GeneralStyle in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/check-box-style/">`CheckBoxStyle`</a> · Static. The style of every element of this style type. It starts as a copy of the framework defaults; changing one of its properties updates every such element, a property it leaves unset takes its default.

<h3 id="groupid"><span class="dp"><code>GroupId</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="GroupId in context on the controls page" aria-label="GroupId in context on the controls page">🠆</a></h3>

`string` · The group of a radio button: the radio buttons in the tree with the same id uncheck each other. Not used by a `CheckBox`.

<h3 id="imagestyle"><span class="dp"><code>ImageStyle</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="ImageStyle in context on the controls page" aria-label="ImageStyle in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the image that draws the box.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSet in context on the base element page" aria-label="MouseCursorsSet in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · Read-only. The cursors the element shows: its override, else the set given to the control it is a part of, else its type's general set, else <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#defaultmousecursorsset">`DefaultMouseCursorsSet`</a>.

<h3 id="mousecursorssetoverride"><span class="prop"><code>MouseCursorsSetOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="MouseCursorsSetOverride in context on the base element page" aria-label="MouseCursorsSetOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/mouse-cursors-set/">`MouseCursorsSet`</a> · The cursors of this element only, passed on to its parts that have none of their own.

<h3 id="styleoverride"><span class="prop"><code>StyleOverride</code></span> <a class="ctx" href="/docs/ui-base-element/#genericstyleandmousecursorsdata-properties" title="StyleOverride in context on the base element page" aria-label="StyleOverride in context on the base element page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/check-box-style/">`CheckBoxStyle`</a> · A style for this element only, applied over the general style. Setting it to null takes its values back out.

<h3 id="text"><span class="dp"><code>Text</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="Text in context on the controls page" aria-label="Text in context on the controls page">🠆</a></h3>

`string` · Creates a <a class="ref" href="/docs/ui-glossary/elements/label/">`Label`</a> content showing this text, styled by <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#textstyle">`TextStyle`</a>.

<h3 id="textstyle"><span class="dp"><code>TextStyle</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="TextStyle in context on the controls page" aria-label="TextStyle in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> · The style of the text content made from <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#text">`Text`</a>.

<h3 id="type"><span class="dp"><code>Type</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="Type in context on the controls page" aria-label="Type in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/check-box-type/">`CheckBoxType`</a> · `CheckBox` (the default) or `RadioButton`.

<h3 id="uncheckedsolidcolor"><span class="dp"><code>UncheckedSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="UncheckedSolidColor in context on the controls page" aria-label="UncheckedSolidColor in context on the controls page">🠆</a></h3>

`Color` · The color of the box while it is unchecked, without textures.

## Methods

<h3 id="checkbox"><span class="method"><code>CheckBox()</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-methods" title="CheckBox() in context on the controls page" aria-label="CheckBox() in context on the controls page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/elements/check-box/#checkbox">`CheckBox(string name = null)`</a> · Creates a check box. The name is used by <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a>.

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The element's <a class="ref prop" href="/docs/ui-glossary/elements/base-element/#name">`Name`</a>, which <a class="ref method" href="/docs/ui-glossary/elements/base-element/#getelementbyname">`GetElementByName`</a> finds it by. Default: `null`. |

## Events

<h3 id="oncheckedunchecked"><span class="event"><code>OnCheckedUnchecked</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-events" title="OnCheckedUnchecked in context on the controls page" aria-label="OnCheckedUnchecked in context on the controls page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> sender, bool isChecked)</code> · <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#checked">`Checked`</a> changes: by a click, from code, by a binding, or because another box of the group was checked.

| Parameter | Type | Description |
| --- | --- | --- |
| `sender` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element that raised the event. |
| `isChecked` | `bool` | Whether the box is checked now. |
