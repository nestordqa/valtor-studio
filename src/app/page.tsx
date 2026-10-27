import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import SocialAccounts from "@/components/landing/SocialAccounts";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import MotionShell from "@/components/landing/MotionShell";

export default function Home() {
  return (
    <MotionShell>
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
