import { ensureDb } from "./db-init";
import { db, schema } from "@/db";
import { brands } from "./brands";
import { eq } from "drizzle-orm";

// Ensure DB is initialized on first API call
let seeded = false;

export function ensureSeeded() {
  ensureDb();
  if (seeded) return;

  // Seed brands
  for (const brand of brands) {
    db.insert(schema.brandsTable)
      .values({ id: brand.id, name: brand.name, config: JSON.stringify(brand) })
      .onConflictDoNothing()
      .run();
  }

  // Seed templates
  const templates = [
    { id: "announcement", name: "Announcement", description: "Bold headline with brand logo, colored background, and CTA", type: "announcement", variableSchema: JSON.stringify({ headline: { type: "string", label: "Headline", required: true, default: "Introducing Something New" }, subheadline: { type: "string", label: "Subheadline", default: "A brief description" }, cta: { type: "string", label: "CTA Text", default: "Learn More" } }) },
    { id: "feature-highlight", name: "Feature Highlight", description: "Product feature with title, bullets, and image area", type: "feature-highlight", variableSchema: JSON.stringify({ title: { type: "string", label: "Feature Title", required: true, default: "Amazing Feature" }, description: { type: "string", label: "Description", default: "A powerful new capability" }, bullets: { type: "string", label: "Bullet Points (one per line)", default: "Fast and reliable\nEasy to use\nBuilt for scale" } }) },
    { id: "stat-card", name: "Stat Card", description: "Big numbers with labels", type: "stat-card", variableSchema: JSON.stringify({ stat1Value: { type: "string", label: "Stat 1 Value", required: true, default: "39" }, stat1Label: { type: "string", label: "Stat 1 Label", required: true, default: "Tools" }, stat2Value: { type: "string", label: "Stat 2 Value", default: "93" }, stat2Label: { type: "string", label: "Stat 2 Label", default: "Guides" }, stat3Value: { type: "string", label: "Stat 3 Value", default: "460" }, stat3Label: { type: "string", label: "Stat 3 Label", default: "UX Entries" }, tagline: { type: "string", label: "Tagline", default: "By the numbers" } }) },
    { id: "testimonial", name: "Testimonial / Quote", description: "Quote with author and brand accent", type: "testimonial", variableSchema: JSON.stringify({ quote: { type: "string", label: "Quote", required: true, default: "This product changed how we work." }, author: { type: "string", label: "Author Name", required: true, default: "Jane Smith" }, role: { type: "string", label: "Author Role", default: "CEO at Company" } }) },
    { id: "comparison", name: "Comparison", description: "Side-by-side before/after layout", type: "comparison", variableSchema: JSON.stringify({ title: { type: "string", label: "Title", default: "Before vs After" }, leftLabel: { type: "string", label: "Left Label", required: true, default: "Before" }, leftItems: { type: "string", label: "Left Items (one per line)", default: "Manual process\nSlow iterations\nInconsistent output" }, rightLabel: { type: "string", label: "Right Label", required: true, default: "After" }, rightItems: { type: "string", label: "Right Items (one per line)", default: "Automated workflow\nRapid delivery\nPerfect consistency" } }) },
    { id: "product-launch", name: "Product Launch", description: "Hero layout with product name, tagline, launch date", type: "product-launch", variableSchema: JSON.stringify({ productName: { type: "string", label: "Product Name", required: true, default: "Product X" }, tagline: { type: "string", label: "Tagline", required: true, default: "The future of design automation" }, launchDate: { type: "string", label: "Launch Date", default: "March 2026" }, cta: { type: "string", label: "CTA Text", default: "Get Early Access" } }) },
  ];

  for (const tpl of templates) {
    db.insert(schema.templatesTable)
      .values({ ...tpl, rendererType: "satori" })
      .onConflictDoNothing()
      .run();
  }

  seeded = true;
}

export function getTemplateFromDb(id: string) {
  ensureSeeded();
  return db.select().from(schema.templatesTable).where(eq(schema.templatesTable.id, id)).get();
}

export function getAllTemplatesFromDb() {
  ensureSeeded();
  return db.select().from(schema.templatesTable).all();
}

export function getBrandFromDb(id: string) {
  ensureSeeded();
  return db.select().from(schema.brandsTable).where(eq(schema.brandsTable.id, id)).get();
}

export function getAllBrandsFromDb() {
  ensureSeeded();
  return db.select().from(schema.brandsTable).all();
}
