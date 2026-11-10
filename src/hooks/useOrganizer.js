import { useState } from 'react';
import { MIN_PARTICIPANTS, generateDraw } from '../lib/draw';
import { encodePayload } from '../lib/share';
import { validateNewParticipant } from '../lib/participants';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_EVENT = 'Natal em Família';

/**
 * Estado e ações do organizador.
 * `links` é null enquanto não há sorteio; depois do sorteio a lista fica bloqueada
 * (para não invalidar links já enviados) até o organizador reiniciar.
 */
export function useOrganizer() {
  const [eventName, setEventName] = useLocalStorage('ao:event', DEFAULT_EVENT);
  const [participants, setParticipants] = useLocalStorage('ao:participants', []);
  const [links, setLinks] = useLocalStorage('ao:links', null);
  const [error, setError] = useState('');

  const addParticipant = (rawName) => {
    const result = validateNewParticipant(rawName, participants);
    if (result.error) {
      setError(result.error);
      return false;
    }
    setParticipants([...participants, result.name]);
    setError('');
    return true;
  };

  const removeParticipant = (name) => {
    setParticipants(participants.filter((p) => p !== name));
    setError('');
  };

  const runDraw = () => {
    const draw = generateDraw(participants);
    if (!draw) {
      setError(`São precisos pelo menos ${MIN_PARTICIPANTS} participantes.`);
      return;
    }
    const event = eventName.trim() || DEFAULT_EVENT;
    setLinks(
      participants.map((giver) => ({
        name: giver,
        payload: encodePayload({ giver, receiver: draw[giver], event }),
      })),
    );
    setError('');
  };

  const resetDraw = () => setLinks(null);

  return {
    eventName,
    setEventName,
    participants,
    addParticipant,
    removeParticipant,
    links,
    runDraw,
    resetDraw,
    error,
    canDraw: participants.length >= MIN_PARTICIPANTS,
  };
}
