"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** scrollLeft que deja el slide alineado al inicio (descuenta el padding del track). */
function slideLeft(track: HTMLElement, slide: HTMLElement) {
  return slide.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft);
}

const FADE = "linear-gradient(to right, black calc(100% - 48px), transparent)";

type CarouselProps = {
  label: string;
  children: ReactNode;
  /** Ancho de cada slide por breakpoint (clases basis-*). */
  itemClassName?: string;
};

/**
 * Slider horizontal con scroll-snap nativo (el dedo manda en móvil).
 * Pistas de que hay más: la siguiente card asoma, degradado en el borde,
 * aviso "Desliza", un pequeño empujón al aparecer, flechas, puntos y contador.
 */
export default function Carousel({ label, children, itemClassName }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const items = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [interacted, setInteracted] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const left = track.scrollLeft;
    const dist = (s: HTMLElement) => Math.abs(slideLeft(track, s) - left);
    let nearest = 0;
    slides.forEach((s, i) => {
      if (dist(s) < dist(slides[nearest])) nearest = i;
    });
    // Al llegar al final, el último punto queda activo aunque no esté alineado al inicio.
    const atEnd = left + track.clientWidth >= track.scrollWidth - 4;
    setActive(atEnd ? slides.length - 1 : nearest);
    setCanPrev(left > 4);
    setCanNext(!atEnd);
  }, []);

  useEffect(() => {
    update();
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => ro.disconnect();
  }, [update]);

  // Empujón inicial: desliza un poco y regresa, para enseñar que se puede deslizar.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || track.scrollWidth <= track.clientWidth) return;
        io.disconnect();
        setTimeout(() => track.scrollTo({ left: 56, behavior: "smooth" }), 600);
        setTimeout(() => track.scrollTo({ left: 0, behavior: "smooth" }), 1300);
      },
      { threshold: 0.6 },
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return;
    setInteracted(true);
    track.scrollTo({ left: slideLeft(track, slide), behavior: "smooth" });
  };

  // Flechas: avanzan según la posición real del scroll, no según el punto activo
  // (al final del slider el punto activo es el último aunque el slide visible sea otro).
  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    setInteracted(true);
    const left = track.scrollLeft;
    const lefts = (Array.from(track.children) as HTMLElement[]).map((s) => slideLeft(track, s));
    const target =
      dir === 1 ? lefts.find((l) => l > left + 4) : [...lefts].reverse().find((l) => l < left - 4);
    track.scrollTo({ left: target ?? (dir === 1 ? track.scrollWidth : 0), behavior: "smooth" });
  };

  const arrowClass =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(168,85,247,.45)] bg-k-elevated/90 text-k-text shadow-[0_8px_24px_-6px_rgba(0,0,0,.6)] backdrop-blur transition-all duration-300 hover:border-k-fuchsia hover:shadow-[var(--k-glow-fuchsia)] active:scale-95 md:h-12 md:w-12";

  return (
    <div role="region" aria-roledescription="carrusel" aria-label={label} className="relative">
      <div className="relative">
        {/* Flechas centradas a los lados, apenas superpuestas al slider */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => step(-1)}
          className={cn(arrowClass, "-left-2 md:-left-6", canPrev ? "opacity-100" : "pointer-events-none opacity-0")}
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => step(1)}
          className={cn(arrowClass, "-right-2 md:-right-6", canNext ? "opacity-100" : "pointer-events-none opacity-0")}
        >
          <ArrowRight size={18} strokeWidth={1.75} />
        </button>
        <ul
          ref={trackRef}
          onScroll={update}
          onPointerDown={() => setInteracted(true)}
          onTouchStart={() => setInteracted(true)}
          // Desvanece el borde derecho mientras haya más contenido (sirve sobre cualquier fondo).
          style={canNext ? { maskImage: FADE, WebkitMaskImage: FADE } : undefined}
          className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 py-3 [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((child, i) => (
            <li
              key={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${items.length}`}
              className={cn("flex shrink-0 snap-start", itemClassName ?? "basis-[85%] sm:basis-[60%] lg:basis-[calc((100%-1rem)/2)]")}
            >
              <div className="w-full">{child}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-k-text-2 tabular-nums">
            <span className="text-k-text">{String(active + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir al elemento ${i + 1}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className="flex h-6 items-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === active ? "w-6 bg-[image:var(--k-grad-primary)]" : "w-1.5 bg-k-muted hover:bg-k-text-2",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Móvil: aviso animado hasta que el usuario desliza */}
        <AnimatePresence>
          {!interacted && canNext && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 font-mono text-xs tracking-[0.1em] text-k-electric uppercase md:hidden"
            >
              Desliza
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
                <ChevronsRight size={16} strokeWidth={1.75} />
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
