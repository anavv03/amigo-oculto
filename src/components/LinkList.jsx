import { useState } from 'react';
import { Check, Copy, MessageCircle, RefreshCw } from 'lucide-react';
import { buildRevealUrl, buildWhatsAppUrl } from '../lib/share';

const baseUrl = () => window.location.href.split('#')[0];

function LinkRow({ name, payload, eventName }) {
  const [copied, setCopied] = useState(false);
  const url = buildRevealUrl(baseUrl(), payload);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copia o link:', url);
    }
  };

  return (
    <li className="flex items-center justify-between gap-2 rounded-xl border border-slate-700/50 bg-slate-800/60 px-3.5 py-2.5 text-sm">
      <span className="truncate font-medium text-slate-200">{name}</span>
      <span className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1 rounded-lg bg-slate-700 px-2.5 py-1.5 text-xs font-semibold transition-colors hover:bg-slate-600"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
        <a
          href={buildWhatsAppUrl({ name, event: eventName, url })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-lg bg-emerald-700 px-2.5 py-1.5 text-xs font-semibold transition-colors hover:bg-emerald-600"
        >
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          WhatsApp
        </a>
      </span>
    </li>
  );
}

export default function LinkList({ links, eventName, onReset }) {
  const handleReset = () => {
    if (
      window.confirm(
        'Reiniciar o sorteio? Os links já enviados deixam de ser válidos e todos os pares mudam.',
      )
    ) {
      onReset();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-amber-300">Sorteio feito! 🎉</h2>
        <p className="mt-1 text-xs text-slate-300">
          Envia a cada pessoa <strong>apenas o seu link</strong>, em privado. Não abras os links dos
          outros — o resultado vê-se logo.
        </p>
      </div>

      <ul className="space-y-2">
        {links.map((link) => (
          <LinkRow key={link.name} {...link} eventName={eventName} />
        ))}
      </ul>

      <button
        type="button"
        onClick={handleReset}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-600/20 py-2.5 text-xs font-bold text-red-300 transition-colors hover:bg-red-600/30"
      >
        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        Reiniciar e editar a lista
      </button>
    </div>
  );
}
