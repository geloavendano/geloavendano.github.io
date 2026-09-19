# The Build So Far

A living learning and architecture handbook for the projects in `~/Projects` —
how the systems work, how to read and debug them, what each product teaches,
and a repeatable way to build the next app with AI without surrendering the
decisions or the understanding.

View the published handbook at
[geloavendano.github.io/the-build-so-far](https://geloavendano.github.io/the-build-so-far/),
or serve this folder locally (`python3 -m http.server`).

## Layout

One page per part; edit the page that owns the section.

| File | Part |
|---|---|
| `index.html` | Home: masthead, how to read, links to every part |
| `concepts.html` | I · Concepts |
| `deep-dives.html` | II · The deep-dives (repository map, architecture, data, flows, risks, and lessons for each project) |
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

The private source repository remains the working copy. A static snapshot is
published under `the-build-so-far/` in the public
`geloavendano/geloavendano.github.io` repository, where GitHub Pages serves it.

Built and maintained with coding agents, reviewed by a human.
