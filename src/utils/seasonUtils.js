/**
 * @module utils/seasonUtils
 * @description Utility for retrieving season data related to podcasts.
 */

/**
 * Retrieves all season details associated with a specific podcast ID.
 * @param {string} showId - The unique podcast ID.
 * @param {Object[]} seasons - The array of season data.
 * @returns {Object[]} The list of seasons for the podcast.
 */
export function getSeasonsForShow(showId, seasons = []) {
  return seasons.find((s) => s.id === showId)?.seasonDetails || [];
}
