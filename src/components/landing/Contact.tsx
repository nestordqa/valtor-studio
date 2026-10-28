"use client";

import { useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import SectionReveal, { Reveal } from "./SectionReveal";
import { WhatsAppIcon } from "./BrandIcons";
import { CONTACT_EMAIL, serviceBlocks, whatsappLink } from "@/lib/site";

export default function Contact() {
  const [error, setError] = useState("");

  // Sin backend: el formulario arma el mensaje y abre WhatsApp con todo listo para enviar.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const service = String(data.get("service") ?? "");
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) {
      setError("Cuéntanos tu nombre y qué necesitas.");
      return;
    }
    setError("");
    const text = `Hola Valtor Studio 👋\nSoy ${name}.\nServicio: ${service}\n\n${message}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <SectionReveal id="contacto" className="z-container py-16 md:py-28">
      <Reveal>
        <div className="z-card z-card--featured relative isolate overflow-hidden !p-6 md:!p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{ background: "var(--z-grad-aurora)" }}
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              <p className="z-eyebrow">04 · Contacto</p>
              <h2 className="z-h2 mt-3">
                ¿Listo para crecer? <span className="z-gradient-text">Hablemos hoy.</span>
              </h2>
              <p className="mt-4 text-z-text-2">
                Cuéntanos tu objetivo y en menos de 24 horas te enviamos una propuesta con alcance,
                tiempos e inversión.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappLink("Hola Valtor Studio 👋 Quiero cotizar un proyecto.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-btn z-btn--primary z-btn--lg"
                >
                  <WhatsAppIcon size={20} />
                  Escribir por WhatsApp
                </a>
                {/* <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Nuevo proyecto con Valtor")}`}
                  className="z-btn z-btn--secondary z-btn--lg"
                >
                  <Mail size={18} strokeWidth={1.5} />
                  Enviar correo
                </a> */}
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-z-text-2">
                Nombre
                <input name="name" type="text" autoComplete="name" placeholder="Tu nombre" className="z-input" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-z-text-2">
                ¿Qué necesitas?
                <select name="service" className="z-input" defaultValue={serviceBlocks[0].title}>
                  {serviceBlocks.map((b) => (
                    <option key={b.id} value={b.title} className="bg-z-surface">
                      {b.title}
                    </option>
                  ))}
                  <option value="Aún no lo sé" className="bg-z-surface">
                    Aún no lo sé, ¡asesórenme!
                  </option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium text-z-text-2">
                Cuéntanos tu proyecto
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tu idea, tiempos y objetivo comercial."
                  className="z-input resize-y"
                />
              </label>
              {error && (
                <p role="alert" className="text-sm text-z-fuchsia">
                  {error}
                </p>
              )}
              <button type="submit" className="z-btn z-btn--cta z-btn--lg w-full sm:w-fit">
                <Send size={18} strokeWidth={1.5} />
                Solicitar propuesta
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </SectionReveal>
  );
}
