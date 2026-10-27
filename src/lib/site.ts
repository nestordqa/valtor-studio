// Contenido central de la landing. Edita aquí datos de contacto, proyectos y planes.

// Número único de WhatsApp para todo el sitio. Se configura en .env.local con
// NEXT_PUBLIC_WHATSAPP_NUMBER (formato internacional, solo dígitos: 584121234567).
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
export const CONTACT_EMAIL = "kromastudio.dev@gmail.com";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#dupla", label: "La Dupla" },
  { href: "#contacto", label: "Contacto" },
];

export type Project = {
  title: string;
  description: string;
  href: string;
  tag: string;
  stack: string[];
  screenshot: string;
  /** Formato de la captura: vertical de celular o horizontal de escritorio. */
  device: "phone" | "desktop";
  /** Funciones extra que se listan en la card. */
  features?: string[];
};

// Panel privado que acompaña a ambas invitaciones de boda.
const weddingDashboard = [
  "Invitaciones personalizadas con el nombre de cada invitado",
  "Control de invitados y confirmaciones",
  "Organización de mesas",
  "Control de gastos de la boda",
];

export const projects: Project[] = [
  {
    title: "Invitación de Boda · Gabriel & Vanessa",
    description:
      "Una invitación ilustrada que se abre en el celular de cada invitado, con animaciones, toda la información del evento y confirmación de asistencia.",
    href: "https://gabriel-and-vanessa.netlify.app/v3",
    tag: "Bodas de lujo",
    stack: ["Invitación digital", "Bilingüe", "Panel de novios"],
    screenshot: "/screenshots/apps/gabriel-vanessa-wedding.png",
    device: "phone",
    features: weddingDashboard,
  },
  {
    title: "Invitación de Boda · Nestor & Valentina",
    description:
      "Invitación con fotos de la pareja, cuenta regresiva, ubicación de ceremonia y fiesta, y confirmación de asistencia en segundos.",
    href: "https://invitacion-boda-eight-rust.vercel.app/v2",
    tag: "Bodas de lujo",
    stack: ["Invitación digital", "Con fotos", "Panel de novios"],
    screenshot: "/screenshots/apps/nestor-valentina-wedding.png",
    device: "phone",
    features: weddingDashboard,
  },
  {
    title: "Landing Industrial · Estufas Mérida",
    description:
      "Página para un fabricante local: muestra sus productos con claridad, transmite confianza y le trae pedidos por WhatsApp.",
    href: "https://estufas-merida.netlify.app/",
    tag: "Landing comercial",
    stack: ["Página de ventas", "Catálogo", "Pedidos"],
    screenshot: "/screenshots/apps/estufas-merida-web.png",
    device: "desktop",
  },
];

export type Plan = {
  name: string;
  audience: string;
  includes: string[];
  investment: string;
  featured?: boolean;
};

export type ServiceBlock = {
  id: string;
  icon: "megaphone" | "code" | "palette" | "layers" | "cpu";
  title: string;
  subtitle: string;
  plans: Plan[];
};

export const serviceBlocks: ServiceBlock[] = [
  {
    id: "redes",
    icon: "megaphone",
    title: "Redes Sociales & Autoridad Digital",
    subtitle: "Gestión estratégica de contenido para marcas que quieren presencia real y ventas.",
    plans: [
      {
        name: "Presencia Esencial",
        audience: "Negocios que inician y necesitan verse profesionales sin perder foco operativo.",
        includes: [
          "Optimización completa de perfil y biografía.",
          "Diseño propio para tus publicaciones, coherente con tu marca.",
          "12 publicaciones mensuales con diseño y copy persuasivo.",
          "4 videos cortos (Reels/TikToks) editados con tu material.",
          "Programación y gestión de contenido.",
        ],
        investment: "USD 150 – 200 / mes",
      },
      {
        name: "Crecimiento Imparable",
        audience: "Negocios que ya venden y quieren escalar su posicionamiento en nichos competitivos.",
        includes: [
          "Todo lo de Presencia Esencial.",
          "16 a 20 publicaciones mensuales (educación, autoridad y venta).",
          "8 videos cortos pensados para enganchar y que los vean completos.",
          "Respondemos a tu comunidad y te enviamos un informe mensual de resultados.",
        ],
        investment: "USD 250 – 350 / mes",
        featured: true,
      },
    ],
  },
  {
    id: "web",
    icon: "code",
    title: "Desarrollo Web & E-commerce Independiente",
    subtitle: "Sitios ultrarrápidos con enfoque en conversión, rendimiento y autonomía total.",
    plans: [
      {
        name: "Landing Page de Alta Conversión",
        audience: "Negocios y marcas personales que quieren una página que convierta visitas en clientes.",
        includes: [
          "Diseño a la medida de tu marca, pensado primero para el celular.",
          "Carga ultrarrápida, incluso con mala señal.",
          "Botones para que te escriban directo a WhatsApp.",
          "Dominio y hosting incluidos por 1 año.",
        ],
        investment: "USD 250 – 350 · pago único",
        featured: true,
      },
      {
        name: "E-commerce / Tienda Online a Medida",
        audience: "Emprendedores con inventario físico que venden en Venezuela y el exterior.",
        includes: [
          "Catálogo de productos y carrito de compras fácil de usar.",
          "Panel sencillo para cambiar precios y existencias tú mismo.",
          "Pagos con Zelle, Binance Pay, Pago Móvil y tarjetas.",
        ],
        investment: "USD 600 – 800 · por hitos",
      },
    ],
  },
  {
    id: "branding",
    icon: "palette",
    title: "Identidad de Marca / Branding",
    subtitle: "Sistemas visuales que elevan la percepción y te diferencian de la competencia.",
    plans: [
      {
        name: "Branding Exprés",
        audience: "Negocios con una identidad desactualizada que necesitan renovar su imagen ya.",
        includes: [
          "Rediseño de logotipo, tipografías y paleta.",
          "Plantillas editables en Canva para el día a día.",
        ],
        investment: "USD 120 – 180",
      },
      {
        name: "Identidad de Marca 360° Corporativa",
        audience: "Empresas que buscan un posicionamiento premium sostenido.",
        includes: [
          "Manual de identidad visual completo.",
          "Papelería, empaques, firma de correo y piezas listas para usar.",
          "Guía de cómo hablarle a tus clientes.",
        ],
        investment: "USD 350 – 500",
        featured: true,
      },
    ],
  },
  {
    id: "combos",
    icon: "layers",
    title: "Combos 360° Kroma",
    subtitle: "Marca, web y redes trabajando como un solo sistema. Más impacto, mejor precio.",
    plans: [
      {
        name: "Despegue Digital",
        audience: "Emprendimientos nuevos que necesitan salir al mercado con identidad y web listas.",
        includes: ["Branding Exprés (logo, paleta y tipografías).", "Página de ventas (landing) pensada para el celular."],
        investment: "USD 350",
      },
      {
        name: "Landing + Marca + Redes",
        audience: "Negocios que lanzan producto y necesitan web, imagen y campaña inicial a la vez.",
        includes: [
          "Branding Exprés.",
          "Landing de alta conversión.",
          "Primer mes de Presencia Esencial (12 posts + 4 reels).",
        ],
        investment: "USD 480 – 580",
        featured: true,
      },
      {
        name: "E-commerce Total",
        audience: "Empresas que necesitan un ecosistema digital integral y blindado.",
        includes: [
          "Identidad de marca 360° completa.",
          "E-commerce a medida con pasarelas locales e internacionales.",
          "Primer mes de gestión de redes sociales.",
        ],
        investment: "USD 850 – 1.200 · por hitos",
      },
      {
        name: "Bodas de Lujo 360°",
        audience: "Parejas y productores de eventos exclusivos que buscan una experiencia memorable.",
        includes: [
          "Invitación digital animada con confirmación de asistencia por WhatsApp.",
          "Identidad visual del evento y papelería digital.",
          "Dominio personalizado por 1 año.",
        ],
        investment: "USD 200 – 350",
      },
    ],
  },
  {
    id: "software",
    icon: "cpu",
    title: "Software a Medida (SaaS / Apps)",
    subtitle: "Sistemas y aplicaciones hechos a la medida de tu negocio.",
    plans: [
      {
        name: "SaaS · App Web · App Móvil",
        audience: "Empresas que necesitan un sistema propio: reservas, inventario, gestión interna o una app para sus clientes.",
        includes: [
          "Sistema seguro en la nube, disponible 24/7.",
          "Diseño completo para que lo veas y apruebes antes de construirlo.",
          "Panel de administración adaptado a cómo trabaja tu negocio.",
          "Soporte y mejoras después del lanzamiento.",
        ],
        investment: "Desde USD 1.200 · cotización a medida",
        featured: true,
      },
    ],
  },
];

// niche: rubro corto · description: qué hacemos por esa cuenta (1 frase).
export const socialAccounts = [
  {
    handle: "@tinamore_ve",
    niche: "Moda & lifestyle",
    description: "Contenido de marca, diseño de publicaciones y estrategia para crecer su comunidad.",
  },
  {
    handle: "@tinamore_shop",
    niche: "Tienda online",
    description: "Publicaciones de producto pensadas para vender y llevar clientes a comprar.",
  },
  {
    handle: "@estufas_merida",
    niche: "Industria local",
    description: "Muestra su trabajo de fundición y convierte seguidores en pedidos por WhatsApp.",
  },
  {
    handle: "@sakura.mrd",
    niche: "Alisado progresivo",
    description: "Resultados antes y después que generan confianza y llenan su agenda de citas.",
  },
  {
    handle: "@lingua.ve",
    niche: "Academia de inglés",
    description: "Contenido educativo que muestra su método y atrae nuevos alumnos cada mes.",
  },
  {
    handle: "@itas_ve",
    niche: "Accesorios para damas",
    description: "Feed coherente con su marca y publicaciones que llevan a sus clientas a comprar.",
  },
  {
    handle: "@theclawsmealss",
    niche: "Comida para mascotas",
    description: "Explica los beneficios de la dieta cruda y muestra sus menús para ganar clientes.",
  },
];
