---
layout: docs
title: "Glossary: ContentContainer"
description: The properties, methods and events of ContentContainer, in alphabetical order.
---

The single-element holder that `Border` (and a few controls, such as the check box) keep their content in, and the base class of `Separator`. It doesn't take the mouse and shows the mouse cursors of the element it belongs to.

`ContentContainer` derives from [`BaseElement`](/docs/ui-glossary/base-element/) and has its members too. The [layout page](/docs/ui-layout/#contentcontainer) shows it in context, with code and screenshots.

Badges tell what each name is: <span class="kb kb-prop">P</span> a plain property, <span class="kb kb-method">M</span> a method, <span class="kb kb-event">E</span> an event, and <span class="kb kb-dp">DP</span> a dependency property, which a style, a binding or an animation can set.

## Properties

<h3 id="content"><span class="prop"><code>Content</code></span></h3>

`BaseElement` · Read-only. The element the container holds: its first item, or null.

<h3 id="mousecursorsset"><span class="prop"><code>MouseCursorsSet</code></span></h3>

`MouseCursorsSet` · Read-only. The cursors of the container's parent, so the container shows the cursors of its control.
