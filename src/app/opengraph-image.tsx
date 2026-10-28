import { ImageResponse } from "next/og";

// Imagen que aparece al compartir el enlace en WhatsApp, Instagram, Facebook, X, etc.
export const alt = "Valtor Studio · Diseño web, branding y software a medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(circle at 80% 20%, #7C3AED 0%, #0A0812 55%)",
          color: "#F5F3FF",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 12, color: "#FF2BD6" }}>VALTOR STUDIO</div>
        <div style={{ marginTop: 28, fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>
          Construimos la tecnología y diseñamos la imagen para hacer crecer tu negocio.
        </div>
        <div style={{ marginTop: 36, fontSize: 28, color: "#B8B3CC" }}>
          Landing pages · E-commerce · Branding · Redes · Software a medida
        </div>
      </div>
    ),
    size,
  );
}
