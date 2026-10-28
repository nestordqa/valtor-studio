"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Code2, Cpu, Layers, Megaphone, Palette } from "lucide-react";
import SectionReveal, { Reveal } from "./SectionReveal";
import Carousel from "./Carousel";
import { serviceBlocks, whatsappLink, type Plan, type ServiceBlock } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const icons: Record<ServiceBlock["icon"], typeof Code2> = {
  megaphone: Megaphone,
  code: Code2,
  palette: Palette,
  layers: Layers,
  cpu: Cpu,
};

/** "desde USD 60": el menor precio de la categoría, leído de los textos de inversión. */
function fromPrice(block: ServiceBlock) {
  const prices = block.plans
    .map((p) => p.investment.match(/USD\s*([\d.]+)/)?.[1])
    .filter((v): v is string => Boolean(v))
    .sort((a, b) => Number(a.replace(/\./g, "")) - Number(b.replace(/\./g, "")));
  return prices[0] ? `desde USD ${prices[0]}` : null;
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={cn("z-card z-card--hover flex h-full flex-col", plan.featured && "z-card--featured")}>
      {plan.featured && <span className="z-tag mb-2.5 w-fit">Más elegido</span>}
      <h4 className="z-h4">{plan.name}</h4>
      <p className="mt-1.5 text-[0.8125rem] leading-snug text-z-text-2 md:text-sm">{plan.audience}</p>
      <ul className="mt-3 flex-1 space-y-2">
        {plan.includes.map((item) => (
          <li key={item} className="flex gap-2 text-[0.8125rem] leading-snug text-z-text md:text-sm">
            <Check size={16} strokeWidth={2} className="mt-px shrink-0 text-z-fuchsia" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-z-border pt-3">
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-z-muted uppercase">Inversión</p>
        <p className="mt-0.5 font-display text-lg font-bold text-z-text">{plan.investment}</p>
        <a
          href={whatsappLink(`Hola Zeltra Studio 👋 Me interesa el plan "${plan.name}". ¿Podemos conversar?`)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("z-btn mt-3 w-full", plan.featured ? "z-btn--primary" : "z-btn--secondary")}
        >
          Lo quiero
        </a>
      </div>
    </article>
  );
}

function PlansCarousel({ block }: { block: ServiceBlock }) {
  return (
    <Carousel
      label={`Planes de ${block.title}`}
      itemClassName="basis-[85%] sm:basis-[55%] lg:basis-[calc((100%-2rem)/3)] xl:basis-[calc((100%-3rem)/4)]"
    >
      {block.plans.map((plan) => (
        <PlanCard key={plan.name} plan={plan} />
      ))}
    </Carousel>
  );
}

/** Móvil: acordeón. Cada categoría es una fila grande y tocable con flecha y precio "desde". */
function MobileAccordion() {
  const [openId, setOpenId] = useState<string | null>(serviceBlocks[0].id);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggle = (id: string) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    // Lleva la categoría abierta al tope para que se vean sus planes de inmediato.
    if (next) setTimeout(() => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" }), 260);
  };

  return (
    <div className="mt-8 space-y-3 md:hidden">
      {serviceBlocks.map((block) => {
        const Icon = icons[block.icon];
        const open = openId === block.id;
        const price = fromPrice(block);
        return (
          <div
            key={block.id}
            ref={(el) => {
              refs.current[block.id] = el;
            }}
            className={cn(
              "scroll-mt-20 rounded-2xl border transition-colors duration-300",
              open ? "border-[rgba(168,85,247,.45)] bg-z-surface/60" : "border-z-border bg-z-surface/40",
            )}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`acc-${block.id}`}
              onClick={() => toggle(block.id)}
              className="flex w-full items-center gap-3 p-4 text-left active:bg-z-elevated/60"
            >
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors",
                  open ? "border-[rgba(255,43,214,.4)] bg-z-bg" : "border-z-border bg-z-bg",
                )}
              >
                <Icon size={20} strokeWidth={1.5} className={open ? "z-neon text-z-fuchsia" : "text-z-text"} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base leading-tight font-semibold text-z-text">{block.title}</span>
                <span className="mt-1 block text-xs text-z-text-2">
                  {block.plans.length} {block.plans.length === 1 ? "plan" : "planes"}
                  {price && <span className="text-z-electric"> · {price}</span>}
                </span>
              </span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  open ? "bg-[image:var(--z-grad-primary)] text-white" : "bg-z-elevated text-z-text",
                )}
              >
                <ChevronDown size={18} strokeWidth={2} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key={`acc-${block.id}`}
                  id={`acc-${block.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <p className="text-sm text-z-text-2">{block.subtitle}</p>
                    <div className="mt-2">
                      <PlansCarousel block={block} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Desktop: pestañas + planes en slider. */
function DesktopTabs() {
  const [activeId, setActiveId] = useState(serviceBlocks[0].id);
  const active = serviceBlocks.find((b) => b.id === activeId) ?? serviceBlocks[0];

  return (
    <div className="hidden md:block">
      <div role="tablist" aria-label="Categorías de servicios" className="mt-8 flex flex-wrap gap-2">
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
                "z-btn z-btn--sm",
                selected ? "z-btn--secondary bg-[rgba(124,58,237,.18)]" : "z-btn--ghost border-z-border",
              )}
            >
              <Icon size={16} strokeWidth={1.5} className={selected ? "z-neon text-z-fuchsia" : undefined} />
              {block.title.split(" / ")[0].split(" (")[0]}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          id={`panel-${active.id}`}
          role="tabpanel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-8"
        >
          <h3 className="z-h3">{active.title}</h3>
          <p className="mt-2 max-w-2xl text-z-text-2">{active.subtitle}</p>
          <div className="mt-4">
            <PlansCarousel block={active} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  return (
    <SectionReveal id="servicios" className="relative isolate py-16 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[60%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(124,58,237,.18),transparent)]"
      />
      <div className="z-container">
        <Reveal>
          <p className="z-eyebrow">02 · Servicios & Combos</p>
          <h2 className="z-h2 mt-3">
            El menú completo <span className="z-gradient-text">Zeltra</span>
          </h2>
          <p className="mt-4 max-w-2xl text-z-text-2">
            Planes claros, en dólares y orientados a resultados.{" "}
            <span className="md:hidden">Toca una categoría para ver sus planes.</span>
          </p>
        </Reveal>

        <Reveal>
          <MobileAccordion />
          <DesktopTabs />
        </Reveal>
      </div>
    </SectionReveal>
  );
}
