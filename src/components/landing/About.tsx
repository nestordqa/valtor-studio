import { Laptop, PenTool } from "lucide-react";
import SectionReveal, { Reveal } from "./SectionReveal";
import Isotipo from "./Isotipo";

const duo = [
    {
    icon: PenTool,
    role: "Diseñadora Industrial",
    piece: "Lo que enamora",
    text: "Se encarga de que tu marca se vea profesional y se recuerde: tu logo, tus colores, tus publicaciones y cada detalle que hace que un cliente confíe en ti a primera vista.",
    skills: ["Logos", "Imagen de marca", "Redes sociales", "Empaques"],
  },
  {
    icon: Laptop,
    role: "Ingeniero de Software",
    piece: "Lo que no se ve",
    text: "Se encarga de que tu página o tienda funcione perfecto: que cargue rápido, que no se caiga, que se vea bien en cualquier teléfono y que tus clientes puedan comprarte o escribirte sin complicaciones.",
    skills: ["Páginas web", "Tiendas online", "Apps", "Pagos en línea"],
  },
];

const principles = [
  { k: "01", t: "Todo en un solo lugar", d: "Tu marca, tu página y tus redes hechas por el mismo equipo. Sin coordinar con varias personas." },
  { k: "02", t: "Pensado para el celular", d: "Tus clientes te buscan desde el teléfono, así que diseñamos primero para ahí." },
  { k: "03", t: "Hecho para vender", d: "No solo se ve bonito: cada parte está pensada para que te contacten y te compren." },
];

export default function About() {
  return (
    <SectionReveal id="dupla" className="z-container py-16 md:py-28">
      <Reveal className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="z-eyebrow">03 · Quiénes somos</p>
          <h2 className="z-h2 mt-3">
            Dos expertos, <span className="z-gradient-text">un mismo objetivo: tu crecimiento</span>
          </h2>
          <p className="mt-4 max-w-2xl text-z-text-2">
            Somos una dupla venezolana: uno construye la tecnología y la otra diseña la imagen. Juntos
            te entregamos todo lo que tu negocio necesita para verse profesional en internet y vender
            más, sin que tengas que entender nada técnico.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-z-text-2">
            Hasta nuestro logo lo cuenta: la <span className="font-semibold text-z-text">Z</span> de Zeltra
            está hecha con la <span className="font-semibold text-z-text">N</span> de Nestor y la{" "}
            <span className="font-semibold text-z-text">V</span> de Valentina, unidas por un punto blanco en
            el centro.
          </p>
        </div>
        <Isotipo className="hidden h-28 w-28 md:block" />
      </Reveal>

      <div className="relative mt-10 grid gap-5 md:grid-cols-2">
        {duo.map(({ icon: Icon, role, piece, text, skills }) => (
          <Reveal key={role} className="h-full">
            <article className="z-card z-card--hover flex h-full flex-col">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(255,43,214,.4)] bg-z-surface">
                  <Icon size={24} strokeWidth={1.5} className="z-neon text-z-fuchsia" />
                </span>
                <div>
                  <p className="font-mono text-[0.68rem] tracking-[0.1em] text-z-electric uppercase">{piece}</p>
                  <h3 className="z-h4">{role}</h3>
                </div>
              </div>
              <p className="mt-4 text-z-text-2">{text}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                {skills.map((s) => (
                  <li key={s} className="rounded-md border border-z-border px-2 py-1 text-xs text-z-text-2">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
        {/* Nodo de unión entre ambas cards (desktop) */}
        <span aria-hidden className="absolute top-1/2 left-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 md:block">
          <span className="absolute inset-0 animate-ping rounded-full bg-z-fuchsia/40 [animation-duration:2.5s]" />
          <span className="absolute inset-0 rounded-full bg-z-text shadow-[0_0_24px_rgba(255,43,214,.8)]" />
        </span>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-z-border bg-z-border sm:grid-cols-3">
        {principles.map((p) => (
          <Reveal key={p.k} className="bg-z-bg p-5 md:p-6">
            <p className="font-mono text-xs text-z-electric">{p.k}</p>
            <h3 className="z-h4 mt-2">{p.t}</h3>
            <p className="mt-1 text-sm text-z-text-2">{p.d}</p>
          </Reveal>
        ))}
      </div>
    </SectionReveal>
  );
}
