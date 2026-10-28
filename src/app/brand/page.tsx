import type { Metadata } from "next";
import BrandKit from "@/components/brand/BrandKit";

export const metadata: Metadata = {
  title: "Brand Kit — Zeltra Studio",
  description: "Logos, colores, tipografía y tokens oficiales de Zeltra Studio, listos para descargar.",
};

export default function BrandPage() {
  return <BrandKit />;
}
