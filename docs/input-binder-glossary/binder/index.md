---
layout: docs
title: "Input binder glossary: the binder"
description: "The binder, the handle of an action, and what a bind returns, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each class under its name. An enum's page lists its values.

| Type | What it is |
| --- | --- |
| [`InputBinder`](/docs/input-binder-glossary/binder/input-binder/) | Holds the actions and their bindings: registers, finds and unregisters actions, and runs them every frame. |
| [`RegisteredActionHandle`](/docs/input-binder-glossary/binder/registered-action-handle/) | One registered action: its name, shape and bindings, and the methods that bind and unbind its inputs. |
| [`BindResult`](/docs/input-binder-glossary/binder/bind-result/) | What a bind returns: success or why not, and on a conflict the action that has the input. |
| [`InputBinderResult`](/docs/input-binder-glossary/binder/input-binder-result/) | Why a bind succeeded or didn't, one value per reason. |
