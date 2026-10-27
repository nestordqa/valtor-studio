import type { Metadata } from "next";
import BrandKit from "@/components/brand/BrandKit";

export const metadata: Metadata = {
  title: "Brand Kit — Kroma Studio",
  description: "Logos, colores, tipografía y tokens oficiales de Kroma Studio, listos para descargar.",
};

export default function BrandPage() {
  return <BrandKit />;
}
