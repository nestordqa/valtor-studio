"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

type SectionRevealProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Sección que revela a sus hijos `Reveal` en cascada al entrar en viewport. */
export default function SectionReveal({ id, className, children }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.08 }}
    >
      {children}
    </motion.section>
  );
}

export function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  return (
    // Disparo propio: si el elemento se monta tarde (HMR, cambio de pestaña) igual se revela.
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
