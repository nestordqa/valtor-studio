import { useId } from "react";

type IsotipoProps = {
  className?: string;
  /** Muestra la placa redondeada Surface detrás de la K. */
  plate?: boolean;
};

export default function Isotipo({ className, plate = true }: IsotipoProps) {
  // Un id por instancia: varias K en la misma página no comparten el gradiente.
  const gradId = `kg-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Isotipo Kroma Studio">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="0.55" stopColor="#C026D3" />
          <stop offset="1" stopColor="#FF2BD6" />
        </linearGradient>
      </defs>
      {plate && <rect width="120" height="120" rx="28" fill="#13101F" />}
      <rect x="30" y="26" width="13" height="68" rx="2" fill={`url(#${gradId})`} />
      <path
        d="M90 26 L57 60 L90 94"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="13"
        strokeLinecap="square"
      />
      <circle cx="57" cy="60" r="6" fill="#F5F3FF" />
    </svg>
  );
}
