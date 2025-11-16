import { getGenreNames } from "../utils/genreService.js";

/**
 * @class PodcastFilter
 * @description Handles podcast filtering, sorting, and search logic.
 */

export class PodcastFilter {
  /**
   * @param {Object[]} podcasts - Array of all podcasts.
   * @param {Object[]} genres - Array of all genres.
   */
  constructor(podcasts = [], genres = []) {
    this.podcasts = Array.isArray(podcasts) ? podcasts : [];
    this.genres = Array.isArray(genres) ? genres : [];
  }

  /**
   * Filters and sorts the podcast list based on search query, genre, and sort order.
   * @param {Object} criteria - Filter and sort options.
   * @param {string} [criteria.query] - Search term.
   * @param {string|number|null} [criteria.genre] - Selected genre name or ID.
   * @param {string} [criteria.sort] - Sort key ("recent", "newest", "popular").
   * @returns {Object[]} Filtered and sorted list of podcasts.
   */
  filter({ query = "", genre = null, sort = "recent" }) {
    let filtered = [...this.podcasts];

    // Apply search filter
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(q);
        const genreNames = getGenreNames(p.genres, this.genres)
          .join(" ")
          .toLowerCase();
        return titleMatch || genreNames.includes(q);
      });
    }

    // Apply genre filter
    if (genre !== null) {
      if (typeof genre === "number") {
        // Filter by genre ID
        filtered = filtered.filter((p) => p.genres.includes(genre));
      } else if (typeof genre === "string") {
        // Filter by genre name (case-insensitive)
        filtered = filtered.filter((p) =>
          getGenreNames(p.genres, this.genres).some(
            (t) => t.toLowerCase() === genre.toLowerCase()
          )
        );
      }
    }

    // Apply sorting
    if (sort === "recent") {
      // Sort by updated date, newest first
      filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sort === "newest") {
      // Sort by created date (or updated if created is missing), oldest first
      filtered
        .sort(
          (a, b) =>
            new Date(b.created || b.updated) - new Date(a.created || a.updated)
        )
        .reverse();
    } else if (sort === "popular") {
      // Sort by popularity score, highest first
      filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    return filtered;
  }
}
