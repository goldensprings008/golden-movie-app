# 🎬 Golden Springs Movie Discovery

A cinematic movie-discovery app built with React, Vite, and Tailwind CSS. Browse popular movies, search by title, filter by genre, save favorites, and build a personal watchlist — all powered by the TMDB API.

---

## ✨ Features

- **Hero Slideshow** — Auto-advancing full-backdrop showcase of trending movies, changing every 6 seconds with dot navigation
- **Popular Movies** — Paginated grid of current popular movies with Load More support
- **Search** — Live title search powered by the TMDB search endpoint
- **Genre Filter** — Filter the entire movie catalog by genre using TMDB Discover
- **Movie Details** — Dynamic route showing backdrop, overview, genres, runtime, release date, and language
- **Favorites** — Save and remove movies you love; persisted in localStorage
- **Watchlist** — Queue movies to watch later; persisted in localStorage
- **Responsive Navbar** — Sticky top navigation with a mobile hamburger menu
- **Mobile Bottom Navigation** — Fixed bottom bar with Lucide icons for one-hand mobile use
- **Dark Cinematic Design** — Charcoal (`#09090b`) and gold (`#f5c451`) color scheme throughout

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) | UI library |
| [Vite 8](https://vite.dev) | Build tool and dev server |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [React Router v7](https://reactrouter.com) | Client-side routing |
| [Lucide React](https://lucide.dev) | Icon set |
| [TMDB API](https://developer.themoviedb.org) | Movie data source |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── App.jsx               # Re-export of root App
│   └── routes.jsx            # ROUTES constants + movieDetailPath helper
├── assets/                   # Static images
├── components/
│   ├── feedback/
│   │   ├── EmptyState.jsx    # Empty list placeholder with CTA
│   │   ├── ErrorState.jsx    # Error message with retry button
│   │   └── LoadingSkeleton.jsx # Animated card placeholders
│   ├── layout/
│   │   ├── BottomNavigation.jsx # Mobile fixed bottom nav
│   │   ├── Footer.jsx           # Site footer with branding
│   │   ├── Navbar.jsx           # Sticky top nav
│   │   └── PageContainer.jsx    # Reusable max-width wrapper
│   └── movies/
│       ├── GenreFilter.jsx      # Horizontal scrollable genre buttons
│       ├── HeroSlideshow.jsx    # Full-backdrop auto-advancing hero
│       ├── MovieCard.jsx        # Individual movie card with actions
│       ├── MovieDetails.jsx     # Full detail layout (reusable component)
│       ├── MovieGrid.jsx        # Responsive grid of MovieCards
│       ├── RatingBadge.jsx      # Colour-coded star rating badge
│       └── SearchBar.jsx        # Controlled search form
├── constants/
│   └── config.js             # App-wide constants (sizes, intervals, routes)
├── context/
│   └── MovieListsContext.jsx # Favorites + Watchlist shared state (Context API)
├── hooks/
│   ├── useLocalStorage.js    # Syncs React state with localStorage
│   └── useMovies.js          # Custom hook for fetch, search, filter, pagination
├── pages/
│   ├── FavoritesPage.jsx     # Saved favorites grid
│   ├── HomePage.jsx          # Hero + features + Popular Right Now + Browse by Genre
│   ├── MovieDetailsPage.jsx  # Dynamic movie detail route (/movie/:id)
│   ├── MoviesPage.jsx        # Full browse page with search + genre filter
│   └── WatchlistPage.jsx     # Saved watchlist grid
├── services/
│   └── tmdbApi.js            # All TMDB API calls (fetch wrapper + image helper)
├── styles/
│   ├── animations.css        # Custom @keyframes (hero-fade, slide-up, etc.)
│   └── globals.css           # Base resets and utility classes
├── App.jsx                   # Root component — layout, routes
├── index.css                 # Tailwind import + @theme colour tokens
└── main.jsx                  # React entry point — BrowserRouter + providers
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/golden-movie-app.git
cd golden-movie-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your TMDB API key

Create a `.env` file in the project root:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Get a free API key at [https://developer.themoviedb.org](https://developer.themoviedb.org).

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🗺 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero slideshow, feature highlights, Popular Right Now, Browse by Genre |
| `/movies` | Movies | Search, genre filter, paginated popular movies |
| `/movie/:id` | Movie Details | Full detail view for one selected movie |
| `/favorites` | Favorites | All movies saved to favorites |
| `/watchlist` | Watchlist | All movies saved to the watchlist |

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_TMDB_API_KEY` | ✅ Yes | Your TMDB v3 API key |

---

## 👤 Author

**Golden Springs**  
📞 0744131492

---

## 📄 License

This project is for educational and personal use.
