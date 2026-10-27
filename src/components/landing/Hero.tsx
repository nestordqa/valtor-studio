"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedIsotipo from "./AnimatedIsotipo";

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "Senior", label: "Ingeniería de software" },
  { value: "360°", label: "Marca + web + redes" },
  { value: "Diseño - Branding", label: "Diseñamos lo que necesitas, todo a tu medida" },
];

const HEADLINE = "Construimos la tecnología y diseñamos la imagen";
const HEADLINE_ACCENT = "para hacer crecer tu negocio.";

function Word({ children, className }: { children: string; className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`inline-block pr-[0.25em] ${className ?? ""}`}
      variants={{
        hidden: { opacity: 0, y: "0.4em", filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </motion.span>
  );
}

export default function Hero() {
  // Parallax sutil del isotipo siguiendo el cursor (solo con mouse).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 120, damping: 18 });

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  return (
    <section
      id="inicio"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative isolate overflow-hidden pt-28 pb-16 md:pt-40 md:pb-28"
    >
      {/* Aurora de marca */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{ background: "var(--k-grad-aurora)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(184,179,204,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(184,179,204,.05)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-[size:48px_48px]"
      />

      <div className="k-container flex flex-col gap-10 md:flex-row-reverse md:items-center md:justify-between md:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative w-fit shrink-0"
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-[28%] bg-k-fuchsia/30 blur-3xl"
            animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 800 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatedIsotipo className="relative h-24 w-24 drop-shadow-[0_0_30px_rgba(124,58,237,.5)] md:h-64 md:w-64" />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
          className="max-w-3xl"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="k-eyebrow"
          >
            Agencia boutique · Venezuela → el mundo
          </motion.p>
          <motion.h1
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="k-h1 mt-4"
            aria-label={`${HEADLINE} ${HEADLINE_ACCENT}`}
          >
            {HEADLINE.split(" ").map((w, i) => (
              <Word key={i}>{w}</Word>
            ))}
            {HEADLINE_ACCENT.split(" ").map((w, i) => (
              <Word key={`a${i}`} className="k-gradient-text">
                {w}
              </Word>
            ))}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="mt-5 max-w-[60ch] text-[1.0625rem] leading-relaxed text-k-text-2 md:text-lg"
          >
            Kroma Studio une ingeniería de software senior y diseño industrial para crear productos
            digitales que venden: landing pages, e-commerce, branding, redes y software a medida.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#contacto" className="k-btn k-btn--primary k-btn--lg group">
              Empezar proyecto
              <ArrowRight size={18} strokeWidth={1.75} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#proyectos" className="k-btn k-btn--secondary k-btn--lg">
              Ver portafolio
            </a>
          </motion.div>

          <motion.dl
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8 } } }}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-k-border pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-xl font-bold text-k-text md:text-2xl">{s.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-k-text-2 md:text-sm">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
