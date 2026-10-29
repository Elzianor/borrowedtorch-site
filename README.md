# borrowedtorch.com

Studio site for Borrowed Torch, built with Jekyll and hosted on GitHub Pages.
GitHub Pages builds the site automatically on every push to `main`. There is no build step to run yourself.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | Home page (torch landing) |
| `kindling/` | Kindling engine overview |
| `docs/` | Kindling docs, one Markdown file per article |
| `games/` | Games page |
| `downloads/` | Downloads page: one card per app, from `_data/downloads.yml` |
| `_layouts/base.html` | Page shell: head, top menu, footer |
| `_layouts/docs.html` | Docs page: sidebar, breadcrumbs, Previous / Next |
| `_data/nav.yml` | Top menu items |
| `_data/docs.yml` | Docs sidebar groups and reading order |
| `_data/downloads.yml` | The apps on the Downloads page, each with its current release in BorrowedTorch.Downloads |
| `search.json` | The index of the search box in the top menu (`assets/js/search.js`), made on every build from every page with a title; `search: false` in a page's front matter leaves it out |
| `assets/` | CSS, JS and images |

## Adding a docs article

1. Create `docs/my-topic.md`:

   ```markdown
   ---
   layout: docs
   title: My topic
   description: One sentence, shown under the title and on the docs index.
   status: draft   # remove this line when the article is finished
   ---

   ## First section

   Text, lists, tables and code blocks (```csharp) all work.
   ```

2. Add it to `_data/docs.yml` under a group. The order there is the reading order.

A `<p class="todo">…</p>` line shows as a "To write" note, which is handy while drafting.

## Releasing a new version of a download

The apps' releases live in the public
[BorrowedTorch.Downloads](https://github.com/BorrowedTorchStudio/BorrowedTorch.Downloads) repo (their source stays
private), each app's tags starting with its name: `ormh-converter-v1.0.1`. The Download button links straight to a
release's file, so after an app's new release is published, set its `version` in `_data/downloads.yml` to the new one
(`v1.0.2`). Nothing else changes: the file name, release notes and guide links are built from the other fields.

## Previewing locally

Needs Ruby (on Windows: RubyInstaller with DevKit).

```shell
bundle install          # once
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Hosting (one-time setup)

1. Push these files to a GitHub repo (branch `main`).
2. Settings → Pages → Deploy from branch `main` / root. Custom domain: `borrowedtorch.com`. Enforce HTTPS.
3. Porkbun DNS: Quick Connect → GitHub Pages, or
   - `A` @ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME` www → <your-github-username>.github.io
