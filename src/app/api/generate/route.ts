import { NextResponse } from "next/server";
import { z } from "zod";
import React from "react";
import { getTemplateFromDb, getBrandFromDb } from "@/lib/api-helpers";
import { getTemplateComponent } from "@/lib/template-registry";
import { platforms, PlatformId } from "@/lib/platforms";
import { renderToFormat } from "@/lib/renderer";
import { storeAsset } from "@/lib/storage";
import { db, schema } from "@/db";
import { v4 as uuid } from "uuid";

const generateSchema = z.object({
  templateId: z.string(),
  brandId: z.string(),
  platform: z.enum(["twitter", "linkedin", "instagram-post", "instagram-story", "facebook"]),
  variables: z.record(z.string()),
  format: z.enum(["png", "jpg", "webp"]).default("png"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = generateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.issues }, { status: 400 });
    }

    const { templateId, brandId, platform, variables, format } = parsed.data;

    const templateDb = getTemplateFromDb(templateId);
    if (!templateDb) return NextResponse.json({ error: "Template not found" }, { status: 404 });

    const brandDb = getBrandFromDb(brandId);
    if (!brandDb) return NextResponse.json({ error: "Brand not found" }, { status: 404 });

    const Component = getTemplateComponent(templateId);
    if (!Component) return NextResponse.json({ error: "Template component not found" }, { status: 404 });

    const brand = JSON.parse(brandDb.config);
    const { width, height } = platforms[platform as PlatformId];

    const element = React.createElement(Component, { brand, variables, width, height });
    const buffer = await renderToFormat(element, width, height, format);

    const stored = await storeAsset(buffer, format, `${templateId}-${platform}`);

    const assetId = uuid();
    db.insert(schema.assetsTable).values({
      id: assetId,
      templateId,
      brandId,
      platform,
      format,
      width,
      height,
      storagePath: stored.path,
      url: stored.url,
      variables: JSON.stringify(variables),
    }).run();

    return NextResponse.json({
      id: assetId,
      url: stored.url,
      width,
      height,
      format,
      platform,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json({ error: "Generation failed", details: String(error) }, { status: 500 });
  }
}
