import { useEffect, useState } from 'react';

/** useState persistido em localStorage, tolerante a JSON inválido ou storage indisponível. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage cheio ou bloqueado (modo privado): a app continua a funcionar em memória
    }
  }, [key, value]);

  return [value, setValue];
}
