import { useCallback, useEffect, useState } from "react";
import {
  getMoviesByGenre,
  getPopularMovies,
  searchMovies,
} from "../services/tmdbApi";

// Centralises all movie-fetching logic so pages stay clean and focused on UI.
// Returns movies, loading/error state, pagination helpers, and action functions.
function useMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [query, setQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  // Loads the first page of popular movies and resets all other state.
  const loadPopularMovies = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getPopularMovies(1);

      setMovies(data.results);
      setPage(data.page);
      setHasMoreMovies(data.page < data.total_pages);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Run the initial popular-movies fetch when this hook is first used.
  useEffect(() => {
    loadPopularMovies();
  }, [loadPopularMovies]);

  // Loads the first page of movies for a chosen genre.
  async function filterByGenre(genreId) {
    setSelectedGenreId(genreId);
    setQuery("");
    setActiveSearch("");

    if (genreId === null) {
      loadPopularMovies();
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await getMoviesByGenre(genreId, 1);

      setMovies(data.results);
      setPage(data.page);
      setHasMoreMovies(data.page < data.total_pages);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Runs a TMDB title search and clears any active genre filter.
  async function search(searchTerm) {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setError("");
    setActiveSearch(searchTerm);
    setSelectedGenreId(null);

    try {
      const data = await searchMovies(searchTerm);

      setMovies(data.results);
      // Search results are single-page — no pagination needed.
      setHasMoreMovies(false);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSearching(false);
    }
  }

  // Clears the search and goes back to the popular-movies list.
  function clearSearch() {
    setQuery("");
    setActiveSearch("");
    loadPopularMovies();
  }

  // Appends the next page to the current list (popular or genre).
  async function loadMore() {
    setIsLoadingMore(true);

    try {
      const nextPage = page + 1;

      const data =
        selectedGenreId !== null
          ? await getMoviesByGenre(selectedGenreId, nextPage)
          : await getPopularMovies(nextPage);

      // Spread the current movies first so existing cards stay visible.
      setMovies((current) => [...current, ...data.results]);
      setPage(data.page);
      setHasMoreMovies(data.page < data.total_pages);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoadingMore(false);
    }
  }

  // Retries whichever fetch mode was active when the error occurred.
  function retry() {
    if (activeSearch) {
      search(activeSearch);
    } else if (selectedGenreId !== null) {
      filterByGenre(selectedGenreId);
    } else {
      loadPopularMovies();
    }
  }

  return {
    movies,
    page,
    hasMoreMovies,
    selectedGenreId,
    query,
    setQuery,
    activeSearch,
    isLoading,
    isLoadingMore,
    isSearching,
    error,
    filterByGenre,
    search,
    clearSearch,
    loadMore,
    retry,
  };
}

export default useMovies;
