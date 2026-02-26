import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { ReactElement } from "react";
import path from "path";
import fs from "fs";

// Cache fonts
let interBold: ArrayBuffer | null = null;
let interRegular: ArrayBuffer | null = null;

async function loadFonts() {
  if (interBold && interRegular) return [interBold, interRegular];

  // Try to load from local fonts directory, otherwise fetch from Google Fonts
  const fontsDir = path.join(process.cwd(), "public", "fonts");

  if (fs.existsSync(path.join(fontsDir, "Inter-Bold.ttf"))) {
    interBold = fs.readFileSync(path.join(fontsDir, "Inter-Bold.ttf")).buffer as ArrayBuffer;
    interRegular = fs.readFileSync(path.join(fontsDir, "Inter-Regular.ttf")).buffer as ArrayBuffer;
  } else {
    // Fetch from Google Fonts API
    const [boldRes, regularRes] = await Promise.all([
      fetch("https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap").then(r => r.text()),
      fetch("https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap").then(r => r.text()),
    ]);

    const extractUrl = (css: string) => {
      const match = css.match(/src:\s*url\(([^)]+)\)/);
      return match?.[1] || "";
    };

    const [boldFont, regularFont] = await Promise.all([
      fetch(extractUrl(boldRes)).then(r => r.arrayBuffer()),
      fetch(extractUrl(regularRes)).then(r => r.arrayBuffer()),
    ]);

    interBold = boldFont;
    interRegular = regularFont;

    // Save locally for future use
    if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir, { recursive: true });
    fs.writeFileSync(path.join(fontsDir, "Inter-Bold.ttf"), Buffer.from(boldFont));
    fs.writeFileSync(path.join(fontsDir, "Inter-Regular.ttf"), Buffer.from(regularFont));
  }

  return [interBold, interRegular];
}

export async function renderToSvg(
  element: ReactElement,
  width: number,
  height: number
): Promise<string> {
  const [bold, regular] = await loadFonts();

  const svg = await satori(element, {
    width,
    height,
    fonts: [
      { name: "Inter", data: bold!, weight: 700, style: "normal" },
      { name: "Inter", data: regular!, weight: 400, style: "normal" },
    ],
  });

  return svg;
}

export async function renderToPng(
  element: ReactElement,
  width: number,
  height: number
): Promise<Buffer> {
  const svg = await renderToSvg(element, width, height);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
  });
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
}

export async function renderToFormat(
  element: ReactElement,
  width: number,
  height: number,
  format: "png" | "jpg" | "webp" = "png"
): Promise<Buffer> {
  const png = await renderToPng(element, width, height);

  if (format === "png") return png;

  const sharpInstance = sharp(png);
  if (format === "jpg") return sharpInstance.jpeg({ quality: 90 }).toBuffer();
  if (format === "webp") return sharpInstance.webp({ quality: 90 }).toBuffer();

  return png;
}
