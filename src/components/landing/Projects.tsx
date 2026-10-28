import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import SectionReveal, { Reveal } from "./SectionReveal";
import Carousel from "./Carousel";
import { projects, type Project } from "@/lib/site";

const AURORA =
  "radial-gradient(80% 90% at 15% 10%, rgba(124,58,237,.55), transparent 60%), radial-gradient(70% 80% at 90% 100%, rgba(255,43,214,.35), transparent 60%)";

function Preview({ project }: { project: Project }) {
  const alt = `Captura de ${project.title}`;

  if (project.device === "phone") {
    // Captura vertical dentro de un marco de teléfono sobre el fondo aurora.
    return (
      <div className="relative flex h-[clamp(150px,24svh,260px)] items-end justify-center overflow-hidden border-b border-z-border bg-z-bg" style={{ background: AURORA }}>
        <div className="relative aspect-[9/16] h-[130%] translate-y-[24%] overflow-hidden rounded-[1.6rem] border-[5px] border-[#2a2540] bg-z-bg shadow-[0_20px_60px_-10px_rgba(124,58,237,.6)] transition-transform duration-500 group-hover:translate-y-[18%]">
          <Image src={project.screenshot} alt={alt} fill sizes="240px" className="object-cover object-top" />
        </div>
      </div>
    );
  }

  const domain = new URL(project.href).hostname;
  return (
    <div className="relative flex h-[clamp(150px,24svh,260px)] flex-col overflow-hidden border-b border-z-border bg-z-bg">
      <div className="flex items-center gap-1.5 border-b border-z-border bg-z-surface px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-z-muted" />
        <span className="h-2 w-2 rounded-full bg-z-muted" />
        <span className="h-2 w-2 rounded-full bg-z-muted" />
        <span className="ml-2 truncate font-mono text-[0.65rem] text-z-text-2">{domain}</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={project.screenshot}
          alt={alt}
          fill
          sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <SectionReveal id="proyectos" className="z-container py-16 md:py-28">
      <Reveal>
        <p className="z-eyebrow">01 · Proyectos</p>
        <h2 className="z-h2 mt-3">
          Trabajo real, <span className="z-gradient-text">en vivo</span>
        </h2>
        <p className="mt-4 max-w-2xl text-z-text-2">
          Experiencias digitales que hoy están en producción. Ábrelas desde tu teléfono: así las viven
          los clientes de nuestros clientes.
        </p>
      </Reveal>

      <Reveal className="mt-8 md:mt-10">
        <Carousel label="Proyectos">
        {projects.map((project) => (
            <a
              key={project.href}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="z-card z-card--hover group flex h-full flex-col overflow-hidden !p-0"
            >
              <div className="relative">
                <Preview project={project} />
                <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-z-bg/70 text-z-text backdrop-blur transition group-hover:border-z-fuchsia group-hover:text-z-fuchsia">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4 md:p-6">
                <span className="z-tag w-fit">{project.tag}</span>
                <h3 className="z-h4 mt-2.5 !text-lg md:!text-xl">{project.title}</h3>
                {/* flex-1: el panel, las etiquetas y el enlace quedan anclados abajo y alineados entre cards */}
                <p className="mt-1.5 line-clamp-3 flex-1 text-sm text-z-text-2 md:text-[0.9375rem]">{project.description}</p>

                {project.features && (
                  <div className="mt-4 rounded-xl border border-z-border bg-z-surface p-3 md:p-4">
                    <p className="font-mono text-[0.68rem] tracking-[0.1em] text-z-electric uppercase">
                      {project.featuresTitle ?? "Incluye"}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {project.features.map((f) => (
                        <li key={f} className="flex gap-2 text-[0.8125rem] leading-snug text-z-text md:text-sm">
                          <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-z-fuchsia" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="hidden flex-wrap gap-2 pt-5 md:flex">
                  {project.stack.map((s) => (
                    <li key={s} className="rounded-md border border-z-border px-2 py-1 text-xs text-z-text-2">
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-z-fuchsia md:mt-5">
                  Ver proyecto en vivo
                  <ArrowUpRight size={16} strokeWidth={1.75} />
                </span>
              </div>
            </a>
        ))}
        </Carousel>
      </Reveal>
    </SectionReveal>
  );
}
