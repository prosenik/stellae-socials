import { NextResponse } from "next/server";
import React from "react";
import { getTemplateComponent } from "@/lib/template-registry";
import { getBrand } from "@/lib/brands";
import { platforms, PlatformId } from "@/lib/platforms";
import { renderToPng } from "@/lib/renderer";

export async function POST(req: Request) {
  try {
    const { templateId, brandId, platform, variables } = await req.json();

    const Component = getTemplateComponent(templateId);
    if (!Component) return NextResponse.json({ error: "Template not found" }, { status: 404 });

    const brand = getBrand(brandId);
    if (!brand) return NextResponse.json({ error: "Brand not found" }, { status: 404 });

    const { width, height } = platforms[(platform || "twitter") as PlatformId];
    const element = React.createElement(Component, { brand, variables: variables || {}, width, height });
    const png = await renderToPng(element, width, height);

    return new NextResponse(png, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    console.error("Preview error:", error);
    return NextResponse.json({ error: "Preview failed", details: String(error) }, { status: 500 });
  }
}
