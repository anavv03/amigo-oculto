export const MIN_PARTICIPANTS = 3;

/**
 * Baralha uma cópia da lista com Fisher-Yates (distribuição uniforme).
 * `rng` é injetável para tornar os testes determinísticos.
 */
export function shuffle(items, rng = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Gera um sorteio válido: cada pessoa dá a exatamente uma e recebe de exatamente uma,
 * e ninguém tira a si próprio (derangement).
 *
 * @param {string[]} participants nomes únicos
 * @returns {Record<string, string> | null} mapa { quem dá: quem recebe },
 *          ou null se houver menos de MIN_PARTICIPANTS ou nenhuma tentativa for válida.
 */
export function generateDraw(participants, rng = Math.random, maxAttempts = 1000) {
  if (participants.length < MIN_PARTICIPANTS) return null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const receivers = shuffle(participants, rng);
    const valid = participants.every((giver, i) => giver !== receivers[i]);
    if (valid) {
      return Object.fromEntries(participants.map((giver, i) => [giver, receivers[i]]));
    }
  }
  return null;
}
