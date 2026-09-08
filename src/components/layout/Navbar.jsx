import { useState } from "react";
import { NavLink } from "react-router";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Movies", path: "/movies" },
  { label: "Free Films", path: "/free-movies" },
  { label: "Favorites", path: "/favorites" },
  { label: "Watchlist", path: "/watchlist" },
];

function Navbar() {
  // Controls whether the navigation menu is visible on mobile screens.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cinema-800 bg-cinema-950/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-gold-400"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-400 text-sm text-cinema-950">
            GS
          </span>
          Golden Springs
        </NavLink>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-md border border-cinema-800 px-3 py-2 text-xl text-white md:hidden"
        >
          ☰
        </button>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col gap-2 border-b border-cinema-800 bg-cinema-950 p-4 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-gold-400 text-cinema-950"
                    : "text-zinc-300 hover:bg-cinema-800 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;