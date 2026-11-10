import { describe, expect, it } from 'vitest';
import { buildRevealUrl, buildWhatsAppUrl, decodePayload, encodePayload } from './share';

describe('encodePayload / decodePayload', () => {
  it('faz ida e volta preservando acentos e emojis', () => {
    const data = { giver: 'Mãe Maria', receiver: 'Pai José', event: 'Natal 2026 🎄' };
    expect(decodePayload(encodePayload(data))).toEqual(data);
  });

  it('gera um token seguro para URLs (sem + / =)', () => {
    const token = encodePayload({ giver: '???>>>', receiver: '~~~???', event: 'ÿÿÿ' });
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it('devolve null para tokens inválidos', () => {
    expect(decodePayload('isto-nao-e-valido!!')).toBeNull();
    expect(decodePayload('')).toBeNull();
  });

  it('devolve null se faltarem campos obrigatórios', () => {
    const token = btoa(JSON.stringify({ x: 1 }));
    expect(decodePayload(token)).toBeNull();
  });
});

describe('URLs', () => {
  it('constrói o link de revelação', () => {
    expect(buildRevealUrl('https://x.pt/app/', 'abc')).toBe('https://x.pt/app/#/r/abc');
  });

  it('constrói o link do WhatsApp com a mensagem codificada', () => {
    const url = buildWhatsAppUrl({ name: 'Ana', event: 'Natal', url: 'https://x.pt/#/r/abc' });
    expect(url.startsWith('https://wa.me/?text=')).toBe(true);
    expect(decodeURIComponent(url.split('text=')[1])).toContain('https://x.pt/#/r/abc');
  });
});
