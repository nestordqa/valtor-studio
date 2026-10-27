"use client";

import { motion } from "framer-motion";
import { useId } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Isotipo que se "construye": crece el fuste, se traza el chevron y aparece el nodo. */
export default function AnimatedIsotipo({ className }: { className?: string }) {
  const gradId = `kga-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Isotipo Kroma Studio">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="0.55" stopColor="#C026D3" />
          <stop offset="1" stopColor="#FF2BD6" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="#13101F" />
      <motion.rect
        x="30"
        y="26"
        width="13"
        height="68"
        rx="2"
        fill={`url(#${gradId})`}
        style={{ originY: 1 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      />
      <motion.path
        d="M90 26 L57 60 L90 94"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="13"
        strokeLinecap="square"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
      />
      {/* El nodo: punto donde se unen tecnología y diseño */}
      <motion.circle
        cx="57"
        cy="60"
        r="6"
        fill="#F5F3FF"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.6, 1] }}
        transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
      />
      <motion.circle
        cx="57"
        cy="60"
        r="6"
        fill="none"
        stroke="#FF2BD6"
        strokeWidth="1.5"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 3], opacity: [0.7, 0] }}
        transition={{ duration: 2.4, delay: 2, repeat: Infinity, repeatDelay: 1.6, ease: "easeOut" }}
      />
    </svg>
  );
}
