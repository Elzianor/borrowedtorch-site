---
layout: docs
legend: [prop, dp, method]
title: "Glossary: ComboBoxStyle"
description: "The members of ComboBoxStyle, in alphabetical order."
---

The style class of [`ComboBox`](/docs/ui-lists/#combobox): the properties a style can set on it. Part styles <a class="ref prop" href="/docs/ui-glossary/types/combo-box-style/#selectionstyle">`SelectionStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a>), <a class="ref prop" href="/docs/ui-glossary/types/combo-box-style/#togglebuttonstyle">`ToggleButtonStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a>) and <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> (<a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a>). Framework defaults: aligned left and top, <a class="ref" href="/docs/ui-glossary/types/inherit-state/#fromchildren">`InheritState.FromChildren`</a>, <a class="ref prop" href="/docs/ui-glossary/types/base-style/#backgroundcolor">`BackgroundColor`</a> `DefaultComboBoxBackgroundColor`, and a `ToggleButtonStyle` `DefaultComboBoxToggleButtonWidth` (24) wide with the text `v`. The toggle button's colors and the drop-down list's are the defaults of `Button` and `ListBox`.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="listboxstyle"><span class="prop"><code>ListBoxStyle</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="ListBoxStyle in context on the lists and menus page" aria-label="ListBoxStyle in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a> · The style of the drop-down list, for example its row colors.

<h3 id="selectionstyle"><span class="prop"><code>SelectionStyle</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="SelectionStyle in context on the lists and menus page" aria-label="SelectionStyle in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/image-style/">`ImageStyle`</a> · The style of the image that shows the selected row. The image is only as large as the row's content, so a background color here lies just behind the chosen value; the combo box's own <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> colors the whole field.

<h3 id="togglebuttonstyle"><span class="prop"><code>ToggleButtonStyle</code></span> <a class="ctx" href="/docs/ui-lists/#combobox-properties" title="ToggleButtonStyle in context on the lists and menus page" aria-label="ToggleButtonStyle in context on the lists and menus page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a> · The style of the [button](/docs/ui-controls/#button) that opens and closes the list, for example its width and text. Unless set, a button 24 units wide (<a class="ref" href="/docs/ui-glossary/types/default-settings/#defaultcomboboxtogglebuttonwidth">`DefaultSettings.DefaultComboBoxToggleButtonWidth`</a>) with the text `v`, in the colors of the other buttons.

## Methods

<h3 id="comboboxstyle"><span class="method"><code>ComboBoxStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/combo-box-style/#comboboxstyle">`ComboBoxStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/combo-box-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.

| Parameter | Type | Description |
| --- | --- | --- |
| `propertyName` | `string` | The name of a property of the style; `nameof` keeps it right. |
