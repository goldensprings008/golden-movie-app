import { Bookmark } from "lucide-react";
import EmptyState from "../components/feedback/EmptyState";
import MovieGrid from "../components/movies/MovieGrid";
import { useMovieLists } from "../context/MovieListsContext";

function WatchlistPage() {
  // Gets saved watchlist movies from the shared Context API state.
  const { watchlist } = useMovieLists();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">
        Watch later
      </p>

      <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
        My Watchlist
      </h1>

      <p className="mt-3 text-zinc-400">
        Movies saved for your next movie night.
      </p>

      <div className="mt-8">
        {watchlist.length > 0 ? (
          <MovieGrid movies={watchlist} />
        ) : (
          <EmptyState
            icon={Bookmark}
            title="Your watchlist is empty"
            description="Save movies you want to watch by pressing the bookmark icon."
            actionLabel="Explore Movies"
            actionPath="/movies"
          />
        )}
      </div>
    </section>
  );
}

export default WatchlistPage;