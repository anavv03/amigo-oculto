import { useMemo, useState } from 'react';
import Card from '../components/Card';
import Confetti from '../components/Confetti';
import Layout from '../components/Layout';
import RevealCard from '../components/RevealCard';
import { decodePayload } from '../lib/share';

export default function RevealPage({ token }) {
  const payload = useMemo(() => decodePayload(token), [token]);
  const [revealed, setRevealed] = useState(false);

  if (!payload) {
    return (
      <Layout subtitle="Algo correu mal.">
        <Card>
          <div className="space-y-3 text-center">
            <p className="text-lg font-bold text-amber-300">Link inválido 😕</p>
            <p className="text-sm text-slate-300">
              Este link parece estar incompleto. Pede à pessoa que organizou o sorteio para o enviar
              outra vez.
            </p>
          </div>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout
      eyebrow={payload.event ? `${payload.event} 🎄` : undefined}
      subtitle="Descobre quem te calhou no sorteio secreto!"
    >
      {revealed && <Confetti />}
      <Card>
        <div className="space-y-5 text-center">
          <p className="text-sm font-semibold text-emerald-200">
            Olá, <span className="text-amber-300">{payload.giver}</span>! 👋
          </p>
          <RevealCard
            receiver={payload.receiver}
            revealed={revealed}
            onReveal={() => setRevealed(true)}
          />
          <p className="text-xs text-slate-400">
            💡 Se te esqueceres, basta voltares a abrir o teu link.
          </p>
        </div>
      </Card>
    </Layout>
  );
}
