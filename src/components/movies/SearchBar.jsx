function SearchBar({
  query,
  onQueryChange,
  onSubmit,
  onClear,
  isSearching,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      {/* This controlled input receives its value and update function through props. */}
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search for a movie..."
        aria-label="Search for a movie"
        className="min-w-0 flex-1 rounded-lg border border-cinema-800 bg-cinema-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-gold-400"
      />

      <button
        type="submit"
        disabled={isSearching}
        className="rounded-lg bg-gold-400 px-5 py-3 font-semibold text-cinema-950 transition hover:bg-gold-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSearching ? "Searching..." : "Search"}
      </button>

      {query && (
        <button
          type="button"
          onClick={onClear}
          className="rounded-lg border border-cinema-800 px-5 py-3 font-semibold text-zinc-200 transition hover:border-gold-400 hover:text-gold-400"
        >
          Clear
        </button>
      )}
    </form>
  );
}

export default SearchBar;