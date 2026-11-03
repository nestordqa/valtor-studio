// Contenido central de la landing. Edita aquí datos de contacto, proyectos y planes.

// Número único de WhatsApp para todo el sitio. Se configura en .env.local con
// NEXT_PUBLIC_WHATSAPP_NUMBER (formato internacional, solo dígitos: 584121234567).
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
export const CONTACT_EMAIL = "kromastudio.dev@gmail.com";

// URL pública del sitio (sin "/" final). Se configura con NEXT_PUBLIC_SITE_URL; se usa en
// canonical, Open Graph, sitemap, robots y datos estructurados.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://valtorstudio.com").replace(/\/+$/, "");
export const SITE_NAME = "Valtor Studio";
export const SITE_TITLE = "Valtor Studio · Diseño web, branding y software a medida en Venezuela";
export const SITE_DESCRIPTION =
  "Agencia boutique en Venezuela: landing pages, tiendas online, branding, gestión de redes sociales, invitaciones de boda digitales y software a medida. Planes desde USD 50.";
export const INSTAGRAM_URL = "https://instagram.com/valtor.studio";

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
  /** Título del recuadro de funciones. */
  featuresTitle?: string;
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
    title: "TorkeOS · Software para talleres",
    description:
      "App web progresiva (se instala en el teléfono como una app) para que los talleres mecánicos agenden citas y gestionen todo su trabajo desde un solo lugar.",
    href: "https://torkeos.com/",
    tag: "Software a medida",
    stack: ["App instalable", "Citas", "Gestión de taller"],
    screenshot: "/screenshots/apps/torkeos.png",
    device: "desktop",
    featuresTitle: "Todo el taller en una app",
    features: [
      "Agenda de citas en línea para los clientes",
      "Órdenes de trabajo y diagnósticos",
      "Presupuestos que el cliente aprueba desde su teléfono",
      "Control del equipo y del día a día del taller",
    ],
  },
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
    featuresTitle: "Incluye panel para los novios",
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
    featuresTitle: "Incluye panel para los novios",
  },
  {
    title: "Landing Industrial · Estufas Mérida",
    description:
      "Página para un fabricante local: muestra sus productos con claridad, transmite confianza y le trae pedidos por WhatsApp.",
    href: "https://estufas-merida.com/",
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
        audience: "Marcas que quieren mantenerse activas, profesionales y visibles sin perder la constancia.",
        includes: [
          "5 historias a la semana (20 al mes).",
          "2 posts diseñados estratégicamente.",
          "2 reels cortos para captar la atención.",
          "Textos (copies) listos para usar y sugerencia de hashtags.",
          "Tú publicas: te entregamos todo el material listo y organizado.",
          "Con gestión (+USD 25): programamos, publicamos y atendemos tus mensajes y comentarios de 10:00 a.m. a 7:00 p.m.",
        ],
        investment: "USD 50 / mes · USD 75 con gestión",
      },
      {
        name: "Impulso Comercial",
        audience: "Marcas con mayor movimiento que necesitan presencia constante y un ritmo de venta más dinámico.",
        includes: [
          "2 a 3 historias dinámicas diarias (6 días a la semana).",
          "4 posts al mes (1 por semana).",
          "4 reels al mes (1 por semana), atractivos y dinámicos.",
          "Textos (copies) orientados a la conversión y la venta.",
          "Tú publicas: te entregamos el contenido organizado por carpetas o fechas.",
          "Con gestión (+USD 35): subimos todo por ti y atendemos tus redes de 10:00 a.m. a 7:00 p.m.",
        ],
        investment: "USD 85 / mes · USD 120 con gestión",
        featured: true,
      },
      {
        name: "Gestión Total / Autoridad",
        audience: "Marcas que quieren delegar el 100 % de su comunicación y posicionarse como referentes en su sector.",
        includes: [
          "Historias diarias (6 días a la semana) con enfoque comercial y de interacción.",
          "6 posts al mes.",
          "6 reels al mes para mostrar tus productos y generar comunidad.",
          "Planificación visual completa y asesoría de marca.",
          "Gestión incluida: diseño, producción, programación, publicación y atención de mensajes de 10:00 a.m. a 7:00 p.m.",
        ],
        investment: "USD 150 / mes · gestión incluida",
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
        investment: "USD 150 · pago único",
        featured: true,
      },
      {
        name: "Landing Page + SEO",
        audience:
          "Negocios que además quieren aparecer en Google. SEO es preparar tu página para que Google la muestre cuando alguien busca lo que vendes.",
        includes: [
          "Todo lo del plan Landing Page de Alta Conversión (de esta sección).",
          "SEO: textos, títulos y estructura optimizados para Google.",
          "Alta de tu negocio en Google Maps (Perfil de Empresa).",
          "Estadísticas de visitas para saber cuánta gente te encuentra.",
        ],
        investment: "USD 240 · pago único",
      },
      {
        name: "E-commerce / Tienda Online a Medida",
        audience: "Emprendedores con inventario físico que venden en Venezuela y el exterior.",
        includes: [
          "Landing de presentación de tu marca incluida.",
          "Catálogo de productos y carrito de compras fácil de usar.",
          "Panel sencillo para cambiar precios y existencias tú mismo.",
          "Pagos con Zelle, Binance Pay, Pago Móvil y tarjetas.",
        ],
        investment: "USD 650 · pago único",
      },
      {
        name: "E-commerce + SEO",
        audience: "Tiendas que quieren que sus productos aparezcan en Google y vender sin depender solo de las redes.",
        includes: [
          "Todo lo del plan E-commerce / Tienda Online a Medida (de esta sección).",
          "SEO de tienda y de cada producto para aparecer en búsquedas de Google.",
          "Aviso por correo o WhatsApp de cada pedido nuevo.",
        ],
        investment: "USD 800 · pago único",
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
        investment: "USD 160 · pago único",
      },
      {
        name: "Identidad de Marca 360° Corporativa",
        audience: "Empresas que buscan un posicionamiento premium sostenido.",
        includes: [
          "Manual de identidad visual completo.",
          "Papelería, empaques, firma de correo y piezas listas para usar.",
          "Guía de cómo hablarle a tus clientes.",
        ],
        investment: "USD 300 · pago único",
        featured: true,
      },
    ],
  },
  {
    id: "combos",
    icon: "layers",
    title: "Combos 360° Valtor",
    subtitle: "Marca, web y redes trabajando como un solo sistema. Más impacto, mejor precio.",
    plans: [
      {
        name: "Despegue Digital",
        audience: "Emprendimientos nuevos que necesitan salir al mercado con identidad y web listas.",
        includes: [
          "Plan Branding Exprés de la sección Identidad de Marca: logo, paleta y tipografías.",
          "Plan Landing Page de Alta Conversión de la sección Desarrollo Web.",
        ],
        investment: "USD 290 · pago único",
      },
      {
        name: "Landing + Marca + Redes",
        audience: "Negocios que lanzan producto y necesitan web, imagen y campaña inicial a la vez.",
        includes: [
          "Plan Branding Exprés de la sección Identidad de Marca.",
          "Plan Landing Page de Alta Conversión de la sección Desarrollo Web.",
          "Primer mes del plan Presencia Esencial de la sección Redes Sociales, con gestión (20 historias, 2 posts y 2 reels).",
        ],
        investment: "USD 360 · pago único",
        featured: true,
      },
      {
        name: "E-commerce Total",
        audience: "Empresas que quieren lo mejor de todo: marca, tienda online en Google y redes funcionando desde el día uno.",
        includes: [
          "Plan Identidad de Marca 360° Corporativa de la sección Identidad de Marca.",
          "Plan E-commerce + SEO de la sección Desarrollo Web: tienda con landing, pagos y productos en Google.",
          "Aviso por correo o WhatsApp de cada pedido nuevo.",
          "Primer mes del plan Gestión Total / Autoridad de la sección Redes Sociales: historias diarias, 6 posts, 6 reels y gestión completa de tus cuentas.",
          "Las redes están incluidas solo durante el primer mes; luego puedes continuar con cualquier plan mensual.",
        ],
        investment: "USD 1.100 · pago único",
      },
      {
        name: "Invitación Esencial",
        audience: "Parejas que quieren una invitación digital bonita, sencilla y lista para compartir.",
        includes: [
          "Invitación digital con un arte sencillo y elegante.",
          "3 animaciones suaves.",
          "Toda la información del evento: fecha, lugar y hora.",
          "Un solo enlace para compartir con todos tus invitados.",
        ],
        investment: "USD 60 · pago único",
      },
      {
        name: "Invitación Personalizada",
        audience: "Parejas que quieren que cada invitado reciba una invitación con su nombre.",
        includes: [
          "Todo lo del plan Invitación Esencial (de esta sección).",
          "Diseño más elaborado, con más secciones y detalles.",
          "Más animaciones a lo largo de toda la invitación.",
          "Acceso al panel de invitados.",
          "Carga de tus invitados e invitaciones personalizadas para cada uno.",
          "Enlace único por invitado, listo para enviar.",
        ],
        investment: "USD 110 · pago único",
      },
      {
        name: "Boda Total",
        audience: "Parejas que quieren organizar toda su boda desde un solo lugar, sin hojas de cálculo.",
        includes: [
          "Todo lo del plan Invitación Personalizada (de esta sección).",
          "Diseño premium a la medida de tu boda, con animaciones en cada sección.",
          "Acceso completo al panel de la boda.",
          "Control de invitados por estado: pendiente, confirmado o rechazado.",
          "Mensajes de WhatsApp personalizados que cambian según cada invitado (nombre, cupos, mesa…).",
          "Organización de mesas y ubicación de cada invitado.",
          "Control de gastos de la boda.",
        ],
        investment: "USD 250 · pago único",
      },
      {
        name: "Bodas de Lujo 360°",
        audience: "Parejas y productores de eventos exclusivos que quieren lo máximo: una experiencia única e inolvidable.",
        includes: [
          "Todo lo del plan Boda Total (de esta sección).",
          "Diseño exclusivo de autor, 100 % único y sin plantillas.",
          "Experiencia inmersiva: animaciones cinematográficas, música y efectos especiales.",
          "Ilustración personalizada de la pareja.",
          "Identidad visual del evento y papelería digital.",
          "Dominio personalizado por 1 año.",
        ],
        investment: "USD 350 · pago único",
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
          "Soporte y mejoras después del lanzamiento.",
        ],
        investment: "Desde USD 550 · cotización a medida",
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
  // {
  //   handle: "@itas_ve",
  //   niche: "Accesorios para damas",
  //   description: "Feed coherente con su marca y publicaciones que llevan a sus clientas a comprar.",
  // }
];
