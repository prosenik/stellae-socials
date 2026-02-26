import { NextResponse } from "next/server";
import { getAllTemplatesFromDb } from "@/lib/api-helpers";

export async function GET() {
  const templates = getAllTemplatesFromDb();
  return NextResponse.json(
    templates.map((t) => ({
      ...t,
      variableSchema: JSON.parse(t.variableSchema),
    }))
  );
}
