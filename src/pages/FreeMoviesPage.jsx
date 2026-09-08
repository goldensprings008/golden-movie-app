import { useEffect, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import ErrorState from "../components/feedback/ErrorState";
import LoadingSkeleton from "../components/feedback/LoadingSkeleton";
import { getFreeMovieFiles, searchFreeMovies } from "../services/tmdbApi";

const IMAGE_BASE_URL = "https://archive.org/services/img";

function getPlayableFile(files = []) {
  const videoFiles = files.filter((file) =>
    /\.(mp4|webm|ogv)$/i.test(file.name || "")
  );

  return videoFiles.sort((first, second) => {
    const firstScore = /\.mp4$/i.test(first.name) ? 0 : 1;
    const secondScore = /\.mp4$/i.test(second.name) ? 0 : 1;
    return firstScore - secondScore || (first.size || 0) - (second.size || 0);
  })[0];
}

function FreeMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);

  useEffect(() => {
    async function loadFreeMovies() {
      try {
        const data = await searchFreeMovies();
        setMovies(data.response?.docs || []);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadFreeMovies();
  }, []);

  async function playMovie(movie) {
    setSelectedMovie({ ...movie, status: "loading" });
    setIsLoadingMovie(true);

    try {
      const data = await getFreeMovieFiles(movie.identifier);
      const file = getPlayableFile(data.files);

      if (!file) {
        throw new Error("No browser-playable video file is available for this film.");
      }

      setSelectedMovie({
        ...movie,
        status: "ready",
        videoUrl: `https://archive.org/download/${encodeURIComponent(movie.identifier)}/${file.name.split("/").map(encodeURIComponent).join("/")}`,
      });
    } catch (requestError) {
      setSelectedMovie({ ...movie, status: "error", error: requestError.message });
    } finally {
      setIsLoadingMovie(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">
          Public domain cinema
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Free Films</h1>
        <p className="mt-4 leading-7 text-zinc-400">
          Watch films made available by Internet Archive. These titles come from a public collection; availability and playback formats vary by item.
        </p>
      </div>

      {selectedMovie?.status === "ready" && (
        <section className="mt-10 rounded-xl border border-cinema-800 bg-cinema-900 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-white">{selectedMovie.title}</h2>
            <a
              href={`https://archive.org/details/${selectedMovie.identifier}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-500"
            >
              Original item <ExternalLink size={16} />
            </a>
          </div>
          <video className="mt-5 max-h-[70vh] w-full rounded-lg bg-black" controls src={selectedMovie.videoUrl}>
            Your browser does not support video playback.
          </video>
        </section>
      )}

      {selectedMovie?.status === "error" && (
        <div className="mt-8">
          <ErrorState message={selectedMovie.error} onRetry={() => playMovie(selectedMovie)} />
        </div>
      )}

      <section className="mt-12">
        {isLoading && <LoadingSkeleton count={8} />}
        {!isLoading && error && <ErrorState message={error} onRetry={() => window.location.reload()} />}
        {!isLoading && !error && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie) => (
              <article key={movie.identifier} className="overflow-hidden rounded-xl border border-cinema-800 bg-cinema-900">
                <img
                  src={`${IMAGE_BASE_URL}/${movie.identifier}`}
                  alt=""
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h2 className="line-clamp-2 min-h-12 font-semibold text-white">{movie.title}</h2>
                  {movie.year && <p className="mt-2 text-sm text-zinc-500">{movie.year}</p>}
                  <button
                    type="button"
                    onClick={() => playMovie(movie)}
                    disabled={isLoadingMovie}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gold-400 px-4 py-2 text-sm font-semibold text-cinema-950 hover:bg-gold-500 disabled:cursor-wait disabled:opacity-60"
                  >
                    <Play size={16} fill="currentColor" />
                    {isLoadingMovie && selectedMovie?.identifier === movie.identifier ? "Loading..." : "Play Film"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default FreeMoviesPage;