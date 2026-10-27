// Fuente única de los logos del Brand Book (SVG en texto) para mostrarlos y descargarlos.

const GRAD = `<defs><linearGradient id="kg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7C3AED"/><stop offset=".55" stop-color="#C026D3"/><stop offset="1" stop-color="#FF2BD6"/></linearGradient></defs>`;

const K = (fill: string, node: string | null) =>
  `<rect x="30" y="26" width="13" height="68" rx="2" fill="${fill}"/><path d="M90 26 L57 60 L90 94" fill="none" stroke="${fill}" stroke-width="13" stroke-linecap="square"/>` +
  (node ? `<circle cx="57" cy="60" r="6" fill="${node}"/>` : "");

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
    id: "kroma-isologo-horizontal",
    name: "Isologo horizontal",
    use: "Principal · web, firmas, presentaciones",
    svg: svg(K("url(#kg)", "#F5F3FF")),
    stage: "dark",
    wordmark: { layout: "horizontal", color: "#F5F3FF", sub: "#B8B3CC" },
  },
  {
    id: "kroma-isologo-vertical",
    name: "Isologo vertical",
    use: "Portadas, merch, stories",
    svg: svg(K("url(#kg)", "#F5F3FF")),
    stage: "dark",
    wordmark: { layout: "vertical", color: "#F5F3FF", sub: "#B8B3CC" },
  },
  {
    id: "kroma-isotipo",
    name: "Isotipo · placa",
    use: "Isotipo con placa Surface",
    svg: svg(`<rect width="120" height="120" rx="28" fill="#13101F"/>${K("url(#kg)", "#F5F3FF")}`),
    stage: "dark",
  },
  {
    id: "kroma-isotipo-transparente",
    name: "Isotipo · transparente",
    use: "Sobre fondos Void / Surface",
    svg: svg(K("url(#kg)", "#F5F3FF")),
    stage: "dark",
  },
  {
    id: "kroma-app-icon",
    name: "App icon",
    use: "Ícono de app, PWA, launcher",
    svg: svg(`<rect width="120" height="120" rx="28" fill="url(#kg)"/>${K("#0A0812", "#F5F3FF")}`),
    stage: "dark",
  },
  {
    id: "kroma-avatar-rrss",
    name: "Avatar RRSS",
    use: "Foto de perfil Instagram, TikTok, WhatsApp",
    svg: svg(
      `<circle cx="60" cy="60" r="60" fill="#13101F"/><rect x="34" y="30" width="12" height="60" rx="2" fill="url(#kg)"/><path d="M86 30 L58 60 L86 90" fill="none" stroke="url(#kg)" stroke-width="12" stroke-linecap="square"/>`,
    ),
    stage: "dark",
  },
  {
    id: "kroma-favicon",
    name: "Favicon",
    use: "16 / 32px · sin nodo, trazo 150 %",
    svg: svg(
      `<rect width="120" height="120" rx="24" fill="#7C3AED"/><rect x="28" y="24" width="18" height="72" fill="#fff"/><path d="M92 24 L58 60 L92 96" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="square"/>`,
    ),
    stage: "dark",
  },
  {
    id: "kroma-monocromo-claro",
    name: "Monocromo sobre claro",
    use: "Documentos, facturas, impresión",
    svg: svg(K("#0A0812", "#E0007A")),
    stage: "light",
    wordmark: { layout: "horizontal", color: "#0A0812", sub: "#5E5873" },
  },
];

export const colorGroups = [
  {
    title: "Backgrounds",
    colors: [
      { name: "Void · dominante", token: "--k-bg", hex: "#0A0812", rgb: "10, 8, 18" },
      { name: "Surface · cards", token: "--k-surface", hex: "#13101F", rgb: "19, 16, 31" },
      { name: "Elevated · hover", token: "--k-elevated", hex: "#1C1830", rgb: "28, 24, 48" },
    ],
  },
  {
    title: "Morados",
    colors: [
      { name: "Kroma Purple", token: "--k-purple", hex: "#7C3AED", rgb: "124, 58, 237" },
      { name: "Electric Violet", token: "--k-electric", hex: "#A855F7", rgb: "168, 85, 247" },
    ],
  },
  {
    title: "Fucsias",
    colors: [
      { name: "Neon Fuchsia", token: "--k-fuchsia", hex: "#FF2BD6", rgb: "255, 43, 214" },
      { name: "Magenta CTA", token: "--k-magenta", hex: "#E0007A", rgb: "224, 0, 122" },
    ],
  },
  {
    title: "Texto",
    colors: [
      { name: "Text primary", token: "--k-text", hex: "#F5F3FF", rgb: "245, 243, 255" },
      { name: "Text secondary", token: "--k-text-2", hex: "#B8B3CC", rgb: "184, 179, 204" },
      { name: "Muted", token: "--k-muted", hex: "#5E5873", rgb: "94, 88, 115" },
    ],
  },
];

export const tokensCss = `/* ===== Kroma Studio · Design tokens v1.0 ===== */
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --k-bg: #0A0812;
  --k-surface: #13101F;
  --k-elevated: #1C1830;
  --k-purple: #7C3AED;
  --k-electric: #A855F7;
  --k-fuchsia: #FF2BD6;
  --k-magenta: #E0007A;
  --k-text: #F5F3FF;
  --k-text-2: #B8B3CC;
  --k-muted: #5E5873;
  --k-border: rgba(184, 179, 204, 0.12);
  --k-border-accent: rgba(168, 85, 247, 0.18);
  --k-glow-purple: 0 0 24px rgba(168, 85, 247, 0.35);
  --k-glow-fuchsia: 0 0 24px rgba(255, 43, 214, 0.45);
  --k-grad-primary: linear-gradient(135deg, #7C3AED 0%, #C026D3 55%, #FF2BD6 100%);
  --k-grad-text: linear-gradient(90deg, #A855F7 0%, #FF2BD6 100%);
  --k-grad-aurora:
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
