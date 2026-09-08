import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ErrorState from "../components/feedback/ErrorState";
import RatingBadge from "../components/movies/RatingBadge";
import { useMovieLists } from "../context/MovieListsContext";
import { getImageUrl, getMovieDetails } from "../services/tmdbApi";
import { Bookmark, Heart } from "lucide-react";

function MovieDetailsPage() {
  // Reads the movie ID from the dynamic route: /movie/:id
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { toggleFavorite, toggleWatchlist, isFavorite, isInWatchlist } =
    useMovieLists();

  // Fetches all available TMDB data for the selected movie.
  const loadMovieDetails = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadMovieDetails();
    // Scroll back to the top whenever the user navigates to a new movie.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loadMovieDetails]);

  // ── Loading state ────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-80 rounded-xl bg-cinema-900 sm:h-[460px]" />
        <div className="mt-8 h-10 max-w-md rounded bg-cinema-800" />
        <div className="mt-4 h-5 max-w-2xl rounded bg-cinema-800" />
        <div className="mt-2 h-5 max-w-xl rounded bg-cinema-800" />
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ErrorState message={error} onRetry={loadMovieDetails} />
      </div>
    );
  }

  if (!movie) return null;

  // ── Derived display values ───────────────────────────────────────────────────
  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const runtime = movie.runtime ? `${movie.runtime} min` : "N/A";
  const movieIsFavorite = isFavorite(movie.id);
  const movieIsInWatchlist = isInWatchlist(movie.id);

  return (
    <div>
      {/* ── Backdrop hero ── */}
      <section className="relative min-h-[380px] overflow-hidden sm:min-h-[480px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageUrl(
              movie.backdrop_path || movie.poster_path,
              "original"
            )})`,
          }}
        />
        {/* Two gradient overlays keep text readable on any backdrop. */}
        <div className="absolute inset-0 bg-linear-to-r from-cinema-950 via-cinema-950/85 to-cinema-950/30" />
        <div className="absolute inset-0 bg-linear-to-t from-cinema-950 via-transparent to-cinema-950/30" />

        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-end px-4 py-12 sm:min-h-[480px] sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              to="/movies"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-400 transition hover:text-gold-500"
            >
              ← Back to Movies
            </Link>

            <h1 className="mt-5 text-4xl font-bold text-white sm:text-6xl">
              {movie.title}
            </h1>

            {/* Quick metadata row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-200">
              <RatingBadge rating={movie.vote_average} />
              <span>{releaseYear}</span>
              <span>{runtime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content section ── */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        {/* Poster */}
        <img
          src={getImageUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="w-full max-w-[260px] rounded-xl border border-cinema-800 shadow-xl shadow-black/30"
        />

        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">
            Movie Overview
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            About this movie
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-zinc-300">
            {movie.overview || "No overview available for this movie."}
          </p>

          {/* Favorite + Watchlist action buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toggleFavorite(movie)}
              aria-label={
                movieIsFavorite
                  ? `Remove ${movie.title} from favorites`
                  : `Add ${movie.title} to favorites`
              }
              className={`flex items-center gap-2 rounded-lg px-5 py-3 font-semibold transition ${
                movieIsFavorite
                  ? "bg-red-500/15 text-red-400 hover:bg-red-500/25"
                  : "bg-cinema-800 text-zinc-200 hover:text-red-400"
              }`}
            >
              <Heart
                size={18}
                fill={movieIsFavorite ? "currentColor" : "none"}
              />
              {movieIsFavorite ? "In Favorites" : "Add to Favorites"}
            </button>

            <button
              type="button"
              onClick={() => toggleWatchlist(movie)}
              aria-label={
                movieIsInWatchlist
                  ? `Remove ${movie.title} from watchlist`
                  : `Add ${movie.title} to watchlist`
              }
              className={`flex items-center gap-2 rounded-lg px-5 py-3 font-semibold transition ${
                movieIsInWatchlist
                  ? "bg-gold-400/15 text-gold-400 hover:bg-gold-400/25"
                  : "bg-cinema-800 text-zinc-200 hover:text-gold-400"
              }`}
            >
              <Bookmark
                size={18}
                fill={movieIsInWatchlist ? "currentColor" : "none"}
              />
              {movieIsInWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </button>
          </div>

          {/* Genre tags */}
          {movie.genres?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-zinc-300">Genres</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-cinema-800 bg-cinema-900 px-3 py-1 text-sm text-zinc-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Info grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-cinema-800 bg-cinema-900 p-4">
              <p className="text-xs text-zinc-400">Release date</p>
              <p className="mt-1 font-semibold text-white">
                {movie.release_date || "N/A"}
              </p>
            </div>

            <div className="rounded-xl border border-cinema-800 bg-cinema-900 p-4">
              <p className="text-xs text-zinc-400">Runtime</p>
              <p className="mt-1 font-semibold text-white">{runtime}</p>
            </div>

            <div className="rounded-xl border border-cinema-800 bg-cinema-900 p-4">
              <p className="text-xs text-zinc-400">Original language</p>
              <p className="mt-1 font-semibold text-white">
                {movie.original_language?.toUpperCase() || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MovieDetailsPage;
