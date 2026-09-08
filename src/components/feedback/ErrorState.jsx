function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
      <p className="font-semibold text-red-300">Something went wrong</p>
      <p className="mt-2 text-sm text-zinc-300">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg bg-gold-400 px-4 py-2 font-semibold text-cinema-950 transition hover:bg-gold-500"
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorState;