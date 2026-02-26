import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const brandsTable = sqliteTable("brands", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  config: text("config").notNull(), // JSON string of BrandConfig
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const templatesTable = sqliteTable("templates", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // announcement, feature-highlight, etc.
  variableSchema: text("variable_schema").notNull(), // JSON schema
  rendererType: text("renderer_type").notNull().default("satori"), // satori | puppeteer
  thumbnailUrl: text("thumbnail_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const assetsTable = sqliteTable("assets", {
  id: text("id").primaryKey(),
  templateId: text("template_id").notNull(),
  brandId: text("brand_id").notNull(),
  platform: text("platform").notNull(),
  format: text("format").notNull().default("png"),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  storagePath: text("storage_path").notNull(),
  url: text("url"),
  variables: text("variables"), // JSON
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const jobsTable = sqliteTable("jobs", {
  id: text("id").primaryKey(),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  templateId: text("template_id").notNull(),
  brandId: text("brand_id").notNull(),
  platforms: text("platforms").notNull(), // JSON array
  variables: text("variables").notNull(), // JSON
  result: text("result"), // JSON - array of asset IDs
  error: text("error"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});

export const apiKeysTable = sqliteTable("api_keys", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  keyHash: text("key_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  lastUsedAt: integer("last_used_at", { mode: "timestamp" }),
});
