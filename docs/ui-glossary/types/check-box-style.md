---
layout: docs
legend: [prop, dp, method, event]
title: "Glossary: CheckBoxStyle"
description: "The members of CheckBoxStyle, in alphabetical order."
---

The style class of [`CheckBox`](/docs/ui-controls/#checkbox): the properties a style can set on it. Part styles <a class="ref prop" href="/docs/ui-glossary/types/check-box-style/#textstyle">`TextStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a>) and <a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>). Leaves out `Content`. Framework defaults: `CheckedSolidColor` `DefaultCheckBoxCheckedColor`, `UncheckedSolidColor` `DefaultCheckBoxUncheckedColor`.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="checked"><span class="prop"><code>Checked</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="Checked in context on the controls page" aria-label="Checked in context on the controls page">🠆</a></h3>

`bool` · Whether the box is checked. Setting it raises <a class="ref event" href="/docs/ui-glossary/elements/check-box/#oncheckedunchecked">`OnCheckedUnchecked`</a>, and checking a radio button unchecks the others of its group.

<h3 id="checkedsolidcolor"><span class="prop"><code>CheckedSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="CheckedSolidColor in context on the controls page" aria-label="CheckedSolidColor in context on the controls page">🠆</a></h3>

`Color` · The color of the box while it is checked, without textures. `(86, 156, 214)` unless set (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultcheckboxcheckedcolor">`DefaultSettings.DefaultCheckBoxCheckedColor`</a>).

<h3 id="direction"><span class="prop"><code>Direction</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="Direction in context on the controls page" aria-label="Direction in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/check-box-direction/">`CheckBoxDirection`</a> · Which side of the content the box is on: `Left` (the default) or `Right`.

<h3 id="groupid"><span class="prop"><code>GroupId</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="GroupId in context on the controls page" aria-label="GroupId in context on the controls page">🠆</a></h3>

`string` · The group of a radio button: the radio buttons in the tree with the same id uncheck each other. Not used by a <a class="ref" href="/docs/ui-glossary/elements/check-box/">`CheckBox`</a>.

<h3 id="imagestyle"><span class="prop"><code>ImageStyle</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="ImageStyle in context on the controls page" aria-label="ImageStyle in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the image that draws the box.

<h3 id="text"><span class="prop"><code>Text</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="Text in context on the controls page" aria-label="Text in context on the controls page">🠆</a></h3>

`string` · Creates a <a class="ref" href="/docs/ui-glossary/elements/label/">`Label`</a> content showing this text, styled by <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#textstyle">`TextStyle`</a>.

<h3 id="textstyle"><span class="prop"><code>TextStyle</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="TextStyle in context on the controls page" aria-label="TextStyle in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> · The style of the text content made from <a class="ref dp" href="/docs/ui-glossary/elements/check-box/#text">`Text`</a>.

<h3 id="type"><span class="prop"><code>Type</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="Type in context on the controls page" aria-label="Type in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/check-box-type/">`CheckBoxType`</a> · <a class="ref" href="/docs/ui-glossary/elements/check-box/">`CheckBox`</a> (the default) or `RadioButton`.

<h3 id="uncheckedsolidcolor"><span class="prop"><code>UncheckedSolidColor</code></span> <a class="ctx" href="/docs/ui-controls/#checkbox-properties" title="UncheckedSolidColor in context on the controls page" aria-label="UncheckedSolidColor in context on the controls page">🠆</a></h3>

`Color` · The color of the box while it is unchecked, without textures. `(150, 150, 160)` unless set (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultcheckboxuncheckedcolor">`DefaultSettings.DefaultCheckBoxUncheckedColor`</a>).

## Methods

<h3 id="checkboxstyle"><span class="method"><code>CheckBoxStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/check-box-style/#checkboxstyle">`CheckBoxStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/check-box-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.

| Parameter | Type | Description |
| --- | --- | --- |
| `propertyName` | `string` | The name of a property of the style; `nameof` keeps it right. |
