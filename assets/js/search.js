// Site search: the box in the header looks through every page and its sections (## and ### headings) in /search.json,
// which Jekyll makes on every build (see search.json). The index is fetched the first time the box is used. "/" or
// Ctrl+K anywhere on a page puts the cursor in the box; on a narrow screen a button opens the box over the header.
(function () {
  const root = document.querySelector('.site-search');
  if (!root) return;
  const input = root.querySelector('.site-search-input');
  const panel = root.querySelector('.site-search-panel');
  const list = root.querySelector('.site-search-results');
  const note = root.querySelector('.site-search-note');
  const opener = root.querySelector('.site-search-open');
  const closer = root.querySelector('.site-search-close');
  const MAX_RESULTS = 30, PER_PAGE = 4, SNIPPET = 160;

  let entries = null, loading = null, shown = [], active = -1;

  const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  const decode = text => text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (all, name) => name[0] !== '#'
    ? ENTITIES[name] ?? all
    : String.fromCodePoint(name[1] === 'x' || name[1] === 'X' ? parseInt(name.slice(2), 16) : +name.slice(1)));

  // one entry per section of a page, and one for the page itself (its title, its description and its first text)
  function load() {
    loading ??= fetch(root.dataset.index)
      .then(response => {
        if (!response.ok) throw new Error('search index: ' + response.status);
        return response.json();
      })
      .then(pages => {
        entries = [];
        for (const page of pages) {
          const title = decode(page.t), description = decode(page.d || '');
          for (const [id, heading, text] of page.s) {
            const entry = {
              page: title, pageUrl: page.u, url: page.u + (id ? '#' + id : ''),
              name: id ? decode(heading) || title : title, isPage: !id,
              text: decode(text), description: id ? '' : description
            };
            entry.all = entry.text + ' ' + entry.description;
            entry.keyName = entry.name.toLowerCase();
            entry.keyPage = title.toLowerCase();
            entry.keyAll = entry.all.toLowerCase();
            entries.push(entry);
          }
        }
      })
      .catch(error => {
        loading = null;
        throw error;
      });
    return loading;
  }

  // a match at the start of a word (or of a part of a CamelCase name) counts more
  const wordStart = (text, at) => at === 0 || !/[a-z0-9]/i.test(text[at - 1]) ||
    (/[A-Z]/.test(text[at]) && /[a-z0-9]/.test(text[at - 1]));

  // the entries that have every word of the query, best first: in the name of the section, then in the name of its
  // page, then in its text; a name that is the whole query first of all, and the words run together count as a name
  // ("context menu" is ContextMenu)
  function search(query) {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const whole = terms.join(' '), joined = terms.join('');
    const found = [];
    for (const entry of entries) {
      let score = 0;
      for (const term of terms) {
        const inName = entry.keyName.indexOf(term);
        const inPage = entry.isPage ? -1 : entry.keyPage.indexOf(term);
        const inText = entry.keyAll.indexOf(term);
        if (inName < 0 && inPage < 0 && inText < 0) {
          score = 0;
          break;
        }
        if (inName >= 0) score += inName === 0 ? 16 : wordStart(entry.name, inName) ? 10 : 5;
        if (inPage >= 0) score += 3;
        if (inText >= 0) score += wordStart(entry.all, inText) ? 2 : 1;
      }
      const name = entry.keyName.replace(/\(\)$/, '').trim();
      if (!score) {
        // every word in no single place, but run together in the name
        if (terms.length < 2 || !name.includes(joined)) continue;
        score = 10;
      }
      if (name === whole || name === joined) score += 40;
      else if (terms.length > 1 && (name.includes(whole) || name.includes(joined))) score += 20;
      found.push([score, entry]);
    }
    found.sort((a, b) => b[0] - a[0] || a[1].name.length - b[1].name.length || a[1].page.localeCompare(b[1].page));
    const perPage = new Map(), results = [];
    for (const [, entry] of found) {
      const count = perPage.get(entry.pageUrl) || 0;
      if (count >= PER_PAGE) continue;
      perPage.set(entry.pageUrl, count + 1);
      results.push(entry);
      if (results.length === MAX_RESULTS) break;
    }
    return { terms, results };
  }

  // the text around the first word of the query found: in the section's text, or for a page in its description
  function snippet(entry, terms) {
    const sources = [entry.text, entry.description].filter(Boolean);
    if (!sources.length) return '';
    const firstAt = source => Math.min(...terms.map(term => {
      const at = source.toLowerCase().indexOf(term);
      return at < 0 ? Infinity : at;
    }));
    let text = sources.find(source => firstAt(source) < Infinity);
    if (!text) text = entry.isPage && entry.description ? entry.description : sources[0];
    let at = firstAt(text);
    if (at === Infinity) at = 0;
    let start = Math.max(0, at - 50);
    if (start > 0) {
      const space = text.indexOf(' ', start);
      if (space >= 0 && space < at) start = space + 1;
    }
    let end = Math.min(text.length, start + SNIPPET);
    if (end < text.length) {
      const space = text.lastIndexOf(' ', end);
      if (space > at) end = space;
    }
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }

  // the text with each word of the query marked
  function marked(text, terms) {
    const fragment = document.createDocumentFragment();
    const lower = text.toLowerCase(), ranges = [];
    for (const term of terms)
      for (let at = lower.indexOf(term); at >= 0; at = lower.indexOf(term, at + term.length)) ranges.push([at, at + term.length]);
    ranges.sort((a, b) => a[0] - b[0]);
    let pos = 0;
    for (const [start, end] of ranges) {
      if (end <= pos) continue;
      const from = Math.max(start, pos);
      if (from > pos) fragment.append(text.slice(pos, from));
      const mark = document.createElement('mark');
      mark.textContent = text.slice(from, end);
      fragment.append(mark);
      pos = end;
    }
    fragment.append(text.slice(pos));
    return fragment;
  }

  function span(className, content) {
    const element = document.createElement('span');
    element.className = className;
    element.append(content);
    return element;
  }

  function render(terms) {
    list.textContent = '';
    shown.forEach((entry, i) => {
      const item = document.createElement('li');
      item.id = 'site-search-result-' + i;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', 'false');
      const link = document.createElement('a');
      link.href = entry.url;
      link.tabIndex = -1;
      link.append(span('site-search-name', marked(entry.name, terms)));
      if (!entry.isPage) link.append(span('site-search-page', entry.page));
      const text = snippet(entry, terms);
      if (text) link.append(span('site-search-snippet', marked(text, terms)));
      item.append(link);
      list.append(item);
    });
  }

  function showPanel(show) {
    panel.hidden = !show;
    input.setAttribute('aria-expanded', String(show));
    if (!show) select(-1);
  }

  function select(index) {
    active = index;
    [...list.children].forEach((item, i) => item.setAttribute('aria-selected', String(i === index)));
    if (index < 0) {
      input.removeAttribute('aria-activedescendant');
      return;
    }
    const item = list.children[index];
    input.setAttribute('aria-activedescendant', item.id);
    item.scrollIntoView({ block: 'nearest' });
  }

  function update() {
    const query = input.value.trim();
    if (!query) {
      shown = [];
      list.textContent = '';
      showPanel(false);
      return;
    }
    if (!entries) {
      list.textContent = '';
      note.textContent = 'Loading…';
      showPanel(true);
      load().then(update, () => {
        note.textContent = 'The search is not available right now. Try again in a moment.';
      });
      return;
    }
    const { terms, results } = search(query);
    shown = results;
    render(terms);
    note.textContent = results.length ? '' : `Nothing found for "${query}".`;
    showPanel(true);
    select(-1);
  }

  function openSearch() {
    root.classList.add('is-open');
    opener.setAttribute('aria-expanded', 'true');
    input.focus();
    input.select();
  }

  // the panel and, on a narrow screen, the box closed
  function closeSearch() {
    showPanel(false);
    root.classList.remove('is-open');
    opener.setAttribute('aria-expanded', 'false');
    if (root.contains(document.activeElement)) document.activeElement.blur();
  }

  input.addEventListener('input', update);
  input.addEventListener('focus', () => {
    load().catch(() => {});
    if (input.value.trim()) update();
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!shown.length) return;
      event.preventDefault();
      if (panel.hidden) showPanel(true);
      const down = event.key === 'ArrowDown', count = shown.length;
      select(active < 0 ? (down ? 0 : count - 1) : (active + (down ? 1 : -1) + count) % count);
    } else if (event.key === 'Enter') {
      const entry = !panel.hidden && shown[Math.max(active, 0)];
      if (!entry) return;
      event.preventDefault();
      closeSearch();
      location.href = entry.url;
    } else if (event.key === 'Escape') {
      // the panel first, then the query, then the box
      event.preventDefault();
      if (!panel.hidden) showPanel(false);
      else if (input.value) input.value = '';
      else closeSearch();
    }
  });
  list.addEventListener('click', event => {
    if (event.target.closest('a') && !event.ctrlKey && !event.metaKey && !event.shiftKey) closeSearch();
  });
  opener.addEventListener('click', openSearch);
  closer.addEventListener('click', closeSearch);
  // a press anywhere else closes it, and so does the focus leaving it
  document.addEventListener('pointerdown', event => {
    if (!root.contains(event.target)) closeSearch();
  });
  root.addEventListener('focusout', event => {
    if (event.relatedTarget && !root.contains(event.relatedTarget)) closeSearch();
  });
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.altKey) return;
    const typing = event.target.closest?.('input, textarea, select, [contenteditable]:not([contenteditable="false"])');
    const slash = event.key === '/' && !typing && !event.ctrlKey && !event.metaKey;
    const ctrlK = (event.key || '').toLowerCase() === 'k' && (event.ctrlKey || event.metaKey) && !event.shiftKey;
    if (!slash && !ctrlK) return;
    event.preventDefault();
    openSearch();
  });
})();
