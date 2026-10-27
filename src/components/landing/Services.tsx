"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Code2, Cpu, Layers, Megaphone, Palette } from "lucide-react";
import SectionReveal, { Reveal } from "./SectionReveal";
import { serviceBlocks, whatsappLink, type ServiceBlock } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<ServiceBlock["icon"], typeof Code2> = {
  megaphone: Megaphone,
  code: Code2,
  palette: Palette,
  layers: Layers,
  cpu: Cpu,
};

export default function Services() {
  const [activeId, setActiveId] = useState(serviceBlocks[0].id);
  const active = serviceBlocks.find((b) => b.id === activeId) ?? serviceBlocks[0];

  return (
    <SectionReveal id="servicios" className="relative isolate py-16 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[60%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(124,58,237,.18),transparent)]"
      />
      <div className="k-container">
        <Reveal>
          <p className="k-eyebrow">02 · Servicios & Combos</p>
          <h2 className="k-h2 mt-3">
            El menú completo <span className="k-gradient-text">Kroma</span>
          </h2>
          <p className="mt-4 max-w-2xl text-k-text-2">
            Planes claros, en dólares y orientados a resultados. Elige un servicio o combina todo en un
            ecosistema 360°.
          </p>
        </Reveal>

        {/* Selector de categoría: scroll horizontal en móvil, fila completa en desktop */}
        <Reveal className="-mx-4 mt-8 md:mx-0">
          <div
            role="tablist"
            aria-label="Categorías de servicios"
            className="flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:flex-wrap md:px-0"
          >
            {serviceBlocks.map((block) => {
              const Icon = icons[block.icon];
              const selected = block.id === activeId;
              return (
                <button
                  key={block.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`panel-${block.id}`}
                  onClick={() => setActiveId(block.id)}
                  className={cn(
                    "k-btn k-btn--sm shrink-0 snap-start whitespace-nowrap",
                    selected ? "k-btn--secondary bg-[rgba(124,58,237,.18)]" : "k-btn--ghost border-k-border",
                  )}
                >
                  <Icon size={16} strokeWidth={1.5} className={selected ? "k-neon text-k-fuchsia" : undefined} />
                  {block.title.split(" / ")[0].split(" (")[0]}
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id={`panel-${active.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <h3 className="k-h3">{active.title}</h3>
            <p className="mt-2 max-w-2xl text-k-text-2">{active.subtitle}</p>

            <div
              className={cn(
                "mt-6 grid gap-4 md:grid-cols-2",
                active.plans.length > 2 && "xl:grid-cols-4",
                active.plans.length === 1 && "md:grid-cols-1 lg:max-w-3xl",
              )}
            >
              {active.plans.map((plan, i) => (
                <motion.article
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("k-card k-card--hover flex flex-col", plan.featured && "k-card--featured")}
                >
                  {plan.featured && <span className="k-tag mb-3 w-fit">Más elegido</span>}
                  <h4 className="k-h4">{plan.name}</h4>
                  <p className="mt-2 text-sm text-k-text-2">{plan.audience}</p>
                  <ul className="mt-4 flex-1 space-y-2.5">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-k-text">
                        <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-k-fuchsia" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-k-border pt-4">
                    <p className="font-mono text-[0.68rem] tracking-[0.14em] text-k-muted uppercase">Inversión</p>
                    <p className="mt-1 font-display text-lg font-bold text-k-text">{plan.investment}</p>
                    <a
                      href={whatsappLink(`Hola Kroma Studio 👋 Me interesa el plan "${plan.name}". ¿Podemos conversar?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("k-btn mt-4 w-full", plan.featured ? "k-btn--primary" : "k-btn--secondary")}
                    >
                      Lo quiero
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}
