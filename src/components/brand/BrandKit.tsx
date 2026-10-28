"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Download } from "lucide-react";
import Isotipo from "@/components/landing/Isotipo";
import SectionReveal, { Reveal } from "@/components/landing/SectionReveal";
import { brandAssets, colorGroups, tokensCss, type BrandAsset } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";
import { downloadPng, downloadSvg, downloadText } from "./export";

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* Portapapeles bloqueado: no hacemos nada */
    }
  };
  return { copied, copy };
}

function AssetPreview({ asset }: { asset: BrandAsset }) {
  const w = asset.wordmark;
  const mark = <span className="block h-16 w-16 shrink-0 md:h-20 md:w-20" dangerouslySetInnerHTML={{ __html: asset.svg }} />;
  if (!w) return mark;
  return (
    <div className={cn("flex items-center gap-3", w.layout === "vertical" && "flex-col gap-1")}>
      {mark}
      <span
        className={cn("font-display text-3xl leading-none font-extrabold tracking-[-0.02em]", w.layout === "vertical" && "text-center")}
        style={{ color: w.color }}
      >
        VALTOR
        <span className="mt-1.5 block font-mono text-[0.32em] font-normal tracking-[0.42em]" style={{ color: w.sub }}>
          STUDIO
        </span>
      </span>
    </div>
  );
}

function AssetCard({ asset }: { asset: BrandAsset }) {
  const [busy, setBusy] = useState(false);
  const png = async (size: number) => {
    setBusy(true);
    try {
      await downloadPng(asset, size);
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="z-card flex flex-col gap-4 !p-4 md:!p-5">
      <div
        className={cn(
          "flex min-h-40 items-center justify-center rounded-xl p-6 [&_svg]:h-full [&_svg]:w-full",
          asset.stage === "light" ? "bg-[#F5F3FF]" : "bg-z-bg",
        )}
      >
        <AssetPreview asset={asset} />
      </div>
      <div>
        <h3 className="z-h4 !text-base">{asset.name}</h3>
        <p className="text-sm text-z-text-2">{asset.use}</p>
      </div>
      <div className="mt-auto grid grid-cols-3 gap-2">
        <button type="button" className="z-btn z-btn--secondary z-btn--sm !px-2" onClick={() => downloadSvg(asset)}>
          SVG
        </button>
        <button type="button" disabled={busy} className="z-btn z-btn--primary z-btn--sm !px-2" onClick={() => png(1024)}>
          <Download size={14} strokeWidth={1.75} />
          PNG
        </button>
        <button type="button" disabled={busy} className="z-btn z-btn--ghost z-btn--sm border-z-border !px-2" onClick={() => png(2048)}>
          PNG 2×
        </button>
      </div>
    </article>
  );
}

export default function BrandKit() {
  const { copied, copy } = useCopy();

  return (
    <div className="relative isolate min-h-dvh">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-60" style={{ background: "var(--z-grad-aurora)" }} />

      <header className="z-container flex h-16 items-center justify-between">
        <Link href="/" className="z-btn z-btn--ghost z-btn--sm -ml-3">
          <ArrowLeft size={16} strokeWidth={1.5} />
          Volver al sitio
        </Link>
        <span className="font-mono text-xs text-z-muted">v1.0 · 2026</span>
      </header>

      <main>
        <SectionReveal className="z-container flex flex-col gap-6 pt-8 pb-14 md:flex-row md:items-center md:gap-10 md:pt-16">
          <Reveal>
            <Isotipo className="h-24 w-24 md:h-36 md:w-36" />
          </Reveal>
          <Reveal>
            <p className="z-eyebrow">Brand Kit & Design System</p>
            <h1 className="z-h1 mt-3">
              Valtor <span className="z-gradient-text">Studio</span>
            </h1>
            <p className="mt-4 max-w-[60ch] text-z-text-2">
              Logos, colores, tipografía y componentes oficiales. Toca cualquier botón para descargar
              en tu teléfono o computadora, o un color para copiar su código.
            </p>
          </Reveal>
        </SectionReveal>

        {/* Logos */}
        <SectionReveal id="logos" className="z-container border-t border-z-border py-14">
          <Reveal>
            <p className="z-eyebrow">01 · Logotipo</p>
            <h2 className="z-h2 mt-3">Descarga los logos</h2>
            <p className="mt-3 max-w-[65ch] text-z-text-2">
              PNG con fondo transparente (1024 px o 2048 px) y SVG vectorial. En el teléfono se abre el
              menú para guardar en Fotos o Archivos.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brandAssets.map((a) => (
              <Reveal key={a.id}>
                <AssetCard asset={a} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <ul className="grid gap-3 text-sm text-z-text-2 md:grid-cols-3">
              <li className="z-card !p-4"><strong className="text-z-text">Área de respeto:</strong> 1x (alto de la barra superior de la Z) en los cuatro lados; 2x en gran formato.</li>
              <li className="z-card !p-4"><strong className="text-z-text">Tamaño mínimo:</strong> isologo 96 px / 25 mm; isotipo 16 px / 5 mm.</li>
              <li className="z-card !p-4"><strong className="text-z-text">Prohibido:</strong> rotar, deformar, cambiar el orden del gradiente o el color del nodo.</li>
            </ul>
          </Reveal>
        </SectionReveal>

        {/* Colores */}
        <SectionReveal id="color" className="z-container border-t border-z-border py-14">
          <Reveal>
            <p className="z-eyebrow">02 · Color</p>
            <h2 className="z-h2 mt-3">Paleta oficial</h2>
            <p className="mt-3 max-w-[65ch] text-z-text-2">70 % neutros oscuros · 20 % texto · 10 % acentos. Toca un color para copiar el HEX.</p>
          </Reveal>
          <div className="mt-8 space-y-8">
            {colorGroups.map((g) => (
              <Reveal key={g.title}>
                <h3 className="font-mono text-xs tracking-[0.14em] text-z-muted uppercase">{g.title}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {g.colors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => copy(c.hex)}
                      className="group overflow-hidden rounded-xl border border-z-border bg-z-surface text-left transition hover:border-[rgba(255,43,214,.45)]"
                    >
                      <span className="relative block h-20 md:h-24" style={{ background: c.hex }}>
                        <span className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/40 text-white opacity-80 backdrop-blur group-hover:opacity-100">
                          {copied === c.hex ? <Check size={14} /> : <Copy size={14} />}
                        </span>
                      </span>
                      <span className="block p-3 font-mono text-[0.7rem] leading-relaxed text-z-text-2">
                        <b className="block font-body text-sm text-z-text">{c.name}</b>
                        {c.hex}
                        <br />
                        <span className="text-z-muted">{c.token}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </Reveal>
            ))}
            <Reveal>
              <h3 className="font-mono text-xs tracking-[0.14em] text-z-muted uppercase">Gradientes</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div className="flex h-24 items-end rounded-xl p-3 font-mono text-xs text-white" style={{ background: "var(--z-grad-primary)" }}>--z-grad-primary</div>
                <div className="flex h-24 items-end rounded-xl border border-z-border bg-z-bg p-3 font-display text-2xl font-extrabold"><span className="z-gradient-text">--z-grad-text</span></div>
                <div className="flex h-24 items-end rounded-xl p-3 font-mono text-xs text-white" style={{ background: "var(--z-grad-aurora)" }}>--z-grad-aurora</div>
              </div>
            </Reveal>
          </div>
        </SectionReveal>

        {/* Tipografía */}
        <SectionReveal id="type" className="z-container border-t border-z-border py-14">
          <Reveal>
            <p className="z-eyebrow">03 · Tipografía</p>
            <h2 className="z-h2 mt-3">Sora · Manrope · JetBrains Mono</h2>
          </Reveal>
          <Reveal className="mt-8 overflow-hidden rounded-2xl border border-z-border">
            {[
              { spec: "H1 · Sora 800", el: <p className="z-h1">Build. Brand. Grow.</p> },
              { spec: "H2 · Sora 700", el: <p className="z-h2">Apps que se ven como se sienten</p> },
              { spec: "H3 · Sora 600", el: <p className="z-h3">Arquitectura cloud escalable</p> },
              { spec: "Body · Manrope 400", el: <p className="text-z-text-2">Diseñamos y desarrollamos productos digitales completos, desde el logo hasta el deploy.</p> },
              { spec: "Label · JetBrains Mono 500", el: <p className="z-eyebrow">Case study · 04</p> },
            ].map((r) => (
              <div key={r.spec} className="grid gap-2 border-b border-z-border p-4 last:border-b-0 md:grid-cols-[180px_1fr] md:gap-6 md:p-5">
                <span className="font-mono text-[0.7rem] text-z-muted">{r.spec}</span>
                <div className="min-w-0 [overflow-wrap:anywhere]">{r.el}</div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a className="z-btn z-btn--secondary" href="https://fonts.google.com/specimen/Sora" target="_blank" rel="noopener noreferrer">Descargar Sora</a>
            <a className="z-btn z-btn--secondary" href="https://fonts.google.com/specimen/Manrope" target="_blank" rel="noopener noreferrer">Descargar Manrope</a>
            <a className="z-btn z-btn--secondary" href="https://fonts.google.com/specimen/JetBrains+Mono" target="_blank" rel="noopener noreferrer">Descargar JetBrains Mono</a>
          </Reveal>
        </SectionReveal>

        {/* Componentes */}
        <SectionReveal id="ui" className="z-container border-t border-z-border py-14">
          <Reveal>
            <p className="z-eyebrow">04 · Componentes</p>
            <h2 className="z-h2 mt-3">Botones y cards</h2>
            <p className="mt-3 text-z-text-2">Interactúa con ellos: hover, active y foco son los oficiales.</p>
          </Reveal>
          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" className="z-btn z-btn--primary">Empezar proyecto</button>
            <button type="button" className="z-btn z-btn--secondary">Ver portafolio</button>
            <button type="button" className="z-btn z-btn--ghost">Saber más</button>
            <button type="button" className="z-btn z-btn--cta">Solicitar propuesta</button>
            <button type="button" className="z-btn z-btn--primary" disabled>Deshabilitado</button>
          </Reveal>
          <Reveal className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Desarrollo", "Apps móviles", "React Native y nativo, con arquitectura limpia y CI/CD desde el día uno."],
              ["Diseño", "Identidad visual", "Branding completo: logo, color, tipografía y guías de aplicación."],
              ["Cloud", "Arquitectura", "Infraestructura escalable, serverless y observabilidad."],
            ].map(([tag, title, text]) => (
              <div key={title} className="z-card z-card--hover">
                <span className="z-tag">{tag}</span>
                <h3 className="z-h4 mt-3">{title}</h3>
                <p className="mt-2 text-sm text-z-text-2">{text}</p>
              </div>
            ))}
          </Reveal>
        </SectionReveal>

        {/* Tokens */}
        <SectionReveal id="tokens" className="z-container border-t border-z-border py-14">
          <Reveal>
            <p className="z-eyebrow">05 · Tokens</p>
            <h2 className="z-h2 mt-3">CSS listo para usar</h2>
          </Reveal>
          <Reveal className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="z-btn z-btn--primary" onClick={() => downloadText(tokensCss, "valtor-tokens.css", "text/css")}>
              <Download size={16} strokeWidth={1.75} />
              Descargar valtor-tokens.css
            </button>
            <button type="button" className="z-btn z-btn--secondary" onClick={() => copy(tokensCss)}>
              {copied === tokensCss ? <Check size={16} /> : <Copy size={16} strokeWidth={1.5} />}
              {copied === tokensCss ? "Copiado" : "Copiar CSS"}
            </button>
          </Reveal>
          <Reveal className="mt-6">
            <pre className="max-h-96 overflow-auto rounded-xl border border-z-border bg-z-surface p-4 font-mono text-xs leading-relaxed text-z-text-2 md:p-5">
              {tokensCss}
            </pre>
          </Reveal>
        </SectionReveal>

        {/* Redes */}
        <SectionReveal id="social" className="z-container border-t border-z-border py-14">
          <Reveal>
            <p className="z-eyebrow">06 · Redes sociales</p>
            <h2 className="z-h2 mt-3">Instagram como vitrina</h2>
          </Reveal>
          <Reveal className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              ["Feed", "1080×1350 (4:5) con zona segura 1080×1080 al centro. Una pieza en gradiente cada 3 publicaciones."],
              ["Stories", "1080×1920. Deja 250 px libres arriba y abajo."],
              ["Mix", "40 % casos · 30 % educación · 20 % proceso · 10 % oferta."],
              ["Firma", "Isotipo 48 px abajo a la izquierda y el @ en JetBrains Mono 20 px a la derecha, a 64 px de los bordes."],
            ].map(([t, d]) => (
              <div key={t} className="z-card !p-4">
                <span className="z-tag">{t}</span>
                <p className="mt-2 text-sm text-z-text-2">{d}</p>
              </div>
            ))}
          </Reveal>
        </SectionReveal>
      </main>

      <footer className="z-container border-t border-z-border py-8 font-mono text-xs text-z-muted">
        Valtor Studio · Brand Kit v1.0
      </footer>
    </div>
  );
}
