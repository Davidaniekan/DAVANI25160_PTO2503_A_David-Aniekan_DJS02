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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          width: 100%;
          max-width: 300px;
        }

        /* =================
         Podcast Card Design
        ==================== */
        .podcast-item {
          background-color: #fff;
          font-family: "Plus Jakarta Sans", sans-serif;
          border-radius: 5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.75rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          perspective: 1000px;
          width: 100%;
          max-width: 300px;
          position: relative;
        }

        .podcast-item:hover {
          box-shadow: 0 8px 16px rgb(54, 82, 141);
        }

        /* Cover image */
        .podcast-item .podcast-cover {
          display: block;
          border-radius: 5px;
          width: 100%;
          height: 270px;
          object-fit: fill;
          transform-origin: center;
          transition: opacity 0.6s ease;
          backface-visibility: visible;
        }

        /* Podcast info area */
        .podcast-info {
          margin-top: -6px;
          flex-grow: 1;
        }

        .podcast-info h2 {
          font-size: 18px;
          margin-bottom: 5px;
          color: #1e293b;
          font-weight: 600;
        }

        .podcast-info .genre-tags {
          margin-bottom: -0.5rem;
        }

        .podcast-info .genre-tag {
          display: inline-flex;
          background-color: #e2e8f0;
          align-items: center;
          justify-content: center;
          color: #334155;
          padding: 1px 11px;
          margin: 0.2rem 0.4rem 0.2rem 0;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          text-align: center;
          line-height: 1;
          min-height: 28px;
          border: none;
        }

        .podcast-info .seasons {
          color: #5a7694;
          font-weight: 600;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 5px;
        }

        .podcast-info .updated {
          margin-bottom: 0.3rem;
        }

        .podcast-info .season-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .podcast-info .updated {
          color: #5a7694;
          font-size: 13px;
          font-weight: 500;
        }

        /* ============================
          Card Flip & Shine Animation
        ============================*/
        /* 3D rotation on hover */
        .podcast-item:hover .podcast-cover {
          animation: flip-spin 2.5s linear infinite;
          opacity: 0.8; /* fade a bit while spinning */
        }

        /* Keyframe for flipping */
        @keyframes flip-spin {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        /* Shine reflection overlay */
        .podcast-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0.2) 100%
          );
          transform: skewX(-25deg);
        }

        /* Animate shine movement */
        .podcast-item:hover::before {
          animation: shine-move 1.2s linear infinite;
        }

        /* Shine movement keyframes */
        @keyframes shine-move {
          from {
            left: -75%;
          }
          to {
            left: 125%;
          }
        }

        /* ==============================
         📱 Mobile Responsive Styling
        ============================== */
        @media (max-width: 500px) {
          /* Podcast card */
          .podcast-item {
            max-width: 100%;
            width: 100%;
            border-radius: 10px;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
            padding: 1rem;
          }

          .podcast-item .podcast-cover {
            border-radius: 8px;
          }

          .podcast-info {
            padding-top: 10px;
          }

          .podcast-info h2 {
            font-size: 16px;
            margin-bottom: 6px;
          }

          .podcast-info .seasons {
            font-size: 0.85rem;
          }

          .genre-tags {
            margin-top: 4px;
          }

          .genre-tag {
            font-size: 0.75rem;
            padding: 0.3rem 0.6rem;
            margin: 0.2rem 0.3rem 0.2rem 0;
          }

          .podcast-info .updated {
            font-size: 12.5px;
          }
        }

        /* ========================
          💻 Tablet / iPad View
        ======================== */
        @media (min-width: 501px) and (max-width: 1024px) {
        /* Podcast Card */
          .podcast-item {
            max-width: 320px;
            width: 100%;
            padding: 1rem;
            border-radius: 8px;
          }

          .podcast-item .podcast-cover {
            height: 240px;
            border-radius: 6px;
          }

          .podcast-info {
            padding-top: 10px;
          }

          .podcast-info h2 {
            font-size: 17px;
          }

          .podcast-info .updated {
            font-size: 13px;
          }

          .genre-tag {
            padding: 0.35rem 0.7rem;
          }
        }
      </style>
    `;
  }
}

customElements.define("podcast-preview", PodcastPreview);
