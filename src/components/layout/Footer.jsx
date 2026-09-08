import { Link } from "react-router";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "Movies", path: "/movies" },
  { label: "Favorites", path: "/favorites" },
  { label: "Watchlist", path: "/watchlist" },
];

function Footer() {
  return (
    <footer className="border-t border-cinema-800 bg-cinema-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-gold-400">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-400 text-sm text-cinema-950">
                GS
              </span>

              Golden Springs
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
              Discover, save, and enjoy your next great story.
            </p>
          </div>

          <div className="md:justify-self-end">
            <p className="text-sm font-semibold text-white">Quick Links</p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-zinc-400 transition hover:text-gold-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Brand ownership and contact information. */}
        <div className="mt-10 flex flex-col gap-2 border-t border-cinema-800 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Golden Springs Movie Discovery</p>
          <p>Developed by Golden Springs · 0744131492</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;