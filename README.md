# 🎙️ Web Component: Podcast Preview
---
## Overview
PodcastApp is a lightweight, client-side web application that lists podcast shows, supports searching and filtering, and shows detailed podcast information in a modal. It uses modern browser features (ES modules and a small Web Component) and minimal dependencies so it can run as static files.

---

## 📘 Project description
- A simple, mobile-friendly podcast directory UI built with vanilla JavaScript.
- Includes a reusable `podcast-preview` Web Component for rendering podcast cards, a modal detail view, client-side filtering and sorting, and a compact utility set for formatting dates and mapping genres.

---

## 🛠️ Technologies used
- Vanilla JavaScript (ES modules)
- Web Components (custom elements + Shadow DOM)
- HTML5 & CSS3 (responsive, accessible styles)

---

## 🌟 Features
- Web Component: `podcast-preview` (stateless, encapsulated styles + markup).
- Card renderer: `CreatePodcastCard` (formerly PodcastRenderer) to create component instances.
- Modal manager: `CreateModal` with keyboard and backdrop closing behavior.
- Client-side filter/sort: `PodcastFilter` with search, genre and sort support.
- Utilities: `dateUtils`, `genreService`, and `seasonUtils` for reusable logic.

---

## 📁 Project Structure
```
📂 PodcastApp/
│
├── index.html          # Main HTML layout
├── styles.css          # Global and responsive styles
│
├── 📂 src
│   ├── 📂 components/
│   │   ├── createModal.js        # Modal manager that builds and shows podcast details.
│   │   ├── createPodcastCard.js  # Renderer that instantiates podcast-preview elements.
│   │   ├── podcastFilter.js      # Search, genre filter, and sort logic.
│   │   ├── podcastPreview.js     # Custom element that renders a single podcast card.
│   │
│   ├── 📂 utils/
│   │   ├── dateUtils.js          # Formats ISO dates into readable text
│   │   ├── genreService.js       # Mapping between genre IDs and titles, and parsing the select label.
│   │   ├── seasonUtils.js        # Helper to lookup season details for a show.
│   │
│   ├── data.js         # Podcast, genres, and seasons dataset
│   │
│   ├── index.js        # Bootstraps the app by creating PodcastApp
│   │
│   ├── PodcastApp.js   # main controller: wires UI elements, filters, renderer, and modal.
└── 📂 image/           # SVG icons and assets
```
---

## ⚙️ Setup Instructions

### 🧩 Steps
1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/Davidaniekan/DAVANI25160_PTO2503_A_David-Aniekan_DJS02.git
   ```
2. **Open the project folder:**
   ```bash
   cd podcastapp
   ```
3. **Run the app locally:**
   - Double-click `index.html`
   
4. Visit:  
   ```
   http://localhost:5500
   ```
---

## 🚀 Usage / Interaction guide

- Search: click the search icon in the header, type a query and press Enter (or type to filter live).
- Filter by Genre: use the `Filter by` select to pick a genre (e.g., `Genre 1`) or `All Genres`.
- Sort: choose `Recently Updated`, `Most Popular`, or `Newest` from the sort select.
- Open details: click any podcast card to open the modal with more information and seasons.
- Close modal: click the `X` button, click the dim backdrop, or press `Escape`.
- Reset / reload: click the podcast logo in the header — it triggers a fade-out and reloads the page.

---
## 👤 Author

Developed by **David Aniekan**
[GitHub](https://github.com/Davidaniekan) | [LinkedIn](https://linkedin.com/in/david-aniekan)

