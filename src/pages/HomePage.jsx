import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import ErrorState from "../components/feedback/ErrorState";
import LoadingSkeleton from "../components/feedback/LoadingSkeleton";
import HeroSlideshow from "../components/movies/HeroSlideshow";
import MovieGrid from "../components/movies/MovieGrid";
import { getPopularMovies } from "../services/tmdbApi";

const genreShortcuts = ["Action", "Comedy", "Drama", "Horror", "Animation"];

function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetches a small popular-movie collection for the Home page.
  const loadPopularMovies = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getPopularMovies(1);

      // Shows only five cards to keep the Home page clean and focused.
      setPopularMovies(data.results.slice(0, 8));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPopularMovies();
  }, [loadPopularMovies]);

  return (
    <div>
      <HeroSlideshow />

      {/* Explains the three core benefits of the application. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">
            Explore with ease
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Made for movie lovers
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-xl border border-cinema-800 bg-cinema-900 p-6">
            <span className="text-3xl">🎬</span>
            <h3 className="mt-4 text-xl font-semibold text-white">Discover</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Browse popular movies and explore titles by genre.
            </p>
          </article>

          <article className="rounded-xl border border-cinema-800 bg-cinema-900 p-6">
            <span className="text-3xl">⭐</span>
            <h3 className="mt-4 text-xl font-semibold text-white">Decide</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              See ratings and movie details before choosing what to watch.
            </p>
          </article>

          <article className="rounded-xl border border-cinema-800 bg-cinema-900 p-6">
            <span className="text-3xl">♥</span>
            <h3 className="mt-4 text-xl font-semibold text-white">Save</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Keep favorite movies and your watchlist in one place.
            </p>
          </article>
        </div>
      </section>

      {/* Reuses MovieGrid to show current popular movies on the Home page. */}
      <section className="border-y border-cinema-800 bg-cinema-900/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">
                Trending now
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                Popular Right Now
              </h2>
            </div>

            <Link
              to="/movies"
              className="text-sm font-semibold text-gold-400 transition hover:text-gold-500"
            >
              View All Movies →
            </Link>
          </div>

          {isLoading && <LoadingSkeleton count={5} />}

          {!isLoading && error && (
            <ErrorState message={error} onRetry={loadPopularMovies} />
          )}

          {!isLoading && !error && (
            <MovieGrid movies={popularMovies} />
          )}
        </div>
      </section>

      {/* Gives users a fast route to the page where full genre filtering is available. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">
          Find your mood
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Browse by Genre
        </h2>

        <div className="mt-7 flex flex-wrap gap-3">
          {genreShortcuts.map((genre) => (
            <Link
              key={genre}
              to="/movies"
              className="rounded-full border border-cinema-800 bg-cinema-900 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-gold-400 hover:bg-gold-400 hover:text-cinema-950"
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;