const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// A reusable function that handles all TMDB API requests.
async function request(endpoint, parameters = {}) {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing. Check your .env file.");
  }

  const queryParameters = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    ...parameters,
  });

  const response = await fetch(
    `${BASE_URL}${endpoint}?${queryParameters.toString()}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch movie data. Please try again.");
  }

  return response.json();
}

// Retrieves one page of popular movies from TMDB.
export function getPopularMovies(page = 1) {
  return request("/movie/popular", { page });
}

// Retrieves all movie genres for the Movies filter.
export function getMovieGenres() {
  return request("/genre/movie/list");
}

// Searches TMDB using the user's search text.
export function searchMovies(query) {
  return request("/search/movie", { query });
}

// Retrieves complete information for one selected movie.
export function getMovieDetails(movieId) {
  return request(`/movie/${movieId}`, {
    append_to_response: "credits,videos",
  });
}

// Creates a complete TMDB image URL from a poster or backdrop path.
export function getImageUrl(imagePath, size = "w500") {
  return imagePath
    ? `${IMAGE_BASE_URL}/${size}${imagePath}`
    : "https://placehold.co/500x750/18181b/f5c451?text=No+Poster";
}
// Retrieves popular movies that belong to one selected genre.
export function getMoviesByGenre(genreId, page = 1) {
  return request("/discover/movie", {
    with_genres: genreId,
    page,
    sort_by: "popularity.desc",
    include_adult: "false",
    include_video: "false",
  });
}