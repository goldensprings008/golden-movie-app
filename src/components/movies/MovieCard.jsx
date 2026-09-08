import { Bookmark, Heart } from "lucide-react";
import { Link } from "react-router";
import { useMovieLists } from "../../context/MovieListsContext";
import { getImageUrl } from "../../services/tmdbApi";

function MovieCard({ movie }) {
  const {
    toggleFavorite,
    toggleWatchlist,
    isFavorite,
    isInWatchlist,
  } = useMovieLists();

  // Checks shared Context state to update each button's visual state.
  const movieIsFavorite = isFavorite(movie.id);
  const movieIsInWatchlist = isInWatchlist(movie.id);

  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <article className="group overflow-hidden rounded-xl border border-cinema-800 bg-cinema-900 transition duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-xl hover:shadow-black/30">
      {/* Clicking the poster opens the dynamic Movie Details route. */}
      <Link to={`/movie/${movie.id}`} className="block">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-gold-400">★ {rating}</p>
          <p className="text-sm text-zinc-400">{releaseYear}</p>
        </div>

        <h3 className="mt-2 truncate text-lg font-semibold text-white">
          {movie.title}
        </h3>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            to={`/movie/${movie.id}`}
            className="text-sm font-semibold text-gold-400 transition hover:text-gold-500"
          >
            View details →
          </Link>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label={
                movieIsFavorite
                  ? `Remove ${movie.title} from favorites`
                  : `Add ${movie.title} to favorites`
              }
              onClick={() => toggleFavorite(movie)}
              className={`rounded-md p-2 transition ${
                movieIsFavorite
                  ? "bg-red-500/15 text-red-400"
                  : "bg-cinema-800 text-zinc-300 hover:text-red-400"
              }`}
            >
              <Heart size={18} fill={movieIsFavorite ? "currentColor" : "none"} />
            </button>

            <button
              type="button"
              aria-label={
                movieIsInWatchlist
                  ? `Remove ${movie.title} from watchlist`
                  : `Add ${movie.title} to watchlist`
              }
              onClick={() => toggleWatchlist(movie)}
              className={`rounded-md p-2 transition ${
                movieIsInWatchlist
                  ? "bg-gold-400/15 text-gold-400"
                  : "bg-cinema-800 text-zinc-300 hover:text-gold-400"
              }`}
            >
              <Bookmark
                size={18}
                fill={movieIsInWatchlist ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;