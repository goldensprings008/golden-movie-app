function LoadingSkeleton({ count = 10 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {/* Creates several placeholder cards while API data is loading. */}
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-xl border border-cinema-800 bg-cinema-900"
        >
          <div className="aspect-[2/3] bg-cinema-800" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-1/3 rounded bg-cinema-800" />
            <div className="h-5 w-3/4 rounded bg-cinema-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;