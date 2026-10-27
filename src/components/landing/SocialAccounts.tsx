import SectionReveal, { Reveal } from "./SectionReveal";
import { InstagramIcon } from "./BrandIcons";
import { socialAccounts } from "@/lib/site";

export default function SocialAccounts() {
  return (
    <SectionReveal id="redes" className="k-container pb-4 md:pb-8">
      {/* Cuentas que gestionamos */}
      <Reveal>
        <div className="k-card">
          <p className="k-eyebrow">Redes que llevamos</p>
          <h3 className="k-h4 mt-2">Marcas que ya crecen con Kroma</h3>
          <p className="mt-2 text-sm text-k-text-2">
            Estrategia, diseño y contenido gestionados por nuestro equipo, todos los días.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {socialAccounts.map((acc) => (
              <li key={acc.handle}>
                <a
                  href={`https://instagram.com/${acc.handle.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-3 rounded-xl border border-k-border bg-k-surface p-4 transition hover:border-[rgba(255,43,214,.45)] hover:bg-k-elevated"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[image:var(--k-grad-primary)]">
                      <InstagramIcon size={18} className="text-white" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-sm text-k-text group-hover:text-k-fuchsia">
                        {acc.handle}
                      </span>
                      <span className="block truncate text-xs text-k-electric" title={acc.niche}>
                        {acc.niche}
                      </span>
                    </span>
                  </span>
                  <span className="text-sm leading-snug text-k-text-2">{acc.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </SectionReveal>
  );
}
