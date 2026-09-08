import { useEffect, useState } from "react";
import ErrorState from "../components/feedback/ErrorState";
import LoadingSkeleton from "../components/feedback/LoadingSkeleton";
import GenreFilter from "../components/movies/GenreFilter";
import MovieGrid from "../components/movies/MovieGrid";
import SearchBar from "../components/movies/SearchBar";
import { getMovieGenres } from "../services/tmdbApi";
import useMovies from "../hooks/useMovies";

function MoviesPage() {
  // useMovies handles all fetching, pagination, search and genre logic.
  const {
    movies,
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
  } = useMovies();

  const [genres, setGenres] = useState([]);
  const [isGenresLoading, setIsGenresLoading] = useState(true);

  useEffect(() => {
    // Fetches TMDB genre names once for the filter buttons.
    async function loadGenres() {
      try {
        const data = await getMovieGenres();
        setGenres(data.genres);
      } finally {
        setIsGenresLoading(false);
      }
    }

    loadGenres();
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    search(query.trim());
  }

  // Build a descriptive page heading based on the current mode.
  const selectedGenre = genres.find((g) => g.id === selectedGenreId);
  const pageTitle = activeSearch
    ? `Results for "${activeSearch}"`
    : selectedGenre
      ? `${selectedGenre.name} Movies`
      : "Popular Movies";

  const isFetchingMovies = isLoading || isSearching;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">
        Browse the collection
      </p>

      <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
        {pageTitle}
      </h1>

      <p className="mt-3 max-w-2xl text-zinc-400">
        Search for a title or filter popular movies by genre.
      </p>

      {/* Search bar */}
      <div className="mt-8">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSearch}
          onClear={clearSearch}
          isSearching={isSearching}
        />
      </div>

      {/* Genre filter */}
      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold text-zinc-300">
          Filter by genre
        </p>
        <GenreFilter
          genres={genres}
          selectedGenreId={selectedGenreId}
          onSelectGenre={filterByGenre}
          isLoading={isGenresLoading}
        />
      </div>

      {/* Results area */}
      <div className="mt-8">
        {isFetchingMovies && <LoadingSkeleton />}

        {!isFetchingMovies && error && (
          <ErrorState message={error} onRetry={retry} />
        )}

        {!isFetchingMovies && !error && movies.length === 0 && (
          <p className="text-zinc-400">
            No movies matched your search or genre selection.
          </p>
        )}

        {!isFetchingMovies && !error && movies.length > 0 && (
          <>
            <MovieGrid movies={movies} />

            {/* Load More is hidden during search — TMDB search is single-page. */}
            {!activeSearch && hasMoreMovies && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="rounded-lg bg-gold-400 px-6 py-3 font-semibold text-cinema-950 transition hover:bg-gold-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoadingMore ? "Loading movies..." : "Load More Movies"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default MoviesPage;
