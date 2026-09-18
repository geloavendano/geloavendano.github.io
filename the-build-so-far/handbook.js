(function () {
  const pages = [
    ["index.html", "Start here"],
    ["concepts.html", "Concepts"],
    ["deep-dives.html", "Project labs"],
    ["together.html", "Build playbook"],
    ["ai.html", "AI-assisted development"],
    ["tools.html", "Tools appendix"],
  ];

  const topbar = document.querySelector(".topbar");
  if (!topbar || !HTMLDialogElement.prototype.showModal) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "search-toggle";
  button.innerHTML = 'Search <span class="key-hint">&#8984;K</span>';
  button.setAttribute("aria-label", "Search the handbook");
  topbar.appendChild(button);

  const dialog = document.createElement("dialog");
  dialog.className = "handbook-search";
  dialog.innerHTML = `
    <form method="dialog" class="search-head">
      <input type="search" aria-label="Search the handbook" placeholder="Search a concept, project, or tool&hellip;" autocomplete="off">
      <button class="search-close" value="close" aria-label="Close search">&times;</button>
    </form>
    <p class="search-status">Type two or more characters.</p>
    <ol class="search-results"></ol>`;
  document.body.appendChild(dialog);

  const input = dialog.querySelector("input");
  const status = dialog.querySelector(".search-status");
  const results = dialog.querySelector(".search-results");
  let indexPromise;

  function clean(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  async function buildIndex() {
    const records = [];
    for (const [file, pageTitle] of pages) {
      const response = await fetch(file);
      if (!response.ok) continue;
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      for (const section of doc.querySelectorAll("main section[id]")) {
        const heading = section.querySelector("h2, h3")?.textContent || pageTitle;
        const text = clean(section.textContent || "");
        records.push({
          pageTitle,
          heading: clean(heading),
          href: `${file}#${section.id}`,
          text,
        });
      }
    }
    return records;
  }

  function openSearch() {
    if (!dialog.open) dialog.showModal();
    requestAnimationFrame(() => input.focus());
    indexPromise ||= buildIndex();
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[char]);
  }

  button.addEventListener("click", openSearch);
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
    if (event.key === "/" && !/input|textarea|select/i.test(document.activeElement?.tagName || "")) {
      event.preventDefault();
      openSearch();
    }
  });

  input.addEventListener("input", async () => {
    const query = clean(input.value).toLowerCase();
    results.innerHTML = "";
    if (query.length < 2) {
      status.textContent = "Type two or more characters.";
      return;
    }
    status.textContent = "Searching…";
    let records;
    try {
      records = await indexPromise;
    } catch (error) {
      status.textContent = "Search needs the handbook to be served over HTTP.";
      return;
    }
    const matches = records
      .map((record) => ({
        ...record,
        score: (record.heading.toLowerCase().includes(query) ? 4 : 0) +
          (record.text.toLowerCase().split(query).length - 1),
      }))
      .filter((record) => record.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 30);
    status.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? "" : "s"}` : "No matches.";
    results.innerHTML = matches.map((match) => {
      const lower = match.text.toLowerCase();
      const hit = lower.indexOf(query);
      const start = Math.max(0, hit - 75);
      const excerpt = match.text.slice(start, start + 190);
      return `<li><a href="${escapeHtml(match.href)}"><small>${escapeHtml(match.pageTitle)}</small><strong>${escapeHtml(match.heading)}</strong><span>${start ? "&hellip;" : ""}${escapeHtml(excerpt)}${excerpt.length === 190 ? "&hellip;" : ""}</span></a></li>`;
    }).join("");
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  const templateLinks = document.querySelectorAll("[data-template]");
  if (templateLinks.length) {
    const inlineTemplates = new Map(
      [...document.querySelectorAll("template[data-template-source]")].map((source) => {
        let value = source.content.textContent;
        if (value.startsWith("\n")) value = value.slice(1);
        value = value.replace(/\n[\t ]*$/, "\n");
        return [source.dataset.templateSource, value];
      })
    );
    const templateDialog = document.createElement("dialog");
    templateDialog.className = "template-dialog";
    templateDialog.innerHTML = `
      <div class="template-modal">
        <header class="template-modal-head">
          <div>
            <small>Editable Markdown template</small>
            <h2>Template</h2>
          </div>
          <form method="dialog">
            <button class="template-close" value="close" aria-label="Close template">&times;</button>
          </form>
        </header>
        <p class="template-help">Edit this working copy, then copy it into your next project. Changes are kept until this page is reloaded.</p>
        <textarea aria-label="Editable template" spellcheck="false"></textarea>
        <footer class="template-actions">
          <span class="template-status" role="status" aria-live="polite"></span>
          <button type="button" class="template-reset">Reset</button>
          <button type="button" class="template-copy">Copy template</button>
        </footer>
      </div>`;
    document.body.appendChild(templateDialog);

    const templateTitle = templateDialog.querySelector("h2");
    const templateEditor = templateDialog.querySelector("textarea");
    const templateStatus = templateDialog.querySelector(".template-status");
    const resetButton = templateDialog.querySelector(".template-reset");
    const copyButton = templateDialog.querySelector(".template-copy");
    const drafts = new Map();
    let activeTemplate;

    async function openTemplate(link) {
      const href = link.getAttribute("href");
      activeTemplate = href;
      templateTitle.textContent = link.dataset.templateTitle || link.querySelector("h3")?.textContent || "Template";
      templateStatus.textContent = "Loading…";
      templateEditor.value = "";
      templateEditor.disabled = true;
      resetButton.disabled = true;
      copyButton.disabled = true;
      if (!templateDialog.open) templateDialog.showModal();

      try {
        if (!drafts.has(href)) {
          let original = inlineTemplates.get(href);
          if (original === undefined) {
            const response = await fetch(href);
            if (!response.ok) throw new Error(`Could not load ${href}`);
            original = await response.text();
          }
          drafts.set(href, { original, current: original });
        }
        if (activeTemplate !== href) return;
        templateEditor.value = drafts.get(href).current;
        templateEditor.disabled = false;
        resetButton.disabled = false;
        copyButton.disabled = false;
        templateStatus.textContent = "Ready to edit";
        requestAnimationFrame(() => {
          templateEditor.focus();
          templateEditor.setSelectionRange(0, 0);
          templateEditor.scrollTop = 0;
        });
      } catch (error) {
        templateStatus.textContent = "Could not load this template. Serve the handbook over HTTP and try again.";
      }
    }

    for (const link of templateLinks) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openTemplate(link);
      });
    }

    templateEditor.addEventListener("input", () => {
      if (!activeTemplate || !drafts.has(activeTemplate)) return;
      drafts.get(activeTemplate).current = templateEditor.value;
      templateStatus.textContent = "Edited locally";
    });

    resetButton.addEventListener("click", () => {
      if (!activeTemplate || !drafts.has(activeTemplate)) return;
      const draft = drafts.get(activeTemplate);
      draft.current = draft.original;
      templateEditor.value = draft.original;
      templateStatus.textContent = "Reset to the original template";
      templateEditor.focus();
      templateEditor.setSelectionRange(0, 0);
      templateEditor.scrollTop = 0;
    });

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(templateEditor.value);
      } catch (error) {
        templateEditor.focus();
        templateEditor.select();
        document.execCommand("copy");
        templateEditor.setSelectionRange(0, 0);
      }
      templateStatus.textContent = "Copied—paste it into your project";
      copyButton.textContent = "Copied";
      setTimeout(() => { copyButton.textContent = "Copy template"; }, 1600);
    });

    templateDialog.addEventListener("click", (event) => {
      if (event.target === templateDialog) templateDialog.close();
    });
  }

  for (const wrapper of document.querySelectorAll(".table-scroll")) {
    wrapper.tabIndex = 0;
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute("aria-label", "Scrollable table");
  }
})();
