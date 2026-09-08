import { Heart } from "lucide-react";
import EmptyState from "../components/feedback/EmptyState";
import MovieGrid from "../components/movies/MovieGrid";
import { useMovieLists } from "../context/MovieListsContext";

function FavoritesPage() {
  // Gets saved favorite movies from the shared Context API state.
  const { favorites } = useMovieLists();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">
        Your collection
      </p>

      <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
        Favorite Movies
      </h1>

      <p className="mt-3 text-zinc-400">
        Movies you love and want to keep close.
      </p>

      <div className="mt-8">
        {favorites.length > 0 ? (
          <MovieGrid movies={favorites} />
        ) : (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            description="Save movies you love by pressing the heart icon on a movie card."
            actionLabel="Explore Movies"
            actionPath="/movies"
          />
        )}
      </div>
    </section>
  );
}

export default FavoritesPage;