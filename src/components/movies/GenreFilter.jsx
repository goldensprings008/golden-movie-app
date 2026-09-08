function GenreFilter({
  genres,
  selectedGenreId,
  onSelectGenre,
  isLoading,
}) {
  if (isLoading) {
    return <div className="h-10 animate-pulse rounded-lg bg-cinema-800" />;
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {/* The All Movies button removes the selected genre filter. */}
      <button
        type="button"
        onClick={() => onSelectGenre(null)}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
          selectedGenreId === null
            ? "bg-gold-400 text-cinema-950"
            : "border border-cinema-800 text-zinc-300 hover:border-gold-400 hover:text-gold-400"
        }`}
      >
        All Movies
      </button>

      {/* Each genre comes from the TMDB API and becomes one filter button. */}
      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          onClick={() => onSelectGenre(genre.id)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
            selectedGenreId === genre.id
              ? "bg-gold-400 text-cinema-950"
              : "border border-cinema-800 text-zinc-300 hover:border-gold-400 hover:text-gold-400"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;