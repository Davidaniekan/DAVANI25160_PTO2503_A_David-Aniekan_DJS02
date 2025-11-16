import { formatDate } from "../utils/dateUtils.js";
import { getGenreNames } from "../utils/genreService.js";
import { getSeasonsForShow } from "../utils/seasonUtils.js";

/**
 * @class ModalManager
 * @description Handles displaying and closing podcast detail modals.
 */
export class ModalManager {
  /**
   * @param {HTMLElement} modalEl - The modal container element.
   * @param {HTMLElement} modalContentEl - The inner modal content element.
   * @param {HTMLElement} closeButton - The close button element.
   */
  constructor(modalEl, modalContentEl, closeButton) {
    this.modalEl = modalEl;
    this.modalContentEl = modalContentEl;
    this.closeButton = closeButton;

    this.bindEvents();
  }

  /**
   * Registers modal-related event listeners for close and keyboard interactions.
   * Listens for:
   * - Close button clicks
   * - Backdrop (modal overlay) clicks
   * - Escape key presses (only when modal is open)
   */
  bindEvents() {
    this.closeButton.addEventListener("click", () => this.closeModal());
    this.modalEl.addEventListener("click", (e) => {
      if (e.target === this.modalEl) this.closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.modalEl.classList.contains("hidden")) {
        this.closeModal();
      }
    });
  }

  /**
   * Opens the modal and populates it with podcast data.
   * @param {Object} podcast - The selected podcast object.
   * @param {Object[]} genres - The available genres.
   * @param {Object[]} seasons - The available seasons.
   */
  open(podcast, genres, seasons) {
    this.modalContentEl.innerHTML = "";

    // Main container
    const container = document.createElement("div");
    container.className = "modal-detail";

    // ====== Header ======
    const header = document.createElement("div");
    header.className = "modal-header";

    const title = document.createElement("h2");
    title.className = "modal-title";
    title.textContent = podcast.title;
    header.appendChild(title);

    container.appendChild(header);

    // ====== Details Section (image + description + genres) ======
    const detailWrapper = document.createElement("div");
    detailWrapper.className = "modal-detail-wrapper";

    // Cover Image
    const podcastCover = document.createElement("img");
    podcastCover.className = "modal-cover-image";
    podcastCover.src = podcast.image || "";
    podcastCover.alt = `${podcast.title} large cover`;
    detailWrapper.appendChild(podcastCover);

    // Description + Meta Information
    const textSection = document.createElement("div");
    textSection.className = "modal-text-section";

    const descHeader = document.createElement("h3");
    descHeader.textContent = "Description";
    textSection.appendChild(descHeader);

    const desc = document.createElement("p");
    desc.className = "modal-description";
    desc.textContent = podcast.description || "No description available.";
    textSection.appendChild(desc);

    // Genres section
    const genreHeader = document.createElement("h3");
    genreHeader.textContent = "Genres";
    textSection.appendChild(genreHeader);

    const genreTags = document.createElement("div");
    genreTags.className = "detail-genres";
    getGenreNames(podcast.genres, genres).forEach((g) => {
      const tag = document.createElement("span");
      tag.className = "modal-genre-tag";
      tag.textContent = g;
      genreTags.appendChild(tag);
    });
    textSection.appendChild(genreTags);

    // Last Updated date
    const updated = document.createElement("p");
    updated.className = "detail-updated";
    updated.innerHTML = `<img src="image/calendar-icon.svg" alt="calendar" class="calendar-icon"> Last updated: ${formatDate(
      podcast.updated
    )}`;
    textSection.appendChild(updated);

    detailWrapper.appendChild(textSection);
    container.appendChild(detailWrapper);

    // ====== Seasons Section ======
    const seasonsHeader = document.createElement("h3");
    seasonsHeader.className = "modal-seasons-header";
    const seasonDetails = getSeasonsForShow(podcast.id, seasons);
    seasonsHeader.textContent = `Seasons (${seasonDetails.length || podcast.seasons})`;
    container.appendChild(seasonsHeader);

    // Display season details if available
    if (seasonDetails.length) {
      const seasonList = document.createElement("div");
      seasonList.className = "season-list";

      seasonDetails.forEach((s) => {
        const seasonCard = document.createElement("div");
        seasonCard.className = "season-card";

        const seasonTitle = document.createElement("h4");
        seasonTitle.textContent = s.title;

        const episodeCount = document.createElement("p");
        episodeCount.textContent = `${s.episodes} episode${s.episodes === 1 ? "" : "s"}`;

        seasonCard.appendChild(seasonTitle);
        seasonCard.appendChild(episodeCount);

        seasonList.appendChild(seasonCard);
      });
      container.appendChild(seasonList);
    }

    this.modalContentEl.appendChild(container);

    // Show modal and prevent body scroll
    this.modalEl.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    this.closeButton.focus();
  }

  /**
   * Closes the currently open modal and restores page scrolling.
   */
  closeModal() {
    this.modalEl.classList.add("hidden");
    document.body.style.overflow = "";
    this.modalContentEl.innerHTML = "";
  }
}
