# The Build So Far

A living learning and architecture handbook for the projects in `~/Projects` —
how the systems work, how to read and debug them, what each product teaches,
and a repeatable way to build the next app with AI without surrendering the
decisions or the understanding.

View the published copy on
[claude.ai](https://claude.ai/artifact/Y13NCVN45cwhdAQBNRxD8z), or serve this
folder locally (`python3 -m http.server`) — the samples use ES modules, which
browsers won't run from `file://`.

## Layout

One page per part; edit the page that owns the section.

| File | Part |
|---|---|
| `index.html` | Home: masthead, how to read, links to every part |
| `concepts.html` | I · Concepts |
| `deep-dives.html` | II · The deep-dives (one section per project) |
| `together.html` | III · Build playbook: defaults, templates, delivery loop, security baseline |
| `ai.html` | IV · AI-assisted development, with Codex ↔ Claude adapters |
| `tools.html` | Appendix A · Tools & references: design toolkit and libraries |
| `handbook.css` | Shared styles for every page |
| `handbook.js` | Shared search and table accessibility enhancements |
| `templates/` | Copyable briefs, decision records, feature X-rays, and release checks |
| `samples/` | Live library samples, embedded in `tools.html` |

`tools.html` carries the design toolkit's own stylesheet, scoped under
`.kit-root`; handbook element styles only apply inside `.prose`.

## Publishing

The Artifact's main page is `index.html` with its `<!doctype>…<body>` wrapper
stripped; every other file above is published alongside it under the same path.

Built and maintained with coding agents, reviewed by a human.
