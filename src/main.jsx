import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { MovieListsProvider } from "./context/MovieListsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      {/* Makes Favorites and Watchlist available across all pages. */}
      <MovieListsProvider>
        <App />
      </MovieListsProvider>
    </BrowserRouter>
  </React.StrictMode>
);