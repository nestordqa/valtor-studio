import type { Metadata } from "next";
import BrandKit from "@/components/brand/BrandKit";

export const metadata: Metadata = {
  title: "Brand Kit",
  description: "Logos, colores, tipografía y tokens oficiales de Valtor Studio, listos para descargar.",
  alternates: { canonical: "/brand" },
  // Recurso interno: no queremos que compita con la home en Google.
  robots: { index: false, follow: true },
};

export default function BrandPage() {
  return <BrandKit />;
}
