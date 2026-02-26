import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
import { getAssetBuffer } from "@/lib/storage";
import { ensureSeeded } from "@/lib/api-helpers";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  ensureSeeded();
  const { id } = await params;

  const asset = db.select().from(schema.assetsTable).where(eq(schema.assetsTable.id, id)).get();
  if (!asset) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const buffer = getAssetBuffer(asset.storagePath);
  if (!buffer) return NextResponse.json({ error: "File not found" }, { status: 404 });

  const mimeTypes: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    webp: "image/webp",
  };

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": mimeTypes[asset.format] || "application/octet-stream",
      "Content-Disposition": `inline; filename="${asset.templateId}-${asset.platform}.${asset.format}"`,
    },
  });
}
