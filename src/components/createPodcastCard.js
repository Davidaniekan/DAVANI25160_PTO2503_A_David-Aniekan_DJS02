import { formatDate } from "../utils/dateUtils.js";
import { getGenreNames } from "../utils/genreService.js";
// Ensure the `podcast-preview` custom element is registered before we create instances
import "./podcastPreview.js";

/**
 * @class CreatePodcastCard
 * @description Renders a list of podcast items into a container using the `podcast-preview` custom element.
 *              Converts podcast data into attributes for the web component and wires up click handlers.
 */
export class CreatePodcastCard {
  /**
   * Constructs a CreatePodcastCard instance.
   * @param {HTMLElement} containerEl - The DOM element where podcast cards will be rendered.
   * @param {Object[]} genres - Array of genre objects with id and title properties.
   * @param {Function} [onCardClick] - Callback function invoked when a podcast card is clicked.
   *                                    Receives the full podcast object as an argument.
   */
  constructor(containerEl, genres = [], onCardClick = () => {}) {
    this.containerEl = containerEl;
    this.genres = genres;
    this.onCardClick = onCardClick;
  }

  /**
   * Renders a list of podcasts into the container.
   * Creates `podcast-preview` elements for each podcast and attaches event listeners.
   * If the list is empty, displays a "no results" message.
   * @param {Object[]} list - Array of podcast objects to render.
   * @param {string} list[].id - Unique podcast identifier.
   * @param {string} list[].title - Podcast title.
   * @param {string} list[].image - Cover image URL.
   * @param {number} list[].seasons - Number of seasons.
   * @param {string} list[].updated - ISO date string of last update.
   * @param {number[]} list[].genres - Array of genre IDs.
   */
  render(list = []) {
    this.containerEl.innerHTML = "";

    if (!list.length) {
      this.containerEl.innerHTML = `<p class="no-results">No podcasts found.</p>`;
      return;
    }

    list.forEach((podcast) => {
      const component = document.createElement("podcast-preview");

      component.setAttribute("id", podcast.id);
      component.setAttribute("title", podcast.title);
      component.setAttribute("cover", podcast.image || "");
      component.setAttribute("seasons", podcast.seasons);
      component.setAttribute("updated", formatDate(podcast.updated));

      // Convert genre IDs to genre names for display
      const podcastGenres = getGenreNames(podcast.genres, this.genres);
      component.setAttribute("genres", JSON.stringify(podcastGenres));

      // Wire up the podcast selection handler
      component.addEventListener("podcast-selected", () => {
        this.onCardClick(podcast);
      });

      this.containerEl.appendChild(component);
    });
  }
}
