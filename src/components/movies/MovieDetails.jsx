// MovieDetails renders the full detail layout for one movie.
// It receives an already-fetched movie object as a prop so
// it can be embedded anywhere without managing its own fetch.

import { Bookmark, Heart } from "lucide-react";
import { Link } from "react-router";
import { useMovieLists } from "../../context/MovieListsContext";
import { getImageUrl } from "../../services/tmdbApi";
import RatingBadge from "./RatingBadge";

function MovieDetails({ movie }) {
  const { toggleFavorite, toggleWatchlist, isFavorite, isInWatchlist } =
    useMovieLists();

  if (!movie) return null;

  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const runtime = movie.runtime ? `${movie.runtime} min` : "N/A";
  const movieIsFavorite = isFavorite(movie.id);
  const movieIsInWatchlist = isInWatchlist(movie.id);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Poster image */}
      <img
        src={getImageUrl(movie.poster_path)}
        alt={`${movie.title} poster`}
        className="w-full max-w-[260px] rounded-xl border border-cinema-800 shadow-xl shadow-black/30"
      />

      <div>
        {/* Title and quick metadata */}
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {movie.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-300">
          <RatingBadge rating={movie.vote_average} />
          <span>{releaseYear}</span>
          <span>{runtime}</span>
        </div>

        <p className="mt-6 max-w-3xl leading-8 text-zinc-300">
          {movie.overview || "No overview available for this movie."}
        </p>

        {/* Save action buttons */}
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
            <Heart size={18} fill={movieIsFavorite ? "currentColor" : "none"} />
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

        {/* Info tiles */}
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
            <p className="text-xs text-zinc-400">Language</p>
            <p className="mt-1 font-semibold text-white">
              {movie.original_language?.toUpperCase() || "N/A"}
            </p>
          </div>
        </div>

        <Link
          to="/movies"
          className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-gold-400 transition hover:text-gold-500"
        >
          ← Back to Movies
        </Link>
      </div>
    </div>
  );
}

export default MovieDetails;
