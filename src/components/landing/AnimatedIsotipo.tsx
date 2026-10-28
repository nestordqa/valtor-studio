"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { V_NODE, V_PATH } from "./Isotipo";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Isotipo que se "construye": el monograma V+T sube y aparece el nodo en el cruce de la T. */
export default function AnimatedIsotipo({ className }: { className?: string }) {
  const gradId = `zga-${useId().replace(/:/g, "")}`;
  const fill = `url(#${gradId})`;

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Isotipo Valtor Studio">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="0.55" stopColor="#C026D3" />
          <stop offset="1" stopColor="#FF2BD6" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="#13101F" />
      <motion.path
        d={V_PATH}
        fill={fill}
        style={{ originX: 0.5, originY: 1 }}
        initial={{ opacity: 0, y: 12, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      />
      {/* El nodo: punto donde se unen la N (ingeniería) y la V (diseño) */}
      <motion.circle
        {...V_NODE}
        fill="#F5F3FF"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.6, 1] }}
        transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
      />
      <motion.circle
        {...V_NODE}
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
