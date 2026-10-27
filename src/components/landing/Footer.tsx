import Link from "next/link";
import Isotipo from "./Isotipo";
import { InstagramIcon } from "./BrandIcons";
import { navLinks, socialAccounts } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-k-border">
      <div className="k-container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Isotipo plate={false} className="h-10 w-10" />
            <span className="font-display text-xl leading-none font-bold tracking-tight text-k-text">
              KROMA
              <span className="mt-1 block font-mono text-[0.6rem] font-normal tracking-[0.42em] text-k-text-2">
                STUDIO
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-k-text-2">
            Construimos la tecnología y diseñamos la imagen para hacer crecer negocios.
          </p>
        </div>

        <nav aria-label="Secciones">
          <p className="k-eyebrow !text-k-muted">Navegación</p>
          <ul className="mt-3 space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block py-1.5 text-sm text-k-text-2 transition hover:text-k-text">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/brand" className="inline-block py-1.5 text-sm text-k-text-2 transition hover:text-k-text">
                Brand Kit
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="k-eyebrow !text-k-muted">Instagram</p>
          <ul className="mt-3 space-y-1">
            {/* {socialAccounts.map((a) => (
              <li key={a.handle}>
                <a
                  href={`https://instagram.com/${a.handle.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-1.5 font-mono text-sm text-k-text-2 transition hover:text-k-fuchsia"
                >
                  <InstagramIcon size={14} />
                  {a.handle}
                </a>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
      <div className="border-t border-k-border">
        <p className="k-container py-5 font-mono text-xs text-k-muted">
          © 2026 Kroma Studio · Hecho en Venezuela con código y diseño.
        </p>
      </div>
    </footer>
  );
}
