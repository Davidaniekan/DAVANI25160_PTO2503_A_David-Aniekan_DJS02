import { ModalManager } from "./components/createModal.js";
import { PodcastFilter } from "./components/podcastFilter.js";
import { CreatePodcastCard } from "./components/createPodcastCard.js";
import { parseGenreSelectLabel } from "./utils/genreService.js";

/**
 * @class PodcastApp
 * @description Main controller class that coordinates filtering, rendering, and modal actions.
 */
export class PodcastApp {
  /**
   * Initializes all components and event listeners.
   * @param {Object} data - The dataset.
   * @param {Object[]} data.podcasts - List of podcast shows.
   * @param {Object[]} data.genres - List of available genres.
   * @param {Object[]} data.seasons - List of season details per show.
   */
  constructor({ podcasts, genres, seasons }) {
    this.podcasts = podcasts || [];
    this.genres = genres || [];
    this.seasons = seasons || [];

    // UI Elements
    this.podcastListEl = document.getElementById("podcastList");
    this.searchInput = document.getElementById("searchBar");
    this.searchBtn = document.querySelector(".search-btn");
    this.searchContainer = document.querySelector(".search-container");
    this.genreSelect = document.getElementById("genreSelect");
    this.sortSelect = document.getElementById("sortSelect");
    this.podcastIcon = document.getElementById("podcastIcon");

    // Managers
    this.modalManager = new ModalManager(
      document.getElementById("modal"),
      document.getElementById("modalContent"),
      document.querySelector(".close-button")
    );

    this.filter = new PodcastFilter(this.podcasts, this.genres);
    this.renderer = new CreatePodcastCard(this.podcastListEl, this.genres, (p) =>
      this.modalManager.open(p, this.genres, this.seasons)
    );

    // set default selections if none
    this._ensureSelectDefaults();

    // Bind UI actions
    this._bindUIActions();

    // Initial render
    this.applyFilters();

    // Podcast icon reload handler
    this._bindPodcastIconReload();
  }

  // Ensures dropdowns have a default selected value.
  _ensureSelectDefaults() {
    if (this.sortSelect && this.sortSelect.selectedIndex < 0)
      this.sortSelect.selectedIndex = 0;
    if (this.genreSelect && this.genreSelect.selectedIndex < 0)
      this.genreSelect.selectedIndex = 0;
  }

  // Binds event listeners for search, filters, and dropdowns.
  _bindUIActions() {
    if (this.searchInput) {
      // Live filtering as user types
      this.searchInput.addEventListener("input", () => this.applyFilters());

      // When Enter is pressed → apply search, blur input, collapse it
      this.searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.applyFilters();
          this.searchInput.blur();
          this._collapseSearchInput(); // Collapse after search
        }
      });
    }

    // Search toggle button show/hide behavior
    if (this.searchBtn && this.searchInput) {
      this.searchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.searchBtn.classList.add("hidden");
        this.searchInput.classList.add("active");
        this.searchInput.focus();
      });

      // Click outside to close search input
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-container")) {
          this._collapseSearchInput();
        }
      });
    }

    // Filters and sorting
    if (this.genreSelect)
      this.genreSelect.addEventListener("change", () => this.applyFilters());
    if (this.sortSelect)
      this.sortSelect.addEventListener("change", () => this.applyFilters());
  }

  /**
   * Binds click event to the podcast logo icon.
   * Clicking the icon triggers a page reload with a fade-out animation.
   * @private
   */
  _bindPodcastIconReload() {
    if (this.podcastIcon) {
      this.podcastIcon.addEventListener("click", () => {
        document.body.classList.add("fade-out"); // Add fade-out class to body
        setTimeout(() => location.reload(), 400); // Delay reload to allow fade-out effect
      });
    }
  }

  /**
   * Applies current filters and updates the rendered podcast list.
   */
  applyFilters() {
    const query = (this.searchInput?.value || "").trim();

    // determine genre from displayed text
    const genreLabel =
      this.genreSelect?.options[this.genreSelect.selectedIndex]?.textContent ||
      "";
    const genreValue = parseGenreSelectLabel(genreLabel);

    // determine sort from displayed text
    const sortLabel =
      this.sortSelect?.options[this.sortSelect.selectedIndex]?.textContent ||
      "";
    let sort = "recent";
    if (/recent/i.test(sortLabel)) sort = "recent";
    else if (/newest/i.test(sortLabel)) sort = "newest";
    else if (/popular|popularity/i.test(sortLabel)) sort = "popular";

    const results = this.filter.filter({ query, genre: genreValue, sort });
    this.renderer.render(results);
  }

  /**
   * Collapses the search input, showing the search icon again.
   * Keeps the user’s search text visible for reference.
   * @private
   */
  _collapseSearchInput() {
    if (!this.searchInput || !this.searchBtn) return;
    this.searchInput.blur(); // remove keyboard focus
    this.searchInput.classList.remove("active"); // collapse field
    this.searchBtn.classList.remove("hidden"); // show search icon again
  }
}
