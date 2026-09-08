import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const MovieListsContext = createContext();

export function MovieListsProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage(
    "golden-springs-favorites",
    []
  );

  const [watchlist, setWatchlist] = useLocalStorage(
    "golden-springs-watchlist",
    []
  );

  // Adds a movie if missing; removes it if it is already saved.
  function toggleFavorite(movie) {
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.some(
        (savedMovie) => savedMovie.id === movie.id
      );

      return isFavorite
        ? currentFavorites.filter((savedMovie) => savedMovie.id !== movie.id)
        : [movie, ...currentFavorites];
    });
  }

  function toggleWatchlist(movie) {
    setWatchlist((currentWatchlist) => {
      const isInWatchlist = currentWatchlist.some(
        (savedMovie) => savedMovie.id === movie.id
      );

      return isInWatchlist
        ? currentWatchlist.filter((savedMovie) => savedMovie.id !== movie.id)
        : [movie, ...currentWatchlist];
    });
  }

  function isFavorite(movieId) {
    return favorites.some((movie) => movie.id === movieId);
  }

  function isInWatchlist(movieId) {
    return watchlist.some((movie) => movie.id === movieId);
  }

  return (
    <MovieListsContext.Provider
      value={{
        favorites,
        watchlist,
        toggleFavorite,
        toggleWatchlist,
        isFavorite,
        isInWatchlist,
      }}
    >
      {children}
    </MovieListsContext.Provider>
  );
}

// Custom hook gives components easy access to shared movie-list state.
export function useMovieLists() {
  const context = useContext(MovieListsContext);

  if (!context) {
    throw new Error("useMovieLists must be used inside MovieListsProvider.");
  }

  return context;
}