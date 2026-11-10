import { useMemo } from 'react';

const COLORS = ['#EF4444', '#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'];
const PIECES = 35;

export default function Confetti() {
  // useMemo: os valores aleatórios ficam fixos entre renders (senão os confetes "saltam")
  const pieces = useMemo(
    () =>
      Array.from({ length: PIECES }, (_, i) => {
        const size = 8 + Math.random() * 10;
        return {
          id: i,
          left: Math.random() * 100,
          width: size,
          height: size * 1.4,
          color: COLORS[i % COLORS.length],
          duration: 2 + Math.random() * 3,
          delay: Math.random() * 0.5,
          rotation: Math.random() * 360,
        };
      }),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute -top-5 animate-confetti-fall rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            rotate: `${p.rotation}deg`,
          }}
        />
      ))}
    </div>
  );
}
