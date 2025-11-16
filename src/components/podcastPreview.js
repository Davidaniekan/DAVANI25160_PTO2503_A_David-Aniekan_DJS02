/**
 * PodcastPreview Web Component
 * - Stateless component that renders a podcast preview based on attributes
 * - Attributes supported: `title`, `cover`, `genres` (JSON array or string), `seasons`, `updated`, `id`
 */
class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Bind click listener
    this.handleClick = this.handleClick.bind(this);
  }

  static get observedAttributes() {
    return ["title", "cover", "genres", "seasons", "updated", "id"];
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this.handleClick);
  }

  attributeChangedCallback() {
    this.render();
  }

  /**
   * Dispatch event to parent when card is clicked.
   */
  handleClick() {
    this.dispatchEvent(
      new CustomEvent("podcast-selected", {
        detail: {
          id: this.getAttribute("id"),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const title = this.getAttribute("title") || "";
    const cover = this.getAttribute("cover") || "";
    const seasons = this.getAttribute("seasons") || "";
    const updated = this.getAttribute("updated") || "";
    const genres = this.getAttribute("genres") || "[]";

    // Parse genres attribute into an array of genre names.
    let genreList = [];
    try {
      const parsed = JSON.parse(genres);
      if (Array.isArray(parsed)) genreList = parsed.map((g) => String(g));
      else genreList = [String(parsed)];
    } catch {
      // Fallback: split on commas if it's a plain string
      genreList = String(genres)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
}

customElements.define("podcast-preview", PodcastPreview);
