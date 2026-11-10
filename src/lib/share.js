// Codificação do resultado dentro do link (parte depois do #).
// Nota: é Base64 (ofuscação), NÃO encriptação. Quem tiver o link vê o resultado — é o objetivo.
// O fragmento (#) nunca é enviado a nenhum servidor.

function toBase64Url(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(token) {
  const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodePayload({ giver, receiver, event }) {
  return toBase64Url(JSON.stringify({ g: giver, r: receiver, e: event }));
}

/** @returns {{ giver: string, receiver: string, event: string } | null} */
export function decodePayload(token) {
  try {
    const data = JSON.parse(fromBase64Url(token));
    if (typeof data.g !== 'string' || typeof data.r !== 'string') return null;
    return {
      giver: data.g,
      receiver: data.r,
      event: typeof data.e === 'string' ? data.e : '',
    };
  } catch {
    return null;
  }
}

export function buildRevealUrl(baseUrl, payload) {
  return `${baseUrl}#/r/${payload}`;
}

export function buildWhatsAppUrl({ name, event, url }) {
  const text =
    `Olá ${name}! 🎁 O Amigo Oculto "${event}" já foi sorteado. ` +
    `Abre este link só tu para descobrires quem te calhou: ${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
