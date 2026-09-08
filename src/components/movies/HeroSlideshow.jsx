import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getImageUrl, getPopularMovies } from "../../services/tmdbApi";

function HeroSlideshow() {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch only movies that have a backdrop image for the hero slideshow.
    async function loadHeroMovies() {
      try {
        const data = await getPopularMovies();

       const moviesWithBackdrops = [...data.results]
            .filter((movie) => movie.backdrop_path)
            .sort(() => Math.random() - 0.5)
            .slice(0, 20);

        setMovies(moviesWithBackdrops);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false); 
      }
    }

    loadHeroMovies();
  }, []);

  useEffect(() => {
    // Changes the featured movie automatically every six seconds.
    if (movies.length < 2) return;

    const intervalId = setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % movies.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [movies.length]);

  if (isLoading) {
    return (
      <section className="h-[580px] animate-pulse bg-cinema-900 sm:h-[620px]" />
    );
  }

  if (error || movies.length === 0) {
    return (
      <section className="bg-cinema-900 px-4 py-20 text-center">
        <p className="text-zinc-300">
          {error || "Featured movies are unavailable right now."}
        </p>
      </section>
    );
  }

  const activeMovie = movies[activeIndex];

  return (
    <section className="relative min-h-[580px] overflow-hidden sm:min-h-[620px]">
      <div
        key={activeMovie.id}
        className="absolute inset-0 animate-[hero-fade_700ms_ease-out] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(
            activeMovie.backdrop_path,
            "original"
          )})`,
        }}
      />

      {/* Dark layers keep the text readable over any movie image. */}
      <div className="absolute inset-0 bg-linear-to-r from-cinema-950 via-cinema-950/80 to-cinema-950/25" />
      <div className="absolute inset-0 bg-linear-to-t from-cinema-950 via-transparent to-cinema-950/30" />

      <div className="relative mx-auto flex min-h-[580px] max-w-7xl items-end px-4 pb-16 sm:min-h-[620px] sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-gold-400 uppercase">
            Now Trending
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {activeMovie.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-zinc-200">
            <span className="font-semibold text-gold-400">
              ★ {activeMovie.vote_average.toFixed(1)}
            </span>
            <span>{activeMovie.release_date?.slice(0, 4) || "Coming soon"}</span>
          </div>

          <p className="mt-5 line-clamp-3 max-w-xl leading-7 text-zinc-200">
            {activeMovie.overview}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to={`/movie/${activeMovie.id}`}
              className="rounded-lg bg-gold-400 px-5 py-3 font-semibold text-cinema-950 transition hover:bg-gold-500"
            >
              View Details
            </Link>

            <Link
              to="/movies"
              className="rounded-lg border border-white/30 px-5 py-3 font-semibold text-white transition hover:border-gold-400 hover:text-gold-400"
            >
              Explore Movies
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {movies.map((movie, index) => (
          <button
            key={movie.id}
            type="button"
            aria-label={`Show ${movie.title}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition ${
              index === activeIndex ? "w-8 bg-gold-400" : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlideshow;