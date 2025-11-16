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
}

customElements.define("podcast-preview", PodcastPreview);
