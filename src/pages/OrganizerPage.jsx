import { Gift } from 'lucide-react';
import Card from '../components/Card';
import Layout from '../components/Layout';
import LinkList from '../components/LinkList';
import ParticipantList from '../components/ParticipantList';
import { useOrganizer } from '../hooks/useOrganizer';

export default function OrganizerPage() {
  const organizer = useOrganizer();
  const { links, eventName } = organizer;

  return (
    <Layout subtitle="Cria o sorteio e envia a cada pessoa o seu link privado.">
      <Card>
        {links ? (
          <LinkList links={links} eventName={eventName} onReset={organizer.resetDraw} />
        ) : (
          <div className="space-y-5">
            <div>
              <label htmlFor="event" className="mb-1.5 block text-sm font-semibold text-emerald-200">
                Nome do evento
              </label>
              <input
                id="event"
                type="text"
                value={eventName}
                onChange={(e) => organizer.setEventName(e.target.value)}
                maxLength={40}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400"
              />
            </div>

            <ParticipantList
              participants={organizer.participants}
              onAdd={organizer.addParticipant}
              onRemove={organizer.removeParticipant}
            />

            {organizer.error && (
              <p role="alert" className="text-xs text-red-400">
                {organizer.error}
              </p>
            )}

            <button
              type="button"
              onClick={organizer.runDraw}
              disabled={!organizer.canDraw}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-400/30 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 px-6 py-4 text-lg font-bold shadow-xl transition-all duration-200 hover:from-red-500 hover:to-amber-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Gift className="h-6 w-6 text-amber-300" aria-hidden="true" />
              Sortear e gerar links
            </button>
          </div>
        )}
      </Card>
    </Layout>
  );
}
