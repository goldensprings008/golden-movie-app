import { Link } from "react-router";

function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionPath,
}) {
  return (
    <div className="rounded-xl border border-dashed border-cinema-800 bg-cinema-900 px-6 py-16 text-center">
      <Icon size={42} className="mx-auto text-gold-400" />

      <h2 className="mt-5 text-2xl font-bold text-white">{title}</h2>

      <p className="mx-auto mt-3 max-w-md text-zinc-400">{description}</p>

      <Link
        to={actionPath}
        className="mt-7 inline-block rounded-lg bg-gold-400 px-5 py-3 font-semibold text-cinema-950 transition hover:bg-gold-500"
      >
        {actionLabel}
      </Link>
    </div>
  );
}

export default EmptyState;