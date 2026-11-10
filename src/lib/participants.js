/**
 * Valida e normaliza um novo nome.
 * @returns {{ name: string } | { error: string }}
 */
export function validateNewParticipant(rawName, existing) {
  const name = rawName.trim().replace(/\s+/g, ' ');
  if (!name) return { error: 'Escreve um nome.' };
  const duplicate = existing.some((p) => p.toLowerCase() === name.toLowerCase());
  if (duplicate) return { error: 'Este nome já está na lista.' };
  return { name };
}
