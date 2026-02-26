import { NextResponse } from "next/server";
import { getAllBrandsFromDb } from "@/lib/api-helpers";

export async function GET() {
  const brands = getAllBrandsFromDb();
  return NextResponse.json(
    brands.map((b) => ({
      id: b.id,
      name: b.name,
      config: JSON.parse(b.config),
    }))
  );
}
