import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {/* Map through the movie array to create one reusable card per movie. */}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;