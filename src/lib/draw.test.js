import { describe, expect, it } from 'vitest';
import { MIN_PARTICIPANTS, generateDraw, shuffle } from './draw';

// PRNG determinístico (mulberry32) para testes reprodutíveis
function seeded(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const family = ['Ana', 'Bruno', 'Carla', 'Daniel', 'Eduardo', 'Mãe Maria', 'Pai José'];

describe('shuffle', () => {
  it('mantém os mesmos elementos e não altera a lista original', () => {
    const original = [1, 2, 3, 4, 5];
    const result = shuffle(original, seeded(1));
    expect([...result].sort()).toEqual(original);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('generateDraw', () => {
  it('devolve null com menos participantes do que o mínimo', () => {
    expect(generateDraw(['Ana', 'Bruno'])).toBeNull();
    expect(MIN_PARTICIPANTS).toBe(3);
  });

  it('nunca atribui uma pessoa a si própria (1000 sorteios)', () => {
    for (let seed = 0; seed < 1000; seed++) {
      const draw = generateDraw(family, seeded(seed));
      for (const [giver, receiver] of Object.entries(draw)) {
        expect(giver).not.toBe(receiver);
      }
    }
  });

  it('todos dão e recebem exatamente uma vez', () => {
    for (let seed = 0; seed < 200; seed++) {
      const draw = generateDraw(family, seeded(seed));
      expect(Object.keys(draw).sort()).toEqual([...family].sort());
      expect(Object.values(draw).sort()).toEqual([...family].sort());
    }
  });

  it('funciona com o mínimo de 3 pessoas', () => {
    const draw = generateDraw(['A', 'B', 'C'], seeded(7));
    expect(draw).not.toBeNull();
    expect(Object.values(draw).sort()).toEqual(['A', 'B', 'C']);
  });

  it('é determinístico para o mesmo gerador', () => {
    expect(generateDraw(family, seeded(42))).toEqual(generateDraw(family, seeded(42)));
  });

  it('devolve null se nenhuma tentativa for válida', () => {
    // rng constante => baralhar nunca altera a ordem => toda a gente tira a si própria
    expect(generateDraw(family, () => 0.999999, 10)).toBeNull();
  });
});
