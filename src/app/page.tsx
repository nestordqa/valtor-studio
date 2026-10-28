import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import SocialAccounts from "@/components/landing/SocialAccounts";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import MotionShell from "@/components/landing/MotionShell";
import { buildJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <MotionShell>
      <script
        type="application/ld+json"
        // Escapa "<" para que el JSON no pueda cerrar la etiqueta <script>.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main className="relative isolate">
        <Hero />
        <Projects />
        <SocialAccounts />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionShell>
  );
}
