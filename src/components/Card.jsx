export default function Card({ children }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />
      <div className="relative">{children}</div>
    </div>
  );
}
