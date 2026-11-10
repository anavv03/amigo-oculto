import { describe, expect, it } from 'vitest';
import { parseRoute } from './route';
import { validateNewParticipant } from './participants';

describe('parseRoute', () => {
  it('reconhece a página de revelação e extrai o token', () => {
    expect(parseRoute('#/r/abc123')).toEqual({ name: 'reveal', token: 'abc123' });
  });

  it('usa o organizador por omissão', () => {
    expect(parseRoute('')).toEqual({ name: 'organizer' });
    expect(parseRoute('#/qualquer-coisa')).toEqual({ name: 'organizer' });
  });
});

describe('validateNewParticipant', () => {
  it('normaliza espaços', () => {
    expect(validateNewParticipant('  Tia   Rosa ', [])).toEqual({ name: 'Tia Rosa' });
  });

  it('rejeita vazio e duplicados (sem distinguir maiúsculas)', () => {
    expect(validateNewParticipant('   ', []).error).toBeTruthy();
    expect(validateNewParticipant('ana', ['Ana']).error).toBeTruthy();
  });
});
