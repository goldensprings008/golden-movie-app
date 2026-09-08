import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import WatchlistPage from "./pages/WatchlistPage";
import BottomNavigation from "./components/layout/BottomNavigation";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cinema-950 text-white">
      <Navbar />
      <ScrollToTop />

      {/* Extra bottom space prevents mobile content from hiding behind the fixed bar. */}
      <main className="flex-1 pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
}

export default App;