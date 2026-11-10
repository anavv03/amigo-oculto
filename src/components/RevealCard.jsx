import { Gift, ShieldCheck, Sparkles } from 'lucide-react';

export default function RevealCard({ receiver, revealed, onReveal }) {
  if (!revealed) {
    return (
      <button
        type="button"
        onClick={onReveal}
        className="w-full cursor-pointer rounded-2xl border-2 border-amber-300/40 bg-gradient-to-br from-amber-600 to-red-700 p-6 shadow-lg transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/60 active:scale-95"
      >
        <span className="flex flex-col items-center justify-center gap-3 py-6">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm">
            <Gift className="h-8 w-8 text-amber-200" aria-hidden="true" />
          </span>
          <span className="text-base font-bold text-white">Toca aqui para descobrir! 👆</span>
          <span className="text-xs text-white/70">(Guarda segredo da restante família!)</span>
        </span>
      </button>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="scale-105 animate-scale-up space-y-3 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-emerald-800 to-teal-900 p-6 py-8 shadow-2xl"
    >
      <div className="inline-flex rounded-full border border-amber-400/40 bg-amber-400/20 p-3 text-amber-300">
        <Sparkles className="h-8 w-8" aria-hidden="true" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
        O teu Amigo Oculto é:
      </p>
      <h2 className="break-words text-3xl font-extrabold tracking-wide text-amber-300 drop-shadow-md sm:text-4xl">
        {receiver}
      </h2>
      <p className="flex items-center justify-center gap-1.5 pt-2 text-xs text-emerald-100/70">
        <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
        Sorteio aleatório e privado
      </p>
    </div>
  );
}
