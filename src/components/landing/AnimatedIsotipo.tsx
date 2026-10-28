"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { Z_BOTTOM, Z_DIAGONAL, Z_TOP } from "./Isotipo";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Isotipo que se "construye": entra la barra con la V, cae la diagonal, cierra la base y aparece el nodo. */
export default function AnimatedIsotipo({ className }: { className?: string }) {
  const gradId = `zga-${useId().replace(/:/g, "")}`;
  const fill = `url(#${gradId})`;

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Isotipo Zeltra Studio">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="0.55" stopColor="#C026D3" />
          <stop offset="1" stopColor="#FF2BD6" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="#13101F" />
      <motion.path
        d={Z_TOP}
        fill={fill}
        style={{ originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
      />
      <motion.path
        d={Z_DIAGONAL}
        fill={fill}
        style={{ originX: 1, originY: 0 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
      />
      <motion.rect
        {...Z_BOTTOM}
        fill={fill}
        style={{ originX: 1 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.95, ease: EASE }}
      />
      {/* El nodo: punto donde se unen la N (ingeniería) y la V (diseño) */}
      <motion.circle
        cx="60"
        cy="60"
        r="6"
        fill="#F5F3FF"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.6, 1] }}
        transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
      />
      <motion.circle
        cx="60"
        cy="60"
        r="6"
        fill="none"
        stroke="#FF2BD6"
        strokeWidth="1.5"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 3], opacity: [0.7, 0] }}
        transition={{ duration: 2.4, delay: 2.1, repeat: Infinity, repeatDelay: 1.6, ease: "easeOut" }}
      />
    </svg>
  );
}
