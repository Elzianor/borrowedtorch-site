---
layout: docs
legend: [method]
title: "Glossary: MmNotificationClient"
description: "The members of MmNotificationClient, in alphabetical order."
---

Forwards the Windows notifications about output devices to callbacks; the manager follows the default device with one.

A class. The [mixing page](/docs/audio-mixing/#mmnotificationclient) shows it in context, with code.

Names are colored by what they are: a <span class="kb kb-prop">property</span>, a <span class="kb kb-method">method</span> or an <span class="kb kb-event">event</span>; values and fields keep the plain color.

## Methods

<h3 id="mmnotificationclient"><span class="method"><code>MmNotificationClient()</code></span> <a class="ctx" href="/docs/audio-mixing/#mmnotificationclient" title="MmNotificationClient() in context on the mixing page" aria-label="MmNotificationClient() in context on the mixing page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/mm-notification-client/#mmnotificationclient">`MmNotificationClient(Action<string, DeviceState> onDeviceStateChangedCallback, Action<string> onDeviceRemovedCallback, Action<DataFlow, Role, string> onDefaultDeviceChangedCallback)`</a> · Creates a client that calls the three callbacks. They are called on a Windows audio thread and must return quickly.

<h3 id="dispose"><span class="method"><code>Dispose()</code></span> <a class="ctx" href="/docs/audio-mixing/#mmnotificationclient" title="Dispose() in context on the mixing page" aria-label="Dispose() in context on the mixing page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/mm-notification-client/#dispose">`Dispose()`</a> · Stops listening.

<h3 id="ondefaultdevicechanged"><span class="method"><code>OnDefaultDeviceChanged()</code></span> <a class="ctx" href="/docs/audio-mixing/#mmnotificationclient" title="OnDefaultDeviceChanged() in context on the mixing page" aria-label="OnDefaultDeviceChanged() in context on the mixing page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/mm-notification-client/#ondefaultdevicechanged">`OnDefaultDeviceChanged(DataFlow flow, Role role, string defaultDeviceId)`</a> · Calls the default device callback, for input and output devices and every role.

<h3 id="ondeviceadded"><span class="method"><code>OnDeviceAdded()</code></span> <a class="ctx" href="/docs/audio-mixing/#mmnotificationclient" title="OnDeviceAdded() in context on the mixing page" aria-label="OnDeviceAdded() in context on the mixing page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/mm-notification-client/#ondeviceadded">`OnDeviceAdded(string pwstrDeviceId)`</a> · Does nothing.

<h3 id="ondeviceremoved"><span class="method"><code>OnDeviceRemoved()</code></span> <a class="ctx" href="/docs/audio-mixing/#mmnotificationclient" title="OnDeviceRemoved() in context on the mixing page" aria-label="OnDeviceRemoved() in context on the mixing page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/mm-notification-client/#ondeviceremoved">`OnDeviceRemoved(string deviceId)`</a> · Calls the removal callback.

<h3 id="ondevicestatechanged"><span class="method"><code>OnDeviceStateChanged()</code></span> <a class="ctx" href="/docs/audio-mixing/#mmnotificationclient" title="OnDeviceStateChanged() in context on the mixing page" aria-label="OnDeviceStateChanged() in context on the mixing page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/mm-notification-client/#ondevicestatechanged">`OnDeviceStateChanged(string deviceId, DeviceState newState)`</a> · Calls the state callback. Called for every device whose state changes.

<h3 id="onpropertyvaluechanged"><span class="method"><code>OnPropertyValueChanged()</code></span> <a class="ctx" href="/docs/audio-mixing/#mmnotificationclient" title="OnPropertyValueChanged() in context on the mixing page" aria-label="OnPropertyValueChanged() in context on the mixing page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/mm-notification-client/#onpropertyvaluechanged">`OnPropertyValueChanged(string pwstrDeviceId, PropertyKey key)`</a> · Does nothing.

<h3 id="removedeviceenumerator"><span class="method"><code>RemoveDeviceEnumerator()</code></span> <a class="ctx" href="/docs/audio-mixing/#mmnotificationclient" title="RemoveDeviceEnumerator() in context on the mixing page" aria-label="RemoveDeviceEnumerator() in context on the mixing page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/mm-notification-client/#removedeviceenumerator">`RemoveDeviceEnumerator()`</a> · Stops listening. The enumerator is not disposed.

<h3 id="setdeviceenumerator"><span class="method"><code>SetDeviceEnumerator()</code></span> <a class="ctx" href="/docs/audio-mixing/#mmnotificationclient" title="SetDeviceEnumerator() in context on the mixing page" aria-label="SetDeviceEnumerator() in context on the mixing page">→</a></h3>

<a class="ref method" href="/docs/audio-glossary/types/mm-notification-client/#setdeviceenumerator">`SetDeviceEnumerator(MMDeviceEnumerator deviceEnumerator)`</a> · Starts listening to the notifications of an NAudio device enumerator, and stops listening to the one before.
