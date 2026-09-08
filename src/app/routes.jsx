// Central route definitions for the app.
// The <Routes> tree lives in src/App.jsx and uses these path constants
// so route strings are never duplicated across the codebase.

export const ROUTES = {
  home: "/",
  movies: "/movies",
  movieDetails: "/movie/:id",         // dynamic — replace :id with the movie ID
  favorites: "/favorites",
  watchlist: "/watchlist",
};

// Helper: build a concrete movie-details URL from a numeric ID.
// Usage: movieDetailPath(123) → "/movie/123"
export function movieDetailPath(id) {
  return `/movie/${id}`;
}
