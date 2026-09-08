import { Bookmark, Clapperboard, Film, Heart, House } from "lucide-react";
import { NavLink } from "react-router";

const mobileNavLinks = [
  { label: "Home", path: "/", icon: House },
  { label: "Movies", path: "/movies", icon: Clapperboard },
  { label: "Free Films", path: "/free-movies", icon: Film },
  { label: "Favorites", path: "/favorites", icon: Heart },
  { label: "Watchlist", path: "/watchlist", icon: Bookmark },
];

function BottomNavigation() {
  return (
    // Visible only on mobile; fixed at the bottom for easy one-hand navigation.
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-cinema-800 bg-cinema-950/95 px-2 py-2 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {mobileNavLinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex min-w-16 flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? "text-gold-400"
                    : "text-zinc-400 hover:text-white"
                }`
              }
            >
              <Icon size={22} strokeWidth={2} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;