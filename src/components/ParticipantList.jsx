import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function ParticipantList({ participants, onAdd, onRemove }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd(name)) setName('');
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do familiar..."
          aria-label="Nome do familiar"
          maxLength={40}
          className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-400"
        />
        <button
          type="submit"
          className="flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-500"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Adicionar
        </button>
      </form>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Participantes ({participants.length})
        </p>
        {participants.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-700 px-3.5 py-4 text-center text-sm text-slate-500">
            Ainda ninguém. Adiciona pelo menos 3 pessoas.
          </p>
        ) : (
          <ul className="max-h-60 space-y-2 overflow-y-auto pr-1">
            {participants.map((person) => (
              <li
                key={person}
                className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/60 px-3.5 py-2.5 text-sm"
              >
                <span className="font-medium text-slate-200">{person}</span>
                <button
                  type="button"
                  onClick={() => onRemove(person)}
                  className="p-1 text-slate-500 transition-colors hover:text-red-400"
                  aria-label={`Remover ${person}`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
