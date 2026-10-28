import { useId } from "react";

// Monograma V+T de Valtor: la diagonal (diseño) y el asta (ingeniería) forman la V; el asta con su barra es la T.
export const V_PATH = "M22 22H42L68 65V40H59.9L49 22H98V40H86V98H68Z";
export const V_NODE = { cx: 77, cy: 31, r: 6 };

type IsotipoProps = {
  className?: string;
  /** Muestra la placa redondeada Surface detrás de la V. */
  plate?: boolean;
};

export default function Isotipo({ className, plate = true }: IsotipoProps) {
  // Un id por instancia: varias V en la misma página no comparten el gradiente.
  const gradId = `zg-${useId().replace(/:/g, "")}`;
  const fill = `url(#${gradId})`;

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Isotipo Valtor Studio">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="0.55" stopColor="#C026D3" />
          <stop offset="1" stopColor="#FF2BD6" />
        </linearGradient>
      </defs>
      {plate && <rect width="120" height="120" rx="28" fill="#13101F" />}
      <path d={V_PATH} fill={fill} />
      <circle {...V_NODE} fill="#F5F3FF" />
    </svg>
  );
}
