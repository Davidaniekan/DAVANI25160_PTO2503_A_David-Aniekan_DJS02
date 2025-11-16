/**
 * @module utils/dateUtils
 * @description Utility functions for handling and formatting dates throughout the podcast app.
 */

/**
 * Converts an ISO date string into a human-readable date format.
 * @param {string} isoString - The ISO date string to format.
 * @returns {string} The formatted date string (e.g., "November 1, 2025").
 */
export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
