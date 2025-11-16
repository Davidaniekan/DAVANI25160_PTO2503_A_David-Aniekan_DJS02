import { PodcastApp } from "./podcastApp.js";
import { podcasts, genres, seasons } from "./data.js";

/**
 * @class Main
 * @description Entry point for initializing the Podcast App.
 */

// Initialize the Podcast Application once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new PodcastApp({ podcasts, genres, seasons });
});
