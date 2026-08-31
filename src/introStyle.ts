import React from 'react';
export const introStyle = (
  intro: boolean,
  y: number,
  delay = 0,
  blur = 0,
  reduced = false
): React.CSSProperties => ({
  opacity: intro ? 0 : 1,
  transform: intro && !reduced ? `translateY(${y}px)` : "none",
  filter: intro && !reduced && blur ? `blur(${blur}px)` : "none",
  pointerEvents: intro ? "none" : "auto",
  animation: intro ? "none" : undefined,
  WebkitAnimation: intro ? "none" : undefined,
  transition: reduced
    ? "opacity 500ms ease-out"
    : "opacity 700ms cubic-bezier(.22,1,.36,1)," +
      "transform 700ms cubic-bezier(.22,1,.36,1)," +
      "filter 700ms cubic-bezier(.22,1,.36,1)",
  transitionDelay: `${intro ? 0 : delay}ms`,
});
