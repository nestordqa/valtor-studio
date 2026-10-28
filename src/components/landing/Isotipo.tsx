import { useId } from "react";

// La Z de Zeltra: N rotada (barras + diagonal) con la V tallada en la barra superior.
export const Z_TOP = "M26 26H50L60 37L70 26H94V40H26Z";
export const Z_DIAGONAL = "M80 40H94L40 80H26Z";
export const Z_BOTTOM = { x: 26, y: 80, width: 68, height: 14 };

type IsotipoProps = {
  className?: string;
  /** Muestra la placa redondeada Surface detrás de la Z. */
  plate?: boolean;
};

export default function Isotipo({ className, plate = true }: IsotipoProps) {
  // Un id por instancia: varias Z en la misma página no comparten el gradiente.
  const gradId = `zg-${useId().replace(/:/g, "")}`;
  const fill = `url(#${gradId})`;

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Isotipo Zeltra Studio">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="0.55" stopColor="#C026D3" />
          <stop offset="1" stopColor="#FF2BD6" />
        </linearGradient>
      </defs>
      {plate && <rect width="120" height="120" rx="28" fill="#13101F" />}
      <path d={Z_TOP} fill={fill} />
      <path d={Z_DIAGONAL} fill={fill} />
      <rect {...Z_BOTTOM} fill={fill} />
      <circle cx="60" cy="60" r="6" fill="#F5F3FF" />
    </svg>
  );
}
