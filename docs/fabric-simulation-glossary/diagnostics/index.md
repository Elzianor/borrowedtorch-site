---
layout: docs
title: "Fabric simulation glossary: diagnostics"
description: "The checks run over a sheet read back to the CPU, their results, and the finiteness guard they share, one page per type."
---

Each type has a page listing its members in alphabetical order, each with its type or signature and what it does. The sidebar lists the members of each type under its name.

| Type | What it is |
| --- | --- |
| [`PenetrationCheck`](/docs/fabric-simulation-glossary/diagnostics/penetration-check/) | Counts the pairs of points closer than the cloth is thick: how badly the sheet passes through itself. |
| [`PenetrationCheck.Result`](/docs/fabric-simulation-glossary/diagnostics/penetration-check-result/) | One run's measurements: the pairs touching, the pairs gone through, and the deepest overlap. |
| [`CreaseCheck`](/docs/fabric-simulation-glossary/diagnostics/crease-check/) | How folded the sheet is, against how folded it rests: pressed into a fold, or creased. |
| [`CreaseCheck.Result`](/docs/fabric-simulation-glossary/diagnostics/crease-check-result/) | One run's measurements: the mean fold now and at rest, and the creases. |
| [`NumericChecks`](/docs/fabric-simulation-glossary/diagnostics/numeric-checks/) | The finiteness guard for anything reading positions back. |
