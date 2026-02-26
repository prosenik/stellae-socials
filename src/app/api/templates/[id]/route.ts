import { NextResponse } from "next/server";
import { getTemplateFromDb } from "@/lib/api-helpers";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = getTemplateFromDb(id);
  if (!template) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ...template, variableSchema: JSON.parse(template.variableSchema) });
}
