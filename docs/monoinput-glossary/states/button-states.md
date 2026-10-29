---
layout: docs
title: "Glossary: ButtonStates"
description: "The values of ButtonStates."
---

The four states every key, button and note goes through, one update at a time.

An enum, in the namespace `BorrowedTorch.MonoInput.Inputs`. Every <a class="ref" href="/docs/monoinput-glossary/states/button-info/">`ButtonInfo`</a> and every status of a key or a note reports its state with it. The [button states page](/docs/monoinput-states/#buttonstates) shows it in context, with a picture.

## Values

<h3 id="idle"><code>Idle</code> <a class="ctx" href="/docs/monoinput-states/#buttonstates" title="Idle in context on the button states page" aria-label="Idle in context on the button states page">→</a></h3>

Not touched. Every input starts here and comes back one update after its release. An idle key or note has no status: it isn't in <a class="ref prop" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#activekeys">`ActiveKeys`</a> or <a class="ref prop" href="/docs/monoinput-glossary/midi/midi-manager/#activenotes">`ActiveNotes`</a>.

<h3 id="pressed"><code>Pressed</code> <a class="ctx" href="/docs/monoinput-states/#buttonstates" title="Pressed in context on the button states page" aria-label="Pressed in context on the button states page">→</a></h3>

Just went down: the first update the input is held. Lasts one update, then becomes `Down` if the input is still held, or `Up` if it was let go.

<h3 id="down"><code>Down</code> <a class="ctx" href="/docs/monoinput-states/#buttonstates" title="Down in context on the button states page" aria-label="Down in context on the button states page">→</a></h3>

Still held, from the second update on. The `Down` checks, such as <a class="ref method" href="/docs/monoinput-glossary/keyboard/keyboard-manager/#iskeydown">`IsKeyDown`</a> and <a class="ref prop" href="/docs/monoinput-glossary/states/button-info/#down">`Down`</a>, are true for `Pressed` too.

<h3 id="up"><code>Up</code> <a class="ctx" href="/docs/monoinput-states/#buttonstates" title="Up in context on the button states page" aria-label="Up in context on the button states page">→</a></h3>

Just let go. Lasts one update, then becomes `Idle`, or `Pressed` again if the input is held again by then.
