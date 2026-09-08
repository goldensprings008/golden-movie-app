// Central place for app-wide constants.
// Import from here instead of repeating magic strings across files.

export const APP_NAME = "Golden Springs Movie Discovery";

// TMDB image CDN base — combine with a size and a path from the API.
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Common TMDB poster and backdrop sizes.
export const IMAGE_SIZES = {
  poster: {
    small: "w185",
    medium: "w342",
    large: "w500",
    original: "original",
  },
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280",
    original: "original",
  },
};

// How often the hero slideshow advances to the next movie (milliseconds).
export const HERO_INTERVAL_MS = 6000;

// How many movies the Home page "Popular Right Now" row shows.
export const HOME_PREVIEW_COUNT = 5;

// Fallback placeholder shown when a movie has no poster image.
export const POSTER_PLACEHOLDER =
  "https://placehold.co/500x750/18181b/f5c451?text=No+Poster";

// Genre names shown as quick-access buttons on the Home page.
export const HOME_GENRE_SHORTCUTS = [
  { label: "🎬 Action", name: "Action" },
  { label: "😂 Comedy", name: "Comedy" },
  { label: "🎭 Drama", name: "Drama" },
  { label: "👻 Horror", name: "Horror" },
  { label: "✨ Animation", name: "Animation" },
  { label: "🚀 Sci-Fi", name: "Science Fiction" },
  { label: "🕵️ Thriller", name: "Thriller" },
  { label: "❤️ Romance", name: "Romance" },
];
