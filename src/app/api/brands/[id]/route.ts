import { NextResponse } from "next/server";
import { getBrandFromDb } from "@/lib/api-helpers";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brand = getBrandFromDb(id);
  if (!brand) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ id: brand.id, name: brand.name, config: JSON.parse(brand.config) });
}
