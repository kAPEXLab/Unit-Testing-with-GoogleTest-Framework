const state = {
  documents: [],
  selected: ""
};

const elements = {
  list: document.querySelector("#document-list"),
  empty: document.querySelector("#empty-state"),
  content: document.querySelector("#markdown-content")
};

async function loadDocuments() {
  try {
    const response = await fetch("docs/index.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`Manifest request failed (${response.status})`);
    const documents = await response.json();
    if (!Array.isArray(documents) || documents.some((document) => !document.file || !document.title)) {
      throw new Error("The document manifest is not valid.");
    }
    state.documents = documents;
    renderDocumentList();

    const requestedDocument = new URLSearchParams(window.location.search).get("doc");
    const firstDocument = state.documents.find((document) => document.file === requestedDocument) || state.documents[0];
    if (firstDocument) await selectDocument(firstDocument.file, false);
  } catch (error) {
    elements.list.innerHTML = `<p class="error-message">${escapeHtml(error.message)}</p>`;
  }
}

function renderDocumentList() {
  const visibleDocuments = state.documents;

  elements.list.innerHTML = visibleDocuments.map((document) => `
    <a class="document-link${document.file === state.selected ? " active" : ""}" href="?doc=${encodeURIComponent(document.file)}" data-file="${escapeHtml(document.file)}">
      <strong>${escapeHtml(document.file)}</strong>
    </a>
  `).join("");
  elements.empty.hidden = visibleDocuments.length > 0;

  elements.list.querySelectorAll(".document-link").forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      await selectDocument(link.dataset.file, true);
    });
  });
}

async function selectDocument(file, updateUrl) {
  const documentEntry = state.documents.find((item) => item.file === file);
  if (!documentEntry) return;
  state.selected = file;
  renderDocumentList();
  elements.content.innerHTML = '<p class="loading-list"><span class="spinner"></span>Loading document</p>';

  if (updateUrl) history.pushState({ file }, "", `?doc=${encodeURIComponent(file)}`);

  try {
    const response = await fetch(`docs/${encodeURIComponent(file)}`);
    if (!response.ok) throw new Error(`Document request failed (${response.status})`);
    const markdown = await response.text();
    const rendered = marked.parse(markdown, { headerIds: false, mangle: false });
    elements.content.innerHTML = DOMPurify.sanitize(rendered);
    window.document.title = `${documentEntry.title} | Coding Marathon`;
  } catch (error) {
    elements.content.innerHTML = `<p class="error-message">${escapeHtml(error.message)}</p>`;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[character]));
}

window.addEventListener("popstate", () => {
  const file = new URLSearchParams(window.location.search).get("doc");
  if (file) selectDocument(file, false);
});

loadDocuments();
