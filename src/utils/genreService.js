/**
 * @module utils/genreUtils
 * @description Utility functions for working with podcast genres.
 */

/**
 * Maps genre IDs to their corresponding genre names.
 * 
 * @param {number[]} genreIds - Array of genre IDs associated with a podcast.
 * @param {Object[]} genres - The full list of available genres.
 * @returns {string[]} An array of genre titles corresponding to the provided IDs.
 */
export function getGenreNames(genreIds = [], genres = []) {
  return genreIds
    .map((id) => genres.find((g) => g.id === id)?.title)
    .filter(Boolean);
}

/**
 * The HTML select label may be "Genre 1", "Genre 2" (user requirement).
 * If it matches "Genre N" this returns the number N (as number).
 * If the label contains "all" (case-insensitive) returns null.
 * Otherwise returns the trimmed label string.
 * @param {string} label - The visible text of the select option.
 * @returns {number|string|null} Genre id number, string label, or null for "All".
 */
export function parseGenreSelectLabel(label) {
  if (!label) return null;
  const trimmed = label.trim();
  if (/all/i.test(trimmed)) return null;
  const m = trimmed.match(/genre\s*(\d+)/i);
  if (m) {
    const id = parseInt(m[1], 10);
    if (!Number.isNaN(id)) return id;
  }
  return trimmed;
}