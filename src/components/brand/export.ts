import type { BrandAsset } from "@/lib/brand-assets";

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** En móvil abre la hoja nativa (Guardar imagen / Archivos); si no, descarga. */
async function deliver(blob: Blob, filename: string) {
  const file = new File([blob], filename, { type: blob.type });
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: filename });
      return;
    } catch (err) {
      if ((err as DOMException).name === "AbortError") return;
    }
  }
  saveBlob(blob, filename);
}

export function downloadText(text: string, filename: string, type: string) {
  saveBlob(new Blob([text], { type }), filename);
}

function wordmarkSvg(asset: BrandAsset) {
  const w = asset.wordmark!;
  const inner = asset.svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  const text = (x: number, y: number, anchor: string) =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Sora, sans-serif" font-weight="800" font-size="56" letter-spacing="-1.1" fill="${w.color}">ZELTRA</text>` +
    `<text x="${x}" y="${y + 30}" text-anchor="${anchor}" font-family="'JetBrains Mono', monospace" font-size="18" letter-spacing="7.5" fill="${w.sub}">STUDIO</text>`;
  return w.layout === "horizontal"
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120"><g>${inner}</g>${text(122, 64, "start")}</svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 210"><g transform="translate(50 0)">${inner}</g>${text(110, 168, "middle")}</svg>`;
}

export function downloadSvg(asset: BrandAsset) {
  const markup = asset.wordmark ? wordmarkSvg(asset) : asset.svg;
  void deliver(new Blob([markup], { type: "image/svg+xml" }), `${asset.id}.svg`);
}

function loadSvg(markup: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
  });
}

function cssFont(variable: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim() || fallback;
}

/** Renderiza el asset a PNG transparente. Los wordmarks usan las fuentes ya cargadas en la página. */
export async function downloadPng(asset: BrandAsset, size = 1024) {
  await document.fonts.ready;
  const img = await loadSvg(asset.svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const w = asset.wordmark;

  if (!w) {
    canvas.width = canvas.height = size;
    ctx.drawImage(img, 0, 0, size, size);
  } else {
    const display = cssFont("--font-sora", "sans-serif");
    const mono = cssFont("--font-jetbrains", "monospace");
    const icon = size * 0.5;
    const big = icon * 0.46;
    const small = big * 0.32;
    const spacing = (px: number) => {
      // letterSpacing en canvas: Chrome/Edge/Safari 17+. Sin soporte, se omite.
      if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${px}px`;
    };

    ctx.font = `800 ${big}px ${display}`;
    spacing(-big * 0.02);
    const zeltraW = ctx.measureText("ZELTRA").width;
    const pad = icon * 0.1;

    const draw = (x: number, y: number, align: CanvasTextAlign) => {
      ctx.textAlign = align;
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = w.color;
      ctx.font = `800 ${big}px ${display}`;
      spacing(-big * 0.02);
      ctx.fillText("ZELTRA", x, y);
      ctx.fillStyle = w.sub;
      ctx.font = `400 ${small}px ${mono}`;
      spacing(small * 0.42);
      ctx.fillText("STUDIO", x, y + small * 1.7);
    };

    if (w.layout === "horizontal") {
      canvas.width = Math.ceil(icon + zeltraW + pad * 3);
      canvas.height = Math.ceil(icon);
      ctx.drawImage(img, 0, 0, icon, icon);
      draw(icon + pad * 0.4, icon * 0.53, "left");
    } else {
      canvas.width = Math.ceil(Math.max(icon, zeltraW) + pad * 2);
      canvas.height = Math.ceil(icon + big + small * 2.6);
      ctx.drawImage(img, (canvas.width - icon) / 2, 0, icon, icon);
      draw(canvas.width / 2, icon + big * 0.85, "center");
    }
  }

  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
  if (blob) await deliver(blob, `${asset.id}-${size}.png`);
}
