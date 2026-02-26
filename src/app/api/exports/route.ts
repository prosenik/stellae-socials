import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { ensureSeeded } from "@/lib/api-helpers";
import { desc } from "drizzle-orm";

export async function GET() {
  ensureSeeded();
  const assets = db.select().from(schema.assetsTable).orderBy(desc(schema.assetsTable.createdAt)).limit(100).all();
  return NextResponse.json(assets);
}
