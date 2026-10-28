"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Isotipo from "./Isotipo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del body con el menú móvil abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-z-border bg-[rgba(10,8,18,0.85)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="z-container flex h-16 items-center justify-between md:h-20" aria-label="Principal">
        <a href="#inicio" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Isotipo plate={false} className="h-8 w-8" />
          <span className="font-display text-lg leading-none font-bold tracking-tight text-z-text">
            VALTOR
            <span className="mt-1 block font-mono text-[0.55rem] font-normal tracking-[0.42em] text-z-text-2">
              STUDIO
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="z-btn z-btn--ghost z-btn--sm">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contacto" className="z-btn z-btn--primary z-btn--sm hidden md:inline-flex">
          Empezar proyecto
        </a>

        <button
          type="button"
          className="z-btn z-btn--ghost z-btn--sm -mr-2 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            className="h-[calc(100dvh-4rem)] border-t border-z-border md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="z-container flex flex-col gap-1 py-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 rounded-xl px-2 py-4 font-display text-2xl font-semibold text-z-text active:bg-z-elevated"
                  >
                    <span className="font-mono text-xs text-z-electric">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="z-container">
              <a href="#contacto" onClick={() => setOpen(false)} className="z-btn z-btn--primary w-full">
                Empezar proyecto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
