/** Interpreta o fragmento do URL (#/r/<token> → página de revelação). */
export function parseRoute(hash) {
  const match = hash.match(/^#\/r\/(.+)$/);
  return match ? { name: 'reveal', token: match[1] } : { name: 'organizer' };
}
