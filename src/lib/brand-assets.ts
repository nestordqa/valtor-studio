// Fuente única de los logos del Brand Book (SVG en texto) para mostrarlos y descargarlos.

const GRAD = `<defs><linearGradient id="zg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7C3AED"/><stop offset=".55" stop-color="#C026D3"/><stop offset="1" stop-color="#FF2BD6"/></linearGradient></defs>`;

// La Z: barra superior con corte en V + diagonal + base, y el nodo opcional al centro.
const Z = (fill: string, node: string | null) =>
  `<path d="M26 26H50L60 37L70 26H94V40H26Z" fill="${fill}"/><path d="M80 40H94L40 80H26Z" fill="${fill}"/><rect x="26" y="80" width="68" height="14" fill="${fill}"/>` +
  (node ? `<circle cx="60" cy="60" r="6" fill="${node}"/>` : "");

const svg = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 120 120">${GRAD}${body}</svg>`;

export type BrandAsset = {
  id: string;
  name: string;
  use: string;
  svg: string;
  /** Fondo del escenario de vista previa. */
  stage: "dark" | "light";
  /** Si lleva wordmark, se compone en canvas con las fuentes de la página. */
  wordmark?: { layout: "horizontal" | "vertical"; color: string; sub: string };
};

export const brandAssets: BrandAsset[] = [
  {
    id: "zeltra-isologo-horizontal",
    name: "Isologo horizontal",
    use: "Principal · web, firmas, presentaciones",
    svg: svg(Z("url(#zg)", "#F5F3FF")),
    stage: "dark",
    wordmark: { layout: "horizontal", color: "#F5F3FF", sub: "#B8B3CC" },
  },
  {
    id: "zeltra-isologo-vertical",
    name: "Isologo vertical",
    use: "Portadas, merch, stories",
    svg: svg(Z("url(#zg)", "#F5F3FF")),
    stage: "dark",
    wordmark: { layout: "vertical", color: "#F5F3FF", sub: "#B8B3CC" },
  },
  {
    id: "zeltra-isotipo",
    name: "Isotipo · placa",
    use: "Isotipo con placa Surface",
    svg: svg(`<rect width="120" height="120" rx="28" fill="#13101F"/>${Z("url(#zg)", "#F5F3FF")}`),
    stage: "dark",
  },
  {
    id: "zeltra-isotipo-transparente",
    name: "Isotipo · transparente",
    use: "Sobre fondos Void / Surface",
    svg: svg(Z("url(#zg)", "#F5F3FF")),
    stage: "dark",
  },
  {
    id: "zeltra-app-icon",
    name: "App icon",
    use: "Ícono de app, PWA, launcher",
    svg: svg(`<rect width="120" height="120" rx="28" fill="url(#zg)"/>${Z("#0A0812", "#F5F3FF")}`),
    stage: "dark",
  },
  {
    id: "zeltra-avatar-rrss",
    name: "Avatar RRSS",
    use: "Foto de perfil Instagram, TikTok, WhatsApp",
    svg: svg(
      `<circle cx="60" cy="60" r="60" fill="#13101F"/>${Z("url(#zg)", null)}`,
    ),
    stage: "dark",
  },
  {
    id: "zeltra-favicon",
    name: "Favicon",
    use: "16 / 32px · sin nodo, fondo morado sólido",
    svg: svg(
      `<rect width="120" height="120" rx="24" fill="#7C3AED"/>${Z("#fff", null)}`,
    ),
    stage: "dark",
  },
  {
    id: "zeltra-monocromo-claro",
    name: "Monocromo sobre claro",
    use: "Documentos, facturas, impresión",
    svg: svg(Z("#0A0812", "#E0007A")),
    stage: "light",
    wordmark: { layout: "horizontal", color: "#0A0812", sub: "#5E5873" },
  },
];

export const colorGroups = [
  {
    title: "Backgrounds",
    colors: [
      { name: "Void · dominante", token: "--z-bg", hex: "#0A0812", rgb: "10, 8, 18" },
      { name: "Surface · cards", token: "--z-surface", hex: "#13101F", rgb: "19, 16, 31" },
      { name: "Elevated · hover", token: "--z-elevated", hex: "#1C1830", rgb: "28, 24, 48" },
    ],
  },
  {
    title: "Morados",
    colors: [
      { name: "Zeltra Purple", token: "--z-purple", hex: "#7C3AED", rgb: "124, 58, 237" },
      { name: "Electric Violet", token: "--z-electric", hex: "#A855F7", rgb: "168, 85, 247" },
    ],
  },
  {
    title: "Fucsias",
    colors: [
      { name: "Neon Fuchsia", token: "--z-fuchsia", hex: "#FF2BD6", rgb: "255, 43, 214" },
      { name: "Magenta CTA", token: "--z-magenta", hex: "#E0007A", rgb: "224, 0, 122" },
    ],
  },
  {
    title: "Texto",
    colors: [
      { name: "Text primary", token: "--z-text", hex: "#F5F3FF", rgb: "245, 243, 255" },
      { name: "Text secondary", token: "--z-text-2", hex: "#B8B3CC", rgb: "184, 179, 204" },
      { name: "Muted", token: "--z-muted", hex: "#5E5873", rgb: "94, 88, 115" },
    ],
  },
];

export const tokensCss = `/* ===== Zeltra Studio · Design tokens v1.0 ===== */
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --z-bg: #0A0812;
  --z-surface: #13101F;
  --z-elevated: #1C1830;
  --z-purple: #7C3AED;
  --z-electric: #A855F7;
  --z-fuchsia: #FF2BD6;
  --z-magenta: #E0007A;
  --z-text: #F5F3FF;
  --z-text-2: #B8B3CC;
  --z-muted: #5E5873;
  --z-border: rgba(184, 179, 204, 0.12);
  --z-border-accent: rgba(168, 85, 247, 0.18);
  --z-glow-purple: 0 0 24px rgba(168, 85, 247, 0.35);
  --z-glow-fuchsia: 0 0 24px rgba(255, 43, 214, 0.45);
  --z-grad-primary: linear-gradient(135deg, #7C3AED 0%, #C026D3 55%, #FF2BD6 100%);
  --z-grad-text: linear-gradient(90deg, #A855F7 0%, #FF2BD6 100%);
  --z-grad-aurora:
    radial-gradient(120% 120% at 0% 0%, rgba(124, 58, 237, 0.55) 0%, transparent 55%),
    radial-gradient(100% 100% at 100% 100%, rgba(255, 43, 214, 0.35) 0%, transparent 60%),
    #0A0812;

  --font-display: 'Sora', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Manrope', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Consolas, monospace;

  --fs-h1: clamp(2.5rem, 1.6rem + 3.2vw, 3.5rem);
  --fs-h2: clamp(2rem, 1.5rem + 1.8vw, 2.5rem);
  --fs-h3: clamp(1.5rem, 1.35rem + 0.6vw, 1.75rem);
  --fs-h4: 1.25rem;

  --r-sm: 6px; --r-md: 10px; --r-lg: 16px; --r-xl: 24px; --r-full: 999px;
}
`;
