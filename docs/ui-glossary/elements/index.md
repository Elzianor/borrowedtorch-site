---
layout: docs
title: "UI glossary: elements"
description: "Every UI element with its properties, methods and events, one page per element."
---

Each element has a page listing its own properties, methods and events in alphabetical order, each with its type or signature and what it does. An element also has every member of the elements it derives from, so start with [the base element](/docs/ui-glossary/elements/base-element/), which every element derives from. The sidebar lists the members of each element under its name.

| Element | What it is |
| --- | --- |
| [Base element](/docs/ui-glossary/elements/base-element/) | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> is the abstract base of every element: buttons, labels, panels, windows and your own elements. |
| [`Border`](/docs/ui-glossary/elements/border/) | A frame around one <a class="ref dp" href="/docs/ui-glossary/elements/border/#content">`Content`</a> element, drawn in a solid colour or from eight textures. |
| [`Button`](/docs/ui-glossary/elements/button/) | A clickable element with a text or any element as content. |
| [`CheckBox`](/docs/ui-glossary/elements/check-box/) | A box with a text or any element beside it. |
| [`ColorPicker`](/docs/ui-glossary/elements/color-picker/) | A colour wheel to pick a colour from with a click. |
| [`ComboBox`](/docs/ui-glossary/elements/combo-box/) | A selection image, a toggle button and a drop-down list box: the closed combo box shows the selected row, the open one lists all rows to choose from. |
| [`ContentContainer`](/docs/ui-glossary/elements/content-container/) | The single-element holder that <a class="ref" href="/docs/ui-glossary/elements/border/">`Border`</a> (and a few controls, such as the check box) keep their content in, and the base class of <a class="ref" href="/docs/ui-glossary/elements/separator/">`Separator`</a>. |
| [`ContextMenu`](/docs/ui-glossary/elements/context-menu/) | A menu that opens at the mouse on a right click, drawn above everything. |
| [`ContextMenuItem`](/docs/ui-glossary/elements/context-menu-item/) | An item of a context menu: a check mark while it is checkable and checked, its content, and an arrow at the right end when it opens a sub-menu. |
| [`DefaultWindowTitleBar`](/docs/ui-glossary/elements/default-window-title-bar/) | The title bar every window starts with: a <a class="ref prop" href="/docs/ui-glossary/elements/default-window-title-bar/#background">`Background`</a> image filling the bar, a centred <a class="ref prop" href="/docs/ui-glossary/elements/default-window-title-bar/#title">`Title`</a> text and a |
| [`DragAndDropRepresentation`](/docs/ui-glossary/elements/drag-and-drop-representation/) | The image that follows the mouse during a drag and drop. |
| [`Grid`](/docs/ui-glossary/elements/grid/) | Lays its items out in columns and rows. |
| [`GridCell`](/docs/ui-glossary/elements/grid-cell/) | A cell the grid makes to hold the items of one place and span. |
| [`Image`](/docs/ui-glossary/elements/image/) | Draws a texture, stretched over the image, centred at its own size or repeated as tiles. |
| [`Label`](/docs/ui-glossary/elements/label/) | A light text element for captions, list rows and short descriptions. |
| [`ListBox`](/docs/ui-glossary/elements/list-box/) | A scrollable list of rows with single or multiple selection. |
| [`ListBoxItem`](/docs/ui-glossary/elements/list-box-item/) | A row of a list box. |
| [`ProgressBar`](/docs/ui-glossary/elements/progress-bar/) | A bar that fills in proportion to <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#value">`Value`</a> between <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a>. |
| [`RichTextBox`](/docs/ui-glossary/elements/rich-text-box/) | The full text element: read-only text with coloured words, links and inline images, or an editable text field with a caret, selection, clipboard and undo. |
| [`RootElement`](/docs/ui-glossary/elements/root-element/) |  |
| [`ScrollableContainer`](/docs/ui-glossary/elements/scrollable-container/) | Shows its items in a view of its own size and scrolls them when they are larger, with scroll bars, the mouse wheel or code. |
| [`Separator`](/docs/ui-glossary/elements/separator/) | An empty element to draw a dividing line or leave a gap: give it a size along one side, stretch it along the other, and it fills itself with its <a class="ref dp" href="/docs/ui-glossary/elements/base-element/#backgroundcolor">`BackgroundColor`</a>. |
| [`Slider`](/docs/ui-glossary/elements/slider/) | A track with a thumb that picks a value between <a class="ref dp" href="/docs/ui-glossary/elements/slider/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/slider/#max">`Max`</a>. |
| [`StackPanel`](/docs/ui-glossary/elements/stack-panel/) | Puts its items one after another, in a column or in a row, and fits their size. |
| [`Stencil`](/docs/ui-glossary/elements/stencil/) | Shows a picture through a mask texture: where the mask has the key colour, the picture shows, and the rest of the mask stays. |
| [`ToolTip`](/docs/ui-glossary/elements/tool-tip/) | A small popup that appears next to the mouse cursor while it rests over an element. |
| [`TreeView`](/docs/ui-glossary/elements/tree-view/) | A tree of <a class="ref" href="/docs/ui-glossary/elements/tree-view-item/">`TreeViewItem`</a>s shown as the rows of a list box. |
| [`TreeViewItem`](/docs/ui-glossary/elements/tree-view-item/) | An item of a tree view: an expand icon and its content, with leaves below it. |
| [`ViewPort`](/docs/ui-glossary/elements/view-port/) | Reserves a rectangle in the layout and runs your own drawing code inside it, for a 3D scene, a minimap or any other render embedded in the UI. |
| [`Window`](/docs/ui-glossary/elements/window/) | A frame with a title bar and a content area. |
