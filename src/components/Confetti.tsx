"use client";

import { useMemo } from "react";

const colors = ["#1b2a4a", "#b42318", "#c5a35a", "#f4efe4"];

export function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 36 }, (_, id) => ({
        id,
        left: (id * 17) % 100,
        delay: (id % 8) * 0.08,
        color: colors[id % colors.length],
        rotate: (id * 37) % 360,
        duration: 2.4 + (id % 5) * 0.15,
      })),
    [],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden print:hidden"
      aria-hidden
    >
      {bits.map((bit) => (
        <span
          key={bit.id}
          className="confetti-bit"
          style={{
            left: `${bit.left}%`,
            background: bit.color,
            animationDelay: `${bit.delay}s`,
            animationDuration: `${bit.duration}s`,
            transform: `rotate(${bit.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
