import { Heart, Sparkles } from 'lucide-react';

export default function Layout({ eyebrow = 'Natal em Família 🎄', subtitle, children }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between overflow-x-hidden bg-gradient-to-b from-red-900 via-emerald-950 to-slate-900 p-4 font-sans text-white sm:p-6">
      <div className="pointer-events-none absolute left-0 top-0 h-32 w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent" />

      <header className="z-10 mb-2 mt-4 w-full max-w-md text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-amber-300 shadow-lg backdrop-blur-md sm:text-sm">
          <Sparkles className="h-4 w-4 animate-pulse text-amber-400" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
        <h1 className="bg-gradient-to-r from-amber-200 via-red-200 to-emerald-200 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-md sm:text-4xl">
          Amigo Oculto
        </h1>
        {subtitle && <p className="mt-1 text-xs text-emerald-100/80 sm:text-sm">{subtitle}</p>}
      </header>

      <main className="z-10 my-auto w-full max-w-md py-4">{children}</main>

      <footer className="z-10 mt-6 w-full max-w-md text-center">
        <p className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
          Feito com <Heart className="h-3 w-3 fill-red-500 text-red-500" aria-label="amor" /> para
          o Natal em Família
        </p>
      </footer>
    </div>
  );
}
