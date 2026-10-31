---
layout: docs
legend: [prop, dp, method]
title: "Glossary: ProgressBarStyle"
description: "The members of ProgressBarStyle, in alphabetical order."
---

The style class of [`ProgressBar`](/docs/ui-controls/#progressbar): the properties a style can set on it. None. Framework defaults: <a class="ref prop" href="/docs/ui-glossary/types/base-style/#backgroundcolor">`BackgroundColor`</a> `DefaultProgressBarBackgroundColor` (the track), <a class="ref prop" href="/docs/ui-glossary/types/base-style/#foregroundcolor">`ForegroundColor`</a> `DefaultProgressBarColor` (the bar), `Max` 1.

A class deriving from [`BaseStyle`](/docs/ui-glossary/types/base-style/). The [styles page](/docs/ui-styles/#style-classes) shows it in context.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Properties

<h3 id="max"><span class="prop"><code>Max</code></span> <a class="ctx" href="/docs/ui-controls/#progressbar-properties" title="Max in context on the controls page" aria-label="Max in context on the controls page">🠆</a></h3>

`float` · The value of a full bar. Setting it below <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> along. 1 unless set.

<h3 id="min"><span class="prop"><code>Min</code></span> <a class="ctx" href="/docs/ui-controls/#progressbar-properties" title="Min in context on the controls page" aria-label="Min in context on the controls page">🠆</a></h3>

`float` · The value of an empty bar. Setting it above <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a> moves <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a> along. 0 unless set.

<h3 id="orientation"><span class="prop"><code>Orientation</code></span> <a class="ctx" href="/docs/ui-controls/#progressbar-properties" title="Orientation in context on the controls page" aria-label="Orientation in context on the controls page">🠆</a></h3>

<a class="ref" href="/docs/ui-glossary/types/orientation/">`Orientation`</a> · `Horizontal` (the default, fills from the left) or `Vertical` (fills from the bottom).

<h3 id="value"><span class="prop"><code>Value</code></span> <a class="ctx" href="/docs/ui-controls/#progressbar-properties" title="Value in context on the controls page" aria-label="Value in context on the controls page">🠆</a></h3>

`float` · The current value, clamped to the range between <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#min">`Min`</a> and <a class="ref dp" href="/docs/ui-glossary/elements/progress-bar/#max">`Max`</a>.

## Methods

<h3 id="progressbarstyle"><span class="method"><code>ProgressBarStyle()</code></span></h3>

<a class="ref method" href="/docs/ui-glossary/types/progress-bar-style/#progressbarstyle">`ProgressBarStyle()`</a>

<h3 id="isset"><span class="method"><code>IsSet()</code></span> <a class="ctx" href="/docs/ui-styles/#basestyle" title="IsSet() in context on the styles page" aria-label="IsSet() in context on the styles page">🠆</a></h3>

<a class="ref method" href="/docs/ui-glossary/types/progress-bar-style/#isset">`IsSet(string propertyName)`</a> · Whether the property is assigned to this style, so the style applies it. Pass the name with `nameof`; an unknown name gives `false`.

| Parameter | Type | Description |
| --- | --- | --- |
| `propertyName` | `string` | The name of a property of the style; `nameof` keeps it right. |
