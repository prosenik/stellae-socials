import { NextResponse } from "next/server";
import { z } from "zod";
import React from "react";
import { getTemplateFromDb, getBrandFromDb } from "@/lib/api-helpers";
import { getTemplateComponent } from "@/lib/template-registry";
import { platforms, platformIds, PlatformId } from "@/lib/platforms";
import { renderToFormat } from "@/lib/renderer";
import { storeAsset } from "@/lib/storage";
import { db, schema } from "@/db";
import { v4 as uuid } from "uuid";

const batchSchema = z.object({
  templateId: z.string(),
  brandId: z.string(),
  variables: z.record(z.string()),
  format: z.enum(["png", "jpg", "webp"]).default("png"),
  platforms: z.array(z.enum(["twitter", "linkedin", "instagram-post", "instagram-story", "facebook"])).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = batchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.issues }, { status: 400 });
    }

    const { templateId, brandId, variables, format } = parsed.data;
    const targetPlatforms = parsed.data.platforms || platformIds;

    const templateDb = getTemplateFromDb(templateId);
    if (!templateDb) return NextResponse.json({ error: "Template not found" }, { status: 404 });

    const brandDb = getBrandFromDb(brandId);
    if (!brandDb) return NextResponse.json({ error: "Brand not found" }, { status: 404 });

    const Component = getTemplateComponent(templateId);
    if (!Component) return NextResponse.json({ error: "Template component not found" }, { status: 404 });

    const brand = JSON.parse(brandDb.config);
    const results = [];

    for (const platform of targetPlatforms) {
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

      results.push({ id: assetId, url: stored.url, width, height, format, platform });
    }

    return NextResponse.json({ assets: results });
  } catch (error) {
    console.error("Batch generate error:", error);
    return NextResponse.json({ error: "Batch generation failed", details: String(error) }, { status: 500 });
  }
}
