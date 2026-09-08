// RatingBadge displays a TMDB vote_average as a coloured star badge.
// The colour shifts from red (low) → amber → gold (high) based on score.

function RatingBadge({ rating, className = "" }) {
  // Format to one decimal place, or show N/A when the score is missing.
  const display =
    rating && rating > 0 ? Number(rating).toFixed(1) : "N/A";

  // Decide badge colour based on score range.
  function getBadgeStyle() {
    if (!rating || rating === 0) return "bg-zinc-700 text-zinc-300";
    if (rating >= 7.5) return "bg-gold-400/20 text-gold-400 border border-gold-400/40";
    if (rating >= 6.0) return "bg-amber-500/20 text-amber-400 border border-amber-500/40";
    return "bg-red-500/20 text-red-400 border border-red-500/40";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${getBadgeStyle()} ${className}`}
      aria-label={`Rating: ${display} out of 10`}
    >
      {/* Star icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3 w-3"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      {display}
    </span>
  );
}

export default RatingBadge;
