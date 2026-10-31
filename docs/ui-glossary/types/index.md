---
layout: docs
legend: [prop, dp, method, event]
title: "UI glossary: types"
description: "Every other type the UI provides: classes, structs, interfaces, enums and delegates, one page per type."
---

Every public type of the UI that isn't an element has a page with its members: the values of an enum, the properties, fields, methods and events of a class or a struct, the signature of a delegate. The styles come first, then every other type by kind, then the types of the markup package.

## Styles

| Style | What it is |
| --- | --- |
| [`BaseStyle`](/docs/ui-glossary/types/base-style/) | The abstract base of every style class. |
| [`BorderStyle`](/docs/ui-glossary/types/border-style/) | The style class of [`Border`](/docs/ui-layout/#border): the properties a style can set on it. |
| [`ButtonStyle`](/docs/ui-glossary/types/button-style/) | The style class of [`Button`](/docs/ui-controls/#button): the properties a style can set on it. |
| [`CheckBoxStyle`](/docs/ui-glossary/types/check-box-style/) | The style class of [`CheckBox`](/docs/ui-controls/#checkbox): the properties a style can set on it. |
| [`ColorPickerStyle`](/docs/ui-glossary/types/color-picker-style/) | The style class of [`ColorPicker`](/docs/ui-controls/#colorpicker): the properties a style can set on it. |
| [`ComboBoxStyle`](/docs/ui-glossary/types/combo-box-style/) | The style class of [`ComboBox`](/docs/ui-lists/#combobox): the properties a style can set on it. |
| [`ContextMenuStyle`](/docs/ui-glossary/types/context-menu-style/) | The style class of [`ContextMenu`](/docs/ui-lists/#contextmenu): the properties a style can set on it. |
| [`DefaultWindowTitleBarStyle`](/docs/ui-glossary/types/default-window-title-bar-style/) |  |
| [`ImageStyle`](/docs/ui-glossary/types/image-style/) | The style class of [`Image`](/docs/ui-images/#image): the properties a style can set on it. |
| [`LabelStyle`](/docs/ui-glossary/types/label-style/) | The style class of [`Label`](/docs/ui-text/#label): the properties a style can set on it. |
| [`ListBoxStyle`](/docs/ui-glossary/types/list-box-style/) | The style class of [`ListBox`](/docs/ui-lists/#listbox): the properties a style can set on it. |
| [`ProgressBarStyle`](/docs/ui-glossary/types/progress-bar-style/) | The style class of [`ProgressBar`](/docs/ui-controls/#progressbar): the properties a style can set on it. |
| [`RichTextBoxStyle`](/docs/ui-glossary/types/rich-text-box-style/) | The style class of [`RichTextBox`](/docs/ui-text/#richtextbox): the properties a style can set on it. |
| [`RootElementStyle`](/docs/ui-glossary/types/root-element-style/) | The style class of [`RootElement`](/docs/ui-base-element/#the-root-element): the properties a style can set on it. |
| [`ScrollableContainerStyle`](/docs/ui-glossary/types/scrollable-container-style/) | The style class of [`ScrollableContainer`](/docs/ui-layout/#scrollablecontainer): the properties a style can set on it. |
| [`SliderStyle`](/docs/ui-glossary/types/slider-style/) | The style class of [`Slider`](/docs/ui-controls/#slider): the properties a style can set on it. |
| [`StackPanelStyle`](/docs/ui-glossary/types/stack-panel-style/) | The style class of [`StackPanel`](/docs/ui-layout/#stackpanel): the properties a style can set on it. |
| [`StencilStyle`](/docs/ui-glossary/types/stencil-style/) | The style class of [`Stencil`](/docs/ui-images/#stencil): the properties a style can set on it. |
| [`ToolTipStyle`](/docs/ui-glossary/types/tool-tip-style/) | The style class of [`ToolTip`](/docs/ui-controls/#tooltip): the properties a style can set on it. |
| [`TreeViewStyle`](/docs/ui-glossary/types/tree-view-style/) | The style class of [`TreeView`](/docs/ui-lists/#treeview): the properties a style can set on it. |
| [`ViewPortStyle`](/docs/ui-glossary/types/view-port-style/) | The style class of [`ViewPort`](/docs/ui-images/#viewport): the properties a style can set on it. |
| [`WindowStyle`](/docs/ui-glossary/types/window-style/) | The style class of [`Window`](/docs/ui-layout/#window): the properties a style can set on it. |

## Others

### Classes

| Type | What it is |
| --- | --- |
| [`Animation<T>`](/docs/ui-glossary/types/animation/) | An animation of properties of type `T`. |
| [`BaseAnimation`](/docs/ui-glossary/types/base-animation/) | The abstract base of animations, the type `AddAnimation` takes. |
| [`BaseAnimationFrame<T>`](/docs/ui-glossary/types/base-animation-frame/) | The abstract base of the frames an <code><a href="/docs/ui-glossary/types/animation/">Animation</a>&lt;T&gt;</code> takes. |
| [`Bindable`](/docs/ui-glossary/types/bindable/) | The abstract base of a view model. |
| [`BindableCollection<T>`](/docs/ui-glossary/types/bindable-collection/) | A list that raises <a class="ref event" href="/docs/ui-glossary/types/bindable-collection/#oncollectionchanged">`OnCollectionChanged`</a> for every change, so a bound <a class="ref" href="/docs/ui-glossary/elements/list-box/">`ListBox`</a>, <a class="ref" href="/docs/ui-glossary/elements/combo-box/">`ComboBox`</a>, <a class="ref" href="/docs/ui-glossary/elements/tree-view/">`TreeView`</a> or <a class="ref" href="/docs/ui-glossary/elements/context-menu/">`ContextMenu`</a> updates only the changed rows. |
| [`BorrowedTorchUI`](/docs/ui-glossary/types/borrowed-torch-ui/) | The UI itself: it holds the root element, updates and draws the tree, and tells the game whether it has the mouse and the keys. |
| [`DefaultSettings`](/docs/ui-glossary/types/default-settings/) | <a class="ref" href="/docs/ui-glossary/types/default-settings/">`DefaultSettings`</a> (namespace `BorrowedTorch.UI.Settings`) is a static class of public fields that hold framework-wide defaults. |
| [`DependencyProperty<T>`](/docs/ui-glossary/types/dependency-property/) |  |
| [`DependencyPropertyActions<T>`](/docs/ui-glossary/types/dependency-property-actions/) | What the properties of one name share over all the elements of a class: the class's own pre- and post-action (set once, in its static constructor) and the default value. |
| [`DiscreteAnimationFrame<T>`](/docs/ui-glossary/types/discrete-animation-frame/) | Sets <a class="ref prop" href="/docs/ui-glossary/types/discrete-animation-frame/#value">`Value`</a> when the time line reaches <a class="ref prop" href="/docs/ui-glossary/types/discrete-animation-frame/#applyatms">`ApplyAtMs`</a>. |
| [`DisplayScale`](/docs/ui-glossary/types/display-scale/) | Reads the Windows display scale of the monitor a window is on. |
| [`DisposableBase`](/docs/ui-glossary/types/disposable-base/) | The base class of <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a>, with the dispose pattern every element uses. |
| [`DragAndDropCursors`](/docs/ui-glossary/types/drag-and-drop-cursors/) | The cursors of [drag and drop](/docs/ui-images/#drag-and-drop). |
| [`ElementStateData`](/docs/ui-glossary/types/element-state-data/) | The state an element shows, passed to <a class="ref event" href="/docs/ui-glossary/elements/base-element/#onstatechanged">`OnStateChanged`</a>. |
| [`GameWindowTextInputEvents`](/docs/ui-glossary/types/game-window-text-input-events/) | An <a class="ref" href="/docs/ui-glossary/types/i-text-input-events/">`ITextInputEvents`</a> that forwards a MonoGame window's events. |
| [`GenericMouseCursorsData<T>`](/docs/ui-glossary/types/generic-mouse-cursors-data/) | The static holder of the general mouse cursors set of one element type, keyed by its style class `T`. |
| [`GenericStyle<T>`](/docs/ui-glossary/types/generic-style/) | The static holder of the general style of one style type, where `T` is the style class. |
| [`GenericStyleAndMouseCursorsData<TStyle>`](/docs/ui-glossary/types/generic-style-and-mouse-cursors-data/) | `TStyle` is a style class (deriving from <a class="ref" href="/docs/ui-glossary/types/base-style/">`BaseStyle`</a>, with a parameterless constructor). |
| [`KeyDownEventArgs`](/docs/ui-glossary/types/key-down-event-args/) |  |
| [`MouseClickEventArgs`](/docs/ui-glossary/types/mouse-click-event-args/) | What `OnClick` and <a class="ref event" href="/docs/ui-glossary/elements/base-element/#ondoubleclick">`OnDoubleClick`</a> get, taken when the click happens. |
| [`MouseCursorsSet`](/docs/ui-glossary/types/mouse-cursors-set/) | The cursors an element shows. |
| [`ResizeCursors`](/docs/ui-glossary/types/resize-cursors/) | The cursors of the eight grips around a [resizable](/docs/ui-base-element/#resizing) element. |
| [`RichTextCursors`](/docs/ui-glossary/types/rich-text-cursors/) | The cursors over the text of a [`RichTextBox`](/docs/ui-text/#richtextbox). |
| [`RunBoundaryValues<T>`](/docs/ui-glossary/types/run-boundary-values/) | Values set on the animated properties outside the frames: <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#startvalue">`StartValue`</a> when the animation first starts, <a class="ref prop" href="/docs/ui-glossary/types/run-boundary-values/#endvalue">`EndValue`</a> when it completes. |
| [`SmoothAnimationFrame<T>`](/docs/ui-glossary/types/smooth-animation-frame/) | Goes from <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#from">`From`</a> to <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#to">`To`</a> between <a class="ref prop" href="/docs/ui-glossary/types/smooth-animation-frame/#startatms">`StartAtMs`</a> and `StartAtMs + DurationMs` of the time line, and goes back the same way when the time line reverses. |
| [`SourceData`](/docs/ui-glossary/types/source-data/) | The value of <a class="ref dp" href="/docs/ui-glossary/elements/image/#source">`Image.Source`</a>: a wrapper around a texture that you rarely write yourself, since a <a class="ref method" href="/docs/ui-glossary/types/source-data/#texture2d">`Texture2D`</a> or a content path converts to it. |
| [`TabControl`](/docs/ui-glossary/types/tab-control/) | Not an element but a helper: it pairs tab elements with content elements and shows only the content of the open tab. |

### Structs

| Type | What it is |
| --- | --- |
| [`Margin`](/docs/ui-glossary/types/margin/) | A small read-only struct with one value per side. |

### Interfaces

| Type | What it is |
| --- | --- |
| [`IBindableCollection`](/docs/ui-glossary/types/i-bindable-collection/) | An `IEnumerable` that reports its changes. |
| [`IConverter`](/docs/ui-glossary/types/i-converter/) | Translates between the source's type and the property's type. |
| [`IItemsTemplate`](/docs/ui-glossary/types/i-items-template/) | A list's <span class="prop">`ItemsTemplate`</span>. |
| [`ITextInputEvents`](/docs/ui-glossary/types/i-text-input-events/) | The source of typed text and key presses, for a UI hosted outside a game window. |

### Enums

| Type | What it is |
| --- | --- |
| [`AnimationRepeatType`](/docs/ui-glossary/types/animation-repeat-type/) |  |
| [`AnimationState`](/docs/ui-glossary/types/animation-state/) |  |
| [`BindingMode`](/docs/ui-glossary/types/binding-mode/) |  |
| [`ButtonType`](/docs/ui-glossary/types/button-type/) |  |
| [`CheckBoxDirection`](/docs/ui-glossary/types/check-box-direction/) |  |
| [`CheckBoxType`](/docs/ui-glossary/types/check-box-type/) |  |
| [`CollectionChangeType`](/docs/ui-glossary/types/collection-change-type/) | Passed to `OnSourceCollectionChanged`. |
| [`ContextMenuPlacement`](/docs/ui-glossary/types/context-menu-placement/) |  |
| [`ContextMenuSubMenusOpenType`](/docs/ui-glossary/types/context-menu-sub-menus-open-type/) |  |
| [`DragType`](/docs/ui-glossary/types/drag-type/) |  |
| [`ElementState`](/docs/ui-glossary/types/element-state/) | From the lowest to the highest. |
| [`HorizontalAlignment`](/docs/ui-glossary/types/horizontal-alignment/) |  |
| [`ImageFill`](/docs/ui-glossary/types/image-fill/) |  |
| [`InheritState`](/docs/ui-glossary/types/inherit-state/) | A set of flags: the values combine. |
| [`ListBoxSelectionMode`](/docs/ui-glossary/types/list-box-selection-mode/) |  |
| [`ListBoxVirtualizationMode`](/docs/ui-glossary/types/list-box-virtualization-mode/) |  |
| [`Orientation`](/docs/ui-glossary/types/orientation/) | Used by <a class="ref" href="/docs/ui-glossary/elements/stack-panel/">`StackPanel`</a>, <a class="ref" href="/docs/ui-glossary/elements/slider/">`Slider`</a> and <a class="ref" href="/docs/ui-glossary/elements/progress-bar/">`ProgressBar`</a>, see [layout](/docs/ui-layout/) and [controls](/docs/ui-controls/). |
| [`ResizeState`](/docs/ui-glossary/types/resize-state/) |  |
| [`RichTextBoxFormatting`](/docs/ui-glossary/types/rich-text-box-formatting/) |  |
| [`RichTextBoxInputType`](/docs/ui-glossary/types/rich-text-box-input-type/) |  |
| [`RichTextBoxType`](/docs/ui-glossary/types/rich-text-box-type/) |  |
| [`ScrollBars`](/docs/ui-glossary/types/scroll-bars/) |  |
| [`SliderType`](/docs/ui-glossary/types/slider-type/) |  |
| [`StateSource`](/docs/ui-glossary/types/state-source/) |  |
| [`TextAlignment`](/docs/ui-glossary/types/text-alignment/) | Also used by <a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a>. |
| [`TextRotation`](/docs/ui-glossary/types/text-rotation/) |  |
| [`TextWrap`](/docs/ui-glossary/types/text-wrap/) | Also used by <a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a>. |
| [`TickPlacement`](/docs/ui-glossary/types/tick-placement/) |  |
| [`ToolTipPlacement`](/docs/ui-glossary/types/tool-tip-placement/) |  |
| [`ValueSources`](/docs/ui-glossary/types/value-sources/) |  |
| [`VerticalAlignment`](/docs/ui-glossary/types/vertical-alignment/) |  |
| [`VerticalTextAlignment`](/docs/ui-glossary/types/vertical-text-alignment/) | Also used by <a class="ref" href="/docs/ui-glossary/elements/rich-text-box/">`RichTextBox`</a>. |
| [`Visibility`](/docs/ui-glossary/types/visibility/) |  |

### Delegates

| Type | What it is |
| --- | --- |
| [`BaseElement.Click`](/docs/ui-glossary/types/base-element-click/) |  |
| [`BaseElement.Disposed`](/docs/ui-glossary/types/base-element-disposed/) |  |
| [`BaseElement.DoubleClick`](/docs/ui-glossary/types/base-element-double-click/) |  |
| [`BaseElement.DragAndDropStart`](/docs/ui-glossary/types/base-element-drag-and-drop-start/) |  |
| [`BaseElement.Drop`](/docs/ui-glossary/types/base-element-drop/) |  |
| [`BaseElement.DropDenied`](/docs/ui-glossary/types/base-element-drop-denied/) |  |
| [`BaseElement.IfDropAllowed`](/docs/ui-glossary/types/base-element-if-drop-allowed/) |  |
| [`BaseElement.KeyDown`](/docs/ui-glossary/types/base-element-key-down/) |  |
| [`BaseElement.MouseEnter`](/docs/ui-glossary/types/base-element-mouse-enter/) |  |
| [`BaseElement.MouseLeave`](/docs/ui-glossary/types/base-element-mouse-leave/) |  |
| [`BaseElement.StateChanged`](/docs/ui-glossary/types/base-element-state-changed/) |  |
| [`Bindable.PropertyChanged`](/docs/ui-glossary/types/bindable-property-changed/) |  |
| [`Button.Toggled`](/docs/ui-glossary/types/button-toggled/) |  |
| [`CheckBox.CheckedUnchecked`](/docs/ui-glossary/types/check-box-checked-unchecked/) |  |
| [`ColorPicker.SelectedColorChanged`](/docs/ui-glossary/types/color-picker-selected-color-changed/) |  |
| [`ContextMenu.ItemSelect`](/docs/ui-glossary/types/context-menu-item-select/) |  |
| [`DependencyProperty<T>.OwnerPreActionDelegate`](/docs/ui-glossary/types/dependency-property-owner-pre-action-delegate/) |  |
| [`DependencyProperty<T>.PreActionDelegate`](/docs/ui-glossary/types/dependency-property-pre-action-delegate/) |  |
| [`DependencyProperty<T>.PropertyChanged`](/docs/ui-glossary/types/dependency-property-property-changed/) |  |
| [`DependencyProperty<T>.SourceCollectionChanged`](/docs/ui-glossary/types/dependency-property-source-collection-changed/) |  |
| [`DependencyProperty<T>.SourcePropertyChanged`](/docs/ui-glossary/types/dependency-property-source-property-changed/) |  |
| [`GenericMouseCursorsData<T>.MouseCursorsChanged`](/docs/ui-glossary/types/generic-mouse-cursors-data-mouse-cursors-changed/) |  |
| [`GenericStyle<T>.StyleChanged`](/docs/ui-glossary/types/generic-style-style-changed/) |  |
| [`IBindableCollection.CollectionChanged`](/docs/ui-glossary/types/i-bindable-collection-collection-changed/) |  |
| [`ListBox.ItemSelect`](/docs/ui-glossary/types/list-box-item-select/) |  |
| [`ListBox.ItemsSelect`](/docs/ui-glossary/types/list-box-items-select/) |  |
| [`RichTextBox.Apply`](/docs/ui-glossary/types/rich-text-box-apply/) |  |
| [`RichTextBox.TextChanged`](/docs/ui-glossary/types/rich-text-box-text-changed/) |  |
| [`Slider.ValueChanged`](/docs/ui-glossary/types/slider-value-changed/) |  |
| [`TabControl.TabOpened`](/docs/ui-glossary/types/tab-control-tab-opened/) |  |
| [`TreeView.ItemSelect`](/docs/ui-glossary/types/tree-view-item-select/) |  |

## Markup

The types of the [BorrowedTorch.UI.Markup](/docs/ui-markup/) package, which builds elements from XML markup.

| Type | What it is |
| --- | --- |
| [`MarkupContext`](/docs/ui-glossary/types/markup-context/) | What a markup reaches besides the UI's own types: event handlers, a data context, style dictionaries, how its files are read, and types and converters of your own. |
| [`MarkupDocument`](/docs/ui-glossary/types/markup-document/) | What a markup made: its elements, every element made for them, disposed at once, and its elements as written. |
| [`MarkupException`](/docs/ui-glossary/types/markup-exception/) | A markup that can't be read: what is wrong, and the line and the column. |
| [`MarkupNode`](/docs/ui-glossary/types/markup-node/) | An element of a markup as it is written: the element made, its file, line and column, and the elements in it. |
| [`StyleDictionary`](/docs/ui-glossary/types/style-dictionary/) | The styles of a style dictionary: keyed ones for markups to name, and general ones to apply. |
| [`UiMarkup`](/docs/ui-glossary/types/ui-markup/) | Builds elements from a markup string or file, and reads style dictionaries. |
