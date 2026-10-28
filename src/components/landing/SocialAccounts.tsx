import SectionReveal, { Reveal } from "./SectionReveal";
import { InstagramIcon } from "./BrandIcons";
import Carousel from "./Carousel";
import { socialAccounts } from "@/lib/site";

export default function SocialAccounts() {
  return (
    <SectionReveal id="redes" className="z-container pb-4 md:pb-8">
      {/* Cuentas que gestionamos */}
      <Reveal>
        <div className="z-card">
          <p className="z-eyebrow">Redes que llevamos</p>
          <h3 className="z-h4 mt-2">Marcas que ya crecen con Valtor</h3>
          <p className="mt-2 text-sm text-z-text-2">
            Estrategia, diseño y contenido gestionados por nuestro equipo, todos los días.
          </p>
          <div className="mt-5">
            <Carousel
              label="Redes que llevamos"
              itemClassName="basis-[78%] sm:basis-[45%] lg:basis-[calc((100%-3rem)/4)]"
            >
            {socialAccounts.map((acc) => (
                <a
                  key={acc.handle}
                  href={`https://instagram.com/${acc.handle.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-3 rounded-xl border border-z-border bg-z-surface p-4 transition hover:border-[rgba(255,43,214,.45)] hover:bg-z-elevated"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[image:var(--z-grad-primary)]">
                      <InstagramIcon size={18} className="text-white" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-sm text-z-text group-hover:text-z-fuchsia">
                        {acc.handle}
                      </span>
                      <span className="block truncate text-xs text-z-electric" title={acc.niche}>
                        {acc.niche}
                      </span>
                    </span>
                  </span>
                  <span className="text-sm leading-snug text-z-text-2">{acc.description}</span>
                </a>
            ))}
            </Carousel>
          </div>
        </div>
      </Reveal>
    </SectionReveal>
  );
}
