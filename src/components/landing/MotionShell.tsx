"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";

/** Barra de progreso de lectura (2px, gradiente de marca) bajo el navbar. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
      style={{ scaleX, background: "var(--z-grad-primary)" }}
    />
  );
}

/** Un solo listener: posiciona el halo de la card bajo el cursor (--mx / --my). */
function useCardSpotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const card = (e.target as Element | null)?.closest<HTMLElement>(".z-card--hover");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}

export default function MotionShell({ children }: { children: ReactNode }) {
  useCardSpotlight();
  return (
    // reducedMotion="user": respeta "reducir movimiento" del sistema operativo.
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      {children}
    </MotionConfig>
  );
}
