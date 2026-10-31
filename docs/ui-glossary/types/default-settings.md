---
layout: docs
legend: [dp]
title: "Glossary: DefaultSettings"
description: "The members of DefaultSettings, in alphabetical order."
---

<a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a> (namespace `BorrowedTorch.UI.Settings`) is a static class of public fields that hold framework-wide defaults. Set them at start, before you create elements. Most are read when the framework defaults of a style type are built, which happens once, the first time that style type is used (normally when the first element of the type is created, or when you touch `X.GeneralStyle`); changing them later doesn't reach that type. The ones marked "on use" are read each time they are needed.

A static class. The [styles page](/docs/ui-styles/#default-settings) shows it in context.

## Fields

<h3 id="defaultbordercolor"><code>DefaultBorderColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultBorderColor in context on the styles page" aria-label="DefaultBorderColor in context on the styles page">🠆</a></h3>

`Color` · Static. The frame color (<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a>) default of <a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a>. Default: `new(80, 80, 80, 255)`.

<h3 id="defaultborderthickness"><code>DefaultBorderThickness</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultBorderThickness in context on the styles page" aria-label="DefaultBorderThickness in context on the styles page">🠆</a></h3>

`int` · Static. The `Thickness` default of <a class="ref" href="/docs/ui-glossary/types/border-style/">`BorderStyle`</a>, in units. Default: `1`.

<h3 id="defaultbuttonhovercolor"><code>DefaultButtonHoverColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultButtonHoverColor in context on the styles page" aria-label="DefaultButtonHoverColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `HoverColor` default of <a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a>. Default: `new(200, 220, 240, 255)`.

<h3 id="defaultbuttonnormalcolor"><code>DefaultButtonNormalColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultButtonNormalColor in context on the styles page" aria-label="DefaultButtonNormalColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `NormalColor` default of <a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a>. Default: `new(225, 225, 230, 255)`.

<h3 id="defaultbuttonpressedcolor"><code>DefaultButtonPressedColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultButtonPressedColor in context on the styles page" aria-label="DefaultButtonPressedColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `PressedColor` default of <a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a>. Default: `new(160, 190, 225, 255)`.

<h3 id="defaultbuttontoggledcolor"><code>DefaultButtonToggledColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultButtonToggledColor in context on the styles page" aria-label="DefaultButtonToggledColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `ToggledColor` default of <a class="ref" href="/docs/ui-glossary/types/button-style/">`ButtonStyle`</a>. Default: `new(86, 156, 214, 255)`.

<h3 id="defaultcheckboxcheckedcolor"><code>DefaultCheckBoxCheckedColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultCheckBoxCheckedColor in context on the styles page" aria-label="DefaultCheckBoxCheckedColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `CheckedSolidColor` default of <a class="ref" href="/docs/ui-glossary/types/check-box-style/">`CheckBoxStyle`</a>. Default: `new(86, 156, 214, 255)`.

<h3 id="defaultcheckboxuncheckedcolor"><code>DefaultCheckBoxUncheckedColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultCheckBoxUncheckedColor in context on the styles page" aria-label="DefaultCheckBoxUncheckedColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `UncheckedSolidColor` default of <a class="ref" href="/docs/ui-glossary/types/check-box-style/">`CheckBoxStyle`</a>. Default: `new(150, 150, 160, 255)`.

<h3 id="defaultcomboboxbackgroundcolor"><code>DefaultComboBoxBackgroundColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultComboBoxBackgroundColor in context on the styles page" aria-label="DefaultComboBoxBackgroundColor in context on the styles page">🠆</a></h3>

`Color` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> default of <a class="ref" href="/docs/ui-glossary/types/combo-box-style/">`ComboBoxStyle`</a>. Default: `Color.White`.

<h3 id="defaultcomboboxtogglebuttonwidth"><code>DefaultComboBoxToggleButtonWidth</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultComboBoxToggleButtonWidth in context on the styles page" aria-label="DefaultComboBoxToggleButtonWidth in context on the styles page">🠆</a></h3>

`int` · Static. The width of the toggle button in the default `ToggleButtonStyle` of <a class="ref" href="/docs/ui-glossary/types/combo-box-style/">`ComboBoxStyle`</a>, in units. Default: `24`.

<h3 id="defaultcontextmenubackgroundcolor"><code>DefaultContextMenuBackgroundColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultContextMenuBackgroundColor in context on the styles page" aria-label="DefaultContextMenuBackgroundColor in context on the styles page">🠆</a></h3>

`Color` · Static. The background color of <a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a>'s default border. Default: `Color.White`.

<h3 id="defaultcontextmenubordercolor"><code>DefaultContextMenuBorderColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultContextMenuBorderColor in context on the styles page" aria-label="DefaultContextMenuBorderColor in context on the styles page">🠆</a></h3>

`Color` · Static. The border color of <a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a>'s default border. Default: `new(80, 80, 80, 255)`.

<h3 id="defaultcontextmenuhighlightcolor"><code>DefaultContextMenuHighlightColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultContextMenuHighlightColor in context on the styles page" aria-label="DefaultContextMenuHighlightColor in context on the styles page">🠆</a></h3>

`Color` · Static. The color of the hovered and selected rows of <a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a>'s default list style. Default: `new(200, 220, 240, 255)`.

<h3 id="defaultcontextmenuiconcolor"><code>DefaultContextMenuIconColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultContextMenuIconColor in context on the styles page" aria-label="DefaultContextMenuIconColor in context on the styles page">🠆</a></h3>

`Color` · Static. The color of the check and expand icons of <a class="ref" href="/docs/ui-glossary/types/context-menu-style/">`ContextMenuStyle`</a>. Default: `new(80, 80, 80, 255)`.

<h3 id="defaultdoubleclickintervalms"><code>DefaultDoubleClickIntervalMs</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultDoubleClickIntervalMs in context on the styles page" aria-label="DefaultDoubleClickIntervalMs in context on the styles page">🠆</a></h3>

`int` · Static. On use. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#doubleclickintervalms">`DoubleClickIntervalMs`</a> default of every element. Default: `300`.

<h3 id="defaultfontsize"><code>DefaultFontSize</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultFontSize in context on the styles page" aria-label="DefaultFontSize in context on the styles page">🠆</a></h3>

`int` · Static. The <span class="dp">`FontSize`</span> default of <a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> and <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>. Default: `14`.

<h3 id="defaultgridlayoutcolor"><code>DefaultGridLayoutColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultGridLayoutColor in context on the styles page" aria-label="DefaultGridLayoutColor in context on the styles page">🠆</a></h3>

`Color` · Static. The <a class="ref prop" href="/docs/ui-glossary/elements/grid/#layoutcolor">`LayoutColor`</a> of every <a class="ref" href="/docs/ui-glossary/elements/grid/">`Grid`</a>, read when a grid is created. Default: `new(255, 0, 0, 255)`.

<h3 id="defaultlistboxalternativeitemcolor"><code>DefaultListBoxAlternativeItemColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultListBoxAlternativeItemColor in context on the styles page" aria-label="DefaultListBoxAlternativeItemColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `AlternativeItemColor` default of <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a>, shown with `UseDualColors`. Default: `new(240, 240, 245, 255)`.

<h3 id="defaultlistboxbackgroundcolor"><code>DefaultListBoxBackgroundColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultListBoxBackgroundColor in context on the styles page" aria-label="DefaultListBoxBackgroundColor in context on the styles page">🠆</a></h3>

`Color` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> default of <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a>. Default: `Color.White`.

<h3 id="defaultlistboxhoveritemcolor"><code>DefaultListBoxHoverItemColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultListBoxHoverItemColor in context on the styles page" aria-label="DefaultListBoxHoverItemColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `HoverItemColor` default of <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a>. Default: `new(220, 232, 245, 255)`.

<h3 id="defaultlistboxitemheight"><code>DefaultListBoxItemHeight</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultListBoxItemHeight in context on the styles page" aria-label="DefaultListBoxItemHeight in context on the styles page">🠆</a></h3>

`int` · Static. The `ItemHeight` default of <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a>: the row height of a `Fixed` list, in units. Default: `24`.

<h3 id="defaultlistboxpresseditemcolor"><code>DefaultListBoxPressedItemColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultListBoxPressedItemColor in context on the styles page" aria-label="DefaultListBoxPressedItemColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `PressedItemColor` default of <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a>. Default: `new(160, 190, 225, 255)`.

<h3 id="defaultlistboxselecteditemcolor"><code>DefaultListBoxSelectedItemColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultListBoxSelectedItemColor in context on the styles page" aria-label="DefaultListBoxSelectedItemColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `SelectedItemColor` default of <a class="ref" href="/docs/ui-glossary/types/list-box-style/">`ListBoxStyle`</a>. Default: `new(190, 215, 240, 255)`.

<h3 id="defaultmaxdepth"><code>DefaultMaxDepth</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultMaxDepth in context on the styles page" aria-label="DefaultMaxDepth in context on the styles page">🠆</a></h3>

`float` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/view-port/#maxdepth">`MaxDepth`</a> default of <a class="ref" href="/docs/ui-glossary/types/view-port-style/">`ViewPortStyle`</a>. Default: `1`.

<h3 id="defaultmindepth"><code>DefaultMinDepth</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultMinDepth in context on the styles page" aria-label="DefaultMinDepth in context on the styles page">🠆</a></h3>

`float` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/view-port/#mindepth">`MinDepth`</a> default of <a class="ref" href="/docs/ui-glossary/types/view-port-style/">`ViewPortStyle`</a>. Default: `0`.

<h3 id="defaultprogressbarbackgroundcolor"><code>DefaultProgressBarBackgroundColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultProgressBarBackgroundColor in context on the styles page" aria-label="DefaultProgressBarBackgroundColor in context on the styles page">🠆</a></h3>

`Color` · Static. The track color (<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a>) default of <a class="ref" href="/docs/ui-glossary/types/progress-bar-style/">`ProgressBarStyle`</a>. Default: `new(225, 225, 230, 255)`.

<h3 id="defaultprogressbarcolor"><code>DefaultProgressBarColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultProgressBarColor in context on the styles page" aria-label="DefaultProgressBarColor in context on the styles page">🠆</a></h3>

`Color` · Static. The bar color (<a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a>) default of <a class="ref" href="/docs/ui-glossary/types/progress-bar-style/">`ProgressBarStyle`</a>. Default: `new(86, 156, 214, 255)`.

<h3 id="defaultresizeareahalfwidth"><code>DefaultResizeAreaHalfWidth</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultResizeAreaHalfWidth in context on the styles page" aria-label="DefaultResizeAreaHalfWidth in context on the styles page">🠆</a></h3>

`int` · Static. On use. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#resizeareahalfwidth">`ResizeAreaHalfWidth`</a> default of every element: half the width of the grips of a resizable element, in units. Default: `3`.

<h3 id="defaultresizecontourcolor"><code>DefaultResizeContourColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultResizeContourColor in context on the styles page" aria-label="DefaultResizeContourColor in context on the styles page">🠆</a></h3>

`Color` · Static. On use. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#resizecontourcolor">`ResizeContourColor`</a> default of every element. Default: `new(50, 50, 50, 190)`.

<h3 id="defaultresizecontourhalfwidth"><code>DefaultResizeContourHalfWidth</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultResizeContourHalfWidth in context on the styles page" aria-label="DefaultResizeContourHalfWidth in context on the styles page">🠆</a></h3>

`int` · Static. On use. Half the width of the contour drawn while an element is resized, in units. Default: `1`.

<h3 id="defaultscrollbarsbuttonscolor"><code>DefaultScrollBarsButtonsColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultScrollBarsButtonsColor in context on the styles page" aria-label="DefaultScrollBarsButtonsColor in context on the styles page">🠆</a></h3>

`Color` · Static. The color of the end buttons in the default `ScrollBarsStyle` of <a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a>. Default: `new(190, 190, 200, 255)`.

<h3 id="defaultscrollbarsthickness"><code>DefaultScrollBarsThickness</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultScrollBarsThickness in context on the styles page" aria-label="DefaultScrollBarsThickness in context on the styles page">🠆</a></h3>

`int` · Static. The `ScrollBarsThickness` default of <a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a> and <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>, in units. Default: `12`.

<h3 id="defaultscrollbarsthumbcolor"><code>DefaultScrollBarsThumbColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultScrollBarsThumbColor in context on the styles page" aria-label="DefaultScrollBarsThumbColor in context on the styles page">🠆</a></h3>

`Color` · Static. The thumb color in the default `ScrollBarsStyle` of <a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a>. Default: `new(150, 150, 160, 255)`.

<h3 id="defaultscrollbarstrackcolor"><code>DefaultScrollBarsTrackColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultScrollBarsTrackColor in context on the styles page" aria-label="DefaultScrollBarsTrackColor in context on the styles page">🠆</a></h3>

`Color` · Static. The color of both track halves in the default `ScrollBarsStyle` of <a class="ref" href="/docs/ui-glossary/types/scrollable-container-style/">`ScrollableContainerStyle`</a>. Default: `new(230, 230, 235, 255)`.

<h3 id="defaultseparatorcolor"><code>DefaultSeparatorColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultSeparatorColor in context on the styles page" aria-label="DefaultSeparatorColor in context on the styles page">🠆</a></h3>

`Color` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> default of every <a class="ref" href="/docs/ui-glossary/elements/separator/">`Separator`</a>, read when a separator is created. Default: `new(150, 150, 160, 255)`.

<h3 id="defaultsliderbuttonscolor"><code>DefaultSliderButtonsColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultSliderButtonsColor in context on the styles page" aria-label="DefaultSliderButtonsColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `ButtonsSolidColor` default of <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>. Default: `new(150, 150, 160, 255)`.

<h3 id="defaultsliderlinedecreasecolor"><code>DefaultSliderLineDecreaseColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultSliderLineDecreaseColor in context on the styles page" aria-label="DefaultSliderLineDecreaseColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `LineDecreaseSolidColor` default of <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>. Default: `new(86, 156, 214, 255)`.

<h3 id="defaultsliderlineincreasecolor"><code>DefaultSliderLineIncreaseColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultSliderLineIncreaseColor in context on the styles page" aria-label="DefaultSliderLineIncreaseColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `LineIncreaseSolidColor` default of <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>. Default: `new(150, 150, 160, 255)`.

<h3 id="defaultsliderthumbcolor"><code>DefaultSliderThumbColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultSliderThumbColor in context on the styles page" aria-label="DefaultSliderThumbColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `ThumbSolidColor` default of <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>. Default: `new(80, 80, 80, 255)`.

<h3 id="defaultsliderthumbminsize"><code>DefaultSliderThumbMinSize</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultSliderThumbMinSize in context on the styles page" aria-label="DefaultSliderThumbMinSize in context on the styles page">🠆</a></h3>

`float` · Static. The `ThumbMinSize` default of <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>, in units. Default: `10`.

<h3 id="defaultslidertickoffset"><code>DefaultSliderTickOffset</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultSliderTickOffset in context on the styles page" aria-label="DefaultSliderTickOffset in context on the styles page">🠆</a></h3>

`int` · Static. The `TickOffset` default of <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>, in units. Default: `2`.

<h3 id="defaultslidertickpassedcolor"><code>DefaultSliderTickPassedColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultSliderTickPassedColor in context on the styles page" aria-label="DefaultSliderTickPassedColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `TickPassedColor` default of <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>. Default: `new(86, 156, 214, 255)`.

<h3 id="defaultslidertickremainingcolor"><code>DefaultSliderTickRemainingColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultSliderTickRemainingColor in context on the styles page" aria-label="DefaultSliderTickRemainingColor in context on the styles page">🠆</a></h3>

`Color` · Static. The `TickRemainingColor` default of <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>. Default: `new(150, 150, 160, 255)`.

<h3 id="defaultsliderticksize"><code>DefaultSliderTickSize</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultSliderTickSize in context on the styles page" aria-label="DefaultSliderTickSize in context on the styles page">🠆</a></h3>

`Point` · Static. The `TickSize` default of <a class="ref" href="/docs/ui-glossary/types/slider-style/">`SliderStyle`</a>, in units. Default: `new(2, 2)`.

<h3 id="defaulttextcolor"><code>DefaultTextColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultTextColor in context on the styles page" aria-label="DefaultTextColor in context on the styles page">🠆</a></h3>

`Color` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#foregroundcolor">`ForegroundColor`</a> default of <a class="ref" href="/docs/ui-glossary/types/label-style/">`LabelStyle`</a> and <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>. Default: `Color.Black`.

<h3 id="defaulttextcursorblinktimems"><code>DefaultTextCursorBlinkTimeMs</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultTextCursorBlinkTimeMs in context on the styles page" aria-label="DefaultTextCursorBlinkTimeMs in context on the styles page">🠆</a></h3>

`int` · Static. How long the text cursor stays on and off, in milliseconds. Read when a text cursor starts blinking. Default: `500`.

<h3 id="defaulttextcursorcolor"><code>DefaultTextCursorColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultTextCursorColor in context on the styles page" aria-label="DefaultTextCursorColor in context on the styles page">🠆</a></h3>

`Color` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/rich-text-box/#textcursorcolor">`TextCursorColor`</a> default of <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>. Default: `Color.Black`.

<h3 id="defaulttextcursorthickness"><code>DefaultTextCursorThickness</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultTextCursorThickness in context on the styles page" aria-label="DefaultTextCursorThickness in context on the styles page">🠆</a></h3>

`int` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/rich-text-box/#textcursorthickness">`TextCursorThickness`</a> default of <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>, in units. Default: `1`.

<h3 id="defaulttextselectioncolor"><code>DefaultTextSelectionColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultTextSelectionColor in context on the styles page" aria-label="DefaultTextSelectionColor in context on the styles page">🠆</a></h3>

`Color` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/rich-text-box/#textselectioncolor">`TextSelectionColor`</a> default of <a class="ref" href="/docs/ui-glossary/types/rich-text-box-style/">`RichTextBoxStyle`</a>. Default: `Color.LightBlue`.

<h3 id="defaulttimebeforerepeatstartsms"><code>DefaultTimeBeforeRepeatStartsMs</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultTimeBeforeRepeatStartsMs in context on the styles page" aria-label="DefaultTimeBeforeRepeatStartsMs in context on the styles page">🠆</a></h3>

`int` · Static. On use. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebeforerepeatstartsms">`TimeBeforeRepeatStartsMs`</a> default of every element. Default: `1000`.

<h3 id="defaulttimebeforeshowtooltipms"><code>DefaultTimeBeforeShowToolTipMs</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultTimeBeforeShowToolTipMs in context on the styles page" aria-label="DefaultTimeBeforeShowToolTipMs in context on the styles page">🠆</a></h3>

`int` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/tool-tip/#timebeforeshowms">`TimeBeforeShowMs`</a> default of <a class="ref" href="/docs/ui-glossary/types/tool-tip-style/">`ToolTipStyle`</a>. Default: `500`.

<h3 id="defaulttimebetweenrepeatsms"><code>DefaultTimeBetweenRepeatsMs</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultTimeBetweenRepeatsMs in context on the styles page" aria-label="DefaultTimeBetweenRepeatsMs in context on the styles page">🠆</a></h3>

`int` · Static. On use. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#timebetweenrepeatsms">`TimeBetweenRepeatsMs`</a> default of every element. Default: `300`.

<h3 id="defaulttooltipbackgroundcolor"><code>DefaultToolTipBackgroundColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultToolTipBackgroundColor in context on the styles page" aria-label="DefaultToolTipBackgroundColor in context on the styles page">🠆</a></h3>

`Color` · Static. The <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a> default of <a class="ref" href="/docs/ui-glossary/types/tool-tip-style/">`ToolTipStyle`</a>. Default: `new(255, 255, 225, 255)`.

<h3 id="defaulttooltipmarginfrommousecursor"><code>DefaultToolTipMarginFromMouseCursor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultToolTipMarginFromMouseCursor in context on the styles page" aria-label="DefaultToolTipMarginFromMouseCursor in context on the styles page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · Static. The `MarginFromMouseCursor` default of <a class="ref" href="/docs/ui-glossary/types/tool-tip-style/">`ToolTipStyle`</a>, in units. Default: `(14, 14)`.

<h3 id="defaulttreeviewsubitemsshift"><code>DefaultTreeViewSubItemsShift</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultTreeViewSubItemsShift in context on the styles page" aria-label="DefaultTreeViewSubItemsShift in context on the styles page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/margin/">`Margin`</a> · Static. The `SubItemsShift` default of <a class="ref" href="/docs/ui-glossary/types/tree-view-style/">`TreeViewStyle`</a>: the indent of each level, in units. Default: `(16, 0)`.

<h3 id="defaultwindowbackgroundcolor"><code>DefaultWindowBackgroundColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultWindowBackgroundColor in context on the styles page" aria-label="DefaultWindowBackgroundColor in context on the styles page">🠆</a></h3>

`Color` · Static. The background color of <a class="ref" href="/docs/ui-glossary/types/window-style/">`WindowStyle`</a>'s default border. Default: `Color.Wheat`.

<h3 id="defaultwindowbordercolor"><code>DefaultWindowBorderColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultWindowBorderColor in context on the styles page" aria-label="DefaultWindowBorderColor in context on the styles page">🠆</a></h3>

`Color` · Static. The border color of <a class="ref" href="/docs/ui-glossary/types/window-style/">`WindowStyle`</a>'s default border. Default: `new(80, 80, 80, 255)`.

<h3 id="defaultwindowborderthickness"><code>DefaultWindowBorderThickness</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultWindowBorderThickness in context on the styles page" aria-label="DefaultWindowBorderThickness in context on the styles page">🠆</a></h3>

`int` · Static. The border thickness of <a class="ref" href="/docs/ui-glossary/types/window-style/">`WindowStyle`</a>'s default border. Default: `2`.

<h3 id="defaultwindowtitlebarcolor"><code>DefaultWindowTitleBarColor</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultWindowTitleBarColor in context on the styles page" aria-label="DefaultWindowTitleBarColor in context on the styles page">🠆</a></h3>

`Color` · Static. The background color of a window's default title bar, read when the title bar is created. Default: `Color.LightBlue`.

<h3 id="defaultwindowtitlethickness"><code>DefaultWindowTitleThickness</code> <a class="ctx" href="/docs/ui-styles/#default-settings" title="DefaultWindowTitleThickness in context on the styles page" aria-label="DefaultWindowTitleThickness in context on the styles page">🠆</a></h3>

`int` · Static. The height of a window's default title bar (its close button is 4 units smaller). Read when a window is created, and for the close button when the title bar is measured. Default: `30`.
