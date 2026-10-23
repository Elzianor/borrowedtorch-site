---
layout: docs
legend: [prop, method, event]
title: "Glossary: DependencyProperty&lt;T&gt;"
description: "The members of DependencyProperty<T>, in alphabetical order."
---

A class. The [styles page](/docs/ui-styles/#dependencypropertyt-properties) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="postaction"><span class="prop"><code>PostAction</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-properties" title="PostAction in context on the styles page" aria-label="PostAction in context on the styles page">🠆</a></h3>

`Action<T>` · Called with the new value in effect after the element class's own reaction (its `OwnerPostAction`), only when the value in effect changes (see [setting a value](/docs/ui-styles/#setting-a-value)), before <a class="ref event" href="/docs/ui-glossary/types/dependency-property/#onpropertychanged">`OnPropertyChanged`</a>.

<h3 id="preaction"><span class="prop"><code>PreAction</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-properties" title="PreAction in context on the styles page" aria-label="PreAction in context on the styles page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/dependency-property-pre-action-delegate/">`PreActionDelegate`</a> · Called with `(ref T value, ref bool canProceed)` before every value is stored, from any source: change `value` to correct it, or set `canProceed` to `false` to reject it. It runs after the element class's own check (its `OwnerPreAction`), so it gets the value the element already corrected, and it doesn't run for a value the element rejected (see [setting a value](/docs/ui-styles/#setting-a-value)).

<h3 id="value"><span class="prop"><code>Value</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-properties" title="Value in context on the styles page" aria-label="Value in context on the styles page">🠆</a></h3>

`T` · Read-only. The value in effect: the one of the highest priority source, or the default when no source has one.

<h3 id="valuesource"><span class="prop"><code>ValueSource</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-properties" title="ValueSource in context on the styles page" aria-label="ValueSource in context on the styles page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/value-sources/">`ValueSources`</a> · Read-only. The source the value in effect comes from, `None` when the property reads its default.

## Methods

<h3 id="dependencyproperty"><span class="method"><code>DependencyProperty()</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-methods" title="DependencyProperty() in context on the styles page" aria-label="DependencyProperty() in context on the styles page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/dependency-property/#dependencyproperty">DependencyProperty</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> owner, Action&lt;T&gt; postAction = null, <a href="/docs/ui-glossary/types/dependency-property-pre-action-delegate/">PreActionDelegate</a> preAction = null)</code></span> · Creates a stand-alone property owned by an element, with an optional post- and pre-action. Its default is `default(T)`.

| Parameter | Type | Description |
| --- | --- | --- |
| `owner` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element the property belongs to, passed to the owner actions. |
| `postAction` | `Action<T>` | Called with the new value whenever the value in effect changes. Default: `null`. |
| `preAction` | <a class="ref" href="/docs/ui-glossary/types/dependency-property-pre-action-delegate/">`PreActionDelegate`</a> | Checks every value before it is stored: it can change the value or reject it. Default: `null`. |

<span class="method"><code><a href="/docs/ui-glossary/types/dependency-property/#dependencyproperty">DependencyProperty</a>(<a href="/docs/ui-glossary/elements/base-element/">BaseElement</a> owner, <a href="/docs/ui-glossary/types/dependency-property-actions/">DependencyPropertyActions</a>&lt;T&gt; actions)</code></span> · Creates a property that shares the element class's actions and default; the generated `FooDP` properties use it.

| Parameter | Type | Description |
| --- | --- | --- |
| `owner` | <a class="ref" href="/docs/ui-glossary/elements/base-element/">`BaseElement`</a> | The element the property belongs to, passed to the owner actions. |
| `actions` | <code><a href="/docs/ui-glossary/types/dependency-property-actions/">DependencyPropertyActions</a>&lt;T&gt;</code> | The shared actions and default of the element class's property (`FooDPActions`). |

<h3 id="bind"><span class="method"><code>Bind()</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-methods" title="Bind() in context on the styles page" aria-label="Bind() in context on the styles page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/dependency-property/#bind">Bind</a>(object dataContext, string sourcePropertyName, <a href="/docs/ui-glossary/types/binding-mode/">BindingMode</a> mode, <a href="/docs/ui-glossary/types/i-converter/">IConverter</a> converter = null)</code></span> · Binds the property to a public property of `dataContext`, replacing any earlier binding. See [bindings](/docs/ui-styles/#bindings).

| Parameter | Type | Description |
| --- | --- | --- |
| `dataContext` | `object` | The source object, usually a <a class="ref" href="/docs/ui-glossary/types/bindable/">`Bindable`</a> view model, whose property changes the binding follows. |
| `sourcePropertyName` | `string` | The name of the source's public property; `nameof` keeps it right. |
| `mode` | <a class="ref" href="/docs/ui-glossary/types/binding-mode/">`BindingMode`</a> | Which way the values go: `OneWay` (source to property), `OneWayToSource` (property to source) or `TwoWay`. |
| `converter` | <a class="ref" href="/docs/ui-glossary/types/i-converter/">`IConverter`</a> | Converts the values between the source's type and the property's, or `null` when they are the same. Default: `null`. |

<h3 id="clearvalue"><span class="method"><code>ClearValue()</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-methods" title="ClearValue() in context on the styles page" aria-label="ClearValue() in context on the styles page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/dependency-property/#clearvalue">ClearValue</a>(<a href="/docs/ui-glossary/types/value-sources/">ValueSources</a> valueSource)</code></span> · Removes the value of that source. If it was the value in effect, the next source (or the default) takes over and the change is raised when the value differs.

| Parameter | Type | Description |
| --- | --- | --- |
| `valueSource` | <a class="ref" href="/docs/ui-glossary/types/value-sources/">`ValueSources`</a> | The source whose value is removed. |

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-methods" title="Dispose() in context on the styles page" aria-label="Dispose() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/dependency-property/#dispose">`Dispose()`</a> · Removes the binding and the event handlers. The element calls it when it is disposed.

<h3 id="setvalue"><span class="method"><code>SetValue()</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-methods" title="SetValue() in context on the styles page" aria-label="SetValue() in context on the styles page">🠆</a></h3>

<span class="method"><code><a href="/docs/ui-glossary/types/dependency-property/#setvalue">SetValue</a>(T value, bool checkForEquality = true, bool setSourceValue = true, <a href="/docs/ui-glossary/types/value-sources/">ValueSources</a> valueSource = <a href="/docs/ui-glossary/types/value-sources/#manualassign">ValueSources.ManualAssign</a>)</code></span> · Stores the value for the source. With `checkForEquality` off, the same value raises the change again. With `setSourceValue` off, a bound source is not written.

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `T` | The value to store. |
| `checkForEquality` | `bool` | Whether storing a value equal to the stored one stops there; with `false` the change is raised again. Default: `true`. |
| `setSourceValue` | `bool` | Whether a bound source property is written too (`TwoWay` and `OneWayToSource` bindings). Default: `true`. |
| `valueSource` | <a class="ref" href="/docs/ui-glossary/types/value-sources/">`ValueSources`</a> | The source the value is stored for: `ManualAssign` (code), `StyleOverride` or `GeneralStyle`. Default: <a class="ref" href="/docs/ui-glossary/types/value-sources/#manualassign">`ValueSources.ManualAssign`</a>. |

## Events

<h3 id="onpropertychanged"><span class="event"><code>OnPropertyChanged</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-events" title="OnPropertyChanged in context on the styles page" aria-label="OnPropertyChanged in context on the styles page">🠆</a></h3>

`(T value)` · The value in effect changes. The handler gets the new value.

<h3 id="onsourcecollectionchanged"><span class="event"><code>OnSourceCollectionChanged</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-events" title="OnSourceCollectionChanged in context on the styles page" aria-label="OnSourceCollectionChanged in context on the styles page">🠆</a></h3>

<code>(<a href="/docs/ui-glossary/types/collection-change-type/">CollectionChangeType</a> changeType, int startIndex, int count)</code> · The <a class="ref" href="/docs/ui-glossary/types/i-bindable-collection/">`IBindableCollection`</a> held by the bound source property adds (`Add`) or removes (`Remove`) items. Not raised in `OneWayToSource` mode.

<h3 id="onsourcepropertychanged"><span class="event"><code>OnSourcePropertyChanged</code></span> <a class="ctx" href="/docs/ui-styles/#dependencypropertyt-events" title="OnSourcePropertyChanged in context on the styles page" aria-label="OnSourcePropertyChanged in context on the styles page">🠆</a></h3>

`(object propertyValue)` · The bound <a class="ref" href="/docs/ui-glossary/types/bindable/">`Bindable`</a> source reports a change of the bound property (or of all properties, with an empty name). The handler gets the source property's value, before conversion. Not raised for the echo of the property's own write, nor in `OneWayToSource` mode.
